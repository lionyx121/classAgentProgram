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

        // 对包含和前导数据进行处理
        const buildRelationGraph = (arr: any[], val: any, postive = 1) => {
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i]
                const targetNode = nodeList.find((node: node) => node.id == item)

                // 处理rightX和rightY
                const mod = i % 5
                const quotient = Math.floor(i / 5)

                let targetY = 0
                if (mod === 0) targetY = 500
                if (mod === 1) targetY = 300
                if (mod === 2) targetY = 700
                if (mod === 3) targetY = 100
                if (mod === 4) targetY = 900

                // 处理targetNode 
                // targetNode['symbolSize'] = 20
                targetNode['x'] = (300 + quotient * 100) * postive
                targetNode['y'] = targetY + Math.random() * 40 - 20

                showData['data'].push(targetNode)

                const link: link = {
                    source: postive === 1 ? val.id.toString() : item.toString(),
                    target: postive === 1 ? item.toString() : val.id.toString(),
                    name: '前导'
                }
                showData['link'].push(link)
            }
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

        // 对包含和前导数据进行处理
        buildRelationGraph(include, val, 1)
        buildRelationGraph(pioneer, val, -1)

        showData['data'].push(val)

        return showData
    }

    return {
        graphData,
        getShowData
    }
}
