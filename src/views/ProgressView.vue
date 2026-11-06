<template>
  <div id="view-progress" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('pg.title') }}</h1>
      </div>
    </header>

    <section v-if="!attempts.length" class="jd-console pg-empty">
      <div class="jd-grain" aria-hidden="true"></div>
      <p>{{ t('pg.empty') }}</p>
    </section>

    <template v-else>
      <!-- Headline figures -->
      <div class="pg-kpis">
        <div class="pg-kpi">
          <span class="pg-kpi-label">{{ t('pg.kpi-time') }}</span>
          <span class="pg-kpi-value">{{ formatMinutes(kpis.minutes) }}</span>
        </div>
        <div class="pg-kpi">
          <span class="pg-kpi-label">{{ t('pg.kpi-answers') }}</span>
          <span class="pg-kpi-value">{{ kpis.answers }}</span>
        </div>
        <div class="pg-kpi">
          <span class="pg-kpi-label">{{ t('pg.kpi-accuracy') }}</span>
          <span class="pg-kpi-value">{{ kpis.answers ? kpis.accuracy + '%' : '–' }}</span>
        </div>
        <div class="pg-kpi">
          <span class="pg-kpi-label">{{ t('pg.kpi-streak') }}</span>
          <span class="pg-kpi-value">{{ kpis.streak }} <small>{{ kpis.streak === 1 ? t('pg.day') : t('pg.days') }}</small></span>
        </div>
      </div>

      <!-- Practice time per day -->
      <section class="jd-console">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('pg.daily-title') }}</span>
          <span class="jd-section-rule"></span>
        </div>
        <div class="pg-chart" ref="dailyChart">
          <div class="pg-yaxis" aria-hidden="true">
            <span v-for="tick in dailyTicks" :key="tick" :style="{ bottom: (tick / dailyMax * 100) + '%' }">{{ tick }}</span>
          </div>
          <div class="pg-plot">
            <div v-for="tick in dailyTicks" :key="'g' + tick" class="pg-grid" :style="{ bottom: (tick / dailyMax * 100) + '%' }" aria-hidden="true"></div>
            <div
              v-for="d in daily" :key="d.key" class="pg-col"
              tabindex="0"
              :aria-label="`${d.long}: ${formatMinutes(d.minutes)}, ${d.answers} ${t('pg.answers')}`"
              @pointerenter="showTip($event, dailyChart, dayTip(d))" @pointermove="moveTip($event, dailyChart)" @pointerleave="hideTip"
              @focus="showTip($event, dailyChart, dayTip(d))" @blur="hideTip"
            >
              <div class="pg-bar" :class="{ today: d.today }" :style="{ height: (d.minutes / dailyMax * 100) + '%' }"></div>
            </div>
          </div>
          <div class="pg-xaxis" aria-hidden="true">
            <span v-for="d in daily" :key="'x' + d.key" :class="{ today: d.today }">{{ d.short }}</span>
          </div>
          <div v-if="tip.show && tip.owner === dailyChart" class="pg-tip" :class="{ below: tip.below }" :style="{ left: tip.x + 'px', top: tip.y + 'px' }">
            <strong>{{ tip.value }}</strong>
            <span v-for="line in tip.lines" :key="line">{{ line }}</span>
          </div>
        </div>
        <details class="pg-table-toggle">
          <summary>{{ t('pg.show-table') }}</summary>
          <table class="pg-table">
            <thead><tr><th>{{ t('pg.col-day') }}</th><th>{{ t('pg.col-minutes') }}</th><th>{{ t('pg.col-answers') }}</th><th>{{ t('pg.col-accuracy') }}</th></tr></thead>
            <tbody>
              <tr v-for="d in daily" :key="'t' + d.key">
                <td>{{ d.long }}</td><td>{{ d.minutes }}</td><td>{{ d.answers }}</td><td>{{ d.answers ? d.accuracy + '%' : '–' }}</td>
              </tr>
            </tbody>
          </table>
        </details>
      </section>

      <!-- Per exercise -->
      <section class="jd-console">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('pg.exercises-title') }}</span>
          <span class="jd-section-rule"></span>
        </div>
        <div class="pg-exercises">
          <div v-for="ex in exerciseRows" :key="ex.id" class="pg-ex">
            <div class="pg-ex-head">
              <RouterLink :to="ex.route" class="pg-ex-name">{{ ex.name }}</RouterLink>
              <span class="pg-ex-count">{{ ex.n }} {{ t('pg.answers') }}</span>
            </div>
            <div class="pg-meter" role="img" :aria-label="`${t('pg.col-accuracy')} ${ex.accuracy}%`">
              <div class="pg-meter-fill" :style="{ width: ex.accuracy + '%', background: statusColor(ex.accuracy) }"></div>
            </div>
            <div class="pg-ex-stats">
              <span>{{ t('pg.col-accuracy') }} <strong>{{ ex.accuracy }}%</strong></span>
              <span v-if="ex.n7">{{ t('pg.last7') }} <strong>{{ ex.accuracy7 }}%</strong></span>
            </div>
            <div v-if="ex.weak.length" class="pg-weak">
              <span class="pg-weak-label">{{ t('pg.weak') }}</span>
              <span v-for="w in ex.weak" :key="w.key" class="pg-chip">{{ w.label }} <em>{{ w.accuracy }}%</em></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Fretboard errors -->
      <section class="jd-console">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>{{ t('pg.heat-title') }}</span>
          <span class="jd-section-rule"></span>
        </div>
        <p class="pg-note">{{ t('pg.heat-desc') }}</p>
        <div v-if="heat.clicks" class="pg-heat-wrap" ref="heatChart">
          <div class="pg-heat-scroll">
          <div class="pg-heat" :style="{ gridTemplateColumns: `44px repeat(${heat.frets + 1}, 24px)` }">
            <span></span>
            <span v-for="f in heat.frets + 1" :key="'f' + f" class="pg-heat-fret">{{ f - 1 }}</span>
            <template v-for="s in 6" :key="'s' + s">
              <span class="pg-heat-string">{{ stringLabel(s - 1) }}</span>
              <span
                v-for="f in heat.frets + 1" :key="`${s}-${f}`"
                class="pg-cell" :class="{ empty: !cell(s - 1, f - 1).n }"
                :style="{ background: heatColor(cell(s - 1, f - 1).wrong) }"
                :tabindex="cell(s - 1, f - 1).n ? 0 : -1"
                :aria-label="cell(s - 1, f - 1).n ? cellTip(s - 1, f - 1).value + ', ' + cellTip(s - 1, f - 1).lines.join(', ') : undefined"
                @pointerenter="cell(s - 1, f - 1).n && showTip($event, heatChart, cellTip(s - 1, f - 1))"
                @pointermove="moveTip($event, heatChart)" @pointerleave="hideTip"
                @focus="showTip($event, heatChart, cellTip(s - 1, f - 1))" @blur="hideTip"
              ></span>
            </template>
          </div>
          </div>
          <div class="pg-legend" aria-hidden="true">
            <span>{{ t('pg.heat-less') }}</span>
            <span v-for="c in HEAT" :key="c" class="pg-legend-sw" :style="{ background: c }"></span>
            <span>{{ t('pg.heat-more') }}</span>
          </div>
          <div v-if="tip.show && tip.owner === heatChart" class="pg-tip" :class="{ below: tip.below }" :style="{ left: tip.x + 'px', top: tip.y + 'px' }">
            <strong>{{ tip.value }}</strong>
            <span v-for="line in tip.lines" :key="line">{{ line }}</span>
          </div>
        </div>
        <p v-else class="pg-note">{{ t('pg.heat-none') }}</p>
      </section>

      <div class="teoria-tip">{{ t('pg.tip') }}</div>

      <div class="pg-actions">
        <button class="jd-toolbtn jd-toolbtn--reset" @click="clearHistory">{{ t('pg.clear') }}</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import { usePracticeStore, practiceMsByDay, streakDays, dayKey } from '../stores/practice.js'
