<template>
  <div id="view-chord-voicing" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">{{ t('label.eyebrow') }}</span>
        <h1 class="jd-titlemark-name">{{ t('cv.title') }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>

      <div class="jd-section-label">
        <span>{{ t('label.selector') }}</span>
        <span class="jd-section-rule"></span>
      </div>

      <div class="jd-master">
        <div class="jd-feel" style="flex:1;">
          <span class="jd-feel-label">{{ t('label.key') }}</span>
          <select :value="rootIdx" @change="rootIdx = parseInt($event.target.value)" class="jd-feel-select"
            style="width:100%;">
            <option v-for="(n, i) in NOTES" :key="i" :value="i">{{ n }}</option>
          </select>
        </div>

        <div class="jd-feel" style="flex:1;">
          <span class="jd-feel-label">{{ t('cv.chord-type') }}</span>
          <select v-model="chordType" class="jd-feel-select" style="width:100%;">
            <option value="maj7">maj7</option>
            <option value="m7">m7</option>
            <option value="7">7 (Dominant)</option>
            <option value="7alt">7alt</option>
            <option value="m7b5">m7b5 (ø)</option>
            <option value="dim7">dim7</option>
            <option value="maj9">maj9</option>
            <option value="9">9</option>
            <option value="m9">m9</option>
            <option value="13">13</option>
            <option value="mMaj7">mMaj7</option>
            <option value="maj7#11">maj7#11</option>
          </select>
        </div>

        <button class="jd-toolbtn jd-toolbtn--add" style="align-self:flex-end; height:34px;" @click="loadOnFretboard">
          {{ t('cv.load-btn') }}
        </button>
      </div>

      <div class="jd-rule" aria-hidden="true"></div>

      <!-- Chord info box -->
      <div class="jd-pitch">
        <div class="jd-section-label">
          <span>{{ t('label.chord-info') }}</span>
          <span class="jd-section-rule"></span>
        </div>

        <div class="jd-improv-banner jd-info-grid-container" style="padding:16px; margin-bottom:16px; background: linear-gradient(90deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.02) 100%); border: 1px solid rgba(34,197,94,0.3); border-left: 4px solid var(--jd-improv); border-radius:16px; color: #c1f0cf;">
          
          <div class="jd-info-grid">
            <!-- Cell 1: Chord Name (Large) -->
            <div class="jd-grid-cell cell-title" style="display:flex; align-items:center; justify-content:center; padding:12px;">
              <div style="font-family:var(--jd-display); font-style:italic; font-size:4.2em; color:var(--jd-improv); line-height:0.9; white-space: nowrap; text-shadow: 0 0 20px rgba(34,197,94,0.2);">
                {{ NOTES[rootIdx] }}<span style="color:var(--jd-text)">{{ chordType }}</span>
              </div>
            </div>

            <!-- Cell 2: Interval Badges -->
            <div class="jd-grid-cell cell-intervals" style="display:flex; align-items:center; justify-content:center; padding:12px; border-left: 1px solid rgba(34,197,94,0.15);">
              <div style="display:flex; gap:6px; flex-wrap:wrap; justify-content:center; max-width:280px;">
                <div v-for="intv in chord.intervals" :key="intv" class="cv-int-badge" style="padding: 4px 10px; border-radius:20px; background:rgba(0,0,0,0.4); border-color:rgba(34,197,94,0.3); display:flex; align-items:center; gap:6px;">
                  <div class="cv-int-dot" :style="{ background: INTERVAL_COLORS[intv].color, width:'20px', height:'24px', fontSize:'9px', borderRadius:'50%' }">
                    {{ INTERVAL_COLORS[intv].short }}
                  </div>
                  <span style="font-family:var(--jd-mono); font-size:12px; font-weight:800; color:#fff;">{{ NOTES[(rootIdx + intv) % 12] }}</span>
                </div>
              </div>
            </div>

            <!-- Separator Row (Desktop only via grid-column span) -->
            <div class="jd-grid-sep" style="grid-column: 1 / -1; height:1px; background:rgba(34,197,94,0.2); margin: 6px 0;"></div>

            <!-- Cell 3: Scale Rec -->
            <div class="jd-grid-cell cell-scale" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:10px;">
              <span class="jd-pitch-label" style="display:block; margin-bottom:4px; opacity:0.8; font-size:9px; color:var(--jd-improv); letter-spacing:2px; font-weight:700;">{{ t('cv.scale-rec') }}</span>
              <strong style="color:#fff; font-family:var(--jd-display); font-style:italic; font-size:20px; letter-spacing:0.5px;">{{ chord.scale }}</strong>
            </div>

            <!-- Cell 4: Description -->
            <div class="jd-grid-cell cell-desc" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:10px; border-left: 1px solid rgba(34,197,94,0.15);">
              <span class="jd-pitch-label" style="display:block; margin-bottom:4px; opacity:0.8; font-size:9px; color:var(--jd-improv); letter-spacing:2px; font-weight:700;">{{ t('cv.info-desc') }}</span>
              <p style="font-family:var(--jd-mono); line-height:1.5; margin:0; font-size:12px; color:rgba(193,240,207,0.9); max-width:320px;">{{ appStore.lang === 'it' ? chord.desc_it : chord.desc_en }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Chord Diagrams -->
    <div class="jd-section-label">
      <span>{{ t('cv.fingering') }}</span>
      <span class="jd-section-rule"></span>
    </div>

    <div v-if="!loaded" class="jd-empty-state" style="padding:30px;">{{ t('label.loading-library') }}</div>
    <div v-else-if="!diagrams.length" class="jd-empty-state" style="padding:30px;">{{ t('label.no-voicings') }}</div>
    <div v-else class="chord-diagram-grid">
      <div v-for="(d, i) in diagrams" :key="i" class="chord-diagram-wrap">
        <div class="chord-svg-container" v-html="renderSVG(d.frets, d.fingers, d.baseFret)"></div>
        <div class="chord-diagram-label">{{ d.label }}</div>
      </div>
    </div>

    <div class="teoria-tip" style="margin-top:28px;">
      <strong>{{ t('label.guide') }}:</strong> {{ t('cv.tip-text') }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { useChordLibrary } from '../composables/useChordLibrary.js'
import { NOTES, INTERVAL_COLORS, getNoteIdx } from '../utils/theory.js'

const appStore = useAppStore()
const { t } = useI18n()
const router = useRouter()
const { load, loaded } = useChordLibrary()

const CHORD_DATA = {
  'maj7': { intervals: [0, 4, 7, 11], scale: 'Ionio (Maj7)', desc_it: 'Stabile e luminoso. Su: Imaj7, IVmaj7.', desc_en: 'Stable, bright. Over: Imaj7, IVmaj7.' },
  'm7': { intervals: [0, 3, 7, 10], scale: 'Dorico (m7)', desc_it: 'Caldo jazz. Su: iim7, vim7.', desc_en: 'Warm jazz. Over: iim7, vim7.' },
  '7': { intervals: [0, 4, 7, 10], scale: 'Misolidio (7)', desc_it: 'Tensione, vuole risolvere. Su: V7.', desc_en: 'Tension, wants to resolve. Over: V7.' },
  '7alt': { intervals: [0, 4, 6, 10], scale: 'Altered (7alt)', desc_it: 'Massima tensione alterata. Su: V7alt.', desc_en: 'Max altered tension. Over: V7alt.' },
  'm7b5': { intervals: [0, 3, 6, 10], scale: 'Locrio', desc_it: 'Scuro. Su: iim7b5 nel minore.', desc_en: 'Dark. Over: iim7b5 in minor.' },
  'dim7': { intervals: [0, 3, 6, 9], scale: 'Diminuita (T/S)', desc_it: 'Massima tensione. Accordo simmetrico.', desc_en: 'Maximum tension. Symmetric chord.' },
  'maj9': { intervals: [0, 4, 7, 11, 2], scale: 'Ionio (Maj7)', desc_it: 'Luminoso con colore. Maj7 + 9a.', desc_en: 'Bright with color. Maj7 + 9th.' },
  '9': { intervals: [0, 4, 7, 10, 2], scale: 'Misolidio (7)', desc_it: 'Suono dominante ricco.', desc_en: 'Rich dominant sound.' },
  'm9': { intervals: [0, 3, 7, 10, 2], scale: 'Dorico (m7)', desc_it: 'Colore minore lussureggiante.', desc_en: 'Lush minor color.' },
  '13': { intervals: [0, 4, 9, 10], scale: 'Misolidio (7)', desc_it: 'Suono dominante completo con 13a.', desc_en: 'Full dominant sound with 13th.' },
  'mMaj7': { intervals: [0, 3, 7, 11], scale: 'Minore Melodica', desc_it: 'Misterioso. Im(maj7), jazz moderno.', desc_en: 'Mysterious. Im(maj7), modern jazz.' },
  'maj7#11': { intervals: [0, 4, 7, 11, 6], scale: 'Lidio (Maj7#11)', desc_it: 'Fluttuante, onirico. Lidio è perfetto.', desc_en: 'Floating, dreamy. Lydian is perfect.' },
}

const rootIdx = ref(getNoteIdx(appStore.root) >= 0 ? getNoteIdx(appStore.root) : 0)
const chordType = ref('maj7')
const chord = computed(() => CHORD_DATA[chordType.value] || CHORD_DATA['maj7'])

function renderSVG(frets, fingers, baseFret) {
  const W = 110, H = 130, NX = 20, NY = 28, SW = (W - NX - 10) / 5, FH = (H - NY - 12) / 5, R = 7
  const isOpen = baseFret <= 1
  let s = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`
  if (isOpen) {
    s += `<line x1="${NX}" y1="${NY}" x2="${NX + SW * 5}" y2="${NY}" stroke="#999" stroke-width="3" stroke-linecap="round"/>`
  } else {
    s += `<text x="${NX - 3}" y="${NY + FH * 0.6}" fill="#777" font-family="JetBrains Mono" font-size="9" text-anchor="end" dominant-baseline="middle">${baseFret}fr</text>`
    s += `<line x1="${NX}" y1="${NY}" x2="${NX + SW * 5}" y2="${NY}" stroke="#444" stroke-width="1"/>`
  }
  for (let i = 0; i <= 5; i++) { const y = NY + i * FH; s += `<line x1="${NX}" y1="${y}" x2="${NX + SW * 5}" y2="${y}" stroke="#2a2620" stroke-width="1"/>` }
  for (let i = 0; i < 6; i++) { const x = NX + i * SW; s += `<line x1="${x}" y1="${NY}" x2="${x}" y2="${NY + FH * 5}" stroke="#444" stroke-width="1.5"/>` }
  for (let i = 0; i < 6; i++) {
    const x = NX + i * SW, f = frets[i]
    if (f === -1) s += `<text x="${x}" y="${NY - 7}" fill="#ff453a" font-family="JetBrains Mono" font-size="11" font-weight="bold" text-anchor="middle">✕</text>`
    else if (f === 0) s += `<circle cx="${x}" cy="${NY - 8}" r="4.5" fill="none" stroke="#666" stroke-width="1.5"/>`
    else { const cy = NY + (f - baseFret) * FH + FH / 2; s += `<circle cx="${x}" cy="${cy}" r="${R}" fill="#FFD60A" stroke="#000" stroke-width="1"/>`; if (fingers && fingers[i]) s += `<text x="${x}" y="${cy + 3}" fill="#000" font-family="JetBrains Mono" font-size="8" font-weight="bold" text-anchor="middle">${fingers[i]}</text>` }
  }
  return s + '</svg>'
}

function getChordDiagrams(rIdx, type) {
  const typeMap = { 'maj': '', 'm': 'm', '7': '7', 'maj7': 'maj7', 'm7': 'm7', 'm7b5': 'm7b5', 'dim7': 'dim7', 'dim': 'dim', 'aug': 'aug', 'sus2': 'sus2', 'sus4': 'sus4', '9': '9', 'maj9': 'maj9', 'm9': 'm9', '13': '13', 'mMaj7': 'mmaj7', '7alt': '7b5', 'maj7#11': 'maj#11', '6': '6', 'm6': 'm6', 'add9': 'add9' }
  const suffix = typeMap[type] !== undefined ? typeMap[type] : type
  const key = NOTES[rIdx] + suffix
  const voicings = window.CHORD_COLLECTION?.[key]
  if (!voicings?.length) return []
  const result = []
  for (const v of voicings) {
    const frets = v.positions.map(p => p === 'x' ? -1 : parseInt(p))
    const fingers = v.fingerings[0].map(f => parseInt(f))
    const active = frets.filter(f => f > 0)
    if (!active.length) continue
    const minF = Math.min(...active), maxF = Math.max(...active)
    if (maxF - minF > 4) continue
    const hasOpen = frets.some(f => f === 0)
    const base = hasOpen ? 1 : minF
    result.push({ frets, fingers, baseFret: base, label: base <= 1 ? 'Open' : `${minF}fr` })
  }
  return result
}

const diagrams = computed(() => {
  if (!loaded.value) return []
  return getChordDiagrams(rootIdx.value, chordType.value)
})

function loadOnFretboard() {
  appStore.setRoot(NOTES[rootIdx.value])
  appStore.setScaleName(chord.value.scale)
  appStore.soloArp = true
  router.push('/explorer')
}

onMounted(async () => { await load() })
</script>

<style scoped>
.cv-int-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--jd-surface-alt);
  border: 1px solid var(--jd-line);
  padding: 4px 6px 4px 6px;
  border-radius: 20px;
}

.cv-int-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
}

.chord-diagram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 20px;
  margin-top: 14px;
}

.chord-svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.chord-svg-container :deep(svg) {
  width: 100%;
  height: auto;
  max-width: 130px;
}

@media (max-width: 480px) {
  .chord-diagram-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.chord-diagram-wrap {
  text-align: center;
  background: var(--jd-surface-alt);
  border: 1px solid var(--jd-line);
  border-radius: 12px;
  padding: 12px 6px;
  transition: all 0.2s;
}

.chord-diagram-wrap:hover {
  border-color: var(--jd-amber);
  transform: translateY(-4px);
}

.chord-diagram-label {
  font-family: var(--jd-mono);
  font-size: 10px;
  color: var(--jd-muted);
  margin-top: 8px;
  text-transform: uppercase;
}

.jd-empty-state {
  background: var(--jd-surface);
  border: 1px dashed var(--jd-line-strong);
  border-radius: 14px;
  color: var(--jd-muted);
  font-family: var(--jd-mono);
  font-size: 13px;
  text-align: center;
}

/* 2x2 Grid for Info Card */
.jd-info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  width: 100%;
}

@media (max-width: 768px) {
  .jd-info-grid {
    grid-template-columns: 1fr;
  }
  .jd-grid-cell {
    border-left: none !important;
    border-bottom: 1px solid rgba(34,197,94,0.15);
    padding: 20px 10px !important;
  }
  .cell-desc {
    border-bottom: none !important;
  }
  .jd-grid-sep {
    display: none;
  }
  .cell-title div {
    font-size: 3.2em !important;
  }
}
</style>
