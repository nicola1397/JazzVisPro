function corrAt(buf, lag, len) {
  let c = 0
  for (let j = 0; j < len && j + lag < buf.length; j++) c += buf[j] * buf[j + lag]
  return c
}

function autoCorrelate(buf, sampleRate) {
  let rms = 0
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i]
  if (Math.sqrt(rms / buf.length) < 0.008) return -1

  const minLag = Math.floor(sampleRate / 1600)
  const maxLag = Math.min(Math.floor(sampleRate / 50), buf.length - 1)
  const windowLen = Math.min(2048, buf.length - maxLag)

  let bestCorr = -Infinity, bestLag = -1
  for (let lag = minLag; lag <= maxLag; lag++) {
    let corr = 0
    for (let j = 0; j < windowLen; j++) corr += buf[j] * buf[j + lag]
    if (corr > bestCorr) { bestCorr = corr; bestLag = lag }
  }
  if (bestLag < 0 || bestCorr <= 0) return -1

  // Parabolic interpolation
  let T0 = bestLag
  if (T0 > minLag && T0 < maxLag) {
    const c0 = corrAt(buf, T0 - 1, windowLen)
    const c1 = bestCorr
    const c2 = corrAt(buf, T0 + 1, windowLen)
    const a = (c0 + c2 - 2 * c1) / 2
    const b = (c2 - c0) / 2
    if (a < 0) T0 -= b / (2 * a)
  }
  return sampleRate / T0
}

self.onmessage = ({ data: { buffer, sampleRate } }) => {
  const freq = autoCorrelate(buffer, sampleRate)
  self.postMessage({ freq })
}
