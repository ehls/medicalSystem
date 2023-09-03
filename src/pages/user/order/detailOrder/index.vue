<template>
  <el-card class="card">
    <template #header>
      <span class="title">挂号详情</span>
    </template>
    <div class="top">
      <el-tag type="success">
        <div class="tag">
          <svg
            t="1693398410276"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4007"
            width="16"
            height="16"
          >
            <path
              d="M422.4 802.133333L128 512l29.866667-29.866667 264.533333 264.533334L908.8 256l29.866667 29.866667L422.4 802.133333z"
              fill="#1afa29"
              p-id="4008"
            ></path>
          </svg>
          <span>{{ orderInfo.orderStatusString }}</span>
        </div>
      </el-tag>
    </div>
    <div class="bottom">
      <div class="left">
        <el-descriptions :column="1" border>
          <el-descriptions-item>
            <template #label> 就诊人信息 </template>
            {{ orderInfo.telephone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 就诊日期 </template>
            {{ orderInfo.date }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 就诊医院 </template>
            {{ orderInfo.hospital }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 就诊科室 </template>
            {{ orderInfo.department }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 医生职称 </template>
            {{ orderInfo.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 医事服务费 </template>
            <div style="color: red">{{ orderInfo.cost }}</div>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 挂号单号 </template>
            {{ orderInfo.id }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label> 挂号时间 </template>
            {{ orderInfo.createdDate }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="buttons">
          <el-popconfirm title="确认取消预约?" @confirm="cancelOrder" v-if="orderInfo.orderStatus === 0 || orderInfo.orderStatus === 1">
            <template #reference>
              <el-button>取消预约</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
      <div class="right">
        <el-card>
          <template #header>
            <div>
              <span>注意事项</span>
            </div>
          </template>
          <p>
            1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
          </p>
          <p style="color: red">
            2.【取号】就诊当天需及时取号，未取号视为爽约，该号不退不换；
          </p>
          <p>3.【退号】在就诊前一天可在线退号 ，逾期将不可办理退号退费；</p>
          <p>
            4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
          </p>
          <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
        </el-card>
      </div>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { reqOrderInfo, reqCancelOrder } from "@/api/user";
import { IOrder } from "@/api/user/types";

let orderInfo = ref<IOrder>({} as IOrder);
let $route = useRoute();
onMounted(async () => {
  let result = await reqOrderInfo(
    $route.query.patientId as string,
    $route.query.orderId as string
  );
  if (result.code === 200) {
    orderInfo.value = result.data;
  }
});
async function cancelOrder(){
  let result = await reqCancelOrder(
    $route.query.patientId as string,
    $route.query.orderId as string
  );
  if (result.code === 200) {
    orderInfo.value = result.data;
  }
}
</script>
<style scoped lang="less">
.card {
  margin: 30px;
  .title {
    font-size: 20px;
  }
  .top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    .tag {
      display: flex;
      align-items: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left {
      flex: 4;
      .buttons {
        margin-top: 20px;
      }
    }
    .right {
      flex: 6;
      margin-left: 30px;
      p {
        line-height: 26px;
      }
    }
  }
}
</style>
