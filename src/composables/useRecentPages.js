import { ref } from 'vue'
import { menuLabelFor } from '../components/layout/menu.js'

// The menu pages opened most recently, newest first (for the Today page).
const KEY = 'jv-recent-pages'
const MAX = 8

function read() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(list) ? list.filter(x => x && typeof x.path === 'string') : []
  } catch { return [] }
}

export const recentPages = ref(read())

export function recordVisit(path) {
  if (!menuLabelFor(path)) return
  recentPages.value = [{ path, t: Date.now() }, ...recentPages.value.filter(x => x.path !== path)].slice(0, MAX)
  try { localStorage.setItem(KEY, JSON.stringify(recentPages.value)) } catch {}
}
