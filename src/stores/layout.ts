import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
    // 去维护当前的侧边栏是否需要展示，以及计算出layout右侧区域的宽度
    const isSilderShow = ref(innerWidth > 760)

    // 去计算当前可视区域的高度
    const showHeight = ref(window.innerHeight)

    // 更新isSilderShow
    const updataIsSilderShow = () => {
        isSilderShow.value = !isSilderShow.value
    }

    window.onresize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        showHeight.value = height
        isSilderShow.value = width > 760
    }

    return {
        isSilderShow,
        showHeight,
        updataIsSilderShow
    }
})
