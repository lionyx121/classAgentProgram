<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { useChatStore } from '@/stores/chat'
import { useRouter } from 'vue-router'
import ActionMenu from '@/components/ActionMenu.vue'

const layoutStore = useLayoutStore()
const chatStore = useChatStore()

const itemHeight = 40          // 每个元素高度
// 一次最多显示多少条
const visibleCount = computed(() => {
    return Math.floor((layoutStore.showHeight - 200) / itemHeight)
})

// 历史记录里面展示的聊天标题
const dataList = ref<any[]>([])

const scrollTop = ref(0)

const start = computed(() => Math.floor((scrollTop.value / itemHeight) + 0.5))

const visibleList = computed(() => dataList.value.slice(start.value, start.value + visibleCount.value))

const onScroll = (e: Event) => {
    scrollTop.value = (e.target as HTMLElement).scrollTop
}

watch(() => chatStore.historyList, (newVal) => {
    dataList.value = newVal
})

const router = useRouter()
// 去学习路径
const toLabelGraph = () => {
    router.push({
        path: '/demo3',
    })
}

// 点击了历史记录
const onHistoryClick = (item: any) => {
    console.log('history')
    router.push({ path: '/main' })
    chatStore.updateQuestions(item._id)
}

// 新聊天
const onNewChat = () => {
    router.push({ path: '/main' })
    chatStore.clearQuestions()
}

// 判断是否需要展示菜单按钮
const isMenushow = ref<number>(-1)

const onHistoryEnter = (item: any) => {
    isMenushow.value = item._id
}

const onHistoryLeave = (e: Event) => {
    isMenushow.value = -1
}

// 配置菜单文件
const menu = ref({
    menuList: [
        [
            {
                title: '学习路径',
                icon: 'View',
            },
            {
                title: '重命名',
                icon: 'EditPen',
            }
        ],
        [
            {
                title: '删除',
                icon: 'Delete',
                type: 'danger',
            }
        ],
    ],
    top: 0,
    itemValue: {}
})

const isMenuVisible = ref(false)
// 点击菜单按钮
const onMenuClick = async (item: any, e: MouseEvent) => {
    e.stopPropagation()
    isMenuVisible.value = true
    await nextTick()
    menu.value.top = e.clientY
    menu.value.itemValue = item
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
            <div class="funcBox" @click="onNewChat">
                <van-icon name="edit" size="20" />
                <span>新聊天</span>
            </div>
            <!-- 搜索聊天 -->
            <div class="funcBox">
                <van-icon name="search" size="20" />
                <span>搜索聊天</span>
            </div>
            <!-- 学习路径 -->
            <div class="funcBox" @click="toLabelGraph">
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
                <div v-for="(item, i) in visibleList" @click="onHistoryClick(item)" :key="i" :style="{
                    position: 'absolute',
                    top: ((start + i) * itemHeight) + 'px',
                    height: itemHeight + 'px',
                    lineHeight: itemHeight + 'px',
                }" class="item" :class="{ 'active': i === chatStore.activeIndex }" @mouseenter="onHistoryEnter(item)"
                    @mouseleave="onHistoryLeave">
                    <!-- 标题 -->
                    <p>{{ item.title }}</p>
                    <!-- 省略号 -->
                    <van-icon name="ellipsis" class="ellipsis" v-if="isMenushow === item._id"
                        @click="onMenuClick(item, $event)" size="20" />
                </div>
            </div>
        </div>
    </div>

    <!-- 菜单 -->
    <ActionMenu :menuList="menu.menuList" :top="menu.top" :itemValue="menu.itemValue" @close="isMenuVisible = false"
        v-if="isMenuVisible" />
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
    background-color: #181818;

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
            font-size: 14px;
            position: relative;
            cursor: pointer;
            transition: all .5s;

            .ellipsis {
                position: absolute;
                width: 35px;
                height: 100%;
                right: 17px;
                top: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .item:hover {
            background-color: #303030;
        }

        .active {
            background-color: #242424;
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