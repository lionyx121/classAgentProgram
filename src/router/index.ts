import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
import login from '@/views/login/index.vue'
import test from '@/views/test/index.vue'
import demo2 from '@/views/demo2/index.vue'
import demo3 from '@/views/demo3/index.vue'
import todoList from '@/views/todoList/index.vue'
import homeMain from '@/views/HomeView/components/homeMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/main',
      children: [
        { path: '/main', component: homeMain },
        { path: '/demo2', component: demo2 },
        { path: '/demo3', component: demo3 },
      ]
    },
    { path: '/login', component: login },
    { path: '/test', component: test },
    { path: '/demo2', component: demo2 },
    { path: '/demo3', component: demo3 },
    { path: '/todoList', component: todoList },
  ],
})

export default router
