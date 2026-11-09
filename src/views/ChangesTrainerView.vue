<template>
  <div id="view-changes-trainer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('ch.title') }}</h1>
      </div>
    </header>

    <section class="jd-console" :class="{ 'jd-playing': backing.playing.value }">
      <div class="jd-grain" aria-hidden="true"></div>

      <StageHud :label="t('ch.title')">
        <template v-if="settings.mode !== 'free'" #score>
          <div class="jd-score-badge">
            <span class="jd-score-val">{{ judged.ok }} / {{ judged.total }}</span>
            <span class="jd-score-label">{{ t('label.score') }}</span>
          </div>
        </template>

        <div class="ch-now">
        <div v-if="backing.countIn.value > 0" class="ch-count">{{ backing.countIn.value }}</div>
        <template v-else-if="nowEvent">
          <div class="ch-chord">{{ nowEvent.symbol }}</div>
          <div v-if="settings.hints" class="ch-target">{{ targetText(nowEvent) }}</div>
          <div class="ch-next" v-if="nextEvent">{{ t('ch.next') }}: {{ nextEvent.symbol }}</div>
        </template>
        <div v-else class="ch-idle">{{ statusText }}</div>
        <div v-if="zone" class="ch-zone">{{ fmt('pm.q-zone', zoneName(zone, appStore.lang)) }}</div>
        </div>

        <template #actions>
          <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': backing.playing.value }" @click="toggle"
            :aria-label="backing.playing.value ? 'Stop' : 'Play'">
            <svg v-if="!backing.playing.value" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
          </button>
        </template>
      </StageHud>

      <div class="jd-master ch-master">
        <div class="jd-bpm">
          <div class="jd-bpm-frame">
            <span class="jd-bpm-led" :class="{ on: backing.playing.value }" aria-hidden="true"></span>
            <input type="number" class="jd-bpm-input" v-model.number="settings.bpm" min="40" max="260" :aria-label="t('label.bpm')">
            <span class="jd-bpm-unit">{{ t('label.bpm') }}</span>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="ch-chart">
        <div v-for="(bar, b) in bars" :key="b" class="ch-bar" :class="{ now: nowEvent && nowEvent.bar === b }">
          <div v-for="(symbol, i) in bar" :key="i" class="ch-cell" :class="cellState(b, i)">
            <span class="ch-cell-chord">{{ symbol }}</span>
            <span class="ch-cell-notes">
              <template v-if="settings.mode === 'free'">
                <span v-for="(n, k) in cellNotes(b, i)" :key="k" class="ch-note">
                  <i :style="{ background: KIND_COLORS[n.kind] }"></i>{{ n.name }} <em>{{ n.label }}</em>
                </span>
              </template>
              <template v-else>{{ cellResult(b, i) }}</template>
            </span>
          </div>
        </div>
      </div>

      <!-- Solo analysis -->
      <div v-if="settings.mode === 'free' && soloTotals.total" class="ch-analysis">
        <div class="jd-section-label"><span>{{ t('ch.analysis') }}</span><span class="jd-section-rule"></span></div>
        <div class="ch-seg" role="img" :aria-label="soloAria">
          <div v-for="k in KINDS" :key="k" v-show="soloTotals[k]" class="ch-seg-part"
            :style="{ flexGrow: soloTotals[k], background: KIND_COLORS[k], color: k === 'chord' ? '#0a0908' : '#fff' }">
            <span v-if="soloTotals[k] / soloTotals.total >= 0.12">{{ soloShares[k] }}%</span>
          </div>
        </div>
        <div class="ch-legend">
          <span v-for="k in KINDS" :key="k"><i :style="{ background: KIND_COLORS[k] }"></i>{{ t(`ch.kind-${k}`) }} · {{ soloTotals[k] }}</span>
        </div>
        <p class="ch-note-text">{{ t('ch.analysis-note') }}</p>
      </div>

      <GuitarInputPanel :guitar="guitar" />

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="ch-settings">
        <div class="ch-setting">
          <span class="jd-feel-label">{{ t('ch.song') }}</span>
          <select class="jd-feel-select" v-model="settings.song">
            <option v-for="s in STANDARDS" :key="s.title" :value="s.title">{{ s.title }}</option>
          </select>
        </div>
        <div class="ch-setting">
          <span class="jd-feel-label">{{ t('ch.mode') }}</span>
          <div class="jd-modes">
            <label v-for="m in MODES" :key="m" class="jd-mode" :class="{ on: settings.mode === m }">
              <input type="radio" name="ch-mode" :checked="settings.mode === m" @change="settings.mode = m">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ch.mode-${m}`) }}</span>
            </label>
          </div>
        </div>
        <div class="ch-setting" v-if="settings.mode === 'guide'">
          <span class="jd-feel-label">{{ t('ch.target') }}</span>
          <select class="jd-feel-select" v-model="settings.guide">
            <option value="3">{{ t('ch.target-3') }}</option>
            <option value="7">{{ t('ch.target-7') }}</option>
            <option value="both">{{ t('ch.target-both') }}</option>
          </select>
        </div>
        <div class="ch-setting" v-if="settings.mode === 'approach'">
          <span class="jd-feel-label">{{ t('ch.approach') }}</span>
          <select class="jd-feel-select" v-model="settings.approach">
            <option value="chromatic">{{ t('ch.approach-chromatic') }}</option>
            <option value="enclosure">{{ t('ch.approach-enclosure') }}</option>
          </select>
        </div>
        <div class="ch-setting">
          <span class="jd-feel-label">{{ t('ch.loops') }}</span>
          <select class="jd-feel-select" v-model.number="settings.loops">
            <option :value="1">1×</option><option :value="2">2×</option><option :value="4">4×</option>
            <option :value="0">{{ t('ch.loops-endless') }}</option>
          </select>
        </div>
        <div class="ch-setting">
          <span class="jd-feel-label">{{ t('ch.band') }}</span>
          <div class="jd-modes">
            <label v-for="p in ['bass', 'drums', 'comp', 'hints']" :key="p" class="jd-mode" :class="{ on: settings[p] }">
              <input type="checkbox" v-model="settings[p]">
              <span class="jd-mode-dot" aria-hidden="true"></span>
              <span class="jd-mode-text">{{ t(`ch.part-${p}`) }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>
      <PracticeModes
        v-model:reference="settings.reference"
        :reference-label="t('pm.ref-zone')"
        :reference-help="t('pm.help-ch')"
        :show-retry="false"
      />
    </section>

    <div class="teoria-tip" style="margin-top: 20px;">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t(`ch.tip-${settings.mode}`) }} {{ t('ch.tip-headphones') }}
    </div>
  </div>
</template>

<script setup>
import { useWakeLock } from '../composables/useWakeLock.js'
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { usePracticeStore } from '../stores/practice.js'
import { useI18n } from '../composables/useI18n.js'
import { useGuitarInput, midiToName } from '../composables/useGuitarInput.js'
import { useBackingTrack } from '../composables/useBackingTrack.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { STANDARDS, parseChart, classifyNote } from '../utils/standards.js'
import { setStepDone } from '../utils/studyPath.js'
import { getInputLatency } from '../utils/latency.js'
import { INTERVAL_COLORS } from '../utils/theory.js'
import { zoneName, randomZone, inZone, playableInZone, paintArea, allPositions } from '../utils/fretRefs.js'
import { useFretboardPick, setMarks, clearMarks } from '../composables/useFretboardMarks.js'
import GuitarInputPanel from '../components/shared/GuitarInputPanel.vue'
import StageHud from '../components/shared/StageHud.vue'
import PracticeModes from '../components/shared/PracticeModes.vue'

const appStore = useAppStore()
const practice = usePracticeStore()
const route = useRoute()
const { t } = useI18n()
const fmt = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))
const guitar = useGuitarInput({ onNote: ({ midi, time }) => onNote({ midi, time: time - getInputLatency() }) })
const backing = useBackingTrack()
useWakeLock(() => backing.playing.value)

const MODES = ['guide', 'arpeggio', 'approach', 'free']
const KINDS = ['chord', 'tension', 'outside']
// Validated against the console surface: chord tone, tension, outside.
const KIND_COLORS = { chord: '#b88a00', tension: '#3a9ad9', outside: '#9c5cff' }
const EARLY_MS = 120          // a note this early still counts for the next chord (anticipation)
const STORAGE_KEY = 'jazzVizChangesTrainer'

// reference: each run gives a zone of 5 frets to play in
const defaults = { song: 'ii-V-I in C', mode: 'guide', guide: 'both', approach: 'chromatic', bpm: 90, loops: 2, bass: true, drums: true, comp: true, hints: true, reference: false }
const settings = reactive({ ...defaults, ...(readStorage(STORAGE_KEY, {}) || {}) })
if (!STANDARDS.some(s => s.title === settings.song)) settings.song = defaults.song
if (!MODES.includes(settings.mode)) settings.mode = defaults.mode
// Opened from the Real Book study path: /changes-trainer?song=...&mode=...
if (route.query.song && STANDARDS.some(s => s.title === route.query.song)) settings.song = route.query.song
if (route.query.mode && MODES.includes(route.query.mode)) settings.mode = route.query.mode

const song = computed(() => STANDARDS.find(s => s.title === settings.song))
const bars = computed(() => parseChart(song.value.chords))

// Per chord event: { result: null|'ok'|'wrong'|'missed'|'held', notes: [{ midi, time, kind, label }], progress, why }
const results = reactive(new Map())
const statusText = ref(t('ch.status'))
const zone = ref(null)          // reference mode: { lo, hi } frets of this run
const noteLog = []               // every note of the run, for approach notes
let checkTimers = []

const nowEvent = computed(() => backing.current.value)
const nextEvent = computed(() => {
  const ev = nowEvent.value
  if (!ev) return null
  const flat = bars.value.flatMap((bar, b) => bar.map((symbol, i) => ({ symbol, bar: b, index: i })))
  const k = flat.findIndex(x => x.bar === ev.bar && x.index === ev.index)
  return flat[(k + 1) % flat.length]
})

const pcOf = m => ((m % 12) + 12) % 12
const noteName = m => midiToName(m, appStore.currentNotes)
const pcName = pc => appStore.currentNotes[pc]

// ── What each mode asks for ────────────────────────────────────────────────────
function guideTargets(ev) {
  const g = ev.info.guide
  return settings.guide === '3' ? [g[0]] : settings.guide === '7' ? [g[1]] : g
}

function arpeggioNotes(ev) {
  const tones = ev.info.tones
  return Array.from({ length: ev.beats }, (_, i) => tones[i % tones.length])
}

function targetText(ev) {
  const names = list => list.map(x => `${pcName(x.pc)} (${x.label})`)
  if (settings.mode === 'guide') return t('ch.play').replace('{0}', names(guideTargets(ev)).join(` ${t('ch.or')} `))
  if (settings.mode === 'arpeggio') return t('ch.play').replace('{0}', arpeggioNotes(ev).map(x => pcName(x.pc)).join(' – '))
  if (settings.mode === 'approach') {
    const tg = ev.info.guide[0]
    const above = pcName((tg.pc + 1) % 12), below = pcName((tg.pc + 11) % 12)
    return settings.approach === 'chromatic'
      ? t('ch.approach-hint').replace('{0}', `${pcName(tg.pc)} (${tg.label})`).replace('{1}', `${below} ${t('ch.or')} ${above}`)
      : t('ch.enclosure-hint').replace('{0}', `${pcName(tg.pc)} (${tg.label})`)
  }
  return t('ch.chord-tones').replace('{0}', ev.info.tones.map(x => pcName(x.pc)).join(' '))
}

// ── Judging ───────────────────────────────────────────────────────────────────
function resultOf(ev) {
  if (!results.has(ev.id)) results.set(ev.id, { result: null, notes: [], progress: 0, why: '' })
  return results.get(ev.id)
}

function settle(ev, result, why = '') {
  const r = resultOf(ev)
  if (r.result) return
  r.result = result
  r.why = why
  if (settings.mode !== 'free') practice.record('changes', `${settings.mode}:${ev.info.group}`, result === 'ok' || result === 'held')
}

function onNote({ midi, time = performance.now(), pos = null }) {
  if (!backing.playing.value) return
  const note = { midi, pc: pcOf(midi), time }
  noteLog.push(note)
  const ev = backing.eventAt(time, EARLY_MS)
  if (!ev) return
  const r = resultOf(ev)
  if (settings.mode === 'free') {
    const c = classifyNote(ev.info, note.pc)
    r.notes.push({ ...note, kind: c.kind, label: c.label, name: noteName(midi) })
    return
  }
  r.notes.push(note)
  if (r.result) return

  // reference mode: a note outside the zone (clicked there, or not playable there) is a mistake
  if (zone.value && !(pos ? inZone(pos.f, zone.value) : playableInZone(appStore.currentTuning, midi, zone.value))) {
    return settle(ev, 'wrong', t('pm.out-of-zone'))
  }

  if (settings.mode === 'guide') {
    const ok = guideTargets(ev).some(x => x.pc === note.pc)
    settle(ev, ok ? 'ok' : 'wrong', ok ? '' : noteName(midi))
  } else if (settings.mode === 'arpeggio') {
    const want = arpeggioNotes(ev)[r.progress]
    if (want.pc === note.pc) {
      r.progress++
      if (r.progress === ev.beats) settle(ev, 'ok')
      else guitar.allowRepeat(arpeggioNotes(ev)[r.progress].pc)
    } else settle(ev, 'wrong', noteName(midi))
  } else if (settings.mode === 'approach') {
    const target = ev.info.guide[0].pc
    if (note.pc !== target) return settle(ev, 'wrong', noteName(midi))
    const before = noteLog.filter(n => n !== note && n.time < note.time && n.time >= ev.start - ev.beatMs * 2 - EARLY_MS)
    const dist = n => ((n.pc - target + 18) % 12) - 6   // signed semitones from the target, -6..5
    let ok
    if (settings.approach === 'chromatic') {
      const last = before[before.length - 1]
      ok = !!last && Math.abs(dist(last)) === 1
    } else {
      const [a, b] = before.slice(-2).map(dist)
      ok = before.length >= 2 && ((a > 0 && a <= 2 && b < 0 && b >= -2) || (b > 0 && b <= 2 && a < 0 && a >= -2))
    }
    settle(ev, ok ? 'ok' : 'wrong', ok ? '' : t('ch.no-approach'))
  }
}

// A guide tone held across the barline (common to both chords) counts for the new chord.
function checkHeld(ev) {
  const r = resultOf(ev)
  if (r.result || settings.mode !== 'guide' || guitar.liveMidi === null) return
  if (guideTargets(ev).some(x => x.pc === pcOf(guitar.liveMidi))) settle(ev, 'held')
}

// When a chord's time is up without the right notes, it was missed.
function closeWindow(ev) {
  const r = resultOf(ev)
  if (r.result || settings.mode === 'free') return
  settle(ev, 'missed')
}

function onChord(ev) {
  paintHints(ev)
  // the next chord may ask again for a note heard just now (a common tone)
  if (settings.mode === 'guide') guideTargets(ev).forEach(x => guitar.allowRepeat(x.pc))
  if (settings.mode === 'arpeggio') guitar.allowRepeat(arpeggioNotes(ev)[0].pc)
  if (settings.mode === 'approach') guitar.allowRepeat(ev.info.guide[0].pc)
  checkTimers.push(setTimeout(() => checkHeld(ev), 250))
  checkTimers.push(setTimeout(() => closeWindow(ev), Math.max(0, ev.end - EARLY_MS + 60 - performance.now())))
}

// ── Chart cells ───────────────────────────────────────────────────────────────
// The latest pass over each chord is shown.
function lastEvent(b, i) {
  const list = backing.events.value
  for (let k = list.length - 1; k >= 0; k--) if (list[k].bar === b && list[k].index === i) return list[k]
  return null
}

function cellState(b, i) {
  const ev = lastEvent(b, i)
  const r = ev && results.get(ev.id)
  return {
    now: nowEvent.value && ev && nowEvent.value.id === ev.id,
    ok: r?.result === 'ok' || r?.result === 'held',
    wrong: r?.result === 'wrong',
    missed: r?.result === 'missed',
  }
}

function cellResult(b, i) {
  const ev = lastEvent(b, i)
  const r = ev && results.get(ev.id)
  if (!r || !r.result) {
    if (r && settings.mode === 'arpeggio' && r.progress) return `${r.progress}/${ev.beats}`
    return ''
  }
  if (r.result === 'ok') return '✓ ' + r.notes.slice(0, 4).map(n => noteName(n.midi)).join(' ')
  if (r.result === 'held') return '✓ ' + t('ch.held')
  if (r.result === 'missed') return '– ' + t('ch.missed')
  return '✗ ' + r.why
}

function cellNotes(b, i) {
  const list = backing.events.value.filter(e => e.bar === b && e.index === i)
  return list.flatMap(e => results.get(e.id)?.notes || []).slice(-6)
}

const judged = computed(() => {
  let ok = 0, total = 0
  results.forEach(r => {
    if (!r.result) return
    total++
    if (r.result === 'ok' || r.result === 'held') ok++
  })
  return { ok, total }
})

const soloTotals = computed(() => {
  const out = { chord: 0, tension: 0, outside: 0, total: 0 }
  results.forEach(r => r.notes.forEach(n => { if (n.kind) { out[n.kind]++; out.total++ } }))
  return out
})
// Shares that add up to 100 (largest remainder)
const soloShares = computed(() => {
  const tot = soloTotals.value.total
  if (!tot) return Object.fromEntries(KINDS.map(k => [k, 0]))
  const raw = KINDS.map(k => (soloTotals.value[k] / tot) * 100)
  const out = raw.map(Math.floor)
  const order = raw.map((v, i) => [v - Math.floor(v), i]).sort((a, b) => b[0] - a[0])
  const missing = 100 - out.reduce((a, b) => a + b, 0)
  for (let i = 0; i < missing; i++) out[order[i % order.length][1]]++
  return Object.fromEntries(KINDS.map((k, i) => [k, out[i]]))
})
const soloAria = computed(() => KINDS.map(k => `${t(`ch.kind-${k}`)} ${soloShares.value[k]}%`).join(', '))

// ── Fretboard hints ───────────────────────────────────────────────────────────
function clearBoard() {
  clearMarks()
}

function paintHints(ev) {
  clearBoard()
  if (!settings.hints) {
    if (zone.value) paintArea((s, f) => inZone(f, zone.value))
    return
  }
  const show = settings.mode === 'guide' ? guideTargets(ev)
    : settings.mode === 'approach' ? [ev.info.guide[0]]
    : ev.info.tones
  const toneAt = (s, f) => show.find(x => x.pc === (appStore.currentTuning[s] + f) % 12)
  setMarks(allPositions((s, f) => toneAt(s, f) && !(zone.value && !inZone(f, zone.value))), p => {
    const tone = toneAt(p.s, p.f)
    return { color: INTERVAL_COLORS[tone.iv].color, opacity: 0.85, label: tone.label }
  })
}

// ── Transport ─────────────────────────────────────────────────────────────────
function toggle() {
  if (backing.playing.value) return stopRun()
  results.clear()
  noteLog.length = 0
  checkTimers.forEach(clearTimeout); checkTimers = []
  statusText.value = t('ch.status')
  zone.value = settings.reference ? randomZone() : null
  backing.start({
    bars: bars.value, bpm: Math.max(40, Math.min(260, settings.bpm || 90)), loops: settings.loops,
    bass: settings.bass, drums: settings.drums, comp: settings.comp,
    onChord, onEnd: () => finishRun(),
  })
}

function stopRun() {
  backing.stop()
  finishRun()
}

function finishRun() {
  checkTimers.forEach(clearTimeout); checkTimers = []
  clearBoard()
  // A good run ticks the step of this tune's study path in the Real Book.
  if (settings.mode === 'free') {
    statusText.value = soloTotals.value.total ? t('ch.done-free') : t('ch.status')
    if (soloTotals.value.total >= 16) setStepDone(settings.song, 'free')
  } else {
    const { ok, total } = judged.value
    statusText.value = total ? t('ch.done').replace('{0}', ok).replace('{1}', total) : t('ch.status')
    if (total >= bars.value.length && ok / total >= 0.8) {
      setStepDone(settings.song, settings.mode)
      statusText.value += ' ' + t('ch.step-done')
    }
  }
}

async function onNoteClick({ s, f, midi }) {
  onNote({ midi, time: performance.now(), pos: { s, f } })
}

watch(settings, () => writeStorage(STORAGE_KEY, { ...settings }), { deep: true })
watch(() => settings.reference, on => { if (!on && !backing.playing.value) zone.value = null })
watch(() => [settings.song, settings.mode], () => { if (backing.playing.value) stopRun(); results.clear() })

useFretboardPick(onNoteClick)
onUnmounted(() => checkTimers.forEach(clearTimeout))
</script>

<style scoped>
.ch-master { display: flex; justify-content: center; margin-bottom: 4px; }
.stage-hud .ch-now { min-height: 0; padding: 0; margin: 0; gap: 2px; }
.stage-hud .ch-chord { font-size: clamp(24px, 3.6vw, 44px); line-height: 1.1; }
.stage-hud .ch-count { font-size: clamp(30px, 4vw, 56px); line-height: 1.1; }
.ch-zone { font-family: var(--jd-mono); font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--jd-amber); }
.ch-now { position: relative; z-index: 1; text-align: center; min-height: 110px; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.ch-count { font-size: 56px; font-weight: 900; color: var(--jd-amber); }
.ch-chord { font-size: 44px; font-weight: 900; color: var(--jd-text); letter-spacing: 1px; }
.ch-target { font-family: var(--jd-mono); font-size: 13px; color: var(--jd-amber); }
.ch-next { font-family: var(--jd-mono); font-size: 11px; color: var(--jd-muted); }
.ch-idle { color: var(--jd-text-soft); font-size: 14px; }

.ch-chart {
  position: relative; z-index: 1;
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px; margin: 18px 0;
}
.ch-bar { display: flex; gap: 2px; border: 1px solid #2a2620; border-radius: 8px; padding: 4px; min-height: 64px; background: rgba(0, 0, 0, 0.2); }
.ch-bar.now { border-color: var(--jd-amber); }
.ch-cell { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; padding: 4px 6px; border-radius: 6px; }
.ch-cell.now { background: rgba(255, 214, 10, 0.08); }
.ch-cell.ok { background: rgba(46, 204, 113, 0.12); }
.ch-cell.wrong { background: rgba(255, 69, 58, 0.12); }
.ch-cell.missed { background: rgba(255, 255, 255, 0.04); }
.ch-cell-chord { font-weight: 800; font-size: 14px; color: var(--jd-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ch-cell-notes { font-family: var(--jd-mono); font-size: 10px; color: var(--jd-text-soft); display: flex; flex-wrap: wrap; gap: 2px 6px; }
.ch-cell.ok .ch-cell-notes { color: var(--jd-green); }
.ch-cell.wrong .ch-cell-notes { color: var(--jd-red); }
.ch-note { display: inline-flex; align-items: center; gap: 3px; color: var(--jd-text); }
.ch-note i { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
.ch-note em { font-style: normal; color: var(--jd-text-soft); }

.ch-analysis { position: relative; z-index: 1; margin-bottom: 10px; }
.ch-seg { display: flex; gap: 2px; height: 28px; margin-top: 8px; }
.ch-seg-part { border-radius: 4px; display: flex; align-items: center; padding-left: 8px; font-size: 12px; font-weight: 700; min-width: 4px; }
.ch-legend { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; font-size: 12px; color: var(--jd-text-soft); }
.ch-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; vertical-align: -1px; }
.ch-note-text { font-size: 11px; color: var(--jd-muted); margin: 8px 0 0; }

.ch-settings { position: relative; z-index: 1; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px 28px; }
.ch-setting { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.jd-score-badge { display: flex; flex-direction: column; align-items: center; background: rgba(255, 255, 255, 0.03); padding: 5px 15px; border-radius: 10px; border: 1px solid var(--jd-line); }
.jd-score-val { font-weight: 800; font-size: 16px; }
.jd-score-label { font-size: 9px; color: var(--jd-muted); text-transform: uppercase; letter-spacing: 1px; }

@media (max-width: 700px) {
  .ch-chart { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ch-chord { font-size: 34px; }
}
</style>
