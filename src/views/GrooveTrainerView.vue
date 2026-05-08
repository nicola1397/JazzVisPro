<template>
  <div id="view-groove-trainer" class="view-panel active">
    <div class="importer-area" style="max-width:700px;margin: 0 auto; width: 100%;">
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
            <label data-i18n="gt.subdivision">{{ t('gt.subdivision') }}</label>
            <select :value="subdivCount" @change="onSubdivChange($event.target.value)">
              <option value="4">{{ t('gt.quarters') }}</option>
              <option value="8">{{ t('gt.eighths') }}</option>
              <option value="16">{{ t('gt.sixteenths') }}</option>
              <option value="12">{{ t('gt.triplets') }}</option>
            </select>
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

      <div id="gt-beat-display" style="text-align:center;font-size:3.5em;font-weight:900;color:var(--accent);margin-bottom:20px;min-height:60px;letter-spacing:6px;font-variant-numeric:tabular-nums;">
        {{ isPlaying ? currentStep + 1 : '–' }}
      </div>

      <div id="gt-pattern-grid" class="gt-pattern-grid" style="margin-bottom:15px;">
        <button
          v-for="(on, i) in pattern"
          :key="i"
          class="gt-cell"
          :class="{
            'gt-cell-on':     on,
            'gt-cell-active': isPlaying && i === currentStep,
            'gt-cell-bar':    i % barSize === 0,
          }"
          @click="toggleCell(i)"
        >
          <span>{{ i + 1 }}</span>
        </button>
      </div>

      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
        <button class="btn-io" @click="applyPreset('all')" data-i18n="gt.preset-all">{{ t('gt.preset-all') }}</button>
        <button class="btn-io" @click="applyPreset('downbeats')" data-i18n="gt.preset-down">{{ t('gt.preset-down') }}</button>
        <button class="btn-io" @click="applyPreset('backbeat')" data-i18n="gt.preset-back">{{ t('gt.preset-back') }}</button>
        <button class="btn-io" @click="applyPreset('clave')" data-i18n="gt.preset-clave">{{ t('gt.preset-clave') }}</button>
        <button class="btn-reset" style="width:auto;padding:0 16px;" @click="clearPattern" data-i18n="gt.clear-pattern">{{ t('gt.clear-pattern') }}</button>
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

// ── State ─────────────────────────────────────────────────────────────────────
const subdivCount = ref(8)
const bpm         = ref(100)
const volume      = ref(0.7)
const soundName   = ref('Beep')
const isPlaying   = ref(false)
const currentStep = ref(0)

const pattern = ref(Array.from({ length: 8 }, (_, i) => i === 0))
const barSize = computed(() => Math.max(1, subdivCount.value / 4))

// ── Pattern helpers ───────────────────────────────────────────────────────────
function toggleCell(i) {
  pattern.value[i] = !pattern.value[i]
}

function onSubdivChange(val) {
  const n = parseInt(val)
  if (n === subdivCount.value) return
  subdivCount.value = n
  const newPattern = Array(n).fill(false)
  for (let i = 0; i < Math.min(n, pattern.value.length); i++) {
    newPattern[i] = pattern.value[i]
  }
  newPattern[0] = true
  pattern.value = newPattern
}

function applyPreset(name) {
  const n  = subdivCount.value
  const p  = Array(n).fill(false)
  if (name === 'all') {
    p.fill(true)
  } else if (name === 'downbeats') {
    for (let i=0; i<n; i+=barSize.value) p[i] = true
  } else if (name === 'backbeat') {
    if (n >= 4) {
      const b2 = barSize.value, b4 = barSize.value * 3
      if (b2 < n) p[b2] = true
      if (b4 < n) p[b4] = true
    }
  } else if (name === 'clave') {
    if (n === 8) [0, 2, 3, 4, 6].forEach(i => p[i] = true)
    else if (n === 16) [0, 3, 6, 8, 12].forEach(i => p[i] = true)
    else p[0] = true
  }
  pattern.value = p
}

function clearPattern() {
  pattern.value = Array(subdivCount.value).fill(false)
}

// ── Scheduler ─────────────────────────────────────────────────────────────────
let rafId         = null
let nextNoteTime  = 0
let schedStep     = 0
const LOOK_AHEAD   = 0.1

function secondsPerStep() {
  const beatsPerMin  = bpm.value
  const stepsPerBeat = subdivCount.value / 4
  return 60 / beatsPerMin / stepsPerBeat
}

function scheduler() {
  if (!isPlaying.value) return
  const ctx = audioStore.context
  if (!ctx) { rafId = requestAnimationFrame(scheduler); return }
  while (nextNoteTime < ctx.currentTime + LOOK_AHEAD) {
    const step       = schedStep
    const isDownbeat = step % barSize.value === 0
    if (pattern.value[step]) {
      audioStore.playClick(nextNoteTime, isDownbeat, volume.value, soundName.value)
    }
    const schedCapture = step
    const fireAt = nextNoteTime - ctx.currentTime
    setTimeout(() => {
      if (isPlaying.value) currentStep.value = schedCapture
    }, Math.max(0, fireAt * 1000 - 20))
    nextNoteTime += secondsPerStep()
    schedStep = (schedStep + 1) % subdivCount.value
  }
  rafId = requestAnimationFrame(scheduler)
}

function startPlayback() {
  audioStore.init()
  const ctx = audioStore.context
  if (!ctx) return
  schedStep    = 0
  nextNoteTime = ctx.currentTime + 0.05
  currentStep.value = 0
  isPlaying.value   = true
  rafId = requestAnimationFrame(scheduler)
}

function stopPlay() {
  isPlaying.value = false
  currentStep.value = 0
  if (rafId) { cancelAnimationFrame(rafId); rafId = null }
}

function togglePlay() {
  if (isPlaying.value) stopPlay()
  else startPlayback()
}

watch(bpm, () => {
  if (isPlaying.value) {
    const ctx = audioStore.context
    if (ctx) nextNoteTime = ctx.currentTime + 0.05
  }
})

watch(subdivCount, () => {
  if (isPlaying.value) { stopPlay(); startPlayback() }
})

function onGrooveStop() { stopPlay() }
onMounted(()   => window.addEventListener('groove:stop', onGrooveStop))
onUnmounted(() => { window.removeEventListener('groove:stop', onGrooveStop); stopPlay() })
</script>
