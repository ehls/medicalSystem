<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院的名称"
      v-model="hospitalName"
      :fetch-suggestions="searchHospital"
      :trigger-on-focus="false"
      @select="goDetail"
    />
    <el-button type="primary" :icon="Search"></el-button>
  </div>
</template>
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useHomeStore } from "@/store/home";
import { useRouter } from "vue-router";

const homeStore = useHomeStore();
let hospitalName = ref("");
let $router = useRouter()

function searchHospital(keyword: string, cb: any){
  let targetHospital = homeStore.allHospitals.filter((item) => {
    return item.hosname.includes(keyword)
  })
  let showData = targetHospital.map((hospital) => {
    return {value: hospital.hosname, hoscode: hospital.hoscode}
  })
  cb(showData)
}

function goDetail(item: any){
  $router.push({
    path: '/hospital',
    query: {
      hoscode: item.hoscode
    }
  })
}
</script>
<style scoped lang="less">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  :deep(.el-input__wrapper) {
    width: 300px;
    margin-right: 10px;
    height: 40px;
  }
  :deep(.el-button) {
    height: 40px;
  }
}
</style>
@/store/home