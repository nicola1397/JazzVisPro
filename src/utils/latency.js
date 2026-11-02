import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

// Input latency of the guitar chain (audio interface + detection), measured by
// the calibration in Scale a Tempo and subtracted from note times in the
// exercises played in time.
const KEY = 'jazzVizInputLatency'

// Until calibrated, a typical value for an interface plus the pitch detection.
const DEFAULT_MS = 40

export function getInputLatency() {
  const v = readStorage(KEY, DEFAULT_MS)
  return Number.isFinite(v) ? v : DEFAULT_MS
}

export function setInputLatency(ms) {
  writeStorage(KEY, Math.round(ms))
}
