<template>
  <section class="ct" :class="{ 'ct--done': finished }">
    <header class="ct-head">
      <span class="ct-kind">{{ t(spec.flash ? 'cr.memory' : 'cr.task') }}</span>
      <span class="ct-title" v-if="spec.title">{{ L(spec.title) }}</span>
      <span class="ct-spacer"></span>
      <span class="ct-pips" :aria-label="`${t('cr.round')} ${Math.min(solvedCount + 1, rounds)} / ${rounds}`">
        <span v-for="i in rounds" :key="i" class="ct-pip"
          :class="{ ok: i - 1 < solvedCount, cur: i - 1 === solvedCount && !finished }"></span>
      </span>
    </header>

    <template v-if="round">
      <p class="ct-prompt" v-html="L(round.prompt)"></p>
      <p v-if="round.hint && phase !== 'show'" class="ct-hint" v-html="L(round.hint)"></p>

      <div v-if="round.sound" class="ct-sound">
        <button class="jd-toolbtn ct-listen" type="button" :disabled="playing" @click="playRound">▶ {{ t(heard ? 'cr.listen-again' : 'cr.listen') }}</button>
      </div>

      <div v-if="phase === 'show'" class="ct-flash" aria-live="polite">
        <span>{{ t('cr.memorize') }}</span>
        <span class="ct-flash-bar"><span class="ct-flash-fill" :style="{ animationDuration: flashMs + 'ms' }"></span></span>
      </div>

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
          {{ t('cr.found') }} {{ foundCount }} / {{ needed }}
        </span>
        <span class="ct-spacer"></span>
        <button v-if="phase === 'ask' && round.flash" class="jd-toolbtn" type="button" @click="peek">{{ t('cr.peek') }}</button>
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
import { midiAt, pcAt, neutralName, pretty, colorOf, stringNumber, mod12 } from '../../course/theory.js'
import { playSound } from '../../course/sound.js'

