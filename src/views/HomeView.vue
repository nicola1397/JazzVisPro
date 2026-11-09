<template>
  <div id="view-home" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ today }}</span>
        <h1 class="jd-titlemark-name">{{ t('home.title') }}</h1>
      </div>
    </header>

    <!-- Practice in figures -->
    <div class="hm-stats" role="list">
      <div class="hm-stat" role="listitem">
        <span class="hm-stat-val">{{ stats.minutes }}<small> min</small></span>
        <span class="hm-stat-label">{{ t('home.today-min') }}</span>
      </div>
      <div class="hm-stat" role="listitem">
        <span class="hm-stat-val">{{ stats.answers }}</span>
        <span class="hm-stat-label">{{ t('home.today-answers') }}</span>
      </div>
      <div class="hm-stat" role="listitem">
        <span class="hm-stat-val">{{ stats.streak }}</span>
        <span class="hm-stat-label">{{ t(stats.streak === 1 ? 'home.streak-one' : 'home.streak') }}</span>
      </div>
    </div>

    <div class="hm-grid">
      <!-- Guided path -->
      <section class="hm-card hm-card--course">
        <span class="hm-kicker">{{ t('cr.title') }}</span>
        <template v-if="resume">
          <h2 class="hm-title">{{ resume.started ? t('home.continue') : t('home.start') }}: {{ L(resume.mod.title) }}</h2>
          <p class="hm-text">
            {{ t('home.module-of').replace('{n}', resume.index + 1).replace('{m}', COURSE.length) }} ·
            {{ t('home.steps-done').replace('{d}', resume.done).replace('{m}', resume.mod.steps.length) }}
          </p>
          <div class="hm-bar" aria-hidden="true"><span :style="{ width: Math.round(resume.done / resume.mod.steps.length * 100) + '%' }"></span></div>
          <div class="hm-actions">
            <RouterLink class="jd-toolbtn hm-primary" :to="resume.to">{{ resume.started ? t('home.continue-step').replace('{n}', resume.step + 1) : t('home.begin') }} ▸</RouterLink>
            <RouterLink class="jd-toolbtn" to="/percorso">{{ t('cr.all-modules') }}</RouterLink>
          </div>
        </template>
        <template v-else>
          <h2 class="hm-title">{{ t('home.course-done') }}</h2>
          <div class="hm-actions">
            <RouterLink class="jd-toolbtn hm-primary" to="/percorso/routine">{{ t('home.daily-routine') }} ▸</RouterLink>
          </div>
        </template>
      </section>

      <!-- What to practise -->
      <section class="hm-card">
        <span class="hm-kicker">{{ t('home.practice') }}</span>
        <h2 class="hm-title">{{ weakest.length ? t('home.review-these') : t('home.suggested') }}</h2>
        <ul class="hm-list">
          <li v-for="ex in practiceList" :key="ex.route">
            <RouterLink :to="ex.route" class="hm-row">
              <span class="hm-row-name">{{ t(ex.nav) }}</span>
              <span v-if="ex.accuracy !== undefined" class="hm-row-meta" :style="{ color: accColor(ex.accuracy) }">{{ ex.accuracy }}%</span>
              <span v-else class="hm-row-meta">{{ t(ex.why) }}</span>
            </RouterLink>
          </li>
        </ul>
        <RouterLink v-if="weakest.length" to="/progress" class="hm-link">{{ t('home.see-progress') }} →</RouterLink>
      </section>
    </div>

    <!-- Quick tools -->
    <section class="hm-section">
      <span class="hm-kicker">{{ t('home.quick') }}</span>
      <div class="hm-tiles">
        <RouterLink v-for="tool in TOOLS" :key="tool.to" :to="tool.to" class="hm-tile">
          <span class="hm-tile-icon" aria-hidden="true">{{ tool.icon }}</span>
          <span class="hm-tile-name">{{ t(tool.label) }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- Recently used -->
    <section v-if="recent.length" class="hm-section">
      <span class="hm-kicker">{{ t('home.recent') }}</span>
      <div class="hm-recent">
        <RouterLink v-for="r in recent" :key="r.path" :to="r.path" class="hm-chip">{{ t(r.label) }}</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import { usePracticeStore, practiceMsByDay, streakDays, dayKey } from '../stores/practice.js'
import { useI18n } from '../composables/useI18n.js'
import { recentPages } from '../composables/useRecentPages.js'
import { menuLabelFor } from '../components/layout/menu.js'
import { EXERCISES } from '../utils/exerciseCatalog.js'
import { COURSE } from '../course/index.js'
import { stepsDoneCount, lastStep, nextStepIndex, recentModuleId, isStepDone } from '../course/progress.js'

const appStore = useAppStore()
const practice = usePracticeStore()
const { t } = useI18n()
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[appStore.lang] ?? x.it))

