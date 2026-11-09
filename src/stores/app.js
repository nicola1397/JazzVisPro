import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { NOTES, NOTES_FLAT, SCALES, TUNINGS, INTERVAL_COLORS, CAGED_SHAPES_MAJOR, CAGED_SHAPES_MINOR, getNoteIdx, getPitchClass } from '../utils/theory.js'
import { STRINGS, FRETS } from '../utils/constants.js'

export function savedLang() {
  try { return localStorage.getItem('jv-lang') === 'en' ? 'en' : 'it' } catch { return 'it' }
}

function readSavedScales() {
  try {
    const list = JSON.parse(localStorage.getItem('jv-custom-scales') || '[]')
    return Array.isArray(list) ? list.filter(x => x && x.id && Array.isArray(x.notes)) : []
  } catch { return [] }
}

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
  // Custom mode: the frets the whole-note picker, all / none and invert act on
  const customZone         = ref({ from: 0, to: FRETS })
  // Custom scales saved with a name (Explorer, custom mode)
  const savedCustomScales  = ref(readSavedScales())

  // ── Loading state ────────────────────────────────────────────────
  const isLoaded = ref(false)

  // ── UI state ─────────────────────────────────────────────────────
  // Remembered between visits (it used to go back to Italian on every reload)
  const lang          = ref(savedLang())
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
    data.explorerMode = explorerMode.value
    data.cagedShape   = cagedShape.value
    data.manualNotes  = Array.from(manualNotes.value)
    data.highlightedIntervals = Array.from(highlightedIntervals.value)
    data.customZone   = customZone.value
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
    if (['normal', 'highlight', 'custom'].includes(data.explorerMode)) explorerMode.value = data.explorerMode
    if (typeof data.cagedShape === 'string') cagedShape.value = data.cagedShape
    if (Array.isArray(data.manualNotes)) manualNotes.value = new Set(data.manualNotes)
    if (Array.isArray(data.highlightedIntervals)) highlightedIntervals.value = new Set(data.highlightedIntervals.map(Number))
    if (data.customZone && Number.isInteger(data.customZone.from) && Number.isInteger(data.customZone.to)) setCustomZone(data.customZone.from, data.customZone.to, false)
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
    scheduleSave()
  }

  function toggleManualNote(key) {
    const s = new Set(manualNotes.value)
    s.has(key) ? s.delete(key) : s.add(key)
    manualNotes.value = s
    scheduleSave()
  }

  function toggleCustomNote(key) {
    const s = new Set(customScaleNotes.value)
    s.has(key) ? s.delete(key) : s.add(key)
    customScaleNotes.value = s
    scheduleSave()
  }

  // ── Custom mode: whole-note selection ────────────────────────────
  // Every position ("string-fret") inside the zone, optionally of one pitch class only.
  function zoneKeys(pc = null) {
    const out = []
    const { from, to } = customZone.value
    for (let s = 0; s < STRINGS; s++)
      for (let f = from; f <= to; f++)
        if (pc === null || getPitchClass(currentTuning.value, s, f) === pc) out.push(`${s}-${f}`)
    return out
  }
  const positionsOf = pc => zoneKeys(pc)
  const inZone = key => { const f = Number(key.split('-')[1]); return f >= customZone.value.from && f <= customZone.value.to }

  // Clears the zone (the whole neck when the zone is the whole neck)
  function clearCustomScale() {
    customScaleNotes.value = new Set([...customScaleNotes.value].filter(k => !inZone(k)))
    scheduleSave()
  }
  function invertCustom() {
    const s = new Set(customScaleNotes.value)
    for (const k of zoneKeys()) s.has(k) ? s.delete(k) : s.add(k)
    customScaleNotes.value = s
    scheduleSave()
  }
  function setCustomZone(from, to, save = true) {
    let a = Math.max(0, Math.min(FRETS, Math.round(from))), b = Math.max(0, Math.min(FRETS, Math.round(to)))
    if (a > b) [a, b] = [b, a]
    customZone.value = { from: a, to: b }
    if (save) scheduleSave()
  }

  // Pitch classes taken anywhere on the neck
  const customPitchClasses = computed(() => {
    const pcs = new Set()
    for (const k of customScaleNotes.value) { const [s, f] = k.split('-').map(Number); pcs.add(getPitchClass(currentTuning.value, s, f)) }
    return [...pcs]
  })

  // ── Saved custom scales ──────────────────────────────────────────
  function persistSavedScales() {
    try { localStorage.setItem('jv-custom-scales', JSON.stringify(savedCustomScales.value)) } catch {}
  }
  function saveCustomScale(name) {
    const item = { id: Date.now().toString(36), name: name.trim(), notes: [...customScaleNotes.value], tuning: tuningName.value, date: new Date().toISOString() }
    savedCustomScales.value = [item, ...savedCustomScales.value]
    persistSavedScales()
    return item
  }
  function loadCustomScale(id) {
    const item = savedCustomScales.value.find(x => x.id === id)
    if (!item) return
    customScaleNotes.value = new Set(item.notes)
    explorerMode.value = 'custom'
    scheduleSave()
  }
  // Returns what was removed, so it can be put back (undo)
  function deleteCustomScale(id) {
    const i = savedCustomScales.value.findIndex(x => x.id === id)
    if (i < 0) return null
    const removed = { item: savedCustomScales.value[i], index: i }
    savedCustomScales.value = savedCustomScales.value.filter(x => x.id !== id)
    persistSavedScales()
    return removed
  }
  function restoreCustomScale({ item, index }) {
    const list = [...savedCustomScales.value]
    list.splice(Math.min(index, list.length), 0, item)
    savedCustomScales.value = list
    persistSavedScales()
  }
  // Per pitch class (0 = C): 'all', 'some' or 'none' of its positions selected.
  const customPitchState = computed(() => Array.from({ length: 12 }, (_, pc) => {
    const all = positionsOf(pc)
    const on = all.filter(k => customScaleNotes.value.has(k)).length
    return on === 0 ? 'none' : on === all.length ? 'all' : 'some'
  }))
  // Takes the note in every position; if it was already everywhere, removes it everywhere.
  function toggleCustomPitch(pc) {
    const all = positionsOf(pc)
    const s = new Set(customScaleNotes.value)
    const full = all.every(k => s.has(k))
    for (const k of all) full ? s.delete(k) : s.add(k)
    customScaleNotes.value = s
    scheduleSave()
  }
  function selectAllCustom() {
    customScaleNotes.value = new Set([...customScaleNotes.value, ...zoneKeys()])
    scheduleSave()
  }

  function resetFretboard() {
    highlightedIntervals.value = new Set()
    manualNotes.value = new Set()
    customScaleNotes.value = new Set()
    scheduleSave()
  }

  function setRoot(v)        { root.value = v;        scheduleSave() }
  function setScaleName(v)   { scaleName.value = v;   scheduleSave() }
  function setTuningName(v)  { tuningName.value = v;  scheduleSave() }
  function setTunerMode(v)   { tunerMode.value = v;   scheduleSave() }
  function setNotation(v)    { notation.value = v;    scheduleSave() }
  function setAccidental(v)  { accidental.value = v;  scheduleSave() }
  function setCagedShape(v)  { cagedShape.value = v;   scheduleSave() }
  // Each mode keeps its own selection: switching mode no longer wipes the custom scale
  // (it used to, so a saved custom scale could never be seen again).
  function setExplorerMode(v){
    explorerMode.value = v
    scheduleSave()
  }
  function toggleLang() {
    lang.value = lang.value === 'it' ? 'en' : 'it'
    try { localStorage.setItem('jv-lang', lang.value) } catch {}
  }
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
    customPitchState, toggleCustomPitch, selectAllCustom, invertCustom,
    customZone, setCustomZone, customPitchClasses,
    savedCustomScales, saveCustomScale, loadCustomScale, deleteCustomScale, restoreCustomScale,
    setRoot, setScaleName, setTuningName, setTunerMode, setNotation, setAccidental,
    setCagedShape, setExplorerMode, toggleLang, toggleSidebar, closeSidebar,
    scaleQuality, isCagedCompatible,
  }
})
