import { parseChord, getChordIntervals } from './chordParser.js'
import { getNoteIdx } from './theory.js'

// Chord charts of the Real Book page, shared with the exercises over the changes.
// Bars are separated by "|", "%" repeats the previous bar, two chords in a bar
// split it in half.
export const STANDARDS = [
  {
    title: 'Autumn Leaves', composer: 'Joseph Kosma', key: 'Em', style: 'Standard', bpm: 140, playback: 'Swing',
    chords: '| Am7 | D7 | Gmaj7 | Cmaj7 | F#m7b5 | B7alt | Em7 | % | Am7 | D7 | Gmaj7 | Cmaj7 | F#m7b5 | B7alt | Em7 | % | F#m7b5 | B7alt | Em7 | % | Am7 | D7 | Gmaj7 | % | F#m7b5 | B7alt | Em7 Eb7 | Dm7 Db7 | Cmaj7 | B7alt | Em7 | % |'
  },
  {
    title: 'All The Things You Are', composer: 'Jerome Kern', key: 'Ab', style: 'Standard', bpm: 130, playback: 'Swing',
    chords: '| Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | G7 | Cmaj7 | % | Cm7 | Fm7 | Bb7 | Ebmaj7 | Abmaj7 | D7 | Gmaj7 | % | Am7 | D7 | Gmaj7 | % | F#m7 | B7 | Emaj7 | C7alt | Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | Dbm7 | Cm7 | Bdim7 | Bbm7 | Eb7 | Abmaj7 | % |'
  },
  {
    title: 'Stella By Starlight', composer: 'Victor Young', key: 'Bb', style: 'Standard', bpm: 120, playback: 'Swing',
    chords: '| Em7b5 | A7alt | Cm7 | F7 | Fm7 | Bb7 | Ebmaj7 | Ab7 | Bbmaj7 | % | Em7b5 | A7alt | Dm7 | % | Bbm7 | Eb7 | Fmaj7 | % | Em7b5 | A7alt | Dm7 | % | Bbm7 | Eb7 | Fmaj7 | % | Em7b5 | A7alt | Bbmaj7 | Ab7 | Bbmaj7 | G7alt | Cm7b5 | F7alt | Bbmaj7 | % |'
  },
  {
    title: 'Blue Bossa', composer: 'Kenny Dorham', key: 'Cm', style: 'Latin', bpm: 140, playback: 'Bossa',
    chords: '| Cm7 | % | Fm7 | % | Dm7b5 | G7alt | Cm7 | % | Ebm7 | Ab7 | Dbmaj7 | % | Dm7b5 | G7alt | Cm7 | Dm7b5 G7alt |'
  },
  {
    title: 'So What', composer: 'Miles Davis', key: 'Dm', style: 'Modal', bpm: 140, playback: 'Swing',
    chords: '| Dm7 | % | % | % | % | % | % | % | Dm7 | % | % | % | % | % | % | % | Ebm7 | % | % | % | % | % | % | % | Dm7 | % | % | % | % | % | % | % |'
  },
  {
    title: 'Wave', composer: 'Tom Jobim', key: 'D', style: 'Latin', bpm: 140, playback: 'Bossa',
    chords: '| Dmaj7 | Bbdim7 | Am7 | D7 | Gmaj7 | % | Gm7 | C7 | F#m7 | B7alt | E7 | Bb7 | A7 | % | Dmaj7 | % |'
  },
  {
    title: 'Take The A Train', composer: 'Billy Strayhorn', key: 'C', style: 'Standard', bpm: 160, playback: 'Swing',
    chords: '| Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | Dm7 G7 | Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | % | Fmaj7 | % | % | % | D7 | % | Dm7 | G7 | Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | Dm7 G7 |'
  },
  {
    title: 'Giant Steps', composer: 'John Coltrane', key: 'B', style: 'Bebop', bpm: 240, playback: 'Swing',
    chords: '| Bmaj7 D7 | Gmaj7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 Bb7 | Ebmaj7 F#7 | Bmaj7 | Fm7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 | C#m7 F#7 | Bmaj7 | Fm7 Bb7 | Ebmaj7 | C#m7 F#7 |'
  },
  {
    title: 'Summertime', composer: 'Gershwin', key: 'Am', style: 'Standard', bpm: 100, playback: 'Swing',
    chords: '| Am7 | E7alt | Am7 | % | Dm7 | % | Bm7b5 | E7alt | Am7 | E7alt | Am7 | D7 | Cmaj7 | Am7 | Bm7b5 E7alt | Am7 (E7alt) |'
  },
  {
    title: 'Maiden Voyage', composer: 'Herbie Hancock', key: 'D', style: 'Modal', bpm: 120, playback: 'Standard',
    chords: '| D7sus | % | % | % | F7sus | % | % | % | Eb7sus | % | % | % | Dbmaj7#11 | % | % | % |'
  },
  { title: 'ii-V-I in C', composer: 'Common', key: 'C', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Dm7 | G7 | Cmaj7 | % |' },
  { title: 'ii-V-I in F', composer: 'Common', key: 'F', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Gm7 | C7 | Fmaj7 | % |' },
  { title: 'ii-V-I in Bb', composer: 'Common', key: 'Bb', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Cm7 | F7 | Bbmaj7 | % |' },
  { title: 'Minor ii-V-i', composer: 'Common', key: 'Dm', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Em7b5 | A7alt | Dm7 | % |' },
  { title: 'Jazz Blues in F', composer: 'Common', key: 'F', style: 'Blues', bpm: 120, playback: 'Swing', chords: '| F7 | Bb7 | F7 | Cm7 F7 | Bb7 | Bdim7 | F7 | Am7b5 D7 | Gm7 | C7 | F7 D7 | Gm7 C7 |' },
  { title: 'Minor Blues in C', composer: 'Common', key: 'Cm', style: 'Blues', bpm: 120, playback: 'Swing', chords: '| Cm7 | Fm7 | Cm7 | % | Fm7 | % | Cm7 | % | Ab7 | G7alt | Cm7 | G7alt |' },
  { title: 'Rhythm Changes (Bb)', composer: 'Gershwin', key: 'Bb', style: 'Bebop', bpm: 180, playback: 'Swing', chords: '| Bbmaj7 Gm7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7 G7 | Cm7 F7 |' },
]

// ── Reading a chart ────────────────────────────────────────────────────────────

// '| Dm7 | G7 | Cmaj7 | % |' -> [['Dm7'], ['G7'], ['Cmaj7'], ['Cmaj7']]
export function parseChart(text) {
  const bars = []
  for (const measure of text.split('|').map(m => m.trim()).filter(Boolean)) {
    const chords = []
    for (const token of measure.split(/\s+/)) {
      const c = token.replace(/[()]/g, '')
      if (c === '%') { if (bars.length) chords.push(...bars[bars.length - 1]) }
      else if (parseChord(c) && getNoteIdx(parseChord(c).root) !== -1) chords.push(c)
    }
    if (chords.length) bars.push(chords)
  }
  return bars
}

// Beats of each chord in a 4/4 bar: one chord 4, two chords 2 + 2...
export function beatsOf(barLength) {
  const base = Math.floor(4 / barLength)
  return Array.from({ length: barLength }, (_, i) => base + (i < 4 - base * barLength ? 1 : 0))
}

// ── What each note means over a chord ──────────────────────────────────────────

const LABELS = { 0: 'R', 1: 'b9', 2: '9', 3: 'b3', 4: '3', 5: '11', 6: '#11', 7: '5', 8: 'b13', 9: '13', 10: '7', 11: 'maj7' }
// Tensions usually available on each chord family (the rest sounds "outside" or is an avoid note).
const TENSIONS = {
  maj:  [2, 6, 9],             // 9, #11, 13
  min:  [2, 5, 9],             // 9, 11, 13 (dorian)
  dom:  [1, 2, 3, 6, 8, 9],    // b9, 9, #9, #11, b13, 13
  alt:  [1, 3, 8],             // b9, #9, b13 (the b5 is in the chord)
  sus:  [2, 9],                // 9, 13
  half: [2, 5, 8],             // 9, 11, b13
  dim:  [2, 5, 8, 11],         // whole-half scale
  aug:  [2, 6, 10],            // whole-tone scale
}
const TENSION_LABELS = { 1: 'b9', 2: '9', 3: '#9', 5: '11', 6: '#11', 8: 'b13', 9: '13', 10: '7', 11: 'maj7' }

// { rootPc, group, tones: [{ iv, pc, label }], guide: [pc of 3rd (4th if sus), pc of 7th (5th if none)] }
export function chordInfo(symbol) {
  const clean = symbol.replace(/[()]/g, '')
  const p = parseChord(clean)
  if (!p) return null
  const rootPc = getNoteIdx(p.root)
  const rest = p.rest.trim()
  let ivs = getChordIntervals(clean)
  if (/7sus/.test(rest)) ivs = [0, 5, 7, 10]
  const has = n => ivs.includes(n)
  const dim7 = /dim7|°7/.test(rest)
  const sixth = /6/.test(rest) && !/13/.test(rest)
  const third = [4, 3, 5, 2].find(has)
  const fifth = [7, 6, 8].find(has)
  const seventh = [11, 10].find(has) ?? ((dim7 || sixth) && has(9) ? 9 : undefined)
  const group = /alt/.test(rest) ? 'alt'
    : dim7 || /dim/.test(rest) ? 'dim'
    : /m7b5|ø/.test(rest) ? 'half'
    : fifth === 8 && seventh === undefined ? 'aug'
    : third === 5 || third === 2 ? 'sus'
    : third === 3 ? 'min'
    : seventh === 10 ? 'dom'
    : 'maj'
  const label = iv => (iv === 9 && dim7 ? 'bb7' : iv === 9 && sixth ? '6' : iv === 6 && fifth === 6 ? 'b5' : iv === 8 && fifth === 8 ? '#5'
    : iv === 3 && third === 3 ? 'b3' : iv === 5 && third === 5 ? '4' : iv === 2 && third === 2 ? '2' : LABELS[iv])
  const tones = [0, third, fifth, seventh].filter(v => v !== undefined).map(iv => ({ iv, pc: (rootPc + iv) % 12, label: label(iv) }))
  const guideIvs = [third ?? 0, seventh ?? fifth ?? 0]
  return { symbol: clean, rootPc, group, tones, guide: guideIvs.map(iv => ({ iv, pc: (rootPc + iv) % 12, label: label(iv) })) }
}

// 'chord' (a chord tone), 'tension' (an available tension) or 'outside', with its label.
export function classifyNote(info, pc) {
  const iv = (((pc - info.rootPc) % 12) + 12) % 12
  const tone = info.tones.find(t => t.iv === iv)
  if (tone) return { kind: 'chord', label: tone.label }
  const tension = TENSIONS[info.group].includes(iv)
  return { kind: tension ? 'tension' : 'outside', label: tension ? TENSION_LABELS[iv] : LABELS[iv] }
}
