// 获取数据
const { graphList, graphNameList, fullData, aliyunData } = require('./data')
const fs = require('fs')
const path = require('path')
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

// 获取用户提问的标题
async function getTitle(str) {
    const completion = await openai.chat.completions.create({
        model: "qwen-plus",
        messages: [
            {
                role: "system",
                content: `你是一个问题标题生成器。
请严格按照以下规则输出：

1. 标题必须像真实用户在知乎/论坛/StackOverflow 提问的标题，简洁直白。
2. 不允许出现寒暄（如“你好”、“请问”、“今天我能帮您什么”）、礼貌用语或AI助理语气。
3. 标题长度建议控制在6到8个汉字之间，不要强行凑字数。
4. 如果用户输入内容非常短（如只有“你好”），只返回与输入相同的内容，不要额外生成无关标题。
5. 只输出标题文本，不要解释说明。

示例：
输入：如何在Vue3项目中使用PWA
输出：Vue3项目如何接入PWA

输入：git push没有设置upstream
输出：git push如何设置远程分支

输入：你好
输出：你好
`
            },
            { role: "user", content: str }
        ],
    });
    return completion.choices[0].message.content
}

// 优化版：根据问题和知识点打分
async function scoreQuestion(str, relatedTopics = []) {

    const text = str.trim();

    // 2️⃣ 如果没有相关知识点，只打单一分
    if (!relatedTopics || relatedTopics.length === 0) {
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                {
                    role: "system",
                    content: `你是一个“问题水平评估助手”，用于评估用户在信号与系统相关知识点上的提问水平。
请你根据每个知识点分析用户提问的**理解深度与提问质量**，而不是问题本身的复杂性。
输出格式：
{
  "知识点A": 分数,
  "知识点B": 分数
}
评分标准（0~10）：
- **0~2分**：无意义、闲聊或与知识点无关的内容  
  （如“你好”、“帮我讲讲信号”）
- **3~5分**：基础性或概念性提问，体现出初步理解  
  （如“什么是冲激信号”、“系统函数是什么意思”）
- **6~7分**：应用层提问，说明用户能联系知识点进行分析  
  （如“冲激响应如何描述系统特性”、“系统函数能否反推时域响应”）
- **8~9分**：具有综合性或创新思考的问题  
  （如“系统函数极点位置与系统稳定性的关系”）
- **10分**：极高水平、深入、具备推理或研究性质的问题  
  （如“如何利用冲激响应推导系统在非线性条件下的稳态输出”）
要求：
1. 你的任务是评价提问者的理解水平，而不是知识点的重要性。
2. 不要给概念性问题打高分。
3. 严格只输出一个 JSON 对象，key 是知识点，value 是 0~10 的数字（可含小数）。
4. 不要输出任何解释说明或文字。
示例：
输入问题：信号与系统是什么
知识点：信号与系统、系统、分类
输出：{"信号与系统": 5, "系统": 4, "分类": 3}
输入问题：系统函数的极点和零点有什么意义
知识点：系统函数、极点、零点
输出：{"系统函数": 7, "极点": 8, "零点": 8}`
                },
                { role: "user", content: text }
            ],
        });
        const result = completion.choices[0].message.content.trim();
        const score = Number(result);
        return isNaN(score) ? 0 : score;
    }

    // 3️⃣ 否则，对每个相关知识点单独打分
    const topicPrompt = relatedTopics.join('、');
    const completion = await openai.chat.completions.create({
        model: "qwen-plus",
        messages: [
            {
                role: "system",
                content: `你是一个“问题水平评估助手”，用于评估用户在信号与系统相关知识点上的提问水平。
请你根据每个知识点分析用户提问的**理解深度与提问质量**，而不是问题本身的复杂性。
输出格式：
{
  "知识点A": 分数,
  "知识点B": 分数
}
评分标准（0~10）：
- **0~2分**：无意义、闲聊或与知识点无关的内容  
  （如“你好”、“帮我讲讲信号”）
- **3~5分**：基础性或概念性提问，体现出初步理解  
  （如“什么是冲激信号”、“系统函数是什么意思”）
- **6~7分**：应用层提问，说明用户能联系知识点进行分析  
  （如“冲激响应如何描述系统特性”、“系统函数能否反推时域响应”）
- **8~9分**：具有综合性或创新思考的问题  
  （如“系统函数极点位置与系统稳定性的关系”）
- **10分**：极高水平、深入、具备推理或研究性质的问题  
  （如“如何利用冲激响应推导系统在非线性条件下的稳态输出”）
要求：
1. 你的任务是评价提问者的理解水平，而不是知识点的重要性。
2. 不要给概念性问题打高分。
3. 严格只输出一个 JSON 对象，key 是知识点，value 是 0~10 的数字（可含小数）。
4. 不要输出任何解释说明或文字。
示例：
输入问题：信号与系统是什么
知识点：信号与系统、系统、分类
输出：{"信号与系统": 5, "系统": 4, "分类": 3}
输入问题：系统函数的极点和零点有什么意义
知识点：系统函数、极点、零点
输出：{"系统函数": 7, "极点": 8, "零点": 8}`
            },
            {
                role: "user",
                content: `问题：${text}\n相关知识点：${topicPrompt}`
            }
        ],
    });

    const content = completion.choices[0].message.content.trim();
    try {
        const json = JSON.parse(content);
        return json;
    } catch {
        // 如果模型输出格式有误，直接返回空对象
        return {};
    }
}


// 更新用户知识点向量表
// lambda -> 时间衰减因子，默认 0.0495 (半衰期约14天)
const updateEmbedding = (embedding, similarity, lambda = Math.log(2) / 14) => {
    // 1️⃣ 时间衰减
    const timeDecayEmbedding = embedding.map(item => {
        const deltaDays = item.time ? (Date.now() - new Date(item.time)) / (1000 * 60 * 60 * 24) : 0
        const decay = Math.exp(-lambda * deltaDays)
        return {
            ...item,
            pride: item.pride * decay
        }
    })

    // 2️⃣ 相似度加权
    similarity.forEach(sim => {
        if (sim.cosine > 0.5) {
            const target = timeDecayEmbedding.find(t => t.className === sim.id)
            if (target) {
                target.pride += sim.cosine
                target.time = Date.now() // ✅ 更新该维度的时间戳
            }
        }
    })

    // 3️⃣ 归一化
    let sum = Math.sqrt(timeDecayEmbedding.reduce((s, i) => s + i.pride ** 2, 0))

    if (sum === 0) return timeDecayEmbedding
    timeDecayEmbedding.forEach(i => { i.pride /= sum })

    return timeDecayEmbedding
}


module.exports = {
    getEmbedding,
    getTitle,
    updateEmbedding,
    scoreQuestion
}
