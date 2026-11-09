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
    await expect(page.locator('.jd-mode.on')).toContainText(/personalizzato|custom/i)
    expect(await page.locator('.note-circle.active-note').count()).toBe(12)
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
