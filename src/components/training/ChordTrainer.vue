<template>
  <div :id="cfg.viewId" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t(`${cfg.prefix}.title`) }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-master">
        <div class="jd-score-badge">
          <span class="jd-score-val">{{ score }} / {{ total }}</span>
          <span class="jd-score-label">{{ t('label.score') }}</span>
        </div>

        <div class="jd-transport">
          <button class="jd-tbtn jd-tbtn--play" @click="start" :aria-label="t('aria.start-next')">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!question" :aria-label="t('aria.replay')">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <button class="jd-toolbtn" @click="reset">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box">
        <div class="jd-question-text">{{ question ? chordName : t('ct.ready') }}</div>
        <div v-if="question" class="tt-question-sub">{{ questionSub }}</div>

        <div v-if="slots.length" class="tt-slots">
          <div v-for="g in groupCount" :key="g" class="tt-group">
            <div
              v-for="slot in slots.filter(s => s.group === g - 1)"
              :key="slot.id"
              class="tt-slot"
              :class="[slot.state, { next: isNext(slot) }]"
            >
              <span class="tt-slot-fn" :style="{ color: INTERVAL_COLORS[slot.interval].color }">{{ slot.label }}</span>
              <span class="tt-slot-note">{{ slot.played || '·' }}</span>
            </div>
          </div>
        </div>

        <div class="jd-question-hint">{{ statusText }}</div>
        <button v-if="active && settings.retry && misses > 0" type="button" class="jd-toolbtn tt-solution" @click="giveUp">{{ t('pm.show-solution') }}</button>
        <GuitarInputPanel :guitar="guitar" />
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="tt-settings">
        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('ct.mode') }}</span>
          <div class="jd-modes">
            <label v-for="m in MODES" :key="m" class="jd-mode" :class="{ on: settings.mode === m }">
              <input type="radio" :name="`${kind}-mode`" :checked="settings.mode === m" @change="settings.mode = m">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ modeLabel(m) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('ct.chords') }}</span>
          <div class="jd-modes">
            <label v-for="q in qualityKeys" :key="q" class="jd-mode" :class="{ on: settings.qualities.includes(q) }">
              <input type="checkbox" :checked="settings.qualities.includes(q)" @change="toggleIn('qualities', q)">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ct.q-${q}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting" v-if="settings.mode !== 'chord' && cfg.voicings.length > 1">
          <span class="jd-feel-label">{{ t('ct.voicings') }}</span>
          <div class="jd-modes">
            <label v-for="v in cfg.voicings" :key="v" class="jd-mode" :class="{ on: settings.voicings.includes(v) }">
              <input type="checkbox" :checked="settings.voicings.includes(v)" @change="toggleIn('voicings', v)">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ct.v-${v}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting" v-if="settings.mode !== 'chord'">
          <span class="jd-feel-label">{{ settings.mode === 'cycle' ? t('ct.start-from') : t('ct.inversions') }}</span>
          <div class="jd-modes">
            <label v-for="k in inversionKeys" :key="k" class="jd-mode" :class="{ on: settings.inversions.includes(k) }">
              <input type="checkbox" :checked="settings.inversions.includes(k)" @change="toggleIn('inversions', k)">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ct.inv-${k}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('ct.root') }}</span>
          <select class="jd-feel-select" v-model.number="settings.root" :aria-label="t('ct.root')">
            <option :value="-1">{{ t('ct.random') }}</option>
            <option v-for="(n, i) in appStore.currentNotes" :key="i" :value="i">{{ n }}</option>
          </select>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>
      <PracticeModes
        v-model:reference="settings.reference"
        v-model:retry="settings.retry"
        :reference-label="t('pm.ref-chord')"
        :reference-help="t('pm.help-ct')"
      />
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t(`${cfg.prefix}.instructions`) }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../../stores/app.js'
import { useAudioStore } from '../../stores/audio.js'
import { useI18n }       from '../../composables/useI18n.js'
import { useGuitarInput, fretboardCirclesForMidi, midiToName } from '../../composables/useGuitarInput.js'
import { readStorage, writeStorage } from '../../composables/useLocalStorage.js'
import { usePracticeStore } from '../../stores/practice.js'
import { INTERVAL_COLORS, getAbsoluteNote } from '../../utils/theory.js'
import { FRETS } from '../../utils/constants.js'
import {
  stringSetName, zoneName, randomZone, inZone, playableInZone, cagedOptions, midiAt,
  paintArea, paintRing, flashWrong, clearArea, pickOne,
} from '../../utils/fretRefs.js'
import GuitarInputPanel from '../shared/GuitarInputPanel.vue'
import PracticeModes from '../shared/PracticeModes.vue'

