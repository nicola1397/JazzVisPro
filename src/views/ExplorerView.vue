<template>
  <div id="view-explorer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('title.explorer') }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="explorer-controls">
        
        <!-- Row 1: Mode Switches (Centered Console) -->
        <div class="explorer-section explorer-section--compact explorer-row--center">
          <div class="nav-group">
            <span class="explorer-label">{{ t('label.display-mode') }}</span>
            <div class="jd-modes">
              <label class="jd-mode" :class="{ on: appStore.explorerMode === 'normal' }">
                <input type="radio" v-model="appStore.explorerMode" value="normal" @change="appStore.setExplorerMode('normal')" class="hidden-radio">
                <span class="jd-mode-dot" aria-hidden="true"></span>
                <span class="jd-mode-text">{{ t('opt.normal') }}</span>
              </label>
              <label class="jd-mode" :class="{ on: appStore.explorerMode === 'highlight' }">
                <input type="radio" v-model="appStore.explorerMode" value="highlight" @change="appStore.setExplorerMode('highlight')" class="hidden-radio">
                <span class="jd-mode-dot" aria-hidden="true"></span>
                <span class="jd-mode-text">{{ t('opt.highlight') }}</span>
              </label>
              <label class="jd-mode" :class="{ on: appStore.explorerMode === 'custom' }">
                <input type="radio" v-model="appStore.explorerMode" value="custom" @change="appStore.setExplorerMode('custom')" class="hidden-radio">
                <span class="jd-mode-dot" aria-hidden="true"></span>
                <span class="jd-mode-text">{{ t('opt.custom') }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Master Dashboard: Selectors & Secondary -->
        <div class="explorer-section">
          <div class="explorer-dashboard">
            <!-- Col: Key -->
            <div class="nav-group span-2 span-m-3 span-s-12">
              <span class="explorer-label">{{ t('label.key') }}</span>
              <select class="jd-select" :value="appStore.root" @change="appStore.setRoot($event.target.value)">
                <option v-for="n in NOTES" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <!-- Col: Tuning -->
            <div class="nav-group span-3 span-m-4 span-s-12">
              <span class="explorer-label">{{ t('label.tuning') }}</span>
              <select class="jd-select" :value="appStore.tuningName" @change="appStore.setTuningName($event.target.value)">
                <option v-for="name in tuningKeys" :key="name" :value="name">{{ name }}</option>
              </select>
            </div>
            <!-- Col: Scale -->
            <div class="nav-group span-7 span-m-5 span-s-12">
              <span class="explorer-label">{{ t('label.scale') }}</span>
              <select class="jd-select" :value="appStore.scaleName" @change="appStore.setScaleName($event.target.value)">
                <option v-for="name in scaleKeys" :key="name" :value="name">{{ name }}</option>
              </select>
            </div>

            <div class="jd-rule span-12" style="margin: 8px 0;"></div>

            <!-- Col: Notation -->
            <div class="nav-group span-3 span-m-4 span-s-12">
              <span class="explorer-label">{{ t('label.notation') }}</span>
              <div class="pill-group">
                <button class="pill-btn" :class="{ active: appStore.notation === 'interval' }" @click="appStore.setNotation('interval')">{{ t('opt.intervals') }}</button>
                <button class="pill-btn" :class="{ active: appStore.notation === 'note' }" @click="appStore.setNotation('note')">{{ t('opt.notes') }}</button>
              </div>
            </div>

            <!-- Col: Accidentals -->
            <div class="nav-group span-2 span-m-3 span-s-12">
              <span class="explorer-label">{{ t('label.accidentals') }}</span>
              <div class="pill-group">
                <button class="pill-btn" :class="{ active: appStore.accidental === '#' }" @click="appStore.setAccidental('#')">#</button>
                <button class="pill-btn" :class="{ active: appStore.accidental === 'b' }" @click="appStore.setAccidental('b')">♭</button>
              </div>
            </div>

            <!-- Col: CAGED -->
            <div class="nav-group span-7 span-m-5 span-s-12">
              <span class="explorer-label">{{ t('label.caged-shape') }}</span>
              <div class="pill-group" :class="{ disabled: !appStore.isCagedCompatible }">
                <template v-if="appStore.isCagedCompatible">
                  <button class="pill-btn" :class="{ active: appStore.cagedShape === 'none' }" @click="appStore.setCagedShape('none')">{{ t('opt.none') }}</button>
                  <button v-for="s in ['C','A','G','E','D']" :key="s" class="pill-btn" 
                    :class="{ active: appStore.cagedShape === s }" @click="appStore.setCagedShape(s)">
                    {{ s }} <span class="pill-btn-sub">{{ appStore.scaleQuality === 'minor' ? 'm' : '' }}</span>
                  </button>
                </template>
                <div v-else class="pill-msg">{{ t('msg.caged-not-applicable') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Strip: Extensions, Options & Reset -->
        <div class="explorer-section explorer-section--alt explorer-section--compact">
          <div class="explorer-action-strip">
            <div class="action-group">
              <span class="explorer-label mini">{{ t('label.ext') }}</span>
              <div class="jd-modes">
                <label class="jd-mode" :class="{ on: appStore.add9 }">
                  <input type="checkbox" v-model="appStore.add9" @change="appStore.scheduleSave()" class="hidden-radio">
                  <span class="jd-mode-dot"></span><span class="jd-mode-text">9</span>
                </label>
                <label class="jd-mode" :class="{ on: appStore.add11 }">
                  <input type="checkbox" v-model="appStore.add11" @change="appStore.scheduleSave()" class="hidden-radio">
                  <span class="jd-mode-dot"></span><span class="jd-mode-text">11</span>
                </label>
                <label class="jd-mode" :class="{ on: appStore.add13 }">
                  <input type="checkbox" v-model="appStore.add13" @change="appStore.scheduleSave()" class="hidden-radio">
                  <span class="jd-mode-dot"></span><span class="jd-mode-text">13</span>
                </label>
              </div>
            </div>

            <div class="action-group">
              <span class="explorer-label mini">{{ t('label.view') }}</span>
              <div class="jd-modes">
                <label class="jd-mode" :class="{ on: appStore.hideUnused }">
                  <input type="checkbox" v-model="appStore.hideUnused" @change="appStore.scheduleSave()" class="hidden-radio">
                  <span class="jd-mode-dot"></span><span class="jd-mode-text">{{ t('opt.hide') }}</span>
                </label>
                <label class="jd-mode" :class="{ on: appStore.soloArp }" style="--engine-color: var(--jd-amber)">
                  <input type="checkbox" v-model="appStore.soloArp" @change="appStore.scheduleSave()" class="hidden-radio">
                  <span class="jd-mode-dot"></span><span class="jd-mode-text">{{ t('opt.arp') }}</span>
                </label>
              </div>
            </div>

            <button class="jd-toolbtn jd-toolbtn--reset" @click="appStore.resetFretboard()">
              {{ t('btn.reset-display') }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="appStore.explorerMode === 'custom'" class="jd-rule" aria-hidden="true"></div>

      <div v-if="appStore.explorerMode === 'custom'" class="jd-toolbar" style="margin-top: 10px;">
        <button class="jd-iconbtn" @click="exportCustomScale" :title="t('btn.export-json')" aria-label="Export JSON">
          <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
        </button>
        <button class="jd-iconbtn" @click="$refs.importFile.click()" :title="t('btn.import-json')" aria-label="Import JSON">
          <svg viewBox="0 0 24 24"><path d="M19 13h-4V7H9v6H5l7 7 7-7zM5 4v2h14V4H5z" transform="rotate(180 12 12)"/></svg>
        </button>
        <input ref="importFile" type="file" style="display:none" accept=".json" @change="importCustomScale">
        <span class="jd-toolbar-sep"></span>
        <button class="jd-toolbtn jd-toolbtn--reset" @click="appStore.clearCustomScale()">{{ t('btn.clear-all-notes') }}</button>
      </div>
    </section>

    <div class="jd-improv-banner" style="margin-top: 20px;">
      <span class="jd-improv-bullet" aria-hidden="true"></span>
      <strong>{{ t('label.info') }}</strong>
      <span class="jd-improv-helper">{{ modeDesc }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n }     from '../composables/useI18n.js'
import { NOTES, SCALES, TUNINGS } from '../utils/theory.js'

const appStore   = useAppStore()
const { t }      = useI18n()

onMounted(() => {
  console.log('ExplorerView mounted. Notation:', appStore.notation, 'isCagedCompatible:', appStore.isCagedCompatible)
})

const tuningKeys = computed(() => Object.keys(TUNINGS))
const scaleKeys  = computed(() => Object.keys(SCALES))

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

<style scoped>
.explorer-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.explorer-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--jd-line);
  padding: 16px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.explorer-section--alt {
  background: rgba(0, 0, 0, 0.15);
}

.explorer-section--compact {
  padding: 10px 16px;
}

.explorer-row--center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* 12-Column Dashboard Grid */
.explorer-dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  align-items: end;
}

.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }
.span-5 { grid-column: span 5; }
.span-7 { grid-column: span 7; }
.span-12 { grid-column: span 12; }

@media (max-width: 1024px) {
  .span-m-3 { grid-column: span 3; }
  .span-m-4 { grid-column: span 4; }
  .span-m-5 { grid-column: span 5; }
  .span-m-6 { grid-column: span 6; }
  .span-m-12 { grid-column: span 12; }
}

.explorer-label {
  display: block;
  font-family: var(--jd-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--jd-muted);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.explorer-label.mini {
  margin-bottom: 0;
  margin-right: 10px;
  font-size: 9px;
  opacity: 0.6;
}

.explorer-action-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}

.action-group {
  display: flex;
  align-items: center;
}

.jd-select {
  width: 100% !important;
  flex: none !important;
}

.jd-modes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

.explorer-controls .jd-mode {
  justify-content: center;
  min-width: 90px;
  padding: 0 12px;
  cursor: pointer;
  pointer-events: auto !important;
  flex: 1 1 auto;
}

.hidden-radio {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.pill-group {
  display: flex;
  flex-wrap: wrap;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px;
  border-radius: 8px;
  border: 1px solid var(--jd-line);
  height: auto;
  min-height: 34px;
  box-sizing: border-box;
  width: 100%;
}

.pill-btn {
  flex: 1 1 auto;
  background: transparent;
  border: none;
  color: var(--jd-text-soft);
  font-family: var(--jd-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.pill-btn:hover { background: rgba(255, 214, 10, 0.05); color: var(--jd-text); }
.pill-btn.active { background: var(--jd-amber); color: var(--jd-bg-deep); }
.pill-btn-sub {
  font-size: 0.8em;
  opacity: 0.7;
  margin-left: 2px;
}

.pill-group.disabled {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(255, 255, 255, 0.05);
  cursor: not-allowed;
  justify-content: center;
}

.pill-msg {
  font-family: var(--jd-mono);
  font-size: 9px;
  color: var(--jd-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .explorer-action-strip {
    gap: 16px;
  }
  .jd-toolbtn--reset { width: 100%; margin-top: 10px; }
}

@media (max-width: 600px) {
  .span-s-12 { grid-column: span 12; }
  .hide-mobile { display: none; }
  .explorer-action-strip {
    flex-direction: column;
    align-items: stretch;
  }
  .action-group {
    justify-content: space-between;
  }
  .jd-mode { flex: 1; }
}
</style>
