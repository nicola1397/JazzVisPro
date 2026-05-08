<template>
  <div id="view-interval-ear-training" class="view-panel active">
    <div class="importer-area text-center" style="max-width:720px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="iet.title">{{ t('iet.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;" data-i18n="iet.subtitle">{{ t('iet.subtitle') }}</p>

      <!-- Score & Streak -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div style="font-size:0.9em;"><span data-i18n="label.score">{{ t('label.score') }}</span>: <strong id="iet-score">{{ score }} / {{ total }}</strong></div>
        <div id="iet-streak" style="font-size:0.9em;">🔥 {{ streak }}</div>
      </div>

      <!-- Question Area -->
      <div id="iet-question" style="text-align:center;font-size:2em;font-weight:900;color:var(--accent);min-height:54px;margin-bottom:16px;line-height:1.2;">
        <span v-if="phase === 'idle' || phase === 'listening'">?</span>
        <span v-else>{{ intervalName(currentSemitones) }}</span>
      </div>

      <!-- Action Buttons -->
      <div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-bottom:16px;">
        <button class="btn-icon btn-play" style="width:54px;height:54px;" @click="playInterval" :disabled="phase === 'listening'">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button class="btn-io" @click="replayInterval" :disabled="phase === 'idle'" data-i18n="btn.replay">{{ t('btn.replay') }}</button>
        <button class="btn-reset" style="width:auto;padding:0 16px;" @click="resetGame" data-i18n="btn.reset-game">Reset</button>
      </div>

      <!-- Difficulty Options -->
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:20px;flex-wrap:wrap;">
        <button
          v-for="d in ['easy','medium','hard']"
          :key="d"
          class="iet-diff-btn"
          :class="{ active: difficulty === d }"
          @click="setDifficulty(d)"
        >{{ t('et.' + d) }}</button>
      </div>

      <!-- Choices Grid -->
      <div id="iet-choices" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:8px;margin-bottom:16px;">
        <button
          v-for="semi in currentPool"
          :key="semi"
          class="et-choice-btn iet-choice-btn"
          :class="{
            correct: answered && semi === currentSemitones,
            wrong:   answered && semi === answeredSemitones && semi !== currentSemitones,
          }"
          :disabled="answered || phase !== 'listening'"
          @click="answerInterval(semi)"
        >{{ intervalName(semi) }}</button>
      </div>

      <!-- Status text -->
      <div id="iet-status" style="text-align:center;color:var(--secondary-text);font-size:0.9em;min-height:28px;">
        {{ statusMsg || t('iet.ready') }}
      </div>

      <!-- History Panel -->
      <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;">
        <div id="et-history-panel" style="min-height:40px;">
          <div v-if="historyStats.length > 0">
            <div style="font-size:0.75em;text-transform:uppercase;color:#777;font-weight:700;margin-bottom:8px;">{{ t('et.history') }}</div>
            <div v-for="stat in historyStats" :key="stat.name" class="et-stat-row">
              <span class="et-stat-type">{{ stat.name }}</span>
              <div class="et-stat-bar">
                <div :style="{
                  width: stat.pct + '%',
                  background: stat.pct >= 75 ? '#2ecc71' : stat.pct >= 50 ? '#f39c12' : '#e74c3c',
                  height:'100%',
                  borderRadius:'4px'
                }"></div>
              </div>
              <span class="et-stat-pct">{{ stat.pct }}%</span>
              <span class="et-stat-cnt">{{ stat.correct }}/{{ stat.total }}</span>
            </div>
          </div>
          <div v-else style="color:#666;font-size:0.85em;text-align:center;">{{ t('et.history') }}</div>
        </div>
        <button class="btn-reset" style="width:auto;padding:0 16px;margin-top:10px;font-size:0.8em;" @click="clearHistory">{{ t('et.clear-history') }}</button>
      </div>

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
  phase.value             = 'answered'

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
