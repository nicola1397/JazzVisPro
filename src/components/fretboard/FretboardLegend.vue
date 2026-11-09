<template>
  <div class="fb-legend">
    <!-- Normal / highlight: one swatch per interval lights it up on the neck.
         Custom: one swatch per note takes it in every position, plus all / none. -->
    <div class="controls" id="legend" :class="{ 'legend--custom': custom }" role="group"
      :aria-label="t(custom ? 'legend.custom-aria' : 'legend.aria')">
      <div
        v-for="(col, idx) in INTERVAL_COLORS" :key="idx"
        class="color-option" role="button" tabindex="0"
        :class="custom
          ? { selected: pitchState(+idx) === 'all', partial: pitchState(+idx) === 'some' }
          : { selected: appStore.highlightedIntervals.has(+idx) }"
        :aria-pressed="custom ? pitchState(+idx) === 'all' : appStore.highlightedIntervals.has(+idx)"
        :title="custom ? `${noteName(+idx)} · ${col.short}` : col.short"
        @click="pick(+idx)" @keydown.enter.prevent="pick(+idx)" @keydown.space.prevent="pick(+idx)"
      >
        <span class="label">{{ custom ? noteName(+idx) : col.short }}</span>
        <div class="swatch" :style="{ background: col.color }"></div>
        <span v-if="custom" class="legend-sub">{{ col.short }}</span>
      </div>

      <div v-if="custom" class="legend-bulk">
        <button type="button" class="jd-toolbtn" @click="appStore.selectAllCustom()">{{ t('legend.all') }}</button>
        <button type="button" class="jd-toolbtn" @click="appStore.invertCustom()">{{ t('legend.invert') }}</button>
        <button type="button" class="jd-toolbtn jd-toolbtn--reset" @click="appStore.clearCustomScale()">{{ t('legend.none') }}</button>
      </div>
    </div>

    <div id="explorer-help" class="fb-legend-help">
      {{ t(custom ? 'explorer.help-custom' : 'explorer.help') }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../../stores/app.js'
import { useI18n } from '../../composables/useI18n.js'
import { INTERVAL_COLORS } from '../../utils/theory.js'

const appStore = useAppStore()
const { t } = useI18n()

const custom = computed(() => appStore.explorerMode === 'custom')
// Swatches go by interval from the key; in custom mode each one stands for its note.
const pcOf = idx => (Number(appStore.rootIdx) + idx) % 12
const noteName = idx => appStore.currentNotes[pcOf(idx)]
const pitchState = idx => appStore.customPitchState[pcOf(idx)]

function pick(idx) {
  if (custom.value) appStore.toggleCustomPitch(pcOf(idx))
  else appStore.toggleHighlightInterval(idx)
}
</script>

<style scoped>
.fb-legend { display: flex; flex-direction: column; align-items: center; }
.fb-legend-help { text-align: center; font-size: 0.8em; color: #666; margin-bottom: 15px; padding: 0 12px; }
.color-option:focus-visible { outline: 2px solid var(--jd-amber); outline-offset: 1px; }
/* Some positions of the note taken, not all of them */
.color-option.partial { background: rgba(255, 255, 255, 0.05); outline: 1px dashed var(--jd-amber); }
.legend--custom .color-option .label { color: var(--jd-text); }
.legend-sub { margin-top: 3px; font-family: var(--jd-mono); font-size: 0.58em; color: var(--jd-muted); }
.legend-bulk { display: flex; align-items: center; gap: 8px; padding-left: 12px; margin-left: 4px; border-left: 1px solid var(--jd-line); }
@media (max-width: 600px) {
  /* Two even rows of six instead of eight and four */
  #legend { display: grid; grid-template-columns: repeat(6, auto); justify-content: center; column-gap: 6px; }
  .legend-bulk { grid-column: 1 / -1; }
  .legend-bulk { flex-basis: 100%; justify-content: center; padding: 8px 0 0; margin: 4px 0 0; border-left: 0; border-top: 1px solid var(--jd-line); }
}
</style>
