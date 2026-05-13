<template>
  <div id="view-snapshots" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('snap.title') }}</h1>
      </div>
      <nav class="jd-toolbar" aria-label="Snapshot actions">
        <button class="jd-toolbtn jd-toolbtn--add" @click="createSnapshot">
          <span aria-hidden="true">＋</span> {{ t('btn.save-snapshot') }}
        </button>
        <button class="jd-toolbtn jd-toolbtn--reset" @click="clearSnapshots">{{ t('btn.clear-snapshots') }}</button>
      </nav>
    </header>

    <div class="snapshot-area">
      <TransitionGroup name="jd-fade">
        <div
          v-for="(snap, idx) in snapshots"
          :key="snap.date"
          class="snapshot-card"
        >
          <!-- Meta -->
          <div class="snapshot-meta">
            <h3>{{ snap.root }} {{ snap.scale }}</h3>
            <div class="snapshot-date">{{ snap.date }}</div>
            <div class="snapshot-actions">
              <button class="jd-extra" @click="loadSnapshot(snap)">{{ t('btn.load') }}</button>
              <button class="jd-iconbtn jd-iconbtn--delete" @click="deleteSnapshot(idx)" :title="t('btn.delete')">

                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
          </div>

          <!-- Mini Fretboard (Analog monitor style) -->
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
      </TransitionGroup>

      <div v-if="snapshots.length === 0" class="jd-empty-state">
        <span class="jd-empty-icon">📂</span>
        <p>{{ t('snap.empty') }}</p>
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
  const tuning = [4, 9, 14, 19, 23, 28] 
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

<style scoped>
.snapshot-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.snapshot-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
}

.snapshot-date {
  font-family: var(--jd-mono);
  font-size: 10px;
  color: var(--jd-muted);
  margin-top: -2px;
}

.snapshot-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.jd-iconbtn--delete {
  width: 28px;
  height: 28px;
  border-color: rgba(255, 69, 58, 0.2);
  color: rgba(255, 69, 58, 0.6);
}
.jd-iconbtn--delete:hover {
  background: rgba(255, 69, 58, 0.1);
  border-color: var(--jd-red);
  color: var(--jd-red);
}
.jd-iconbtn--delete svg { width: 14px; height: 14px; }

.mini-note {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255,255,255,0.2);
}

.jd-empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--jd-surface);
  border: 1px dashed var(--jd-line-strong);
  border-radius: 18px;
  color: var(--jd-muted);
}
.jd-empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
  opacity: 0.3;
}

@media (max-width: 768px) {
  .snapshot-card {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .snapshot-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .snapshot-actions { margin-top: 0; }
}
</style>
