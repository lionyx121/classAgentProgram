// 存放路由记录的仓库
import { ref, watch, nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { trailItem } from '@/types/historyTrail'

export const useHistoryTrailStore = defineStore('historyTrail', () => {
    const historyTrailList = ref<trailItem[]>([{
        title: '新对话',
        fullPath: '/main',
        path: '/main'
    }])

    const updataHistoryTrailList = (trailItem: trailItem) => {
        const { title, fullPath, path } = trailItem

        // 判断是否有title 或者是新对话
        if (!title || title === '新对话') return

        // 检查historyTrailList中是否有path
        const target = historyTrailList.value.find(item => item.path === path)
        // 如果没有我们直接把这个数据加入
        if (!target) {
            historyTrailList.value.push(trailItem)
        } else {
            // 否则我们需要检查二者的fullpath是否相同 相同不用管 否则我们先删除target 然后在加入trailItem
            if (target.fullPath !== fullPath) {
                const index = historyTrailList.value.indexOf(target)
                historyTrailList.value.splice(index, 1)
                historyTrailList.value.push(trailItem)
            }
        }
    }

    const deleteHistoryTrailItem = (item: trailItem) => {
        const index = historyTrailList.value.indexOf(item)
        historyTrailList.value.splice(index, 1)
    }

    return {
        historyTrailList,
        updataHistoryTrailList,
        deleteHistoryTrailItem
    }
})
