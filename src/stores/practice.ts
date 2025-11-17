import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { getPracticeData } from '@/api/practice'

interface questionShow {
    title: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
        _id: string,
    },
    answer: string,
    analysis: string,
    relatedKnowledgePoints: string[],
}

export const usePracticeStore = defineStore('practice', () => {

    const userInfoStore = useUserInfoStore()

    // 维护一个数组，存储当前要渲染的问题
    const questionShow = ref<questionShow[]>([])

    // 初始化
    const initQuestionShow = async () => {
        // 如果当前questionShow为空，从后端获取数据
        console.log('questionShow.value.length', questionShow.value.length)
        if (questionShow.value.length === 0) {
            const { resultData } = await getPracticeData(userInfoStore.userInfo.username || '')
            console.log('resultData', resultData)
            if (resultData) {
                questionShow.value = resultData
            }
        }
    }

    // 当前处在第几个问题
    const currentQuestionIndex = ref(0)

    const updateQuestionShow = (newVal: questionShow) => {
        questionShow.value = [newVal]
    }

    return {
        questionShow,
        updateQuestionShow,
        initQuestionShow,
        currentQuestionIndex
    }
})
