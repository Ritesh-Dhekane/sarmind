<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transition-all duration-300">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ isLogin ? 'Please sign in to your account' : 'Please fill in your information' }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div v-if="!isLogin">
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-all duration-200"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary hover:text-primary-dark transition-colors duration-200">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-lg shadow-primary/30"
          >
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </button>
        </div>

        <div class="text-center text-sm">
          <span class="text-gray-600">
            {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
          </span>
          <button
            type="button"
            class="ml-1 font-medium text-primary hover:text-primary-dark transition-colors duration-200"
            @click="toggleAuthMode"
          >
            {{ isLogin ? 'Sign up' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthPage',
  setup() {
    const router = useRouter()
    const isLogin = ref(true)
    const form = reactive({
      name: '',
      email: '',
      password: '',
      rememberMe: false
    })

    const toggleAuthMode = () => {
      isLogin.value = !isLogin.value
      // Reset form when switching modes
      form.name = ''
      form.email = ''
      form.password = ''
      form.rememberMe = false
    }

    const handleSubmit = async () => {
      try {
        // Here you would typically make an API call to your auth service
        console.log('Form submitted:', {
          mode: isLogin.value ? 'login' : 'signup',
          ...form
        })
        
        // Redirect to home page after successful auth
        router.push('/')
      } catch (error) {
        console.error('Auth error:', error)
      }
    }

    return {
      isLogin,
      form,
      toggleAuthMode,
      handleSubmit
    }
  }
})
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --primary-dark: #4338ca;
}

.bg-primary {
  background-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color);
}

.hover\:bg-primary-dark:hover {
  background-color: var(--primary-dark);
}

.hover\:text-primary-dark:hover {
  color: var(--primary-dark);
}

.focus\:ring-primary:focus {
  --tw-ring-color: var(--primary-color);
}

.focus\:border-primary:focus {
  border-color: var(--primary-color);
}

.shadow-primary\/30 {
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.max-w-md {
  animation: fadeIn 0.5s ease-out;
}

/* Form transitions */
input, button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>