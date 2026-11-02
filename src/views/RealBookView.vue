<template>
  <div id="view-real-book" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('rb.title') }}</h1>
      </div>
    </header>

    <div class="importer-area jd-container" style="padding-top: 20px;">
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
          <div class="rb-actions">
            <button class="jd-toolbtn rb-study-btn" :aria-expanded="openStudy === s.title" @click="openStudy = openStudy === s.title ? '' : s.title">
              {{ t('rb.study') }} · {{ doneCount(s.title) }}/{{ STUDY_STEPS.length }}
            </button>
            <button class="btn-add-step rb-load-btn" @click="loadStandard(s)">
              {{ t('rb.load-btn') }}
            </button>
          </div>
          <ol v-if="openStudy === s.title" class="rb-study">
            <li v-for="(step, i) in STUDY_STEPS" :key="step" class="rb-step" :class="{ done: stepsDone(s.title)[step] }">
              <label class="rb-step-check">
                <input type="checkbox" :checked="!!stepsDone(s.title)[step]" @change="setStepDone(s.title, step, $event.target.checked)">
                <span class="rb-step-n">{{ i + 1 }}</span>
              </label>
              <div class="rb-step-text">
                <strong>{{ t(`rb.step-${step}`) }}</strong>
                <span>{{ t(`rb.step-${step}-desc`) }}</span>
              </div>
              <button class="jd-toolbtn" @click="goStep(s, step)">{{ t('rb.step-go') }}</button>
            </li>
          </ol>
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
import { STANDARDS } from '../utils/standards.js'
import { STUDY_STEPS, stepsDone, setStepDone } from '../utils/studyPath.js'

const router = useRouter()
const pb = usePlaybackStore()
const { t } = useI18n()

const CATEGORIES = ['All', 'Standard', 'Bebop', 'Blues', 'Latin', 'Modal', 'Ballad']


const openStudy = ref('')

function doneCount(title) {
  return STUDY_STEPS.filter(step => stepsDone(title)[step]).length
}

// Step 1 opens the Player; the others open Over the Changes on this tune.
function goStep(s, step) {
  if (step === 'listen') {
    setStepDone(s.title, 'listen')
    return loadStandard(s)
  }
  router.push({ path: '/changes-trainer', query: { song: s.title, mode: step } })
}

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

<style scoped>
.rb-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
.rb-study-btn { white-space: nowrap; }
.rb-study { flex-basis: 100%; list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.rb-step { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border: 1px solid #2a2620; border-radius: 10px; background: rgba(0, 0, 0, 0.2); }
.rb-step.done { border-color: rgba(46, 204, 113, 0.4); }
.rb-step-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.rb-step-check input { width: 16px; height: 16px; accent-color: var(--jd-green); }
.rb-step-n { font-family: var(--jd-mono); font-size: 11px; color: var(--jd-muted); }
.rb-step-text { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.rb-step-text strong { font-size: 13px; color: var(--jd-text); }
.rb-step-text span { font-size: 12px; color: var(--jd-text-soft); }
.rb-step.done .rb-step-text strong { color: var(--jd-green); }
</style>
