<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'    

const layoutStore = useLayoutStore()

const itemHeight = 40          // 每个元素高度
 // 一次最多显示多少条
const visibleCount = computed(() =>{
    return Math.floor((layoutStore.showHeight - 200) / itemHeight)
})       

const dataList = ref<string[]>([])
for (let i = 0; i < 100; i++) {
    dataList.value.push(`Item ${i + 1}`)
}
const scrollTop = ref(0)

const start = computed(() => Math.floor((scrollTop.value / itemHeight) + 0.5))

const visibleList = computed(() => dataList.value.slice(start.value, start.value + visibleCount.value))

const onScroll = (e: Event) => {
    scrollTop.value = (e.target as HTMLElement).scrollTop
}

</script>

<template>
    <!-- 上半区域 -->
    <div class="layout-top">
        <div class="logo">
            <img src="@/assets/images/AgentLogo-2.png" class="logo">
            <span>WeOucer</span>
        </div>
        <div class="func">
            <!-- 新聊天 -->
            <div class="funcBox">
                <van-icon name="edit" size="20" />
                <span>新聊天</span>
            </div>
            <!-- 搜索聊天 -->
            <div class="funcBox">
                <van-icon name="search" size="20" />
                <span>搜索聊天</span>
            </div>
            <!-- 学习路径 -->
            <div class="funcBox">
                <van-icon name="eye-o" size="20" />
                <span>学习路径</span>
            </div>
        </div>
    </div>
    <div class="layout" @scroll="onScroll">
        <!-- 下半区域 聊天历史记录 -->
        <div class="history">
            <!-- 占位容器，撑起滚动条高度 -->
            <div :style="{ height: dataList.length * itemHeight + 'px', position: 'relative' }">
                <!-- 渲染可见部分 -->
                <div v-for="(item, i) in visibleList" :key="i" :style="{
                    position: 'absolute',
                    top: ((start + i) * itemHeight) + 'px',
                    height: itemHeight + 'px',
                    lineHeight: itemHeight + 'px',
                }" class="item">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout-top {
    width: 252px;
    position: fixed;
    top: 0;
    left: 0;
    height: 190px;
    border-bottom: 1px solid #242424;
    z-index: 99;

    .logo {
        height: 60px;
        display: flex;
        align-items: center;
        color: #fff;

        img {
            width: 36px;
            height: 36px;
            filter: invert(1);
            margin-left: 20px;
            margin-right: 20px;
        }
    }

    .func {
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .funcBox {
            width: 95%;
            margin: 0 auto;
            border-radius: 10px;
            height: 36px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            color: #fff;
            gap: 10px;
            font-size: 14px;
        }

        .funcBox:hover {
            background-color: #303030;
        }
    }

}

.layout {
    width: 100%;
    height: 100vh;
    overflow: auto;

    .history {
        margin-top: 200px;

        .item {
            width: 95%;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 15px;
            color: #fff;
            padding-left: 15px;
        }

        .item:hover {
            background-color: #303030;
        }
    }
}

// 滚动条宽度
.layout::-webkit-scrollbar {
    width: 8px;
}

// 滚动条轨道
.layout::-webkit-scrollbar-track {
    background: #181818;
    border-radius: 2px;
}

// 小滑块
.layout::-webkit-scrollbar-thumb {
    background: #303030;
    border-radius: 10px;
}

.layout::-webkit-scrollbar-thumb:hover {
    background: #C0C0C1;
}
</style>