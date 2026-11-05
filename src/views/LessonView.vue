<template>
  <div id="view-lesson" class="view-panel active jd-view ls-view">
    <template v-if="lesson">
      <header class="ls-head">
        <div class="ls-head-text">
          <span class="jd-titlemark-eyebrow">{{ fmt('ls.lesson-n', lessonNo, LESSONS.length) }}</span>
          <h1 class="ls-title">{{ L(lesson.title) }}</h1>
        </div>
        <RouterLink class="jd-toolbtn ls-btn ls-back" to="/lessons">← {{ t('ls.back') }}</RouterLink>
      </header>

      <ol class="ls-steps" :aria-label="t('ls.steps')">
        <li v-for="(s, i) in lesson.steps" :key="s.id">
          <button
            type="button"
            class="ls-step"
            :class="[`ls-step--${s.type}`, { current: !finished && i === stepIdx, done: progress.done[s.id] }]"
            :aria-current="!finished && i === stepIdx ? 'step' : undefined"
            :aria-label="`${i + 1}. ${t('ls.kind-' + s.type)}: ${L(s.title)}${progress.done[s.id] ? ' ✓' : ''}`"
            :title="L(s.title)"
            @click="goTo(i)"
          ><span aria-hidden="true">{{ progress.done[s.id] && s.type !== 'explain' ? '✓' : i + 1 }}</span></button>
        </li>
      </ol>

      <div v-if="!standard" class="ls-tuning" role="alert">
        <span>{{ fmt('ls.tuning', appStore.tuningName) }}</span>
        <button type="button" class="jd-toolbtn jd-toolbtn--add" @click="appStore.setTuningName(LESSON_TUNING)">{{ t('ls.tuning-btn') }}</button>
      </div>

      <!-- Current step -->
      <section v-if="!finished && step" class="jd-console ls-card">
        <div class="jd-grain" aria-hidden="true"></div>

        <div class="ls-card-head">
          <span class="ls-kind" :class="`ls-kind--${step.type}`">{{ t('ls.kind-' + step.type) }}</span>
          <span class="ls-count">{{ fmt('ls.step-n', stepIdx + 1, lesson.steps.length) }}</span>
        </div>
        <h2 class="ls-step-title">{{ L(step.title) }}</h2>
        <p class="ls-text" v-html="L(step.text)"></p>
        <ul v-if="step.list" class="tip-list ls-list">
          <li v-for="(item, k) in L(step.list)" :key="k">
            <span class="tip-num">{{ k + 1 }}</span>
            <div class="tip-content"><strong>{{ item[0] }}</strong> {{ item[1] }}</div>
          </li>
        </ul>
        <p v-if="step.after" class="ls-text ls-after" v-html="L(step.after)"></p>

        <!-- Read -->
        <div v-if="step.type === 'explain'" class="ls-task ls-task--explain">
          <div v-if="step.play" class="ls-actions">
            <button type="button" class="jd-toolbtn jd-toolbtn--add" :disabled="!standard || playing" @click="listenMarks">▶ {{ t('ls.listen') }}</button>
          </div>
          <p class="ls-aside">{{ t('ls.explore') }}</p>
        </div>

        <!-- Watch and repeat -->
        <div v-else-if="step.type === 'mirror'" class="ls-task">
          <div class="ls-dots" aria-hidden="true">
            <span
              v-for="(n, k) in step.seq" :key="k" class="ls-dot"
              :class="{
                ok: m.phase === 'done' || (m.phase === 'repeat' && k < m.idx),
                now: (m.phase === 'watch' && k === m.watchIdx) || (m.phase === 'repeat' && k === m.idx),
                seen: m.phase === 'watch' && k < m.watchIdx,
              }"
            ></span>
          </div>
          <div class="ls-status" :class="mirrorTone" aria-live="polite">{{ mirrorStatus }}</div>
          <div class="ls-actions">
            <button type="button" class="jd-toolbtn jd-toolbtn--add" :disabled="!standard || m.phase === 'watch'" @click="watchDemo">
              ▶ {{ m.phase === 'idle' ? t('ls.watch') : t('ls.watch-again') }}
            </button>
            <button v-if="(m.phase === 'repeat' && m.idx > 0) || m.phase === 'done'" type="button" class="jd-toolbtn ls-btn" @click="startRepeat">
              {{ t('ls.repeat-again') }}
            </button>
          </div>
        </div>

        <!-- Practice -->
        <div v-else-if="step.type === 'quiz'" class="ls-task">
          <template v-if="q.finished">
            <div class="ls-prompt" :class="q.passed ? 'is-ok' : 'is-ko'">{{ q.passed ? t('ls.q-passed') : t('ls.q-failed') }}</div>
            <div class="ls-status" aria-live="polite">{{ quizResult }}</div>
            <div class="ls-actions">
              <button type="button" class="jd-toolbtn" :class="q.passed ? 'ls-btn' : 'jd-toolbtn--add'" @click="startQuiz">{{ t('ls.retry') }}</button>
            </div>
          </template>
          <template v-else-if="q.question">
            <div class="ls-q-meta">{{ fmt('ls.q-of', q.i + 1, step.count) }}</div>
            <div class="ls-prompt">{{ L(q.question.prompt) }}</div>
            <div class="ls-status" :class="quizTone" aria-live="polite">{{ quizStatus }}</div>
            <p v-if="q.hintShown && !q.answered" class="ls-hint">{{ L(q.question.hint) }}</p>
            <div class="ls-actions">
              <button v-if="!q.answered" type="button" class="jd-toolbtn ls-btn" :disabled="!standard || q.hintShown" @click="showHint">{{ t('ls.hint') }}</button>
              <button v-else type="button" class="jd-toolbtn jd-toolbtn--add" @click="advanceQuiz">{{ q.i + 1 >= step.count ? t('ls.q-results') : t('ls.q-next') }} →</button>
            </div>
          </template>
          <div class="ls-dots" aria-hidden="true">
            <span
              v-for="k in step.count" :key="k" class="ls-dot"
              :class="{ ok: q.results[k - 1] === true, ko: q.results[k - 1] === false, now: !q.finished && k - 1 === q.i && !q.answered }"
            ></span>
          </div>
        </div>

        <GuitarInputPanel v-if="step.type !== 'explain'" :guitar="guitar" />

        <div class="jd-rule" aria-hidden="true"></div>
        <nav class="ls-nav">
          <button type="button" class="jd-toolbtn ls-btn" :disabled="stepIdx === 0" @click="goTo(stepIdx - 1)">← {{ t('ls.prev') }}</button>
          <button type="button" class="jd-toolbtn" :class="nextIsSkip ? 'ls-btn' : 'jd-toolbtn--add'" @click="next">{{ nextLabel }} →</button>
        </nav>
      </section>

      <!-- End of the lesson -->
      <section v-else-if="finished" class="jd-console ls-card ls-end">
        <div class="jd-grain" aria-hidden="true"></div>
        <span class="ls-kind" :class="complete ? 'ls-kind--quiz' : 'ls-kind--mirror'">{{ complete ? t('ls.done-kicker') : t('ls.partial-kicker') }}</span>
        <h2 class="ls-step-title">{{ complete ? t('ls.done-title') : t('ls.partial-title') }}</h2>
        <p class="ls-text">
          {{ complete ? fmt('ls.done-text', t(lesson.practice.nav)) : fmt(counts.total - counts.done === 1 ? 'ls.partial-one' : 'ls.partial-many', counts.total - counts.done) }}
        </p>
        <div class="ls-end-actions">
          <button v-if="!complete" type="button" class="jd-toolbtn jd-toolbtn--add" @click="goTo(firstTodo)">{{ t('ls.go-todo') }} →</button>
          <RouterLink v-if="nextLesson" class="jd-toolbtn" :class="complete ? 'jd-toolbtn--add' : 'ls-btn'" :to="`/lessons/${nextLesson.id}`">
            {{ fmt('ls.next-lesson', L(nextLesson.title)) }} →
          </RouterLink>
          <RouterLink class="jd-toolbtn ls-btn" :to="lesson.practice.path">{{ fmt('ls.practice-more', t(lesson.practice.nav)) }}</RouterLink>
          <button type="button" class="jd-toolbtn ls-btn" @click="goTo(0)">{{ t('ls.repeat-lesson') }}</button>
        </div>
      </section>
    </template>

    <div v-else class="jd-console ls-card">
      <p class="ls-text">{{ t('ls.not-found') }}</p>
      <RouterLink class="jd-toolbtn jd-toolbtn--add" to="/lessons">{{ t('ls.all-lessons') }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore }      from '../stores/app.js'
