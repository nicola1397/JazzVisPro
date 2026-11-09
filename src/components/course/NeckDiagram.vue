<template>
  <figure class="nd">
    <div v-if="showBar" class="nd-bar">
      <button v-if="play" class="nd-play" type="button" :disabled="playing" @click="playDots">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        {{ t('cr.listen') }}
      </button>
      <span class="nd-bar-spacer"></span>
      <div v-if="labelModes.length > 1" class="nd-seg" role="group" :aria-label="t('cr.labels')">
        <button
          v-for="m in labelModes" :key="m" type="button"
          class="nd-seg-btn" :class="{ on: mode === m }"
          :aria-pressed="mode === m"
          @click="mode = m"
        >{{ t('cr.label-' + m) }}</button>
      </div>
    </div>

    <div class="nd-scroll">
      <svg
        class="nd-svg"
        :viewBox="`0 0 ${W} ${H}`"
        :style="{ minWidth: fit ? 0 : minWidth + 'px', maxWidth: maxWidth + 'px' }"
        role="img"
        :aria-label="ariaLabel"
      >
        <!-- shape regions: one shaded area, or labelled bars above the neck when there are several -->
        <template v-if="!barMode">
          <g v-for="(b, i) in boxes" :key="'box' + i">
            <rect
              :x="wireX(b.from - 1)" :y="2" :width="wireX(b.to) - wireX(b.from - 1)" :height="boardBottom - 2"
              rx="6" :fill="boxColor(b)" :fill-opacity="0.09"
              :stroke="boxColor(b)" stroke-opacity="0.5" stroke-width="1"
            />
            <text
              :x="(wireX(b.from - 1) + wireX(b.to)) / 2" :y="15" text-anchor="middle"
              class="nd-box-label" :fill="boxColor(b)"
            >{{ b.label }}</text>
          </g>
        </template>
        <template v-else>
          <g v-for="(b, i) in boxes" :key="'bar' + i">
            <rect
              :x="wireX(b.from - 1) + 2" :y="4 + (i % 2) * 15" :width="wireX(b.to) - wireX(b.from - 1) - 4" height="12"
              rx="6" :fill="boxColor(b)" fill-opacity="0.85"
            />
            <text
              :x="(wireX(b.from - 1) + wireX(b.to)) / 2" :y="13.5 + (i % 2) * 15" text-anchor="middle"
              class="nd-bar-label"
            >{{ b.label }}</text>
          </g>
        </template>

        <!-- board -->
        <rect :x="boardLeft" :y="boardTop" :width="wireX(to) - boardLeft" :height="boardBottom - boardTop" class="nd-board" />

        <!-- inlays -->
        <g v-for="f in fretList" :key="'inl' + f">
          <template v-if="f > 0 && SINGLE.includes(f)">
            <circle :cx="dotX(f)" :cy="stringY(2.5)" r="4.5" class="nd-inlay" />
          </template>
          <template v-else-if="f > 0 && DOUBLE.includes(f)">
            <circle :cx="dotX(f)" :cy="stringY(1.5)" r="4.5" class="nd-inlay" />
            <circle :cx="dotX(f)" :cy="stringY(3.5)" r="4.5" class="nd-inlay" />
          </template>
        </g>

        <!-- frets -->
        <line v-if="from === 0" :x1="nutX" :x2="nutX" :y1="boardTop" :y2="boardBottom" class="nd-nut" />
        <line v-else :x1="boardLeft" :x2="boardLeft" :y1="boardTop" :y2="boardBottom" class="nd-fret nd-fret--edge" />
        <line
          v-for="f in wireList" :key="'w' + f"
          :x1="wireX(f)" :x2="wireX(f)" :y1="boardTop" :y2="boardBottom" class="nd-fret"
        />

        <!-- strings -->
        <g v-for="s in 6" :key="'s' + s">
          <line
            :x1="boardLeft - (from === 0 ? OPEN_W : 0)" :x2="wireX(to)"
            :y1="stringY(s - 1)" :y2="stringY(s - 1)"
            class="nd-string" :class="{ 'nd-string--focus': focusSet.has(s - 1), 'nd-string--dim': focusSet.size && !focusSet.has(s - 1) }"
            :stroke-width="0.7 + (s - 1) * 0.32"
          />
          <text :x="10" :y="stringY(s - 1) + 3.5" class="nd-string-label" :class="{ on: focusSet.has(s - 1) }">
            <tspan class="nd-string-num">{{ s }}</tspan><tspan dx="2">{{ stringLetters[s - 1] }}</tspan>
          </text>
        </g>

        <!-- muted strings -->
        <text
          v-for="s in muted" :key="'m' + s"
          :x="from === 0 ? LEFT + OPEN_W / 2 : boardLeft - 7" :y="stringY(s) + 4"
          text-anchor="middle" class="nd-muted"
        >×</text>

        <!-- barre -->
        <rect
          v-if="barre && barre.f >= from && barre.f <= to"
          :x="dotX(barre.f) - 9" :y="stringY(barre.from) - 11" width="18"
          :height="stringY(barre.to) - stringY(barre.from) + 22" rx="9" class="nd-barre"
        />

        <!-- fret numbers -->
        <text
          v-for="f in fretList" :key="'n' + f"
          :x="dotX(f)" :y="H - 6" text-anchor="middle"
          class="nd-fretnum" :class="{ on: SINGLE.includes(f) || DOUBLE.includes(f) }"
        >{{ f }}</text>

        <!-- click targets -->
        <g v-if="clickable" class="nd-hits">
          <template v-for="s in 6" :key="'hs' + s">
            <g v-for="f in fretList" :key="'h' + s + '-' + f" class="nd-hit" @click="emit('pick', { s: s - 1, f })">
              <rect :x="dotX(f) - cellW(f) / 2" :y="stringY(s - 1) - ROW / 2" :width="cellW(f)" :height="ROW" fill="transparent" />
              <circle :cx="dotX(f)" :cy="stringY(s - 1)" r="9" class="nd-hit-ring" />
            </g>
          </template>
        </g>

        <!-- dots -->
        <g
          v-for="d in visibleDots" :key="'d' + d.s + '-' + d.f"
          class="nd-dot" :class="{ ghost: d.ghost, playing: playingKey === d.s + '-' + d.f, pulse: d.pulse }"
          :style="{ pointerEvents: clickable ? 'none' : 'auto' }"
        >
          <circle
            :cx="dotX(d.f)" :cy="stringY(d.s)" :r="d.ghost ? 6.5 : 10.5"
            :fill="d.hollow ? 'transparent' : fillOf(d)"
            :stroke="d.ring ? 'var(--jd-amber)' : (d.hollow ? fillOf(d) : 'rgba(0,0,0,0.45)')"
            :stroke-width="d.ring ? 2.5 : (d.hollow ? 2 : 1)"
            :stroke-dasharray="d.stretch ? '3 2' : null"
          />
          <text
            v-if="!d.ghost && labelOf(d)"
            :x="dotX(d.f)" :y="stringY(d.s)" text-anchor="middle" dominant-baseline="central"
            class="nd-dot-label" :fill="d.hollow ? fillOf(d) : textOn(fillOf(d))"
            :font-size="fontFor(labelOf(d))"
          >
            <template v-if="labelOf(d).includes('/')">
              <tspan :x="dotX(d.f)" dy="-0.55em">{{ labelOf(d).split('/')[0] }}</tspan>
              <tspan :x="dotX(d.f)" dy="1.1em">{{ labelOf(d).split('/')[1] }}</tspan>
            </template>
            <template v-else>{{ labelOf(d) }}</template>
          </text>
        </g>
      </svg>
    </div>
    <figcaption v-if="caption" class="nd-caption" v-html="caption"></figcaption>
  </figure>
