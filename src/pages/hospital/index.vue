<template>
  <div class="hospital">
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon>
        &nbsp;
        <span> / 医院信息</span>
      </div>
      <el-menu :default-active="selectItem" class="el-menu-vertical-demo">
        <el-menu-item
          index="1"
          @click="changeActive('/hospital/bookingRegister')"
        >
          <el-icon><calendar /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item
          index="2"
          @click="changeActive('/hospital/hospitalDetails')"
        >
          <el-icon><document /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item
          index="3"
          @click="changeActive('/hospital/bookingInstructions')"
        >
          <el-icon><bell /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item
          index="4"
          @click="changeActive('/hospital/suspensionInformation')"
        >
          <el-icon><warning /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item
          index="5"
          @click="changeActive('/hospital/queryOrCancel')"
        >
          <el-icon><search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  HomeFilled,
  Calendar,
  Document,
  Bell,
  Warning,
  Search,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { reqDetailedHospital, reqHospitalDepartment } from "@/api/hospital";
import { useHospitalStore } from "@/store/hospital";

let $router = useRouter();
let $route = useRoute();
let hospitalStore = useHospitalStore();

let selectItem = computed(() => {
  switch ($route.path) {
    case "/hospital/hospitalDetails":
      return '2';
    case "/hospital/bookingInstructions":
      return '3';
    case "/hospital/suspensionInformation":
      return '4';
    case "/hospital/queryOrCancel":
      return '5';
    default:
      return '1';
  }
});

function changeActive(path: string) {
  $router.push({
    path: path,
    query: {
      hoscode: $route.query.hoscode,
    },
  });
}

onMounted(async () => {
  hospitalStore.setHospital(
    await reqDetailedHospital($route.query.hoscode as string)
  );
  hospitalStore.setDepartments(
    await reqHospitalDepartment($route.query.hoscode as string)
  );
});
</script>
<style scoped lang="less">
.hospital {
  display: flex;
  .menu {
    flex: 2;
    .top {
      color: #7f7f7f;
      display: flex;
      align-items: center;
      padding: 20px;
    }
  }
  .content {
    flex: 8;
  }
}
</style>
