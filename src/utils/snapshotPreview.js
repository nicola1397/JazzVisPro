// The notes a snapshot shows on the neck, for the small preview in the Snapshots page:
// the same rules as the Explorer's fretboard (scale or arpeggio, highlighted intervals,
// notes picked in Highlight mode, or the custom selection in Custom mode).
// Positions use the app's "string-fret" keys, string 0 being the high E.
import { TUNINGS, SCALES, INTERVAL_COLORS, getNoteIdx, getPitchClass } from './theory.js'

const ARP = [0, 3, 4, 7, 10, 11]

export function snapshotDots(st, lastFret = 15) {
  const tuning = TUNINGS[st.tuningName] || TUNINGS['E Standard']
  const root = Math.max(0, getNoteIdx(st.root))
  const scale = SCALES[st.scaleName] || SCALES['Ionio (Maj7)']
  const custom = new Set(st.customScale || [])
  const manual = new Set(st.manualNotes || [])
  const legend = new Set((st.highlightedIntervals || []).map(Number))
  const dots = new Map()
  for (let s = 0; s < 6; s++) for (let f = 0; f <= lastFret; f++) {
    const key = `${s}-${f}`
    const iv = (getPitchClass(tuning, s, f) - root + 12) % 12
    let on
    if (st.explorerMode === 'custom') on = custom.has(key)
    else {
      const inScale = scale.includes(iv)
      const inArp = inScale && (ARP.includes(iv) || (st.add9 && iv === 2) || (st.add11 && iv === 5) || (st.add13 && iv === 9))
      on = (st.soloArp ? inArp : inScale) || legend.has(iv) || manual.has(key)
    }
    if (on) dots.set(key, INTERVAL_COLORS[iv]?.color || '#aaa')
  }
  return dots
}
