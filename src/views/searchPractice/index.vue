<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getAllKnowledgePoint } from '@/api/practice'
import { concatQuestion } from '@/api/practice'
import practice from '@/components/practice.vue'
import { usePracticeStore } from '@/stores/practice'
import { useRoute } from 'vue-router'

interface RestaurantItem {
    value: string,
    knowledgeKey: string,
    knowledgeName: string,
    questions: any[]
}

const state1 = ref<string>('')
const practiceStore = usePracticeStore()

const restaurants = ref<RestaurantItem[]>([])

// 初始化的时候，可能route中有知识点，这时候我们要直接展示改知识点的题目
const route = useRoute()

// 获取数据
onMounted(async () => {
    // 初始化practiceStore的random为false
    practiceStore.initQuestionShow(false)

    const res = await getAllKnowledgePoint()
    const tempList: RestaurantItem[] = []
    res.data.forEach((item: RestaurantItem) => {
        tempList.push({
            value: item.knowledgeName,
            knowledgeKey: item.knowledgeKey,
            knowledgeName: item.knowledgeName,
            questions: item.questions
        })
    })
    restaurants.value = tempList

    if (route.query.knowledgeName && route.query.knowledgeKey) {
        // 更新输入框中的值
        state1.value = (route.query.knowledgeName as string)
        const target = restaurants.value.find(item => item.knowledgeKey === route.query.knowledgeKey)

        if (target) {
            updataSelectData({
                value: target.value,
                knowledgeKey: target.knowledgeKey,
                knowledgeName: target.knowledgeName,
                questions: target.questions
            })
        }
    }
})

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    // call callback function to return suggestions
    cb(results)
}
const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
        return (
            restaurant.value.toLowerCase().includes(queryString.toLowerCase())
        )
    }
}

// 更新选择的问题
const updataSelectData = async (item: RestaurantItem) => {
    // 我们首先把question传给后端让它去拼接要展示的数据
    const res = await concatQuestion(item.questions)
    showPracticeList.value = res.data
    // 然后改变practiceStore里面的questionShowData
    practiceStore.updateQuestionShow(showPracticeList.value)
}

// 要展示的问题
const showPracticeList = ref([])

// 选中的知识点
const handleSelect = async (item: Record<string, any>) => {
    updataSelectData((item as RestaurantItem))
}

const emit = defineEmits(['content-update'])

</script>

<template>
    <div class="search-btn">
        <div class="wenzi">相关知识点练习：</div>
        <el-autocomplete v-model="state1" :fetch-suggestions="querySearch" clearable placeholder="搜索知识点"
            @select="handleSelect" :trigger-on-focus="false" />
    </div>

    <!-- 题目数量部分 -->
    <div class="practice-number" v-if="showPracticeList.length > 0">
        {{ practiceStore.currentQuestionIndex + 1 }} / {{ showPracticeList.length }}
    </div>

    <!-- 题目部分 -->
    <div class="practice">
        <practice :isRandom="false"></practice>
    </div>
</template>


<style scoped lang="scss">
.search-btn {
    width: 600px;
    margin: 30px 220px;
    display: flex;
    align-items: center;

    .wenzi {
        width: 200px;
        color: #fff;
    }
}

.practice-number {
    position: absolute;
    right: 300px;
    top: 90px;
    color: #fff;
    font-size: 16px;
    background-color: #303030;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    padding: 8px 15px;
}
</style>