<template>
  <div class="cst">
    <!-- Zone + listen -->
    <div class="cst-row">
      <span class="cst-label">{{ t('cst.zone') }}</span>
      <label class="cst-field">
        <span>{{ t('cst.from') }}</span>
        <select class="jd-select cst-fret" :value="appStore.customZone.from" @change="setZone(+$event.target.value, appStore.customZone.to)">
          <option v-for="f in FRET_LIST" :key="f" :value="f">{{ f }}</option>
        </select>
      </label>
      <label class="cst-field">
        <span>{{ t('cst.to') }}</span>
        <select class="jd-select cst-fret" :value="appStore.customZone.to" @change="setZone(appStore.customZone.from, +$event.target.value)">
          <option v-for="f in FRET_LIST" :key="f" :value="f">{{ f }}</option>
        </select>
      </label>
      <button v-if="!wholeNeck" type="button" class="jd-toolbtn" @click="setZone(0, FRETS)">{{ t('cst.whole-neck') }}</button>
      <span class="cst-spacer"></span>
      <button type="button" class="jd-toolbtn cst-listen" :disabled="!pcs.length" @click="listen">▶ {{ t('cst.listen') }}</button>
    </div>
    <p class="cst-hint">{{ t('cst.zone-hint') }}</p>

    <!-- What the selection is -->
    <div class="cst-block">
      <span class="cst-label">{{ t('cst.recognised') }}</span>
      <p v-if="pcs.length < 3" class="cst-empty">{{ t('cst.pick-three') }}</p>
      <template v-else>
        <div v-if="scales.length" class="cst-chips">
          <button
            v-for="m in scales" :key="m.rootName + m.scale" type="button" class="cst-chip"
            :class="{ exact: m.exact }" :title="t('cst.open-scale')" @click="openScale(m)"
          >
            <strong>{{ m.rootName }}</strong> {{ m.scale }}
            <span v-if="!m.exact" class="cst-extra">+ {{ m.extra.map(noteName).join(' ') }}</span>
          </button>
        </div>
        <p v-else class="cst-empty">{{ t('cst.no-scale') }}</p>
        <div v-if="chords.length" class="cst-chips cst-chords">
          <span v-for="c in chords" :key="c.name" class="cst-chord">{{ c.name }}</span>
        </div>
      </template>
    </div>

    <!-- Saved scales -->
    <div class="cst-block">
      <span class="cst-label">{{ t('cst.saved') }}</span>
      <form class="cst-save" @submit.prevent="save">
        <input v-model="name" class="jd-select cst-name" type="text" maxlength="40" :placeholder="t('cst.name-placeholder')" :aria-label="t('cst.name-placeholder')">
        <button type="submit" class="jd-toolbtn" :disabled="!name.trim() || !appStore.customScaleNotes.size">{{ t('cst.save') }}</button>
        <button type="button" class="jd-iconbtn" :title="t('btn.export-json')" :aria-label="t('btn.export-json')" @click="exportJson">
          <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" /></svg>
        </button>
        <button type="button" class="jd-iconbtn" :title="t('btn.import-json')" :aria-label="t('btn.import-json')" @click="fileInput.click()">
          <svg viewBox="0 0 24 24"><path d="M19 13h-4V7H9v6H5l7 7 7-7zM5 4v2h14V4H5z" transform="rotate(180 12 12)" /></svg>
        </button>
        <input ref="fileInput" type="file" accept=".json" hidden @change="importJson">
      </form>
      <p v-if="!appStore.savedCustomScales.length" class="cst-empty">{{ t('cst.none-saved') }}</p>
      <ul v-else class="cst-list">
        <li v-for="s in appStore.savedCustomScales" :key="s.id" class="cst-item">
          <button type="button" class="cst-load" @click="load(s)">{{ s.name }}</button>
          <span class="cst-count">{{ s.notes.length }}</span>
          <button type="button" class="cst-del" :aria-label="`${t('cst.delete')} ${s.name}`" :title="t('cst.delete')" @click="remove(s)">✕</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../../stores/app.js'
import { useI18n } from '../../composables/useI18n.js'
import { toast } from '../../composables/useToast.js'
import { FRETS } from '../../utils/constants.js'
import { matchScales } from '../../utils/scaleMatch.js'
import { identifyChord } from '../../utils/chordIdentify.js'
import { getAbsoluteNote } from '../../utils/theory.js'
import { playSound } from '../../course/sound.js'

const appStore = useAppStore()
const { t } = useI18n()
const FRET_LIST = Array.from({ length: FRETS + 1 }, (_, i) => i)
const name = ref('')
const fileInput = ref(null)

const wholeNeck = computed(() => appStore.customZone.from === 0 && appStore.customZone.to === FRETS)
const pcs = computed(() => appStore.customPitchClasses)
const noteName = pc => appStore.currentNotes[pc]
const scales = computed(() => matchScales(pcs.value, appStore.rootIdx))

// Chord readings for small selections. Picked over the whole neck the lowest note is
// usually the open low E, so the key is taken as the bass when it is among the notes.
const chords = computed(() => {
  if (pcs.value.length < 3 || pcs.value.length > 6) return []
  const key = Number(appStore.rootIdx)
  let bass = pcs.value.includes(key) ? key : null
  if (bass === null) {
    let low = Infinity
    for (const k of appStore.customScaleNotes) {
      const [s, f] = k.split('-').map(Number)
      const m = getAbsoluteNote(appStore.currentTuning, s, f)
      if (m < low) { low = m; bass = m % 12 }
    }
  }
  return identifyChord(pcs.value, bass, 4)
})

