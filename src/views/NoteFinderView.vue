<template>
  <div id="view-note-finder" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('nf.title') }}</h1>
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
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!active && targetNote === undefined" aria-label="Replay">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <button class="jd-toolbtn" @click="reset">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box" style="background: rgba(50, 215, 75, 0.05); border-color: rgba(50, 215, 75, 0.15);">
        <div class="jd-question-text" style="color: #32d74b;">
          {{ questionText }}
        </div>
        <div class="jd-question-hint">
          {{ statusText }}
        </div>
      </div>
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('nf.instructions') }}
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

async function start() {
  active = true
  const notes = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  targetNote = Math.floor(Math.random() * 12)
  questionText.value = `${t('nf.find-prefix')}: ${notes[targetNote]}`
  statusText.value   = t('nf.click-status')
  await audio.init()
  audio.playChord([0], targetNote, 0, 0.8, 0.2, 'Electric Piano', 4)
  clearBoard()
}

async function replay() {
  await audio.init()
  audio.playChord([0], targetNote, 0, 0.8, 0.2, 'Electric Piano', 4)
}

function clearBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
}

async function checkAnswer({ noteIndex, stringIndex, fretIndex, element }) {
  const notes  = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  const tuning = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct    = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  await audio.init()
  audio.playChord([0], noteIndex, 0, 0.8, 0.2, 'Electric Piano', oct)
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
onUnmounted(() => { window.removeEventListener('fretboard:noteClick', onNoteClick) })
</script>

<style scoped>
.jd-question-box {
  background: rgba(50, 215, 75, 0.05);
  border: 1px solid rgba(50, 215, 75, 0.15);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin: 10px 0;
}

.jd-question-text {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
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
