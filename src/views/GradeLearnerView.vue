<template>
  <div id="view-grade-learner" class="view-panel active">
    <div class="importer-area" style="max-width:680px;margin: 0 auto; width: 100%; text-align: center;">
      <h2 class="area-title" data-i18n="gl.title">{{ t('gl.title') }}</h2>

      <!-- Top Bar -->
      <div style="width:100%;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <!-- Question -->
        <div style="flex:1;min-width:200px;font-size:1.05em;font-weight:600;color:var(--text-h);">
          <span v-if="active">{{ questionText }}</span>
          <span v-else style="color:var(--text);font-style:italic;">{{ t('gl.ready') }}</span>
        </div>

        <!-- Score -->
        <div style="font-size:0.9em;color:var(--text);">
          {{ t('gl.status') }}: <strong style="color:var(--text-h);">{{ score }} / {{ total }}</strong>
        </div>

        <!-- Buttons -->
        <div style="display:flex;gap:8px;">
          <button class="btn-add-step" @click="startNext">{{ t('btn.start-next') }}</button>
          <button class="btn-replay" @click="playRootNote">{{ t('btn.replay') }}</button>
          <button class="btn-reset" style="width:auto;padding:0 14px;" @click="resetGame">{{ t('btn.reset-game') }}</button>
        </div>
      </div>

      <!-- Mode Checkboxes -->
      <div style="display:flex;gap:20px;align-items:center;">
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9em;">
          <input type="checkbox" v-model="freeMode"> {{ t('gl.free-mode') }}
        </label>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:0.9em;">
          <input type="checkbox" v-model="hardMode"> {{ t('gl.hard-mode') }}
        </label>
      </div>

      <!-- Fixed Mode Selectors -->
      <div v-if="!freeMode" style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center;">
        <div class="nav-group">
          <label>Root</label>
          <select v-model="fixedRoot">
            <option v-for="n in GL_ROOTS" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        <div class="nav-group">
          <label>Scale</label>
          <select v-model="fixedScale">
            <option v-for="s in scaleNames" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <!-- Status feedback -->
      <div v-if="feedbackMsg" :style="{
        fontSize:'1em', fontWeight:'600', padding:'6px 18px', borderRadius:'20px',
        background: feedbackOk ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
        color: feedbackOk ? '#16a34a' : '#dc2626',
        transition: 'all 0.3s'
      }">{{ feedbackMsg }}</div>

      <!-- Legend -->
      <div style="display:flex;gap:14px;font-size:0.78em;color:var(--text);">
        <span v-if="hardMode">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#aaa;margin-right:4px;vertical-align:middle;"></span>{{ t('gl.sharp-outer') }}
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#667;margin-right:4px;margin-left:8px;vertical-align:middle;"></span>{{ t('gl.flat-inner') }}
        </span>
      </div>

      <!-- Chromatic Circle -->
      <div class="circle-container" style="position: relative; width: 320px; height: 320px; margin: 40px auto;">
          <svg id="gl-rings-svg" width="320" height="320" style="position:absolute;top:0;left:0;pointer-events:none;">
              <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(255,255,255,.04)" stroke-width="1.5"/>
              <circle id="gl-inner-ring-svg" cx="160" cy="160" r="82" fill="none" stroke="rgba(255,214,10,.12)" stroke-width="1" stroke-dasharray="4,4" :style="hardMode ? 'display:block;' : 'display:none;'"/>
          </svg>
          <div id="note-circle-ui" class="note-circle-board" style="position: relative; width: 100%; height: 100%;">

            <!-- Outer ring (sharp names) -->
            <button
              v-for="n in noteButtons"
              :key="'outer-' + n.idx"
              :class="['gl-note-btn', noteStates[n.idx]]"
              :style="{
                position:'absolute',
                left: n.ox + 'px',
                top:  n.oy + 'px',
                width:'44px', height:'44px',
                borderRadius:'50%',
                fontSize: n.isFlat ? '0.7em' : '0.82em',
                fontWeight:'700',
                cursor:'pointer',
                border:'2px solid var(--border)',
                background: noteStates[n.idx] === 'correct'
                  ? '#22c55e'
                  : noteStates[n.idx] === 'wrong'
                    ? '#ef4444'
                    : 'var(--code-bg)',
                color: noteStates[n.idx] ? '#fff' : 'var(--text-h)',
                transition:'background 0.2s, color 0.2s',
                zIndex: 2,
                display:'flex', alignItems:'center', justifyContent:'center',
                transform: 'translate(-50%, -50%)'
              }"
              @click="onNoteClick(n.idx, false)"
            >{{ n.sharpName }}</button>

            <!-- Inner ring (flat names) — hard mode only for enharmonic notes -->
            <template v-if="hardMode">
              <button
                v-for="n in flatButtons"
                :key="'inner-' + n.idx + '-flat'"
                :class="['gl-note-btn', flatStates[n.idx]]"
                :style="{
                  position:'absolute',
                  left: n.ix + 'px',
                  top:  n.iy + 'px',
                  width:'38px', height:'38px',
                  borderRadius:'50%',
                  fontSize:'0.68em',
                  fontWeight:'700',
                  cursor:'pointer',
                  border:'2px solid var(--border)',
                  background: flatStates[n.idx] === 'correct'
                    ? '#22c55e'
                    : flatStates[n.idx] === 'wrong'
                      ? '#ef4444'
                      : '#4b5563',
                  color: flatStates[n.idx] ? '#fff' : '#d1d5db',
                  transition:'background 0.2s',
                  zIndex: 1,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transform: 'translate(-50%, -50%)'
                }"
                @click="onNoteClick(n.idx, true)"
              >{{ n.flatName }}</button>
            </template>

            <!-- Center label -->
            <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none;">
              <div style="font-size:0.75em;color:var(--text);line-height:1.3;">
                <span v-if="active">{{ gameRoot }}</span>
                <span v-else>♩</span>
              </div>
            </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudioStore } from '../stores/audio.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES, NOTES_FLAT, SCALES } from '../utils/theory.js'