import { useAudioStore }    from '../stores/audio.js'
import { usePracticeStore } from '../stores/practice.js'
import { useI18n }          from '../composables/useI18n.js'
import { useGuitarInput, midiToName } from '../composables/useGuitarInput.js'
import { INTERVAL_DEGREES } from '../utils/theory.js'
import { LESSONS, LESSON_TUNING, NOTE_COLOR, INTERACTIVE, findLesson, midiOf, pcOf, positionsOfMidi } from '../utils/fretboardLessons.js'
import { lessonState, markStepDone, setLessonPosition, lessonCounts, isLessonDone } from '../utils/lessonProgress.js'
import GuitarInputPanel from '../components/shared/GuitarInputPanel.vue'

// While the app plays a note, a microphone may hear it: ignore that pitch for a moment.
const SELF_SOUND_HOLDOFF_MS = 600
const DEMO_STEP_MS = 750       // one note of a demonstration
const FLASH_MS     = 700       // a wrong answer stays red this long
const PASS_RATIO   = 0.7
const OK_COLOR = '#2ecc71'
const KO_COLOR = '#e74c3c'

const route    = useRoute()
const appStore = useAppStore()
const audio    = useAudioStore()
const practice = usePracticeStore()
const { t }    = useI18n()
const guitar   = useGuitarInput({ onNote: onGuitarNote })

