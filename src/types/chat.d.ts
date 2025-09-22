export enum chatKey {
    user = 'user',
    assistant = 'assistant',
    system = 'system'
}

export interface ChatItem {
    role: chatKey,
    content: string,
    createTime: number,
    isDone?: boolean
}