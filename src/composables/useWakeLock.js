import { watch, onUnmounted } from 'vue'

// Keeps the screen on while `active()` is true (backing track, metronome, timed exercises):
// a phone on the music stand should not go dark mid-tune. Browsers drop the lock when the
// page is hidden, so it is asked for again when the page comes back.
export function useWakeLock(active) {
  let lock = null

  async function acquire() {
    if (lock || !('wakeLock' in navigator) || document.visibilityState !== 'visible') return
    try {
      lock = await navigator.wakeLock.request('screen')
      lock.addEventListener('release', () => { lock = null })
    } catch { lock = null }
  }
  async function release() {
    const l = lock
    lock = null
    try { await l?.release() } catch {}
  }
  function onVisibility() {
    if (document.visibilityState === 'visible' && active()) acquire()
  }

  watch(active, on => (on ? acquire() : release()), { immediate: true })
  document.addEventListener('visibilitychange', onVisibility)
  onUnmounted(() => {
    document.removeEventListener('visibilitychange', onVisibility)
    release()
  })
}
