<template>
  <div id="view-quiz" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('quiz.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container--narrow text-center qz-page">
      <p class="qz-intro">{{ t('quiz.subtitle') }}</p>

      <!-- ───── SETUP PHASE ───── -->
      <section v-if="gameState === 'setup'" class="jd-console qz-setup">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label"><span>{{ t('quiz.setup') }}</span><span class="jd-section-rule"></span></div>

        <!-- Difficulty -->
        <div class="mb-4 qz-full">
          <label class="jd-pitch-label qz-label">{{ t('quiz.difficulty') }}</label>
          <div class="qz-levels">
            <button v-for="d in ['easy', 'medium', 'hard']" :key="d" class="et-diff-btn qz-level"
              :class="{ active: selectedDifficulty === d }"
              @click="selectedDifficulty = d">{{ t('et.' + d) }}</button>
          </div>
        </div>

        <div class="jd-rule" aria-hidden="true"></div>

        <!-- SRS mode -->
        <div class="mb-4 qz-full">
          <label class="jd-pitch-label qz-label">{{ t('srs.title') }}</label>
          <div class="qz-srs-list">
            <button v-for="m in srsModes" :key="m.id" class="srs-mode-btn" :class="{ active: srsMode === m.id }" @click="srsMode = m.id">
              <div class="qz-row">
                <span class="srs-radio" :class="{ active: srsMode === m.id }"></span>
                <div class="qz-srs-text">
                  <div class="qz-srs-label">{{ m.label }}</div>
                  <div class="qz-srs-desc">{{ m.desc }}</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div class="jd-rule" aria-hidden="true"></div>

        <!-- Categories -->
        <div class="mb-4 qz-full">
          <label class="jd-pitch-label qz-label">{{ t('quiz.categories') }}</label>
          <div class="checkbox-group qz-cats">
            <div v-for="cat in availableCategories" :key="cat.id" class="checkbox-container">
              <input type="checkbox" :id="'cat-' + cat.id" v-model="selectedCategories" :value="cat.id">
              <label :for="'cat-' + cat.id">{{ t('quiz.cat.' + cat.id) }}</label>
            </div>
          </div>
        </div>

        <button class="btn-add-step qz-start"
          :disabled="selectedCategories.length === 0 || !quizReady" @click="startQuiz">{{ t('quiz.start') }}</button>
        <p class="qz-setup-msg" v-if="setupMsg" role="status">{{ setupMsg }}</p>

        <!-- Box distribution chart -->
        <div v-if="totalSeen > 0" class="qz-boxes">
          <div class="qz-boxes-head">
            <span>{{ t('srs.boxes') }}</span>
            <span>{{ totalSeen }} {{ t('srs.total') }}</span>
          </div>
          <div class="qz-boxes-list">
            <div class="qz-row" v-for="b in boxRows" :key="b.box">
              <span class="qz-box-name" :style="{color: b.color}">{{ b.label }}</span>
              <div class="qz-box-track">
                <div :style="{width: b.pct + '%', height: '100%', background: b.color, transition: 'width .4s cubic-bezier(0.4, 0, 0.2, 1)', borderRadius: '3px'}"></div>
              </div>
              <span class="qz-box-count">{{ b.count }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── ACTIVE PHASE ───── -->
      <div class="qz-full" v-else-if="gameState === 'active'">
        <!-- Progress -->
        <div class="qz-progress-row">
          <div class="qz-progress-label">
            {{ t('quiz.progress') }} <strong class="qz-progress-now">{{ currentQuestionIdx + 1 }}</strong> <span class="qz-dim">/ {{ quizQuestions.length }}</span>
          </div>
          <div class="qz-score-label">
            {{ t('label.score') }} <strong class="qz-score-now">{{ score }}</strong>
          </div>
        </div>
        <div class="qz-progress-track">
          <div :style="{ width: ((currentQuestionIdx + 1) / quizQuestions.length * 100) + '%', background: 'var(--jd-amber)', height: '100%', transition: 'width 0.4s ease', boxShadow: '0 0 10px rgba(255,214,10,0.5)' }"></div>
        </div>

        <!-- Question Box -->
        <div class="jd-console qz-card">
          <div class="jd-grain" aria-hidden="true"></div>
          <div class="qz-card-kicker">
            <span>{{ t('quiz.cat.' + currentQuestionRaw.category) }} • {{ langContent.sub }}</span>
            <span v-if="currentIsReview" class="srs-badge">{{ t('srs.badge') }}</span>
          </div>
          <div class="h3 mb-0 qz-question">
            {{ langContent.question }}
          </div>
        </div>

        <!-- Options -->
        <div class="qz-options">
          <button v-for="(opt, idx) in currentOptions" :key="opt.idx" class="et-choice-btn qz-option"
            :class="{
              correct: answered && opt.isCorrect,
              wrong: answered && opt.idx === selectedIdx && !opt.isCorrect,
            }" :disabled="answered" @click="checkAnswer(opt)">
            <span class="qz-option-letter">{{ String.fromCharCode(65 + idx) }}</span>
            {{ (langContent.options || [])[opt.idx] }}
          </button>
        </div>

        <!-- Feedback -->
        <Transition name="jd-fade">
          <div v-if="answered" class="jd-console qz-feedback"
           >
            <div class="jd-grain" aria-hidden="true"></div>
            <div class="qz-feedback-title"
              :style="{ color: isCorrect ? 'var(--jd-improv)' : 'var(--jd-red)' }">
              <span v-if="isCorrect">✓ {{ t('et.correct') }}</span>
              <span v-else>✗ {{ t('et.wrong') }}</span>
            </div>
            <div class="qz-feedback-text">
              {{ langContent.explanation }}
            </div>
            <button class="btn-add-step mt-4 w-100 qz-btn-tall" @click="nextQuestion">
              {{ isLastQuestion ? t('quiz.show-results') : t('fh.next') }}
            </button>
          </div>
        </Transition>
      </div>

      <!-- ───── RESULTS PHASE ───── -->
      <section v-else-if="gameState === 'results'" class="jd-console qz-results">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="qz-trophy">🏆</div>
        <h2 class="qz-results-title">{{ t('quiz.complete') }}</h2>
        <p class="qz-results-sub">{{ t('quiz.final-score') }}</p>

        <div class="qz-final">
          {{ score }}<span class="qz-final-slash">/</span>{{ quizQuestions.length }}
        </div>

        <!-- Session breakdown -->
        <div class="qz-stats">
          <div><strong class="qz-c-ok">{{ score }}</strong> {{ t('srs.statsCorrect') }}</div>
          <div><strong class="qz-c-wrong">{{ quizQuestions.length - score }}</strong> {{ t('srs.statsWrong') }}</div>
          <div><strong class="qz-c-new">{{ sessNew }}</strong> {{ t('srs.statsNew') }}</div>
          <div><strong class="qz-c-review">{{ sessReview }}</strong> {{ t('srs.statsReview') }}</div>
        </div>

        <div class="qz-results-actions">
          <button class="btn-io flex-grow-1 qz-btn-tall" @click="gameState = 'setup'">{{ t('quiz.restart') }}</button>
          <button class="btn-reset qz-close" @click="resetToDashboard">{{ t('btn.close') }}</button>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { usePracticeStore } from '../stores/practice.js'
import { quizList, quizVersion, loadQuiz } from '../utils/quizData.js'

const { t } = useI18n()
const router = useRouter()
const appStore = useAppStore()
const practice = usePracticeStore()

// Fisher–Yates: Array.sort with a random comparator gives a biased order.
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ── SRS storage ─────────────────────────────────────────────────────────────
// Leitner 5-box: wrong→box 1, correct promotes box (max 5).
const SRS_INTERVALS_MS = [
  10 * 60 * 1000,             // box 1: 10 minutes
  60 * 60 * 1000,             // box 2: 1 hour
  24 * 60 * 60 * 1000,        // box 3: 1 day
  3 * 24 * 60 * 60 * 1000,    // box 4: 3 days
  7 * 24 * 60 * 60 * 1000,    // box 5: 1 week
]
function srsLoad() {
  try { const s = localStorage.getItem('jv_quiz_srs'); return s ? JSON.parse(s) : {} }
  catch (e) { return {} }
}
function srsSave(state) {
  try { localStorage.setItem('jv_quiz_srs', JSON.stringify(state)) } catch (e) {}
}
function srsRecord(state, qid, wasCorrect) {
  const now = Date.now()
  const cur = state[qid] || { box: 0, attempts: 0, correct: 0, lastSeen: 0, due: 0 }
  cur.attempts++
  cur.lastSeen = now
  if (wasCorrect) {
    cur.correct++
    cur.box = Math.min(5, (cur.box || 0) + 1)
  } else {
    cur.box = 1
  }
  cur.due = now + SRS_INTERVALS_MS[Math.max(0, cur.box - 1)]
  state[qid] = cur
  return state
}

// ── Local state ─────────────────────────────────────────────────────────────
const availableCategories = [
  { id: 'jazz_harmony', name: 'Jazz Harmony' },
  { id: 'jazz_theory', name: 'Jazz Theory' },
  { id: 'general_theory', name: 'General Theory' }
]

const gameState = ref('setup')
const selectedCategories = ref(['jazz_harmony', 'jazz_theory', 'general_theory'])
const selectedDifficulty = ref('medium')
const srsMode = ref('mixed') // 'new' | 'review' | 'mixed'

const quizQuestions = ref([])
const currentQuestionIdx = ref(0)
const score = ref(0)
const sessNew = ref(0)
const sessReview = ref(0)
const answered = ref(false)
const selectedIdx = ref(null)
const setupMsg = ref('')
const isCorrect = ref(false)
const currentOptions = ref([])
const srsState = ref({})

onMounted(() => { srsState.value = srsLoad() })

// Questions arrive per language (see utils/quizData.js)
const quizReady = computed(() => quizList.value.length > 0)
watch(() => appStore.lang, lang => { loadQuiz(lang).catch(() => { setupMsg.value = t('quiz.load-error') }) }, { immediate: true })

const currentQuestionRaw = computed(() => quizQuestions.value[currentQuestionIdx.value] || {})
const langContent = computed(() => {
  const q = currentQuestionRaw.value
  if (!q.id) return {}
  quizVersion.value                      // re-read when the other language arrives
  const lang = appStore.lang || 'it'
  return q[lang] || q.it || q.en
})
const isLastQuestion = computed(() => currentQuestionIdx.value === quizQuestions.value.length - 1)
const currentIsReview = computed(() => {
  const id = currentQuestionRaw.value.id
  return !!(id && srsState.value[id])
})

// SRS counters for current selection
const dueCountForSelection = computed(() => {
  const now = Date.now()
  let due = 0
  quizList.value.forEach(q => {
    if (!selectedCategories.value.includes(q.category)) return
    if (q.level !== selectedDifficulty.value) return
    const r = srsState.value[q.id]
    if (r && r.due <= now) due++
  })
  return due
})

const newCountForSelection = computed(() => quizList.value.filter(q =>
  selectedCategories.value.includes(q.category) && q.level === selectedDifficulty.value && !srsState.value[q.id]
).length)

const srsModes = computed(() => [
  { id: 'mixed',  label: t('srs.modeMixed'),  desc: dueCountForSelection.value + ' ' + t('srs.due') + ' + ' + t('srs.plusNew') },
  { id: 'review', label: t('srs.modeReview'), desc: dueCountForSelection.value + ' ' + t('srs.due') },
  { id: 'new',    label: t('srs.modeNew'),    desc: newCountForSelection.value + ' ' + t('srs.neverSeen') },
])

// Box distribution (across all categories — user-wide stats)
const totalSeen = computed(() => Object.keys(srsState.value).length)
const boxRows = computed(() => {
  const counts = [0, 0, 0, 0, 0, 0]
  Object.values(srsState.value).forEach(r => {
    const b = Math.min(5, Math.max(0, r.box || 0))
    counts[b]++
  })
  const total = Math.max(1, totalSeen.value)
  const meta = [
    { box: 1, label: t('srs.box1'), color: '#ef4444' },
    { box: 2, label: t('srs.box2'), color: '#f97316' },
    { box: 3, label: t('srs.box3'), color: '#FFD60A' },
    { box: 4, label: t('srs.box4'), color: '#3b82f6' },
    { box: 5, label: t('srs.box5'), color: '#22c55e' },
  ]
  return meta.map(m => ({ ...m, count: counts[m.box], pct: (counts[m.box] / total) * 100 }))
})

// ── SRS-aware question selection ────────────────────────────────────────────
function pickQuestions(pool, limit = 15) {
  const now = Date.now()
  const fresh = []
  const dueReview = []
  const seen = []
  for (const q of pool) {
    const r = srsState.value[q.id]
    if (!r) fresh.push(q)
    else if (r.due <= now) dueReview.push(q)
    else seen.push(q)
  }
  const shuf = shuffle
  shuf(fresh); shuf(dueReview); shuf(seen)

  let picked = []
  if (srsMode.value === 'review') picked = dueReview.slice(0, limit)
  else if (srsMode.value === 'new') picked = fresh.slice(0, limit)
  else {
    const reviewQuota = Math.min(dueReview.length, Math.ceil(limit * 0.6))
    const newQuota = limit - reviewQuota
    picked = [...dueReview.slice(0, reviewQuota), ...fresh.slice(0, newQuota)]
    if (picked.length < limit) {
      picked = [...picked, ...seen.slice(0, limit - picked.length)]
    }
    shuf(picked)
  }
  return picked
}

function startQuiz() {
  const filtered = quizList.value.filter(q =>
    selectedCategories.value.includes(q.category) &&
    q.level === selectedDifficulty.value
  )
  if (filtered.length === 0) {
    setupMsg.value = t('quiz.no-questions')
    return
  }
  const picked = pickQuestions(filtered, 15)
  if (picked.length === 0) { setupMsg.value = t('srs.noReview'); return }
  setupMsg.value = ''
  quizQuestions.value = picked
  currentQuestionIdx.value = 0
  score.value = 0
  sessNew.value = 0
  sessReview.value = 0
  gameState.value = 'active'
  prepareQuestion()
}

function prepareQuestion() {
  answered.value = false
  selectedIdx.value = null
  const q = currentQuestionRaw.value
  currentOptions.value = shuffle((q.it || q.en).options.map((_, idx) => ({ idx, isCorrect: idx === q.correct_idx })))
}

function checkAnswer(opt) {
  if (answered.value) return
  selectedIdx.value = opt.idx
  answered.value = true
  isCorrect.value = opt.isCorrect
  if (isCorrect.value) score.value++
  practice.record('quiz', currentQuestionRaw.value.category, opt.isCorrect)
  // Track session origin
  const id = currentQuestionRaw.value.id
  if (srsState.value[id]) sessReview.value++
  else sessNew.value++
  // Record in SRS
  const next = { ...srsState.value }
  srsRecord(next, id, opt.isCorrect)
  srsState.value = next
  srsSave(next)
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
/* Layout of the quiz (was inline in the template) */
.qz-full { width:100%; }
.qz-label { display:block; margin-bottom:10px; }
.qz-row { display:flex; align-items:center; gap:12px; }
.qz-btn-tall { height:48px; }
.qz-page { padding-top: 20px; }
.qz-intro { color:var(--jd-text-soft); font-size:0.85em; margin-bottom:24px; font-family:var(--jd-mono); letter-spacing:0.5px; }
.qz-setup { padding: 25px; }
.qz-levels { display:flex; gap:8px; justify-content:center; }
.qz-level { flex:1; max-width:120px; }
.qz-srs-list { display:flex; flex-direction:column; gap:8px; }
.qz-srs-text { flex:1; text-align:left; }
.qz-srs-label { font-weight:700; font-size:0.85em; }
.qz-srs-desc { font-size:0.72em; color:var(--jd-muted); margin-top:2px; letter-spacing:0.2px; }
.qz-cats { display:flex; flex-wrap:wrap; gap:15px; justify-content:center; background:rgba(0,0,0,0.2); }
.qz-start { height:52px; font-size:1.1em; width:100%; max-width:400px; margin-top:10px; }
.qz-setup-msg { margin-top:12px; color:var(--jd-red); font-family:var(--jd-mono); font-size:0.8em; }
.qz-boxes { width:100%; margin-top:30px; padding:20px; background:var(--jd-bg-deep); border:1px solid var(--jd-line); border-radius:12px; }
.qz-boxes-head { font-family:var(--jd-mono); font-size:0.7em; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:var(--jd-muted); margin-bottom:14px; text-align:left; display:flex; justify-content:space-between; }
.qz-boxes-list { display:flex; flex-direction:column; gap:10px; }
.qz-box-name { font-family:var(--jd-mono); font-size:0.65em; font-weight:700; min-width:85px; text-align:left; letter-spacing:0.5px; }
.qz-box-track { flex:1; height:6px; background:rgba(255,255,255,0.03); border-radius:3px; overflow:hidden; }
.qz-box-count { font-family:var(--jd-mono); font-size:0.7em; color:var(--jd-muted); font-weight:600; min-width:30px; text-align:right; }
.qz-progress-row { margin-bottom:15px; display:flex; justify-content:space-between; align-items:flex-end; }
.qz-progress-label { font-family:var(--jd-mono); font-size:0.8em; color:var(--jd-muted); }
.qz-progress-now { color:var(--jd-text); font-size:1.2em; }
.qz-dim { opacity:0.4; }
.qz-score-label { font-family:var(--jd-mono); font-size:0.8em; color:var(--jd-muted); text-align:right; }
.qz-score-now { color:var(--jd-amber); font-size:1.2em; }
.qz-progress-track { width:100%; height:4px; background:var(--jd-line); border-radius:2px; margin-bottom:30px; overflow:hidden; }
.qz-card { padding:40px; margin-bottom:30px; min-height:160px; display:flex; align-items:center; justify-content:center; flex-direction:column; border-radius:16px; }
.qz-card-kicker { font-family:var(--jd-mono); font-size:0.7em; text-transform:uppercase; color:var(--jd-amber); font-weight:700; margin-bottom:15px; letter-spacing:3px; display:flex; align-items:center; gap:10px; }
.qz-question { font-family:var(--jd-display); font-style:italic; font-weight:400; color:var(--jd-text); line-height:1.3; text-align:center; }
.qz-options { display:grid; grid-template-columns:1fr; gap:12px; margin-bottom:35px; }
.qz-option { text-align:left; padding:18px 24px; min-height:64px; height:auto; line-height:1.3; }
.qz-option-letter { margin-right:18px; opacity:0.3; font-family:var(--jd-mono); font-size:0.8em; }
.qz-feedback { padding:24px; text-align:left; border-radius:16px; background:var(--jd-bg-deep); }
.qz-feedback-title { font-family:var(--jd-mono); font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:10px; font-size:0.9em; letter-spacing:1px; }
.qz-feedback-text { font-size:0.9em; color:var(--jd-text-soft); line-height:1.6; font-family:var(--jd-mono); }
.qz-results { padding:50px; text-align:center; }
.qz-trophy { font-size:5em; margin-bottom:15px; filter: drop-shadow(0 0 20px rgba(255,214,10,0.3)); }
.qz-results-title { font-family:var(--jd-display); font-style:italic; font-weight:400; color:var(--jd-text); margin-bottom:8px; font-size:2.2em; }
.qz-results-sub { color:var(--jd-muted); margin-bottom:25px; font-family:var(--jd-mono); text-transform:uppercase; letter-spacing:2px; font-size:0.75em; }
.qz-final { font-size:4.5em; font-weight:400; font-family:var(--jd-display); color:var(--jd-amber); margin-bottom:25px; line-height:1; }
.qz-final-slash { opacity:0.2; font-size:0.5em; margin:0 10px; }
.qz-stats { display:flex; gap:24px; justify-content:center; flex-wrap:wrap; font-family:var(--jd-mono); font-size:0.75em; color:var(--jd-muted); margin-bottom:40px; text-transform:uppercase; letter-spacing:1px; }
.qz-c-ok { color:var(--jd-improv); }
.qz-c-wrong { color:var(--jd-red); }
.qz-c-new { color:var(--jd-synth); }
.qz-c-review { color:var(--jd-drums); }
.qz-results-actions { display:flex; gap:12px; max-width:600px; margin:0 auto; }
.qz-close { width:auto; padding:0 30px; height:48px; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.et-choice-btn:not(.correct):not(.wrong):hover:not(:disabled) {
  border-color: var(--jd-amber);
  background: rgba(255, 214, 10, 0.06);
  color: var(--jd-amber);
}

.et-diff-btn {
  padding: 10px 16px;
  font-family: var(--jd-mono);
  font-weight: 700;
  font-size: 0.78em;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.srs-mode-btn {
  display: block; /* not the global centred button flex: dot and text start at the left edge */
  background: var(--jd-surface);
  border: 1px solid var(--jd-line);
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  color: var(--jd-text);
  font-family: var(--jd-mono);
  font-size: 0.85em;
  letter-spacing: 0.4px;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  text-align: left;
  width: 100%;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
.srs-mode-btn:hover {
  border-color: var(--jd-line-strong);
  background: var(--jd-surface-alt);
}
.srs-mode-btn.active {
  border-color: var(--jd-amber);
  background: linear-gradient(180deg, rgba(255, 214, 10, 0.08), rgba(255, 214, 10, 0.02));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 0 18px rgba(255, 214, 10, 0.12);
}

.srs-radio {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--jd-mute-deep);
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
  background: var(--jd-bg-deep);
}
.srs-radio.active {
  background: var(--jd-amber);
  border-color: var(--jd-amber);
  box-shadow: 0 0 10px rgba(255, 214, 10, 0.45);
}

.srs-badge {
  font-family: var(--jd-mono);
  font-size: 0.62em;
  font-weight: 700;
  background: linear-gradient(180deg, #ff8b3d, #d96b1c);
  color: var(--jd-bg-deep);
  padding: 3px 9px;
  border-radius: 999px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(255, 109, 0, 0.30);
}
</style>