import { useI18n } from '../composables/useI18n.js'
import { INTERVAL_COLORS, INTERVAL_DEGREES, getPitchClass } from '../utils/theory.js'
import { lessonTitle } from '../utils/fretboardLessons.js'
import { stepTitle } from '../course/index.js'

const appStore = useAppStore()
const practice = usePracticeStore()
const { t } = useI18n()

const DAY_MS = 86400e3
const DAYS_SHOWN = 14
// Sequential ramp for error counts, validated against the console surface (#161412).
const HEAT = ['#8b2d26', '#b2352d', '#da3d34', '#ff453a']
const INTERVALS_IT = ['Unisono', '2ª min', '2ª magg', '3ª min', '3ª magg', '4ª giusta', 'Tritono', '5ª giusta', '6ª min', '6ª magg', '7ª min', '7ª magg', 'Ottava']
const INTERVALS_EN = ['Unison', 'min 2nd', 'maj 2nd', 'min 3rd', 'maj 3rd', 'P4', 'Tritone', 'P5', 'min 6th', 'maj 6th', 'min 7th', 'maj 7th', 'Octave']

// Every exercise that records answers, with how to name its items.
const EXERCISES = [
  { id: 'lessons',            nav: 'nav.lessons',               route: '/lessons',               item: k => lessonTitle(k, appStore.lang) },
  { id: 'note-finder',        nav: 'nav.note-finder',           route: '/note-finder',           item: k => appStore.currentNotes[+k] },
  { id: 'interval-learner',   nav: 'nav.interval-learner',      route: '/interval-learner',      item: k => (INTERVAL_DEGREES[parseInt(k)] || k) + (k.endsWith('d') ? ' ↓' : '') },
  { id: 'grade-learner',      nav: 'nav.grade-learner',         route: '/grade-learner',         item: k => INTERVAL_COLORS[+k]?.short || k },
  { id: 'triads',             nav: 'nav.triad-trainer',         route: '/triad-trainer',         item: chordItem },
  { id: 'sevenths',           nav: 'nav.seventh-trainer',       route: '/seventh-trainer',       item: chordItem },
  { id: 'ear-chords',         nav: 'nav.ear-training',          route: '/ear-training',          item: k => k },
  { id: 'ear-intervals',      nav: 'nav.interval-ear-training', route: '/interval-ear-training', item: k => (appStore.lang === 'it' ? INTERVALS_IT : INTERVALS_EN)[+k] || `${k}` },
  { id: 'ear-playback',       nav: 'nav.ear-playback',          route: '/ear-playback',          item: playbackItem },
  { id: 'changes',            nav: 'nav.changes-trainer',       route: '/changes-trainer',       item: k => `${t('ch.mode-' + k.split(':')[0])} · ${t('ch.group-' + k.split(':')[1])}` },
  { id: 'scale-tempo',        nav: 'nav.scale-tempo',           route: '/scale-tempo',           item: k => k },
  { id: 'functional-harmony', nav: 'nav.functional-harmony',    route: '/functional-harmony',    item: k => k },
  { id: 'quiz',               nav: 'nav.quiz',                  route: '/quiz',                  item: k => t('quiz.cat.' + k) },
  { id: 'course',             nav: 'cr.title',                  route: '/percorso',              item: k => stepTitle(k, appStore.lang) },
]

