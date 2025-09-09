<script setup lang="ts">
import homeHeader from './components/homeHeader.vue';
import homeBottom from './components/homeBottom.vue';
import { onMounted, watch } from 'vue';
import { useSSE } from '@/common/js/useSSE';
import { AGENTSERVERURL } from '@/common/env'
import { onSendDataToChat } from '@/api/chat';

const SSEURL = AGENTSERVERURL + 'api/chat'
const { start, stop, messages, status } = useSSE()

// onMounted(async () =>{
//     await onSendDataToChat('冯晨的邮箱是多少')
//     start(SSEURL)
// })

// watch(messages, () =>{
//     console.log(messages.value)
// })
</script>

<template>
    <!-- 顶部 -->
    <homeHeader></homeHeader>
    <!-- 中间 -->
    <!-- 底部 -->
    <homeBottom></homeBottom>
</template>

<style scoped lang="scss"></style>