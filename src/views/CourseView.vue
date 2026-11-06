<template>
  <div class="view-panel active jd-view cv" ref="root">
    <!-- ── Overview ─────────────────────────────────────────────── -->
    <template v-if="!mod">
      <header class="jd-titlebar">
        <div class="jd-titlemark">
          <span class="jd-titlemark-eyebrow">{{ t('cr.eyebrow') }}</span>
          <h1 class="jd-titlemark-name">{{ t('cr.title') }}</h1>
        </div>
      </header>

      <p class="cv-intro">{{ t('cr.intro') }}</p>
      <p class="cv-intro cv-before">{{ t('cr.before') }} <RouterLink to="/lessons">{{ t('nav.lessons') }} →</RouterLink></p>

      <ol class="cv-modules">
        <li v-for="(m, mi) in COURSE" :key="m.id" class="cv-module">
          <RouterLink :to="`/percorso/${m.id}`" class="cv-module-link">
            <span class="cv-module-num">{{ String(mi + 1).padStart(2, '0') }}</span>
            <span class="cv-module-body">
              <span class="cv-module-title">{{ L(m.title) }}</span>
              <span class="cv-module-desc">{{ L(m.desc) }}</span>
              <span class="cv-module-meta">
                <span class="cv-bar" aria-hidden="true"><span class="cv-bar-fill" :style="{ width: pct(m) + '%' }"></span></span>
                <span>{{ stepsDoneCount(m) }} / {{ m.steps.length }} {{ t('cr.steps') }}</span>
              </span>
            </span>
            <span class="cv-module-cta">{{ ctaLabel(m) }} ▸</span>
          </RouterLink>
        </li>
      </ol>

      <div class="teoria-tip cv-how">
        <strong>{{ t('cr.how-title') }}</strong> {{ t('cr.how') }}
      </div>
    </template>

    <!-- ── Module ───────────────────────────────────────────────── -->
    <template v-else>
      <header class="cv-head">
        <RouterLink to="/percorso" class="cv-back">← {{ t('cr.all-modules') }}</RouterLink>
        <span class="cv-eyebrow">{{ t('cr.module') }} {{ modIndex + 1 }} / {{ COURSE.length }}</span>
        <h1 class="cv-title">{{ L(mod.title) }}</h1>
      </header>

      <nav class="cv-rail" :aria-label="t('cr.steps-nav')">
        <RouterLink
          v-for="(s, si) in mod.steps" :key="s.id"
          :to="`/percorso/${mod.id}/${si + 1}`"
          class="cv-rail-step"
          :class="{ done: isStepDone(mod.id, s.id), cur: si === stepIndex }"
          :title="`${si + 1}. ${L(s.title)}`"
          :aria-current="si === stepIndex ? 'step' : undefined"
        >
          <span v-if="isStepDone(mod.id, s.id) && si !== stepIndex">✓</span>
          <span v-else>{{ si + 1 }}</span>
        </RouterLink>
      </nav>

      <article class="cv-step" :key="mod.id + step.id">
        <div class="cv-step-head">
          <span class="cv-step-num">{{ t('cr.step') }} {{ stepIndex + 1 }} / {{ mod.steps.length }}</span>
          <span v-if="isStepDone(mod.id, step.id)" class="cv-step-done">✓ {{ t('cr.step-done') }}</span>
        </div>
        <h2 class="cv-step-title">{{ L(step.title) }}</h2>

        <CourseStep :step="step" :module-id="mod.id" @complete="markStepDone(mod.id, step.id)" />

        <div v-if="hasTasks && !isStepDone(mod.id, step.id)" class="cv-task-hint">{{ t('cr.complete-hint') }}</div>

        <footer class="cv-nav">
          <button class="jd-toolbtn" type="button" :disabled="stepIndex === 0" @click="go(stepIndex - 1)">◂ {{ t('cr.prev-step') }}</button>
          <span class="cv-nav-spacer"></span>
          <button v-if="stepIndex < mod.steps.length - 1" class="jd-toolbtn cv-next" type="button" @click="next">{{ t('cr.next-step') }} ▸</button>
          <button v-else class="jd-toolbtn cv-next" type="button" @click="finish">{{ t('cr.finish') }} ✓</button>
        </footer>
      </article>

      <section v-if="showComplete" class="cv-complete">
        <div class="cv-complete-title">{{ t('cr.module-done') }}</div>
        <p class="cv-complete-text">{{ completeText }}</p>
        <div class="cv-complete-actions">
          <RouterLink v-if="nextMod" :to="`/percorso/${nextMod.id}`" class="jd-toolbtn cv-next">{{ t('cr.next-module') }}: {{ L(nextMod.title) }} ▸</RouterLink>
          <RouterLink to="/percorso" class="jd-toolbtn">{{ t('cr.all-modules') }}</RouterLink>
          <button class="jd-toolbtn" type="button" @click="restart">↻ {{ t('cr.reset') }}</button>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CourseStep from '../components/course/CourseStep.vue'
