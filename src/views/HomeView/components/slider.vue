<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useRouter } from 'vue-router'
import ActionMenu from '@/components/ActionMenu.vue'
import { useSSE } from '@/common/js/useSSE'

const chatStore = useChatStore()
const router = useRouter()

const { stop } = useSSE()

// 新聊天
const onNewChat = () => {
    stop()
    router.push({ path: '/main' })
    chatStore.clearQuestions()
}

const toLabelGraph = () => {
    router.push({ path: '/echartsLabel' })
}

const onHistoryClick = (item: any) => {
    router.push({ path: '/main' })
    chatStore.updateQuestions(item._id)
}

const isMenushow = ref<number>(-1)
const onHistoryEnter = (item: any) => {
    isMenushow.value = item._id
}
const onHistoryLeave = () => {
    isMenushow.value = -1
}

// 菜单
const menu = ref({
    menuList: [
        [
            { title: '学习路径', icon: 'View' },
            { title: '重命名', icon: 'EditPen' }
        ],
        [
            { title: '删除', icon: 'Delete', type: 'danger' }
        ]
    ],
    top: 0,
    itemValue: {}
})
const isMenuVisible = ref(false)

const onMenuClick = async (item: any, e: MouseEvent) => {
    e.stopPropagation()
    isMenuVisible.value = true
    await nextTick()
    menu.value.top = e.clientY
    menu.value.itemValue = item
}

const Topractice = () => {
    router.push({ path: '/practice' })
}
</script>

<template>
    <!-- 上半区域 -->
    <div class="layout-top">
        <div class="logo">
            <img src="@/assets/images/AgentLogo-2.png" class="logo" />
            <span>WeOucer</span>
        </div>
        <div class="func">
            <div class="funcBox" @click="onNewChat">
                <van-icon name="edit" size="20" />
                <span>新聊天</span>
            </div>
            <div class="funcBox" @click="Topractice">
                <van-icon name="search" size="20" />
                <span>练习一下</span>
            </div>
            <div class="funcBox" @click="toLabelGraph">
                <van-icon name="eye-o" size="20" />
                <span>知识图谱</span>
            </div>
        </div>
    </div>

    <!-- 下半区域 -->
    <div class="history">
        <div v-for="(item, i) in chatStore.historyList" :key="item._id" @click="onHistoryClick(item)" class="item"
            :class="{ active: i === chatStore.activeIndex }" @mouseenter="onHistoryEnter(item)"
            @mouseleave="onHistoryLeave">
            <div class="history-title">{{ item.title }}</div>
            <van-icon name="ellipsis" class="ellipsis" v-if="isMenushow === item._id" @click="onMenuClick(item, $event)"
                size="20" />
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

.history {
    margin-top: 200px;
    width: 100%;
    height: calc(100vh - 200px);
    overflow-y: auto;

    .item {
        width: 95%;
        margin: 0 auto 6px;
        border-radius: 15px;
        color: #fff;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        position: relative;
        cursor: pointer;
        padding-left: 15px;
        padding-right: 30px;
        transition: all 0.3s;


        .history-title {
            width: 95%;
            /* 🔥 超出一行显示省略号 */
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }


        .ellipsis {
            position: absolute;
            right: 17px;
            top: 0;
            height: 100%;
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

    // 滚动条样式
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #181818;
        border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
        background: #303030;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #C0C0C1;
    }
}
</style>
