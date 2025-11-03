import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
import login from '@/views/login/index.vue'
import test from '@/views/test/index.vue'
import echartsGraph from '@/views/echartsGraph/index.vue'
import echartsLabel from '@/views/echartsLabel/index.vue'
import todoList from '@/views/todoList/index.vue'
import practice from '@/views/practice/index.vue'
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
        { path: '/echartsGraph', component: echartsGraph },
        { path: '/echartsLabel', component: echartsLabel },
        { path: '/practice', component: practice },
      ]
    },
    { path: '/login', component: login },
    { path: '/test', component: test },
    { path: '/todoList', component: todoList },
  ],
})

export default router