import { useI18n } from '../composables/useI18n.js'
import { COURSE, moduleById } from '../course/index.js'
import { isStepDone, markStepDone, stepsDoneCount, setLastStep, lastStep, nextStepIndex, resetModule } from '../course/progress.js'

const { t, lang } = useI18n()
const route = useRoute()
const router = useRouter()
const root = ref(null)
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))

const mod = computed(() => moduleById(route.params.module))
const modIndex = computed(() => COURSE.indexOf(mod.value))
const nextMod = computed(() => COURSE[modIndex.value + 1])
const stepIndex = computed(() => {
  const n = parseInt(route.params.step, 10)
  if (!mod.value || !Number.isFinite(n)) return 0
  return Math.min(Math.max(n - 1, 0), mod.value.steps.length - 1)
})
const step = computed(() => mod.value?.steps[stepIndex.value])
const hasTasks = computed(() => step.value?.blocks.some(b => b.type === 'find' || b.type === 'quiz'))

const pct = m => Math.round((stepsDoneCount(m) / m.steps.length) * 100)
function ctaLabel(m) {
  const done = stepsDoneCount(m)
  if (done === 0) return t('cr.start')
  if (done === m.steps.length) return t('cr.review')
  return `${t('cr.continue')} · ${t('cr.step').toLowerCase()} ${nextStepIndex(m) + 1}`
}

const allDone = computed(() => mod.value && stepsDoneCount(mod.value) === mod.value.steps.length)
const showComplete = computed(() => allDone.value && stepIndex.value === mod.value.steps.length - 1)
const completeText = computed(() => (nextMod.value ? t('cr.module-done-next') : t('cr.course-done')))

// Open a module on the step to resume, and remember the step shown.
watch(() => [route.params.module, route.params.step], ([m, s]) => {
  if (m && !mod.value) { router.replace('/percorso'); return }
  if (!mod.value) return
  if (!s) {
    const resume = Math.max(lastStep(mod.value.id), 0)
    const target = isStepDone(mod.value.id, mod.value.steps[resume]?.id) ? nextStepIndex(mod.value) : resume
    router.replace(`/percorso/${mod.value.id}/${target + 1}`)
    return
  }
  setLastStep(mod.value.id, stepIndex.value)
  nextTick(scrollTop)
}, { immediate: true })

function scrollTop() {
  const el = root.value?.closest('.main-content') || document.querySelector('.main-content')
  el?.scrollTo?.({ top: 0, behavior: 'smooth' })
}

function go(i) {
  if (!mod.value || i < 0 || i >= mod.value.steps.length) return
  router.push(`/percorso/${mod.value.id}/${i + 1}`)
}

// Reading steps count as done when you move on; steps with an exercise when it is completed.
function next() {
  if (!hasTasks.value) markStepDone(mod.value.id, step.value.id)
  go(stepIndex.value + 1)
}

