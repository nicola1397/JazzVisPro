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

// ── Fretboard painting ───────────────────────────────────────────────────────
export function circleAt(p) {
  return document.querySelector(`.fretboard-layer .note-circle[data-string-index="${p.s}"][data-fret-index="${p.f}"]`)
}

const AREA_OPACITY = '0.22'

// Faint marks on the area where the answer goes (a string, a zone…). Call on a cleared board.
export function paintArea(test) {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    if (!test(+c.dataset.stringIndex, +c.dataset.fretIndex)) return
    c.style.backgroundColor = 'rgba(255, 214, 10, 0.55)'
    c.style.opacity = AREA_OPACITY
  })
}

// Removes the area marks (when the answer is shown), leaving every other circle as it is.
export function clearArea() {
  document.querySelectorAll('.fretboard-layer .note-circle').forEach(c => {
    if (c.style.opacity !== AREA_OPACITY || c.innerText) return
    c.style.cssText = ''
    c.style.opacity = '0.04'
  })
}

// A circle drawn with a white ring, e.g. the given root of a question.
export function paintRing(p, label, color = '#FFD60A') {
  const c = circleAt(p)
  if (!c) return
  c.style.transition = 'all 0.2s ease'
  c.style.backgroundColor = color
  c.style.opacity = '1'
  c.style.color = 'rgba(0,0,0,0.85)'
  c.style.border = '2px solid white'
  c.style.boxShadow = '0 0 12px 3px rgba(255,255,255,0.45)'
  c.innerText = label
}

// Retry mode: a wrong note turns red for a moment, then the circle goes back to how it was
// (unless the exercise painted it again meanwhile).
export function flashWrong(el, label, ms = 800) {
  if (!el) return
  const saved = { css: el.style.cssText, text: el.innerText, cls: el.className }
  el.style.transition = 'all 0.2s ease'
  el.style.backgroundColor = '#e74c3c'
  el.style.opacity = '1'
  el.style.color = 'rgba(0,0,0,0.85)'
  el.innerText = label
  const mine = el.style.backgroundColor
  setTimeout(() => {
    if (el.style.backgroundColor !== mine || el.innerText !== label) return
    el.style.cssText = saved.css
    el.innerText = saved.text
    el.className = saved.cls
  }, ms)
}
