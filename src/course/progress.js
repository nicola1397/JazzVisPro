import { reactive } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

// Progress through the guided path: steps completed in each module and the step
// last opened, remembered in localStorage.

const STORAGE_KEY = 'jazzVizCourse'
const saved = readStorage(STORAGE_KEY, {}) || {}
const state = reactive({
  done: saved.done && typeof saved.done === 'object' ? saved.done : {},
  last: saved.last && typeof saved.last === 'object' ? saved.last : {},
})

function save() {
  writeStorage(STORAGE_KEY, { done: state.done, last: state.last })
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
  if (state.last[moduleId] === index) return
  state.last[moduleId] = index
  save()
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
