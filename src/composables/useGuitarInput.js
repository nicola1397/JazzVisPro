import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import PitchWorker from '../workers/pitch.worker.js?worker'
import { readStorage, writeStorage } from './useLocalStorage.js'
import { getAbsoluteNote } from '../utils/theory.js'

// Lets the fretboard exercises be answered by playing a connected guitar
// (audio interface or microphone) instead of clicking the fretboard.
// Each detected note is reported once, when it becomes stable; a note already
// heard is reported again only after a new pick attack or a moment of silence.

const STORAGE_KEY    = 'jazzVizGuitarInput'
const MIN_FREQ       = 65     // a bit below D2 (73 Hz), the lowest open string of the drop/D tunings
const MAX_FREQ       = 1400   // a bit above E6 (1319 Hz), fret 24 of the high E string
const GATE_ON        = 0.01   // RMS needed to start listening to a note
const GATE_OFF       = 0.005  // RMS below which a ringing note is fading out
const STABLE_FRAMES  = 3      // consecutive frames on the same pitch before reporting it
const SILENCE_FRAMES = 5      // quiet frames after which the current note is over
const ONSET_RATIO    = 2      // energy jump that counts as a new pick attack
const ONSET_HISTORY  = 3
const ATTACK_LEAD_MS = 30     // a note starts a little before the first frame that shows its pitch

