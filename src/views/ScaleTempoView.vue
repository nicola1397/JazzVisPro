<template>
  <div id="view-scale-tempo" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('sc.title') }}</h1>
      </div>
    </header>

    <section class="jd-console" :class="{ 'jd-playing': running }">
      <div class="jd-grain" aria-hidden="true"></div>

      <StageHud :label="t('sc.title')">
        <template #score>
          <div class="jd-score-badge">
            <span class="jd-score-val">{{ cleanRuns }}</span>
            <span class="jd-score-label">{{ t('sc.clean-runs') }}</span>
          </div>
        </template>

        <div class="jd-question-text">{{ countLeft > 0 ? countLeft : scaleTitle }}</div>
        <div class="sc-sub">{{ scaleSub }}</div>

        <div class="sc-slots">
          <div v-for="(slot, i) in seq" :key="i" class="sc-slot" :class="[slot.state, { next: running && i === step }]" :data-ideal="slot.ideal"
            :title="slot.delta !== null ? deltaText(slot.delta) : ''">
            <span class="sc-slot-deg">{{ slot.label }}</span>
            <span class="sc-slot-note">{{ slot.name }}</span>
          </div>
        </div>

        <div class="jd-question-hint">{{ statusText }}</div>

        <template #actions>
          <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': running }" @click="running ? stop() : run()"
            :aria-label="running ? 'Stop' : 'Play'">
            <svg v-if="!running" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
          </button>
        </template>
      </StageHud>

      <div class="jd-master sc-master">
        <div class="jd-bpm">
          <div class="jd-bpm-frame">
            <span class="jd-bpm-led" :class="{ on: running }" aria-hidden="true"></span>
            <input type="number" class="jd-bpm-input" v-model.number="settings.bpm" min="40" max="300" :disabled="running" :aria-label="t('label.bpm')">
            <span class="jd-bpm-unit">{{ t('label.bpm') }}</span>
          </div>
        </div>
      </div>

      <div class="stage-rest">
        <!-- Timing of each note -->
        <div v-if="timing.length" class="sc-timing">
          <div class="jd-section-label"><span>{{ t('sc.timing-title') }}</span><span class="jd-section-rule"></span></div>
          <div class="sc-chart" role="img" :aria-label="timingAria">
            <div class="sc-band" :style="{ top: yOf(tolerance) + 'px', height: (yOf(-tolerance) - yOf(tolerance)) + 'px' }"></div>
            <div class="sc-zero" :style="{ top: yOf(0) + 'px' }"></div>
            <span v-for="(p, i) in timing" :key="i" class="sc-hit" tabindex="0"
              :style="{ left: xOf(i) + '%', top: yOf(p.delta) + 'px' }" :title="`${p.name}: ${deltaText(p.delta)}`">
              <i class="sc-dot" :class="{ off: Math.abs(p.delta) > tolerance }"></i>
            </span>
          </div>
          <div class="sc-axis"><span>{{ t('sc.late') }} +{{ chartRange }} ms</span><span>{{ t('sc.early') }} −{{ chartRange }} ms</span></div>
          <p class="sc-summary">{{ summaryText }}</p>
        </div>

        <GuitarInputPanel :guitar="guitar" />
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="sc-settings">
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('sc.scale') }}</span>
          <select class="jd-feel-select" v-model="settings.scale" :disabled="running">
            <option v-for="name in scaleNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('ct.root') }}</span>
          <select class="jd-feel-select" v-model.number="settings.root" :disabled="running">
            <option :value="-1">{{ t('ct.random') }}</option>
            <option v-for="(n, i) in appStore.currentNotes" :key="i" :value="i">{{ n }}</option>
          </select>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('sc.octaves') }}</span>
          <select class="jd-feel-select" v-model.number="settings.octaves" :disabled="running">
            <option :value="1">1</option><option :value="2">2</option>
          </select>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('ep.direction') }}</span>
          <select class="jd-feel-select" v-model="settings.direction" :disabled="running">
            <option value="up">{{ t('ep.dir-up') }}</option>
            <option value="updown">{{ t('sc.updown') }}</option>
          </select>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('sc.sub') }}</span>
          <select class="jd-feel-select" v-model.number="settings.sub" :disabled="running">
            <option :value="1">{{ t('sc.sub-1') }}</option>
            <option :value="2">{{ t('sc.sub-2') }}</option>
            <option :value="3">{{ t('sc.sub-3') }}</option>
            <option :value="4">{{ t('sc.sub-4') }}</option>
          </select>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('sc.speed-up') }}</span>
          <div class="sc-row">
            <label class="jd-mode" :class="{ on: settings.speedUp }">
              <input type="checkbox" v-model="settings.speedUp">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">+{{ settings.step }} → {{ settings.targetBpm }}</span>
            </label>
            <input type="number" class="sc-num" v-model.number="settings.targetBpm" min="40" max="300" :aria-label="t('sc.target-bpm')">
          </div>
        </div>
        <div class="sc-setting">
          <span class="jd-feel-label">{{ t('sc.latency') }}</span>
          <div class="sc-row">
            <span class="sc-latency">{{ latency }} ms</span>
            <button class="jd-toolbtn" :disabled="running" @click="calibrate">{{ t('sc.calibrate') }}</button>
          </div>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>
      <PracticeModes
        v-model:reference="settings.reference"
        :reference-label="t('pm.ref-position')"
        :reference-help="t('pm.help-sc')"
        :show-retry="false"
      />
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('sc.instructions') }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAppStore }   from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { usePracticeStore } from '../stores/practice.js'
import { useI18n }       from '../composables/useI18n.js'
import { useGuitarInput } from '../composables/useGuitarInput.js'
import { audioTimeToPerf } from '../composables/useBackingTrack.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { getInputLatency, setInputLatency } from '../utils/latency.js'
import { SCALES, INTERVAL_COLORS, getAbsoluteNote } from '../utils/theory.js'
import { stringName, zoneName, inZone, positionsOfMidi, pickOne } from '../utils/fretRefs.js'
import GuitarInputPanel  from '../components/shared/GuitarInputPanel.vue'
import StageHud from '../components/shared/StageHud.vue'
import PracticeModes     from '../components/shared/PracticeModes.vue'

