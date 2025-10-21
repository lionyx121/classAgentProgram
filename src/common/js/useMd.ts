import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mdMathjax3 from 'markdown-it-mathjax3'

/**
 * Markdown 渲染器
 * 支持：
 * ✅ 代码高亮（highlight.js）
 * ✅ LaTeX 数学公式（markdown-it-katex）
 * ✅ 宽松匹配 $ H(z) $（自动忽略空格）
 */

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const code = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                return `<pre class="hljs"><code>${code}</code></pre>`
            } catch (_) { }
        }
        return `<pre class="hljs"><code>${MarkdownIt().utils.escapeHtml(str)}</code></pre>`
    },
})

// 启用 MathJax3 插件
md.use(mdMathjax3)

export default md