const lang = computed(() => (appStore.lang === 'en' ? 'en' : 'it'))
const L    = o => (o ? (o[lang.value] ?? o.it) : '')
const fmt  = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))

const lesson     = computed(() => findLesson(route.params.id))
const lessonNo   = computed(() => LESSONS.indexOf(lesson.value) + 1)
const nextLesson = computed(() => LESSONS[lessonNo.value] || null)
const progress   = computed(() => lessonState(lesson.value?.id))
const counts     = computed(() => lessonCounts(lesson.value))
const complete   = computed(() => isLessonDone(lesson.value))
const firstTodo  = computed(() => Math.max(0, lesson.value.steps.findIndex(s => INTERACTIVE.includes(s.type) && !progress.value.done[s.id])))
const standard   = computed(() => appStore.tuningName === LESSON_TUNING)

const stepIdx  = ref(0)
const finished = ref(false)
const playing  = ref(false)
const step     = computed(() => lesson.value?.steps[stepIdx.value] || null)

const nextIsSkip = computed(() => !!step.value && step.value.type !== 'explain' && !progress.value.done[step.value.id])
const nextLabel  = computed(() => {
  if (nextIsSkip.value) return t('ls.skip')
  return stepIdx.value === lesson.value.steps.length - 1 ? t('ls.finish') : t('ls.next')
})

// ── State of the current step ────────────────────────────────────────────────
// Mirror: idle → watch (the app plays the sequence) → repeat (the student plays it back) → done
const m = reactive({ phase: 'idle', idx: 0, watchIdx: -1, miss: 0, errors: 0, tone: '', heard: '' })
// Quiz: one question at a time, `results` holds true/false per answer
// Shape questions (`question.shapes`): the notes found so far are in `picked`.
const q = reactive({ i: 0, results: [], question: null, answered: false, hintShown: false, finished: false, passed: false, heard: '', feedback: [], picked: [] })

// Every step change bumps the token: pending timeouts and demonstrations of the old step stop.
let token = 0
let timers = []
function later(fn, ms) {
  const my = token
  timers.push(setTimeout(() => { if (my === token) fn() }, ms))
}
function cancelAll() {
  token++
  timers.forEach(clearTimeout)
  timers = []
  playing.value = false
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

// ── Fretboard ────────────────────────────────────────────────────────────────
function circleAt(p) {
  return document.querySelector(`.fretboard-layer .note-circle[data-string-index="${p.s}"][data-fret-index="${p.f}"]`)
}

function clearBoard() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    c.className = 'note-circle'; c.innerText = ''
    c.style.cssText = ''; c.style.opacity = '0.04'
  })
}