function setZone(from, to) { appStore.setCustomZone(from, to) }

// The selected notes as a scale: one octave up from the key, then the octave
function listen() {
  const root = Number(appStore.rootIdx)
  const rel = [...new Set(pcs.value.map(pc => (pc - root + 12) % 12))].sort((a, b) => a - b)
  const base = 60 + root
  const notes = rel.map(r => base + r)
  if (rel[0] === 0) notes.push(base + 12)
  playSound({ notes })
}

function openScale(m) {
  appStore.setRoot(m.rootName)
  appStore.setScaleName(m.scale)
  appStore.setExplorerMode('normal')
  toast(t('cst.opened').replace('{s}', `${m.rootName} ${m.scale}`))
}

function save() {
  const item = appStore.saveCustomScale(name.value)
  name.value = ''
  toast(t('cst.saved-one').replace('{s}', item.name), { type: 'success' })
}
function load(s) {
  appStore.loadCustomScale(s.id)
  toast(t('cst.loaded').replace('{s}', s.name))
}
function remove(s) {
  const removed = appStore.deleteCustomScale(s.id)
  if (removed) toast(t('cst.deleted').replace('{s}', s.name), { timeout: 6000, action: { label: t('cst.undo'), run: () => appStore.restoreCustomScale(removed) } })
}

function exportJson() {
  const data = { customScale: [...appStore.customScaleNotes], saved: appStore.savedCustomScales }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'custom-scales.json'; a.click()
  URL.revokeObjectURL(url)
}

function importJson(event) {
  const file = event.target.files[0]
  event.target.value = ''
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result)
      const valid = k => /^[0-5]-\d{1,2}$/.test(k)
      let ok = false
      if (Array.isArray(data.customScale)) {
        appStore.customScaleNotes = new Set(data.customScale.filter(valid))
        appStore.scheduleSave()
        ok = true
      }
      if (Array.isArray(data.saved)) {
        for (const s of data.saved.filter(x => x?.name && Array.isArray(x.notes)).reverse()) {
          if (appStore.savedCustomScales.some(x => x.id === s.id)) continue
          appStore.restoreCustomScale({ item: { ...s, notes: s.notes.filter(valid) }, index: 0 })
        }
        ok = true
      }
      toast(t(ok ? 'toast.imported' : 'err.invalid-json'), { type: ok ? 'success' : 'error' })
    } catch { toast(t('err.invalid-json'), { type: 'error' }) }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.cst { display: flex; flex-direction: column; gap: 14px; }
.cst-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; }
.cst-label {
  font-family: var(--jd-mono); font-size: 10px; font-weight: 600; letter-spacing: 2px;
  text-transform: uppercase; color: var(--jd-muted);
}
.cst-block > .cst-label { display: block; margin-bottom: 8px; }
.cst-field { display: inline-flex; align-items: center; gap: 6px; font-family: var(--jd-mono); font-size: 11px; color: var(--jd-text-soft); }
.cst-fret { width: 74px; }
.cst-spacer { flex: 1; }
.cst-listen { color: var(--jd-amber); border-color: var(--jd-line-strong); }
.cst-hint, .cst-empty { margin: 0; font-family: var(--jd-mono); font-size: 11px; line-height: 1.5; color: var(--jd-muted); }
.cst-hint { margin-top: -6px; }
.cst-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.cst-chip {
  display: inline-flex; align-items: baseline; gap: 6px; min-height: 34px; height: auto; padding: 7px 12px;
  border-radius: 10px; border: 1px solid var(--jd-line-strong); background: rgba(255, 255, 255, 0.02);
  color: var(--jd-text-soft); font-family: var(--jd-mono); font-size: 12px; cursor: pointer; text-align: left;
}
.cst-chip strong { color: var(--jd-text); }
.cst-chip.exact { border-color: rgba(46, 204, 113, 0.5); background: rgba(46, 204, 113, 0.07); }
.cst-chip:hover { border-color: var(--jd-amber); }
.cst-extra { color: var(--jd-muted); font-size: 11px; }
.cst-chords { margin-top: 8px; }
.cst-chord { padding: 4px 10px; border-radius: 999px; border: 1px dashed var(--jd-line-strong); font-family: var(--jd-mono); font-size: 12px; color: var(--jd-text-soft); }
.cst-save { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.cst-name { flex: 1 1 180px; min-width: 0; height: 38px; padding: 0 12px; }
.cst-list { list-style: none; margin: 10px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.cst-item { display: inline-flex; align-items: center; border: 1px solid var(--jd-line-strong); border-radius: 10px; overflow: hidden; }
.cst-load, .cst-del {
  height: 34px; min-height: 0; border: 0; border-radius: 0; background: transparent; cursor: pointer;
  font-family: var(--jd-mono); font-size: 12px; color: var(--jd-text);
}
.cst-load { padding: 0 10px 0 12px; }
.cst-load:hover { color: var(--jd-amber); }
.cst-count { font-family: var(--jd-mono); font-size: 10px; color: var(--jd-muted); padding-right: 6px; }
.cst-del { width: 32px; padding: 0; color: var(--jd-muted); border-left: 1px solid var(--jd-line); }
.cst-del:hover { color: var(--jd-red); }
</style>
