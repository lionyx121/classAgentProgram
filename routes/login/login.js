// 这是登录相关的接口
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../../models/user')

// 使用 Nodemailer 发送邮件
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // 465 走 SSL
    auth: {
        user: '2875307658@qq.com',
        pass: 'qxlqugmvtovmdcdj'
    }
});

// 获取一个6位的随机验证码
const getRandomCode = () => {
    return Math.random().toString().slice(2, 8);
}

// 检验是否超时 time以s为单位
const isTimeOut = (lastTime, time) => {
    return Date.now() - lastTime < time * 1000
}

/**
 * 使用一个Map去维护所有用户的信息
 * key 是用户的邮箱 value中有验证码信息以及发送验证码的时间和学号信息
 * code time username
 */
const userMap = new Map();

// 发送邮箱验证码
router.post('/sendCode', async (req, res) => {
    try {
        const now = Date.now()
        const code = getRandomCode()
        const { email, username } = req.body
        // 首先判断用户是否存在
        // 用户存在
        if (userMap.has(email)) {
            // 判断是否超过10s
            // 如果用户存在并且这个时间小于10s， 说明用户此时是在重复发送验证码，阻止它
            if (isTimeOut(userMap.get(email).time, 10)) {
                res.status(200).json({ msg: '验证码发送过于频繁', code: 1001 })
                return
            } else {
                // 否则我们更新验证码和发送验证码的时间
                userMap.set(email, {
                    code,
                    time: now,
                    username
                })
            }
        }
        // 用户不存在
        else {
            userMap.set(email, {
                code,
                time: now,
                username
            })
        }
        // 发送验证码到用户邮箱
        await transporter.sendMail({
            from: '"验证服务" <2875307658@qq.com>', // 发件人
            to: email, // 收件人
            subject: '哈喽！欢迎使用信号与系统课程智能体服务',
            text: `您的验证码是 ${code}，有效期 5 分钟。`
        })
        res.json({ msg: '验证码已发送', code: 0 })
    } catch (err) {
        console.error(err)
        res.status(400).json({ msg: '邮件发送失败' })
    }
});

// 验证邮箱验证码
router.post('/verifyCode', async (req, res) => {
    try {
        const { sms, email, username } = req.body
        // 检验验证码是否正确
        if (userMap.get(email).code !== sms) {
            res.status(200).json({ msg: '验证码错误', code: 1001 })
            return
        } else {
            // 检验验证码是否过期
            if (!isTimeOut(userMap.get(email).time, 5 * 60)) {
                res.status(200).json({ msg: '验证码过期', code: 1001 })
                return
            } else {
                // 验证成功
                const user = await User.findOne({ username }).lean()

                // 如果存在用户的信息 && 信息中有userid
                if (user && user.userid) {
                    res.status(200).json({ msg: '验证成功', code: 0, userid: user.userid, name: user.name, email, username })
                    // 验证成功后，删除该用户的验证码信息
                    userMap.delete(email)
                    return
                } else {
                    // 说明没有改用户的信息或者第一次登录
                    // 生成一个随机的userid
                    const userid = (username + 'lionyx' + Math.random().toString().slice(2, 8)).split('').reverse().join('')
                    // 保存用户的信息
                    await User.updateOne(
                        { username },
                        { $set: { userid, email } },
                        { upsert: true }
                    )
                    res.status(200).json({ msg: '验证成功', code: 0, userid, name: user.name, email, username })

                    // 验证成功后，删除该用户的验证码信息
                    userMap.delete(email)
                }
            }
        }
    } catch (error) {
        res.status(400).json({ msg: '参数错误', error, code: 1001 })
    }
})

module.exports = router;
