import { describe, it, expect } from 'vitest'
import {
  NOTES, getNoteIdx, getPitchClass, getAbsoluteNote, TUNINGS, spellAbove, spellChord, spellScale,
  chordToneLabels, SCALES, INTERVAL_COLORS,
} from '../../src/utils/theory.js'
import { cagedGrip, CAGED_ORDER, KEY_NAMES, pcAt, keyPc, mod12 } from '../../src/course/theory.js'

describe('note names', () => {
  it('reads sharps and flats', () => {
    expect(getNoteIdx('C')).toBe(0)
    expect(getNoteIdx('C#')).toBe(1)
    expect(getNoteIdx('Db')).toBe(1)
    expect(getNoteIdx('Bb')).toBe(10)
    expect(getNoteIdx('H')).toBe(-1)
  })
  it('finds the note at a string and fret in standard tuning', () => {
    const t = TUNINGS['E Standard']
    // string 0 is the high E: open E, 5th fret A, 12th fret E again
    expect(NOTES[getPitchClass(t, 0, 0)]).toBe('E')
    expect(NOTES[getPitchClass(t, 0, 5)]).toBe('A')
    expect(getPitchClass(t, 0, 12)).toBe(getPitchClass(t, 0, 0))
    expect(getAbsoluteNote(t, 5, 12) - getAbsoluteNote(t, 5, 0)).toBe(12)
  })
})

describe('spelling by letter name', () => {
  it('spells intervals from the root letter', () => {
    expect(spellAbove('C', 3, 2)).toBe('Eb')
    expect(spellAbove('Bb', 8, 5)).toBe('Gb')
    expect(spellAbove('F#', 4, 2)).toBe('A#')
  })
  it('spells chords the way charts do', () => {
    expect(spellChord('Bb', [0, 4, 7, 10])).toEqual(['Bb', 'D', 'F', 'Ab'])
    expect(spellChord('C', [0, 3, 6, 9])).toEqual(['C', 'Eb', 'Gb', 'Bbb'])
  })
  it('labels chord tones with jazz degrees', () => {
    expect(chordToneLabels([0, 4, 7, 10, 3])).toEqual(['R', '3', '5', 'b7', '#9'])
    expect(chordToneLabels([0, 4, 7, 9])).toEqual(['R', '3', '5', '6'])
  })
  it('spells every scale in every key with one letter per degree where it can', () => {
    for (const root of KEY_NAMES) for (const name of Object.keys(SCALES)) {
      const notes = spellScale(root, name)
      expect(notes.length, `${root} ${name}`).toBe(SCALES[name].length)
      notes.forEach((n, k) => {
        if (n === null) return
        expect(mod12(getNoteIdxLoose(n) - getNoteIdxLoose(root)), `${root} ${name} #${k}`).toBe(mod12(SCALES[name][k]))
      })
    }
  })
  it('has a colour and a label for each interval', () => {
    for (let i = 0; i < 12; i++) expect(INTERVAL_COLORS[i]?.short).toBeTruthy()
  })
})

describe('CAGED grips', () => {
  it('only contains chord tones, in every key and quality', () => {
    for (const key of KEY_NAMES) for (const shape of CAGED_ORDER) for (const quality of ['major', 'minor']) {
      const third = quality === 'major' ? 4 : 3
      const { dots } = cagedGrip(key, shape, quality)
      expect(dots.length, `${key} ${shape} ${quality}`).toBeGreaterThanOrEqual(3)
      for (const d of dots) expect([0, third, 7], `${key} ${shape} ${quality} ${d.s}-${d.f}`).toContain(mod12(pcAt(d.s, d.f) - keyPc(key)))
    }
  })
})

// Pitch class of any spelling, double accidentals included (Bbb, F##)
function getNoteIdxLoose(name) {
  const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[name[0]]
  return mod12(base + (name.match(/#/g) || []).length - (name.match(/b/g) || []).length)
}
