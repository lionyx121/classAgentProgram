interface node {
    id: string,
    name: string,
    color: string,
    symbolSize: number,
    draggable?: boolean
}

interface link {
    source: string,
    target: string,
    name: string,
}

interface graphData {
    data: node[],
    link: link[],
}

export const useGrapgData = (fullData: any, graphNameList: any) => {
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

    const graphData: graphData = {
        "data": [],
        "link": []
    }

    const graphSet = new Set()

    const getGraphData = (obj: any, key: string, index: number) => {
        const name = graphNameList[key].name
        // 如果已经添加过了，就不添加了
        if (graphSet.has(name)) return
        // 添加节点
        const node: node = {
            id: key,
            name: name,
            color: colorList[index],
            symbolSize: 14,
            draggable: true
        }
        graphData['data'].push(node)
        graphSet.add(name)

        const temp = obj['包含'] || []

        // 如果没有包含数组，就不添加link
        if (temp.length === 0) return

        temp.forEach((item: string) => {
            const link: link = {
                source: name,
                target: graphNameList[item].name,
                name: '前导'
            }
            graphData['link'].push(link)
            let target = index + 1 > 9 ? 9 : index + 1
            getGraphData(fullData[item], item, target)
        })
    }

    for (const key in fullData) {
        getGraphData(fullData[key], key, 0)
    }

    const getShowData = (nodeKey: string, nodeList: any) => {
        const showData: graphData = {
            "data": [],
            "link": []
        }

        const added = new Set<string>()
        const pushNodeOnce = (n: any) => {
            if (!n) return
            if (added.has(n.id)) return
            added.add(n.id)
            showData.data.push(n)
        }
        const pushLink = (source: string, target: string, name: string) => {
            showData.link.push({ source, target, name })
        }

        // 轻量版防重叠函数
        const relaxLayout = (nodes: any[], minDist = 40) => {
            const strength = 0.6 // 排斥强度，可调
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i]
                    const b = nodes[j]
                    if (!a || !b) continue
                    const dx = (a.x ?? 0) - (b.x ?? 0)
                    const dy = (a.y ?? 0) - (b.y ?? 0)
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < minDist && dist > 1e-3) {
                        const overlap = (minDist - dist) / 2
                        const nx = (dx / dist) * overlap * strength
                        const ny = (dy / dist) * overlap * strength
                        a.x += nx
                        a.y += ny
                        b.x -= nx
                        b.y -= ny
                    }
                }
            }
        }

        const buildRelationGraph = (arr: string[], val: any, relationType: '包含' | '前导' | '关联') => {
            if (!val || !Array.isArray(arr) || arr.length === 0) return

            const total = arr.length
            const centerX = val?.x ?? 0
            const centerY = val?.y ?? 500

            for (let i = 0; i < total; i++) {
                const targetId = arr[i]
                const targetNode = nodeList.find((node: node) => node.id == targetId)
                if (!targetNode) continue

                if (relationType === '包含' || relationType === '前导') {
                    const sign = relationType === '包含' ? 1 : -1
                    const mod = i % 5
                    const group = Math.floor(i / 5)
                    const laneYs = [500, 300, 700, 100, 900]
                    const yBase = laneYs[mod]
                    const jitterY = Math.random() * 40 - 20

                    targetNode.x = centerX + (300 + group * 120) * sign
                    targetNode.y = centerY + (yBase - 500) + jitterY

                    pushNodeOnce(targetNode)
                    if (relationType === '包含') {
                        pushLink(String(val.id), String(targetId), '包含')
                    } else {
                        pushLink(String(targetId), String(val.id), '前导')
                    }
                } else {
                    // 环形分布 + 轻度扰动
                    const perRing = 10
                    const ring = Math.floor(i / perRing)
                    const idxInRing = i % perRing
                    const radius = 220 + ring * 120 + Math.min(total, 20) * 4
                    const angle = (2 * Math.PI / perRing) * idxInRing

                    const jitterX = Math.random() * 16 - 8
                    const jitterY = Math.random() * 16 - 8

                    targetNode.x = centerX + Math.cos(angle) * radius + jitterX
                    targetNode.y = centerY + Math.sin(angle) * radius + jitterY

                    pushNodeOnce(targetNode)
                    pushLink(String(val.id), String(targetId), '关联')
                }
            }

            // 🔥 调用防遮挡逻辑
            relaxLayout(showData.data, 45)
        }

        // 去寻找node
        const val = nodeList.find((item: node) => item.id === nodeKey)

        // 对它进行位置上的处理
        if (val) {
            // val['symbolSize'] = 30
            val['x'] = 0
            val['y'] = 500
            val['fixed'] = true
        }

        // 去获取当前节点的关系数组
        const include = fullData[nodeKey]['包含'] || [] // 包含
        const pioneer = fullData[nodeKey]['前导'] || [] // 前导
        const association = fullData[nodeKey]['关联'] || [] // 关联

        // 对包含和前导数据进行处理
        buildRelationGraph(include, val, '包含')
        buildRelationGraph(pioneer, val, '前导')
        buildRelationGraph(association, val, '关联')

        showData['data'].push(val)

        return showData
    }

    return {
        graphData,
        getShowData
    }
}
