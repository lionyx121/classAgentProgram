// 获取数据
const { graphList, graphNameList, fullData, aliyunData } = require('./data')
const fs = require('fs')
const OpenAI = require("openai");
const apiKey = require('../../config/env').API_KEY
const graphEmbeddingList = require('./output.json');
const { get } = require('http');

// todo 我希望写一个函数能建立一个这样的数据结构
/**
 * Map (
 * id => Map (
 *  relation => [xxxx]
 * )
 */

const graph = new Map()
/**
 * start 是起始节点
 * end 说明start和end之间有一个relation的关系
 * relation 是关系 包含or前导
 */
const addEdge = (start, end, relation, needReverse = true) => {
    if (needReverse) {
        const reverseRelation = relation === '包含' ? '前导' : '包含'
        addEdge(end, start, reverseRelation, false)
    }
    // 判断当前graph有没有start
    if (!graph.has(start)) graph.set(start, new Map())
    // 提取这个map
    const id_map = graph.get(start)
    // 去判断id_map是否有relation
    if (!id_map.has(relation)) id_map.set(relation, new Set())
    // 给set进行赋值
    id_map.get(relation).add(end)
}

// 让graph变成一个json
const graphToJSON = (graph) => {
    const obj = {}
    for (const [id, relMap] of graph.entries()) {
        obj[id] = {}
        for (const [rel, ends] of relMap.entries()) {
            obj[id][rel] = [...ends]
        }
    }
    return obj
}

// 获取到想要的json数据
const getOutputData = () => {
    for (let i = 0; i < graphList.length; i++) {
        const [start, end, relation] = graphList[i]
        addEdge(start, end, relation)
    }

    const graphJson = graphToJSON(graph)

    // 转换成 JSON 格式字符串
    const json = JSON.stringify(graphJson, null, 2);

    // 保存到文件
    fs.writeFileSync("output1.json", json);
}

// 获取到我们想要发给阿里云的数据
const getAliyunData = () => {
    const aliyunList = []
    for (const key in fullData) {
        const baohan = fullData[key]['包含'] || []
        const qiandao = fullData[key]['前导'] || []
        let str = `知识点名称：${graphNameList[key].name}。类型：${graphNameList[key].type}。它包含的子知识点有: ${baohan.map(item => graphNameList[item].name).join('、')}。它的前导知识点有: ${qiandao.map(item => graphNameList[item].name).join('、')}`
        aliyunList.push({
            id: graphNameList[key].name,
            content: str
        })
    }
    return aliyunList
}

// 计算余弦相似度越接近1说明二者越相似，越接近-1越不相似
const cosineSimilarity = (vecA, vecB) => {
    if (vecA.length !== vecB.length) {
        console.warn('计算余弦相似度的二者长度应该相等')
        return
    }
    let dot = 0
    let normalA = 0
    let normalB = 0

    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i]
        normalA += vecA[i] * vecA[i]
        normalB += vecB[i] * vecB[i]
    }

    return dot / (Math.sqrt(normalA) * Math.sqrt(normalB))
}

// 获取相似度高数据从知识图谱中
// vecA 是用户输入问题的向量表 maxOutputLength是返回多少条数据
const getHighSimilarityData = (vecA, maxOutputLength) => {
    const cosineSimilarityList = []
    for (let i = 0; i < graphEmbeddingList.length; i++) {
        const cosine = cosineSimilarity(vecA, graphEmbeddingList[i].embedding)
        cosineSimilarityList.push({
            id: graphEmbeddingList[i].id,
            cosine
        })
    }
    cosineSimilarityList.sort((a, b) => b.cosine - a.cosine)
    return cosineSimilarityList.splice(0, maxOutputLength)
}

// 从阿里云获取向量表
// 初始化 openai 客户端
const openai = new OpenAI({
    // 确保您已经正确设置了环境变量 DASHSCOPE_API_KEY
    apiKey,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
});

// async function getEmbedding(aliyunData) {
//     const BATCH_SIZE = 10;
//     let allVectors = [];

//     // 按批次切分
//     for (let i = 0; i < aliyunData.length; i += BATCH_SIZE) {
//         const batch = aliyunData.slice(i, i + BATCH_SIZE);
//         const inputData = batch.map(item => item.content)
//         console.log(`🚀 正在处理第 ${i + 1} - ${i + batch.length} 条...`);

//         try {
//             const completion = await openai.embeddings.create({
//                 model: "text-embedding-v4",
//                 input: inputData,
//                 dimensions: 1024
//             });

//             const vectors = completion.data.map((item, j) => ({
//                 id: batch[j].id,
//                 text: batch[j].text,
//                 embedding: item.embedding
//             }));

//             allVectors = allVectors.concat(vectors);
//         } catch (error) {
//             console.error("❌ 出错:", error);
//         }
//     }

//     // 保存到 output.json
//     fs.writeFileSync("output.json", JSON.stringify(allVectors, null, 2), "utf-8");
//     console.log("✅ 向量表已保存到 output.json");
// }


async function getEmbedding(str, maxOutputLength = 3) {
    try {
        const completion = await openai.embeddings.create({
            model: "text-embedding-v4",
            input: str,
            dimensions: 1024
        });

        // 获取用户提问的向量表
        const embeddingList = completion.data[0]['embedding']

        // 获取最相近的问题
        const similarity = getHighSimilarityData(embeddingList, maxOutputLength)

        return similarity
    } catch (error) {
        console.error("❌ 出错:", error);
    }
}

async function getTitle(str) {
    const completion = await openai.chat.completions.create({
        model: "qwen-plus",  //此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
        messages: [
            {
                role: "system",
                content: "你是一个标题生成助手，请严格按照以下规则输出标题：\n\
1. 根据用户提供的问题内容提炼核心主题。\n\
2. 用简洁的中文表达，不要包含标点符号和引号。\n\
3. 标题长度必须在8到10个汉字之间。\n\
4. 只输出标题文本，不要解释说明。"},
            { role: "user", content: str }
        ],
    });
    return completion.choices[0].message.content
}

module.exports = {
    getEmbedding,
    getTitle
}
