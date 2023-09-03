<template>
  <el-card class="card">
    <template #header>
      <div class="header">
        <span>就诊人管理</span>
        <el-button
          class="button"
          type="success"
          :icon="User"
          @click="editUser('')"
          >添加就诊人</el-button
        >
      </div>
    </template>
    <div class="user">
      <Visitor
        class="visitor"
        v-for="patient in patients"
        :key="patient.id"
        :patient="patient"
        :isSelected="false"
        :hasDelete="true"
        @refreshUsers="refreshUsers"
      />
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { User } from "@element-plus/icons-vue";
import { reqAllPatients } from "@/api/user";
import { IPatient } from "@/api/user/types";
import { useRouter } from "vue-router";

let $router = useRouter();

let patients = ref<IPatient[]>([]);
async function refreshUsers() {
  let result = await reqAllPatients();
  if (result.code === 200) {
    patients.value = result.data;
  }
}
onMounted(async () => {
  await refreshUsers()
});
function editUser(id: string) {
  $router.push({
    path: "/user/patient",
    query: {
        id: id
    },
  });
}
</script>
<style scoped lang="less">
.card {
  margin: 30px;
  .header {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
</style>
