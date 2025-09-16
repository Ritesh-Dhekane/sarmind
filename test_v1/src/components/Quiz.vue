<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="mb-8">
      <div class="w-full bg-gray-200 rounded-full h-3">
        <div
          class="bg-primary h-3 rounded-full transition-all duration-300"
          :style="{ width: `${(currentQuestion + 1) * (100 / questions.length)}%` }"
        ></div>
      </div>
      <div class="text-right text-sm text-gray-600 mt-2">
        Question {{ currentQuestion + 1 }} of {{ questions.length }}
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-8">{{ currentQuestionData.question }}</h2>
      <div class="space-y-4">
        <button
          v-for="(option, index) in currentQuestionData.options"
          :key="index"
          @click="selectAnswer(index)"
          class="w-full text-left p-6 rounded-xl border-2 transition-all duration-200 text-lg font-medium shadow-sm"
          :class="{
            'border-primary bg-primary/10 shadow-primary/20': selectedAnswer === index,
            'border-gray-200 hover:border-primary/50 hover:bg-gray-50': selectedAnswer !== index,
          }"
        >
          {{ option }}
        </button>
      </div>
    </div>

    <div class="flex justify-between">
      <button
        @click="previousQuestion"
        :disabled="currentQuestion === 0"
        class="px-8 py-3 rounded-full text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        Previous
      </button>
      <button
        @click="nextQuestion"
        :disabled="selectedAnswer === null"
        class="px-8 py-3 rounded-full bg-primary text-white hover:bg-opacity-90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-primary/30"
      >
        {{ isLastQuestion ? 'Finish' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'Quiz',
  props: {
    testType: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    paperSet: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const currentQuestion = ref(0)
    const selectedAnswer = ref(null)
    const userAnswers = ref([])
    const questions = ref([])

    onMounted(async () => {
      try {
        const response = await fetch('/src/data/questionSets.json')
        const data = await response.json()
        questions.value = data[props.testType][props.subject][props.paperSet] || []
      } catch (error) {
        console.error('Error loading questions:', error)
        router.push('/test-selection')
      }
    })

    const currentQuestionData = computed(() => questions.value[currentQuestion.value])
    const isLastQuestion = computed(() => currentQuestion.value === questions.value.length - 1)

    const selectAnswer = (index) => {
      selectedAnswer.value = index
      userAnswers.value[currentQuestion.value] = index
    }

    const previousQuestion = () => {
      if (currentQuestion.value > 0) {
        currentQuestion.value--
        selectedAnswer.value = userAnswers.value[currentQuestion.value] ?? null
      }
    }

    const nextQuestion = () => {
      if (selectedAnswer.value === null) return

      if (isLastQuestion.value) {
        const score = userAnswers.value.reduce((acc, answer, index) => {
          return acc + (answer === questions.value[index].correctAnswer ? 1 : 0)
        }, 0)
        const percentage = Math.round((score / questions.value.length) * 100)
        router.push({
          name: 'result',
          params: {
            score: score,
            total: questions.value.length,
            percentage: percentage
          }
        })
      } else {
        currentQuestion.value++
        selectedAnswer.value = userAnswers.value[currentQuestion.value] ?? null
      }
    }

    return {
      currentQuestion,
      selectedAnswer,
      questions,
      currentQuestionData,
      isLastQuestion,
      selectAnswer,
      previousQuestion,
      nextQuestion,
    }
  },
})
</script>

<style scoped>
.quiz-container {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
}

.quiz-option {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quiz-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

:root {
  --primary-color: #4f46e5;
  --primary-color-rgb: 79, 70, 229;
  --primary-hover: #4338ca;
}

.bg-primary {
  background-color: var(--primary-color);
}

.text-primary {
  color: var(--primary-color);
}

.border-primary {
  border-color: var(--primary-color);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

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

.max-w-3xl {
  animation: fadeIn 0.5s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}

button {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.space-y-4 > button {
  margin-bottom: 1rem;
  background-color: #ffffff;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  color: #1f2937;
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
  border-width: 2px;
}

.space-y-4 > button:nth-child(1) {
  animation-delay: 0.1s;
}
.space-y-4 > button:nth-child(2) {
  animation-delay: 0.2s;
}
.space-y-4 > button:nth-child(3) {
  animation-delay: 0.3s;
}
.space-y-4 > button:nth-child(4) {
  animation-delay: 0.4s;
}

.space-y-4 > button:hover {
  background-color: #f8fafc;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.space-y-4 > button[class*='border-primary'] {
  background-color: rgba(var(--primary-color-rgb), 0.08);
  font-weight: 600;
  color: var(--primary-color);
  transform: scale(1.01);
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.15);
}

.bg-primary-10 {
  background-color: rgba(var(--primary-color-rgb), 0.1);
}

.shadow-primary-20 {
  box-shadow: 0 8px 16px rgba(var(--primary-color-rgb), 0.15);
}

.shadow-primary-30 {
  box-shadow: 0 8px 20px rgba(var(--primary-color-rgb), 0.2);
}

/* Progress bar animation */
.bg-primary {
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Navigation buttons */
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

button:not([disabled]):active {
  transform: translateY(1px);
}

/* Additional enhancements */
.space-y-4 > button {
  margin-bottom: 1.25rem;
  background-color: #ffffff;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
  color: #1f2937;
  animation: slideIn 0.3s ease-out;
  animation-fill-mode: both;
  border-width: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.space-y-4 > button:hover:not([disabled]) {
  background-color: #f8fafc;
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(var(--primary-color-rgb), 0.1);
}
</style>