export function useGuitarInput({ onNote } = {}) {
  const prefs = readStorage(STORAGE_KEY, {}) || {}

  const enabled   = ref(false)
  const listening = ref(false)
  const suspended = ref(false)   // audio context waiting for a user gesture
  const error     = ref('')      // '', 'unsupported', 'denied', 'no-device', 'generic'
  const devices   = ref([])
  const deviceId  = ref(prefs.deviceId || '')
  const autoNext  = ref(prefs.autoNext !== false)
  const level     = ref(0)
  const liveMidi  = ref(null)

  let stream = null, ctx = null, analyser = null, worker = null
  let rafId = null, busy = false, session = 0, disposed = false

  // Note tracking state
  let sounding = false, silentFrames = 0
  let candidate = null, candidateCount = 0, candidateSince = 0
  let heardPcs = new Set()           // pitch classes already heard since the last attack/silence
  let recentRms = []
  let holds = []                     // [{ pc, until }]: notes the app itself is playing

  watch([enabled, deviceId, autoNext], () => {
    writeStorage(STORAGE_KEY, { enabled: enabled.value, deviceId: deviceId.value, autoNext: autoNext.value })
  })

  function resetTracking() {
    sounding = false; silentFrames = 0
    candidate = null; candidateCount = 0
    heardPcs = new Set(); recentRms = []
    level.value = 0; liveMidi.value = null
  }

  async function start() {
    const mySession = ++session
    teardown()
    error.value = ''
    if (!navigator.mediaDevices?.getUserMedia) {
      error.value = 'unsupported'
      enabled.value = false
      return
    }
    try {
      // Raw signal: browser voice processing would eat sustained notes.
      const audio = { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
      let s
      try {
        s = await navigator.mediaDevices.getUserMedia({
          audio: deviceId.value ? { ...audio, deviceId: { exact: deviceId.value } } : audio,
        })
      } catch (e) {
        // The saved interface is not plugged in: fall back to the default input.
        if (!deviceId.value || !['OverconstrainedError', 'NotFoundError'].includes(e.name)) throw e
        deviceId.value = ''
        s = await navigator.mediaDevices.getUserMedia({ audio })
      }
      if (mySession !== session || disposed) {
        s.getTracks().forEach(t => t.stop())
        return
      }
      stream   = s
      ctx      = new (window.AudioContext || window.webkitAudioContext)()
      analyser = ctx.createAnalyser()
      // ~85 ms of audio whatever the sample rate (pro interfaces may run at 96/192 kHz)
      analyser.fftSize = ctx.sampleRate > 96000 ? 16384 : ctx.sampleRate > 48000 ? 8192 : 4096
      ctx.createMediaStreamSource(stream).connect(analyser)
      worker = new PitchWorker()
      worker.onmessage = ({ data }) => onFrame(data)
      busy = false
      resetTracking()

      // Without a prior user gesture the browser keeps the context suspended
      // (and resume() stays pending): listen anyway and resume on the next click/key.
      ctx.onstatechange = updateSuspended
      updateSuspended()
      if (suspended.value) {
        ctx.resume().catch(() => {})
        window.addEventListener('pointerdown', resumeContext)
        window.addEventListener('keydown', resumeContext)
      }

      navigator.mediaDevices.addEventListener?.('devicechange', refreshDevices)
      listening.value = true
      refreshDevices()
      loop()
    } catch (e) {
      if (mySession !== session) return
      teardown()
      error.value = e?.name === 'NotAllowedError' || e?.name === 'SecurityError' ? 'denied'
                  : e?.name === 'NotFoundError' ? 'no-device'
                  : 'generic'
      enabled.value = false
    }
  }

  function teardown() {
    listening.value = false
    suspended.value = false
    if (rafId) cancelAnimationFrame(rafId)
    rafId = null
    if (stream) stream.getTracks().forEach(t => t.stop())
    if (ctx) { ctx.onstatechange = null; ctx.close().catch(() => {}) }
    if (worker) worker.terminate()
    stream = null; ctx = null; analyser = null; worker = null; busy = false
    window.removeEventListener('pointerdown', resumeContext)
    window.removeEventListener('keydown', resumeContext)
    navigator.mediaDevices?.removeEventListener?.('devicechange', refreshDevices)
    resetTracking()
  }

  function stop() {
    session++
    teardown()
  }

  function updateSuspended() {
    suspended.value = !!ctx && ctx.state === 'suspended'
    if (!suspended.value) {
      window.removeEventListener('pointerdown', resumeContext)
      window.removeEventListener('keydown', resumeContext)
    }
  }

  function resumeContext() {
    if (ctx) ctx.resume().catch(() => {})
  }

  async function refreshDevices() {
    try {
      const all = await navigator.mediaDevices.enumerateDevices()
      devices.value = all
        .filter(d => d.kind === 'audioinput' && d.deviceId && d.deviceId !== 'default' && d.deviceId !== 'communications')
        .map((d, i) => ({ id: d.deviceId, label: d.label || `Input ${i + 1}` }))
    } catch {
      devices.value = []
    }
  }

  function loop() {
    if (!listening.value) return
    rafId = requestAnimationFrame(loop)
    if (busy || !analyser || ctx.state !== 'running') return
    const buf = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(buf)
    busy = true
    worker.postMessage(
      { buffer: buf, sampleRate: ctx.sampleRate, minFreq: MIN_FREQ, maxFreq: MAX_FREQ },
      [buf.buffer],
    )
  }

  function onFrame({ freq, rms }) {
    busy = false
    if (!listening.value) return
    level.value = Math.max(rms, level.value * 0.85)
    const now = performance.now()
    holds = holds.filter(h => h.until > now)

    // A sudden energy rise is a new pick attack: notes already heard may be
    // reported again, unless the attack is the app's own sound reaching a mic
    // (otherwise a note still ringing under it would count once it fades).
    const floor = recentRms.length ? Math.min(...recentRms) : 0
    recentRms.push(rms)
    if (recentRms.length > ONSET_HISTORY) recentRms.shift()
    if (rms >= GATE_ON && rms > floor * ONSET_RATIO) {
      candidateCount = 0
      if (!holds.length) heardPcs.clear()
    }

    // Noise gate with hysteresis
    const open = rms >= (sounding ? GATE_OFF : GATE_ON)
    if (open) {
      sounding = true
      silentFrames = 0
    } else if (sounding && ++silentFrames >= SILENCE_FRAMES) {
      sounding = false
      heardPcs.clear()
    }

    // The worker reports -1 unless it trusts the pitch.
    if (!open || freq < MIN_FREQ || freq > MAX_FREQ) {
      candidateCount = 0
      if (!sounding) liveMidi.value = null
      return
    }

    const midiFloat = 69 + 12 * Math.log2(freq / 440)
    const midi = Math.round(midiFloat)
    liveMidi.value = midi

    // A run of frames starts again after a gap or a new attack, even on the same pitch.
    if (midi === candidate && candidateCount > 0) candidateCount++
    else { candidate = midi; candidateCount = 1; candidateSince = performance.now() }
    // Report once, when the note becomes stable (again after a new attack).
    if (candidateCount !== STABLE_FRAMES) return

    // Octave jumps of a ringing note are detector noise, not a new note.
    const pc = ((midi % 12) + 12) % 12
    if (heardPcs.has(pc)) return
    heardPcs.add(pc)
    if (holds.some(h => h.pc === null || h.pc === pc)) return

    // `time`: when the note was played (performance.now() clock), for exercises in time.
    onNote?.({ midi, noteIndex: pc, freq, cents: Math.round((midiFloat - midi) * 100), time: candidateSince - ATTACK_LEAD_MS })
  }

  // Call when the app plays a note through the speakers, so a microphone that
  // picks it up does not answer the exercise by itself.
  function holdOff(ms, pitchClass = null) {
    if (!listening.value) return
    const pc = pitchClass === null ? null : ((pitchClass % 12) + 12) % 12
    holds.push({ pc, until: performance.now() + ms })
  }

  // An exercise that expects this pitch class again (the same note played twice
  // in a row, e.g. across two inversions) lets it be reported even if the string
  // is re-picked too softly to be heard as a new attack.
  function allowRepeat(pitchClass) {
    heardPcs.delete(((pitchClass % 12) + 12) % 12)
  }

  function toggle() {
    enabled.value = !enabled.value
    if (enabled.value) start()
    else stop()
  }

  function toggleAutoNext() {
    autoNext.value = !autoNext.value
  }

  function setDevice(id) {
    deviceId.value = id
    if (enabled.value) start()
  }

  onMounted(() => {
    if (prefs.enabled) {
      enabled.value = true
      start()
    }
  })

  onUnmounted(() => {
    disposed = true
    stop()
  })

  return reactive({
    enabled, listening, suspended, error, devices, deviceId, autoNext, level, liveMidi,
    toggle, toggleAutoNext, setDevice, holdOff, allowRepeat,
  })
}

// Circles of the on-screen fretboard that sound exactly this MIDI note in the current tuning.
export function fretboardCirclesForMidi(tuning, midi) {
  return Array.from(document.querySelectorAll('.fretboard-layer .note-circle')).filter(c =>
    getAbsoluteNote(tuning, c.dataset.stringIndex, c.dataset.fretIndex) === midi)
}

export function midiToName(midi, noteNames) {
  return `${noteNames[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`
}
