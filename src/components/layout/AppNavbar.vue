<template>
  <nav class="navbar">
    <button class="nav-toggle" @click="appStore.toggleSidebar()">☰</button>
    <h2 id="view-title" style="margin:0;font-size:1.1em;color:var(--accent)">{{ viewTitle }}</h2>
    <button class="lang-toggle" id="lang-btn" @click="appStore.toggleLang()">
      {{ appStore.lang === 'it' ? 'EN' : 'IT' }}
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute }    from 'vue-router'
import { useAppStore } from '../../stores/app.js'
import { useI18n }     from '../../composables/useI18n.js'

const appStore = useAppStore()
const route    = useRoute()
const { t }    = useI18n()

const viewTitle = computed(() => {
  const key = route.meta?.title
  return key ? t(key) : route.name?.toUpperCase() || 'JAZZ VIZ'
})
</script>
