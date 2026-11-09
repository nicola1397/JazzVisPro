import { reactive, toRaw, onMounted, onUnmounted } from 'vue'

// What the exercises draw on the main fretboard, and who answers its clicks.
//
// Exercises used to restyle the fretboard's circles directly in the page (and to listen
// to a window event for clicks, routed by a list of paths in App.vue). Now they describe
// marks by position and the fretboard draws them; clicks go to the exercise on screen.
//
// A mark: { color, label, opacity, textColor, ring, glow, ghost, cls, area }
//   ring: white outline (a given note, or an answer played on the guitar)
//   glow: CSS colour of a halo; cls: extra classes ('note-highlighted', 'lsn-now'…)
//   area: faint mark of where the answer goes (removed by clearArea)
// Unmarked circles stay almost invisible during an exercise.

export const fretboard = reactive({ marks: {}, pick: null })

const keyOf = p => `${p.s}-${p.f}`

export const getMark = p => fretboard.marks[keyOf(p)]
export function setMark(p, spec) { fretboard.marks[keyOf(p)] = { ...spec } }
export function clearMark(p) { delete fretboard.marks[keyOf(p)] }
export function clearMarks() { fretboard.marks = {} }
export function setMarks(positions, spec) {
  for (const p of positions) if (p) setMark(p, typeof spec === 'function' ? spec(p) : spec)
}

// A mark shown for `ms`, then the circle goes back to what it was (unless redrawn meanwhile)
export function flashMark(p, spec, ms = 800) {
  const before = getMark(p) ? { ...toRaw(getMark(p)) } : null
  setMark(p, spec)
  const mine = toRaw(getMark(p))
  setTimeout(() => {
    if (toRaw(getMark(p)) !== mine) return
    if (before) setMark(p, before)
    else clearMark(p)
  }, ms)
}

// Common marks
export const RIGHT = '#2ecc71'
export const WRONG = '#e74c3c'
export const answerMark = (correct, label, played = false) => ({ color: correct ? RIGHT : WRONG, label, ring: played, glow: played ? 'rgba(255,255,255,0.6)' : null })

// The exercise on screen answers the fretboard's clicks; its marks go when it closes.
// handler({ s, f, noteIndex, midi })
export function useFretboardPick(handler) {
  onMounted(() => { fretboard.pick = handler; clearMarks() })
  onUnmounted(() => {
    if (fretboard.pick === handler) fretboard.pick = null
    clearMarks()
  })
}

// Adds / removes a class on a mark (e.g. the note being played in a demonstration)
export function addMarkClass(p, cls) {
  const m = getMark(p)
  if (m) setMark(p, { ...toRaw(m), cls: [...new Set([].concat(m.cls || [], cls))] })
}
export function removeMarkClass(p, cls) {
  const m = getMark(p)
  if (m) setMark(p, { ...toRaw(m), cls: [].concat(m.cls || []).filter(c => c !== cls) })
}

// How the fretboard draws a mark (inline style)
export function markStyle(m) {
  // ghost: dashed outline only, label in the outline colour (where a note will go)
  if (m.ghost) {
    return {
      transition: 'all 0.2s ease', backgroundColor: 'transparent', border: `2px dashed ${m.color}`, boxShadow: 'none',
      opacity: String(m.opacity ?? 0.9), color: m.color, visibility: 'visible', pointerEvents: 'auto',
    }
  }
  const ring = m.ring ? { border: '2px solid white', boxShadow: `0 0 12px 3px ${m.glow || 'rgba(255,255,255,0.45)'}` }
    : m.glow ? { boxShadow: `0 0 14px 4px ${m.glow}` } : {}
  return {
    transition: 'all 0.2s ease',
    backgroundColor: m.color || 'white',
    opacity: String(m.opacity ?? 1),
    color: m.textColor || 'rgba(0,0,0,0.85)',
    visibility: 'visible',
    pointerEvents: 'auto',
    ...ring,
  }
}
