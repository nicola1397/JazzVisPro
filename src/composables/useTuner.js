import { ref } from 'vue'
import { NOTES } from '../utils/theory.js'
import AutocorrWorker from '../workers/autocorrelation.worker.js?worker'

const STD_STRINGS = [
  { name:'E2', freq:82.41 }, { name:'A2', freq:110.00 },
  { name:'D3', freq:146.83 }, { name:'G3', freq:196.00 },
  { name:'B3', freq:246.94 }, { name:'E4', freq:329.63 },
]

export function useTuner(audioStore) {
  const isActive    = ref(false)
  const statusText  = ref('')
  const detectedNote = ref('')
  const detectedFreq = ref(0)
  const detectedCents = ref(0)
  const tuneColor   = ref('#555')

  let tunerStream   = null
  let tunerCtx      = null
  let analyser      = null
  let animFrame     = null
  let worker        = null
  let freqBuf       = []
  let lastDisplay   = 0

  const strings = STD_STRINGS

  async function start() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Il tuo browser o la tua connessione (non HTTPS) non supportano l'accesso al microfono.")
      }
      tunerStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      tunerCtx  = new (window.AudioContext || window.webkitAudioContext)()
      analyser  = tunerCtx.createAnalyser()
      analyser.fftSize = 4096
      tunerCtx.createMediaStreamSource(tunerStream).connect(analyser)
      worker = new AutocorrWorker()
      worker.onmessage = ({ data: { freq } }) => _onFreq(freq > 50 && freq < 1600 ? freq : null)
      isActive.value = true
      _detect()
    } catch (e) {
      statusText.value = `Microfono non disponibile: ${e.message}`
    }
  }

  function stop() {
    isActive.value = false
    if (animFrame) cancelAnimationFrame(animFrame)
    if (tunerStream) tunerStream.getTracks().forEach(t => t.stop())
    if (tunerCtx) tunerCtx.close()
    if (worker) worker.terminate()
    worker = null; tunerStream = null; tunerCtx = null; analyser = null
    freqBuf = []
    detectedNote.value = '–'
    detectedFreq.value = 0
    detectedCents.value = 0
    tuneColor.value = '#555'
  }

  function _detect() {
    if (!isActive.value) return
    const buf = new Float32Array(analyser.fftSize)
    analyser.getFloatTimeDomainData(buf)
    worker.postMessage({ buffer: buf, sampleRate: tunerCtx.sampleRate })
    animFrame = requestAnimationFrame(_detect)
  }

  function _onFreq(freq) {
    if (freq) {
      freqBuf.push(freq)
      if (freqBuf.length > 6) freqBuf.shift()
    } else if (freqBuf.length > 0) {
      freqBuf.shift()
    }
    const now = performance.now()
    if (now - lastDisplay >= 80) {
      lastDisplay = now
      _updateDisplay(freqBuf.length >= 2 ? _median(freqBuf) : null)
    }
  }

  function _median(arr) {
    const s = [...arr].sort((a, b) => a - b)
    const m = Math.floor(s.length / 2)
    return s.length % 2 ? s[m] : (s[m-1] + s[m]) / 2
  }

  function _freqToNote(freq) {
    const semitones = Math.round(12 * Math.log2(freq / 440))
    const noteIdx = ((semitones + 9) % 12 + 12) % 12
    const octave  = 4 + Math.floor((semitones + 9) / 12)
    const exactFreq = 440 * Math.pow(2, semitones / 12)
    const cents = 1200 * Math.log2(freq / exactFreq)
    return { noteName: NOTES[noteIdx], octave, cents: parseFloat(cents.toFixed(2)) }
  }

  function _updateDisplay(freq) {
    if (!freq) {
      detectedNote.value  = '–'
      detectedFreq.value  = 0
      detectedCents.value = 0
      tuneColor.value = '#555'
      return
    }
    const { noteName, octave, cents } = _freqToNote(freq)
    const inTune = Math.abs(cents) < 8
    const close  = Math.abs(cents) < 20
    tuneColor.value    = inTune ? '#2ecc71' : close ? '#f39c12' : '#e74c3c'
    detectedNote.value  = noteName + octave
    detectedFreq.value  = parseFloat(freq.toFixed(1))
    detectedCents.value = cents
  }

  return {
    isActive, statusText, detectedNote, detectedFreq, detectedCents, tuneColor,
    strings, start, stop,
  }
}
