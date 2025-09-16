<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl transition-all duration-300 hover:shadow-xl">
      <div class="md:flex">
        <div class="p-8 w-full">
          <!-- Toggle Buttons -->
          <div class="flex rounded-lg bg-gray-100 p-1 mb-8">
            <button
              @click="mode = 'login'"
              :class="[mode === 'login' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500', 'flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200']"
            >
              Login
            </button>
            <button
              @click="mode = 'signup'"
              :class="[mode === 'signup' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500', 'flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200']"
            >
              Sign Up
            </button>
          </div>

          <!-- Login Form -->
          <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Login
              </button>
            </div>
          </form>

          <!-- Signup Form -->
          <form v-else @submit.prevent="handleSignup" class="space-y-6">
            <div>
              <label for="signup-name" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="signup-name"
                v-model="signupForm.name"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="signup-email"
                v-model="signupForm.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <label for="signup-password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="signup-password"
                v-model="signupForm.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign Up
              </button>
            </div>
          </form>

          <!-- Error Message -->
          <div v-if="error" class="mt-4 text-sm text-red-600 text-center">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'LoginSignup',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const mode = ref('login')
    const error = ref('')

    const loginForm = ref({
      email: '',
      password: ''
    })

    const signupForm = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        error.value = ''
        await authStore.login(loginForm.value)
        router.push('/')
      } catch (err) {
        error.value = err.message || 'Failed to login'
      }
    }

    const handleSignup = async () => {
      try {
        error.value = ''
        await authStore.signup(signupForm.value)
        router.push('/')
      } catch (err) {
        error.value = err.message || 'Failed to sign up'
      }
    }

    return {
      mode,
      loginForm,
      signupForm,
      error,
      handleLogin,
      handleSignup
    }
  }
})
</script>

<style scoped>
.from-blue-50 {
  --tw-gradient-from: #eff6ff;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgb(239 246 255 / 0));
}

.to-indigo-50 {
  --tw-gradient-to: #eef2ff;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

form {
  animation: fadeIn 0.5s ease-out;
}
</style>