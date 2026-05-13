<template>
  <div id="view-groove-trainer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('gt.title') }}</h1>
      </div>
    </header>

    <div class="importer-area" style="max-width:800px; margin: 0 auto; width: 100%; padding-top: 20px;">
      <p style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">{{ t('gt.subtitle') }}</p>

      <section class="jd-console gt-controls" style="margin-bottom: 30px;">

        <div class="jd-grain" aria-hidden="true"></div>

        <div class="jd-master">
          <div class="jd-bpm">
            <div class="jd-bpm-frame">
              <span class="jd-bpm-led" :class="{ on: isPlaying }" aria-hidden="true"></span>
              <input type="number" class="jd-bpm-input" v-model.number="bpm" min="40" max="300" :aria-label="t('label.bpm')">
              <span class="jd-bpm-unit">{{ t('label.bpm') }}</span>
            </div>
          </div>

          <div class="jd-transport">
            <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': isPlaying }"
                    @click="togglePlay" :aria-label="isPlaying ? 'Pause' : 'Play'">
              <svg v-if="!isPlaying" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <button class="jd-tbtn" @click="stopPlay" aria-label="Stop">
              <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
            </button>
          </div>

          <div class="jd-feel" style="flex: 1;">
            <span class="jd-feel-label">{{ t('label.sound') }}</span>
            <select v-model="soundName" class="jd-select">
              <option value="Beep">{{ t('opt.beep') }}</option>
              <option value="Click">{{ t('opt.click') }}</option>
              <option value="Log">{{ t('opt.log') }}</option>
            </select>
          </div>

          <div class="jd-modes">
            <label class="jd-mode" :class="{ on: isPolyrhythm }">
              <input type="checkbox" v-model="isPolyrhythm">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">Polyrhythm</span>
            </label>
          </div>
        </div>

        <div class="jd-rule" aria-hidden="true"></div>

        <div class="jd-fader" style="max-width: 200px; margin: 10px 0;">
          <span class="jd-section-hint" style="margin-right: 15px;">{{ t('label.vol') }}</span>
          <input type="range" v-model.number="volume" min="0" max="1" step="0.1" class="jd-range" :style="{ '--p': (volume*100) + '%' }" aria-label="Volume">
          <span class="jd-fader-value">{{ Math.round(volume * 100) }}</span>
        </div>
      </section>

      <!-- Pattern A -->
      <section class="jd-console" style="margin-bottom:20px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('label.pattern') }} A</span>
          <span class="jd-section-rule"></span>
        </div>

        <div style="display:flex; gap:12px; align-items:center; margin-bottom:15px; flex-wrap:wrap;">
          <select class="jd-select" :value="subdivCountA" @change="onSubdivChange('A', $event.target.value)" style="max-width: 180px;">
            <option value="4">{{ t('gt.quarters') }}</option>
            <option value="8">{{ t('gt.eighths') }}</option>
            <option value="16">{{ t('gt.sixteenths') }}</option>
            <option value="12">{{ t('gt.triplets') }}</option>
          </select>
          <button class="jd-toolbtn" @click="applyPreset('A','downbeats')">{{ t('gt.preset-down') }}</button>
          <button class="jd-toolbtn jd-toolbtn--reset" @click="clearPattern('A')">{{ t('gt.preset-reset') }}</button>
        </div>

        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:15px;">
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('clave32')">{{ t('gt.preset-clave32') }}</button>
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('clave23')">{{ t('gt.preset-clave23') }}</button>
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('rumba')">{{ t('gt.preset-rumba') }}</button>
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('samba')">{{ t('gt.preset-samba') }}</button>
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('baiao')">{{ t('gt.preset-baiao') }}</button>
          <button class="jd-toolbtn world-preset" @click="applyWorldPreset('bossa')">{{ t('gt.preset-bossa') }}</button>
        </div>

        <div class="gt-pattern-grid" :style="`--cols:${subdivCountA};`" style="padding: 10px 0;">
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
      </section>

      <!-- Pattern B (Polyrhythm) -->
      <section v-if="isPolyrhythm" class="jd-console" style="margin-bottom:20px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('label.pattern') }} B (Polyrhythm)</span>
          <span class="jd-section-rule"></span>
        </div>

        <div style="display:flex; gap:12px; align-items:center; margin-bottom:15px;">
          <select class="jd-select" :value="subdivCountB" @change="onSubdivChange('B', $event.target.value)" style="max-width: 220px;">
            <option value="3">3 (Triplets/Pulse)</option>
            <option value="4">4 (Quarters)</option>
            <option value="5">5 (Quintplets)</option>
            <option value="7">7 (Septuplets)</option>
          </select>
          <button class="jd-toolbtn" @click="applyPreset('B','downbeats')">{{ t('gt.preset-down') }}</button>
          <button class="jd-toolbtn jd-toolbtn--reset" @click="clearPattern('B')">{{ t('gt.preset-reset') }}</button>
        </div>

        <div class="gt-pattern-grid" :style="`--cols:${subdivCountB};`" style="padding: 10px 0;">
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
      </section>

      <!-- Speed Trainer -->
      <section class="jd-console" :class="{ 'jd-playing': speedActive }" style="margin-top:20px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('gt.speedTrainer') }}</span>
          <span class="jd-section-rule"></span>
          <span v-if="speedActive && isPlaying" class="jd-section-hint">
            {{ bpm }} → {{ speedToBpm }} BPM · {{ t('label.bars') }} {{ barsPlayed }}
          </span>
        </div>

        <div class="jd-modes" style="margin-bottom: 15px;">
          <label class="jd-mode" :class="{ on: speedActive }">
            <input type="checkbox" v-model="speedActive">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('label.trainer') }}</span>
          </label>
        </div>

        <div v-if="speedActive" class="jd-pitch-grid">
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('gt.speedFrom') }}</span>
            <input type="number" class="jd-bpm-input" v-model.number="speedFromBpm" min="40" max="300" style="width: 100%;">
          </div>
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('gt.speedTo') }}</span>
            <input type="number" class="jd-bpm-input" v-model.number="speedToBpm" min="40" max="300" style="width: 100%;">
          </div>
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('gt.speedStep') }}</span>
            <input type="number" class="jd-bpm-input" v-model.number="speedStep" min="1" max="50" style="width: 100%;">
          </div>
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('gt.speedBars') }}</span>
            <input type="number" class="jd-bpm-input" v-model.number="speedBars" min="1" max="32" style="width: 100%;">
          </div>
        </div>
      </section>

      <div class="jd-improv-banner" style="margin-top: 25px;">
        <span class="jd-improv-bullet" aria-hidden="true"></span>
        <strong>{{ t('label.tips') }}</strong>
        <span class="jd-improv-helper">
          Ghost Notes: Accento (Giallo) → Ghost (Trasparente) → Spento.
          Polyrhythm: Sovrapponi due suddivisioni different (es. 4 contro 3).
        </span>
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

