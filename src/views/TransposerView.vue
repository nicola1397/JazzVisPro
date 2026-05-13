<template>
  <div id="view-transposer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('qt.title') }}</h1>
      </div>
    </header>

    <div class="importer-area" style="max-width:600px; margin: 0 auto; width: 100%; padding-top: 20px;">
      <p
        style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">
        {{ t('qt.subtitle') }}</p>

      <section class="jd-console" style="padding: 25px;">
        <div class="jd-grain" aria-hidden="true"></div>

        <div style="display:flex; flex-direction:column; gap:20px;">
          <div>
            <div class="jd-section-label">
              <span>INPUT</span>
              <span class="jd-section-rule"></span>
            </div>
            <textarea v-model="inputText" rows="3" placeholder="| Dm7 G7 | Cmaj7 | Am7 D7 | Gmaj7 |"
              class="jd-bpm-input"
              style="width:100%; text-align: left; height: auto; min-height: 80px; padding: 12px; font-size: 1.1em;"></textarea>
          </div>

          <div style="display:flex; align-items:center; gap:15px; flex-wrap:wrap;">
            <div class="jd-bpm" style="margin: 0;">
              <div class="jd-bpm-frame">
                <input type="number" class="jd-bpm-input" v-model.number="semitones" min="-12" max="12"
                  style="width: 70px;">
                <span class="jd-bpm-unit">{{ t('qt.semitones') }}</span>
              </div>
            </div>
            <button class="btn-add-step" @click="transpose" style="height: 44px; flex-grow: 1;">{{ t('qt.transpose')
            }}</button>
          </div>

          <div>
            <div class="jd-section-label">
              <span>OUTPUT</span>
              <span class="jd-section-rule"></span>
            </div>
            <textarea :value="outputText" readonly rows="3" class="jd-bpm-input"
              style="width:100%; text-align: left; height: auto; min-height: 80px; padding: 12px; font-size: 1.1em; background: rgba(0,0,0,0.4);"></textarea>
          </div>

          <div class="jd-toolbar" style="justify-content: center;">
            <button class="jd-toolbtn" @click="copyOutput">{{ copyLabel }}</button>
            <button class="jd-toolbtn" @click="loadInPlayer" :disabled="!outputText">{{ t('qt.load-player') }}</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaybackStore } from '../stores/playback.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES, NOTES_FLAT } from '../utils/theory.js'
import { parseChord } from '../utils/chordParser.js'

const router = useRouter()
const pb = usePlaybackStore()
const { t } = useI18n()

const inputText = ref('')
const outputText = ref('')
const semitones = ref(2)
const copyLabel = ref('')

function transpose() {
  const n = semitones.value || 0
  const tokens = inputText.value.split(/(\s+|\|)/)
  outputText.value = tokens.map(token => {
    const trimmed = token.trim()
    if (!trimmed || trimmed === '|' || trimmed === '%') return token
    const p = parseChord(trimmed)
    if (!p) return token
    let rootIdx = NOTES.indexOf(p.root)
    const useFlat = rootIdx === -1
    if (useFlat) rootIdx = NOTES_FLAT.indexOf(p.root)
    if (rootIdx === -1) return token
    const newIdx = ((rootIdx + n) % 12 + 12) % 12
    return (useFlat ? NOTES_FLAT[newIdx] : NOTES[newIdx]) + p.rest
  }).join('')
}

function copyOutput() {
  if (!outputText.value) return
  navigator.clipboard?.writeText(outputText.value).then(() => {
    copyLabel.value = '✓'
    setTimeout(() => { copyLabel.value = '' }, 1500)
  })
}

// init copyLabel
copyLabel.value = t('qt.copy')

function loadInPlayer() {
  if (!outputText.value) return
  pb.importFromText(outputText.value)
  router.push('/player')
}
</script>
