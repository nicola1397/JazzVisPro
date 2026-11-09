// On every page and screen size: no controls touching or overlapping, no text cut off or
// spilling out of its box, no tap target under 28 px on touch screens.
import { test, expect } from '@playwright/test'
import { ROUTES, open, START } from './helpers.js'

function lint(touch) {
  const main = document.querySelector('.main-content')
  const vis = el => {
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.05) return false
    const r = el.getBoundingClientRect()
    return r.width > 4 && r.height > 4
  }
  const name = el => {
    const c = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] : ''
    const txt = (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 18)
    return `${el.tagName.toLowerCase()}${c ? '.' + c : ''}${txt ? '"' + txt + '"' : ''}`
  }
  const SEL = 'button, a.jd-toolbtn, label.jd-mode, .jd-mode, select, input[type=text], input[type=number], textarea, .jd-score-badge, .jd-bpm-frame, .cs-key, .cf-tab, .cq-opt, .sp-level, .ls-step, .cv-rail-step, .nd-seg, .cf-played-note, .sp-missed-item'
  const skip = el => el.closest('.fretboard-layer, .nd-svg, .sp-piano, .note-circle-board, .nd-seg, .cf-modes, .jd-pitch-keys, .pill-group, svg')
  const boxes = [...document.querySelectorAll(SEL)]
    .filter(el => main.contains(el) && vis(el) && !el.closest('[aria-hidden="true"]') && (!skip(el) || el.matches('.nd-seg')))
    .map(el => ({ el, r: el.getBoundingClientRect() }))
  const out = []
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const A = boxes[i], B = boxes[j]
    if (A.el.contains(B.el) || B.el.contains(A.el)) continue
    const a = A.r, c = B.r
    const hGap = Math.max(c.left - a.right, a.left - c.right)
    const vGap = Math.max(c.top - a.bottom, a.top - c.bottom)
    const sameRow = Math.min(a.bottom, c.bottom) - Math.max(a.top, c.top) > 2
    const sameCol = Math.min(a.right, c.right) - Math.max(a.left, c.left) > 2
    if (sameRow && sameCol) out.push(`overlap ${name(A.el)} × ${name(B.el)}`)
    else if (sameRow && hGap < 4) out.push(`touch ${name(A.el)} | ${name(B.el)}`)
    else if (sameCol && vGap < 4) out.push(`touch ${name(A.el)} / ${name(B.el)}`)
  }
  for (const el of main.querySelectorAll('button, a, label, span, div, p, h1, h2, strong, th, td')) {
    if (!vis(el) || skip(el)) continue
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue
    const cs = getComputedStyle(el)
    if (cs.textOverflow !== 'ellipsis' && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0 &&
        (cs.overflowX !== 'visible' || el.matches('button, a, select, .jd-mode, .cq-opt'))) out.push(`cut text ${name(el)}`)
  }
  if (touch) for (const { el, r } of boxes) {
    if (!el.matches('button, a.jd-toolbtn, label.jd-mode, select, .cs-key, .cf-tab, .cq-opt, .cv-rail-step, .ls-step') || el.matches('.jd-switch')) continue
    if (r.height < 28 || r.width < 28) out.push(`small ${name(el)} ${Math.round(r.width)}x${Math.round(r.height)}`)
  }
  return [...new Set(out)]
}

test.describe('layout', () => {
  for (const path of ROUTES) {
    test(path, async ({ page }, info) => {
      await open(page, path)
      const start = page.locator(START).first()
      if (await start.count() && await start.isVisible()) { await start.click().catch(() => {}); await page.waitForTimeout(400) }
      expect(await page.evaluate(lint, info.project.name !== 'desktop')).toEqual([])
    })
  }
})

test('explorer in custom mode', async ({ page }, info) => {
  await open(page, '/explorer')
  await page.locator('.jd-mode', { hasText: /personalizzato|custom/i }).click()
  for (const i of [0, 4, 7]) await page.locator('#legend .color-option').nth(i).click()
  expect(await page.evaluate(lint, info.project.name !== 'desktop')).toEqual([])
})
