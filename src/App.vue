<template>
  <div class="app-container">
    <AppSidebar />

    <main class="main-content">
      <AppNavbar />

      <CountdownOverlay
        :show="playbackStore.isCountingDown"
        :value="playbackStore.countdownValue"
      />

      <div class="viewport">
        <!-- Interval legend -->
        <div class="controls" id="legend" v-show="showLegend">
          <div
            v-for="(col, idx) in INTERVAL_COLORS"
            :key="idx"
            class="color-option"
            :class="{ selected: appStore.highlightedIntervals.has(+idx) }"
            @click="appStore.toggleHighlightInterval(+idx)"
          >
            <span class="label">{{ col.short }}</span>
            <div class="swatch" :style="{ background: col.color }"></div>
          </div>
        </div>

        <div id="explorer-help" v-show="showLegend" style="text-align:center;font-size:0.8em;color:#666;margin-bottom:15px;">
          {{ t('explorer.help') }}
        </div>

        <Fretboard
          v-show="showFretboard"
          :game-mode="gameMode"
          @note-click="handleNoteClick"
        />

        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute }          from 'vue-router'
import { useAppStore }       from './stores/app.js'
import { usePlaybackStore }  from './stores/playback.js'
import { useI18n }           from './composables/useI18n.js'
import { INTERVAL_COLORS }   from './utils/theory.js'
import AppSidebar       from './components/layout/Sidebar.vue'
import AppNavbar        from './components/layout/AppNavbar.vue'
import CountdownOverlay from './components/shared/CountdownOverlay.vue'
import Fretboard        from './components/fretboard/Fretboard.vue'

const appStore      = useAppStore()
const playbackStore = usePlaybackStore()
const route         = useRoute()
const { t }         = useI18n()

const showFretboard = computed(() => route.meta?.fretboard !== false)
const showLegend    = computed(() => route.meta?.legend === true)
const gameMode      = computed(() => route.meta?.game || '')

watch(() => appStore.lang, lang => {
  document.documentElement.setAttribute('lang', lang)
}, { immediate: true })

function handleNoteClick({ noteIndex, stringIndex, fretIndex, element }) {
  const path = route.path
  if (['/interval-learner', '/note-finder', '/lick-builder'].includes(path)) {
    window.dispatchEvent(new CustomEvent('fretboard:noteClick', {
      detail: { noteIndex, stringIndex, fretIndex, element }
    }))
  } else {
    const posKey = `${stringIndex}-${fretIndex}`
    if (appStore.explorerMode === 'custom') appStore.toggleCustomNote(posKey)
    else appStore.toggleManualNote(posKey)
  }
}

onMounted(() => {
  const data = appStore.loadFromStorage()
  playbackStore.loadFromData(data)
})

watch(route, (to, from) => {
  if (from.path === '/groove-trainer') window.dispatchEvent(new CustomEvent('groove:stop'))
  if (from.path === '/tuner')          window.dispatchEvent(new CustomEvent('tuner:stop'))
  if (from.path === '/lick-builder')   window.dispatchEvent(new CustomEvent('lickbuilder:stop'))
})
</script>
