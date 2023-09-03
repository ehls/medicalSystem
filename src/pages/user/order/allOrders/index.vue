<template>
  <el-card class="card">
    <template #header>
      <span class="title">挂号订单</span>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select placeholder="请选择就诊人" v-model="patient">
          <el-option :label="'选择所有患者'" :value="''" />
          <el-option
            v-for="item in users"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" v-model="orderStatus">
          <el-option :label="'选择所有订单状态'" :value="-2" />
          <el-option :label="'预约成功，待支付'" :value="0" />
          <el-option :label="'取消预约'" :value="-1" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-table :data="currentPageOrders">
      <el-table-column label="就诊时间" prop="date"> </el-table-column>
      <el-table-column label="医院" prop="hospital"> </el-table-column>
      <el-table-column label="科室" prop="department"> </el-table-column>
      <el-table-column label="医生" prop="docName"> </el-table-column>
      <el-table-column label="医事服务费" prop="cost"> </el-table-column>
      <el-table-column label="就诊人" prop="telephone"> </el-table-column>
      <el-table-column label="订单状态" prop="orderStatusString">
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="true"
      :page-sizes="[10, 20, 30]"
      layout="prev, pager, next, ->, sizes, total"
      :total="selectedOrders.length"
    />
  </el-card>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { reqUserOrders, reqUsers } from "@/api/user";
import { IOrder } from "@/api/user/types";

let currentPage = ref(1);
let pageSize = ref(10);
let patient = ref("");
let orderStatus = ref(-2);
let userOrders = ref<IOrder[]>([]);
let users = ref<string[]>([]);
let $router = useRouter();
onMounted(async () => {
  let result = await reqUserOrders();
  if (result.code === 200) {
    userOrders.value = result.data;
  }
});
onMounted(async () => {
  let result = await reqUsers();
  if (result.code === 200) {
    users.value = result.data;
  }
});
let selectedOrders = computed(() => {
  let patientOrders = userOrders.value.filter((item) => {
    return patient.value === "" || patient.value === item.telephone;
  });
  let statusOrders = patientOrders.filter((item) => {
    return orderStatus.value === -2 || orderStatus.value === item.orderStatus;
  });
  return statusOrders;
});
let currentPageOrders = computed(() => {
  let startIndex = (currentPage.value - 1) * pageSize.value;
  let endIndex = Math.min(
    currentPage.value * pageSize.value,
    selectedOrders.value.length
  );
  return selectedOrders.value.slice(startIndex, endIndex);
});
function goDetail(order: IOrder) {
  $router.push({
    path: "/user/order",
    query: {
      patientId: order.telephone,
      orderId: order.id,
    },
  });
}
</script>
<style scoped lang="less">
.card {
  margin: 30px;
  .title {
    font-size: 20px;
  }
}
</style>
