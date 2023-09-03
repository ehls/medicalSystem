<template>
  <div class="wrap">
    <h1>医院</h1>
    <div class="level">
      <div class="left">等级:</div>
      <ul class="choice">
        <li
          :class="{ active: homeStore.hostype === '-1' }"
          @click="homeStore.hostype = '-1'"
        >
          全部
        </li>
        <li
          v-for="item in homeStore.hospitalLevels"
          :key="item.id"
          :class="{ active: homeStore.hostype === item.value }"
          @click="homeStore.hostype = item.value"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="region">
      <div class="left">地区:</div>
      <ul class="choice">
        <li
          :class="{ active: homeStore.districtCode === '-1' }"
          @click="homeStore.districtCode = '-1'"
        >
          全部
        </li>
        <li
          v-for="item in homeStore.hospitalLocations"
          :key="item.id"
          :class="{ active: homeStore.districtCode === item.value }"
          @click="homeStore.districtCode = item.value"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { reqHospitalLevel, reqHospitalLocation } from "@/api/home";
import { useHomeStore } from "@/store/home";

const homeStore = useHomeStore();
onMounted(async () => {
  homeStore.setHospitalLevels(await reqHospitalLevel());
  homeStore.setHospitalLocations(await reqHospitalLocation());
});
</script>
<style scoped lang="less">
.wrap {
  color: #7f7f7f;
  h1 {
    font-weight: bold;
    margin: 10px 0;
  }
  .level,
  .region {
    display: flex;
    .left {
      margin-right: 20px;
      width: 40px;
      flex-shrink: 0;
    }
    .choice {
      display: flex;
      flex-flow: wrap;
      li {
        margin-right: 20px;
        &.active {
          color: #55a6fe;
        }
        &:hover {
          color: #55a6fe;
          cursor: pointer;
        }
      }
    }
  }
  .region {
    margin-top: 10px;
  }
}
</style>
@/store/home