// 'i:+7' interval up a fifth, 'p:dorian' phrase in a scale, 'a:m7' arpeggio
function playbackItem(k) {
  const [kind, value] = k.split(':')
  if (kind === 'i') {
    const names = appStore.lang === 'it' ? INTERVALS_IT : INTERVALS_EN
    return `${names[Math.abs(+value)] || value} ${+value > 0 ? '↑' : '↓'}`
  }
  if (kind === 'p') return `${t('ep.q-phrase').replace('{0}', '').trim()} · ${t('ep.scale-' + value)}`
  return `${t('ep.mode-arpeggio')} · ${t('ct.q-' + value)}`
}

function chordItem(k) {
  const [quality, voicing, bass] = k.split('|')
  const parts = [t(`ct.q-${quality}`)]
  if (voicing && voicing !== 'close') parts.push(t(`ct.v-${voicing}`))
  if (bass !== undefined) parts.push(t(`ct.inv-${bass}`))
  return parts.join(' · ')
}

const attempts = computed(() => practice.attempts)
const pct = (ok, n) => (n ? Math.round((ok / n) * 100) : 0)

function startOfToday() {
  const d = new Date(); d.setHours(0, 0, 0, 0)
  return d.getTime()
}

// ── Headline figures ──────────────────────────────────────────────────────────
const kpis = computed(() => {
  const since = startOfToday() - 6 * DAY_MS
  const recent = attempts.value.filter(a => a.t >= since)
  let ms = 0
  for (const [day, v] of practiceMsByDay(recent)) if (day) ms += v
  return {
    minutes: Math.round(ms / 60e3),
    answers: recent.length,
    accuracy: pct(recent.filter(a => a.ok).length, recent.length),
    streak: streakDays(attempts.value),
  }
})

