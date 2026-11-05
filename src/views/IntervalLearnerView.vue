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

      <div class="jd-question-box">
        <div class="jd-question-text" style="font-size: 24px;">
          {{ questionText }}
        </div>
        <div v-if="refText" class="il-ref">{{ refText }}</div>
        <div class="jd-question-hint">
          {{ statusText }}
        </div>
        <button v-if="active && settings.retry && misses > 0" type="button" class="jd-toolbtn il-solution" @click="giveUp">{{ t('pm.show-solution') }}</button>
        <div class="jd-modes" style="justify-content: center; margin-top: 15px;">
          <label class="jd-mode" :class="{ on: descending }">
            <input type="checkbox" v-model="descending">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('il.descending') }}</span>
          </label>
        </div>
        <GuitarInputPanel :guitar="guitar" />
      </div>

      <PracticeModes
        v-model:reference="settings.reference"
        v-model:retry="settings.retry"
        :reference-label="t('pm.ref-root')"
        :reference-help="t('pm.help-il')"
      />
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('il.instructions') }}
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
import { INTERVAL_COLORS, INTERVAL_DEGREES, TUNINGS, NOTES, NOTES_FLAT, ROOT_NAMES, getAbsoluteNote } from '../utils/theory.js'
import { BASE_OCTAVES }  from '../utils/constants.js'
import { positionName, positionsOfMidi, allPositions, flashWrong, circleAt, pickOne } from '../utils/fretRefs.js'
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
const STORAGE_KEY = 'jazzVizIntervalLearner'

// reference: one root at a given string and fret, the interval from that very note;
// retry: a wrong note does not end the question
const settings = reactive({ reference: false, retry: false, ...(readStorage(STORAGE_KEY, {}) || {}) })

const questionText = ref(t('il.ready'))
const statusText   = ref(t('il.status'))
const refText      = ref('')
const score        = ref(0)
const total        = ref(0)
const descending   = ref(false)
// True once a question has been asked, until the game is reset: Replay needs a root to play.
const hasQuestion  = ref(false)
const active       = ref(false)
const misses       = ref(0)        // wrong attempts on the current question (retry mode)
let root   = 0
let targetInterval = 0
let rootPos = null                 // reference mode: { s, f } of the root
let rootMidi = null
let targetMidi = null              // reference mode: the exact note to find
let nextTimer = null

function reset() {
  clearTimeout(nextTimer)
  score.value = 0; total.value = 0
  endQuestion()
}

function endQuestion() {
  active.value = false; hasQuestion.value = false; misses.value = 0
  rootPos = null; rootMidi = null; targetMidi = null
  questionText.value = t('il.ready')
  statusText.value   = t('il.status')
  refText.value = ''
  clearBoard()
}

// Interval names as degrees above the root (b7 = minor seventh, 7 = major seventh)
const tuning = () => appStore.currentTuning

// Reference mode: a root position whose interval (up or down) is on the neck, frets 0-12.
function pickRootPosition(iv) {
  const options = allPositions((s, f) => {
    if (f > 12 || (tuning()[s] + f) % 12 !== root) return false
    const m = getAbsoluteNote(tuning(), s, f)
    return positionsOfMidi(tuning(), descending.value ? m - iv : m + iv, (_, ff) => ff <= 15).length > 0
  })
  return options.length ? pickOne(options) : null
}

async function start() {
  clearTimeout(nextTimer)
  active.value = true; hasQuestion.value = true; misses.value = 0
  root           = Math.floor(Math.random() * 12)
  targetInterval = practice.pickWeighted('interval-learner', [...Array(11).keys()].map(i => i + 1), iv => intervalKey(iv))
  rootPos = settings.reference ? pickRootPosition(targetInterval) : null
  rootMidi = rootPos ? getAbsoluteNote(tuning(), rootPos.s, rootPos.f) : null
  targetMidi = rootPos ? rootMidi + (descending.value ? -targetInterval : targetInterval) : null
  const rootName = ROOT_NAMES[root]
  questionText.value = `${t('il.find-prefix')}: ${INTERVAL_DEGREES[targetInterval]} ${t('il.find-of')} ${rootName}${descending.value ? ' ↓' : ''}`
  refText.value = rootPos ? fmt('pm.q-root', positionName(rootPos, appStore.lang)) : ''
  statusText.value   = guitar.enabled ? t('il.play-status') : t('il.click-status')
  await audio.init()
  playRoot()
  drawBoard()
}

async function replay() {
  if (!hasQuestion.value) return
  await audio.init()
  playRoot()
}

function playRoot() {
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, root)
  if (rootMidi !== null) audio.playChord([0], rootMidi, 0, 1, 0.2, 'Electric Piano')
  else audio.playChord([0], root, 0, 1, 0.2, 'Electric Piano', 3)
}

