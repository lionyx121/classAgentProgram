const mongoose = require('mongoose');

// 一次对话中的最小对象
const chatHistoryOneSchema = new mongoose.Schema({
    role: { type: String, default: '' },
    content: { type: String, default: '' },
    createTime: { type: Date, default: Date.now },
    isDone: { type: Boolean, default: true }
})

// 用户整体的知识点掌握度表（全局 embedding）
const embeddingSchema = new mongoose.Schema({
    className: { type: String, default: '' },
    classKey: { type: String, default: '' },
    interest: { type: Number, default: 0 },
    mastery: { type: Number, default: 0 },
    time: { type: Date, default: Date.now }
})

// ✅ 每一次对话在时间线上的一个节点
// 每个节点包含：时间 + 一组相关知识点
const timeLineItemSchema = new mongoose.Schema({
    time: { type: Date, default: Date.now },
    classList: [
        {
            id: { type: String, default: '' },
            key: { type: String, default: '' },
            cosine: { type: String, default: '' }
        }
    ]
})

// 用户询问的时间线（由多个 timeLineItem 组成）
const timeLineSchema = new mongoose.Schema({
    timeLineEmbedding: {
        type: [timeLineItemSchema],
        default: []
    }
})

// 一次完整的对话
const chatHistoryManySchema = new mongoose.Schema({
    chatHistory: {
        type: [chatHistoryOneSchema],
        default: []
    },
    title: { type: String },
    timeLine: { type: timeLineSchema }
})

// 用户总体信息
const userSchema = new mongoose.Schema({
    // 学号
    username: { type: String, required: true },

    // 邮箱
    email: { type: String, default: '' },

    // 姓名
    name: { type: String, default: '' },

    // 用户凭证
    userid: { type: String, default: '' },

    // 所有对话记录
    history: {
        type: [chatHistoryManySchema],
        default: []
    },

    // 知识点向量表
    embeddings: {
        type: [embeddingSchema],
        default: []
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
