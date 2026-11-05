<template>
  <div class="pm">
    <div class="jd-modes pm-toggles" role="group" :aria-label="t('pm.group')">
      <label v-if="referenceLabel" class="jd-mode" :class="{ on: reference }" :title="referenceHelp">
        <input type="checkbox" :checked="reference" @change="$emit('update:reference', !reference)">
        <span class="jd-mode-dot" aria-hidden="true"></span>
        <span class="jd-mode-text">{{ t('pm.reference') }}: {{ referenceLabel }}</span>
      </label>
      <label v-if="showRetry" class="jd-mode" :class="{ on: retry }" :title="t('pm.retry-help')">
        <input type="checkbox" :checked="retry" @change="$emit('update:retry', !retry)">
        <span class="jd-mode-dot" aria-hidden="true"></span>
        <span class="jd-mode-text">{{ t('pm.retry') }}</span>
      </label>
    </div>
    <p v-if="reference && referenceHelp" class="pm-help">{{ referenceHelp }}</p>
    <p v-if="retry && showRetry" class="pm-help">{{ t('pm.retry-help') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from '../../composables/useI18n.js'

// The two practice options of the fretboard exercises: a reference (string, fret, shape…)
// given with each question, and "retry until right".
defineProps({
  reference:      { type: Boolean, default: false },
  retry:          { type: Boolean, default: false },
  referenceLabel: { type: String, default: '' },   // what the reference is in this exercise
  referenceHelp:  { type: String, default: '' },
  showRetry:      { type: Boolean, default: true },
})
defineEmits(['update:reference', 'update:retry'])

const { t } = useI18n()
</script>

<style scoped>
.pm {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.pm-toggles { justify-content: center; }
.pm-help {
  margin: 0;
  max-width: 62ch;
  text-align: center;
  font-family: var(--jd-mono);
  font-size: 11px;
  line-height: 1.6;
  color: var(--jd-muted);
}
</style>