const appStore = useAppStore()
const audio    = useAudioStore()
const practice = usePracticeStore()
const { t }    = useI18n()
const guitar   = useGuitarInput({ onNote: ({ midi, time }) => onNote({ midi, rawTime: time, time: time - latency.value }) })
const fmt = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))

const STORAGE_KEY = 'jazzVizScaleTempo'
const CHART_H = 120
const COUNT_IN = 4
const scaleNames = Object.keys(SCALES)

// reference: the scale in one position (root at a given string and fret, every note in a zone)
const defaults = { scale: 'Ionio (Maj7)', root: 0, octaves: 1, direction: 'updown', sub: 2, bpm: 70, speedUp: true, targetBpm: 140, step: 4, reference: false }
const settings = reactive({ ...defaults, ...(readStorage(STORAGE_KEY, {}) || {}) })
if (!SCALES[settings.scale]) settings.scale = defaults.scale

const latency    = ref(getInputLatency())
const running    = ref(false)
const countLeft  = ref(0)
const seq        = ref([])        // { pc, iv, label, name, state, delta, ideal }
const step       = ref(0)
const rootPc     = ref(settings.root >= 0 ? settings.root : 0)
const statusText = ref(t('sc.status'))
const timing     = ref([])        // { name, delta } of the notes played in place
const cleanRuns  = ref(0)
const summaryText = ref('')
const position   = ref(null)      // reference mode: { root: { s, f }, rootMidi, zone }
let wrongNotes = 0
let firstBeat = 0                 // performance time of the first note's beat
let subMs = 0
let timer = null, endTimer = null, nextBeatTime = 0, beatsScheduled = 0, totalBeats = 0
let calibrating = false, calibBeats = [], calibNotes = []

