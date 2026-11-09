import { describe, it, expect } from 'vitest'
import it_ from '../../src/i18n/it.js'
import { buildSearchIndex, search, normalize } from '../../src/utils/searchIndex.js'

const t = k => it_[k] ?? k
const index = buildSearchIndex(t, 'it')

describe('quick search', () => {
  it('indexes every menu page, course step, lesson and theory chapter', () => {
    const kinds = new Set(index.map(x => x.kind))
    expect([...kinds].sort()).toEqual(['course', 'lesson', 'page', 'step', 'theory'])
    expect(index.filter(x => x.kind === 'step').length).toBeGreaterThan(60)
    expect(index.every(x => x.title && x.to)).toBe(true)
  })
  it('ignores accents and case', () => {
    expect(normalize('Tonalità')).toBe('tonalita')
    expect(search(index, 'TONALITA')[0].title).toMatch(/tonalità/i)
  })
  it('puts pages whose name starts with the query first', () => {
    expect(search(index, 'metro')[0]).toMatchObject({ kind: 'page', to: '/groove-trainer' })
    expect(search(index, 'accordatore')[0].to).toBe('/tuner')
  })
  it('needs every word', () => {
    const r = search(index, 'circolo quinte')
    expect(r.length).toBe(1)
    expect(r[0].to).toBe('/teoria-generale?open=3')
  })
})