const audio    = useAudioStore()
const appStore = useAppStore()
const { t }    = useI18n()

// ── Constants ─────────────────────────────────────────────────────────────────
const GL_ROOTS = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B']
const ORDINALS_IT = ['','1°','2°','3°','4°','5°','6°','7°']
const ORDINALS_EN = ['','1st','2nd','3rd','4th','5th','6th','7th']

// ── State ─────────────────────────────────────────────────────────────────────
const score      = ref(0)
const total      = ref(0)
const active     = ref(false)
const gameRootIdx = ref(0)
const gameRoot   = ref('C')
const targetGrade = ref(0)   // interval in semitones
const targetDegree = ref(1)  // 1-based degree number
const currentScale = ref('Ionio (Maj7)')
const feedbackMsg  = ref('')
const feedbackOk   = ref(true)

// noteStates: 'correct' | 'wrong' | ''
const noteStates = ref(Object.fromEntries(Array.from({length:12},(_,i)=>[i,''])))
const flatStates = ref(Object.fromEntries(Array.from({length:12},(_,i)=>[i,''])))

// Mode
const freeMode  = ref(true)
const hardMode  = ref(false)
const fixedRoot  = ref('C')
const fixedScale = ref('Ionio (Maj7)')

// ── Computed ──────────────────────────────────────────────────────────────────
const scaleNames = computed(() => Object.keys(SCALES))

const questionText = computed(() => {
  const ordinals = appStore.lang === 'it' ? ORDINALS_IT : ORDINALS_EN
  const deg = ordinals[targetDegree.value] || targetDegree.value + '°'
  return t('gl.grade-label')
    .replace('{0}', deg)
    .replace('{1}', gameRoot.value)
    .replace('{2}', currentScale.value)
})

