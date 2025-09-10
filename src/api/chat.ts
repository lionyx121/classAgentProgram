import request from '@/utils/request'

interface ChatClientIdParams {
    userid: string
    username: string
    questions: any[]
}

// 获取clientid
export const getChatClientId = ({userid, username, questions}: ChatClientIdParams): Promise<string> =>{
    return request.post('/api/chat/getClientId', {
        userid,
        username,
        questions,
    })
}