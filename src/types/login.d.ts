export interface codeRes {
    msg: string,
    code: number
}

export interface RuleForm {
    username: string
    email: string
    sms?: string
}

export enum UserInfoKey {
    username = 'username',
    email = 'email',
    name = 'name'
}

export type UserInfo = {
    [key in UserInfoKey]?: string
}