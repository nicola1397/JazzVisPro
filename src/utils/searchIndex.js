// Everything quick search can find: menu pages, guided-path modules and steps, fretboard
// lessons and theory chapters. Built in the current language.
import { MENU_PAGES } from '../components/layout/menu.js'
import { COURSE } from '../course/index.js'
import { LESSONS } from './fretboardLessons.js'
import { JAZZ_LESSONS } from './jazzLessons.js'

const THEORY = [
  { to: '/teoria-generale', nav: 'nav.teoria-generale', keys: Array.from({ length: 7 }, (_, i) => `th.gen${i + 1}`) },
  { to: '/teoria', nav: 'nav.teoria', keys: [...Array.from({ length: 8 }, (_, i) => `th.jazz${i + 1}`), ...JAZZ_LESSONS.map(l => l.titleKey)] },
  { to: '/teoria-chitarra', nav: 'nav.teoria-chitarra', keys: Array.from({ length: 15 }, (_, i) => `th.guit${i + 1}`) },
]

// kind: 'page' | 'course' | 'step' | 'lesson' | 'theory'
export function buildSearchIndex(t, lang) {
  const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang] ?? x.it))
  const out = [{ kind: 'page', title: t('nav.home'), sub: '', to: '/' }]
  for (const p of MENU_PAGES) out.push({ kind: 'page', title: t(p.label), sub: t(p.group), to: p.to })
  COURSE.forEach((m, mi) => {
    out.push({ kind: 'course', title: L(m.title), sub: `${t('cr.title')} · ${mi + 1}`, to: `/percorso/${m.id}` })
    m.steps.forEach((st, si) => out.push({ kind: 'step', title: L(st.title), sub: `${L(m.title)} · ${si + 1}`, to: `/percorso/${m.id}/${si + 1}` }))
  })
  for (const l of LESSONS) out.push({ kind: 'lesson', title: L(l.title), sub: t('nav.lessons'), to: `/lessons/${l.id}` })
  for (const th of THEORY) th.keys.forEach((k, i) => out.push({ kind: 'theory', title: t(k).replace(/^\d+\.\s*/, ''), sub: t(th.nav), to: `${th.to}?open=${i}` }))
  return out.map(x => ({ ...x, norm: normalize(x.title), normSub: normalize(x.sub) }))
}

export function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9#♯♭]+/g, ' ').trim()
}

// Every word of the query must appear in the title or in the line below it; titles that
// start with the query, or words that start with it, come first.
export function search(index, query, limit = 30) {
  const q = normalize(query)
  if (!q) return []
  const words = q.split(' ')
  const KIND = { page: 0, course: 1, lesson: 2, step: 3, theory: 4 }
  return index
    .map(x => {
      const hay = `${x.norm} ${x.normSub}`
      if (!words.every(w => hay.includes(w))) return null
      let score = 0
      if (x.norm.startsWith(q)) score += 50
      else if (x.norm.includes(q)) score += 25
      for (const w of words) {
        if (new RegExp(`(^| )${w.replace(/[#]/g, '\\$&')}`).test(x.norm)) score += 10
        else if (x.norm.includes(w)) score += 4
      }
      return { ...x, score: score - KIND[x.kind] }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}
