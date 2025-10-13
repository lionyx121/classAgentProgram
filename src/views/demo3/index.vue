<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import data from './data.json'
import { useRouter } from 'vue-router'

const chartRef = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null

const router = useRouter()

// 2️⃣ 生命周期
onMounted(async () => {
    if (!chartRef.value) return

    // 初始化图表
    myChart = echarts.init(chartRef.value)
    myChart.showLoading()

    try {
        const graph = data
        myChart.hideLoading()

        const option: echarts.EChartsOption = {
            tooltip: {},
            // legend: [
            //     {
            //         data: graph.categories.map((a: any) => a.name)
            //     }
            // ],
            series: [
                {
                    name: 'Les Miserables',
                    type: 'graph',
                    layout: 'force',
                    zoom: 1.2, // 默认是 1，>1 放大，<1 缩小
                    force: {
                        gravity: 0.05,       // 重力（越大越往中心靠）
                        layoutAnimation: false, // ✅ 禁止力导向动态布局
                    },
                    data: graph.nodes,
                    links: graph.links,
                    categories: graph.categories,
                    roam: true,
                    center: ['50%', '50%'], // ✅ 初始居中
                    label: {
                        show: true,
                        position: 'bottom',
                        formatter: '{b}'
                    },
                    labelLayout: {
                        hideOverlap: true
                    },
                    scaleLimit: {
                        min: 0.4,
                        max: 5
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            ]
        }

        myChart.setOption(option)
    } catch (err) {
        console.error('加载图谱失败：', err)
    }

    // 窗口大小变化时自适应
    window.addEventListener('resize', () => myChart?.resize())

    myChart.on('click', (params: any) => {
        if (params.dataType === 'node') {
            router.push({ path: '/demo2', query: { id: params.data.id } })
        }
    })
})

onBeforeUnmount(() => {
    myChart?.dispose()
})
</script>

<template>
    <div ref="chartRef" class="chart-container"></div>
</template>

<style scoped lang="scss">
.chart-container {
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #212121;
}
</style>