const TOOLS = [
  { to: '/tuner', label: 'nav.tuner', icon: '◉' },
  { to: '/groove-trainer', label: 'nav.groove-trainer', icon: '♩' },
  { to: '/chord-finder', label: 'nav.chord-finder', icon: '⌗' },
  { to: '/player', label: 'nav.player', icon: '▶' },
  { to: '/real-book', label: 'nav.real-book', icon: '♫' },
  { to: '/explorer', label: 'nav.explorer', icon: '⋯' },
]

const today = computed(() => new Date().toLocaleDateString(appStore.lang === 'en' ? 'en-GB' : 'it-IT', { weekday: 'long', day: 'numeric', month: 'long' }))

const stats = computed(() => {
  const key = dayKey(Date.now())
  const list = practice.attempts.filter(a => dayKey(a.t) === key)
  return {
    minutes: Math.round((practiceMsByDay(list).get(key) || 0) / 60e3),
    answers: list.length,
    streak: streakDays(practice.attempts),
  }
})

// The module opened last if it is not finished, otherwise the first one not finished
const resume = computed(() => {
  const unfinished = m => stepsDoneCount(m) < m.steps.length
  const recentMod = COURSE.find(m => m.id === recentModuleId())
  const mod = recentMod && unfinished(recentMod) ? recentMod : COURSE.find(unfinished)
  if (!mod) return null
  const done = stepsDoneCount(mod)
  const started = done > 0 || mod.id === recentModuleId()
  // Same step the module page opens on: the last one opened, or the next one if that is done
  const last = lastStep(mod.id)
  const step = !started ? 0 : isStepDone(mod.id, mod.steps[last]?.id) ? nextStepIndex(mod) : last
  return { mod, index: COURSE.indexOf(mod), done, started, step, to: `/percorso/${mod.id}` }
})

// Exercises answered least well over the last two weeks (at least 8 answers)
const weakest = computed(() => {
  const since = Date.now() - 14 * 86400e3
  return EXERCISES.filter(ex => ex.id !== 'course' && ex.id !== 'lessons').map(ex => {
    const list = practice.attempts.filter(a => a.e === ex.id && a.t >= since)
    return { ...ex, n: list.length, accuracy: list.length ? Math.round(list.filter(a => a.ok).length / list.length * 100) : 0 }
  }).filter(ex => ex.n >= 8 && ex.accuracy < 90).sort((a, b) => a.accuracy - b.accuracy).slice(0, 3)
})

const SUGGESTED = [
  { route: '/note-finder', nav: 'nav.note-finder', why: 'home.why-notes' },
  { route: '/interval-learner', nav: 'nav.interval-learner', why: 'home.why-intervals' },
  { route: '/interval-ear-training', nav: 'nav.interval-ear-training', why: 'home.why-ear' },
]
const practiceList = computed(() => (weakest.value.length ? weakest.value : SUGGESTED))
const accColor = a => (a >= 75 ? 'var(--jd-green)' : a >= 50 ? '#f39c12' : 'var(--jd-red)')

const recent = computed(() => recentPages.value
  .map(r => ({ path: r.path, label: menuLabelFor(r.path) }))
  .filter(r => r.label)
  .slice(0, 6))
