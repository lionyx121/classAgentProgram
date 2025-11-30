const express = require('express')
const router = express.Router()
const { getEmbedding } = require('../../utils/RAG/handleFunction/index')
const { getHighSimilarityData } = require('../../utils/RAG/getRagData')
const nameData = require('../../utils/RAG/handleFunction/handleData/nameData.json')
const Practice = require('../../models/practice')
const { updateEmbedding } = require('../../utils/RAG/getRagData')

const User = require('../../models/user')

const multer = require('multer')
const path = require('path')


class titleCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map()
    }
    _get(key) {
        if (!this.map.has(key)) return -1
        const value = this.map.get(key)
        this.map.delete(key)
        this.map.set(key, value)
        return value
    }
    _put(key, value) {
        if (this.map.has(key)) this.map.delete(key)
        if (this.map.size >= this.capacity) {
            const firstKey = this.map.keys().next().value
            this.map.delete(firstKey)
        }
        this.map.set(key, value)
    }
}
const myTitleCache = new titleCache(1000)

// 生成唯一key
const generateKey = (questionItem) => {
    const { title = '', options = {}, analysis = '' } = questionItem
    return title + JSON.stringify(options) + JSON.stringify(analysis)
}

const getTitleSimilay = async (data) => {
    // 1️⃣ 生成唯一 key
    const addPracticeData = data
        .map(item => {
            const key = generateKey(item)
            const value = Date.now().toString() + Math.random().toString().slice(2, 8)
            if (myTitleCache._get(key) !== -1) return
            myTitleCache._put(key, value)
            return { ...item, numberKey: value, strKey: key }
        })
        .filter(Boolean)

    if (addPracticeData.length === 0) {
        return { addPracticeData: [], knowledgePoint: [] }
    }

    // 2️⃣ 获取题目 embedding
    const aliyunData = addPracticeData.map(item => ({
        content: '问题题目是:' + item.title + '问题解析是:' + item.analysis
    }))

    // 3️⃣ 查找数据库中的 Practice
    let practice = await Practice.findOne({}, { knowledgePoint: 1, knowledgePonit: 1, _id: 0 })

    // ⚙️ 若存在拼错字段，自动修复数据库字段名
    if (practice && practice.knowledgePonit && !practice.knowledgePoint) {
        console.log('⚙️ 检测到字段拼写错误，执行字段重命名...')
        await Practice.updateMany({}, { $rename: { "knowledgePonit": "knowledgePoint" } })
        practice = await Practice.findOne({}, { knowledgePoint: 1, _id: 0 })
    }

    // 4️⃣ 初始化知识点（🔥 修复：必须判断 length）
    let knowledgePoint = []
    if (practice && Array.isArray(practice.knowledgePoint) && practice.knowledgePoint.length > 0) {
        knowledgePoint = practice.knowledgePoint
    } else {
        knowledgePoint = Object.entries(nameData).map(([key, val]) => ({
            knowledgeName: val.name,
            knowledgeKey: key,
            questions: []
        }))
        console.log(`✅ 初始化知识点数组，共 ${knowledgePoint.length} 个`)
    }

    // 5️⃣ 计算相似度并更新知识点
    const embeddingData = await getEmbedding(aliyunData)

    for (let i = 0; i < embeddingData.length; i++) {
        const embeddingDataItem = embeddingData[i]
        const highSimilarityData = getHighSimilarityData(embeddingDataItem.embedding, 10)

        addPracticeData[i].similarity = highSimilarityData

        highSimilarityData.forEach(item => {
            if (item.cosine > 0.5) {

                // 🔥 修复：item.key 不是数组下标，应该用 find
                const target = knowledgePoint.find(k => k.knowledgeKey == item.key)

                if (target) {
                    target.questions.push({
                        // 🔥 修复：addPracticeData 没有 key 字段，应使用 numberKey/strKey
                        questionKey: addPracticeData[i].numberKey,
                        cosine: item.cosine
                    })
                }
            }
        })
    }

    return { addPracticeData, knowledgePoint }
}

