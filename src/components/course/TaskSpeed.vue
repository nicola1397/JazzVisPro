<template>
  <section class="ct sp" :class="{ 'ct--done': bestLevel > 0 }">
    <header class="ct-head">
      <span class="ct-kind sp-kind">⚡ {{ t('cr.speed') }}</span>
      <span class="ct-title" v-if="spec.title">{{ L(spec.title) }}</span>
      <span class="ct-spacer"></span>
      <span class="sp-medals" :aria-label="medalLabel">
        <span v-for="(lv, i) in levels" :key="i" class="sp-medal" :class="[`sp-medal--${i + 1}`, { won: bestLevel > i }]" :title="t('cr.medal-' + (i + 1))"></span>
      </span>
    </header>

    <!-- Before a run: choose the level -->
    <template v-if="phase === 'idle'">
      <p class="ct-hint sp-how">{{ t('cr.speed-how').replace('{n}', count).replace('{p}', Math.round(minAccuracy * 100)) }}</p>
      <div class="sp-levels" role="radiogroup" :aria-label="t('cr.level')">
        <button
          v-for="(target, i) in levels" :key="i" type="button" role="radio"
          class="sp-level" :class="[`sp-level--${i + 1}`, { on: level === i, won: bestLevel > i }]"
          :aria-checked="level === i" :disabled="i > bestLevel" @click="level = i"
        >
          <span class="sp-level-name">{{ t('cr.medal-' + (i + 1)) }}</span>
          <span class="sp-level-target">≤ {{ fmt(target * 1000) }}</span>
          <span v-if="i > bestLevel" class="sp-level-lock">{{ t('cr.locked') }}</span>
        </button>
      </div>
      <div class="sp-start-row">
        <button class="jd-toolbtn sp-start" type="button" @click="startRun">▶ {{ t('cr.speed-start') }}</button>
        <span v-if="best" class="sp-best">{{ t('cr.best') }}: {{ t('cr.medal-' + best.level) }} · {{ fmt(best.avg) }} · {{ Math.round(best.acc * 100) }}%</span>
      </div>
      <p v-if="spec.tip" class="ct-hint" v-html="L(spec.tip)"></p>
    </template>

    <!-- A run -->
    <template v-else-if="phase === 'run' && round">
      <div class="sp-top">
        <span class="sp-count">{{ qIndex + 1 }} / {{ count }}</span>
        <span class="sp-bar" aria-hidden="true"><span class="sp-bar-fill" :class="{ over: elapsed > target * 1000 }" :style="{ width: barWidth }"></span></span>
        <span class="sp-time">{{ listening ? '♪' : fmt(elapsed) }}</span>
      </div>

      <p class="ct-prompt sp-prompt" v-html="L(round.prompt)"></p>
      <div v-if="round.sound" class="ct-sound">
        <button class="jd-toolbtn ct-listen" type="button" :disabled="listening" @click="replay">▶ {{ t('cr.listen-again') }}</button>
      </div>

      <NeckDiagram
        v-if="round.click"
        :from="round.click.from ?? 0" :to="round.click.to ?? 12"
        :dots="clickDots" :labels="round.click.labels || 'note'" :toggle="false"
        :focus="round.click.focus || []" :clickable="!answered" fit @pick="onPick"
      />
      <NeckDiagram v-else-if="round.diagram" v-bind="round.diagram" :toggle="false" fit />

      <div v-if="round.options && round.layout === 'piano'" class="sp-piano">
        <button
          v-for="(o, i) in round.options" :key="i" type="button"
          class="sp-key" :class="[keyClass(o), optionState(i)]" :style="keyStyle(o)"
          :disabled="answered || listening" @click="answer(i)"
        ><span>{{ L(o.label) }}</span><kbd v-if="o.hotkey">{{ o.hotkey.toUpperCase() }}</kbd></button>
      </div>
      <div v-else-if="round.options" class="cq-options sp-options">
        <button
          v-for="(o, i) in round.options" :key="i" type="button"
          class="cq-opt" :class="optionState(i)" :disabled="answered || listening" @click="answer(i)"
        >{{ L(o.label) }}<kbd v-if="i < 10 && !round.noHotkeys">{{ (i + 1) % 10 }}</kbd></button>
      </div>

      <div class="ct-status" :class="statusClass" aria-live="polite">{{ status }}</div>
      <GuitarInputPanel v-if="spec.guitar" :guitar="guitar" class="ct-guitar" />
    </template>

    <!-- Results -->
    <template v-else-if="phase === 'done'">
      <div class="sp-result" :class="{ passed }">
        <div class="sp-result-title">{{ passed ? t('cr.level-passed').replace('{m}', t('cr.medal-' + (level + 1))) : t('cr.level-failed') }}</div>
        <div class="sp-result-figures">
          <span><strong>{{ Math.round(accuracy * 100) }}%</strong> {{ t('cr.accuracy') }}</span>
          <span><strong>{{ fmt(avgMs) }}</strong> {{ t('cr.avg-time') }} ({{ t('cr.target') }} {{ fmt(target * 1000) }})</span>
        </div>
        <p v-if="!passed" class="ct-hint">{{ accuracy < minAccuracy ? t('cr.need-accuracy').replace('{p}', Math.round(minAccuracy * 100)) : t('cr.need-speed') }}</p>
        <div v-if="missed.length" class="sp-missed">
          <span class="sp-missed-label">{{ t('cr.to-review') }}</span>
          <span v-for="(m, i) in missed" :key="i" class="sp-missed-item" v-html="m"></span>
        </div>
      </div>
      <div class="ct-actions">
        <span class="ct-spacer"></span>
        <button class="jd-toolbtn" type="button" @click="phase = 'idle'">{{ t('cr.levels') }}</button>
        <button class="jd-toolbtn" type="button" @click="startRun">↻ {{ t('cr.again') }}</button>
        <button v-if="passed && level < levels.length - 1" class="jd-toolbtn ct-next" type="button" @click="level++; startRun()">{{ t('cr.next-level') }} ▸</button>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import NeckDiagram from './NeckDiagram.vue'
