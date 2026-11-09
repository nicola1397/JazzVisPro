<template>
  <div class="th-stack" aria-live="polite" aria-atomic="false">
    <TransitionGroup name="th">
      <div v-for="x in toastState.toasts" :key="x.id" class="th-toast" :class="`th-toast--${x.type}`" role="status">
        <span class="th-dot" aria-hidden="true"></span>
        <span class="th-msg">{{ x.message }}</span>
        <button type="button" class="th-close" :aria-label="t('label.close')" @click="dismissToast(x.id)">✕</button>
      </div>
    </TransitionGroup>
  </div>

  <Transition name="th-fade">
    <div v-if="toastState.confirm" class="th-backdrop" @click.self="answer(false)">
      <div class="th-dialog" role="alertdialog" aria-modal="true" :aria-label="toastState.confirm.message" @keydown.esc="answer(false)">
        <p class="th-question">{{ toastState.confirm.message }}</p>
        <div class="th-actions">
          <button type="button" class="jd-toolbtn" @click="answer(false)">{{ toastState.confirm.cancelLabel || t('btn.cancel') }}</button>
          <button ref="okBtn" type="button" class="jd-toolbtn th-ok" :class="{ 'th-ok--danger': toastState.confirm.danger }" @click="answer(true)">
            {{ toastState.confirm.confirmLabel || t('btn.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { toastState, dismissToast } from '../../composables/useToast.js'
import { useI18n } from '../../composables/useI18n.js'

const { t } = useI18n()
const okBtn = ref(null)
let lastFocus = null

// Focus goes to the confirm button and back where it was when the dialog closes
watch(() => toastState.confirm, (now, before) => {
  if (now && !before) { lastFocus = document.activeElement; nextTick(() => okBtn.value?.focus()) }
  if (!now && before) lastFocus?.focus?.()
})

function answer(v) { toastState.confirm?.resolve(v) }
</script>

<style scoped>
.th-stack {
  position: fixed; left: 50%; bottom: max(18px, env(safe-area-inset-bottom)); transform: translateX(-50%);
  z-index: 2000; display: flex; flex-direction: column; gap: 8px; align-items: center;
  width: min(92vw, 460px); pointer-events: none;
}
.th-toast {
  pointer-events: auto; display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 10px 10px 10px 14px; border-radius: 12px;
  background: rgba(22, 20, 17, 0.97); border: 1px solid var(--jd-line-strong);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.55);
  font-family: var(--jd-mono); font-size: 12px; line-height: 1.45; color: var(--jd-text);
}
.th-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; background: var(--jd-amber); }
.th-toast--success .th-dot { background: var(--jd-green); }
.th-toast--error { border-color: rgba(255, 69, 58, 0.5); }
.th-toast--error .th-dot { background: var(--jd-red); }
.th-msg { flex: 1; }
.th-close {
  flex-shrink: 0; width: 28px; height: 28px; min-height: 0; padding: 0; border-radius: 8px;
  background: transparent; border: 1px solid transparent; color: var(--jd-muted); cursor: pointer;
}
.th-close:hover { color: var(--jd-text); border-color: var(--jd-line-strong); }
.th-enter-active, .th-leave-active { transition: all 0.22s ease; }
.th-enter-from, .th-leave-to { opacity: 0; transform: translateY(10px); }

.th-backdrop {
  position: fixed; inset: 0; z-index: 2100; display: flex; align-items: center; justify-content: center;
  padding: 16px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(3px);
}
.th-dialog {
  width: min(100%, 420px); padding: 22px 22px 18px; border-radius: 16px;
  background: var(--jd-surface, #161411); border: 1px solid var(--jd-line-strong);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
}
.th-question { margin: 0 0 18px; color: var(--jd-text); font-size: 0.95em; line-height: 1.55; }
.th-actions { display: flex; justify-content: flex-end; gap: 10px; flex-wrap: wrap; }
.th-ok { color: var(--jd-amber); border-color: rgba(255, 214, 10, 0.5); }
.th-ok--danger { color: var(--jd-red); border-color: rgba(255, 69, 58, 0.5); }
.th-fade-enter-active, .th-fade-leave-active { transition: opacity 0.18s ease; }
.th-fade-enter-from, .th-fade-leave-to { opacity: 0; }
</style>
