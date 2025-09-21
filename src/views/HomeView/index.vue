<script setup lang="ts">
import homeHeader from './components/homeHeader.vue';
import homeBottom from './components/homeBottom.vue';
import homeMain from './components/homeMain.vue';
import { useLayoutStore } from '@/stores/layout';
import { watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat';

const layoutStore = useLayoutStore()
const chatStore = useChatStore()

watch(
    () => chatStore.questions,
    async () => {
        await nextTick()
        const layout = document.querySelector('.main')
        if (layout) {
            layout.scrollTop = layout.scrollHeight
        }
    },
    { deep: true }
)
</script>


<template>
    <div class="layout">
        <!-- 侧边栏 当屏幕宽度<760时不显示 -->
        <div class="slider" v-if="layoutStore.isSilderShow"></div>
        <div class="layout-right">
            <!-- 顶部 -->
            <div class="header">
                <homeHeader></homeHeader>
            </div>
            <!-- 中间 -->
            <div class="main">
                <homeMain></homeMain>
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