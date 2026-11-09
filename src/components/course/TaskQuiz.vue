<template>
  <section class="ct" :class="{ 'ct--done': finished }">
    <header class="ct-head">
      <span class="ct-kind">{{ t('cr.quiz') }}</span>
      <span class="ct-title" v-if="spec.title">{{ L(spec.title) }}</span>
      <span class="ct-spacer"></span>
      <span class="ct-pips" :aria-label="`${correct} / ${need}`">
        <span v-for="i in need" :key="i" class="ct-pip" :class="{ ok: i - 1 < correct, cur: i - 1 === correct && !finished }"></span>
      </span>
    </header>

    <template v-if="round">
      <p class="ct-prompt" v-html="L(round.prompt)"></p>
      <p v-if="round.hint" class="ct-hint" v-html="L(round.hint)"></p>

      <div v-if="round.sound" class="ct-sound">
        <button class="jd-toolbtn ct-listen" type="button" :disabled="playing" @click="playRound">▶ {{ t(heard ? 'cr.listen-again' : 'cr.listen') }}</button>
      </div>

      <NeckDiagram v-if="round.diagram" v-bind="round.diagram" :toggle="answered ? round.diagram.toggle !== false : false" :labels="answered ? (round.diagram.labelsAfter || round.diagram.labels || 'note') : (round.diagram.labels || 'none')" />

      <div class="cq-options">
        <button
          v-for="(o, i) in round.options" :key="i" type="button" class="cq-opt"
          :class="{ ok: answered && o.ok, bad: answered && chosen === i && !o.ok }"
          :disabled="answered"
          @click="answer(i)"
        >{{ L(o.label) }}</button>
      </div>

      <div class="ct-status" :class="statusClass" aria-live="polite">{{ status }}</div>
      <p v-if="answered && round.explain" class="ct-hint cq-explain" v-html="L(round.explain)"></p>

      <div class="ct-actions">
        <span class="ct-spacer"></span>
        <button v-if="answered && !finished" class="jd-toolbtn ct-next" type="button" @click="next">{{ t('cr.next-round') }} ▸</button>
        <button v-if="finished" class="jd-toolbtn" type="button" @click="restart">↻ {{ t('cr.again') }}</button>
      </div>
      <div v-if="finished" class="ct-complete">✓ {{ t('cr.task-done') }}</div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import NeckDiagram from './NeckDiagram.vue'
import { useI18n } from '../../composables/useI18n.js'
import { usePracticeStore } from '../../stores/practice.js'
import { useAudioStore } from '../../stores/audio.js'
import { playSound } from '../../course/sound.js'

const props = defineProps({
  spec:   { type: Object, required: true },   // { title?, need, make(i, prev) }
  itemId: { type: String, default: 'course' },   // exercise id in the practice history
  itemKey: { type: String, default: '' },         // item key in it: 'module:step'
})
const emit = defineEmits(['done'])

const { t, lang } = useI18n()
const practice = usePracticeStore()
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))

const need = computed(() => props.spec.need || 5)
const idx = ref(0)
const correct = ref(0)
const round = ref(null)
const answered = ref(false)
const chosen = ref(-1)
const finished = ref(false)
const status = ref('')
const statusClass = ref('')
let timer = null

const audio = useAudioStore()
const playing = ref(false)
const heard = ref(false)
let soundTimer = null

// Rounds with a sound play it at once when the audio is already running (after the first click).
async function playRound() {
  if (!round.value?.sound) return
  playing.value = true
  const ms = await playSound(round.value.sound)
  heard.value = true
  clearTimeout(soundTimer)
  soundTimer = setTimeout(() => { playing.value = false }, ms + 400)
}

function newRound() {
  round.value = props.spec.make(idx.value, round.value)
  heard.value = false
  if (round.value.sound && audio.isInitialized) playRound()
  answered.value = false
  chosen.value = -1
  status.value = ''
  statusClass.value = ''
}

