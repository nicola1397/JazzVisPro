<template>
  <div id="view-triad-trainer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('tt.title') }}</h1>
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
          <button class="jd-tbtn jd-tbtn--play" @click="start" aria-label="Start / Next">
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!question" aria-label="Replay">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <button class="jd-toolbtn" @click="reset">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box">
        <div class="jd-question-text">{{ question ? chordName : t('tt.ready') }}</div>
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
        <GuitarInputPanel :guitar="guitar" />
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="tt-settings">
        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('tt.mode') }}</span>
          <div class="jd-modes">
            <label v-for="m in MODES" :key="m" class="jd-mode" :class="{ on: settings.mode === m }">
              <input type="radio" name="tt-mode" :checked="settings.mode === m" @change="settings.mode = m">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`tt.mode-${m}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('tt.chords') }}</span>
          <div class="jd-modes">
            <label v-for="q in QUALITY_KEYS" :key="q" class="jd-mode" :class="{ on: settings.qualities.includes(q) }">
              <input type="checkbox" :checked="settings.qualities.includes(q)" @change="toggleIn('qualities', q)">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`tt.q-${q}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting" v-if="settings.mode !== 'triad'">
          <span class="jd-feel-label">{{ settings.mode === 'cycle' ? t('tt.start-from') : t('tt.inversions') }}</span>
          <div class="jd-modes">
            <label v-for="k in [0, 1, 2]" :key="k" class="jd-mode" :class="{ on: settings.inversions.includes(k) }">
              <input type="checkbox" :checked="settings.inversions.includes(k)" @change="toggleIn('inversions', k)">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`tt.inv-${k}`) }}</span>
            </label>
          </div>
        </div>

        <div class="tt-setting">
          <span class="jd-feel-label">{{ t('tt.root') }}</span>
          <select class="jd-feel-select" v-model.number="settings.root" :aria-label="t('tt.root')">
            <option :value="-1">{{ t('tt.random') }}</option>
            <option v-for="(n, i) in appStore.currentNotes" :key="i" :value="i">{{ n }}</option>
          </select>
        </div>
      </div>
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('tt.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { useI18n }       from '../composables/useI18n.js'
import { useGuitarInput, fretboardCirclesForMidi, midiToName } from '../composables/useGuitarInput.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { INTERVAL_COLORS, getAbsoluteNote } from '../utils/theory.js'
import { STRINGS, FRETS } from '../utils/constants.js'
import GuitarInputPanel  from '../components/shared/GuitarInputPanel.vue'

const appStore = useAppStore()
const audio    = useAudioStore()
const { t }    = useI18n()
const guitar   = useGuitarInput({ onNote: onGuitarNote })

const MODES = ['triad', 'inversion', 'cycle']
const QUALITIES = {
  maj:  { tones: [0, 4, 7], labels: ['R', '3', '5'],   symbol: ''     },
  min:  { tones: [0, 3, 7], labels: ['R', 'b3', '5'],  symbol: 'm'    },
  dim:  { tones: [0, 3, 6], labels: ['R', 'b3', 'b5'], symbol: 'dim'  },
  aug:  { tones: [0, 4, 8], labels: ['R', '3', '#5'],  symbol: 'aug'  },
  sus2: { tones: [0, 2, 7], labels: ['R', '2', '5'],   symbol: 'sus2' },
  sus4: { tones: [0, 5, 7], labels: ['R', '4', '5'],   symbol: 'sus4' },
}
const QUALITY_KEYS = Object.keys(QUALITIES)
const STORAGE_KEY  = 'jazzVizTriadTrainer'
// While the app plays a note, a microphone may hear it: ignore those pitches for a moment.
const SELF_SOUND_HOLDOFF_MS = 600
const MAX_SHAPE_STRETCH = 4   // frets spanned by a playable shape on three adjacent strings

// ── Settings (remembered) ─────────────────────────────────────────────────────
const defaults = { mode: 'triad', qualities: ['maj', 'min'], inversions: [0, 1, 2], root: -1 }
const settings = reactive({ ...defaults, ...(readStorage(STORAGE_KEY, {}) || {}) })
if (!MODES.includes(settings.mode)) settings.mode = defaults.mode
settings.qualities  = settings.qualities.filter(q => QUALITIES[q])
settings.inversions = settings.inversions.filter(k => [0, 1, 2].includes(k))
if (!settings.qualities.length)  settings.qualities  = [...defaults.qualities]
if (!settings.inversions.length) settings.inversions = [...defaults.inversions]

function toggleIn(key, value) {
  const list = settings[key]
  if (list.includes(value)) {
    if (list.length > 1) settings[key] = list.filter(v => v !== value)   // keep at least one
  } else {
    settings[key] = [...list, value]
  }
}

// ── State ─────────────────────────────────────────────────────────────────────
const score      = ref(0)
const total      = ref(0)
const question   = ref(null)   // { rootPc, quality, inversion }
const slots      = ref([])     // notes to play: { id, group, pc, interval, label, state, played }
const statusText = ref(t('tt.status'))
const active   = ref(false)
const step     = ref(0)        // ordered modes: index of the next slot
let expected  = null           // ordered modes: exact MIDI notes, known once the bass is played
let accepted  = []             // MIDI notes accepted in this attempt
let marked    = new Set()      // fretboard circles painted during this attempt
let nextTimer = null

const groupCount = computed(() => settings.mode === 'cycle' ? 3 : 1)
const chordName  = computed(() => {
  const q = question.value
  return q ? appStore.currentNotes[q.rootPc] + QUALITIES[q.quality].symbol : ''
})
const questionSub = computed(() => {
  const q = question.value
  if (!q) return ''
  const quality = t(`tt.q-${q.quality}`)
  if (settings.mode === 'inversion') return `${quality} · ${t(`tt.inv-${q.inversion}`)}`
  if (settings.mode === 'cycle') return `${quality} · ${t('tt.cycle-from').replace('{0}', t(`tt.inv-${q.inversion}`))}`
  return quality
})

function isNext(slot) {
  return active.value && settings.mode !== 'triad' && slots.value[step.value] === slot
}

// ── Theory helpers ────────────────────────────────────────────────────────────
const pcOf = m => ((m % 12) + 12) % 12

function chordTone(q, idx) {
  const def = QUALITIES[q.quality]
  return { pc: (q.rootPc + def.tones[idx]) % 12, interval: def.tones[idx], label: def.labels[idx] }
}

// Slots in playing order: the three chord tones (any order), one inversion
// low to high, or three inversions in a row, each starting one chord tone higher.
function buildSlots(q) {
  const groups = settings.mode === 'triad' ? [0] : settings.mode === 'inversion' ? [q.inversion]
    : [0, 1, 2].map(g => (q.inversion + g) % 3)
  let id = 0
  return groups.flatMap((inv, g) => [0, 1, 2].map(i => ({
    id: id++, group: g, ...chordTone(q, (inv + i) % 3), state: '', played: '',
  })))
}

function nextAbove(midi, pc) {
  let m = midi + 1
  while (pcOf(m) !== pc) m++
  return m
}

// Exact notes of the ordered modes in close position, from the bass actually played.
function expectedFrom(bassMidi) {
  const out = []
  for (let g = 0; g < groupCount.value; g++) {
    const group = slots.value.filter(s => s.group === g)
    let m = g === 0 ? bassMidi : out[(g - 1) * 3 + 1]
    out.push(m)
    for (let i = 1; i < 3; i++) { m = nextAbove(m, group[i].pc); out.push(m) }
  }
  return out
}

// Where a close voicing lies on three adjacent strings within a comfortable stretch.
function voicingShapes(midis) {
  const tuning = appStore.currentTuning
  const shapes = []
  for (let s = 0; s + 2 < STRINGS; s++) {
    const strings = [s + 2, s + 1, s]           // low to high
    const frets = strings.map((str, i) => midis[i] - getAbsoluteNote(tuning, str, 0))
    if (frets.some(f => f < 0 || f > FRETS)) continue
    const fretted = frets.filter(f => f > 0)
    if (fretted.length && Math.max(...fretted) - Math.min(...fretted) > MAX_SHAPE_STRETCH) continue
    shapes.push(strings.map((str, i) => ({ s: str, f: frets[i] })))
  }
  return shapes
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

// After an attempt: every chord tone on the neck, plus the voicing(s) on string sets.
function reveal(voicings) {
  const pcs = new Set(slots.value.map(s => s.pc))
  circles().forEach(c => {
    const pc = parseInt(c.dataset.noteIndex)
    if (!pcs.has(pc) || marked.has(c)) return
    const slot = slotForPc(pc)
    paint(c, { color: INTERVAL_COLORS[slot.interval].color, label: slot.label, opacity: '0.35' })
  })
  let shown = false
  voicings.forEach(midis => {
    const shapes = voicingShapes(midis)
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
function pickQuestion() {
  const prev = question.value
  for (let tries = 0; tries < 20; tries++) {
    const q = {
      rootPc: settings.root >= 0 ? settings.root : Math.floor(Math.random() * 12),
      quality: settings.qualities[Math.floor(Math.random() * settings.qualities.length)],
      inversion: settings.mode === 'triad' ? 0 : settings.inversions[Math.floor(Math.random() * settings.inversions.length)],
    }
    if (!prev || q.rootPc !== prev.rootPc || q.quality !== prev.quality || q.inversion !== prev.inversion) return q
  }
  return prev
}

function hintText() {
  return t(`tt.hint-${settings.mode}`)
}

async function start() {
  clearTimeout(nextTimer)
  question.value = pickQuestion()
  slots.value = buildSlots(question.value)
  step.value = 0; expected = null; accepted = []
  active.value = true
  statusText.value = hintText()
  clearBoard()
  await audio.init()
  playPrompt()
}

async function replay() {
  if (!question.value) return
  await audio.init()
  playPrompt()
}

// The chord as asked: root position, or the requested inversion in close position.
function playPrompt() {
  const q = question.value
  const tones = QUALITIES[q.quality].tones
  const voicing = settings.mode === 'triad' ? tones
    : [0, 1, 2].map(i => tones[(q.inversion + i) % 3] + (q.inversion + i >= 3 ? 12 : 0))
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
  statusText.value = t('tt.status')
  clearBoard()
}

// Next question without leaving the guitar, when auto-advance is on.
function scheduleNext(delay) {
  clearTimeout(nextTimer)
  if (!guitar.enabled || !guitar.autoNext) return
  nextTimer = setTimeout(() => {
    if (guitar.enabled && guitar.autoNext) start()
  }, delay)
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
  score.value++; total.value++
  const voicings = settings.mode === 'triad'
    ? [] : Array.from({ length: groupCount.value }, (_, g) => expected.slice(g * 3, g * 3 + 3))
  if (settings.mode === 'triad' && !fromClick) {
    // Show where the pitches just played lie on the neck.
    accepted.forEach(m => fretboardCirclesForMidi(appStore.currentTuning, m).forEach(c => {
      paint(c, { color: INTERVAL_COLORS[slotForPc(pcOf(m)).interval].color, label: slotForPc(pcOf(m)).label, ring: true })
      marked.add(c)
    }))
  }
  const shapesShown = reveal(voicings)
  statusText.value = t('tt.correct') + (shapesShown ? ' ' + t('tt.shapes') : '')
  if (fromClick) setTimeout(() => playNotes(accepted.slice(-3)), 350)
  scheduleNext(settings.mode === 'cycle' ? 2500 : 1800)
}

function fail(note, message, slot) {
  active.value = false
  total.value++
  if (slot) { slot.state = 'wrong'; slot.played = noteName(note.midi) }
  const wrongCells = note.element ? [note.element] : fretboardCirclesForMidi(appStore.currentTuning, note.midi)
  wrongCells.forEach(c => {
    paint(c, { color: '#e74c3c', label: appStore.currentNotes[pcOf(note.midi)], ring: !note.element })
    marked.add(c)
  })
  // Show the voicing that was asked, from the bass played or the closest one.
  let voicings = []
  if (settings.mode !== 'triad') {
    if (!expected) {
      let bass = note.midi - 6
      while (pcOf(bass) !== slots.value[0].pc) bass++
      expected = expectedFrom(bass)
    }
    voicings = Array.from({ length: groupCount.value }, (_, g) => expected.slice(g * 3, g * 3 + 3))
  }
  reveal(voicings)
  statusText.value = message
  scheduleNext(3000)
}

// `note`: { midi, element? } — `element` is the clicked circle (absent for the guitar).
function handleNote(note) {
  if (!active.value) return
  const pc = pcOf(note.midi)
  const chordPcs = new Set(slots.value.map(s => s.pc))

  if (settings.mode === 'triad') {
    const slot = slotForPc(pc)
    if (!slot) return fail(note, t('tt.wrong-note').replace('{0}', noteName(note.midi)))
    if (slot.state === 'ok') return   // the same chord tone again (another octave): fine
    accept(slot, note)
    if (slots.value.every(s => s.state === 'ok')) succeed(!!note.element)
    return
  }

  const slot = slots.value[step.value]
  if (step.value === 0) {
    if (pc !== slot.pc) {
      return fail(note, t('tt.wrong-bass').replace('{0}', appStore.currentNotes[slot.pc]).replace('{1}', slot.label), slot)
    }
    expected = expectedFrom(note.midi)
  } else if (note.midi !== expected[step.value]) {
    const want = expected[step.value]
    // With the guitar, strings of the shape still ringing, re-picked or heard an
    // octave low are not a new note.
    if (!note.element && chordPcs.has(pc) && (note.midi < want || accepted.includes(note.midi))) return
    if (pc === slot.pc) return fail(note, t('tt.wrong-octave').replace('{0}', noteName(want)), slot)
    return fail(note, t('tt.wrong-next').replace('{0}', noteName(want)).replace('{1}', slot.label), slot)
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
  writeStorage(STORAGE_KEY, { ...settings })
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