import GuitarInputPanel from '../shared/GuitarInputPanel.vue'
import { useI18n } from '../../composables/useI18n.js'
import { useGuitarInput } from '../../composables/useGuitarInput.js'
import { usePracticeStore } from '../../stores/practice.js'
import { useAudioStore } from '../../stores/audio.js'
import { midiAt, pcAt, neutralName, pretty, mod12 } from '../../course/theory.js'
import { playSound } from '../../course/sound.js'
import { getMedal, setMedal } from '../../course/progress.js'

// A timed drill. Each run asks `count` questions; a level is passed with at least 90% right
// and an average answer time under its target. A wrong or slow answer comes back a few
// questions later, so what is not yet automatic gets repeated at once.
// A round of make(i, prev) gives a prompt and either
//   options [{ label, ok, hotkey? }] (layout 'piano' for the twelve-note keyboard), with an
//   optional diagram to look at, or
//   click { from, to, dots, targets, focus, anyOctave? }: click (or play) one of the targets;
// plus an optional sound to hear first (the timer starts when it has played) and a key.
const props = defineProps({
  spec:     { type: Object, required: true },   // { title, make, count?, levels?, guitar?, tip? }
  itemId:   { type: String, default: 'course' },
  itemKey:  { type: String, default: '' },
  storeKey: { type: String, required: true },
})
const emit = defineEmits(['done'])

const { t, lang } = useI18n()
const practice = usePracticeStore()
const audio = useAudioStore()
const guitar = props.spec.guitar ? useGuitarInput({ onNote: onGuitarNote }) : null
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))

const levels = computed(() => props.spec.levels || [4, 2.5, 1.6])
const count = computed(() => props.spec.count || 15)
const minAccuracy = 0.9
const best = ref(getMedal(props.storeKey))
const bestLevel = computed(() => best.value?.level || 0)
const level = ref(Math.min(bestLevel.value, levels.value.length - 1))
const target = computed(() => levels.value[level.value])

const phase = ref('idle')          // idle | run | done
const qIndex = ref(0)
const round = ref(null)
const answered = ref(false)
const chosen = ref(-1)
const clicked = ref(null)          // { s, f, ok } on neck rounds
const listening = ref(false)
const elapsed = ref(0)
const status = ref('')
const statusClass = ref('')
const results = ref([])            // [{ ok, ms, review }]
let queue = []                     // [{ round, due }]: questions to ask again
let startedAt = 0, raf = 0, timer = 0, runId = 0, prev

const fmt = ms => (Number.isFinite(ms) ? `${(ms / 1000).toFixed(1)} s` : '–')
const barWidth = computed(() => `${Math.min(100, (elapsed.value / (target.value * 1000)) * 100)}%`)
const medalLabel = computed(() => `${t('cr.best')}: ${best.value ? t('cr.medal-' + best.value.level) : '–'}`)

function tick() {
  if (startedAt) elapsed.value = performance.now() - startedAt
  raf = requestAnimationFrame(tick)
}

function startRun() {
  runId++
  phase.value = 'run'
  qIndex.value = 0
  results.value = []
  queue = []
  prev = undefined
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(tick)
  audio.init()
  ask()
}

