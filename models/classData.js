const mongoose = require('mongoose')

const classItemSchema = new mongoose.Schema({
    className: { type: String, required: true },
    classKey: { type: String, required: true },
    askCount: { type: Number, default: 0 },
    errorCount: { type: Number, default: 0 },
    time: { type: Date, default: Date.now },
}, { _id: false })

const classSchema = new mongoose.Schema({
    data: {
        type: [classItemSchema],
        default: {},
    },
}, { timestamps: true })

module.exports = mongoose.model('Class', classSchema)
