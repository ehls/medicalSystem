<template>
  <div class="user">
    <div class="menu">
      <div class="top">
        <el-icon><House /></el-icon>
        &nbsp;
        <span> / 会员中心</span>
      </div>
      <el-menu :default-active="selectItem" class="el-menu-vertical-demo">
        <el-menu-item index="1" @click="changeActive('/user/certification')">
          <el-icon><Postcard /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeActive('/user/order')">
          <el-icon><Memo /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="3" @click="changeActive('/user/patient')">
          <el-icon><User /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="changeActive('/user/profile')">
          <el-icon><Document /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="5" @click="changeActive('/user/feedback')">
          <el-icon><ChatDotRound /></el-icon>
          <span>意见反馈</span>
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
  House,
  Postcard,
  Memo,
  User,
  Document,
  ChatDotRound,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

let $router = useRouter();
let $route = useRoute();
let selectItem = computed(() => {
  switch ($route.path) {
    case "/user/certification":
      return '1';
    case "/user/order":
      return '2';
    case "/user/patient":
      return '3';
    case "/user/profile":
      return '4';
    case "/user/feedback":
      return '5';
    default:
      return '0';
  }
});

function changeActive(path: string) {
  $router.push({
    path: path
  });
}
</script>
<style scoped lang="less">
.user {
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
