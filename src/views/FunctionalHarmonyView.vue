<template>
  <div id="view-functional-harmony" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('fh.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container" style="padding-top: 20px;">
      <p style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">{{ t('fh.subtitle') }}</p>

      <section class="jd-console" style="padding: 25px; margin-bottom: 25px;">
        <div class="jd-grain" aria-hidden="true"></div>

        <div class="jd-section-label">
          <span>{{ t('quiz.difficulty') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <div class="fh-levels">
          <button v-for="d in ['easy', 'medium', 'hard']" :key="d" class="et-diff-btn"
            :class="{ active: difficulty === d }" @click="setDifficulty(d)">{{ t('et.' + d) }}</button>
        </div>

        <div class="jd-rule" aria-hidden="true"></div>

        <div class="fh-score">
          <div style="color: var(--jd-text-soft);">{{ t('label.score') }}: <strong style="color: var(--jd-text);">{{ score }} / {{ total }}</strong></div>
          <div style="color: var(--jd-amber);">{{ t('label.streak') }}: <strong>{{ streak }}</strong></div>
        </div>

        <!-- Key, always stated: numerals only mean something relative to a tonic -->
        <div v-if="q" class="fh-key">
          <span class="fh-key-label">{{ t('fh.key') }}</span>
          <strong>{{ q.tonic }} {{ q.mode === 'major' ? t('fh.major') : t('fh.minor') }}</strong>
        </div>

        <!-- Progression -->
        <div class="fh-prog">
          <div v-if="q" class="fh-chords">
            <div v-for="(chord, idx) in q.chords" :key="idx" class="progression-step fh-chord"
              :class="{ 'active-step': idx === q.targetIdx, playing: idx === playingIdx }">
              <div class="fh-chord-name">{{ chord.name }}</div>
              <div v-if="answered" class="fh-chord-deg">{{ chord.id }}</div>
              <div v-if="answered" class="fh-chord-tag">{{ tagOf(chord) }}</div>
              <div v-else-if="idx === q.targetIdx" class="fh-chord-deg">?</div>
            </div>
          </div>
          <div v-else class="fh-ready">{{ t('fh.ready') }}</div>
        </div>

        <div class="jd-toolbar fh-actions">
          <button class="jd-toolbtn" style="min-width:160px;" @click="generateNew" :disabled="!!q && !answered">
            {{ answered ? t('fh.next') : t('fh.start') }}
          </button>
          <button class="jd-toolbtn" :disabled="!q" @click="listen">▶ {{ t('fh.listen') }}</button>
          <button class="jd-toolbtn" :disabled="!q || answered || hintShown" @click="hintShown = true">{{ t('fh.hint') }}</button>
          <button class="jd-toolbtn jd-toolbtn--reset" @click="resetGame">{{ t('btn.reset-game') }}</button>
        </div>

        <p v-if="q && hintShown && !answered" class="fh-hint">{{ hintText }}</p>

        <div class="jd-section-label">
          <span>{{ q ? t(q.mode === 'major' ? 'fh.degrees-major' : 'fh.degrees-minor') : t('cf.results') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <div class="jd-grid-fixed-4 fh-grid">
          <button v-for="deg in palette" :key="deg" class="et-choice-btn"
            :class="{
              correct: answered && deg === target.id,
              wrong:   answered && deg === selectedAnswer && deg !== target.id,
            }"
            :disabled="!q || answered"
            @click="checkAnswer(deg)"
          >{{ deg }}</button>
        </div>

        <div class="fh-status" :style="{ color: lastCorrect ? 'var(--jd-improv)' : 'var(--jd-red)' }">{{ statusMsg }}</div>

        <!-- Why -->
        <div v-if="answered" class="fh-why">
          <p class="fh-why-main">{{ whyText(target) }}</p>
          <p class="fh-why-fn">{{ FUNCTION_TEXT[lang][degreeOf(target).fn] }}</p>
          <details class="fh-analysis">
            <summary>{{ t('fh.analysis') }}</summary>
            <ul>
              <li v-for="(chord, i) in q.chords" :key="i">
                <strong>{{ chord.name }}</strong> = {{ chord.id }} · {{ FUNCTION_TEXT[lang][degreeOf(chord).fn] }}
              </li>
            </ul>
          </details>
        </div>
      </section>

      <div class="teoria-tip">
        <strong>{{ t('label.pro-tip') }}:</strong> {{ t('fh.notation') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useAppStore } from '../stores/app.js'
import { useAudioStore } from '../stores/audio.js'
import { usePracticeStore } from '../stores/practice.js'
import { getNoteIdx } from '../utils/theory.js'
import { getChordIntervals, parseChord } from '../utils/chordParser.js'
import { DEGREES, makeQuestion, paletteOf, spellRoot, intervalName, FUNCTION_TEXT, FUNCTION_TAG } from '../utils/functionalHarmony.js'

const { t } = useI18n()
const appStore = useAppStore()
const audio = useAudioStore()
const practice = usePracticeStore()
const lang = computed(() => (appStore.lang === 'en' ? 'en' : 'it'))

// ── State ─────────────────────────────────────────────────────────────────────
const difficulty     = ref('easy')
const q              = ref(null)        // { mode, tonic, chords: [{ id, name }], targetIdx }
const answered       = ref(false)
const selectedAnswer = ref(null)
const hintShown      = ref(false)
const playingIdx     = ref(-1)
const score          = ref(0)
const total          = ref(0)
const streak         = ref(0)
const statusMsg      = ref('')
const lastCorrect    = ref(false)
let timers = []

const target  = computed(() => q.value?.chords[q.value.targetIdx] || {})
const palette = computed(() => paletteOf(difficulty.value, q.value?.mode || 'major'))

const degreeOf = chord => DEGREES[q.value.mode][chord.id]
const tagOf = chord => FUNCTION_TAG[lang.value][degreeOf(chord).fn]
const QUALITY_TEXT = {
  it: { maj7: 'maggiore con settima maggiore', m7: 'minore settima', '7': 'di dominante', m7b5: 'semidiminuito', dim7: 'diminuito' },
  en: { maj7: 'major seventh', m7: 'minor seventh', '7': 'dominant seventh', m7b5: 'half-diminished', dim7: 'diminished seventh' },
}

function rootOf(chord) {
  return spellRoot(q.value.tonic, degreeOf(chord))
}

// e.g. "Ebmaj7 in C maggiore: Eb è una terza minore sopra C e l'accordo è maggiore con settima maggiore → bIII."
function whyText(chord) {
  const d = degreeOf(chord)
  const key = `${q.value.tonic} ${q.value.mode === 'major' ? t('fh.major') : t('fh.minor')}`
  return t(d.semis === 0 ? 'fh.why-tonic' : 'fh.why')
    .replace('{0}', chord.name).replace('{1}', key).replace('{2}', rootOf(chord))
    .replace('{3}', intervalName(d, lang.value)).replace('{4}', q.value.tonic)
    .replace('{5}', QUALITY_TEXT[lang.value][d.quality]).replace('{6}', chord.id)
}

const hintText = computed(() => {
  if (!q.value) return ''
  const d = degreeOf(target.value)
  return t(d.semis === 0 ? 'fh.hint-tonic' : 'fh.hint-text')
    .replace('{0}', target.value.name).replace('{1}', rootOf(target.value))
    .replace('{2}', intervalName(d, lang.value)).replace('{3}', q.value.tonic)
})

// ── Actions ───────────────────────────────────────────────────────────────────
function setDifficulty(d) {
  difficulty.value = d
  resetGame()
}

function generateNew() {
  stopListening()
  const next = makeQuestion(difficulty.value)
  if (!next) return
  // the chord asked is more often one whose degree is often missed
  next.targetIdx = practice.pickWeighted('functional-harmony', next.chords.map((_, i) => i), i => next.chords[i].id)
  q.value = next
  answered.value = false
  selectedAnswer.value = null
  hintShown.value = false
  statusMsg.value = ''
}

function checkAnswer(deg) {
  if (!q.value || answered.value) return
  selectedAnswer.value = deg
  answered.value = true
  total.value++
  const correct = deg === target.value.id
  lastCorrect.value = correct
  practice.record('functional-harmony', target.value.id, correct)
  if (correct) {
    score.value++
    streak.value++
    statusMsg.value = t('fh.correct')
  } else {
    streak.value = 0
    statusMsg.value = t('fh.wrong')
  }
}

// The progression played one chord per second, the sounding chord highlighted.
async function listen() {
  if (!q.value) return
  stopListening()
  await audio.init()
  q.value.chords.forEach((chord, i) => {
    timers.push(setTimeout(() => {
      playingIdx.value = i
      const p = parseChord(chord.name)
      audio.playChord(getChordIntervals(chord.name), getNoteIdx(p.root), 0, 0.95, 0.25, 'Electric Piano', 4)
    }, i * 1000))
  })
  timers.push(setTimeout(() => { playingIdx.value = -1 }, q.value.chords.length * 1000))
}

function stopListening() {
  timers.forEach(clearTimeout)
  timers = []
  playingIdx.value = -1
}

function resetGame() {
  stopListening()
  q.value = null
  answered.value = false
  hintShown.value = false
  score.value = 0
  total.value = 0
  streak.value = 0
  statusMsg.value = ''
}

onUnmounted(stopListening)
</script>

<style scoped>
.fh-levels { display: flex; gap: 8px; align-items: center; justify-content: center; margin-bottom: 20px; }
.fh-score { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-family: var(--jd-mono); font-size: 0.8em; letter-spacing: 1px; }
.fh-key { position: relative; z-index: 1; display: flex; align-items: baseline; justify-content: center; gap: 10px; margin-bottom: 12px; }
.fh-key-label { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-muted); }
.fh-key strong { font-size: 1.3em; color: var(--jd-amber); }
.fh-prog { position: relative; z-index: 1; padding: 20px; margin-bottom: 20px; background: var(--jd-bg-deep); border-radius: 12px; border: 1px solid var(--jd-line); }
.fh-chords { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
.fh-chord { padding: 12px 18px; min-width: 84px; text-align: center; flex-direction: column; justify-content: center; gap: 2px; }
.fh-chord.playing { border-color: var(--jd-amber); background: rgba(255, 214, 10, 0.08); }
.fh-chord-name { font-size: 1.35em; font-weight: 700; color: var(--jd-text); }
.fh-chord-deg { font-size: 0.85em; color: var(--jd-amber); margin-top: 4px; font-weight: 700; font-family: var(--jd-mono); }
.fh-chord-tag { font-size: 0.7em; color: var(--jd-text-soft); margin-top: 2px; font-family: var(--jd-mono); }
.fh-ready { color: var(--jd-muted); font-style: italic; font-family: var(--jd-mono); font-size: 0.8em; text-align: center; }
.fh-actions { justify-content: center; margin-bottom: 18px; flex-wrap: wrap; gap: 8px; }
.fh-hint { position: relative; z-index: 1; text-align: center; font-size: 0.9em; color: var(--jd-text); margin: 0 0 16px; }
.fh-grid { margin-bottom: 20px; }
/* Phones: four answers per row instead of one long column */
@media (max-width: 600px) { .fh-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; } }
.fh-grid .et-choice-btn { padding: 10px 4px; font-family: var(--jd-mono); font-size: 0.95em; font-weight: 700; }
/* after answering the buttons are disabled (dimmed): keep the right and the chosen one fully visible */
.fh-grid .et-choice-btn.correct, .fh-grid .et-choice-btn.wrong { opacity: 1; }
.fh-status { text-align: center; font-size: 0.9em; min-height: 28px; font-family: var(--jd-mono); font-weight: 700; letter-spacing: 0.5px; position: relative; z-index: 1; }
.fh-why { position: relative; z-index: 1; margin-top: 8px; padding: 14px 16px; border: 1px solid var(--jd-line-strong); border-radius: 10px; background: rgba(0, 0, 0, 0.25); }
.fh-why-main { margin: 0 0 6px; color: var(--jd-text); font-size: 0.92em; }
.fh-why-fn { margin: 0; color: var(--jd-text-soft); font-size: 0.88em; line-height: 1.55; }
.fh-analysis { margin-top: 10px; }
.fh-analysis summary { cursor: pointer; font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--jd-muted); }
.fh-analysis ul { margin: 8px 0 0; padding-left: 18px; font-size: 0.85em; color: var(--jd-text-soft); line-height: 1.6; }
.fh-analysis strong { color: var(--jd-text); }

/* Short screens (phones held sideways): the chords, the buttons and the answers in one view */
@media (max-height: 520px) {
  .fh-levels, .fh-score { margin-bottom: 8px; }
  .fh-prog { padding: 8px 10px; margin-bottom: 8px; }
  .fh-chords { gap: 6px; }
  .fh-chord { padding: 6px 10px; min-width: 64px; }
  .fh-chord-name { font-size: 1.05em; }
  .fh-actions { margin-bottom: 8px; }
  .fh-grid { grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 6px; margin-bottom: 8px; }
  .fh-grid .et-choice-btn { padding: 6px 2px; min-height: 0; }
}
</style>
