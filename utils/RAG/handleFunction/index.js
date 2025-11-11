const XLSX = require('xlsx');
const fs = require('fs')
const path = require('path')
const apiKey = require('../../../config/env').API_KEY
const OpenAI = require("openai");
const { generateGraphData, labelGraphData } = require('../echarts/getEchartsData')

// 处理excel文件
const handleExcel = () => {
    const namePath = path.join(__dirname, 'data', 'name.xlsx')
    const graphPath = path.join(__dirname, 'data', 'graph.xlsx')
    // 处理 Excel 文件
    // 读取姓名工作表
    const nameWorkBook = XLSX.readFile(namePath);
    // 读取关系工作表
    const graphWorkBook = XLSX.readFile(graphPath);

    // 获取姓名工作表的表头
    const nameSheetName = nameWorkBook.SheetNames[0];
    // 获取关系工作表的表头
    const graphSheetName = graphWorkBook.SheetNames[0];

    // 获取姓名工作表
    const nameWorkSheet = nameWorkBook.Sheets[nameSheetName];
    // 获取关系工作表
    const graphWorkSheet = graphWorkBook.Sheets[graphSheetName];

    // 将工作表转换为 JSON（每一行是一个对象）
    const nameJsonData = XLSX.utils.sheet_to_json(nameWorkSheet);
    const graphJsonData = XLSX.utils.sheet_to_json(graphWorkSheet);

    return {
        nameJsonData,
        graphJsonData
    }
}

// 处理name文件
const handleName = (nameJsonData) => {
    const graphNameList = {}
    nameJsonData.forEach(item => {
        const { number, name, type } = item
        graphNameList[number] = {
            name,
            type
        }
    })
    return graphNameList
}

// 获取处理后的关系图
const handleGraph = (graphJsonData) => {
    // 处理后的关系图
    const graph = new Map()

    // 处理边的关系
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

    // 调用当前的addEdge
    for (let i = 0; i < graphJsonData.length; i++) {
        const { start, end, relation } = graphJsonData[i]
        addEdge(start, end, relation)
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

    return graphToJSON(graph)
}

// 写入json数据到handlData中
const saveJsonData = (jsonData, fileName = 'ProcessedData') => {
    const dirPath = './handleData';
    const filePath = path.join(dirPath, `${fileName}.json`);

    // 1️⃣ 确保目录存在
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }) // recursive 表示可递归创建
    }

    // 2️⃣ 确保文件存在（如果不存在就创建一个空 JSON 文件）
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8') // 或者 '{}'，看你需要数组还是对象
    }

    // 写入 JSON 文件
    fs.writeFileSync(`./handleData/${fileName}.json`, JSON.stringify(jsonData, null, 2), 'utf-8');
}

// 获取到我们想要发给阿里云的数据
const getAliyunData = (graphData, graphNameList) => {
    const aliyunList = []
    for (const key in graphData) {
        const baohan = graphData[key]['包含'] || []
        const qiandao = graphData[key]['前导'] || []
        const guanlian = graphData[key]['关联'] || []
        let str = `知识点名称：${graphNameList[key].name}。类型：${graphNameList[key].type}。它包含的子知识点有: ${baohan.map(item => graphNameList[item].name).join('、')}。它的前导知识点有: ${qiandao.map(item => graphNameList[item].name).join('、')}。它的关联知识点有: ${guanlian.map(item => graphNameList[item].name).join('、')}`
        aliyunList.push({
            id: graphNameList[key].name,
            key,
            content: str
        })
    }
    return aliyunList
}

// 从阿里云获取知识点向量表
const getEmbedding = async (aliyunList) => {
    const openai = new OpenAI({
        apiKey,
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1'
    });

    const prompts = aliyunList.map(item => item.content)

    const BATCH_SIZE = 10
    const allEmbeddings = []

    for (let i = 0; i < prompts.length; i += BATCH_SIZE) {
        const batch = prompts.slice(i, i + BATCH_SIZE)
        console.log(`🚀 正在生成第 ${i / BATCH_SIZE + 1} 批 (${batch.length} 条)...`)

        try {
            const completion = await openai.embeddings.create({
                model: "text-embedding-v4",
                input: batch,
                dimensions: 1024
            });

            const batchEmbeddings = completion.data.map((item, idx) => ({
                id: aliyunList[i + idx].id,
                key: aliyunList[i + idx].key,
                embedding: item.embedding
            }));

            allEmbeddings.push(...batchEmbeddings)
        } catch (error) {
            console.error("❌ 出错:", error)
        }
    }

    return allEmbeddings
}

const handleFunc = async () => {
    // 处理excel文件
    const { nameJsonData, graphJsonData } = handleExcel();
    // 处理关系图
    const graphData = handleGraph(graphJsonData)
    // 处理name文件
    const graphNameList = handleName(nameJsonData)
    // 写入关系图数据到handlData中
    saveJsonData(graphData, 'graphData')
    // 写入姓名数据到handlData中
    saveJsonData(graphNameList, 'nameData')
    // 拼接我们要发给阿里云的数据
    const aliyunList = getAliyunData(graphData, graphNameList)
    // 获取向量表
    const allEmbeddings = await getEmbedding(aliyunList)
    // 保存向量表到handlData中
    saveJsonData(allEmbeddings, 'embeddingData')
    // 处理echarts数据 力导向图
    const echartsGraphData = generateGraphData(graphData, graphNameList)
    // 处理echarts数据 关系图
    const echartsLabelData = labelGraphData(graphData, graphNameList)
    // 保存相关数据
    saveJsonData(echartsGraphData, 'echartsGraphData')
    saveJsonData(echartsLabelData, 'echartsLabelData')
};

module.exports = {
    handleFunc,
    getEmbedding
}
