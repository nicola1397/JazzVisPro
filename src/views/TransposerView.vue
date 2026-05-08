<template>
  <div id="view-transposer" class="view-panel active">
    <div class="importer-area" style="max-width:600px;margin: 0 auto; width: 100%;">
      <h2 class="area-title" data-i18n="qt.title">{{ t('qt.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;">{{ t('qt.subtitle') }}</p>

      <div style="display:flex;flex-direction:column;gap:12px;">
          <div class="nav-group">
            <label>Input</label>
            <textarea
              v-model="inputText"
              rows="3"
              placeholder="| Dm7 G7 | Cmaj7 | Am7 D7 | Gmaj7 |"
              style="width:100%;box-sizing:border-box;background:var(--code-bg);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-family:var(--mono);font-size:0.95em;color:var(--text-h);resize:vertical;"
            ></textarea>
          </div>

          <div style="display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap;">
            <div class="nav-group">
              <label>{{ t('qt.semitones') }}</label>
              <input type="number" v-model.number="semitones" min="-12" max="12" style="width:70px;">
            </div>
            <button class="btn-add-step" @click="transpose">{{ t('qt.transpose') }}</button>
          </div>

          <div class="nav-group">
            <label>Output</label>
            <textarea
              :value="outputText"
              readonly
              rows="3"
              style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-family:var(--mono);font-size:0.95em;color:var(--text-h);resize:vertical;"
            ></textarea>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="btn-io" @click="copyOutput">{{ copyLabel }}</button>
            <button class="btn-io" @click="loadInPlayer" :disabled="!outputText">{{ t('qt.load-player') }}</button>
          </div>
        </div>
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
const pb     = usePlaybackStore()
const { t }  = useI18n()

const inputText  = ref('')
const outputText = ref('')
const semitones  = ref(2)
const copyLabel  = ref('')

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
