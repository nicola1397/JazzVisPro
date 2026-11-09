<template>
  <div id="view-chord-finder" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('cf.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container" style="padding-top: 20px;">
      <div class="cf-head">
        <p class="cf-subtitle">{{ mode === 'neck' ? t('cf.subtitle-neck') : t('cf.subtitle') }}</p>
        <div class="cf-modes" role="group" :aria-label="t('cf.mode')">
          <button type="button" class="cf-mode" :class="{ on: mode === 'notes' }" :aria-pressed="mode === 'notes'" @click="setMode('notes')">{{ t('cf.mode-notes') }}</button>
          <button type="button" class="cf-mode" :class="{ on: mode === 'neck' }" :aria-pressed="mode === 'neck'" @click="setMode('neck')">{{ t('cf.mode-neck') }}</button>
        </div>
      </div>

      <!-- ── Notes: pick pitch classes ───────────────────────────── -->
      <template v-if="mode === 'notes'">
        <section class="jd-console" style="margin-bottom:25px; padding: 25px;">
          <div class="jd-grain" aria-hidden="true"></div>
          <div class="jd-section-label">
            <span>{{ t('cf.select-notes') }}</span>
            <span class="jd-section-rule"></span>
          </div>

          <div class="jd-grid-fixed-6 cf-note-grid" style="justify-items:center; margin-bottom:20px; padding: 10px 0;">
            <button
              v-for="(note, idx) in NOTES"
              :key="note"
              class="cf-note-btn"
              :class="{ selected: selectedNotes.has(idx) }"
              @click="toggleNote(idx)"
            >{{ note }}</button>
          </div>

          <div class="jd-toolbar" style="justify-content: center;">
            <button class="jd-toolbtn jd-toolbtn--reset" style="width:auto; padding:0 20px;" @click="clearSelection">
              {{ t('btn.reset-display') }}
            </button>
          </div>
        </section>

        <div v-if="matches.length" class="jd-steps">
          <div class="jd-section-label" style="margin-bottom: 12px;">
            <span>{{ t('cf.results') }}</span>
            <span class="jd-section-rule"></span>
          </div>

          <div v-for="(m, idx) in matches" :key="m.name" style="margin-bottom:8px; width: 100%;">
            <div
              class="cf-result-item"
              :class="{ expanded: expandedIdx === idx }"
              @click="toggleDiagram(idx)"
            >
              <span style="font-weight:600;">
                {{ m.name }}
                <span v-if="m.missing.length" style="color:var(--jd-muted); font-size:0.8em; margin-left: 8px;">
                  ({{ t('cf.missing') }}: {{ m.missingNames.join(', ') }})
                </span>
              </span>
              <span class="cf-result-arrow">{{ expandedIdx === idx ? '▲' : '▼' }}</span>
            </div>
            <Transition name="jd-collapse">
              <div v-if="expandedIdx === idx" class="cf-diagram-panel open">
                <div v-if="!loaded" class="cf-panel-msg">{{ t('cf.loading') }}</div>
                <div v-else style="padding: 15px;">
                  <div v-if="diagramsFor(m.root, TYPE_MAP[m.type] ?? m.type).length" class="cf-diagrams">
                    <div v-for="(d, di) in diagramsFor(m.root, TYPE_MAP[m.type] ?? m.type)" :key="di" class="chord-diagram-wrap">
                      <div v-html="renderSVG(d.frets, d.fingers, d.baseFret)"></div>
                      <div class="chord-diagram-label" style="font-family: var(--jd-mono); font-size: 10px;">{{ d.label }}</div>
                    </div>
                  </div>
                  <div v-else class="cf-panel-msg">{{ t('cf.no-voicings') }}</div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div v-else-if="selectedNotes.size >= 2" class="cf-empty">{{ t('cf.no-chord') }}</div>
      </template>

      <!-- ── On the neck: reverse search from the positions played ── -->
      <template v-else>
        <section class="jd-console cf-neck">
          <div class="jd-grain" aria-hidden="true"></div>
          <div class="jd-section-label">
            <span>{{ t('cf.neck-title') }}</span>
            <span class="jd-section-rule"></span>
          </div>
          <p class="cf-neck-help">{{ t('cf.neck-help') }}</p>

          <NeckDiagram
            :from="0" :to="neckTo" :dots="neckDots" :muted="mutedStrings"
            labels="degree" :toggle="true" :clickable="true" play="chord"
            :open-midi="openMidi"
            @pick="onPick"
          />

          <div class="cf-neck-bar">
            <label class="cf-tab-field">
              <span class="cf-tab-label">{{ t('cf.tab') }}</span>
              <input
                v-model="tabText" class="cf-tab-input" type="text" inputmode="text" spellcheck="false" autocomplete="off"
                placeholder="x-3-2-0-1-0" :aria-invalid="tabError"
                @keydown.enter.prevent="applyTab" @blur="applyTab"
              >
            </label>
            <button class="jd-toolbtn jd-toolbtn--reset cf-clear" type="button" @click="clearNeck">{{ t('btn.reset-display') }}</button>
          </div>
          <div v-if="tabError" class="cf-tab-error">{{ t('cf.tab-invalid') }}</div>

          <div v-if="played.length" class="cf-played">
            <span class="cf-played-label">{{ t('cf.played') }}</span>
            <span v-for="(n, i) in played" :key="i" class="cf-played-note">
              <strong>{{ pretty(n.name) }}</strong><em v-if="n.deg">{{ n.deg }}</em>
            </span>
          </div>
        </section>

        <div v-if="readings.length" class="jd-steps">
          <div class="jd-section-label" style="margin-bottom: 12px;">
            <span>{{ t('cf.results') }}</span>
            <span class="jd-section-rule"></span>
          </div>

          <div v-for="(r, i) in readings" :key="r.name" style="margin-bottom:8px; width: 100%;">
            <div class="cf-result-item" :class="{ expanded: openIdx === i, chosen: chosen === i }" @click="pickReading(i)">
              <span class="cf-reading">
                <span class="cf-reading-name" :class="{ best: i === 0 }">{{ pretty(r.name) }}</span>
                <span class="cf-reading-detail">{{ detailOf(r) }}</span>
              </span>
              <span class="cf-result-arrow">{{ openIdx === i ? '▲' : '▼' }}</span>
            </div>
            <Transition name="jd-collapse">
              <div v-if="openIdx === i" class="cf-diagram-panel open">
                <div v-if="!loaded" class="cf-panel-msg">{{ t('cf.loading') }}</div>
                <div v-else style="padding: 15px;">
                  <div class="cf-panel-title">{{ t('cf.voicings').replace('{0}', pretty(r.rootName + r.type)) }}</div>
                  <div v-if="diagramsFor(r.root, r.lib).length" class="cf-diagrams">
                    <div
                      v-for="(d, di) in diagramsFor(r.root, r.lib)" :key="di"
                      class="chord-diagram-wrap cf-loadable" :class="{ 'cf-same': sameAsPlayed(d.frets) }"
                      role="button" tabindex="0" :title="t('cf.load-voicing')"
                      @click="loadVoicing(d.frets)" @keydown.enter="loadVoicing(d.frets)"
                    >
                      <div v-html="renderSVG(d.frets, d.fingers, d.baseFret)"></div>
                      <div class="chord-diagram-label" style="font-family: var(--jd-mono); font-size: 10px;">
                        {{ sameAsPlayed(d.frets) ? t('cf.yours') : d.label }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="cf-panel-msg">{{ t('cf.no-voicings') }}</div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div v-else-if="played.length >= 2" class="cf-empty">{{ t('cf.no-chord-neck') }}</div>
        <div v-else class="cf-empty">{{ t('cf.pick-two') }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { useChordLibrary } from '../composables/useChordLibrary.js'
import { readStorage, writeStorage } from '../composables/useLocalStorage.js'
import { NOTES, NOTES_FLAT, ROOT_NAMES, INTERVAL_COLORS, spellChord, getAbsoluteNote } from '../utils/theory.js'
import { identifyChord, parseTab, formatTab } from '../utils/chordIdentify.js'
import { pretty } from '../course/theory.js'
import NeckDiagram from '../components/course/NeckDiagram.vue'

const appStore = useAppStore()
const route = useRoute()
const { t } = useI18n()
const { load, loaded, getVoicings } = useChordLibrary()

const STORAGE_KEY = 'jazzVizChordFinder'
const saved = readStorage(STORAGE_KEY, {}) || {}

const mode = ref(route.query.mode === 'neck' ? 'neck' : (saved.mode === 'neck' ? 'neck' : 'notes'))
function setMode(m) { mode.value = m }

onMounted(() => { load() })

// ── Notes mode ─────────────────────────────────────────────────────────────────
const selectedNotes = ref(new Set())
const expandedIdx   = ref(-1)

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
      const spelled = spellChord(ROOT_NAMES[root], tmpl.intervals)
      const missingNames = missing.map(n => spelled[tmpl.intervals.findIndex(i => (root + i) % 12 === n)])
      found.push({ name: ROOT_NAMES[root] + tmpl.name, root, type: tmpl.name, missing, missingNames, score: selected.length - missing.length * 0.5 })
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

// ── Neck mode ──────────────────────────────────────────────────────────────────
// frets[i]: fret played on string i, from the 6th string (i = 0) to the 1st (i = 5); null = not played.
const frets = ref(Array.isArray(saved.frets) && saved.frets.length === 6 ? saved.frets : [null, 3, 2, 0, 1, 0])
const tabText = ref(formatTab(frets.value))
const tabError = ref(false)
const chosen = ref(0)
const openIdx = ref(-1)

watch([mode, frets], () => writeStorage(STORAGE_KEY, { mode: mode.value, frets: frets.value }), { deep: true })

// The diagram counts strings from the 1st (s = 0) to the 6th (s = 5).
const sOf = i => 5 - i
const openMidi = computed(() => [0, 1, 2, 3, 4, 5].map(s => getAbsoluteNote(appStore.currentTuning, s, 0)))
const midiOf = i => openMidi.value[sOf(i)] + frets.value[i]

function onPick({ s, f }) {
  const i = 5 - s
  const next = [...frets.value]
  next[i] = next[i] === f ? null : f
  frets.value = next
}

function applyTab() {
  const parsed = parseTab(tabText.value, 22)
  if (!tabText.value.trim()) { tabError.value = false; return }
  if (!parsed) { tabError.value = true; return }
  tabError.value = false
  frets.value = parsed
}

function clearNeck() {
  frets.value = [null, null, null, null, null, null]
}

watch(frets, f => {
  tabText.value = formatTab(f)
  tabError.value = false
  chosen.value = 0
  openIdx.value = -1
})

const playedIdx = computed(() => frets.value.map((f, i) => (f === null ? -1 : i)).filter(i => i >= 0))
const readings = computed(() => {
  const midis = playedIdx.value.map(midiOf)
  if (midis.length < 2) return []
  const bass = Math.min(...midis)
  return identifyChord(midis.map(m => m % 12), bass % 12, 8)
})
const reading = computed(() => readings.value[chosen.value] || null)

// Notes from the lowest string up, named and labelled after the reading chosen.
const played = computed(() => playedIdx.value.map(i => {
  const pc = midiOf(i) % 12
  const r = reading.value
  return {
    i, pc,
    name: r ? r.names.get(pc) : (appStore.accidental === 'b' ? NOTES_FLAT : NOTES)[pc],
    deg: r ? r.labels.get(pc) : '',
  }
}))

const neckDots = computed(() => played.value.map(n => {
  const r = reading.value
  const semi = r ? (n.pc - r.root + 12) % 12 : null
  return {
    s: sOf(n.i), f: frets.value[n.i],
    note: n.name, deg: n.deg || undefined,
    color: semi === null ? '#ede8df' : INTERVAL_COLORS[semi].color,
  }
}))
const neckTo = computed(() => Math.max(15, ...frets.value.filter(f => f !== null).map(f => f + 1)))
const mutedStrings = computed(() => frets.value.map((f, i) => (f === null ? sOf(i) : -1)).filter(s => s >= 0))

function pickReading(i) {
  chosen.value = i
  openIdx.value = openIdx.value === i ? -1 : i
}

function detailOf(r) {
  const parts = [played.value.map(n => r.labels.get(n.pc)).join(' · ')]
  if (r.bassLabel) parts.push(`${r.bassLabel} ${t('cf.in-bass')}`)
  if (r.rootless) parts.push(t('cf.rootless'))
  if (r.missing.length) parts.push(`${t('cf.without')} ${r.missing.join(', ')}`)
  return parts.join(' — ')
}

// Put a library fingering on the neck (library strings go from the 6th to the 1st, -1 = not played).
function loadVoicing(libFrets) {
  frets.value = libFrets.map(f => (f === -1 ? null : f))
  document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
}

// The played fingering among the library ones (library strings go from the 6th to the 1st).
function sameAsPlayed(libFrets) {
  return libFrets.every((f, i) => (f === -1 ? frets.value[i] === null : frets.value[i] === f))
}

// ── Fingering library ──────────────────────────────────────────────────────────
const TYPE_MAP = {'maj':'','min':'m','m':'m','7':'7','maj7':'maj7','m7':'m7','m7b5':'m7b5','dim7':'dim7','dim':'dim','aug':'aug','sus2':'sus2','sus4':'sus4','9':'9','maj9':'maj9','m9':'m9','13':'13','mMaj7':'mmaj7','7alt':'7#9','maj7#11':'maj#11','6':'6','m6':'m6','add9':'add9'}

function diagramsFor(root, suffix) {
  if (!loaded.value) return []
  const voicings = getVoicings(NOTES[root] + suffix)
  if (!voicings?.length) return []
  const result = []
  for (const v of voicings) {
    const fr = v.positions.map(p => p === 'x' ? -1 : parseInt(p))
    const fingers = v.fingerings[0].map(f => parseInt(f))
    const active = fr.filter(f => f > 0)
    if (!active.length) continue
    const minF = Math.min(...active), maxF = Math.max(...active)
    if (maxF - minF > 4) continue
    const hasOpen = fr.some(f => f === 0)
    const base = hasOpen ? 1 : minF
    result.push({ frets: fr, fingers, baseFret: base, label: base <= 1 ? 'Open' : `${minF}fr` })
  }
  return result
}

function renderSVG(frets, fingers, baseFret) {
  // NX leaves room for a two-digit "12fr" label left of the diagram.
  const W=118, H=130, NX=28, NY=28, SW=(W-NX-10)/5, FH=(H-NY-12)/5, R=7
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

<style scoped>
/* Phones: the twelve notes in three rows of four */
@media (max-width: 600px) { .cf-note-grid { grid-template-columns: repeat(4, 1fr); gap: 10px; } }
.cf-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px; }
.cf-subtitle { color: var(--jd-text-soft); font-size: 0.85em; margin: 0; font-family: var(--jd-mono); letter-spacing: 0.5px; flex: 1 1 320px; }
.cf-modes { display: inline-flex; border: 1px solid var(--jd-line-strong); border-radius: 10px; overflow: hidden; }
.cf-mode {
  font-family: var(--jd-mono); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
  background: transparent; color: var(--jd-text-soft); border: 0; padding: 8px 16px; cursor: pointer;
}
.cf-mode + .cf-mode { border-left: 1px solid var(--jd-line-strong); }
.cf-mode.on { background: rgba(255, 214, 10, 0.14); color: var(--jd-amber); }

.cf-neck { margin-bottom: 25px; padding: 22px 25px; }
.cf-neck-help { position: relative; z-index: 1; font-size: 0.82em; color: var(--jd-text-soft); line-height: 1.6; margin: 0 0 4px; }
.cf-neck :deep(.nd) { position: relative; z-index: 1; }
.cf-neck-bar { position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 12px; margin-top: 4px; }
.cf-tab-field { display: flex; flex-direction: column; gap: 5px; flex: 1 1 220px; max-width: 320px; }
.cf-tab-label { font-family: var(--jd-mono); font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--jd-muted); }
.cf-tab-input {
  font-family: var(--jd-mono); font-size: 15px; letter-spacing: 1px; color: var(--jd-text);
  background: #0b0a09; border: 1px solid var(--jd-line-strong); border-radius: 8px; padding: 8px 12px;
}
.cf-tab-input:focus { outline: none; border-color: var(--jd-amber); }
.cf-tab-input[aria-invalid="true"] { border-color: var(--jd-red); }
.cf-clear { width: auto; padding: 0 20px; }
.cf-tab-error { position: relative; z-index: 1; margin-top: 8px; font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-red); }
.cf-played { position: relative; z-index: 1; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 16px; }
.cf-played-label { font-family: var(--jd-mono); font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--jd-muted); margin-right: 4px; }
.cf-played-note {
  display: inline-flex; align-items: baseline; gap: 5px; padding: 4px 10px; border-radius: 8px;
  background: rgba(255, 255, 255, 0.04); border: 1px solid var(--jd-line);
  font-family: var(--jd-mono); font-size: 0.85em; color: var(--jd-text);
}
.cf-played-note em { font-style: normal; font-size: 0.8em; color: var(--jd-amber); }

.cf-reading { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; min-width: 0; }
.cf-reading-name { font-weight: 700; }
.cf-reading-name.best { color: var(--jd-amber); font-size: 1.15em; }
.cf-reading-detail { font-family: var(--jd-mono); font-size: 0.75em; color: var(--jd-muted); }
.cf-result-item.chosen { border-color: var(--jd-line-strong); }
.cf-panel-title { font-family: var(--jd-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--jd-muted); text-align: center; margin-bottom: 12px; }
.cf-panel-msg { color: var(--jd-muted); font-size: 0.85em; padding: 14px; text-align: center; font-family: var(--jd-mono); }
.cf-diagrams { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.cf-loadable { cursor: pointer; border-radius: 8px; transition: background 0.15s; }
.cf-loadable:hover { background: rgba(255, 214, 10, 0.06); }
.cf-same { outline: 2px solid var(--jd-green); outline-offset: 2px; border-radius: 8px; }
.cf-same .chord-diagram-label { color: var(--jd-green); }
.cf-empty { color: var(--jd-muted); text-align: center; padding: 40px; font-family: var(--jd-mono); font-size: 0.9em; }
</style>
