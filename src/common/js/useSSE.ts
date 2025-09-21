import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import type { ChatItem } from '@/types/chat'

// 将similarity数组转换为markdown格式
const similarityToMd = (arr: any[]) => {
  let md = "\n\n 你提的问题可能和以下知识点相关：\n\n";
  arr.forEach((item, index) => {
    md += `${index + 1}. **${item.id}** （相关度：${item.cosine.toFixed(3)}）\n`;
  });
  return md;
}


export function useSSE(withCredentials = false) {
  const messages = ref<string>('')
  const status = ref<'idle' | 'open' | 'error'>('idle')

  // 判断当前是否处于输出中
  const isOutputing = ref<boolean>(false)

  const chatStore = useChatStore()

  let es: EventSource | null = null

  const stop = () => {
    es?.close()
    isOutputing.value = false
    es = null
    status.value = 'idle'
  }

  const start = (url: string,) => {
    if (es) return

    // 配置大模型回答的数据
    chatStore.addHistory({
      role: 'assistant',
      content: '',
      createTime: Date.now()
    } as ChatItem)

    es = new EventSource(url, { withCredentials })

    es.onopen = () => {
      isOutputing.value = true
      console.log('连接成功')
    }

    es.onmessage = (e) => {
      let text = JSON.parse(e.data).text
      if (text) {
        // 更新仓库中大模型的回答
        chatStore.questions[chatStore.questions.length - 1].content += text
      }
    }

    es.addEventListener('ping', (e) => {
      console.log('ping', e.data.text)
    })

    es.addEventListener('done', () => {
      console.log('SSE服务关闭')

      const md = similarityToMd(chatStore.similarities)
      // 加入到大模型回答中
      chatStore.questions[chatStore.questions.length - 1].content += md

      isOutputing.value = false
      stop()
    })

    es.onerror = () => {
      status.value = 'error'
    }
  }

  onBeforeUnmount(stop)

  return { start, stop, messages, status, isOutputing }
}
