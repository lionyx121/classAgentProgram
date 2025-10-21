<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import mdKatex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

md.use(mdKatex, {
  throwOnError: false,
})
</script>

<template>
  <div v-html="md.render('$$y[n] - 0.5y[n-1] = x[n]$$')" class="markdown-body"></div>
</template>