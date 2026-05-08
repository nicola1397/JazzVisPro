<template>
  <div id="view-groove-trainer" class="view-panel active">
    <div class="importer-area" style="max-width:800px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="gt.title">{{ t('gt.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;" data-i18n="gt.subtitle">{{ t('gt.subtitle') }}</p>

      <div class="control-section" style="margin-bottom:20px;">
        <div class="control-section-header" data-i18n="section.playback">{{ t('section.playback') }}</div>
        <div style="display:flex;gap:15px;flex-wrap:wrap;align-items:flex-end;padding:12px 0 0;">
          <div class="nav-group">
            <label data-i18n="label.bpm">{{ t('label.bpm') }}</label>
            <input type="number" v-model.number="bpm" min="40" max="300" style="width:80px;">
          </div>
          <div class="nav-group">
            <label data-i18n="label.sound">{{ t('label.sound') }}</label>
            <select v-model="soundName">
              <option>Beep</option>
              <option>Click</option>
              <option>Log</option>
            </select>
          </div>
          <div class="nav-group">
            <label data-i18n="label.vol">{{ t('label.vol') }}</label>
            <input type="range" v-model.number="volume" min="0" max="1" step="0.1" style="width:80px;">
          </div>
          <div class="checkbox-container ms-2 mb-1">
            <input type="checkbox" id="polyrhythm-toggle" v-model="isPolyrhythm">
            <label for="polyrhythm-toggle">Polyrhythm Mode</label>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;align-items:center;margin-bottom:20px;">
        <button class="btn-icon btn-play" id="gt-play-btn" @click="togglePlay" style="width:54px;height:54px;" :class="{ active: isPlaying }">
          <svg viewBox="0 0 24 24">
            <path v-if="!isPlaying" d="M8 5v14l11-7z"/>
            <path v-else d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>
        <button class="btn-icon btn-stop" @click="stopPlay" style="width:54px;height:54px;">
          <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
        </button>
      </div>

      <!-- Pattern A -->
      <div class="control-section-header" style="font-size:0.75em;margin-top:10px;">Pattern A</div>
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
        <div class="nav-group" style="margin:0;">
          <select :value="subdivCountA" @change="onSubdivChange('A', $event.target.value)" style="padding:4px 8px;font-size:0.85em;">
            <option value="4">{{ t('gt.quarters') }}</option>
            <option value="8">{{ t('gt.eighths') }}</option>
            <option value="16">{{ t('gt.sixteenths') }}</option>
            <option value="12">{{ t('gt.triplets') }}</option>
          </select>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="btn-io" style="padding:2px 8px;font-size:0.75em;" @click="applyPreset('A','downbeats')">{{ t('gt.preset-down') }}</button>
          <button class="btn-io" style="padding:2px 8px;font-size:0.75em;" @click="clearPattern('A')">Reset</button>
        </div>
      </div>
      <div class="gt-pattern-grid" :style="`--cols:${subdivCountA};margin-bottom:20px;`">
        <button
          v-for="(state, i) in patternA"
          :key="'A-'+i"
          class="gt-cell"
          :class="{
            'gt-cell-on':     state === 1,
            'gt-cell-ghost':  state === 2,
            'gt-cell-active': isPlaying && i === currentStepA,
            'gt-cell-bar':    i % barSizeA === 0,
          }"
          @click="cycleCell('A', i)"
        >
          <span>{{ i + 1 }}</span>
        </button>
      </div>

      <!-- Pattern B (Polyrhythm) -->
      <div v-if="isPolyrhythm">
        <div class="control-section-header" style="font-size:0.75em;margin-top:10px;">Pattern B</div>
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;">
          <div class="nav-group" style="margin:0;">
            <select :value="subdivCountB" @change="onSubdivChange('B', $event.target.value)" style="padding:4px 8px;font-size:0.85em;">
              <option value="3">3 (Triplets/Pulse)</option>
              <option value="4">4 (Quarters)</option>
              <option value="5">5 (Quintplets)</option>
              <option value="7">7 (Septuplets)</option>
            </select>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn-io" style="padding:2px 8px;font-size:0.75em;" @click="applyPreset('B','downbeats')">{{ t('gt.preset-down') }}</button>
            <button class="btn-io" style="padding:2px 8px;font-size:0.75em;" @click="clearPattern('B')">Reset</button>
          </div>
        </div>
        <div class="gt-pattern-grid" :style="`--cols:${subdivCountB};margin-bottom:15px;`">
          <button
            v-for="(state, i) in patternB"
            :key="'B-'+i"
            class="gt-cell"
            :class="{
              'gt-cell-on':     state === 1,
              'gt-cell-ghost':  state === 2,
              'gt-cell-active': isPlaying && i === currentStepB,
              'gt-cell-bar':    i % barSizeB === 0,
            }"
            @click="cycleCell('B', i)"
          >
            <span>{{ i + 1 }}</span>
          </button>
        </div>
      </div>

      <div class="teoria-tip mt-4">
        <strong>Ghost Notes:</strong> Clicca più volte su una cella per passare da Accento (Giallo) a Ghost Note (Trasparente) a Spento.
        <br><strong>Polyrhythm:</strong> Attiva la modalità Polyrhythm per sovrapporre due suddivisioni differenti (es. 4 contro 3).
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted, onMounted } from 'vue'
import { useI18n }       from '../composables/useI18n.js'
import { useAudioStore } from '../stores/audio.js'

