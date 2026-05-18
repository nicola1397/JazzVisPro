<template>
  <div id="view-grade-learner" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('gl.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container--narrow">
      <section class="jd-console" style="margin-bottom: 32px;">
        <div class="jd-grain" aria-hidden="true"></div>
        
        <div class="jd-improv-banner" style="margin-bottom: 24px;">
          <div class="jd-improv-bullet"></div>
          <div>
            <strong>{{ active ? t('gl.grade-label-short') || 'FIND GRADE' : t('gl.ready') }}</strong>
            <div class="jd-improv-helper" style="font-size: 24px; color: var(--jd-text); margin-top:4px;">
               <span v-if="active">{{ questionText }}</span>
               <span v-else>{{ t('gl.ready') }}</span>
            </div>
          </div>
        </div>

        <div class="jd-master" style="margin-bottom: 24px;">
          <div class="jd-bpm-frame" style="padding: 0 16px;">
            <div class="jd-bpm-input" style="font-size:28px;">{{ score }}</div>
            <div class="jd-bpm-unit">/ {{ total }}</div>
          </div>
          <div class="jd-transport" style="justify-content: flex-start; gap:12px;">
            <button class="btn-add-step" style="height:44px; padding:0 24px; min-width:140px;" @click="startNext" :disabled="active && feedbackMsg === ''">{{ t('btn.start-next') }}</button>
            <button class="btn-replay" @click="playRootNote" :disabled="!active" style="height:44px;">{{ t('btn.replay') }}</button>
            <button class="jd-toolbtn jd-toolbtn--reset" @click="resetGame" style="height:44px; border-radius: 8px;">{{ t('btn.reset-game') }}</button>
          </div>
        </div>

        <div v-if="!freeMode" class="jd-master" style="grid-template-columns: 120px 1fr; gap: 16px; margin-bottom: 24px;">
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

        <div style="display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:16px; position:relative; z-index:1;">
          <div class="jd-mode" :class="{ on: freeMode }" @click="freeMode = !freeMode">
            <div class="jd-mode-dot"></div>
            <span>{{ t('gl.free-mode') }}</span>
          </div>
          <div class="jd-mode" :class="{ on: hardMode }" @click="hardMode = !hardMode" style="--jd-amber: #ff9f0a;">
            <div class="jd-mode-dot"></div>
            <span>{{ t('gl.hard-mode') }}</span>
          </div>
        </div>

        <div style="text-align:center; min-height:24px; position:relative; z-index:1;">
          <span v-if="feedbackMsg" :style="{ color: feedbackOk ? 'var(--jd-green)' : 'var(--jd-red)', fontWeight: '700', fontFamily: 'var(--jd-mono)', fontSize: '12px', letterSpacing: '0.5px' }">{{
            feedbackMsg }}</span>
          <span v-else style="color:var(--jd-muted); font-family:var(--jd-mono); font-size:10px; text-transform:uppercase; letter-spacing:2px;">{{ t('gl.status') }}</span>
        </div>
      </section>

      <!-- Legend -->
      <div id="gl-legend" v-if="hardMode"
        style="display:flex; justify-content:center; gap:20px; margin-bottom: 20px; font-family:var(--jd-mono); font-size:10px; text-transform:uppercase; letter-spacing:1px; color:var(--jd-muted);">
        <div class="d-flex align-items-center gap-2">
          <div style="width:8px;height:8px;border-radius:50%;background:var(--jd-surface);border:1px solid var(--jd-muted);"></div>
          <span>{{ t('gl.sharp-outer') }}</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div style="width:8px;height:8px;border-radius:50%;background:rgba(46,204,113,0.1);border:1px solid var(--jd-green);"></div>
          <span>{{ t('gl.flat-inner') }}</span>
        </div>
      </div>

      <!-- Chromatic Circle -->
      <div class="circle-container" style="position: relative; width: 340px; height: 340px; margin: 40px auto; background: radial-gradient(circle, rgba(255,214,10,0.02) 0%, transparent 70%);">
        <svg width="340" height="340" style="position:absolute;top:0;left:0;pointer-events:none;">
          <circle cx="170" cy="170" r="160" fill="none" stroke="var(--jd-line)" stroke-width="1" />
          <circle cx="170" cy="170" r="92" fill="none" stroke="var(--jd-line-strong)"
            stroke-width="1" stroke-dasharray="4,4" :style="hardMode ? 'display:block;' : 'display:none;'" />
        </svg>
        <div id="note-circle-ui" class="note-circle-board" style="position: relative; width: 100%; height: 100%;">

          <!-- Outer ring -->
          <button v-for="n in noteButtons" :key="'outer-' + n.idx" class="circle-note"
            :class="[noteStates[n.idx], { root: n.isRoot }]" :style="{
              left: (n.x + 10) + 'px',
              top: (n.y + 10) + 'px',
              zIndex: 2,
            }" @click="onNoteClick(n.idx, false)">{{ n.label }}</button>

          <!-- Inner ring (hard mode only) -->
          <template v-if="hardMode">
            <button v-for="n in flatButtons" :key="'inner-' + n.idx" class="circle-note flat"
              :class="[flatStates[n.idx], { root: n.isRoot }]" :style="{
                left: (n.x + 10) + 'px',
                top: (n.y + 10) + 'px',
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
  const R = 150, CX = 160, CY = 160
  const curNotes = glExpectFlat(gameRoot.value) ? NOTES_FLAT : NOTES
  const isFlatRoot = glUsesFlat(gameRoot.value)

  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180

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
