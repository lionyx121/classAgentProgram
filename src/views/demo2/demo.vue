<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue"
import { useGrapgData } from "./getGrapgData.js"
import { fullData, graphNameList } from "./data.js"

const myChart = ref<echarts.EChartsType | null>(null)

onMounted(() => {
    // ✅ 模拟从后端获取的 Neo4j 节点/关系数据
    const graphData = {
      data: [
        { name: "pentoxifylline", color: "#fff", symbolSize: 100 },
        { name: "salicylates", color: "#ff756e" },
        { name: "mycophenolate mofetil", color: "#ff756e" },
        { name: "EQUETROTM", color: "#ff756e" },
        { name: "nicotinamide", color: "#ff756e" },
        { name: "Acetaminophen", color: "#ff756e" }
      ],
      link: [
        { source: "pentoxifylline", target: "salicylates", name: "false", lineStyle: { color: "#fff", curveness: 0 } },
        { source: "mycophenolate mofetil", target: "mycophenolate mofetil", name: "false" },
        { source: "EQUETROTM", target: "nicotinamide", name: "mechanism" },
        { source: "EQUETROTM", target: "Acetaminophen", name: "mechanism" }
      ]
    }

    // ✅ 初始化图表实例
    myChart.value = echarts.init(document.getElementById('main')!)

    // ✅ ECharts 配置项（完整注释版）
    const option: echarts.EChartsOption = {
        // -----------------------------
        // 📘 标题部分
        // -----------------------------
        title: {
            text: "生物语义网络图谱",   // 主标题文本
            left: "center",              // 标题居中
            top: 20,                     // 距顶部距离
            textStyle: { color: "#fff" } // 标题字体颜色
        },

        // -----------------------------
        // 🧭 悬浮提示框
        // -----------------------------
        tooltip: {
            trigger: "item",            // 鼠标悬浮在节点或边上触发
            backgroundColor: "#333",
            borderColor: "#555",
            textStyle: { color: "#fff" },
            formatter: (params: any) => {
                // params.data 表示当前节点或连线数据
                if (params.dataType === "node") {
                    return `🧬 节点：${params.data.name}`
                } else if (params.dataType === "edge") {
                    return `🔗 关系：${params.data.name}<br/>${params.data.source} → ${params.data.target}`
                }
                return ""
            }
        },

        // -----------------------------
        // ⚙️ 动画配置
        // -----------------------------
        animationDurationUpdate: 1000,    // 数据更新动画时间（ms）
        // animationEasingUpdate: "quinticInOut", // 缓动函数（弹性效果）

        // -----------------------------
        // 🌐 系列配置（图的核心部分）
        // -----------------------------
        series: [
            {
                // ---------------------------
                // 基础配置
                // ---------------------------
                type: "graph",        // 图类型：关系图
                layout: "force",      // 使用力引导布局（自动分布节点）
                symbolSize: 30,       // 每个节点圆圈大小
                roam: true,           // 支持鼠标缩放、平移
                zoom: 1,              // 初始缩放比例
                draggable: true,      // 节点是否可拖拽

                // ---------------------------
                // 力引导布局参数
                // ---------------------------
                force: {
                    repulsion: [10, 50], // 节点之间的斥力范围（越大越分散）
                    edgeLength: 300,      // 边的理想长度（越大越松散）
                    gravity: 0.001        // 向中心吸引力（越大越靠中）
                },

                // ---------------------------
                // 节点样式配置
                // ---------------------------
                itemStyle: {
                    color: (params: any) => params.data.color, // 节点颜色来自后端数据
                    borderColor: "#aaa",                       // 节点描边颜色
                    borderWidth: 1                             // 节点描边宽度
                },

                // ---------------------------
                // 节点标签配置（显示节点名字）
                // ---------------------------
                label: {
                    show: true,               // 是否显示节点文字
                    fontSize: 14,             // 字体大小
                    color: "#fff",            // 字体颜色
                    position: "bottom"        // 文字相对节点位置
                },

                // ---------------------------
                // 连线样式配置
                // ---------------------------
                lineStyle: {
                    color: "#4b565b",        // 边颜色
                    width: 3,                // 边线宽
                    curveness: 0.5,          // 边弯曲程度（0为直线）
                    opacity: 0.8             // 透明度
                },

                // ---------------------------
                // 连线箭头配置
                // ---------------------------
                edgeSymbol: ["circle", "arrow"], // 线的两端符号：起点是圆，终点是箭头
                edgeSymbolSize: [4, 10],         // 起点和终点符号大小

                // ---------------------------
                // 连线标签（显示关系名）
                // ---------------------------
                edgeLabel: {
                    show: true,                // 是否显示边的文字
                    position: "middle",        // 标签位置（中间）
                    fontSize: 16,              // 字体大小
                    color: "#ccc",             // 文字颜色
                    formatter: (params: any) => {
                        // 每条边的 name 属性代表关系类型
                        return params.data.name;
                    }
                },

                // ---------------------------
                // 数据绑定（节点和连线）
                // ---------------------------
                data: graphData.data,  // 节点数据
                links: graphData.link  // 连线数据
            }
        ]
    }

    // ✅ 渲染图表
    myChart.value.setOption(option)

    // ✅ 自适应屏幕大小
    window.addEventListener("resize", () => {
        myChart.value?.resize()
    })

    myChart.value.on('click', (params: any) => {
        if (params.dataType === 'node') {
            const clickedNodeName = params.data.name
            const option = myChart.value!.getOption()

            const series = option.series[0]

            // 1️⃣ 修改节点透明度
            series.data.forEach((node: any) => {
                node.itemStyle = node.itemStyle || {}
                node.itemStyle.opacity = node.name === clickedNodeName ? 1 : 0.1
            })

            // 2️⃣ 修改边透明度：只保留与当前节点相连的边
            series.links.forEach((link: any) => {
                link.lineStyle = link.lineStyle || {}
                const isConnected =
                    link.source === clickedNodeName || link.target === clickedNodeName
                link.lineStyle.opacity = isConnected ? 1 : 0.1
            })

            // 3️⃣ 更新图表
            myChart.value!.setOption(option)
        }
    })
})

</script>

<template>
    <div id="main"></div>
</template>

<style scoped>
#main {
    height: calc(100vh - 60px);
    background-color: #212121;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