function finish() {
  if (!hasTasks.value) markStepDone(mod.value.id, step.value.id)
  if (!allDone.value) {
    const missing = nextStepIndex(mod.value)
    if (missing !== stepIndex.value) go(missing)
    return
  }
  nextTick(() => document.querySelector('.cv-complete')?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
}

function restart() {
  if (!confirm(t('cr.reset-confirm'))) return
  resetModule(mod.value.id)
  router.push(`/percorso/${mod.value.id}/1`)
}
</script>

<style scoped>
.cv { padding-bottom: 60px; }
.cv-intro { font-family: var(--jd-mono); font-size: 0.85em; color: var(--jd-text-soft); line-height: 1.7; margin: 0 0 24px; max-width: 860px; }

.cv-before { margin-top: -12px; }
.cv-before a { color: var(--jd-amber); text-decoration: none; }
.cv-before a:hover { text-decoration: underline; }
.cv-modules { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 12px; }
.cv-module-link {
  display: grid; grid-template-columns: auto 1fr auto; gap: 18px; align-items: center;
  padding: 18px 20px; border-radius: 14px; text-decoration: none;
  background: var(--jd-surface); border: 1px solid var(--jd-line); color: inherit;
  transition: border-color 0.2s, background 0.2s;
}
.cv-module-link:hover { border-color: var(--jd-line-strong); background: var(--jd-surface-alt); }
.cv-module-num { font-family: var(--jd-display); font-style: italic; font-size: 2.4em; color: var(--jd-amber); line-height: 1; min-width: 1.6em; }
.cv-module-body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.cv-module-title { font-family: var(--jd-display); font-style: italic; font-size: 1.45em; color: var(--jd-text); line-height: 1.15; }
.cv-module-desc { font-size: 0.86em; color: var(--jd-text-soft); line-height: 1.5; }
.cv-module-meta { display: flex; align-items: center; gap: 10px; font-family: var(--jd-mono); font-size: 0.7em; letter-spacing: 1px; color: var(--jd-muted); text-transform: uppercase; margin-top: 4px; }
.cv-bar { width: 140px; height: 5px; border-radius: 3px; background: #2a2620; overflow: hidden; }
.cv-bar-fill { display: block; height: 100%; background: var(--jd-green); border-radius: 3px; transition: width 0.3s; }
.cv-module-cta { font-family: var(--jd-mono); font-size: 0.75em; letter-spacing: 1px; text-transform: uppercase; color: var(--jd-amber); white-space: nowrap; }
.cv-how { max-width: 860px; }

.cv-head { margin: 4px 0 18px; }
.cv-back { font-family: var(--jd-mono); font-size: 0.75em; letter-spacing: 1px; color: var(--jd-text-soft); text-decoration: none; }
.cv-back:hover { color: var(--jd-amber); }
.cv-eyebrow { display: block; margin-top: 16px; font-family: var(--jd-mono); font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase; color: var(--jd-amber); }
.cv-title { font-family: var(--jd-display); font-style: italic; font-weight: 400; font-size: clamp(2em, 4vw, 2.8em); color: var(--jd-text); margin: 4px 0 0; line-height: 1.05; }

.cv-rail { display: flex; gap: 6px; overflow-x: auto; padding: 4px 2px 10px; margin-bottom: 8px; }
.cv-rail-step {
  flex: 0 0 auto; width: 34px; height: 34px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--jd-mono); font-size: 12px; font-weight: 700; text-decoration: none;
  color: var(--jd-muted); background: rgba(255, 255, 255, 0.03); border: 1px solid var(--jd-line-strong);
  transition: all 0.15s;
}
.cv-rail-step:hover { color: var(--jd-text); border-color: var(--jd-amber); }
.cv-rail-step.done { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.5); background: rgba(46, 204, 113, 0.08); }
.cv-rail-step.cur { color: #141210; background: var(--jd-amber); border-color: var(--jd-amber); }

.cv-step { max-width: 980px; padding: 22px 26px 18px; border-radius: 16px; background: var(--jd-surface); border: 1px solid var(--jd-line); }
.cv-step-head { display: flex; align-items: center; gap: 12px; }
.cv-step-num { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--jd-muted); }
.cv-step-done { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-green); }
.cv-step-title { font-family: var(--jd-display); font-style: italic; font-weight: 400; font-size: 1.9em; color: var(--jd-amber); margin: 6px 0 4px; line-height: 1.15; }
.cv-task-hint { font-family: var(--jd-mono); font-size: 0.72em; color: var(--jd-muted); text-align: center; margin-top: 10px; }
.cv-nav { display: flex; align-items: center; gap: 10px; margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--jd-line); flex-wrap: wrap; }
.cv-nav-spacer { flex: 1; }
.cv-next { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.jd-toolbtn:disabled { opacity: 0.35; cursor: default; }

.cv-complete { max-width: 980px; margin-top: 16px; padding: 20px 24px; border-radius: 16px; border: 1px solid rgba(46, 204, 113, 0.4); background: rgba(46, 204, 113, 0.06); text-align: center; }
.cv-complete-title { font-family: var(--jd-display); font-style: italic; font-size: 1.8em; color: var(--jd-green); }
.cv-complete-text { color: var(--jd-text-soft); font-size: 0.9em; line-height: 1.6; margin: 8px 0 14px; }
.cv-complete-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.cv-complete-actions a { text-decoration: none; }

@media (max-width: 640px) {
  .cv-module-link { grid-template-columns: auto 1fr; padding: 14px 16px; gap: 12px; }
  .cv-module-cta { grid-column: 2; }
  .cv-step { padding: 16px 14px 14px; }
  .cv-step-title { font-size: 1.55em; }
}
</style>
