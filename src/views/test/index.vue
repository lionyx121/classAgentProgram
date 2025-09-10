<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    const box = document.querySelector('.box')
})

</script>

<template>
    <div class="box">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
    </div>
</template>

<style scoped lang="scss">
.box {
    background-color: yellow;
    height: 100vh;
    overflow: auto;

    div {
        width: 100%;
        margin-bottom: 40px;
        background-color: red;
        height: 1000px;
    }
}
</style>