</template>

<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { useI18n } from '../../composables/useI18n.js'
import { useAudioStore } from '../../stores/audio.js'
import { STRING_LETTERS, OPEN_MIDI, SHAPE_COLORS, sharpName, pretty } from '../../course/theory.js'

const props = defineProps({
  from:      { type: Number, default: 0 },
  to:        { type: Number, default: 12 },
  dots:      { type: Array, default: () => [] },
  labels:    { type: String, default: 'note' },     // note | degree | finger | none
  toggle:    { type: Boolean, default: true },      // offer the other label modes the dots support
  barre:     { type: Object, default: null },
  muted:     { type: Array, default: () => [] },
  boxes:     { type: Array, default: () => [] },
  focus:     { type: Array, default: () => [] },    // strings to bring forward
  clickable: { type: Boolean, default: false },
  play:      { type: String, default: '' },         // arp | updown | chord | seq
  caption:   { type: String, default: '' },
  openMidi:  { type: Array, default: () => OPEN_MIDI },  // pitch of each open string, s = 0 … 5
  fit:       { type: Boolean, default: false },          // always fit the width (no sideways scroll)
})
const emit = defineEmits(['pick'])

const { t } = useI18n()
const audio = useAudioStore()

const SINGLE = [3, 5, 7, 9, 15, 17, 19, 21]
const DOUBLE = [12, 24]
const COL = 50, ROW = 24, OPEN_W = 34, LEFT = 36