// style: 'solid' (filled, with label), 'dim' (already shown in a demonstration), 'ghost' (dashed outline)
function paint(p, { color = NOTE_COLOR, label = '', style = 'solid', cls = '' } = {}) {
  const c = circleAt(p)
  if (!c) return
  c.className = cls ? `note-circle ${cls}` : 'note-circle'
  c.style.cssText = ''
  c.innerText = ''
  if (style === 'ghost') {
    c.style.backgroundColor = 'transparent'
    c.style.border = `2px dashed ${color}`
    c.style.boxShadow = 'none'
    c.style.opacity = '0.9'
    if (label) { c.innerText = label; c.style.color = color }
  } else {
    c.style.backgroundColor = color
    c.style.opacity = style === 'dim' ? '0.45' : '1'
    c.style.color = 'rgba(0,0,0,0.85)'
    c.innerText = label
  }
}

// Draws the fretboard for the current state of the step.
function redraw() {
  clearBoard()
  const s = step.value
  if (!s || finished.value || !standard.value) return
  if (s.type === 'explain') {
    for (const mk of s.marks || []) paint(mk, { color: mk.color, label: mk.label })
  } else if (s.type === 'mirror') {
    s.seq.forEach((mk, k) => {
      if (m.phase === 'done' || (m.phase === 'repeat' && k < m.idx)) paint(mk, { color: mk.color, label: mk.label })
      else if (m.phase === 'repeat' && k === m.idx && m.miss >= 2) paint(mk, { color: mk.color, label: mk.label, cls: 'lsn-pulse' })
      else if (m.phase === 'repeat' && s.guide) paint(mk, { color: mk.color, style: 'ghost' })
    })
  } else if (s.type === 'quiz' && q.question && !q.finished) {
    if (q.hintShown && !q.answered) {
      for (const mk of q.question.hintMarks || []) paint(mk, { color: mk.color, label: mk.label, style: 'ghost' })
    }
    for (const mk of q.question.context || []) paint(mk, { color: mk.color, label: mk.label })
    for (const mk of q.picked) paint(mk, { color: OK_COLOR, label: mk.label })
    for (const mk of q.feedback) paint(mk, { color: mk.color, label: mk.label })
  }
}

function scrollToBoard() {
  document.querySelector('.fretboard-container')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
}
// Scrolls the fretboard sideways (on narrow screens) so that this note is visible.
// Only horizontally: a second vertical smooth scroll would cut short scrollToBoard().
function scrollToCircle(p) {
  const c = circleAt(p)
  const w = document.querySelector('.scroll-wrapper')
  if (!c || !w || p.f === 0) return          // fret 0 sits on the sticky nut, always in view
  const cr = c.getBoundingClientRect()
  const wr = w.getBoundingClientRect()
  const nut = document.querySelector('.fretboard-layer .fret-0')?.getBoundingClientRect().width || 0
  const pad = 40
  if (cr.right > wr.right - pad) w.scrollBy({ left: cr.right - wr.right + pad * 2, behavior: 'smooth' })
  else if (cr.left < wr.left + nut + pad) w.scrollBy({ left: cr.left - wr.left - nut - pad * 2, behavior: 'smooth' })
}

function noteLabel(p) {
  return appStore.currentNotes[pcOf(p)]
}

function playPos(p) {
  guitar.holdOff(SELF_SOUND_HOLDOFF_MS, pcOf(p))
  audio.playChord([0], midiOf(p), 0, 0.8, 0.2, 'Electric Piano')
}

// A clicked note that is not an answer: show its name for a moment.
function peek(p) {
  paint(p, { color: '#ede8df', label: noteLabel(p) })
  later(redraw, 900)
}

// ── Steps ────────────────────────────────────────────────────────────────────
function enterStep() {
  cancelAll()
  asked = new Set()
  Object.assign(m, { phase: 'idle', idx: 0, watchIdx: -1, miss: 0, errors: 0, tone: '', heard: '' })
  Object.assign(q, { i: 0, results: [], question: null, answered: false, hintShown: false, finished: false, passed: false, heard: '', feedback: [], picked: [] })
  const s = step.value
  if (!s) return
  setLessonPosition(lesson.value.id, stepIdx.value)
  if (s.type === 'explain') markStepDone(lesson.value.id, s.id)
  if (s.type === 'quiz' && standard.value) newQuestion()
  redraw()
}

function goTo(i) {
  if (!lesson.value || i < 0 || i >= lesson.value.steps.length) return
  finished.value = false
  stepIdx.value = i
  enterStep()
  scrollToBoard()
}

