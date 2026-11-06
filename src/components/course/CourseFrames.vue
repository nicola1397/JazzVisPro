<template>
  <div class="cf">
    <div class="cf-tabs" role="tablist">
      <button class="cf-arrow" type="button" :aria-label="t('cr.prev')" @click="go(i - 1)">◂</button>
      <button
        v-for="(fr, k) in frames" :key="k" type="button" role="tab"
        class="cf-tab" :class="{ on: k === i }" :aria-selected="k === i"
        @click="go(k)"
      >{{ L(fr.tab) || k + 1 }}</button>
      <button class="cf-arrow" type="button" :aria-label="t('cr.next')" @click="go(i + 1)">▸</button>
    </div>
    <NeckDiagram v-bind="frames[i].diagram" :key="i" />
    <p v-if="frames[i].caption" class="cf-caption" v-html="L(frames[i].caption)"></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NeckDiagram from './NeckDiagram.vue'
import { useI18n } from '../../composables/useI18n.js'

const props = defineProps({
  frames: { type: Array, required: true },   // [{ tab, caption, diagram }]
})

const { t, lang } = useI18n()
const L = x => (x == null ? '' : typeof x === 'string' ? x : (x[lang.value] ?? x.it))
const i = ref(0)
const go = k => { i.value = (k + props.frames.length) % props.frames.length }
</script>

<style scoped>
.cf { margin: 18px 0; padding: 12px 14px; border: 1px solid var(--jd-line); border-radius: 12px; background: rgba(0, 0, 0, 0.18); }
.cf-tabs { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; align-items: center; }
.cf-tab, .cf-arrow {
  font-family: var(--jd-mono); font-size: 11px; letter-spacing: 1px;
  background: transparent; color: var(--jd-text-soft);
  border: 1px solid var(--jd-line-strong); border-radius: 8px; padding: 5px 10px; cursor: pointer;
}
.cf-arrow { color: var(--jd-amber); }
.cf-tab.on { background: rgba(255, 214, 10, 0.14); color: var(--jd-amber); border-color: var(--jd-amber); }
.cf-caption { font-size: 0.86em; color: var(--jd-text-soft); line-height: 1.6; margin: 4px 0 2px; text-align: center; }
.cf-caption :deep(strong) { color: var(--jd-text); }
</style>
