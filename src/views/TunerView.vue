<template>
  <div id="view-tuner" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('tuner.title') }}</h1>
      </div>
    </header>

    <div class="importer-area" style="max-width:560px; margin: 0 auto; width: 100%; text-align:center;">
      <!-- SVG Tuner Meter -->
      <section class="jd-console" style="padding-bottom:20px; margin-bottom:24px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('tuner.subtitle') }}</span>
          <div class="jd-section-rule"></div>
        </div>

        <div class="tuner-card" style="margin-top:10px;">
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
            
            <!-- Frequency -->
            <text
              x="150" y="159"
              text-anchor="middle"
              fill="var(--jd-muted)" font-size="9" font-family="var(--jd-mono)"
              style="letter-spacing:0.5px;"
            >{{ tuner.detectedFreq.value ? tuner.detectedFreq.value + ' Hz' : '' }}</text>
          </svg>
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
  if (active < 0) return 'var(--jd-mute-deep)'
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

onUnmounted(() => { tuner.stop() })
</script>
