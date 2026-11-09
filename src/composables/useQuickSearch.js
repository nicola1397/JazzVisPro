import { ref } from 'vue'

// Open state of quick search (Ctrl/⌘ K, "/" or the navbar button)
export const quickSearchOpen = ref(false)
export const openQuickSearch = () => { quickSearchOpen.value = true }
export const closeQuickSearch = () => { quickSearchOpen.value = false }
