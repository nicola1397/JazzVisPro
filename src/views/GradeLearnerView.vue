<template>
  <div id="view-grade-learner" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('gl.title') }}</h1>
      </div>
    </header>

    <div class="importer-area gl-area">
      <!-- The question and the circle where you answer: side by side when there is room,
           one under the other on narrow screens. -->
      <div class="gl-stage">
        <section class="jd-console gl-hud">
          <div class="jd-grain" aria-hidden="true"></div>

          <div class="jd-improv-banner gl-question">
            <div class="jd-improv-bullet"></div>
            <div>
              <strong>{{ active ? t('gl.grade-label-short') || 'FIND GRADE' : t('gl.ready') }}</strong>
              <div class="jd-improv-helper gl-question-text">
                 <span v-if="active">{{ questionText }}</span>
                 <span v-else>{{ t('gl.ready') }}</span>
              </div>
            </div>
          </div>

          <div class="gl-feedback" aria-live="polite">
            <span v-if="feedbackMsg" :style="{ color: feedbackOk ? 'var(--jd-green)' : 'var(--jd-red)', fontWeight: '700', fontFamily: 'var(--jd-mono)', fontSize: '12px', letterSpacing: '0.5px' }">{{
              feedbackMsg }}</span>
            <span v-else style="color:var(--jd-muted); font-family:var(--jd-mono); font-size:10px; text-transform:uppercase; letter-spacing:2px;">{{ t('gl.status') }}</span>
          </div>

          <div class="jd-master gl-controls">
            <div class="jd-bpm-frame" style="padding: 0 16px;">
              <div class="jd-bpm-input" style="font-size:28px;">{{ score }}</div>
              <div class="jd-bpm-unit">/ {{ total }}</div>
            </div>
            <div class="jd-transport gl-buttons">
              <button class="btn-add-step" style="height:44px; padding:0 24px; min-width:140px;" @click="startNext" :disabled="active && feedbackMsg === ''">{{ t('btn.start-next') }}</button>
              <button class="btn-replay" @click="playRootNote" :disabled="!active" style="height:44px;">{{ t('btn.replay') }}</button>
              <button class="jd-toolbtn jd-toolbtn--reset" @click="resetGame" style="height:44px; border-radius: 8px;">{{ t('btn.reset-game') }}</button>
            </div>
          </div>
        </section>

        <div class="gl-circle-wrap">
          <!-- Legend -->
          <div id="gl-legend" v-if="hardMode"
            style="display:flex; justify-content:center; gap:20px; font-family:var(--jd-mono); font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--jd-muted);">
            <div class="d-flex align-items-center gap-2">
              <div style="width:8px;height:8px;border-radius:50%;background:var(--jd-surface);border:1px solid var(--jd-muted);"></div>
              <span>{{ t('gl.sharp-outer') }}</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <div style="width:8px;height:8px;border-radius:50%;background:rgba(46,204,113,0.1);border:1px solid var(--jd-green);"></div>
              <span>{{ t('gl.flat-inner') }}</span>
            </div>
          </div>

          <!-- Chromatic circle: sized to the screen, notes placed in percent -->
          <div class="circle-container gl-circle">
            <svg viewBox="0 0 340 340" class="gl-circle-svg" aria-hidden="true">
              <circle cx="170" cy="170" r="160" fill="none" stroke="var(--jd-line)" stroke-width="1" />
              <circle cx="170" cy="170" r="92" fill="none" stroke="var(--jd-line-strong)"
                stroke-width="1" stroke-dasharray="4,4" :style="hardMode ? 'display:block;' : 'display:none;'" />
            </svg>
            <div id="note-circle-ui" class="note-circle-board">

              <!-- Outer ring -->
              <button v-for="n in noteButtons" :key="'outer-' + n.idx" class="circle-note"
                :class="[noteStates[n.idx], { root: n.isRoot }]" :style="{
                  left: pct(n.x),
                  top: pct(n.y),
                  zIndex: 2,
                }" @click="onNoteClick(n.idx, false)">{{ n.label }}</button>

              <!-- Inner ring (hard mode only) -->
              <template v-if="hardMode">
                <button v-for="n in flatButtons" :key="'inner-' + n.idx" class="circle-note flat"
                  :class="[flatStates[n.idx], { root: n.isRoot }]" :style="{
                    left: pct(n.x),
                    top: pct(n.y),
                    zIndex: 1,
                  }" @click="onNoteClick(n.idx, true)">{{ n.label }}</button>
              </template>
            </div>
          </div>
        </div>
      </div>

      <section class="jd-console gl-settings">
        <div class="jd-grain" aria-hidden="true"></div>

        <div v-if="!freeMode" class="jd-master" style="grid-template-columns: 120px 1fr; gap: 16px; margin-bottom: 18px;">
          <div class="jd-feel">
            <label class="jd-feel-label">{{ t('label.root') || 'ROOT' }}</label>
            <select v-model="fixedRoot" class="jd-feel-select" style="width: 100%;">
              <option v-for="n in GL_ROOTS" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="jd-feel">
            <label class="jd-feel-label">{{ t('label.scale') || 'SCALE' }}</label>
            <select v-model="fixedScale" class="jd-feel-select" style="width: 100%;">
              <option v-for="s in scaleNames" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:center; gap:12px; position:relative; z-index:1; flex-wrap: wrap;">
          <div class="jd-mode" :class="{ on: freeMode }" @click="freeMode = !freeMode">
            <div class="jd-mode-dot"></div>
            <span>{{ t('gl.free-mode') }}</span>
          </div>
          <div class="jd-mode" :class="{ on: hardMode }" @click="hardMode = !hardMode" style="--jd-amber: #ff9f0a;">
            <div class="jd-mode-dot"></div>
            <span>{{ t('gl.hard-mode') }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { usePracticeStore } from '../stores/practice.js'
import { NOTES, NOTES_FLAT, SCALES, spellScale } from '../utils/theory.js'

const audio = useAudioStore()
const appStore = useAppStore()
const { t } = useI18n()
const practice = usePracticeStore()

// ── Constants ─────────────────────────────────────────────────────────────────
const GL_ROOTS = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B']
const ORDINALS_IT = ['', '1°', '2°', '3°', '4°', '5°', '6°', '7°']
const ORDINALS_EN = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th']

// ── State ─────────────────────────────────────────────────────────────────────
const score = ref(0)
const total = ref(0)
const active = ref(false)
const gameRootIdx = ref(0)
const gameRoot = ref('C')
const targetGrade = ref(0)
const targetDegree = ref(1)
const currentScale = ref('Ionio (Maj7)')
const feedbackMsg = ref('')
const feedbackOk = ref(true)

const noteStates = ref(Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, ''])))
const flatStates = ref(Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, ''])))

