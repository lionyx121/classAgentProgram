<script setup lang="ts">
import { ref } from 'vue'

const inputval = ref<string>('')

// 输入框自适应高度
const onInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    target.style.height = 'auto' // 先重置
    target.style.height = `${target.scrollHeight}px` // 再撑开
}
</script>

<template>
    <div class="input-box">
        <!-- 左侧添加图片按钮 -->
        <div class="btn add">
            <van-icon name="plus" />
        </div>

        <!-- 中间输入框 -->
        <textarea id="text-area" placeholder="请输入内容" rows="1" v-model="inputval" @input="onInput"></textarea>

        <!-- 右侧发送按钮 -->
        <div class="btn send" :class="{'active': inputval}">
            <van-icon name="down" class="icon-down" :class="{'active': inputval}"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.input-box {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 16px);
    min-height: 56px;
    border-radius: 28px;
    background-color: #212121;

    display: flex;
    align-items: center;
    /* 单行时让文字垂直居中 */
    padding: 0 56px;
    /* 给左右按钮留位置 */
}

.btn {
    position: absolute;
    bottom: 10px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background-color: #212121;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    z-index: 99;
}

.add {
    left: 19px;
    font-size: 20px;
}

.send {
    right: 19px;
    background-color: #858585;
    color: #2F2F2F;

    .icon-down {
        transform: rotate(180deg);
    }
}

.active {
    background-color: #FFFFFF;
    color: #000000;
}

#text-area {
    flex: 1;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
    resize: none;
    overflow-y: hidden;

    min-height: 36px;
    max-height: 120px;
    padding: 12px 0;
    /* 让单行时上下有空间，视觉上居中 */
}
</style>
