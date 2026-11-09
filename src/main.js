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
