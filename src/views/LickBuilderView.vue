<template>
  <div id="view-lick-builder" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('lb.title') }}</h1>
      </div>
      <nav class="jd-toolbar" aria-label="Lick actions">
        <button class="jd-iconbtn" @click="exportJson" :title="t('btn.export-json')" aria-label="Export lick">
          <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
        </button>
        <button class="jd-iconbtn" @click="$refs.importFile.click()" :title="t('btn.import-json')" aria-label="Import lick">
          <svg viewBox="0 0 24 24"><path d="M19 13h-4V7H9v6H5l7 7 7-7zM5 4v2h14V4H5z" transform="rotate(180 12 12)"/></svg>
        </button>
        <input ref="importFile" type="file" accept=".json" hidden @change="importJson">
        <span class="jd-toolbar-sep"></span>
        <button class="jd-toolbtn jd-toolbtn--reset" @click="clearSequence">{{ t('lb.clear') }}</button>
      </nav>
    </header>

    <section class="jd-console" :class="{ 'jd-playing': isPlaying }">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-master">
        <div class="jd-bpm">
          <div class="jd-bpm-frame">
            <span class="jd-bpm-led" :class="{ on: isPlaying }" aria-hidden="true"></span>
            <input type="number" class="jd-bpm-input" v-model.number="bpm" min="40" max="300" :aria-label="t('label.bpm')">
            <span class="jd-bpm-unit">{{ t('label.bpm') }}</span>
          </div>
        </div>

        <div class="jd-transport">
          <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': isPlaying }"
                  @click="isPlaying ? stopPlay() : startPlay()"
                  :disabled="sequence.length === 0"
                  :aria-label="isPlaying ? 'Stop' : 'Play'">
            <svg v-if="!isPlaying" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <label class="jd-mode" :class="{ on: loopEnabled }">
            <input type="checkbox" v-model="loopEnabled">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('lb.loop') }}</span>
          </label>
        </div>

        <div class="jd-feel">
          <span class="jd-feel-label">{{ t('label.sound') }}</span>
          <select v-model="soundName" class="jd-feel-select" aria-label="Instrument sound">
            <option v-for="s in chordSounds" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <div class="jd-pitch">
        <div class="jd-section-label">
          <span>{{ t('label.lick-tools') }}</span>
          <span class="jd-section-rule"></span>
        </div>
        <div class="jd-pitch-grid">
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">Edit</span>
            <div class="jd-pitch-keys">
              <button @click="undo"><span>{{ t('lb.undo') }}</span></button>
              <button @click="transpose(1)"><span>{{ t('lb.trans-up') }}</span></button>
              <button @click="transpose(-1)"><span>{{ t('lb.trans-down') }}</span></button>
            </div>
          </div>
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('label.trainer') }}</span>
            <div class="jd-pitch-keys" style="grid-template-columns: 1fr auto;">
              <button @click="toggleSpeedTrainer" :class="{ on: speedTrainerRunning }">
                <span>{{ speedTrainerRunning ? t('lb.stop') : t('lb.speed-trainer') }}</span>
              </button>
              <input v-if="!speedTrainerRunning" type="number" v-model.number="trainerTargetBpm" min="40" max="300"
                     style="width:60px; height:38px; border-radius:7px;">
              <span v-else class="jd-fader-value" style="align-self:center; font-size:16px; width:auto; padding:0 10px;">{{ bpm }} target</span>
            </div>
          </div>
          <button class="jd-extra" style="align-self:end; height:38px;" @click="exportTab">{{ t('lb.export-tab') }}</button>
        </div>
      </div>
    </section>

    <!-- Sequence Display with Drag-and-Drop -->
    <div class="jd-section-label">
      <span>{{ t('label.sequence') }}</span>
      <span class="jd-section-rule"></span>
      <span v-if="sequence.length === 0" class="jd-section-hint">{{ t('lb.empty') }}</span>
    </div>

    <draggable 
      v-model="sequence" 
      item-key="id"
      class="lb-sequence-container"
      ghost-class="lb-pill-ghost"
      :animation="200"
    >
      <template #item="{element, index}">
        <div
          class="lb-note-pill"
          :class="{ 'playing': playingIdx === index }"
          @click="cycleDuration(index)"
        >
          <span class="note-name">{{ element.noteName }}</span>
          <span class="pos-info">s{{ element.s + 1 }}/f{{ element.f }}</span>
          <div class="dur-badge">{{ DUR_LABELS[element.dur] }}</div>
          <button
            class="lb-pill-delete"
            @click.stop="removeNote(index)"
          >✕</button>
        </div>
      </template>
    </draggable>

    <div class="teoria-tip">
      <strong>{{ t('label.pro-tip') }}:</strong> {{ t('lb.tip') }}
      <div style="font-size:0.9em; opacity:0.7; margin-top:6px;">
        Clic sulla pillola → cambia durata · ✕ → rimuovi nota · Trascina per riordinare
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import draggable from 'vuedraggable'
import { useI18n } from '../composables/useI18n.js'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { NOTES, NOTES_FLAT } from '../utils/theory.js'