let questionId = 0

async function ask() {
  const myRun = runId
  const myQuestion = ++questionId
  const due = queue.findIndex(q => q.due <= qIndex.value)
  let r
  if (due >= 0) r = { ...queue.splice(due, 1)[0].round, repeat: true }
  else { r = props.spec.make(qIndex.value, prev); prev = r }
  round.value = r
  answered.value = false
  chosen.value = -1
  clicked.value = null
  status.value = ''
  statusClass.value = ''
  startedAt = 0
  elapsed.value = 0
  if (r.sound) {
    listening.value = true
    guitar?.holdOff(4000)
    const ms = await playSound(r.sound)
    await new Promise(res => { timer = setTimeout(res, ms) })
    // The run or the question may have changed while the sound was playing.
    if (myRun !== runId || myQuestion !== questionId) return
    listening.value = false
  }
  startedAt = performance.now()
}

async function replay() {
  if (!round.value?.sound) return
  listening.value = true
  const ms = await playSound(round.value.sound)
  setTimeout(() => { listening.value = false }, ms)
}

function settle(ok, wrongText = '') {
  if (answered.value) return
  answered.value = true
  const ms = startedAt ? performance.now() - startedAt : target.value * 1000
  startedAt = 0
  elapsed.value = ms
  const r = round.value
  results.value.push({ ok, ms, review: L(r.review || r.prompt) })
  practice.record(props.itemId, props.itemKey || r.key || props.itemId, ok)
  // Not yet automatic: ask it again three questions later (once).
  if (!r.repeat && (!ok || ms > target.value * 1500)) queue.push({ round: r, due: qIndex.value + 3 })
  status.value = ok ? (ms > target.value * 1000 ? t('cr.right-slow') : t('cr.right')) : (wrongText || t('cr.wrong-short'))
  statusClass.value = ok ? 'ok' : 'bad'
  timer = setTimeout(next, ok ? 380 : 1300)
}

function next() {
  qIndex.value++
  if (qIndex.value >= count.value) finish()
  else ask()
}

const accuracy = computed(() => (results.value.length ? results.value.filter(r => r.ok).length / results.value.length : 0))
const avgMs = computed(() => {
  const ok = results.value.filter(r => r.ok)
  return ok.length ? ok.reduce((a, r) => a + r.ms, 0) / ok.length : Infinity
})
const passed = computed(() => accuracy.value >= minAccuracy && avgMs.value <= target.value * 1000)
const missed = computed(() => [...new Set(results.value.filter(r => !r.ok || r.ms > target.value * 1500).map(r => r.review))].slice(0, 4))

function finish() {
  cancelAnimationFrame(raf)
  phase.value = 'done'
  round.value = null
  if (passed.value) {
    setMedal(props.storeKey, level.value + 1, avgMs.value, accuracy.value)
    best.value = getMedal(props.storeKey)
    emit('done')
  }
}

// ── Answers ────────────────────────────────────────────────────────────────────
function answer(i) {
  if (answered.value || listening.value || !round.value?.options) return
  chosen.value = i
  const ok = !!round.value.options[i].ok
  const right = round.value.options.find(o => o.ok)
  settle(ok, `${t('cr.wrong')} ${L(right?.label)}`)
}

function optionState(i) {
  if (!answered.value) return ''
  const o = round.value.options[i]
  if (o.ok) return 'ok'
  return chosen.value === i ? 'bad' : ''
}

const clickKeys = computed(() => new Set((round.value?.click?.targets || []).map(d => `${d.s}-${d.f}`)))
const clickDots = computed(() => {
  const c = round.value?.click
  if (!c) return []
  const map = new Map((c.dots || []).map(d => [`${d.s}-${d.f}`, d]))
  if (answered.value) for (const d of c.targets) map.set(`${d.s}-${d.f}`, { ...d, color: '#2ecc71' })
  if (clicked.value && !clicked.value.ok) {
    const { s, f } = clicked.value
    map.set(`${s}-${f}`, { s, f, color: '#ff453a', label: pretty(neutralName(pcAt(s, f))) })
  }
  return [...map.values()]
})

function onPick({ s, f }) {
  if (answered.value || listening.value) return
  const ok = clickKeys.value.has(`${s}-${f}`)
  clicked.value = { s, f, ok }
  playNote(midiAt(s, f))
  settle(ok, t('cr.wrong-at').replace('{s}', s + 1).replace('{f}', f).replace('{n}', pretty(neutralName(pcAt(s, f)))))
}

