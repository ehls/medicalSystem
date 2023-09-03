<template>
  <div class="loginContainer">
    <el-dialog v-model="userStore.visible" title="用户登录" @close="close">
      <div class="line"></div>
      <div class="content">
        <el-form :model="form" class="form" :rules="rules" ref="formEle">
          <el-form-item prop="telephone">
            <el-input
              :prefix-icon="User"
              placeholder="请输入手机号码"
              v-model="form.telephone"
            />
          </el-form-item>
          <el-form-item prop="verification">
            <el-input
              :prefix-icon="Lock"
              placeholder="请输入手机验证码"
              v-model="form.verification"
              :disabled="firstTime"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="getVerification" :disabled="!isPhone || !flag">
              <span v-if="flag">获取验证码</span>
              <CountDown v-else @changeFlag="flag = true" />
            </el-button>
          </el-form-item>
          <el-form-item class="userLog">
            <el-button
              type="primary"
              @click="userLogin"
              :disabled="!isPhone || !(/^\d{6}$/.test(form.verification))"
              >用户登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="line"></div>
      <template v-slot:footer>
        <el-button type="primary" @click="close">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store/user";
import { ref, reactive, computed } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { reqVerification, reqLogin } from "@/api/user";
import { ElMessage } from "element-plus";
import CountDown from "@/components/countDown/index.vue";
import { useRouter, useRoute } from "vue-router";

let userStore = useUserStore();
let $router = useRouter();
let $route = useRoute();
let form = reactive({
  telephone: "",
  verification: "",
});
let reg =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
let isPhone = computed(() => {
  return reg.test(form.telephone);
});
let firstTime = ref(true);
let flag = ref(true);
const rules = {
  telephone: [
    {
      required: true,
      trigger: "change",
      validator: (rule: any, value: string, callback: any) => {
        if(reg.test(value)){
          callback()
        } else {
          callback(new Error('请输入正确的手机号码格式'))
        }
      },
    },
  ],
  verification: [
    {
      required: true,
      trigger: "change",
      validator: (rule: any, value: string, callback: any) => {
        if(/^\d{6}$/.test(value)){
          callback()
        } else {
          callback(new Error('请输入正确的验证码格式'))
        }
      },
    },
  ],
};
let formEle = ref()

async function getVerification() {
  try {
    flag.value = false;
    firstTime.value = false;
    form.verification = (await reqVerification(form.telephone)).verification;
  } catch (e) {
    ElMessage({
      type: "error",
      message: (e as Error).message,
    });
  }
}

async function userLogin() {
  let logResult = await reqLogin(form.telephone, form.verification);
  if ((logResult.code = 200)) {
    userStore.visible = false;
    userStore.telephone = form.telephone;
    form.telephone = "";
    form.verification = "";
    formEle.value.resetFields()
    if($route.query.redirect){
      $router.push($route.query.redirect as string)
    }
  } else {
    ElMessage({
      type: "error",
      message: "账号或验证码错误",
    });
  }
}

function close(){
  userStore.visible = false;
  formEle.value.resetFields()
}
</script>
<style scoped lang="less">
.loginContainer {
  :deep(.el-dialog) {
    width: 450px;
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  .line {
    width: 100%;
    height: 0px;
    border: 1px solid #ccc;
  }
  .content {
    .form {
      border: 1px solid #ccc;
      padding: 20px;
      margin: 20px;
      border-radius: 5px;
      .userLog {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