// Chord tone exercise shared by "Triadi e Rivolti" and "Settime e Drop":
// - chord:   the chord tones in any order and octave;
// - voicing: one voicing (close, drop 2, drop 3) with a given chord tone in
//            the bass, played low to high;
// - cycle:   every inversion in a row going up: each voice moves to the next chord tone.
const props = defineProps({
  kind: { type: String, required: true },   // 'triads' | 'sevenths'
})

const KINDS = {
  triads: {
    prefix: 'tt',
    viewId: 'view-triad-trainer',
    storageKey: 'jazzVizTriadTrainer',
    qualities: {
      maj:  { tones: [0, 4, 7], labels: ['R', '3', '5'],   symbol: ''     },
      min:  { tones: [0, 3, 7], labels: ['R', 'b3', '5'],  symbol: 'm'    },
      dim:  { tones: [0, 3, 6], labels: ['R', 'b3', 'b5'], symbol: 'dim'  },
      aug:  { tones: [0, 4, 8], labels: ['R', '3', '#5'],  symbol: 'aug'  },
      sus2: { tones: [0, 2, 7], labels: ['R', '2', '5'],   symbol: 'sus2' },
      sus4: { tones: [0, 5, 7], labels: ['R', '4', '5'],   symbol: 'sus4' },
    },
    defaultQualities: ['maj', 'min'],
    voicings: ['close'],
    maxStretch: 4,
  },
  sevenths: {
    prefix: 'st',
    viewId: 'view-seventh-trainer',
    storageKey: 'jazzVizSeventhTrainer',
    qualities: {
      maj7:     { tones: [0, 4, 7, 11], labels: ['R', '3', '5', 'maj7'],   symbol: 'maj7'    },
      dom7:     { tones: [0, 4, 7, 10], labels: ['R', '3', '5', '7'],      symbol: '7'       },
      m7:       { tones: [0, 3, 7, 10], labels: ['R', 'b3', '5', '7'],     symbol: 'm7'      },
      m7b5:     { tones: [0, 3, 6, 10], labels: ['R', 'b3', 'b5', '7'],    symbol: 'm7b5'    },
      dim7:     { tones: [0, 3, 6, 9],  labels: ['R', 'b3', 'b5', 'bb7'],  symbol: 'dim7'    },
      mMaj7:    { tones: [0, 3, 7, 11], labels: ['R', 'b3', '5', 'maj7'],  symbol: 'm(maj7)' },
      dom7sus4: { tones: [0, 5, 7, 10], labels: ['R', '4', '5', '7'],      symbol: '7sus4'   },
    },
    defaultQualities: ['maj7', 'dom7', 'm7', 'm7b5'],
    voicings: ['close', 'drop2', 'drop3'],
    maxStretch: 5,
  },
}

const cfg = KINDS[props.kind]
const QUALITIES = cfg.qualities
const qualityKeys = Object.keys(QUALITIES)
const SIZE = QUALITIES[qualityKeys[0]].tones.length
const inversionKeys = [...Array(SIZE).keys()]
const MODES = ['chord', 'voicing', 'cycle']
// While the app plays a note, a microphone may hear it: ignore those pitches for a moment.
const SELF_SOUND_HOLDOFF_MS = 600

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()
const fmt = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))
const guitar   = useGuitarInput({ onNote: onGuitarNote })
const practice = usePracticeStore()

