<template>
  <div id="view-scale-navigator" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('sn.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container" style="padding-top: 20px;">
      <p style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">{{ t('sn.subtitle') }}</p>

      <!-- Selectors -->
      <section class="jd-console sn-controls" style="margin-bottom: 25px; padding: 25px;">

        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-master" style="gap: 20px;">
          <div class="jd-feel" style="flex: 1; min-width: 100px; width: 100%;">
            <span class="jd-feel-label">{{ t('label.key') }}</span>
            <select v-model="selectedRoot" class="jd-select" style="width: 100%;">
              <option v-for="n in NOTES" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="jd-feel" style="flex: 2; min-width: 180px; width: 100%;">
            <span class="jd-feel-label">{{ t('sn.chord-type') }}</span>
            <select v-model="selectedChordType" class="jd-select" style="width: 100%;">
              <option value="maj7">maj7</option>
              <option value="m7">m7</option>
              <option value="7">7 (Dominant)</option>
              <option value="7alt">7alt</option>
              <option value="m7b5">m7b5</option>
              <option value="dim7">dim7</option>
              <option value="mMaj7">mMaj7</option>
              <option value="maj7#11">maj7#11</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Results -->
      <div v-if="!suggestions.length" style="color:var(--jd-muted); font-family: var(--jd-mono); text-align: center; padding: 40px;">{{ t('sn.no-results') }}</div>
      <div v-else class="sn-results-list jd-steps">
        <div class="jd-section-label" style="margin-bottom: 15px;">
          <span>{{ t('cf.results') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <div v-for="(sug, i) in suggestions" :key="i" class="sn-scale-card">
          <div class="sn-scale-info">
            <div class="sn-scale-name">{{ sug.scale }}</div>
            <div class="sn-scale-note">{{ appStore.lang === 'it' ? sug.it : sug.en }}</div>
          </div>
          <div class="sn-scale-actions">
            <span
              class="sn-tension-badge"
              :style="`background:${tColor(sug.tension)}22; color:${tColor(sug.tension)}; border-color:${tColor(sug.tension)}55`"
            >{{ tLabel(sug.tension) }}</span>
            <button class="jd-toolbtn sn-load-btn" @click="loadScale(sug.scale)">{{ t('sn.load-btn') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES } from '../utils/theory.js'

const appStore = useAppStore()
const { t }    = useI18n()
const router   = useRouter()

const SUGGESTIONS = {
  'maj7':    [{ scale:'Ionio (Maj7)',             tension:1, it:'Scelta principale. Luminosa e stabile.',              en:'Primary choice. Bright and stable.' },
              { scale:'Lidio (Maj7#11)',           tension:2, it:'Moderna con #11. Più aperta.',                        en:'Modern with #11. More open.' },
              { scale:'Maggiore Pentatonica',      tension:1, it:'Semplice ed efficace. 5 note sicure.',                en:'Simple and effective. 5 safe notes.' }],
  'm7':      [{ scale:'Dorico (m7)',              tension:1, it:'Scelta jazz principale. Ha la 6a maggiore.',          en:'Main jazz choice. Has major 6th.' },
              { scale:'Minore Naturale (Aeolian)', tension:1, it:'Il minore classico. Più scuro del Dorico.',           en:'Classic minor. Darker than Dorian.' },
              { scale:'Frigio',                    tension:2, it:'Colore flamenco con b9.',                            en:'Flamenco color with b9.' },
              { scale:'Minore Pentatonica',        tension:1, it:'Sempre sicura. 5 note essenziali.',                  en:'Always safe. 5 essential notes.' }],
  '7':       [{ scale:'Misolidio (7)',            tension:1, it:'Scelta base. Suono blues/rock.',                      en:'Base choice. Blues/rock sound.' },
              { scale:'Lidio Dominante',           tension:2, it:'Con #11. Suono moderno brillante.',                  en:'With #11. Brilliant modern sound.' },
              { scale:'Blues',                     tension:2, it:'Aggiunge la blue note (b5).',                        en:'Adds the blue note (b5).' },
              { scale:'Diminuita (T/S)',           tension:3, it:'Tensione massima. Su V7b9/V7#9.',                    en:'Maximum tension. On V7b9/V7#9.' },
              { scale:'Altered (7alt)',            tension:3, it:'Tutte le note alterate. Per V7alt→Imaj7.',           en:'All altered tones. For V7alt→Imaj7.' }],
  '7alt':    [{ scale:'Altered (7alt)',           tension:3, it:'La scelta principale per dominanti alterate.',        en:'Main choice for altered dominants.' },
              { scale:'Diminuita (T/S)',           tension:3, it:'Alternativa simmetrica.',                            en:'Symmetric alternative.' }],
  'm7b5':    [{ scale:'Locrio',                   tension:3, it:'La scelta canonica. Molto scura.',                   en:'Canonical choice. Very dark.' },
              { scale:'Minore Naturale (Aeolian)', tension:2, it:'Più morbida del Locrio (omette b5).',                en:'Softer than Locrian (omits b5).' }],
  'dim7':    [{ scale:'Diminuita (T/S)',          tension:3, it:'Scala simmetrica, perfetta per dim7.',               en:'Symmetric scale, perfect for dim7.' }],
  'mMaj7':   [{ scale:'Minore Melodica',          tension:2, it:'La scala madre del mMaj7.',                         en:'The parent scale of mMaj7.' },
              { scale:'Minore Armonica',           tension:2, it:'Alternativa con suono orientale.',                  en:'Alternative with Eastern sound.' }],
  'maj7#11': [{ scale:'Lidio (Maj7#11)',          tension:2, it:'Perfetto per Maj7#11.',                             en:'Perfect for Maj7#11.' },
              { scale:'Ionio (Maj7)',              tension:1, it:'Più stabile, senza #11.',                           en:'More stable, without #11.' }],
}

const selectedRoot      = ref(appStore.root || 'C')
const selectedChordType = ref('maj7')
const suggestions       = computed(() => SUGGESTIONS[selectedChordType.value] || [])

const TENSION_COLORS = ['#27ae60','#f39c12','#e74c3c']
function tColor(n) { return TENSION_COLORS[n - 1] || '#aaa' }
function tLabel(n) {
  const it = appStore.lang === 'it'
  if (n === 1) return it ? 'Consonante' : 'Consonant'
  if (n === 2) return it ? 'Moderata'   : 'Moderate'
  return it ? 'Tesa' : 'Tense'
}

function loadScale(scaleName) {
  appStore.setRoot(selectedRoot.value)
  appStore.setScaleName(scaleName)
  router.push('/explorer')
}
</script>
