// 这是登录相关的接口
const express = require('express');
const router = express.Router();

// 获取异步池
const asycnPoolClass = require('../../comon/js/asyncPool')

const User = require('../../models/user')

// 获取用户的信息
router.get('/getUserInfo', async (req, res) => {
    try {
        const { username } = req.query
        const userInfo = await User.findOne({ username })
        res.status(200).json({ data: userInfo })

    } catch (error) {
        res.status(400).json({ msg: '获取用户信息失败', error: error.message || error })
    }
})


module.exports = router;
