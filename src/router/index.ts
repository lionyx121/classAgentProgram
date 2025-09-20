import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
import login from '@/views/login/index.vue'
import test from '@/views/test/index.vue'
import demo2 from '@/views/demo2/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/login', component: login },
    { path: '/test', component: test },
    { path: '/demo2', component: demo2 }
  ],
})

export default router