// 从数组中随机抽取两项
function pickTwoRandom(arr) {
    if (arr.length < 2) return arr

    const index1 = Math.floor(Math.random() * arr.length)
    let index2 = Math.floor(Math.random() * arr.length)

    // 保证 index2 不等于 index1
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * arr.length)
    }

    return [arr[index1], arr[index2]]
}

// 添加题库
router.post('/addPractice', async (req, res) => {
    try {
        const { data } = req.body
        if (!data) return res.status(400).json({ msg: '请输入题库数据' })

        // 计算题目-知识点映射
        const { addPracticeData, knowledgePoint } = await getTitleSimilay(data)

        // 合并更新
        const result = await Practice.updateOne(
            {},
            {
                $push: { data: { $each: addPracticeData } },
                $set: { knowledgePoint }
            },
            { upsert: true }
        )

        // 返回结果
        res.json({
            msg: '✅ 添加题库成功',
            insertedCount: addPracticeData.length,
            knowledgePointCount: knowledgePoint.length,
            modifiedCount: result.modifiedCount || 0,
            upsertedId: result.upsertedId || null
        })
    } catch (error) {
        res.status(500).json({ msg: '服务内部错误', error: error.message || error })
    }
})

// router.post(
//     '/upload',
//     upload.fields([
//         { name: 'titleImg', maxCount: 1 },
//         { name: 'optionAImg', maxCount: 1 },
//         { name: 'optionBImg', maxCount: 1 },
//         { name: 'optionCImg', maxCount: 1 },
//         { name: 'optionDImg', maxCount: 1 },
//     ]),
//     (req, res) => {
//         console.log('req.body.jsonData', req.body.jsonData[0])
//         console.log('req.files', req.files)
//         // console.log('req.files.titleImg', req.files.titleImg[0].path)
//         // console.log('req.files.optionAImg', req.files.optionAImg[0].path)
//         // console.log('req.files.optionBImg', req.files.optionBImg[0].path)
//         // console.log('req.files.optionCImg', req.files.optionCImg[0].path)
//         // console.log('req.files.optionDImg', req.files.optionDImg[0].path)
//         res.status(200).json({ msg: '上传成功', file: req.files })
//     }
// )

router.post('/getPractice', async (req, res) => {
    try {
        // 去获取用户信息
        const { username } = req.body
        // 去查询用户信息
        const userData = await User.findOne({ username })
        if (!userData) return res.status(400).json({ msg: '用户不存在' })

        // 去获取embedding
        const embeddingData = userData.embeddings

        // 以用户对知识点掌握程度由低到高排序的数组
        const sortedEmbeddingDataByMastery = embeddingData.sort((a, b) => a.mastery - b.mastery)

        // 以用户对知识点兴趣程度由高到低排序的数组
        const sortedEmbeddingDataByInterest = embeddingData.sort((a, b) => b.interest - a.interest)

        // 我们要给用户推荐10道题目
        const recommendQuestions = [
            ...sortedEmbeddingDataByMastery.slice(0, 3),
            ...sortedEmbeddingDataByInterest.slice(0, 4),
            ...sortedEmbeddingDataByMastery.filter(item => item.mastery === 0).slice(0, 3)
        ]

        // 去重
        const unique = Object.values(
            recommendQuestions.reduce((acc, cur) => {
                acc[cur._id] = cur
                return acc
            }, {})
        )

        const practice = await Practice.findOne({})
        if (!practice) return res.status(400).json({ msg: '题库不存在' })
        // 拿到题库
        const knowledgePoint = practice.knowledgePoint
        const konwledgeData = practice.data

        const questionList = []
        unique.forEach(item => {
            const target = knowledgePoint.find(k => k.knowledgeName == item.className)
            if (target) {
                const randomQuestions = pickTwoRandom(target.questions)
                questionList.push(...randomQuestions)
            }
        })

        // 根据questionKey去重
        const uniqueQuestions = Object.values(
            questionList.reduce((acc, cur) => {
                acc[cur.questionKey] = cur
                return acc
            }, {})
        )

        console.log(uniqueQuestions)

        const resultData = []
        // 根据questionList拿到相应的题目
        uniqueQuestions.forEach(item => {
            const target = konwledgeData.find(k => k.numberKey == item.questionKey)
            resultData.push(target)
        })

        res.status(200).json({ msg: '获取成功', resultData })
    } catch (error) {
        res.status(500).json({ msg: '服务内部错误', error: error.message || error })
    }
})

