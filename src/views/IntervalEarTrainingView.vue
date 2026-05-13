<template>
  <div id="view-interval-ear-training" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('iet.title') }}</h1>
      </div>
    </header>

    <section class="jd-console" :class="{ 'jd-playing': phase === 'listening' }">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-master">
        <div class="jd-score-badge">
          <span class="jd-score-val">{{ score }} / {{ total }}</span>
          <span class="jd-score-label">{{ t('label.score') }}</span>
        </div>
        
        <div class="jd-streak-badge">
          <span class="jd-streak-val">🔥 {{ streak }}</span>
          <span class="jd-streak-label">{{ t('label.streak') }}</span>
        </div>

        <div class="jd-transport">
          <button class="jd-tbtn jd-tbtn--play" :disabled="phase === 'listening'" @click="playInterval" aria-label="Play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" :disabled="phase === 'idle'" @click="replayInterval" aria-label="Replay">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <button class="jd-toolbtn" @click="resetGame">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box">
        <div class="jd-question-text">
          <span v-if="phase === 'idle' || phase === 'listening'">?</span>
          <span v-else>{{ intervalName(currentSemitones) }}</span>
        </div>
        <div class="jd-question-hint">
          {{ phase === 'listening' ? t('iet.listening') : (statusMsg || t('iet.ready')) }}
        </div>
      </div>
    </section>

    <div class="jd-section-label">
      <span>{{ t('label.choices') }}</span>
      <span class="jd-section-rule"></span>
    </div>

    <div class="jd-choices-grid">
      <button
        v-for="semi in currentPool"
        :key="semi"
        class="jd-choice-btn"
        :class="{
          correct: answered && semi === currentSemitones,
          wrong:   answered && semi === answeredSemitones && semi !== currentSemitones,
        }"
        :disabled="answered || phase !== 'listening'"
        @click="answerInterval(semi)"
      >{{ intervalName(semi) }}</button>
    </div>

    <div class="jd-section-label">
      <span>{{ t('et.difficulty') }}</span>
      <span class="jd-section-rule"></span>
    </div>
    
    <div class="jd-modes" style="padding: 0 20px 20px;">
      <label v-for="d in ['easy','medium','hard']" :key="d" class="jd-mode" :class="{ on: difficulty === d }">
        <input type="radio" :value="d" v-model="difficulty" @change="setDifficulty(d)" class="hidden-radio">
        <span class="jd-mode-dot" aria-hidden="true"></span>
        <span class="jd-mode-text">{{ t('et.' + d) }}</span>
      </label>
    </div>

    <div class="jd-section-label">
      <span>{{ t('et.history') }}</span>
      <span class="jd-section-rule"></span>
    </div>

    <div class="jd-history-stats">
      <div v-if="historyStats.length > 0" class="jd-stats-container">
        <div v-for="stat in historyStats" :key="stat.name" class="jd-stat-row">
          <span class="jd-stat-label" style="width:100px;">{{ stat.name }}</span>
          <div class="jd-stat-progress">
            <div class="jd-stat-bar" :style="{ width: stat.pct + '%', backgroundColor: getStatColor(stat.pct) }"></div>
          </div>
          <span class="jd-stat-val">{{ stat.pct }}%</span>
          <span class="jd-stat-count">{{ stat.correct }}/{{ stat.total }}</span>
        </div>
        <button class="jd-toolbtn jd-toolbtn--reset" style="margin-top:15px;" @click="clearHistory">{{ t('et.clear-history') }}</button>
      </div>
      <div v-else class="jd-section-hint" style="padding: 0 20px;">{{ t('et.history-empty') }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'

const audio    = useAudioStore()
const appStore = useAppStore()
const { t }    = useI18n()

// ── Constants ─────────────────────────────────────────────────────────────────
const POOLS = {
  easy:   [0,4,5,7,12],
  medium: [0,2,3,4,5,7,9,12],
  hard:   [0,1,2,3,4,5,6,7,8,9,10,11,12],
}
const NAMES_IT = {
  0:'Unisono (P1)', 1:'Semitono (m2)', 2:'Tono (M2)',
  3:'Terza min (m3)', 4:'Terza Mag (M3)', 5:'Quarta (P4)',
  6:'Tritono (TT)', 7:'Quinta (P5)', 8:'Sesta min (m6)',
  9:'Sesta Mag (M6)', 10:'Settima min (m7)', 11:'Settima Mag (M7)', 12:'Ottava (P8)',
}
const NAMES_EN = {
  0:'Unison (P1)', 1:'Minor 2nd (m2)', 2:'Major 2nd (M2)',
  3:'Minor 3rd (m3)', 4:'Major 3rd (M3)', 5:'Perfect 4th (P4)',
  6:'Tritone (TT)', 7:'Perfect 5th (P5)', 8:'Minor 6th (m6)',
  9:'Major 6th (M6)', 10:'Minor 7th (m7)', 11:'Major 7th (M7)', 12:'Octave (P8)',
}

// ── State ─────────────────────────────────────────────────────────────────────
const difficulty        = ref('easy')
const phase             = ref('idle')   // 'idle' | 'listening' | 'answered'
const currentSemitones  = ref(0)
const answeredSemitones = ref(null)
const currentRoot       = ref(0)
const answered          = ref(false)
const lastCorrect       = ref(false)
const statusMsg         = ref('')
const score             = ref(0)
const total             = ref(0)
const streak            = ref(0)

const rawStats = ref([])

let playTimers = []

// ── Computed ──────────────────────────────────────────────────────────────────
const currentPool = computed(() => POOLS[difficulty.value])

function intervalName(semi) {
  return appStore.lang === 'it' ? (NAMES_IT[semi] || String(semi)) : (NAMES_EN[semi] || String(semi))
}

const historyStats = computed(() => {
  const map = {}
  for (const entry of rawStats.value) {
    if (!map[entry.semi]) map[entry.semi] = { semi: entry.semi, correct: 0, total: 0 }
    map[entry.semi].total++
    if (entry.correct) map[entry.semi].correct++
  }
  return Object.values(map).map(s => ({
    ...s,
    name: intervalName(s.semi),
    pct: s.total > 0 ? Math.round(s.correct / s.total * 100) : 0
  })).sort((a,b) => a.semi - b.semi)
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadStats() {
  try {
    const raw = localStorage.getItem('iet_stats')
    rawStats.value = raw ? JSON.parse(raw) : []
  } catch { rawStats.value = [] }
}

function saveStats() {
  try { localStorage.setItem('iet_stats', JSON.stringify(rawStats.value)) } catch {}
}

function clearTimers() {
  playTimers.forEach(id => clearTimeout(id))
  playTimers = []
}

function getStatColor(pct) {
  if (pct >= 75) return '#2ecc71'
  if (pct >= 50) return '#f39c12'
  return '#e74c3c'
}

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

async function scheduleIntervalPlay(root, semi) {
  await audio.init()
  const rootNoteIdx = root
  const topNoteIdx  = (root + semi) % 12
  const topOctave   = semi >= 12 ? 5 : 4

  // 1) Play root
  audio.playChord([0], rootNoteIdx, 0, 0.8, 0.25, 'Electric Piano', 4)

  // 2) After 800ms: top note
  const t1 = setTimeout(() => {
    audio.playChord([0], topNoteIdx, 0, 0.8, 0.25, 'Electric Piano', topOctave)
  }, 800)

  // 3) After 1700ms: both together
  const t2 = setTimeout(() => {
    const harmonicTones = semi === 0 ? [0] : [0, semi]
    audio.playChord(harmonicTones, rootNoteIdx, 0, 0.8, 0.4, 'Electric Piano', 4)
  }, 1700)

  playTimers.push(t1, t2)
}

// ── Actions ───────────────────────────────────────────────────────────────────
function setDifficulty(d) {
  difficulty.value = d
  resetGame()
}

async function playInterval() {
  await audio.init()
  clearTimers()
  const pool = POOLS[difficulty.value]
  currentSemitones.value  = randomItem(pool)
  currentRoot.value       = Math.floor(Math.random() * 12)
  answered.value          = false
  answeredSemitones.value = null
  phase.value             = 'listening'
  statusMsg.value         = t('iet.listening')
  lastCorrect.value       = false
  scheduleIntervalPlay(currentRoot.value, currentSemitones.value)
}

async function replayInterval() {
  if (phase.value === 'idle') return
  await audio.init()
  clearTimers()
  scheduleIntervalPlay(currentRoot.value, currentSemitones.value)
}

function answerInterval(semi) {
  if (answered.value || phase.value !== 'listening') return
  clearTimers()
  answeredSemitones.value = semi
  answered.value          = true
  total.value++
  phase.value         = 'answered'

  const isCorrect = semi === currentSemitones.value
  lastCorrect.value = isCorrect

  if (isCorrect) {
    score.value++
    streak.value++
    statusMsg.value = t('iet.correct')
  } else {
    streak.value    = 0
    statusMsg.value = `${t('iet.wrong')} ${intervalName(currentSemitones.value)}`
  }

  rawStats.value.push({ semi: currentSemitones.value, correct: isCorrect })
  saveStats()

  setTimeout(() => scheduleIntervalPlay(currentRoot.value, currentSemitones.value), 400)
}

function resetGame() {
  clearTimers()
  phase.value             = 'idle'
  currentSemitones.value  = 0
  answeredSemitones.value = null
  answered.value          = false
  statusMsg.value         = ''
  score.value             = 0
  total.value             = 0
  streak.value            = 0
  lastCorrect.value       = false
}

function clearHistory() {
  rawStats.value = []
  saveStats()
}

onMounted(() => { loadStats() })
</script>

<style scoped>
.jd-question-box {
  background: rgba(255, 214, 10, 0.05);
  border: 1px solid rgba(255, 214, 10, 0.15);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin: 10px 0;
}

.jd-question-text {
  font-size: 28px;
  font-weight: 900;
  color: var(--jd-amber);
  letter-spacing: 1px;
  min-height: 42px;
}

.jd-question-hint {
  font-size: 14px;
  color: var(--jd-muted);
  margin-top: 10px;
  min-height: 20px;
}

.jd-choices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  padding: 0 20px 20px;
}

.jd-choice-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 12px 8px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.jd-choice-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.jd-choice-btn.correct {
  background: #2ecc71;
  border-color: #2ecc71;
}

.jd-choice-btn.wrong {
  background: #e74c3c;
  border-color: #e74c3c;
}

.jd-stats-container {
  padding: 0 20px 20px;
}

.jd-stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.jd-stat-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--jd-muted);
}

.jd-stat-progress {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
}

.jd-stat-bar {
  height: 100%;
  border-radius: 3px;
}

.jd-stat-val {
  font-size: 11px;
  font-weight: 700;
  width: 35px;
  text-align: right;
}

.jd-stat-count {
  font-size: 10px;
  color: var(--jd-muted);
  width: 35px;
  text-align: right;
}

.jd-score-badge, .jd-streak-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid var(--jd-line);
}

.jd-score-val, .jd-streak-val {
  font-weight: 800;
  font-size: 16px;
}

.jd-score-label, .jd-streak-label {
  font-size: 9px;
  color: var(--jd-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
