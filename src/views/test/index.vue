<script setup lang="ts">
import { showSuccessToast, showToast } from 'vant';

const onToast = () =>{
    showToast('提示内容');
}
</script>

<template>
    <div>Nihao</div>
    <button @click="onToast">测试</button>
</template>