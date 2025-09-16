import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/components/Signup.vue')
  },
  {
    path: '/test-selection',
    name: 'TestSelection',
    component: () => import('../views/TestSelection.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/QuizPage.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    authStore.returnUrl = to.fullPath
    next('/login')
  } else {
    next()
  }
})

export default router
