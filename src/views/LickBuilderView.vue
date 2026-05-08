<template>
  <div id="view-lick-builder" class="view-panel active">
    <div class="importer-area" style="max-width:860px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="lb.title">Lick Builder</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:15px;" data-i18n="lb.subtitle">{{ t('lb.subtitle') }}</p>

      <!-- Controls -->
      <div class="progression-controls row g-3 m-0 w-100 mb-3">

        <!-- Playback -->
        <div class="col-12 col-sm-6">
          <div class="control-section h-100">
            <div class="control-section-header">Playback</div>
            <div class="row g-2 align-items-end mt-0">
              <div class="col-6">
                <div class="nav-group"><label>BPM</label>
                  <input type="number" v-model.number="bpm" min="20" max="300" style="width:70px;" />
                </div>
              </div>
              <div class="col-6">
                <div class="nav-group"><label>{{ t('lb.subdivision') }}</label>
                  <select v-model.number="defaultDur">
                    <option v-for="(label, val) in DUR_LABELS" :key="val" :value="Number(val)">{{ label }}</option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <div class="nav-group"><label>{{ t('lb.sound') }}</label>
                  <select v-model="soundName">
                    <option v-for="s in soundOptions" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <div class="col-12">
                <div class="checkbox-container">
                  <input type="checkbox" id="lb-loop-toggle" v-model="loop">
                  <label for="lb-loop-toggle">{{ t('lb.loop') }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sequenza -->
        <div class="col-12 col-sm-6">
          <div class="control-section h-100">
            <div class="control-section-header">Sequenza</div>
            <div class="row g-2 mt-0">
              <div class="col-6">
                <button class="btn-add-step" style="width:100%;" @click="startPlay" :disabled="isPlaying || sequence.length === 0">{{ t('lb.play') }}</button>
              </div>
              <div class="col-6">
                <button class="btn-reset" style="width:100%;padding:0 8px;" @click="stopPlay" :disabled="!isPlaying">{{ t('lb.stop') }}</button>
              </div>
              <div class="col-6">
                <button class="btn-io" style="width:100%;" @click="undo">{{ t('lb.undo') }}</button>
              </div>
              <div class="col-6">
                <button class="btn-reset" style="width:100%;padding:0 8px;" @click="clearSequence">{{ t('lb.clear') }}</button>
              </div>
              <div class="col-12">
                <div class="nav-group"><label>{{ t('section.transposition') }}</label>
                  <div class="btn-group-stretched">
                    <button class="btn-io transpose-btn" @click="transpose(1)">{{ t('lb.trans-up') }}</button>
                    <button class="btn-io transpose-btn" @click="transpose(-1)">{{ t('lb.trans-down') }}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Speed Trainer -->
        <div class="col-12 col-sm-6">
          <div class="control-section h-100">
            <div class="control-section-header">Speed Trainer</div>
            <div class="row g-2 align-items-center mt-0">
              <div class="col-12 d-flex gap-2 align-items-center">
                <button class="btn-io" style="flex:1;" @click="toggleSpeedTrainer">
                  {{ speedTrainerRunning ? t('lb.stop') : t('lb.speed-trainer') }}
                </button>
                <input v-if="!speedTrainerRunning" type="number" v-model.number="trainerTargetBpm" min="40" max="300" style="width:60px;" />
                <span v-else style="font-size:0.85em;color:var(--accent);font-weight:700;min-width:50px;text-align:center;">{{ bpm }} BPM</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Export / Import -->
        <div class="col-12 col-sm-6">
          <div class="control-section h-100">
            <div class="control-section-header">Export / Import</div>
            <div class="row g-2 mt-0">
              <div class="col-12">
                <button class="btn-io" style="width:100%;" @click="exportTab">{{ t('lb.export-tab') }}</button>
              </div>
              <div class="col-6">
                <button class="btn-io" style="width:100%;" @click="exportJson">{{ t('lb.export-json') }}</button>
              </div>
              <div class="col-6">
                <button class="btn-io" style="width:100%;" @click="$refs.importFile.click()">{{ t('lb.import-json') }}</button>
                <input ref="importFile" type="file" style="display:none;" accept=".json" @change="importJson">
              </div>
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
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES, NOTES_FLAT } from '../utils/theory.js'
import { BASE_OCTAVES } from '../utils/constants.js'

const audio    = useAudioStore()
const appStore = useAppStore()
const { t }    = useI18n()

// ── Constants ─────────────────────────────────────────────────────────────────
const DUR_LABELS  = { 0.25:'♬16°', 0.5:'♪8°', 1:'♩4°', 2:'𝅗𝅥 2°' }
const DUR_CYCLE   = [0.25, 0.5, 1, 2]

// ── State ─────────────────────────────────────────────────────────────────────
const sequence     = ref([])   // { noteIdx, noteName, s, f, dur }
const bpm          = ref(80)
const soundName    = ref('Electric Piano')
const defaultDur   = ref(0.5)
const loop         = ref(false)
const isPlaying    = ref(false)
const playingIdx   = ref(-1)

const trainerTargetBpm    = ref(120)
const speedTrainerRunning = ref(false)
let trainerInterval       = null

let playTimers = []

