<script setup lang="ts">
import { nextTick, ref, watch, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useRouter } from 'vue-router'
import ActionMenu from '@/components/ActionMenu.vue'
import { useSSE } from '@/common/js/useSSE'
import { deleteHistory, updataHistoryTitle } from '@/api/chat'
import { useUserInfoStore } from '@/stores/userInfo'
import { ElMessage } from 'element-plus'

const chatStore = useChatStore()
const userInfoStore = useUserInfoStore()

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

const historyId = ref<string>('')
const historyTitle = ref<string>('')
const onMenuClick = async (item: any, e: MouseEvent) => {
    e.stopPropagation()
    historyId.value = item._id
    historyTitle.value = item.title

    isMenuVisible.value = true
    await nextTick()
    menu.value.top = e.clientY
    menu.value.itemValue = item
}

const Topractice = () => {
    router.push({ path: '/practice' })
}

const toExtraResource = () => {
    router.push({ path: '/extraResource' })
}

const toSearchPractice = () => {
    router.push({ path: '/searchPractice', })
}


// 监听history区域宽度的变化
const history = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null
const width = ref(0)

onMounted(() => {
    if (!history.value) return

    const layoutTop = document.querySelector<HTMLElement>('.layout-top')
    ro = new ResizeObserver(([entry]) => {
        width.value = entry.contentRect.width
        // 此时history发生变化了 我们去改变layout-top的width
        if (layoutTop) {
            layoutTop.style.width = `${width.value}px`
        }
    })

    ro.observe(history.value)
})

const updataDialogVisible = ref(false)

const onUpdataHistoryTitle = async () => {
    const res: any = await updataHistoryTitle({
        username: userInfoStore.userInfo.username as string,
        historyId: historyId.value,
        newTitle: historyTitle.value
    })
    if (res.success) {
        ElMessage({
            message: res.message,
            type: 'success',
        })
        updataDialogVisible.value = false
    } else {
        ElMessage.error(res.message)
    }
}

const delectDialogVisible = ref(false)
const onDeleteHistory = async () => {
    const res: any = await deleteHistory({
        username: userInfoStore.userInfo.username as string,
        historyId: historyId.value,
    })
    if (res.success) {
        ElMessage({
            message: '删除历史记录成功',
            type: 'success',
        })
    } else {
        ElMessage.error('删除历史记录失败')
    }

    delectDialogVisible.value = false
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
                <el-icon size="17">
                    <Edit />
                </el-icon>
                <span>新聊天</span>
            </div>
            <div class="funcBox" @click="Topractice">
                <el-icon size="17">
                    <Notebook />
                </el-icon>
                <span>开始练习</span>
            </div>
            <div class="funcBox" @click="toSearchPractice">
                <el-icon size="17">
                    <Search />
                </el-icon>
                <span>知识点相关练习</span>
            </div>
            <div class="funcBox" @click="toLabelGraph">
                <el-icon size="17">
                    <Connection />
                </el-icon>
                <span>知识图谱</span>
            </div>
            <div class="funcBox" @click="toExtraResource">
                <el-icon size="17">
                    <Collection />
                </el-icon>
                <span>额外资源</span>
            </div>
        </div>
    </div>

    <!-- 下半区域 -->
    <div class="history" ref="history">
        <div v-for="(item, i) in chatStore.historyList" :key="item._id" @click="onHistoryClick(item)" class="item"
            :class="{ active: i === chatStore.activeIndex }" @mouseenter="onHistoryEnter(item)"
            @mouseleave="onHistoryLeave">
            <div class="history-title">{{ item.title }}</div>
            <van-icon name="ellipsis" class="ellipsis" v-if="isMenushow === item._id" @click="onMenuClick(item, $event)"
                size="20" />
        </div>
    </div>

    <!-- 菜单 -->
    <ActionMenu :menuList="menu.menuList" :top="menu.top" :itemValue="menu.itemValue" :historyId="historyId"
        @close="isMenuVisible = false" v-if="isMenuVisible" @historyDelect="delectDialogVisible = true"
        @updataHistoryTitle="updataDialogVisible = true" />


    <!-- dialog提示框 更新历史记录的标题 -->
    <el-dialog v-model="updataDialogVisible" title="更新历史记录的标题(6-10字)" width="500">
        <el-input v-model="historyTitle" style="width: 400px" placeholder="Please input" clearable />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updataDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onUpdataHistoryTitle">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- dialog提示框 删除历史记录 -->
    <el-dialog v-model="delectDialogVisible" title="确认删除该历史记录?" width="500">
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="delectDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onDeleteHistory">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>

<style scoped lang="scss">
.layout-top {
    width: 252px;
    position: fixed;
    top: 0;
    left: 0;
    height: 200px;
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
        font-size: 12px;

        .funcBox {
            width: 95%;
            margin: 0 auto;
            border-radius: 10px;
            height: 36px;
            display: flex;
            align-items: center;
            padding: 5px 0px 5px 10px;
            color: #fff;
            gap: 15px;
        }

        .funcBox:hover {
            background-color: #303030;
        }
    }
}

.history {
    margin-top: 210px;
    width: 100%;
    height: calc(100vh - 210px);
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
