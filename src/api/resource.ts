import request from '@/utils/request'

export const getResourcesName = (): Promise<{ resourcesListName: any[] }> => {
    return request.get('/api/resources/getResourcesName')
}