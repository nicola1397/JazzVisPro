import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import it from '../i18n/it.js'
import en from '../i18n/en.js'

const TRANSLATIONS = { it, en }

export function useI18n() {
  const appStore = useAppStore()
  const t = computed(() => (key) => {
    const d = TRANSLATIONS[appStore.lang] || TRANSLATIONS.it
    return d[key] !== undefined ? d[key] : (TRANSLATIONS.it[key] || key)
  })
  return { t: (key) => t.value(key), lang: computed(() => appStore.lang) }
}
