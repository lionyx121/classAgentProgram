import request from '@/utils/request'

interface ChatClientIdParams {
    userid: string
    username: string
    questions: any[]
}

// 获取clientid
export const getChatClientId = ({ userid, username, questions }: ChatClientIdParams): Promise<string> => {
    return request.post('/api/chat/getClientId', {
        userid,
        username,
        questions,
    })
}

// 获取聊天历史记录
export const getChatHistory = ({ username }: { username: string }) => {
    const url = `/api/chat/getHistory?username=${username}`
    return request.get(url)
}

// 获取学习路径
export const getTimeLine = ({ username, historyId }: { username: string, historyId: string }) => {
    return request.post('/api/chat/getTimeLine', {
        username,
        historyId,
    })
}