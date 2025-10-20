// 获取echarts数据 力导向图
function generateGraphData(fullData, graphNameList) {
    const colorList = [
        "#00B4D8",
        "#0096C7",
        "#023EBA",
        "#03045E",
        "#4361EE",
        "#4895EF",
        "#56CFE1",
        "#72EFDD",
        "#80FFDB",
    ]

    const graphData = { data: [] }
    const graphSet = new Set()

    function getGraphData(obj, key, index) {
        // 去获取当前的name
        const name = graphNameList[key].name
        // 如果当前节点信息已经存在，就跳过
        if (graphSet.has(key)) return

        const node = {
            id: key.toString(),
            name,
            color: colorList[index],
            symbolSize: 20,
            draggable: true,
        }

        graphData.data.push(node)
        graphSet.add(key)

        const temp = obj['包含'] || []
        if (temp.length === 0) return

        temp.forEach((item) => {
            const targetIndex = index + 1 > 9 ? 9 : index + 1
            getGraphData(fullData[item], item, targetIndex)
        })
    }

    // 确保输出目录存在
    const outputDir = path.join(__dirname, 'graphData')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    for (const key in fullData) {
        getGraphData(fullData[key], key, 0)
    }

    // ✅ 循环结束后只保存一次
    const outputPath = path.join(outputDir, 'echartsData.json')
    fs.writeFileSync(outputPath, JSON.stringify(graphData, null, 2))

    console.log('✅ 图数据已成功写入到: ', outputPath)

    return graphData
}

// 获取echarts数据 关系图
function labelGraphData(fullData, graphNameList) {
    const sizeList = [33.33, 22.78, 13.64, 6.32, 2.67]

    const labelData = { nodes: [], links: [], categories: [] }
    const labelSet = new Set()
    const categoryName = []

    let categoryIndex = 1

    function getNodeData(key, category = -1, deep = 0) {
        const targetKey = key.toString()

        // 已存在则不重复
        if (labelSet.has(targetKey)) return

        if (deep > 5) deep = 5

        const name = graphNameList[key].name
        const containList = fullData[key]['包含'] || []

        // 对deep进行一定的约束，让虽然是根节点但是没有包含的节点的大小能按照我们所想
        if (deep === 0 && containList.length < 2) {
            deep = 5
        }

        let targetCategory

        if (category === -1) {
            // 根节点
            targetCategory = 0
        } else if (category === 0) {
            // 根节点的直接子节点，分配新分类
            targetCategory = categoryIndex++
        } else {
            // 其他节点继承父节点分类
            targetCategory = category
        }

        if (categoryName[targetCategory] === undefined) {
            categoryName[targetCategory] = name
        }

        const node = {
            id: targetKey,
            name,
            category: targetCategory,
            symbolSize: sizeList[deep], // 防止越界
        }

        labelData.nodes.push(node)
        labelSet.add(targetKey)

        // 遍历包含数组
        containList.forEach((item) => {
            const link = {
                source: targetKey,
                target: item.toString(),
            }
            labelData.links.push(link)
            getNodeData(item, targetCategory, deep + 1) // ✅ 子节点继承父级分类
        })
    }

    for (const key in fullData) {
        if (!labelSet.has(key.toString())) { // 只从根节点开始
            getNodeData(key)
        }
    }

    for (let i = 0; i < categoryIndex; i++) {
        labelData.categories.push({
            name: categoryName[i],
        })
    }

    // 确保输出目录存在
    const outputDir = path.join(__dirname, 'labelData')

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // ✅ 循环结束后只保存一次
    const outputPath = path.join(outputDir, 'labelData.json')
    fs.writeFileSync(outputPath, JSON.stringify(labelData, null, 2))

    console.log('✅ 图数据已成功写入到: ', outputPath)

    return labelData
}