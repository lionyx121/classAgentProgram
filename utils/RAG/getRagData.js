const OpenAI = require("openai");
const apiKey = require('../../config/env').API_KEY
const graphEmbeddingList = require('./handleFunction/handleData/embeddingData.json');

// 从阿里云获取向量表
// 初始化 openai 客户端
const openai = new OpenAI({
    // 确保您已经正确设置了环境变量 DASHSCOPE_API_KEY
    apiKey,
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
});

// 获取用户提问的向量表
async function getEmbedding(str) {
    try {
        const completion = await openai.embeddings.create({
            model: "text-embedding-v4",
            input: str,
            dimensions: 1024
        });

        // 获取用户提问的向量表
        const embeddingList = completion.data[0]['embedding']

        // 获取最相近的问题
        const similarity = getHighSimilarityData(embeddingList)

        return similarity
    } catch (error) {
        console.error("❌ 出错:", error);
    }
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
const getHighSimilarityData = (vecA) => {
    const cosineSimilarityList = []
    for (let i = 0; i < graphEmbeddingList.length; i++) {
        const cosine = cosineSimilarity(vecA, graphEmbeddingList[i].embedding)
        cosineSimilarityList.push({
            id: graphEmbeddingList[i].id,
            key: graphEmbeddingList[i].key,
            cosine
        })
    }
    cosineSimilarityList.sort((a, b) => b.cosine - a.cosine)
    return cosineSimilarityList
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
    const promptContent = `你是一个“信号与系统提问水平评估与延伸助手”。

你的任务包括两个部分：
1. 评估用户提问在各个相关知识点上的理解深度。
2. 基于这些知识点，生成一些用户可能感兴趣的延伸问题。

---

### 输出格式（严格遵守）
只输出一个合法 JSON 对象，格式如下：

{
  "interest": {
    "知识点A": 分数,
    "知识点B": 分数
  },
  "questions": [
    "延伸问题1",
    "延伸问题2"
  ]
}

---

### 评分标准（0~10）
请根据**理解深度与提问质量**（而非知识点重要性）评分：

- **0~2分**：无意义、闲聊或与知识点无关  
  例："你好"、"帮我讲讲信号"
- **3~5分**：基础或概念性提问，体现初步理解  
  例："什么是冲激信号"、"系统函数是什么意思"
- **6~7分**：能联系知识点进行应用或分析  
  例："冲激响应如何描述系统特性"
- **8~9分**：具有综合性或创新思考  
  例："系统函数极点位置与系统稳定性的关系"
- **10分**：研究级或推理性问题  
  例："如何利用冲激响应推导系统在非线性条件下的稳态输出"

---

### 延伸问题生成要求
1. 结合这些知识点，生成 2~4 个用户可能感兴趣的深层或相关问题；
2. 延伸问题应具有**启发性与层次性**，可以帮助学习者进一步探索；
3. 不要生成与原问题完全重复或等价的问题；
4. 使用自然中文语句。

---

### 示例
输入：
问题：系统函数的极点和零点有什么意义
相关知识点：系统函数、极点、零点

输出：
{
  "interest": {
    "系统函数": 7.5,
    "极点": 8,
    "零点": 8
  },
  "questions": [
    "如何通过极点和零点位置判断系统稳定性？",
    "极点分布对系统的频率响应有何影响？"
  ]
}`

    // 2️⃣ 如果没有相关知识点，只打单一分
    if (!relatedTopics || relatedTopics.length === 0) {
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: [
                {
                    role: "system",
                    content: promptContent
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
                content: promptContent
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
            interest: item.interest * decay
        }
    })

    // 2️⃣ 相似度加权
    similarity.forEach(sim => {
        if (sim.cosine > 0.5) {
            const target = timeDecayEmbedding.find(t => t.className === sim.id)
            if (target) {
                target.interest += sim.cosine
                target.time = Date.now() // ✅ 更新该维度的时间戳
            }
        }
    })

    // 3️⃣ 归一化
    let sum = Math.sqrt(timeDecayEmbedding.reduce((s, i) => s + i.interest ** 2, 0))

    if (sum === 0) return timeDecayEmbedding
    timeDecayEmbedding.forEach(i => { i.interest /= sum })

    return timeDecayEmbedding
}


module.exports = {
    getEmbedding,
    getTitle,
    updateEmbedding,
    scoreQuestion,
    getHighSimilarityData
}
