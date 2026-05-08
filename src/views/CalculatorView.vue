<template>
  <div id="view-calculator" class="view-panel active">
    <div class="importer-area" style="max-width:720px;margin: 0 auto; width: 100%;">
      <h2 class="area-title">Scale Calculator <span class="help-icon" @click="showHelp = true">?</span></h2>
      
      <div id="overall-suggestion" v-if="keyResult" style="margin-bottom: 20px; background: rgba(241, 196, 15, 0.1); padding: 15px; border-radius: 8px; border: 1px solid var(--accent);">
          <div style="font-size: 0.8em; text-transform: uppercase; color: var(--accent); margin-bottom: 5px;" data-i18n="calc.result">{{ t('calc.result') }}</div>
          <div id="suggestion-text" style="font-size: 1.2em; font-weight: bold;">{{ keyResult.label }} (score: {{ keyResult.score?.toFixed?.(1) || keyResult.score }})</div>
      </div>

      <div class="nav-group calculator-context-group">
          <label data-i18n="label.context">{{ t('label.context') }}</label>
          <select v-model="genre" id="genre-select">
              <option value="jazz">{{ t('opt.jazz') }}</option>
              <option value="blues">{{ t('opt.blues') }}</option>
              <option value="pop">{{ t('opt.pop') }}</option>
          </select>
      </div>

      <div style="margin-bottom: 12px;">
          <div style="font-size: 0.72em; color: var(--secondary-text); text-transform: uppercase; font-weight: 700; margin-bottom: 8px;" data-i18n="label.common-progressions">{{ t('label.common-progressions') }}</div>
          <div class="progression-preset-grid" id="preset-grid">
            <button
              v-for="(prog, name) in PRESET_PROGRESSIONS"
              :key="name"
              class="preset-prog-btn"
              @click="loadPreset(prog)"
            >{{ name }}</button>
          </div>
      </div>

      <textarea v-model="inputText" id="chord-importer-textarea" placeholder="| Dm7 G7 | Cmaj7 | •/• |"></textarea>
      <button class="btn-add-step" style="width: 100%" @click="importAndCalc" :disabled="!inputText.trim()" data-i18n="btn.import-calc">{{ t('btn.import-calc') }}</button>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelp" class="modal-overlay" style="display: flex" @click="showHelp = false">
        <div class="modal-content" @click.stop>
            <h3 data-i18n="help.title">{{ t('help.title') }}</h3>
            <p data-i18n="help.desc">{{ t('help.desc') }}</p>
            <ul>
                <li><strong data-i18n="help.chords">{{ t('help.chords') }}</strong> <span data-i18n="help.chords-desc">{{ t('help.chords-desc') }}</span></li>
                <li><strong data-i18n="help.sep">{{ t('help.sep') }}</strong> <span data-i18n="help.sep-desc">{{ t('help.sep-desc') }}</span></li>
                <li><strong data-i18n="help.repeat">{{ t('help.repeat') }}</strong> <span data-i18n="help.repeat-desc">{{ t('help.repeat-desc') }}</span></li>
            </ul>
            <button class="btn-reset" style="float: right" @click="showHelp = false" data-i18n="btn.close">{{ t('btn.close') }}</button>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaybackStore } from '../stores/playback.js'
import { useI18n } from '../composables/useI18n.js'
import { PRESET_PROGRESSIONS } from '../utils/chordParser.js'

const pb     = usePlaybackStore()
const { t }  = useI18n()
const router = useRouter()

const inputText = ref('')
const genre     = ref('jazz')
const keyResult = ref(null)
const showHelp  = ref(false)

function loadPreset(prog) {
  inputText.value = prog
  keyResult.value = null
}

function importAndCalc() {
  const text = inputText.value.trim()
  if (!text) return
  const result = pb.importFromText(text, genre.value)
  keyResult.value = result
  // Navigate to player after a short delay so the user sees the key result
  setTimeout(() => router.push('/player'), 800)
}

function reset() {
  inputText.value = ''
  keyResult.value = null
}
</script>
