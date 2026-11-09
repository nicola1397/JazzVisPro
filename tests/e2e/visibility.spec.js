// On every exercise the question and the place where you answer (fretboard, circle,
// buttons…) fit on screen together once the question is scrolled to the top.
import { test, expect } from '@playwright/test'
import { open } from './helpers.js'

const EXERCISES = [
  { path: '/note-finder', start: '.jd-tbtn--play', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/interval-learner', start: '.jd-tbtn--play', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/triad-trainer', start: '.jd-tbtn--play', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/seventh-trainer', start: '.jd-tbtn--play', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/ear-playback', start: '.jd-tbtn--play', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/scale-tempo', prompt: '.jd-question-text', answer: '.fretboard-container' },
  { path: '/changes-trainer', prompt: '.ch-now', answer: '.fretboard-container' },
  { path: '/grade-learner', start: '.btn-add-step', prompt: '.jd-improv-banner', answer: '.circle-container' },
  { path: '/ear-training', start: '.jd-tbtn--play', prompt: '.jd-question-box', answer: '.jd-choices-grid' },
  { path: '/interval-ear-training', start: '.jd-tbtn--play', prompt: '.jd-question-box', answer: '.jd-choices-grid' },
  { path: '/functional-harmony', start: '.fh-actions .jd-toolbtn', prompt: '.fh-prog', answer: '.fh-grid' },
  { path: '/lessons/naturals', start: '.ls-step--mirror', prompt: '.ls-status, .ls-dots', answer: '.fretboard-container' },
  { path: '/percorso/notes/2', prompt: '.ct .ct-prompt', answer: '.ct .nd-svg' },
]

for (const ex of EXERCISES) {
  test(ex.path, async ({ page }) => {
    await open(page, ex.path)
    if (ex.start) {
      const btn = page.locator(ex.start).first()
      if (await btn.count() && await btn.isVisible()) { await btn.click().catch(() => {}); await page.waitForTimeout(600) }
    }
    const res = await page.evaluate(({ prompt, answer }) => {
      const pick = sel => [...document.querySelectorAll(sel)].find(e => e.offsetParent !== null && e.getBoundingClientRect().height > 0)
      const pe = pick(prompt), ae = pick(answer)
      if (!pe || !ae) return { missing: !pe ? 'prompt' : 'answer' }
      const nav = document.querySelector('.navbar')?.getBoundingClientRect().height || 0
      const pr = pe.getBoundingClientRect(), ar = ae.getBoundingClientRect()
      document.querySelector('.main-content').scrollBy(0, Math.min(pr.top, ar.top) - nav - 4)
      const vis = r => Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, nav)) / Math.max(1, r.height)
      return { prompt: Math.round(vis(pe.getBoundingClientRect()) * 100), answer: Math.round(vis(ae.getBoundingClientRect()) * 100) }
    }, ex)
    expect(res.missing).toBeUndefined()
    expect(res.prompt, 'question visible %').toBeGreaterThanOrEqual(99)
    expect(res.answer, 'answer area visible %').toBeGreaterThanOrEqual(99)
  })
}