const tolerance = computed(() => Math.round(Math.min(60, subMs * 0.3) || 60))
const chartRange = computed(() => Math.max(100, Math.min(250, Math.ceil(Math.max(...timing.value.map(p => Math.abs(p.delta)), 0) / 50) * 50)))
// x in % of the width, y in px from the top (late notes above the line)
const xOf = i => timing.value.length < 2 ? 50 : 2 + (i * 96) / (timing.value.length - 1)
const yOf = ms => CHART_H / 2 - (Math.max(-chartRange.value, Math.min(chartRange.value, ms)) / chartRange.value) * (CHART_H / 2 - 8)
const timingAria = computed(() => timing.value.map(p => `${p.name} ${deltaText(p.delta)}`).join(', '))

const scaleTitle = computed(() => `${appStore.currentNotes[rootPc.value]} ${settings.scale}`)
const scaleSub = computed(() => [
  `${settings.octaves} ${settings.octaves === 1 ? t('sc.octave') : t('sc.octaves-word')}`,
  settings.direction === 'up' ? t('ep.dir-up') : t('sc.updown'),
  t(`sc.sub-${settings.sub}`),
  `${settings.bpm} bpm`,
  ...(position.value ? [fmt('pm.q-position', zoneName(position.value.zone, appStore.lang), stringName(position.value.root.s, appStore.lang))] : []),
].join(' · '))

// ── Reference mode: one position ──────────────────────────────────────────────
// The root on the 6th or 5th string, and the narrowest zone of frets (5, then 6) around it
// where every note of the run can be played.
function choosePosition() {
  const tuning = appStore.currentTuning
  const options = []
  for (const s of [5, 4]) {
    for (let f = 1; f <= 12; f++) {
      const rootMidi = getAbsoluteNote(tuning, s, f)
      if (rootMidi % 12 !== rootPc.value) continue
      const midis = seq.value.map(x => rootMidi + x.iv)
      const zone = [5, 6].flatMap(w => [f - 2, f - 1, f].map(lo => ({ lo: Math.max(0, lo), hi: Math.max(0, lo) + w - 1 })))
        .find(z => z.lo <= f && z.hi >= f && midis.every(m => positionsOfMidi(tuning, m, (_, ff) => inZone(ff, z)).length))
      if (zone) options.push({ root: { s, f }, rootMidi, zone })
    }
  }
  return options.length ? pickOne(options) : null
}

// Does a note match this slot? By pitch class, or in reference mode by exact pitch in the zone.
function matches(slot, midi, fret) {
  if (!slot) return false
  if (!position.value) return ((midi % 12) + 12) % 12 === slot.pc
  return midi === position.value.rootMidi + slot.iv && (fret === undefined || inZone(fret, position.value.zone))
}

function deltaText(ms) {
  const v = Math.round(ms)
  return v === 0 ? t('sc.on-time') : v > 0 ? `+${v} ms ${t('sc.late-word')}` : `${v} ms ${t('sc.early-word')}`
}

// ── Sequence ──────────────────────────────────────────────────────────────────
function buildSequence() {
  const ivs = SCALES[settings.scale]
  const up = []
  for (let o = 0; o < settings.octaves; o++) ivs.forEach(iv => up.push(iv + 12 * o))
  up.push(12 * settings.octaves)
  const all = settings.direction === 'updown' ? [...up, ...up.slice(0, -1).reverse()] : up
  return all.map(iv => {
    const pc = (rootPc.value + iv) % 12
    return { pc, iv, label: INTERVAL_COLORS[iv % 12].short, name: appStore.currentNotes[pc], state: '', delta: null, ideal: 0 }
  })
}

