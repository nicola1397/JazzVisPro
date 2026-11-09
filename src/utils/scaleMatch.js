// Which known scales contain a set of notes (Explorer custom mode: "recognised as…").
import { SCALES, ROOT_NAMES } from './theory.js'

const mod12 = n => ((n % 12) + 12) % 12
const ORDER = Object.keys(SCALES)                  // earlier in the list = more common

// pcs: selected pitch classes; preferRoot: the key in use, preferred on ties.
// Returns up to `limit` readings, best first: { root, rootName, scale, extra: [pc], exact }.
// A reading keeps every selected note; `extra` are the scale notes not selected.
export function matchScales(pcs, preferRoot = 0, limit = 6) {
  const sel = [...new Set(pcs.map(mod12))]
  if (sel.length < 3) return []
  const out = []
  for (const [scale, ints] of Object.entries(SCALES)) {
    for (let root = 0; root < 12; root++) {
      const notes = new Set(ints.map(i => mod12(root + i)))
      if (!sel.every(pc => notes.has(pc))) continue
      const extra = [...notes].filter(pc => !sel.includes(pc))
      if (extra.length > 2) continue
      out.push({
        root, rootName: ROOT_NAMES[root], scale, extra, exact: extra.length === 0,
        score: -10 * extra.length + (root === mod12(preferRoot) ? 4 : 0) + (sel.includes(root) ? 2 : 0) - ORDER.indexOf(scale) * 0.05,
      })
    }
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit)
}
