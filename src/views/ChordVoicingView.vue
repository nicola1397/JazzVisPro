<template>
  <div id="view-chord-voicing" class="view-panel active">
    <div class="importer-area" style="max-width:860px;margin: 0 auto; width: 100%;">
      <h2 class="area-title">{{ t('cv.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;">{{ t('cv.subtitle') }}</p>

      <!-- Selectors row -->
      <div class="control-row-aligned" style="gap:12px;flex-wrap:wrap;margin-bottom:20px;">
        <div class="nav-group" style="flex:1;min-width:90px;">
          <label>{{ t('label.key') }}</label>
          <select :value="rootIdx" @change="rootIdx = parseInt($event.target.value)">
            <option v-for="(n,i) in NOTES" :key="i" :value="i">{{ n }}</option>
          </select>
        </div>
        <div class="nav-group" style="flex:2;min-width:140px;">
          <label>{{ t('cv.chord-type') }}</label>
          <select v-model="chordType">
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
        <div class="nav-group" style="align-self:flex-end;">
          <button class="btn-add-step" @click="loadOnFretboard">{{ t('cv.load-btn') }}</button>
        </div>
      </div>

      <!-- Chord info box -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:16px;margin-bottom:20px;">
        <!-- Chord name -->
        <div style="font-size:1.6em;font-weight:900;color:var(--accent);margin-bottom:12px;">
          {{ NOTES[rootIdx] }}{{ chordType }}
        </div>
        <!-- Interval badges -->
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;">
          <div v-for="intv in chord.intervals" :key="intv" class="cv-int-badge">
            <div class="cv-int-dot" :style="{ background: INTERVAL_COLORS[intv].color }">
              {{ INTERVAL_COLORS[intv].short }}
            </div>
            <span>{{ NOTES[(rootIdx + intv) % 12] }}</span>
          </div>
        </div>
        <!-- Scale rec + description -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;font-size:0.85em;color:#aaa;">
          <div>
            <span style="color:var(--secondary-text);text-transform:uppercase;font-size:0.75em;font-weight:700;">{{ t('cv.scale-rec') }}</span>
            <br><strong style="color:var(--text);">{{ chord.scale }}</strong>
          </div>
          <div style="flex:1;min-width:200px;">
            <span style="color:var(--secondary-text);text-transform:uppercase;font-size:0.75em;font-weight:700;">{{ t('cv.info-desc') }}</span>
            <br><span style="color:#ccc;line-height:1.5;">{{ appStore.lang === 'it' ? chord.desc_it : chord.desc_en }}</span>
          </div>
        </div>
      </div>

      <!-- Chord Diagrams -->
      <div style="margin-top:20px;">
        <div style="color:var(--secondary-text);text-transform:uppercase;font-size:0.75em;font-weight:700;margin-bottom:10px;">
          {{ t('cv.fingering') }}
        </div>
        <div v-if="!loaded" style="color:#888;padding:20px 0;">Loading chord library...</div>
        <div v-else-if="!diagrams.length" style="color:#888;padding:20px 0;">No voicings available</div>
        <div v-else class="chord-diagram-grid">
          <div v-for="(d, i) in diagrams" :key="i" class="chord-diagram-wrap">
            <div v-html="renderSVG(d.frets, d.fingers, d.baseFret)"></div>
            <div class="chord-diagram-label">{{ d.label }}</div>
          </div>
        </div>
      </div>

      <div class="teoria-tip" style="margin-top:20px;">{{ t('cv.tip-text') }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { useChordLibrary } from '../composables/useChordLibrary.js'
import { NOTES, INTERVAL_COLORS } from '../utils/theory.js'

const appStore = useAppStore()
const { t }    = useI18n()
const router   = useRouter()
const { load, loaded } = useChordLibrary()

const CHORD_DATA = {
  'maj7':    { intervals:[0,4,7,11],   scale:'Ionio (Maj7)',      desc_it:'Stabile e luminoso. Su: Imaj7, IVmaj7.',       desc_en:'Stable, bright. Over: Imaj7, IVmaj7.' },
  'm7':      { intervals:[0,3,7,10],   scale:'Dorico (m7)',       desc_it:'Caldo jazz. Su: iim7, vim7.',                  desc_en:'Warm jazz. Over: iim7, vim7.' },
  '7':       { intervals:[0,4,7,10],   scale:'Misolidio (7)',     desc_it:'Tensione, vuole risolvere. Su: V7.',           desc_en:'Tension, wants to resolve. Over: V7.' },
  '7alt':    { intervals:[0,4,6,10],   scale:'Altered (7alt)',    desc_it:'Massima tensione alterata. Su: V7alt.',        desc_en:'Max altered tension. Over: V7alt.' },
  'm7b5':    { intervals:[0,3,6,10],   scale:'Locrio',            desc_it:'Scuro. Su: iim7b5 nel minore.',                desc_en:'Dark. Over: iim7b5 in minor.' },
  'dim7':    { intervals:[0,3,6,9],    scale:'Diminuita (T/S)',   desc_it:'Massima tensione. Accordo simmetrico.',        desc_en:'Maximum tension. Symmetric chord.' },
  'maj9':    { intervals:[0,4,7,11,2], scale:'Ionio (Maj7)',      desc_it:'Luminoso con colore. Maj7 + 9a.',              desc_en:'Bright with color. Maj7 + 9th.' },
  '9':       { intervals:[0,4,7,10,2], scale:'Misolidio (7)',     desc_it:'Suono dominante ricco.',                      desc_en:'Rich dominant sound.' },
  'm9':      { intervals:[0,3,7,10,2], scale:'Dorico (m7)',       desc_it:'Colore minore lussureggiante.',               desc_en:'Lush minor color.' },
  '13':      { intervals:[0,4,9,10],   scale:'Misolidio (7)',     desc_it:'Suono dominante completo con 13a.',            desc_en:'Full dominant sound with 13th.' },
  'mMaj7':   { intervals:[0,3,7,11],   scale:'Minore Melodica',   desc_it:'Misterioso. Im(maj7), jazz moderno.',          desc_en:'Mysterious. Im(maj7), modern jazz.' },
  'maj7#11': { intervals:[0,4,7,11,6], scale:'Lidio (Maj7#11)',   desc_it:'Fluttuante, onirico. Lidio è perfetto.',       desc_en:'Floating, dreamy. Lydian is perfect.' },
}

const rootIdx  = ref(NOTES.indexOf(appStore.root) >= 0 ? NOTES.indexOf(appStore.root) : 0)
const chordType = ref('maj7')
const chord     = computed(() => CHORD_DATA[chordType.value] || CHORD_DATA['maj7'])

function renderSVG(frets, fingers, baseFret) {
  const W=110, H=130, NX=20, NY=28, SW=(W-NX-10)/5, FH=(H-NY-12)/5, R=7
  const isOpen = baseFret <= 1
  let s = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`
  if (isOpen) {
    s += `<line x1="${NX}" y1="${NY}" x2="${NX+SW*5}" y2="${NY}" stroke="#ccc" stroke-width="3.5" stroke-linecap="round"/>`
  } else {
    s += `<text x="${NX-3}" y="${NY+FH*0.6}" fill="#777" font-size="9" text-anchor="end" dominant-baseline="middle">${baseFret}fr</text>`
    s += `<line x1="${NX}" y1="${NY}" x2="${NX+SW*5}" y2="${NY}" stroke="#444" stroke-width="1"/>`
  }
  for (let i=0;i<=5;i++) { const y=NY+i*FH; s+=`<line x1="${NX}" y1="${y}" x2="${NX+SW*5}" y2="${y}" stroke="#333" stroke-width="1"/>` }
  for (let i=0;i<6;i++) { const x=NX+i*SW; s+=`<line x1="${x}" y1="${NY}" x2="${x}" y2="${NY+FH*5}" stroke="#555" stroke-width="1.5"/>` }
  for (let i=0;i<6;i++) {
    const x=NX+i*SW, f=frets[i]
    if (f===-1) s+=`<text x="${x}" y="${NY-7}" fill="#e74c3c" font-size="11" font-weight="bold" text-anchor="middle">✕</text>`
    else if (f===0) s+=`<circle cx="${x}" cy="${NY-8}" r="5" fill="none" stroke="#999" stroke-width="1.5"/>`
    else { const cy=NY+(f-baseFret)*FH+FH/2; s+=`<circle cx="${x}" cy="${cy}" r="${R}" fill="#FFD60A"/>`; if(fingers&&fingers[i]) s+=`<text x="${x}" y="${cy+3.5}" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">${fingers[i]}</text>` }
  }
  return s+'</svg>'
}

function getChordDiagrams(rIdx, type) {
  const typeMap = {'maj':'','m':'m','7':'7','maj7':'maj7','m7':'m7','m7b5':'m7b5','dim7':'dim7','dim':'dim','aug':'aug','sus2':'sus2','sus4':'sus4','9':'9','maj9':'maj9','m9':'m9','13':'13','mMaj7':'mmaj7','7alt':'7b5','maj7#11':'maj#11','6':'6','m6':'m6','add9':'add9'}
  const suffix  = typeMap[type] !== undefined ? typeMap[type] : type
  const key     = NOTES[rIdx] + suffix
  const voicings = window.CHORD_COLLECTION?.[key]
  if (!voicings?.length) return []
  const result = []
  for (const v of voicings) {
    const frets  = v.positions.map(p => p === 'x' ? -1 : parseInt(p))
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
