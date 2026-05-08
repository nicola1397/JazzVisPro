<template>
  <div id="view-lick-builder" class="view-panel active">
    <div class="importer-area" style="max-width:860px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="lb.title">{{ t('lb.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:15px;" data-i18n="lb.subtitle">{{ t('lb.subtitle') }}</p>

      <!-- Control Sections Row -->
      <div class="row g-3 m-0 w-100 mb-4">
        
        <!-- Playback Controls -->
        <div class="col-12 col-md-6 col-xl-4">
          <div class="control-section h-100">
            <div class="control-section-header">{{ t('section.playback') }}</div>
            <div class="row g-2 align-items-center mt-0">
              <div class="col-auto">
                <button class="btn-icon btn-play" @click="startPlay" :disabled="isPlaying || sequence.length === 0">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <div class="col-auto">
                <button class="btn-icon btn-stop" @click="stopPlay" :disabled="!isPlaying">
                  <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                </button>
              </div>
              <div class="col d-flex align-items-center gap-2 ms-2">
                <div class="checkbox-container">
                  <input type="checkbox" id="lb-loop" v-model="loopEnabled">
                  <label for="lb-loop">{{ t('lb.loop') }}</label>
                </div>
              </div>
            </div>
            <div class="row g-2 mt-2">
              <div class="col-auto">
                <div class="nav-group">
                  <label>{{ t('label.bpm') }}</label>
                  <input type="number" v-model.number="bpm" min="40" max="300" style="width:75px;">
                </div>
              </div>
              <div class="col">
                <div class="nav-group">
                  <label>{{ t('label.sound') }}</label>
                  <select v-model="soundName">
                    <option v-for="s in chordSounds" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lick Management -->
        <div class="col-12 col-md-6 col-xl-4">
          <div class="control-section h-100">
            <div class="control-section-header">Lick</div>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              <button class="btn-io" @click="undo">{{ t('lb.undo') }}</button>
              <button class="btn-reset" style="width:auto;padding:0 14px;" @click="clearSequence">{{ t('lb.clear') }}</button>
              <button class="btn-io" @click="transpose(1)">{{ t('lb.trans-up') }}</button>
              <button class="btn-io" @click="transpose(-1)">{{ t('lb.trans-down') }}</button>
            </div>
            <div class="mt-3">
              <div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);">
                <button
                  class="btn-io"
                  style="padding:0 12px;height:32px;font-size:0.8em;flex:1;"
                  @click="toggleSpeedTrainer"
                >{{ speedTrainerRunning ? 'Stop' : 'Speed Trainer' }}</button>
                <input
                  v-if="!speedTrainerRunning"
                  type="number"
                  v-model.number="trainerTargetBpm"
                  min="40"
                  max="300"
                  style="width:55px;height:32px;background:#1a1a1b;border:1px solid #444;color:#fff;border-radius:4px;font-size:0.8em;padding:0 5px;"
                />
                <span v-else style="font-size:0.8em;color:var(--accent);font-weight:700;min-width:40px;text-align:center;">
                  {{ bpm }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Export / Import -->
        <div class="col-12 col-md-6 col-xl-4">
          <div class="control-section h-100">
            <div class="control-section-header">IO</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              <button class="btn-io" @click="exportTab">{{ t('lb.export-tab') }}</button>
              <button class="btn-io" @click="exportJson">{{ t('lb.export-json') }}</button>
              <button class="btn-io" style="grid-column: span 2;" @click="$refs.importFile.click()">{{ t('lb.import-json') }}</button>
              <input ref="importFile" type="file" style="display:none;" accept=".json" @change="importJson">
            </div>
          </div>
        </div>

      </div>

      <!-- Sequence Display -->
      <div style="min-height:65px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 12px 18px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:15px;">
        <span v-if="sequence.length === 0" style="color:#555;font-size:0.85em;">{{ t('lb.empty') }}</span>
        <div
          v-for="(note, idx) in sequence"
          :key="idx"
          class="lb-note-pill"
          :style="playingIdx === idx ? 'background:rgba(255,214,10,0.22);border-color:var(--accent);' : ''"
          @click="cycleDuration(idx)"
        >
          <span>{{ note.noteName }}</span>
          <small>s{{ note.s + 1 }}/f{{ note.f }}</small>
          <div class="lb-pill-dur">{{ DUR_LABELS[note.dur] }}</div>
          <button
            class="lb-pill-delete"
            style="opacity:1"
            @click.stop="removeNote(idx)"
          >✕</button>
        </div>
      </div>

      <div class="teoria-tip">
        <span>{{ t('lb.tip') }}</span>
        <br><span style="font-size:0.85em;color:#888;margin-top:4px;display:block;">Clic sulla pillola → cambia durata · ✕ → rimuovi nota</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useAudioStore } from '../stores/audio.js'

