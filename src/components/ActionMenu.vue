<script setup lang="ts">
import { number } from 'echarts'
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'

interface MenuItem {
    title: string,
    icon: string,
    type?: string,
}

type MenuGroup = MenuItem[]
type menuList = MenuGroup[]

const props = defineProps({
    menuList: {
        type: Array as PropType<menuList>,
        default: () => []
    },
    top: {
        type: Number,
        default: 0
    },
    itemValue: {
        type: Object,
        default: () => ({})
    }
})


const actionMenu = ref<HTMLElement | null>(null)

watch(() => props.top, (newVal, oldVal) => {
    if (!actionMenu.value) return
    if (innerHeight - newVal > actionMenu.value.clientHeight) {
        actionMenu.value.style.top = `${newVal}px`
    } else {
        actionMenu.value.style.bottom = `${innerHeight - newVal - actionMenu.value.clientHeight}px`
    }
}, {immediate: true})

const emit = defineEmits(['close'])

const handleClickOutside = (e: MouseEvent) => {
    const el = actionMenu.value
    if (el && !el.contains(e.target as Node)) {
        emit('close')
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="actionMenu" v-if="menuList" ref="actionMenu">
        <div v-for="(menuitem, index) in menuList" :key="index" class="actionMenuGroup">
            <div v-for="(item, i) in menuitem" :key="i" class="actionMenuItem"
                :class="{ danger: item.type === 'danger' }">
                <el-icon :size="15">
                    <component :is="item.icon" />
                </el-icon>
                <span>{{ item.title }}</span>
            </div>
            <!-- 分隔线 -->
            <div v-if="index !== menuList.length - 1" class="divider"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.actionMenu {
    box-sizing: border-box;
    position: absolute;
    left: 252px;
    transform: translateX(-50%);
    background-color: #353535;
    border-radius: 15px;
    padding: 15px 8px;
    z-index: 999;
    color: #fff;
    font-size: 14px;

    .actionMenuGroup {
        .actionMenuItem {
            width: 110px;
            height: 36px;
            display: flex;
            align-items: center;
            border-radius: 10px;
            padding-left: 10px;
            gap: 5px;
        }

        .danger {
            color: #E27A78;
            font-weight: 600;
        }

        .actionMenuItem:hover {
            background-color: #4A4A4A;
        }

        .danger:hover {
            background-color: #4D3434;
        }

        .divider {
            width: 110px;
            height: 1px;
            background-color: #535353;
            margin: 10px 0;
        }
    }
}
</style>