import { ref, watch, nextTick } from 'vue'
import { defineStore } from 'pinia'
import type { ChatItem } from '@/types/chat'
import { getChatHistory } from '@/api/chat'
import { useUserInfoStore } from './userInfo'

export const useChatStore = defineStore('chat', () => {
    // 维护一个数组去储存用户的聊天记录
    const questions = ref<ChatItem[]>([])
    // 维护一个数组去储存similarity
    const similarities = ref<any[]>([])
    // 用户聊天的历史记录
    const historyList = ref<any[]>([])
    // 当前选中的历史记录是哪一个 如果没有的话就是-1
    const activeIndex = ref(-1)

    const userInfoStore = useUserInfoStore()

    const addHistory = (item: ChatItem) => {
        questions.value.push(item)
    }

    const updateSimilarity = (arr: any[]) => {
        similarities.value = arr
    }

    // 更新聊天历史记录
    const updataChatHistory = async () => {
        if (!userInfoStore.userInfo.username) {
            console.warn('当前用户没有登录')
            return
        }
        const res = await getChatHistory({ username: userInfoStore.userInfo.username })
        historyList.value = res.data.reverse()
    }

    // 用户点击其他聊天记录时，更新questions
    const updateQuestions = async (_id: string) => {
        const target = historyList.value.find(item => item._id === _id)
        questions.value = target.chatHistory
        await nextTick() // 等待 DOM 更新
        const layout = document.querySelector(".main") as HTMLElement
        console.log(layout)
        if (layout) {
            layout.scrollTop = layout.scrollHeight
        }
    }

    // 用户点击新聊天时，清空questions
    const clearQuestions = () => {
        questions.value = []
        activeIndex.value = -1
    }

    // 去监听questions的变化，更新activeIndex
    watch(() => questions, () => {
        if (questions.value.length === 0) return
        const target = questions.value[0].createTime
        activeIndex.value = historyList.value.findIndex(item => item.chatHistory[0].createTime === target)
    }, { deep: true })

    return {
        questions,
        similarities,
        historyList,
        addHistory,
        updateSimilarity,
        updataChatHistory,
        activeIndex,
        updateQuestions,
        clearQuestions
    }
})
