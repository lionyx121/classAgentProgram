const express = require('express');
const router = express.Router();

const Class = require('../../models/classData')

const echartsGraphData = require('../../utils/RAG/handleFunction/handleData/echartsGraphData.json')
const echartsLabelData = require('../../utils/RAG/handleFunction/handleData/echartsLabelData.json')
const graphData = require('../../utils/RAG/handleFunction/handleData/graphData.json')
const nameData = require('../../utils/RAG/handleFunction/handleData/nameData.json')

// 初始化知识点数据
router.post('/initClassData', async (req, res) => {
    try {
        const graphNameList = req.body
        const data = []
        for (const key in graphNameList) {
            const name = graphNameList[key].name
            data.push({ className: name, classKey: key, askCount: 0, errorCount: 0 })
        }

        // 如果不存在则创建
        await Class.findOneAndUpdate(
            {},
            { data },
            { upsert: true, new: true }
        )

        res.json({ msg: '初始化知识点数据成功', data })
    } catch (error) {
        res.status(400).json({ msg: '初始化知识点数据失败', code: 1001, error: error.message || error })
    }
})

// 初始化节点信息
router.get('/initRootData', (req, res) => {
    try {
        const nowGraphHash = echartsGraphData.hash
        const nowlabelHash = echartsLabelData.hash

        const etag = nowGraphHash.toString() + nowlabelHash.toString()
        // 请求头里面的etag
        const clientEtag = req.headers['if-none-match'] || ''
        const rootData = {
            echatNode: echartsGraphData,
            echartsLabelData,
            fullData: graphData,
            graphNameList: nameData
        }

        // 检查二者是否相等
        if (etag === clientEtag) {
            // 内容没变
            res.status(304).end()
            return
        }

        // 内容有更新
        res.setHeader('ETag', etag)
        res.status(200).json({ rootData })

    } catch (error) {
        res.status(400).json({ error: error.message || error, msg: '初始化节点失败' })
    }
})

module.exports = router;
