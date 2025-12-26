<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHistoryTrailStore } from '@/stores/historyTrail';
import type { trailItem } from '@/types/historyTrail'

const route = useRoute()
const router = useRouter()

const historyTrailStore = useHistoryTrailStore()

// 要存的东西其实就三个 一个meta里面的文字 一个拼接的完整的路径 一个没有拼接query的路径
watch(() => route.path, (newPath) => {
    // 拼接我们要传入historyTrailStore的数据
    const temp: trailItem = {
        title: (route.meta.title as string) || '',
        fullPath: route.fullPath,
        path: route.path
    }
    historyTrailStore.updataHistoryTrailList(temp)
}, { immediate: true })


const onRouteChange = (item: trailItem) => {
    router.push(item.fullPath)
}

const deleteHistory = (item: trailItem) => {
    historyTrailStore.deleteHistoryTrailItem(item)
    // 如果当前的页面和historyTrailStore.historyTrailList末尾项的fullpath不一样跳转
    const targetFullPath = historyTrailStore.historyTrailList[historyTrailStore.historyTrailList.length - 1].fullPath
    if (route.fullPath !== targetFullPath) {
        router.push(targetFullPath)
    }
}
</script>

<template>
    <div class="layout">
        <div class="layout-item" v-for="(item, index) in historyTrailStore.historyTrailList" :key="item.title">
            <div class="content" :class="{ 'is-active': route.path === item.path }" @click="onRouteChange(item)">
                <span>{{ item.title }}</span>
                <el-icon size="10" v-if="index !== 0" @click.stop="deleteHistory(item)">
                    <Close />
                </el-icon>
            </div>

            <el-icon color="#fff" size="15" v-if="index < historyTrailStore.historyTrailList.length - 1">
                <CaretRight />
            </el-icon>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: 100%;
    display: flex;
    align-items: center;

    .layout-item {
        height: 100%;
        display: flex;
        align-items: center;

        .content {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 8px;
            padding: 0 15px;
            color: #fff;
            font-weight: 600;
            font-size: 12px;
            border-radius: 8px;
            border: 1px solid #425066;
            margin: 0 8px;
            cursor: pointer;

            /* ✨ 关键：过渡 */
            transition:
                background-color 0.2s ease,
                border-color 0.2s ease,
                box-shadow 0.2s ease,
                transform 0.15s ease;
        }

        /* hover 态 */
        .content:hover {
            background-color: rgba(59, 130, 246, 0.12);
            /* 冷色轻浮层 */
            border-color: #3B82F6;
            /* 提示可交互 */
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.25);
            transform: translateY(-1px);
            /* 轻微“抬起感” */
        }

        .is-active {
            background-color: rgba(59, 130, 246, 0.24);
            border-color: #3B82F6;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.35);
        }
    }

}
</style>