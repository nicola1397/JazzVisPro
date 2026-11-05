<template>
  <div id="view-lessons" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('ls.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('ls.title') }}</h1>
      </div>
    </header>

    <div class="jd-container">
      <p class="lsl-intro">{{ t('ls.intro') }}</p>

      <ol class="lsl-how" :aria-label="t('ls.how')">
        <li>
          <span class="lsl-how-kind lsl-how-kind--explain">{{ t('ls.kind-explain') }}</span>
          <span>{{ t('ls.how-explain') }}</span>
        </li>
        <li>
          <span class="lsl-how-kind lsl-how-kind--mirror">{{ t('ls.kind-mirror') }}</span>
          <span>{{ t('ls.how-mirror') }}</span>
        </li>
        <li>
          <span class="lsl-how-kind lsl-how-kind--quiz">{{ t('ls.kind-quiz') }}</span>
          <span>{{ t('ls.how-quiz') }}</span>
        </li>
      </ol>

      <ol class="lsl-list">
        <li v-for="(l, i) in rows" :key="l.id" class="lsl-card" :class="{ done: l.done }">
          <div class="lsl-num" aria-hidden="true">{{ l.done ? '✓' : i + 1 }}</div>
          <div class="lsl-body">
            <h2 class="lsl-title">
              <RouterLink :to="`/lessons/${l.id}`">{{ l.title }}</RouterLink>
            </h2>
            <p class="lsl-summary">{{ l.summary }}</p>
            <div class="lsl-meta">
              <span class="lsl-status" :class="`lsl-status--${l.status}`">{{ l.statusText }}</span>
              <span class="lsl-sep" aria-hidden="true">·</span>
              <span>{{ l.stepsText }}</span>
            </div>
            <div v-if="l.counts.total" class="lsl-bar" aria-hidden="true">
              <div class="lsl-bar-fill" :style="{ width: `${(l.counts.done / l.counts.total) * 100}%` }"></div>
            </div>
          </div>
          <RouterLink class="jd-toolbtn" :class="l.status === 'done' ? 'lsl-btn' : 'jd-toolbtn--add'" :to="`/lessons/${l.id}`" :aria-label="`${l.action}: ${l.title}`">
            {{ l.action }} →
          </RouterLink>
        </li>
      </ol>

      <div class="teoria-tip lsl-tip">
        <strong>{{ t('label.pro-tip') }}:</strong> {{ t('ls.tip') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { LESSONS } from '../utils/fretboardLessons.js'
import { lessonCounts, lessonState } from '../utils/lessonProgress.js'

const appStore = useAppStore()
const { t } = useI18n()
const fmt = (key, ...args) => args.reduce((s, v, i) => s.replace(`{${i}}`, v), t(key))

const rows = computed(() => {
  const lang = appStore.lang === 'en' ? 'en' : 'it'
  return LESSONS.map(l => {
    const counts = lessonCounts(l)
    const started = Object.keys(lessonState(l.id).done).length > 0
    const status = counts.total && counts.done === counts.total ? 'done' : started ? 'progress' : 'new'
    return {
      id: l.id,
      title: l.title[lang],
      summary: l.summary[lang],
      counts,
      done: status === 'done',
      status,
      statusText: status === 'done' ? t('ls.status-done') : status === 'progress' ? fmt('ls.status-progress', counts.done, counts.total) : t('ls.status-new'),
      stepsText: fmt('ls.steps-count', l.steps.length, counts.total),
      action: status === 'done' ? t('ls.review') : status === 'progress' ? t('ls.resume') : t('ls.start'),
    }
  })
})
</script>

<style scoped>
.lsl-intro {
  font-size: 14px;
  line-height: 1.7;
  color: var(--jd-text-soft);
  max-width: 75ch;
  margin: 0 0 18px;
}

.lsl-how {
  list-style: none;
  padding: 0;
  margin: 0 0 26px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.lsl-how li {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid var(--jd-line);
  border-radius: 12px;
  background: var(--jd-surface);
  font-size: 12px;
  line-height: 1.6;
  color: var(--jd-text-soft);
}
.lsl-how-kind {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
  border: 1px solid currentColor;
}
.lsl-how-kind--explain { color: var(--jd-synth); }
.lsl-how-kind--mirror  { color: var(--jd-amber); }
.lsl-how-kind--quiz    { color: var(--jd-improv); }

.lsl-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.lsl-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border: 1px solid rgba(255, 214, 10, 0.10);
  border-radius: 14px;
  background: linear-gradient(180deg, var(--jd-surface) 0%, #100e0c 100%);
}
.lsl-card.done { border-color: rgba(46, 204, 113, 0.25); }
.lsl-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--jd-display);
  font-style: italic;
  font-size: 22px;
  color: var(--jd-amber);
  border: 1px solid var(--jd-line-strong);
}
.lsl-card.done .lsl-num { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.5); font-style: normal; font-family: var(--jd-mono); font-size: 16px; }
.lsl-title {
  font-family: var(--jd-display);
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.15;
  margin: 0 0 4px;
}
.lsl-title a { color: var(--jd-text); text-decoration: none; }
.lsl-title a:hover { color: var(--jd-amber); }
.lsl-summary { margin: 0 0 8px; font-size: 13px; line-height: 1.6; color: var(--jd-text-soft); }
.lsl-meta { display: flex; flex-wrap: wrap; gap: 6px; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--jd-muted); }
.lsl-status--progress { color: var(--jd-amber); }
.lsl-status--done { color: var(--jd-green); }
.lsl-bar { margin-top: 8px; height: 3px; border-radius: 2px; background: #2a2620; overflow: hidden; max-width: 320px; }
.lsl-bar-fill { height: 100%; background: var(--jd-amber); }
.lsl-card.done .lsl-bar-fill { background: var(--jd-green); }

a.jd-toolbtn { text-decoration: none; white-space: nowrap; }
.lsl-btn { border-color: var(--jd-line-strong); color: var(--jd-text-soft); }
.lsl-btn:hover { color: var(--jd-amber); border-color: var(--jd-amber); }
.lsl-tip { padding: 12px 16px; }

@media (max-width: 720px) {
  .lsl-how { grid-template-columns: 1fr; }
  .lsl-card { grid-template-columns: auto minmax(0, 1fr); gap: 12px 14px; padding: 14px; }
  .lsl-card > .jd-toolbtn { grid-column: 1 / -1; justify-self: start; }
  .lsl-num { width: 34px; height: 34px; font-size: 18px; }
  .lsl-title { font-size: 21px; }
}
</style>
