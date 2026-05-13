<template>
  <div id="view-ear-training" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('et.title') }}</h1>
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
          <button class="jd-tbtn jd-tbtn--play" :disabled="phase === 'listening'" @click="playChord" aria-label="Play">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" :disabled="phase === 'idle'" @click="replayChord" aria-label="Replay">
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
          <span v-if="phase === 'idle'">{{ t('et.ready') }}</span>
          <span v-else-if="phase === 'listening'">?</span>
          <span v-else>{{ currentChordDisplay }}</span>
        </div>
        <div class="jd-question-hint">
          {{ phase === 'listening' ? t('et.listening') : (statusMsg || '') }}
        </div>
      </div>
    </section>

    <div class="jd-section-label">
      <span>{{ t('label.choices') }}</span>
      <span class="jd-section-rule"></span>
    </div>

    <div class="jd-choices-grid">
      <button
        v-for="chord in currentSet"
        :key="chord"
        class="jd-choice-btn"
        :class="{
          correct: answered && chord === currentChord,
          wrong:   answered && chord === answeredChord && chord !== currentChord,
        }"
        :disabled="answered || phase !== 'listening'"
        @click="answer(chord)"
      >{{ chord }}</button>
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
        <div v-for="stat in historyStats" :key="stat.chord" class="jd-stat-row">
          <span class="jd-stat-label">{{ stat.chord }}</span>
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
import { useAppStore }   from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES } from '../utils/theory.js'

const audio = useAudioStore()
const appStore = useAppStore()
const { t } = useI18n()

// ── Constants ─────────────────────────────────────────────────────────────────
const CHORD_SETS = {
  easy:   ['maj7','m7','7'],
  medium: ['maj7','m7','7','m7b5','dim7'],
  hard:   ['maj7','m7','7','m7b5','dim7','mMaj7','7alt'],
}
const INTERVALS = {
  'maj7':  [0,4,7,11],
  'm7':    [0,3,7,10],
  '7':     [0,4,7,10],
  'm7b5':  [0,3,6,10],
  'dim7':  [0,3,6,9],
  'mMaj7': [0,3,7,11],
  '7alt':  [0,4,6,10],
}

// ── State ─────────────────────────────────────────────────────────────────────
const difficulty    = ref('easy')
const phase         = ref('idle')   // 'idle' | 'listening' | 'answered'
const currentChord  = ref(null)
const currentRoot   = ref(null)
const answeredChord = ref(null)
const answered      = ref(false)
const score         = ref(0)
const total         = ref(0)
const streak        = ref(0)
const statusMsg     = ref('')
const lastCorrect   = ref(false)

const rawStats = ref([])

// ── Computed ──────────────────────────────────────────────────────────────────
const currentSet = computed(() => CHORD_SETS[difficulty.value])

const currentChordDisplay = computed(() => {
  if (!currentChord.value || currentRoot.value === null) return ''
  return NOTES[currentRoot.value] + currentChord.value
})

const historyStats = computed(() => {
  const map = {}
  for (const entry of rawStats.value) {
    if (!map[entry.chord]) map[entry.chord] = { chord: entry.chord, correct: 0, total: 0 }
    map[entry.chord].total++
    if (entry.correct) map[entry.chord].correct++
  }
  return Object.values(map).map(s => ({
    ...s,
    pct: s.total > 0 ? Math.round(s.correct / s.total * 100) : 0
  })).sort((a,b) => a.chord.localeCompare(b.chord))
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadStats() {
  try {
    const raw = localStorage.getItem('et_stats')
    rawStats.value = raw ? JSON.parse(raw) : []
  } catch { rawStats.value = [] }
}

function saveStats() {
  try { localStorage.setItem('et_stats', JSON.stringify(rawStats.value)) } catch {}
}

function getStatColor(pct) {
  if (pct >= 75) return '#2ecc71'
  if (pct >= 50) return '#f39c12'
  return '#e74c3c'
}

// ── Actions ───────────────────────────────────────────────────────────────────
function setDifficulty(level) {
  difficulty.value = level
  resetGame()
}

async function playChord() {
  await audio.init()
  const types = CHORD_SETS[difficulty.value]
  currentRoot.value  = Math.floor(Math.random() * 12)
  currentChord.value = types[Math.floor(Math.random() * types.length)]
  const tones = INTERVALS[currentChord.value] || [0,4,7,10]

  answered.value      = false
  answeredChord.value = null
  phase.value         = 'listening'
  statusMsg.value     = ''
  lastCorrect.value   = false

  audio.playChord(tones, currentRoot.value, 0, 1.5, 0.25, 'Electric Piano', 4)
}

async function replayChord() {
  if (!currentChord.value) return
  await audio.init()
  const tones = INTERVALS[currentChord.value] || [0,4,7,10]
  audio.playChord(tones, currentRoot.value, 0, 1.5, 0.25, 'Electric Piano', 4)
}

async function answer(type) {
  if (answered.value || phase.value !== 'listening') return
  answeredChord.value = type
  answered.value      = true
  total.value++
  phase.value         = 'answered'

  const isCorrect = type === currentChord.value
  lastCorrect.value = isCorrect

  if (isCorrect) {
    score.value++
    streak.value++
    statusMsg.value = t('et.correct')
  } else {
    streak.value    = 0
    statusMsg.value = t('et.wrong') + ' ' + currentChordDisplay.value
  }

  rawStats.value.push({ chord: currentChord.value, correct: isCorrect })
  if (rawStats.value.length > 200) rawStats.value.splice(0, rawStats.value.length - 200)
  saveStats()

  const tones = INTERVALS[currentChord.value] || [0,4,7,10]
  await audio.init()
  audio.playChord(tones, currentRoot.value, 0, 1.0, 0.25, 'Electric Piano', 4)
}

function resetGame() {
  statusMsg.value    = ''
  score.value        = 0
  total.value        = 0
  streak.value       = 0
  lastCorrect.value  = false
  phase.value        = 'idle'
  currentChord.value = null
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
  font-size: 32px;
  font-weight: 900;
  color: var(--jd-amber);
  letter-spacing: 2px;
}

.jd-question-hint {
  font-size: 14px;
  color: var(--jd-muted);
  margin-top: 10px;
  min-height: 20px;
}

.jd-choices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  padding: 0 20px 20px;
}

.jd-choice-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 15px 10px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.jd-choice-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.jd-choice-btn.correct {
  background: #2ecc71;
  border-color: #2ecc71;
  color: white;
}

.jd-choice-btn.wrong {
  background: #e74c3c;
  border-color: #e74c3c;
  color: white;
}

.jd-stats-container {
  padding: 0 20px 20px;
}

.jd-stat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.jd-stat-label {
  font-size: 12px;
  font-weight: 700;
  width: 60px;
  color: var(--jd-muted);
}

.jd-stat-progress {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.jd-stat-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.jd-stat-val {
  font-size: 12px;
  font-weight: 700;
  width: 40px;
  text-align: right;
}

.jd-stat-count {
  font-size: 10px;
  color: var(--jd-muted);
  width: 40px;
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
