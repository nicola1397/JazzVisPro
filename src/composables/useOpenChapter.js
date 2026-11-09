import { watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

// Theory pages: ?open=N opens chapter N and scrolls to it (links from quick search).
export function useOpenChapter(open) {
  const route = useRoute()
  watch(() => route.query.open, v => {
    const i = Number(v)
    if (v === undefined || !Number.isInteger(i) || i < 0 || i >= open.length) return
    open[i] = true
    // after the page's own scroll reset on navigation
    nextTick(() => setTimeout(() => {
      document.querySelectorAll('.teoria-card')[i]?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 80))
  }, { immediate: true })
}