const freeMode = ref(true)
const hardMode = ref(false)
const fixedRoot = ref('C')
const fixedScale = ref('Ionio (Maj7)')

// ── Helpers ───────────────────────────────────────────────────────────────────
function glUsesFlat(name) { return !NOTES.includes(name) && NOTES_FLAT.includes(name); }

// Names that have a button on the wheel (no E#, B#, Cb, Fb or double accidentals)
const ON_WHEEL = new Set([...NOTES, ...NOTES_FLAT])
const spelled = computed(() => spellScale(gameRoot.value, currentScale.value))
const expectedName = computed(() => spelled.value[targetDegree.value - 1] || null)
// Flats for the wheel when the scale is written with flats (C minor: Eb, Ab, Bb)
const prefersFlat = computed(() => {
  const names = spelled.value.filter(Boolean)
  const flats = names.filter(n => n.length > 1 && n.endsWith('b')).length
  const sharps = names.filter(n => n.includes('#')).length
  return flats > sharps || (flats === sharps && glUsesFlat(gameRoot.value))
})
function wheelName(idx) {
  const inScale = spelled.value.find(n => n && ON_WHEEL.has(n) && rootNameToIdx(n) === idx)
  return inScale || (prefersFlat.value ? NOTES_FLAT : NOTES)[idx]
}

