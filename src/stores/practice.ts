import { ref } from 'vue'
import { defineStore } from 'pinia'

interface questionShow {
    title: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
    },
    answer: string,
    analysis: string,
    relatedKnowledgePoints: string[],
}

export const usePracticeStore = defineStore('practice', () => {
    // 维护一个数组，存储当前要渲染的问题
    const questionShow = ref<[questionShow]>([{
        title: '',
        options: {
            A: '',
            B: '',
            C: '',
            D: '',
        },
        analysis: '',
        answer: '',
        relatedKnowledgePoints: [],
    }])

    const updateQuestionShow = (newVal: questionShow) => {
        questionShow.value = [newVal]
    }

    return {
        questionShow,
        updateQuestionShow
    }
})
