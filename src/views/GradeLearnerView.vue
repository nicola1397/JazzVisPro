<template>
  <div id="view-grade-learner" class="view-panel active">
    <div class="importer-area text-center" style="max-width:720px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="gl.title">{{ t('gl.title') }}</h2>

      <!-- Unified Game Bar -->
      <div id="grade-game-bar"
        style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 20px; background: rgba(255, 214, 10, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(255, 214, 10, 0.2);">

        <!-- Question Text -->
        <div id="grade-question-text" class="h3 mb-0"
          style="color: var(--accent); font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
          <span v-if="active">{{ questionText }}</span>
          <span v-else>{{ t('gl.ready') }}</span>
        </div>

        <!-- Action Buttons & Score -->
        <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
          <button class="btn-add-step w-auto" style="min-width: 150px;" @click="startNext"
            :disabled="active && feedbackMsg === ''">{{ t('btn.start-next') }}</button>
          <button class="btn-replay" @click="playRootNote" :disabled="!active">{{ t('btn.replay') }}</button>
          <button class="btn-reset w-auto" style="height: 38px;" @click="resetGame">Reset</button>
          <div id="grade-score-display" class="h5 mb-0"
            style="background: rgba(255,255,255,0.1); padding: 5px 15px; border-radius: 20px; min-width: 100px; text-align: center;">
            {{ score }} / {{ total }}
          </div>
        </div>

        <!-- Root & Scale Selectors -->
        <div v-if="!freeMode" id="gl-selectors"
          class="d-flex align-items-center gap-2 flex-wrap justify-content-center mt-2">
          <select v-model="fixedRoot" class="form-select form-select-sm"
            style="width:auto;min-width:75px;background:#2c2c2e;color:#fff;border-color:#555;padding:4px 8px;border-radius:6px;">
            <option v-for="n in GL_ROOTS" :key="n" :value="n">{{ n }}</option>
          </select>
          <select v-model="fixedScale" class="form-select form-select-sm"
            style="width:auto;min-width:200px;background:#2c2c2e;color:#fff;border-color:#555;padding:4px 8px;border-radius:6px;">
            <option v-for="s in scaleNames" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>

        <!-- Mode Toggles -->
        <div class="d-flex align-items-center gap-3 flex-wrap justify-content-center mt-1">
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" id="gl-free-mode" v-model="freeMode" style="accent-color: var(--accent);">
            <label for="gl-free-mode" style="color:var(--text);font-size:0.85em;cursor:pointer;">{{ t('gl.free-mode')
              }}</label>
          </div>
          <div class="d-flex align-items-center gap-2">
            <input type="checkbox" id="gl-hard-mode" v-model="hardMode" style="accent-color: #ff9f0a;">
            <label for="gl-hard-mode" style="color:#ff9f0a;font-size:0.85em;cursor:pointer;">{{ t('gl.hard-mode')
              }}</label>
          </div>
        </div>

        <!-- Feedback & Status -->
        <div id="grade-game-status" class="small" style="color: #aaa; min-height: 20px;">
          <span v-if="feedbackMsg" :style="{ color: feedbackOk ? '#22c55e' : '#ef4444', fontWeight: '700' }">{{
            feedbackMsg }}</span>
          <span v-else>{{ t('gl.status') }}</span>
        </div>
      </div>

      <!-- Legend -->
      <div id="gl-legend" v-if="hardMode"
        style="display:flex; justify-content:center; gap:16px; margin-top:4px; margin-bottom: 20px;">
        <div class="d-flex align-items-center gap-2">
          <div style="width:10px;height:10px;border-radius:50%;background:#2c2c2e;border:1.5px solid #555;"></div>
          <span class="small text-secondary">{{ t('gl.sharp-outer') }}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div
            style="width:10px;height:10px;border-radius:50%;background:rgba(48,209,88,.12);border:1.5px solid rgba(48,209,88,.4);">
          </div>
          <span class="small text-secondary">{{ t('gl.flat-inner') }}</span>
        </div>
      </div>

      <!-- Chromatic Circle -->
      <div class="circle-container" style="position: relative; width: 320px; height: 320px; margin: 20px auto;">
        <svg id="gl-rings-svg" width="320" height="320" style="position:absolute;top:0;left:0;pointer-events:none;">
          <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="1.5" />
          <circle id="gl-inner-ring-svg" cx="160" cy="160" r="82" fill="none" stroke="rgba(255,214,10,.12)"
            stroke-width="1" stroke-dasharray="4,4" :style="hardMode ? 'display:block;' : 'display:none;'" />
        </svg>
        <div id="note-circle-ui" class="note-circle-board" style="position: relative; width: 100%; height: 100%;">

          <!-- Outer ring -->
          <button v-for="n in noteButtons" :key="'outer-' + n.idx" class="circle-note"
            :class="[noteStates[n.idx], { root: n.isRoot }]" :style="{
              left: n.x + 'px',
              top: n.y + 'px',
              zIndex: 2,
            }" @click="onNoteClick(n.idx, false)">{{ n.label }}</button>

          <!-- Inner ring (hard mode only) -->
          <template v-if="hardMode">
            <button v-for="n in flatButtons" :key="'inner-' + n.idx" class="circle-note flat"
              :class="[flatStates[n.idx], { root: n.isRoot }]" :style="{
                left: n.x + 'px',
                top: n.y + 'px',
                zIndex: 1,
              }" @click="onNoteClick(n.idx, true)">{{ n.label }}</button>
          </template>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES, NOTES_FLAT, SCALES } from '../utils/theory.js'

