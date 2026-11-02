<template>
  <div id="view-transcribe" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('tr.title') }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <!-- File -->
      <div v-if="!fileName" class="tr-drop" :class="{ over: dragOver }"
        @dragover.prevent="dragOver = true" @dragleave="dragOver = false" @drop.prevent="onDrop">
        <p>{{ t('tr.drop') }}</p>
        <button class="btn-add-step" @click="fileInput.click()">{{ t('tr.choose') }}</button>
        <p v-if="error" class="tr-error">{{ error }}</p>
      </div>
      <input ref="fileInput" type="file" accept="audio/*" hidden @change="onFile">

      <template v-if="fileName">
        <div class="tr-file">
          <span class="tr-name" :title="fileName">{{ fileName }}</span>
          <span class="tr-time">{{ fmt(current) }} / {{ fmt(duration) }}</span>
          <button class="jd-toolbtn" @click="fileInput.click()">{{ t('tr.change') }}</button>
        </div>

        <!-- Waveform: click to seek, drag to choose the loop -->
        <div class="tr-wave" ref="waveBox"
          @pointerdown="onWaveDown" @pointermove="onWaveMove" @pointerup="onWaveUp">
          <canvas ref="canvas"></canvas>
          <div v-if="loopB > loopA" class="tr-loop" :class="{ on: loopOn }"
            :style="{ left: pctOf(loopA) + '%', width: (pctOf(loopB) - pctOf(loopA)) + '%' }"></div>
          <div v-for="(m, i) in markers" :key="i" class="tr-marker" :style="{ left: pctOf(m.time) + '%' }" :title="m.label"></div>
          <div class="tr-head" :style="{ left: pctOf(current) + '%' }"></div>
        </div>

        <!-- Transport -->
        <div class="tr-transport">
          <button class="jd-tbtn" @click="seekBy(-2)" :aria-label="t('tr.back')">
            <svg viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': playing }" @click="togglePlay" :aria-label="playing ? 'Pause' : 'Play'">
            <svg v-if="!playing" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button class="jd-tbtn" @click="seekBy(2)" :aria-label="t('tr.forward')">
            <svg viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
          </button>
          <div class="tr-speed">
            <span class="jd-feel-label">{{ t('tr.speed') }}</span>
            <select class="jd-feel-select" v-model.number="speed">
              <option v-for="s in SPEEDS" :key="s" :value="s">{{ Math.round(s * 100) }}%</option>
            </select>
          </div>
        </div>

        <!-- Loop and markers -->
        <div class="tr-tools">
          <div class="jd-modes">
            <button class="jd-toolbtn" @click="setA">A · {{ fmt(loopA) }}</button>
            <button class="jd-toolbtn" @click="setB">B · {{ fmt(loopB) }}</button>
            <label class="jd-mode" :class="{ on: loopOn }">
              <input type="checkbox" v-model="loopOn" :disabled="loopB <= loopA">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t('tr.loop') }}</span>
            </label>
            <button class="jd-toolbtn" @click="addMarker">+ {{ t('tr.marker') }}</button>
          </div>
        </div>

        <ul v-if="markers.length" class="tr-markers">
          <li v-for="(m, i) in markers" :key="i">
            <button class="tr-jump" @click="seek(m.time)">{{ fmt(m.time) }}</button>
            <input class="tr-label" v-model="m.label" @change="saveMarkers" :aria-label="t('tr.marker-name')">
            <button class="tr-del" @click="removeMarker(i)" :aria-label="t('tr.remove')">✕</button>
          </li>
        </ul>

        <!-- Note at the cursor -->
        <div class="tr-note">
          <span class="jd-feel-label">{{ t('tr.note-here') }}</span>
          <span class="tr-note-name">{{ detected || '–' }}</span>
          <select class="jd-feel-select" v-model="register" :aria-label="t('tr.register')">
            <option value="melody">{{ t('tr.reg-melody') }}</option>
            <option value="bass">{{ t('tr.reg-bass') }}</option>
          </select>
        </div>
      </template>
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('tr.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { useI18n }       from '../composables/useI18n.js'
import { midiToName, fretboardCirclesForMidi } from '../composables/useGuitarInput.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import PitchWorker from '../workers/pitch.worker.js?worker'

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()

const SPEEDS = [0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1]
const MARKERS_KEY = 'jazzVizTranscribeMarkers'
const REGISTERS = { melody: [120, 1400], bass: [38, 300] }
const ANALYSIS_SAMPLES = 4096

const fileInput = ref(null)
const canvas    = ref(null)
const waveBox   = ref(null)
const fileName  = ref('')
const error     = ref('')
const dragOver  = ref(false)
const duration  = ref(0)
const current   = ref(0)
const playing   = ref(false)
const speed     = ref(0.75)
const loopA     = ref(0)
const loopB     = ref(0)
const loopOn    = ref(false)
const markers   = ref([])
const detected  = ref('')
const register  = ref('melody')

const player = new Audio()
player.preservesPitch = true
player.mozPreservesPitch = true
player.webkitPreservesPitch = true
let objectUrl = ''
let samples = null          // mono mix of the decoded file
let sampleRate = 44100
let peaks = null
let raf = null
let worker = null, busy = false, pending = null, lastAnalysed = -1
let fileKey = ''
let dragStart = null

const pctOf = sec => (duration.value ? (sec / duration.value) * 100 : 0)

function fmt(sec) {
  if (!Number.isFinite(sec)) return '0:00.0'
  const m = Math.floor(sec / 60)
  const s = sec - m * 60
  return `${m}:${s.toFixed(1).padStart(4, '0')}`
}

// ── Loading ───────────────────────────────────────────────────────────────────
function onFile(e) {
  const f = e.target.files?.[0]
  if (f) load(f)
  e.target.value = ''
}

function onDrop(e) {
  dragOver.value = false
  const f = e.dataTransfer.files?.[0]
  if (f) load(f)
}

async function load(file) {
  error.value = ''
  try {
    const data = await file.arrayBuffer()
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const buf = await ctx.decodeAudioData(data)
    ctx.close()
    sampleRate = buf.sampleRate
    samples = new Float32Array(buf.length)
    for (let c = 0; c < buf.numberOfChannels; c++) {
      const ch = buf.getChannelData(c)
      for (let i = 0; i < ch.length; i++) samples[i] += ch[i] / buf.numberOfChannels
    }
    peaks = computePeaks(2000)
    if (objectUrl) URL.revokeObjectURL(objectUrl)
    objectUrl = URL.createObjectURL(file)
    player.src = objectUrl
    player.playbackRate = speed.value
    fileName.value = file.name
    duration.value = buf.duration
    current.value = 0
    loopA.value = 0; loopB.value = 0; loopOn.value = false
    fileKey = `${file.name}|${Math.round(buf.duration * 10)}`
    markers.value = (readStorage(MARKERS_KEY, {}) || {})[fileKey] || []
    await nextTick()
    draw()
    analyseAt(0)
  } catch (e) {
    error.value = t('tr.load-error')
  }
}

// ── Waveform ──────────────────────────────────────────────────────────────────
function computePeaks(n) {
  const out = new Float32Array(n)
  const step = Math.max(1, Math.floor(samples.length / n))
  for (let i = 0; i < n; i++) {
    let max = 0
    for (let j = i * step; j < Math.min(samples.length, (i + 1) * step); j += 4) max = Math.max(max, Math.abs(samples[j]))
    out[i] = max
  }
  const top = Math.max(...out, 1e-6)
  return out.map(v => v / top)
}

function draw() {
  const c = canvas.value, box = waveBox.value
  if (!c || !box || !peaks) return
  const dpr = window.devicePixelRatio || 1
  const w = box.clientWidth, h = box.clientHeight
  c.width = w * dpr; c.height = h * dpr
  c.style.width = w + 'px'; c.style.height = h + 'px'
  const g = c.getContext('2d')
  g.scale(dpr, dpr)
  g.clearRect(0, 0, w, h)
  g.fillStyle = '#b88a00'
  for (let x = 0; x < w; x += 2) {
    const v = peaks[Math.floor((x / w) * peaks.length)] || 0
    const bar = Math.max(1, v * (h / 2 - 4))
    g.fillRect(x, h / 2 - bar, 1, bar * 2)
  }
}

// ── Transport ─────────────────────────────────────────────────────────────────
function togglePlay() {
  if (!fileName.value) return
  if (playing.value) { player.pause(); return }
  if (loopOn.value && (current.value < loopA.value || current.value >= loopB.value)) seek(loopA.value)
  player.play().catch(() => {})
}

function seek(sec) {
  const s = Math.max(0, Math.min(duration.value, sec))
  player.currentTime = s
  current.value = s
  analyseAt(s)
}

function seekBy(d) { seek(current.value + d) }

function tick() {
  current.value = player.currentTime
  if (loopOn.value && loopB.value > loopA.value && current.value >= loopB.value) {
    player.currentTime = loopA.value
    current.value = loopA.value
  }
  if (Math.abs(current.value - lastAnalysed) > 0.08) analyseAt(current.value)
  raf = requestAnimationFrame(tick)
}

player.addEventListener('play', () => { playing.value = true; raf = requestAnimationFrame(tick) })
player.addEventListener('pause', () => { playing.value = false; cancelAnimationFrame(raf); current.value = player.currentTime })
player.addEventListener('ended', () => { playing.value = false; cancelAnimationFrame(raf) })

function setA() {
  loopA.value = current.value
  if (loopB.value <= loopA.value) loopB.value = Math.min(duration.value, loopA.value + 2)
}

function setB() {
  loopB.value = current.value
  if (loopB.value <= loopA.value) loopA.value = Math.max(0, loopB.value - 2)
  loopOn.value = true
}

// Click to seek, drag across to choose the loop.
function timeAt(e) {
  const r = waveBox.value.getBoundingClientRect()
  return Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration.value
}

function onWaveDown(e) {
  waveBox.value.setPointerCapture?.(e.pointerId)
  dragStart = timeAt(e)
}

function onWaveMove(e) {
  if (dragStart === null) return
  const t1 = timeAt(e)
  if (Math.abs(t1 - dragStart) > duration.value * 0.005) {
    loopA.value = Math.min(dragStart, t1)
    loopB.value = Math.max(dragStart, t1)
  }
}

function onWaveUp(e) {
  if (dragStart === null) return
  const t1 = timeAt(e)
  if (Math.abs(t1 - dragStart) > duration.value * 0.005) {
    loopOn.value = true
    seek(loopA.value)
  } else {
    seek(t1)
  }
  dragStart = null
}

// ── Markers (remembered per file) ─────────────────────────────────────────────
function saveMarkers() {
  const all = readStorage(MARKERS_KEY, {}) || {}
  all[fileKey] = markers.value
  writeStorage(MARKERS_KEY, all)
}

function addMarker() {
  markers.value = [...markers.value, { time: current.value, label: `${t('tr.marker')} ${markers.value.length + 1}` }]
    .sort((a, b) => a.time - b.time)
  saveMarkers()
}

function removeMarker(i) {
  markers.value = markers.value.filter((_, k) => k !== i)
  saveMarkers()
}

// ── Note at the cursor ────────────────────────────────────────────────────────
// One analysis at a time; the latest position asked meanwhile runs next.
function analyseAt(sec) {
  if (!samples) return
  if (busy) { pending = sec; return }
  lastAnalysed = sec
  const start = Math.max(0, Math.floor(sec * sampleRate) - ANALYSIS_SAMPLES / 2)
  const chunk = samples.slice(start, start + ANALYSIS_SAMPLES)
  if (chunk.length < ANALYSIS_SAMPLES) return
  if (!worker) {
    worker = new PitchWorker()
    worker.onmessage = ({ data }) => {
      busy = false
      if (pending !== null) {
        const next = pending
        pending = null
        return analyseAt(next)
      }
      if (data.freq <= 0) { detected.value = ''; paintNote(null); return }
      const midi = Math.round(69 + 12 * Math.log2(data.freq / 440))
      detected.value = midiToName(midi, appStore.currentNotes)
      paintNote(midi)
    }
  }
  busy = true
  const [minFreq, maxFreq] = REGISTERS[register.value]
  worker.postMessage({ buffer: chunk, sampleRate, minFreq, maxFreq }, [chunk.buffer])
}

function paintNote(midi) {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
  if (midi === null) return
  fretboardCirclesForMidi(appStore.currentTuning, midi).forEach(c => {
    c.style.backgroundColor = '#FFD60A'
    c.style.opacity = '1'
    c.style.color = 'rgba(0,0,0,0.8)'
    c.innerText = appStore.currentNotes[((midi % 12) + 12) % 12]
  })
}

// Clicking the fretboard plays that note, to compare it with the recording by ear.
async function onNoteClick(e) {
  await audio.init()
  audio.playChord([0], e.detail.midiNote, 0, 1, 0.25, 'Electric Piano')
}

// ── Keyboard ──────────────────────────────────────────────────────────────────
function onKey(e) {
  if (!fileName.value || ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return
  const k = e.key.toLowerCase()
  if (k === ' ') { e.preventDefault(); togglePlay() }
  else if (k === 'arrowleft') { e.preventDefault(); seekBy(e.shiftKey ? -0.5 : -2) }
  else if (k === 'arrowright') { e.preventDefault(); seekBy(e.shiftKey ? 0.5 : 2) }
  else if (k === 'a') setA()
  else if (k === 'b') setB()
  else if (k === 'l') { if (loopB.value > loopA.value) loopOn.value = !loopOn.value }
  else if (k === 'm') addMarker()
  else if (k === '[' || k === ']') {
    const i = SPEEDS.indexOf(speed.value) + (k === ']' ? 1 : -1)
    if (i >= 0 && i < SPEEDS.length) speed.value = SPEEDS[i]
  }
}

watch(speed, v => { player.playbackRate = v })
watch(register, () => { lastAnalysed = -1; analyseAt(current.value) })

const onResize = () => draw()
onMounted(() => {
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', onResize)
  window.addEventListener('fretboard:noteClick', onNoteClick)
  paintNote(null)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  player.pause()
  cancelAnimationFrame(raf)
  if (objectUrl) URL.revokeObjectURL(objectUrl)
  worker?.terminate()
})
</script>

<style scoped>
.tr-drop { position: relative; z-index: 1; border: 1px dashed var(--jd-line-strong); border-radius: 14px; padding: 36px 16px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.tr-drop.over { border-color: var(--jd-amber); background: rgba(255, 214, 10, 0.05); }
.tr-drop p { margin: 0; color: var(--jd-text-soft); }
.tr-error { color: var(--jd-red) !important; }
.tr-file { position: relative; z-index: 1; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.tr-name { flex: 1; min-width: 0; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tr-time { font-family: var(--jd-mono); font-size: 13px; color: var(--jd-text-soft); font-variant-numeric: tabular-nums; }
.tr-wave { position: relative; z-index: 1; height: 120px; border-radius: 10px; background: #0c0b0a; border: 1px solid #2a2620; overflow: hidden; cursor: crosshair; touch-action: none; }
.tr-wave canvas { display: block; }
.tr-loop { position: absolute; top: 0; bottom: 0; background: rgba(255, 255, 255, 0.06); border-left: 1px solid var(--jd-muted); border-right: 1px solid var(--jd-muted); pointer-events: none; }
.tr-loop.on { background: rgba(58, 154, 217, 0.18); border-color: var(--jd-synth); }
.tr-marker { position: absolute; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--jd-bass); pointer-events: none; }
.tr-head { position: absolute; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--jd-text); pointer-events: none; }
.tr-transport { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 12px; margin: 16px 0 10px; flex-wrap: wrap; }
.tr-speed { display: flex; flex-direction: column; gap: 6px; margin-left: 10px; }
.tr-tools { position: relative; z-index: 1; display: flex; justify-content: center; }
.tr-markers { position: relative; z-index: 1; list-style: none; padding: 0; margin: 14px 0 0; display: flex; flex-direction: column; gap: 6px; }
.tr-markers li { display: flex; gap: 8px; align-items: center; }
.tr-jump { font-family: var(--jd-mono); font-size: 12px; min-width: 72px; }
.tr-label { flex: 1; min-width: 0; height: 32px; padding: 0 10px; background: rgba(0, 0, 0, 0.3); border: 1px solid #2a2620; border-radius: 6px; color: var(--jd-text); }
.tr-del { width: 32px; padding: 0; }
.tr-note { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 18px; flex-wrap: wrap; }
.tr-note-name { font-size: 30px; font-weight: 900; color: var(--jd-amber); min-width: 60px; text-align: center; font-family: var(--jd-mono); }
</style>
