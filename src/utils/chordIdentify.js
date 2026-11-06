// Names a chord from the notes actually played: every root is tried against a
// dictionary of chord types. A reading is kept when all the played notes belong
// to the type and the notes left out are ones guitarists leave out (the fifth, the
// ninth under an eleventh or thirteenth, the root in rootless ninth and thirteenth
// voicings). The bass note gives slash chords and inversions.

import { ROOT_NAMES, spellAbove } from './theory.js'

const mod12 = n => ((n % 12) + 12) % 12

// s: suffix · ints: semitones above the root · labels: degree of each · opt: may be left out
// w: how common the chord is · lib: suffix in the fingering library when different
export const CHORD_TYPES = [
  { s: '',        ints: [0, 4, 7],           labels: ['R', '3', '5'],                 opt: [7], w: 3 },
  { s: 'm',       ints: [0, 3, 7],           labels: ['R', 'b3', '5'],                opt: [7], w: 3 },
  { s: 'dim',     ints: [0, 3, 6],           labels: ['R', 'b3', 'b5'],               opt: [],  w: 1.5 },
  { s: 'aug',     ints: [0, 4, 8],           labels: ['R', '3', '#5'],                opt: [],  w: 1 },
  { s: 'sus2',    ints: [0, 2, 7],           labels: ['R', '2', '5'],                 opt: [],  w: 1 },
  { s: 'sus4',    ints: [0, 5, 7],           labels: ['R', '4', '5'],                 opt: [],  w: 1.5 },
  { s: '5',       ints: [0, 7],              labels: ['R', '5'],                      opt: [],  w: 1 },
  { s: '6',       ints: [0, 4, 7, 9],        labels: ['R', '3', '5', '6'],            opt: [7], w: 2 },
  { s: 'm6',      ints: [0, 3, 7, 9],        labels: ['R', 'b3', '5', '6'],           opt: [7], w: 2 },
  { s: '6/9',     ints: [0, 4, 7, 9, 2],     labels: ['R', '3', '5', '6', '9'],       opt: [7], w: 1.5, lib: '6add9' },
  { s: 'm6/9',    ints: [0, 3, 7, 9, 2],     labels: ['R', 'b3', '5', '6', '9'],      opt: [7], w: 1,   lib: 'm6add9' },
  { s: 'add9',    ints: [0, 4, 7, 2],        labels: ['R', '3', '5', '9'],            opt: [7], w: 1.5 },
  { s: 'm(add9)', ints: [0, 3, 7, 2],        labels: ['R', 'b3', '5', '9'],           opt: [7], w: 1 },
  { s: 'maj7',    ints: [0, 4, 7, 11],       labels: ['R', '3', '5', '7'],            opt: [7], w: 3 },
  { s: '7',       ints: [0, 4, 7, 10],       labels: ['R', '3', '5', 'b7'],           opt: [7], w: 3 },
  { s: 'm7',      ints: [0, 3, 7, 10],       labels: ['R', 'b3', '5', 'b7'],          opt: [7], w: 3 },
  { s: 'm7b5',    ints: [0, 3, 6, 10],       labels: ['R', 'b3', 'b5', 'b7'],         opt: [],  w: 2.5 },
  { s: 'dim7',    ints: [0, 3, 6, 9],        labels: ['R', 'b3', 'b5', 'bb7'],        opt: [],  w: 2 },
  { s: 'm(maj7)', ints: [0, 3, 7, 11],       labels: ['R', 'b3', '5', '7'],           opt: [7], w: 1.5, lib: 'mmaj7' },
  { s: '7sus4',   ints: [0, 5, 7, 10],       labels: ['R', '4', '5', 'b7'],           opt: [7], w: 2 },
  { s: 'maj7#5',  ints: [0, 4, 8, 11],       labels: ['R', '3', '#5', '7'],           opt: [],  w: 1,   lib: 'augmaj7' },
  { s: '7#5',     ints: [0, 4, 8, 10],       labels: ['R', '3', '#5', 'b7'],          opt: [],  w: 1.5, lib: 'aug7' },
  { s: '7b5',     ints: [0, 4, 6, 10],       labels: ['R', '3', 'b5', 'b7'],          opt: [],  w: 1.2 },
  { s: 'maj7#11', ints: [0, 4, 7, 11, 6],    labels: ['R', '3', '5', '7', '#11'],     opt: [7], w: 1.5, lib: 'maj#11' },
  { s: 'maj9',    ints: [0, 4, 7, 11, 2],    labels: ['R', '3', '5', '7', '9'],       opt: [7], w: 2,   rootless: true },
  { s: '9',       ints: [0, 4, 7, 10, 2],    labels: ['R', '3', '5', 'b7', '9'],      opt: [7], w: 2.5, rootless: true },
  { s: 'm9',      ints: [0, 3, 7, 10, 2],    labels: ['R', 'b3', '5', 'b7', '9'],     opt: [7], w: 2.5, rootless: true },
  { s: 'm(maj9)', ints: [0, 3, 7, 11, 2],    labels: ['R', 'b3', '5', '7', '9'],      opt: [7], w: 1,   lib: 'mmaj9' },
  { s: '9sus4',   ints: [0, 5, 7, 10, 2],    labels: ['R', '4', '5', 'b7', '9'],      opt: [7], w: 1.5 },
  { s: '7b9',     ints: [0, 4, 7, 10, 1],    labels: ['R', '3', '5', 'b7', 'b9'],     opt: [7], w: 2,   rootless: true },
  { s: '7#9',     ints: [0, 4, 7, 10, 3],    labels: ['R', '3', '5', 'b7', '#9'],     opt: [7], w: 2,   rootless: true },
  { s: '7#11',    ints: [0, 4, 7, 10, 6],    labels: ['R', '3', '5', 'b7', '#11'],    opt: [7], w: 1.5 },
  { s: '7b13',    ints: [0, 4, 7, 10, 8],    labels: ['R', '3', '5', 'b7', 'b13'],    opt: [],  w: 1.2 },
  { s: '9#11',    ints: [0, 4, 7, 10, 2, 6], labels: ['R', '3', '5', 'b7', '9', '#11'], opt: [7], w: 1 },
  { s: 'm11',     ints: [0, 3, 7, 10, 2, 5], labels: ['R', 'b3', '5', 'b7', '9', '11'], opt: [7, 2], w: 1.5, rootless: true },
  { s: '13',      ints: [0, 4, 7, 10, 2, 9], labels: ['R', '3', '5', 'b7', '9', '13'], opt: [7, 2], w: 2, rootless: true },
  { s: 'maj13',   ints: [0, 4, 7, 11, 2, 9], labels: ['R', '3', '5', '7', '9', '13'],  opt: [7, 2], w: 1 },
  { s: 'm13',     ints: [0, 3, 7, 10, 2, 9], labels: ['R', 'b3', '5', 'b7', '9', '13'], opt: [7, 2], w: 1 },
  { s: '13b9',    ints: [0, 4, 7, 10, 1, 9], labels: ['R', '3', '5', 'b7', 'b9', '13'], opt: [7], w: 1, rootless: true },
  { s: '7b9b13',  ints: [0, 4, 7, 10, 1, 8], labels: ['R', '3', '5', 'b7', 'b9', 'b13'], opt: [7], w: 1 },
  { s: '7#9b13',  ints: [0, 4, 7, 10, 3, 8], labels: ['R', '3', '5', 'b7', '#9', 'b13'], opt: [7], w: 1 },
]