function rootNameToIdx(name) {
  let i = NOTES.indexOf(name)
  return i !== -1 ? i : NOTES_FLAT.indexOf(name)
}

function clearStates() {
  noteStates.value = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, '']))
  flatStates.value = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, '']))
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ── Computed ──────────────────────────────────────────────────────────────────
const scaleNames = computed(() => Object.keys(SCALES))

const questionText = computed(() => {
  const ordinals = appStore.lang === 'it' ? ORDINALS_IT : ORDINALS_EN
  const deg = ordinals[targetDegree.value] || targetDegree.value + '°'
  return t('gl.grade-label')
    .replace('{0}', deg)
    .replace('{1}', gameRoot.value)
    .replace('{2}', currentScale.value)
})

// Circle positions are computed on a 340-unit square: place them in percent so the circle can scale.
const pct = v => `${((v + 10) / 340) * 100}%`

const noteButtons = computed(() => {
  const R = 150, CX = 160, CY = 160
  const isFlatRoot = glUsesFlat(gameRoot.value)

  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180

    let isRoot = (i === gameRootIdx.value)
    if (hardMode.value && isFlatRoot) isRoot = false

    return {
      idx: i,
      label: hardMode.value ? NOTES[i] : wheelName(i),
      x: CX + R * Math.cos(angle),
      y: CY + R * Math.sin(angle),
      isRoot
    }
  })
})

const flatButtons = computed(() => {
  const RI = 82, CX = 160, CY = 160
  const isFlatRoot = glUsesFlat(gameRoot.value)

  return Array.from({ length: 12 }, (_, i) => {
    if (NOTES[i] === NOTES_FLAT[i]) return null
    const angle = (i * 30 - 90) * Math.PI / 180

    let isRoot = (i === gameRootIdx.value && isFlatRoot)

    return {
      idx: i,
      label: NOTES_FLAT[i],
      x: CX + RI * Math.cos(angle),
      y: CY + RI * Math.sin(angle),
      isRoot
    }
  }).filter(Boolean)
})

// ── Game Logic ────────────────────────────────────────────────────────────────
async function startNext() {
  await audio.init()
  clearStates()
  feedbackMsg.value = ''
  active.value = true

  let root, scaleName
  if (freeMode.value) {
    // Only roots whose scale can be written with the names on the wheel (no D# major with E# and B#)
    for (let tries = 0; tries < 60; tries++) {
      root = randomItem(GL_ROOTS)
      scaleName = randomItem(Object.keys(SCALES))
      if (spellScale(root, scaleName).every(n => n && ON_WHEEL.has(n))) break
    }
  } else {
    root = fixedRoot.value
    scaleName = fixedScale.value
  }

  const scaleIntervals = SCALES[scaleName] || SCALES['Ionio (Maj7)']
  const degreeIdx = Math.floor(Math.random() * scaleIntervals.length)

  gameRoot.value = root
  gameRootIdx.value = rootNameToIdx(root)
  currentScale.value = scaleName
  targetGrade.value = scaleIntervals[degreeIdx]
  targetDegree.value = degreeIdx + 1

  appStore.setRoot(root)
  appStore.setScaleName(scaleName)

  playRootNote()
}

async function playRootNote() {
  if (!active.value) return
  await audio.init()
  audio.playNoteImmediate(gameRootIdx.value, 0.8, 0.25, 'Electric Piano', 4)
}

