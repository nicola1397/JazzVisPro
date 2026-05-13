<template>
  <div class="fretboard-controls-component">
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
      <label>{{ t('label.caged-shape') }}</label>
      <select :value="appStore.cagedShape" @change="appStore.setCagedShape($event.target.value)">
        <option value="none">{{ t('opt.none') }}</option>
        <option v-for="s in ['C','A','G','E','D']" :key="s" :value="s">{{ s }} {{ t('label.shape') }}</option>
      </select>
    </div>
    <div class="checkbox-group">
      <div class="checkbox-container">
        <input type="checkbox" :id="'hide-unused-'+id" :checked="appStore.hideUnused"
          @change="appStore.hideUnused = $event.target.checked">
        <label :for="'hide-unused-'+id">{{ t('label.hide-outside') }}</label>
      </div>
      <div class="checkbox-container">
        <input type="checkbox" :id="'solo-arpeggio-'+id" :checked="appStore.soloArp"
          @change="appStore.soloArp = $event.target.checked">
        <label :for="'solo-arpeggio-'+id" style="color:var(--accent)">{{ t('label.arpeggio') }}</label>
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
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore }   from '../../stores/app.js'
import { useI18n }       from '../../composables/useI18n.js'
import { NOTES, SCALES, TUNINGS } from '../../utils/theory.js'

const props = defineProps({
  id: { type: String, default: 'default' }
})

const appStore   = useAppStore()
const { t }      = useI18n()
const tuningKeys = computed(() => Object.keys(TUNINGS))
const scaleKeys  = computed(() => Object.keys(SCALES))
</script>

<style scoped>
.fretboard-controls-component {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
