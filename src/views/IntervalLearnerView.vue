<template>
  <div id="view-interval-learner" class="view-panel active">
    <div class="importer-area" style="max-width:600px;margin: 0 auto; width: 100%; text-align: center;">
      <h2 class="area-title" data-i18n="il.title">{{ t('il.title') }}</h2>

      <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:20px;background:rgba(255,214,10,0.05);padding:15px;border-radius:12px;border:1px solid rgba(255,214,10,0.2);">
      <div class="h3 mb-0" style="color:var(--accent);font-weight:800;text-transform:uppercase;letter-spacing:1px;text-align:center;">
        {{ questionText }}
      </div>
      <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap" style="margin-top:10px;">
        <button class="btn-add-step w-auto" style="min-width:150px;" @click="start">{{ t('btn.start-next') }}</button>
        <button class="btn-replay" @click="replay">{{ t('btn.replay') }}</button>
        <button class="btn-reset w-auto" style="height:38px;" @click="reset">{{ t('btn.reset-game') }}</button>
        <div class="h5 mb-0" style="background:rgba(255,255,255,0.1);padding:5px 15px;border-radius:20px;min-width:100px;text-align:center;">
          {{ score }} / {{ total }}
        </div>
      </div>
      <div class="d-flex align-items-center gap-2" style="margin-top:4px;">
        <input type="checkbox" id="il-descending" v-model="descending" style="accent-color:var(--accent)">
        <label for="il-descending" style="color:#aaa;font-size:0.85em;">{{ t('il.descending') }}</label>
      </div>
      <div class="small" style="color:#aaa;margin-top:6px;text-align:center;">{{ statusText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { useI18n }       from '../composables/useI18n.js'
import { INTERVAL_COLORS, TUNINGS } from '../utils/theory.js'
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

function start() {
  active = true
  root           = Math.floor(Math.random() * 12)
  targetInterval = Math.floor(Math.random() * 11) + 1
  const info     = INTERVAL_COLORS[targetInterval]
  const rootName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][root]
  questionText.value = `${t('il.find-prefix')}: ${info.label} ${t('il.find-of')} ${rootName}${descending.value ? ' ↓' : ''}`
  statusText.value   = t('il.click-status')
  audio.init()
  audio.playChord([0], root, audio.context.currentTime, 1, 0.2, 'Electric Piano', 3)
  drawBoard()
}

function replay() {
  if (!active && root === undefined) return
  audio.init()
  audio.playChord([0], root, audio.context.currentTime, 1, 0.2, 'Electric Piano', 3)
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

function checkAnswer({ noteIndex, stringIndex, fretIndex, element }) {
  // Play the note
  const tuning = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  audio.init()
  audio.playChord([0], noteIndex, audio.context.currentTime, 0.8, 0.2, 'Electric Piano', oct)
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
    setTimeout(() => audio.playChord([0], targetNote, audio.context.currentTime, 1.2, 0.2, 'Electric Piano', oct), 800)
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
