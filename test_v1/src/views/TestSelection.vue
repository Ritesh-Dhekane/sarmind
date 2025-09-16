<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary"
  >
    <div class="max-w-4xl mx-auto px-4 py-12 text-center animate-fadeIn">
      <div class="mb-8 animate-slideDown">
        <h1 class="text-5xl font-bold text-white mb-4 animate-title drop-shadow-lg">
          Select Your Test
        </h1>
        <p class="text-xl text-white mb-8 animate-subtitle drop-shadow-md">
          Choose your preferences to start the test
        </p>
      </div>

      <div
        class="max-w-2xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-white border-opacity-20"
      >
        <div class="space-y-6">
          <div class="mb-6">
            <label class="block text-white text-xl font-semibold mb-4 drop-shadow-md"
              >Select Test Type</label
            >
            <select
              v-model="selectedTest"
              class="w-full p-3 rounded-lg bg-white bg-opacity-20 text-gray-100 border border-white border-opacity-40 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-lg font-medium"
              @change="resetSubsequentSelections"
            >
              <option value="" disabled class="text-gray-800 bg-white font-medium">
                Choose a test type
              </option>
              <option
                v-for="test in testTypes"
                :key="test.id"
                :value="test.id"
                class="text-gray-800 bg-white"
              >
                {{ test.name }}
              </option>
            </select>
          </div>

          <!-- Subject Selection -->
          <div class="mb-6">
            <label class="block text-white text-xl font-semibold mb-4 drop-shadow-md"
              >Select Subject</label
            >
            <select
              v-model="selectedSubject"
              class="w-full p-3 rounded-lg bg-white bg-opacity-20 text-gray-100 border border-white border-opacity-40 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-lg font-medium"
              :disabled="!selectedTest"
              @change="resetPaperSet"
            >
              <option value="" disabled class="text-gray-800 bg-white">Choose a subject</option>
              <option
                v-for="subject in availableSubjects"
                :key="subject.id"
                :value="subject.id"
                class="text-gray-800 bg-white"
              >
                {{ subject.name }}
              </option>
            </select>
          </div>

          <!-- Paper Set Selection -->
          <div class="mb-6">
            <label class="block text-white text-xl font-semibold mb-4 drop-shadow-md"
              >Select Paper Set</label
            >
            <select
              v-model="selectedPaperSet"
              class="w-full p-3 rounded-lg bg-white bg-opacity-30 text-gray-800 border border-white border-opacity-40 focus:border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 backdrop-blur-lg font-medium"
              :disabled="!selectedSubject"
            >
              <option value="" disabled class="text-gray-800 bg-white">Choose a paper set</option>
              <option
                v-for="paper in availablePaperSets"
                :key="paper.id"
                :value="paper.id"
                class="text-gray-800 bg-white"
              >
                {{ paper.name }}
              </option>
            </select>
          </div>

          <button
            @click="startTest"
            :disabled="!isSelectionComplete"
            class="start-button w-full py-4 text-lg font-semibold transition-all duration-300 bg-white text-primary hover:bg-opacity-90"
            :class="{ 'opacity-50 cursor-not-allowed': !isSelectionComplete }"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TestSelection',
  setup() {
    const router = useRouter()
    const selectedTest = ref('')
    const selectedSubject = ref('')
    const selectedPaperSet = ref('')

    const testTypes = ref([
      { id: 'practice', name: 'Practice Test' },
      { id: 'mock', name: 'Mock Exam' },
      { id: 'final', name: 'Final Test' },
    ])

    const availableSubjects = computed(() => {
      if (!selectedTest.value) return []
      return [
        { id: 'math', name: 'Mathematics' },
        { id: 'science', name: 'Science' },
        { id: 'english', name: 'English' },
      ]
    })

    const availablePaperSets = computed(() => {
      if (!selectedSubject.value) return []
      return [
        { id: 'set1', name: 'Set 1' },
        { id: 'set2', name: 'Set 2' },
        { id: 'set3', name: 'Set 3' },
      ]
    })

    const isSelectionComplete = computed(() => {
      return selectedTest.value && selectedSubject.value && selectedPaperSet.value
    })

    const resetSubsequentSelections = () => {
      selectedSubject.value = ''
      selectedPaperSet.value = ''
    }

    const resetPaperSet = () => {
      selectedPaperSet.value = ''
    }

    const startTest = () => {
      if (isSelectionComplete.value) {
        router.push({
          name: 'quiz',
          params: {
            testType: selectedTest.value,
            subject: selectedSubject.value,
            paperSet: selectedPaperSet.value,
          },
        })
      }
    }

    return {
      selectedTest,
      selectedSubject,
      selectedPaperSet,
      testTypes,
      availableSubjects,
      availablePaperSets,
      isSelectionComplete,
      resetSubsequentSelections,
      resetPaperSet,
      startTest,
    }
  },
})
</script>

<style scoped>
:root {
  --primary-color: #6366f1;
  --secondary-color: #818cf8;
  --primary-rgb: 99, 102, 241;
}

.text-primary {
  color: var(--primary-color);
}

/* Enhanced dropdown styling */
select {
  transition: all 0.3s ease;
  cursor: pointer;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4));
  color: #1f2937;
  font-weight: 500;
}

select:hover:not(:disabled) {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.5));
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.15));
  color: rgba(31, 41, 55, 0.6);
}

select option {
  background-color: white;
  color: #1f2937;
  font-weight: 500;
}

select:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1));
}

.max-w-2xl {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.25);
}

.max-w-2xl:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.3);
}

/* Enhanced animations */
@keyframes fadeIn {
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

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}

.animate-slideDown {
  animation: slideDown 0.6s ease-out;
}

/* Enhanced button styling */
.start-button {
  @apply bg-white text-primary font-semibold rounded-full;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.start-button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.95);
}

.start-button:not(:disabled):active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
}

.start-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  transform: none !important;
  box-shadow: none !important;
}
</style>