// 提交答案
router.post('/submitAnswer', async (req, res) => {
    try {
        const { username, questionKey, selectResult, selectOption, similarity, DifficultyLevel } = req.body

        if (!username || !questionKey) {
            return res.status(400).json({ msg: '缺少必要参数' })
        }

        const userData = await User.findOne({ username }).lean()
        if (!userData) return res.status(400).json({ msg: '用户不存在' })

        const isCorrect = selectResult === 'right'

        // -----------------------------
        //  获取做题次数
        // -----------------------------
        const practiceRecord = userData.practiceRecord?.find(item => item.key === questionKey)
        let rightCount = practiceRecord?.rightCount || 0
        let wrongCount = practiceRecord?.wrongCount || 0
        if (isCorrect) rightCount++
        else wrongCount++

        // -----------------------------
        // 计算 masteryScore
        // -----------------------------
        const masteryScore = {}
        similarity?.forEach(item => {
            if (item.cosine >= 0.5) {

                // 【修改1：调权重分配机制】
                const relationScore = item.cosine * 0.45
                const difficultyScore = DifficultyLevel * (isCorrect ? 0.4 : 0.1)

                const count = Math.min(3, Math.abs(rightCount - wrongCount))
                const base = count * 0.4
                const correctnessScore = isCorrect ? 1 : -1

                let change = correctnessScore * base * (relationScore + difficultyScore)

                // 【修改2：增加变化上限，减少剧烈波动】
                const MAX_GAIN = 0.15  // 一题最多增加 0.15
                const MAX_LOSS = -0.10 // 一题最多下降 -0.10
                change = Math.max(MAX_LOSS, Math.min(change, MAX_GAIN))

                masteryScore[item.id] = change
            }
        })

        // -----------------------------
        // 更新 embeddings + 时间衰减
        // -----------------------------
        const newEmbedding = updateEmbedding(userData.embeddings, [], masteryScore)

        // -----------------------------
        // 更新 practiceRecord
        // -----------------------------
        const updatePractice = await User.updateOne(
            {
                username,
                'practiceRecord.key': questionKey
            },
            {
                $inc: {
                    'practiceRecord.$.wrongCount': isCorrect ? 0 : 1,
                    'practiceRecord.$.rightCount': isCorrect ? 1 : 0
                },
                $push: {
                    'practiceRecord.$.selectResult': {
                        result: selectResult,
                        optionResult: selectOption ?? '',
                        time: new Date()
                    }
                }
            }
        )

        // 如果没有命中，则说明该题是新加入
        if (updatePractice.matchedCount === 0) {
            await User.updateOne(
                { username },
                {
                    $push: {
                        practiceRecord: {
                            key: questionKey,
                            wrongCount: isCorrect ? 0 : 1,
                            rightCount: isCorrect ? 1 : 0,
                            selectResult: [{
                                result: selectResult,
                                optionResult: selectOption ?? '',
                                time: new Date()
                            }]
                        }
                    }
                }
            )
        }

        // -----------------------------
        // 写入新的 Embedding
        // -----------------------------
        await User.updateOne(
            { username },
            { $set: { embeddings: newEmbedding } }
        )

        return res.status(200).json({ msg: '提交成功' })

    } catch (error) {
        console.error('submitAnswer Error:', error)
        return res.status(500).json({ msg: '服务内部错误', error: error.message })
    }
})

module.exports = router