const audio = useAudioStore()
const appStore = useAppStore()
const { t } = useI18n()

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

function glExpectFlat(name) {
  let i = NOTES.indexOf(name);
  if (i === -1) i = NOTES_FLAT.indexOf(name);
  const idx = i < 0 ? 0 : i;
  if (NOTES[idx] !== NOTES_FLAT[idx]) return glUsesFlat(name);
  return idx === 5; // F uses Bb
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

const noteButtons = computed(() => {
  const R = 135, CX = 160, CY = 160
  const curNotes = glExpectFlat(gameRoot.value) ? NOTES_FLAT : NOTES
  const isFlatRoot = glUsesFlat(gameRoot.value)

  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180

    // Root highlight logic:
    // In easy mode, highlight if index matches.
    // In hard mode, only highlight if it's NOT a flat root (those go to inner ring).
    let isRoot = (i === gameRootIdx.value)
    if (hardMode.value && isFlatRoot) isRoot = false

    return {
      idx: i,
      label: hardMode.value ? NOTES[i] : curNotes[i],
      x: CX + R * Math.cos(angle),
      y: CY + R * Math.sin(angle),
      isRoot
    }
  })
})

const flatButtons = computed(() => {
  const RI = 80, CX = 160, CY = 160
  const isFlatRoot = glUsesFlat(gameRoot.value)

  return Array.from({ length: 12 }, (_, i) => {
    if (NOTES[i] === NOTES_FLAT[i]) return null
    const angle = (i * 30 - 90) * Math.PI / 180

    // Root highlight logic:
    // Only highlight if root uses flats.
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
    root = randomItem(GL_ROOTS)
    scaleName = randomItem(Object.keys(SCALES))
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
  if (hardMode.value) {
    const isEnharm = NOTES[idx] !== NOTES_FLAT[idx]
    const correctIsFlat = glExpectFlat(gameRoot.value)
    if (isEnharm && (clickedIsFlat !== correctIsFlat)) isCorrect = false
  }

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

    const correctIsFlat = glExpectFlat(gameRoot.value)
    const correctName = correctIsFlat ? NOTES_FLAT[correctIdx] : NOTES[correctIdx]
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
