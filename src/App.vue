<script setup lang="ts">
import { onMounted } from 'vue';
import { isLogin } from './common/js/isLogin';

onMounted(() => {
  // 判断用户是否登录
  isLogin()
})

</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