// Circle geometry — outer radius 135, inner radius 80, center 160,160
const noteButtons = computed(() => {
  return Array.from({length:12}, (_, i) => {
    const angle = (i * 30 - 90) * Math.PI / 180
    const r = 135
    return {
      idx: i,
      sharpName: NOTES[i],
      flatName: NOTES_FLAT[i],
      isFlat: NOTES[i] !== NOTES_FLAT[i],
      ox: 160 + r * Math.cos(angle),
      oy: 160 + r * Math.sin(angle),
    }
  })
})

const flatButtons = computed(() => {
  // Only show inner ring for enharmonic (black key) notes
  return noteButtons.value.filter(n => n.isFlat).map(n => {
    const angle = (n.idx * 30 - 90) * Math.PI / 180
    const r = 80
    return {
      ...n,
      ix: 160 + r * Math.cos(angle),
      iy: 160 + r * Math.sin(angle),
    }
  })
})

// ── Helpers ───────────────────────────────────────────────────────────────────
function clearStates() {
  noteStates.value  = Object.fromEntries(Array.from({length:12},(_,i)=>[i,'']))
  flatStates.value  = Object.fromEntries(Array.from({length:12},(_,i)=>[i,'']))
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function rootNameToIdx(name) {
  let i = NOTES.indexOf(name)
  return i !== -1 ? i : NOTES_FLAT.indexOf(name)
}

// ── Game Logic ────────────────────────────────────────────────────────────────
function startNext() {
  audio.init()
  clearStates()
  feedbackMsg.value = ''
  active.value = true

  let root, scaleName
  if (freeMode.value) {
    root      = randomItem(GL_ROOTS)
    scaleName = randomItem(Object.keys(SCALES))
  } else {
    root      = fixedRoot.value
    scaleName = fixedScale.value
  }

  const scaleIntervals = SCALES[scaleName] || SCALES['Ionio (Maj7)']
  const degreeIdx = Math.floor(Math.random() * scaleIntervals.length)  // 0-based index

  gameRoot.value    = root
  gameRootIdx.value = rootNameToIdx(root)
  currentScale.value = scaleName
  targetGrade.value  = scaleIntervals[degreeIdx]
  targetDegree.value = degreeIdx + 1

  // Sync appStore for fretboard
  appStore.setRoot(root)
  appStore.setScaleName(scaleName)

  playRootNote()
}

function playRootNote() {
  if (!active.value) return
  audio.init()
  audio.playNoteImmediate(gameRootIdx.value, 0.8, 0.25, 'Electric Piano', 4)
}

function onNoteClick(idx, isFlat) {
  if (!active.value) return
  total.value++

  const correctIdx = (gameRootIdx.value + targetGrade.value) % 12
  const isCorrect  = idx === correctIdx

  if (isCorrect) {
    // Mark correct
    if (isFlat) {
      flatStates.value  = { ...flatStates.value,  [idx]: 'correct' }
    } else {
      noteStates.value  = { ...noteStates.value,  [idx]: 'correct' }
    }
    score.value++
    feedbackMsg.value = t('gl.correct')
    feedbackOk.value  = true
    audio.playNoteImmediate(idx, 0.6, 0.25, 'Electric Piano', 4)
    active.value = false
  } else {
    // Wrong — mark wrong button, then reveal correct after 500ms
    if (isFlat) {
      flatStates.value = { ...flatStates.value, [idx]: 'wrong' }
    } else {
      noteStates.value = { ...noteStates.value, [idx]: 'wrong' }
    }
    const correctName = NOTES[correctIdx]
    feedbackMsg.value = t('gl.wrong-answer').replace('{0}', correctName)
    feedbackOk.value  = false

    setTimeout(() => {
      noteStates.value = { ...noteStates.value, [correctIdx]: 'correct' }
      audio.playNoteImmediate(correctIdx, 0.6, 0.25, 'Electric Piano', 4)
      active.value = false
    }, 500)
  }
}

function resetGame() {
  score.value = 0
  total.value = 0
  active.value = false
  clearStates()
  feedbackMsg.value = ''
}
</script>