const hasBoxes = computed(() => props.boxes.length > 0)
const barMode = computed(() => props.boxes.length > 1)
const TOP = computed(() => (barMode.value ? 48 : hasBoxes.value ? 34 : 16))
const boxColor = b => b.color || SHAPE_COLORS[b.label] || 'var(--jd-amber)'
const boardTop = computed(() => TOP.value - ROW / 2 + 4)
const boardBottom = computed(() => TOP.value + 5 * ROW + ROW / 2 - 4)
const nutX = LEFT + OPEN_W
const boardLeft = computed(() => (props.from === 0 ? nutX : LEFT))

const fretList = computed(() => Array.from({ length: props.to - props.from + 1 }, (_, i) => props.from + i))
const wireList = computed(() => fretList.value.filter(f => f > 0))

function wireX(f) {
  if (props.from === 0) return f <= 0 ? (f < 0 ? LEFT : nutX) : nutX + f * COL
  return LEFT + (f - props.from + 1) * COL
}
function dotX(f) {
  if (props.from === 0) return f === 0 ? LEFT + OPEN_W / 2 : nutX + (f - 0.5) * COL
  return LEFT + (f - props.from + 0.5) * COL
}
const cellW = f => (props.from === 0 && f === 0 ? OPEN_W : COL)
const stringY = s => TOP.value + s * ROW

const W = computed(() => wireX(props.to) + 12)
const H = computed(() => boardBottom.value + 24)
// Wide windows keep a readable size and scroll sideways on small screens.
const minWidth = computed(() => Math.min(W.value, Math.max(320, W.value * 0.62)))
// Short windows are not blown up to the full width.
const maxWidth = computed(() => Math.round(W.value * 1.3))

const focusSet = computed(() => new Set(props.focus))
const isStandard = computed(() => props.openMidi.every((m, i) => m === OPEN_MIDI[i]))
const stringLetters = computed(() => (isStandard.value
  ? STRING_LETTERS
  : props.openMidi.map((m, s) => (s === 0 ? sharpName(m).toLowerCase() : sharpName(m)))))
const midiAt = (s, f) => props.openMidi[s] + f
const visibleDots = computed(() =>
  props.dots
    .filter(d => d.f >= props.from && d.f <= props.to)
    .sort((a, b) => (a.ghost === b.ghost ? 0 : a.ghost ? -1 : 1)))

// ── Labels ─────────────────────────────────────────────────────────────────────
const mode = ref(props.labels)
watch(() => props.labels, v => { mode.value = v })

const labelModes = computed(() => {
  if (!props.toggle) return []
  const real = props.dots.filter(d => !d.ghost && d.label === undefined)
  const modes = []
  if (real.some(d => d.note)) modes.push('note')
  if (real.some(d => d.deg)) modes.push('degree')
  if (real.some(d => d.finger)) modes.push('finger')
  return modes
})
const showBar = computed(() => !!props.play || labelModes.value.length > 1)

function labelOf(d) {
  if (d.label !== undefined) return String(d.label)
  if (mode.value === 'note') return d.note ? pretty(d.note) : ''
  if (mode.value === 'degree') return d.deg || ''
  if (mode.value === 'finger') return d.finger ? String(d.finger) : (d.f === 0 ? '0' : '')
  return ''
}
function fontFor(label) {
  if (label.includes('/')) return 7
  return label.length <= 2 ? 10 : label.length === 3 ? 8.5 : 7.5
}

const NEUTRAL = '#ede8df'
const fillOf = d => d.color || NEUTRAL
function textOn(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!m) return '#111'
  const n = parseInt(m[1], 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.55 ? '#141210' : '#fff'
}

const ariaLabel = computed(() => `${t('cr.diagram')} ${props.from}–${props.to}`)

// ── Sound ──────────────────────────────────────────────────────────────────────
const playing = ref(false)
const playingKey = ref('')
let timers = []

function clearTimers() { timers.forEach(clearTimeout); timers = [] }

