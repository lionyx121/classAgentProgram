import request from '@/utils/request'

export const onSendDataToChat = (msg: string) =>{
    return request.get(`/api/chat?q=${msg}`)
}