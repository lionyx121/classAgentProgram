<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface tabsListItem {
    cosine: string,
    id: string,
    key: string,
    _id: string
}

const props = defineProps<{
    tabsList: tabsListItem[]
}>()

const emit = defineEmits(['onChangeChildIndex'])

// 当前选中的序号
const selectedIndex = ref(0)

const onTabItemClick = (index: number) => {
    const rightItem = document.getElementsByClassName('right-item')[0] as HTMLElement | null
    // 移动该元素
    if (rightItem) {
        const distance = (index - 0) * rightItem.offsetHeight
        rightItem.style.transform = `translateY(${distance}px)`
    }
    selectedIndex.value = index
    emit('onChangeChildIndex', index)
}

// 重置所有
const reset = () => {
    selectedIndex.value = 0
    const rightItem = document.getElementsByClassName('right-item')[0] as HTMLElement | null
    if (rightItem) {
        rightItem.style.transform = `translateY(0px)`
    }
}

watch(() => props.tabsList, () => {
    reset()
})

</script>

<template>
    <div class="layout">
        <div class="left">
            <div v-for="(item, index) in tabsList" :key="index" class="left-item"
                :class="{ active: selectedIndex === index }" @click="onTabItemClick(index)">
                {{ item.id }}
            </div>
        </div>
        <div class="right">
            <div class="right-item"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .left {
        height: 80%;
        width: 90%;

        .left-item {
            height: 18%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #E5EAF3;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
        }

        .active {
            color: #409EFF;
        }

        .left-item:hover {
            color: #409EFF;
        }
    }

    .right {
        position: absolute;
        right: 0;
        height: 80%;
        width: 4px;
        background-color: #414243;

        .right-item {
            height: 18%;
            width: 4px;
            background-color: #409EFF;
            transition: all .3s;
        }

    }
}
</style>