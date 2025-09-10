<script setup lang="ts">
import 'github-markdown-css';
import { useChatStore } from '@/stores/chat';
import { watch, nextTick } from 'vue';
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

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

watch(
    () => chatStore.questions,
    async () => {
        await nextTick()
        const layout = document.getElementById('layout')
        if (layout) {
            layout.scrollTop = layout.scrollHeight
        }
    },
    { deep: true }
)
</script>

<template>
    <div class="layout" id="layout">
        <div class="box" v-for="(item, index) in chatStore.questions" :key="index">
            <div class="user" v-if="item.role === 'user'">{{ item.content }}</div>
            <div v-html="md.render(item.content)" class="markdown-body"
                v-if="item.role === 'assistant' && item.content" style="font-size: small"></div>
            <span class="dots-loading" aria-label="loading"
                v-if="item.role === 'assistant' && !item.content"><i></i><i></i><i></i></span>
        </div>
        <!-- 占位符 -->
        <div class="zhanwei"></div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    height: calc(100vh - 52px);
    width: 100%;
    background-color: #202020;
    margin-top: 52px;
    overflow: scroll;

    .box {

        .user {
            display: inline-block;
            padding: 8px 15px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.4;
            word-break: break-word;
            // 最小宽度避免太小
            min-width: 60px;
            // 最大宽度占屏幕 70%
            max-width: 70vw;
            background-color: #303030;
            color: #fff;
            transform: translateX(calc(100vw - 100% - 20px));
            margin-top: 20px;
        }

        .dots-loading {
            margin-top: 20px;
            margin-left: 20px;
            display: inline-flex;
            align-items: center;
            gap: 6px;

            i {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #fff; // 跟随文字颜色
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

    .zhanwei {
        width: 100%;
        height: 100px;
        background-color: #202020;
    }
}

.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
    background-color: #202020;
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}

.markdown-body pre {
    background: #1e1e1e; // 深色背景
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
}

.markdown-body code {
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 13px;
}
</style>