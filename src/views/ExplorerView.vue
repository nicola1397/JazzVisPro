<template>
  <div id="view-explorer" class="view-panel active">
    <div style="display:flex;flex-direction:column;align-items:center;gap:25px;">
      <div class="control-row-aligned" style="width:100%;">
        <div class="nav-group explorer-mode-group">
          <label>{{ t('label.display-mode') }}</label>
          <select :value="appStore.explorerMode" @change="appStore.setExplorerMode($event.target.value)">
            <option value="normal">{{ t('opt.normal') }}</option>
            <option value="highlight">{{ t('opt.highlight') }}</option>
            <option value="custom">{{ t('opt.custom') }}</option>
          </select>
        </div>
        <div class="checkbox-group" style="flex-direction:row;height:var(--control-height);align-items:center;box-sizing:border-box;align-self:flex-end;gap:15px;">
          <div class="checkbox-container">
            <input type="checkbox" id="add-9" :checked="appStore.add9" @change="appStore.add9=$event.target.checked">
            <label for="add-9">Add 9</label>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" id="add-11" :checked="appStore.add11" @change="appStore.add11=$event.target.checked">
            <label for="add-11">Add 11</label>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" id="add-13" :checked="appStore.add13" @change="appStore.add13=$event.target.checked">
            <label for="add-13">Add 13</label>
          </div>
        </div>
      </div>

      <div id="custom-actions" v-if="appStore.explorerMode === 'custom'"
        style="display:flex;gap:10px;background:rgba(255,255,255,0.05);padding:10px;border-radius:8px;">
        <button class="btn-io" @click="exportCustomScale">{{ t('btn.export-json') }}</button>
        <button class="btn-io" @click="$refs.importFile.click()">{{ t('btn.import-json') }}</button>
        <input ref="importFile" type="file" style="display:none" accept=".json" @change="importCustomScale">
        <button class="btn-reset" style="width:auto" @click="appStore.clearCustomScale()">{{ t('btn.clear-all-notes') }}</button>
      </div>

      <div id="mode-description" style="color:#888;font-size:0.85em;font-style:italic;background:rgba(0,0,0,0.2);padding:5px 15px;border-radius:20px;">
        {{ modeDesc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n }     from '../composables/useI18n.js'

const appStore = useAppStore()
const { t }    = useI18n()

const modeDesc = computed(() => {
  const map = { normal: t('mode.normal'), highlight: t('mode.highlight'), custom: t('mode.custom') }
  return map[appStore.explorerMode] || ''
})

function exportCustomScale() {
  const data = { customScale: Array.from(appStore.customScaleNotes) }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'custom-scale.json'; a.click()
  URL.revokeObjectURL(url)
}

function importCustomScale(event) {
  const file = event.target.files[0]; if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result)
      if (data.customScale) appStore.customScaleNotes = new Set(data.customScale)
    } catch { alert(t('err.invalid-json')) }
  }
  reader.readAsText(file)
  event.target.value = ''
}
</script>