function onGuitarNote({ midi }) {
  const c = round.value?.click
  if (phase.value !== 'run' || answered.value || listening.value || !c) return
  const ok = c.targets.some(d => (c.anyOctave ? mod12(midiAt(d.s, d.f)) === mod12(midi) : midiAt(d.s, d.f) === midi))
  settle(ok, t('cr.wrong-played').replace('{n}', pretty(neutralName(midi % 12))))
}

function playNote(midi) {
  audio.init().then(() => {
    if (typeof Tone === 'undefined') return
    guitar?.holdOff(500, midi % 12)
    audio.playNotesAt([midi], Tone.now() + 0.02, 0.45, 0.5)
  })
}

// ── Twelve-note keyboard ──────────────────────────────────────────────────────
// White keys take two grid columns each; black keys sit across the boundary.
const WHITE_COL = { 0: 1, 2: 3, 4: 5, 5: 7, 7: 9, 9: 11, 11: 13 }
const BLACK_COL = { 1: 2, 3: 4, 6: 8, 8: 10, 10: 12 }
const keyClass = o => (BLACK_COL[o.pc] ? 'sp-key--black' : 'sp-key--white')
const keyStyle = o => (BLACK_COL[o.pc]
  ? { gridColumn: `${BLACK_COL[o.pc]} / span 2`, gridRow: 1 }
  : { gridColumn: `${WHITE_COL[o.pc]} / span 2`, gridRow: 2 })

function onKey(e) {
  if (e.target.closest?.('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return
  if (phase.value !== 'run') return
  const r = round.value
  if (!r?.options || answered.value || listening.value) return
  if (r.layout === 'piano') {
    const i = r.options.findIndex(o => o.hotkey && o.hotkey === e.key.toLowerCase())
    if (i >= 0) { e.preventDefault(); answer(i) }
    return
  }
  if (r.noHotkeys || !/^[0-9]$/.test(e.key)) return
  const i = e.key === '0' ? 9 : Number(e.key) - 1
  if (i < r.options.length) { e.preventDefault(); answer(i) }
}
onMounted(() => { window.addEventListener('keydown', onKey) })
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  cancelAnimationFrame(raf)
  clearTimeout(timer)
  runId++
})
</script>