// World-music / latin patterns (always applied to pattern A on a 16-cell grid)
const WORLD_PATTERNS = {
  clave32: [0, 3, 6, 10, 12],
  clave23: [2, 4, 8, 11, 14],
  rumba:   [0, 3, 7, 10, 12],
  samba:   [0, 4, 6, 10, 12, 14],
  baiao:   [0, 6, 8, 11, 14],
  bossa:   [0, 3, 6, 10, 14],
}
function applyWorldPreset(name) {
  const cells = WORLD_PATTERNS[name]
  if (!cells) return
  subdivCountA.value = 16
  const p = Array(16).fill(0)
  cells.forEach(c => { if (c < 16) p[c] = 1 })
  patternA.value = p
}

// ── Speed Trainer state ─────────────────────────────────────────────────────
const speedActive  = ref(false)
const speedFromBpm = ref(80)
const speedToBpm   = ref(160)
const speedStep    = ref(5)
const speedBars    = ref(4)
const barsPlayed   = ref(0)

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

    // Speed Trainer: when we wrap to step 0, we just completed a bar (16 steps for clave) /
    // a beat (4 for quarters). Treat 1 bar = subdivCountA cells.
    if (schedStepA === 0) {
      barsPlayed.value++
      if (speedActive.value && speedBars.value > 0 && barsPlayed.value % speedBars.value === 0) {
        const newBpm = Math.min(speedToBpm.value, bpm.value + speedStep.value)
        if (newBpm !== bpm.value) {
          bpm.value = newBpm
        } else if (newBpm >= speedToBpm.value) {
          // Reached the top — stop
          stopPlay(); return
        }
      }
    }
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