// ── Settings (remembered) ─────────────────────────────────────────────────────
// reference: each question also says where to play (string set, CAGED shape or zone of frets);
// retry: a wrong note does not end the question
const defaults = { mode: 'chord', qualities: cfg.defaultQualities, voicings: [cfg.voicings[0]], inversions: inversionKeys, root: -1, reference: false, retry: false }
const stored = readStorage(cfg.storageKey, {}) || {}
const LEGACY_MODES = { triad: 'chord', inversion: 'voicing' }   // first version of the triad exercise
const settings = reactive({ ...defaults, ...stored })
settings.mode = LEGACY_MODES[settings.mode] || settings.mode
if (!MODES.includes(settings.mode)) settings.mode = defaults.mode
for (const [key, valid] of [['qualities', qualityKeys], ['voicings', cfg.voicings], ['inversions', inversionKeys]]) {
  settings[key] = (Array.isArray(settings[key]) ? settings[key] : []).filter(v => valid.includes(v))
  if (!settings[key].length) settings[key] = [...defaults[key]]
}

function toggleIn(key, value) {
  const list = settings[key]
  if (list.includes(value)) {
    if (list.length > 1) settings[key] = list.filter(v => v !== value)   // keep at least one
  } else {
    settings[key] = [...list, value]
  }
}

function modeLabel(m) {
  return m === 'cycle' ? t('ct.mode-cycle') : t(`${cfg.prefix}.mode-${m}`)
}

// ── State ─────────────────────────────────────────────────────────────────────
const score      = ref(0)
const total      = ref(0)
const question   = ref(null)   // { rootPc, quality, voicing, bass, ref? }
const misses     = ref(0)      // wrong attempts on the current question (retry mode)
const slots      = ref([])     // notes to play: { id, group, idx, pc, interval, label, state, played }
const statusText = ref(t('ct.status'))
const active     = ref(false)
const step       = ref(0)      // ordered modes: index of the next slot
let expected  = null           // ordered modes: exact MIDI notes, known once the bass is played
let accepted  = []             // MIDI notes accepted in this attempt
let marked    = new Set()      // fretboard circles painted during this attempt
let nextTimer = null

const groupCount = computed(() => settings.mode === 'cycle' ? SIZE : 1)
const chordName  = computed(() => {
  const q = question.value
  return q ? appStore.currentNotes[q.rootPc] + QUALITIES[q.quality].symbol : ''
})
const questionSub = computed(() => {
  const q = question.value
  if (!q) return ''
  const parts = [t(`ct.q-${q.quality}`)]
  if (settings.mode !== 'chord' && cfg.voicings.length > 1) parts.push(t(`ct.v-${q.voicing}`))
  if (settings.mode === 'voicing') parts.push(t(`ct.inv-${q.bass}`))
  if (settings.mode === 'cycle') parts.push(t('ct.cycle-from').replace('{0}', t(`ct.inv-${q.bass}`)))
  if (q.ref) parts.push(refText(q.ref))
  return parts.join(' · ')
})

function isNext(slot) {
  return active.value && settings.mode !== 'chord' && slots.value[step.value] === slot
}

// ── Theory helpers ────────────────────────────────────────────────────────────
const pcOf = m => ((m % 12) + 12) % 12

// Chord tones (index into the chord) low to high, with semitones above the bass.
// Close position stacks them from the bass; drop 2 / drop 3 take the close voicing
// that has the wanted bass as 2nd / 3rd voice from the top and drop it an octave.
function voicingLayout(tones, voicing, bassIdx) {
  const n = tones.length
  const start = voicing === 'drop2' ? bassIdx - 2 : voicing === 'drop3' ? bassIdx - 1 : bassIdx
  const notes = []
  let prev = -Infinity
  for (let i = 0; i < n; i++) {
    const idx = (((start + i) % n) + n) % n
    let v = tones[idx]
    while (v <= prev) v += 12
    notes.push({ idx, v })
    prev = v
  }
  if (voicing === 'drop2') notes[n - 2].v -= 12
  if (voicing === 'drop3') notes[n - 3].v -= 12
  notes.sort((a, b) => a.v - b.v)
  return notes.map(x => ({ idx: x.idx, offset: x.v - notes[0].v }))
}

function chordTone(q, idx) {
  const def = QUALITIES[q.quality]
  return { idx, pc: (q.rootPc + def.tones[idx]) % 12, interval: def.tones[idx], label: def.labels[idx] }
}

