<template>
  <div class="container">
    <HospitalTop />
    <div class="content">
      <router-view></router-view>
    </div>
    <HospitalBottom />
    <Login />
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-flow: column;
  align-items: center;
  .content {
    width: 1200px;
    min-height: 700px;
    margin-top: 70px;
  }
}
</style>

<script setup lang="ts"></script>
