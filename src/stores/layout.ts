import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    // 去维护当前的侧边栏是否需要展示，以及计算出layout右侧区域的宽度
    const isSilderShow = ref(true)

    window.onresize = () => {
        const width = window.innerWidth
        isSilderShow.value = width > 760
    }

    return {
        isSilderShow
    }
})
