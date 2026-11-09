// Shared pieces of the "reference" and "retry until right" modes of the fretboard exercises.
//
// Reference mode: each question also says where to play it (a string, a root at a given
// string and fret, a string set, a CAGED shape, a zone of frets…). Clicks are checked by
// position; notes played on the guitar by exact pitch, since the guitar cannot tell the string.
//
// Retry mode: a wrong note only flashes red and the question stays open until the right
// answer; the score counts the questions right at the first attempt.

import { getAbsoluteNote, CAGED_SHAPES_MAJOR, CAGED_SHAPES_MINOR } from './theory.js'
import { FRETS, STRINGS } from './constants.js'
import { fretboard, setMark, setMarks, flashMark, WRONG } from '../composables/useFretboardMarks.js'

export const ZONE_SPAN = 5                       // frets in a zone, as in one hand position
export const ZONE_STARTS = [0, 3, 5, 7, 9, 12]
const ORD_EN = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']

export const pickOne = list => list[Math.floor(Math.random() * list.length)]

// ── Names (string index: 0 = 1st string, high E … 5 = 6th string, low E) ─────
export function stringName(s, lang) {
  const n = s + 1
  return lang === 'it' ? `${n}ª corda` : `${ORD_EN[n]} string`
}
// "corde 3-2-1" from the indexes of the strings, low to high
export function stringSetName(strings, lang) {
  return `${lang === 'it' ? 'corde' : 'strings'} ${strings.map(s => s + 1).join('-')}`
}
export function fretName(f, lang) {
  if (lang === 'it') return f === 0 ? 'corda a vuoto' : `${f}° tasto`
  return f === 0 ? 'open string' : `fret ${f}`
}
// "6ª corda, 5° tasto" / "6th string, fret 5"
export function positionName(p, lang) {
  if (p.f === 0) return lang === 'it' ? `${stringName(p.s, lang)} a vuoto` : `open ${stringName(p.s, lang)}`
  return `${stringName(p.s, lang)}, ${fretName(p.f, lang)}`
}
export function zoneName(zone, lang) {
  return `${lang === 'it' ? 'tasti' : 'frets'} ${zone.lo}–${zone.hi}`
}

// ── Positions ────────────────────────────────────────────────────────────────
export const midiAt = (tuning, p) => getAbsoluteNote(tuning, p.s, p.f)

export function allPositions(test = () => true) {
  const out = []
  for (let s = 0; s < STRINGS; s++) for (let f = 0; f <= FRETS; f++) if (test(s, f)) out.push({ s, f })
  return out
}

// Positions that sound exactly this MIDI note, optionally only those passing `test(s, f)`.
export function positionsOfMidi(tuning, midi, test = () => true) {
  return allPositions((s, f) => test(s, f) && getAbsoluteNote(tuning, s, f) === midi)
}

export function randomZone() {
  const lo = pickOne(ZONE_STARTS)
  return { lo, hi: Math.min(FRETS, lo + ZONE_SPAN - 1) }
}
export const inZone = (f, zone) => f >= zone.lo && f <= zone.hi
// A guitar note counts in a zone when it can be played there.
export const playableInZone = (tuning, midi, zone) => positionsOfMidi(tuning, midi, (s, f) => inZone(f, zone)).length > 0

// CAGED shape of a major or minor chord placed with its main root at `rootFret` of the
// shape's root string. Null when it does not fit on the neck. Standard tuning only.
export function cagedShape(quality, name, rootFret) {
  const def = (quality === 'min' ? CAGED_SHAPES_MINOR : CAGED_SHAPES_MAJOR)[name]
  if (!def) return null
  const shape = def.map(o => ({ s: o.s, f: rootFret + o.f }))
  return shape.every(p => p.f >= 0 && p.f <= FRETS) ? shape : null
}
// Every CAGED shape of the chord that fits up to `maxFret`: [{ name, shape, root }]
export function cagedOptions(tuning, rootPc, quality, maxFret = 15) {
  const out = []
  for (const name of ['C', 'A', 'G', 'E', 'D']) {
    const anchor = CAGED_SHAPES_MAJOR[name][0].s
    for (let f = 0; f <= FRETS; f++) {
      if (getAbsoluteNote(tuning, anchor, f) % 12 !== rootPc) continue
      const shape = cagedShape(quality, name, f)
      if (shape && shape.every(p => p.f <= maxFret)) out.push({ name, shape, root: { s: anchor, f } })
    }
  }
  return out
}

// ── Fretboard painting (marks, see composables/useFretboardMarks.js) ─────────
const AREA = { color: 'rgba(255, 214, 10, 0.55)', opacity: 0.22, area: true }

// Faint marks on the area where the answer goes (a string, a zone…).
export function paintArea(test) {
  setMarks(allPositions(test), AREA)
}

// Removes the area marks (when the answer is shown), leaving every other mark as it is.
export function clearArea() {
  for (const [k, m] of Object.entries(fretboard.marks)) if (m.area) delete fretboard.marks[k]
}

// A circle drawn with a white ring, e.g. the given root of a question.
export function paintRing(p, label, color = '#FFD60A') {
  setMark(p, { color, label, ring: true })
}

// Retry mode: a wrong note turns red for a moment, then goes back to how it was.
export function flashWrong(p, label, ms = 800) {
  if (p) flashMark(p, { color: WRONG, label }, ms)
}
