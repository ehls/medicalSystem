<template>
  <el-card class="card">
    <template #header>
      <div class="header">
        <span v-if="$route.query.id === ''">添加就诊人</span>
        <span v-else>修改就诊人</span>
      </div>
    </template>
    <el-divider content-position="left">就诊人信息</el-divider>
    <div class="formWrap">
      <el-form class="form" label-width="80">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请选择证件类型"
            style="width: 100%"
            v-model="userForm.certificatesType"
          >
            <el-option label="身份证" value="10" />
            <el-option label="户口本" value="20" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请输入证件号码"
            v-model="userForm.certificatesNo"
          />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择出生日期"
            v-model="userForm.birthdate"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请输入手机号码"
            v-model="userForm.phone"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-divider content-position="left"
      >建档信息(完善后部分医院首次就诊不排队建档)</el-divider
    >
    <div class="formWrap">
      <el-form class="form" label-width="80">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userForm.isMarry">
            <el-radio :label="0">未婚</el-radio>
            <el-radio :label="1">已婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userForm.isInsure">
            <el-radio :label="0">自费</el-radio>
            <el-radio :label="1">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前住址">
          <el-input placeholder="请输入当前住址" v-model="userForm.address" />
        </el-form-item>
      </el-form>
    </div>
    <el-divider content-position="left">联系人信息(选填)</el-divider>
    <div class="formWrap">
      <el-form class="form" label-width="80">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userForm.contactsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请选择证件类型"
            style="width: 100%"
            v-model="userForm.contactsCertificatesType"
          >
            <el-option label="身份证" value="10" />
            <el-option label="户口本" value="20" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请输入证件号码"
            v-model="userForm.contactsCertificatesNo"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请输入手机号码"
            v-model="userForm.contactsPhone"
          ></el-input>
        </el-form-item>
        <el-form-item class="userLog">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reqPatient, reqSubmitPatient } from "@/api/user";
import { IPatient } from "@/api/user/types";
import { ElMessage } from "element-plus";

let $route = useRoute();
let $router = useRouter();
let userForm = ref<IPatient>({} as IPatient);
onMounted(async () => {
  if ($route.query.id !== "") {
    let result = await reqPatient($route.query.id as string);
    if (result.code === 200) {
      userForm.value = result.data;
    }
  }
});
async function submit() {
  userForm.value.isDeleted = 0;
  userForm.value.certificatesTypeString =
    userForm.value.certificatesType === "10" ? "身份证" : "户口本";
  try {
    await reqSubmitPatient(userForm.value);
    ElMessage({
      type: "success",
      message: "设置用户成功",
    });
    $router.back()
  } catch (error) {
    ElMessage({
      type: "error",
      message: "设置用户失败",
    });
  }
}
function reset() {
  userForm.value = {} as IPatient
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
  .formWrap {
    display: flex;
    justify-content: center;
    .form {
      width: 50%;
    }
  }
}
</style>
