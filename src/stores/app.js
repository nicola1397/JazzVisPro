import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { NOTES, NOTES_FLAT, SCALES, TUNINGS, INTERVAL_COLORS, CAGED_SHAPES } from '../utils/theory.js'

export const useAppStore = defineStore('app', () => {
  // ── Fretboard state ──────────────────────────────────────────────
  const root        = ref('C')
  const scaleName   = ref('Ionio (Maj7)')
  const tuningName  = ref('E Standard')
  const notation    = ref('interval')
  const accidental  = ref('#')
  const cagedShape  = ref('none')
  const hideUnused  = ref(false)
  const soloArp     = ref(false)
  const add9        = ref(false)
  const add11       = ref(false)
  const add13       = ref(false)
  const explorerMode      = ref('normal')
  const highlightedIntervals = ref(new Set())
  const manualNotes        = ref(new Set())
  const customScaleNotes   = ref(new Set())

  // ── UI state ─────────────────────────────────────────────────────
  const lang          = ref('it')
  const sidebarOpen   = ref(false)

  // ── Save/Load ────────────────────────────────────────────────────
  let saveTimer = null
  function scheduleSave() {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => _persist(), 300)
  }

  function _persist() {
    const data = readStorage('jazzVizData', {})
    data.root       = root.value
    data.scaleName  = scaleName.value
    data.tuningName = tuningName.value
    data.notation   = notation.value
    data.accidental = accidental.value
    data.customScale = Array.from(customScaleNotes.value)
    writeStorage('jazzVizData', data)
  }

  function loadFromStorage() {
    const data = readStorage('jazzVizData', {})
    if (data.root)       root.value       = data.root
    if (data.scaleName)  scaleName.value  = data.scaleName
    if (data.tuningName) tuningName.value = data.tuningName
    if (data.notation)   notation.value   = data.notation
    if (data.accidental) accidental.value = data.accidental
    if (data.customScale) customScaleNotes.value = new Set(data.customScale)
    return data
  }

  // ── Computed ─────────────────────────────────────────────────────
  const currentTuning = computed(() => TUNINGS[tuningName.value] || TUNINGS['E Standard'])
  const currentScale  = computed(() => SCALES[scaleName.value] || SCALES['Ionio (Maj7)'])
  const rootIdx       = computed(() => NOTES.indexOf(root.value))
  const currentNotes  = computed(() => accidental.value === '#' ? NOTES : NOTES_FLAT)

  // ── CAGED highlight set ──────────────────────────────────────────
  const cagedHighlightSet = computed(() => {
    const result = new Set()
    if (cagedShape.value === 'none') return result
    const shape = CAGED_SHAPES[cagedShape.value]
    if (!shape) return result
    const tuning = currentTuning.value
    const anchor = shape[0].s
    for (let f = 0; f <= 24; f++) {
      if ((tuning[anchor] + f) % 12 === rootIdx.value) {
        shape.forEach(off => {
          const fret = f + off.f
          if (fret >= 0 && fret <= 24) result.add(`${off.s}-${fret}`)
        })
      }
    }
    return result
  })

  // ── Actions ──────────────────────────────────────────────────────
  function toggleHighlightInterval(idx) {
    const s = new Set(highlightedIntervals.value)
    s.has(idx) ? s.delete(idx) : s.add(idx)
    highlightedIntervals.value = s
  }

  function toggleManualNote(key) {
    const s = new Set(manualNotes.value)
    s.has(key) ? s.delete(key) : s.add(key)
    manualNotes.value = s
  }

  function toggleCustomNote(key) {
    const s = new Set(customScaleNotes.value)
    s.has(key) ? s.delete(key) : s.add(key)
    customScaleNotes.value = s
    scheduleSave()
  }

  function clearCustomScale() {
    customScaleNotes.value = new Set()
    scheduleSave()
  }

  function resetFretboard() {
    highlightedIntervals.value = new Set()
    manualNotes.value = new Set()
    customScaleNotes.value = new Set()
  }

  function setRoot(v)        { root.value = v;        scheduleSave() }
  function setScaleName(v)   { scaleName.value = v;   scheduleSave() }
  function setTuningName(v)  { tuningName.value = v }
  function setNotation(v)    { notation.value = v }
  function setAccidental(v)  { accidental.value = v }
  function setCagedShape(v)  { cagedShape.value = v }
  function setExplorerMode(v){ explorerMode.value = v }
  function toggleLang()      { lang.value = lang.value === 'it' ? 'en' : 'it' }
  function toggleSidebar()   { sidebarOpen.value = !sidebarOpen.value }
  function closeSidebar()    { sidebarOpen.value = false }

  return {
    root, scaleName, tuningName, notation, accidental, cagedShape,
    hideUnused, soloArp, add9, add11, add13,
    explorerMode, highlightedIntervals, manualNotes, customScaleNotes,
    lang, sidebarOpen,
    currentTuning, currentScale, rootIdx, currentNotes, cagedHighlightSet,
    loadFromStorage, scheduleSave,
    toggleHighlightInterval, toggleManualNote, toggleCustomNote,
    clearCustomScale, resetFretboard,
    setRoot, setScaleName, setTuningName, setNotation, setAccidental,
    setCagedShape, setExplorerMode, toggleLang, toggleSidebar, closeSidebar,
  }
})
