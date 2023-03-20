import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/login',
      component: () => import('@/views/login/Index.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/main/Index.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  const token = localCache.getCache('LOGIN_TOKEN')
  if (
    to.path === '/main' &&
    from.path !== '/login' &&
    from.path !== '/' &&
    !token
  ) {
    return '/login'
  }
})

export default router
