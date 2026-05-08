<template>
  <div id="view-snapshots" class="view-panel active">

    <!-- Header -->
    <div class="snapshot-header-container" style="display:flex;align-items:center;justify-content:space-between;width:100%;margin:0 auto 20px;flex-wrap:wrap;gap:10px;">
      <h2 class="area-title" style="border:none;margin:0;">{{ t('snap.title') }}</h2>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <button class="btn-snapshot" @click="saveSnapshot">{{ t('btn.save-snapshot') }}</button>
        <button class="btn-reset" style="width:auto;padding:0 20px;" @click="clearAll">{{ t('btn.clear-snapshots') }}</button>
      </div>
    </div>

    <!-- Snapshot cards -->
    <div class="snapshot-area">
      <div v-if="!snapshots.length" style="color:#666;text-align:center;padding:40px;font-style:italic;">
        {{ appStore.lang === 'it' ? 'Nessuno snapshot salvato.' : 'No snapshots saved.' }}
      </div>

      <div v-for="(snap, idx) in snapshots" :key="idx" class="snapshot-card">
        <!-- Meta -->
        <div class="snapshot-meta">
          <h3>{{ snap.root }} {{ snap.scaleName ? snap.scaleName.split(' ')[0] : '' }}</h3>
          <button
            class="btn-reset"
            style="padding:4px;font-size:0.8em;width:auto;height:24px;"
            @click="deleteSnapshot(idx)"
          >{{ t('btn.delete') }}</button>
        </div>

        <!-- Mini fretboard -->
        <div class="mini-fretboard-wrap">
          <div class="mini-fretboard">
            <div v-for="s in 6" :key="s" class="mini-string">
              <div class="mini-fret mini-fret-0"></div>
              <div v-for="f in 24" :key="f" class="mini-fret">
                <div v-if="isVisible(snap, s-1, f)" class="mini-circle" :style="{ background: getColor(snap, s-1, f) }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load button -->
        <button class="btn-io" @click="loadSnapshot(snap)">
          {{ appStore.lang === 'it' ? 'Carica' : 'Load' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES, TUNINGS, SCALES, INTERVAL_COLORS } from '../utils/theory.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'

const appStore = useAppStore()
const { t }    = useI18n()
const snapshots = ref([])

onMounted(() => {
  const data = readStorage('jazzVizData', {})
  snapshots.value = data.snapshots || []
})

function saveSnapshot() {
  const snap = {
    root:       appStore.root,
    scaleName:  appStore.scaleName,
    tuningName: appStore.tuningName,
    notation:   appStore.notation,
    accidental: appStore.accidental,
    cagedShape: appStore.cagedShape,
    soloArp:    appStore.soloArp,
    add9:       appStore.add9,
    add11:      appStore.add11,
    add13:      appStore.add13,
    hideUnused: appStore.hideUnused,
  }
  snapshots.value.unshift(snap)
  persist()
}

function deleteSnapshot(idx) { snapshots.value.splice(idx, 1); persist() }
function clearAll()           { snapshots.value = []; persist() }

function loadSnapshot(snap) {
  appStore.setRoot(snap.root)
  appStore.setScaleName(snap.scaleName)
  appStore.setTuningName(snap.tuningName)
  if (snap.notation)   appStore.setNotation(snap.notation)
  if (snap.accidental) appStore.setAccidental(snap.accidental)
  if (snap.cagedShape) appStore.setCagedShape(snap.cagedShape)
}

function persist() {
  const data = readStorage('jazzVizData', {})
  data.snapshots = snapshots.value
  writeStorage('jazzVizData', data)
}

function getInterval(snap, s, f) {
  const tuning  = TUNINGS[snap.tuningName] || TUNINGS['E Standard']
  const rootIdx = NOTES.indexOf(snap.root)
  if (rootIdx === -1) return -1
  return ((tuning[s] + f) % 12 - rootIdx + 12) % 12
}

function isVisible(snap, s, f) {
  const scale = SCALES[snap.scaleName] || SCALES['Ionio (Maj7)']
  const intv  = getInterval(snap, s, f)
  return intv >= 0 && scale.includes(intv)
}

function getColor(snap, s, f) {
  const intv = getInterval(snap, s, f)
  return INTERVAL_COLORS[intv]?.color || '#aaa'
}
</script>