function buildSlots(q) {
  let id = 0
  if (settings.mode === 'chord') {
    return inversionKeys.map(idx => ({ id: id++, group: 0, ...chordTone(q, idx), state: '', played: '' }))
  }
  const tones = QUALITIES[q.quality].tones
  return Array.from({ length: groupCount.value }, (_, g) =>
    voicingLayout(tones, q.voicing, (q.bass + g) % SIZE).map(({ idx }) => ({
      id: id++, group: g, ...chordTone(q, idx), state: '', played: '',
    })),
  ).flat()
}

function nextAbove(midi, pc) {
  let m = midi + 1
  while (pcOf(m) !== pc) m++
  return m
}

// Exact notes of the ordered modes, from the bass actually played.
function expectedFrom(bassMidi) {
  const q = question.value
  const tones = QUALITIES[q.quality].tones
  let voices = voicingLayout(tones, q.voicing, q.bass).map(({ idx, offset }) => ({ idx, midi: bassMidi + offset }))
  const out = voices.map(v => v.midi)
  for (let g = 1; g < groupCount.value; g++) {
    voices = voices
      .map(({ idx, midi }) => {
        const next = (idx + 1) % SIZE
        return { idx: next, midi: nextAbove(midi, chordTone(q, next).pc) }
      })
      .sort((a, b) => a.midi - b.midi)
    out.push(...voices.map(v => v.midi))
  }
  return out
}

// String sets (low to high) where each voicing is usually played.
function stringSets(voicing) {
  const sets = []
  if (voicing === 'drop3') {
    for (let s = 0; s + 4 <= 5; s++) sets.push([s + 4, s + 2, s + 1, s])   // one string skipped above the bass
  } else {
    for (let s = 0; s + SIZE - 1 <= 5; s++) sets.push(Array.from({ length: SIZE }, (_, i) => s + SIZE - 1 - i))
  }
  return sets
}

function voicingShapes(midis, voicing) {
  const tuning = appStore.currentTuning
  const shapes = []
  for (const strings of stringSets(voicing)) {
    const frets = strings.map((str, i) => midis[i] - getAbsoluteNote(tuning, str, 0))
    if (frets.some(f => f < 0 || f > FRETS)) continue
    const fretted = frets.filter(f => f > 0)
    if (fretted.length && Math.max(...fretted) - Math.min(...fretted) > cfg.maxStretch) continue
    shapes.push(strings.map((str, i) => ({ s: str, f: frets[i] })))
  }
  return shapes
}

// ── Reference mode ────────────────────────────────────────────────────────────
// The notes of a voicing on one string set (low to high), or null if it does not fit.
function shapeOnSet(midis, strings) {
  const tuning = appStore.currentTuning
  const frets = strings.map((str, i) => midis[i] - getAbsoluteNote(tuning, str, 0))
  if (frets.some(f => f < 0 || f > FRETS)) return null
  const fretted = frets.filter(f => f > 0)
  if (fretted.length && Math.max(...fretted) - Math.min(...fretted) > cfg.maxStretch) return null
  return strings.map((str, i) => ({ s: str, f: frets[i] }))
}

// Does the voicing (every inversion, in the cycle) from this bass fit on the string set?
function fitsOnSet(strings, bassMidi) {
  return groupsOf(expectedFrom(bassMidi)).every(midis => shapeOnSet(midis, strings))
}

// Where the question must be played: a string set (inversions), a CAGED shape (major and
// minor triads) or a zone of frets (other chords).
function chooseRef(q) {
  if (!settings.reference) return null
  const tuning = appStore.currentTuning
  if (settings.mode !== 'chord') {
    const bassPc = slots.value[0].pc
    const sets = stringSets(q.voicing).filter(strings => {
      for (let f = 0; f <= 12; f++) {
        const m = getAbsoluteNote(tuning, strings[0], f)
        if (pcOf(m) === bassPc && fitsOnSet(strings, m)) return true
      }
      return false
    })
    return sets.length ? { type: 'strings', strings: pickOne(sets) } : null
  }
  if (props.kind === 'triads' && ['maj', 'min'].includes(q.quality) && appStore.tuningName === 'E Standard') {
    const options = cagedOptions(tuning, q.rootPc, q.quality, 15)
    if (options.length) return { type: 'caged', ...pickOne(options) }
  }
  return { type: 'zone', zone: randomZone() }
}

