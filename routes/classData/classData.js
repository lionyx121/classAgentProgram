const express = require('express');
const router = express.Router();

const Class = require('../../models/classData')
const User = require('../../models/user')

const echartsGraphData = require('../../utils/RAG/handleFunction/handleData/echartsGraphData.json')
const echartsLabelData = require('../../utils/RAG/handleFunction/handleData/echartsLabelData.json')
const graphData = require('../../utils/RAG/handleFunction/handleData/graphData.json')
const nameData = require('../../utils/RAG/handleFunction/handleData/nameData.json')

// 初始化知识点数据
router.get('/initClassData', async (req, res) => {
    try {
        const data = []

        echartsGraphData['data'].forEach(item => {
            data.push({ className: item.name, classKey: item.id, askCount: 0, errorCount: 0 })
        })

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

    // 做一个根据用户的mastery去进行颜色匹配的函数
    const getColor = (mastery) => {
        if (mastery >= 0.7) return colorList[8]
        if (mastery >= 0.5) return colorList[7]
        if (mastery >= 0.3) return colorList[6]
        if (mastery >= 0.1) return colorList[5]
        if (mastery >= -0.1) return colorList[4]
        if (mastery >= -0.3) return colorList[3]
        if (mastery >= -0.5) return colorList[2]
        if (mastery >= -0.7) return colorList[1]
        return colorList[0]
    }

    const getSuggestion = (mastery) => {
        if (mastery >= 0.7) return "掌握得很好！可以尝试进阶拓展内容、做高难度练习巩固实力。"
        if (mastery >= 0.5) return "已经很不错啦！可以增加综合性题目来查缺补漏。"
        if (mastery >= 0.3) return "掌握基本概念，但仍有提升空间，建议复习关键公式并结合例题强化理解。"
        if (mastery >= 0.1) return "对知识点有初步了解，可以通过更多练习逐步提高正确率。"
        if (mastery >= -0.1) return "正处在学习探索状态，建议从基础概念和典型例题入手打好底子。"
        if (mastery >= -0.3) return "掌握情况偏弱，建议重点回顾课程内容并完成老师推荐练习。"
        if (mastery >= -0.5) return "理解上可能存在明显误区，需要针对错题进行反思和重新学习。"
        if (mastery >= -0.7) return "不太熟悉该部分内容，可以先从简易例题开始建立信心。"
        return "学习困难明显，建议跟随系统学习路径：先复习基础概念 → 再做讲解题 → 最后尝试考试题型。"
    }

    const getShowData = async (nodeKey, nodeList, username) => {

        // 去获取当前用户的相关信息
        const userData = await User.findOne({ username }).lean()

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

        // 对showData中的每个节点进行处理
        showData['data'].forEach(item => {
            const target = userData.embeddings.find(t => t.className == item.name)
            if (target) {
                item['mastery'] = target.mastery
                item['color'] = getColor(target.mastery)
                item['suggestion'] = getSuggestion(item.mastery)
            } else {
                item['mastery'] = 0
                item['color'] = getColor(0)
                item['suggestion'] = getSuggestion(0)
            }
        })


        return showData
    }

    return {
        graphData,
        getShowData
    }
}

const { getShowData } = useGrapgData(graphData, nameData)

// 获取要展示的节点的信息(拼接颜色和当前对该知识点的掌握程度)
router.post('/getShowClassData', async (req, res) => {
    try {
        const { nodeKey, username } = req.body

        const graphData = await getShowData(nodeKey, echartsGraphData['data'], username)

        res.status(200).json({ graphData })
    } catch (error) {
        res.status(400).json({ error: error.message || error, msg: '获取要展示的节点的信息失败' })
    }
})

module.exports = router;
