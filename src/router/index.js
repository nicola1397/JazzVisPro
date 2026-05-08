import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',                    redirect: '/explorer' },
  { path: '/explorer',            component: () => import('../views/ExplorerView.vue'),            meta: { title:'title.explorer',    fretboard:true,  legend:true  } },
  { path: '/player',              component: () => import('../views/PlayerView.vue'),               meta: { title:'title.player',      fretboard:true,  legend:false } },
  { path: '/calculator',          component: () => import('../views/CalculatorView.vue'),           meta: { title:'title.calculator',  fretboard:false, legend:false } },
  { path: '/interval-learner',    component: () => import('../views/IntervalLearnerView.vue'),      meta: { title:'title.interval-learner', fretboard:true, legend:false, game:'interval' } },
  { path: '/grade-learner',       component: () => import('../views/GradeLearnerView.vue'),         meta: { title:'title.grade-learner',    fretboard:false,legend:false } },
  { path: '/note-finder',         component: () => import('../views/NoteFinderView.vue'),           meta: { title:'title.note-finder',      fretboard:true, legend:false, game:'note' } },
  { path: '/functional-harmony',  component: () => import('../views/FunctionalHarmonyView.vue'),  meta: { title:'fh.title',               fretboard:false,legend:false } },
  { path: '/ear-training',        component: () => import('../views/EarTrainingView.vue'),          meta: { title:'title.ear-training',     fretboard:false,legend:false } },
  { path: '/interval-ear-training', component: () => import('../views/IntervalEarTrainingView.vue'), meta: { title:'title.interval-ear-training', fretboard:false, legend:false } },
  { path: '/chord-voicing',       component: () => import('../views/ChordVoicingView.vue'),         meta: { title:'title.chord-voicing',    fretboard:false,legend:false } },
  { path: '/scale-navigator',     component: () => import('../views/ScaleNavigatorView.vue'),       meta: { title:'title.scale-navigator',  fretboard:false,legend:false } },
  { path: '/reharmonizer',        component: () => import('../views/ReharmonizerView.vue'),         meta: { title:'title.reharmonizer',     fretboard:false,legend:false } },
  { path: '/tuner',               component: () => import('../views/TunerView.vue'),                meta: { title:'title.tuner',            fretboard:false,legend:false } },
  { path: '/groove-trainer',      component: () => import('../views/GrooveTrainerView.vue'),        meta: { title:'title.groove-trainer',   fretboard:false,legend:false } },
  { path: '/lick-builder',        component: () => import('../views/LickBuilderView.vue'),          meta: { title:'title.lick-builder',     fretboard:true, legend:false, game:'lick' } },
  { path: '/chord-finder',        component: () => import('../views/ChordFinderView.vue'),          meta: { title:'title.chord-finder',     fretboard:false,legend:false } },
  { path: '/real-book',           component: () => import('../views/RealBookView.vue'),             meta: { title:'title.real-book',        fretboard:false,legend:false } },
  { path: '/transposer',          component: () => import('../views/TransposerView.vue'),           meta: { title:'title.transposer',       fretboard:false,legend:false } },
  { path: '/snapshots',           component: () => import('../views/SnapshotsView.vue'),            meta: { title:'title.snapshots',        fretboard:false,legend:false } },
  { path: '/teoria-generale',     component: () => import('../views/TheoryGeneralView.vue'),        meta: { title:'title.teoria-generale',  fretboard:false,legend:false } },
  { path: '/teoria',              component: () => import('../views/TheoryJazzView.vue'),            meta: { title:'title.teoria',           fretboard:false,legend:false } },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
