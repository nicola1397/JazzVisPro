import { describe, it, expect, beforeEach } from 'vitest'
import { makeBackup, readBackup, restoreBackup, isAppKey } from '../../src/utils/backup.js'

beforeEach(() => localStorage.clear())

describe('backup', () => {
  it('takes every key of the app and nothing else', () => {
    localStorage.setItem('jazzVizPractice', '[1]')
    localStorage.setItem('jv_snapshots', '[]')
    localStorage.setItem('jv-lang', 'en')
    localStorage.setItem('iet_stats', '{}')
    localStorage.setItem('someone-else', 'x')
    const b = makeBackup(new Date('2026-01-02T03:04:05Z'))
    expect(Object.keys(b.data)).toEqual(['iet_stats', 'jazzVizPractice', 'jv-lang', 'jv_snapshots'])
    expect(b).toMatchObject({ app: 'jazz-viz-pro', version: 1, date: '2026-01-02T03:04:05.000Z' })
  })
  it('round-trips, replacing what was there', () => {
    localStorage.setItem('jazzVizCourse', '{"done":{}}')
    const b = makeBackup()
    localStorage.setItem('jazzVizCourse', 'changed')
    localStorage.setItem('jv-recent-pages', '[]')
    const r = readBackup(JSON.stringify(b))
    expect(r.ok).toBe(true)
    restoreBackup(r.backup)
    expect(localStorage.getItem('jazzVizCourse')).toBe('{"done":{}}')
    expect(localStorage.getItem('jv-recent-pages')).toBe(null)
  })
  it('refuses files that are not a backup and drops foreign keys', () => {
    expect(readBackup('not json').ok).toBe(false)
    expect(readBackup('{"app":"other","data":{}}').ok).toBe(false)
    const r = readBackup(JSON.stringify({ app: 'jazz-viz-pro', data: { 'jazzVizData': '{}', evil: 'x', jv_x: 3 } }))
    expect(Object.keys(r.backup.data)).toEqual(['jazzVizData'])
    expect(isAppKey('evil')).toBe(false)
  })
})