async function startPlayback() {
  await audioStore.init()
  const ctx = audioStore.context
  if (!ctx) return
  
  const now = ctx.currentTime
  schedStepA    = 0
  nextNoteTimeA = now + 0.05
  currentStepA.value = 0

  schedStepB    = 0
  nextNoteTimeB = now + 0.05
  currentStepB.value = 0

  // Speed Trainer: reset and apply starting BPM
  barsPlayed.value = 0
  if (speedActive.value) {
    bpm.value = speedFromBpm.value
  }

  isPlaying.value   = true
  rafId = requestAnimationFrame(scheduler)
}

function stopPlay() {
  isPlaying.value = false
  currentStepA.value = 0
  currentStepB.value = 0
  if (rafId) { cancelAnimationFrame(rafId); rafId = null }
}

async function togglePlay() {
  if (isPlaying.value) stopPlay()
  else await startPlayback()
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

onUnmounted(() => { stopPlay() })
</script>

<style scoped>
.gt-pattern-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols, 8), 1fr);
  gap: 6px;
  padding: 10px 0 4px;
}
.gt-cell {
  height: 54px;
  min-width: 0;
  border-radius: 9px;
  border: 1.5px solid var(--jd-line);
  background: var(--jd-surface);
  color: var(--jd-mute-deep);
  font-family: var(--jd-mono);
  font-size: 0.85em;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s, transform 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
.gt-cell:hover {
  background: var(--jd-surface-alt);
  border-color: var(--jd-line-strong);
  color: var(--jd-text-soft);
}
.gt-cell-bar {
  border-left: 3px solid rgba(255, 214, 10, 0.30);
}
.gt-cell-on {
  background: linear-gradient(180deg, rgba(255, 214, 10, 0.22), rgba(255, 214, 10, 0.10)) !important;
  border-color: var(--jd-amber) !important;
  color: var(--jd-amber) !important;
  box-shadow:
    inset 0 0 18px rgba(255, 214, 10, 0.18),
    0 0 14px rgba(255, 214, 10, 0.10) !important;
}
.gt-cell-ghost {
  background: rgba(255, 255, 255, 0.04) !important;
  border-color: rgba(255, 255, 255, 0.18) !important;
  color: var(--jd-text-soft) !important;
}
.gt-cell-active {
  transform: scale(1.06);
  background: var(--jd-amber) !important;
  border-color: var(--jd-amber-soft) !important;
  color: var(--jd-bg-deep) !important;
  z-index: 2;
  box-shadow: 0 0 22px rgba(255, 214, 10, 0.55) !important;
}
.world-preset {
  background: rgba(156, 92, 255, 0.08) !important;
  border-color: rgba(156, 92, 255, 0.40) !important;
  color: #c89cff !important;
}
.world-preset:hover {
  background: rgba(156, 92, 255, 0.18) !important;
  border-color: var(--jd-bass) !important;
}
.speed-trainer-box {
  padding: 14px 16px;
  background: var(--jd-surface);
  border: 1px solid var(--jd-line);
  border-radius: 12px;
  transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.speed-trainer-box.active {
  background: linear-gradient(180deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.02));
  border-color: rgba(34, 197, 94, 0.40);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.10);
}
</style>