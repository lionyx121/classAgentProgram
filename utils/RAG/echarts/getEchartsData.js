// 获取echarts数据 力导向图
function generateGraphData(fullData, graphNameList) {
    const colorList = [
        "#3B82F6", // 蓝色：掌握程度很低（冷静）
        "#06B6D4", // 青色：刚开始理解
        "#10B981", // 绿色：基本掌握
        "#84CC16", // 黄绿：较熟练
        "#FACC15", // 黄色：熟练
        "#FB923C", // 橙色：掌握良好
        "#F97316", // 深橙：接近精通
        "#EF4444", // 红色：精通、高亮
        "#B91C1C"  // 深红：专家级
    ]

    const graphData = { data: [], hash: Math.random().toString().slice(2, 10) }
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

    for (const key in fullData) {
        getGraphData(fullData[key], key, 0)
    }

    return graphData
}

// 获取echarts数据 关系图
function labelGraphData(fullData, graphNameList) {
    const sizeList = [33.33, 22.78, 13.64, 6.32, 2.67]

    const labelData = { nodes: [], links: [], categories: [], hash: Math.random().toString().slice(2, 10) }
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

    return labelData
}

module.exports = {
    generateGraphData,
    labelGraphData
}