// ── Computed ──────────────────────────────────────────────────────────────────
const soundOptions = computed(() => Object.keys(audio.CHORD_SOUNDS))

const noteNames = computed(() => appStore.accidental === '#' ? NOTES : NOTES_FLAT)

// ── Fretboard listener ────────────────────────────────────────────────────────
function onFretClick(event) {
  const { noteIndex, stringIndex, fretIndex } = event.detail
  const tuning = appStore.currentTuning
  const octave = BASE_OCTAVES[stringIndex] + Math.floor((tuning[stringIndex] + fretIndex) / 12)
  const name   = noteNames.value[((noteIndex % 12) + 12) % 12]

  // Play immediately
  audio.init()
  audio.playNoteImmediate(noteIndex, 0.3, 0.15, soundName.value, octave)

  // Add to sequence
  sequence.value.push({
    noteIdx:  noteIndex,
    noteName: name,
    s:        stringIndex,
    f:        fretIndex,
    oct:      octave,
    dur:      defaultDur.value,
  })
}

onMounted(() => {
  window.addEventListener('fretboard:noteClick', onFretClick)
})

onUnmounted(() => {
  window.removeEventListener('fretboard:noteClick', onFretClick)
  stopPlay()
  stopSpeedTrainer()
  window.dispatchEvent(new CustomEvent('lickbuilder:stop'))
})

// ── Sequence Actions ──────────────────────────────────────────────────────────
function removeNote(idx) {
  sequence.value.splice(idx, 1)
}

function undo() {
  sequence.value.pop()
}

function clearSequence() {
  stopPlay()
  sequence.value = []
}

function cycleDuration(idx) {
  const note    = sequence.value[idx]
  const ci      = DUR_CYCLE.indexOf(note.dur)
  note.dur      = DUR_CYCLE[(ci + 1) % DUR_CYCLE.length]
}

function transpose(semitones) {
  sequence.value = sequence.value.map(note => {
    let newIdx = (note.noteIdx + semitones + 12) % 12
    return {
      ...note,
      noteIdx:  newIdx,
      noteName: noteNames.value[newIdx],
    }
  })
}

// ── Playback ──────────────────────────────────────────────────────────────────
function clearTimers() {
  playTimers.forEach(id => clearTimeout(id))
  playTimers = []
}

function startPlay() {
  if (!sequence.value.length) return
  audio.init()
  stopPlay()
  isPlaying.value = true
  schedulePlay(0)
}

function schedulePlay(startNoteIdx) {
  let delay = 0
  const seq = sequence.value
  if (!seq.length) { isPlaying.value = false; return }

  for (let i = startNoteIdx; i < seq.length; i++) {
    const note    = seq[i]
    const noteDur = (60 / bpm.value) * note.dur
    const capturedIdx = i

    const id = setTimeout(() => {
      if (!isPlaying.value) return
      playingIdx.value = capturedIdx
      audio.playNoteImmediate(note.noteIdx, noteDur * 0.9, 0.25, soundName.value, note.oct ?? 4)
    }, delay * 1000)

    playTimers.push(id)
    delay += noteDur
  }

  // End of sequence
  const endId = setTimeout(() => {
    playingIdx.value = -1
    if (loop.value && isPlaying.value) {
      clearTimers()
      schedulePlay(0)
    } else {
      isPlaying.value = false
    }
  }, delay * 1000)
  playTimers.push(endId)
}

function stopPlay() {
  clearTimers()
  isPlaying.value = false
  playingIdx.value = -1
}

// ── Speed Trainer ─────────────────────────────────────────────────────────────
function toggleSpeedTrainer() {
  if (speedTrainerRunning.value) {
    stopSpeedTrainer()
  } else {
    startSpeedTrainer()
  }
}

function startSpeedTrainer() {
  const target    = trainerTargetBpm.value
  bpm.value       = Math.max(20, target - 30)
  speedTrainerRunning.value = true

  trainerInterval = setInterval(() => {
    if (bpm.value + 5 <= target) {
      bpm.value += 5
    } else {
      bpm.value = target
      stopSpeedTrainer()
    }
  }, 8000)
}

function stopSpeedTrainer() {
  speedTrainerRunning.value = false
  if (trainerInterval) {
    clearInterval(trainerInterval)
    trainerInterval = null
  }
}

// ── Export/Import ─────────────────────────────────────────────────────────────
function exportTab() {
  // 6 strings: e(0) B(1) G(2) D(3) A(4) E(5) — displayed top to bottom
  const STRING_NAMES = ['e','B','G','D','A','E']
  const lines = STRING_NAMES.map((name, strIdx) => {
    const cells = sequence.value.map(note => {
      if (note.s === strIdx) return String(note.f).padStart(3, '-').padEnd(3, '-')
      return '---'
    })
    return name + '|' + cells.join('|') + '|'
  })
  const text = lines.join('\n')
  const blob = new Blob([text], { type:'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'lick.txt'; a.click()
  URL.revokeObjectURL(url)
}

function exportJson() {
  const data = { bpm: bpm.value, sequence: sequence.value }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'lick.json'; a.click()
  URL.revokeObjectURL(url)
}

function importJson(event) {
  const file = event.target.files[0]; if (!file) return
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
</script>
