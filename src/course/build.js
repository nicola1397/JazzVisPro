// Small builders shared by the modules of the guided path.

import {
  pcAt, midiAt, mod12, isNatural, neutralName, sharpName, flatName, keyPc, keyDot, colorOf,
  positionsOf, CAGED, CAGED_ORDER, shapePosition, cagedGrip, cagedArpeggio, TRIAD, KEY_NAMES,
} from './theory.js'

export const T = (it, en) => ({ it, en })

export const IVORY = '#ede8df'
export const SLATE = '#5d584f'
export const AMBER = '#FFD60A'
export const RED = '#e74c3c'

export const NATURAL_NAMES = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
export const NATURAL_PCS = [0, 2, 4, 5, 7, 9, 11]
export const ACCIDENTAL_PCS = [1, 3, 6, 8, 10]

// Ordinal of a string number in both languages: 6ª / 6th
export const ordIt = n => `${n}ª`
export const ordEn = n => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`
export const strIt = s => `${ordIt(s + 1)} corda`
export const strEn = s => `${ordEn(s + 1)} string`

// A dot named out of any key: naturals light, accidentals dark with both spellings.
export function plainDot(s, f, extra = {}) {
  const pc = pcAt(s, f)
  return {
    s, f,
    note: neutralName(pc),
    color: isNatural(pc) ? IVORY : SLATE,
    ...extra,
  }
}

// Every note of a string in a window, optionally naturals only.
export function stringDots(s, from = 0, to = 12, { naturalsOnly = false } = {}) {
  const out = []
  for (let f = from; f <= to; f++) {
    if (naturalsOnly && !isNatural(pcAt(s, f))) continue
    out.push(plainDot(s, f))
  }
  return out
}

// A note name chosen for an exercise: naturals as they are, accidentals with a random spelling.
export function spelled(pc, prefer) {
  if (isNatural(pc)) return neutralName(pc)
  const sharp = prefer === '#' || (prefer !== 'b' && Math.random() < 0.5)
  return sharp ? sharpName(pc) : flatName(pc)
}

// Interval names, by semitones (0 – 12).
export const INTERVAL_NAMES = {
  it: ['unisono', 'seconda minore', 'seconda maggiore', 'terza minore', 'terza maggiore', 'quarta giusta', 'tritono', 'quinta giusta', 'sesta minore', 'sesta maggiore', 'settima minore', 'settima maggiore', 'ottava'],
  en: ['unison', 'minor second', 'major second', 'minor third', 'major third', 'perfect fourth', 'tritone', 'perfect fifth', 'minor sixth', 'major sixth', 'minor seventh', 'major seventh', 'octave'],
}
export const intervalName = semi => T(INTERVAL_NAMES.it[semi], INTERVAL_NAMES.en[semi])
export const DEG12 = ['R', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', 'R']

// Minor keys as usually written (C♯m and G♯m rather than D♭m and A♭m).
export const MINOR_KEYS = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

// Shape names in both languages.
export const shapeName = (shape) => T(`forma di ${shape}`, `${shape} shape`)
export const qualityName = q => (q === 'minor' ? T('minore', 'minor') : T('maggiore', 'major'))

// Keys whose movable shape `shape` sits between fret `lo` and `hi`.
export function keysForShape(shape, lo = 1, hi = 10, names = KEY_NAMES) {
  return names.filter(k => {
    const p = shapePosition(k, shape)
    return p >= lo && p <= hi
  })
}

// Fret window that frames a shape at position p.
export function shapeWindow(shape, p) {
  const [a, b] = CAGED[shape].box
  return { from: Math.max(0, p + a - 1), to: Math.min(17, p + b + 2) }
}

// All the chord tones of a triad (or any chord) across a window, coloured by degree.
export function chordToneDots(key, intervals, from = 0, to = 15, extra = {}) {
  const want = new Set(intervals.map(mod12))
  const out = []
  for (let s = 0; s < 6; s++) for (let f = from; f <= to; f++) {
    const semi = mod12(pcAt(s, f) - keyPc(key))
    if (want.has(semi)) out.push(keyDot(key, s, f, { color: colorOf(semi), ...(semi === 3 ? { steps: 2 } : {}), ...extra }))
  }
  return out
}

// Colour each dot by its degree.
export const coloured = dots => dots.map(d => ({ ...d, color: d.color || colorOf(d.semi) }))

// The five shapes of a key ordered up the neck from the nut, each with its box and arpeggio.
export function shapesUpTheNeck(key, intervals = TRIAD.major, maxFret = 15) {
  const out = []
  for (const shape of CAGED_ORDER) {
    for (const base of [0, 12]) {
      const p = shapePosition(key, shape) + base
      const [a, b] = CAGED[shape].box
      if (p + b > maxFret) continue
      const arp = cagedArpeggio(key, shape, intervals, p)
      out.push({ shape, p, lo: Math.max(0, p + a), hi: p + b, arp })
    }
  }
  return out.sort((x, y) => x.p - y.p)
}

export { cagedGrip, CAGED, CAGED_ORDER, shapePosition, TRIAD, KEY_NAMES, positionsOf, midiAt }
