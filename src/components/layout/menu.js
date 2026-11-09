// The app's menu: groups from everyday use down to study, used by the sidebar, the Today
// page and quick search. `label` is a translation key; `open` is the group's state on a first
// visit (then each group remembers how it was left).
export const MENU_GROUPS = [
  { name: 'tools', label: 'sg.tools', open: true, items: [
    { to: '/tuner',          label: 'nav.tuner' },
    { to: '/groove-trainer', label: 'nav.groove-trainer' },
    { to: '/chord-finder',   label: 'nav.chord-finder' },
    { to: '/transposer',     label: 'nav.transposer' },
    { to: '/transcribe',     label: 'nav.transcribe' },
  ] },
  { name: 'play', label: 'sg.play', open: true, items: [
    { to: '/player',       label: 'nav.player' },
    { to: '/real-book',    label: 'nav.real-book' },
    { to: '/calculator',   label: 'nav.calculator' },
    { to: '/lick-builder', label: 'nav.lick-builder' },
  ] },
  { name: 'explore', label: 'sg.explore', open: true, items: [
    { to: '/explorer',        label: 'nav.explorer' },
    { to: '/scale-navigator', label: 'nav.scale-navigator' },
    { to: '/chord-voicing',   label: 'nav.chord-voicing' },
    { to: '/reharmonizer',    label: 'nav.reharmonizer' },
    { to: '/snapshots',       label: 'nav.snapshots' },
  ] },
  { name: 'learn', label: 'sg.learn', open: false, items: [
    { sub: 'sg.lessons' },
    { to: '/lessons', label: 'nav.lessons', prefix: '/lessons' },
    { sub: 'sg.course' },
    { to: '/percorso', label: 'nav.course', exact: true },
    { course: true },
  ] },
  { name: 'training', label: 'sg.training', open: false, items: [
    { to: '/progress', label: 'nav.progress' },
    { sub: 'nsub.fretboard' },
    { to: '/note-finder',      label: 'nav.note-finder' },
    { to: '/interval-learner', label: 'nav.interval-learner' },
    { to: '/grade-learner',    label: 'nav.grade-learner' },
    { to: '/triad-trainer',    label: 'nav.triad-trainer' },
    { to: '/seventh-trainer',  label: 'nav.seventh-trainer' },
    { to: '/scale-tempo',      label: 'nav.scale-tempo' },
    { to: '/changes-trainer',  label: 'nav.changes-trainer' },
    { sub: 'nsub.ear' },
    { to: '/interval-ear-training', label: 'nav.interval-ear-training' },
    { to: '/ear-training',          label: 'nav.ear-training' },
    { to: '/ear-playback',          label: 'nav.ear-playback' },
    { sub: 'nsub.harmony' },
    { to: '/functional-harmony', label: 'nav.functional-harmony' },
    { to: '/quiz',               label: 'nav.quiz' },
  ] },
  { name: 'theory', label: 'sg.theory', open: false, items: [
    { to: '/teoria-generale', label: 'nav.teoria-generale' },
    { to: '/teoria-chitarra', label: 'nav.teoria-chitarra' },
    { to: '/teoria',          label: 'nav.teoria' },
  ] },
]


// Every page of the menu once, with its group: [{ to, label, group }]
export const MENU_PAGES = MENU_GROUPS.flatMap(g => g.items.filter(e => e.to).map(e => ({ to: e.to, label: e.label, group: g.label })))

// Menu label of a path ('/note-finder' → 'nav.note-finder'), or null
export function menuLabelFor(path) {
  return MENU_PAGES.find(p => p.to === path)?.label ?? null
}
