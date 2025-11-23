<script setup lang="ts">
import 'github-markdown-css'
import { useChatStore } from '@/stores/chat'
import kaomoji from 'kaomoji'
import { ref, watch, onUnmounted } from 'vue'
import md from '@/common/js/useMd'

const chatStore = useChatStore()
const showData = ref('')
const isTypeWriting = ref(false)
const emit = defineEmits(['content-update'])

// 打字机效果
let timer: any = null
const typeWriter = () => {
    isTypeWriting.value = true
    showData.value = ''
    if (timer) clearInterval(timer)

    timer = setInterval(() => {
        const lastMsg = chatStore.questions[chatStore.questions.length - 1]
        if (!lastMsg || !lastMsg.content) return

        // 打字输出
        if (lastMsg.content.length > showData.value.length) {
            showData.value += lastMsg.content[showData.value.length]
            if (showData.value.length % 3 === 0) {
                emit('content-update')
            }
        }

        // 输出完成
        if (lastMsg.content.length === showData.value.length && !chatStore.isOutputing) {
            lastMsg.isDone = true
            clearInterval(timer)
        }
    }, 30)
}

watch(
    () => chatStore.questions.length,
    () => {
        if (chatStore.questions.length % 2 === 0) {
            typeWriter()
        }
    },
)
onUnmounted(() => {
    if (timer) clearInterval(timer)
})
</script>

<template>
    <!-- 有对话时 -->
    <div v-if="chatStore.questions.length">
        <div class="box" v-for="(item, index) in chatStore.questions" :key="index">
            <!-- 用户消息 -->
            <div v-if="item.role === 'user'" class="user">
                {{ item.content }}
            </div>

            <!-- 助手完成输出 -->
            <div v-else-if="item.role === 'assistant' && item.content && item.isDone" v-html="md.render(item.content)"
                class="markdown-body"></div>

            <!-- 助手输出中 -->
            <div v-else-if="item.role === 'assistant' && item.content && !item.isDone" v-html="md.render(showData)"
                class="markdown-body"></div>

            <!-- 助手思考中 -->
            <span v-else-if="item.role === 'assistant' && !item.content" class="dots-loading" aria-label="loading">
                <i></i><i></i><i></i>
            </span>
        </div>
    </div>

    <!-- 没有历史对话 -->
    <div v-else class="nohistory">
        <div>What Can I Help For You Today?</div>
        <div>{{ kaomoji.happy() }}</div>
    </div>
</template>

<style scoped lang="scss">
.box {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .user {
        align-self: flex-end; // 用户消息靠右
        background-color: #2C2C2C; // 蓝色气泡
        color: #fff;
        padding: 8px 14px;
        border-radius: 16px;
        font-size: 16px;
        line-height: 1.4;
        word-break: break-word;
        max-width: 70%;
        margin: 10px 0;
    }

    .assistant {
        align-self: flex-start;
        color: #e5e5e5; // 浅灰色文字，适配深色背景
        font-size: 14px;
        line-height: 1.6;
        word-break: break-word;
        max-width: 100%;
        margin: 10px 0;
    }

    .dots-loading {
        align-self: flex-start;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-left: 10px;

        i {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #fff;
            opacity: .3;
            animation: dot-bounce 900ms infinite ease-in-out;
        }

        i:nth-child(2) {
            animation-delay: 150ms;
        }

        i:nth-child(3) {
            animation-delay: 300ms;
        }
    }

    @keyframes dot-bounce {

        0%,
        80%,
        100% {
            transform: translateY(0);
            opacity: .3;
        }

        40% {
            transform: translateY(-4px);
            opacity: 1;
        }
    }
}


/* Markdown 内容覆盖，去掉背景 */
.markdown-body {
    align-self: flex-start;
    background: transparent !important;
    padding: 0 !important;
    border-radius: 0 !important;
    color: #e5e5e5;
    font-size: 16px;
    line-height: 1.6;
    max-width: 100% !important;
    margin: 10px 0;

    // :deep(.katex) {
    //     font-size: 1.1em;
    //     vertical-align: middle;
    // }

    // :deep(.katex-display) {
    //     font-size: 1.25em;
    //     margin: 12px 0;
    //     text-align: center;
    // }

    :deep(tr) {
        background-color: #171717;
    }

    :deep(td) {
        background-color: #171717;
    }

    :deep(th) {
        background-color: #171717;
    }

    :deep(table) {
        overflow: hidden;
    }

    :deep(hr) {
        height: 1px;
        background-color: #424242;
    }

    :deep(.hljs) {
        background-color: #171717;
    }
}

.nohistory {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;

    div:first-child {
        font-size: 23px;
    }

    div:last-child {
        font-size: 20px;
        font-weight: bold;
        background: linear-gradient(135deg, #7dd3fc, #a78bfa); // 蓝紫渐变
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        padding: 8px 16px;
        border-radius: 12px;
        background-color: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(6px);
    }
}
</style>