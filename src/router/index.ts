import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'
import login from '@/views/login/index.vue'
import echartsGraph from '@/views/echartsGraph/index.vue'
import echartsLabel from '@/views/echartsLabel/index.vue'
import practice from '@/views/practice/index.vue'
import homeMain from '@/views/HomeView/components/homeMain.vue'
import extraResource from '@/views/extraResource/index.vue'
import historyView from '@/views/historyView/index.vue'
import searchPractice from '@/views/searchPractice/index.vue'
import zzz from '@/views/zzz/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      redirect: '/main',
      children: [
        {
          path: '/main',
          component: homeMain,
          meta: {
            title: '新对话',
          }
        },
        {
          path: '/echartsGraph',
          component: echartsGraph,
          meta: {
            title: '知识图谱',
          }
        },

        {
          path: '/echartsLabel',
          component: echartsLabel,
          meta: {
            title: '知识标签',
          }
        },

        {
          path: '/practice',
          component: practice,
          meta: {
            title: '练习模式',
          }
        },

        {
          path: '/searchPractice',
          component: searchPractice,
          meta: {
            title: '题目搜索',
          }
        },

        {
          path: '/extraResource',
          component: extraResource,
          meta: {
            title: '拓展资源',
          }
        },

        {
          path: '/historyView',
          component: historyView,
          meta: {
            title: '学习记录',
          }
        }
      ]
    },
    { path: '/login', component: login },
    { path: '/zzz', component: zzz }
  ]
})

export default router
