// Every module, step, diagram and generated exercise round of the guided path is valid:
// texts in both languages, dots on the neck and inside their window, one right answer per
// question, sounds in a playable range, targets that can actually be reached.
import { describe, it, expect } from 'vitest'
import { COURSE } from '../../src/course/index.js'
import { KEY_NAMES, midiAt } from '../../src/course/theory.js'

const ROUNDS_PER_EXERCISE = 60

function validateCourse() {
  const problems = []
  const bad = (where, msg) => problems.push(`${where}: ${msg}`)
  const textOk = t => t && (typeof t === 'string' || (t.it && t.en))
  const checkDots = (where, dots, from, to) => {
    for (const x of dots || []) {
      if (!(x.s >= 0 && x.s <= 5)) bad(where, 'bad string ' + JSON.stringify(x))
      if (!(x.f >= 0 && x.f <= 22)) bad(where, 'bad fret ' + JSON.stringify(x))
      if (from !== undefined && (x.f < from || x.f > to) && !x.ghost) bad(where, `dot out of window ${x.s}-${x.f} [${from},${to}]`)
      for (const k of ['note', 'label', 'deg']) if (x[k] !== undefined && /null|undefined|NaN/.test(String(x[k]))) bad(where, `bad ${k} ` + JSON.stringify(x))
    }
  }
  const checkDiagram = (where, dg) => {
    if (!Array.isArray(dg.dots)) return bad(where, 'no dots')
    checkDots(where, dg.dots, dg.from ?? 0, dg.to ?? 12)
    const keys = dg.dots.map(d => `${d.s}-${d.f}`)
    if (new Set(keys).size !== keys.length) bad(where, 'duplicate dots')
  }
  const checkOptions = (where, r) => {
    const oks = r.options.filter(o => o.ok).length
    if (oks !== 1) bad(where, `${oks} right options`)
    const labels = r.options.map(o => (typeof o.label === 'string' ? o.label : o.label.it))
    if (new Set(labels).size !== labels.length) bad(where, 'duplicate options ' + labels)
    if (labels.some(l => /undefined|null|NaN/.test(l))) bad(where, 'bad option label ' + labels)
  }
  let rounds = 0
  for (const m of COURSE) {
    if (!textOk(m.title) || !textOk(m.desc)) bad(m.id, 'module text')
    const ids = new Set()
    for (const st of m.steps) {
      if (ids.has(st.id)) bad(m.id, 'duplicate step ' + st.id)
      ids.add(st.id)
      if (!textOk(st.title)) bad(`${m.id}/${st.id}`, 'title')
      st.blocks.forEach((b, bi) => {
        const w = `${m.id}/${st.id}#${bi}:${b.type}`
        if (['p', 'tip'].includes(b.type) && (!textOk({ it: b.it, en: b.en }) || /undefined|NaN|\[object/.test(b.it + b.en))) bad(w, 'text')
        if (b.type === 'list' && b.it.length !== b.en.length) bad(w, 'list lengths differ')
        if (b.type === 'table' && (b.rows.it.length !== b.rows.en.length || /undefined|NaN/.test(JSON.stringify(b.rows)))) bad(w, 'table')
        if (b.type === 'diagram') {
          if (b.build) for (const k of b.keys || KEY_NAMES) checkDiagram(`${w}:${k}`, { ...b, ...b.build(k) })
          else checkDiagram(w, b)
        }
        if (b.type === 'frames') {
          const sets = b.build ? (b.keys || KEY_NAMES).map(k => [k, b.build(k)]) : [['-', b.frames]]
          for (const [k, frames] of sets) {
            if (!frames.length) bad(`${w}:${k}`, 'no frames')
            frames.forEach((fr, i) => checkDiagram(`${w}:${k}:f${i}`, fr.diagram))
          }
        }
        if (!['find', 'quiz', 'speed'].includes(b.type)) return
        let prev
        for (let i = 0; i < ROUNDS_PER_EXERCISE; i++) {
          rounds++
          let r
          try { r = b.make(i, prev) } catch (e) { bad(w, 'throws ' + e.message); break }
          prev = r
          if (!r) { bad(w, 'no round'); continue }
          if (!textOk(r.prompt)) bad(w, 'prompt')
          if (/undefined|NaN/.test(JSON.stringify(r.prompt) + JSON.stringify(r.review || '') + JSON.stringify(r.hint || ''))) bad(w, 'bad prompt text')
          if (r.sound) {
            const all = [...(r.sound.notes || []), ...(r.sound.chord || [])]
            if (all.some(x => !Number.isFinite(x) || x < 28 || x > 96)) bad(w, 'sound out of range')
          }
          if (b.type === 'find') {
            if (r.sequence) {
              if (!r.sequence.length) bad(w, 'empty sequence')
              for (const q of r.sequence) {
                let ok = false
                for (let s = 0; s < 6; s++) for (let f = r.from ?? 0; f <= (r.to ?? 12); f++) {
                  if (q.strings && !q.strings.includes(s)) continue
                  if (q.midi !== undefined ? midiAt(s, f) === q.midi : midiAt(s, f) % 12 === ((q.pc % 12) + 12) % 12) ok = true
                }
                if (!ok) bad(w, 'sequence note not reachable')
              }
              checkDots(w + ' reveal', r.reveal, r.from ?? 0, r.to ?? 12)
            } else {
              const targets = r.groups ? r.groups.flat() : r.targets
              if (!targets?.length) { bad(w, 'no targets'); continue }
              checkDots(w, targets, r.from ?? 0, r.to ?? 12)
              const given = new Set((r.dots || []).map(d => `${d.s}-${d.f}`))
              if (targets.some(t => given.has(`${t.s}-${t.f}`))) bad(w, 'target overlaps a given dot')
            }
            checkDots(w, r.dots, r.from ?? 0, r.to ?? 12)
          }
          if (b.type === 'quiz') { checkOptions(w, r); if (r.diagram) checkDiagram(w, r.diagram) }
          if (b.type === 'speed') {
            if (r.options) { checkOptions(w, r); if (r.diagram) checkDiagram(w, r.diagram) }
            else if (r.click) {
              if (!r.click.targets?.length) bad(w, 'no click targets')
              checkDots(w, r.click.targets, r.click.from ?? 0, r.click.to ?? 12)
            } else bad(w, 'speed round without options or click')
          }
        }
      })
    }
  }
  return { problems, rounds }
}

describe('guided path', () => {
  it('has modules with unique ids and steps', () => {
    expect(COURSE.length).toBeGreaterThanOrEqual(9)
    expect(new Set(COURSE.map(m => m.id)).size).toBe(COURSE.length)
    for (const m of COURSE) expect(m.steps.length, m.id).toBeGreaterThan(0)
  })
  it('generates only valid content and exercise rounds', () => {
    const { problems, rounds } = validateCourse()
    expect(rounds).toBeGreaterThan(1000)
    expect(problems.slice(0, 20)).toEqual([])
  })
})
