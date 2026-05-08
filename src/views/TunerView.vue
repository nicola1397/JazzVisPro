<template>
  <div id="view-tuner" class="view-panel active">
    <div class="importer-area" style="max-width:520px;margin: 0 auto; width: 100%; text-align:center;">

      <h2 class="area-title">{{ t('tuner.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:24px;">{{ t('tuner.subtitle') }}</p>

      <!-- SVG Tuner Meter -->
      <div class="tuner-card">
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
          <text x="23"  y="150" fill="rgba(255,255,255,0.22)" font-size="13" text-anchor="middle" font-family="sans-serif">♭</text>
          <text x="277" y="150" fill="rgba(255,255,255,0.22)" font-size="13" text-anchor="middle" font-family="sans-serif">♯</text>
          <!-- Note name -->
          <text
            x="150" y="122"
            text-anchor="middle"
            :fill="tuner.tuneColor.value"
            font-size="32" font-weight="900" letter-spacing="-1"
            font-family="system-ui,-apple-system,sans-serif"
            style="transition:fill 0.15s;"
          >{{ tuner.detectedNote.value || '–' }}</text>
          <!-- Cents label -->
          <text
            x="150" y="142"
            text-anchor="middle"
            :fill="tuner.tuneColor.value"
            font-size="13" font-weight="700"
            font-family="system-ui,-apple-system,sans-serif"
            style="transition:fill 0.15s;"
          >{{ centsLabel }}</text>
          <!-- Frequency -->
          <text
            x="150" y="157"
            text-anchor="middle"
            fill="#666" font-size="11"
            font-family="system-ui,-apple-system,sans-serif"
          >{{ tuner.detectedFreq.value ? tuner.detectedFreq.value + ' Hz' : '' }}</text>
        </svg>
      </div>

      <!-- Start / Stop button -->
      <div style="margin:20px 0 10px;">
        <button
          class="btn-add-step"
          style="min-width:160px;font-size:1.05em;"
          :style="tuner.isActive.value ? 'background:rgba(231,76,60,0.25);border-color:#e74c3c;color:#e74c3c;' : ''"
          @click="toggleTuner"
        >{{ tuner.isActive.value ? t('tuner.stop') : t('tuner.start') }}</button>
      </div>

      <!-- Status text -->
      <div class="tuner-instr">{{ tuner.statusText.value || t('tuner.status') }}</div>

      <!-- Reference strings -->
      <div style="margin-top:28px;">
        <div style="font-size:0.75em;text-transform:uppercase;color:#555;font-weight:700;margin-bottom:10px;">
          {{ t('tuner.ref') }}
        </div>
        <div class="tuner-strings-grid">
          <div
            v-for="s in STRINGS"
            :key="s.name"
            class="tuner-string-btn"
            @click="playRef(s.freq)"
          >
            <span class="ts-name">{{ s.name }}</span>
            <span class="ts-freq">{{ s.str }} · {{ s.hz }} Hz</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useI18n }       from '../composables/useI18n.js'
import { useAudioStore } from '../stores/audio.js'
import { useTuner }      from '../composables/useTuner.js'

const { t }      = useI18n()
const audioStore = useAudioStore()
const tuner      = useTuner(audioStore)

const STRINGS = [
  { name:'E', str:'6ª', freq:82.41,  hz:82  },
  { name:'A', str:'5ª', freq:110,    hz:110 },
  { name:'D', str:'4ª', freq:146.83, hz:147 },
  { name:'G', str:'3ª', freq:196,    hz:196 },
  { name:'B', str:'2ª', freq:246.94, hz:247 },
  { name:'E', str:'1ª', freq:329.63, hz:330 },
]

// Arc geometry (same coordinate space as viewBox "0 32 300 138" → full SVG 300x170)
const N       = 25
const CX      = 150
const CY      = 163
const R       = 113
const MIN_DEG = -80
const MAX_DEG =  80

const arcDots = computed(() => {
  const dots = []
  for (let i = 0; i < N; i++) {
    const angle = MIN_DEG + (i / (N - 1)) * (MAX_DEG - MIN_DEG)
    const rad   = (angle - 90) * (Math.PI / 180)
    dots.push({ x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) })
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
  if (dist === 0) return '#2ecc71'
  if (dist <= 3)  return '#27ae60'
  if (dist <= 5)  return '#f1c40f'
  if (dist <= 7)  return '#e67e22'
  return '#e74c3c'
}

function dotFill(i) {
  const active = activeDotIndex.value
  if (active < 0) return '#333'
  if (i === active) return tuner.tuneColor.value
  if (i === 12 && active >= 0) return active === 12 ? tuner.tuneColor.value : '#2ecc71'
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

const centsLabel = computed(() => {
  if (!tuner.isActive.value || !tuner.detectedNote.value || tuner.detectedNote.value === '–') return ''
  const c = tuner.detectedCents.value
  if (Math.abs(c) < 5) return '✓ In Tune'
  return (c > 0 ? '+' : '') + c + ' ¢'
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

function onTunerStop() { tuner.stop() }

onMounted(()   => window.addEventListener('tuner:stop', onTunerStop))
onUnmounted(() => { window.removeEventListener('tuner:stop', onTunerStop); tuner.stop() })
</script>
