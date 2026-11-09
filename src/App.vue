<template>
  <div class="app-container">
    <AppSidebar />

    <main class="main-content" :class="{ 'is-game': onStage }" v-if="appStore.isLoaded">
      <AppNavbar />

      <CountdownOverlay
        :show="playbackStore.isCountingDown"
        :value="playbackStore.countdownValue"
      />

      <div class="viewport">
        <!-- Interval legend (in custom mode a quick picker for whole notes) -->
        <FretboardLegend v-show="showLegend" />

        <!-- On the fretboard exercises the question bar (StageHud) and the fretboard form one
             block that stays under the navbar while the settings scroll below it. -->
        <div class="stage" :class="{ 'stage--game': onStage }">
          <div v-if="onStage" id="stage-hud" class="stage-hud-slot"></div>
          <Fretboard
            v-show="showFretboard"
            :game-mode="gameMode"
            @note-click="handleNoteClick"
          />
        </div>

        <RouterView />
      </div>
    </main>
    <div v-else>{{ t('label.loading-app') }}</div>
    <ToastHost />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute }          from 'vue-router'
import { useAppStore }       from './stores/app.js'
import { usePlaybackStore }  from './stores/playback.js'
import { useAudioStore }     from './stores/audio.js'
import { useI18n, loadLanguage } from './composables/useI18n.js'
import AppSidebar       from './components/layout/Sidebar.vue'
import AppNavbar        from './components/layout/AppNavbar.vue'
import CountdownOverlay from './components/shared/CountdownOverlay.vue'
import Fretboard        from './components/fretboard/Fretboard.vue'
import FretboardLegend  from './components/fretboard/FretboardLegend.vue'
import ToastHost        from './components/shared/ToastHost.vue'

const appStore      = useAppStore()
const playbackStore = usePlaybackStore()
const audioStore    = useAudioStore()
const route         = useRoute()
const { t }         = useI18n()

const showFretboard = computed(() => route.meta?.fretboard !== false)
const showLegend    = computed(() => route.meta?.legend === true)
const gameMode      = computed(() => route.meta?.game || '')
// Exercises (and the Player, which you watch while it plays) keep the fretboard in view.
const onStage       = computed(() => (!!gameMode.value || !!route.meta?.stage) && showFretboard.value)

// The page scrolls inside .main-content, which the router does not reset: without this a
// new view opens at the previous view's scroll offset. Views that only change a param
// (course steps) keep handling their own scroll.
watch(() => route.matched[0]?.path, (now, before) => {
  if (before === undefined || now === before) return
  document.querySelector('.main-content')?.scrollTo({ top: 0 })
}, { flush: 'post' })

watch(() => appStore.lang, lang => {
  loadLanguage(lang).catch(() => {})
  document.documentElement.setAttribute('lang', lang)
}, { immediate: true })

function handleNoteClick({ noteIndex, midiNote, stringIndex, fretIndex, element }) {
  const path = route.path
  if (['/interval-learner', '/note-finder', '/lick-builder', '/triad-trainer', '/seventh-trainer', '/ear-playback', '/changes-trainer', '/scale-tempo', '/transcribe'].includes(path) || path.startsWith('/lessons/')) {
    window.dispatchEvent(new CustomEvent('fretboard:noteClick', {
      detail: { noteIndex, midiNote, stringIndex, fretIndex, element }
    }))
  } else {
    const posKey = `${stringIndex}-${fretIndex}`
    let sounding = true
    if (appStore.explorerMode === 'custom') {
      appStore.toggleCustomNote(posKey)
      sounding = appStore.customScaleNotes.has(posKey)
    } else if (appStore.explorerMode === 'highlight') {
      appStore.toggleManualNote(posKey)
      sounding = appStore.manualNotes.has(posKey)
    }
    // The touched note is heard (when it is turned on), unless the sound is switched off
    if (sounding && appStore.clickSound) audioStore.playNoteImmediate(midiNote, 0.9, 0.5, 'Electric Piano')
  }
}

onMounted(() => {
  const data = appStore.loadFromStorage()
  playbackStore.loadFromData(data)
})
</script>
