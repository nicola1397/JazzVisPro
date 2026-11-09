// Builds public/chords/voicings.json from the full chord collection in scripts/data.
// The app only asks for chords on a root (C, C#, Db…), never for slash chords, so those are
// left out, and each fingering is packed as "frets/fingers": "x,3,2,0,1,0/0,3,2,0,1,0".
// 19 MB of JavaScript become about 0.5 MB of JSON (under 100 KB gzipped).
// Usage: node scripts/build-chord-voicings.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import vm from 'node:vm'

const src = readFileSync(new URL('./data/chords.complete.js', import.meta.url), 'utf8')
const ctx = {}
vm.createContext(ctx)
vm.runInContext(src.replace('var CHORD_COLLECTION', 'CHORD_COLLECTION'), ctx)

const out = {}
for (const [key, voicings] of Object.entries(ctx.CHORD_COLLECTION)) {
  if (key.includes('/')) continue
  out[key] = voicings.map(v => `${v.positions.join(',')}/${v.fingerings[0].join(',')}`)
}
writeFileSync(new URL('../public/chords/voicings.json', import.meta.url), JSON.stringify(out))
console.log(Object.keys(out).length, 'chords written')
