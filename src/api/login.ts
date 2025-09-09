import request from '@/utils/request'
import type { codeRes, RuleForm } from '@/types/login'

export const onSendEmailCode = ({username, email}: RuleForm): Promise<codeRes> =>{
    return request.post('/api/login/sendCode', {
        username,
        email
    })
}

export const onVerifyCode = ({username, email, sms}: RuleForm): Promise<codeRes> =>{
    return request.post('/api/login/verifyCode', {
        username,
        email,
        sms
    })
}
