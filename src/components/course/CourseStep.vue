<template>
  <div class="cs">
    <template v-for="(b, bi) in step.blocks" :key="bi">
      <p v-if="b.type === 'p'" class="cs-p" v-html="L(b)"></p>

      <ul v-else-if="b.type === 'list'" class="cs-list">
        <li v-for="(item, ii) in L(b)" :key="ii"><strong v-html="item[0]"></strong> <span v-html="item[1]"></span></li>
      </ul>

      <div v-else-if="b.type === 'tip'" class="teoria-tip cs-tip"><strong>{{ L(b.label) }}</strong> <span v-html="L(b)"></span></div>

      <div v-else-if="b.type === 'table'" class="cs-table">
        <table class="chord-table">
          <thead><tr><th v-for="h in L(b.head)" :key="h">{{ h }}</th></tr></thead>
          <tbody><tr v-for="(row, ri) in L(b.rows)" :key="ri"><td v-for="(cell, ci) in row" :key="ci" v-html="cell"></td></tr></tbody>
        </table>
      </div>

      <template v-else-if="b.type === 'diagram' || b.type === 'frames'">
        <div v-if="b.keys" class="cs-keys" role="group" :aria-label="t('label.key')">
          <span class="cs-keys-label">{{ t('label.key') }}</span>
          <button
            v-for="k in b.keys" :key="k" type="button" class="cs-key"
            :class="{ on: keyOf(bi, b) === k }" @click="keys[bi] = k"
          >{{ pretty(k) }}</button>
        </div>
        <NeckDiagram v-if="b.type === 'diagram'" v-bind="diagramProps(bi, b)" />
        <CourseFrames v-else :frames="framesOf(bi, b)" :key="keyOf(bi, b)" />
      </template>

      <TaskFind v-else-if="b.type === 'find'" :spec="b" item-id="course" :item-key="`${moduleId}:${step.id}`" @done="taskDone(bi)" />
      <TaskQuiz v-else-if="b.type === 'quiz'" :spec="b" item-id="course" :item-key="`${moduleId}:${step.id}`" @done="taskDone(bi)" />
      <TaskSpeed v-else-if="b.type === 'speed'" :spec="b" item-id="course" :item-key="`${moduleId}:${step.id}`" :store-key="`${moduleId}:${step.id}:${bi}`" @done="taskDone(bi)" />

      <div v-else-if="b.type === 'chart'" class="prog-example cs-chart">
        <span>{{ b.chart }}</span>
        <button class="jd-toolbtn" type="button" @click="loadChart(b.chart)">▶ {{ t('tl.player') }}</button>
      </div>

      <RouterLink v-else-if="b.type === 'practice'" :to="b.to" class="cs-practice">{{ L(b) }} →</RouterLink>
    </template>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import NeckDiagram from './NeckDiagram.vue'
import CourseFrames from './CourseFrames.vue'
import TaskFind from './TaskFind.vue'
import TaskQuiz from './TaskQuiz.vue'
import TaskSpeed from './TaskSpeed.vue'
import { useI18n } from '../../composables/useI18n.js'
import { usePlaybackStore } from '../../stores/playback.js'
import { pretty } from '../../course/theory.js'

const props = defineProps({
  step:     { type: Object, required: true },
  moduleId: { type: String, required: true },
})
const emit = defineEmits(['complete'])

const { t, lang } = useI18n()
const router = useRouter()
const pb = usePlaybackStore()
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))

// Key chosen for blocks that can be shown in any key.
const keys = reactive({})
const keyOf = (bi, b) => keys[bi] ?? b.defaultKey ?? b.keys?.[0]

// A diagram block: its own settings, overridden by what build(key) returns for the chosen key.
function diagramProps(bi, b) {
  const { type, keys: _k, defaultKey, build, caption, ...base } = b
  const built = build ? build(keyOf(bi, b)) : {}
  const { caption: builtCaption, ...rest } = built
  return { ...base, ...rest, caption: L(builtCaption ?? caption) }
}

function framesOf(bi, b) {
  return b.build ? b.build(keyOf(bi, b)) : b.frames
}

// ── Tasks ──────────────────────────────────────────────────────────────────────
// A step is done when all its exercises are; a timed drill counts once its first level is passed.
const TASK_TYPES = ['find', 'quiz', 'speed']
const taskIdx = computed(() => props.step.blocks.map((b, i) => (TASK_TYPES.includes(b.type) ? i : -1)).filter(i => i >= 0))
const doneTasks = reactive(new Set())
function taskDone(bi) {
  doneTasks.add(bi)
  if (taskIdx.value.every(i => doneTasks.has(i))) emit('complete')
}

function loadChart(text) {
  pb.importFromText(text)
  router.push('/player')
}
</script>

<style scoped>
.cs-p { color: #cfc9be; font-size: 0.93em; line-height: 1.7; margin: 12px 0; }
.cs-p :deep(strong) { color: var(--jd-text); }
.cs-p :deep(em) { color: var(--jd-amber-soft); font-style: italic; }
.cs-list { margin: 12px 0; padding-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 0.9em; line-height: 1.6; color: #cfc9be; }
.cs-list strong { color: var(--jd-text); }
.cs-tip { margin: 16px 0; }
.cs-table { overflow-x: auto; margin: 14px 0; border-radius: 10px; border: 1px solid var(--jd-line); }
.cs-chart { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
.cs-keys { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; margin: 16px 0 -4px; }
.cs-keys-label { font-family: var(--jd-mono); font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--jd-muted); margin-right: 6px; }
.cs-key {
  min-width: 34px; font-family: var(--jd-mono); font-size: 11px; font-weight: 700;
  background: transparent; color: var(--jd-text-soft); border: 1px solid var(--jd-line-strong);
  border-radius: 7px; padding: 4px 6px; cursor: pointer;
}
.cs-key.on { background: rgba(255, 214, 10, 0.14); color: var(--jd-amber); border-color: var(--jd-amber); }
a.cs-practice {
  display: inline-block; margin: 14px 14px 0 0; font-family: var(--jd-mono); font-size: 0.8em;
  letter-spacing: 0.5px; color: var(--jd-amber); text-decoration: none;
}
a.cs-practice:hover { text-decoration: underline; }
</style>
