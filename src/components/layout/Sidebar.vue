<template>
  <aside class="sidebar" :class="{ active: appStore.sidebarOpen }" id="sidebar-menu">
    <button class="nav-toggle d-lg-none" @click="appStore.closeSidebar()">✕</button>
    <div class="logo">JAZZ<span>VIZ</span> PRO</div>

    <SidebarGroup name="explore" :label="t('sg.explore')" :collapsed="false">
      <RouterLink class="nav-item" to="/explorer"        @click="appStore.closeSidebar()">{{ t('nav.explorer') }}</RouterLink>
      <RouterLink class="nav-item" to="/snapshots"       @click="appStore.closeSidebar()">{{ t('nav.snapshots') }}</RouterLink>
      <RouterLink class="nav-item" to="/chord-voicing"   @click="appStore.closeSidebar()">{{ t('nav.chord-voicing') }}</RouterLink>
      <RouterLink class="nav-item" to="/scale-navigator" @click="appStore.closeSidebar()">{{ t('nav.scale-navigator') }}</RouterLink>
      <RouterLink class="nav-item" to="/reharmonizer"    @click="appStore.closeSidebar()">{{ t('nav.reharmonizer') }}</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="tools" :label="t('sg.tools')" :collapsed="true">
      <RouterLink class="nav-item" to="/tuner"        @click="appStore.closeSidebar()">{{ t('nav.tuner') }}</RouterLink>
      <RouterLink class="nav-item" to="/lick-builder" @click="appStore.closeSidebar()">{{ t('nav.lick-builder') }}</RouterLink>
      <RouterLink class="nav-item" to="/chord-finder" @click="appStore.closeSidebar()">{{ t('nav.chord-finder') }}</RouterLink>
      <RouterLink class="nav-item" to="/transposer"   @click="appStore.closeSidebar()">{{ t('nav.transposer') }}</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="play" :label="t('sg.play')" :collapsed="true">
      <RouterLink class="nav-item" to="/player"     @click="appStore.closeSidebar()">{{ t('nav.player') }}</RouterLink>
      <RouterLink class="nav-item" to="/calculator" @click="appStore.closeSidebar()">{{ t('nav.calculator') }}</RouterLink>
      <RouterLink class="nav-item" to="/real-book"  @click="appStore.closeSidebar()">{{ t('nav.real-book') }}</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="training" :label="t('sg.training')" :collapsed="true">
      <RouterLink class="nav-item" to="/interval-learner"      @click="appStore.closeSidebar()">{{ t('nav.interval-learner') }}</RouterLink>
      <RouterLink class="nav-item" to="/grade-learner"         @click="appStore.closeSidebar()">{{ t('nav.grade-learner') }}</RouterLink>
      <RouterLink class="nav-item" to="/note-finder"           @click="appStore.closeSidebar()">{{ t('nav.note-finder') }}</RouterLink>
      <RouterLink class="nav-item" to="/quiz"                  @click="appStore.closeSidebar()">{{ t('nav.quiz') }}</RouterLink>
      <RouterLink class="nav-item" to="/functional-harmony"    @click="appStore.closeSidebar()">{{ t('nav.functional-harmony') }}</RouterLink>
      <RouterLink class="nav-item" to="/ear-training"          @click="appStore.closeSidebar()">{{ t('nav.ear-training') }}</RouterLink>

      <RouterLink class="nav-item" to="/interval-ear-training" @click="appStore.closeSidebar()">{{ t('nav.interval-ear-training') }}</RouterLink>
      <RouterLink class="nav-item" to="/groove-trainer"        @click="appStore.closeSidebar()">{{ t('nav.groove-trainer') }}</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="theory" :label="t('sg.theory')" :collapsed="true">
      <RouterLink class="nav-item" to="/teoria-generale" @click="appStore.closeSidebar()">{{ t('nav.teoria-generale') }}</RouterLink>
      <RouterLink class="nav-item" to="/teoria"          @click="appStore.closeSidebar()">{{ t('nav.teoria') }}</RouterLink>
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

const appStore   = useAppStore()
const { t }      = useI18n()
</script>