function next() {
  if (stepIdx.value < lesson.value.steps.length - 1) return goTo(stepIdx.value + 1)
  cancelAll()
  finished.value = true
  clearBoard()
}

function openLesson() {
  finished.value = false
  const l = lesson.value
  if (!l) { cancelAll(); clearBoard(); return }
  const at = lessonState(l.id).at
  stepIdx.value = !isLessonDone(l) && Number.isInteger(at) && at < l.steps.length ? at : 0
  enterStep()
}

// ── Read: play the marked notes in order ─────────────────────────────────────
async function listenMarks() {
  if (!standard.value) return
  cancelAll()
  const my = token
  redraw()
  scrollToBoard()
  await audio.init()
  playing.value = true
  for (const mk of step.value.marks || []) {
    if (my !== token) return
    const c = circleAt(mk)
    c?.classList.add('lsn-now')
    scrollToCircle(mk)
    playPos(mk)
    await wait(DEMO_STEP_MS)
    c?.classList.remove('lsn-now')
  }
  if (my === token) playing.value = false
}

// ── Watch and repeat ─────────────────────────────────────────────────────────
async function watchDemo() {
  if (!standard.value) return
  cancelAll()
  const my = token
  Object.assign(m, { phase: 'watch', idx: 0, watchIdx: -1, miss: 0, errors: 0, tone: '', heard: '' })
  redraw()
  scrollToBoard()
  await audio.init()
  playing.value = true
  const seq = step.value.seq
  for (let k = 0; k < seq.length; k++) {
    if (my !== token) return
    if (k > 0) paint(seq[k - 1], { color: seq[k - 1].color, label: seq[k - 1].label, style: 'dim' })
    paint(seq[k], { color: seq[k].color, label: seq[k].label, cls: 'lsn-now' })
    m.watchIdx = k
    scrollToCircle(seq[k])
    playPos(seq[k])
    await wait(DEMO_STEP_MS)
  }
  await wait(400)
  if (my !== token) return
  playing.value = false
  startRepeat()
}

function startRepeat() {
  cancelAll()
  Object.assign(m, { phase: 'repeat', idx: 0, watchIdx: -1, miss: 0, errors: 0, tone: '', heard: '' })
  guitar.allowRepeat(pcOf(step.value.seq[0]))
  redraw()
  scrollToCircle(step.value.seq[0])
}

// `pos`: clicked position; `midi` + `played`: note heard from the guitar
function answerMirror({ pos, midi, played = '' }) {
  const s = step.value
  const want = s.seq[m.idx]
  const ok = pos ? pos.s === want.s && pos.f === want.f : midi === midiOf(want)
  practice.record('lessons', lesson.value.id, ok, pos ? { s: pos.s, f: pos.f } : { guitar: true })
  m.heard = played
  if (ok) {
    m.idx++
    m.miss = 0
    m.tone = 'ok'
    if (m.idx >= s.seq.length) {
      m.phase = 'done'
      markStepDone(lesson.value.id, s.id)
    } else {
      guitar.allowRepeat(pcOf(s.seq[m.idx]))
    }
    redraw()
    return
  }
  m.miss++
  m.errors++
  m.tone = 'ko'
  redraw()
  for (const p of pos ? [pos] : positionsOfMidi(midi)) paint(p, { color: KO_COLOR, label: noteLabel(p) })
  later(redraw, FLASH_MS)
}

const mirrorStatus = computed(() => {
  const heard = m.heard ? ` · 🎸 ${m.heard}` : ''
  const len = step.value?.seq?.length || 0
  if (m.phase === 'idle') return t('ls.m-idle')
  if (m.phase === 'watch') return t('ls.m-watching')
  if (m.phase === 'done') {
    const done = m.errors === 0 ? t('ls.m-done-clean') : m.errors === 1 ? t('ls.m-done-one') : fmt('ls.m-done-many', m.errors)
    return done + heard
  }
  if (m.tone === 'ko') return (m.miss >= 2 ? t('ls.m-hint') : t('ls.m-wrong')) + heard
  return fmt(guitar.enabled ? 'ls.m-turn-play' : 'ls.m-turn', m.idx + 1, len) + heard
})
const mirrorTone = computed(() => (m.phase === 'done' ? 'is-ok' : m.phase === 'repeat' ? (m.tone === 'ko' ? 'is-ko' : '') : ''))

