<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Welcome Back</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :class="{ 'error': errors.email }"
            placeholder="Enter your email"
          />
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            :class="{ 'error': errors.password }"
            placeholder="Enter your password"
          />
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
        </div>
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>
      <div v-if="error" class="error-alert">{{ error }}</div>
      <p class="signup-text">
        Don't have an account?
        <router-link to="/auth/register">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const errors = ref({})

    const validateForm = () => {
      errors.value = {}
      let isValid = true

      if (!email.value) {
        errors.value.email = 'Email is required'
        isValid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
      }

      if (!password.value) {
        errors.value.password = 'Password is required'
        isValid = false
      } else if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      loading.value = true
      error.value = ''

      try {
        const response = await login({
          email: email.value,
          password: password.value
        })

        if (response.success) {
          router.push('/dashboard')
        } else {
          error.value = response.message || 'An error occurred during login'
        }
      } catch (err) {
        error.value = 'Unable to connect to the server. Please try again later.'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      loading,
      error,
      errors,
      handleLogin
    }
  }
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

.login-card h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 30px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 500;
  color: var(--text-color);
}

.form-group input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.login-btn {
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.error-alert {
  background-color: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin: 1rem 0;
  text-align: center;
}

.loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

input.error {
  border-color: #dc2626;
}

.signup-text {
  text-align: center;
  margin-top: 20px;
  color: var(--text-color);
}

.signup-text a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.signup-text a:hover {
  text-decoration: underline;
}
</style>