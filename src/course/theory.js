// Fretboard geometry and shape generators used by the guided path (Percorso).
// Standard tuning only. String index s: 0 = high e (1st string) … 5 = low E (6th string),
// the same order the main fretboard and tablature use.

import { INTERVAL_COLORS, ROOT_NAMES, spellAbove } from '../utils/theory.js'

export const OPEN_MIDI = [64, 59, 55, 50, 45, 40]          // E4 B3 G3 D3 A2 E2
export const STRING_LETTERS = ['e', 'B', 'G', 'D', 'A', 'E']
export const MAX_FRET = 17

export const pcAt   = (s, f) => (OPEN_MIDI[s] + f) % 12
export const midiAt = (s, f) => OPEN_MIDI[s] + f
export const stringNumber = s => s + 1
export const mod12 = n => ((n % 12) + 12) % 12

// ── Note names ──────────────────────────────────────────────────────────────────

const NATURAL = { 0: 'C', 2: 'D', 4: 'E', 5: 'F', 7: 'G', 9: 'A', 11: 'B' }
const SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export const isNatural = pc => NATURAL[mod12(pc)] !== undefined
// Name out of any key: the letter for a natural note, both spellings otherwise (F#/Gb).
export const neutralName = pc => isNatural(pc) ? NATURAL[mod12(pc)] : `${SHARP[mod12(pc)]}/${FLAT[mod12(pc)]}`
export const sharpName = pc => SHARP[mod12(pc)]
export const flatName  = pc => FLAT[mod12(pc)]
// Display form with real accidental signs.
export const pretty = name => String(name).replace(/([A-G])(#+|b+)/g, (m, letter, acc) => letter + acc.replace(/#/g, '♯').replace(/b/g, '♭'))

export const KEY_NAMES = ROOT_NAMES                         // C Db D Eb E F F# G Ab A Bb B
export const keyPc = name => {
  const i = SHARP.indexOf(name)
  return i >= 0 ? i : FLAT.indexOf(name)
}

// Degree labels by semitone above the root (scale-degree style, as in "R-3-5-b7").
export const DEGREE = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7']
// Letter steps above the root of each degree, used to spell the note in the key.
const DEGREE_STEPS = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6]

export const colorOf = semi => INTERVAL_COLORS[mod12(semi)]?.color || '#ede8df'

// Name of the note `semi` semitones above `key`, spelled as that degree of the key.
export function nameInKey(key, semi, steps) {
  const st = steps ?? DEGREE_STEPS[mod12(semi)]
  return spellAbove(key, mod12(semi), st) || neutralName(keyPc(key) + semi)
}

// A dot for the diagram, labelled with note name and degree relative to `key`.
export function keyDot(key, s, f, extra = {}) {
  const semi = mod12(pcAt(s, f) - keyPc(key))
  const { deg, steps, ...rest } = extra
  const dot = { s, f, semi, deg: deg ?? DEGREE[semi], note: nameInKey(key, semi, steps) }
  for (const [k, v] of Object.entries(rest)) if (v !== undefined) dot[k] = v
  return dot
}

// Every position of a pitch class within a fret window, on the given strings.
export function positionsOf(pc, from = 0, to = 12, strings = [0, 1, 2, 3, 4, 5]) {
  const out = []
  for (const s of strings) for (let f = from; f <= to; f++) if (pcAt(s, f) === mod12(pc)) out.push({ s, f })
  return out
}

// Positions of an exact pitch (MIDI) within a window.
export function positionsOfMidi(midi, from = 0, to = MAX_FRET) {
  const out = []
  for (let s = 0; s < 6; s++) { const f = midi - OPEN_MIDI[s]; if (f >= from && f <= to) out.push({ s, f }) }
  return out
}

// ── CAGED ───────────────────────────────────────────────────────────────────────
// Each shape is described in its open form (the chord at the nut). `p` = how many
// frets the open form is moved up: the fret the nut "becomes" (the barre fret).
// grips: fret of each string relative to p (index s = 0 … 5), null = not played.
// box: frets [p + lo, p + hi] where the shape lives (its arpeggio box).
// rootStrings: strings that carry the root inside the shape.

export const CAGED_ORDER = ['C', 'A', 'G', 'E', 'D']
// A colour per shape, used for its area on the diagrams.
export const SHAPE_COLORS = { C: '#3a9ad9', A: '#9c5cff', G: '#1abc9c', E: '#ff8c1a', D: '#ff5fa2' }

export const CAGED = {
  C: {
    openPc: 0, box: [0, 3], stretch: 'up', rootStrings: [4, 1],
    grip:  { major: [0, 1, 0, 2, 3, null], minor: [null, 1, 0, 1, 3, null] },
    open:  { major: [0, 1, 0, 2, 3, null] },
    moved: { major: [1, 2, 1, 3, 4, null], minor: [null, 3, 1, 2, 4, null] },
  },
  A: {
    openPc: 9, box: [-1, 2], stretch: 'up', rootStrings: [4, 2],
    grip:  { major: [0, 2, 2, 2, 0, null], minor: [0, 1, 2, 2, 0, null] },
    open:  { major: [0, 3, 2, 1, 0, null], minor: [0, 1, 3, 2, 0, null] },
    moved: { major: [1, 3, 3, 3, 1, null], minor: [1, 2, 4, 3, 1, null] },
  },
  G: {
    openPc: 7, box: [0, 3], stretch: 'down', rootStrings: [5, 2, 0],
    grip:  { major: [3, 0, 0, 0, 2, 3], minor: [3, 3, 0, 0, 1, 3] },
    open:  { major: [3, 0, 0, 0, 1, 2] },
    moved: { major: [4, 1, 1, 1, 2, 3], minor: [4, 4, 1, 1, 2, 3] },
  },
  E: {
    openPc: 4, box: [-1, 2], stretch: 'up', rootStrings: [5, 3, 0],
    grip:  { major: [0, 0, 1, 2, 2, 0], minor: [0, 0, 0, 2, 2, 0] },
    open:  { major: [0, 0, 1, 3, 2, 0], minor: [0, 0, 0, 3, 2, 0] },
    moved: { major: [1, 1, 2, 4, 3, 1], minor: [1, 1, 1, 4, 3, 1] },
  },
  D: {
    openPc: 2, box: [0, 3], stretch: 'down', rootStrings: [3, 1],
    grip:  { major: [2, 3, 2, 0, null, null], minor: [1, 3, 2, 0, null, null] },
    open:  { major: [2, 3, 1, 0, null, null], minor: [1, 3, 2, 0, null, null] },
    moved: { major: [3, 4, 2, 1, null, null], minor: [2, 4, 3, 1, null, null] },
  },
}

// Fingers: `open` for the chord at the nut (0 = open string), `moved` for the
// movable form (1 = index on the fret the nut becomes, often as a barre).

export const TRIAD = { major: [0, 4, 7], minor: [0, 3, 7] }

// Fret the open form moves to for a key. `minFret` lets a caller ask for the copy
// higher up the neck (e.g. the C shape of C at 12 instead of 0).
export function shapePosition(key, shape, minFret = 0) {
  const base = CAGED[shape]
  let p = mod12(keyPc(key) - base.openPc)
  // A and E shapes need a fret below p for the box: keep them off the nut unless asked.
  while (p < minFret) p += 12
  return p
}

// The chord grip of a shape in a key, as diagram dots (with degrees and fingers).
export function cagedGrip(key, shape, quality = 'major', minFret = 0) {
  const def = CAGED[shape]
  const p = shapePosition(key, shape, minFret)
  const grip = def.grip[quality]
  const fingers = (p === 0 ? def.open : def.moved)[quality] || def.moved[quality]
  const dots = [], muted = []
  grip.forEach((rel, s) => {
    if (rel === null) { muted.push(s); return }
    const f = p + rel
    dots.push(keyDot(key, s, f, { finger: fingers[s] || undefined, ...thirdSpelling(quality, pcAt(s, f), key) }))
  })
  return { p, dots, muted, barre: barreOf(p, grip, quality, shape) }
}

function thirdSpelling(quality, pc, key) {
  return quality === 'minor' && mod12(pc - keyPc(key)) === 3 ? { steps: 2 } : {}
}

// Index-finger barre of the movable E, A and (partly) other shapes.
function barreOf(p, grip, quality, shape) {
  if (p === 0) return null
  const onP = grip.map((rel, s) => (rel === 0 ? s : -1)).filter(s => s >= 0)
  if (onP.length < 2) return null
  return { f: p, from: Math.min(...onP), to: Math.max(...onP) }
}

// Every chord tone inside the shape's box (the arpeggio form of the shape).
// `intervals`: semitones above the root (triad by default, or a seventh chord).
export function cagedArpeggio(key, shape, intervals = TRIAD.major, minFret = 0) {
  const def = CAGED[shape]
  const p = shapePosition(key, shape, minFret)
  const lo = Math.max(0, p + def.box[0]), hi = p + def.box[1]
  const want = new Set(intervals.map(mod12))
  const steps = stepsFor(intervals)
  const dots = []
  for (let s = 5; s >= 0; s--) {
    for (let f = lo; f <= hi; f++) {
      const semi = mod12(pcAt(s, f) - keyPc(key))
      if (want.has(semi)) dots.push(keyDot(key, s, f, { steps: steps[semi] }))
    }
  }
  return { p, lo, hi, dots }
}

// Letter steps of each chord/scale tone, so b3 is spelled as a third and #5 as a fifth.
function stepsFor(intervals) {
  const out = {}
  intervals.forEach(i => {
    const m = mod12(i)
    out[m] = DEGREE_STEPS[m]
  })
  return out
}

// The scale around a shape: every scale tone in the box, plus the few notes just
// outside it (one fret below or above) that the pattern needs so no scale note is
// skipped between the lowest and highest note of the box.
export function cagedScale(key, shape, scale, minFret = 0, degreeLabels) {
  const def = CAGED[shape]
  const p = shapePosition(key, shape, minFret)
  const lo = Math.max(0, p + def.box[0]), hi = p + def.box[1]
  const k = keyPc(key)
  const inScale = f => s => scale.includes(mod12(pcAt(s, f) - k))
  const core = []
  for (let s = 5; s >= 0; s--) for (let f = lo; f <= hi; f++) if (inScale(f)(s)) core.push({ s, f })
  const pitches = new Set(core.map(d => midiAt(d.s, d.f)))
  const minP = Math.min(...pitches), maxP = Math.max(...pitches)
  const extra = []
  for (let m = minP; m <= maxP; m++) {
    if (!scale.includes(mod12(m - k)) || pitches.has(m)) continue
    const below = positionsOfMidi(m, lo - 1, lo - 1).filter(d => d.f >= 0)
    const above = positionsOfMidi(m, hi + 1, hi + 1)
    const pick = def.stretch === 'down' ? (below[0] || above[0]) : (above[0] || below[0])
    if (pick) { extra.push(pick); pitches.add(m) }
  }
  const dots = [...core, ...extra]
    .sort((a, b) => midiAt(a.s, a.f) - midiAt(b.s, b.f))
    .map(({ s, f }) => {
      const semi = mod12(pcAt(s, f) - k)
      const idx = scale.indexOf(semi)
      return keyDot(key, s, f, {
        steps: idx >= 0 && scale.length === 7 ? idx : undefined,
        deg: degreeLabels ? degreeLabels[idx] : undefined,
        stretch: f < lo || f > hi ? true : undefined,
      })
    })
  return { p, lo, hi, dots }
}

// Two-notes-per-string pentatonic box: box n (0-4) starts on the n-th note of the
// scale on the low E string. `scale` is the five intervals above `key`.
export function pentatonicBox(key, scale, n, minFret = 0) {
  const k = keyPc(key)
  const tones = scale.map(i => mod12(k + i))
  // Lowest fret on the low E string carrying the starting tone, at or above minFret,
  // moved up an octave when the box would reach below the nut.
  let f0 = mod12(tones[n] - OPEN_MIDI[5])
  while (f0 < minFret) f0 += 12
  for (;;) {
    let midi = OPEN_MIDI[5] + f0
    let idx = n
    const dots = []
    for (let s = 5; s >= 0; s--) {
      for (let j = 0; j < 2; j++) {
        dots.push(keyDot(key, s, midi - OPEN_MIDI[s]))
        idx = (idx + 1) % tones.length
        midi += mod12(tones[idx] - midi) || 12
      }
    }
    const frets = dots.map(d => d.f)
    if (Math.min(...frets) >= 0) return { dots, lo: Math.min(...frets), hi: Math.max(...frets) }
    f0 += 12
  }
}

// ── Triads on three adjacent strings ────────────────────────────────────────────
// Close-position triads: one chord tone per string, within four frets and an octave.
// Returns the voicings found between fret `from` and `to`, lowest first, each with
// its inversion (0 root position, 1 first, 2 second).
export function triadsOnStrings(key, quality, strings, from = 0, to = 15) {
  const k = keyPc(key)
  const tones = TRIAD[quality]
  const [low, mid, high] = [...strings].sort((a, b) => b - a)
  const out = []
  for (let a = from; a <= to; a++) for (let b = from; b <= to; b++) for (let c = from; c <= to; c++) {
    const semis = [mod12(pcAt(low, a) - k), mod12(pcAt(mid, b) - k), mod12(pcAt(high, c) - k)]
    if (!semis.every(x => tones.includes(x)) || new Set(semis).size !== 3) continue
    const frets = [a, b, c]
    if (Math.max(...frets) - Math.min(...frets) > 4) continue
    const pitches = [midiAt(low, a), midiAt(mid, b), midiAt(high, c)]
    if (!(pitches[0] < pitches[1] && pitches[1] < pitches[2]) || pitches[2] - pitches[0] >= 12) continue
    const inversion = tones.indexOf(semis[0])
    out.push({
      inversion,
      frets,
      dots: [[low, a], [mid, b], [high, c]].map(([s, f]) => keyDot(key, s, f, thirdSpelling(quality, pcAt(s, f), key))),
    })
  }
  return out.sort((x, y) => Math.min(...x.frets) - Math.min(...y.frets))
}

// ── Small helpers for exercises ─────────────────────────────────────────────────

export const pick = list => list[Math.floor(Math.random() * list.length)]
export function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
// Draws from a shuffled bag, so every item comes up before any repeats
// (and never twice in a row across refills).
export function bag(list) {
  let items = [], last
  return () => {
    if (!items.length) {
      items = shuffle(list)
      if (items.length > 1 && items[items.length - 1] === last) [items[0], items[items.length - 1]] = [items[items.length - 1], items[0]]
    }
    last = items.pop()
    return last
  }
}

// A random item different from the previous one, when possible.
export function pickNew(list, prev, same = (x, y) => x === y) {
  const pool = list.filter(x => prev === undefined || !same(x, prev))
  return pick(pool.length ? pool : list)
}