const { t } = useI18n()
const audio = useAudioStore()

// ── Constants ─────────────────────────────────────────────────────────────────
const DUR_LABELS = { '4n':'1/4', '8n':'1/8', '16n':'1/16', '32n':'1/32' }
const DUR_ORDER  = ['4n', '8n', '16n', '32n']

const chordSounds = computed(() => Object.keys(audio.CHORD_SOUNDS))

// ── State ─────────────────────────────────────────────────────────────────────
const sequence = ref([])
const isPlaying = ref(false)
const playingIdx = ref(-1)
const bpm = ref(80)
const loopEnabled = ref(false)
const soundName = ref('Electric Piano')

const speedTrainerRunning = ref(false)
const trainerTargetBpm = ref(120)
let trainerInterval = null

// ── Actions ───────────────────────────────────────────────────────────────────
function addNote({ noteIndex, stringIndex, fretIndex, element }) {
  if (isPlaying.value) return
  const noteName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][noteIndex]
  sequence.value.push({
    noteName,
    noteIndex,
    s: stringIndex,
    f: fretIndex,
    dur: '8n'
  })
}

function removeNote(idx) {
  sequence.value.splice(idx, 1)
}

function clearSequence() {
  sequence.value = []
}

function undo() {
  sequence.value.pop()
}

function transpose(semitones) {
  sequence.value = sequence.value.map(n => {
    const newIdx = (n.noteIndex + semitones + 12) % 12
    const noteName = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'][newIdx]
    return { ...n, noteIndex: newIdx, noteName }
  })
}

function cycleDuration(idx) {
  const current = sequence.value[idx].dur
  const nextIdx = (DUR_ORDER.indexOf(current) + 1) % DUR_ORDER.length
  sequence.value[idx].dur = DUR_ORDER[nextIdx]
}

// ── Playback Logic ────────────────────────────────────────────────────────────
let playTimeout = null

function startPlay() {
  if (sequence.value.length === 0) return
  isPlaying.value = true
  playingIdx.value = 0
  audio.init()
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
        bpm.value += 2
        startPlay()
      }
      return
    }
  }

  const note = sequence.value[playingIdx.value]
  // In lick builder, we use a simple playNote or similar.
  // Actually audio store has playChord, we use it with single note [0]
  audio.playChord([0], note.noteIndex, audio.context.currentTime, 1, 0.2, soundName.value, 4)

  const ms = (60 / bpm.value) * 1000 * (4 / parseInt(note.dur))
  playingIdx.value++
  playTimeout = setTimeout(playNext, ms)
}

function toggleSpeedTrainer() {
  speedTrainerRunning.value = !speedTrainerRunning.value
  if (!speedTrainerRunning.value) stopPlay()
}

// ── IO ────────────────────────────────────────────────────────────────────────
function exportTab() {
  const text = sequence.value.map(n => `${n.noteName}(s${n.s+1}/f${n.f})[${n.dur}]`).join(' ')
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lick_tab.txt'; a.click()
}

function exportJson() {
  const data = JSON.stringify({ sequence: sequence.value, bpm: bpm.value })
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lick.json'; a.click()
}

function importJson(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result)
      if (data.sequence) {
        sequence.value = data.sequence
        if (data.bpm) bpm.value = data.bpm
      }
    } catch { alert('Invalid JSON file') }
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
