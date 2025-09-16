<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary">
    <div class="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
      <div class="mb-8 animate-slideDown text-center">
        <h1 class="text-5xl font-bold text-white mb-4 animate-title">Trial Playground</h1>
        <p class="text-xl text-gray-200 mb-8 animate-subtitle">A sandbox environment for testing new features and components</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <!-- Experimental Features Section -->
        <div class="feature-card">
          <h2 class="text-2xl font-semibold mb-4">Animation Playground</h2>
          <div class="space-y-4">
            <div class="experimental-box hover-scale">
              <h3 class="text-lg font-medium mb-2">Scale Transform</h3>
              <p class="text-gray-200">Hover to see scale animation</p>
            </div>
            <div class="experimental-box hover-rotate">
              <h3 class="text-lg font-medium mb-2">Rotation Effect</h3>
              <p class="text-gray-200">Hover to see rotation</p>
            </div>
            <div class="experimental-box hover-shake">
              <h3 class="text-lg font-medium mb-2">Shake Animation</h3>
              <p class="text-gray-200">Hover to see shake effect</p>
            </div>
          </div>
        </div>

        <!-- Interactive Elements Section -->
        <div class="feature-card animation-delay-200">
          <h2 class="text-2xl font-semibold mb-4">Interactive Elements</h2>
          <div class="space-y-4">
            <button class="interactive-button glow-effect">
              Glowing Button
            </button>
            <div class="gradient-border-box">
              <h3 class="text-lg font-medium mb-2">Gradient Border</h3>
              <p class="text-gray-200">Box with animated gradient border</p>
            </div>
            <div class="ripple-effect-box">
              Click for Ripple Effect
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <router-link to="/" class="back-button animate-pulse-slow">
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TrialPage'
})
</script>

<style scoped>
:root {
  --primary-color: #6366f1;
  --secondary-color: #818cf8;
  --primary-rgb: 99, 102, 241;
}

.feature-card {
  @apply bg-white bg-opacity-10 rounded-lg p-8 text-white;
  backdrop-filter: blur(12px);
  transform: translateY(0);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out forwards;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.experimental-box {
  @apply bg-white bg-opacity-5 rounded-lg p-4;
  transition: all 0.3s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-rotate:hover {
  transform: rotate(5deg);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.hover-shake:hover {
  animation: shake 0.5s ease-in-out;
}

.interactive-button {
  @apply w-full py-3 px-6 rounded-lg text-white font-semibold;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glow-effect {
  animation: glow 2s infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px rgba(var(--primary-rgb), 0.5); }
  50% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.8); }
}

.gradient-border-box {
  @apply bg-white bg-opacity-5 rounded-lg p-4;
  position: relative;
  z-index: 0;
}

.gradient-border-box::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  z-index: -1;
  border-radius: inherit;
  animation: borderRotate 4s linear infinite;
}

@keyframes borderRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ripple-effect-box {
  @apply bg-white bg-opacity-5 rounded-lg p-4 text-center cursor-pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.ripple-effect-box:active {
  transform: scale(0.98);
}

.text-primary {
  color: var(--primary-color);
}

.back-button {
  @apply inline-block bg-white font-semibold px-8 py-3 rounded-full;
  color: var(--primary-color);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
}

.animation-delay-200 {
  animation-delay: 0.2s;
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
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>