// Sounds for the ear exercises of the guided path: a I-IV-V-I cadence that sets
// the key, then single notes, melodies or chords.

import { useAudioStore } from '../stores/audio.js'

const CHORD_GAP = 0.6     // seconds between the chords of the cadence
const NOTE_GAP = 0.55     // seconds between the notes of a melody

// Close voicings of the cadence, in semitones above the tonic (C3 … B3), with the bass below.
const CADENCE = [
  { bass: -12, upper: [4, 7, 12] },   // I
  { bass: -7,  upper: [5, 9, 12] },   // IV
  { bass: -5,  upper: [2, 7, 11] },   // V
  { bass: -12, upper: [4, 7, 12] },   // I
]

// Tonic of the cadence for a key (pitch class 0-11): C3 … B3.
export const cadenceTonic = keyPc => 48 + (((keyPc % 12) + 12) % 12)

// spec: { cadence: keyPc?, notes: [midi]?, chord: [midi]? }
// Plays it and resolves with the milliseconds until the last sound starts.
export async function playSound(spec) {
  const audio = useAudioStore()
  await audio.init()
  if (typeof Tone === 'undefined' || !spec) return 0
  audio.stopAll()
  let t = Tone.now() + 0.08
  const start = t
  if (spec.cadence !== undefined && spec.cadence !== null) {
    const tonic = cadenceTonic(spec.cadence)
    for (const c of CADENCE) {
      audio.playNotesAt([tonic + c.bass, ...c.upper.map(x => tonic + x)], t, CHORD_GAP * 0.9, 0.45)
      t += CHORD_GAP
    }
    t += 0.35
  }
  let last = t
  if (spec.chord?.length) {
    audio.playNotesAt(spec.chord, t, 1.4, 0.55)
    last = t
    t += 1.2
  }
  for (const m of spec.notes || []) {
    audio.playNotesAt([m], t, NOTE_GAP * 0.95, 0.6)
    last = t
    t += NOTE_GAP
  }
  return Math.max(0, Math.round((last - start) * 1000) + 80)
}

export function audioReady() {
  return useAudioStore().isInitialized
}
