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
        res.status(400).json({ msg: '设置用户信息失败', code: 1001, error })
    }
})

module.exports = router;
