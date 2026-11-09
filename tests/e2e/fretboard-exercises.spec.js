// Every exercise answered on the main fretboard: a click is checked and drawn on the neck
// (a coloured circle at the clicked place or the answer revealed), the message changes,
// and nothing throws.
import { test, expect } from '@playwright/test'
import { open, collectErrors } from './helpers.js'

const EXERCISES = [
  { path: '/note-finder', start: '.stage-hud .jd-tbtn--play' },
  { path: '/interval-learner', start: '.stage-hud .jd-tbtn--play' },
  { path: '/triad-trainer', start: '.stage-hud .jd-tbtn--play' },
  { path: '/seventh-trainer', start: '.stage-hud .jd-tbtn--play' },
  { path: '/ear-playback', start: '.stage-hud .jd-tbtn--play' },
  { path: '/lessons/naturals', start: null },
  { path: '/lick-builder', start: null },
]

const painted = page => page.evaluate(() => [...document.querySelectorAll('.fretboard-layer .note-circle')]
  .filter(c => getComputedStyle(c).opacity > 0.5).length)

for (const ex of EXERCISES) {
  test(ex.path, async ({ page }) => {
    const errors = collectErrors(page)
    await open(page, ex.path)
    if (ex.start) { await page.locator(ex.start).first().click(); await page.waitForTimeout(500) }
    const before = await painted(page)
    const text = async () => (await page.locator('.main-content').innerText()).replace(/\s+/g, ' ')
    const t0 = await text()
    // click three different places, so at least one is checked whatever the question
    for (const [s, f] of [[5, 3], [2, 7], [0, 1]]) {
      await page.locator(`.string.s${s + 1} .fret.fret-${f}`).click({ position: { x: 3, y: 3 } })
      await page.waitForTimeout(250)
    }
    if (ex.path === '/lick-builder') {
      await expect(page.locator('.lb-note-pill')).toHaveCount(3)          // the lick records the notes
    } else {
      expect(await painted(page), 'something drawn on the neck').toBeGreaterThan(before)
      expect(await text(), 'message changed').not.toBe(t0)
    }
    expect(errors).toEqual([])
  })
}
