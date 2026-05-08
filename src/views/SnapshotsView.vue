<template>
  <div id="view-snapshots" class="view-panel active">
    <div class="importer-area" style="max-width:720px; margin: 0 auto; width: 100%;">

      <!-- Header -->
      <div class="snapshot-header-container" style="display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 auto 20px;flex-wrap:wrap;gap:10px;">
        <h2 class="area-title" style="border:none;margin:0;">{{ t('snap.title') }}</h2>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <button class="btn-snapshot" @click="createSnapshot">{{ t('btn.save-snapshot') }}</button>
          <button class="btn-reset" style="width:auto;padding:0 20px;" @click="clearSnapshots">{{ t('btn.clear-snapshots') }}</button>
        </div>
      </div>

      <!-- List -->
      <div class="snapshot-area">
        <div
          v-for="(snap, idx) in snapshots"
          :key="idx"
          class="snapshot-card"
        >
          <!-- Meta -->
          <div class="snapshot-meta">
            <h3>{{ snap.root }} {{ snap.scale }}</h3>
            <div style="font-size:0.8em;color:#888;">{{ snap.date }}</div>
            <div class="d-flex gap-2 mt-3">
              <button class="btn-io btn-sm" style="padding:4px 10px;height:auto;" @click="loadSnapshot(snap)">{{ t('btn.load') }}</button>
              <button class="btn-reset btn-sm" style="padding:4px 10px;height:auto;" @click="deleteSnapshot(idx)">{{ t('btn.delete') }}</button>
            </div>
          </div>

          <!-- Mini Fretboard -->
          <div class="mini-fretboard-wrap">
            <div class="mini-fretboard">
              <div v-for="s in 6" :key="s" class="mini-string">
                <div v-for="f in 16" :key="f" class="mini-fret" :class="{ 'mini-fret-0': f === 1 }">
                  <div
                    v-if="hasNote(snap, 6-s, f-1)"
                    class="mini-note"
                    :style="{ background: getColor(snap, 6-s, f-1) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="snapshots.length === 0" style="text-align:center;padding:40px;color:#555;">
          {{ t('snap.empty') }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore }    from '../stores/app.js'
import { useI18n }        from '../composables/useI18n.js'
import { INTERVAL_COLORS, SCALES } from '../utils/theory.js'

const appStore = useAppStore()
const { t }    = useI18n()

const snapshots = ref([])

onMounted(() => {
  loadSnapshots()
})

function loadSnapshots() {
  const saved = localStorage.getItem('jv_snapshots')
  if (saved) snapshots.value = JSON.parse(saved)
}

function saveSnapshots() {
  localStorage.setItem('jv_snapshots', JSON.stringify(snapshots.value))
}

function createSnapshot() {
  const snap = {
    root: appStore.root,
    scale: appStore.scaleName,
    manualNotes: Array.from(appStore.manualNotes),
    customScale: Array.from(appStore.customScaleNotes),
    date: new Date().toLocaleString()
  }
  snapshots.value.unshift(snap)
  saveSnapshots()
}

function deleteSnapshot(idx) {
  snapshots.value.splice(idx, 1)
  saveSnapshots()
}

function clearSnapshots() {
  if (confirm(t('snap.confirm-clear'))) {
    snapshots.value = []
    saveSnapshots()
  }
}

function loadSnapshot(snap) {
  appStore.setRoot(snap.root)
  appStore.setScaleName(snap.scale)
  appStore.manualNotes = new Set(snap.manualNotes)
  appStore.customScaleNotes = new Set(snap.customScale)
}

function getInterval(snap, s, f) {
  // Rough calculation for visualization purposes
  const tuning = [4, 9, 14, 19, 23, 28] // E Standard semitones from C0
  const noteIdx = (tuning[s] + f) % 12
  const rootIdx = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'].indexOf(snap.root)
  if (rootIdx === -1) return -1
  return (noteIdx - rootIdx + 12) % 12
}

function hasNote(snap, s, f) {
  const posKey = `${s}-${f}`
  if (snap.manualNotes.includes(posKey)) return true
  const scale = SCALES[snap.scale] || SCALES['Ionio (Maj7)']
  const intv  = getInterval(snap, s, f)
  return intv >= 0 && scale.includes(intv)
}

function getColor(snap, s, f) {
  const intv = getInterval(snap, s, f)
  return INTERVAL_COLORS[intv]?.color || '#aaa'
}
</script>
