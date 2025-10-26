<script setup lang="ts">
import { ref, watch } from 'vue'
import { getChatClientId } from '@/api/chat'
import { isLogin } from '@/common/js/isLogin'
import { useUserInfoStore } from '@/stores/userInfo'
import { showFailToast } from 'vant';
import { useSSE } from '@/common/js/useSSE';
import { AGENTSERVERURL } from '@/common/env'
import MarkdownIt from 'markdown-it'
import { useChatStore } from '@/stores/chat';
import type { chatKey, ChatItem } from '@/types/chat'

const chatStore = useChatStore()

const inputval = ref<string>('') //输入框里面的内容

// 输入框自适应高度
const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    target.style.height = 'auto' // 先重置
    target.style.height = `${target.scrollHeight}px` // 再撑开
}

const userStroe = useUserInfoStore()

const { start, stop, messages } = useSSE()

// 发送消息
const sendMessage = async () => {
    // 如果输入框内没有内容直接返回
    if (!inputval.value) return
    // 判断是否登录
    if (isLogin()) {
        try {
            // 拼接用户的输入信息 将其传入仓库之中
            chatStore.addHistory({
                role: 'user',
                content: inputval.value,
                createTime: Date.now()
            } as ChatItem)
            inputval.value = ''

            // 获取clientid
            const res: any = await getChatClientId({
                userid: userStroe.userInfo.userid as string,
                username: userStroe.userInfo.username as string,
                questions: chatStore.questions
            })
            if (res.code === 1000) {
                // 保存这次的similarity
                chatStore.updateSimilarity(res?.similarity)
                // 利用clientid去建立SSE连接 拼接url
                const SSEUrl = AGENTSERVERURL + 'api/chat/connetSSE?clientid=' + res?.clientid
                // 连接SSE
                start(SSEUrl)
            } else {
                showFailToast(res.msg)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

// 停止发送消息
const onStopSendMessage = () => {
    stop()
}

// 监听messages的变化
const md = new MarkdownIt();

watch(messages, () => {
    md.render(messages.value)
})

</script>

<template>
    <div class="input-box">
        <!-- 左侧添加图片按钮 -->
        <div class="btn add">
            <van-icon name="plus" />
        </div>

        <!-- 中间输入框 -->
        <textarea id="text-area" placeholder="请输入内容" rows="1" v-model="inputval" @input="onInput" @keydown.enter.prevent="sendMessage"></textarea>

        <!-- 右侧发送按钮 -->
        <div class="btn send active">
            <van-icon name="stop-circle-o" v-if="chatStore.isOutputing" @click="onStopSendMessage" />
            <van-icon name="guide-o" class="icon-down" @click="sendMessage" v-else />
        </div>
    </div>
</template>

<style scoped lang="scss">

.input-box {
    margin: 0 auto;
    margin-bottom: 32px;
    width: calc(100% - 18px);
    max-width: 700px;
    min-height: 56px;
    border-radius: 28px;
    background-color: #303030;

    display: flex;
    align-items: center;
    /* 单行时让文字垂直居中 */
    padding: 0 56px;
    /* 给左右按钮留位置 */
    z-index: 100;
    border: 1px solid #454545;
    position: relative;
}

.btn {
    position: absolute;
    bottom: 10px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background-color: #454545;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 99;
}

.add {
    left: 19px;
    font-size: 18px;
}

.send {
    right: 19px;
    background-color: #858585;
    color: #2F2F2F;
}

.active {
    background-color: #FFFFFF;
    color: #000000;
}

#text-area {
    flex: 1;
    background-color: red;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
    resize: none;
    overflow-y: hidden;

    min-height: 36px;
    max-height: 120px;
    padding: 12px 5px;
    /* 让单行时上下有空间，视觉上居中 */
}
</style>