const { t } = useI18n()
const audio = useAudioStore()
const appStore = useAppStore()

// ── Constants ─────────────────────────────────────────────────────────────────
const DUR_LABELS = { '4n':'1/4', '8n':'1/8', '16n':'1/16', '32n':'1/32' }
const DUR_ORDER  = ['4n', '8n', '16n', '32n']

const chordSounds = computed(() => Object.keys(audio.CHORD_SOUNDS))

// ── State ─────────────────────────────────────────────────────────────────────
const sequence = ref([])
const isPlaying = ref(false)
const playingIdx = ref(-1)
const bpm = ref(120)
const loopEnabled = ref(false)
const soundName = ref('Electric Piano')

const speedTrainerRunning = ref(false)
const trainerTargetBpm = ref(160)
let trainerInterval = null

let playTimeout = null
let history = []

// ── Actions ───────────────────────────────────────────────────────────────────
function saveHistory() {
  history.push(JSON.stringify(sequence.value))
  if (history.length > 50) history.shift()
}

async function addNote({ noteIndex, midiNote, stringIndex, fretIndex }) {
  if (isPlaying.value) return
  
  // Play note immediate feedback
  await audio.playNoteImmediate(midiNote, '8n', 0.5, soundName.value)

  const names = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  const noteName = names[noteIndex]
  
  saveHistory()
  sequence.value.push({
    id: Date.now() + Math.random(), // Unique ID for draggable
    noteName,
    noteIndex,
    midiNote,
    s: stringIndex,
    f: fretIndex,
    dur: '8n'
  })
}

function removeNote(idx) {
  saveHistory()
  sequence.value.splice(idx, 1)
}

function clearSequence() {
  saveHistory()
  stopPlay()
  sequence.value = []
}

function undo() {
  if (history.length > 0) {
    sequence.value = JSON.parse(history.pop())
  }
}

function transpose(semitones) {
  saveHistory()
  const names = appStore.accidental === '#' ? NOTES : NOTES_FLAT
  sequence.value = sequence.value.map(n => {
    const newIdx = (n.noteIndex + semitones + 12) % 12
    const noteName = names[newIdx]
    return { 
      ...n, 
      noteIndex: newIdx, 
      noteName, 
      midiNote: n.midiNote + semitones 
    }
  })
}

function cycleDuration(idx) {
  saveHistory()
  const current = sequence.value[idx].dur
  const nextIdx = (DUR_ORDER.indexOf(current) + 1) % DUR_ORDER.length
  sequence.value[idx].dur = DUR_ORDER[nextIdx]
}

