<template>
  <div>
    <span>获取验证码({{ count }}s)</span>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from "vue";

let count = ref(5);
const $emit = defineEmits(['changeFlag'])

let timer = setInterval(() => {
  if (count.value > 1) {
    count.value--;
  } else {
    count.value = 0;
    $emit('changeFlag')
    clearInterval(timer);
  }
}, 1000);
</script>
<style scoped lang="less"></style>
