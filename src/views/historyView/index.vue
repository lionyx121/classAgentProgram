<script setup lang="ts">
import { getTimeLine } from '@/api/chat'
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo';
import { formatCNTime, getRandomNumber } from '@/common/js/utils'
import tabs from '@/components/tabs.vue';
import echartHistory from './components/echartHistory.vue';

const userInfoStore = useUserInfoStore()

const route = useRoute()

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

const timeLineShowData = ref<any>([])
watch(() => route.query.historyId, async () => {
    const res = await getTimeLine({
        username: userInfoStore.userInfo.username as string,
        historyId: route.query.historyId as string,
    })

    // 处理相关数据
    const { chatHistory, timeLine } = res.data
    const timeLineEmbedding = timeLine['timeLineEmbedding']

    const tempList = []
    for (let i = 0; i < timeLineEmbedding.length; i++) {
        tempList.push({
            // 用户咨询的问题
            content: chatHistory[i * 2].content,
            // 相关的知识点
            classList: timeLineEmbedding[i].classList.slice(0, 5),
            // 时间
            time: formatCNTime(timeLineEmbedding[i].time),
            // 我们随机拿一个颜色
            color: colorList[getRandomNumber(0, colorList.length - 1)],
        })
    }
    timeLineShowData.value = tempList

    tabsList.value = timeLineShowData.value[0].classList

}, { immediate: true })

// 当前选中的时间线序号
const selectedIndex = ref<number>(0)

// 当前要传入给tabs展示的数据
const tabsList = ref<any>()

// 监听selectedIndex变化，更新tabsList
watch(() => selectedIndex.value, (newVal) => {
    tabsList.value = timeLineShowData.value[newVal].classList
})

// 子项中的序号
const childIndex = ref(0)

const changeChildIndex = (index: number) => {
    childIndex.value = index
}
</script>

<template>
    <div class="layout">
        <div class="history-layout">
            <!-- 时间线对话记录 -->
            <el-timeline>
                <el-timeline-item center v-for="(item, index) in timeLineShowData.slice(0, 7)" :key="item.time"
                    :timestamp="item.time" :color="item.color" placement="top" size="large" :hollow="true">
                    <el-card :style="{ cursor: 'pointer' }" :class="{ active: selectedIndex === index }"
                        @click="selectedIndex = (index as number)">
                        <h4>{{ item.content }}</h4>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <!-- 知识点标签 -->
            <div class="tabs" v-if="tabsList">
                <tabs :tabsList="tabsList" @onChangeChildIndex="changeChildIndex"></tabs>
            </div>
        </div>

        <div class="echarts-area" v-if="tabsList">
            <echartHistory :target="tabsList[childIndex].key"></echartHistory>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
    display: flex;

    .history-layout {
        width: 35%;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 100px;
        position: relative;

        .tabs {
            width: 200px;
            position: absolute;
            right: 0;
            height: 100%;
        }

        .active {
            background-color: #409EFF;
        }
    }

    .echarts-area {
        flex: 1;
        height: 100%;
    }
}
</style>
