// YIN pitch detector (de Cheveigné & Kawahara, 2002) used by the guitar input
// of the fretboard exercises, with a correction for let-ring playing (see
// pickRingingNote). It returns the frequency (-1 unless a note is reliably
// detected), a clarity value (1 - normalized difference at the chosen lag) and
// the RMS of the most recent samples, used by the caller to spot new attacks.

const YIN_THRESHOLD   = 0.15
const WINDOW_SEC      = 0.043  // ~2048 samples at 48 kHz: 3 periods of the lowest string
const RMS_WINDOW_SEC  = 0.021
const HARMONICS       = 6
const FUNDAMENTAL_MIN = 0.1    // a real note has energy at its own fundamental
const CANDIDATE_MAX   = 0.6    // YIN dips worth checking when several notes ring together
const MIXTURE_MAX     = 0.35   // deepest dip needed to look for a note when no clean period exists

function rmsOf(buf, from) {
  let sum = 0
  for (let i = from; i < buf.length; i++) sum += buf[i] * buf[i]
  return Math.sqrt(sum / Math.max(1, buf.length - from))
}

// Parabolic interpolation around a minimum of the normalized difference
function refine(cmnd, tau, minTau, maxTau) {
  if (tau <= minTau || tau >= maxTau) return tau
  const s0 = cmnd[tau - 1], s1 = cmnd[tau], s2 = cmnd[tau + 1]
  const denom = 2 * (2 * s1 - s2 - s0)
  return denom !== 0 ? tau + (s2 - s0) / denom : tau
}

// Magnitudes of the first harmonics of a candidate pitch (Goertzel on a Hann-windowed buffer)
function makeSpectrum(buf, sampleRate) {
  let windowed = null
  function magnitude(f) {
    if (!windowed) {
      windowed = new Float32Array(buf.length)
      for (let i = 0; i < buf.length; i++) {
        windowed[i] = buf[i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (buf.length - 1)))
      }
    }
    const c = 2 * Math.cos((2 * Math.PI * f) / sampleRate)
    let s1 = 0, s2 = 0
    for (let i = 0; i < windowed.length; i++) {
      const s0 = windowed[i] + c * s1 - s2
      s2 = s1; s1 = s0
    }
    return Math.sqrt(Math.max(0, s1 * s1 + s2 * s2 - c * s1 * s2))
  }
  return function profile(f) {
    const mags = []
    for (let k = 1; k <= HARMONICS; k++) mags.push(k * f < sampleRate / 2 ? magnitude(k * f) : 0)
    const max = Math.max(...mags)
    let score = 0
    mags.forEach((m, i) => { score += m / (i + 1) })   // favours the lowest real fundamental
    return { real: max > 0 && mags[0] >= FUNDAMENTAL_MIN * max, score }
  }
}

// Several strings ringing together (a held chord shape, picked one string at a
// time) repeat only every "common period": a phantom pitch well below every
// note played, with no energy at its own frequency. Among the shorter periods,
// keep the note that really sounds and dominates, i.e. the one just picked.
function pickRingingNote(cmnd, below, minTau, maxTau, sampleRate, profile) {
  let best = null
  for (let tau = minTau + 1; tau < below; tau++) {
    if (cmnd[tau] >= CANDIDATE_MAX || cmnd[tau] > cmnd[tau - 1] || cmnd[tau] > cmnd[tau + 1]) continue
    const freq = sampleRate / refine(cmnd, tau, minTau, maxTau)
    const p = profile(freq)
    if (p.real && (!best || p.score > best.score)) best = { freq, score: p.score }
  }
  return best ? best.freq : -1
}

function detect(buf, sampleRate, minFreq, maxFreq) {
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

  const profile = makeSpectrum(buf, sampleRate)
  if (tauEst !== -1) {
    const freq = sampleRate / refine(cmnd, tauEst, minTau, maxTau)
    const clarity = 1 - cmnd[tauEst]
    if (profile(freq).real) return { freq, clarity }
    // Clean period but no energy at its pitch: notes ringing together.
    const ringing = pickRingingNote(cmnd, tauEst, minTau, maxTau, sampleRate, profile)
    return ringing > 0 ? { freq: ringing, clarity } : { freq: -1, clarity: 0 }
  }

  // No clean period: when the signal is still clearly periodic, notes may be
  // ringing together without a common period in range.
  let deepest = 1
  for (let tau = minTau; tau <= maxTau; tau++) deepest = Math.min(deepest, cmnd[tau])
  if (deepest >= MIXTURE_MAX) return { freq: -1, clarity: 0 }
  const ringing = pickRingingNote(cmnd, maxTau, minTau, maxTau, sampleRate, profile)
  return ringing > 0 ? { freq: ringing, clarity: 1 - deepest } : { freq: -1, clarity: 0 }
}

self.onmessage = ({ data: { buffer, sampleRate, minFreq, maxFreq } }) => {
  const rms = rmsOf(buffer, Math.max(0, buffer.length - Math.round(sampleRate * RMS_WINDOW_SEC)))
  const { freq, clarity } = rms > 0.001
    ? detect(buffer, sampleRate, minFreq, maxFreq)
    : { freq: -1, clarity: 0 }
  self.postMessage({ freq, clarity, rms })
}
