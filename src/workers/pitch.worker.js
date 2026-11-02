// YIN pitch detector (de Cheveigné & Kawahara, 2002) used by the guitar input
// of the fretboard exercises. Besides the frequency it returns a clarity value
// (1 - normalized difference at the chosen lag) and the RMS of the most recent
// samples, so the caller can tell clean notes from noise and spot new attacks.

const YIN_THRESHOLD = 0.15
const WINDOW_SEC = 0.043      // ~2048 samples at 48 kHz: 3 periods of the lowest string
const RMS_WINDOW_SEC = 0.021

function rmsOf(buf, from) {
  let sum = 0
  for (let i = from; i < buf.length; i++) sum += buf[i] * buf[i]
  return Math.sqrt(sum / Math.max(1, buf.length - from))
}

function yin(buf, sampleRate, minFreq, maxFreq) {
  const maxTau = Math.min(Math.floor(sampleRate / minFreq), Math.floor(buf.length / 2))
  const minTau = Math.max(2, Math.floor(sampleRate / maxFreq))
  // Analyse the most recent samples so a new attack shows up quickly.
  const win = Math.min(Math.round(sampleRate * WINDOW_SEC), buf.length - maxTau)
  const start = buf.length - win - maxTau
  if (win <= 0 || maxTau <= minTau) return { freq: -1, clarity: 0 }

  // Difference function
  const diff = new Float32Array(maxTau + 1)
  for (let tau = 1; tau <= maxTau; tau++) {
    let sum = 0
    for (let j = start; j < start + win; j++) {
      const d = buf[j] - buf[j + tau]
      sum += d * d
    }
    diff[tau] = sum
  }

  // Cumulative mean normalized difference
  const cmnd = new Float32Array(maxTau + 1)
  cmnd[0] = 1
  let running = 0
  for (let tau = 1; tau <= maxTau; tau++) {
    running += diff[tau]
    cmnd[tau] = running > 0 ? (diff[tau] * tau) / running : 1
  }

  // Absolute threshold: first dip below the threshold, then walk to its minimum
  let tauEst = -1
  for (let tau = minTau; tau <= maxTau; tau++) {
    if (cmnd[tau] < YIN_THRESHOLD) {
      while (tau + 1 <= maxTau && cmnd[tau + 1] < cmnd[tau]) tau++
      tauEst = tau
      break
    }
  }
  if (tauEst === -1) return { freq: -1, clarity: 0 }

  // Parabolic interpolation around the minimum
  let betterTau = tauEst
  if (tauEst > minTau && tauEst < maxTau) {
    const s0 = cmnd[tauEst - 1], s1 = cmnd[tauEst], s2 = cmnd[tauEst + 1]
    const denom = 2 * (2 * s1 - s2 - s0)
    if (denom !== 0) betterTau = tauEst + (s2 - s0) / denom
  }

  return { freq: sampleRate / betterTau, clarity: 1 - cmnd[tauEst] }
}

self.onmessage = ({ data: { buffer, sampleRate, minFreq, maxFreq } }) => {
  const rms = rmsOf(buffer, Math.max(0, buffer.length - Math.round(sampleRate * RMS_WINDOW_SEC)))
  const { freq, clarity } = rms > 0.001
    ? yin(buffer, sampleRate, minFreq, maxFreq)
    : { freq: -1, clarity: 0 }
  self.postMessage({ freq, clarity, rms })
}
