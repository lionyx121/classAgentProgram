const express = require('express');
const router = express.Router();

const Class = require('../../models/classData')
const User = require('../../models/user')

const echartsGraphData = require('../../utils/RAG/handleFunction/handleData/echartsGraphData.json')
const echartsLabelData = require('../../utils/RAG/handleFunction/handleData/echartsLabelData.json')
const graphData = require('../../utils/RAG/handleFunction/handleData/graphData.json')
const nameData = require('../../utils/RAG/handleFunction/handleData/nameData.json')

const useGrapgData = (fullData, graphNameList) => {
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

    const graphData = {
        "data": [],
        "link": []
    }

    const graphSet = new Set()

    const getGraphData = (obj, key, index) => {
        const name = graphNameList[key].name
        // 如果已经添加过了，就不添加了
        if (graphSet.has(name)) return
        // 添加节点
        const node = {
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

        temp.forEach((item) => {
            const link = {
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

    const getShowData = (nodeKey, nodeList) => {
        const showData = {
            "data": [],
            "link": []
        }

        const added = new Set()
        const pushNodeOnce = (n) => {
            if (!n) return
            if (added.has(n.id)) return
            added.add(n.id)
            showData.data.push(n)
        }
        const pushLink = (source, target, name) => {
            showData.link.push({ source, target, name })
        }

        // 轻量版防重叠函数
        const relaxLayout = (nodes, minDist = 40) => {
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

        const buildRelationGraph = (arr, val, relationType) => {
            if (!val || !Array.isArray(arr) || arr.length === 0) return

            const total = arr.length
            const centerX = val?.x ?? 0
            const centerY = val?.y ?? 500

            for (let i = 0; i < total; i++) {
                const targetId = arr[i]
                const targetNode = nodeList.find((node) => node.id == targetId)
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
        const val = nodeList.find((item) => item.id === nodeKey)

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

// 初始化知识点数据
router.post('/initClassData', async (req, res) => {
    try {
        const graphNameList = req.body
        const data = []
        for (const key in graphNameList) {
            const name = graphNameList[key].name
            data.push({ className: name, classKey: key, askCount: 0, errorCount: 0 })
        }

        // 如果不存在则创建
        await Class.findOneAndUpdate(
            {},
            { data },
            { upsert: true, new: true }
        )

        res.json({ msg: '初始化知识点数据成功', data })
    } catch (error) {
        res.status(400).json({ msg: '初始化知识点数据失败', code: 1001, error: error.message || error })
    }
})

// 初始化节点信息
router.get('/initRootData', (req, res) => {
    try {
        const nowGraphHash = echartsGraphData.hash
        const nowlabelHash = echartsLabelData.hash

        const etag = nowGraphHash.toString() + nowlabelHash.toString()
        // 请求头里面的etag
        const clientEtag = req.headers['if-none-match'] || ''
        const rootData = {
            echatNode: echartsGraphData,
            echartsLabelData,
            fullData: graphData,
            graphNameList: nameData
        }

        // 检查二者是否相等
        if (etag === clientEtag) {
            // 内容没变
            res.status(304).end()
            return
        }

        // 内容有更新
        res.setHeader('ETag', etag)
        res.status(200).json({ rootData })

    } catch (error) {
        res.status(400).json({ error: error.message || error, msg: '初始化节点失败' })
    }
})

// 获取要展示的节点的信息(拼接颜色和当前对该知识点的掌握程度)
router.post('/getShowClassData', (req, res) => {
    try {
        const { getShowData } = useGrapgData(graphData, nameData)
    } catch (error) {
        res.status(400).json({ error: error.message || error, msg: '获取要展示的节点的信息失败' })
    }
})

module.exports = router;
