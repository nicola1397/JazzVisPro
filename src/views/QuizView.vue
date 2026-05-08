<template>
  <div id="view-quiz" class="view-panel active">
    <div class="importer-area text-center" style="max-width:700px;margin: 0 auto; width: 100%;">
      <h2 class="area-title">{{ t('quiz.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:24px;">{{ t('quiz.subtitle') }}</p>

      <!-- SETUP PHASE -->
      <div v-if="gameState === 'setup'" class="control-section"
        style="text-align:center; padding:25px; display:flex; flex-direction:column; align-items:center;">
        <div class="control-section-header" style="width:100%">{{ t('quiz.setup') }}</div>

        <!-- Difficulty (First) -->
        <div class="mb-4" style="width:100%">
          <label class="d-block mb-2" style="font-weight:700; font-size:0.9em; color:var(--accent);">{{
            t('quiz.difficulty') }}</label>
          <div style="display:flex;gap:8px;justify-content:center;">
            <button v-for="d in ['easy', 'medium', 'hard']" :key="d" class="et-diff-btn"
              style="flex:1; max-width:120px;" :class="{ active: selectedDifficulty === d }"
              @click="selectedDifficulty = d">{{ t('et.' + d) }}</button>
          </div>
        </div>

        <!-- Categories (Second) -->
        <div class="mb-4" style="width:100%">
          <label class="d-block mb-2" style="font-weight:700; font-size:0.9em; color:var(--accent);">{{
            t('quiz.categories') }}</label>
          <div class="d-flex flex-wrap gap-3 justify-content-center">
            <div v-for="cat in availableCategories" :key="cat.id" class="checkbox-container">
              <input type="checkbox" :id="'cat-' + cat.id" v-model="selectedCategories" :value="cat.id">
              <label :for="'cat-' + cat.id">{{ t('quiz.cat.' + cat.id) }}</label>
            </div>
          </div>
        </div>

        <button class="btn-add-step" style="height:48px; font-size:1.1em; width:100%; max-width:400px;"
          :disabled="selectedCategories.length === 0" @click="startQuiz">{{ t('quiz.start') }}</button>
      </div>

      <!-- QUIZ PHASE -->
      <div v-else-if="gameState === 'active'" style="width:100%;">
        <!-- Progress Bar -->
        <div style="margin-bottom:15px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:0.9em; color:#888;">{{ t('quiz.progress') }}: <strong>{{ currentQuestionIdx + 1 }} / {{
            quizQuestions.length }}</strong></div>
          <div style="font-size:0.9em; color:var(--accent);">{{ t('label.score') }}: <strong>{{ score }}</strong></div>
        </div>
        <div
          style="width:100%; height:6px; background:rgba(255,255,255,0.05); border-radius:3px; margin-bottom:25px; overflow:hidden;">
          <div
            :style="{ width: ((currentQuestionIdx + 1) / quizQuestions.length * 100) + '%', background: 'var(--accent)', height: '100%', transition: 'width 0.3s' }">
          </div>
        </div>

        <!-- Question Box -->
        <div
          style="background:rgba(255, 214, 10, 0.05); border:1px solid rgba(255, 214, 10, 0.2); border-radius:12px; padding:30px; margin-bottom:25px; min-height:120px; display:flex; align-items:center; justify-content:center; flex-direction:column;">
          <div
            style="font-size:0.7em; text-transform:uppercase; color:var(--accent); font-weight:800; margin-bottom:10px; letter-spacing:1px;">
            {{ t('quiz.cat.' + currentQuestionRaw.category) }} • {{ langContent.sub }}
          </div>
          <div class="h4 mb-0" style="font-weight:700; color:var(--text-h); line-height:1.4;">
            {{ langContent.question }}
          </div>
        </div>

        <!-- Options Grid -->
        <div style="display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:30px;">
          <button v-for="(opt, idx) in currentOptions" :key="idx" class="et-choice-btn"
            style="text-align:left; padding:15px 20px; min-height:54px; height:auto; line-height:1.3;" :class="{
              correct: answered && opt.isCorrect,
              wrong: answered && opt.label === selectedAnswerLabel && !opt.isCorrect,
            }" :disabled="answered" @click="checkAnswer(opt)">
            <span style="margin-right:15px; opacity:0.4; font-family:monospace;">{{ String.fromCharCode(65 + idx)
              }}.</span>
            {{ opt.label }}
          </button>
        </div>

        <!-- Feedback & Explanation -->
        <div v-if="answered"
          style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:20px; text-align:left; animation: fadeIn 0.3s ease;">
          <div style="font-weight:800; margin-bottom:8px; display:flex; align-items:center; gap:8px;"
            :style="{ color: isCorrect ? '#22c55e' : '#ef4444' }">
            <span v-if="isCorrect">✓ {{ t('et.correct') }}</span>
            <span v-else>✗ {{ t('et.wrong') }}</span>
          </div>
          <div style="font-size:0.9em; color:#bbb; line-height:1.5;">
            {{ langContent.explanation }}
          </div>
          <button class="btn-add-step mt-4 w-100" @click="nextQuestion">
            {{ isLastQuestion ? t('quiz.show-results') : t('fh.next') }}
          </button>
        </div>
      </div>

      <!-- RESULTS PHASE -->
      <div v-else-if="gameState === 'results'" class="control-section" style="padding:40px;">
        <div style="font-size:4em; margin-bottom:10px;">🏆</div>
        <h3 style="font-weight:800; color:var(--text-h); margin-bottom:5px;">{{ t('quiz.complete') }}</h3>
        <p style="color:#888; margin-bottom:30px;">{{ t('quiz.final-score') }}</p>

        <div style="font-size:3em; font-weight:900; color:var(--accent); margin-bottom:40px;">
          {{ score }} / {{ quizQuestions.length }}
        </div>

        <div style="display:flex; gap:12px;">
          <button class="btn-io flex-grow-1" @click="gameState = 'setup'">{{ t('quiz.restart') }}</button>
          <button class="btn-reset" style="width:auto; padding:0 25px;" @click="resetToDashboard">{{ t('btn.close')
            }}</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { QUIZ_DATABASE } from '../utils/quiz_db.js'

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()

const availableCategories = [
  { id: 'jazz_harmony', name: 'Jazz Harmony' },
  { id: 'jazz_theory', name: 'Jazz Theory' },
  { id: 'general_theory', name: 'General Theory' }
]

const gameState = ref('setup')
const selectedCategories = ref(['jazz_harmony', 'jazz_theory', 'general_theory'])
const selectedDifficulty = ref('medium')

const quizQuestions = ref([])
const currentQuestionIdx = ref(0)
const score = ref(0)
const answered = ref(false)
const selectedAnswerLabel = ref(null)
const isCorrect = ref(false)
const currentOptions = ref([])

const currentQuestionRaw = computed(() => quizQuestions.value[currentQuestionIdx.value] || {})
const langContent = computed(() => {
  const q = currentQuestionRaw.value
  if (!q.id) return {}
  const lang = appStore.lang || 'it'
  return q[lang] || q['it']
})

const isLastQuestion = computed(() => currentQuestionIdx.value === quizQuestions.value.length - 1)

function startQuiz() {
  const filtered = QUIZ_DATABASE.filter(q =>
    selectedCategories.value.includes(q.category) &&
    q.level === selectedDifficulty.value
  )
  if (filtered.length === 0) {
    alert(t('quiz.no-questions'))
    return
  }
  // Take up to 15 questions for a longer session
  quizQuestions.value = filtered.sort(() => Math.random() - 0.5).slice(0, 15)
  currentQuestionIdx.value = 0
  score.value = 0
  gameState.value = 'active'
  prepareQuestion()
}

function prepareQuestion() {
  answered.value = false
  selectedAnswerLabel.value = null

  const q = currentQuestionRaw.value
  const lang = appStore.lang || 'it'
  const content = q[lang] || q['it']

  // Build options with correct flag
  const opts = content.options.map((label, idx) => ({
    label,
    isCorrect: idx === q.correct_idx
  }))

  currentOptions.value = opts.sort(() => Math.random() - 0.5)
}

function checkAnswer(opt) {
  if (answered.value) return
  selectedAnswerLabel.value = opt.label
  answered.value = true
  isCorrect.value = opt.isCorrect
  if (isCorrect.value) score.value++
}

function nextQuestion() {
  if (isLastQuestion.value) {
    gameState.value = 'results'
  } else {
    currentQuestionIdx.value++
    prepareQuestion()
  }
}

function resetToDashboard() {
  router.push('/explorer')
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.et-choice-btn:not(.correct):not(.wrong):hover:not(:disabled) {
  border-color: var(--accent);
  background: rgba(255, 214, 10, 0.05);
}

.et-diff-btn {
  padding: 10px;
  font-weight: 700;
  font-size: 0.85em;
  transition: all 0.2s;
}
</style>
