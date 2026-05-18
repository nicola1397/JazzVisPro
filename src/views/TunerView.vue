<template>
  <div id="view-tuner" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('tuner.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container--narrow" style="text-align:center;">
      <!-- SVG Tuner Meter -->
      <section class="jd-console" style="padding-bottom:20px; margin-bottom:24px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('tuner.subtitle') }}</span>
          <div class="jd-section-rule"></div>
        </div>

        <!-- Mode Switcher -->
        <div style="display:flex; justify-content:center; margin-bottom:15px; position:relative; z-index:10;">
          <div class="jd-modes">
            <label class="jd-mode" :class="{ on: appStore.tunerMode === 'normal' }">
              <input type="radio" :checked="appStore.tunerMode === 'normal'" @change="appStore.setTunerMode('normal')" class="hidden-radio">
              <span class="jd-mode-dot"></span><span class="jd-mode-text">Standard</span>
            </label>
            <label class="jd-mode" :class="{ on: appStore.tunerMode === 'strobe' }">
              <input type="radio" :checked="appStore.tunerMode === 'strobe'" @change="appStore.setTunerMode('strobe')" class="hidden-radio">
              <span class="jd-mode-dot"></span><span class="jd-mode-text">Pro Strobe</span>
            </label>
          </div>
        </div>

        <div class="tuner-card" style="margin-top:10px; background: #0c0b0a; border-radius: 24px; padding: 25px; border: 1px solid var(--jd-line-strong); box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
          
          <!-- 1. STROBE DISPLAY -->
          <div v-if="appStore.tunerMode === 'strobe'" style="background: #050505; border-radius: 50%; width: 280px; max-width: 100%; aspect-ratio: 1/1; height: auto; margin: 0 auto; border: 8px solid #1a1816; box-shadow: inset 0 0 40px rgba(0,0,0,0.8), 0 0 0 1px #2a2620; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <div class="jd-grain" style="opacity: 0.1;"></div>

            <!-- Rotating Strobe Pattern -->
            <svg viewBox="0 0 200 200" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
              <g :style="{ transform: `rotate(${strobeRotation}deg)`, transformOrigin: '50% 50%' }">
                <circle v-for="i in 36" :key="i"
                  cx="100" cy="100" r="85"
                  fill="none"
                  :stroke="tuner.tuneColor.value"
                  stroke-width="14"
                  :stroke-dasharray="`5, ${85 * 2 * Math.PI / 36 - 5}`"
                  :style="{ transform: `rotate(${i * 10}deg)`, transformOrigin: '50% 50%', opacity: tuner.isActive.value ? 0.7 : 0.1 }"
                />
                <circle v-for="i in 24" :key="'inner'+i"
                  cx="100" cy="100" r="62"
                  fill="none"
                  :stroke="tuner.tuneColor.value"
                  stroke-width="10"
                  :stroke-dasharray="`4, ${62 * 2 * Math.PI / 24 - 4}`"
                  :style="{ transform: `rotate(${i * 15}deg)`, transformOrigin: '50% 50%', opacity: tuner.isActive.value ? 0.5 : 0.05 }"
                />
              </g>
            </svg>

            <!-- Center Info -->
            <div style="position: relative; z-index: 10; text-align: center;">
              <div style="font-family: var(--jd-display); font-style: italic; font-size: 64px; line-height: 1; margin-bottom: -2px;" :style="{ color: tuner.tuneColor.value, textShadow: `0 0 25px ${tuner.tuneColor.value}55` }">
                {{ tuner.detectedNote.value || '–' }}
              </div>
              <div style="font-family: var(--jd-mono); font-size: 11px; color: var(--jd-muted); letter-spacing: 3px; text-transform: uppercase; margin-top: 8px; font-weight: 700;">
                {{ centsLabel }}
              </div>
            </div>

            <!-- Target Sights -->
            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 3px; height: 20px; background: var(--jd-amber); opacity: 0.9;"></div>
            <div style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 3px; height: 20px; background: var(--jd-amber); opacity: 0.9;"></div>
          </div>

          <!-- 2. NORMAL LED DISPLAY -->
          <div v-else style="min-height: 280px; display: flex; flex-direction: column; justify-content: center;">
             <svg class="tuner-arc-svg" viewBox="0 32 300 138" xmlns="http://www.w3.org/2000/svg">
              <!-- Arc dots -->
              <g v-for="(dot, i) in arcDots" :key="i">
                <circle
                  :cx="dot.x" :cy="dot.y"
                  :r="i === 12 ? 7 : 4.5"
                  :fill="dotFill(i)"
                  :opacity="dotOpacity(i)"
                  class="tuner-dot"
                />
              </g>
              <!-- ♭ / ♯ labels -->
              <text x="23"  y="150" fill="var(--jd-line-strong)" font-size="14" text-anchor="middle" font-family="var(--jd-mono)">♭</text>
              <text x="277" y="150" fill="var(--jd-line-strong)" font-size="14" text-anchor="middle" font-family="var(--jd-mono)">♯</text>
              
              <!-- Note name -->
              <text
                x="150" y="122"
                text-anchor="middle"
                :fill="tuner.tuneColor.value"
                font-size="44" font-weight="400" font-family="var(--jd-display)" font-style="italic"
                style="transition:fill 0.15s; letter-spacing:-0.02em;"
              >{{ tuner.detectedNote.value || '–' }}</text>
              
              <!-- Cents label -->
              <text
                x="150" y="146"
                text-anchor="middle"
                :fill="tuner.tuneColor.value"
                font-size="11" font-weight="700" font-family="var(--jd-mono)"
                style="transition:fill 0.15s; letter-spacing:1px; text-transform:uppercase;"
              >{{ centsLabel }}</text>
            </svg>
          </div>

          <div style="display:flex; justify-content: center; margin-top: 20px;">
             <div style="background: #000; padding: 4px 15px; border-radius: 20px; border: 1px solid #222; font-family: var(--jd-mono); color: var(--jd-amber); font-size: 11px;">
                {{ tuner.detectedFreq.value ? tuner.detectedFreq.value + ' Hz' : (appStore.tunerMode === 'strobe' ? 'STROBE STANDBY' : 'TUNER STANDBY') }}
             </div>
          </div>
        </div>

        <!-- Start / Stop button -->
        <div style="margin:24px 0 12px; display:flex; justify-content:center; position:relative; z-index:1;">
          <button
            class="btn-add-step"
            style="min-width:180px;"
            :style="tuner.isActive.value ? 'background:rgba(255,69,58,0.1) !important; border-color:var(--jd-red) !important; color:var(--jd-red) !important;' : ''"
            @click="toggleTuner"
          >{{ tuner.isActive.value ? t('tuner.stop') : t('tuner.start') }}</button>
        </div>

        <!-- Status text -->
        <div class="tuner-instr" style="color:var(--jd-muted); font-family:var(--jd-mono); font-size:10px; text-transform:uppercase; letter-spacing:2px; position:relative; z-index:1;">
          {{ tuner.statusText.value || t('tuner.status') }}
        </div>
      </section>

      <!-- Reference strings -->
      <section class="jd-console" style="padding-top:20px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('tuner.ref') }}</span>
          <div class="jd-section-rule"></div>
        </div>
        <div class="tuner-strings-grid" style="position:relative; z-index:1; margin-top:4px;">
          <div
            v-for="s in STRINGS"
            :key="s.name"
            class="tuner-string-btn"
            style="padding:12px 6px;"
            @click="playRef(s.freq)"
          >
            <span class="ts-name">{{ s.name }}</span>
            <span class="ts-freq">{{ s.str }} · {{ s.hz }} Hz</span>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n }       from '../composables/useI18n.js'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore }   from '../stores/app.js'
