<template>
    <div class="query">
      <div class="title">
        {{ hospitalStore.hospitalInfo.hospital?.hosname }}查询取消信息
      </div>
      <el-empty description="暂无信息"></el-empty>
    </div>
  </template>
  <script lang="ts" setup>
  import { useHospitalStore } from "@/store/hospital";
  
  let hospitalStore = useHospitalStore();
  </script>
  <style scoped lang="less">
  .query {
    padding-left: 30px;
    .title {
      font-size: 20px;
      text-align: center;
      margin-top: 60px;
    }
  }
  </style>
  