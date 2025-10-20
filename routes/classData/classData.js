// 这是登录相关的接口
const express = require('express');
const router = express.Router();

const Class = require('../../models/classData')

// 初始化知识点数据
router.post('/initClassData', async (req, res) => {
    try {
        const graphNameList = req.body
        const data = []
        for (const key in graphNameList) {
            const name = graphNameList[key].name
            data.push({ className: name, classKey: key, askCount: 0, errorCount: 0 })
        }
        console.log(data)

        // 如果不存在则创建
        await Class.findOneAndUpdate(
            {},
            { data },
            { upsert: true, new: true }
        )

        res.json({ msg: '初始化知识点数据成功', data })
    } catch (error) {
        res.status(400).json({ msg: '初始化知识点数据失败', code: 1001, error })
    }
})

module.exports = router;
