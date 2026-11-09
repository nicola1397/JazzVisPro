<template>
  <div class="sidebar-group" :class="{ collapsed: isCollapsed }">
    <div
      class="sidebar-group-header" role="button" tabindex="0" :aria-expanded="!isCollapsed"
      @click="toggle" @keydown.enter.prevent="toggle" @keydown.space.prevent="toggle"
    >
      <span>{{ label }}</span><span class="sidebar-group-arrow" aria-hidden="true">▾</span>
    </div>
    <div ref="items" class="sidebar-group-items">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ name: String, label: String, collapsed: { type: Boolean, default: false } })

// Open/closed is remembered per group; with nothing saved the group starts as `collapsed` says.
const KEY = 'jv-sidebar-groups'
function readSaved() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch { return {} }
}
const saved = props.name ? readSaved()[props.name] : undefined
const isCollapsed = ref(typeof saved === 'boolean' ? saved : props.collapsed)

function toggle() {
  isCollapsed.value = !isCollapsed.value
  if (!props.name) return
  try { localStorage.setItem(KEY, JSON.stringify({ ...readSaved(), [props.name]: isCollapsed.value })) } catch {}
}

// The group holding the page on screen opens, so the highlighted entry is always visible.
const route = useRoute()
const items = ref(null)
function revealActive() {
  if (isCollapsed.value && items.value?.querySelector('.router-link-active, .router-link-exact-active')) isCollapsed.value = false
}
onMounted(revealActive)
watch(() => route.fullPath, () => nextTick(revealActive))
</script>
