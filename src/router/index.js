import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../components/pages/HomeMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeVue,
    },
    {
      path: '/index.html',
      name: 'home',
      component: HomeVue,
    },
    {
      path: '/diaryList',
      name: 'diaryList',
      component: () => import('../components/pages/DiaryListPage.vue'),
    },
    {
      path: '/diaryList/:id',
      name: 'diaryListId',
      component: () => import('../components/pages/DiaryListPage.vue'),
    },
    {
      path: '/diary/:id',
      name: 'diary',
      component: () => import('../components/pages/DiaryDetailPage.vue'),
    },
    {
      path: '/storyList',
      name: 'storyList',
      component: () => import('../components/pages/StoryList.vue'),
    },
    {
      path: '/infoX',
      name: 'infoX',
      component: () => import('../components/pages/InfoX.vue'),
    },
  ],
})

export default router
