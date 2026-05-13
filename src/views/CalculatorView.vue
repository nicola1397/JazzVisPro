<template>
  <div id="view-calculator" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('title.calculator') }}</h1>
      </div>
      <div class="jd-toolbar">
        <button class="jd-iconbtn" @click="showHelp = true" :title="t('label.help') || 'Help'">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
        </button>
      </div>
    </header>
    
    <div v-if="keyResult" class="jd-improv-banner" style="margin-bottom: 24px;">
      <div class="jd-improv-bullet"></div>
      <div>
        <strong>{{ t('calc.result') }}</strong>
        <div class="jd-improv-helper">{{ keyResult.label }} ({{ t('label.score') }}: {{ keyResult.score?.toFixed?.(1) || keyResult.score }})</div>
      </div>
    </div>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-master" style="grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div class="jd-feel">
          <label class="jd-feel-label">{{ t('label.context') }}</label>
          <select v-model="genre" class="jd-feel-select" style="width: 100%;">
            <option value="jazz">{{ t('opt.jazz') }}</option>
            <option value="blues">{{ t('opt.blues') }}</option>
            <option value="pop">{{ t('opt.pop') }}</option>
          </select>
        </div>
      </div>

      <div class="jd-section-label">
        <span>{{ t('label.common-progressions') }}</span>
        <div class="jd-section-rule"></div>
      </div>

      <div class="progression-preset-grid" style="margin-bottom: 24px; position: relative; z-index: 1;">
        <button
          v-for="(prog, name) in PRESET_PROGRESSIONS"
          :key="name"
          class="preset-prog-btn"
          @click="loadPreset(prog)"
        >{{ name }}</button>
      </div>

      <div class="jd-rule"></div>

      <div style="position: relative; z-index: 1;">
        <textarea 
          v-model="inputText" 
          placeholder="| Dm7 G7 | Cmaj7 | •/• |" 
          style="margin-bottom: 16px; background: rgba(0,0,0,0.3); border-color: var(--jd-line);"
        ></textarea>
        <button 
          class="btn-add-step" 
          style="width: 100%; height: 48px;" 
          @click="importAndCalc" 
          :disabled="!inputText.trim()"
        >{{ t('btn.import-calc') }}</button>
      </div>
    </section>

    <!-- Help Modal -->
    <div v-if="showHelp" class="modal-overlay" style="display: flex" @click="showHelp = false">
        <div class="modal-content" @click.stop>
            <h3 style="font-family:var(--jd-display); font-style:italic; font-size:1.8em; margin-top:0; color:var(--jd-text);">{{ t('help.title') }}</h3>
            <p style="font-family:var(--jd-mono); font-size:0.85em; color:var(--jd-text-soft);">{{ t('help.desc') }}</p>
            <ul style="font-family:var(--jd-mono); font-size:0.8em; color:var(--jd-text-soft); line-height:1.6; padding-left:20px;">
                <li style="margin-bottom:8px;"><strong style="color:var(--jd-amber);">{{ t('help.chords') }}</strong> <span>{{ t('help.chords-desc') }}</span></li>
                <li style="margin-bottom:8px;"><strong style="color:var(--jd-amber);">{{ t('help.sep') }}</strong> <span>{{ t('help.sep-desc') }}</span></li>
                <li style="margin-bottom:8px;"><strong style="color:var(--jd-amber);">{{ t('help.repeat') }}</strong> <span>{{ t('help.repeat-desc') }}</span></li>
            </ul>
            <button class="btn-reset" style="float: right; margin-top:10px;" @click="showHelp = false">{{ t('btn.close') }}</button>
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
