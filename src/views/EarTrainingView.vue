<template>
  <div id="view-ear-training" class="view-panel active">
    <div class="importer-area text-center" style="max-width:600px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="et.title">{{ t('et.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;" data-i18n="et.subtitle">{{ t('et.subtitle') }}</p>

      <!-- Score & Streak -->
      <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:20px;flex-wrap:wrap;">
        <div id="et-score" style="background:rgba(255,255,255,0.1);padding:8px 20px;border-radius:20px;font-size:1.1em;">{{ score }} / {{ total }}</div>
        <div id="et-streak" style="color:var(--accent);font-weight:700;font-size:1.1em;">🔥 {{ streak }}</div>
      </div>

      <!-- Question Box -->
      <div style="background:rgba(255,214,10,0.05);border:1px solid rgba(255,214,10,0.2);border-radius:12px;padding:28px;margin-bottom:20px;">
        <div id="et-question" class="h3 mb-0" style="color:var(--accent);font-weight:900;letter-spacing:2px;">
          <span v-if="phase === 'idle'">{{ t('et.ready') }}</span>
          <span v-else-if="phase === 'listening'">?</span>
          <span v-else>{{ currentChordDisplay }}</span>
        </div>
        <div id="et-root-hint" style="color:var(--secondary-text);font-size:0.85em;margin-top:8px;min-height:20px;">
          {{ phase === 'listening' ? (appStore.lang === 'it' ? '(Ascolta con attenzione...)' : '(Listen carefully...)') : '' }}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex gap-3 justify-content-center flex-wrap mb-4">
        <button class="btn-add-step" style="min-width:150px;" @click="playChord" :disabled="phase === 'listening'">{{ t('btn.play-chord') }}</button>
        <button class="btn-replay" @click="replayChord" :disabled="phase === 'idle'">{{ t('btn.replay') }}</button>
        <button class="btn-reset" style="height:38px;width:auto;padding:0 20px;" @click="resetGame">{{ t('btn.reset-game') }}</button>
      </div>

      <!-- Choices Grid -->
      <div id="et-choices" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
        <button
          v-for="chord in currentSet"
          :key="chord"
          class="et-choice-btn"
          :class="{
            correct: answered && chord === currentChord,
            wrong:   answered && chord === answeredChord && chord !== currentChord,
          }"
          :disabled="answered || phase !== 'listening'"
          @click="answer(chord)"
        >{{ chord }}</button>
      </div>

      <!-- Difficulty Options -->
      <div style="margin-top:15px;">
        <div style="font-size:0.8em;color:var(--secondary-text);margin-bottom:8px;" data-i18n="et.difficulty">{{ t('et.difficulty') }}</div>
        <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
          <button
            v-for="d in ['easy','medium','hard']"
            :key="d"
            class="et-diff-btn"
            :class="{ active: difficulty === d }"
            @click="setDifficulty(d)"
          >{{ t('et.' + d) }}</button>
        </div>
      </div>

      <div id="et-status" class="small" style="color:#aaa;margin-top:15px;">{{ statusMsg || t('et.status') }}</div>

      <!-- History Panel -->
      <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;">
        <div id="et-history-panel" style="min-height:40px;">
          <div v-if="historyStats.length > 0">
            <div style="font-size:0.75em;text-transform:uppercase;color:#777;font-weight:700;margin-bottom:8px;">{{ t('et.history') }}</div>
            <div v-for="stat in historyStats" :key="stat.chord" class="et-stat-row">
              <span class="et-stat-type">{{ stat.chord }}</span>
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

// ── Actions ───────────────────────────────────────────────────────────────────
function setDifficulty(level) {
  difficulty.value = level
  resetGame()
}

function playChord() {
  audio.init()
  const types = CHORD_SETS[difficulty.value]
  currentRoot.value  = Math.floor(Math.random() * 12)
  currentChord.value = types[Math.floor(Math.random() * types.length)]
  const tones = INTERVALS[currentChord.value] || [0,4,7,10]

  answered.value      = false
  answeredChord.value = null
  phase.value         = 'listening'
  statusMsg.value     = t('et.listening')
  lastCorrect.value   = false

  audio.playChord(tones, currentRoot.value, audio.context.currentTime + 0.05, 1.5, 0.25, 'Electric Piano', 4)
}

function replayChord() {
  if (!currentChord.value) return
  audio.init()
  const tones = INTERVALS[currentChord.value] || [0,4,7,10]
  audio.playChord(tones, currentRoot.value, audio.context.currentTime + 0.05, 1.5, 0.25, 'Electric Piano', 4)
}

function answer(type) {
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
  audio.playChord(tones, currentRoot.value, audio.context.currentTime + 0.05, 1.0, 0.25, 'Electric Piano', 4)
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
