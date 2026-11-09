<template>
  <aside class="sidebar" :class="{ active: appStore.sidebarOpen }" id="sidebar-menu">
    <button class="nav-toggle d-lg-none" @click="appStore.closeSidebar()">✕</button>
    <div class="logo">JAZZ<span>VIZ</span> PRO</div>

    <SidebarGroup v-for="g in GROUPS" :key="g.name" :name="g.name" :label="t(g.label)" :collapsed="!g.open">
      <template v-for="(e, k) in g.items" :key="k">
        <div v-if="e.sub" class="nav-sub">{{ t(e.sub) }}</div>
        <template v-else-if="e.course">
          <RouterLink
            v-for="(m, i) in COURSE" :key="m.id" class="nav-item nav-item--course"
            :to="`/percorso/${m.id}`" @click="appStore.closeSidebar()"
            :class="{ 'router-link-active': $route.path.startsWith('/percorso/') && $route.params.module === m.id }"
          ><span class="nav-course-num">{{ i + 1 }}</span>{{ m.title[appStore.lang] ?? m.title.it }}</RouterLink>
        </template>
        <RouterLink
          v-else class="nav-item" :to="e.to"
          v-bind="e.exact ? { 'exact-active-class': 'router-link-exact-active', 'active-class': '' } : {}"
          :class="{ 'router-link-active': e.prefix && $route.path.startsWith(e.prefix) }"
          @click="appStore.closeSidebar()"
        >{{ t(e.label) }}</RouterLink>
      </template>
    </SidebarGroup>

    <div class="sidebar-controls">
      <FretboardControls id="sidebar" />
    </div>
  </aside>
</template>

<script setup>
import { useAppStore }   from '../../stores/app.js'
import { useI18n }       from '../../composables/useI18n.js'
import SidebarGroup from './SidebarGroup.vue'
import FretboardControls from '../fretboard/FretboardControls.vue'
import { COURSE } from '../../course/index.js'

const appStore   = useAppStore()
const { t }      = useI18n()

// From everyday use down to study: tools you grab while playing, playing along, looking
// things up, then lessons, exercises and reading. `open` is only the first-visit state:
// the groups remember how they were left, and the one holding the open page always opens.
const GROUPS = [
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
</script>

<style scoped>
.nav-course-num {
  display: inline-block; min-width: 1.4em; margin-right: 6px;
  font-family: var(--jd-mono); font-size: 0.85em; color: var(--jd-muted);
}
.router-link-active .nav-course-num { color: var(--accent); }

/* Small caption that splits a long group (Allenamento: fretboard / ear / harmony) */
.nav-sub {
  padding: 10px 22px 3px 25px;
  font-family: var(--jd-display);
  font-style: italic;
  font-size: 13px;
  color: var(--jd-muted);
  user-select: none;
}
</style>
