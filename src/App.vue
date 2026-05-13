<template>
  <div class="app-container">
    <AppSidebar />

    <main class="main-content" v-if="appStore.isLoaded">
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
    <div v-else>{{ t('label.loading-app') }}</div>
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

function handleNoteClick({ noteIndex, midiNote, stringIndex, fretIndex, element }) {
  const path = route.path
  if (['/interval-learner', '/note-finder', '/lick-builder'].includes(path)) {
    window.dispatchEvent(new CustomEvent('fretboard:noteClick', {
      detail: { noteIndex, midiNote, stringIndex, fretIndex, element }
    }))
  } else {
    if (appStore.explorerMode === 'custom') {
      const posKey = `${stringIndex}-${fretIndex}`
      appStore.toggleCustomNote(posKey)
    } else if (appStore.explorerMode === 'highlight') {
      const posKey = `${stringIndex}-${fretIndex}`
      appStore.toggleManualNote(posKey)
    }
    // In 'normal' mode, direct fretboard clicks are disabled
  }
}

onMounted(() => {
  const data = appStore.loadFromStorage()
  playbackStore.loadFromData(data)
})
</script>