// ── Practice ─────────────────────────────────────────────────────────────────
// A question not asked yet in this round (or at least not the same as the last one).
let asked = new Set()
function newQuestion(prevId) {
  let next = step.value.ask()
  for (let tries = 0; asked.has(next.id) && tries < 40; tries++) next = step.value.ask()
  for (let tries = 0; next.id === prevId && tries < 20; tries++) next = step.value.ask()
  asked.add(next.id)
  Object.assign(q, { question: next, answered: false, hintShown: false, heard: '', feedback: [], picked: [] })
  redraw()
}

function startQuiz() {
  cancelAll()
  asked = new Set()
  Object.assign(q, { i: 0, results: [], question: null, answered: false, hintShown: false, finished: false, passed: false, heard: '', feedback: [], picked: [] })
  newQuestion()
  scrollToBoard()
}

function showHint() {
  q.hintShown = true
  redraw()
}

// The shapes still possible after the notes picked so far.
function openShapes() {
  const same = (a, b) => a.s === b.s && a.f === b.f
  return q.question.shapes.filter(shape => q.picked.every(p => shape.some(mk => same(mk, p))))
}

// Shape questions: every note of one shape, in any order. A note outside it ends the question.
function answerShape({ pos, midi, played = '' }) {
  const same = (a, b) => a.s === b.s && a.f === b.f
  const isPicked = mk => q.picked.some(p => same(p, mk))
  const hits = mk => (pos ? same(mk, pos) : midiOf(mk) === midi)
  q.heard = played
  // The same note again (clicked twice, or still ringing): nothing to judge.
  if (q.picked.some(hits)) return
  const shapes = openShapes()
  const found = shapes.flatMap(shape => shape.filter(mk => hits(mk) && !isPicked(mk)))[0]
  if (found) {
    q.picked.push(found)
    const done = openShapes().some(shape => shape.every(isPicked))
    if (!done) {
      for (const shape of openShapes()) for (const mk of shape) if (!isPicked(mk)) guitar.allowRepeat(pcOf(mk))
      redraw()
      return
    }
    q.answered = true
    q.results.push(true)
    practice.record('lessons', lesson.value.id, true, pos ? { s: pos.s, f: pos.f } : { guitar: true })
    redraw()
    if (!guitar.enabled || guitar.autoNext) later(advanceQuiz, 1500)
    return
  }
  q.answered = true
  q.results.push(false)
  practice.record('lessons', lesson.value.id, false, pos ? { s: pos.s, f: pos.f } : { guitar: true })
  const shape = shapes[0] || q.question.shapes[0]
  q.feedback = [
    ...shape.filter(mk => !isPicked(mk)).map(mk => ({ ...mk, color: OK_COLOR })),
    ...(pos ? [pos] : positionsOfMidi(midi)).map(p => ({ ...p, color: KO_COLOR, label: noteLabel(p) })),
  ]
  redraw()
  if (!guitar.enabled || guitar.autoNext) later(advanceQuiz, 2800)
}

function answerQuiz({ pos, midi, played = '' }) {
  const qq = q.question
  if (qq.shapes) return answerShape({ pos, midi, played })
  const ok = pos
    ? qq.accept.some(a => a.s === pos.s && a.f === pos.f)
    : qq.accept.some(a => midiOf(a) === midi)
  q.answered = true
  q.results.push(ok)
  q.heard = played
  practice.record('lessons', lesson.value.id, ok, pos ? { s: pos.s, f: pos.f } : { guitar: true })

  const answerLabel = qq.reveal?.[0]?.label || ''
  // With a root, a wrong note is named by its degree above it (the 3 instead of the b3…).
  const wrongLabel = p => {
    if (!qq.root) return noteLabel(p)
    const diff = midiOf(p) - midiOf(qq.root)
    if (diff === 0) return 'R'
    const deg = ((diff % 12) + 12) % 12
    return deg === 0 ? '8' : INTERVAL_DEGREES[deg]
  }
  const hit = pos ? [pos] : qq.accept.filter(a => midiOf(a) === midi)
  q.feedback = ok
    ? [
        ...(qq.revealOnRight ? qq.reveal : []),
        ...hit.map(p => ({ ...p, color: OK_COLOR, label: answerLabel || noteLabel(p) })),
      ]
    : [
        ...(qq.reveal || qq.accept).map(p => ({ ...p, color: OK_COLOR, label: p.label || answerLabel })),
        ...(pos ? [pos] : positionsOfMidi(midi)).map(p => ({ ...p, color: KO_COLOR, label: wrongLabel(p) })),
      ]
  redraw()
  if (!guitar.enabled || guitar.autoNext) later(advanceQuiz, ok ? 1300 : 2600)
}

