import { A4_FREQ, A4_NOTE_IDX, BASE_OCTAVES } from './constants.js'

export const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
export const NOTES_FLAT = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']
export const NOTES_ITA = ['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si']

export const TUNINGS = {
  'E Standard': [4,11,7,2,9,4], // Pitch classes of open strings
  'Drop D':     [4,11,7,2,9,2],
  'Eb Standard':[3,10,6,1,8,3],
  'D Standard': [2,9,5,0,7,2],
  'DADGAD':     [2,9,7,2,9,2],
}

export const SCALES = {
  'Ionio (Maj7)':         [0,2,4,5,7,9,11],
  'Dorico (m7)':          [0,2,3,5,7,9,10],
  'Frigio':               [0,1,3,5,7,8,10],
  'Misolidio (7)':        [0,2,4,5,7,9,10],
  'Lidio (Maj7#11)':      [0,2,4,6,7,9,11],
  'Altered (7alt)':       [0,1,3,4,6,8,10],
  'Minore Melodica':      [0,2,3,5,7,9,11],
  'Diminuita (T/S)':      [0,2,3,5,6,8,9,11],
  'Diminuita (S/T)':      [0,1,3,4,6,7,9,10],
  'Esatonale':            [0,2,4,6,8,10],
  'Minore Pentatonica':   [0,3,5,7,10],
  'Maggiore Pentatonica': [0,2,4,7,9],
  'Blues':                [0,3,5,6,7,10],
  'Minore Naturale (Aeolian)': [0,2,3,5,7,8,10],
  'Locrio':               [0,1,3,5,6,8,10],
  'Locrio #2':            [0,2,3,5,6,8,10],
  'Minore Armonica':      [0,2,3,5,7,8,11],
  'Lidio Dominante':      [0,2,4,6,7,9,10],
  'Misolidio b13':        [0,2,4,5,7,8,10],
  'Bebop Dominante':      [0,2,4,5,7,9,10,11],
  'Bebop Maggiore':       [0,2,4,5,7,8,9,11],
  'Bebop Dorica':         [0,2,3,4,5,7,9,10],
}

export const CAGED_SHAPES_MAJOR = {
  C: [{s:4,f:0},{s:3,f:-1},{s:2,f:-3},{s:1,f:-2},{s:0,f:-3}],
  A: [{s:4,f:0},{s:3,f:2},{s:2,f:2},{s:1,f:2},{s:0,f:0}],
  G: [{s:5,f:0},{s:4,f:-1},{s:3,f:-3},{s:2,f:-3},{s:1,f:-3},{s:0,f:0}],
  E: [{s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:0,f:0}],
  D: [{s:3,f:0},{s:2,f:2},{s:1,f:3},{s:0,f:2}],
}

export const CAGED_SHAPES_MINOR = {
  C: [{s:4,f:0},{s:3,f:-2},{s:2,f:-3},{s:1,f:-2},{s:0,f:-4}],
  A: [{s:4,f:0},{s:3,f:2},{s:2,f:2},{s:1,f:1},{s:0,f:0}],
  G: [{s:5,f:0},{s:4,f:-2},{s:3,f:-3},{s:2,f:-3},{s:1,f:-4},{s:0,f:0}],
  E: [{s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:0},{s:1,f:0},{s:0,f:0}],
  D: [{s:3,f:0},{s:2,f:2},{s:1,f:3},{s:0,f:1}],
}

export const CAGED_SHAPES = CAGED_SHAPES_MAJOR

export const INTERVAL_COLORS = {
  0:  { label:'Root',  color:'#e74c3c', short:'R'    },
  1:  { label:'b9',   color:'#2980b9', short:'b9'   },
  2:  { label:'9',    color:'#3498db', short:'9'    },
  3:  { label:'b3',   color:'#f1c40f', short:'b3'   },
  4:  { label:'3',    color:'#f39c12', short:'3'    },
  5:  { label:'11',   color:'#9b59b6', short:'11'   },
  6:  { label:'#11',  color:'#8e44ad', short:'#11'  },
  7:  { label:'5',    color:'#bdc3c7', short:'5'    },
  8:  { label:'#5',   color:'#95a5a6', short:'#5'   },
  9:  { label:'13',   color:'#1abc9c', short:'13'   },
  10: { label:'7',    color:'#2ecc71', short:'7'    },
  11: { label:'maj7', color:'#27ae60', short:'maj7' },
}

export function getNoteIdx(note) {
  let i = NOTES.indexOf(note)
  if (i !== -1) return i
  return NOTES_FLAT.indexOf(note)
}

// ── Spelling by letter name ────────────────────────────────────────────────
const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }

// Usual name of a chord root or key on a jazz chart (Db, Eb, F#, Ab, Bb).
export const ROOT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