// Letter steps above the root of a degree label (b13 → 5, #11 → 3, bb7 → 6).
function stepsOf(label) {
  if (label === 'R') return 0
  const n = parseInt(label.replace(/[b#]/g, ''), 10)
  return { 2: 1, 9: 1, 3: 2, 4: 3, 11: 3, 5: 4, 6: 5, 13: 5, 7: 6 }[n] ?? 0
}

// Both names of a black-key root; the one that spells the chord with fewer accidentals wins
// (C♯m7 = C♯ E G♯ B rather than D♭m7 = D♭ F♭ A♭ C♭), the usual name on a tie.
const ROOT_SPELLINGS = { 1: ['Db', 'C#'], 3: ['Eb', 'D#'], 6: ['F#', 'Gb'], 8: ['Ab', 'G#'], 10: ['Bb', 'A#'] }

function spellingCost(names) {
  return names.reduce((sum, n) => {
    if (!n) return sum + 10
    const acc = n.length - 1
    return sum + acc + (acc > 1 ? 3 : 0) + (/^(Fb|Cb|E#|B#)$/.test(n) ? 2 : 0)
  }, 0)
}

function rootNameFor(root, type) {
  const options = ROOT_SPELLINGS[root] || [ROOT_NAMES[root]]
  let best = options[0], bestCost = Infinity
  for (const name of options) {
    const cost = spellingCost(type.ints.map((x, i) => spellAbove(name, x, stepsOf(type.labels[i]))))
    if (cost < bestCost) { best = name; bestCost = cost }
  }
  return best
}

// pcs: pitch classes played (any order, duplicates allowed); bass: pitch class of the lowest note.
// Returns the readings, best first: { name, rootName, root, type, bassName, labels: Map(pc → degree),
// names: Map(pc → spelled note), missing: [degrees], rootless, score }.
export function identifyChord(pcs, bass, limit = 8) {
  const played = [...new Set(pcs.map(mod12))]
  if (played.length < 2) return []
  const out = []
  for (let root = 0; root < 12; root++) {
    const rel = played.map(pc => mod12(pc - root))
    for (const type of CHORD_TYPES) {
      if (!rel.every(x => type.ints.includes(x))) continue
      const missing = type.ints.filter(x => !rel.includes(x))
      const rootMissing = missing.includes(0)
      if (rootMissing && !(type.rootless && played.length >= 4)) continue
      if (!missing.every(x => x === 0 || type.opt.includes(x))) continue
      // Two notes a fourth/fifth apart are a power chord, not a major chord without its third.
      if (missing.some(x => x !== 0 && x !== 7) && played.length < 3) continue
      if (played.length === 2 && type.s !== '5' && !rel.some(x => x === 3 || x === 4)) continue

      const rootName = rootNameFor(root, type)
      const labels = new Map(), names = new Map()
      for (const pc of played) {
        const i = type.ints.indexOf(mod12(pc - root))
        labels.set(pc, type.labels[i])
        names.set(pc, spellAbove(rootName, type.ints[i], stepsOf(type.labels[i])) || ROOT_NAMES[pc])
      }
      const bassPc = mod12(bass)
      const bassName = bassPc === root ? null : names.get(bassPc)
      const extra = missing.filter(x => x !== 0).length
      // An inversion has a chord tone in the bass; a tension in the bass is a rarer reading.
      const tensionBass = bassName && !['3', 'b3', '5', 'b5', '#5', 'b7', '7', '6', 'bb7'].includes(labels.get(bassPc))
      const score = 100
        - 12 * (tensionBass ? 1 : 0)
        - 10 * extra
        - 28 * (rootMissing ? 1 : 0)
        + 16 * (bassPc === root ? 1 : 0)
        + 4 * type.w
        - 2 * (type.ints.length - 3)
      out.push({
        name: rootName + type.s + (bassName ? `/${bassName}` : ''),
        rootName, root, type: type.s, lib: type.lib ?? type.s,
        bassName, bassLabel: bassName ? labels.get(bassPc) : null,
        labels, names,
        missing: missing.filter(x => x !== 0).map(x => type.labels[type.ints.indexOf(x)]),
        rootless: rootMissing, score,
      })
    }
  }
  const seen = new Set()
  return out
    .sort((a, b) => b.score - a.score)
    .filter(r => !seen.has(r.name) && seen.add(r.name))
    .slice(0, limit)
}

// "x-3-2-0-1-0", "x32010", "8 10 10 9 8 8" → frets from the 6th string to the 1st (null = not played).
export function parseTab(text, maxFret = 24) {
  const raw = String(text).trim()
  if (!raw) return null
  let parts = raw.split(/[\s,\-|/]+/).filter(Boolean)
  if (parts.length === 1 && /^[xX0-9]{6}$/.test(parts[0])) parts = parts[0].split('')
  if (parts.length !== 6) return null
  const frets = parts.map(p => (/^[xX]$/.test(p) ? null : /^\d{1,2}$/.test(p) ? parseInt(p, 10) : NaN))
  if (frets.some(f => Number.isNaN(f) || (f !== null && f > maxFret))) return null
  return frets
}

export const formatTab = frets => frets.map(f => (f === null ? 'x' : String(f))).join('-')