// Inside a sentence: "(sulle corde 3-2-1)"
const refInline = r => { const x = refText(r); return x.charAt(0).toLowerCase() + x.slice(1) }

function refText(r) {
  const lang = appStore.lang
  if (r.type === 'strings') return fmt('pm.q-strings', stringSetName(r.strings, lang))
  if (r.type === 'caged') return fmt('pm.q-caged', r.name)
  return fmt('pm.q-zone', zoneName(r.zone, lang))
}

// Chord mode: is this note inside the CAGED shape / zone asked?
function inChordRef(r, note, pos) {
  const tuning = appStore.currentTuning
  if (r.type === 'caged') {
    return pos ? r.shape.some(p => p.s === pos.s && p.f === pos.f) : r.shape.some(p => midiAt(tuning, p) === note.midi)
  }
  return pos ? inZone(pos.f, r.zone) : playableInZone(tuning, note.midi, r.zone)
}

function paintRef(r) {
  if (!r) return
  if (r.type === 'strings') paintArea(s => r.strings.includes(s))
  else if (r.type === 'zone') paintArea((s, f) => inZone(f, r.zone))
  else paintRing(r.root, 'R', INTERVAL_COLORS[0].color)
}

function noteName(midi) {
  return midiToName(midi, appStore.currentNotes)
}

// ── Fretboard painting ────────────────────────────────────────────────────────
function circles() {
  return document.querySelectorAll('.fretboard-layer .note-circle')
}

function circleAt(s, f) {
  return document.querySelector(`.fretboard-layer .note-circle[data-string-index="${s}"][data-fret-index="${f}"]`)
}

function clearBoard() {
  circles().forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
  marked = new Set()
}

function paint(el, { color, label, opacity = '1', ring = false }) {
  if (!el) return
  el.style.transition = 'all 0.2s ease'
  el.style.backgroundColor = color
  el.style.opacity = opacity
  el.style.color = 'rgba(0,0,0,0.8)'
  el.innerText = label
  if (ring) { el.style.border = '2px solid white'; el.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)' }
}

function slotForPc(pc) {
  return slots.value.find(s => s.pc === pc)
}

function groupsOf(midis) {
  return Array.from({ length: groupCount.value }, (_, g) => midis.slice(g * SIZE, g * SIZE + SIZE))
}

// After an attempt: every chord tone on the neck, plus the voicing(s) on string sets.
function reveal(voicings) {
  clearArea()
  const r = question.value.ref
  const pcs = new Set(slots.value.map(s => s.pc))
  if (r?.type === 'caged') {
    // the shape asked, every note of it
    r.shape.forEach(p => {
      const c = circleAt(p.s, p.f)
      if (!c || marked.has(c)) return
      const slot = slotForPc(parseInt(c.dataset.noteIndex))
      if (slot) paint(c, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label, ring: true })
    })
    return false   // shown, but it is not a fingering on a string set
  }
  circles().forEach(c => {
    const pc = parseInt(c.dataset.noteIndex)
    if (!pcs.has(pc) || marked.has(c)) return
    if (r?.type === 'zone' && !inZone(+c.dataset.fretIndex, r.zone)) return
    if (r?.type === 'strings' && !r.strings.includes(+c.dataset.stringIndex)) return
    const slot = slotForPc(pc)
    paint(c, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label, opacity: '0.35' })
  })
  let shown = false
  voicings.forEach(midis => {
    let shapes = voicingShapes(midis, question.value.voicing)
    if (r?.type === 'strings') shapes = shapes.filter(sh => sh.every((p, i) => p.s === r.strings[i]))
    const cells = shapes.length
      ? shapes.flat().map(({ s, f }) => circleAt(s, f))
      : midis.flatMap(m => fretboardCirclesForMidi(appStore.currentTuning, m))
    cells.forEach(c => {
      if (!c || marked.has(c)) return
      const slot = slotForPc(parseInt(c.dataset.noteIndex))
      paint(c, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label, ring: true })
    })
    shown = shown || shapes.length > 0
  })
  return shown
}

