// Tone.js (350 KB) used to be a blocking <script> in index.html, downloaded before anything
// was shown. It is now fetched in the background once the app is on screen, and every
// sound goes through audio.init(), which waits for it if it is not there yet.
let pending = null

export function toneLoaded() {
  return typeof window !== 'undefined' && !!window.Tone
}

export function loadTone() {
  if (toneLoaded()) return Promise.resolve(window.Tone)
  if (!pending) {
    pending = new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = `${import.meta.env.BASE_URL}libs/Tone.js`
      s.async = true
      s.onload = () => resolve(window.Tone)
      s.onerror = () => { pending = null; s.remove(); reject(new Error('Tone.js could not be loaded')) }
      document.head.appendChild(s)
    })
  }
  return pending
}

// Start the download when the browser is idle, so the first note plays without waiting.
export function preloadTone() {
  const go = () => loadTone().catch(() => {})
  if ('requestIdleCallback' in window) requestIdleCallback(go, { timeout: 2500 })
  else setTimeout(go, 1200)
}