// ── Playback Logic ────────────────────────────────────────────────────────────
async function startPlay() {
  if (sequence.value.length === 0) return
  isPlaying.value = true
  playingIdx.value = 0
  await audio.init()
  playNext()
}

function stopPlay() {
  isPlaying.value = false
  playingIdx.value = -1
  if (playTimeout) clearTimeout(playTimeout)
}

function playNext() {
  if (!isPlaying.value) return
  
  if (playingIdx.value >= sequence.value.length) {
    if (loopEnabled.value) {
      playingIdx.value = 0
    } else {
      stopPlay()
      if (speedTrainerRunning.value && bpm.value < trainerTargetBpm.value) {
        bpm.value = Math.min(trainerTargetBpm.value, bpm.value + 2)
        setTimeout(startPlay, 500)
      }
      return
    }
  }

  const note = sequence.value[playingIdx.value]
  audio.playNoteImmediate(note.midiNote, note.dur, 0.5, soundName.value)

  const durFactor = { '4n':1, '8n':0.5, '16n':0.25, '32n':0.125 }[note.dur] || 0.5
  const ms = (60 / bpm.value) * 1000 * (durFactor * 4)
  
  playingIdx.value++
  playTimeout = setTimeout(playNext, ms)
}

function toggleSpeedTrainer() {
  speedTrainerRunning.value = !speedTrainerRunning.value
  if (!speedTrainerRunning.value) stopPlay()
}

// ── IO ────────────────────────────────────────────────────────────────────────
function exportTab() {
  const STRING_NAMES = ['e','B','G','D','A','E']
  const lines = STRING_NAMES.map((name, strIdx) => {
    const cells = sequence.value.map(note => {
      if (note.s === strIdx) return String(note.f).padStart(2, '-').padEnd(2, '-')
      return '--'
    })
    return name + '|' + cells.join('|') + '|'
  })
  const text = lines.join('\n')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lick_tab.txt'; a.click()
  URL.revokeObjectURL(url)
}

function exportJson() {
  const data = JSON.stringify({ sequence: sequence.value, bpm: bpm.value })
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lick.json'; a.click()
  URL.revokeObjectURL(url)
}

function importJson(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result)
      if (data.sequence) {
        saveHistory()
        sequence.value = data.sequence.map(n => ({
          ...n,
          id: n.id || (Date.now() + Math.random())
        }))
        if (data.bpm) bpm.value = data.bpm
      }
    } catch { alert(t('err.invalid-json')) }
  }
  reader.readAsText(file)
  event.target.value = ''
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
function onNoteClick(e) { addNote(e.detail) }
function onLickStop() { stopPlay() }

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onNoteClick)
  window.addEventListener('lickbuilder:stop', onLickStop)
})

onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onNoteClick)
  window.removeEventListener('lickbuilder:stop', onLickStop)
  stopPlay()
})
</script>

<style scoped>
.lb-sequence-container {
  min-height: 80px;
  background: rgba(0,0,0,0.2);
  border: 1px dashed rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.lb-note-pill {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.lb-note-pill:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}

.lb-note-pill.playing {
  background: var(--jd-amber);
  border-color: white;
  color: var(--jd-bg-deep);
}

.lb-note-pill.playing .note-name,
.lb-note-pill.playing .pos-info,
.lb-note-pill.playing .dur-badge {
  color: inherit;
}

.note-name {
  font-weight: 700;
  font-size: 14px;
}

.pos-info {
  font-size: 10px;
  opacity: 0.6;
  font-family: var(--jd-mono);
}

.dur-badge {
  background: rgba(0,0,0,0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.lb-pill-delete {
  background: none;
  border: none;
  color: var(--jd-red);
  padding: 0;
  margin-left: 4px;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.lb-pill-delete:hover {
  opacity: 1;
}

.lb-pill-ghost {
  opacity: 0.3;
}

.jd-section-hint {
  font-size: 12px;
  color: var(--jd-muted);
  font-style: italic;
  margin-left: 10px;
}
</style>
