import { ref, watch } from 'vue'

export function useDebouncedStorage(key, defaultValue, delay = 300) {
  let stored = null
  try { stored = localStorage.getItem(key) } catch {}
  const state = ref(stored !== null ? JSON.parse(stored) : defaultValue)

  let timer = null
  watch(state, (newVal) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      try { localStorage.setItem(key, JSON.stringify(newVal)) } catch {}
    }, delay)
  }, { deep: true })

  return state
}

export function readStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item !== null ? JSON.parse(item) : defaultValue
  } catch { return defaultValue }
}

export function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
