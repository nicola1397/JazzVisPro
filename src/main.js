import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import './assets/vendor-bootstrap-subset.css'
import './assets/style.css'
import { preloadTone } from './audio/tone.js'
import { loadLanguage } from './composables/useI18n.js'
import { savedLang } from './stores/app.js'

const app = createApp(App)
app.use(createPinia())
app.use(router)

// With English saved, wait for its texts so the first screen is not shown in Italian
loadLanguage(savedLang()).catch(() => {}).finally(() => {
  app.mount('#app')
  preloadTone()
})

// Offline support for the built app (not during development, where files change all the time)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {}))
}