// Every root on the neck, or only the one given in reference mode.
function drawBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    const nIdx = parseInt(c.dataset.noteIndex)
    c.className = 'note-circle'
    c.innerText  = ''
    c.style.cssText = ''
    const isRoot = rootPos
      ? +c.dataset.stringIndex === rootPos.s && +c.dataset.fretIndex === rootPos.f
      : nIdx === root
    if (isRoot) {
      c.style.backgroundColor = INTERVAL_COLORS[0].color
      c.innerText = 'R'; c.style.opacity = '1'; c.style.color = 'rgba(0,0,0,0.8)'
      if (rootPos) { c.style.border = '2px solid white'; c.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.45)' }
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

function intervalKey(iv) {
  return `${iv}${descending.value ? 'd' : ''}`
}

// Next question: always in retry mode once the answer is right, otherwise without leaving
// the guitar when auto-advance is on.
function scheduleNext(delay, right) {
  clearTimeout(nextTimer)
  const auto = (right && settings.retry) || (guitar.enabled && guitar.autoNext)
  if (!auto) return
  nextTimer = setTimeout(() => { if (!active.value) start() }, delay)
}

function targetPc() {
  return descending.value ? (root - targetInterval + 12) % 12 : (root + targetInterval) % 12
}

// `elements`: the circles to mark (the clicked one, or every position of the played pitch).
// `midi`: exact note clicked or played. `oct`: octave of the answer, to play the right note back.
// `played`: name of the note played on the guitar, if the answer came from it.
// `pos`: string and fret of a clicked answer.
function checkAnswer({ noteIndex, midi, elements, oct, played = '', pos = {} }) {
  if (!active.value) return
  const clicked = descending.value
    ? (root - noteIndex + 12) % 12
    : (noteIndex - root + 12) % 12
  const rightDegree = clicked === targetInterval
  const correct = rightDegree && (targetMidi === null || midi === targetMidi)
  practice.record('interval-learner', intervalKey(targetInterval), correct, { ...pos, guitar: !!played })
  const label = INTERVAL_COLORS[clicked]?.short || '?'
  const playedSuffix = played ? ` · 🎸 ${played}` : ''

  if (!correct && settings.retry) {
    misses.value++
    elements.forEach(el => flashWrong(el, label))
    statusText.value = (rightDegree ? fmt('pm.wrong-place', t('pm.ref-octave')) : fmt('pm.retry-wrong', label)) + playedSuffix
    return
  }

  active.value = false
  total.value++
  elements.forEach(el => {
    el.style.transition = 'all 0.2s ease'
    el.style.backgroundColor = correct ? '#2ecc71' : '#e74c3c'
    el.style.opacity = '1'
    el.style.color   = 'rgba(0,0,0,0.8)'
    el.innerText     = label
    if (played) { el.style.border = '2px solid white'; el.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)' }
  })
  if (correct) {
    if (misses.value === 0) score.value++
    statusText.value = (misses.value ? fmt('pm.right-after', misses.value + 1) : t('il.correct')) + playedSuffix
  } else {
    statusText.value = (rightDegree ? fmt('pm.wrong-place', t('pm.ref-octave')) : t('il.wrong')) + playedSuffix
    revealCorrect()
    setTimeout(() => playTargetNote(oct), 800)
  }
  scheduleNext(correct ? 1500 : 2800, correct)
}

function playTargetNote(oct) {
  const pc = targetPc()
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, pc)
  if (targetMidi !== null) audio.playChord([0], targetMidi, 0, 1.2, 0.2, 'Electric Piano')
  else audio.playChord([0], pc, 0, 1.2, 0.2, 'Electric Piano', oct)
}

// The right answer: every position of the interval, or the exact note in reference mode.
function revealCorrect() {
  const cells = targetMidi !== null
    ? positionsOfMidi(tuning(), targetMidi).map(circleAt)
    : [...document.querySelectorAll('.fretboard-layer .note-circle')].filter(c => parseInt(c.dataset.noteIndex) === targetPc())
  cells.forEach(c => {
    if (!c) return
    c.style.transition = 'all 0.2s ease'
    c.classList.add('note-highlighted')
    c.style.backgroundColor = INTERVAL_COLORS[targetInterval].color
    c.innerText = INTERVAL_COLORS[targetInterval].short
    c.style.color   = 'rgba(0,0,0,0.8)'
    c.style.opacity = '1'
  })
}

// Retry mode: stop trying and see the answer.
function giveUp() {
  if (!active.value) return
  active.value = false; total.value++
  statusText.value = t('pm.solution-shown')
  revealCorrect()
  playTargetNote(rootMidi === null ? 3 : undefined)
  scheduleNext(2800, false)
}

async function onNoteClick(e) {
  const { noteIndex, midiNote, stringIndex, fretIndex, element } = e.detail
  // Play the note
  const tun = TUNINGS[appStore.tuningName] || TUNINGS['E Standard']
  const oct = BASE_OCTAVES[stringIndex] + Math.floor((tun[stringIndex] + fretIndex) / 12)
  await audio.init()
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, noteIndex)
  audio.playChord([0], noteIndex, 0, 0.8, 0.2, 'Electric Piano', oct)
  checkAnswer({ noteIndex, midi: midiNote, elements: [element], oct, pos: { s: stringIndex, f: fretIndex } })
}

function onGuitarNote({ midi, noteIndex }) {
  if (!active.value) return
  const notes = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  checkAnswer({
    noteIndex,
    midi,
    elements: fretboardCirclesForMidi(appStore.currentTuning, midi),
    oct: Math.floor(midi / 12),
    played: midiToName(midi, notes),
  })
}

// Changing a mode drops the current question.
watch(settings, () => {
  writeStorage(STORAGE_KEY, { ...settings })
  clearTimeout(nextTimer)
  if (hasQuestion.value) endQuestion()
}, { deep: true })
watch(descending, () => { if (hasQuestion.value) endQuestion() })

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  clearBoard()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  clearTimeout(nextTimer)
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

.il-ref {
  margin-top: 6px;
  font-family: var(--jd-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--jd-text);
}

.il-solution {
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