async function playDots() {
  const notes = props.dots.filter(d => !d.ghost && !d.noPlay)
  if (!notes.length) return
  await audio.init()
  if (typeof Tone === 'undefined') return
  clearTimers()
  let seq, gap, dur
  if (props.play === 'chord') {
    seq = [...notes].sort((a, b) => b.s - a.s); gap = 0.04; dur = 2.2
  } else if (props.play === 'seq') {
    seq = notes; gap = 0.42; dur = 0.5
  } else {
    const byPitch = new Map()
    for (const d of notes) if (!byPitch.has(midiAt(d.s, d.f))) byPitch.set(midiAt(d.s, d.f), d)
    seq = [...byPitch.entries()].sort((a, b) => a[0] - b[0]).map(e => e[1])
    if (props.play === 'updown') seq = [...seq, ...seq.slice(0, -1).reverse()]
    gap = 0.3; dur = 0.45
  }
  playing.value = true
  const t0 = Tone.now() + 0.06
  seq.forEach((d, i) => {
    audio.playNotesAt([midiAt(d.s, d.f)], t0 + i * gap, dur, 0.55)
    timers.push(setTimeout(() => { playingKey.value = `${d.s}-${d.f}` }, 60 + i * gap * 1000))
  })
  timers.push(setTimeout(() => { playingKey.value = ''; playing.value = false }, 60 + seq.length * gap * 1000 + 250))
}

onUnmounted(clearTimers)
</script>

<style scoped>
.nd { margin: 16px 0; }
.nd-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.nd-bar-spacer { flex: 1; }
.nd-play {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--jd-mono); font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
  color: var(--jd-amber); background: rgba(255, 214, 10, 0.06);
  border: 1px solid var(--jd-line-strong); border-radius: 8px; padding: 5px 10px; cursor: pointer;
}
.nd-play svg { width: 12px; height: 12px; fill: currentColor; }
.nd-play:disabled { opacity: 0.5; cursor: default; }
.nd-seg { display: inline-flex; border: 1px solid var(--jd-line-strong); border-radius: 8px; overflow: hidden; }
.nd-seg-btn {
  font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; text-transform: uppercase;
  background: transparent; color: var(--jd-text-soft); border: 0; padding: 5px 10px; cursor: pointer;
}
.nd-seg-btn + .nd-seg-btn { border-left: 1px solid var(--jd-line-strong); }
.nd-seg-btn.on { background: rgba(255, 214, 10, 0.14); color: var(--jd-amber); }

.nd-scroll { overflow-x: auto; border-radius: 10px; }
.nd-svg { display: block; width: 100%; height: auto; margin: 0 auto; user-select: none; }

.nd-board { fill: #1b1815; }
.nd-inlay { fill: #3a342c; }
.nd-nut { stroke: #e8e2d0; stroke-width: 5; }
.nd-fret { stroke: #6f6a60; stroke-width: 1.6; }
.nd-fret--edge { stroke: #4a463f; stroke-dasharray: 3 3; }
.nd-string { stroke: #b9b2a3; opacity: 0.75; }
.nd-string--focus { stroke: var(--jd-amber); opacity: 1; }
.nd-string--dim { opacity: 0.3; }
.nd-string-label { font-family: var(--jd-mono); font-size: 9px; fill: var(--jd-text-soft); }
.nd-string-label.on { fill: var(--jd-amber); }
.nd-string-num { fill: var(--jd-muted); font-size: 8px; }
.nd-string-label.on .nd-string-num { fill: var(--jd-amber); }
.nd-muted { font-family: var(--jd-mono); font-size: 13px; fill: var(--jd-muted); }
.nd-barre { fill: rgba(255, 214, 10, 0.16); stroke: rgba(255, 214, 10, 0.55); stroke-width: 1; }
.nd-fretnum { font-family: var(--jd-mono); font-size: 9px; fill: var(--jd-mute-deep); }
.nd-fretnum.on { fill: var(--jd-text-soft); }
.nd-box-label { font-family: var(--jd-display); font-style: italic; font-size: 15px; }
.nd-bar-label { font-family: var(--jd-mono); font-size: 9px; font-weight: 700; fill: #141210; }

.nd-hit { cursor: pointer; }
.nd-hit-ring { fill: rgba(255, 214, 10, 0); stroke: rgba(255, 214, 10, 0); stroke-width: 1.5; transition: all 0.12s; }
.nd-hit:hover .nd-hit-ring { fill: rgba(255, 214, 10, 0.12); stroke: rgba(255, 214, 10, 0.6); }

.nd-dot circle { transition: fill 0.2s, r 0.15s; }
.nd-dot.ghost { opacity: 0.4; }
.nd-dot-label { font-family: var(--jd-mono); font-weight: 700; pointer-events: none; }
.nd-dot.playing circle { stroke: #fff; stroke-width: 3; }
.nd-dot.pulse circle { animation: nd-pulse 1.2s ease-in-out infinite; }
@keyframes nd-pulse { 50% { stroke-width: 5; stroke: var(--jd-amber); } }

.nd-caption { font-family: var(--jd-mono); font-size: 0.72em; color: var(--jd-muted); text-align: center; margin-top: 6px; line-height: 1.5; }
</style>
