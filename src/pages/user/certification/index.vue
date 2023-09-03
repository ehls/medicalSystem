<template>
  <el-card class="card">
    <template #header>
      <span class="title">实名信息</span>
    </template>
    <el-descriptions v-if="userInfo.username !== ''" :column="1" border>
      <el-descriptions-item label-align="center" :width="50">
        <template #label> 用户姓名 </template>
        {{ userInfo.username }}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="50">
        <template #label> 证件类型 </template>
        {{ userInfo.certificatesType === '10' ?  '身份证' : '户口本'}}
      </el-descriptions-item>
      <el-descriptions-item label-align="center" :width="50">
        <template #label> 证件号码 </template>
        {{ userInfo.certificatesNo }}
      </el-descriptions-item>
    </el-descriptions>
    <div v-else class="formWrap">
      <el-form :model="form" class="form" label-width="80" :rules="rules">
        <el-form-item prop="username" label="用户姓名">
          <el-input placeholder="请输入用户姓名" v-model="form.username" />
        </el-form-item>
        <el-form-item prop="certificatesType" label="证件类型">
          <el-select
            v-model="form.certificatesType"
            placeholder="请选择证件类型"
            style="width: 100%"
          >
            <el-option label="身份证" value="10" />
            <el-option label="户口本" value="20" />
          </el-select>
        </el-form-item>
        <el-form-item prop="certificatesNo" label="证件号码">
          <el-input
            placeholder="请输入证件号码"
            v-model="form.certificatesNo"
          />
        </el-form-item>
        <el-form-item class="userLog">
          <el-button type="primary" @click="postUserCertification">提交</el-button>
          <el-button @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { reqUserInfo, reqUserCertification } from "@/api/user";
import { IUserInfo } from "@/api/user/types";

let form = reactive({
  username: "",
  certificatesType: "",
  certificatesNo: "",
});

let userInfo = ref<IUserInfo>({} as IUserInfo)

let rules = {
  username: [{
    required: true,
    validator: (rule: any, value: string, callback: any) => {
      const reg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
      if(reg.test(value)){
        callback()
      } else{
        callback(new Error('请输入正确的姓名'))
      }
    }
  }],
  certificatesType: [{
    required: true,
    validator: (rule: any, value: string, callback: any) => {
      if(value === '10' || value === '20'){
        callback()
      }else{
        callback(new Error('请选择证件的类型'))
      }
    }
  }],
  certificatesNo: [{
    required: true,
    validator: (rule: any, value: string, callback: any) => {
      let reg1 = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      let reg2 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if(reg1.test(value) || reg2.test(value)){
        callback()
      }else{
        callback(new Error('请输入正确的身份证或者户口本号码'))
      }
    }
  }]
}

function reset(){
  Object.assign(form, {
  username: "",
  certificatesType: "",
  certificatesNo: "",
})
}

async function getUserInfo(){
  let result = await reqUserInfo()
  if(result.code === 200){
    userInfo.value = result.data
  }
}

async function postUserCertification() {
  let result = await reqUserCertification(form)
  if(result.code === 200){
    userInfo.value = result.data
  }
}
onMounted(getUserInfo)
</script>
<style scoped lang="less">
.card {
  margin: 30px;
  .title {
    font-size: 20px;
  }
  .formWrap {
    display: flex;
    justify-content: center;
    .form {
      width: 50%;
    }
  }
}
</style>