async function onNoteClick(idx, clickedIsFlat) {
  if (!active.value) return
  total.value++
  await audio.init()

  const correctIdx = (gameRootIdx.value + targetGrade.value) % 12

  let isCorrect = (idx === correctIdx)
  // Hard mode: the spelling counts too (Eb, not D#, in C minor)
  if (hardMode.value && expectedName.value && ON_WHEEL.has(expectedName.value)) {
    const clickedName = clickedIsFlat ? NOTES_FLAT[idx] : NOTES[idx]
    isCorrect = clickedName === expectedName.value
  }

  practice.record('grade-learner', targetGrade.value, isCorrect)

  if (isCorrect) {
    if (clickedIsFlat) flatStates.value = { ...flatStates.value, [idx]: 'correct' }
    else noteStates.value = { ...noteStates.value, [idx]: 'correct' }

    score.value++
    feedbackMsg.value = t('gl.correct')
    feedbackOk.value = true
    audio.playNoteImmediate(idx, 0.6, 0.25, 'Electric Piano', 4)
    active.value = false
  } else {
    if (clickedIsFlat) flatStates.value = { ...flatStates.value, [idx]: 'wrong' }
    else noteStates.value = { ...noteStates.value, [idx]: 'wrong' }

    const correctName = expectedName.value || NOTES[correctIdx]
    const correctIsFlat = glUsesFlat(correctName)
    feedbackMsg.value = t('gl.wrong-answer').replace('{0}', correctName)
    feedbackOk.value = false

    setTimeout(() => {
      if (correctIsFlat && NOTES[correctIdx] !== NOTES_FLAT[correctIdx]) {
        flatStates.value = { ...flatStates.value, [correctIdx]: 'correct' }
      } else {
        noteStates.value = { ...noteStates.value, [correctIdx]: 'correct' }
      }
      audio.playNoteImmediate(correctIdx, 0.6, 0.25, 'Electric Piano', 4)
      active.value = false
    }, 500)
  }
}

function resetGame() {
  score.value = 0
  total.value = 0
  active.value = false
  clearStates()
  feedbackMsg.value = ''
  fixedRoot.value = 'C'
  gameRoot.value = 'C'
  gameRootIdx.value = 0
}

onMounted(() => { clearStates() })
</script>

<style scoped>
.gl-area { width: 100%; max-width: 1100px; margin: 0 auto; }
.gl-stage {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) auto;
  align-items: center;
  gap: 20px 28px;
  margin-bottom: 24px;
}
.gl-hud { margin: 0; }
.gl-question { margin-bottom: 14px; }
.gl-question-text { font-size: clamp(18px, 2.4vw, 24px); color: var(--jd-text); margin-top: 4px; }
.gl-feedback { position: relative; z-index: 1; text-align: center; min-height: 22px; margin-bottom: 14px; }
.gl-controls { margin: 0; }
.gl-buttons { justify-content: flex-start; gap: 10px; flex-wrap: wrap; }
.gl-circle-wrap { display: flex; flex-direction: column; align-items: center; gap: 10px; }
.gl-circle {
  /* As big as the screen allows: never taller than the space under the navbar. */
  --gl-size: clamp(230px, calc(100dvh - var(--nav-h) - 70px), 340px);
  position: relative;
  width: var(--gl-size);
  height: var(--gl-size);
  margin: 0 auto;
  background: radial-gradient(circle, rgba(255, 214, 10, 0.02) 0%, transparent 70%);
}
.gl-circle-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.gl-circle .note-circle-board { position: relative; width: 100%; height: 100%; }
.gl-circle .circle-note { width: calc(var(--gl-size) * 0.165); height: calc(var(--gl-size) * 0.165); font-size: calc(var(--gl-size) * 0.046); }
.gl-circle .circle-note.flat { width: calc(var(--gl-size) * 0.118); height: calc(var(--gl-size) * 0.118); font-size: calc(var(--gl-size) * 0.036); }
.gl-settings { margin-bottom: 24px; }

@media (max-width: 760px) and (orientation: portrait) {
  .gl-stage { grid-template-columns: 1fr; gap: 16px; }
  .gl-circle { --gl-size: min(340px, calc(100vw - 36px)); }
  .gl-buttons { justify-content: center; }
}
@media (max-height: 520px) {
  .gl-stage { gap: 12px 18px; }
  .gl-question { margin-bottom: 6px; }
  .gl-feedback { margin-bottom: 6px; }
  .gl-buttons .btn-add-step { min-width: 0 !important; padding: 0 14px !important; }
}
</style>
