import { readFileSync } from 'node:fs'

// Every page without parameters, plus a few pages with them
export const ROUTES = readFileSync(new URL('../../src/router/index.js', import.meta.url), 'utf8')
  .match(/path: '([^']+)'/g).map(x => x.slice(7, -1))
  .filter(p => !p.includes(':') && p !== '/')
  .concat(['/percorso/notes/1', '/percorso/degrees/4', '/percorso/caged/2', '/lessons/naturals', '/chord-finder?mode=neck'])

// Errors that come from the network (fonts, offline CI) or the audio device, not from the app
export const IGNORED_ERRORS = /ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|ERR_INTERNET|fonts\.(googleapis|gstatic)|AudioContext/

export function collectErrors(page) {
  const errors = []
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`))
  page.on('console', m => { if (m.type() === 'error' && !IGNORED_ERRORS.test(m.text())) errors.push(`console: ${m.text()}`) })
  return errors
}

export async function open(page, path) {
  await page.goto('/#' + path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(250)
}

// Buttons that start an exercise, pressed so the running state is checked too
export const START = '.stage-hud .jd-tbtn--play, .gl-buttons .btn-add-step, .sp-start'
