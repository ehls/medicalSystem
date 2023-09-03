<template>
  <div class="container">
    <div class="tip">确认挂号信息</div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请点击选择就诊人</span>
          <el-button class="button" type="success" :icon="User" @click="editUser('')"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <div class="user">
        <Visitor
          class="visitor"
          v-for="(patient, index) in patients"
          :key="patient.id"
          :patient="patient"
          @click="currentIndex = index"
          :isSelected="currentIndex === index"
          :hasDelete="false"
        />
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="就诊日期: ">{{
          schedule.workDate
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊医院: ">{{
          schedule.param?.hosname
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室: ">{{
          schedule.param?.depname
        }}</el-descriptions-item>
        <el-descriptions-item label="医生姓名: "
          >{{ schedule.docname }}
        </el-descriptions-item>
        <el-descriptions-item label="医生职称: "
          >{{ schedule.title }}
        </el-descriptions-item>
        <el-descriptions-item label="医生专长: "
          >{{ schedule.skill }}
        </el-descriptions-item>
        <el-descriptions-item label="医事服务费: "
          ><div style="color: red">{{ schedule.amount }}</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="btn">
      <el-button
        class="button"
        type="primary"
        :disabled="currentIndex === -1"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqAllPatients, reqSubmitOrder } from "@/api/user";
import { IPatient } from "@/api/user/types";
import { reqSchedule } from "@/api/hospital";
import { ISchedule } from "@/api/hospital/types";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

let $router = useRouter();
let $route = useRoute();
let patients = ref<IPatient[]>([]);
let schedule = ref<ISchedule>({} as ISchedule);
let currentIndex = ref(-1);
onMounted(async () => {
  let result = await reqAllPatients();
  if (result.code === 200) {
    patients.value = result.data;
  }
});
onMounted(async () => {
  schedule.value = await reqSchedule(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    $route.query.doctorId as string
  );
});
async function submitOrder() {
  let result = await reqSubmitOrder(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    $route.query.doctorId as string,
    patients.value[currentIndex.value].phone as string
  );
  if (result.code === 200) {
    $router.push({
      path: "/user/order",
      query: {
        patientId: patients.value[currentIndex.value].phone,
        orderId: result.data.id,
      },
    });
  }
}
function editUser(id: string) {
  $router.push({
    path: "/user/patient",
    query: {
        id: id
    },
  });
}
</script>
<style lang="less" scoped>
.container {
  padding: 30px;
  .tip {
    color: #7f7f7f;
    font-size: 20px;
    font-weight: bold;
    margin: 40px 0;
  }
  .box-card {
    margin-bottom: 40px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
    }
    .user {
      display: flex;
      flex-wrap: wrap;
      .visitor {
        width: 32%;
        margin: 5px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
