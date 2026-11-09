import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import it_ from '../../src/i18n/it.js'
import en from '../../src/i18n/en.js'

const root = new URL('../../', import.meta.url).pathname
const read = p => readFileSync(join(root, p), 'utf8')
function walk(dir) {
  return readdirSync(join(root, dir)).flatMap(f => {
    const p = join(dir, f)
    return statSync(join(root, p)).isDirectory() ? walk(p) : [p]
  })
}

describe('translations', () => {
  it('have the same keys in Italian and English', () => {
    const a = Object.keys(it_), b = Object.keys(en)
    expect(a.filter(k => !(k in en))).toEqual([])
    expect(b.filter(k => !(k in it_))).toEqual([])
  })
  it('have no empty texts', () => {
    for (const [k, v] of [...Object.entries(it_), ...Object.entries(en)]) expect(String(v).trim(), k).not.toBe('')
  })
  it('cover every key the code asks for with a fixed string', () => {
    const used = new Set()
    for (const f of walk('src').filter(f => /\.(vue|js)$/.test(f))) {
      for (const m of read(f).matchAll(/\bt\(\s*'([a-z0-9][\w.-]*)'\s*\)/g)) used.add(m[1])
      for (const m of read(f).matchAll(/\b(?:label|sub):\s*'((?:nav|sg|nsub)\.[\w.-]+)'/g)) used.add(m[1])
    }
    expect([...used].filter(k => !(k in it_))).toEqual([])
  })
})

describe('quiz questions', () => {
  const qit = JSON.parse(read('src/data/quiz/it.json'))
  const qen = JSON.parse(read('src/data/quiz/en.json'))
  it('are the same questions in both languages', () => {
    expect(qit.map(q => q.id)).toEqual(qen.map(q => q.id))
    expect(new Set(qit.map(q => q.id)).size).toBe(qit.length)
  })
  it('have four options and a valid answer', () => {
    qit.forEach((q, i) => {
      const e = qen[i]
      expect(q.it.options.length, `#${q.id}`).toBe(4)
      expect(e.en.options.length, `#${q.id}`).toBe(4)
      expect(q.correct_idx).toBe(e.correct_idx)
      expect(q.correct_idx >= 0 && q.correct_idx < 4, `#${q.id}`).toBe(true)
      expect(new Set(q.it.options).size, `#${q.id} duplicate options`).toBe(4)
    })
  })
})

describe('chord library', () => {
  const lib = JSON.parse(read('public/chords/voicings.json'))
  it('has every root with the chord types the app asks for', () => {
    const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    for (const r of roots) for (const s of ['', 'm', '7', 'maj7', 'm7', 'm7b5', 'dim7', '7#9', 'maj#11', 'mmaj7', '9', '13'])
      expect(lib[r + s]?.length, r + s).toBeGreaterThan(0)
  })
  it('packs six strings of frets and fingers per voicing', () => {
    for (const [name, list] of Object.entries(lib)) for (const v of list) {
      const [frets, fingers] = v.split('/').map(x => x.split(','))
      expect(frets.length, name).toBe(6)
      expect(fingers.length, name).toBe(6)
      expect(frets.every(f => f === 'x' || /^\d{1,2}$/.test(f)), `${name} ${v}`).toBe(true)
    }
  })
})
