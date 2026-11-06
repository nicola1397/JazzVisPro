// The guided path: modules in the order they are meant to be studied.
import notes from './modules/notes.js'
import intervals from './modules/intervals.js'
import caged from './modules/caged.js'
import shapes from './modules/shapes.js'
import triads from './modules/triads.js'

export const COURSE = [notes, intervals, caged, shapes, triads]

export const moduleById = id => COURSE.find(m => m.id === id)

// Title of a step from the key the practice history stores ('caged:e-shape').
export function stepTitle(key, lang = 'it') {
  const [moduleId, stepId] = String(key).split(':')
  const step = moduleById(moduleId)?.steps.find(s => s.id === stepId)
  return step ? (step.title[lang] ?? step.title.it) : key
}