function formatMinutes(min) {
  if (min < 60) return `${min} min`
  return `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, '0')}`
}

// ── Practice time per day ─────────────────────────────────────────────────────
const daily = computed(() => {
  const msByDay = practiceMsByDay(attempts.value)
  const locale = appStore.lang === 'it' ? 'it-IT' : 'en-GB'
  const today = startOfToday()
  return Array.from({ length: DAYS_SHOWN }, (_, i) => {
    const start = today - (DAYS_SHOWN - 1 - i) * DAY_MS
    const key = dayKey(start)
    const list = attempts.value.filter(a => a.t >= start && a.t < start + DAY_MS)
    const date = new Date(start)
    return {
      key,
      today: i === DAYS_SHOWN - 1,
      short: date.toLocaleDateString(locale, { day: 'numeric' }),
      long: date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' }),
      minutes: Math.round((msByDay.get(key) || 0) / 60e3),
      answers: list.length,
      accuracy: pct(list.filter(a => a.ok).length, list.length),
    }
  })
})

// Axis top whose half is a round number too: 10, 20, 30, 40, 60, 90, 120... minutes
const dailyMax = computed(() => {
  const top = Math.max(...daily.value.map(d => d.minutes), 1)
  return [10, 20, 30, 40, 60, 90, 120, 180, 240, 360].find(v => v >= top) || Math.ceil(top / 120) * 120
})
const dailyTicks = computed(() => [0, dailyMax.value / 2, dailyMax.value])

function dayTip(d) {
  return {
    value: formatMinutes(d.minutes),
    lines: [d.long, `${d.answers} ${t('pg.answers')}` + (d.answers ? ` · ${d.accuracy}% ${t('pg.correct')}` : '')],
  }
}

// ── Per exercise ──────────────────────────────────────────────────────────────
const exerciseRows = computed(() => {
  const since = startOfToday() - 6 * DAY_MS
  return EXERCISES.map(ex => {
    const list = attempts.value.filter(a => a.e === ex.id)
    if (!list.length) return null
    const recent = list.filter(a => a.t >= since)
    const weak = [...practice.itemStats(ex.id)]
      .filter(([, s]) => s.n >= 3 && s.ok < s.n)
      .map(([key, s]) => ({ key, label: ex.item(key), accuracy: pct(s.ok, s.n), n: s.n }))
      .sort((a, b) => a.accuracy - b.accuracy || b.n - a.n)
      .slice(0, 4)
    return {
      id: ex.id, name: t(ex.nav), route: ex.route,
      n: list.length, accuracy: pct(list.filter(a => a.ok).length, list.length),
      n7: recent.length, accuracy7: pct(recent.filter(a => a.ok).length, recent.length),
      weak,
    }
  }).filter(Boolean).sort((a, b) => b.n - a.n)
})

function statusColor(accuracy) {
  return accuracy >= 75 ? 'var(--jd-green)' : accuracy >= 50 ? '#f39c12' : 'var(--jd-red)'
}

