<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { data } from './data' // 你本地的树数据

// ECharts 核心引入
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TreeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, TreeChart, CanvasRenderer])

// Vue3 的 ref 绑定 DOM
const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

onMounted(() => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  const option: any = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data,
        layout: 'radial', // 径向树
        center: ['50%', '50%'], // 居中
        radius: '80%', // 大小
        symbol: 'emptyCircle',
        symbolSize: 7,
        initialTreeDepth: 3,
        animationDurationUpdate: 750,
        emphasis: {
          focus: 'descendant'
        }
      }
    ]
  }

  chart.setOption(option)
})

const chartWidth = window.innerWidth + 'px'

const chartHeight = window.innerHeight * 0.8 + 'px'

// 组件卸载时销毁实例
onBeforeUnmount(() => {
  chart?.dispose()
})
</script>

<template>
  <!-- 注意：不要用 id，而是用 ref -->
  <div ref="chartRef" :style="{ width: chartWidth, height: chartHeight }"></div>
</template>
