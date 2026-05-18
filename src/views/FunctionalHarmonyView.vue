<template>
  <div id="view-functional-harmony" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('fh.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container" style="padding-top: 20px;">
      <p style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">{{ t('fh.subtitle') }}</p>

      <section class="jd-console" style="padding: 25px; margin-bottom: 25px;">
        <div class="jd-grain" aria-hidden="true"></div>
        
        <div class="jd-section-label">
          <span>{{ t('quiz.difficulty') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <!-- Difficulty Selector -->
        <div style="display:flex; gap:8px; align-items:center; justify-content:center; margin-bottom:20px;">
          <button
            v-for="d in ['easy', 'medium', 'hard']"
            :key="d"
            class="et-diff-btn"
            :class="{ active: difficulty === d }"
            @click="setDifficulty(d)"
          >{{ t('et.' + d) }}</button>
        </div>

        <div class="jd-rule" aria-hidden="true"></div>

        <!-- Score & Streak -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-family: var(--jd-mono); font-size: 0.8em; letter-spacing: 1px;">
          <div style="color: var(--jd-text-soft);">{{ t('label.score') }}: <strong style="color: var(--jd-text);">{{ score }} / {{ total }}</strong></div>
          <div style="color: var(--jd-amber);">{{ t('label.streak') }}: <strong>{{ streak }}</strong></div>
        </div>

        <!-- Progression Display -->
        <div class="jd-steps" style="padding: 20px; margin-bottom: 20px; background: var(--jd-bg-deep); border-radius: 12px; border: 1px solid var(--jd-line);">
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <div
              v-for="(chord, idx) in currentProgression"
              :key="idx"
              class="progression-step"
              :class="{ 'active-step': idx === targetIdx }"
              style="padding: 12px 20px; min-width: 80px; text-align: center;"
            >
              <div style="font-size:1.4em; font-weight:700; color:var(--jd-text);">{{ chord.name }}</div>
              <div v-if="answered" style="font-size:0.8em; color:var(--jd-amber); margin-top:4px; font-weight:700; font-family: var(--jd-mono);">{{ chord.degree }}</div>
              <div v-else-if="idx === targetIdx" style="font-size:0.8em; color:var(--jd-amber); margin-top:4px; font-family: var(--jd-mono);">?</div>
            </div>
          </div>
          <div v-if="!active" style="margin-top:20px; color:var(--jd-muted); font-style:italic; font-family: var(--jd-mono); font-size: 0.8em;">
            {{ t('fh.ready') }}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="jd-toolbar" style="justify-content: center; margin-bottom: 25px;">
          <button class="jd-toolbtn" style="min-width:180px;" @click="generateNew" :disabled="active && !answered">
            {{ answered ? t('fh.next') : t('fh.start') }}
          </button>
          <button class="jd-toolbtn jd-toolbtn--reset" style="width:auto; padding:0 20px;" @click="resetGame">{{ t('btn.reset-game') }}</button>
        </div>

        <div class="jd-section-label">
          <span>{{ t('cf.results') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <!-- Answer Grid -->
        <div class="jd-grid-fixed-4" style="margin-bottom:20px;">
          <button
            v-for="deg in currentDegrees"
            :key="deg"
            class="et-choice-btn"
            style="padding: 10px 4px; font-family: var(--jd-mono);"
            :class="{
              correct: answered && deg === currentProgression[targetIdx]?.degree,
              wrong:   answered && deg === selectedAnswer && deg !== currentProgression[targetIdx]?.degree,
            }"
            :disabled="!active || answered"
            @click="checkAnswer(deg)"
          >{{ deg }}</button>
        </div>

        <div id="fh-status" style="text-align:center; font-size:0.9em; min-height:28px; font-family: var(--jd-mono); font-weight: 700; letter-spacing: 0.5px;" :style="{color: lastCorrect ? 'var(--jd-improv)' : 'var(--jd-red)'}">
          {{ statusMsg }}
        </div>
      </section>
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