</script>

<style scoped>
.hm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
.hm-stat {
  display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; border-radius: 14px;
  background: var(--jd-surface); border: 1px solid var(--jd-line);
}
.hm-stat-val { font-family: var(--jd-display); font-style: italic; font-size: 2em; line-height: 1; color: var(--jd-text); }
.hm-stat-val small { font-family: var(--jd-mono); font-style: normal; font-size: 0.4em; color: var(--jd-muted); }
.hm-stat-label { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--jd-muted); }

.hm-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 16px; }
.hm-card {
  display: flex; flex-direction: column; gap: 10px; padding: 20px 22px; border-radius: 16px;
  background: var(--jd-surface); border: 1px solid var(--jd-line);
}
.hm-card--course { border-color: rgba(255, 214, 10, 0.3); background: linear-gradient(160deg, rgba(255, 214, 10, 0.06), transparent 60%), var(--jd-surface); }
.hm-kicker { font-family: var(--jd-mono); font-size: 10px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--jd-amber); }
.hm-title { margin: 0; font-family: var(--jd-display); font-style: italic; font-weight: 400; font-size: 1.6em; line-height: 1.15; color: var(--jd-text); }
.hm-text { margin: 0; font-family: var(--jd-mono); font-size: 12px; color: var(--jd-text-soft); }
.hm-bar { height: 4px; border-radius: 2px; background: #2a2620; overflow: hidden; }
.hm-bar span { display: block; height: 100%; background: var(--jd-amber); }
.hm-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; }
/* Links shaped as buttons: no link colour or underline */
.hm-actions a.jd-toolbtn { text-decoration: none; color: var(--jd-text); background: var(--jd-surface-alt); border-color: var(--jd-line); }
.hm-actions a.jd-toolbtn:hover { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.hm-actions a.hm-primary { color: #141210; background: var(--jd-amber); border-color: var(--jd-amber); }
.hm-actions a.hm-primary:hover { color: #141210; background: var(--jd-amber-soft, #ffe14d); }
.hm-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.hm-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 40px; padding: 8px 12px;
  border-radius: 10px; border: 1px solid var(--jd-line); text-decoration: none; color: var(--jd-text);
  font-family: var(--jd-mono); font-size: 13px;
}
.hm-row:hover { border-color: var(--jd-amber); }
.hm-row-meta { font-size: 11px; color: var(--jd-muted); text-align: right; }
.hm-link { font-family: var(--jd-mono); font-size: 11px; color: var(--jd-amber); text-decoration: none; }

.hm-section { margin-top: 24px; display: flex; flex-direction: column; gap: 12px; }
.hm-tiles { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.hm-tile {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; min-height: 92px; padding: 12px 8px;
  border-radius: 14px; border: 1px solid var(--jd-line); background: var(--jd-surface); text-decoration: none; text-align: center;
}
.hm-tile:hover { border-color: var(--jd-amber); }
.hm-tile-icon { font-size: 22px; line-height: 1; color: var(--jd-amber); }
.hm-tile-name { font-family: var(--jd-mono); font-size: 11px; font-weight: 600; letter-spacing: 0.5px; color: var(--jd-text); }
.hm-recent { display: flex; flex-wrap: wrap; gap: 8px; }
.hm-chip {
  display: inline-flex; align-items: center; min-height: 34px; padding: 0 14px; border-radius: 999px;
  border: 1px solid var(--jd-line-strong); color: var(--jd-text-soft); text-decoration: none;
  font-family: var(--jd-mono); font-size: 12px;
}
.hm-chip:hover { color: var(--jd-text); border-color: var(--jd-amber); }

@media (max-width: 900px) {
  .hm-grid { grid-template-columns: 1fr; }
  .hm-tiles { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 420px) {
  .hm-stats { gap: 8px; }
  .hm-stat { padding: 12px; }
  .hm-stat-val { font-size: 1.6em; }
}
</style>