function answer(i) {
  if (answered.value) return
  answered.value = true
  chosen.value = i
  const ok = !!round.value.options[i].ok
  practice.record(props.itemId, props.itemKey || round.value.key || props.itemId, ok)
  if (ok) {
    correct.value++
    status.value = t('cr.right')
    statusClass.value = 'ok'
    if (correct.value >= need.value) { finished.value = true; emit('done'); return }
    if (!round.value.explain) timer = setTimeout(next, 1200)
  } else {
    const right = round.value.options.find(o => o.ok)
    status.value = `${t('cr.wrong')} ${L(right?.label)}`
    statusClass.value = 'bad'
  }
}

function next() {
  clearTimeout(timer)
  if (finished.value) return
  idx.value++
  newRound()
}

function restart() {
  clearTimeout(timer)
  idx.value = 0
  correct.value = 0
  finished.value = false
  newRound()
}

newRound()
onUnmounted(() => { clearTimeout(timer); clearTimeout(soundTimer) })
</script>

<style scoped>
.ct {
  margin: 20px 0;
  padding: 16px 18px 18px;
  border: 1px solid rgba(58, 154, 217, 0.3);
  border-radius: 14px;
  background: rgba(58, 154, 217, 0.04);
}
.ct--done { border-color: rgba(46, 204, 113, 0.45); }
.ct-head { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.ct-kind {
  font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--jd-synth); border: 1px solid rgba(58, 154, 217, 0.4); border-radius: 6px; padding: 2px 7px;
}
.ct-title { font-family: var(--jd-display); font-style: italic; font-size: 1.15em; color: var(--jd-text); }
.ct-spacer { flex: 1; }
.ct-pips { display: inline-flex; gap: 4px; flex-wrap: wrap; }
.ct-pip { width: 9px; height: 9px; border-radius: 50%; background: #2a2620; border: 1px solid #3a342c; }
.ct-pip.ok { background: var(--jd-green); border-color: var(--jd-green); }
.ct-pip.cur { border-color: var(--jd-amber); }
.ct-prompt { font-size: 1.02em; color: var(--jd-text); margin: 14px 0 2px; line-height: 1.5; }
.ct-prompt :deep(strong) { color: var(--jd-amber); }
.ct-hint { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); margin: 4px 0 0; line-height: 1.5; }
.ct-sound { margin-top: 10px; }
.ct-listen { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.cq-explain { text-align: center; color: var(--jd-text-soft); }
.cq-options { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 12px 0 8px; }
.cq-opt {
  min-width: 64px; padding: 9px 16px; border-radius: 10px; cursor: pointer;
  font-family: var(--jd-mono); font-size: 0.85em; font-weight: 700; letter-spacing: 0.5px;
  color: var(--jd-text); background: rgba(255, 255, 255, 0.04); border: 1px solid var(--jd-line-strong);
  transition: background 0.15s, border-color 0.15s;
}
.cq-opt:hover:not(:disabled) { background: rgba(255, 214, 10, 0.1); border-color: var(--jd-amber); }
.cq-opt:disabled { cursor: default; opacity: 0.55; }
.cq-opt.ok { opacity: 1; background: rgba(46, 204, 113, 0.18); border-color: var(--jd-green); color: var(--jd-green); }
.cq-opt.bad { opacity: 1; background: rgba(255, 69, 58, 0.15); border-color: var(--jd-red); color: var(--jd-red); }
.ct-status { min-height: 1.4em; font-family: var(--jd-mono); font-size: 0.8em; color: var(--jd-text-soft); text-align: center; }
.ct-status.ok { color: var(--jd-green); }
.ct-status.bad { color: var(--jd-red); }
.ct-actions { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
.ct-next { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.4); }
.ct-complete {
  margin-top: 12px; text-align: center; font-family: var(--jd-mono); font-size: 0.8em; letter-spacing: 1.5px;
  text-transform: uppercase; color: var(--jd-green);
}
</style>
