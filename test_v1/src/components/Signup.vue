<template>
  <div class="login-container">
    <div class="form-wrapper">
      <h2 class="text-2xl font-bold mb-6 text-white">Create your account</h2>
      
      <div v-if="error" class="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
        {{ error }}
      </div>

      <form @submit.prevent="handleSignup">
        <div class="space-y-4">
          <!-- Full Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
            <input
              v-model="formData.name"
              id="name"
              name="name"
              type="text"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="John Doe"
              :disabled="loading"
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              v-model="formData.email"
              id="email"
              name="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="john@example.com"
              :disabled="loading"
            />
          </div>

          <!-- Mobile Number -->
          <div>
            <label for="mobile" class="block text-sm font-medium text-gray-300 mb-1">Mobile Number</label>
            <input
              v-model="formData.mobile"
              id="mobile"
              name="mobile"
              type="tel"
              required
              pattern="[0-9]{10}"
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="1234567890"
              :disabled="loading"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <label for="dob" class="block text-sm font-medium text-gray-300 mb-1">Date of Birth</label>
            <input
              v-model="formData.dob"
              id="dob"
              name="dob"
              type="date"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              :max="maxDate"
              :disabled="loading"
            />
          </div>

          <!-- Gender -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Gender</label>
            <div class="flex space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="formData.gender"
                  value="male"
                  class="form-radio text-indigo-600 bg-gray-800 border-gray-600"
                  :disabled="loading"
                />
                <span class="ml-2 text-gray-300">Male</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="formData.gender"
                  value="female"
                  class="form-radio text-indigo-600 bg-gray-800 border-gray-600"
                  :disabled="loading"
                />
                <span class="ml-2 text-gray-300">Female</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  v-model="formData.gender"
                  value="other"
                  class="form-radio text-indigo-600 bg-gray-800 border-gray-600"
                  :disabled="loading"
                />
                <span class="ml-2 text-gray-300">Other</span>
              </label>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input
              v-model="formData.password"
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="••••••••"
              :disabled="loading"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
            <input
              v-model="formData.confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-800 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="••••••••"
              :disabled="loading"
            />
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            :disabled="loading || !isFormValid"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Create Account</span>
          </button>
        </div>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-indigo-400 hover:text-indigo-300">
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth.service'

export default {
  name: 'Signup',
  setup() {
    const router = useRouter()
    const error = ref('')
    const loading = ref(false)

    const formData = ref({
      name: '',
      email: '',
      mobile: '',
      dob: '',
      gender: '',
      password: '',
      confirmPassword: ''
    })

    // Calculate max date (must be at least 13 years old)
    const maxDate = computed(() => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 13)
      return date.toISOString().split('T')[0]
    })

    // Form validation
    const isFormValid = computed(() => {
      return (
        formData.value.name &&
        formData.value.email &&
        formData.value.mobile &&
        formData.value.mobile.length === 10 &&
        formData.value.dob &&
        formData.value.gender &&
        formData.value.password &&
        formData.value.confirmPassword &&
        formData.value.password === formData.value.confirmPassword &&
        formData.value.password.length >= 6
      )
    })

    const handleSignup = async () => {
      if (!isFormValid.value) {
        error.value = 'Please fill all fields correctly'
        return
      }

      error.value = ''
      loading.value = true

      try {
        await AuthService.signup({
          name: formData.value.name,
          email: formData.value.email,
          mobile: formData.value.mobile,
          dob: formData.value.dob,
          gender: formData.value.gender,
          password: formData.value.password
        })
        router.push('/login')
      } catch (err) {
        error.value = err.message || 'Failed to create account'
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      error,
      loading,
      maxDate,
      isFormValid,
      handleSignup
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: calc(100vh - 8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.form-wrapper {
  width: 100%;
  max-width: 500px;
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom styles for date input */
input[type="date"] {
  color-scheme: dark;
}

/* Custom styles for radio buttons */
.form-radio {
  appearance: none;
  padding: 0;
  print-color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  height: 1rem;
  width: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.form-radio:checked {
  background-color: var(--primary-color);
  border-color: transparent;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}
</style> 