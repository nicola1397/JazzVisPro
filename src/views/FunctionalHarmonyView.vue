<template>
  <div id="view-functional-harmony" class="view-panel active">
    <div class="importer-area text-center" style="max-width:720px;margin: 0 auto; width: 100%;">
      <h2 class="area-title">{{ t('fh.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;">{{ t('fh.subtitle') }}</p>

      <!-- Difficulty Selector -->
      <div style="display:flex;gap:8px;align-items:center;justify-content:center;margin-bottom:20px;">
        <button
          v-for="d in ['easy', 'medium', 'hard']"
          :key="d"
          class="et-diff-btn"
          :class="{ active: difficulty === d }"
          @click="setDifficulty(d)"
        >{{ t('et.' + d) }}</button>
      </div>

      <!-- Score & Streak -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div style="font-size:0.9em;"><span>{{ t('label.score') }}</span>: <strong>{{ score }} / {{ total }}</strong></div>
        <div style="font-size:0.9em;">🔥 {{ streak }}</div>
      </div>

      <!-- Progression Display -->
      <div style="background:rgba(255, 214, 10, 0.05);border:1px solid rgba(255, 214, 10, 0.2);border-radius:12px;padding:24px;margin-bottom:20px;">
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <div
            v-for="(chord, idx) in currentProgression"
            :key="idx"
            style="padding:10px 15px; border-radius:8px; border:2px solid;"
            :style="{
              borderColor: idx === targetIdx ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
              background: idx === targetIdx ? 'rgba(255,214,10,0.1)' : 'rgba(255,255,255,0.02)',
              boxShadow: idx === targetIdx ? '0 0 15px rgba(255,214,10,0.2)' : 'none'
            }"
          >
            <div style="font-size:1.4em;font-weight:800;color:var(--text-h);">{{ chord.name }}</div>
            <div v-if="answered" style="font-size:0.8em;color:var(--accent);margin-top:4px;font-weight:700;">{{ chord.degree }}</div>
            <div v-else-if="idx === targetIdx" style="font-size:0.8em;color:var(--accent);margin-top:4px;">?</div>
          </div>
        </div>
        <div v-if="!active" style="margin-top:20px;color:var(--secondary-text);font-style:italic;">
          {{ t('fh.ready') }}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="d-flex gap-3 justify-content-center flex-wrap mb-4">
        <button class="btn-add-step" style="min-width:180px;" @click="generateNew" :disabled="active && !answered">
          {{ answered ? t('fh.next') : t('fh.start') }}
        </button>
        <button class="btn-reset" style="width:auto;padding:0 20px;" @click="resetGame">Reset</button>
      </div>

      <!-- Answer Grid -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
        <button
          v-for="deg in currentDegrees"
          :key="deg"
          class="et-choice-btn"
          :class="{
            correct: answered && deg === currentProgression[targetIdx]?.degree,
            wrong:   answered && deg === selectedAnswer && deg !== currentProgression[targetIdx]?.degree,
          }"
          :disabled="!active || answered"
          @click="checkAnswer(deg)"
        >{{ deg }}</button>
      </div>

      <div id="fh-status" style="text-align:center;font-size:0.9em;min-height:28px;" :style="{color: lastCorrect ? '#22c55e' : '#ef4444'}">
        {{ statusMsg }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { NOTES } from '../utils/theory.js'

const { t } = useI18n()

// ── Configuration ─────────────────────────────────────────────────────────────
const DIFFICULTY_CONFIG = {
  easy: {
    degrees: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
    progressions: [
      ['I', 'vi', 'ii', 'V'],
      ['ii', 'V', 'I'],
      ['I', 'IV', 'vii°', 'iii', 'vi', 'ii', 'V', 'I'],
      ['I', 'V', 'vi', 'IV']
    ],
    chordMap: {
      'I': 'maj7', 'ii': 'm7', 'iii': 'm7', 'IV': 'maj7', 'V': '7', 'vi': 'm7', 'vii°': 'm7b5'
    }
  },
  medium: {
    degrees: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII', 'II'],
    progressions: [
      ['i', 'VI', 'iv', 'V'],
      ['ii°', 'V', 'i'],
      ['I', 'II', 'ii', 'V'],
      ['i', 'iv', 'VII', 'III', 'VI', 'ii°', 'V', 'i']
    ],
    chordMap: {
      'I': 'maj7', 'ii': 'm7', 'iii': 'm7', 'IV': 'maj7', 'V': '7', 'vi': 'm7', 'vii°': 'm7b5',
      'i': 'm7', 'ii°': 'm7b5', 'III': 'maj7', 'iv': 'm7', 'v': 'm7', 'VI': 'maj7', 'VII': '7',
      'II': '7'
    }
  },
  hard: {
    degrees: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°', 'i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII', 'II', 'bII', 'bIII', 'bVI', 'bVII', '#iv°'],
    progressions: [
      ['I', 'bVI', 'bII', 'V'],
      ['I', '#iv°', 'IV', 'iv', 'I'],
      ['I', 'bIII', 'bVI', 'bVII'],
      ['ii', 'bII', 'I']
    ],
    chordMap: {
      'I': 'maj7', 'ii': 'm7', 'iii': 'm7', 'IV': 'maj7', 'V': '7', 'vi': 'm7', 'vii°': 'm7b5',
      'i': 'm7', 'ii°': 'm7b5', 'III': 'maj7', 'iv': 'm7', 'v': 'm7', 'VI': 'maj7', 'VII': '7',
      'II': '7', 'bII': 'maj7', 'bIII': 'maj7', 'bVI': 'maj7', 'bVII': '7', '#iv°': 'dim7'
    }
  }
}

// ── State ─────────────────────────────────────────────────────────────────────
const difficulty         = ref('easy')
const currentProgression = ref([])
const targetIdx          = ref(-1)
const active             = ref(false)
const answered           = ref(false)
const selectedAnswer     = ref(null)
const score              = ref(0)
const total              = ref(0)
const streak             = ref(0)
const statusMsg          = ref('')
const lastCorrect        = ref(false)

// ── Computed ──────────────────────────────────────────────────────────────────
const currentDegrees = computed(() => DIFFICULTY_CONFIG[difficulty.value].degrees)

// ── Logic ─────────────────────────────────────────────────────────────────────
function getSemitones(degree) {
  const baseMap = { 'I':0, 'II':2, 'III':4, 'IV':5, 'V':7, 'VI':9, 'VII':11 }
  let offset = 0
  
  // Handle accidentals
  let cleanDegree = degree.replace('°', '')
  if (cleanDegree.includes('b')) {
    offset = -1
    cleanDegree = cleanDegree.replace('b', '')
  } else if (cleanDegree.includes('#')) {
    offset = 1
    cleanDegree = cleanDegree.replace('#', '')
  }
  
  const base = cleanDegree.toUpperCase()
  const baseSemitones = baseMap[base] ?? 0
  return (baseSemitones + offset + 12) % 12
}

// ── Actions ───────────────────────────────────────────────────────────────────
function setDifficulty(d) {
  difficulty.value = d
  resetGame()
}

function generateNew() {
  active.value   = true
  answered.value = false
  statusMsg.value = ''
  selectedAnswer.value = null
  
  const rootIdx = Math.floor(Math.random() * 12)
  const config = DIFFICULTY_CONFIG[difficulty.value]
  const template = config.progressions[Math.floor(Math.random() * config.progressions.length)]
  
  currentProgression.value = template.map(deg => {
    const semitones = getSemitones(deg)
    const chordRoot = NOTES[(rootIdx + semitones) % 12]
    return {
      name: chordRoot + config.chordMap[deg],
      degree: deg
    }
  })
  
  targetIdx.value = Math.floor(Math.random() * currentProgression.value.length)
}

function checkAnswer(deg) {
  if (!active.value || answered.value) return
  
  selectedAnswer.value = deg
  answered.value = true
  total.value++
  
  const correct = deg === currentProgression.value[targetIdx.value].degree
  lastCorrect.value = correct
  
  if (correct) {
    score.value++
    streak.value++
    statusMsg.value = t('fh.correct')
  } else {
    streak.value = 0
    statusMsg.value = t('fh.wrong')
  }
}

function resetGame() {
  active.value = false
  answered.value = false
  score.value = 0
  total.value = 0
  streak.value = 0
  statusMsg.value = ''
  currentProgression.value = []
}
</script>

<style scoped>
.et-choice-btn {
  padding: 12px 5px;
  font-size: 0.95em;
  font-weight: 700;
}
</style>