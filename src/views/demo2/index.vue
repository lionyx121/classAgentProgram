<template>
  <aside class="sidebar">
    <!-- 顶部固定区域 -->
    <div class="sidebar-header">
      <h2>ChatGPT</h2>
      <button>新建对话</button>
    </div>

    <div class="zhanwei"></div>
    <!-- 底部可滚动区域 -->
    <div class="sidebar-list">
      <div v-for="i in 50" :key="i" class="sidebar-item">
        会话 {{ i }}
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* 整个侧边栏高度固定为视口高度 */
  width: 260px;
  background: #202123;
  color: white;
  overflow-y: auto;
  /* 只有下面部分可以滚动 */
}

.zhanwei{
  width: 100%;
  height: 100px;
  background-color: red;
}
/* 顶部固定 */
.sidebar-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  /* 高度固定，不参与拉伸 */
  padding: 16px;
  border-bottom: 1px solid #333;
}

/* 底部滚动 */
.sidebar-list {
  flex: 1;
  /* 占满剩余空间 */

}

.sidebar-item {
  padding: 12px 16px;
  border-bottom: 1px solid #333;
}
</style>
