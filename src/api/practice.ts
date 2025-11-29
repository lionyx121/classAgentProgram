import request from '@/utils/request'

export const uploadsPracticeData = (data: FormData) => {
    return request.post('/api/practice/upload', data)
}

export const getPracticeData = (username: string): any => {
    return request.post('/api/practice/getPractice', { username })
}

export const submitAnswer = ({ username, questionKey, DifficultyLevel, similarity, seletcOption, selectResult }: any): any => {
    return request.post('/api/practice/submitAnswer', {
        username,
        questionKey,
        DifficultyLevel,
        similarity,
        seletcOption,
        selectResult,
    })
}