<template>
  <div class="wrap">
    <div class="top">
      <div class="hosname">
        {{ hospitalBookingScheduleRule.baseMap?.hosname }}
      </div>
      <div class="line"></div>
      <div class="departments">
        {{ hospitalBookingScheduleRule.baseMap?.bigname }}
      </div>
      <div class="dot">·</div>
      <div class="department">
        {{ hospitalBookingScheduleRule.baseMap?.depname }}
      </div>
    </div>
    <div class="center">
      <span class="time"
        >{{ currentScheduleRules?.at(0).workDate.split("-")[0] }}年{{
          currentScheduleRules?.at(0).workDateMd.split("月")[0]
        }}月</span
      >
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in currentScheduleRules"
          :key="index"
          :class="{
            free: item.status === 0 && item.availableNumber !== -1,
            current: item.workDate === currentWorkDate,
          }"
          @click="changeTime(item.workDate)"
        >
          <div
            class="containTop"
            :class="{ free: item.status === 0 && item.availableNumber !== -1 }"
          >
            {{ item.workDate }}-{{ item.dayOfWeek }}
          </div>
          <div class="containBottom">
            <div v-if="item.status === -1">停止挂号</div>
            <div v-else-if="item.status === 0 && item.availableNumber === -1">
              无号
            </div>
            <div v-else>有号({{ item.availableNumber }})</div>
          </div>
        </div>
      </div>
      <el-pagination
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :total="hospitalBookingScheduleRule.bookingScheduleList?.length || 0"
      ></el-pagination>
    </div>
    <div class="bottom">
      <div class="doctor">
        <div class="morning">
          <div class="tip">
            <svg
              t="1693213079921"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6225"
              width="32"
              height="32"
            >
              <path
                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                fill="#8bceea"
                p-id="6226"
              ></path>
            </svg>
            <span>上午号源</span>
          </div>
          <div class="docInfo" v-for="item in morningDoctor">
            <div class="left">
              <div class="docLevel">
                <span>{{ item.title }}</span>
                <span>|</span>
                <span>{{ item.docname }}</span>
              </div>
              <div class="docSkill">{{ item.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ item.amount }}</div>
              <el-button type="primary" @click="goStep2(item.id)"
                >剩余{{ item.availableNumber }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="afternoon">
          <div class="tip">
            <svg
              t="1693215097690"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="12350"
              width="32"
              height="32"
            >
              <path
                d="M244.9 601c12.3 0 22.3-10 22.3-22.3 0-135 109.8-244.9 244.9-244.9S757 443.6 757 578.7c0 12.3 10 22.3 22.3 22.3s22.3-10 22.3-22.3c0-159.6-129.8-289.4-289.4-289.4S222.6 419.2 222.6 578.8c0 12.3 10 22.2 22.3 22.2zM512 244.9c12.3 0 22.3-10 22.3-22.3V89c0-12.3-10-22.3-22.3-22.3s-22.3 10-22.3 22.3v133.6c0 12.3 10 22.3 22.3 22.3zM763.9 349.2c5.7 0 11.4-2.2 15.7-6.5l94.4-94.4c8.7-8.7 8.7-22.8 0-31.5s-22.8-8.7-31.5 0l-94.4 94.4c-8.7 8.7-8.7 22.8 0 31.5 4.4 4.3 10.1 6.5 15.8 6.5zM1001.7 556.5H868.2c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h133.6c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3zM178.1 578.8c0-12.3-10-22.3-22.3-22.3H22.3C10 556.5 0 566.5 0 578.8S10 601 22.3 601h133.6c12.2 0 22.2-9.9 22.2-22.2zM244.4 342.7c4.3 4.3 10 6.5 15.7 6.5s11.4-2.2 15.7-6.5c8.7-8.7 8.7-22.8 0-31.5l-94.4-94.4c-8.7-8.7-22.8-8.7-31.5 0s-8.7 22.8 0 31.5l94.5 94.4zM935 734.6H89c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h846c12.3 0 22.3-10 22.3-22.3s-10-22.3-22.3-22.3zM779.1 912.7H244.9c-12.3 0-22.3 10-22.3 22.3s10 22.3 22.3 22.3h534.3c12.3 0 22.3-10 22.3-22.3s-10.1-22.3-22.4-22.3z"
                fill="#8bceea"
                p-id="12351"
              ></path>
            </svg>
            <span>下午号源</span>
          </div>
          <div class="docInfo" v-for="item in afternoonDoctor">
            <div class="left">
              <div class="docLevel">
                <span>{{ item.title }}</span>
                <span>|</span>
                <span>{{ item.docname }}</span>
              </div>
              <div class="docSkill">{{ item.skill }}</div>
            </div>
            <div class="right">
              <div class="money">￥{{ item.amount }}</div>
              <el-button type="primary" @click="goStep2(item.id)"
                >剩余{{ item.availableNumber }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  reqHospitalBookingScheduleRule,
  reqHospitalDoctor,
} from "@/api/hospital";
import { IBookingScheduleRule, IDoctor } from "@/api/hospital/types";
import { useRouter, useRoute } from "vue-router";

let $router = useRouter();
let $route = useRoute();
let currentPage = ref(1);
let hospitalBookingScheduleRule = ref<IBookingScheduleRule>(
  {} as IBookingScheduleRule
);
let doctorInformation = ref<IDoctor[]>([] as IDoctor[]);
let currentScheduleRules = computed(() => {
  let startIndex = (currentPage.value - 1) * 6;
  let endIndex = Math.min(
    currentPage.value * 6,
    hospitalBookingScheduleRule.value.bookingScheduleList?.length || 0
  );
  return hospitalBookingScheduleRule.value.bookingScheduleList?.slice(
    startIndex,
    endIndex
  );
});
let morningDoctor = computed(() => {
  return doctorInformation.value.filter((item) => {
    if (item.workTime === 0) {
      return true;
    }
  });
});
let afternoonDoctor = computed(() => {
  return doctorInformation.value.filter((item) => {
    if (item.workTime === 1) {
      return true;
    }
  });
});

let currentWorkDate = ref("");

onMounted(async () => {
  hospitalBookingScheduleRule.value = await reqHospitalBookingScheduleRule(
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  currentWorkDate.value =
    hospitalBookingScheduleRule.value.bookingScheduleList[0].workDate;
  doctorInformation.value = await reqHospitalDoctor(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    currentWorkDate.value
  );
});

async function changeTime(workDate: string) {
  currentWorkDate.value = workDate;
  doctorInformation.value = await reqHospitalDoctor(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    workDate
  );
}

function goStep2(id: string) {
  $router.push({
    path: "/hospital/register_step_2",
    query: {
      hoscode: $route.query.hoscode,
      depcode: $route.query.depcode,
      doctorId: id,
    },
  });
}
</script>
<style lang="less" scoped>
.wrap {
  color: #7f7f7f;
  .top {
    display: flex;
    margin-top: 65px;
    margin-left: 15px;
    .line {
      width: 1px;
      background-color: #7f7f7f;
      margin: 0 10px;
    }
    .dot {
      margin: 0 10px;
    }
  }
  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    .time {
      font-weight: bold;
      height: 40px;
      line-height: 40px;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin: 20px;
      .item {
        flex: none;
        border: 2px solid #cbcbcb;
        margin: 0 5px;
        width: 139px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.5s;
        &.free {
          border: 2px solid skyblue;
        }
        &.current {
          transform: scale(1.1);
        }
        .containTop {
          height: 30px;
          background-color: #cbcbcb;
          width: 100%;
          text-align: center;
          line-height: 30px;
          &.free {
            background-color: #e8f2ff;
          }
        }
        .containBottom {
          height: 60px;
          width: 100%;
          text-align: center;
          line-height: 60px;
        }
      }
    }
  }

  .bottom {
    .doctor {
      .morning,
      .afternoon {
        .tip {
          margin-left: 5px;
          display: flex;
          align-items: center;
          span {
            color: #7f7f7f;
            margin-left: 5px;
            font-weight: bold;
            font-size: 16px;
          }
        }
        .docInfo {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          border-bottom: 1px solid #ccc;
          .left {
            .docLevel {
              color: skyblue;
              span {
                margin: 0 5px;
                font-size: 15px;
                margin: 10px 5px;
              }
            }
            .docSkill {
              margin: 10px 5px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            .money {
              margin-right: 30px;
            }
            button {
            }
          }
        }
      }
      .afternoon {
        margin-top: 10px;
      }
    }
  }
}
</style>
