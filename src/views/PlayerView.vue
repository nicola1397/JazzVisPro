<template>
  <div id="view-player" class="view-panel active jd-view">
    <!-- ───── TITLE BAR ─────────────────────────────────────────── -->
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('player.title') }}</h1>
      </div>
      <nav class="jd-toolbar" aria-label="Player actions">
        <button class="jd-iconbtn" @click="exportProgression" :title="t('btn.export-json')" aria-label="Export progression">
          <svg viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>
        </button>
        <button class="jd-iconbtn" @click="$refs.importFile.click()" :title="t('btn.import-json')" aria-label="Import progression">
          <svg viewBox="0 0 24 24"><path d="M19 13h-4V7H9v6H5l7 7 7-7zM5 4v2h14V4H5z" transform="rotate(180 12 12)"/></svg>
        </button>
        <input ref="importFile" type="file" accept=".json" hidden @change="importProgression">
        <span class="jd-toolbar-sep"></span>
        <button class="jd-toolbtn jd-toolbtn--add" @click="pb.addStep()">
          <span aria-hidden="true">＋</span> {{ t('btn.add-step') }}
        </button>
        <button class="jd-toolbtn jd-toolbtn--reset" @click="pb.clearProgression()">{{ t('btn.clear-all') }}</button>
      </nav>
    </header>

    <Transition name="jd-fade">
      <div v-if="pb.improvOn" class="jd-improv-banner" role="status">
        <span class="jd-improv-bullet" aria-hidden="true"></span>
        <strong>{{ t('imp.mode') }}</strong>
        <span class="jd-improv-helper">{{ t('imp.helper') }}</span>
      </div>
    </Transition>

    <!-- ───── CONSOLE ─────────────────────────────────────────────── -->
    <section class="jd-console" :class="{ 'jd-playing': pb.isPlaying }">
      <div class="jd-grain" aria-hidden="true"></div>

      <!-- MASTER ROW: BPM · Transport · Modes · Feel ──────────── -->
      <div class="jd-master">
        <div class="jd-bpm">
          <div class="jd-bpm-frame">
            <span class="jd-bpm-led" :class="{ on: pb.isPlaying }" aria-hidden="true"></span>
            <input type="text" inputmode="numeric" pattern="[0-9]*"
                   class="jd-bpm-input"
                   v-model="bpmInput"
                   @blur="commitBpm"
                   @keydown.enter="commitBpm($event); $event.target.blur()"
                   :aria-label="t('label.bpm')">
            <span class="jd-bpm-unit">{{ t('label.bpm') }}</span>
          </div>
          <button class="jd-tap" @click="pb.tapTempo()" aria-label="Tap tempo">
            <span class="jd-tap-text">{{ t('label.tap') }}</span>
            <span class="jd-tap-sub">{{ t('label.tempo') }}</span>
          </button>
        </div>

        <div class="jd-transport">
          <button class="jd-tbtn" @click="pb.navigate(-1)" aria-label="Previous step">
            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button class="jd-tbtn jd-tbtn--play" :class="{ 'jd-tbtn--playing': pb.isPlaying }"
                  @click="pb.toggle()" :aria-label="pb.isPlaying ? 'Pause' : 'Play'">
            <svg v-if="!pb.isPlaying" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button class="jd-tbtn" @click="pb.stop()" aria-label="Stop">
            <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
          </button>
          <button class="jd-tbtn" @click="pb.navigate(1)" aria-label="Next step">
            <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        <div class="jd-modes">
          <label class="jd-mode" :class="{ on: pb.loopSelection }">
            <input type="checkbox" :checked="pb.loopSelection" @change="pb.loopSelection = $event.target.checked">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('label.loop') }}</span>
          </label>
          <label class="jd-mode" :class="{ on: pb.swingEnabled }">
            <input type="checkbox" :checked="pb.swingEnabled" @change="pb.swingEnabled = $event.target.checked">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('label.swing') }}</span>
          </label>
          <label class="jd-mode jd-mode--improv" :class="{ on: pb.improvOn }">
            <input type="checkbox" :checked="pb.improvOn" @change="pb.improvOn = $event.target.checked">
            <span class="jd-mode-dot" aria-hidden="true"></span>
            <span class="jd-mode-text">{{ t('imp.mode') }}</span>
          </label>
        </div>

        <div class="jd-feel">
          <span class="jd-feel-label">{{ t('label.feel') }}</span>
          <select v-model="pb.accompanimentStyle" class="jd-feel-select" aria-label="Accompaniment style">
            <option value="Standard">{{ t('opt.standard') }}</option>
            <option value="Swing">{{ t('opt.swing') }}</option>
            <option value="Bossa">{{ t('opt.bossa') }}</option>
          </select>
        </div>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <!-- ENGINE STACK ────────────────────────────────────────── -->
      <div class="jd-engines">
        <div class="jd-section-label">
          <span>{{ t('label.engines') }}</span>
          <span class="jd-section-rule"></span>
          <span class="jd-section-hint" v-if="!pb.playChords && !pb.bassOn && !pb.drumsOn">{{ t('label.flip-switch') }}</span>
        </div>

        <!-- METRO (monitor + control) -->
        <div class="jd-channel jd-channel--metro" :class="{ on: pb.metroOn }">
          <button class="jd-switch" :class="{ on: pb.metroOn }"
                  @click="pb.metroOn = !pb.metroOn"
                  :aria-label="(pb.metroOn ? 'Disable' : 'Enable') + ' metronome'"
                  :aria-pressed="pb.metroOn">
            <span class="jd-switch-thumb"></span>
          </button>
          <div class="jd-channel-monitor" aria-hidden="true">
            <span class="jd-channel-led"></span>
          </div>
          <div class="jd-channel-id">
            <span class="jd-channel-icon" aria-hidden="true">⏱</span>
            <div class="jd-channel-meta">
              <span class="jd-channel-name">{{ t('label.metronome') }}</span>
              <span class="jd-channel-tag">{{ pb.metroOn ? pb.metroSound : 'muted' }}</span>
            </div>
          </div>
          <select class="jd-select" :value="pb.metroSound" @change="pb.metroSound = $event.target.value"
                  :disabled="!pb.metroOn" :aria-label="t('label.click')">
            <option v-for="s in metroSounds" :key="s" :value="s">{{ s }}</option>
          </select>
          <div class="jd-fader">
            <input type="range" min="0" max="1" step="0.05" :value="pb.metroVol"
                   @input="pb.metroVol = +$event.target.value"
                   class="jd-range"
                   :style="{ '--p': (pb.metroVol*100) + '%' }"
                   :disabled="!pb.metroOn"
                   :aria-label="`Metronome ${t('label.vol')}`">
            <span class="jd-fader-value">{{ Math.round(pb.metroVol * 100) }}</span>
          </div>
          <span class="jd-channel-extra-spacer" aria-hidden="true"></span>
        </div>

        <!-- SYNTH -->
        <div class="jd-channel jd-channel--synth" :class="{ on: pb.playChords }">
          <button class="jd-switch" :class="{ on: pb.playChords }"
                  @click="pb.playChords = !pb.playChords"
                  :aria-label="(pb.playChords ? 'Disable' : 'Enable') + ' chord synth'"
                  :aria-pressed="pb.playChords">
            <span class="jd-switch-thumb"></span>
          </button>
          <div class="jd-channel-monitor" aria-hidden="true">
            <span class="jd-channel-led"></span>
          </div>
          <div class="jd-channel-id">
            <span class="jd-channel-icon" aria-hidden="true">🎹</span>
            <div class="jd-channel-meta">
              <span class="jd-channel-name">{{ t('label.chord-synth') }}</span>
              <span class="jd-channel-tag">{{ pb.playChords ? pb.chordSound : 'idle' }}</span>
            </div>
          </div>
          <select class="jd-select" :value="pb.chordSound" @change="pb.chordSound = $event.target.value"
                  :disabled="!pb.playChords" :aria-label="t('label.sound')">
            <option v-for="s in chordSounds" :key="s" :value="s">{{ s }}</option>
          </select>
          <div class="jd-fader">
            <input type="range" min="0" max="0.5" step="0.025" :value="pb.chordVol"
                   @input="pb.chordVol = +$event.target.value"
                   class="jd-range"
                   :style="{ '--p': (pb.chordVol/0.5*100) + '%' }"
                   :disabled="!pb.playChords"
                   :aria-label="`Chord ${t('label.vol')}`">
            <span class="jd-fader-value">{{ Math.round(pb.chordVol/0.5 * 100) }}</span>
          </div>
          <button class="jd-extra" :disabled="!pb.playChords" @click="pb.autoAssignChords()"
                  :title="t('btn.auto-chords')">
            AUTO
          </button>
        </div>

        <!-- BASS -->
        <div class="jd-channel jd-channel--bass" :class="{ on: pb.bassOn }">
          <button class="jd-switch" :class="{ on: pb.bassOn }"
                  @click="pb.bassOn = !pb.bassOn"
                  :aria-label="(pb.bassOn ? 'Disable' : 'Enable') + ' bass'"
                  :aria-pressed="pb.bassOn">
            <span class="jd-switch-thumb"></span>
          </button>
          <div class="jd-channel-monitor" aria-hidden="true">
            <span class="jd-channel-led"></span>
          </div>
          <div class="jd-channel-id">
            <span class="jd-channel-icon" aria-hidden="true">🎸</span>
            <div class="jd-channel-meta">
              <span class="jd-channel-name">{{ t('label.walking-bass') }}</span>
              <span class="jd-channel-tag">{{ pb.bassOn ? bassStyleLabel : 'idle' }}</span>
            </div>
          </div>
          <select class="jd-select" v-model="pb.bassStyle" :disabled="!pb.bassOn" aria-label="Bass style">
            <option value="walking">{{ t('opt.walking') }}</option>
            <option value="two_feel">{{ t('opt.two_feel') }}</option>
            <option value="root_5">{{ t('opt.root_5') }}</option>
            <option value="pedal">{{ t('opt.pedal') }}</option>
            <option value="arpeggio">{{ t('opt.arpeggio') }}</option>
          </select>
          <div class="jd-fader">
            <input type="range" min="0" max="1" step="0.01" v-model.number="pb.bassVol"
                   class="jd-range"
                   :style="{ '--p': (pb.bassVol*100) + '%' }"
                   :disabled="!pb.bassOn"
                   aria-label="Bass volume">
            <span class="jd-fader-value">{{ Math.round(pb.bassVol * 100) }}</span>
          </div>
          <span class="jd-channel-extra-spacer" aria-hidden="true"></span>
        </div>

        <!-- DRUMS -->
        <div class="jd-channel jd-channel--drums" :class="{ on: pb.drumsOn }">
          <button class="jd-switch" :class="{ on: pb.drumsOn }"
                  @click="pb.drumsOn = !pb.drumsOn"
                  :aria-label="(pb.drumsOn ? 'Disable' : 'Enable') + ' drums'"
                  :aria-pressed="pb.drumsOn">
            <span class="jd-switch-thumb"></span>
          </button>
          <div class="jd-channel-monitor" aria-hidden="true">
            <span class="jd-channel-led"></span>
          </div>
          <div class="jd-channel-id">
            <span class="jd-channel-icon" aria-hidden="true">🥁</span>
            <div class="jd-channel-meta">
              <span class="jd-channel-name">{{ t('label.drum-kit') }}</span>
              <span class="jd-channel-tag">{{ pb.drumsOn ? drumStyleLabel : 'idle' }}</span>
            </div>
          </div>
          <select class="jd-select" :value="pb.drumStyle" @change="pb.setDrumStyle($event.target.value)"
                  :disabled="!pb.drumsOn" aria-label="Drum style">
            <option value="jazz">{{ t('opt.jazz-swing') }}</option>
            <option value="bossa">{{ t('opt.bossa-nova') }}</option>
            <option value="rock">{{ t('opt.rock-8ths') }}</option>
            <option value="brushes">{{ t('opt.brushes') }}</option>
            <option value="latin">Latin (Songo)</option>
            <option value="funk">Funk 16ths</option>
            <option value="shuffle">Shuffle</option>
          </select>
          <div class="jd-fader">
            <input type="range" min="0" max="1" step="0.01" v-model.number="pb.drumVol"
                   class="jd-range"
                   :style="{ '--p': (pb.drumVol*100) + '%' }"
                   :disabled="!pb.drumsOn"
                   aria-label="Drum volume">
            <span class="jd-fader-value">{{ Math.round(pb.drumVol * 100) }}</span>
          </div>
          <span class="jd-channel-extra-spacer" aria-hidden="true"></span>
        </div>

        <!-- DRUM SUB-STRIP — swing / variation / fill -->
        <Transition name="jd-collapse">
          <div v-if="pb.drumsOn" class="jd-substrip">
            <div class="jd-subrow">
              <span class="jd-sublabel">SWING</span>
              <input type="range" min="0.5" max="0.75" step="0.005" v-model.number="pb.drumSwing"
                     class="jd-range jd-range--drums"
                     :style="{ '--p': ((pb.drumSwing-0.5)/0.25*100) + '%' }"
                     aria-label="Swing ratio">
              <span class="jd-subvalue jd-subvalue--accent">{{ swingLabel }}</span>
            </div>
            <div class="jd-subrow">
              <span class="jd-sublabel">VARIATION</span>
              <input type="range" min="0" max="1" step="0.01" v-model.number="pb.drumVar"
                     class="jd-range jd-range--drums"
                     :style="{ '--p': (pb.drumVar*100) + '%' }"
                     aria-label="Drum variation">
              <span class="jd-subvalue jd-subvalue--accent">{{ varLabel }}</span>
            </div>
            <div class="jd-subrow">
              <span class="jd-sublabel">FILL</span>
              <select v-model.number="pb.fillEvery" class="jd-select jd-select--sub" aria-label="Fill every N bars">
                <option :value="0">— off —</option>
                <option :value="2">every 2 bars</option>
                <option :value="4">every 4 bars</option>
                <option :value="8">every 8 bars</option>
                <option :value="16">every 16 bars</option>
              </select>
              <span class="jd-subvalue">&nbsp;</span>
            </div>
          </div>
        </Transition>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <!-- PITCH LAB ───────────────────────────────────────────── -->
      <div class="jd-pitch">
        <div class="jd-section-label">
          <span>PITCH LAB</span>
          <span class="jd-section-rule"></span>
        </div>
        <div class="jd-pitch-grid">
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('label.prog-transpose') }}</span>
            <div class="jd-pitch-keys jd-pitch-keys--four">
              <button @click="pb.transposeProgression(2)"><span>+1</span></button>
              <button @click="pb.transposeProgression(1)"><span>+½</span></button>
              <button @click="pb.transposeProgression(-1)"><span>−½</span></button>
              <button @click="pb.transposeProgression(-2)"><span>−1</span></button>
            </div>
          </div>
          <div class="jd-pitch-group">
            <span class="jd-pitch-label">{{ t('label.synth-octave') }}</span>
            <div class="jd-pitch-keys jd-pitch-keys--two">
              <button @click="pb.transposeOctave(1)"><span>+1</span></button>
              <button @click="pb.transposeOctave(-1)"><span>−1</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── PROGRESSION ─────────────────────────────────────── -->
    <div id="progression-steps" class="progression-steps-container jd-steps">
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

    <!-- VOICE LEADING -->
    <div v-if="pb.voiceLeadingData.length >= 2" class="jd-voiceleading">
      <div class="jd-vl-header">
        <span>VOICE LEADING</span>
        <em>guide tones</em>
      </div>
      <div class="jd-vl-scroll">
        <table class="vl-table">
          <thead><tr><th>{{ t('label.chord') }}</th><th>3ª</th><th>Δ</th><th>7ª</th><th>Δ</th></tr></thead>
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
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { usePlaybackStore } from '../stores/playback.js'
import { useAudioStore }    from '../stores/audio.js'
import { useI18n }          from '../composables/useI18n.js'
import ProgressionStep      from '../components/player/ProgressionStep.vue'

