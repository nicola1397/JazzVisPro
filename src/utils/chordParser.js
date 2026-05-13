import { NOTES, NOTES_FLAT, SCALES, getNoteIdx } from './theory.js'

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
  for (const [suffix, intervals] of Object.entries(CHORD_INTERVALS)) {
    if (rest === suffix || rest.toLowerCase() === suffix.toLowerCase()) return intervals
  }
  if (!rest || rest === 'maj' || rest === 'M') return CHORD_INTERVALS['maj']
  if (rest.includes('sus4') || rest.includes('sus')) return CHORD_INTERVALS['sus4']
  if (rest.includes('sus2')) return CHORD_INTERVALS['sus2']
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

  // Genre-aware dominant scale selection
  if (rest === '7' || rest === '9' || rest === '13') {
    if (genre === 'blues') return 'Blues'
    if (nextChord) {
      const np = parseChord(nextChord)
      if (np) {
        const curIdx  = getNoteIdx(p.root)
        const nextIdx = getNoteIdx(np.root)
        if (curIdx !== -1 && nextIdx !== -1 && ((curIdx + 5) % 12) === nextIdx) {
          return 'Altered (7alt)'
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
  'Rhythm Changes (Bb)': '| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7b5 G7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 |',
  "Autumn Leaves (style)": '| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |',
}

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
  let best = null, bestScore = -1
  for (let root = 0; root < 12; root++) {
    for (const [mode, scale] of [['major', MAJOR_SCALE], ['minor', MINOR_SCALE]]) {
      let score = 0
      for (const c of chords) {
        const p = parseChord(c); if (!p) continue
        const ci = getNoteIdx(p.root); if (ci === -1) continue
        const deg = (ci - root + 12) % 12
        score += qualityMatch(chordQualityGroup(p.rest), scale[deg].q)
      }
      if (score > bestScore) { bestScore = score; best = { root, mode } }
    }
  }
  if (!best || bestScore < 1) return null
  const rootName = NOTES[best.root]
  return { root: rootName, mode: best.mode, score: bestScore,
    label: best.mode === 'major' ? `${rootName} maggiore` : `${rootName} minore` }
}
