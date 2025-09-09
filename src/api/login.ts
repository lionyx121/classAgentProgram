import request from '@/utils/request'

interface SendEmailCodeParams {
    username: string
    email: string
}

export const onSendEmailCode = ({username, email}: SendEmailCodeParams): Promise<string> =>{
    return request.post('/api/login/sendCode', {
        username,
        email
    })
}