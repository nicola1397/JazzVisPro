import { NOTES, NOTES_FLAT, ROOT_NAMES, SCALES, getNoteIdx } from './theory.js'

export const CHORD_INTERVALS = {
  'maj7':    [0,4,7,11],
  'maj9':    [0,4,7,11,2],
  'maj7#11': [0,4,7,11,6],
  'maj':     [0,4,7],
  'M':       [0,4,7],
  'm7b5':    [0,3,6,10],
  'ø':       [0,3,6,10],
  'mMaj7':   [0,3,7,11],
  'm9':      [0,3,7,10,2],
  'm7':      [0,3,7,10],
  'm6':      [0,3,7,9],
  'm':       [0,3,7],
  'min':     [0,3,7],
  'dim7':    [0,3,6,9],
  'dim':     [0,3,6],
  'aug':     [0,4,8],
  'sus2':    [0,2,7],
  'sus4':    [0,5,7],
  '7sus4':   [0,5,7,10],
  '7sus':    [0,5,7,10],
  '9sus4':   [0,5,7,10,14],
  '7alt':    [0,4,6,10],
  '13':      [0,4,9,10],
  '9':       [0,4,7,10,2],
  '7':       [0,4,7,10],
  '6':       [0,4,7,9],
  'add9':    [0,4,7,2],
}

const CHORD_TO_SCALE = {
  'maj7':'Ionio (Maj7)', 'maj9':'Ionio (Maj7)', 'maj7#11':'Lidio (Maj7#11)',
  'maj':'Ionio (Maj7)', 'M':'Ionio (Maj7)',
  'm7':'Dorico (m7)', 'm9':'Dorico (m7)', 'm':'Minore Naturale (Aeolian)',
  'm7b5':'Locrio', 'ø':'Locrio', 'dim7':'Diminuita (T/S)', 'dim':'Diminuita (T/S)',
  '7alt':'Altered (7alt)', '7':'Misolidio (7)', '9':'Misolidio (7)', '13':'Misolidio (7)',
  'mMaj7':'Minore Melodica', 'aug':'Esatonale',
}

