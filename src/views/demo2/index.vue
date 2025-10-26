<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue"
import { useGrapgData } from "./getGrapgData.js"
import { fullData, graphNameList, echatNode } from "./data.js"
import { useRoute } from "vue-router"

const myChart = ref<echarts.EChartsType | null>(null)
const { getShowData } = useGrapgData(fullData, graphNameList)
const router = useRoute()

onMounted(() => {
  const target = router.query.id || '1'
  const graphData = getShowData(target, echatNode['data'])

  // ✅ 初始化图表实例
  myChart.value = echarts.init(document.getElementById('main')!)

  // ✅ ECharts 配置项（完整注释版）
  const option: echarts.EChartsOption = {
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
    series: [
      {
        type: "graph",        // 图类型：关系图
        layout: "none",      // 使用力引导布局（自动分布节点） none||force
        // symbolSize: 30,       // 每个节点圆圈大小
        roam: true,           // 支持鼠标缩放、平移
        zoom: 1,              // 初始缩放比例
        draggable: true,      // 节点是否可拖拽
        force: {
          repulsion: 3000,   // 增大排斥力
          edgeLength: [50, 200],
          gravity: 0.02,     // 降低吸引力
        },
        itemStyle: {
          color: (params: any) => params.data.color, // 节点颜色来自后端数据
          borderColor: "#aaa",                       // 节点描边颜色
          borderWidth: 1                             // 节点描边宽度
        },
        label: {
          show: true,               // 是否显示节点文字
          fontSize: 14,             // 字体大小
          color: "#fff",            // 字体颜色
          position: "bottom"        // 文字相对节点位置
        },
        lineStyle: {
          color: "#4b565b",        // 边颜色
          width: 3,                // 边线宽
          curveness: 0.2,          // 边弯曲程度（0为直线）
          opacity: 0.8             // 透明度
        },
        edgeSymbol: ["circle", "arrow"], // 线的两端符号：起点是圆，终点是箭头
        edgeSymbolSize: [4, 10],         // 起点和终点符号大小
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

        data: graphData.data,  // 节点数据
        links: graphData.link  // 连线数据
      }
    ]
  }

  // ✅ 渲染图表
  myChart.value.setOption(option)

  const zr = myChart.value.getZr()
  // ✅ 自适应屏幕大小
  window.addEventListener("resize", () => {
    console.log('width', zr.getWidth())
    console.log('height', zr.getHeight())
    myChart.value?.resize()
  })

  myChart.value.on('click', (params: any) => {
    if (params.dataType === 'node') {
      const clickedNodeName = params.data.name
      const option = myChart.value!.getOption()

      const series = option.series[0]
      const graphData = getShowData(params.data.id, echatNode['data'])

      series.data = graphData.data
      series.links = graphData.link

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
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