function advanceQuiz() {
  if (!q.answered || q.finished) return
  cancelAll()
  if (q.i + 1 < step.value.count) {
    q.i++
    newQuestion(q.question.id)
    return
  }
  const right = q.results.filter(Boolean).length
  q.finished = true
  q.passed = right >= Math.ceil(step.value.count * PASS_RATIO)
  if (q.passed) markStepDone(lesson.value.id, step.value.id)
  redraw()
}

const quizStatus = computed(() => {
  const heard = q.heard ? ` · 🎸 ${q.heard}` : ''
  if (!q.answered && q.question?.shapes) {
    if (q.picked.length) return fmt('ls.q-partial', q.picked.length, q.question.shapes[0].length) + heard
    return guitar.enabled ? t('ls.q-play-shape') : t('ls.q-click-shape')
  }
  if (!q.answered) return guitar.enabled ? t('ls.q-play') : t('ls.q-click')
  return (q.results[q.results.length - 1] ? t('ls.q-correct') : t('ls.q-wrong')) + heard
})
const quizTone = computed(() => (!q.answered ? (q.picked.length ? 'is-ok' : '') : q.results[q.results.length - 1] ? 'is-ok' : 'is-ko'))
const quizResult = computed(() => {
  const count = step.value?.count || 0
  const right = q.results.filter(Boolean).length
  return q.passed
    ? fmt('ls.q-score', right, count)
    : `${fmt('ls.q-score', right, count)} ${fmt('ls.q-need', Math.ceil(count * PASS_RATIO))}`
})

// ── Input ────────────────────────────────────────────────────────────────────
async function onNoteClick(e) {
  if (!standard.value || finished.value || !step.value) return
  const { stringIndex, fretIndex } = e.detail
  const pos = { s: stringIndex, f: fretIndex }
  const s = step.value
  if (s.type === 'mirror' && m.phase === 'watch') return
  await audio.init()
  playPos(pos)
  if (s.type === 'mirror' && m.phase === 'repeat') answerMirror({ pos })
  else if (s.type === 'quiz' && q.question && !q.answered && !q.finished) answerQuiz({ pos })
  else if (s.type !== 'quiz') peek(pos)
}

function onGuitarNote({ midi }) {
  if (!standard.value || finished.value || !step.value) return
  const played = midiToName(midi, appStore.currentNotes)
  const s = step.value
  if (s.type === 'mirror' && m.phase === 'repeat') answerMirror({ midi, played })
  else if (s.type === 'quiz' && q.question && !q.answered && !q.finished) answerQuiz({ midi, played })
}

watch(() => route.params.id, () => { if (route.path.startsWith('/lessons/')) openLesson() })
watch(standard, ok => {
  if (ok && step.value?.type === 'quiz' && !q.question) newQuestion()
  else redraw()
})

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  openLesson()
})
onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  cancelAll()
  clearBoard()
})
</script>

<style scoped>
.ls-view { padding-top: 6px; }

.ls-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 0 4px 14px;
  border-bottom: 1px solid var(--jd-line);
  margin-bottom: 16px;
}
.ls-head-text { min-width: 0; }
.ls-title {
  font-family: var(--jd-display);
  font-style: italic;
  font-weight: 400;
  font-size: 38px;
  line-height: 1;
  margin: 0;
  color: var(--jd-text);
  letter-spacing: -0.02em;
}

.ls-btn {
  border-color: var(--jd-line-strong);
  color: var(--jd-text-soft);
  background: transparent;
  text-decoration: none;
}
.ls-btn:hover:not(:disabled) { color: var(--jd-amber); border-color: var(--jd-amber); }
.jd-toolbtn:disabled { opacity: 0.4; cursor: default; }
a.jd-toolbtn { text-decoration: none; }

