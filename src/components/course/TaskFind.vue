<template>
  <section class="ct" :class="{ 'ct--done': finished }">
    <header class="ct-head">
      <span class="ct-kind">{{ t('cr.task') }}</span>
      <span class="ct-title" v-if="spec.title">{{ L(spec.title) }}</span>
      <span class="ct-spacer"></span>
      <span class="ct-pips" :aria-label="`${t('cr.round')} ${Math.min(solvedCount + 1, rounds)} / ${rounds}`">
        <span v-for="i in rounds" :key="i" class="ct-pip"
          :class="{ ok: i - 1 < solvedCount, cur: i - 1 === solvedCount && !finished }"></span>
      </span>
    </header>

    <template v-if="round">
      <p class="ct-prompt" v-html="L(round.prompt)"></p>
      <p v-if="round.hint" class="ct-hint" v-html="L(round.hint)"></p>

      <NeckDiagram
        :from="round.from ?? 0" :to="round.to ?? 12"
        :dots="shownDots" :labels="round.labels || 'note'" :toggle="false"
        :focus="round.focus || []" :boxes="round.boxes || []"
        :clickable="phase === 'ask'"
        @pick="onPick"
      />

      <div class="ct-status" :class="statusClass" aria-live="polite">{{ status }}</div>

      <div class="ct-actions">
        <span v-if="round.mode !== 'one' && phase === 'ask'" class="ct-count">
          {{ t('cr.found') }} {{ found.size }} / {{ needed }}
        </span>
        <span class="ct-spacer"></span>
        <button v-if="phase === 'ask'" class="jd-toolbtn" type="button" @click="giveUp">{{ t('cr.show') }}</button>
        <button v-if="phase === 'solved' && !finished" class="jd-toolbtn ct-next" type="button" @click="nextRound">{{ t('cr.next-round') }} ▸</button>
        <button v-if="finished" class="jd-toolbtn" type="button" @click="restart">↻ {{ t('cr.again') }}</button>
      </div>

      <div v-if="finished" class="ct-complete">✓ {{ t('cr.task-done') }}</div>

      <GuitarInputPanel v-if="spec.guitar !== false" :guitar="guitar" class="ct-guitar" />
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import NeckDiagram from './NeckDiagram.vue'
import GuitarInputPanel from '../shared/GuitarInputPanel.vue'
import { useI18n } from '../../composables/useI18n.js'
import { useGuitarInput } from '../../composables/useGuitarInput.js'
import { usePracticeStore } from '../../stores/practice.js'
import { useAudioStore } from '../../stores/audio.js'
import { midiAt, pcAt, neutralName, pretty, colorOf, stringNumber } from '../../course/theory.js'

const props = defineProps({
  spec:   { type: Object, required: true },   // { title?, rounds, make(i, prev) }
  itemId: { type: String, default: 'course' },   // exercise id in the practice history
  itemKey: { type: String, default: '' },         // item key in it: 'module:step'
})
const emit = defineEmits(['done'])

const { t, lang } = useI18n()
const practice = usePracticeStore()
const audio = useAudioStore()
const guitar = useGuitarInput({ onNote: onGuitarNote })

const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))
const key = (s, f) => `${s}-${f}`

const rounds = computed(() => props.spec.rounds || 1)
const roundIdx = ref(0)
const solvedCount = ref(0)
const round = ref(null)
const found = ref(new Set())
const wrongs = ref([])          // [{ s, f, id }]
const phase = ref('ask')        // ask | solved
const finished = ref(false)
const status = ref('')
const statusClass = ref('')
const errorsThisRound = ref(0)
let timers = []

function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id }

// A round gives `targets` (all to find, or any one with mode 'one'), or `groups`:
// alternative sets of positions, any one of which completes the round.
function newRound() {
  const r = props.spec.make(roundIdx.value, round.value)
  if (r.groups) {
    const seen = new Set()
    r.targets = r.groups.flat().filter(d => !seen.has(key(d.s, d.f)) && seen.add(key(d.s, d.f)))
  }
  round.value = r
  found.value = new Set()
  wrongs.value = []
  phase.value = 'ask'
  errorsThisRound.value = 0
  status.value = ''
  statusClass.value = ''
}

const targetKeys = computed(() => new Set((round.value?.targets || []).map(d => key(d.s, d.f))))
const needed = computed(() => round.value?.groups ? round.value.groups[0].length : (round.value?.targets.length || 0))

function roundComplete(foundSet) {
  const r = round.value
  if (r.mode === 'one') return true
  if (r.groups) return r.groups.some(g => g.every(d => foundSet.has(key(d.s, d.f))))
  return foundSet.size >= r.targets.length
}

const shownDots = computed(() => {
  if (!round.value) return []
  const r = round.value
  const map = new Map()
  for (const d of r.dots || []) map.set(key(d.s, d.f), d)
  if (phase.value === 'solved') {
    for (const d of r.reveal || []) map.set(key(d.s, d.f), d)
    for (const d of r.targets) {
      const k = key(d.s, d.f)
      map.set(k, found.value.has(k)
        ? { ...d, color: '#2ecc71' }
        : { ...d, color: d.color || (d.semi !== undefined ? colorOf(d.semi) : '#2ecc71'), ring: true })
    }
  } else {
    for (const d of r.targets) if (found.value.has(key(d.s, d.f))) map.set(key(d.s, d.f), { ...d, color: '#2ecc71' })
  }
  for (const w of wrongs.value) map.set(key(w.s, w.f), { s: w.s, f: w.f, color: '#ff453a', label: pretty(neutralName(pcAt(w.s, w.f))) })
  return [...map.values()]
})