// ── Fretboard: the scale, the next note brighter ──────────────────────────────
function paintBoard() {
  const pcs = new Map(seq.value.map(s => [s.pc, s]))
  const next = running.value ? seq.value[step.value]?.pc : -1
  const pos = position.value
  const tuning = appStore.currentTuning
  // in reference mode: only the notes of the run, inside the zone
  const runMidis = pos ? new Set(seq.value.map(x => pos.rootMidi + x.iv)) : null
  const nextMidi = pos && running.value && seq.value[step.value] ? pos.rootMidi + seq.value[step.value].iv : null
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    const pc = parseInt(c.dataset.noteIndex)
    const sIdx = +c.dataset.stringIndex, fIdx = +c.dataset.fretIndex
    const midi = getAbsoluteNote(tuning, sIdx, fIdx)
    const s = pos ? (runMidis.has(midi) && inZone(fIdx, pos.zone) ? pcs.get(pc) : null) : pcs.get(pc)
    c.className = 'note-circle'
    c.style.cssText = ''
    if (!s) { c.innerText = ''; c.style.opacity = '0.04'; return }
    if (pos) {
      const isNext = midi === nextMidi
      const isRoot = sIdx === pos.root.s && fIdx === pos.root.f
      c.style.backgroundColor = INTERVAL_COLORS[s.iv % 12].color
      c.style.color = 'rgba(0,0,0,0.8)'
      c.innerText = s.label
      c.style.opacity = isNext || (!running.value && isRoot) ? '1' : '0.45'
      if (isNext || isRoot) { c.style.border = '2px solid white' }
      if (isNext) c.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)'
      return
    }
    c.style.backgroundColor = INTERVAL_COLORS[s.iv % 12].color
    c.style.color = 'rgba(0,0,0,0.8)'
    c.innerText = s.label
    c.style.opacity = pc === next ? '1' : '0.3'
    if (pc === next) { c.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.6)'; c.style.border = '2px solid white' }
  })
}

// ── Metronome ─────────────────────────────────────────────────────────────────
function startClock(beats, onFirstBeat) {
  const beatS = 60 / settings.bpm
  nextBeatTime = Tone.now() + 0.15
  beatsScheduled = 0
  totalBeats = COUNT_IN + beats
  countLeft.value = COUNT_IN
  const tick = () => {
    while (nextBeatTime < Tone.now() + 0.15 && beatsScheduled < totalBeats) {
      const i = beatsScheduled++
      const counting = i < COUNT_IN
      audio.playClick(nextBeatTime, counting ? i === 0 : (i - COUNT_IN) % 4 === 0, counting ? 0.7 : 0.5, 'Click')
      const perf = audioTimeToPerf(nextBeatTime)
      if (i === COUNT_IN) onFirstBeat(perf)
      if (counting) setTimeout(() => { countLeft.value = COUNT_IN - 1 - i }, Math.max(0, perf - performance.now()))
      nextBeatTime += beatS
    }
  }
  timer = setInterval(tick, 25)
  tick()
}

function stopClock() {
  clearInterval(timer); timer = null
  clearTimeout(endTimer); endTimer = null
  countLeft.value = 0
}

// ── Run ───────────────────────────────────────────────────────────────────────
async function run() {
  await audio.init()
  rootPc.value = settings.root >= 0 ? settings.root : Math.floor(Math.random() * 12)
  seq.value = buildSequence()
  position.value = settings.reference ? choosePosition() : null
  step.value = 0; wrongNotes = 0
  timing.value = []; summaryText.value = ''
  subMs = 60000 / settings.bpm / settings.sub
  running.value = true
  statusText.value = t('sc.go')
  const beats = Math.ceil(seq.value.length / settings.sub) + 2
  startClock(beats, perf => {
    firstBeat = perf
    seq.value.forEach((s, i) => { s.ideal = firstBeat + i * subMs })
    const end = seq.value[seq.value.length - 1].ideal + 2 * subMs * settings.sub
    endTimer = setTimeout(() => finish(), Math.max(0, end - performance.now()))
  })
  paintBoard()
}

function stop() {
  stopClock()
  calibrating = false
  running.value = false
  statusText.value = t('sc.status')
  paintBoard()
}

