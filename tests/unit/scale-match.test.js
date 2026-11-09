import { describe, it, expect } from 'vitest'
import { matchScales } from '../../src/utils/scaleMatch.js'

describe('recognising scales from notes', () => {
  it('names the seven notes of C major with its modes, the key first', () => {
    const r = matchScales([0, 2, 4, 5, 7, 9, 11], 0)
    expect(r[0]).toMatchObject({ rootName: 'C', scale: 'Ionio (Maj7)', exact: true })
    expect(r.map(x => x.rootName + ' ' + x.scale)).toContain('A Minore Naturale (Aeolian)')
    expect(r.every(x => x.exact)).toBe(true)
  })
  it('prefers the key in use on ties', () => {
    expect(matchScales([0, 2, 4, 5, 7, 9, 11], 9)[0]).toMatchObject({ rootName: 'A', exact: true })
  })
  it('allows up to two notes not picked', () => {
    const r = matchScales([0, 4, 7], 0)
    expect(r[0]).toMatchObject({ rootName: 'C', scale: 'Maggiore Pentatonica', exact: false })
    expect(r[0].extra.sort()).toEqual([2, 9])
  })
  it('needs at least three notes', () => {
    expect(matchScales([0, 7], 0)).toEqual([])
  })
})
