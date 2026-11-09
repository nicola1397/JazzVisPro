<template>
  <div class="scroll-wrapper" v-show="showFretboard" :class="{ lefty: appStore.leftHanded, windowed: !!win }" :style="winStyle">
    <div class="scroll-content">
      <div class="fretboard-container">
        <div
          class="fretboard-layer" :class="{ 'game-mode': isGameMode }" @click.stop="handleClick"
          tabindex="0" role="group" :aria-label="t('fb.aria')" @keydown="onKey" @focus="onFocus"
        >
          <div v-for="sIdx in STRINGS" :key="sIdx" class="string" :class="`s${sIdx}`">
            <div v-for="fIdx in (FRETS + 1)" :key="fIdx" class="fret" :class="[`fret-${fIdx-1}`, { 'fret-out': outOfWindow(fIdx-1), 'fret-first': win && fIdx-1 === win.from && win.from > 0, 'kbd-cursor': cursor.s === sIdx-1 && cursor.f === fIdx-1 }]">
              <div
                class="note-circle"
                :class="getCircleClass(sIdx-1, fIdx-1)"
                :style="getCircleStyle(sIdx-1, fIdx-1)"
                :data-string-index="sIdx-1"
                :data-fret-index="fIdx-1"
                :data-note-index="boardState[sIdx-1][fIdx-1].nIdx"
              >{{ getCircleText(sIdx-1, fIdx-1) }}</div>
              <div v-if="hasMarker(sIdx-1, fIdx-1)" class="fret-marker" />
            </div>
          </div>
        </div>
      </div>
      <div class="sr-only" aria-live="polite">{{ cursorText }}</div>
      <div class="fret-numbers" id="numbers-layer">
        <div v-for="f in (FRETS + 1)" :key="f" class="num" :class="{ 'num-0': f === 1, 'fret-out': outOfWindow(f - 1) }">
          {{ f - 1 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute }  from 'vue-router'
import { useAppStore } from '../../stores/app.js'
import { STRINGS, FRETS } from '../../utils/constants.js'
import { INTERVAL_COLORS, getPitchClass, getAbsoluteNote } from '../../utils/theory.js'
import { fretboard, markStyle } from '../../composables/useFretboardMarks.js'
import { useI18n } from '../../composables/useI18n.js'
import { positionName } from '../../utils/fretRefs.js'

const props = defineProps({
  gameMode: { type: String, default: '' },
})
const emit = defineEmits(['noteClick'])

const appStore = useAppStore()
const route    = useRoute()

const ARP_INTERVALS = [0, 3, 4, 7, 10, 11]

// Part of the neck on screen (setting "frets"): only outside the exercises, whose targets
// can be anywhere. The fret width is recomputed for the frets shown.
const win = computed(() => {
  if (isGameMode.value || appStore.fretWindow === 'all') return null
  const [from, to] = appStore.fretWindow.split('-').map(Number)
  return { from, to }
})
const outOfWindow = f => !!win.value && (f < win.value.from || f > win.value.to) && !(f === 0 && win.value.from === 0)
const winStyle = computed(() => {
  if (!win.value) return null
  const n = win.value.to - win.value.from + (win.value.from === 0 ? 0 : 1)
  const nut = win.value.from === 0 ? 'var(--nut-width)' : '0px'
  const fw = `clamp(26px, calc((var(--fb-avail) - ${nut}) / ${n}), 76px)`
  return { '--fret-width': fw, '--note-size': `clamp(19px, calc(${fw} - 10px), 30px)` }
})

const isGameMode = computed(() => ['interval', 'note', 'lick', 'chord', 'playback', 'changes', 'scale', 'transcribe', 'lesson'].includes(props.gameMode))

const showFretboard = computed(() => route.meta?.fretboard !== false)

// Computed grid state to ensure reactivity and performance
const boardState = computed(() => {
  const grid = []
  const tuning = appStore.currentTuning
  const scale = new Set(appStore.currentScale)
  const rootIdx = Number(appStore.rootIdx)
  const mode = appStore.explorerMode
  const cagedSet = appStore.cagedHighlightSet
  const manualSet = appStore.manualNotes
  const customSet = appStore.customScaleNotes
  const legendSet = appStore.highlightedIntervals
  const soloArp = appStore.soloArp
  const hideUnused = appStore.hideUnused
  const notation = appStore.notation
  const accidental = appStore.accidental
  const currentNotes = appStore.currentNotes
  
  const add9 = appStore.add9
  const add11 = appStore.add11
  const add13 = appStore.add13

  for (let s = 0; s < STRINGS; s++) {
    grid[s] = []
    for (let f = 0; f <= FRETS; f++) {
      const nIdx = getPitchClass(tuning, s, f)
      const absNote = getAbsoluteNote(tuning, s, f)
      const interval = (nIdx - rootIdx + 12) % 12
      const inScale = scale.has(interval)
      const posKey = `${s}-${f}`
      
      const isCustom = customSet.has(posKey)
      const isCaged = cagedSet.has(posKey)
      const isManual = manualSet.has(posKey)
      const isLegend = legendSet.has(interval)

      const inArp = inScale && (ARP_INTERVALS.includes(interval) ||
        (add9 && interval === 2) ||
        (add11 && interval === 5) ||
        (add13 && interval === 9))

      let isActive = false
      let finalVisible = false

      if (mode === 'custom') {
        finalVisible = true
        isActive = isCustom
      } else {
        const targetInScale = soloArp ? inArp : inScale
        isActive = !!(targetInScale || isLegend || isManual || isCaged)
        finalVisible = hideUnused ? isActive : (inScale || isLegend || isManual || isCaged)
      }

      grid[s][f] = {
        nIdx,
        absNote,
        interval,
        isActive,
        finalVisible,
        isRoot: isActive && interval === 0,
        isCaged,
        isManual,
        isLegend,
        inScale,
        col: INTERVAL_COLORS[interval],
        text: notation === 'interval' ? (INTERVAL_COLORS[interval]?.short || '') : (currentNotes[nIdx] || '')
      }
    }
  }
  return grid
})

function getCircleClass(s, f) {
  if (isGameMode.value) {
    const m = fretboard.marks[`${s}-${f}`]
    return m?.cls ? ['note-circle', ...[].concat(m.cls)] : 'note-circle'
  }
  const state = boardState.value[s][f]
  return {
    'note-circle': true,
    'visible': state.finalVisible,
    'active-note': state.isActive,
    'root': state.isRoot,
    'note-ghost': !state.isActive && state.finalVisible,
    'note-hidden': !state.finalVisible && appStore.explorerMode !== 'custom',
    'note-highlighted': state.isLegend || state.isManual || state.isCaged,
    'note-caged': state.isCaged,
    'note-manual': state.isManual && (state.inScale || state.isCaged),
  }
}

// Custom mode: frets outside the zone the note picker works on are dimmer
const inCustomZone = f => f >= appStore.customZone.from && f <= appStore.customZone.to

function getCircleStyle(s, f) {
  if (isGameMode.value) {
    const m = fretboard.marks[`${s}-${f}`]
    return m ? markStyle(m) : { opacity: '0.04', visibility: 'visible', pointerEvents: 'auto' }
  }
  const state = boardState.value[s][f]
  if (!state.isActive && appStore.explorerMode !== 'custom' && !state.finalVisible) {
    return { visibility: 'hidden' }
  }
  const style = {
    backgroundColor: state.col?.color || 'white',
    visibility: 'visible',
    pointerEvents: 'auto',
    opacity: state.isActive ? '1' : (appStore.explorerMode === 'custom' ? (inCustomZone(f) ? '0.15' : '0.05') : '0.4')
  }
  if (state.isActive) {
    if (state.isCaged) {
      style.boxShadow = '0 0 15px 2px white'
      style.border = '2px solid white'
    } else if (state.isManual && (state.inScale || state.isCaged)) {
      style.boxShadow = '0 0 15px 4px var(--jd-amber)'
      style.border = '2px solid var(--jd-amber)'
      style.zIndex = '35'
    } else if (state.isLegend) {
      style.boxShadow = `0 0 15px 4px ${state.col?.color || 'white'}`
      style.border = '2px solid white'
      style.zIndex = '30'
    }
  }
  return style
}

function getCircleText(s, f) {
  if (isGameMode.value) return fretboard.marks[`${s}-${f}`]?.label ?? ''
  const state = boardState.value[s][f]
  return state.isActive ? state.text : ''
}

function hasMarker(s, f) {
  const single = [3, 5, 7, 9, 15, 17, 19, 21]
  const double = [12, 24]
  if (s === 3 && single.includes(f)) return true
  if (double.includes(f) && (s === 1 || s === 4)) return true
  return false
}

// ── Keyboard: arrows move a cursor over strings and frets, Enter or Space touches ──
const { t } = useI18n()
const cursor = ref({ s: 2, f: 5 })
const cursorText = ref('')
const fretRange = () => (win.value ? { lo: win.value.from, hi: win.value.to } : { lo: 0, hi: FRETS })
function announce() {
  const p = cursor.value
  const name = positionName(p, appStore.lang)
  // in the exercises the note is not said: it would give the answer away
  cursorText.value = isGameMode.value ? name : `${name} · ${appStore.currentNotes[boardState.value[p.s][p.f].nIdx]}`
}
function onFocus() {
  const { lo, hi } = fretRange()
  cursor.value = { s: cursor.value.s, f: Math.min(hi, Math.max(lo, cursor.value.f)) }
  announce()
}
function onKey(e) {
  const { lo, hi } = fretRange()
  const dir = appStore.leftHanded ? -1 : 1                       // mirrored neck: left is up the neck
  let { s, f } = cursor.value
  if (e.key === 'ArrowRight') f += dir
  else if (e.key === 'ArrowLeft') f -= dir
  else if (e.key === 'ArrowUp') s -= 1
  else if (e.key === 'ArrowDown') s += 1
  else if (e.key === 'Home') f = lo
  else if (e.key === 'End') f = hi
  else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault(); e.stopPropagation()
    const state = boardState.value[s][f]
    emit('noteClick', { noteIndex: state.nIdx, midiNote: state.absNote, stringIndex: s, fretIndex: f })
    return
  } else return
  e.preventDefault(); e.stopPropagation()                         // not also a page shortcut
  cursor.value = { s: Math.min(STRINGS - 1, Math.max(0, s)), f: Math.min(hi, Math.max(lo, f)) }
  announce()
  // keep the cursor in view on narrow screens
  document.querySelector(`.string.s${cursor.value.s + 1} .fret-${cursor.value.f}`)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

// The whole fret cell answers, not just the circle: on small screens the circles are small.
function handleClick(e) {
  const circle = e.target.closest('.note-circle') || e.target.closest('.fret')?.querySelector('.note-circle')
  if (!circle) return
  const s = parseInt(circle.dataset.stringIndex)
  const f = parseInt(circle.dataset.fretIndex)
  const state = boardState.value[s][f]
  emit('noteClick', { noteIndex: state.nIdx, midiNote: state.absNote, stringIndex: s, fretIndex: f })
}
</script>
