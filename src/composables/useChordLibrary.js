import { ref } from 'vue'

const loaded = ref(false)
const loading = ref(false)
let loadPromise = null

export function useChordLibrary() {
  function load() {
    if (loaded.value) return Promise.resolve()
    if (loadPromise) return loadPromise
    loading.value = true
    loadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = '/chords.complete.js'
      script.onload = () => { loaded.value = true; loading.value = false; resolve() }
      script.onerror = () => { loading.value = false; reject(new Error('Failed to load chord library')) }
      document.head.appendChild(script)
    })
    return loadPromise
  }

  function getChordDiagrams(rootName, chordType) {
    if (!loaded.value || typeof window.CHORD_COLLECTION === 'undefined') return []
    const typeMap = {
      'maj':'', 'min':'m', 'm':'m', 'maj7':'maj7', 'm7':'m7', '7':'7',
      'm7b5':'m7b5', 'dim7':'dim7', 'dim':'dim', 'aug':'aug',
      'mMaj7':'mmaj7', '7alt':'7b5', 'maj9':'maj9', '9':'9', 'm9':'m9',
      '13':'13', 'maj7#11':'maj#11', 'sus2':'sus2', 'sus4':'sus4',
      '6':'6', 'm6':'m6', 'add9':'add9',
    }
    const suffix = typeMap[chordType] !== undefined ? typeMap[chordType] : chordType
    return window.CHORD_COLLECTION[rootName + suffix] || []
  }

  return { loaded, loading, load, getChordDiagrams }
}