// ── Game flow ─────────────────────────────────────────────────────────────────
// Practice history key: the chord type, plus voicing and bass in the ordered modes.
function itemKey(q) {
  return settings.mode === 'chord' ? q.quality : `${q.quality}|${q.voicing}|${q.bass}`
}

// Chord types / voicings answered wrong come back more often.
function pickQuestion() {
  const prev = question.value
  const ordered = settings.mode !== 'chord'
  const combos = settings.qualities.flatMap(quality =>
    (ordered ? settings.voicings : ['close']).flatMap(voicing =>
      (ordered ? settings.inversions : [0]).map(bass => ({ quality, voicing, bass }))))
  for (let tries = 0; tries < 20; tries++) {
    const q = {
      rootPc: settings.root >= 0 ? settings.root : Math.floor(Math.random() * 12),
      ...practice.pickWeighted(props.kind, combos, c => itemKey(c)),
    }
    if (!prev || ['rootPc', 'quality', 'voicing', 'bass'].some(k => q[k] !== prev[k])) return q
  }
  return prev
}

function hintText() {
  return settings.mode === 'cycle' ? t('ct.hint-cycle') : t(`${cfg.prefix}.hint-${settings.mode}`)
}

async function start() {
  clearTimeout(nextTimer)
  question.value = pickQuestion()
  slots.value = buildSlots(question.value)
  step.value = 0; expected = null; accepted = []
  misses.value = 0
  question.value = { ...question.value, ref: chooseRef(question.value) }
  active.value = true
  statusText.value = hintText()
  clearBoard()
  paintRef(question.value.ref)
  await audio.init()
  playPrompt()
}

async function replay() {
  if (!question.value) return
  await audio.init()
  playPrompt()
}

// The chord as asked: root position, or the requested voicing.
function playPrompt() {
  const q = question.value
  const tones = QUALITIES[q.quality].tones
  const voicing = settings.mode === 'chord'
    ? tones
    : voicingLayout(tones, q.voicing, q.bass).map(({ offset }) => tones[q.bass] + offset)
  voicing.forEach(iv => guitar.holdOff(SELF_SOUND_HOLDOFF_MS, q.rootPc + iv))
  audio.playChord(voicing, q.rootPc, 0, 1.2, 0.2, 'Electric Piano', 4)
}

function playNotes(midis) {
  const low = Math.min(...midis)
  midis.forEach(m => guitar.holdOff(SELF_SOUND_HOLDOFF_MS, m))
  audio.playChord(midis.map(m => m - low), low, 0, 1.2, 0.2, 'Electric Piano')
}

function reset() {
  clearTimeout(nextTimer)
  score.value = 0; total.value = 0
  endQuestion()
}

function endQuestion() {
  active.value = false
  question.value = null
  slots.value = []
  statusText.value = t('ct.status')
  clearBoard()
}

// Next question without leaving the guitar, when auto-advance is on.
// Next question: always in retry mode once the answer is right, otherwise without leaving
// the guitar when auto-advance is on.
function scheduleNext(delay, right = false) {
  clearTimeout(nextTimer)
  const auto = (right && settings.retry) || (guitar.enabled && guitar.autoNext)
  if (!auto) return
  nextTimer = setTimeout(() => { if (!active.value) start() }, delay)
}

function accept(slot, note) {
  slot.state = 'ok'
  slot.played = noteName(note.midi)
  accepted.push(note.midi)
  if (note.element) {
    paint(note.element, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label })
    marked.add(note.element)
  }
}

function succeed(fromClick) {
  active.value = false
  total.value++
  if (misses.value === 0) score.value++
  practice.record(props.kind, itemKey(question.value), true, { guitar: !fromClick })
  const voicings = settings.mode === 'chord' ? [] : groupsOf(expected)
  if (settings.mode === 'chord' && !fromClick) {
    // Show where the pitches just played lie on the neck.
    accepted.forEach(m => fretboardCirclesForMidi(appStore.currentTuning, m).forEach(c => {
      const slot = slotForPc(pcOf(m))
      paint(c, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label, ring: true })
      marked.add(c)
    }))
  }
  const shapesShown = reveal(voicings)
  statusText.value = (misses.value ? fmt('pm.right-after', misses.value + 1) : t('ct.correct')) + (shapesShown ? ' ' + t('ct.shapes') : '')
  if (fromClick) setTimeout(() => playNotes(accepted.slice(-SIZE)), 350)
  scheduleNext(settings.mode === 'cycle' ? 2500 : 1800, true)
}

