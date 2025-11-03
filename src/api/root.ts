import request from '@/utils/request'

interface InitRootParams {
    graphHash: number
    labelHash: number
}

export const getInitRoot = (): Promise<{ rootData: any }> => {
    return request.get('/api/classData/initRootData')
}