// A round of make(i, prev) gives:
//   targets          positions to find: all of them, or any one with mode 'one'
//   groups           alternative sets of positions, any one of which completes the round
//   sequence         notes to play in order: [{ midi } or { pc, strings? }, label?]; any position
//                    with that pitch counts, so it can be answered on the guitar too
//   flash            ms during which the targets are shown before they hide (memory round)
//   sound            something to hear first (see course/sound.js), with a replay button
//   dots, reveal     context shown all along / extra dots shown once the round is over
const props = defineProps({
  spec:    { type: Object, required: true },   // { title?, rounds, make(i, prev), flash? }
  itemId:  { type: String, default: 'course' },   // exercise id in the practice history
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
const seqHits = ref([])         // sequence rounds: [{ s, f, label }] in the order played
const wrongs = ref([])          // [{ s, f, id }]
const phase = ref('ask')        // show | ask | solved
const finished = ref(false)
const status = ref('')
const statusClass = ref('')
const errorsThisRound = ref(0)
const flashMs = ref(0)
const playing = ref(false)
const heard = ref(false)
let timers = []

function later(fn, ms) { const id = setTimeout(fn, ms); timers.push(id); return id }
const recordKey = () => props.itemKey || round.value?.key || props.itemId

function newRound() {
  timers.forEach(clearTimeout); timers = []
  const r = props.spec.make(roundIdx.value, round.value)
  if (r.groups) {
    const seen = new Set()
    r.targets = r.groups.flat().filter(d => !seen.has(key(d.s, d.f)) && seen.add(key(d.s, d.f)))
  }
  r.targets = r.targets || []
  round.value = r
  found.value = new Set()
  seqHits.value = []
  wrongs.value = []
  errorsThisRound.value = 0
  status.value = ''
  statusClass.value = ''
  heard.value = false
  if (r.flash) showFlash(r.flash)
  else phase.value = 'ask'
  if (r.sound && audio.isInitialized) playRound()
}

function showFlash(ms) {
  flashMs.value = ms
  phase.value = 'show'
  later(() => { if (phase.value === 'show') phase.value = 'ask' }, ms)
}

function peek() {
  errorsThisRound.value++
  showFlash(Math.max(800, Math.round((round.value.flash || 2000) / 2)))
}

async function playRound() {
  if (!round.value?.sound) return
  playing.value = true
  guitar.holdOff(3500)
  const ms = await playSound(round.value.sound)
  heard.value = true
  later(() => { playing.value = false }, ms + 400)
}

const targetKeys = computed(() => new Set((round.value?.targets || []).map(d => key(d.s, d.f))))
const isSequence = computed(() => !!round.value?.sequence)
const needed = computed(() => {
  const r = round.value
  if (!r) return 0
  if (r.sequence) return r.sequence.length
  return r.groups ? r.groups[0].length : r.targets.length
})
const foundCount = computed(() => (isSequence.value ? seqHits.value.length : found.value.size))

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
  if (phase.value === 'show') {
    for (const d of r.targets) map.set(key(d.s, d.f), { ...d, color: d.color || (d.semi !== undefined ? colorOf(d.semi) : '#FFD60A') })
  } else if (phase.value === 'solved') {
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
  for (const h of seqHits.value) map.set(key(h.s, h.f), { s: h.s, f: h.f, color: '#2ecc71', label: h.label })
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
  if (solvedCount.value >= rounds.value) { finished.value = true; emit('done'); return }
  roundIdx.value++
  newRound()
}

function giveUp() {
  errorsThisRound.value++
  practice.record(props.itemId, recordKey(), false)
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
  practice.record(props.itemId, recordKey(), false, viaGuitar ? { guitar: true } : { s, f })
}

// Next note of a sequence round: does this pitch (and string) match it?
function matchesNext(midi, s = null) {
  const want = round.value.sequence[seqHits.value.length]
  if (!want) return false
  if (want.strings && s !== null && !want.strings.includes(s)) return false
  return want.midi !== undefined ? want.midi === midi : mod12(want.pc) === mod12(midi)
}

function seqHit(s, f, viaGuitar = false) {
  const want = round.value.sequence[seqHits.value.length]
  seqHits.value = [...seqHits.value, { s, f, label: want.label ?? pretty(neutralName(mod12(midiAt(s, f)))) }]
  practice.record(props.itemId, recordKey(), true, viaGuitar ? { guitar: true } : { s, f })
  if (seqHits.value.length >= round.value.sequence.length) solve(true)
  else { status.value = t('cr.right'); statusClass.value = 'ok' }
}

function onPick({ s, f }) {
  if (phase.value !== 'ask') return
  sound(s, f)
  if (isSequence.value) {
    if (matchesNext(midiAt(s, f), s)) seqHit(s, f)
    else wrong(s, f)
    return
  }
  const k = key(s, f)
  if (found.value.has(k)) return
  if (targetKeys.value.has(k)) {
    practice.record(props.itemId, recordKey(), true, { s, f })
    hit([k])
  } else {
    wrong(s, f)
  }
}

function onGuitarNote({ midi }) {
  if (phase.value !== 'ask' || !round.value) return
  if (isSequence.value) {
    if (matchesNext(midi)) {
      // Mark the position nearest to the context dots (the played string is not known).
      const from = round.value.from ?? 0, to = round.value.to ?? 12
      const spots = []
      for (let s = 0; s < 6; s++) { const f = midi - midiAt(s, 0); if (f >= from && f <= to) spots.push({ s, f }) }
      const ref = round.value.dots?.[0]
      spots.sort((a, b) => (ref ? Math.abs(a.f - ref.f) - Math.abs(b.f - ref.f) : a.f - b.f))
      if (spots.length) seqHit(spots[0].s, spots[0].f, true)
    } else {
      status.value = t('cr.wrong-played').replace('{n}', pretty(neutralName(midi % 12)))
      statusClass.value = 'bad'
      errorsThisRound.value++
      practice.record(props.itemId, recordKey(), false, { guitar: true })
    }
    return
  }
  const matches = round.value.targets.filter(d => midiAt(d.s, d.f) === midi && !found.value.has(key(d.s, d.f)))
  if (matches.length) {
    practice.record(props.itemId, recordKey(), true, { guitar: true })
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
  practice.record(props.itemId, recordKey(), false, { guitar: true })
}

function restart() {
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
/* The card's own width (not the screen) decides when the footer stacks */
.ct { container-type: inline-size; }
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
.ct-sound { margin-top: 10px; }
.ct-listen { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.ct-flash { display: flex; align-items: center; gap: 12px; margin-top: 10px; font-family: var(--jd-mono); font-size: 0.75em; letter-spacing: 1.5px; text-transform: uppercase; color: var(--jd-amber); }
.ct-flash-bar { flex: 1; max-width: 260px; height: 4px; border-radius: 2px; background: #2a2620; overflow: hidden; }
.ct-flash-fill { display: block; height: 100%; background: var(--jd-amber); animation: ct-drain linear forwards; }
@keyframes ct-drain { from { width: 100%; } to { width: 0%; } }
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
/* Narrow card: count above, buttons centred under it, like the status and guitar panel */
@container (max-width: 420px) {
  .ct-actions { justify-content: center; row-gap: 8px; }
  .ct-actions .ct-spacer { display: none; }
  .ct-count { flex-basis: 100%; text-align: center; }
}
</style>
