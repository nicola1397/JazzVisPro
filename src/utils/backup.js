// Backup of everything the app keeps in this browser: settings, practice history, guided-path
// progress, snapshots, custom scales, exercise options… One JSON file to download and to load
// back (on another device too).

export const BACKUP_APP = 'jazz-viz-pro'
export const BACKUP_VERSION = 1

export const isAppKey = k => /^(jazzViz|jv[-_])/.test(k) || k === 'et_stats' || k === 'iet_stats'

function appKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && isAppKey(k)) keys.push(k)
  }
  return keys.sort()
}

export function makeBackup(now = new Date()) {
  const data = {}
  for (const k of appKeys()) data[k] = localStorage.getItem(k)
  return { app: BACKUP_APP, version: BACKUP_VERSION, date: now.toISOString(), data }
}

export function downloadBackup() {
  const backup = makeBackup()
  const blob = new Blob([JSON.stringify(backup, null, 1)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `jazzvizpro-backup-${backup.date.slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  return Object.keys(backup.data).length
}

// Checks a backup file's text: { ok: true, backup, count, date } or { ok: false }
export function readBackup(text) {
  try {
    const b = JSON.parse(text)
    if (!b || b.app !== BACKUP_APP || typeof b.data !== 'object' || !b.data) return { ok: false }
    const data = {}
    for (const [k, v] of Object.entries(b.data)) if (isAppKey(k) && typeof v === 'string') data[k] = v
    return { ok: true, backup: { ...b, data }, count: Object.keys(data).length, date: b.date }
  } catch { return { ok: false } }
}

// Replaces the app's data in this browser with the backup's
export function restoreBackup(backup) {
  for (const k of appKeys()) localStorage.removeItem(k)
  for (const [k, v] of Object.entries(backup.data)) localStorage.setItem(k, v)
}
