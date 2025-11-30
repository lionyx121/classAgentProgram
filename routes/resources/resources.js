const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

router.get('/getResourcesName', (req, res) => {
    try {
        const dirPath = path.join(__dirname, '../../uploads/resources')
        const resourcesListName = fs.readdirSync(dirPath) // 获取文件名数组

        res.json({ resourcesListName })
    } catch (error) {
        res.status(500).json({ msg: '服务器错误', error: error.message })
    }
})

module.exports = router
