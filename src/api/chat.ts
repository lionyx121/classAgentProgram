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

// 删除历史记录
export const deleteHistory = ({ username, historyId }: { username: string, historyId: string }) => {
    return request.post('/api/chat/deleteHistory', {
        username,
        historyId,
    })
}

// 更新历史记录的标题
export const updataHistoryTitle = ({ username, historyId, newTitle }: { username: string, historyId: string, newTitle: string }) => {
    return request.post('/api/chat/updataHistoryTitle', {
        username,
        historyId,
        newTitle
    })
}