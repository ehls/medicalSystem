<template>
  <AllPatients v-if="Object.keys($route.query).length === 0"/>
  <EditPatient v-else/>
</template>
<script lang="ts" setup>
import AllPatients from './allPatients.vue'
import EditPatient from './editPatient.vue'
import { useRoute } from "vue-router";

let $route = useRoute();
console.log();

</script>
<style scoped lang="less">

</style>