export function parseChord(chordStr) {
  const match = chordStr.trim().match(/^([A-G][#b]?)(.*)/)
  if (!match) return null
  return { root: match[1], rest: match[2] }
}

export function getChordIntervals(chordStr) {
  const p = parseChord(chordStr)
  if (!p) return []
  const rest = p.rest.trim()
  // Exact match first: "m" (minor) must not be taken for "M" (major).
  for (const [suffix, intervals] of Object.entries(CHORD_INTERVALS)) {
    if (rest === suffix) return intervals
  }
  for (const [suffix, intervals] of Object.entries(CHORD_INTERVALS)) {
    if (rest.toLowerCase() === suffix.toLowerCase()) return intervals
  }
  if (!rest || rest === 'maj' || rest === 'M') return CHORD_INTERVALS['maj']
  if (rest.includes('sus') && /7|9|13/.test(rest)) return CHORD_INTERVALS['7sus4']
  if (rest.includes('sus2')) return CHORD_INTERVALS['sus2']
  if (rest.includes('sus')) return CHORD_INTERVALS['sus4']
  if (rest.includes('maj7')) return CHORD_INTERVALS['maj7']
  if (rest.includes('m7b5') || rest.includes('ø')) return CHORD_INTERVALS['m7b5']
  if (rest.includes('mMaj7') || rest.includes('mM7')) return CHORD_INTERVALS['mMaj7']
  if (rest.includes('m7')) return CHORD_INTERVALS['m7']
  if (rest.includes('dim7')) return CHORD_INTERVALS['dim7']
  if (rest.includes('dim')) return CHORD_INTERVALS['dim']
  if (rest.includes('aug')) return CHORD_INTERVALS['aug']
  if (rest.includes('alt')) return CHORD_INTERVALS['7alt']
  if (rest.match(/^m(?!aj)/i)) return CHORD_INTERVALS['m7']
  if (rest.includes('7')) return CHORD_INTERVALS['7']
  return CHORD_INTERVALS['maj']
}

export function getChordScale(chordStr, nextChord = null, genre = 'jazz') {
  const p = parseChord(chordStr)
  if (!p) return 'Ionio (Maj7)'
  const rest = p.rest.trim()

  if (rest.includes('sus4') || rest.includes('sus')) return 'Misolidio (7)'

  // Dominants with their alterations written in the symbol
  if (/7|9|13/.test(rest) && !/maj|m(?!aj)|dim|ø/.test(rest.replace(/b9|#9|b13|#11|b5|#5|alt/g, ''))) {
    if (rest.includes('alt')) return 'Altered (7alt)'
    if (rest.includes('b9')) return 'Diminuita (S/T)'
    if (rest.includes('#11')) return 'Lidio Dominante'
    if (rest.includes('b13') || rest.includes('#5')) return 'Misolidio b13'
  }

  // Genre-aware dominant scale selection
  if (rest === '7' || rest === '9' || rest === '13') {
    if (genre === 'blues') return 'Blues'
    if (nextChord) {
      const np = parseChord(nextChord)
      if (np) {
        const curIdx  = getNoteIdx(p.root)
        const nextIdx = getNoteIdx(np.root)
        // V7 resolving down a fifth: to a minor chord the b9 and b13 of the
        // altered scale fit the minor key; to a major chord mixolydian does.
        if (curIdx !== -1 && nextIdx !== -1 && ((curIdx + 5) % 12) === nextIdx) {
          const nextRest = np.rest.trim()
          const toMinor = /^m(?!aj)/.test(nextRest) || /dim|ø|m7b5/.test(nextRest)
          return toMinor ? 'Altered (7alt)' : 'Misolidio (7)'
        }
      }
    }
    return 'Misolidio (7)'
  }

  for (const [suffix, scale] of Object.entries(CHORD_TO_SCALE)) {
    if (rest === suffix) return scale
  }
  if (rest.includes('alt')) return 'Altered (7alt)'
  if (rest.match(/^m(?!aj)/i)) return 'Dorico (m7)'
  if (rest.includes('7')) return 'Misolidio (7)'
  return 'Ionio (Maj7)'
}

export const PRESET_PROGRESSIONS = {
  'ii-V-I (C)': '| Dm7 | G7 | Cmaj7 | Cmaj7 |',
  'ii-V-i (Am)': '| Bm7b5 | E7alt | Am7 | Am7 |',
  '12-Bar Blues (Bb)': '| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |',
  'Turnaround (C)': '| Cmaj7 | Am7 | Dm7 | G7 |',
  'Rhythm Changes (Bb)': '| Bbmaj7 G7 | Cm7 F7 | Bbmaj7 G7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7 G7 | Cm7 F7 |',
  "Autumn Leaves (style)": '| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |',
}

// Minor keys are usually written with sharps for C#, F#, G# (fewer accidentals than Db, Gb, Ab minor)
const MINOR_KEY_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

export function detectKey(chords) {
  if (!chords || chords.length === 0) return null
  const MAJOR_SCALE = [
    {q:'maj7'}, {q:'—'}, {q:'m7'}, {q:'—'}, {q:'m7'}, {q:'maj7'},
    {q:'—'}, {q:'7'}, {q:'—'}, {q:'m7'}, {q:'—'}, {q:'m7b5'}
  ]
  const MINOR_SCALE = [
    {q:'m7'}, {q:'—'}, {q:'m7b5'}, {q:'maj7'}, {q:'—'}, {q:'m7'},
    {q:'—'}, {q:'7'}, {q:'maj7'}, {q:'—'}, {q:'7'}, {q:'—'}
  ]
  function chordQualityGroup(rest) {
    if (!rest) return 'maj'
    if (rest.includes('m7b5') || rest.includes('ø')) return 'm7b5'
    if (rest.includes('mMaj')) return 'mMaj7'
    if (rest.includes('dim')) return 'dim7'
    if (rest.includes('maj7') || rest.includes('Maj7')) return 'maj7'
    if (rest.match(/m(?!aj)/i) || rest.includes('min')) {
      return rest.includes('7') ? 'm7' : 'm'
    }
    if (rest.includes('7')) return '7'
    return 'maj'
  }
  function qualityMatch(actual, expected) {
    if (expected === '—') return 0
    if (actual === expected) return 2
    if (expected === '7' && (actual === 'maj' || actual === 'maj7')) return 0.5
    if (expected === 'maj7' && actual === 'maj') return 1
    if (expected === 'm7' && actual === 'm') return 1
    return 0
  }
  // A major key and its relative minor share the same chords, so they often tie
  // (Cm7 F7 Bbmaj7 is ii V I in Bb and iv VII7 III in G minor). The tonic chord
  // settles it: the last chord weighs most, then the first, then any other.
  const TONIC_QUALITIES = { major: ['maj7', 'maj'], minor: ['m7', 'm', 'mMaj7'] }
  const parsed = chords.map(c => {
    const p = parseChord(c); if (!p) return null
    const ci = getNoteIdx(p.root); if (ci === -1) return null
    return { ci, group: chordQualityGroup(p.rest) }
  })
  function tonicBonus(root, mode) {
    const isTonic = x => x && x.ci === root && TONIC_QUALITIES[mode].includes(x.group)
    if (isTonic(parsed[parsed.length - 1])) return 0.75
    if (isTonic(parsed[0])) return 0.5
    if (parsed.some(isTonic)) return 0.25
    return 0
  }
  let best = null, bestScore = -1
  for (let root = 0; root < 12; root++) {
    for (const [mode, scale] of [['major', MAJOR_SCALE], ['minor', MINOR_SCALE]]) {
      let score = 0
      for (const x of parsed) {
        if (!x) continue
        const deg = (x.ci - root + 12) % 12
        score += qualityMatch(x.group, scale[deg].q)
      }
      score += tonicBonus(root, mode)
      if (score > bestScore) { bestScore = score; best = { root, mode } }
    }
  }
  if (!best || bestScore < 1) return null
  const rootName = best.mode === 'major' ? ROOT_NAMES[best.root] : MINOR_KEY_NAMES[best.root]
  return { root: rootName, mode: best.mode, score: bestScore,
    label: best.mode === 'major' ? `${rootName} maggiore` : `${rootName} minore` }
}
