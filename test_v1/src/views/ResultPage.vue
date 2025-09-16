<template>
  <div class="result-container">
    <div class="result-card">
      <div class="score-circle">
        <div class="score-number">{{ score }}/{{ total }}</div>
        <div class="score-text">Score</div>
      </div>

      <div class="result-details">
        <h1 class="result-title">Test Complete!</h1>
        <p class="result-message">{{ resultMessage }}</p>
        <div class="score-percentage">
          {{ Math.round((score / total) * 100) }}% Correct
        </div>
      </div>

      <div class="action-buttons">
        <router-link to="/test" class="action-button retry">
          Try Again
        </router-link>
        <router-link to="/" class="action-button home">
          Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultPage",
  data() {
    return {
      score: 0,
      total: 0
    };
  },
  computed: {
    resultMessage() {
      const percentage = (this.score / this.total) * 100;
      if (percentage === 100) return "Perfect! You're a genius!";
      if (percentage >= 80) return "Great job! You're almost there!";
      if (percentage >= 60) return "Good effort! Keep practicing!";
      return "Keep learning! You can do better!";
    }
  },
  created() {
    const { score, total } = this.$route.query;
    this.score = parseInt(score) || 0;
    this.total = parseInt(total) || 0;
  }
};
</script>

<style scoped>
:root {
  --primary-color: #6366f1;
  --primary-rgb: 99, 102, 241;
}

.result-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
  background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.2) 100%);
  animation: fadeIn 0.5s ease-out;
}

.result-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(var(--primary-rgb), 0.15);
  padding: 40px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  animation: slideUp 0.6s ease-out;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 30px;
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
  animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.score-number {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1;
}

.score-text {
  font-size: 1.2rem;
  opacity: 0.9;
}

.result-details {
  margin-bottom: 30px;
  animation: fadeIn 0.8s ease-out;
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

.result-title {
  color: #1a202c;
  font-size: 2rem;
  margin-bottom: 15px;
  font-weight: bold;
}

.result-message {
  color: #4a5568;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.score-percentage {
  font-size: 1.5rem;
  color: var(--primary-color);
  font-weight: bold;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
  animation: fadeIn 0.8s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.action-button {
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 600;
}

.action-button.retry {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
}

.action-button.home {
  background: #f8f9fa;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.action-button:hover {
  transform: translateY(-2px);
}

.action-button.retry:hover {
  background: rgba(var(--primary-rgb), 0.9);
  box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.4);
}

.action-button.home:hover {
  background: rgba(var(--primary-rgb), 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

