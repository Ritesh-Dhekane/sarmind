import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/auth.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(authService.getCurrentUser())
  const returnUrl = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  async function login(email, password) {
    try {
      const data = await authService.login(email, password)
      user.value = data
      router.push(returnUrl.value || '/')
      returnUrl.value = null
    } catch (error) {
      throw error
    }
  }

  async function signup(userData) {
    try {
      await authService.signup(userData)
      router.push('/login')
    } catch (error) {
      throw error
    }
  }

  function logout() {
    authService.logout()
    user.value = null
    router.push('/login')
  }

  return {
    user,
    returnUrl,
    isAuthenticated,
    login,
    signup,
    logout
  }
}) 