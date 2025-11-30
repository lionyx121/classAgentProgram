import request from '@/utils/request'

interface InitRootParams {
    graphHash: number
    labelHash: number
}

export const getInitRoot = (): Promise<{ rootData: any }> => {
    return request.get('/api/classData/initRootData')
}

export const getShowClassData = (nodeKey: string, username: any): Promise<{ graphData: any }> => {
    return request.post('/api/classData/getShowClassData', {
        nodeKey,
        username
    })
}