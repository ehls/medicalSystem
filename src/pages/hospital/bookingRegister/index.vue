<template>
  <div class="register">
    <div class="top">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}
      </div>
      <div class="level">
        <svg
          t="1692687250329"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1598"
          width="16"
          height="16"
        >
          <path
            d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z"
            p-id="1599"
          ></path>
        </svg>
        <span>{{
          hospitalStore.hospitalInfo.hospital?.param.hostypeString
        }}</span>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <img
          :src="`data:image/jpeg;base64,${hospitalStore.hospitalInfo.hospital?.logoData}`"
          alt=""
        />
      </div>
      <div class="right">
        <div class="register">挂号规则</div>
        <div class="time">
          预约周期: {{ hospitalStore.hospitalInfo.bookingRule?.cycle }}天
          放号时间:
          {{ hospitalStore.hospitalInfo.bookingRule?.releaseTime }} 停挂时间:
          {{ hospitalStore.hospitalInfo.bookingRule?.stopTime }}
        </div>
        <div class="address">
          具体地址: {{ hospitalStore.hospitalInfo.hospital?.param.fullAddress }}
        </div>
        <div class="route">
          规划路线: {{ hospitalStore.hospitalInfo.hospital?.route }}
        </div>
        <div class="quit">
          退号时间: 就诊前一工作日
          {{ hospitalStore.hospitalInfo.bookingRule?.quitTime }} 前取消
        </div>
        <div class="book">医院预约规则</div>
        <div
          class="rule"
          v-for="(item, index) in hospitalStore.hospitalInfo.bookingRule?.rule"
          :key="index"
        >
          {{ index + 1 }}. {{ item }}
        </div>
      </div>
    </div>
    <div class="departments" ref="$departments">
      <div class="leftNav">
        <ul>
          <li
            :class="{ active: index === showIndex }"
            v-for="(departments, index) in hospitalStore.departments"
            :key="departments.depcode"
            @click="changeIndex(index)"
          >
            {{ departments.depname }}
          </li>
        </ul>
      </div>
      <div class="department">
        <div
          class="showDepartment"
          v-for="departments in hospitalStore.departments"
          :key="departments.depcode"
        >
          <div class="title">{{ departments.depname }}</div>
          <ul>
            <li
              @click="loginOrHospital(item.depcode)"
              v-for="item in departments.children"
              :key="item.depcode"
            >
              {{ item?.depname }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useHospitalStore } from "@/store/hospital";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

let hospitalStore = useHospitalStore();
let $router = useRouter();
let $route = useRoute();
const $departments = ref<HTMLDivElement>();
let showIndex = ref(0);
onMounted(async () => {
  resize();
});

function resize() {
  if ($departments.value) {
    $departments.value.style.height =
      document.documentElement.clientHeight - 458 + "px";
  }
}

function changeIndex(index: number) {
  showIndex.value = index;
  let depTitle = document.querySelectorAll(".departments .title");
  depTitle[index].scrollIntoView({
    behavior: "smooth",
  });
}

function loginOrHospital(depcode: string) {
  $router.push({
    path: '/hospital/register_step_1',
    query: {
      hoscode: $route.query.hoscode,
      depcode
    }
  });
}
</script>
<style scoped lang="less">
.register {
  .top {
    display: flex;
    margin-left: 20px;
    margin-top: 50px;
    .title {
      font-size: 20px;
    }
    .level {
      color: #7f7f7f;
      margin-left: 10px;
      display: flex;
      align-items: center;
      span {
        margin-left: 4px;
      }
    }
  }
  .content {
    display: flex;
    padding: 10px;
    .left {
      width: 80px;
      margin-right: 20px;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      color: #7f7f7f;
      .register,
      .book {
        margin-top: 20px;
        color: black;
        margin-bottom: 5px;
      }
    }
  }
  .departments {
    width: 100%;
    display: flex;
    margin-top: 20px;
    min-height: 300px;
    .leftNav {
      width: 80px;
      margin-left: 10px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      ul {
        display: flex;
        flex-direction: column;
        li {
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: rgb(248, 248, 248);
          color: #7f7f7f;
          &.active {
            border-left: 1px solid red;
            color: red;
            background-color: white;
          }
        }
      }
    }
    .department {
      flex: 1;
      margin-left: 20px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .showDepartment {
        .title {
          background-color: rgb(248, 248, 248);
          color: #7f7f7f;
          padding: 5px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            width: 32%;
            color: #7f7f7f;
            padding: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