// `fret`: of a clicked note (none from the guitar, which is checked by exact pitch)
function onNote({ midi, time, rawTime, fret }) {
  if (calibrating) { calibNotes.push(rawTime ?? time); return }
  if (!running.value || !firstBeat) return
  const k = step.value
  const slot = seq.value[k]
  if (!slot || time < firstBeat - 4 * tolerance.value) return
  const pc = ((midi % 12) + 12) % 12
  const prev = seq.value[k - 1]
  // A quick correction of the note just missed: not a new note.
  if (prev && prev.state === 'wrong' && matches(prev, midi, fret) && time < (prev.ideal + slot.ideal) / 2) return
  const next = seq.value[k + 1]
  if (matches(slot, midi, fret)) {
    take(slot, time)
  } else if (next && matches(next, midi, fret) && Math.abs(time - next.ideal) < Math.abs(time - slot.ideal)) {
    slot.state = 'missed'                  // a note skipped, the player went on in time
    step.value++
    take(next, time)
  } else {
    wrongNotes++                           // a wrong note in this note's place: go on
    slot.state = 'wrong'
    statusText.value = t('sc.wrong').replace('{0}', appStore.currentNotes[pc]).replace('{1}', slot.name)
  }
  step.value++
  if (step.value >= seq.value.length) return finish()
  guitar.allowRepeat(seq.value[step.value].pc)
  paintBoard()
}

function take(slot, time) {
  slot.delta = time - slot.ideal
  slot.state = Math.abs(slot.delta) <= tolerance.value ? 'ok' : 'off'
  timing.value.push({ name: slot.name, delta: slot.delta })
}

function finish() {
  if (!running.value) return
  stopClock()
  running.value = false
  const played = timing.value.length
  const total = seq.value.length
  seq.value.forEach((s, i) => { if (i >= step.value || !s.state) s.state = 'missed' })
  const inTime = timing.value.filter(p => Math.abs(p.delta) <= tolerance.value).length
  const mean = played ? timing.value.reduce((a, p) => a + p.delta, 0) / played : 0
  const inTimePct = played ? Math.round((inTime / played) * 100) : 0
  summaryText.value = t('sc.summary')
    .replace('{0}', played).replace('{1}', total)
    .replace('{2}', `${wrongNotes} ${wrongNotes === 1 ? t('sc.wrong-one') : t('sc.wrong-many')}`)
    .replace('{3}', inTimePct).replace('{4}', tolerance.value)
    .replace('{5}', played ? deltaText(mean) : '–')
  const reachedEnd = step.value >= total
  const clean = played === total && wrongNotes === 0 && inTimePct >= 90
  practice.record('scale-tempo', settings.scale, clean)
  if (clean) {
    cleanRuns.value++
    if (settings.speedUp && settings.bpm < settings.targetBpm) {
      settings.bpm = Math.min(settings.targetBpm, settings.bpm + settings.step)
      statusText.value = t('sc.clean-faster').replace('{0}', settings.bpm)
    } else statusText.value = t('sc.clean')
  } else {
    statusText.value = reachedEnd ? t('sc.not-clean') : t('sc.incomplete')
  }
  paintBoard()
  if (guitar.enabled && guitar.autoNext && clean) setTimeout(() => { if (!running.value) run() }, 2500)
}

// ── Latency calibration: one note on each click ───────────────────────────────
async function calibrate() {
  if (!guitar.enabled) { statusText.value = t('sc.calibrate-needs-guitar'); return }
  await audio.init()
  calibrating = true
  calibBeats = []; calibNotes = []
  statusText.value = t('sc.calibrating')
  const saveBpm = settings.bpm
  settings.bpm = 80
  const beatMs = 60000 / 80
  // the 8 clicks after the count-in, as heard
  startClock(8, firstPerf => {
    for (let i = 0; i < 8; i++) calibBeats.push(firstPerf + i * beatMs)
    endTimer = setTimeout(endCalibration, Math.max(0, calibBeats[7] + beatMs - performance.now()))
  })
  settings.bpm = saveBpm

  function endCalibration() {
    stopClock()
    calibrating = false
    const offsets = calibBeats.map(b => {
      const near = calibNotes.filter(n => Math.abs(n - b) < beatMs / 2).sort((x, y) => Math.abs(x - b) - Math.abs(y - b))[0]
      return near === undefined ? null : near - b
    }).filter(v => v !== null).sort((a, b) => a - b)
    if (offsets.length < 5) { statusText.value = t('sc.calibrate-failed'); return }
    const median = offsets[Math.floor(offsets.length / 2)]
    latency.value = Math.round(Math.max(-50, Math.min(250, median)))
    setInputLatency(latency.value)
    statusText.value = t('sc.calibrated').replace('{0}', latency.value)
  }
}

