<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getResourcesName } from "@/api/resource"
import { AGENTSERVERURL } from "@/common/env"

const resourcesListName = ref<any>([])

onMounted(async () => {
    const res = await getResourcesName()
    resourcesListName.value = res.resourcesListName
})
</script>

<template>
    <div class="resource-box">
        <div class="resource-list">
            <div v-for="item in resourcesListName" :key="item" class="resource-item">
                <div class="resource-info">
                    <i class="iconfont icon-pdf"></i>
                    <span class="name">{{ item }}</span>
                </div>

                <a :href="AGENTSERVERURL + 'resources/' + item">
                    <el-button type="primary" size="small">下载</el-button>
                </a>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.resource-box {
    width: 100%;
    max-width: 900px;
    margin: 100px auto;
    padding: 20px;

    .title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: 600;
        color: #333;
    }
}

.resource-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

/* 📌 单个资源卡片 */
.resource-item {
    width: 100%;
    background: #e3e3e3;
    border-radius: 12px;
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: all 0.25s ease;
    border: 1px solid transparent;

    &:hover {
        background: #eef6ff;
        border-color: #84c1ff;
        transform: translateY(-2px);
    }
}

/* 文件信息 */
.resource-info {
    display: flex;
    align-items: center;
    width: 70%;
    gap: 10px;

    .name {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

/* 假如你想要 PDF 图标，可选加以下 */
// .icon-pdf {
//     width: 20px;
//     height: 20px;
//     background: url('@/assets/pdf.svg') no-repeat center/cover;
// }</style>
