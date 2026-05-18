import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { NOTES, NOTES_FLAT, SCALES, TUNINGS, INTERVAL_COLORS, CAGED_SHAPES_MAJOR, CAGED_SHAPES_MINOR, getNoteIdx } from '../utils/theory.js'

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
  const tunerMode        = ref('normal')
  const highlightedIntervals = ref(new Set())
  const manualNotes        = ref(new Set())
  const customScaleNotes   = ref(new Set())

  // ── Loading state ────────────────────────────────────────────────
  const isLoaded = ref(false)

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
    data.add9       = add9.value
    data.add11      = add11.value
    data.add13      = add13.value
    data.hideUnused = hideUnused.value
    data.soloArp    = soloArp.value
    data.tunerMode  = tunerMode.value
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
    if (data.add9 !== undefined)       add9.value       = data.add9
    if (data.add11 !== undefined)      add11.value      = data.add11
    if (data.add13 !== undefined)      add13.value      = data.add13
    if (data.hideUnused !== undefined) hideUnused.value = data.hideUnused
    if (data.soloArp !== undefined)    soloArp.value    = data.soloArp
    if (data.tunerMode) tunerMode.value = data.tunerMode
    if (data.customScale) customScaleNotes.value = new Set(data.customScale)
    isLoaded.value = true // Set to true after loading
    return data
  }

  // ── Computed ─────────────────────────────────────────────────────
  const currentTuning = computed(() => {
    const raw = TUNINGS[tuningName.value] || TUNINGS['E Standard']
    return [...raw]
  })
  const currentScale  = computed(() => {
    const raw = SCALES[scaleName.value] || SCALES['Ionio (Maj7)']
    return [...raw]
  })
  const rootIdx       = computed(() => getNoteIdx(root.value))
  const currentNotes  = computed(() => accidental.value === '#' ? NOTES : NOTES_FLAT)

  // ── Scale Properties ─────────────────────────────────────────────
  const scaleQuality = computed(() => {
    const s = currentScale.value
    if (!s || s.length === 0) return 'none'
    
    let hasMajor3 = false
    let hasMinor3 = false
    let hasPerfect5 = false
    
    for (let i = 0; i < s.length; i++) {
      const val = parseInt(s[i])
      if (val === 4) hasMajor3 = true
      if (val === 3) hasMinor3 = true
      if (val === 7) hasPerfect5 = true
    }

    if (!hasPerfect5) return 'none'
    if (hasMajor3) return 'major'
    if (hasMinor3) return 'minor'
    return 'none'
  })

  const isCagedCompatible = computed(() => scaleQuality.value !== 'none')

  // ── CAGED highlight set ──────────────────────────────────────────
  const cagedHighlightSet = computed(() => {
    const result = new Set()
    if (cagedShape.value === 'none' || !isCagedCompatible.value) return result
    
    const quality = scaleQuality.value
    const shapes = quality === 'minor' ? CAGED_SHAPES_MINOR : CAGED_SHAPES_MAJOR
    const shape = shapes[cagedShape.value]
    
    if (!shape) return result

    const tuning = currentTuning.value
    const rootVal = Number(rootIdx.value)
    
    // Find the root position for the selected anchor string
    const anchor = Number(shape[0].s)
    const openPitch = Number(tuning[anchor])

    // Search full 24-fret range to find all octaves of the shape
    for (let f = 0; f <= 24; f++) {
      if ((openPitch + f) % 12 === rootVal) {
        // Found the anchor root at fret f. Apply offsets.
        shape.forEach(off => {
          const stringIdx = Number(off.s)
          const fretIdx = f + Number(off.f)
          if (fretIdx >= 0 && fretIdx <= 24) {
            result.add(`${stringIdx}-${fretIdx}`)
          }
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
  function setTuningName(v)  { tuningName.value = v;  scheduleSave() }
  function setTunerMode(v)   { tunerMode.value = v;   scheduleSave() }
  function setNotation(v)    { notation.value = v;    scheduleSave() }
  function setAccidental(v)  { accidental.value = v;  scheduleSave() }
  function setCagedShape(v)  { cagedShape.value = v;   scheduleSave() }
  function setExplorerMode(v){
    explorerMode.value = v
    if (v === 'custom') {
      customScaleNotes.value = new Set()
      highlightedIntervals.value = new Set()
      manualNotes.value = new Set()
      cagedShape.value = 'none'
      notation.value = 'note'
    }
    scheduleSave()
  }
  function toggleLang()      { lang.value = lang.value === 'it' ? 'en' : 'it' }
  function toggleSidebar()   { sidebarOpen.value = !sidebarOpen.value }
  function closeSidebar()    { sidebarOpen.value = false }

  return {
    root, scaleName, tuningName, notation, accidental, cagedShape,
    hideUnused, soloArp, add9, add11, add13,
    explorerMode, tunerMode, highlightedIntervals, manualNotes, customScaleNotes,
    lang, sidebarOpen, isLoaded,
    currentTuning, currentScale, rootIdx, currentNotes, cagedHighlightSet,
    loadFromStorage, scheduleSave,
    toggleHighlightInterval, toggleManualNote, toggleCustomNote,
    clearCustomScale, resetFretboard,
    setRoot, setScaleName, setTuningName, setTunerMode, setNotation, setAccidental,
    setCagedShape, setExplorerMode, toggleLang, toggleSidebar, closeSidebar,
    scaleQuality, isCagedCompatible,
  }
})
