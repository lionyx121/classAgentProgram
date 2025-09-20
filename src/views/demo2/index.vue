<script setup lang="ts">

import { ref } from 'vue'

const isShow = ref(true)

</script>

<template>
  <div class="box" v-show="isShow"></div>
  <button @click="isShow = !isShow">1</button>
</template>

<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>