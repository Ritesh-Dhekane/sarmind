<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary"
  >
    <div class="max-w-4xl mx-auto px-4 py-12 text-center animate-fadeIn">
      <div class="mb-8 animate-slideDown">
        <h1 class="text-5xl font-bold text-white mb-4 animate-title">About MCQ Test</h1>
        <p class="text-xl text-gray-200 mb-8 animate-subtitle">
          Learn more about our interactive learning platform
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="feature-card">
          <h2 class="text-2xl font-semibold mb-4">Our Mission</h2>
          <p class="text-gray-200">
            We strive to make learning engaging and accessible through interactive tests that help
            students test and improve their knowledge across various subjects.
          </p>
        </div>

        <div class="feature-card animation-delay-200">
          <h2 class="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <p class="text-gray-200">
            Our platform offers instant feedback, progress tracking, and a user-friendly interface
            to enhance your learning experience.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="feature-card">
          <div class="text-4xl mb-4 animate-bounce-slow">📚</div>
          <h3 class="text-xl font-semibold mb-2">Comprehensive Content</h3>
          <p class="text-gray-200">Wide range of topics and subjects to explore and master</p>
        </div>

        <div class="feature-card animation-delay-200">
          <div class="text-4xl mb-4 animate-bounce-slow">🎯</div>
          <h3 class="text-xl font-semibold mb-2">Targeted Learning</h3>
          <p class="text-gray-200">Focus on specific areas that need improvement</p>
        </div>

        <div class="feature-card animation-delay-400">
          <div class="text-4xl mb-4 animate-bounce-slow">📈</div>
          <h3 class="text-xl font-semibold mb-2">Track Progress</h3>
          <p class="text-gray-200">Monitor your improvement over time</p>
        </div>
      </div>

      <router-link to="/test" class="start-button animate-pulse-slow">
        Start Learning Now
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
})
</script>

<style scoped>
:root {
  --primary-color: #4f46e5;
  --secondary-color: #6366f1;
}

.from-primary {
  --tw-gradient-from: var(--primary-color);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-secondary {
  --tw-gradient-to: var(--secondary-color);
}

.feature-card {
  @apply bg-white bg-opacity-20 rounded-lg p-8 text-white;
  backdrop-filter: blur(12px);
  transform: translateY(0);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out forwards;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.feature-card:hover {
  transform: translateY(-10px);
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.start-button {
  @apply inline-block bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.6s ease-out;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}

.animate-title {
  animation: slideDown 0.8s ease-out;
}

.animate-subtitle {
  animation: slideDown 0.8s ease-out 0.2s both;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}

.animate-pulse-slow {
  animation: pulse 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
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
</style>
