import { reactive } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { INTERACTIVE } from './fretboardLessons.js'

// Progress of the guided lessons, remembered in this browser:
// { [lessonId]: { done: { [stepId]: true }, at: index of the last step opened } }

const STORAGE_KEY = 'jazzVizLessons'
const state = reactive(readStorage(STORAGE_KEY, {}) || {})

function entry(id) {
  if (!state[id] || typeof state[id] !== 'object') state[id] = { done: {}, at: 0 }
  if (!state[id].done) state[id].done = {}
  return state[id]
}

export function lessonState(id) {
  return state[id] || { done: {}, at: 0 }
}

export function markStepDone(id, stepId) {
  entry(id).done[stepId] = true
  writeStorage(STORAGE_KEY, state)
}

export function setLessonPosition(id, index) {
  entry(id).at = index
  writeStorage(STORAGE_KEY, state)
}

// Exercises (mirror and quiz steps) of a lesson, and how many are done.
export function lessonCounts(lesson) {
  const done = lessonState(lesson.id).done
  const tasks = lesson.steps.filter(s => INTERACTIVE.includes(s.type))
  return { total: tasks.length, done: tasks.filter(s => done[s.id]).length }
}

export function isLessonDone(lesson) {
  const c = lessonCounts(lesson)
  return c.total > 0 && c.done === c.total
}
