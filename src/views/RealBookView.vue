<template>
  <div id="view-real-book" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('rb.title') }}</h1>
      </div>
    </header>

    <div class="importer-area" style="max-width:860px; margin: 0 auto; width: 100%; padding-top: 20px;">
      <p
        style="color:var(--jd-text-soft); font-size:0.85em; margin-bottom:20px; font-family:var(--jd-mono); letter-spacing:0.5px;">
        {{ t('rb.subtitle') }}</p>

      <!-- Search + Category filters -->
      <section class="jd-console" style="margin-bottom:25px; padding: 25px;">
        <div class="jd-grain" aria-hidden="true"></div>
        <div class="jd-section-label">
          <span>SEARCH & FILTER</span>
          <span class="jd-section-rule"></span>
        </div>

        <div style="display:flex; flex-direction:column; gap:15px; padding: 10px 0;">
          <input v-model="searchQuery" type="text" :placeholder="t('rb.search')" class="jd-bpm-input"
            style="width:100%; text-align: left; padding: 0 15px; font-size: 1em;">
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button v-for="cat in CATEGORIES" :key="cat" class="rb-cat-btn" :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat">{{ cat }}</button>
          </div>
        </div>
      </section>

      <!-- Results list -->
      <div class="rb-list jd-steps">
        <div class="jd-section-label" style="margin-bottom: 15px;">
          <span>STANDARDS</span>
          <span class="jd-section-rule"></span>
        </div>

        <div v-if="!filtered.length"
          style="color:var(--jd-muted); padding:40px; text-align:center; font-family: var(--jd-mono);">
          {{ t('rb.no-results') }}
        </div>
        <div v-for="s in filtered" :key="s.title" class="rb-standard-card">
          <div class="rb-standard-info">
            <div class="rb-standard-title">{{ s.title }}</div>
            <div class="rb-standard-meta">
              {{ s.composer }} · Key: {{ s.key }} ·
              <span class="rb-style-tag">{{ s.style }}</span>
            </div>
            <div class="rb-standard-chords">{{ s.chords }}</div>
          </div>
          <button class="btn-add-step rb-load-btn" @click="loadStandard(s)">
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
const pb = usePlaybackStore()
const { t } = useI18n()

const CATEGORIES = ['All', 'Standard', 'Bebop', 'Blues', 'Latin', 'Modal', 'Ballad']