/* Step strip */
.ls-steps {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0;
  margin: 0 0 16px;
}
.ls-step {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #2a2620;
  background: transparent;
  color: var(--jd-muted);
  font-family: var(--jd-mono);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: all 0.15s;
}
.ls-step:hover { border-color: var(--jd-line-strong); color: var(--jd-text); }
.ls-step--explain { border-style: dashed; }
.ls-step.done { color: var(--jd-text-soft); border-color: var(--jd-mute-deep); }
.ls-step.done:not(.ls-step--explain) { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.5); }
.ls-step.current { background: var(--jd-amber); border-color: var(--jd-amber); color: #0a0908; border-style: solid; }

.ls-tuning {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 69, 58, 0.4);
  border-radius: 10px;
  background: rgba(255, 69, 58, 0.07);
  color: var(--jd-text);
  font-size: 13px;
  line-height: 1.5;
}

/* Step card */
.ls-card { padding: 22px 26px; }
.ls-card > * { position: relative; z-index: 1; }
.ls-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.ls-kind {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid currentColor;
}
.ls-kind--explain { color: var(--jd-synth); }
.ls-kind--mirror  { color: var(--jd-amber); }
.ls-kind--quiz    { color: var(--jd-improv); }
.ls-count { font-size: 10px; letter-spacing: 2px; color: var(--jd-muted); text-transform: uppercase; }

.ls-step-title {
  font-family: var(--jd-display);
  font-style: italic;
  font-weight: 400;
  font-size: 28px;
  line-height: 1.1;
  margin: 0 0 10px;
  color: var(--jd-text);
}
.ls-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--jd-text-soft);
  margin: 0 0 8px;
  max-width: 72ch;
}
.ls-text :deep(strong) { color: var(--jd-text); }
.ls-text :deep(em) { color: var(--jd-amber-soft); }
.ls-list { margin: 10px 0 12px; max-width: 72ch; }
.ls-list li { font-size: 13px; color: var(--jd-text-soft); }
.ls-after { margin-top: 6px; }

.ls-task {
  margin-top: 18px;
  padding: 18px;
  border: 1px solid var(--jd-line);
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.18);
  text-align: center;
}
.ls-task--explain { padding: 12px 18px; }
.ls-aside { margin: 8px 0 0; font-size: 11px; color: var(--jd-muted); letter-spacing: 0.3px; }
.ls-task--explain .ls-actions + .ls-aside { margin-top: 10px; }

.ls-q-meta { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-muted); margin-bottom: 6px; }
.ls-prompt {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--jd-amber);
  line-height: 1.3;
}
.ls-prompt.is-ok { color: var(--jd-green); }
.ls-prompt.is-ko { color: #ff7a73; }
.ls-status {
  margin-top: 8px;
  min-height: 20px;
  font-size: 13px;
  color: var(--jd-text-soft);
  line-height: 1.5;
}
.ls-status.is-ok { color: var(--jd-green); }
.ls-status.is-ko { color: #ff7a73; }
.ls-hint {
  margin: 10px auto 0;
  max-width: 60ch;
  font-size: 13px;
  line-height: 1.6;
  color: var(--jd-text);
  background: rgba(255, 214, 10, 0.06);
  border: 1px dashed var(--jd-line-strong);
  border-radius: 8px;
  padding: 8px 12px;
}
.ls-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.ls-dots { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.ls-task > .ls-dots:first-child { margin: 0 0 10px; }
.ls-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2a2620;
  transition: all 0.2s;
}
.ls-dot.seen { background: rgba(255, 214, 10, 0.4); }
.ls-dot.now  { background: var(--jd-amber); box-shadow: 0 0 8px var(--jd-amber); }
.ls-dot.ok   { background: var(--jd-green); box-shadow: none; }
.ls-dot.ko   { background: var(--jd-red); }

.ls-nav {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.ls-card .jd-rule { margin: 20px -26px 16px; }

.ls-end-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

@media (max-width: 600px) {
  .ls-head { flex-wrap: nowrap; align-items: center; gap: 10px; padding-bottom: 10px; margin-bottom: 12px; }
  .ls-title { font-size: 24px; }
  .ls-back { height: 30px; padding: 0 10px; font-size: 10px; flex-shrink: 0; }
  .ls-steps { margin-bottom: 12px; }
  .ls-card { padding: 18px 16px; }
  .ls-card .jd-rule { margin: 18px -16px 14px; }
  .ls-step-title { font-size: 24px; }
  .ls-prompt { font-size: 20px; }
  .ls-task { padding: 14px 10px; }
  .ls-step { width: 30px; height: 30px; font-size: 11px; }
}
</style>