// The note `semis` semitones above `root`, written `steps` letter names above it
// (Bb + 8 semitones, 5 letters → Gb). Null when it would need more than a double accidental.
export function spellAbove(root, semis, steps) {
  const li = LETTERS.indexOf(root[0])
  const rootPc = getNoteIdx(root) >= 0 ? getNoteIdx(root) : (LETTER_PC[root[0]] + (root.match(/#/g) || []).length - (root.match(/b/g) || []).length + 12) % 12
  if (li < 0) return null
  const letter = LETTERS[(li + steps) % 7]
  const want = (((rootPc + semis) % 12) + 12) % 12
  const diff = ((want - LETTER_PC[letter] + 18) % 12) - 6
  if (Math.abs(diff) > 2) return null
  return letter + (diff > 0 ? '#'.repeat(diff) : 'b'.repeat(-diff))
}

// How many letter names above the root each chord tone sits (#9 vs b3, #11 vs b5, bb7 vs 6…),
// given all the chord's intervals in semitones.
export function chordToneSteps(intervals) {
  const set = new Set(intervals.map(i => ((i % 12) + 12) % 12))
  return intervals.map(i => {
    switch (((i % 12) + 12) % 12) {
      case 0: return 0
      case 1: case 2: return 1
      case 3: return set.has(4) ? 1 : 2           // #9 when the chord also has a major 3rd
      case 4: return 2
      case 5: return 3
      case 6: return set.has(7) ? 3 : 4           // #11 next to a perfect 5th, otherwise b5
      case 7: return 4
      case 8: return set.has(7) || set.has(1) || (set.has(3) && set.has(4)) ? 5 : 4   // b13 next to a 5th or in altered chords, otherwise #5
      case 9: return set.has(6) && !set.has(10) && !set.has(11) ? 6 : 5   // bb7 in dim7, otherwise 6/13
      default: return 6
    }
  })
}

// Jazz degree label of each chord tone (R, b9, #9, 3, #11, b13, bb7…).
export function chordToneLabels(intervals) {
  const steps = chordToneSteps(intervals)
  const BY_STEP = {
    0: { 0: 'R' }, 1: { 1: 'b9', 2: '9', 3: '#9' }, 2: { 3: 'b3', 4: '3' }, 3: { 5: '11', 6: '#11' },
    4: { 6: 'b5', 7: '5', 8: '#5' }, 5: { 8: 'b13', 9: '13' }, 6: { 9: 'bb7', 10: 'b7', 11: '7' },
  }
  const noSeventh = !intervals.some(i => [10, 11].includes(((i % 12) + 12) % 12))
  return intervals.map((i, k) => {
    const pc = ((i % 12) + 12) % 12
    if (steps[k] === 5 && pc === 9 && noSeventh) return '6'
    return BY_STEP[steps[k]][pc] ?? INTERVAL_COLORS[pc].short
  })
}

// Letter steps of each degree for scales that do not have 7 notes (or that repeat a letter).
const SCALE_STEPS = {
  'Diminuita (T/S)':      [0, 1, 2, 3, 4, 4, 5, 6],     // 1 2 b3 4 b5 #5 6 7
  'Diminuita (S/T)':      [0, 1, 1, 2, 3, 4, 5, 6],     // 1 b9 #9 3 #11 5 13 b7
  'Esatonale':            [0, 1, 2, 3, 4, 6],           // 1 2 3 #4 #5 b7
  'Minore Pentatonica':   [0, 2, 3, 4, 6],
  'Maggiore Pentatonica': [0, 1, 2, 4, 5],
  'Blues':                [0, 2, 3, 4, 4, 6],           // 1 b3 4 b5 5 b7
  'Bebop Dominante':      [0, 1, 2, 3, 4, 5, 6, 6],     // … 6 b7 7
  'Bebop Maggiore':       [0, 1, 2, 3, 4, 4, 5, 6],     // … 5 #5 6 7
  'Bebop Dorica':         [0, 1, 2, 2, 3, 4, 5, 6],     // 1 2 b3 3 4 …
}

// Note names of a scale spelled from its root (C Altered → C Db Eb Fb Gb Ab Bb).
export function spellScale(root, scaleName) {
  const intervals = SCALES[scaleName]
  if (!intervals) return []
  const steps = SCALE_STEPS[scaleName] || intervals.map((_, k) => k)
  return intervals.map((i, k) => spellAbove(root, i, steps[k]))
}

// Note names of a chord spelled from its root (Bb7 → Bb D F Ab, Cdim7 → C Eb Gb Bbb).
export function spellChord(root, intervals) {
  const steps = chordToneSteps(intervals)
  const flat = !root.includes('#')
  return intervals.map((i, k) => spellAbove(root, i, steps[k]) ?? (flat ? NOTES_FLAT : NOTES)[(getNoteIdx(root) + i) % 12])
}

export function pitchToFrequency(midiNote) {
  return A4_FREQ * Math.pow(2, (midiNote - (A4_NOTE_IDX + 12 * 5)) / 12)
}

export function getPitchClass(tuning, stringIdx, fretIdx) {
  const t = Array.isArray(tuning) ? tuning : Array.from(tuning)
  const openStringPitchClass = Number(t[Number(stringIdx)])
  return (openStringPitchClass + Number(fretIdx)) % 12
}

export function getAbsoluteNote(tuning, stringIdx, fretIdx) {
  const t = Array.isArray(tuning) ? tuning : Array.from(tuning)
  const openStringPitchClass = Number(t[Number(stringIdx)])
  const openStringOctave = Number(BASE_OCTAVES[Number(stringIdx)])
  return (openStringPitchClass + (openStringOctave * 12)) + Number(fretIdx)
}
