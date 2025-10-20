// 这是和用户信息相关的数据库类型声明

const mongoose = require('mongoose');

// 一次对话中的最小对象
const chatHistoryOneSchema = new mongoose.Schema({
    role: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    isDone: {
        type: Boolean,
        default: true
    }
})

// 一次对话
const chatHistoryManySchema = new mongoose.Schema({
    chatHistory: {
        type: [chatHistoryOneSchema],
        default: []
    },
    title: {
        type: String,
    }
})

const embeddingSchema = new mongoose.Schema({
    className: {
        type: String,
        default: ''
    },
    classKey: {
        type: String,
        default: ''
    },
    pride: {
        type: Number,
        default: 0
    },
    time: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
    // 学号
    username: {
        type: String,
        required: true,
    },
    // 邮箱
    email: {
        type: String,
        default: ''
    },
    // 姓名
    name: {
        type: String,
        default: ''
    },
    // 用户凭证
    userid: {
        type: String,
        default: ''
    },
    // 所有的对话记录
    history: {
        type: [chatHistoryManySchema],
        default: []
    },
    // 知识点向量表
    embeddings: {
        type: [embeddingSchema],
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);