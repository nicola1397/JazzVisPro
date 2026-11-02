<template>
  <div id="view-ear-playback" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('ep.title') }}</h1>
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
          <button class="jd-tbtn jd-tbtn--replay" @click="replay" :disabled="!target.length" aria-label="Replay">
            <svg viewBox="0 0 24 24"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
          </button>
        </div>
        <div class="jd-modes">
          <button class="jd-toolbtn" @click="reset">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-question-box">
        <div class="jd-question-text">{{ target.length ? questionTitle : t('ep.ready') }}</div>
        <div v-if="target.length" class="ep-sub">{{ questionSub }}</div>

        <div v-if="slots.length" class="ep-slots">
          <div v-for="(slot, i) in slots" :key="i" class="ep-slot" :class="[slot.state, { next: active && i === step }]">
            <span class="ep-slot-n">{{ i + 1 }}</span>
            <span class="ep-slot-note">{{ slot.played || slot.reveal || '?' }}</span>
          </div>
        </div>

        <div class="jd-question-hint">{{ statusText }}</div>
        <GuitarInputPanel :guitar="guitar" />
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="ep-settings">
        <div class="ep-setting">
          <span class="jd-feel-label">{{ t('ep.mode') }}</span>
          <div class="jd-modes">
            <label v-for="m in MODES" :key="m" class="jd-mode" :class="{ on: settings.mode === m }">
              <input type="radio" name="ep-mode" :checked="settings.mode === m" @change="settings.mode = m">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ep.mode-${m}`) }}</span>
            </label>
          </div>
        </div>
        <div class="ep-setting">
          <span class="jd-feel-label">{{ t('ep.start') }}</span>
          <div class="jd-modes">
            <label v-for="s in ['given', 'free']" :key="s" class="jd-mode" :class="{ on: settings.start === s }">
              <input type="radio" name="ep-start" :checked="settings.start === s" @change="settings.start = s">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ep.start-${s}`) }}</span>
            </label>
          </div>
        </div>
        <div class="ep-setting" v-if="settings.mode === 'interval'">
          <span class="jd-feel-label">{{ t('ep.intervals') }}</span>
          <select class="jd-feel-select" v-model="settings.intervals">
            <option value="easy">{{ t('ep.intervals-easy') }}</option>
            <option value="all">{{ t('ep.intervals-all') }}</option>
          </select>
        </div>
        <div class="ep-setting" v-if="settings.mode === 'phrase'">
          <span class="jd-feel-label">{{ t('ep.length') }}</span>
          <select class="jd-feel-select" v-model.number="settings.length">
            <option v-for="n in [3, 4, 5, 6]" :key="n" :value="n">{{ n }} {{ t('ep.notes') }}</option>
          </select>
        </div>
        <div class="ep-setting" v-if="settings.mode === 'phrase'">
          <span class="jd-feel-label">{{ t('ep.scale') }}</span>
          <select class="jd-feel-select" v-model="settings.scale">
            <option v-for="(s, key) in PHRASE_SCALES" :key="key" :value="key">{{ t(`ep.scale-${key}`) }}</option>
          </select>
        </div>
        <div class="ep-setting" v-if="settings.mode === 'arpeggio'">
          <span class="jd-feel-label">{{ t('ep.chords') }}</span>
          <select class="jd-feel-select" v-model="settings.chords">
            <option value="triads">{{ t('ep.chords-triads') }}</option>
            <option value="sevenths">{{ t('ep.chords-sevenths') }}</option>
            <option value="all">{{ t('ep.chords-all') }}</option>
          </select>
        </div>
        <div class="ep-setting" v-if="settings.mode !== 'phrase'">
          <span class="jd-feel-label">{{ t('ep.direction') }}</span>
          <select class="jd-feel-select" v-model="settings.direction">
            <option value="up">{{ t('ep.dir-up') }}</option>
            <option value="down">{{ t('ep.dir-down') }}</option>
            <option value="both">{{ t('ep.dir-both') }}</option>
          </select>
        </div>
        <div class="ep-setting">
          <span class="jd-feel-label">{{ t('ep.speed') }}</span>
          <select class="jd-feel-select" v-model.number="settings.gap">
            <option :value="700">{{ t('ep.speed-slow') }}</option>
            <option :value="480">{{ t('ep.speed-mid') }}</option>
            <option :value="330">{{ t('ep.speed-fast') }}</option>
          </select>
        </div>
      </div>
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('ep.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { usePracticeStore } from '../stores/practice.js'
import { useI18n }       from '../composables/useI18n.js'
import { useGuitarInput, midiToName } from '../composables/useGuitarInput.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { getAbsoluteNote } from '../utils/theory.js'
import GuitarInputPanel  from '../components/shared/GuitarInputPanel.vue'

const appStore = useAppStore()
const audio    = useAudioStore()
const practice = usePracticeStore()
const { t }    = useI18n()
const guitar   = useGuitarInput({ onNote: ({ midi }) => handleNote({ midi }) })

const MODES = ['interval', 'phrase', 'arpeggio']
const PHRASE_SCALES = {
  major:      [0, 2, 4, 5, 7, 9, 11],
  dorian:     [0, 2, 3, 5, 7, 9, 10],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  pentatonic: [0, 3, 5, 7, 10],
  blues:      [0, 3, 5, 6, 7, 10],
}
const ARPEGGIOS = {
  maj: [0, 4, 7, 12], min: [0, 3, 7, 12], dim: [0, 3, 6, 12], aug: [0, 4, 8, 12],
  maj7: [0, 4, 7, 11], dom7: [0, 4, 7, 10], m7: [0, 3, 7, 10], m7b5: [0, 3, 6, 10],
}
const TRIADS = ['maj', 'min', 'dim', 'aug']
const SEVENTHS = ['maj7', 'dom7', 'm7', 'm7b5']
const INTERVALS_EASY = [2, 3, 4, 5, 7]
const INTERVALS_ALL  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const INTERVAL_NAMES = {
  it: ['Unisono', '2ª minore', '2ª maggiore', '3ª minore', '3ª maggiore', '4ª giusta', 'Tritono', '5ª giusta', '6ª minore', '6ª maggiore', '7ª minore', '7ª maggiore', 'Ottava'],
  en: ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'],
}
const STORAGE_KEY = 'jazzVizEarPlayback'
const SELF_SOUND_HOLDOFF_MS = 600

// ── Settings (remembered) ─────────────────────────────────────────────────────
const defaults = { mode: 'interval', start: 'given', intervals: 'easy', length: 4, scale: 'major', chords: 'triads', direction: 'both', gap: 480 }
const settings = reactive({ ...defaults, ...(readStorage(STORAGE_KEY, {}) || {}) })
if (!MODES.includes(settings.mode)) settings.mode = defaults.mode
if (!PHRASE_SCALES[settings.scale]) settings.scale = defaults.scale

// ── State ─────────────────────────────────────────────────────────────────────
const score  = ref(0)
const total  = ref(0)
const target = ref([])          // MIDI notes played by the app
const info   = ref({})          // what the question was: { key, solution }
const slots  = ref([])          // { state, played, reveal }
const active = ref(false)
const step   = ref(0)
const statusText = ref(t('ep.status'))
let offset = null               // transposition chosen by the first note played
let accepted = []
let timers = []
let nextTimer = null

const pcOf = m => ((m % 12) + 12) % 12
const noteName = m => midiToName(m, appStore.currentNotes)
const rand = n => Math.floor(Math.random() * n)
const pick = list => list[rand(list.length)]

const questionTitle = computed(() => {
  const n = target.value.length
  if (settings.mode === 'interval') return t('ep.q-interval')
  return t(settings.mode === 'phrase' ? 'ep.q-phrase' : 'ep.q-arpeggio').replace('{0}', n)
})
const questionSub = computed(() => {
  if (!active.value && info.value.solution) return info.value.solution
  return settings.start === 'given'
    ? t('ep.start-on').replace('{0}', appStore.currentNotes[pcOf(target.value[0])])
    : t('ep.start-anywhere')
})

// ── Question generation ───────────────────────────────────────────────────────
function directionSign() {
  return settings.direction === 'up' ? 1 : settings.direction === 'down' ? -1 : pick([1, -1])
}

function makeInterval() {
  const pool = settings.intervals === 'easy' ? INTERVALS_EASY : INTERVALS_ALL
  const dirs = settings.direction === 'both' ? [1, -1] : [settings.direction === 'up' ? 1 : -1]
  const combos = pool.flatMap(iv => dirs.map(d => d * iv))
  const signed = practice.pickWeighted('ear-playback', combos, c => `i:${c}`)
  const first = 50 + rand(10) + (signed < 0 ? 5 : 0)
  const name = INTERVAL_NAMES[appStore.lang === 'it' ? 'it' : 'en'][Math.abs(signed)]
  return { notes: [first, first + signed], key: `i:${signed}`, solution: `${name} ${signed > 0 ? '↑' : '↓'}` }
}

function makePhrase() {
  const steps = PHRASE_SCALES[settings.scale]
  const root = 48 + rand(12)
  const pool = []
  for (let o = -12; o <= 24; o += 12) steps.forEach(s => pool.push(root + o + s))
  const inRange = pool.filter(m => m >= root - 5 && m <= root + 16)
  let idx = inRange.indexOf(root)
  const notes = [root]
  while (notes.length < settings.length) {
    const r = Math.random()
    const size = r < 0.65 ? 1 : r < 0.9 ? 2 : 3
    let next = idx + (Math.random() < 0.5 ? -size : size)
    if (next < 0 || next >= inRange.length) next = idx + (idx + size < inRange.length ? size : -size)
    if (next === idx || next < 0 || next >= inRange.length) continue
    idx = next
    notes.push(inRange[idx])
  }
  const scaleName = t(`ep.scale-${settings.scale}`)
  return { notes, key: `p:${settings.scale}`, solution: `${appStore.currentNotes[pcOf(root)]} ${scaleName}: ${notes.map(noteName).join(' ')}` }
}

function makeArpeggio() {
  const names = settings.chords === 'triads' ? TRIADS : settings.chords === 'sevenths' ? SEVENTHS : [...TRIADS, ...SEVENTHS]
  const quality = practice.pickWeighted('ear-playback', names, q => `a:${q}`)
  const root = 45 + rand(12)
  const sign = directionSign()
  let notes = ARPEGGIOS[quality].map(iv => root + iv)
  if (sign < 0) notes = notes.reverse()
  return {
    notes, key: `a:${quality}`,
    solution: `${appStore.currentNotes[pcOf(root)]} ${t(`ct.q-${quality}`)} ${sign > 0 ? '↑' : '↓'}`,
  }
}

// ── Fretboard ─────────────────────────────────────────────────────────────────
function circles() {
  return document.querySelectorAll('.fretboard-layer .note-circle')
}

function clearBoard() {
  circles().forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
}

function paint(el, color, label, ring = false) {
  if (!el) return
  el.style.transition = 'all 0.2s ease'
  el.style.backgroundColor = color
  el.style.opacity = '1'
  el.style.color = 'rgba(0,0,0,0.8)'
  el.innerText = label
  if (ring) { el.style.border = '2px solid white'; el.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)' }
}

// One way to play the phrase: the positions that move the least along the neck.
function fingering(midis) {
  const tuning = appStore.currentTuning
  const options = midis.map(m => {
    const list = []
    for (let s = 0; s < 6; s++) {
      const f = m - getAbsoluteNote(tuning, s, 0)
      if (f >= 0 && f <= 17) list.push({ s, f })
    }
    return list
  })
  if (options.some(o => !o.length)) return []
  const move = (a, b) => Math.abs(a.f - b.f) + 0.6 * Math.abs(a.s - b.s) + (Math.abs(a.f - b.f) > 4 ? 4 : 0)
  let best = options[0].map(o => ({ cost: Math.max(0, o.f - 9) * 0.4, path: [o] }))
  for (let i = 1; i < options.length; i++) {
    best = options[i].map(o => {
      let winner = null
      for (const prev of best) {
        const cost = prev.cost + move(prev.path[prev.path.length - 1], o)
        if (!winner || cost < winner.cost) winner = { cost, path: [...prev.path, o] }
      }
      return winner
    })
  }
  return best.reduce((a, b) => (a.cost <= b.cost ? a : b)).path
}

function showSolution(midis) {
  fingering(midis).forEach(({ s, f }, i) => {
    const el = document.querySelector(`.fretboard-layer .note-circle[data-string-index="${s}"][data-fret-index="${f}"]`)
    if (el && !el.dataset.epPlayed) paint(el, i === 0 ? '#e74c3c' : '#FFD60A', String(i + 1), true)
  })
}

// ── Flow ──────────────────────────────────────────────────────────────────────
function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

async function playTarget() {
  await audio.init()
  clearTimers()
  target.value.forEach((m, i) => {
    timers.push(setTimeout(() => {
      guitar.holdOff(SELF_SOUND_HOLDOFF_MS, m)
      audio.playNoteImmediate(m, settings.gap / 1000 * 0.9, 0.5, 'Electric Piano')
    }, i * settings.gap))
  })
}

function start() {
  clearTimeout(nextTimer)
  const q = settings.mode === 'interval' ? makeInterval() : settings.mode === 'phrase' ? makePhrase() : makeArpeggio()
  target.value = q.notes
  info.value = { key: q.key, solution: q.solution }
  slots.value = q.notes.map(() => ({ state: '', played: '', reveal: '' }))
  step.value = 0; offset = null; accepted = []
  active.value = true
  statusText.value = t('ep.hint')
  clearBoard()
  circles().forEach(c => { delete c.dataset.epPlayed })
  playTarget()
}

function replay() {
  if (target.value.length) playTarget()
}

function reset() {
  clearTimeout(nextTimer); clearTimers()
  score.value = 0; total.value = 0
  active.value = false
  target.value = []; slots.value = []
  statusText.value = t('ep.status')
  clearBoard()
}

function scheduleNext(delay) {
  clearTimeout(nextTimer)
  if (!guitar.enabled || !guitar.autoNext) return
  nextTimer = setTimeout(() => { if (guitar.enabled && guitar.autoNext) start() }, delay)
}

function finish(ok, message, wrongNote) {
  active.value = false
  total.value++
  if (ok) score.value++
  const el = wrongNote?.element
  practice.record('ear-playback', info.value.key, ok, el ? { s: +el.dataset.stringIndex, f: +el.dataset.fretIndex } : {})
  // Expected notes in the key the answer started from (or the closest octave).
  const shift = offset ?? (wrongNote ? Math.round((wrongNote.midi - target.value[0]) / 12) * 12 : 0)
  const expected = target.value.map(m => m + shift)
  slots.value.forEach((slot, i) => { if (!slot.played) slot.reveal = noteName(expected[i]) })
  showSolution(expected)
  statusText.value = message
  scheduleNext(ok ? 2000 : 3200)
}

function handleNote(note) {
  if (!active.value) return
  const i = step.value
  const slot = slots.value[i]
  if (i === 0) {
    if (settings.start === 'given' && pcOf(note.midi) !== pcOf(target.value[0])) {
      slot.state = 'wrong'; slot.played = noteName(note.midi)
      markClick(note, false)
      return finish(false, t('ep.wrong-start').replace('{0}', appStore.currentNotes[pcOf(target.value[0])]), note)
    }
    offset = note.midi - target.value[0]
  } else {
    const want = target.value[i] + offset
    if (note.midi !== want) {
      // With the guitar, a note of the phrase still ringing is not a new one.
      if (!note.element && accepted.includes(note.midi)) { guitar.allowRepeat(pcOf(want)); return }
      slot.state = 'wrong'; slot.played = noteName(note.midi)
      markClick(note, false)
      const msg = pcOf(note.midi) === pcOf(want) ? t('ep.wrong-octave') : t('ep.wrong-note')
      return finish(false, msg.replace('{0}', noteName(want)), note)
    }
  }
  slot.state = 'ok'; slot.played = noteName(note.midi)
  accepted.push(note.midi)
  markClick(note, true)
  step.value++
  if (step.value === target.value.length) return finish(true, t('ep.correct'))
  guitar.allowRepeat(pcOf(target.value[step.value] + offset))
}

function markClick(note, ok) {
  if (!note.element) return
  note.element.dataset.epPlayed = '1'
  paint(note.element, ok ? '#2ecc71' : '#e74c3c', ok ? String(step.value + 1) : appStore.currentNotes[pcOf(note.midi)])
}

async function onNoteClick(e) {
  const { midiNote, element } = e.detail
  await audio.init()
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, midiNote)
  audio.playChord([0], midiNote, 0, 0.6, 0.2, 'Electric Piano')
  handleNote({ midi: midiNote, element })
}

