import { test, expect } from '@playwright/test'
import { open, collectErrors } from './helpers.js'

test.describe('features', () => {

  test('Explorer custom mode: note picker, all/none, kept across modes and reloads', async ({ page }) => {
    const errors = collectErrors(page)
    await open(page, '/explorer')
    const active = () => page.locator('.note-circle.active-note').count()
    const mode = re => page.locator('.jd-mode', { hasText: re })
    await mode(/personalizzato|custom/i).click()
    await page.locator('#legend .color-option').nth(0).click()
    expect(await active()).toBe(12)
    await expect(page.locator('#legend .color-option').nth(0)).toHaveClass(/selected/)
    await mode(/normale|normal/i).click()
    await mode(/personalizzato|custom/i).click()
    expect(await active()).toBe(12)
    await page.waitForTimeout(400)
    await page.reload({ waitUntil: 'networkidle' })
    expect(await active()).toBe(12)
    await page.locator('.legend-bulk button').first().click()
    expect(await active()).toBe(150)
    await page.locator('.legend-bulk button').nth(1).click()
    expect(await active()).toBe(0)
    expect(errors).toEqual([])
  })

  test('Explorer custom tools: recognise, save, delete with undo', async ({ page }) => {
    await open(page, '/explorer')
    await page.locator('.jd-mode', { hasText: /personalizzato|custom/i }).click()
    for (const i of [0, 2, 4, 5, 7, 9, 11]) await page.locator('#legend .color-option').nth(i).click()
    await expect(page.locator('.cst-chip').first()).toContainText('Ionio')
    await page.locator('.cst-name').fill('Do maggiore')
    await page.locator('.cst-save button[type=submit]').click()
    await expect(page.locator('.cst-item')).toHaveCount(1)
    await page.locator('.cst-del').click()
    await expect(page.locator('.cst-item')).toHaveCount(0)
    await page.locator('.th-action').click()
    await expect(page.locator('.cst-item')).toHaveCount(1)
  })

  test('snapshots restore the whole Explorer', async ({ page }) => {
    await open(page, '/explorer')
    await page.locator('.jd-mode', { hasText: /personalizzato|custom/i }).click()
    await page.locator('#legend .color-option').nth(0).click()
    await page.locator('button', { hasText: /salva snapshot|save snapshot/i }).click()
    await page.locator('.jd-mode', { hasText: /normale|normal/i }).click()
    await page.locator('.explorer-snap-select').selectOption({ index: 1 })
    await expect(page.locator('.explorer-row--center .jd-mode.on')).toContainText(/personalizzato|custom/i)
    expect(await page.locator('.note-circle.active-note').count()).toBe(12)
  })

  test('left-handed neck and part of the neck, exercises keep the whole neck', async ({ page }) => {
    await open(page, '/explorer')
    const nutLeft = () => page.evaluate(() => document.querySelector('.string.s1 .fret-0').getBoundingClientRect().left)
    const fretsShown = () => page.evaluate(() => [...document.querySelectorAll('.string.s1 .fret')].filter(x => getComputedStyle(x).display !== 'none').length)
    const right = await nutLeft()
    await page.locator('.jd-mode', { hasText: /mancino|left-handed/i }).click()
    expect(await nutLeft()).toBeGreaterThan(right + 500)
    await page.locator('.explorer-window-select').selectOption('5-17')
    expect(await fretsShown()).toBe(13)
    await open(page, '/note-finder')
    expect(await fretsShown()).toBe(25)
  })

  test('Quiz: switching language mid-quiz, language remembered', async ({ page }) => {
    const errors = collectErrors(page)
    await open(page, '/quiz')
    const start = page.locator('button.btn-add-step').first()
    await expect(start).toBeEnabled()
    await start.click()
    const q = page.locator('#view-quiz .h3').first()
    const it = await q.innerText()
    await page.locator('#lang-btn').click()
    await expect(q).not.toHaveText(it)
    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    expect(errors).toEqual([])
  })

  test('sound works before the audio library has been preloaded', async ({ page }) => {
    await page.addInitScript(() => { window.requestIdleCallback = () => 0 })
    await open(page, '/lessons/naturals')
    expect(await page.evaluate(() => typeof window.Tone)).toBe('undefined')
    await page.locator('button', { hasText: /ascolta|listen/i }).first().click()
    await expect.poll(() => page.evaluate(() => typeof window.Tone)).toBe('object')
  })

  test('chord fingerings load in Chord Voicing', async ({ page }) => {
    await open(page, '/chord-voicing')
    await expect(page.locator('.chord-diagram-wrap svg, .cv-diagram svg, .cv-voicings svg').first()).toBeVisible()
  })

  test('confirmations use the in-app dialog', async ({ page }) => {
    page.on('dialog', d => { throw new Error('native dialog: ' + d.message()) })
    await page.goto('/#/snapshots')
    await page.evaluate(() => localStorage.setItem('jv_snapshots', JSON.stringify([{ root: 'C', scale: 'Ionio (Maj7)', label: 'C', manualNotes: [], customScale: [], date: '' }])))
    await open(page, '/snapshots')
    await page.locator('button', { hasText: /cancella tutti|delete all|clear all/i }).click()
    await expect(page.locator('.th-dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('.th-dialog')).toHaveCount(0)
  })
})

test.describe('quick search', () => {
  test('finds pages, steps and theory chapters and opens them', async ({ page }) => {
    await open(page, '/note-finder')
    await page.keyboard.press('Control+k')
    const input = page.locator('.qs-input')
    await expect(input).toBeFocused()
    await input.fill('metronomo')
    await expect(page.locator('.qs-item').first()).toContainText(/metronomo/i)
    await input.fill('circolo quinte')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/teoria-generale\?open=3/)
    await expect(page.locator('.teoria-card.open')).toHaveCount(1)
    await page.locator('.search-toggle').click()
    await page.keyboard.press('Escape')
    await expect(page.locator('.qs-dialog')).toHaveCount(0)
  })
})

test.describe('fretboard from the keyboard', () => {
  test('arrows move, Enter answers an exercise and toggles a custom note', async ({ page }) => {
    await open(page, '/note-finder')
    await page.locator('.stage-hud .jd-tbtn--play').first().click()
    const layer = page.locator('.fretboard-layer')
    await layer.focus()
    await page.keyboard.press('ArrowDown'); await page.keyboard.press('ArrowRight')
    await expect(page.locator('.fret.kbd-cursor')).toHaveCount(1)
    await expect(page.locator('.string.s4 .fret-6')).toHaveClass(/kbd-cursor/)
    await page.keyboard.press('Enter')
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.querySelector('.string.s4 .fret-6 .note-circle')).opacity)).toBe('1')
    await open(page, '/explorer')
    await page.locator('.jd-mode', { hasText: /personalizzato|custom/i }).click()
    await page.locator('.fretboard-layer').focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('.note-circle.active-note')).toHaveCount(1)
  })
})

