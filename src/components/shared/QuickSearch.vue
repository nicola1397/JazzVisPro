<template>
  <Transition name="qs-fade">
    <div v-if="quickSearchOpen" class="qs-backdrop" @mousedown.self="closeQuickSearch()">
      <div class="qs-dialog" role="dialog" aria-modal="true" :aria-label="t('qs.title')" @keydown="onKey">
        <div class="qs-input-row">
          <span class="qs-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></span>
          <input
            ref="input" v-model="query" class="qs-input" type="search" autocomplete="off" spellcheck="false"
            :placeholder="t('qs.placeholder')" role="combobox" aria-autocomplete="list"
            :aria-expanded="results.length > 0" aria-controls="qs-list"
            :aria-activedescendant="results.length ? `qs-opt-${active}` : null"
          >
          <button type="button" class="qs-close" :aria-label="t('label.close')" @click="closeQuickSearch()">Esc</button>
        </div>

        <ul v-if="results.length" id="qs-list" ref="list" class="qs-list" role="listbox" :aria-label="t('qs.results')">
          <li
            v-for="(r, i) in results" :id="`qs-opt-${i}`" :key="r.kind + r.to"
            class="qs-item" :class="{ active: i === active }" role="option" :aria-selected="i === active"
            @mousemove="active = i" @click="go(r)"
          >
            <span class="qs-kind" :class="`qs-kind--${r.kind}`">{{ t('qs.kind-' + r.kind) }}</span>
            <span class="qs-text">
              <span class="qs-name">{{ r.title }}</span>
              <span v-if="r.sub" class="qs-sub">{{ r.sub }}</span>
            </span>
          </li>
        </ul>
        <p v-else-if="query.trim()" class="qs-empty">{{ t('qs.none') }}</p>
        <p v-else class="qs-empty">{{ t('qs.hint') }}</p>

        <div class="qs-foot" aria-hidden="true"><kbd>↑</kbd><kbd>↓</kbd> {{ t('qs.move') }} · <kbd>↵</kbd> {{ t('qs.open') }} · <kbd>Esc</kbd> {{ t('label.close') }}</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from '../../composables/useI18n.js'
import { useAppStore } from '../../stores/app.js'
import { quickSearchOpen, openQuickSearch, closeQuickSearch } from '../../composables/useQuickSearch.js'
import { recentPages } from '../../composables/useRecentPages.js'
import { buildSearchIndex, search } from '../../utils/searchIndex.js'

const { t } = useI18n()
const appStore = useAppStore()
const router = useRouter()
const query = ref('')
const active = ref(0)
const input = ref(null)
const list = ref(null)

// Built when first opened and again when the language changes
let index = null, indexLang = null
function getIndex() {
  if (!index || indexLang !== appStore.lang) { index = buildSearchIndex(t, appStore.lang); indexLang = appStore.lang }
  return index
}

const results = computed(() => {
  if (!quickSearchOpen.value) return []
  const q = query.value.trim()
  if (q) return search(getIndex(), q)
  // Nothing typed yet: the pages used most recently
  const idx = getIndex()
  return recentPages.value.map(r => idx.find(x => x.kind === 'page' && x.to === r.path)).filter(Boolean).slice(0, 6)
})

watch(results, () => { active.value = 0 })
watch(quickSearchOpen, open => {
  if (open) { query.value = ''; nextTick(() => input.value?.focus()) }
})

function go(r) {
  closeQuickSearch()
  router.push(r.to)
}

function onKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); closeQuickSearch() }
  else if (e.key === 'ArrowDown' && results.value.length) { e.preventDefault(); active.value = (active.value + 1) % results.value.length; reveal() }
  else if (e.key === 'ArrowUp' && results.value.length) { e.preventDefault(); active.value = (active.value - 1 + results.value.length) % results.value.length; reveal() }
  else if (e.key === 'Enter' && results.value[active.value]) { e.preventDefault(); go(results.value[active.value]) }
}
function reveal() {
  nextTick(() => list.value?.querySelector('.qs-item.active')?.scrollIntoView({ block: 'nearest' }))
}

// Ctrl/⌘ K anywhere; "/" when not typing in a field
function onGlobalKey(e) {
  const typing = /^(input|textarea|select)$/i.test(e.target?.tagName || '') || e.target?.isContentEditable
  if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); quickSearchOpen.value ? closeQuickSearch() : openQuickSearch() }
  else if (e.key === '/' && !typing && !quickSearchOpen.value) { e.preventDefault(); openQuickSearch() }
}
onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<style scoped>
.qs-backdrop {
  position: fixed; inset: 0; z-index: 2200; display: flex; justify-content: center; align-items: flex-start;
  padding: min(12vh, 90px) 12px 12px; background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(3px);
}
.qs-dialog {
  width: min(100%, 620px); max-height: min(78vh, 620px); display: flex; flex-direction: column; overflow: hidden;
  border-radius: 16px; background: var(--jd-surface, #161411); border: 1px solid var(--jd-line-strong);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
}
.qs-input-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px 10px 16px; border-bottom: 1px solid var(--jd-line); }
.qs-icon { display: inline-flex; color: var(--jd-amber); }
.qs-input {
  flex: 1; min-width: 0; height: 40px; border: 0; outline: 0; background: transparent;
  color: var(--jd-text); font-family: var(--jd-mono); font-size: 15px;
}
.qs-input::-webkit-search-cancel-button { display: none; }
.qs-close {
  flex-shrink: 0; height: 30px; min-height: 0; padding: 0 10px; border-radius: 8px; cursor: pointer;
  font-family: var(--jd-mono); font-size: 10px; letter-spacing: 1px; color: var(--jd-muted);
  background: transparent; border: 1px solid var(--jd-line-strong);
}
.qs-list { list-style: none; margin: 0; padding: 6px; overflow-y: auto; }
.qs-item {
  display: flex; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 10px; cursor: pointer;
  border: 1px solid transparent;
}
.qs-item.active { background: rgba(255, 214, 10, 0.08); border-color: rgba(255, 214, 10, 0.35); }
.qs-kind {
  flex-shrink: 0; width: 76px; text-align: center; padding: 3px 0; border-radius: 6px;
  font-family: var(--jd-mono); font-size: 9px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
  color: var(--jd-muted); border: 1px solid var(--jd-line-strong);
}
.qs-kind--page { color: var(--jd-amber); border-color: rgba(255, 214, 10, 0.35); }
.qs-kind--course, .qs-kind--step { color: var(--jd-green); border-color: rgba(46, 204, 113, 0.35); }
.qs-kind--lesson { color: #5ac8fa; border-color: rgba(90, 200, 250, 0.35); }
.qs-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.qs-name { color: var(--jd-text); font-size: 0.95em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qs-sub { font-family: var(--jd-mono); font-size: 10.5px; color: var(--jd-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.qs-empty { margin: 0; padding: 22px 18px; font-family: var(--jd-mono); font-size: 12px; color: var(--jd-muted); text-align: center; }
.qs-foot { padding: 8px 14px; border-top: 1px solid var(--jd-line); font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); }
.qs-foot kbd { font-family: inherit; padding: 1px 5px; border-radius: 4px; border: 1px solid var(--jd-line-strong); }
.qs-fade-enter-active, .qs-fade-leave-active { transition: opacity 0.15s ease; }
.qs-fade-enter-from, .qs-fade-leave-to { opacity: 0; }
@media (hover: none) { .qs-foot { display: none; } }
@media (max-width: 480px) { .qs-kind { width: 64px; } }
</style>