watch(settings, () => {
  writeStorage(STORAGE_KEY, { ...settings })
  if (target.value.length) reset()
}, { deep: true })

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  clearBoard()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  clearTimeout(nextTimer); clearTimers()
})
</script>

<style scoped>
.jd-question-box {
  background: rgba(58, 154, 217, 0.05);
  border: 1px solid rgba(58, 154, 217, 0.2);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  margin: 10px 0;
  position: relative;
  z-index: 1;
}
.jd-question-text { font-size: 30px; font-weight: 900; letter-spacing: 1px; color: var(--jd-synth); }
.ep-sub { font-family: var(--jd-mono); font-size: 12px; letter-spacing: 1px; color: var(--jd-text-soft); margin-top: 8px; }
.jd-question-hint { font-size: 14px; color: var(--jd-muted); margin-top: 14px; min-height: 20px; }
.ep-slots { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 18px; }
.ep-slot {
  width: 52px; height: 56px; border: 1px solid var(--jd-line-strong); border-radius: 10px;
  background: rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; align-items: center;
  justify-content: center; gap: 4px; font-family: var(--jd-mono); transition: all 0.15s;
}
.ep-slot-n { font-size: 10px; color: var(--jd-muted); }
.ep-slot-note { font-size: 13px; font-weight: 800; color: var(--jd-text-soft); }
.ep-slot.next { border-color: var(--jd-amber); box-shadow: 0 0 10px rgba(255, 214, 10, 0.25); }
.ep-slot.ok { border-color: var(--jd-green); background: rgba(46, 204, 113, 0.10); }
.ep-slot.ok .ep-slot-note { color: var(--jd-text); }
.ep-slot.wrong { border-color: var(--jd-red); background: rgba(255, 69, 58, 0.10); }
.ep-slot.wrong .ep-slot-note { color: var(--jd-red); }
.ep-settings { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 28px; }
.ep-setting { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.jd-score-badge { display: flex; flex-direction: column; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 5px 15px; border-radius: 10px; border: 1px solid var(--jd-line); }
.jd-score-val { font-weight: 800; font-size: 16px; }
.jd-score-label { font-size: 9px; color: var(--jd-muted); text-transform: uppercase; letter-spacing: 1px; }
</style>