// `place`: the note is right but not where the reference asks.
function fail(note, message, slot, place = false) {
  if (settings.retry) {
    misses.value++
    const where = note.element
      ? { s: parseInt(note.element.dataset.stringIndex), f: parseInt(note.element.dataset.fretIndex) }
      : { guitar: true }
    practice.record(props.kind, itemKey(question.value), false, where)
    const cells = note.element ? [note.element] : fretboardCirclesForMidi(appStore.currentTuning, note.midi)
    cells.forEach(c => { if (!marked.has(c)) flashWrong(c, appStore.currentNotes[pcOf(note.midi)]) })
    statusText.value = place ? fmt('pm.wrong-place', refInline(question.value.ref)) : fmt('pm.retry-wrong', noteName(note.midi))
    return
  }
  active.value = false
  total.value++
  const pos = note.element
    ? { s: parseInt(note.element.dataset.stringIndex), f: parseInt(note.element.dataset.fretIndex) }
    : { guitar: true }
  practice.record(props.kind, itemKey(question.value), false, pos)
  if (slot) { slot.state = 'wrong'; slot.played = noteName(note.midi) }
  const wrongCells = note.element ? [note.element] : fretboardCirclesForMidi(appStore.currentTuning, note.midi)
  wrongCells.forEach(c => {
    paint(c, { color: '#e74c3c', label: appStore.currentNotes[pcOf(note.midi)], ring: !note.element })
    marked.add(c)
  })
  // Show the voicing that was asked, from the bass played or the closest one.
  let voicings = []
  if (settings.mode !== 'chord') {
    if (!expected && question.value.ref?.type === 'strings') {
      expected = expectedFrom(defaultBass())
    } else if (!expected) {
      let bass = note.midi - 6
      while (pcOf(bass) !== slots.value[0].pc) bass++
      expected = expectedFrom(bass)
    }
    voicings = groupsOf(expected)
  }
  reveal(voicings)
  statusText.value = message
  scheduleNext(3000)
}

// A bass for showing the voicing when none was played: on the string set asked, or near E3.
function defaultBass() {
  const r = question.value.ref
  const pc = slots.value[0].pc
  if (r?.type === 'strings') {
    for (let f = 0; f <= FRETS; f++) {
      const m = getAbsoluteNote(appStore.currentTuning, r.strings[0], f)
      if (pcOf(m) === pc && fitsOnSet(r.strings, m)) return m
    }
  }
  let bass = 46
  while (pcOf(bass) !== pc) bass++
  return bass
}

// Retry mode: stop trying and see the answer.
function giveUp() {
  if (!active.value) return
  active.value = false
  total.value++
  let voicings = []
  if (settings.mode !== 'chord') {
    if (!expected) expected = expectedFrom(defaultBass())
    voicings = groupsOf(expected)
  }
  reveal(voicings)
  statusText.value = t('pm.solution-shown')
  scheduleNext(3000)
}