function sound(s, f) {
  audio.init().then(() => {
    if (typeof Tone === 'undefined') return
    guitar.holdOff(500, pcAt(s, f))
    audio.playNotesAt([midiAt(s, f)], Tone.now() + 0.02, 0.5, 0.55)
  })
}

function hit(keys) {
  const next = new Set(found.value)
  keys.forEach(k => next.add(k))
  found.value = next
  if (!roundComplete(next)) {
    status.value = t('cr.right')
    statusClass.value = 'ok'
    return
  }
  solve(true)
}

function solve(success) {
  phase.value = 'solved'
  if (success) {
    solvedCount.value++
    status.value = errorsThisRound.value ? t('cr.solved-errors').replace('{n}', errorsThisRound.value) : t('cr.solved')
    statusClass.value = 'ok'
  } else {
    status.value = t('cr.shown')
    statusClass.value = 'bad'
  }
  if (solvedCount.value >= rounds.value) {
    finished.value = true
    emit('done')
    return
  }
  if (success && !errorsThisRound.value) later(nextRound, 1500)
}

function nextRound() {
  if (phase.value !== 'solved') return
  timers.forEach(clearTimeout); timers = []
  if (solvedCount.value >= rounds.value) { finished.value = true; emit('done'); return }
  roundIdx.value++
  newRound()
}

function giveUp() {
  errorsThisRound.value++
  practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, false)
  // A round shown does not count: rounds go on until enough are solved.
  solve(false)
}

function wrong(s, f, viaGuitar = false) {
  errorsThisRound.value++
  const name = pretty(neutralName(pcAt(s, f)))
  status.value = t('cr.wrong-at').replace('{s}', stringNumber(s)).replace('{f}', f).replace('{n}', name)
  statusClass.value = 'bad'
  const id = Math.random()
  wrongs.value = [...wrongs.value, { s, f, id }]
  later(() => { wrongs.value = wrongs.value.filter(w => w.id !== id) }, 1600)
  practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, false, viaGuitar ? { guitar: true } : { s, f })
}

function onPick({ s, f }) {
  if (phase.value !== 'ask') return
  sound(s, f)
  const k = key(s, f)
  if (found.value.has(k)) return
  if (targetKeys.value.has(k)) {
    practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, true, { s, f })
    hit([k])
  } else {
    wrong(s, f)
  }
}

function onGuitarNote({ midi }) {
  if (phase.value !== 'ask' || !round.value) return
  const matches = round.value.targets.filter(d => midiAt(d.s, d.f) === midi && !found.value.has(key(d.s, d.f)))
  if (matches.length) {
    practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, true, { guitar: true })
    hit(matches.map(d => key(d.s, d.f)))
    return
  }
  const samePc = round.value.targets.some(d => midiAt(d.s, d.f) % 12 === midi % 12)
  if (samePc) {
    status.value = t('cr.octave-off')
    statusClass.value = ''
    return
  }
  status.value = t('cr.wrong-played').replace('{n}', pretty(neutralName(midi % 12)))
  statusClass.value = 'bad'
  errorsThisRound.value++
  practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, false, { guitar: true })
}

function restart() {
  timers.forEach(clearTimeout); timers = []
  roundIdx.value = 0
  solvedCount.value = 0
  finished.value = false
  newRound()
}

newRound()
onUnmounted(() => timers.forEach(clearTimeout))
</script>

<style scoped>
.ct {
  margin: 20px 0;
  padding: 16px 18px 18px;
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 14px;
  background: rgba(34, 197, 94, 0.035);
}
.ct--done { border-color: rgba(46, 204, 113, 0.45); }
.ct-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.ct-kind {
  font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--jd-improv); border: 1px solid rgba(34, 197, 94, 0.35); border-radius: 6px; padding: 2px 7px;
}
.ct-title { font-family: var(--jd-display); font-style: italic; font-size: 1.15em; color: var(--jd-text); }
.ct-spacer { flex: 1; }
.ct-pips { display: inline-flex; gap: 4px; }
.ct-pip { width: 9px; height: 9px; border-radius: 50%; background: #2a2620; border: 1px solid #3a342c; }
.ct-pip.ok { background: var(--jd-green); border-color: var(--jd-green); }
.ct-pip.cur { border-color: var(--jd-amber); }
.ct-prompt { font-size: 1.02em; color: var(--jd-text); margin: 14px 0 2px; line-height: 1.5; }
.ct-prompt :deep(strong) { color: var(--jd-amber); }
.ct-hint { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); margin: 4px 0 0; line-height: 1.5; }
.ct-status { min-height: 1.4em; font-family: var(--jd-mono); font-size: 0.8em; color: var(--jd-text-soft); text-align: center; }
.ct-status.ok { color: var(--jd-green); }
.ct-status.bad { color: var(--jd-red); }
.ct-actions { display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap; }
.ct-count { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); letter-spacing: 1px; }
.ct-next { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.4); }
.ct-complete {
  margin-top: 12px; text-align: center; font-family: var(--jd-mono); font-size: 0.8em; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--jd-green);
}
.ct-guitar { margin-top: 6px; }
</style>
