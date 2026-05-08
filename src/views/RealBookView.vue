<template>
  <div id="view-real-book" class="view-panel active">
    <div style="max-width:860px;margin:0 auto;display:flex;flex-direction:column;gap:16px;">

      <h2 class="area-title">{{ t('rb.title') }}</h2>
      <p style="color:var(--secondary-text);font-size:0.85em;margin-bottom:20px;">{{ t('rb.subtitle') }}</p>

      <!-- Search + Category filters -->
      <div style="display:flex;flex-direction:column;gap:10px;">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('rb.search')"
          style="width:100%;box-sizing:border-box;background:#2c2c2e;border:1px solid rgba(255,255,255,0.15);color:#fff;padding:8px 12px;border-radius:8px;font-size:0.9em;height:38px;"
        >
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button
            v-for="cat in CATEGORIES"
            :key="cat"
            class="rb-cat-btn"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
      </div>

      <!-- Results list -->
      <div class="rb-list">
        <div v-if="!filtered.length" style="color:#555;padding:20px;text-align:center;">
          {{ t('rb.no-results') }}
        </div>
        <div
          v-for="s in filtered"
          :key="s.title"
          class="rb-standard-card"
        >
          <div class="rb-standard-info">
            <div class="rb-standard-title">{{ s.title }}</div>
            <div class="rb-standard-meta">
              {{ s.composer }} · Key: {{ s.key }} ·
              <span class="rb-style-tag">{{ s.style }}</span>
            </div>
            <div class="rb-standard-chords">{{ s.chords }}</div>
          </div>
          <button class="btn-add-step rb-load-btn" @click="loadStandard(s.chords)">
            {{ t('rb.load-btn') }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaybackStore } from '../stores/playback.js'
import { useI18n } from '../composables/useI18n.js'

const router = useRouter()
const pb     = usePlaybackStore()
const { t }  = useI18n()

const CATEGORIES = ['All','Standard','Bebop','Blues','Latin','Modal','Ballad']

const STANDARDS = [
  { title:'Autumn Leaves',                    composer:'Joseph Kosma',      key:'G',  style:'Standard', chords:'| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |' },
  { title:'All The Things You Are',           composer:'Jerome Kern',       key:'Ab', style:'Standard', chords:'| Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | G7 | Cmaj7 |' },
  { title:'There Will Never Be Another You',  composer:'Harry Warren',      key:'Eb', style:'Standard', chords:'| Ebmaj7 | Cm7 | Fm7 Bb7 | Ebmaj7 Eb7 | Abmaj7 | Abm7 Db7 | Ebmaj7 Cm7 | Fm7 Bb7 |' },
  { title:'Misty',                            composer:'Erroll Garner',     key:'Eb', style:'Ballad',   chords:'| Ebmaj7 | Bbm7 Eb7 | Abmaj7 | Abm7 Db7 | Ebmaj7 Cm7 | Fm7 Bb7 | Ebmaj7 Cm7 | Fm7 Bb7 |' },
  { title:'Stella By Starlight',              composer:'Victor Young',      key:'Bb', style:'Standard', chords:'| Em7b5 A7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 | Cm7b5 F7 | Bbmaj7 Gm7 | Em7b5 A7 | Dm7 G7 |' },
  { title:'ii-V-I in C',                      composer:'Common',            key:'C',  style:'Bebop',    chords:'| Dm7 G7 | Cmaj7 |' },
  { title:'ii-V-I in F',                      composer:'Common',            key:'F',  style:'Bebop',    chords:'| Gm7 C7 | Fmaj7 |' },
  { title:'ii-V-I in Bb',                     composer:'Common',            key:'Bb', style:'Bebop',    chords:'| Cm7 F7 | Bbmaj7 |' },
  { title:'Minor ii-V-i',                     composer:'Common',            key:'Dm', style:'Bebop',    chords:'| Em7b5 A7 | Dm7 |' },
  { title:'Rhythm Changes (Bb)',              composer:'Gershwin',          key:'Bb', style:'Bebop',    chords:'| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7b5 G7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 |' },
  { title:'12-Bar Blues in Bb',               composer:'Traditional',       key:'Bb', style:'Blues',    chords:'| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |' },
  { title:'12-Bar Blues in F',                composer:'Traditional',       key:'F',  style:'Blues',    chords:'| F7 | Bb7 | F7 | F7 | Bb7 | Bb7 | F7 | D7 | Gm7 | C7 | F7 | C7 |' },
  { title:'Blue Bossa',                       composer:'Kenny Dorham',      key:'Cm', style:'Latin',    chords:'| Cm7 | Cm7 | Fm7 | Fm7 | Dm7b5 G7 | Cm7 | Ebm7 Ab7 | Dbmaj7 | Dm7b5 G7 | Cm7 |' },
  { title:'Wave',                             composer:'Tom Jobim',         key:'D',  style:'Latin',    chords:'| Dmaj7 | G#m7b5 C#7 | F#m7 | Bm7 E7 | Em7 A7 | Dmaj7 |' },
  { title:'So What',                          composer:'Miles Davis',       key:'D',  style:'Modal',    chords:'| Dm7 | Dm7 | Dm7 | Dm7 | Ebm7 | Ebm7 | Dm7 | Dm7 |' },
  { title:'Maiden Voyage',                    composer:'Herbie Hancock',    key:'D',  style:'Modal',    chords:'| Dm7(sus4) | Fm7(sus4) | Abm7(sus4) | Bbm7(sus4) |' },
  { title:'Turnaround (C)',                   composer:'Common',            key:'C',  style:'Standard', chords:'| Cmaj7 Am7 | Dm7 G7 |' },
  { title:'Giant Steps (excerpt)',            composer:'John Coltrane',     key:'B',  style:'Bebop',    chords:'| Bmaj7 D7 | Gmaj7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 Bb7 | Ebmaj7 F#7 | Bmaj7 | Fm7 Bb7 |' },
  { title:'Summertime',                       composer:'Gershwin',          key:'Am', style:'Standard', chords:'| Am7 E7 | Am7 E7 | Am7 D7 | Am7 E7 | Am7 | Am7 | Dm7 | E7 | Am7 Dm7 | Am7 E7 | Am7 |' },
  { title:'Take The A Train',                 composer:'Billy Strayhorn',   key:'C',  style:'Standard', chords:'| Cmaj7 | D7 | Dm7 G7 | Cmaj7 | C7 | Fmaj7 | Fm7 | Cmaj7 G7 |' },
]

const searchQuery    = ref('')
const activeCategory = ref('All')

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return STANDARDS.filter(s => {
    const catOk    = activeCategory.value === 'All' || s.style === activeCategory.value
    const searchOk = !q || s.title.toLowerCase().includes(q) || s.composer.toLowerCase().includes(q) || s.key.toLowerCase().includes(q)
    return catOk && searchOk
  })
})

function loadStandard(chords) {
  pb.importFromText(chords)
  router.push('/player')
}
</script>
