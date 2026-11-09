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
        <div v-for="snap in snaps.list" :key="snap.id" class="snapshot-card">
          <!-- Meta -->
          <div class="snapshot-meta">
            <div class="snapshot-title-row">
              <input
                v-if="renamingId === snap.id"
                v-model="editLabel"
                class="snapshot-rename-input"
                :aria-label="t('btn.rename')"
                @keyup.enter="commitRename(snap.id)"
                @keyup.esc="renamingId = null"
                @blur="commitRename(snap.id)"
              />
              <h3 v-else>{{ snap.label }}</h3>
              <button
                v-if="renamingId !== snap.id"
                class="jd-iconbtn jd-iconbtn--rename"
                :title="t('btn.rename')" :aria-label="t('btn.rename')"
                @click="startRename(snap)"
              >✎</button>
            </div>
            <div class="snapshot-date">{{ when(snap.date) }} · {{ summary(snap.state) }}</div>
            <div class="snapshot-actions">
              <button class="jd-extra" @click="load(snap)">{{ t('snap.open') }}</button>
              <button class="jd-iconbtn jd-iconbtn--delete" :title="t('btn.delete')" :aria-label="t('btn.delete')" @click="remove(snap)">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
          </div>

          <!-- Mini Fretboard (Analog monitor style): high E on top, frets 0–15 -->
          <div class="mini-fretboard-wrap" aria-hidden="true">
            <div class="mini-fretboard">
              <div v-for="s in 6" :key="s" class="mini-string">
                <div v-for="f in 16" :key="f" class="mini-fret" :class="{ 'mini-fret-0': f === 1 }">
                  <div v-if="dotsOf(snap).has(`${s - 1}-${f - 1}`)" class="mini-note" :style="{ background: dotsOf(snap).get(`${s - 1}-${f - 1}`) }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="snaps.list.length === 0" class="jd-empty-state">
        <span class="jd-empty-icon">📂</span>
        <p>{{ t('snap.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { confirmDialog, toast } from '../composables/useToast.js'
import { useAppStore } from '../stores/app.js'
import { useSnapshotsStore } from '../stores/snapshots.js'
import { useI18n } from '../composables/useI18n.js'
import { snapshotDots } from '../utils/snapshotPreview.js'

const appStore = useAppStore()
const snaps = useSnapshotsStore()
const router = useRouter()
const { t } = useI18n()

snaps.reload()
const renamingId = ref(null)
const editLabel = ref('')

const previews = new WeakMap()
function dotsOf(snap) {
  if (!previews.has(snap)) previews.set(snap, snapshotDots(snap.state))
  return previews.get(snap)
}

function when(date) {
  const d = new Date(date)
  return isNaN(d) ? date : d.toLocaleString(appStore.lang === 'en' ? 'en-GB' : 'it-IT', { dateStyle: 'medium', timeStyle: 'short' })
}
function summary(st) {
  return [st.tuningName, t('opt.' + (st.explorerMode || 'normal'))].filter(Boolean).join(' · ')
}

function createSnapshot() {
  const s = snaps.add(t)
  toast(t('snap.saved-one').replace('{s}', s.label), { type: 'success' })
}

async function startRename(snap) {
  renamingId.value = snap.id
  editLabel.value = snap.label
  await nextTick()
  document.querySelector('.snapshot-rename-input')?.focus()
}
function commitRename(id) {
  if (renamingId.value !== id) return
  snaps.rename(id, editLabel.value)
  renamingId.value = null
}

function remove(snap) {
  const removed = snaps.remove(snap.id)
  if (removed) toast(t('snap.deleted').replace('{s}', snap.label), { timeout: 6000, action: { label: t('cst.undo'), run: () => snaps.restore(removed) } })
}

async function clearSnapshots() {
  if (await confirmDialog({ message: t('snap.confirm-clear'), confirmLabel: t('btn.delete-all'), danger: true })) snaps.clear()
}

// Restores the whole Explorer as it was and opens it
function load(snap) {
  snaps.apply(snap.id)
  router.push('/explorer')
  toast(t('snap.opened').replace('{s}', snap.label))
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

.snapshot-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.snapshot-title-row h3 { margin: 0; flex: 1; }

.snapshot-rename-input {
  flex: 1;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--jd-amber);
  border-radius: 6px;
  padding: 4px 8px;
  color: var(--jd-text);
  font-size: 14px;
  font-weight: 700;
  font-family: var(--jd-sans);
  outline: none;
}

.jd-iconbtn--rename {
  width: 30px;
  height: 30px;
  font-size: 14px;
  color: var(--jd-muted);
  flex-shrink: 0;
}
.jd-iconbtn--rename:hover {
  color: var(--jd-amber);
  border-color: var(--jd-amber);
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
  width: 30px;
  height: 30px;
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
