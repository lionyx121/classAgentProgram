<script setup lang="ts">
import { useLayoutStore } from '@/stores/layout'
import Breadcrumb from '@/components/breadcrumb.vue'

const layoutStore = useLayoutStore()
</script>

<template>
    <!-- 顶部 -->
    <div class="layout-header">
        <!-- 顶部 中心展示区域 -->
        <div class="layout-header-main">
            <!-- 打开侧边栏按钮 -->
            <div class="icon-box" @click="layoutStore.updataIsSilderShow">
                <img src="@/assets/icons/open.png"></img>
            </div>
            <!-- 顶部标题区域 -->
            <div class="main-title">
                The Ocean University of China
            </div>
            <!-- 开启新对话按钮 -->
            <!-- <div class="icon-box dialogue" >
                <img src="@/assets/icons/newdialogue.png"></img>
            </div> -->
        </div>
    </div>
    <!-- 面包屑组件 -->
    <div class="breadcrumb">
        <Breadcrumb></Breadcrumb>
    </div>
</template>

<style scoped lang="scss">
.layout-header {
    height: 50px;
    width: 100%;
    background-color: #212121;
    border-bottom: 1px solid #2C2C2C;

    .layout-header-main {
        width: 100%;
        height: 100%;
        padding: 0 8px;
        display: flex;
        align-items: center;
        position: relative;

        .icon-box {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            img {
                width: 24px;
                height: 24px;
            }
        }

        .dialogue {
            position: absolute;
            right: 20px;
        }

        .main-title {
            height: 36px;
            line-height: 36px;
            color: #fff;
            margin-left: 30px;
        }


    }
}

.breadcrumb {
    height: 40px;
}
</style>
