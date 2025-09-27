<script setup lang="ts">
import homeHeader from './components/homeHeader.vue';
import homeBottom from './components/homeBottom.vue';
import homeMain from './components/homeMain.vue';
import slider from './components/slider.vue';

import { useLayoutStore } from '@/stores/layout';
import { watch, nextTick, ref } from 'vue'
import { useChatStore } from '@/stores/chat';

const layoutStore = useLayoutStore()
const chatStore = useChatStore()

const autoScroll = ref(true) // 是否自动滚动到底部

const scrollToBottom = async () => {
    if (!autoScroll.value) return
    await nextTick() // 等待 DOM 更新
    const layout = document.querySelector(".main") as HTMLElement
    if (layout) {
        layout.scrollTop = layout.scrollHeight
    }
}

const handleScroll = (e: Event) => {
    const el = e.target as HTMLElement
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 50 // 距离底部50px以内

    autoScroll.value = isBottom
}
</script>


<template>
    <div class="layout">
        <!-- 侧边栏 当屏幕宽度<760时不显示 -->
        <div class="slider" v-if="layoutStore.isSilderShow">
            <slider></slider>
        </div>
        <div class="layout-right">
            <!-- 顶部 -->
            <div class="header">
                <homeHeader></homeHeader>
            </div>
            <!-- 中间 -->
            <div class="main" @scroll="handleScroll">
                <homeMain @content-update="scrollToBottom"></homeMain>
            </div>
            <!-- 底部 -->
            <div class="footer">
                <homeBottom></homeBottom>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: 100vh;
    display: flex;

    .slider {
        width: 260px;
        background-color: #181818;
    }

    .layout-right {
        flex: 1;
        position: relative;
        background-color: #212121;
        display: flex;
        flex-direction: column;

        .header {
            height: 60px;
            border-bottom: 1px solid #2c2c2c;
        }

        .main {
            flex: 1;
            overflow: scroll;
            scrollbar-width: none;
        }

        .footer {
            min-height: 88px;
            max-height: 152px;
            overflow-y: auto;
        }
    }
}
</style>