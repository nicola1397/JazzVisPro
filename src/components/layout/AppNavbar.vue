<template>
  <nav class="navbar">
    <button class="nav-toggle" @click="appStore.toggleSidebar()">☰</button>
    <h2 id="view-title">{{ viewTitle }}</h2>
    <button class="search-toggle" type="button" :aria-label="t('qs.title')" :title="t('qs.title') + ' (Ctrl K)'" @click="openQuickSearch()"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></button>
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
import { openQuickSearch } from '../../composables/useQuickSearch.js'

const appStore = useAppStore()
const route    = useRoute()
const { t }    = useI18n()

const viewTitle = computed(() => {
  const key = route.meta?.title
  return key ? t(key) : route.name?.toUpperCase() || 'JAZZ VIZ'
})
</script>
