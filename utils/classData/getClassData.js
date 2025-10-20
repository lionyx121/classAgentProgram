const Class = require('../../models/classData')
const { graphNameList } = require('../RAG/data')

// 初始化知识点数据
async function initClassData() {
    const data = {}
    for (const key in graphNameList) {
        const name = graphNameList[key].name
        data[key] = { className: name, classKey: key, askCount: 0, errorCount: 0 }
    }

    // 如果不存在则创建
    await Class.findOneAndUpdate(
        {},
        { data },
        { upsert: true, new: true }
    )
}

initClassData()