test.describe('installable, offline, backup, screen on', () => {
  test('the manifest and its icons are served', async ({ page, request }) => {
    const res = await request.get('/manifest.webmanifest')
    expect(res.ok()).toBe(true)
    const m = await res.json()
    expect(m.display).toBe('standalone')
    for (const icon of m.icons) expect((await request.get('/' + icon.src)).ok(), icon.src).toBe(true)
    await open(page, '/')
    await expect(page.locator('link[rel="manifest"]')).toHaveCount(1)
  })

  test('works offline once visited', async ({ page, context }) => {
    await open(page, '/')
    await page.evaluate(() => navigator.serviceWorker.ready)
    await page.reload({ waitUntil: 'networkidle' })          // now the worker serves the page
    await open(page, '/tuner')                                // fetched once while online
    await open(page, '/')
    await context.setOffline(true)
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(page.locator('#view-title')).not.toBeEmpty()
    await page.evaluate(() => { location.hash = '#/tuner' })
    await expect(page.locator('#view-tuner, .tuner-strings-grid').first()).toBeVisible()
    await context.setOffline(false)
  })

  test('backup: export, change, import back', async ({ page }) => {
    await open(page, '/progress')
    await page.evaluate(() => { localStorage.setItem('jv_snapshots', JSON.stringify([{ id: 'a', label: 'Saved', date: '', state: { root: 'C', scaleName: 'Dorico (m7)' } }])) })
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('.pg-backup button').first().click()])
    const file = await download.path()
    await page.evaluate(() => localStorage.setItem('jv_snapshots', '[]'))
    await page.locator('.pg-backup input[type=file]').setInputFiles(file)
    await page.locator('.th-ok').click()
    await page.waitForEvent('load')
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('jv_snapshots'))[0].label)).toBe('Saved')
  })

  test('the screen stays on while the metronome plays', async ({ page }) => {
    await page.addInitScript(() => {
      window.__lock = { asked: 0, released: 0 }
      Object.defineProperty(navigator, 'wakeLock', { configurable: true, value: { request: async () => { window.__lock.asked++; return { release: async () => { window.__lock.released++ }, addEventListener() {} } } } })
    })
    await open(page, '/groove-trainer')
    const play = page.locator('.jd-tbtn--play').first()
    await play.click()
    await expect.poll(() => page.evaluate(() => window.__lock.asked)).toBe(1)
    await page.locator('.jd-tbtn--stop, .jd-tbtn--play').first().click()
    await expect.poll(() => page.evaluate(() => window.__lock.released)).toBe(1)
  })
})
