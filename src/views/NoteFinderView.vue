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
          <button class="jd-tbtn jd-tbtn--play" @click="start" :aria-label="t('aria.start-next')">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!hasQuestion" :aria-label="t('aria.replay')">
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
        <div v-if="refText" class="nf-ref">{{ refText }}</div>
        <div class="jd-question-hint">
          {{ statusText }}
        </div>
        <button v-if="active && settings.retry && misses > 0" type="button" class="jd-toolbtn nf-solution" @click="giveUp">{{ t('pm.show-solution') }}</button>
        <GuitarInputPanel :guitar="guitar" />
      </div>

      <PracticeModes
        v-model:reference="settings.reference"
        v-model:retry="settings.retry"
        :reference-label="t('pm.ref-string')"
        :reference-help="t('pm.help-nf')"
      />
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('nf.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { useI18n }       from '../composables/useI18n.js'
import { useGuitarInput, fretboardCirclesForMidi, midiToName } from '../composables/useGuitarInput.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { usePracticeStore } from '../stores/practice.js'
import { NOTES, NOTES_FLAT, TUNINGS } from '../utils/theory.js'
import { BASE_OCTAVES }  from '../utils/constants.js'
import { stringName, paintArea, clearArea, flashWrong, positionsOfMidi, allPositions, circleAt } from '../utils/fretRefs.js'
import GuitarInputPanel  from '../components/shared/GuitarInputPanel.vue'
import PracticeModes     from '../components/shared/PracticeModes.vue'

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()
const guitar   = useGuitarInput({ onNote: onGuitarNote })
const practice = usePracticeStore()
const fmt = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))

// While the app plays a note, a microphone may hear it: ignore that pitch for a moment.
const SELF_SOUND_HOLDOFF_MS = 600
const STORAGE_KEY = 'jazzVizNoteFinder'

// reference: each question also gives the string; retry: a wrong note does not end the question
const settings = reactive({ reference: false, retry: false, ...(readStorage(STORAGE_KEY, {}) || {}) })

const questionText = ref(t('nf.ready'))
const statusText   = ref(t('nf.status'))
const refText      = ref('')
const score        = ref(0)
const total        = ref(0)
const active       = ref(false)
const hasQuestion  = ref(false)
const misses       = ref(0)       // wrong attempts on the current question (retry mode)
let targetNote = 0
let targetString = null           // string index the note must be played on (reference mode)
let nextTimer = null

const notes = () => (appStore.accidental === '#' ? NOTES : NOTES_FLAT)

function reset() {
  clearTimeout(nextTimer)
  score.value = 0; total.value = 0
  endQuestion()
}

function endQuestion() {
  active.value = false; hasQuestion.value = false; misses.value = 0
  targetString = null
  questionText.value = t('nf.ready')
  statusText.value   = t('nf.status')
  refText.value = ''
  clearBoard()
}

async function start() {
  clearTimeout(nextTimer)
  active.value = true; hasQuestion.value = true; misses.value = 0
  targetNote = practice.pickWeighted('note-finder', [...Array(12).keys()])
  targetString = settings.reference ? Math.floor(Math.random() * 6) : null
  questionText.value = `${t('nf.find-prefix')}: ${notes()[targetNote]}`
  refText.value = targetString === null ? '' : fmt('pm.q-on', stringName(targetString, appStore.lang))
  statusText.value   = guitar.enabled ? t('nf.play-status') : t('nf.click-status')
  clearBoard()
  if (targetString !== null) paintArea(s => s === targetString)
  await audio.init()
  playTarget()
}

async function replay() {
  if (!hasQuestion.value) return
  await audio.init()
  playTarget()
}

function playTarget() {
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, targetNote)
  audio.playChord([0], targetNote, 0, 0.8, 0.2, 'Electric Piano', 4)
}

function clearBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
}

// Next question: always in retry mode once the answer is right, otherwise without leaving
// the guitar when auto-advance is on.
function scheduleNext(delay, right) {
  clearTimeout(nextTimer)
  const auto = (right && settings.retry) || (guitar.enabled && guitar.autoNext)
  if (!auto) return
  nextTimer = setTimeout(() => { if (!active.value) start() }, delay)
}