const { t }      = useI18n()
const audioStore = useAudioStore()

// ── Global State ──────────────────────────────────────────────────────────────
const bpm           = ref(100)
const volume        = ref(0.7)
const soundName     = ref('Beep')
const isPlaying     = ref(false)
const isPolyrhythm  = ref(false)

// ── Pattern A State ───────────────────────────────────────────────────────────
const subdivCountA = ref(8)
const currentStepA = ref(0)
const patternA     = ref(Array.from({ length: 8 }, (_, i) => i === 0 ? 1 : 0))
const barSizeA     = computed(() => Math.max(1, subdivCountA.value / 4))

// ── Pattern B State ───────────────────────────────────────────────────────────
const subdivCountB = ref(3)
const currentStepB = ref(0)
const patternB     = ref(Array.from({ length: 3 }, (_, i) => i === 0 ? 1 : 0))
const barSizeB     = computed(() => 1) // B is usually a pulse

// ── Pattern helpers ───────────────────────────────────────────────────────────
function cycleCell(target, i) {
  const p = target === 'A' ? patternA : patternB
  // 0: off, 1: accent, 2: ghost
  p.value[i] = (p.value[i] + 1) % 3
}

function onSubdivChange(target, val) {
  const n = parseInt(val)
  if (target === 'A') {
    if (n === subdivCountA.value) return
    subdivCountA.value = n
    patternA.value = Array(n).fill(0)
    patternA.value[0] = 1
  } else {
    if (n === subdivCountB.value) return
    subdivCountB.value = n
    patternB.value = Array(n).fill(0)
    patternB.value[0] = 1
  }
}

function applyPreset(target, name) {
  const n = target === 'A' ? subdivCountA.value : subdivCountB.value
  const bar = target === 'A' ? barSizeA.value : barSizeB.value
  const p = Array(n).fill(0)
  if (name === 'downbeats') {
    for (let i=0; i<n; i+=bar) p[i] = 1
  }
  if (target === 'A') patternA.value = p
  else patternB.value = p
}

function clearPattern(target) {
  const n = target === 'A' ? subdivCountA.value : subdivCountB.value
  if (target === 'A') patternA.value = Array(n).fill(0)
  else patternB.value = Array(n).fill(0)
}

// ── Scheduler ─────────────────────────────────────────────────────────────────
let rafId          = null
let nextNoteTimeA  = 0
let schedStepA     = 0
let nextNoteTimeB  = 0
let schedStepB     = 0
const LOOK_AHEAD   = 0.1

function secondsPerStep(subdiv) {
  const beatsPerMin  = bpm.value
  const stepsPerBeat = subdiv / 4
  return 60 / beatsPerMin / stepsPerBeat
}