import { useTuner }      from '../composables/useTuner.js'

const { t }      = useI18n()
const audioStore = useAudioStore()
const appStore   = useAppStore()
const tuner      = useTuner(audioStore)

// ─── STROBE LOGIC ─────────────────────────────────────────────────────────────
const strobeRotation = ref(0)
const smoothCents = ref(0) // Damping for jitter
let lastTime = performance.now()
let rafId = null

function updateStrobe(time) {
  const dt = (time - lastTime) / 1000 
  lastTime = time

  if (tuner.isActive.value && tuner.detectedNote.value !== '–') {
    const targetCents = tuner.detectedCents.value
    
    // 1. Simple low-pass filter to reduce jitter (smoothing)
    smoothCents.value += (targetCents - smoothCents.value) * 0.15

    // 2. Dead-zone and Non-linear speed
    let speed = 0
    const absCents = Math.abs(smoothCents.value)
    
    if (absCents > 1.5) {
      speed = Math.pow(absCents / 50, 1.2) * 400 * Math.sign(smoothCents.value)
    }

    strobeRotation.value = (strobeRotation.value + speed * dt) % 360
  }
  
  rafId = requestAnimationFrame(updateStrobe)
}

onMounted(() => {
  rafId = requestAnimationFrame(updateStrobe)
})