const pb    = usePlaybackStore()
const audio = useAudioStore()
const { t } = useI18n()

// BPM input as a string buffer — committed only on blur/Enter so the user
// can clear the field and retype freely.
const bpmInput = ref(String(pb.bpm))
watch(() => pb.bpm, v => { bpmInput.value = String(v) })
function commitBpm() {
  const n = parseInt(bpmInput.value, 10)
  if (Number.isFinite(n) && n >= 30 && n <= 300) {
    pb.bpm = n
  } else {
    bpmInput.value = String(pb.bpm)
  }
}

const metroSounds = computed(() => Object.keys(audio.METRONOME_SAMPLES))
const chordSounds = computed(() => Object.keys(audio.CHORD_SOUNDS))

const swingLabel = computed(() => {
  const s = pb.drumSwing
  if (s <= 0.51)  return 'Straight'
  if (s <= 0.58)  return 'Soft'
  if (s <= 0.68)  return 'Triplet'
  if (s <= 0.72)  return 'Swing'
  return 'Shuffle'
})
const varLabel = computed(() => {
  const v = pb.drumVar
  if (v <= 0.05) return 'Robotic'
  if (v <= 0.30) return t('opt.sottile') || 'Sottile'
  if (v <= 0.55) return t('opt.naturale') || 'Naturale'
  if (v <= 0.80) return t('opt.live') || 'Live'
  return t('opt.wild') || 'Wild'
})

// Pretty-print the engine's current "tag" line under the channel name
const BASS_LABELS = computed(() => ({
  walking: t('opt.walking'), two_feel: t('opt.two_feel'), root_5: t('opt.root_5'), pedal: t('opt.pedal'), arpeggio: t('opt.arpeggio')
}))
const DRUM_LABELS = computed(() => ({
  jazz: t('opt.jazz-swing'), bossa: t('opt.bossa-nova'), rock: t('opt.rock-8ths'),
  brushes: t('opt.brushes'), latin: 'Latin (Songo)', funk: 'Funk 16ths', shuffle: 'Shuffle'
}))
const bassStyleLabel = computed(() => BASS_LABELS.value[pb.bassStyle] || pb.bassStyle)
const drumStyleLabel = computed(() => DRUM_LABELS.value[pb.drumStyle] || pb.drumStyle)

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

<style scoped>
/* Redundant .jd- classes removed; now inherited from global assets/style.css */
</style>