function scheduler() {
  if (!isPlaying.value) return
  const ctx = audioStore.context
  if (!ctx) { rafId = requestAnimationFrame(scheduler); return }

  // Schedule Pattern A
  while (nextNoteTimeA < ctx.currentTime + LOOK_AHEAD) {
    const step       = schedStepA
    const isDownbeat = step % barSizeA.value === 0
    const state      = patternA.value[step]

    if (state !== 0) {
      const mult = state === 2 ? 0.35 : 1.0 // Ghost note multiplier
      audioStore.playClick(nextNoteTimeA, isDownbeat, volume.value, soundName.value, mult)
    }

    const schedCapture = step
    const fireAt = nextNoteTimeA - ctx.currentTime
    setTimeout(() => {
      if (isPlaying.value) currentStepA.value = schedCapture
    }, Math.max(0, fireAt * 1000 - 20))

    nextNoteTimeA += secondsPerStep(subdivCountA.value)
    schedStepA = (schedStepA + 1) % subdivCountA.value
  }

  // Schedule Pattern B
  if (isPolyrhythm.value) {
    while (nextNoteTimeB < ctx.currentTime + LOOK_AHEAD) {
      const step  = schedStepB
      const state = patternB.value[step]

      if (state !== 0) {
        const mult = state === 2 ? 0.35 : 1.0
        // Use higher pitch for B to distinguish
        audioStore.playClick(nextNoteTimeB, step === 0, volume.value * 0.8, soundName.value === 'Beep' ? 'Click' : 'Beep', mult)
      }

      const schedCapture = step
      const fireAt = nextNoteTimeB - ctx.currentTime
      setTimeout(() => {
        if (isPlaying.value) currentStepB.value = schedCapture
      }, Math.max(0, fireAt * 1000 - 20))

      nextNoteTimeB += secondsPerStep(subdivCountB.value)
      schedStepB = (schedStepB + 1) % subdivCountB.value
    }
  }

  rafId = requestAnimationFrame(scheduler)
}

function startPlayback() {
  audioStore.init()
  const ctx = audioStore.context
  if (!ctx) return
  schedStepA    = 0
  nextNoteTimeA = ctx.currentTime + 0.05
  currentStepA.value = 0
  
  schedStepB    = 0
  nextNoteTimeB = ctx.currentTime + 0.05
  currentStepB.value = 0

  isPlaying.value   = true
  rafId = requestAnimationFrame(scheduler)
}

function stopPlay() {
  isPlaying.value = false
  currentStepA.value = 0
  currentStepB.value = 0
  if (rafId) { cancelAnimationFrame(rafId); rafId = null }
}

function togglePlay() {
  if (isPlaying.value) stopPlay()
  else startPlayback()
}

watch(bpm, () => {
  if (isPlaying.value) {
    const ctx = audioStore.context
    if (ctx) {
      nextNoteTimeA = ctx.currentTime + 0.05
      nextNoteTimeB = ctx.currentTime + 0.05
    }
  }
})

function onGrooveStop() { stopPlay() }
onMounted(()   => window.addEventListener('groove:stop', onGrooveStop))
onUnmounted(() => { window.removeEventListener('groove:stop', onGrooveStop); stopPlay() })
</script>

<style scoped>
.gt-pattern-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 8), 1fr);
  gap: 6px;
  padding: 10px 0 4px;
}
.gt-cell {
  height: 52px;
  min-width: 0;
  border-radius: 8px;
  border: 2px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.2);
  font-size: 1.1em;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.gt-cell:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.4);
}
.gt-cell-bar {
  border-color: rgba(255,255,255,0.15);
}
.gt-cell-on {
  background: rgba(255, 214, 10, 0.15) !important;
  border-color: var(--accent) !important;
  color: var(--accent) !important;
  box-shadow: 0 0 15px rgba(255, 214, 10, 0.1);
}
.gt-cell-ghost {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: rgba(255, 255, 255, 0.7) !important;
}
.gt-cell-active {
  transform: scale(1.08);
  background: var(--accent) !important;
  border-color: #fff !important;
  color: #000 !important;
  z-index: 2;
  box-shadow: 0 0 20px rgba(255, 214, 10, 0.5);
}
</style>