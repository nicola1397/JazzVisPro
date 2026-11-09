import { ref } from 'vue'

// Guitar fingerings by chord name ("C", "F#m7", "Bbmaj7"…), loaded on first use from
// public/chords/voicings.json (built by scripts/build-chord-voicings.mjs).
const loaded = ref(false)
const loading = ref(false)
let loadPromise = null
let packed = {}
const cache = new Map()

// "x,3,2,0,1,0/0,3,2,0,1,0" → { positions: ['x','3',…], fingerings: [['0','3',…]] }
function unpack(s) {
  const [frets, fingers] = s.split('/')
  return { positions: frets.split(','), fingerings: [fingers.split(',')] }
}

export function getVoicings(name) {
  if (!cache.has(name)) cache.set(name, (packed[name] || []).map(unpack))
  return cache.get(name)
}

export function useChordLibrary() {
  function load() {
    if (loaded.value) return Promise.resolve()
    if (loadPromise) return loadPromise
    loading.value = true
    loadPromise = fetch(`${import.meta.env.BASE_URL}chords/voicings.json`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(data => { packed = data; loaded.value = true })
      .catch(err => { loadPromise = null; throw new Error(`Failed to load chord library: ${err.message}`) })
      .finally(() => { loading.value = false })
    return loadPromise
  }

  function getChordDiagrams(rootName, chordType) {
    if (!loaded.value) return []
    const typeMap = {
      'maj':'', 'min':'m', 'm':'m', 'maj7':'maj7', 'm7':'m7', '7':'7',
      'm7b5':'m7b5', 'dim7':'dim7', 'dim':'dim', 'aug':'aug',
      'mMaj7':'mmaj7', '7alt':'7b5', 'maj9':'maj9', '9':'9', 'm9':'m9',
      '13':'13', 'maj7#11':'maj#11', 'sus2':'sus2', 'sus4':'sus4',
      '6':'6', 'm6':'m6', 'add9':'add9',
    }
    const suffix = typeMap[chordType] !== undefined ? typeMap[chordType] : chordType
    return getVoicings(rootName + suffix)
  }

  return { loaded, loading, load, getChordDiagrams, getVoicings }
}
