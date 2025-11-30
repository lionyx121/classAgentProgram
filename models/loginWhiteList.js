const mongoose = require('mongoose')

const loginWhiteListSchema = new mongoose.Schema({
    // 学号
    username: {
        type: String,
        required: true
    },
    // 姓名
    name: {
        type: String,
        required: true
    },
    // 性别
    sex: {
        type: String,
        required: true
    },
    // 学院
    college: {
        type: String,
        required: true
    },
    // 专业
    major: {
        type: String,
        required: true
    },
    // 年级
    grade: {
        type: String,
        required: true
    },
    // 班级
    class: {
        type: String,
        required: true
    },
    // 序号
    number: {
        type: Number,
        required: true
    },
}, { timestamps: true })


// 登录的白名单
const loginWhiteList = new mongoose.Schema({
    loginWhite: {
        type: [loginWhiteListSchema],
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('LoginWhiteList', loginWhiteList)
