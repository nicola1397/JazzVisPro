<template>
  <div class="scroll-wrapper" v-show="showFretboard">
    <div class="scroll-content">
      <div class="fretboard-container">
        <!-- Single click handler on container = event delegation -->
        <div class="fretboard-layer" :class="{ 'game-mode': isGameMode }" @click.stop="handleClick">
          <div v-for="s in STRINGS" :key="s" class="string" :class="`s${s}`">
            <div v-for="f in (FRETS + 1)" :key="f" class="fret" :class="`fret-${f-1}`">
              <div
                class="note-circle"
                :class="circleClass(s-1, f-1)"
                :style="circleStyle(s-1, f-1)"
                :data-string-index="s-1"
                :data-fret-index="f-1"
                :data-note-index="noteIndex(s-1, f-1)"
              >{{ circleText(s-1, f-1) }}</div>
              <div
                v-if="showMarker(s-1, f-1)"
                class="fret-marker"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="fret-numbers" id="numbers-layer">
        <div v-for="f in (FRETS + 1)" :key="f" class="num" :class="{ 'num-0': f === 1 }">
          {{ f - 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute }         from 'vue-router'
import { useAppStore }      from '../../stores/app.js'
import { STRINGS, FRETS }   from '../../utils/constants.js'
import { INTERVAL_COLORS }  from '../../utils/theory.js'

const props = defineProps({
  gameMode: { type: String, default: '' }, // 'interval' | 'note' | 'lick' | ''
})
const emit = defineEmits(['noteClick'])

const appStore = useAppStore()
const route    = useRoute()

const ARP_INTERVALS = [0, 3, 4, 7, 10, 11]

const isGameMode = computed(() =>
  ['interval', 'note', 'lick'].includes(props.gameMode)
)

const showFretboard = computed(() => {
  const meta = route.meta
  return meta?.fretboard !== false
})

function noteIndex(s, f) {
  return (appStore.currentTuning[s] + f) % 12
}

function showMarker(s, f) {
  const single = [3, 5, 7, 9, 15, 17, 19, 21]
  const double = [12, 24]
  if (s === 3 && single.includes(f)) return true
  if (double.includes(f) && (s === 1 || s === 4)) return true
  return false
}

function circleClass(s, f) {
  if (isGameMode.value) return 'note-circle'

  const nIdx     = noteIndex(s, f)
  const rootIdx  = appStore.rootIdx
  const scale    = appStore.currentScale
  const interval = (nIdx - rootIdx + 12) % 12
  const inScale  = scale.includes(interval)
  const mode     = appStore.explorerMode
  const posKey   = `${s}-${f}`
  const isCustom = appStore.customScaleNotes.has(posKey)

  const visible = mode === 'custom' ? isCustom : inScale
  
  const inArp = inScale && (ARP_INTERVALS.includes(interval) ||
    (appStore.add9 && interval === 2) ||
    (appStore.add11 && interval === 5) ||
    (appStore.add13 && interval === 9))

  return {
    'note-circle': true,
    'visible': visible,
    'active-note': visible,
    'root': visible && interval === 0,
    'note-ghost': visible && mode !== 'custom' && appStore.soloArp && !inArp && !appStore.hideUnused,
    'note-hidden': visible && mode !== 'custom' && appStore.soloArp && !inArp && appStore.hideUnused,
  }
}

function circleStyle(s, f) {
  if (isGameMode.value) return { opacity: '0.04', visibility: 'visible', pointerEvents: 'auto' }

  const nIdx     = noteIndex(s, f)
  const rootIdx  = appStore.rootIdx
  const interval = (nIdx - rootIdx + 12) % 12
  const scale    = appStore.currentScale
  const inScale  = scale.includes(interval)
  const mode     = appStore.explorerMode
  const posKey   = `${s}-${f}`
  const isCustom = appStore.customScaleNotes.has(posKey)

  const visible = mode === 'custom' ? isCustom : inScale
  if (!visible) return { visibility: 'hidden' }

  const col = INTERVAL_COLORS[interval]
  return {
    backgroundColor: col?.color || 'white',
    visibility: 'visible'
  }
}

function circleText(s, f) {
  if (isGameMode.value) return ''

  const nIdx     = noteIndex(s, f)
  const rootIdx  = appStore.rootIdx
  const scale    = appStore.currentScale
  const interval = (nIdx - rootIdx + 12) % 12
  const inScale  = scale.includes(interval)
  const mode     = appStore.explorerMode
  const posKey   = `${s}-${f}`
  const isCustom = appStore.customScaleNotes.has(posKey)

  const visible = mode === 'custom' ? isCustom : inScale
  if (!visible) return ''

  const col = INTERVAL_COLORS[interval]
  if (appStore.notation === 'interval') return col?.short || ''
  return appStore.currentNotes[nIdx] || ''
}

function handleClick(e) {
  const circle = e.target.closest('.note-circle')
  if (!circle) return
  emit('noteClick', {
    noteIndex:    parseInt(circle.dataset.noteIndex),
    stringIndex:  parseInt(circle.dataset.stringIndex),
    fretIndex:    parseInt(circle.dataset.fretIndex),
    element:      circle,
  })
}
</script>
