<template>
  <div id="view-teoria" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('tj.title') }}</h1>
      </div>
    </header>

    <p class="jd-intro">{{ t('tj.subtitle') }}</p>

    <div class="teoria-container jd-container">

      <!-- 1. I 12 Intervalli -->
      <div class="teoria-card" :class="{ open: open[0] }">
        <button class="teoria-header" @click="toggle(0)"><span>{{ t('th.jazz1') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[0]">
            <p class="teoria-intro" v-html="J.intervals.intro"></p>
            <div class="interval-grid">
              <div v-for="(iv, key) in INTERVAL_COLORS" :key="key" class="interval-row">
                <div class="interval-swatch" :style="{ background: iv.color, color: [3,7].includes(+key) ? '#000' : '#fff' }">{{ iv.short }}</div>
                <span class="interval-name">{{ J.intervals.names[+key] }} ({{ key }} {{ J.intervals.st }})</span>
                <span class="interval-desc">{{ J.intervals.descs[+key] }}</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 2. Le Scale Jazz -->
      <div class="teoria-card" :class="{ open: open[1] }">
        <button class="teoria-header" @click="toggle(1)"><span>{{ t('th.jazz2') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[1]">
            <p class="teoria-intro" v-html="J.scales.intro"></p>
            <div class="scale-grid">
              <div v-for="(s, si) in jazzScales" :key="si" class="scale-item">
                <div class="scale-item-name">{{ J.scales.items[si][0] }}</div>
                <div class="scale-item-chord">{{ J.scales.on }} {{ J.scales.items[si][1] }}</div>
                <div class="scale-item-desc">{{ J.scales.items[si][2] }}</div>
                <div class="scale-intervals">
                  <span v-for="i in s.intervals" :key="i" class="scale-int-badge">{{ i }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 3. Gli Accordi Jazz -->
      <div class="teoria-card" :class="{ open: open[2] }">
        <button class="teoria-header" @click="toggle(2)"><span>{{ t('th.jazz3') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[2]">
            <p class="teoria-intro" v-html="J.chords.intro"></p>
            <div class="vl-scroll">
              <table class="chord-table">
                <thead><tr><th v-for="h in J.chords.head" :key="h">{{ h }}</th></tr></thead>
                <tbody>
                  <tr v-for="(c, ci) in jazzChords" :key="c.sym">
                    <td><span class="chord-symbol">{{ c.sym }}</span></td>
                    <td style="font-family:var(--jd-mono); font-size:0.75em;">{{ J.chords.items[ci][0] }}</td>
                    <td><span class="chord-formula">{{ c.formula }}</span></td>
                    <td style="font-family:var(--jd-mono); font-size:0.72em;">{{ J.chords.items[ci][1] }}</td>
                    <td style="font-family:var(--jd-display); font-style:italic;">{{ J.chords.items[ci][2] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 4. Progressioni Fondamentali -->
      <div class="teoria-card" :class="{ open: open[3] }">
        <button class="teoria-header" @click="toggle(3)"><span>{{ t('th.jazz4') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[3]">
            <p class="teoria-intro" v-html="J.progs.intro"></p>
            <div class="progs-grid">
              <div v-for="(prog, pi) in fundamentalProgs" :key="prog.key" class="prog-teoria-item">
                <div class="prog-teoria-name">{{ J.progs.items[pi][0] }} <span class="prog-teoria-tag">{{ J.progs.items[pi][1] }}</span></div>
                <div class="prog-example">{{ prog.chords }}</div>
                <div class="prog-teoria-desc">{{ J.progs.items[pi][2] }}</div>
                <button class="load-prog-btn" @click="loadProg(prog.key)">{{ J.progs.load }}</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 5. CAGED -->
      <div class="teoria-card" :class="{ open: open[4] }">
        <button class="teoria-header" @click="toggle(4)"><span>{{ t('th.jazz5') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[4]">
            <p class="teoria-intro" v-html="J.caged.intro"></p>
            <div class="caged-grid">
              <div v-for="(shape, si) in CAGED" :key="shape" class="caged-shape">
                <div class="caged-shape-letter">{{ shape }}</div>
                <div class="caged-shape-chord">{{ lang === 'it' ? `Forma di ${shape} aperto` : `Open ${shape} shape` }}</div>
                <div class="caged-shape-desc">{{ J.caged.items[si] }}</div>
              </div>
            </div>
            <div class="teoria-tip mt-3"><strong>{{ J.caged.tip[0] }}</strong> {{ J.caged.tip[1] }}</div>
            <RouterLink to="/percorso/caged" class="tl-practice">{{ t('cr.theory-link') }} →</RouterLink>
          </div>
        </Transition>
      </div>

      <!-- 6. Come Improvvisare -->
      <div class="teoria-card" :class="{ open: open[5] }">
        <button class="teoria-header" @click="toggle(5)"><span>{{ t('th.jazz6') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[5]">
            <p class="teoria-intro" v-html="J.improv.intro"></p>
            <ul class="tip-list">
              <li v-for="(tip, i) in J.improv.tips" :key="i">
                <span class="tip-num">{{ i+1 }}</span>
                <div class="tip-content" v-html="tip"></div>
              </li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 7. Note Guida -->
      <div class="teoria-card" :class="{ open: open[6] }">
        <button class="teoria-header" @click="toggle(6)"><span>{{ t('th.jazz7') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[6]">
            <p class="teoria-intro" v-html="J.guide.intro"></p>
            <ul class="tip-list">
              <li v-for="(tip, ti) in J.guide.tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> {{ tip[1] }}</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 8. Sostituzione del Tritono (below), then the lessons of jazzLessons.js -->
      <div class="teoria-card" :class="{ open: open[7] }">
        <button class="teoria-header" @click="toggle(7)"><span>{{ t('th.jazz8') }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[7]">
            <p class="teoria-intro" v-html="J.tritone.intro"></p>
            <div class="prog-example">| Dm7 | G7 | Cmaj7 |<br>→ | Dm7 | Db7 | Cmaj7 | ({{ J.tritone.label }})</div>
            <div class="teoria-tip mt-3"><strong>{{ J.tritone.tip[0] }}</strong> {{ J.tritone.tip[1] }}</div>
          </div>
        </Transition>
      </div>

      <!-- 9+. Lessons in Italian and English -->
      <div v-for="(lesson, li) in JAZZ_LESSONS" :key="lesson.titleKey" class="teoria-card" :class="{ open: open[8 + li] }">
        <button class="teoria-header" @click="toggle(8 + li)"><span>{{ t(lesson.titleKey) }}</span><span class="teoria-arrow">▸</span></button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[8 + li]">
            <template v-for="(b, bi) in lesson.blocks" :key="bi">
              <p v-if="b.type === 'p'" :class="bi === 0 ? 'teoria-intro' : 'tl-p'">{{ L(b) }}</p>
              <ul v-else-if="b.type === 'list'" class="tl-list">
                <li v-for="(item, ii) in L(b)" :key="ii"><strong>{{ item[0] }}</strong> {{ item[1] }}</li>
              </ul>
              <div v-else-if="b.type === 'example'" class="prog-example tl-example">
                <span>{{ b.chart }}</span>
                <button v-if="b.play" class="jd-toolbtn tl-play" @click="loadChart(b.chart)">▶ {{ t('tl.player') }}</button>
              </div>
              <div v-else-if="b.type === 'table'" class="vl-scroll">
                <table class="chord-table">
                  <thead><tr><th v-for="h in L(b.head)" :key="h">{{ h }}</th></tr></thead>
                  <tbody><tr v-for="(row, ri) in L(b.rows)" :key="ri"><td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td></tr></tbody>
                </table>
              </div>
              <div v-else-if="b.type === 'tip'" class="teoria-tip mt-3"><strong>{{ L(b.label) }}</strong> {{ L(b) }}</div>
              <RouterLink v-else-if="b.type === 'practice'" :to="b.to" class="tl-practice">{{ L(b) }} →</RouterLink>
            </template>
          </div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaybackStore } from '../stores/playback.js'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { INTERVAL_COLORS } from '../utils/theory.js'
import { PRESET_PROGRESSIONS } from '../utils/chordParser.js'
import { JAZZ_LESSONS } from '../utils/jazzLessons.js'
import { JAZZ_TEXT } from '../utils/theoryJazzText.js'

const router  = useRouter()
const pb      = usePlaybackStore()
const appStore = useAppStore()
const { t }   = useI18n()
const lang    = computed(() => appStore.lang)
const J       = computed(() => JAZZ_TEXT[lang.value] || JAZZ_TEXT.it)

const open = reactive(Array(8 + JAZZ_LESSONS.length).fill(false))
function toggle(i) { open[i] = !open[i] }

// Text of a lesson block in the current language (Italian if missing)
const L = x => x[lang.value] ?? x.it

function loadChart(text) {
  pb.importFromText(text)
  router.push('/player')
}

function loadProg(key) {
  const text = PRESET_PROGRESSIONS[key]
  if (!text) return
  pb.importFromText(text)
  router.push('/player')
}

const jazzScales = [
  { intervals:['1','2','3','4','5','6','7'] },
  { intervals:['1','2','b3','4','5','6','b7'] },
  { intervals:['1','2','3','4','5','6','b7'] },
  { intervals:['1','2','3','#4','5','6','7'] },
  { intervals:['1','b9','#9','3','#11','b13','b7'] },
  { intervals:['1','2','b3','4','5','6','7'] },
  { intervals:['1','2','b3','4','5','b6','b7'] },
  { intervals:['1','b3','4','5','b7'] },
  { intervals:['1','b3','4','b5','5','b7'] },
  { intervals:['1','2','b3','4','b5','#5','6','7'] },
  { intervals:['1','b9','#9','3','#11','5','13','b7'] },
  { intervals:['1','2','3','#4','5','6','b7'] },
]

const jazzChords = [
  { sym:'Cmaj7',    formula:'1–3–5–7' },
  { sym:'Dm7',      formula:'1–b3–5–b7' },
  { sym:'G7',       formula:'1–3–5–b7' },
  { sym:'Bm7b5',    formula:'1–b3–b5–b7' },
  { sym:'Bdim7',    formula:'1–b3–b5–bb7' },
  { sym:'CmMaj7',   formula:'1–b3–5–7' },
  { sym:'Cmaj7#11', formula:'1–3–5–7–#11' },
  { sym:'G7alt',    formula:'1–3–b7 + b9/#9/#11/b13' },
  { sym:'Cmaj9',    formula:'1–3–5–7–9' },
  { sym:'G13',      formula:'1–3–b7–9–13' },
]

const fundamentalProgs = [
  { key:'ii-V-I (C)',          chords:'| Dm7 | G7 | Cmaj7 |' },
  { key:'ii-V-i (Am)',         chords:'| Bm7b5 | E7alt | Am7 |' },
  { key:'12-Bar Blues (Bb)',   chords:'| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |' },
  { key:'Turnaround (C)',      chords:'| Cmaj7 | Am7 | Dm7 | G7 |' },
  { key:'Rhythm Changes (Bb)', chords:'| Bbmaj7 G7 | Cm7 F7 | Bbmaj7 G7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7 G7 | Cm7 F7 |' },
]

const CAGED = ['C', 'A', 'G', 'E', 'D']
</script>

<style scoped>
.jd-intro {
  font-family: var(--jd-mono);
  font-size: 0.85em;
  color: var(--jd-text-soft);
  margin-bottom: 24px;
  line-height: 1.6;
}

.teoria-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.interval-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 14px 0;
}

.progs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  margin: 14px 0;
  justify-content: center;
}

.vl-scroll {
  overflow-x: auto;
  margin: 14px 0;
  border-radius: 10px;
  border: 1px solid var(--jd-line);
}

/* Lessons from jazzLessons.js */
.tl-p { color: var(--jd-text-soft); font-size: 0.88em; line-height: 1.6; margin: 10px 0; }
.tl-list { margin: 10px 0; padding-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 0.88em; line-height: 1.55; color: #ccc; }
.tl-list strong { color: var(--jd-text); }
.tl-example { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; }
.tl-example span { white-space: pre-wrap; }
.tl-play { flex-shrink: 0; }
a.tl-practice { display: inline-block; margin-top: 14px; font-family: var(--jd-mono); font-size: 0.8em; letter-spacing: 0.5px; color: var(--jd-amber); text-decoration: none; }
a.tl-practice:hover { text-decoration: underline; }
</style>
