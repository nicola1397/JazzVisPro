<template>
  <aside class="sidebar" :class="{ active: appStore.sidebarOpen }" id="sidebar-menu">
    <button class="nav-toggle d-lg-none" @click="appStore.closeSidebar()">✕</button>
    <div class="logo">JAZZ<span>VIZ</span> PRO</div>

    <RouterLink class="nav-item nav-item--home" to="/" exact-active-class="router-link-exact-active" active-class="" @click="appStore.closeSidebar()">{{ t('nav.home') }}</RouterLink>

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
import { MENU_GROUPS as GROUPS } from './menu.js'

const appStore   = useAppStore()
const { t }      = useI18n()

// Menu content (groups, order, labels) lives in menu.js, shared with Today and search
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
