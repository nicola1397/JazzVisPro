import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './assets/style.css'
import it from './i18n/it.js'
import en from './i18n/en.js'

const TRANSLATIONS = { it, en }

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.config.globalProperties.$t = function(key) {
  const lang = document.documentElement.getAttribute('lang') || 'it'
  const d = TRANSLATIONS[lang] || TRANSLATIONS.it
  return d[key] !== undefined ? d[key] : (TRANSLATIONS.it[key] || key)
}

app.mount('#app')
