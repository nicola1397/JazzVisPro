import { computed, shallowReactive } from 'vue'
import { useAppStore } from '../stores/app.js'
import it from '../i18n/it.js'

// Italian is bundled (default and fallback); English is downloaded only when chosen.
const TRANSLATIONS = shallowReactive({ it })
let enPending = null

export function loadLanguage(lang) {
  if (lang !== 'en' || TRANSLATIONS.en) return Promise.resolve()
  enPending ??= import('../i18n/en.js')
    .then(m => { TRANSLATIONS.en = m.default })
    .catch(err => { enPending = null; throw err })
  return enPending
}

export function useI18n() {
  const appStore = useAppStore()
  const t = computed(() => (key) => {
    const d = TRANSLATIONS[appStore.lang] || TRANSLATIONS.it
    return d[key] !== undefined ? d[key] : (TRANSLATIONS.it[key] || key)
  })
  return { t: (key) => t.value(key), lang: computed(() => appStore.lang) }
}