async function onNoteClick(e) {
  if (calibrating) return
  onNote({ midi: e.detail.midiNote, time: performance.now(), fret: e.detail.fretIndex })
}

watch(settings, () => writeStorage(STORAGE_KEY, { ...settings }), { deep: true })
watch(() => [settings.scale, settings.root, settings.octaves, settings.direction, settings.reference], () => {
  if (running.value) return
  rootPc.value = settings.root >= 0 ? settings.root : rootPc.value
  seq.value = buildSequence()
  position.value = null
  timing.value = []
  paintBoard()
})

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  seq.value = buildSequence()
  paintBoard()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  stopClock()
})
</script>

<style scoped>
.sc-master { display: flex; justify-content: center; margin-bottom: 4px; }
.jd-question-box { background: rgba(255, 109, 0, 0.05); border: 1px solid rgba(255, 109, 0, 0.18); border-radius: 16px; padding: 26px; text-align: center; margin: 10px 0; position: relative; z-index: 1; }
.jd-question-text { font-size: 28px; font-weight: 900; color: var(--jd-drums); }
.sc-sub { font-family: var(--jd-mono); font-size: 11px; letter-spacing: 1px; color: var(--jd-text-soft); margin-top: 6px; }
.jd-question-hint { font-size: 14px; color: var(--jd-muted); margin-top: 14px; min-height: 20px; }
.sc-slots { display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; margin-top: 16px; }
.sc-slot { width: 40px; height: 46px; border: 1px solid var(--jd-line-strong); border-radius: 8px; background: rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; font-family: var(--jd-mono); }
.sc-slot-deg { font-size: 9px; color: var(--jd-muted); }
.sc-slot-note { font-size: 12px; font-weight: 800; color: var(--jd-text-soft); }
.sc-slot.next { border-color: var(--jd-amber); box-shadow: 0 0 10px rgba(255, 214, 10, 0.25); }
.sc-slot.ok { border-color: var(--jd-green); background: rgba(46, 204, 113, 0.10); }
.sc-slot.off { border-color: #f39c12; background: rgba(243, 156, 18, 0.10); }
.sc-slot.wrong { border-color: var(--jd-red); background: rgba(255, 69, 58, 0.10); }
.sc-slot.missed { opacity: 0.45; }
.sc-timing { margin-top: 18px; text-align: left; }
.sc-chart { position: relative; width: 100%; height: 120px; }
.sc-band { position: absolute; left: 0; right: 0; background: rgba(46, 204, 113, 0.08); }
.sc-zero { position: absolute; left: 0; right: 0; height: 1px; background: #3a352e; }
.sc-hit { position: absolute; width: 24px; height: 24px; margin: -12px 0 0 -12px; display: flex; align-items: center; justify-content: center; outline: none; cursor: default; }
.sc-hit:focus-visible { box-shadow: 0 0 0 1px var(--jd-amber); border-radius: 50%; }
.sc-dot { width: 10px; height: 10px; border-radius: 50%; background: #b88a00; box-shadow: 0 0 0 2px var(--jd-surface); }
.sc-dot.off { background: #9c5cff; }
.sc-axis { display: flex; justify-content: space-between; font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); }
.sc-summary { font-size: 13px; color: var(--jd-text); margin: 8px 0 0; }
.sc-settings { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 28px; }
.sc-setting { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.sc-row { display: flex; gap: 8px; align-items: center; }
.sc-num { width: 64px; height: 34px; border-radius: 6px; background: transparent; border: 1px solid var(--jd-line); color: var(--jd-text); text-align: center; font-family: var(--jd-mono); }
.sc-latency { font-family: var(--jd-mono); font-size: 13px; color: var(--jd-text); }
.jd-score-badge { justify-self: start; display: flex; flex-direction: column; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 5px 15px; border-radius: 10px; border: 1px solid var(--jd-line); }
.jd-score-val { font-weight: 800; font-size: 16px; }
.jd-score-label { font-size: 9px; color: var(--jd-muted); text-transform: uppercase; letter-spacing: 1px; }
</style>
