const express = require('express')
const router = express.Router()
const { getEmbedding } = require('../../utils/RAG/handleFunction/index')
const { getHighSimilarityData } = require('../../utils/RAG/getRagData')
const nameData = require('../../utils/RAG/handleFunction/handleData/nameData.json')
const Practice = require('../../models/practice')

// ===================== LRU 缓存 =====================
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

// ===================== 核心函数 =====================
const getTitleSimilay = async (data) => {
    // 1️⃣ 生成唯一 key
    const addPracticeData = data
        .map(item => {
            const key = item.title + JSON.stringify(item.options) + JSON.stringify(item.analysis)
            const value = Date.now().toString() + Math.random().toString().slice(2, 8)
            if (myTitleCache._get(key) !== -1) return
            myTitleCache._put(key, value)
            return { ...item, key: value }
        })
        .filter(Boolean)

    if (addPracticeData.length === 0) {
        return { addPracticeData: [], knowledgePoint: [] }
    }

    // 2️⃣ 获取题目embedding
    const aliyunData = addPracticeData.map(item => ({
        content: '问题题目是:' + item.title + '问题解析是:' + item.analysis
    }))

    // 3️⃣ 查找数据库中的现有 Practice
    let practice = await Practice.findOne({}, { knowledgePoint: 1, knowledgePonit: 1, _id: 0 })
    console.log('当前 practice 文档：', practice)

    // ⚙️ 若存在拼错字段，自动修复数据库字段名
    if (practice && practice.knowledgePonit && !practice.knowledgePoint) {
        console.log('⚙️ 检测到字段拼写错误，执行字段重命名...')
        await Practice.updateMany({}, { $rename: { "knowledgePonit": "knowledgePoint" } })
        practice = await Practice.findOne({}, { knowledgePoint: 1, _id: 0 })
    }

    // 4️⃣ 初始化知识点
    let knowledgePoint = []
    if (practice && Array.isArray(practice.knowledgePoint)) {
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
            if (item.cosine > 0.5 && knowledgePoint[item.key]) {
                knowledgePoint[item.key].questions.push({
                    questionKey: addPracticeData[i].key,
                    cosine: item.cosine
                })
            }
        })
    }

    return { addPracticeData, knowledgePoint }
}

// ===================== 路由入口 =====================
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

module.exports = router
