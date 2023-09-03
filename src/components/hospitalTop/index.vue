<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="" />
      </div>
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.telephone">
          登录/注册
        </p>
        <el-dropdown v-else>
          <span>
            {{ userStore.telephone }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUserCertification">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUserOrder">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUserPatient">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { reqTokenLogin, reqLogout } from "@/api/user";
import { onMounted } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

let userStore = useUserStore();
let $router = useRouter();

onMounted(async () => {
  let result = await reqTokenLogin();
  if (result.code === 200) {
    userStore.telephone = result.telephone;
  } else {
    userStore.telephone = "";
  }
});

function goHome() {
  $router.push({
    path: "/home",
  });
}

function login() {
  userStore.visible = true;
}

function goUserCertification() {
  $router.push({
    path: "/user/certification",
  });
}

function goUserOrder() {
  $router.push({
    path: "/user/order",
  });
}

function goUserPatient() {
  $router.push({
    path: "/user/patient",
  });
}

async function logout() {
  await reqLogout();
  userStore.logout();
  $router.push({
    path: "/home",
  });
}
</script>

<style scoped lang="less">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;
  background-color: #55a6fe;
  display: flex;
  justify-content: center;
  .content {
    width: 1200px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      &:hover {
        cursor: pointer;
      }
      img {
        height: 50px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      .help {
        margin-right: 10px;
      }
      .login {
        &:hover {
          cursor: pointer;
        }
      }
      :deep(.el-tooltip__trigger) {
        color: #fff;
        font-size: 16px;
        &:hover {
          cursor: pointer;
        }
        &:focus-visible {
          outline: none;
        }
      }
    }
  }
}
</style>
