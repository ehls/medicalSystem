<template>
  <div class="visitor">
    <div class="top">
      <div class="left">
        <span class="insurance">{{ patient.isInsure ? "医保" : "自费" }}</span>
        <span class="username">{{ patient.name }}</span>
      </div>
      <div class="right">
        <el-button
          type="primary"
          :icon="Edit"
          circle
          @click="editUser(patient.id)"
        />
        <el-popconfirm
          :title="`你确定要删除${patient.name}吗?`"
          width="200px"
          @confirm="removeUser(patient.id)"
        >
          <template #reference>
            <el-button type="danger" :icon="Delete" circle v-show="hasDelete" />
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <div class="info">
        <div class="infoLeft">证件类型:</div>
        <div class="infoRight">{{ patient.certificatesTypeString }}</div>
      </div>
      <div class="info">
        <div class="infoLeft">证件号码:</div>
        <div class="infoRight">{{ patient.certificatesNo }}</div>
      </div>
      <div class="info">
        <div class="infoLeft">用户性别:</div>
        <div class="infoRight">{{ patient.sex === 1 ? "男" : "女" }}</div>
      </div>
      <div class="info">
        <div class="infoLeft">出生日期:</div>
        <div class="infoRight">{{ patient.birthdate }}</div>
      </div>
      <div class="info">
        <div class="infoLeft">手机号码:</div>
        <div class="infoRight">{{ patient.phone }}</div>
      </div>
      <div class="info">
        <div class="infoLeft">婚姻状况:</div>
        <div class="infoRight">
          {{ patient.isMarry === 1 ? "已婚" : "未婚" }}
        </div>
      </div>
      <div class="info">
        <div class="infoLeft">当前住址:</div>
        <div class="infoRight">{{ patient.address }}</div>
      </div>
      <transition name="confirm">
        <div class="confirm" v-show="isSelected">已选择</div>
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { reqRemovePatient } from "@/api/user/index";
import { ElMessage } from "element-plus";

const $emit = defineEmits(["refreshUsers"]);
let $router = useRouter();
defineProps(["patient", "isSelected", "hasDelete"]);
function editUser(id: string) {
  $router.push({
    path: "/user/patient",
    query: {
      id: id,
    },
  });
}

async function removeUser(id: string) {
  await reqRemovePatient(id);
  ElMessage({
    type: "success",
    message: "删除成功",
  });
  $emit('refreshUsers')
}
</script>
<style lang="less" scoped>
.visitor {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  .top {
    height: 60px;
    background-color: #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .left {
      .insurance {
        background-color: white;
        padding: 5px;
        font-size: 12px;
      }
      .username {
        color: #7f7f7f;
        padding: 5px;
      }
    }
  }
  .bottom {
    padding: 20px;
    position: relative;
    .info {
      line-height: 30px;
      display: flex;
      .infoLeft {
        width: 80px;
      }
      .infoRight {
      }
    }
    .confirm {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 200px;
      height: 200px;
      margin: auto;
      color: red;
      border-radius: 50%;
      border: 1px dashed red;
      text-align: center;
      vertical-align: middle;
      line-height: 200px;
      opacity: 0.3;
      transform: rotate(35deg);
      font-size: 20px;
    }
  }
  .confirm-enter-from {
    transform: scale(1);
  }
  .confirm-enter-active {
    transition: all 0.3s;
  }
  .confirm-enter-to {
    transform: scale(1.2);
  }
}
</style>
