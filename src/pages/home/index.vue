<template>
  <Carousel />
  <Search />
  <el-row :gutter="20">
    <el-col :span="20">
      <Choose />
      <div class="cards">
        <Card
          class="item"
          v-for="item in homeStore.pageHospitals"
          :key="item.id"
          :hospitalInfo="item"
        />
      </div>
      <el-empty
        v-if="homeStore.pageHospitals.length === 0"
        description="暂无数据"
      ></el-empty>
      <div class="pagination">
        <el-pagination
          v-model:current-page="homeStore.pageNum"
          v-model:page-size="homeStore.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="homeStore.computedHospitals.length"
        />
      </div>
    </el-col>
    <el-col :span="4">
      <Tip />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { reqHospital } from "@/api/home";
import { useHomeStore } from "@/store/home";
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Choose from "./choose/index.vue";
import Card from "./card/index.vue";
import Tip from './tip/index.vue'

const homeStore = useHomeStore();

onMounted(async () => {
  homeStore.setAllHospitals(await reqHospital());
});
</script>
<style scoped lang="less">
.cards {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0;
  }
}
.pagination {
  margin-bottom: 10px;
}
</style>
@/api/hospital@/api/home
@/store/home