// Where the answer counts: every position of the note, or only those on the string asked.
function rightPositions() {
  return allPositions((s, f) => {
    const pc = (appStore.currentTuning[s] + f) % 12
    return pc === targetNote && (targetString === null || s === targetString)
  })
}

// `elements`: the circles to mark (the clicked one, or every position of the played pitch).
// `played`: name of the note played on the guitar, if the answer came from it.
// `pos`: string and fret of a clicked answer; `midi`: the pitch heard from the guitar.
function checkAnswer({ noteIndex, elements, played = '', pos = {}, midi = null }) {
  if (!active.value) return
  const rightNote = noteIndex === targetNote
  const rightPlace = targetString === null || (Number.isInteger(pos.s)
    ? pos.s === targetString
    : positionsOfMidi(appStore.currentTuning, midi, s => s === targetString).length > 0)
  const correct = rightNote && rightPlace
  practice.record('note-finder', targetNote, correct, { ...pos, guitar: !!played })
  const heard = played ? ` · 🎸 ${played}` : ''

  if (!correct && settings.retry) {
    misses.value++
    elements.forEach(el => flashWrong(el, notes()[noteIndex]))
    statusText.value = (rightNote ? fmt('pm.wrong-place', refText.value) : fmt('pm.retry-wrong', notes()[noteIndex])) + heard
    return
  }

  active.value = false; total.value++
  if (correct && misses.value === 0) score.value++
  elements.forEach(el => {
    el.style.transition = 'all 0.2s ease'
    el.style.backgroundColor = correct ? '#2ecc71' : '#e74c3c'; el.style.opacity = '1'
    el.style.color = 'rgba(0,0,0,0.8)'; el.innerText = notes()[noteIndex]
    if (played) { el.style.border = '2px solid white'; el.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)' }
  })
  if (correct) statusText.value = (misses.value ? fmt('pm.right-after', misses.value + 1) : t('nf.correct')) + heard
  else statusText.value = (rightNote ? fmt('pm.wrong-place', refText.value) : t('nf.wrong')) + heard
  revealPositions()
  scheduleNext(correct ? 1500 : 2500, correct)
}

function revealPositions() {
  clearArea()
  for (const p of rightPositions()) {
    const c = circleAt(p)
    if (!c) continue
    c.style.transition = 'all 0.2s ease'; c.style.backgroundColor = '#2ecc71'
    c.style.opacity = '1'; c.innerText = notes()[targetNote]; c.style.color = 'rgba(0,0,0,0.8)'
  }
}

// Retry mode: stop trying and see where the note is.
function giveUp() {
  if (!active.value) return
  active.value = false; total.value++
  statusText.value = t('pm.solution-shown')
  revealPositions()
  scheduleNext(2500, false)
}

async function onNoteClick(e) {
  const { noteIndex, stringIndex, fretIndex, element } = e.detail
  const tuning = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct    = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  await audio.init()
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, noteIndex)
  audio.playChord([0], noteIndex, 0, 0.8, 0.2, 'Electric Piano', oct)
  checkAnswer({ noteIndex, elements: [element], pos: { s: stringIndex, f: fretIndex } })
}

function onGuitarNote({ midi, noteIndex }) {
  if (!active.value) return
  checkAnswer({
    noteIndex,
    midi,
    elements: fretboardCirclesForMidi(appStore.currentTuning, midi),
    played: midiToName(midi, notes()),
  })
}

// Changing a mode drops the current question.
watch(settings, () => {
  writeStorage(STORAGE_KEY, { ...settings })
  clearTimeout(nextTimer)
  if (hasQuestion.value) endQuestion()
}, { deep: true })

onMounted(() => { window.addEventListener('fretboard:noteClick', onNoteClick); clearBoard() })
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  clearTimeout(nextTimer)
})
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

.nf-ref {
  margin-top: 6px;
  font-family: var(--jd-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--jd-amber);
}

.nf-solution {
  margin-top: 12px;
  border-color: var(--jd-line-strong);
  color: var(--jd-text-soft);
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
