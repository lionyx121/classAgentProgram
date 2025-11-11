// 这是登录相关的接口
const express = require('express');
const router = express.Router();

// 获取异步池
const asycnPoolClass = require('../../comon/js/asyncPool')

const User = require('../../models/user')

router.post('/setUserInfo', async (req, res) => {
    try {
        const asyncPool = new asycnPoolClass()
        const userInfoList = req.body

        // 返回每个 _add 的 Promise
        const tasks = userInfoList.map((item) =>
            asyncPool._add(() =>
                User.updateOne(
                    { username: item.username },
                    { $set: { name: item.name } },
                    { upsert: true }
                )
            )
        );

        // 等所有任务完成
        await Promise.all(tasks);

        res.json({ msg: '设置用户信息成功' });
    } catch (error) {
        res.status(400).json({ msg: '设置用户信息失败', code: 1001, error: error.message || error })
    }
})

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
