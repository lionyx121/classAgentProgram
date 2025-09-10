import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ChatItem } from '@/types/chat'

export const useChatStore = defineStore('chat', () => {
    // 维护一个数组去储存用户的聊天记录
    const questions = ref<ChatItem[]>([])
    const addHistory = (item: ChatItem) => {
        questions.value.push(item)
    }
    return {
        questions,
        addHistory
    }
})
