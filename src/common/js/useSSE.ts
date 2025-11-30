import { ref, onBeforeUnmount, toRefs } from 'vue'
import { useChatStore } from '@/stores/chat'
import type { ChatItem } from '@/types/chat'

// 将recommendQuestions数组转换为markdown格式
const recommendQuestionsToMd = (arr: any[]) => {
  if (!arr) return
  let md = "\n\n 您可能对这些问题感兴趣：\n\n";
  arr.forEach((item, index) => {
    md += `${index + 1}. **${item}** \n`;
  });
  return md;
}


export function useSSE(withCredentials = false) {
  const messages = ref<string>('')
  const status = ref<'idle' | 'open' | 'error'>('idle')

  const chatStore = useChatStore()

  let es: EventSource | null = null

  const stop = () => {
    es?.close()
    // 我们需要更新isoutputing的状态为false
    chatStore.updataIsOutputing()
    es = null
    status.value = 'idle'
  }

  const start = (url: string,) => {
    if (es) return

    // 配置大模型回答的数据
    chatStore.addHistory({
      role: 'assistant',
      content: '',
      createTime: Date.now(),
      isDone: false
    } as ChatItem)

    es = new EventSource(url, { withCredentials })

    es.onopen = () => {
      chatStore.updataIsOutputing(true)
      console.log('连接成功')
    }

    es.onmessage = (e) => {
      let text = JSON.parse(e.data).text
      if (text) {
        chatStore.questions[chatStore.questions.length - 1].content += text
      }
    }

    es.addEventListener('ping', (e) => {
      console.log('ping', e.data.text)
    })


    es.addEventListener('recommendQuestions', (e) => {
      const data = JSON.parse(e.data)
      // 保存这次的recommendQuestions
      chatStore.updateRecommendQuestions(data.message)
      console.log('recommendQuestions', data.message)
    })

    es.addEventListener('done', () => {
      console.log('SSE服务关闭')

      const md = recommendQuestionsToMd(chatStore.recommendQuestions)
      // 清空recommendQuestions
      chatStore.updateRecommendQuestions([])
      // 加入到大模型回答中
      chatStore.questions[chatStore.questions.length - 1].content += md

      stop()
    })

    es.onerror = () => {
      status.value = 'error'
    }
  }

  onBeforeUnmount(stop)

  return { start, stop, messages, status }
}
