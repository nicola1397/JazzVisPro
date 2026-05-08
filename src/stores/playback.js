import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAudioStore } from './audio.js'
import { useAppStore } from './app.js'
import { NOTES, NOTES_FLAT, SCALES } from '../utils/theory.js'
import { parseChord, getChordIntervals, getChordScale, PRESET_PROGRESSIONS, detectKey } from '../utils/chordParser.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

const DIATONIC_Q = { 0:'maj7', 1:'m7', 2:'m7', 3:'maj7', 4:'7', 5:'m7', 6:'m7b5' }

function emptyStep(index) {
  return {
    id: Date.now() + index,
    root: 'C',
    scale: 'Ionio (Maj7)',
    bars: 1,
    beats: 4,
    denominator: 4,
    chordName: '',
    chordIntervals: '',
    chordOctave: 4,
    selected: false,
  }
}

export const usePlaybackStore = defineStore('playback', () => {
  const audio = useAudioStore()
  const appStore = useAppStore()

  // ── Progression state ─────────────────────────────────────────────
  const steps         = ref([])
  const activeIndex   = ref(-1)
  const lastSelectedIndex = ref(-1)

  // ── Playback state ────────────────────────────────────────────────
  const isPlaying       = ref(false)
  const isCountingDown  = ref(false)
  const countdownValue  = ref(0)
  const bpm             = ref(120)
  const metroVol        = ref(0.5)
  const metroSound      = ref('Beep')
  const chordSound      = ref('Electric Piano')
  const chordVol        = ref(0.1)
  const playChords      = ref(true)
  const loopSelection   = ref(false)
  const swingEnabled    = ref(false)
  const accompanimentStyle = ref('Standard') // 'Standard', 'Swing', 'Bossa'

  let nextNoteTime    = 0
  let beatsRemaining  = 0
  let beatInBar       = 0
  let timerId         = null
  let tapTimes        = []

  // ── Save/Load ─────────────────────────────────────────────────────
  let saveTimer = null
  function scheduleSave() {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(_persist, 300)
  }

  function _persist() {
    const data = readStorage('jazzVizData', {})
    data.bpm = bpm.value
    data.progression = steps.value.map(s => ({
      root: s.root, scale: s.scale, bars: s.bars, beats: s.beats,
      denominator: s.denominator, chordName: s.chordName,
      chordOctave: s.chordOctave, chordIntervals: s.chordIntervals,
    }))
    writeStorage('jazzVizData', data)
  }

  function loadFromData(data) {
    if (data.bpm) bpm.value = parseInt(data.bpm)
    if (data.progression?.length) {
      steps.value = data.progression.map((s, i) => ({ ...emptyStep(i), ...s }))
    }
  }

  // ── Progression management ────────────────────────────────────────
  function addStep(data = null) {
    const idx = steps.value.length
    const step = data ? { ...emptyStep(idx), ...data } : emptyStep(idx)
    step.id = Date.now() + idx
    steps.value.push(step)
    scheduleSave()
  }

  function removeStep(idx) {
    steps.value.splice(idx, 1)
    scheduleSave()
  }

  function updateStep(idx, field, value) {
    if (idx >= 0 && idx < steps.value.length) {
      steps.value[idx][field] = value
      scheduleSave()
    }
  }

  function clearProgression() {
    steps.value = []
    activeIndex.value = -1
    scheduleSave()
  }

  function selectStep(idx, shiftKey, ctrlKey) {
    if (shiftKey && lastSelectedIndex.value !== -1) {
      const start = Math.min(lastSelectedIndex.value, idx)
      const end   = Math.max(lastSelectedIndex.value, idx)
      if (!ctrlKey) steps.value.forEach(s => s.selected = false)
      for (let i = start; i <= end; i++) steps.value[i].selected = true
    } else if (ctrlKey) {
      steps.value[idx].selected = !steps.value[idx].selected
      lastSelectedIndex.value = idx
    } else {
      steps.value.forEach(s => s.selected = false)
      steps.value[idx].selected = true
      lastSelectedIndex.value = idx
    }
  }

  function reorderStep(fromIdx, toIdx) {
    const item = steps.value.splice(fromIdx, 1)[0]
    steps.value.splice(toIdx, 0, item)
    scheduleSave()
  }

  function transposeProgression(semitones) {
    const accidental = appStore.accidental
    const notes = accidental === '#' ? NOTES : NOTES_FLAT
    const getNoteIdx = n => {
      let i = NOTES.indexOf(n)
      return i === -1 ? NOTES_FLAT.indexOf(n) : i
    }
    const targets = steps.value.some(s => s.selected)
      ? steps.value.filter(s => s.selected)
      : steps.value

    targets.forEach(step => {
      const rIdx = getNoteIdx(step.root)
      if (rIdx !== -1) {
        let nrIdx = (rIdx + semitones) % 12
        if (nrIdx < 0) nrIdx += 12
        step.root = notes[nrIdx]
      }
      const match = step.chordName.trim().match(/^([A-G][#b]?)(.*)/)
      if (match) {
        const cIdx = getNoteIdx(match[1])
        if (cIdx !== -1) {
          let ncIdx = (cIdx + semitones) % 12
          if (ncIdx < 0) ncIdx += 12
          step.chordName = notes[ncIdx] + match[2]
        }
      }
    })
    scheduleSave()
  }

  function transposeOctave(delta) {
    const targets = steps.value.some(s => s.selected)
      ? steps.value.filter(s => s.selected)
      : steps.value
    targets.forEach(step => {
      step.chordOctave = Math.max(1, Math.min(7, (step.chordOctave || 4) + delta))
    })
    scheduleSave()
  }

  function autoAssignChords() {
    const { root, scaleName } = appStore
    const scale = SCALES[scaleName]
    if (!scale || scale.length < 4) return
    const rootIdx = NOTES.indexOf(root)
    steps.value.forEach((step, i) => {
      const degIdx = i % Math.min(7, scale.length)
      const chordRoot = (rootIdx + scale[degIdx]) % 12
      const chordRootName = NOTES[chordRoot]
      const quality = DIATONIC_Q[degIdx] || 'maj7'
      const chordName = chordRootName + quality
      step.root = chordRootName
      step.chordName = chordName
      step.chordIntervals = getChordIntervals(chordName).join(',')
    })
    scheduleSave()
  }

  // ── Playback engine ───────────────────────────────────────────────
  function toggle() { isPlaying.value ? stop() : play() }

  async function play() {
    await audio.init()
    isPlaying.value     = true
    activeIndex.value   = -1
    beatsRemaining      = 0
    beatInBar           = 0
    isCountingDown.value = true
    countdownValue.value = 4
    nextNoteTime        = Tone.now()
    _scheduler()
  }

  function stop() {
    isPlaying.value = false
    audio.stopAll()
    cancelAnimationFrame(timerId)
    countdownValue.value  = 0
    isCountingDown.value  = false
    steps.value.forEach(s => s.active = false)
  }

  function navigate(dir) {
    if (!steps.value.length) return
    let idx = activeIndex.value + dir
    if (idx >= steps.value.length) idx = 0
    if (idx < 0) idx = steps.value.length - 1
    steps.value.forEach(s => s.active = false)
    steps.value[idx].active = true
    activeIndex.value = idx
    appStore.setRoot(steps.value[idx].root)
    appStore.setScaleName(steps.value[idx].scale)
    if (isPlaying.value) { beatsRemaining = 0; beatInBar = 0 }
  }

  function tapTempo() {
    const now = Date.now()
    tapTimes.push(now)
    if (tapTimes.length > 4) tapTimes.shift()
    if (tapTimes.length > 1) {
      const avg = (tapTimes[tapTimes.length-1] - tapTimes[0]) / (tapTimes.length - 1)
      bpm.value = Math.round(60000 / avg)
    }
  }

  function _scheduler() {
    if (!isPlaying.value) return
    const now = Tone.now()
    while (nextNoteTime < now + 0.1) {
      _runBeat(nextNoteTime)
      const step = steps.value[activeIndex.value] || steps.value[0]
      const den = step ? (step.denominator || 4) : 4
      nextNoteTime += (60.0 / bpm.value) * (4 / den)
    }
    timerId = requestAnimationFrame(_scheduler)
  }

  function _runBeat(time) {
    if (isCountingDown.value) {
      countdownValue.value--
      audio.playClick(time, countdownValue.value === 3, metroVol.value, metroSound.value)
      if (countdownValue.value <= 0) {
        isCountingDown.value = false
        countdownValue.value = 0
      }
      return
    }

    if (beatsRemaining <= 0) {
      activeIndex.value++
      // Loop logic
      if (loopSelection.value) {
        const selected = steps.value.map((s, i) => s.selected ? i : -1).filter(i => i !== -1)
        if (selected.length) {
          const min = Math.min(...selected), max = Math.max(...selected)
          if (activeIndex.value > max) activeIndex.value = min
          else if (activeIndex.value < min) activeIndex.value = min
        } else if (activeIndex.value >= steps.value.length) {
          activeIndex.value = 0
        }
      } else if (activeIndex.value >= steps.value.length) {
        activeIndex.value = 0
      }

      const step = steps.value[activeIndex.value]
      if (!step) { stop(); return }

      beatInBar = 0
      steps.value.forEach(s => s.active = false)
      step.active = true
      appStore.setRoot(step.root)
      appStore.setScaleName(step.scale)
      beatsRemaining = (step.bars || 1) * (step.beats || 4)
      if (playChords.value) _triggerChord(step, time)
    }

    const currentStep = steps.value[activeIndex.value]
    const bpb = currentStep?.beats || 4
    const den = currentStep?.denominator || 4
    const beatDur = (60.0 / bpm.value) * (4 / den)

    // Algorithmic Accompaniment
    if (accompanimentStyle.value === 'Swing') {
      _playSwing(time, currentStep, beatInBar, beatDur)
    } else if (accompanimentStyle.value === 'Bossa') {
      _playBossa(time, currentStep, beatInBar, beatDur)
    } else {
      audio.playClick(time, beatInBar === 0, metroVol.value, metroSound.value)
    }

    if (swingEnabled.value && accompanimentStyle.value === 'Standard') {
      audio.playClick(time + beatDur * 0.67, false, metroVol.value * 0.45, metroSound.value)
    }

    beatsRemaining--
    beatInBar = (beatInBar + 1) % bpb
  }

  function _playSwing(time, step, beat, dur) {
    // Walking Bass
    const rootIdx = NOTES.indexOf(step.root)
    let bassNote = rootIdx
    if (beat === 3) {
      // Approach note to next chord
      const nextIdx = (activeIndex.value + 1) % steps.value.length
      const nextRoot = NOTES.indexOf(steps.value[nextIdx].root)
      bassNote = (nextRoot + (Math.random() > 0.5 ? 1 : -1) + 12) % 12
    } else if (beat === 1 || beat === 2) {
      // Scale degree
      const sc = SCALES[step.scale] || [0, 2, 4, 5, 7, 9, 11]
      bassNote = (rootIdx + sc[Math.floor(Math.random() * sc.length)]) % 12
    }
    audio.playBass(bassNote, time, dur * 0.9, 0.4)

    // Ride Cymbal (Spang-a-lang)
    audio.playDrum('ride', time, 0.25)
    if (beat % 2 === 1) { // On beats 2 and 4
      audio.playDrum('ride', time + dur * 0.67, 0.15)
    }
  }

  function _playBossa(time, step, beat, dur) {
    const rootIdx = NOTES.indexOf(step.root)
    // Root-Fifth bass
    const bassNote = (beat % 2 === 0) ? rootIdx : (rootIdx + 7) % 12
    audio.playBass(bassNote, time, dur * 0.8, 0.45)
    
    // Cross-stick pattern simulation
    if (beat === 0 || beat === 2 || (beat === 1 && Math.random() > 0.5)) {
       audio.playDrum('ride', time, 0.2)
    }
  }

  function _triggerChord(step, time) {
    let tones = []
    let chordRoot = step.root

    if (step.chordName) {
      const cp = parseChord(step.chordName)
      if (cp) {
        chordRoot = cp.root
        tones = getChordIntervals(step.chordName)
      }
    }
    if (!tones.length) {
      if (step.chordIntervals) {
        tones = step.chordIntervals.split(',').map(Number)
      } else {
        const s = SCALES[step.scale] || SCALES['Ionio (Maj7)']
        tones = s.filter(i => [0,3,4,7,10,11].includes(i))
      }
    }

    const dur = (step.bars || 1) * (step.beats || 4) * (60 / bpm.value) * (4 / (step.denominator || 4))
    const rootNoteIdx = NOTES.indexOf(chordRoot)
    audio.playChord(tones, rootNoteIdx >= 0 ? rootNoteIdx : 0, time, dur, chordVol.value, chordSound.value, step.chordOctave || 4)
  }

  // ── Import/Export ─────────────────────────────────────────────────
  function importFromText(text, genre = 'jazz') {
    if (!text) return null
    clearProgression()
    const allChords = []
    const measures = text.split('|').map(m => m.trim()).filter(Boolean)
    measures.forEach(m => {
      const chords = m.split(/\s+/).filter(Boolean)
      if (!chords.length) return
      const bars = 1.0 / chords.length
      chords.forEach((c, idx) => {
        if (c === '%' || c === '•/•') return
        const p = parseChord(c); if (!p) return
        const nextC = chords[idx + 1] || null
        allChords.push(c)
        addStep({
          root: p.root, scale: getChordScale(c, nextC, genre),
          bars, beats: 4, chordName: c,
          chordIntervals: getChordIntervals(c).join(','),
        })
      })
    })
    scheduleSave()
    return allChords.length ? detectKey(allChords) : null
  }

  // ── Voice leading ─────────────────────────────────────────────────
  const voiceLeadingData = computed(() => {
    if (steps.value.length < 2) return []
    return steps.value.map(step => {
      const ri = NOTES.indexOf(step.root)
      const ints = getChordIntervals(step.chordName || step.root)
      const third   = ints.find(i => i === 3 || i === 4)
      const seventh = ints.find(i => i === 9 || i === 10 || i === 11)
      const absNote = semi => ri !== -1 && semi != null ? (ri + semi) % 12 : null
      const noteName = semi => semi != null && ri !== -1 ? NOTES[(ri + semi) % 12] : '–'
      return {
        chord: step.chordName || step.root,
        thirdAbs: absNote(third), seventhAbs: absNote(seventh),
        thirdNote: noteName(third), seventhNote: noteName(seventh),
      }
    })
  })

  return {
    steps, activeIndex, isPlaying, isCountingDown, countdownValue,
    bpm, metroVol, metroSound, chordSound, chordVol,
    playChords, loopSelection, swingEnabled, accompanimentStyle,
    voiceLeadingData,
    scheduleSave, loadFromData,
    addStep, removeStep, updateStep, clearProgression,
    selectStep, reorderStep,
    transposeProgression, transposeOctave, autoAssignChords,
    toggle, play, stop, navigate, tapTempo,
    importFromText,
    PRESET_PROGRESSIONS,
  }
})
