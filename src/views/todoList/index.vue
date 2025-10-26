<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import mdMathjax3 from 'markdown-it-mathjax3'
import 'github-markdown-css'

// 初始化 MarkdownIt
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
})

// 启用 MathJax3 插件
md.use(mdMathjax3)
</script>

<template>
    <article class="markdown-body layout">
        <!-- ✅ 渲染行内和块级数学公式 -->
        <div v-html="md.render(`
$f(t)$ 和 $ g(t) $
`)"></div>
    </article>
</template>

<style scoped lang="scss">
.layout {
    padding: 24px;
    background-color: red;
    border-radius: 8px;

    /* ✅ MathJax 块级公式 */
    :deep(mjx-container[jax='CHTML'][display='true']) {
        display: block;
        text-align: center;
        margin: 1.5em 0;
    }

    /* ✅ 行内公式对齐优化 */
    :deep(mjx-container[jax='CHTML'][display='false']) {
        display: inline-block;
        vertical-align: middle;
    }

    /* ✅ 字体大小可调 */
    :deep(mjx-container) {
        font-size: 1.05em;
        overflow-x: auto;
    }
}
</style>
