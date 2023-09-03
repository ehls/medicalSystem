<template>
    <el-carousel height="487.5px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../assets/images/banner.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
</template>
<script lang="ts" setup>
</script>
<style scoped lang="less">
    img{
        width: 100%;
    }
</style>