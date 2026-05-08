<template>
  <div id="view-player" class="view-panel active">
    <div class="quick-controls">
      <button class="btn-tap tap-feedback" id="tap-btn" @click="pb.tapTempo()">TAP</button>
      <button class="btn-icon" @click="pb.navigate(-1)">
        <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
      </button>
      <button class="btn-icon btn-play" :class="{ active: pb.isPlaying }" @click="pb.toggle()">
        <svg viewBox="0 0 24 24">
          <path v-if="!pb.isPlaying" d="M8 5v14l11-7z"/>
          <path v-else d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>
      <button class="btn-icon btn-stop" @click="pb.stop()">
        <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
      </button>
      <button class="btn-icon" @click="pb.navigate(1)">
        <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
      </button>
    </div>

    <div class="progression-player-area">
      <div class="area-header">
        <h2 class="area-title">{{ t('player.title') }}</h2>
        <div class="area-actions">
          <button class="btn-io" @click="exportProgression">{{ t('btn.export-json') }}</button>
          <button class="btn-io" @click="$refs.importFile.click()">{{ t('btn.import-json') }}</button>
          <input ref="importFile" type="file" style="display:none" accept=".json" @change="importProgression">
          <button class="btn-add-step" @click="pb.addStep()">{{ t('btn.add-step') }}</button>
          <button class="btn-reset" @click="pb.clearProgression()">{{ t('btn.clear-all') }}</button>
        </div>
      </div>

      <!-- Steps -->
      <div id="progression-steps" class="progression-steps-container">
        <ProgressionStep
          v-for="(step, idx) in pb.steps"
          :key="step.id"
          :step="step"
          :index="idx"
          :active="step.active"
          @remove="pb.removeStep(idx)"
          @update="(f,v) => pb.updateStep(idx, f, v)"
          @select="(sh,ct) => pb.selectStep(idx, sh, ct)"
        />
      </div>

      <!-- Voice leading -->
      <div v-if="pb.voiceLeadingData.length >= 2" style="overflow-x:auto;margin-bottom:10px;">
        <div style="font-size:0.72em;text-transform:uppercase;color:#555;font-weight:700;margin-bottom:6px;letter-spacing:0.5px;">
          Voice Leading — Guide Tones
        </div>
        <table class="vl-table">
          <thead><tr><th>Accordo</th><th>3ª</th><th>Δ</th><th>7ª</th><th>Δ</th></tr></thead>
          <tbody>
            <tr v-for="(d, i) in pb.voiceLeadingData" :key="i">
              <td class="vl-chord">{{ d.chord }}</td>
              <td class="vl-note">{{ d.thirdNote }}</td>
              <td><span class="vl-delta" :class="deltaClass(d.thirdAbs, pb.voiceLeadingData[i-1]?.thirdAbs)">{{ deltaStr(d.thirdAbs, pb.voiceLeadingData[i-1]?.thirdAbs) }}</span></td>
              <td class="vl-note">{{ d.seventhNote }}</td>
              <td><span class="vl-delta" :class="deltaClass(d.seventhAbs, pb.voiceLeadingData[i-1]?.seventhAbs)">{{ deltaStr(d.seventhAbs, pb.voiceLeadingData[i-1]?.seventhAbs) }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Controls -->
      <div class="progression-controls row g-3 m-0 w-100">
        <!-- Playback -->
        <div class="col-12 col-md-6 col-xl-3">
          <div class="control-section h-100">
            <div class="control-section-header">{{ t('section.playback') }}</div>
            <div class="row g-2 align-items-end mt-0">
              <div class="col-3 col-xl-auto" style="min-width:70px;">
                <div class="nav-group"><label>{{ t('label.bpm') }}</label>
                  <input type="number" :value="pb.bpm" @change="pb.bpm = +$event.target.value" style="width:70px;">
                </div>
              </div>
              <div class="col-9 col-xl">
                <div class="nav-group"><label>{{ t('label.vol') }}</label>
                  <input type="range" :value="pb.metroVol" @input="pb.metroVol = +$event.target.value" min="0" max="1" step="0.1">
                </div>
              </div>
              <div class="col-12 col-xl">
                <div class="nav-group"><label>{{ t('label.click') }}</label>
                  <select :value="pb.metroSound" @change="pb.metroSound = $event.target.value">
                    <option v-for="s in metroSounds" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <div class="col-12 col-xl">
                <div class="nav-group"><label>{{ t('label.style') }}</label>
                  <select v-model="pb.accompanimentStyle">
                    <option>Standard</option>
                    <option>Swing</option>
                    <option>Bossa</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chord Synth -->
        <div class="col-12 col-md-6 col-xl-3">
          <div class="control-section h-100">
            <div class="control-section-header">{{ t('section.chord-synth') }}</div>
            <div class="row g-2 align-items-end mt-0">
              <div class="col-6 col-xl">
                <div class="nav-group"><label>{{ t('label.sound') }}</label>
                  <select :value="pb.chordSound" @change="pb.chordSound = $event.target.value">
                    <option v-for="s in chordSounds" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
              </div>
              <div class="col-6 col-xl">
                <div class="nav-group"><label>{{ t('label.vol') }}</label>
                  <input type="range" :value="pb.chordVol" @input="pb.chordVol = +$event.target.value" min="0" max="0.5" step="0.05">
                </div>
              </div>
              <div class="col-12 col-xl-auto d-flex gap-2 flex-wrap">
                <div class="checkbox-container">
                  <input type="checkbox" id="play-chords-toggle" :checked="pb.playChords" @change="pb.playChords=$event.target.checked">
                  <label for="play-chords-toggle">{{ t('label.synth') }}</label>
                </div>
                <div class="checkbox-container">
                  <input type="checkbox" id="loop-selection" :checked="pb.loopSelection" @change="pb.loopSelection=$event.target.checked">
                  <label for="loop-selection">{{ t('label.loop') }}</label>
                </div>
                <div class="checkbox-container">
                  <input type="checkbox" id="swing-toggle" :checked="pb.swingEnabled" @change="pb.swingEnabled=$event.target.checked">
                  <label for="swing-toggle">{{ t('label.swing') }}</label>
                </div>
              </div>
              <div class="col-12">
                <button class="btn-io" style="width:100%;" @click="pb.autoAssignChords()">{{ t('btn.auto-chords') }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Transposition -->
        <div class="col-12 col-md-6 col-xl-3">
          <div class="control-section h-100">
            <div class="control-section-header">{{ t('section.transposition') }}</div>
            <div class="row g-2 mt-0">
              <div class="col-12">
                <div class="nav-group"><label>{{ t('label.prog-transpose') }}</label>
                  <div class="btn-group-stretched">
                    <button class="btn-io transpose-btn" @click="pb.transposeProgression(2)">&plus;1</button>
                    <button class="btn-io transpose-btn" @click="pb.transposeProgression(1)">&plus;&frac12;</button>
                    <button class="btn-io transpose-btn" @click="pb.transposeProgression(-1)">&minus;&frac12;</button>
                    <button class="btn-io transpose-btn" @click="pb.transposeProgression(-2)">&minus;1</button>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="nav-group"><label>{{ t('label.synth-octave') }}</label>
                  <div class="btn-group-stretched">
                    <button class="btn-io transpose-btn" @click="pb.transposeOctave(1)">+1</button>
                    <button class="btn-io transpose-btn" @click="pb.transposeOctave(-1)">-1</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transport -->
        <div class="col-12 col-md-6 col-xl-3">
          <div class="control-section h-100">
            <div class="control-section-header">{{ t('section.playback') }}</div>
            <div class="row g-2 justify-content-center align-items-center flex-grow-1 mt-0">
              <div class="col-auto"><button class="btn-icon" @click="pb.navigate(-1)"><svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button></div>
              <div class="col-auto">
                <button class="btn-icon btn-play" @click="pb.toggle()">
                  <svg viewBox="0 0 24 24">
                    <path v-if="!pb.isPlaying" d="M8 5v14l11-7z"/>
                    <path v-else d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </button>
              </div>
              <div class="col-auto"><button class="btn-icon btn-stop" @click="pb.stop()"><svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg></button></div>
              <div class="col-auto"><button class="btn-icon" @click="pb.navigate(1)"><svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlaybackStore } from '../stores/playback.js'
import { useAudioStore }    from '../stores/audio.js'
import { useI18n }          from '../composables/useI18n.js'
import ProgressionStep      from '../components/player/ProgressionStep.vue'

const pb    = usePlaybackStore()
const audio = useAudioStore()
const { t } = useI18n()

const metroSounds = computed(() => Object.keys(audio.METRONOME_SAMPLES))
const chordSounds = computed(() => Object.keys(audio.CHORD_SOUNDS))

function deltaStr(curr, prev) {
  if (curr == null || prev == null) return '–'
  const raw = (curr - prev + 12) % 12
  const d = raw > 6 ? raw - 12 : raw
  return d > 0 ? `+${d}` : `${d}`
}
function deltaClass(curr, prev) {
  if (curr == null || prev == null) return 'vl-static'
  const raw = (curr - prev + 12) % 12
  const d = raw > 6 ? raw - 12 : raw
  return d === 0 ? 'vl-static' : Math.abs(d) <= 2 ? 'vl-smooth' : 'vl-leap'
}

function exportProgression() {
  const data = {
    progression: pb.steps.map(s => ({
      root: s.root, scale: s.scale, bars: s.bars, beats: s.beats,
      denominator: s.denominator, chordName: s.chordName,
      chordOctave: s.chordOctave, chordIntervals: s.chordIntervals,
    })),
    bpm: pb.bpm,
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'jazz-viz-progression.json'; a.click()
  URL.revokeObjectURL(url)
}

function importProgression(event) {
  const file = event.target.files[0]; if (!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result)
      pb.clearProgression()
      pb.loadFromData(data)
    } catch { alert(t('err.invalid-json')) }
  }
  reader.readAsText(file)
  event.target.value = ''
}
</script>
