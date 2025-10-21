import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import mdKatex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

/* ---------------- Markdown 渲染器 ---------------- */
const md: any = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                const code = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
                return `<pre class="hljs"><code>${code}</code></pre>`
            } catch (_) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    },
})

// 在 md.use(mdKatex) 之前添加：
md.inline.ruler.before('escape', 'math_fix_space', (state: any, silent: any) => {
    const src = state.src
    const pos = state.pos

    if (src[pos] !== '$') return false

    // 查找第二个 $
    let match = pos + 1
    while (match < src.length && src[match] !== '$') match++

    if (match === src.length) return false // 没有匹配的结束符

    // ✅ 提取中间文本
    const content = src.slice(pos + 1, match).trim()

    // 忽略空内容
    if (!content) return false

    if (!silent) {
        const token = state.push('math_inline', 'math', 0)
        token.content = content // 去掉空格后的公式内容
    }

    state.pos = match + 1
    return true
})

// ✅ 加上 LaTeX 支持
md.use(mdKatex, {
    throwOnError: false,
    output: 'html',
})

export default md