const STANDARDS = [
  {
    title: 'Autumn Leaves', composer: 'Joseph Kosma', key: 'Em', style: 'Standard', bpm: 140, playback: 'Swing',
    chords: '| Am7 | D7 | Gmaj7 | Cmaj7 | F#m7b5 | B7alt | Em7 | % | Am7 | D7 | Gmaj7 | Cmaj7 | F#m7b5 | B7alt | Em7 | % | F#m7b5 | B7alt | Em7 | % | Am7 | D7 | Gmaj7 | % | F#m7b5 | B7alt | Em7 Eb7 | Dm7 Db7 | Cmaj7 | B7alt | Em7 | % |'
  },
  {
    title: 'All The Things You Are', composer: 'Jerome Kern', key: 'Ab', style: 'Standard', bpm: 130, playback: 'Swing',
    chords: '| Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | G7 | Cmaj7 | % | Cm7 | Fm7 | Bb7 | Ebmaj7 | Abmaj7 | D7 | Gmaj7 | % | Am7 | D7 | Gmaj7 | % | F#m7 | B7 | Emaj7 | C7alt | Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | Dbm7 | Cm7 | Bdim7 | Bbm7 | Eb7 | Abmaj7 | % |'
  },
  {
    title: 'Stella By Starlight', composer: 'Victor Young', key: 'Bb', style: 'Standard', bpm: 120, playback: 'Swing',
    chords: '| Em7b5 | A7alt | Cm7 | F7 | Fm7 | Bb7 | Ebmaj7 | Ab7 | Bbmaj7 | % | Em7b5 | A7alt | Dm7 | % | Bbm7 | Eb7 | Fmaj7 | % | Em7b5 | A7alt | Dm7 | % | Bbm7 | Eb7 | Fmaj7 | % | Em7b5 | A7alt | Bbmaj7 | Ab7 | Bbmaj7 | G7alt | Cm7b5 | F7alt | Bbmaj7 | % |'
  },
  {
    title: 'Blue Bossa', composer: 'Kenny Dorham', key: 'Cm', style: 'Latin', bpm: 140, playback: 'Bossa',
    chords: '| Cm7 | % | Fm7 | % | Dm7b5 | G7alt | Cm7 | % | Ebm7 | Ab7 | Dbmaj7 | % | Dm7b5 | G7alt | Cm7 | Dm7b5 G7alt |'
  },
  {
    title: 'So What', composer: 'Miles Davis', key: 'Dm', style: 'Modal', bpm: 140, playback: 'Swing',
    chords: '| Dm7 | % | % | % | % | % | % | % | Dm7 | % | % | % | % | % | % | % | Ebm7 | % | % | % | % | % | % | % | Dm7 | % | % | % | % | % | % | % |'
  },
  {
    title: 'Wave', composer: 'Tom Jobim', key: 'D', style: 'Latin', bpm: 140, playback: 'Bossa',
    chords: '| Dmaj7 | Bbdim7 | Am7 | D7 | Gmaj7 | % | Gm7 | C7 | F#m7 | B7alt | E7 | Bb7 | A7 | % | Dmaj7 | % |'
  },
  {
    title: 'Take The A Train', composer: 'Billy Strayhorn', key: 'C', style: 'Standard', bpm: 160, playback: 'Swing',
    chords: '| Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | Dm7 G7 | Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | % | Fmaj7 | % | % | % | D7 | % | Dm7 | G7 | Cmaj7 | % | D7alt | % | Dm7 | G7 | Cmaj7 | Dm7 G7 |'
  },
  {
    title: 'Giant Steps', composer: 'John Coltrane', key: 'B', style: 'Bebop', bpm: 240, playback: 'Swing',
    chords: '| Bmaj7 D7 | Gmaj7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 Bb7 | Ebmaj7 F#7 | Bmaj7 | Fm7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 | C#m7 F#7 | Bmaj7 | Fm7 Bb7 | Ebmaj7 | C#m7 F#7 |'
  },
  {
    title: 'Summertime', composer: 'Gershwin', key: 'Am', style: 'Standard', bpm: 100, playback: 'Swing',
    chords: '| Am7 | E7alt | Am7 | % | Dm7 | % | Bm7b5 | E7alt | Am7 | E7alt | Am7 | D7 | Cmaj7 | Am7 | Bm7b5 E7alt | Am7 (E7alt) |'
  },
  {
    title: 'Maiden Voyage', composer: 'Herbie Hancock', key: 'D', style: 'Modal', bpm: 120, playback: 'Standard',
    chords: '| D7sus | % | % | % | F7sus | % | % | % | Eb7sus | % | % | % | Dbmaj7#11 | % | % | % |'
  },
  { title: 'ii-V-I in C', composer: 'Common', key: 'C', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Dm7 | G7 | Cmaj7 | % |' },
  { title: 'ii-V-I in F', composer: 'Common', key: 'F', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Gm7 | C7 | Fmaj7 | % |' },
  { title: 'ii-V-I in Bb', composer: 'Common', key: 'Bb', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Cm7 | F7 | Bbmaj7 | % |' },
  { title: 'Minor ii-V-i', composer: 'Common', key: 'Dm', style: 'Bebop', bpm: 120, playback: 'Swing', chords: '| Em7b5 | A7alt | Dm7 | % |' },
  { title: 'Rhythm Changes (Bb)', composer: 'Gershwin', key: 'Bb', style: 'Bebop', bpm: 180, playback: 'Swing', chords: '| Bbmaj7 Gm7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7 G7 | Cm7 F7 |' },
]

const searchQuery = ref('')
const activeCategory = ref('All')

const filtered = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return STANDARDS.filter(s => {
    const catOk = activeCategory.value === 'All' || s.style === activeCategory.value
    const searchOk = !q || s.title.toLowerCase().includes(q) || s.composer.toLowerCase().includes(q) || s.key.toLowerCase().includes(q)
    return catOk && searchOk
  })
})

function loadStandard(s) {
  pb.importFromText(s.chords)
  pb.bpm = s.bpm || 120
  pb.accompanimentStyle = s.playback || 'Standard'

  // Also set up appropriate drum/bass settings if it's Bossa
  if (s.playback === 'Bossa') {
    pb.drumsOn = true
    pb.bassOn = true
    pb.setDrumStyle('bossa')
    pb.bassStyle = 'root_5'
  } else if (s.playback === 'Swing') {
    pb.drumsOn = true
    pb.bassOn = true
    pb.setDrumStyle('jazz')
    pb.bassStyle = 'walking'
  }

  router.push('/player')
}
</script>
