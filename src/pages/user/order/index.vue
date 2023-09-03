<template>
    <div v-if="$route.query.orderId">
        <DetailOrder />
    </div>
    <div v-else>
        <AllOrders />
    </div>
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import DetailOrder from './detailOrder/index.vue'
import AllOrders from './allOrders/index.vue'

let $route = useRoute();
</script>
<style scoped lang="less">

</style>
