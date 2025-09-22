<script setup lang="ts">
import 'github-markdown-css';
import { useChatStore } from '@/stores/chat';
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import kaomoji from "kaomoji";
import { ref, watch } from 'vue';
import { throttle } from '@/common/js/utils';

const md: any = new MarkdownIt({
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                    }</code></pre>`
            } catch (__) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
})

const chatStore = useChatStore()

const showData = ref('')
const isTypeWriting = ref(false)

const emit = defineEmits(["content-update"])

// 模拟打字机效果
const typeWriter = () => {
    isTypeWriting.value = true
    showData.value = ''
    let timer = setInterval(() => {
        // case1如果当前content里面没有东西 content = '' 时return
        if (chatStore.questions[chatStore.questions.length - 1].content === '') return
        // case2如果当前content里面有内容了，并且showData的长度小于content的长度
        if (chatStore.questions[chatStore.questions.length - 1].content.length > showData.value.length) {
            showData.value += chatStore.questions[chatStore.questions.length - 1].content[showData.value.length]
            // todo 加一个节流
            if (showData.value.length % 3 === 0) {
                emit("content-update")
            }
        }
        // case3如果当前content里面有内容了，并且showData的长度等于content的长度
        if (chatStore.questions[chatStore.questions.length - 1].content.length === showData.value.length) {
            // 把isDone设置为true
            chatStore.questions[chatStore.questions.length - 1].isDone = true
            clearInterval(timer)
        }
    }, 40)
}

watch(() => chatStore.questions.length, () => {
    if (chatStore.questions.length % 2 === 0) {
        typeWriter()
    }
})

</script>

<template>
    <!-- 当有对话的时候 -->
    <div v-if="chatStore.questions.length">
        <div class="box" v-for="(item, index) in chatStore.questions" :key="index">
            <div v-if="item.role === 'user'" class="user">
                {{ item.content }}
            </div>
            <div v-else-if="item.role === 'assistant' && item.content && item.isDone" v-html="md.render(item.content)"
                class="markdown-body">
            </div>
            <div v-else-if="item.role === 'assistant' && item.content && !item.isDone" v-html="md.render(showData)"
                class="markdown-body">
            </div>
            <span v-else-if="item.role === 'assistant' && !item.content" class="dots-loading" aria-label="loading">
                <i></i><i></i><i></i>
            </span>
        </div>
    </div>
    <!-- 没有对话的兜底处理 -->
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