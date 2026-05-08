<template>
  <div id="view-chord-finder" class="view-panel active">
    <div class="importer-area" style="max-width:600px;margin: 0 auto; width: 100%;">
      <h2 class="area-title">{{ t('cf.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;">{{ t('cf.subtitle') }}</p>

      <!-- Note selector -->
      <div style="margin-bottom:20px;">
        <div style="font-size:0.75em;text-transform:uppercase;color:#777;font-weight:700;margin-bottom:10px;letter-spacing:0.5px;">
          {{ t('cf.select-notes') }}
        </div>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;justify-items:center;margin-bottom:20px;">
          <button
            v-for="(note, idx) in NOTES"
            :key="note"
            class="cf-note-btn"
            :class="{ selected: selectedNotes.has(idx) }"
            @click="toggleNote(idx)"
            style="width:50px;height:50px;border-radius:50%;font-weight:700;border:2px solid #444;background:#2c2c2e;color:var(--text-h);cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;font-size:0.95em;"
            :style="selectedNotes.has(idx) ? 'background:var(--accent);color:#000;border-color:#fff;box-shadow: 0 0 15px rgba(255,214,10,0.3);' : ''"
          >{{ note }}</button>
        </div>
        <button class="btn-reset" style="width:auto;padding:0 20px;margin-bottom:20px;" @click="clearSelection">
          × {{ t('btn.reset-display') }}
        </button>
      </div>

      <!-- Results -->
      <div v-if="matches.length">
        <div style="font-size:0.75em;text-transform:uppercase;color:#888;font-weight:700;margin-bottom:8px;letter-spacing:0.5px;">
          {{ t('cf.results') }}
        </div>
        <div v-for="(m, idx) in matches" :key="m.name" style="margin-bottom:4px;">
          <div
            class="cf-result-item"
            @click="toggleDiagram(idx)"
            style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;cursor:pointer;"
            :style="expandedIdx === idx ? 'border-color:var(--accent);' : ''"
          >
            <span style="font-weight:600;color:var(--text-h);">
              {{ m.name }}
              <span v-if="m.missing.length" style="color:#777;font-size:0.8em;">
                ({{ appStore.lang === 'it' ? 'manca' : 'missing' }}: {{ m.missing.map(n=>NOTES[n]).join(', ') }})
              </span>
            </span>
            <span style="color:#aaa;">{{ expandedIdx === idx ? '▴' : '▾' }}</span>
          </div>
          <div v-if="expandedIdx === idx" style="padding:12px 14px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,214,10,0.2);border-top:none;border-radius:0 0 8px 8px;">
            <div v-if="!loaded" style="color:#666;font-size:0.85em;">
              {{ appStore.lang === 'it' ? 'Caricamento diteggiature...' : 'Loading fingerings...' }}
            </div>
            <div v-else>
              <div v-if="getDiagrams(m).length" style="display:flex;flex-wrap:wrap;gap:8px;">
                <div
                  v-for="(d, di) in getDiagrams(m)"
                  :key="di"
                  style="text-align:center;"
                >
                  <div v-html="renderSVG(d.frets, d.fingers, d.baseFret)"></div>
                  <div style="font-size:0.75em;color:#aaa;margin-top:2px;">{{ d.label }}</div>
                </div>
              </div>
              <div v-else style="color:#666;font-size:0.85em;">
                {{ appStore.lang === 'it' ? 'Nessuna diteggiatura disponibile.' : 'No voicings available.' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="selectedNotes.size >= 2" style="color:#666;text-align:center;padding:20px;">
        {{ appStore.lang === 'it' ? 'Nessun accordo trovato.' : 'No chord found.' }}
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { useChordLibrary } from '../composables/useChordLibrary.js'
import { NOTES } from '../utils/theory.js'

const appStore = useAppStore()
const { t } = useI18n()
const { load, loaded } = useChordLibrary()

const selectedNotes = ref(new Set())
const expandedIdx   = ref(-1)

onMounted(() => { load() })

const CHORD_TEMPLATES = [
  {name:'maj',intervals:[0,4,7]},{name:'m',intervals:[0,3,7]},{name:'7',intervals:[0,4,7,10]},
  {name:'maj7',intervals:[0,4,7,11]},{name:'m7',intervals:[0,3,7,10]},{name:'m7b5',intervals:[0,3,6,10]},
  {name:'dim7',intervals:[0,3,6,9]},{name:'dim',intervals:[0,3,6]},{name:'aug',intervals:[0,4,8]},
  {name:'sus2',intervals:[0,2,7]},{name:'sus4',intervals:[0,5,7]},{name:'9',intervals:[0,4,7,10,2]},
  {name:'maj9',intervals:[0,4,7,11,2]},{name:'m9',intervals:[0,3,7,10,2]},{name:'13',intervals:[0,4,7,10,9]},
  {name:'mMaj7',intervals:[0,3,7,11]},{name:'7alt',intervals:[0,4,6,10]},{name:'6',intervals:[0,4,7,9]},
  {name:'m6',intervals:[0,3,7,9]},{name:'add9',intervals:[0,4,7,2]},
]

const matches = computed(() => {
  const selected = [...selectedNotes.value].sort((a,b) => a-b)
  if (selected.length < 2) return []
  const found = []
  for (let root = 0; root < 12; root++) {
    for (const tmpl of CHORD_TEMPLATES) {
      const chordNotes = new Set(tmpl.intervals.map(i => (root + i) % 12))
      if (!selected.every(n => chordNotes.has(n))) continue
      const missing = [...chordNotes].filter(n => !selected.includes(n))
      found.push({ name: NOTES[root] + tmpl.name, root, type: tmpl.name, missing, score: selected.length - missing.length * 0.5 })
    }
  }
  return found.sort((a,b) => b.score - a.score).slice(0, 12)
})

function toggleNote(idx) {
  const s = new Set(selectedNotes.value)
  s.has(idx) ? s.delete(idx) : s.add(idx)
  selectedNotes.value = s
  expandedIdx.value = -1
}

function clearSelection() {
  selectedNotes.value = new Set()
  expandedIdx.value = -1
}

function toggleDiagram(idx) {
  expandedIdx.value = expandedIdx.value === idx ? -1 : idx
}

const TYPE_MAP = {'maj':'','min':'m','m':'m','7':'7','maj7':'maj7','m7':'m7','m7b5':'m7b5','dim7':'dim7','dim':'dim','aug':'aug','sus2':'sus2','sus4':'sus4','9':'9','maj9':'maj9','m9':'m9','13':'13','mMaj7':'mmaj7','7alt':'7b5','maj7#11':'maj#11','6':'6','m6':'m6','add9':'add9'}

function getDiagrams(m) {
  if (!loaded.value || !window.CHORD_COLLECTION) return []
  const suffix = TYPE_MAP[m.type] ?? m.type
  const key = NOTES[m.root] + suffix
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
</script>
