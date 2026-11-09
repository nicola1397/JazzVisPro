import { reactive } from 'vue'

// In-app notices and confirmations, in the app's own style (they replace the browser's
// alert() and confirm() boxes). Rendered by components/shared/ToastHost.vue.
export const toastState = reactive({ toasts: [], confirm: null })
let nextId = 1

// type: 'info' | 'success' | 'error'; action: { label, run } adds a button (e.g. Undo)
export function toast(message, { type = 'info', timeout = 4000, action = null } = {}) {
  const id = nextId++
  toastState.toasts.push({ id, message, type, action })
  if (timeout) setTimeout(() => dismissToast(id), timeout)
  return id
}

export function dismissToast(id) {
  const i = toastState.toasts.findIndex(x => x.id === id)
  if (i >= 0) toastState.toasts.splice(i, 1)
}

// Resolves true when confirmed, false when cancelled (button, Esc or click outside).
export function confirmDialog({ message, confirmLabel, cancelLabel, danger = false }) {
  if (toastState.confirm) toastState.confirm.resolve(false)
  return new Promise(resolve => {
    toastState.confirm = {
      message, confirmLabel, cancelLabel, danger,
      resolve: v => { toastState.confirm = null; resolve(v) },
    }
  })
}
