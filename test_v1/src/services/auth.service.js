import axios from 'axios'

const API_URL = 'http://localhost:3000/api'  // Make sure this matches your backend port

const authService = {
  async login(email, password) {
    try {
      console.log('Making login request to:', `${API_URL}/auth/login`) // Debug log
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      console.log('Login response:', response.data) // Debug log
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      console.error('Auth service error:', error.response?.data || error) // Debug log
      const message = error.response?.data?.message || 'Login failed'
      throw new Error(message)
    }
  },

  async signup(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      throw new Error(message)
    }
  },

  logout() {
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated() {
    return !!this.getCurrentUser()
  }
}

export default authService 