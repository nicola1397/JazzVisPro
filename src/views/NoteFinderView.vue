<template>
  <div id="view-note-finder" class="view-panel active">
    <div class="importer-area" style="max-width:600px;margin: 0 auto; width: 100%; text-align: center;">
      <h2 class="area-title" data-i18n="nf.title">{{ t('nf.title') }}</h2>

      <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:20px;background:rgba(50,215,75,0.05);padding:15px;border-radius:12px;border:1px solid rgba(50,215,75,0.2);">
      <div class="h3 mb-0" style="color:#32d74b;font-weight:800;text-transform:uppercase;letter-spacing:2px;text-align:center;">
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
import { NOTES, NOTES_FLAT, TUNINGS } from '../utils/theory.js'
import { BASE_OCTAVES }  from '../utils/constants.js'

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()

const questionText = ref(t('nf.ready'))
const statusText   = ref(t('nf.status'))
const score        = ref(0)
const total        = ref(0)
let active = false
let targetNote = 0

function reset() {
  score.value = 0; total.value = 0; active = false
  questionText.value = t('nf.ready')
  statusText.value   = t('nf.status')
  clearBoard()
}

function start() {
  active = true
  const notes = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  targetNote = Math.floor(Math.random() * 12)
  questionText.value = `${t('nf.find-prefix')}: ${notes[targetNote]}`
  statusText.value   = t('nf.click-status')
  audio.init()
  audio.playChord([0], targetNote, audio.context.currentTime, 0.8, 0.2, 'Electric Piano', 4)
  clearBoard()
}

function replay() {
  audio.init()
  audio.playChord([0], targetNote, audio.context.currentTime, 0.8, 0.2, 'Electric Piano', 4)
}

function clearBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
}

function checkAnswer({ noteIndex, stringIndex, fretIndex, element }) {
  const notes  = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  const tuning = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct    = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  audio.init()
  audio.playChord([0], noteIndex, audio.context.currentTime, 0.8, 0.2, 'Electric Piano', oct)
  if (!active) return
  active = false; total.value++
  element.style.transition = 'all 0.2s ease'
  if (noteIndex === targetNote) {
    score.value++
    element.style.backgroundColor = '#2ecc71'; element.style.opacity = '1'
    element.style.color = 'rgba(0,0,0,0.8)'; element.innerText = notes[noteIndex]
    statusText.value = t('nf.correct')
  } else {
    element.style.backgroundColor = '#e74c3c'; element.style.opacity = '1'
    element.style.color = 'rgba(0,0,0,0.8)'; element.innerText = notes[noteIndex]
    statusText.value = t('nf.wrong')
  }
  // Reveal all correct positions
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    if (parseInt(c.dataset.noteIndex) === targetNote) {
      c.style.transition = 'all 0.2s ease'; c.style.backgroundColor = '#2ecc71'
      c.style.opacity = '1'; c.innerText = notes[targetNote]; c.style.color = 'rgba(0,0,0,0.8)'
    }
  })
}

function onNoteClick(e) { checkAnswer(e.detail) }
onMounted(() => { window.addEventListener('fretboard:noteClick', onNoteClick); clearBoard() })
onUnmounted(() => { window.removeEventListener('fretboard:noteClick', onNoteClick); clearBoard() })
</script>
