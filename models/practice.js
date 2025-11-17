const mongoose = require('mongoose')

const optionsSchema = new mongoose.Schema({
    A: {
        type: String,
        required: true,
    },
    B: {
        type: String,
        required: true,
    },
    C: {
        type: String,
        required: true,
    },
    D: {
        type: String,
        required: true,
    }
})

const images = new mongoose.Schema({
    title: {
        type: String,
    },
    A: {
        type: String,
    },
    B: {
        type: String,
    },
    C: {
        type: String,
    },
    D: {
        type: String,
    }
})

// 这是每一个题目的schema
const classItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    titleImg: {
        type: String,
    },
    options: {
        type: optionsSchema,
        required: true,
    },
    images: {
        type: images,
    },
    answer: {
        type: String,
        required: true,
    },
    analysis: {
        type: String
    },
    DifficultyLevel: {
        type: String,
        required: true,
    },
    numberKey: {
        type: String,
        required: true,
    },
    strKey: {
        type: String,
        required: true,
    },
    similarity: {
        type: Array
    },
    key: {
        type: String,
        required: true
    }
})

const questionItemSchema = new mongoose.Schema({
    questionKey: {
        type: String,
        required: true,
    },
    cosine: {
        type: Number,
    }
})

const knowledgePointSchema = new mongoose.Schema({
    knowledgeName: {
        type: String,
        required: true,
    },
    knowledgeKey: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionItemSchema]
    }
})

const practiceSchema = new mongoose.Schema({
    data: {
        type: [classItemSchema],
        default: {},
    },
    knowledgePoint: {
        type: [knowledgePointSchema]
    }
}, { timestamps: true })

module.exports = mongoose.model('Practice', practiceSchema)