// ── Fretboard errors (clicked answers) ────────────────────────────────────────
const heat = computed(() => {
  const cells = new Map()
  let maxFret = 12, max = 0
  for (const a of attempts.value) {
    if (!Number.isInteger(a.s) || !Number.isInteger(a.f)) continue
    const key = `${a.s}-${a.f}`
    const c = cells.get(key) || { n: 0, wrong: 0 }
    c.n++
    if (!a.ok) c.wrong++
    cells.set(key, c)
    maxFret = Math.max(maxFret, a.f)
    max = Math.max(max, c.wrong)
  }
  let clicks = 0
  cells.forEach(c => { clicks += c.n })
  return { cells, frets: Math.min(24, maxFret), max, clicks }
})

function cell(s, f) {
  return heat.value.cells.get(`${s}-${f}`) || { n: 0, wrong: 0 }
}

function heatColor(wrong) {
  if (!wrong) return null
  const step = Math.min(HEAT.length - 1, Math.floor((wrong / heat.value.max) * HEAT.length - 1e-9))
  return HEAT[Math.max(0, step)]
}

function stringLabel(s) {
  return `${s + 1}ª ${appStore.currentNotes[appStore.currentTuning[s]]}`
}

function cellTip(s, f) {
  const c = cell(s, f)
  const note = appStore.currentNotes[getPitchClass(appStore.currentTuning, s, f)]
  return {
    value: `${c.wrong} ${c.wrong === 1 ? t('pg.error') : t('pg.errors')}`,
    lines: [`${stringLabel(s)} · ${t('pg.fret')} ${f} · ${note}`, `${c.n} ${t('pg.clicks')}`],
  }
}

// ── Tooltip (one per chart; values also reachable via the table and aria-labels)
const dailyChart = ref(null)
const heatChart = ref(null)
const tip = reactive({ show: false, owner: null, x: 0, y: 0, below: false, value: '', lines: [] })

// Centred on the bar or cell; below it when there is no room above.
function placeTip(e, owner) {
  const box = owner.getBoundingClientRect()
  const anchor = (e.currentTarget.querySelector('.pg-bar') || e.currentTarget).getBoundingClientRect()
  tip.x = Math.min(Math.max(anchor.left + anchor.width / 2 - box.left, 80), box.width - 80)
  tip.below = anchor.top - box.top < 72
  tip.y = tip.below ? anchor.bottom - box.top + 8 : anchor.top - box.top - 8
}

function showTip(e, owner, content) {
  Object.assign(tip, { show: true, owner, value: content.value, lines: content.lines })
  placeTip(e, owner)
}

function moveTip(e, owner) {
  if (tip.show) placeTip(e, owner)
}

function hideTip() {
  tip.show = false
}

function clearHistory() {
  if (window.confirm(t('pg.clear-confirm'))) practice.clear()
}
</script>

<style scoped>
.pg-empty p { position: relative; z-index: 1; color: var(--jd-text-soft); text-align: center; margin: 0; }

