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

describe('Explorer custom tools', () => {
  it('limits picking, all, none and invert to the zone', () => {
    const s = useAppStore()
    s.setCustomZone(8, 5)                                // swapped on purpose
    expect(s.customZone).toEqual({ from: 5, to: 8 })
    s.selectAllCustom()
    expect(s.customScaleNotes.size).toBe(6 * 4)
    s.setCustomZone(0, 24)
    s.toggleCustomNote('0-0')
    s.setCustomZone(5, 8)
    s.invertCustom()
    expect([...s.customScaleNotes]).toEqual(['0-0'])     // outside the zone, untouched
    s.selectAllCustom()
    s.clearCustomScale()
    expect([...s.customScaleNotes]).toEqual(['0-0'])
  })
  it('lists the pitch classes picked anywhere', () => {
    const s = useAppStore()
    s.toggleCustomPitch(0); s.toggleCustomPitch(4); s.toggleCustomPitch(7)
    expect([...s.customPitchClasses].sort((a, b) => a - b)).toEqual([0, 4, 7])
  })
  it('saves, loads, deletes and restores named scales', () => {
    const s = useAppStore()
    s.toggleCustomPitch(0)
    const item = s.saveCustomScale('  Solo C  ')
    expect(item.name).toBe('Solo C')
    s.clearCustomScale()
    s.loadCustomScale(item.id)
    expect(s.customScaleNotes.size).toBe(12)
    expect(s.explorerMode).toBe('custom')
    const removed = s.deleteCustomScale(item.id)
    expect(s.savedCustomScales).toEqual([])
    s.restoreCustomScale(removed)
    expect(s.savedCustomScales.map(x => x.name)).toEqual(['Solo C'])
    expect(JSON.parse(localStorage.getItem('jv-custom-scales')).length).toBe(1)
  })
})

describe('snapshots', async () => {
  const { useSnapshotsStore } = await import('../../src/stores/snapshots.js')
  const t = k => ({ 'opt.custom': 'Custom', 'opt.highlight': 'Highlight' })[k] || k
  it('capture the whole Explorer and put it back', () => {
    const app = useAppStore()
    const snaps = useSnapshotsStore()
    app.setRoot('Bb'); app.setTuningName('Drop D'); app.setNotation('note'); app.setExplorerMode('custom')
    app.toggleCustomPitch(10)
    const snap = snaps.add(t)
    expect(snap.label).toBe('Bb Ionio (Maj7) · Custom')
    app.setRoot('C'); app.setTuningName('E Standard'); app.setExplorerMode('normal'); app.clearCustomScale()
    snaps.apply(snap.id)
    expect(app.root).toBe('Bb')
    expect(app.tuningName).toBe('Drop D')
    expect(app.notation).toBe('note')
    expect(app.explorerMode).toBe('custom')
    expect(app.customScaleNotes.size).toBeGreaterThan(0)
  })
  it('read snapshots saved by older versions', () => {
    localStorage.setItem('jv_snapshots', JSON.stringify([{ root: 'C', scale: 'Dorico (m7)', label: 'Old', manualNotes: ['1-3'], customScale: [], date: 'x' }]))
    const snaps = useSnapshotsStore()
    snaps.reload()
    expect(snaps.list[0]).toMatchObject({ label: 'Old', state: { root: 'C', scaleName: 'Dorico (m7)', explorerMode: 'highlight' } })
  })
  it('delete with undo, rename', () => {
    const snaps = useSnapshotsStore()
    const a = snaps.add(t, 'A'), b = snaps.add(t, 'B')
    const removed = snaps.remove(a.id)
    expect(snaps.list.map(x => x.label)).toEqual(['B'])
    snaps.restore(removed)
    expect(snaps.list.map(x => x.label)).toEqual(['B', 'A'])
    snaps.rename(b.id, ' Bee ')
    expect(snaps.list[0].label).toBe('Bee')
  })
})
