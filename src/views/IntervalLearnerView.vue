<template>
  <div id="view-interval-learner" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('il.title') }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-master">
        <div class="jd-score-badge">
          <span class="jd-score-val">{{ score }} / {{ total }}</span>
          <span class="jd-score-label">{{ t('label.score') }}</span>
        </div>

        <div class="jd-transport">
          <button class="jd-tbtn jd-tbtn--play" @click="start" aria-label="Start / Next">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!active && root === undefined" aria-label="Replay">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <button class="jd-toolbtn" @click="reset">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box">
        <div class="jd-question-text" style="font-size: 24px;">
          {{ questionText }}
        </div>
        <div class="jd-question-hint">
          {{ statusText }}
        </div>
        <div class="jd-modes" style="justify-content: center; margin-top: 15px;">
          <label class="jd-mode" :class="{ on: descending }">
            <input type="checkbox" v-model="descending">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('il.descending') }}</span>
          </label>
        </div>
      </div>
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('il.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { useI18n }       from '../composables/useI18n.js'
import { INTERVAL_COLORS, TUNINGS, NOTES } from '../utils/theory.js'
import { BASE_OCTAVES }  from '../utils/constants.js'

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()

const questionText = ref(t('il.ready'))
const statusText   = ref(t('il.status'))
const score        = ref(0)
const total        = ref(0)
const descending   = ref(false)
let active = false
let root   = 0
let targetInterval = 0

function reset() {
  score.value = 0; total.value = 0; active = false
  questionText.value = t('il.ready')
  statusText.value   = t('il.status')
  clearBoard()
}

async function start() {
  active = true
  root           = Math.floor(Math.random() * 12)
  targetInterval = Math.floor(Math.random() * 11) + 1
  const info     = INTERVAL_COLORS[targetInterval]
  const rootName = NOTES[root]
  questionText.value = `${t('il.find-prefix')}: ${info.label} ${t('il.find-of')} ${rootName}${descending.value ? ' ↓' : ''}`
  statusText.value   = t('il.click-status')
  await audio.init()
  audio.playChord([0], root, 0, 1, 0.2, 'Electric Piano', 3)
  drawBoard()
}

async function replay() {
  if (!active && root === undefined) return
  await audio.init()
  audio.playChord([0], root, 0, 1, 0.2, 'Electric Piano', 3)
}

function drawBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    const nIdx = parseInt(c.dataset.noteIndex)
    c.className = 'note-circle'
    c.innerText  = ''
    c.style.cssText = ''
    if (nIdx === root) {
      c.style.backgroundColor = INTERVAL_COLORS[0].color
      c.innerText = 'R'; c.style.opacity = '1'; c.style.color = 'rgba(0,0,0,0.8)'
    } else {
      c.style.opacity = '0.04'
    }
  })
}

function clearBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''; c.style.cssText = ''
    c.style.opacity = '0.04'
  })
}

async function checkAnswer({ noteIndex, stringIndex, fretIndex, element }) {
  // Play the note
  const tuning = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  await audio.init()
  audio.playChord([0], noteIndex, 0, 0.8, 0.2, 'Electric Piano', oct)
  if (!active) return
  active = false
  total.value++
  const clicked = descending.value
    ? (root - noteIndex + 12) % 12
    : (noteIndex - root + 12) % 12
  element.style.transition = 'all 0.2s ease'
  if (clicked === targetInterval) {
    score.value++
    element.style.backgroundColor = '#2ecc71'
    element.style.opacity = '1'
    element.style.color   = 'rgba(0,0,0,0.8)'
    element.innerText     = INTERVAL_COLORS[clicked].short
    statusText.value      = t('il.correct')
  } else {
    element.style.backgroundColor = '#e74c3c'
    element.style.opacity = '1'
    element.style.color   = 'rgba(0,0,0,0.8)'
    element.innerText     = INTERVAL_COLORS[clicked]?.short || '?'
    statusText.value      = t('il.wrong')
    revealCorrect()
    const targetNote = descending.value
      ? (root - targetInterval + 12) % 12
      : (root + targetInterval) % 12
    setTimeout(() => audio.playChord([0], targetNote, 0, 1.2, 0.2, 'Electric Piano', oct), 800)
  }
}

function revealCorrect() {
  const targetNote = descending.value
    ? (root - targetInterval + 12) % 12
    : (root + targetInterval) % 12
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    if (parseInt(c.dataset.noteIndex) === targetNote) {
      c.style.transition = 'all 0.2s ease'
      c.classList.add('note-highlighted')
      c.style.backgroundColor = INTERVAL_COLORS[targetInterval].color
      c.innerText = INTERVAL_COLORS[targetInterval].short
      c.style.color   = 'rgba(0,0,0,0.8)'
      c.style.opacity = '1'
    }
  })
}

function onNoteClick(e) { checkAnswer(e.detail) }

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  clearBoard()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  clearBoard()
})
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
  font-weight: 900;
  color: var(--jd-amber);
  letter-spacing: 1px;
}

.jd-question-hint {
  font-size: 14px;
  color: var(--jd-muted);
  margin-top: 10px;
  min-height: 20px;
}

.jd-score-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid var(--jd-line);
}

.jd-score-val {
  font-weight: 800;
  font-size: 16px;
}

.jd-score-label {
  font-size: 9px;
  color: var(--jd-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