.pg-kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.pg-kpi {
  background: var(--jd-surface);
  border: 1px solid rgba(255, 214, 10, 0.10);
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.pg-kpi-label { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; color: var(--jd-muted); }
.pg-kpi-value { font-size: 26px; font-weight: 700; color: var(--jd-text); }
.pg-kpi-value small { font-size: 13px; font-weight: 500; color: var(--jd-text-soft); }

.pg-chart {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 34px 1fr;
  grid-template-rows: 170px auto;
  column-gap: 8px;
}
.pg-yaxis { position: relative; font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); font-variant-numeric: tabular-nums; }
.pg-yaxis span { position: absolute; right: 0; transform: translateY(50%); }
.pg-plot { position: relative; display: flex; align-items: flex-end; border-bottom: 1px solid #3a352e; }
.pg-grid { position: absolute; left: 0; right: 0; height: 1px; background: #2a2620; }
.pg-col {
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 1px;
  outline: none;
  cursor: default;
}
.pg-bar {
  width: 100%;
  max-width: 24px;
  min-height: 0;
  background: #b88a00;
  border-radius: 4px 4px 0 0;
  transition: background 0.15s;
}
.pg-col:hover .pg-bar, .pg-col:focus-visible .pg-bar { background: #d9a400; }
.pg-col:focus-visible { box-shadow: inset 0 0 0 1px var(--jd-amber); border-radius: 4px; }
.pg-xaxis { grid-column: 2; display: flex; font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); padding-top: 6px; }
.pg-xaxis span { flex: 1; text-align: center; }
.pg-xaxis span.today { color: var(--jd-text); font-weight: 700; }

.pg-tip {
  position: absolute;
  transform: translate(-50%, -100%);
  background: #0c0b0a;
  border: 1px solid var(--jd-line-strong);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  pointer-events: none;
  z-index: 5;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}
.pg-tip.below { transform: translate(-50%, 0); }
.pg-tip strong { font-size: 14px; color: var(--jd-text); }
.pg-tip span { font-size: 11px; color: var(--jd-text-soft); }

.pg-table-toggle { position: relative; z-index: 1; margin-top: 14px; }
.pg-table-toggle summary { cursor: pointer; font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; color: var(--jd-muted); text-transform: uppercase; }
.pg-table { width: 100%; margin-top: 10px; border-collapse: collapse; font-size: 12px; font-variant-numeric: tabular-nums; }
.pg-table th, .pg-table td { padding: 6px 8px; border-bottom: 1px solid #2a2620; text-align: right; }
.pg-table th:first-child, .pg-table td:first-child { text-align: left; }
.pg-table th { font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); font-weight: 500; }

.pg-exercises {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}
.pg-ex {
  border: 1px solid #2a2620;
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(0, 0, 0, 0.2);
}
.pg-ex-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.pg-ex-name { color: var(--jd-text); font-weight: 700; text-decoration: none; }
.pg-ex-name:hover { color: var(--jd-amber); }
.pg-ex-count { font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); white-space: nowrap; }
.pg-meter { height: 8px; border-radius: 4px; background: #2a2620; overflow: hidden; }
.pg-meter-fill { height: 100%; border-radius: 4px; }
.pg-ex-stats { display: flex; gap: 14px; font-size: 12px; color: var(--jd-text-soft); }
.pg-ex-stats strong { color: var(--jd-text); }
.pg-weak { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.pg-weak-label { font-family: var(--jd-mono); font-size: 9px; letter-spacing: 1px; color: var(--jd-muted); text-transform: uppercase; }
.pg-chip { font-size: 11px; padding: 3px 8px; border-radius: 999px; border: 1px solid #3a352e; color: var(--jd-text); }
.pg-chip em { font-style: normal; color: var(--jd-text-soft); margin-left: 4px; }

.pg-note { position: relative; z-index: 1; font-size: 12px; color: var(--jd-text-soft); margin: 0 0 12px; }
.pg-heat-wrap { position: relative; z-index: 1; padding-top: 4px; }
.pg-heat-scroll { overflow-x: auto; padding-bottom: 4px; }
.pg-heat { display: grid; gap: 2px; width: max-content; }
.pg-heat-fret { font-family: var(--jd-mono); font-size: 9px; color: var(--jd-muted); text-align: center; }
.pg-heat-string { font-family: var(--jd-mono); font-size: 10px; color: var(--jd-text-soft); align-self: center; }
.pg-cell { width: 24px; height: 24px; border-radius: 4px; background: #1f1c19; outline: none; }
.pg-cell.empty { background: #1a1815; }
.pg-cell:not(.empty) { box-shadow: inset 0 0 0 1px #3a352e; }
.pg-cell:not(.empty):hover, .pg-cell:focus-visible { box-shadow: inset 0 0 0 2px var(--jd-text); }
.pg-legend { display: flex; align-items: center; gap: 6px; margin-top: 12px; font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); }
.pg-legend-sw { width: 18px; height: 12px; border-radius: 3px; }

.pg-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
</style>
