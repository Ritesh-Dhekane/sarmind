<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Welcome Back</h2>
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            :class="{ 'error': errors.email }"
            required
            placeholder="Enter your email"
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            :class="{ 'error': errors.password }"
            required
            placeholder="Enter your password"
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div v-if="error" class="error-alert">
          {{ error }}
        </div>

        <button type="submit" class="auth-button" :disabled="loading || !isFormValid">
          <span v-if="!loading">Login</span>
          <span v-else class="loading-spinner"></span>
        </button>

        <p class="auth-link">
          Don't have an account?
          <router-link to="/auth/signup" class="signup-link">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()
    const formData = ref({
      email: '',
      password: ''
    })
    const errors = ref({})
    const error = ref(null)
    const loading = ref(false)

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      if (!formData.value.email) {
        errors.value.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
      }

      if (!formData.value.password) {
        errors.value.password = 'Password is required'
        isValid = false
      } else if (formData.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    }

    const isFormValid = computed(() => {
      return formData.value.email && formData.value.password && formData.value.password.length >= 6
    })

    const handleLogin = async () => {
      if (!validateForm()) return

      loading.value = true
      error.value = null

      try {
        const result = await authService.login(
          formData.value.email,
          formData.value.password
        )

        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        router.push('/')
      } catch (err) {
        error.value = err.message || 'An error occurred during login'
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      errors,
      error,
      loading,
      isFormValid,
      handleLogin
    }
  }
})
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

.auth-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.3s ease;
  animation: slideUp 0.6s ease-out;
}

.auth-title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.15);
}

input.error {
  border-color: #ff6b6b;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  animation: fadeIn 0.3s ease-out;
}

.error-alert {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  animation: fadeIn 0.3s ease-out;
}

.auth-button {
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: var(--primary-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
}

.auth-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(var(--primary-rgb), 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: white;
  font-size: 0.9rem;
}

.signup-link {
  color: white;
  font-weight: 600;
  text-decoration: underline;
  transition: opacity 0.3s ease;
}

.signup-link:hover {
  opacity: 0.8;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>