import { reactive } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

// Progress through the guided path: steps completed in each module and the step
// last opened, remembered in localStorage.

const STORAGE_KEY = 'jazzVizCourse'
const saved = readStorage(STORAGE_KEY, {}) || {}
const state = reactive({
  done: saved.done && typeof saved.done === 'object' ? saved.done : {},
  last: saved.last && typeof saved.last === 'object' ? saved.last : {},
  // Best result of each timed drill: { level (1 bronze … 3 gold), avg (ms), acc (0-1) }
  medals: saved.medals && typeof saved.medals === 'object' ? saved.medals : {},
  // Module opened most recently (the Today page offers to continue it)
  recent: typeof saved.recent === 'string' ? saved.recent : null,
})

function save() {
  writeStorage(STORAGE_KEY, { done: state.done, last: state.last, medals: state.medals, recent: state.recent })
}

export function getMedal(key) {
  return state.medals[key] || null
}

// Keeps the best: a higher level, or the same level with a lower average time.
export function setMedal(key, level, avg, acc) {
  const old = state.medals[key]
  if (old && (old.level > level || (old.level === level && old.avg <= avg))) return
  state.medals[key] = { level, avg: Math.round(avg), acc: Math.round(acc * 100) / 100 }
  save()
}

// Medals won in a module: { gold, silver, bronze } counts and the drills available.
export function moduleMedals(module) {
  const out = { 1: 0, 2: 0, 3: 0, total: 0 }
  module.steps.forEach(step => step.blocks.forEach((b, bi) => {
    if (b.type !== 'speed') return
    out.total++
    const m = state.medals[`${module.id}:${step.id}:${bi}`]
    if (m) out[m.level]++
  }))
  return out
}

export function isStepDone(moduleId, stepId) {
  return !!state.done[moduleId]?.[stepId]
}

export function markStepDone(moduleId, stepId) {
  if (isStepDone(moduleId, stepId)) return
  state.done[moduleId] = { ...(state.done[moduleId] || {}), [stepId]: true }
  save()
}

export function stepsDoneCount(module) {
  return module.steps.filter(s => isStepDone(module.id, s.id)).length
}

export function lastStep(moduleId) {
  return state.last[moduleId] ?? 0
}

export function setLastStep(moduleId, index) {
  if (state.last[moduleId] === index && state.recent === moduleId) return
  state.last[moduleId] = index
  state.recent = moduleId
  save()
}

export function recentModuleId() {
  return state.recent
}

// First step not done yet (or the last one when the module is complete).
export function nextStepIndex(module) {
  const i = module.steps.findIndex(s => !isStepDone(module.id, s.id))
  return i < 0 ? module.steps.length - 1 : i
}

export function resetModule(moduleId) {
  delete state.done[moduleId]
  delete state.last[moduleId]
  save()
}
