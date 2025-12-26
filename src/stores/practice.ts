import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { getPracticeData } from '@/api/practice'
import { getRandomNumber } from '@/common/js/utils'
import type { questionShow, KnowledgeItem } from '@/types/practice'

export const usePracticeStore = defineStore('practice', () => {

    const userInfoStore = useUserInfoStore()

    // 维护一个数组，存储当前要渲染的问题
    const questionShow = ref<questionShow[]>([])

    // 是否不是从知识点相关练习页面来的
    const random = ref(true)

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

    // 清空questionShow和currentQuestionIndex和knowledgeList
    const cleanAll = () => {
        questionShow.value = []
        currentQuestionIndex.value = 0
        knowledgeList.value = []
    }

    // 初始化
    const initQuestionShow = async (isRandom: boolean) => {
        cleanAll()
        random.value = isRandom
        if (!isRandom) {
            return
        }
        // 如果当前questionShow为空，从后端获取数据
        if (questionShow.value.length === 0) {
            getPractice()
        }
    }

    // 当前处在第几个问题
    const currentQuestionIndex = ref(0)

    const updateQuestionShow = (newArr: questionShow[]) => {
        questionShow.value = newArr
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
        // 如果random为false 不用请求了
        if (!random.value) return
        if (newIndex === questionShow.value.length - 1 || newIndex === questionShow.value.length) {
            getPractice()
        }
        const current = questionShow.value[newIndex]
        getKnowLedgeList(current)
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
