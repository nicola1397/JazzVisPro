import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '../../src/stores/app.js'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})

describe('Explorer custom mode', () => {
  it('takes a note in every position and drops it again', () => {
    const s = useAppStore()
    s.toggleCustomPitch(0)                               // C
    expect(s.customScaleNotes.size).toBe(12)             // 6 strings × frets 0–24
    expect(s.customPitchState[0]).toBe('all')
    s.toggleCustomNote([...s.customScaleNotes][0])
    expect(s.customPitchState[0]).toBe('some')
    s.toggleCustomPitch(0)                               // not all taken → takes all
    expect(s.customPitchState[0]).toBe('all')
    s.toggleCustomPitch(0)
    expect(s.customScaleNotes.size).toBe(0)
  })
  it('selects and clears every position', () => {
    const s = useAppStore()
    s.selectAllCustom()
    expect(s.customScaleNotes.size).toBe(6 * 25)
    expect(s.customPitchState.every(x => x === 'all')).toBe(true)
    s.clearCustomScale()
    expect(s.customScaleNotes.size).toBe(0)
  })
  it('keeps the custom scale when switching mode', () => {
    const s = useAppStore()
    s.setExplorerMode('custom')
    s.toggleCustomPitch(7)
    s.setExplorerMode('normal')
    s.setExplorerMode('custom')
    expect(s.customScaleNotes.size).toBeGreaterThan(0)
  })
  it('saves the Explorer state and reads it back', () => {
    vi.useFakeTimers()
    const s = useAppStore()
    s.setExplorerMode('highlight')
    s.toggleHighlightInterval(3)
    s.toggleManualNote('2-5')
    s.setCagedShape('E')
    vi.advanceTimersByTime(400)
    vi.useRealTimers()
    setActivePinia(createPinia())
    const t = useAppStore()
    t.loadFromStorage()
    expect(t.explorerMode).toBe('highlight')
    expect([...t.highlightedIntervals]).toEqual([3])
    expect([...t.manualNotes]).toEqual(['2-5'])
    expect(t.cagedShape).toBe('E')
  })
})
