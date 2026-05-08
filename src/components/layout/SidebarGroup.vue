<template>
  <div class="sidebar-group" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-group-header" @click="isCollapsed = !isCollapsed">
      <span>{{ label }}</span><span class="sidebar-group-arrow">▾</span>
    </div>
    <div class="sidebar-group-items">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ label: String, collapsed: { type: Boolean, default: false } })
const isCollapsed = ref(props.collapsed)
</script>
