// Small builders shared by the modules of the guided path.

import {
  pcAt, midiAt, mod12, isNatural, neutralName, sharpName, flatName, keyPc, keyDot, colorOf,
  positionsOf, CAGED, CAGED_ORDER, shapePosition, cagedGrip, cagedArpeggio, TRIAD, KEY_NAMES,
  nameInKey, pretty, shuffle, bag,
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

// ── Answer pads for the timed drills ───────────────────────────────────────────

// The twelve notes as a small piano keyboard: naturals answer with their letter key too.
export function noteKeyboard(correctPc) {
  return {
    layout: 'piano',
    options: Array.from({ length: 12 }, (_, pc) => ({
      pc,
      ok: pc === mod12(correctPc),
      label: isNatural(pc) ? neutralName(pc) : `${pretty(sharpName(pc))}\n${pretty(flatName(pc))}`,
      hotkey: isNatural(pc) ? neutralName(pc).toLowerCase() : undefined,
    })),
  }
}

// Buttons 1-7 in order, so the number keys answer with the degree itself.
export const degreeOptions = correct => [1, 2, 3, 4, 5, 6, 7].map(n => ({ label: String(n), ok: n === correct }))

// The twelve degrees in chromatic order.
export const DEG_CHROMATIC = ['1', 'b2', '2', 'b3', '3', '4', '#4/b5', '5', 'b6', '6', 'b7', '7']
export const chromaticOptions = semi => DEG_CHROMATIC.map((label, i) => ({ label, ok: i === mod12(semi) }))

// ── The major scale and its chords ─────────────────────────────────────────────

export const MAJOR = [0, 2, 4, 5, 7, 9, 11]
export const DEGREE_NAMES = {
  it: ['tonica', 'sopratonica', 'mediante', 'sottodominante', 'dominante', 'sopradominante', 'sensibile'],
  en: ['tonic', 'supertonic', 'mediant', 'subdominant', 'dominant', 'submediant', 'leading tone'],
}
// Name of degree d (0-6) of a major key, spelled with one letter per degree.
export const degreeNote = (key, d) => nameInKey(key, MAJOR[d], d)
export const scaleNotes = key => MAJOR.map((_, d) => degreeNote(key, d))

// Keys used in the theory drills: every major key but F♯/G♭, whose spellings (E♯, C♭) come later.
export const DRILL_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F', 'Bb', 'Eb', 'Ab', 'Db']

export const DIATONIC = {
  triad:   ['', 'm', 'm', '', '', 'm', 'dim'],
  seventh: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'],
  roman:   ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  roman7:  ['Imaj7', 'ii7', 'iii7', 'IVmaj7', 'V7', 'vi7', 'viiø7'],
  quality: ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'],
  // T tonic, S subdominant, D dominant
  fn:      ['T', 'S', 'T', 'S', 'D', 'T', 'D'],
}
export const diatonicChord = (key, d, seventh = true) => degreeNote(key, d) + (seventh ? DIATONIC.seventh[d] : DIATONIC.triad[d])

// The cycle of fourths, the order of keys in most jazz progressions.
export const FOURTHS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G']

// ── Mixing drills ──────────────────────────────────────────────────────────────

// A round maker that takes turns among other makers (interleaved practice).
export function mix(makers) {
  const next = bag(makers.map((_, i) => i))
  const prevs = new Map()
  return i => {
    const k = next()
    const r = makers[k](i, prevs.get(k))
    prevs.set(k, r)
    return r
  }
}

// Options made of the right answer and distinct wrong ones, shuffled.
export function choices(right, wrongs, n = 4) {
  const seen = new Set([right])
  const pool = shuffle(wrongs).filter(w => !seen.has(w) && seen.add(w)).slice(0, n - 1)
  return shuffle([right, ...pool]).map(x => ({ label: x, ok: x === right }))
}