// `note`: { midi, element? } — `element` is the clicked circle (absent for the guitar).
function handleNote(note) {
  if (!active.value) return
  const pc = pcOf(note.midi)
  const chordPcs = new Set(slots.value.map(s => s.pc))

  const r = question.value.ref
  const pos = note.element ? { s: parseInt(note.element.dataset.stringIndex), f: parseInt(note.element.dataset.fretIndex) } : null

  if (settings.mode === 'chord') {
    const slot = slotForPc(pc)
    if (!slot) return fail(note, t('ct.wrong-note').replace('{0}', noteName(note.midi)))
    if (r && !inChordRef(r, note, pos)) return fail(note, fmt('pm.wrong-place', refInline(r)), null, true)
    if (slot.state === 'ok') return   // the same chord tone again (another octave): fine
    accept(slot, note)
    if (slots.value.every(s => s.state === 'ok')) succeed(!!note.element)
    return
  }

  const slot = slots.value[step.value]
  if (step.value === 0) {
    if (pc !== slot.pc) {
      return fail(note, t('ct.wrong-bass').replace('{0}', appStore.currentNotes[slot.pc]).replace('{1}', slot.label), slot)
    }
    // On the string set asked: the bass on its lowest string, with room for the whole voicing.
    if (r && ((pos && pos.s !== r.strings[0]) || !fitsOnSet(r.strings, note.midi))) {
      return fail(note, fmt('pm.wrong-place', refInline(r)), slot, true)
    }
    expected = expectedFrom(note.midi)
  } else if (note.midi !== expected[step.value]) {
    const want = expected[step.value]
    // With the guitar, strings of the shape still ringing, re-picked or heard an
    // octave low are not a new note.
    if (!note.element && chordPcs.has(pc) && (note.midi < want || accepted.includes(note.midi))) {
      guitar.allowRepeat(slot.pc)   // the wanted note may share this pitch class
      return
    }
    if (pc === slot.pc) return fail(note, t('ct.wrong-octave').replace('{0}', noteName(want)), slot)
    return fail(note, t('ct.wrong-next').replace('{0}', noteName(want)).replace('{1}', slot.label), slot)
  } else if (r && pos && pos.s !== r.strings[step.value % SIZE]) {
    // right pitch on another string: the shape asked uses one note per string of the set
    return fail(note, fmt('pm.wrong-place', refInline(r)), slot, true)
  }

  accept(slot, note)
  step.value++
  if (step.value === slots.value.length) return succeed(!!note.element)
  // Across inversions the next note may be one just played: let it count again.
  guitar.allowRepeat(slots.value[step.value].pc)
}

async function onNoteClick(e) {
  const { midiNote, element } = e.detail
  await audio.init()
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, midiNote)
  audio.playChord([0], midiNote, 0, 0.8, 0.2, 'Electric Piano')
  handleNote({ midi: midiNote, element })
}

function onGuitarNote({ midi }) {
  handleNote({ midi })
}

// Changing the exercise drops the current question.
watch(settings, () => {
  writeStorage(cfg.storageKey, { ...settings })
  clearTimeout(nextTimer)
  if (question.value) endQuestion()
}, { deep: true })

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  clearBoard()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  clearTimeout(nextTimer)
})
</script>

<style scoped>
.jd-question-box {
  background: rgba(156, 92, 255, 0.05);
  border: 1px solid rgba(156, 92, 255, 0.18);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin: 10px 0;
  position: relative;
  z-index: 1;
}

.jd-question-text {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--jd-bass);
}

.tt-solution {
  margin-top: 12px;
  border-color: var(--jd-line-strong);
  color: var(--jd-text-soft);
}

.tt-question-sub {
  font-family: var(--jd-mono);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--jd-text-soft);
  margin-top: 6px;
}

.jd-question-hint {
  font-size: 14px;
  color: var(--jd-muted);
  margin-top: 14px;
  min-height: 20px;
}

.tt-settings {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px 28px;
}

.tt-setting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.tt-slots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px 22px;
  margin-top: 18px;
}

.tt-group {
  display: flex;
  gap: 6px;
}

.tt-slot {
  width: 52px;
  height: 56px;
  border: 1px solid var(--jd-line-strong);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: var(--jd-mono);
  transition: all 0.15s;
}

.tt-slot-fn {
  font-size: 14px;
  font-weight: 800;
}

.tt-slot-note {
  font-size: 11px;
  font-weight: 700;
  color: var(--jd-muted);
}

.tt-slot.next {
  border-color: var(--jd-amber);
  box-shadow: 0 0 10px rgba(255, 214, 10, 0.25);
}

.tt-slot.ok {
  border-color: var(--jd-green);
  background: rgba(46, 204, 113, 0.10);
}

.tt-slot.ok .tt-slot-note {
  color: var(--jd-text);
}

.tt-slot.wrong {
  border-color: var(--jd-red);
  background: rgba(255, 69, 58, 0.10);
}

.tt-slot.wrong .tt-slot-note {
  color: var(--jd-red);
}

.jd-score-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid var(--jd-line);
}

.jd-score-val {
  font-weight: 800;
  font-size: 16px;
}

.jd-score-label {
  font-size: 9px;
  color: var(--jd-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
