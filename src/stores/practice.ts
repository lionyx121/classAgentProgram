import { ref, watch } from 'vue'
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
    userSelect: string,
    key: string,
    DifficultyLevel: Number,
    similarity: any
}

export const usePracticeStore = defineStore('practice', () => {

    const userInfoStore = useUserInfoStore()

    // 维护一个数组，存储当前要渲染的问题
    const questionShow = ref<questionShow[]>([])

    // 从后端获取题目
    const getPractice = async () => {
        const { resultData } = await getPracticeData(userInfoStore.userInfo.username || '')
        if (resultData) {
            // questionShow.value.push(...resultData)
            const temp = [...questionShow.value, ...resultData]
            // 去重
            const unique: questionShow[] = Object.values(
                temp.reduce((acc, cur) => {
                    acc[cur._id] = cur
                    return acc
                }, {})
            )
            questionShow.value = unique
        }
    }

    // 初始化
    const initQuestionShow = async () => {
        // 如果当前questionShow为空，从后端获取数据
        if (questionShow.value.length === 0) {
            getPractice()
        }
    }

    // 当前处在第几个问题
    const currentQuestionIndex = ref(0)

    const updateQuestionShow = (newVal: questionShow) => {
        questionShow.value = [newVal]
    }

    // 当用户点击了选项之后，更新questionShow去记录用户的选择
    const updateUserSelect = (select: string) => {
        questionShow.value[currentQuestionIndex.value].userSelect = select
    }

    // 监听currentQuestionIndex 当currentQuestionIndex处在questionShow.value.length - 1的时候我们需要向后端请求新的题目
    watch(() => currentQuestionIndex.value, (newIndex, oldIndex) => {
        if (newIndex === questionShow.value.length - 1 || newIndex === questionShow.value.length) {
            getPractice()
        }
    })

    return {
        questionShow,
        updateQuestionShow,
        initQuestionShow,
        currentQuestionIndex,
        updateUserSelect
    }
})
