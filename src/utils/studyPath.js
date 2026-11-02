import { reactive } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

// Study path of each Real Book tune: the steps done so far, remembered.
// Steps: 'listen' (play along in the Player), then the Over the Changes exercises.
export const STUDY_STEPS = ['listen', 'guide', 'arpeggio', 'approach', 'free']

const STORAGE_KEY = 'jazzVizStudyPaths'
const state = reactive(readStorage(STORAGE_KEY, {}) || {})

export function stepsDone(title) {
  return state[title] || {}
}

export function setStepDone(title, step, done = true) {
  state[title] = { ...(state[title] || {}), [step]: done }
  writeStorage(STORAGE_KEY, state)
}
