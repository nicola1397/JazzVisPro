import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

// Practice history shared by every exercise: one entry per answer, kept in
// localStorage. It drives the Progress page and lets exercises propose more
// often the items (notes, intervals, chords...) that are answered wrong.

const STORAGE_KEY  = 'jazzVizPractice'
const MAX_ATTEMPTS = 6000
const RECENT_PER_ITEM = 20         // accuracy of an item looks at its last answers only
const SESSION_GAP_MS  = 2 * 60e3   // answers closer than this belong to the same practice session
const FIRST_ANSWER_MS = 15e3       // time credited to the first answer of a session

export const usePracticeStore = defineStore('practice', () => {
  // { e: exercise id, k: item key, ok: boolean, t: timestamp,
  //   s/f: string and fret when the answer was a fretboard click, g: true when played on the guitar }
  const attempts = ref(sanitize(readStorage(STORAGE_KEY, [])))

  let saveTimer = null
  function scheduleSave() {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => writeStorage(STORAGE_KEY, attempts.value), 500)
  }

  function record(exercise, key, ok, extra = {}) {
    const entry = { e: exercise, k: String(key), ok: !!ok, t: Date.now() }
    if (Number.isInteger(extra.s) && Number.isInteger(extra.f)) { entry.s = extra.s; entry.f = extra.f }
    if (extra.guitar) entry.g = true
    attempts.value.push(entry)
    if (attempts.value.length > MAX_ATTEMPTS) attempts.value.splice(0, attempts.value.length - MAX_ATTEMPTS)
    scheduleSave()
  }

  function clear() {
    attempts.value = []
    writeStorage(STORAGE_KEY, [])
  }

  // Recent accuracy of each item of an exercise: Map(key -> { n, ok })
  function itemStats(exercise) {
    const byKey = new Map()
    for (let i = attempts.value.length - 1; i >= 0; i--) {
      const a = attempts.value[i]
      if (a.e !== exercise) continue
      const s = byKey.get(a.k) || { n: 0, ok: 0 }
      if (s.n >= RECENT_PER_ITEM) continue
      s.n++
      if (a.ok) s.ok++
      byKey.set(a.k, s)
    }
    return byKey
  }

  // Random choice that favours items answered wrong; unseen items count as half known.
  function pickWeighted(exercise, candidates, keyOf = c => c) {
    if (!candidates.length) return undefined
    const stats = itemStats(exercise)
    const weights = candidates.map(c => {
      const s = stats.get(String(keyOf(c))) || { n: 0, ok: 0 }
      const errorRate = (s.n - s.ok + 1) / (s.n + 2)
      return 0.4 + 3 * errorRate
    })
    let r = Math.random() * weights.reduce((a, b) => a + b, 0)
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i]
      if (r <= 0) return candidates[i]
    }
    return candidates[candidates.length - 1]
  }

  return { attempts, record, clear, itemStats, pickWeighted }
})

function sanitize(list) {
  return Array.isArray(list)
    ? list.filter(a => a && typeof a.e === 'string' && typeof a.t === 'number')
    : []
}

// ── Derived figures for the Progress page (pure functions) ─────────────────────

export function dayKey(t) {
  const d = new Date(t)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Practice time per day, estimated from the gaps between consecutive answers.
export function practiceMsByDay(attempts) {
  const byDay = new Map()
  const sorted = [...attempts].sort((a, b) => a.t - b.t)
  let prev = null
  for (const a of sorted) {
    const day = dayKey(a.t)
    const gap = prev && dayKey(prev.t) === day ? a.t - prev.t : Infinity
    byDay.set(day, (byDay.get(day) || 0) + (gap <= SESSION_GAP_MS ? gap : FIRST_ANSWER_MS))
    prev = a
  }
  return byDay
}

// Consecutive days with practice, ending today (or yesterday if not practised yet today).
export function streakDays(attempts, now = Date.now()) {
  const days = new Set(attempts.map(a => dayKey(a.t)))
  const d = new Date(now)
  if (!days.has(dayKey(d.getTime()))) d.setDate(d.getDate() - 1)
  let n = 0
  while (days.has(dayKey(d.getTime()))) { n++; d.setDate(d.getDate() - 1) }
  return n
}
