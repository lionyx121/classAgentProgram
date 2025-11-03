import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mdMathjax3 from 'markdown-it-mathjax3'

/**
 * Markdown 渲染器
 * 支持：
 * ✅ 代码高亮（highlight.js）
 * ✅ LaTeX 数学公式（markdown-it-mathjax3）
 * ✅ 宽松匹配 $ H(z) $（允许空格）
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

// ---- 👇 宽松匹配逻辑：允许 $ H(z) $、$ x+y $ 这种格式 ----
md.inline.ruler.before('escape', 'math-loose', (state, silent) => {
    const start = state.pos
    const marker = state.src.charCodeAt(start)

    // 仅匹配 `$`
    if (marker !== 0x24 /* $ */) return false

    let match = start + 1
    while ((match = state.src.indexOf('$', match)) !== -1) {
        if (match - start > 1) {
            const content = state.src.slice(start + 1, match).trim() // 🔥 trim 空格
            if (content.length > 0) {
                if (!silent) {
                    const token = state.push('math_inline', 'math', 0)
                    token.markup = '$'
                    token.content = content
                }
                state.pos = match + 1
                return true
            }
        }
        match++
    }
    return false
})

export default md
