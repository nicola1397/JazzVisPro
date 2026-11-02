<template>
  <div class="gi-panel">
    <div class="jd-modes gi-toggles">
      <label class="jd-mode jd-mode--improv" :class="{ on: guitar.enabled }">
        <input type="checkbox" :checked="guitar.enabled" @change="guitar.toggle()">
        <span class="jd-mode-dot" aria-hidden="true"></span>
        <span class="jd-mode-text">🎸 {{ t('gi.toggle') }}</span>
      </label>
      <label v-if="guitar.enabled" class="jd-mode" :class="{ on: guitar.autoNext }">
        <input type="checkbox" :checked="guitar.autoNext" @change="guitar.toggleAutoNext()">
        <span class="jd-mode-dot" aria-hidden="true"></span>
        <span class="jd-mode-text">{{ t('gi.auto-next') }}</span>
      </label>
    </div>

    <div v-if="guitar.enabled" class="gi-live">
      <select
        v-if="guitar.devices.length > 1"
        class="jd-feel-select gi-device"
        :value="guitar.deviceId"
        :aria-label="t('gi.input')"
        @change="guitar.setDevice($event.target.value)"
      >
        <option value="">{{ t('gi.default-input') }}</option>
        <option v-for="d in guitar.devices" :key="d.id" :value="d.id">{{ d.label }}</option>
      </select>
      <div class="gi-meter" :title="t('gi.level')" aria-hidden="true">
        <div class="gi-meter-fill" :style="{ width: meterWidth }"></div>
      </div>
      <span class="gi-note" aria-live="polite">{{ liveNoteLabel }}</span>
    </div>

    <div v-if="guitar.enabled" class="gi-status">{{ statusLabel }}</div>
    <div v-else-if="guitar.error" class="gi-status gi-status--error">{{ errorLabel }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../../stores/app.js'
import { useI18n } from '../../composables/useI18n.js'
import { midiToName } from '../../composables/useGuitarInput.js'

const props = defineProps({
  guitar: { type: Object, required: true },
})

const appStore = useAppStore()
const { t } = useI18n()

const meterWidth = computed(() => {
  const lvl = props.guitar.level
  if (!lvl) return '0%'
  const db = 20 * Math.log10(lvl)
  return `${Math.max(0, Math.min(100, ((db + 60) / 60) * 100))}%`
})

const liveNoteLabel = computed(() =>
  props.guitar.liveMidi === null ? '–' : midiToName(props.guitar.liveMidi, appStore.currentNotes))

const statusLabel = computed(() => {
  if (props.guitar.suspended) return t('gi.resume')
  if (!props.guitar.listening) return t('gi.starting')
  return t('gi.listening')
})

const errorLabel = computed(() => t(`gi.err-${props.guitar.error}`))
</script>

<style scoped>
.gi-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
}

.gi-toggles {
  justify-content: center;
}

.gi-live {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.gi-device {
  max-width: 220px;
}

.gi-meter {
  width: 120px;
  height: 6px;
  border-radius: 3px;
  background: #060604;
  border: 1px solid #2a2620;
  overflow: hidden;
}

.gi-meter-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--jd-green) 0%, var(--jd-amber) 75%, var(--jd-red) 100%);
  background-size: 120px 100%;
  transition: width 0.06s linear;
}

.gi-note {
  min-width: 44px;
  font-family: var(--jd-mono);
  font-size: 16px;
  font-weight: 800;
  color: var(--jd-improv);
  text-align: center;
}

.gi-status {
  font-family: var(--jd-mono);
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--jd-muted);
  text-align: center;
}

.gi-status--error {
  color: var(--jd-red);
  text-transform: none;
  letter-spacing: 0.5px;
  font-size: 11px;
}
</style>
