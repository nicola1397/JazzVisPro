<template>
  <div id="view-teoria" class="view-panel active">
    <div class="importer-area" style="max-width:860px;margin:0 auto;width:100%;">
      <h2 class="area-title">{{ t('tj.title') }}</h2>
      <p style="color:var(--secondary-text,#888);font-size:0.85em;margin-bottom:20px;line-height:1.5;">{{ t('tj.subtitle') }}</p>

      <div class="teoria-container">

        <!-- 1. I 12 Intervalli -->
        <div class="teoria-card" :class="{ open: open[0] }">
          <button class="teoria-header" @click="toggle(0)"><span>{{ t('th.jazz1') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[0]">
            <p class="teoria-intro">Gli intervalli sono la distanza in semitoni tra due note. Imparare a riconoscerli ad orecchio è la chiave dell'improvvisazione.</p>
            <div class="interval-grid">
              <div v-for="(iv, key) in INTERVAL_COLORS" :key="key" class="interval-row">
                <div class="interval-swatch" :style="{ background: iv.color, color: [3,7].includes(+key) ? '#000' : '#fff' }">{{ iv.short }}</div>
                <span class="interval-name">{{ iv.label }} ({{ key }} st)</span>
                <span class="interval-desc">{{ intervalDescs[+key] }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Le Scale Jazz -->
        <div class="teoria-card" :class="{ open: open[1] }">
          <button class="teoria-header" @click="toggle(1)"><span>{{ t('th.jazz2') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[1]">
            <p class="teoria-intro">Ogni accordo ha una o più scale associate. Imparare quale scala usare è il segreto dell'improvvisazione jazz.</p>
            <div class="scale-grid">
              <div v-for="s in jazzScales" :key="s.name" class="scale-item">
                <div class="scale-item-name">{{ s.name }}</div>
                <div class="scale-item-chord">Su: {{ s.on }}</div>
                <div class="scale-item-desc">{{ s.desc }}</div>
                <div class="scale-intervals">
                  <span v-for="i in s.intervals" :key="i" class="scale-int-badge">{{ i }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Gli Accordi Jazz -->
        <div class="teoria-card" :class="{ open: open[2] }">
          <button class="teoria-header" @click="toggle(2)"><span>{{ t('th.jazz3') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[2]">
            <p class="teoria-intro">Nel jazz si usano quasi sempre accordi di settima o estesi. La triade semplice è rara.</p>
            <table class="chord-table">
              <thead><tr><th>Simbolo</th><th>Nome</th><th>Formula</th><th>Scale</th><th>Carattere</th></tr></thead>
              <tbody>
                <tr v-for="c in jazzChords" :key="c.sym">
                  <td><span class="chord-symbol">{{ c.sym }}</span></td>
                  <td>{{ c.name }}</td>
                  <td><span class="chord-formula">{{ c.formula }}</span></td>
                  <td>{{ c.scales }}</td>
                  <td>{{ c.char }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Progressioni Fondamentali -->
        <div class="teoria-card" :class="{ open: open[3] }">
          <button class="teoria-header" @click="toggle(3)"><span>{{ t('th.jazz4') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[3]">
            <p class="teoria-intro">Queste progressioni sono il DNA del jazz. Impararle in tutte le tonalità è il primo passo.</p>
            <div v-for="prog in fundamentalProgs" :key="prog.name" class="prog-teoria-item">
              <div class="prog-teoria-name">{{ prog.name }} <span class="prog-teoria-tag">{{ prog.tag }}</span></div>
              <div class="prog-example">{{ prog.chords }}</div>
              <div class="prog-teoria-desc">{{ prog.desc }}</div>
              <button class="load-prog-btn" @click="loadProg(prog.key)">
                {{ lang === 'it' ? 'Carica nel Player' : 'Load in Player' }}
              </button>
            </div>
          </div>
        </div>

        <!-- 5. CAGED -->
        <div class="teoria-card" :class="{ open: open[4] }">
          <button class="teoria-header" @click="toggle(4)"><span>{{ t('th.jazz5') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[4]">
            <p class="teoria-intro">CAGED divide il manico in 5 zone, ognuna basata su una forma di accordo aperto. Usa il selettore CAGED nella sidebar per visualizzarle!</p>
            <div class="caged-grid">
              <div v-for="shape in cagedShapes" :key="shape.letter" class="caged-shape">
                <div class="caged-shape-letter">{{ shape.letter }}</div>
                <div class="caged-shape-chord">{{ shape.chord }}</div>
                <div class="caged-shape-desc">{{ shape.desc }}</div>
              </div>
            </div>
            <div class="teoria-tip" style="margin-top:15px;"><strong>Come usarlo:</strong> Se devi suonare Cmaj7 all'8° tasto, usa la forma E shape (barre). Le 5 forme si collegano fluendo lungo il manico.</div>
          </div>
        </div>

        <!-- 6. Come Improvvisare -->
        <div class="teoria-card" :class="{ open: open[5] }">
          <button class="teoria-header" @click="toggle(5)"><span>{{ t('th.jazz6') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[5]">
            <p class="teoria-intro">L'improvvisazione jazz si impara gradualmente. Ecco un percorso pratico.</p>
            <ul class="tip-list">
              <li v-for="(tip, i) in improvTips" :key="i"><span class="tip-num">{{ i+1 }}</span><span v-html="tip"></span></li>
            </ul>
          </div>
        </div>

        <!-- 7. Note Guida -->
        <div class="teoria-card" :class="{ open: open[6] }">
          <button class="teoria-header" @click="toggle(6)"><span>{{ t('th.jazz7') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[6]">
            <p class="teoria-intro">Le <strong>Guide Tones</strong> (note guida) sono la 3ª e la 7ª di un accordo. Queste due note definiscono il suono armonico e guidano il movimento da un accordo all'altro.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>3ª:</strong> Definisce se l'accordo è maggiore o minore. È la nota più caratteristica.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>7ª:</strong> Aggiunge il colore jazz. Distingue un accordo di settima dal semplice triade.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Movimento contrario:</strong> Nel ii-V-I la 3ª di Dm7 (F) diventa la 7ª di G7, e la 7ª di G7 (F) risolve alla 3ª di Cmaj7 (E). Questo è il voice leading jazzistico.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Pratica:</strong> Impara a suonare linee usando solo le note guida sui cambi di accordo. È il fondamento dell'improvvisazione bebop.</div></li>
            </ul>
          </div>
        </div>

        <!-- 8. Sostituzione del Tritono -->
        <div class="teoria-card" :class="{ open: open[7] }">
          <button class="teoria-header" @click="toggle(7)"><span>{{ t('th.jazz8') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[7]">
            <p class="teoria-intro">La <strong>sostituzione del tritono</strong> è una delle tecniche di rearmonia più usate nel jazz. Un accordo dominante può essere sostituito dal dominante a distanza di tritono.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Esempio:</strong> G7 → Db7 (6 semitoni di distanza = tritono). Entrambi risolvono su Cmaj7.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Perché funziona:</strong> G7 ha note guida B e F. Db7 ha note guida F e Cb (enarmonia di B). Le note guida sono le stesse, invertite!</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Uso:</strong> Crea movimento cromatico nel basso (G → Db → C) invece del salto di quinta. Più fluido e moderno.</div></li>
            </ul>
            <div class="prog-example">| Dm7 | G7 | Cmaj7 |
→ | Dm7 | Db7 | Cmaj7 | (tritone sub)</div>
          </div>
        </div>

        <!-- 9. Cromatismo -->
        <div class="teoria-card" :class="{ open: open[8] }">
          <button class="teoria-header" @click="toggle(8)"><span>{{ t('th.jazz9') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[8]">
            <p class="teoria-intro">Il <strong>cromatismo</strong> è l'uso di note fuori dalla scala per creare tensione, colore e movimento melodico.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Note di approccio diatoniche:</strong> Una nota diatonica vicina che si muove per semitono verso la nota bersaglio.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Note di approccio cromatiche:</strong> Note a un semitono sopra o sotto la nota bersaglio, fuori dalla scala.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Doppio approccio:</strong> Due note di approccio (una sopra, una sotto) prima della nota bersaglio. Tipico del bebop.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Regola d'oro:</strong> Le note cromatiche sono di passaggio — stai sul debole del tempo, atterrare sul forte con una nota della scala.</div></li>
            </ul>
          </div>
        </div>

        <!-- 10. Scale Bebop -->
        <div class="teoria-card" :class="{ open: open[9] }">
          <button class="teoria-header" @click="toggle(9)"><span>{{ t('th.jazz10') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[9]">
            <p class="teoria-intro">Le <strong>scale bebop</strong> aggiungono una nota cromatica alle scale modali, creando scale di 8 note che permettono di atterrare sulle note dell'accordo sui tempi forti.</p>
            <div class="scale-grid">
              <div class="scale-item"><div class="scale-item-name">Bebop Dominante</div><div class="scale-item-chord">Su: G7, dominanti</div><div class="scale-item-desc">Misolidio + 7a maggiore: 1-2-3-4-5-6-b7-7. La 7a maggiore è la nota cromatica aggiunta.</div></div>
              <div class="scale-item"><div class="scale-item-name">Bebop Maggiore</div><div class="scale-item-chord">Su: Cmaj7, Fmaj7</div><div class="scale-item-desc">Ionio + #5: 1-2-3-4-5-#5-6-7. Aggiunge un passaggio cromatico tra 5 e 6.</div></div>
              <div class="scale-item"><div class="scale-item-name">Bebop Dorico</div><div class="scale-item-chord">Su: Dm7, accordi min7</div><div class="scale-item-desc">Dorico + 3a maggiore: 1-2-b3-3-4-5-6-b7. Nota cromatica tra b3 e 4.</div></div>
            </div>
            <div class="teoria-tip mt-3"><strong>Il trucco:</strong> Con 8 note in una scala, suonando crome in modo continuo, le note dell'accordo cadono sempre sui tempi forti. È la grammatica ritmica del bebop.</div>
          </div>
        </div>

        <!-- 11. Modal Interchange -->
        <div class="teoria-card" :class="{ open: open[10] }">
          <button class="teoria-header" @click="toggle(10)"><span>{{ t('th.jazz11') }}</span><span class="teoria-arrow">▸</span></button>
          <div class="teoria-body" v-show="open[10]">
            <p class="teoria-intro">Il <strong>modal interchange</strong> (o "prestito modale") consiste nell'usare accordi presi dal minore parallelo (o da altri modi) in un brano maggiore, e viceversa.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Esempio comune:</strong> In Do Maggiore, usare Fm7 o Abmaj7 (dal Do minore). Crea un contrasto emotivo immediato.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>bVII7:</strong> In Do, Bb7 (dal Do misolidio/minore). "Backdoor dominant" — risolve su I senza il tritono tradizionale.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>bVI maj7:</strong> In Do, Abmaj7 (dal Do minore). Colore malinconico, molto usato nel jazz moderno e nel pop.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>IV minore:</strong> In Do, Fm7 → Cmaj7. Il IV minore crea tensione che risolve dolcemente sulla tonica.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Per improvvisare:</strong> Quando appare un accordo preso in prestito, usa la scala del modo da cui proviene (es. su Abmaj7, usa Lidio).</div></li>
            </ul>
          </div>
        </div>

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

const router  = useRouter()
const pb      = usePlaybackStore()
const appStore = useAppStore()
const { t }   = useI18n()
const lang    = computed(() => appStore.lang)

const open = reactive(Array(11).fill(false))
function toggle(i) { open[i] = !open[i] }

function loadProg(key) {
  const text = PRESET_PROGRESSIONS[key]
  if (!text) return
  pb.importFromText(text)
  router.push('/player')
}

const intervalDescs = {
  0:  'La tonica — il centro gravitazionale di tutto.',
  1:  'Tensione acuta. Nelle scale alterate e frigie.',
  2:  'Colore brillante. Estensione jazz per eccellenza.',
  3:  'Terza minore. Carattere blues e minore.',
  4:  'Terza maggiore. Carattere luminoso. Nota guida chiave.',
  5:  'Stabile e neutro. Attenzione: può creare clash su Maj7.',
  6:  'Massima tensione. Il tritono è l\'intervallo più dissonante.',
  7:  'Stabile e vuota. Spesso omessa negli accordi jazz avanzati.',
  8:  'Instabilità e colore esotico. In scale aumentate e alterate.',
  9:  'Dolcezza jazzistica. Aggiunge calore ai dominanti.',
  10: 'Settima dominante. Crea tensione verso la risoluzione.',
  11: 'Settima maggiore. Carattere lirico e sospeso.',
}

const jazzScales = [
  { name:'Ionio (Maj7)',        on:'Cmaj7, Fmaj7',         desc:'La scala maggiore classica. Luminosa e stabile.',                         intervals:['1','2','3','4','5','6','7'] },
  { name:'Dorico (m7)',         on:'Dm7, Am7',             desc:'Il minore jazz per eccellenza. Ha la 6a maggiore.',                        intervals:['1','2','b3','4','5','6','b7'] },
  { name:'Misolidio (7)',       on:'G7, C7, dom.',         desc:'Come la maggiore ma con b7. Blues e rock.',                               intervals:['1','2','3','4','5','6','b7'] },
  { name:'Lidio (Maj7#11)',     on:'Fmaj7, Maj7#11',       desc:'Maggiore con #11. Suono fluttuante e onirico.',                          intervals:['1','2','3','#4','5','6','7'] },
  { name:'Altered (7alt)',      on:'G7alt, dom. alt.',     desc:'7° modo della minore melodica. Tutte le tensioni alterate.',             intervals:['1','b2','b3','b4','b5','b6','b7'] },
  { name:'Minore Melodica',     on:'mMaj7, passaggi',      desc:'Minore con 6a e 7a maggiori. Base del jazz moderno.',                    intervals:['1','2','b3','4','5','6','7'] },
  { name:'Minore Naturale',     on:'Am, Em, min.',         desc:'Il minore classico. Scuro e melodico.',                                  intervals:['1','2','b3','4','5','b6','b7'] },
  { name:'Pentatonica Minore',  on:'quasi tutto',          desc:'5 note. Il punto di partenza per blues e rock.',                         intervals:['1','b3','4','5','b7'] },
  { name:'Blues',               on:'12-bar, rock',         desc:'Pentatonica minore + b5 (blue note).',                                  intervals:['1','b3','4','b5','5','b7'] },
  { name:'Diminuita (T/S)',     on:'dim7, dom7b9',         desc:'Simmetrica 8 note (tono-semitono). Oscura e misteriosa.',                intervals:['1','2','b3','4','b5','#5','6','7'] },
  { name:'Lidio Dominante',     on:'G7#11, Lydian dom.',   desc:'4° modo min. melodica. Dom. con #11. Brillante.',                       intervals:['1','2','3','#4','5','6','b7'] },
]

const jazzChords = [
  { sym:'Cmaj7',    name:'Maggiore settima',  formula:'1–3–5–7',       scales:'Ionio, Lidio',           char:'Stabile, luminoso' },
  { sym:'Dm7',      name:'Minore settima',    formula:'1–b3–5–b7',     scales:'Dorico, Frigio, Eoliano', char:'Jazz minore, caldo' },
  { sym:'G7',       name:'Settima dom.',      formula:'1–3–5–b7',      scales:'Misolidio, Alterata',    char:'Tensione, vuole risolvere' },
  { sym:'Bm7b5',    name:'Half-dim (ø)',      formula:'1–b3–b5–b7',    scales:'Locrio, Dorico b5',      char:'Oscuro, tensione minore' },
  { sym:'Bdim7',    name:'Diminuito settima', formula:'1–b3–b5–bb7',   scales:'Diminuita (T/S)',        char:'Molto teso, simmetrico' },
  { sym:'CmMaj7',   name:'Minore Maj7',       formula:'1–b3–5–7',      scales:'Minore Melodica',        char:'Misterioso, cinematico' },
  { sym:'Cmaj7#11', name:'Lydian Maj7',       formula:'1–3–5–7–#11',   scales:'Lidio',                  char:'Fluttuante, onirico' },
  { sym:'G7alt',    name:'Alterato',          formula:'1–3–b7 + alt.', scales:'Alterata (7alt)',        char:'Massima tensione jazz' },
  { sym:'Cmaj9',    name:'Nona maggiore',     formula:'1–3–5–7–9',     scales:'Ionio, Lidio',           char:'Aperto, moderno' },
  { sym:'G13',      name:'Tredicesima',       formula:'1–3–b7–9–13',   scales:'Misolidio',              char:'Ricco, jazz swing' },
]

const fundamentalProgs = [
  { name:'ii–V–I Maggiore', tag:'Essenziale', key:'ii-V-I (C)',
    chords:'| Dm7 | G7 | Cmaj7 |',
    desc:'La progressione più comune nel jazz. Dm7→G7→Cmaj7. Impararla in tutte le 12 tonalità.' },
  { name:'ii–V–i Minore',   tag:'Essenziale', key:'ii-V-i (Am)',
    chords:'| Bm7b5 | E7alt | Am7 |',
    desc:'Versione minore del ii-V-I. Tensione più densa. Tipica di "Autumn Leaves".' },
  { name:'12-Bar Blues (Bb)', tag:'Blues', key:'12-Bar Blues (Bb)',
    chords:'| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |',
    desc:'La forma blues classica. 12 misure, tutti dominanti. Usa scala blues o misolidia.' },
  { name:'Turnaround in C',   tag:'Swing', key:'Turnaround (C)',
    chords:'| Cmaj7 | Am7 | Dm7 | G7 |',
    desc:'I–vi–ii–V. Giro jazz per eccellenza, base di centinaia di standard.' },
  { name:'Rhythm Changes (Bb)', tag:'Bebop', key:'Rhythm Changes (Bb)',
    chords:'| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | …',
    desc:'Basata su "I Got Rhythm" di Gershwin. Una delle forme più suonate nel bebop.' },
]

const cagedShapes = [
  { letter:'C', chord:'Open C chord', desc:'Radice su corda 5 (A). Facile da barre. Es: D al 2° tasto.' },
  { letter:'A', chord:'Open A chord', desc:'Radice su corda 5 (A). Barre compatta. Es: B al 2° tasto.' },
  { letter:'G', chord:'Open G chord', desc:'Radice su corda 6 (E). Forma aperta. Es: A al 2° tasto.' },
  { letter:'E', chord:'Open E chord', desc:'Radice su corda 6 (E). Barre classica. Es: F al 1° tasto.' },
  { letter:'D', chord:'Open D chord', desc:'Radice su corda 4 (D). Forma alta. Es: E al 2° tasto.' },
]

const improvTips = [
  'Inizia con la <strong>pentatonica minore</strong>. 5 note semplici, sempre efficaci su backing track blues.',
  'Aggiungi la <strong>blue note (b5)</strong> per la scala blues. Un suono che trasforma completamente il feeling.',
  'Impara il <strong>ii-V-I in C</strong> a memoria. Suonaci sopra ogni giorno, poi trasportalo in tutte le tonalità.',
  'Studia le <strong>note guida</strong>: la 3ª e la 7ª degli accordi. Definiscono il suono di ogni accordo jazz.',
  'Passa a <strong>Dorico e Misolidio</strong>. Dorico sul ii (Dm7), Misolidio sul V (G7). Senti la differenza.',
  'Ascolta tanto jazz: <em>Kind of Blue</em> (Miles Davis), <em>Waltz for Debby</em> (Bill Evans), <em>A Love Supreme</em> (Coltrane).',
  '<strong>Trascrivi lick</strong> dai tuoi musicisti preferiti. Anche solo 2-3 misure, poi suonali in varie tonalità.',
  'Usa il <strong>Player</strong> per creare backing track con ii-V-I e improvvisa sopra col fretboard.',
  'Studia la <strong>scala alterata</strong> sul dominante (G7alt → Alterata). È il suono del jazz moderno.',
  'Ricorda: improvvisare non è suonare note a caso. È <strong>raccontare una storia</strong> — tensione e risoluzione.',
]
</script>
