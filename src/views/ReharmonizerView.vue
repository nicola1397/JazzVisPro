<template>
  <div id="view-reharmonizer" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('rh.title') }}</h1>
      </div>
    </header>

    <section class="jd-console">
      <div class="jd-grain" aria-hidden="true"></div>
      <div class="jd-section-label">
        <span>{{ t('rh.subtitle') }}</span>
        <div class="jd-section-rule"></div>
      </div>

      <div style="display:flex;gap:12px;margin-bottom:0;flex-wrap:wrap;position:relative;z-index:1;">
        <input
          v-model="inputText"
          type="text"
          :placeholder="t('rh.placeholder')"
          style="flex:1;min-width:200px;"
          @keydown.enter="analyze"
        >
        <button class="btn-add-step" @click="analyze">{{ t('rh.analyze') }}</button>
      </div>
    </section>

    <div v-if="results.length === 0 && analyzed" style="color:var(--jd-muted);text-align:center;padding:40px;font-family:var(--jd-mono);font-size:0.9em;">
      {{ t('rh.no-results') }}
    </div>

    <div v-for="item in results" :key="item.original" class="rh-card" style="padding:18px 20px;margin-bottom:12px;">
      <div class="rh-original" style="font-size:1.4em;margin-bottom:14px;">
        {{ item.original }}
      </div>
      <div class="rh-subs">
        <div
          v-for="sub in item.subs"
          :key="sub.chord + sub.label"
          class="rh-sub-badge"
          style="padding:10px 14px;min-width:110px;"
        >
          <div style="font-weight:700;color:var(--jd-amber);font-size:1.1em;">{{ sub.chord }}</div>
          <small>{{ sub.label }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useI18n } from '../composables/useI18n.js'
import { NOTES } from '../utils/theory.js'
import { parseChord } from '../utils/chordParser.js'

const appStore = useAppStore()
const { t } = useI18n()

const inputText = ref('')
const results   = ref([])
const analyzed  = ref(false)

function quality(rest) {
  if (!rest) return 'maj'
  if (rest.includes('m7b5') || rest.includes('ø'))         return 'm7b5'
  if (rest.includes('dim7') || rest.includes('°7'))         return 'dim7'
  if (rest.includes('dim')  || rest.includes('°'))          return 'dim'
  if (rest.includes('mMaj') || rest.includes('mM'))         return 'mMaj7'
  if (rest.includes('maj7') || rest.includes('Maj7') || rest.includes('Δ')) return 'maj7'
  if (rest.includes('alt'))                                 return '7alt'
  if (rest.match(/m(?!aj)/i) || rest.includes('min'))
    return rest.includes('7') ? 'm7' : 'm'
  if (rest.includes('7')) return '7'
  return 'maj7'
}

function getSubs(rootName, qual) {
  const ri = NOTES.indexOf(rootName)
  if (ri === -1) return []
  const note = (o) => NOTES[(ri + o + 12) % 12]
  const subs = []
  if (qual === '7' || qual === '7alt') {
    subs.push({ chord:`${note(6)}7`,     label: t('rh.tritone-sub') })
    subs.push({ chord:`${rootName}7alt`, label: t('rh.altered')     })
    subs.push({ chord:`${note(2)}m7`,    label: t('rh.ii-of-v')     })
  } else if (qual === 'maj7' || qual === 'maj') {
    subs.push({ chord:`${note(4)}m7`,    label: t('rh.diatonic-3')  })
    subs.push({ chord:`${note(9)}m7`,    label: t('rh.diatonic-6')  })
    subs.push({ chord:`${note(10)}maj7`, label: t('rh.modal-bvii')  })
    subs.push({ chord:`${note(8)}maj7`,  label: t('rh.modal-bvi')   })
  } else if (qual === 'm7' || qual === 'm') {
    subs.push({ chord:`${note(3)}maj7`,  label: t('rh.relative-maj') })
    subs.push({ chord:`${note(10)}7`,    label: t('rh.backdoor')     })
    subs.push({ chord:`${note(5)}maj7`,  label: t('rh.iv-maj')       })
  } else if (qual === 'm7b5') {
    subs.push({ chord:`${note(3)}dim7`,  label: t('rh.dim-sub') })
    subs.push({ chord:`${note(5)}7b9`,   label: t('rh.dom-b9')  })
  } else if (qual === 'dim7' || qual === 'dim') {
    subs.push({ chord:`${note(3)}7b9`,   label: t('rh.dim-as-dom') })
    subs.push({ chord:`${note(6)}7b9`,   label: t('rh.dim-as-dom') })
  }
  subs.push({ chord:`${note(7)}7`, label: t('rh.sec-dom') })
  return subs
}

function analyze() {
  analyzed.value = true
  results.value = []
  const tokens = inputText.value.split(/[\s|,]+/).filter(c => c && c !== '|' && c !== '%')
  tokens.forEach(chordStr => {
    const p = parseChord(chordStr)
    if (!p) return
    const qual = quality(p.rest)
    const subs = getSubs(p.root, qual)
    results.value.push({ original: chordStr, subs })
  })
}
</script>
