// src/composables/useSSE.ts
import { ref, onBeforeUnmount } from 'vue'

export function useSSE(withCredentials = false) {
  const messages = ref<string[]>([])
  const status = ref<'idle' | 'open' | 'error'>('idle')

  let es: EventSource | null = null

  const start = (url: string, ) => {
    if (es) return
    es = new EventSource(url, { withCredentials })

    es.onopen = () => {
      console.log('连接成功')
    }

    es.onmessage = (e) => {
      messages.value.push(`[message] ${e.data}`)
    }

    es.addEventListener('ping', (e) => {
      console.log('ping', e.data)
    })

    es.addEventListener('done', () => {
      messages.value.push('[done] 服务端结束推送')
      stop()
    })

    es.onerror = () => {
      status.value = 'error'
    }
  }

  const stop = () => {
    es?.close()
    es = null
    status.value = 'idle'
  }

  onBeforeUnmount(stop)

  return { start, stop, messages, status }
}
