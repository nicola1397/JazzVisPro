<template>
  <!-- Tablets and phones (no sidebar): key, scale and tuning under the neck, with the
       fretboard settings one tap away in a bottom sheet -->
  <div class="ksc">
    <button type="button" class="ksc-chip" aria-haspopup="dialog" :aria-expanded="open" @click="open = true">
      <span class="ksc-key">{{ NOTES[appStore.rootIdx] ?? appStore.root }}</span>
      <span class="ksc-scale">{{ appStore.scaleName }}</span>
      <span class="ksc-tuning">{{ appStore.tuningName }}</span>
      <span class="ksc-edit">{{ t('ksc.change') }}</span>
    </button>

    <Teleport to="body">
      <Transition name="ksc-sheet">
        <div v-if="open" class="ksc-backdrop" @click.self="open = false" @keydown.esc="open = false">
          <div class="ksc-panel" role="dialog" aria-modal="true" :aria-label="t('ksc.title')">
            <div class="ksc-head">
              <span class="ksc-title">{{ t('ksc.title') }}</span>
              <button ref="closeBtn" type="button" class="jd-toolbtn" @click="open = false">{{ t('ksc.done') }}</button>
            </div>
            <FretboardControls id="sheet" />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useAppStore } from '../../stores/app.js'
import { useI18n } from '../../composables/useI18n.js'
import { NOTES } from '../../utils/theory.js'
import FretboardControls from './FretboardControls.vue'

const appStore = useAppStore()
const { t } = useI18n()
const open = ref(false)
const closeBtn = ref(null)
watch(open, v => { if (v) nextTick(() => closeBtn.value?.focus()) })
</script>

<style scoped>
.ksc { display: none; justify-content: center; margin: 2px 0 14px; position: relative; z-index: 1; }
@media (max-width: 1024px) { .ksc { display: flex; } }
.ksc-chip {
  display: inline-flex; align-items: center; gap: 10px; max-width: 100%; min-height: 40px; height: auto; padding: 6px 8px 6px 14px;
  border-radius: 999px; border: 1px solid var(--jd-line-strong); background: var(--jd-surface);
  font-family: var(--jd-mono); font-size: 12px; color: var(--jd-text-soft); cursor: pointer;
}
.ksc-key { font-family: var(--jd-display); font-style: italic; font-size: 1.5em; line-height: 1; color: var(--jd-amber); }
.ksc-scale { color: var(--jd-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
.ksc-tuning { color: var(--jd-muted); white-space: nowrap; }
.ksc-edit {
  flex-shrink: 0; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(255, 214, 10, 0.4);
  color: var(--jd-amber); font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
}
@media (max-width: 420px) { .ksc-tuning { display: none; } }

.ksc-backdrop {
  position: fixed; inset: 0; z-index: 2150; display: flex; align-items: flex-end; justify-content: center;
  background: rgba(0, 0, 0, 0.55);
}
.ksc-panel {
  width: min(100%, 560px); max-height: 85vh; overflow-y: auto; padding: 14px 18px calc(18px + env(safe-area-inset-bottom));
  border-radius: 18px 18px 0 0; background: var(--jd-bg, #0f0e0c); border: 1px solid var(--jd-line-strong); border-bottom: 0;
  box-shadow: 0 -18px 50px rgba(0, 0, 0, 0.6);
}
.ksc-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.ksc-title { font-family: var(--jd-mono); font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-amber); }
.ksc-sheet-enter-active, .ksc-sheet-leave-active { transition: opacity 0.2s ease; }
.ksc-sheet-enter-active .ksc-panel, .ksc-sheet-leave-active .ksc-panel { transition: transform 0.22s ease; }
.ksc-sheet-enter-from, .ksc-sheet-leave-to { opacity: 0; }
.ksc-sheet-enter-from .ksc-panel, .ksc-sheet-leave-to .ksc-panel { transform: translateY(40px); }
</style>
