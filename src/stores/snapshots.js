import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from './app.js'

const KEY = 'jv_snapshots'
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

// Snapshots of the whole Explorer: key, scale, tuning, mode, notation, CAGED shape, options and
// every picked note. Older snapshots (key, scale and notes only) are read as Normal, Highlight
// or Custom depending on which notes they carry.
function migrate(x) {
  if (!x || typeof x !== 'object') return null
  if (x.state) return { id: x.id || uid(), label: x.label || '', date: x.date || '', state: x.state }
  const custom = Array.isArray(x.customScale) && x.customScale.length
  const manual = Array.isArray(x.manualNotes) && x.manualNotes.length
  return {
    id: uid(), label: x.label || `${x.root} ${x.scale}`, date: x.date || '',
    state: {
      root: x.root, scaleName: x.scale, tuningName: 'E Standard',
      explorerMode: custom ? 'custom' : manual ? 'highlight' : 'normal',
      manualNotes: x.manualNotes || [], customScale: x.customScale || [], highlightedIntervals: [],
    },
  }
}

export const useSnapshotsStore = defineStore('snapshots', () => {
  const list = ref(read())

  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
      return Array.isArray(raw) ? raw.map(migrate).filter(Boolean) : []
    } catch { return [] }
  }
  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(list.value)) } catch {}
  }
  function reload() { list.value = read() }

  function defaultLabel(st, t) {
    const mode = st.explorerMode && st.explorerMode !== 'normal' ? ` · ${t('opt.' + st.explorerMode)}` : ''
    return `${st.root} ${st.scaleName}${mode}`
  }

  function add(t, label = '') {
    const state = useAppStore().captureState()
    const snap = { id: uid(), label: label.trim() || defaultLabel(state, t), date: new Date().toISOString(), state }
    list.value = [snap, ...list.value]
    persist()
    return snap
  }
  function rename(id, label) {
    const s = list.value.find(x => x.id === id)
    if (!s || !label.trim()) return
    s.label = label.trim()
    list.value = [...list.value]
    persist()
  }
  function remove(id) {
    const index = list.value.findIndex(x => x.id === id)
    if (index < 0) return null
    const removed = { snap: list.value[index], index }
    list.value = list.value.filter(x => x.id !== id)
    persist()
    return removed
  }
  function restore({ snap, index }) {
    const l = [...list.value]
    l.splice(Math.min(index, l.length), 0, snap)
    list.value = l
    persist()
  }
  function clear() { list.value = []; persist() }
  function apply(id) {
    const s = list.value.find(x => x.id === id)
    if (s) useAppStore().applyState(s.state)
    return s
  }

  return { list, reload, add, rename, remove, restore, clear, apply }
})