onUnmounted(() => { 
  tuner.stop() 
  if (rafId) cancelAnimationFrame(rafId)
})

const STRINGS = [
  { name:'E', str:'6ª', freq:82.41,  hz:82  },
  { name:'A', str:'5ª', freq:110,    hz:110 },
  { name:'D', str:'4ª', freq:146.83, hz:147 },
  { name:'G', str:'3ª', freq:196,    hz:196 },
  { name:'B', str:'2ª', freq:246.94, hz:247 },
  { name:'E', str:'1ª', freq:329.63, hz:330 },
]

const centsLabel = computed(() => {
  if (!tuner.isActive.value || !tuner.detectedNote.value || tuner.detectedNote.value === '–') return 'STANDBY'
  const c = Math.round(tuner.detectedCents.value)
  if (Math.abs(c) < 3) return 'PERFECT'
  return (c > 0 ? '+' : '') + c + ' cents'
})

function toggleTuner() {
  audioStore.init()
  if (tuner.isActive.value) tuner.stop()
  else tuner.start()
}

function playRef(freq) {
  audioStore.init()
  audioStore.playRef(freq)
}

// ─── NORMAL LED DOTS LOGIC ───────────────────────────────────────────────────
const N       = 25
const CX_ARC  = 150
const CY_ARC  = 163
const R_ARC   = 113

const arcDots = computed(() => {
  const dots = []
  for (let i = 0; i < N; i++) {
    const angle = -80 + (i / (N - 1)) * 160
    const rad   = (angle - 90) * (Math.PI / 180)
    dots.push({ x: CX_ARC + R_ARC * Math.cos(rad), y: CY_ARC + R_ARC * Math.sin(rad) })
  }
  return dots
})

const activeDotIndex = computed(() => {
  if (!tuner.isActive.value || !tuner.detectedNote.value || tuner.detectedNote.value === '–') return -1
  const c = Math.max(-50, Math.min(50, tuner.detectedCents.value))
  return Math.round(((c + 50) / 100) * (N - 1))
})

function dotBaseColor(i) {
  const dist = Math.abs(i - 12)
  if (dist <= 2)  return '#2ecc71' // Green zone
  if (dist <= 5)  return '#f1c40f' // Yellow zone
  return '#e74c3c' // Red zone
}

function dotFill(i) {
  const active = activeDotIndex.value
  if (active < 0) return 'var(--jd-mute-deep)'
  if (i === 12) return active === 12 ? tuner.tuneColor.value : '#2ecc71'
  if (i === active) return tuner.tuneColor.value
  return dotBaseColor(i)
}

function dotOpacity(i) {
  const active = activeDotIndex.value
  if (active < 0) return i === 12 ? 0.4 : 0.18
  if (i === active) return 1
  if (i === 12) return 0.55
  const dist = Math.abs(i - active)
  return dist <= 1 ? 0.55 : dist <= 3 ? 0.25 : 0.12
}
</script>
