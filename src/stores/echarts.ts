import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useEchartsStore = defineStore('echarts', () => {
    const echatNode = ref<any>(JSON.parse(localStorage.getItem('echatNode') || 'null'))
    const echartsLabelData = ref<any>(JSON.parse(localStorage.getItem('echartsLabelData') || 'null'))
    const fullData = ref<any>(JSON.parse(localStorage.getItem('fullData') || 'null'))
    const graphNameList = ref<any>(JSON.parse(localStorage.getItem('graphNameList') || 'null'))

    const updataData = (rootData: any) => {
        echatNode.value = rootData.echatNode
        echartsLabelData.value = rootData.echartsLabelData
        fullData.value = rootData.fullData
        graphNameList.value = rootData.graphNameList
    }

    // 🔹 自动同步到 localStorage
    const dataMap = {
        echatNode,
        echartsLabelData,
        fullData,
        graphNameList
    }

    for (const [key, valueRef] of Object.entries(dataMap)) {
        watch(valueRef, (newVal) => {
            if (newVal !== undefined) {
                localStorage.setItem(key, JSON.stringify(newVal))
            }
        }, { deep: true }) // deep 监听对象内部变化
    }

    return {
        echatNode,
        echartsLabelData,
        fullData,
        graphNameList,
        updataData
    }
})