<style scoped>
.sp { border-color: rgba(255, 214, 10, 0.28); background: rgba(255, 214, 10, 0.03); }
.sp.ct--done { border-color: rgba(46, 204, 113, 0.45); }
.ct { margin: 20px 0; padding: 16px 18px 18px; border: 1px solid; border-radius: 14px; }
.ct-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.ct-kind { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; border-radius: 6px; padding: 2px 7px; }
.sp-kind { color: var(--jd-amber); border: 1px solid rgba(255, 214, 10, 0.4); }
.ct-title { font-family: var(--jd-display); font-style: italic; font-size: 1.15em; color: var(--jd-text); }
.ct-spacer { flex: 1; }
.ct-hint { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); margin: 6px 0 0; line-height: 1.55; }
.ct-prompt { font-size: 1.02em; color: var(--jd-text); margin: 12px 0 2px; line-height: 1.5; }
.ct-prompt :deep(strong) { color: var(--jd-amber); }
.ct-status { min-height: 1.4em; font-family: var(--jd-mono); font-size: 0.8em; color: var(--jd-text-soft); text-align: center; margin-top: 4px; }
.ct-status.ok { color: var(--jd-green); }
.ct-status.bad { color: var(--jd-red); }
.ct-actions { display: flex; align-items: center; gap: 10px; margin-top: 12px; flex-wrap: wrap; }
.ct-next { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.4); }
.ct-sound { margin-top: 8px; }
.ct-listen { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.ct-guitar { margin-top: 6px; }
.sp { container-type: inline-size; }
@container (max-width: 420px) {
  .ct-actions { justify-content: center; row-gap: 8px; }
  .ct-actions .ct-spacer { display: none; }
}

.sp-medals { display: inline-flex; gap: 5px; }
.sp-medal { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid #3a342c; background: transparent; }
.sp-medal--1.won { background: #cd7f32; border-color: #cd7f32; }
.sp-medal--2.won { background: #c9ced6; border-color: #c9ced6; }
.sp-medal--3.won { background: var(--jd-amber); border-color: var(--jd-amber); box-shadow: 0 0 8px rgba(255, 214, 10, 0.5); }

.sp-levels { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 12px; }
.sp-level {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px; min-width: 120px;
  padding: 8px 12px; border-radius: 10px; cursor: pointer; text-align: left;
  background: rgba(255, 255, 255, 0.03); border: 1px solid var(--jd-line-strong); color: var(--jd-text-soft);
}
.sp-level.on { border-color: var(--jd-amber); background: rgba(255, 214, 10, 0.08); color: var(--jd-text); }
.sp-level:disabled { opacity: 0.4; cursor: default; }
.sp-level-name { font-family: var(--jd-display); font-style: italic; font-size: 1.15em; }
.sp-level--1 .sp-level-name { color: #e09a5a; }
.sp-level--2 .sp-level-name { color: #d5d9e0; }
.sp-level--3 .sp-level-name { color: var(--jd-amber); }
.sp-level-target, .sp-level-lock { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; color: var(--jd-muted); }
.sp-level.won .sp-level-target::after { content: ' ✓'; color: var(--jd-green); }
.sp-start-row { display: flex; align-items: center; flex-wrap: wrap; gap: 14px; }
.sp-start { color: var(--jd-amber); border-color: var(--jd-amber); }
.sp-best { font-family: var(--jd-mono); font-size: 0.72em; color: var(--jd-muted); }

.sp-top { display: flex; align-items: center; gap: 12px; margin-top: 12px; }
.sp-count, .sp-time { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); min-width: 48px; }
.sp-time { text-align: right; color: var(--jd-text-soft); }
.sp-bar { flex: 1; height: 5px; border-radius: 3px; background: #2a2620; overflow: hidden; }
.sp-bar-fill { display: block; height: 100%; background: var(--jd-amber); }
.sp-bar-fill.over { background: var(--jd-red); }
.sp-prompt { font-size: 1.1em; }

.cq-options { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 12px 0 6px; }
.cq-opt {
  position: relative; min-width: 56px; padding: 9px 14px; border-radius: 10px; cursor: pointer;
  font-family: var(--jd-mono); font-size: 0.9em; font-weight: 700;
  color: var(--jd-text); background: rgba(255, 255, 255, 0.04); border: 1px solid var(--jd-line-strong);
}
@media (hover: hover) { .cq-opt:hover:not(:disabled) { background: rgba(255, 214, 10, 0.1); border-color: var(--jd-amber); } }
.cq-opt:disabled { cursor: default; }
.cq-opt.ok { background: rgba(46, 204, 113, 0.2); border-color: var(--jd-green); color: var(--jd-green); }
.cq-opt.bad { background: rgba(255, 69, 58, 0.16); border-color: var(--jd-red); color: var(--jd-red); }
kbd { position: absolute; top: 2px; right: 4px; font-family: var(--jd-mono); font-size: 8px; color: var(--jd-muted); background: none; padding: 0; }

.sp-piano {
  display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); grid-template-rows: auto auto;
  gap: 4px; max-width: 480px; margin: 12px auto 6px;
}
.sp-key {
  position: relative; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; cursor: pointer; font-family: var(--jd-mono); font-weight: 700; padding: 0 2px;
}
.sp-key--white { height: 48px; background: #ede8df; color: #141210; border: 1px solid #ede8df; font-size: 0.9em; }
.sp-key--black { height: 40px; background: #2a2620; color: var(--jd-text); border: 1px solid #4a463f; font-size: 0.68em; line-height: 1.1; }
.sp-key span { white-space: pre-line; text-align: center; }
@media (hover: hover) { .sp-key:hover:not(:disabled) { outline: 2px solid var(--jd-amber); } }
.sp-key:disabled { cursor: default; }
.sp-key.ok { background: var(--jd-green); border-color: var(--jd-green); color: #0b0a09; }
.sp-key.bad { background: var(--jd-red); border-color: var(--jd-red); color: #fff; }
.sp-key kbd { top: 1px; right: 3px; color: inherit; opacity: 0.45; }

.sp-result { margin-top: 12px; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(255, 69, 58, 0.35); background: rgba(255, 69, 58, 0.05); }
.sp-result.passed { border-color: rgba(46, 204, 113, 0.45); background: rgba(46, 204, 113, 0.06); }
.sp-result-title { font-family: var(--jd-display); font-style: italic; font-size: 1.5em; color: var(--jd-red); }
.sp-result.passed .sp-result-title { color: var(--jd-green); }
.sp-result-figures { display: flex; flex-wrap: wrap; gap: 6px 22px; margin-top: 6px; font-family: var(--jd-mono); font-size: 0.8em; color: var(--jd-text-soft); }
.sp-result-figures strong { color: var(--jd-text); font-size: 1.15em; }
.sp-missed { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 10px; }
.sp-missed-label { font-family: var(--jd-mono); font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-muted); }
.sp-missed-item { font-size: 0.8em; padding: 3px 9px; border-radius: 8px; border: 1px solid var(--jd-line); color: var(--jd-text-soft); }
.sp-missed-item :deep(strong) { color: var(--jd-text); }
</style>
