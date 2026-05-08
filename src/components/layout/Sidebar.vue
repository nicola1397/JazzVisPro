<template>
  <aside class="sidebar" :class="{ active: appStore.sidebarOpen }" id="sidebar-menu">
    <button class="nav-toggle d-lg-none" @click="appStore.closeSidebar()">✕</button>
    <div class="logo">JAZZ<span>VIZ</span> PRO</div>

    <SidebarGroup name="explore" :label="t('sg.explore')" :collapsed="false">
      <RouterLink class="nav-item" to="/explorer"        @click="appStore.closeSidebar()">Explorer</RouterLink>
      <RouterLink class="nav-item" to="/snapshots"       @click="appStore.closeSidebar()">Snapshots</RouterLink>
      <RouterLink class="nav-item" to="/chord-voicing"   @click="appStore.closeSidebar()">Chord Voicing</RouterLink>
      <RouterLink class="nav-item" to="/scale-navigator" @click="appStore.closeSidebar()">Scale Navigator</RouterLink>
      <RouterLink class="nav-item" to="/reharmonizer"    @click="appStore.closeSidebar()">Reharmonizer</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="tools" :label="t('sg.tools')" :collapsed="true">
      <RouterLink class="nav-item" to="/tuner"        @click="appStore.closeSidebar()">{{ t('nav.tuner') }}</RouterLink>
      <RouterLink class="nav-item" to="/lick-builder" @click="appStore.closeSidebar()">Lick Builder</RouterLink>
      <RouterLink class="nav-item" to="/chord-finder" @click="appStore.closeSidebar()">Chord Finder</RouterLink>
      <RouterLink class="nav-item" to="/transposer"   @click="appStore.closeSidebar()">{{ t('nav.transposer') }}</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="play" :label="t('sg.play')" :collapsed="true">
      <RouterLink class="nav-item" to="/player"     @click="appStore.closeSidebar()">Player</RouterLink>
      <RouterLink class="nav-item" to="/calculator" @click="appStore.closeSidebar()">Calculator</RouterLink>
      <RouterLink class="nav-item" to="/real-book"  @click="appStore.closeSidebar()">Real Book</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="training" :label="t('sg.training')" :collapsed="true">
      <RouterLink class="nav-item" to="/interval-learner"      @click="appStore.closeSidebar()">Interval Learner</RouterLink>
      <RouterLink class="nav-item" to="/grade-learner"         @click="appStore.closeSidebar()">Grade Learner</RouterLink>
      <RouterLink class="nav-item" to="/note-finder"           @click="appStore.closeSidebar()">Note Finder</RouterLink>
      <RouterLink class="nav-item" to="/ear-training"          @click="appStore.closeSidebar()">Ear Training</RouterLink>
      <RouterLink class="nav-item" to="/interval-ear-training" @click="appStore.closeSidebar()">Interval Ear Training</RouterLink>
      <RouterLink class="nav-item" to="/groove-trainer"        @click="appStore.closeSidebar()">Groove Trainer</RouterLink>
    </SidebarGroup>

    <SidebarGroup name="theory" :label="t('sg.theory')" :collapsed="true">
      <RouterLink class="nav-item" to="/teoria-generale" @click="appStore.closeSidebar()">{{ t('nav.teoria-generale') }}</RouterLink>
      <RouterLink class="nav-item" to="/teoria"          @click="appStore.closeSidebar()">{{ t('nav.teoria') }}</RouterLink>
    </SidebarGroup>

    <div class="sidebar-controls">
      <div class="nav-group">
        <label>{{ t('label.tuning') }}</label>
        <select :value="appStore.tuningName" @change="appStore.setTuningName($event.target.value)">
          <option v-for="name in tuningKeys" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>
      <div class="nav-group">
        <label>{{ t('label.key') }}</label>
        <select :value="appStore.root" @change="appStore.setRoot($event.target.value)">
          <option v-for="n in NOTES" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div class="nav-group">
        <label>{{ t('label.scale') }}</label>
        <select :value="appStore.scaleName" @change="appStore.setScaleName($event.target.value)">
          <option v-for="name in scaleKeys" :key="name" :value="name">{{ name }}</option>
        </select>
      </div>
      <div class="nav-group">
        <label>CAGED</label>
        <select :value="appStore.cagedShape" @change="appStore.setCagedShape($event.target.value)">
          <option value="none">{{ t('opt.none') }}</option>
          <option v-for="s in ['C','A','G','E','D']" :key="s" :value="s">{{ s }} Shape</option>
        </select>
      </div>
      <div class="checkbox-group">
        <div class="checkbox-container">
          <input type="checkbox" id="hide-unused" :checked="appStore.hideUnused"
            @change="appStore.hideUnused = $event.target.checked">
          <label for="hide-unused">{{ t('label.hide-outside') }}</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="solo-arpeggio" :checked="appStore.soloArp"
            @change="appStore.soloArp = $event.target.checked">
          <label for="solo-arpeggio" style="color:var(--accent)">{{ t('label.arpeggio') }}</label>
        </div>
      </div>
      <div class="checkbox-group">
        <div class="nav-group">
          <label>{{ t('label.notation') }}</label>
          <select :value="appStore.notation" @change="appStore.setNotation($event.target.value)">
            <option value="interval">{{ t('opt.intervals') }}</option>
            <option value="note">{{ t('opt.notes') }}</option>
          </select>
        </div>
        <div class="nav-group">
          <label>{{ t('label.accidentals') }}</label>
          <select :value="appStore.accidental" @change="appStore.setAccidental($event.target.value)">
            <option value="#">{{ t('opt.sharp') }}</option>
            <option value="b">{{ t('opt.flat') }}</option>
          </select>
        </div>
      </div>
      <button class="btn-reset" style="margin-top:10px;width:100%;" @click="appStore.resetFretboard()">
        {{ t('btn.reset-display') }}
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore }   from '../../stores/app.js'
import { useI18n }       from '../../composables/useI18n.js'
import { NOTES, SCALES, TUNINGS } from '../../utils/theory.js'
import SidebarGroup from './SidebarGroup.vue'

const appStore   = useAppStore()
const { t }      = useI18n()
const tuningKeys = computed(() => Object.keys(TUNINGS))
const scaleKeys  = computed(() => Object.keys(SCALES))
</script>
