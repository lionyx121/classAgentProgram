import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { getPracticeData } from '@/api/practice'
import { getRandomNumber } from '@/common/js/utils'

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

interface KnowledgeItem {
    type: string,
    label: string,
    key: string
}

export const usePracticeStore = defineStore('practice', () => {

    const userInfoStore = useUserInfoStore()

    // 维护一个数组，存储当前要渲染的问题
    const questionShow = ref<questionShow[]>([])

    // 从后端获取题目
    const getPractice = async () => {
        const { resultData } = await getPracticeData(userInfoStore.userInfo.username || '')
        console.log('resultData', resultData)
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

    // 相关知识点的数组
    const knowledgeList = ref<KnowledgeItem[]>([])

    const typeList = ['primary', 'success', 'info', 'warning', 'danger']

    const getKnowLedgeList = (current: any) => {
        const similarityList = current.similarity.slice(0, 5)
        const tempList: KnowledgeItem[] = []
        similarityList.forEach((item: any) => {
            const randomType = typeList[getRandomNumber(0, typeList.length - 1)]
            tempList.push({
                type: randomType,
                label: item.id,
                key: item.key
            })
        })
        knowledgeList.value = tempList
        console.log('knowledgeList', knowledgeList.value)
    }

    // 当用户点击了选项之后，更新questionShow去记录用户的选择
    const updateUserSelect = (select: string) => {
        questionShow.value[currentQuestionIndex.value].userSelect = select

        // 更新knowledgeList 相关知识点的数组
        const current = questionShow.value[currentQuestionIndex.value]
        getKnowLedgeList(current)
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
        updateUserSelect,
        knowledgeList
    }
})
