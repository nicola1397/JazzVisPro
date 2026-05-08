<template>
  <div id="view-teoria-generale" class="view-panel active">
    <div class="importer-area" style="max-width:860px;margin:0 auto;width:100%;">
      <h2 class="area-title">{{ t('tg.title') }}</h2>
      <p style="color:var(--secondary-text,#888);font-size:0.85em;margin-bottom:20px;line-height:1.5;">{{ t('tg.subtitle') }}</p>

      <div class="teoria-container">

        <!-- 1. Notazione -->
        <div class="teoria-card" :class="{ open: open[0] }">
          <button class="teoria-header" @click="toggle(0)">
            <span>{{ t('th.gen1') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[0]">
            <p class="teoria-intro">La musica usa un sistema grafico per rappresentare altezza e durata dei suoni. Il <strong>Pentagramma</strong> è il cuore di questo sistema.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Il Pentagramma:</strong> 5 linee e 4 spazi. Le note si scrivono sulle linee o negli spazi. Più alto = più acuto.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Tagli Addizionali:</strong> Piccole linee per note che superano i limiti del pentagramma (es. Do centrale).</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Le Alterazioni:</strong> <em>Diesis (#)</em> innalza di un semitono; <em>Bemolle (b)</em> abbassa di un semitono; <em>Bequadro</em> annulla l'effetto.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Armatura di chiave:</strong> Alterazioni costanti scritte all'inizio del rigo, valide per tutto il brano.</div></li>
            </ul>
          </div>
        </div>

        <!-- 2. Durate -->
        <div class="teoria-card" :class="{ open: open[1] }">
          <button class="teoria-header" @click="toggle(1)">
            <span>{{ t('th.gen2') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[1]">
            <p class="teoria-intro">Ogni nota ha una figura che ne indica la durata relativa. Il sistema è basato su divisioni binarie (metà, quarto, ottavo...).</p>
            <div class="scale-grid">
              <div class="scale-item"><div class="scale-item-name">Semibreve (4/4)</div><div class="scale-item-desc">Cerchio vuoto senza gambo. Dura 4 battiti in 4/4.</div></div>
              <div class="scale-item"><div class="scale-item-name">Minima (2/4)</div><div class="scale-item-desc">Cerchio vuoto con gambo. Dura 2 battiti.</div></div>
              <div class="scale-item"><div class="scale-item-name">Semiminima (1/4)</div><div class="scale-item-desc">Cerchio pieno con gambo. Dura 1 battito — è il battito del metronomo.</div></div>
              <div class="scale-item"><div class="scale-item-name">Croma (1/8)</div><div class="scale-item-desc">Cerchio pieno con coda. Dura mezzo battito.</div></div>
              <div class="scale-item"><div class="scale-item-name">Semicroma (1/16)</div><div class="scale-item-desc">Due code. Dura un quarto di battito.</div></div>
            </div>
            <div class="teoria-tip mt-3"><strong>Il Punto di Valore:</strong> Un punto dopo la nota aumenta la durata della metà (es. semiminima col punto = 1,5 battiti).</div>
          </div>
        </div>

        <!-- 3. Tempo -->
        <div class="teoria-card" :class="{ open: open[2] }">
          <button class="teoria-header" @click="toggle(2)">
            <span>{{ t('th.gen3') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[2]">
            <p class="teoria-intro">Il tempo organizza il flusso delle note in unità regolari chiamate <strong>Battute</strong>.</p>
            <ul class="tip-list">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Tempi Semplici:</strong> Suddivisione binaria. Es: 2/4, 3/4, 4/4.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Tempi Composti:</strong> Suddivisione ternaria. Es: 6/8, 9/8. In 6/8 ci sono 2 battiti, ognuno diviso in 3 ottavi.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Accenti:</strong> Forte (1° battito), Debole (altri battiti), Mezzo-Forte (3° in 4/4).</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Sincope:</strong> Spostamento dell'accento dal tempo forte al debole. È l'anima del jazz e del funk.</div></li>
            </ul>
          </div>
        </div>

        <!-- 4. Circolo delle Quinte -->
        <div class="teoria-card" :class="{ open: open[3] }">
          <button class="teoria-header" @click="toggle(3)">
            <span>{{ t('th.gen4') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[3]">
            <p class="teoria-intro">Il Circolo delle Quinte è la mappa delle tonalità, mostra quante alterazioni (# o b) ha ogni tonalità.</p>
            <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:12px 0;">
              <div v-for="item in circleFifths" :key="item.note"
                style="background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);border-radius:8px;padding:6px 10px;text-align:center;min-width:52px;">
                <div style="font-weight:700;color:var(--text-h);">{{ item.note }}</div>
                <div style="font-size:0.7em;color:#888;">{{ item.acc }}</div>
              </div>
            </div>
            <div class="teoria-tip"><strong>Uso Pratico:</strong> Tonalità vicine nel circolo condividono quasi tutte le note — perfette per modulazioni. Tonalità opposte (es. C e Gb) sono le più lontane armonicamente.</div>
          </div>
        </div>

        <!-- 5. Costruzione Accordi -->
        <div class="teoria-card" :class="{ open: open[4] }">
          <button class="teoria-header" @click="toggle(4)">
            <span>{{ t('th.gen5') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[4]">
            <p class="teoria-intro">L'armonia nasce sovrapponendo suoni. L'accordo base è la <strong>Triade</strong>: Tonica, Terza e Quinta.</p>
            <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:12px 0;">
              <div v-for="triad in triads" :key="triad.name"
                style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;text-align:center;min-width:110px;">
                <div style="font-weight:700;color:var(--text-h);margin-bottom:6px;">{{ triad.name }}</div>
                <div style="display:flex;gap:4px;justify-content:center;">
                  <span v-for="n in triad.notes" :key="n" style="background:rgba(255,214,10,0.15);border:1px solid rgba(255,214,10,0.3);border-radius:4px;padding:2px 6px;font-size:0.8em;color:var(--accent);">{{ n }}</span>
                </div>
                <div style="font-size:0.7em;color:#888;margin-top:6px;">{{ triad.desc }}</div>
              </div>
            </div>
            <ul class="tip-list mt-3">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>V grado (Dominante):</strong> massima tensione — vuole risolvere sulla Tonica (I grado).</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>IV grado (Sottodominante):</strong> colore e preparazione, meno instabile del V.</div></li>
            </ul>
          </div>
        </div>

        <!-- 6. Accordi Diatonici -->
        <div class="teoria-card" :class="{ open: open[5] }">
          <button class="teoria-header" @click="toggle(5)">
            <span>{{ t('th.gen6') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[5]">
            <p class="teoria-intro">Costruendo un accordo di settima su ogni nota della scala maggiore si ottengono gli <strong>Accordi Diatonici</strong> — gli accordi "nativi" di una tonalità.</p>
            <table class="chord-table">
              <thead><tr><th>Grado</th><th>In Do Mag.</th><th>Tipo</th><th>Ruolo</th></tr></thead>
              <tbody>
                <tr v-for="row in diatonicTable" :key="row.degree">
                  <td><span class="chord-symbol">{{ row.degree }}</span></td>
                  <td><span class="chord-symbol">{{ row.chord }}</span></td>
                  <td><span class="chord-formula">{{ row.formula }}</span></td>
                  <td>{{ row.role }}</td>
                </tr>
              </tbody>
            </table>
            <div class="teoria-tip mt-3"><strong>Regola d'oro:</strong> In Do Maggiore qualsiasi accordo di questa tabella suona bene con gli altri. La progressione <em>ii–V–I</em> (Dm7–G7–Cmaj7) è la formula del jazz.</div>
          </div>
        </div>

        <!-- 7. Rivolti -->
        <div class="teoria-card" :class="{ open: open[6] }">
          <button class="teoria-header" @click="toggle(6)">
            <span>{{ t('th.gen7') }}</span><span class="teoria-arrow">▸</span>
          </button>
          <div class="teoria-body" v-show="open[6]">
            <p class="teoria-intro">Un accordo è in <strong>posizione fondamentale</strong> quando la Tonica è al basso. Mettendo un'altra nota al basso si ottiene un <strong>Rivolto</strong>.</p>
            <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:12px 0;">
              <div v-for="inv in inversions" :key="inv.name"
                style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;text-align:center;min-width:110px;">
                <div style="font-weight:700;color:var(--text-h);margin-bottom:6px;">{{ inv.name }}</div>
                <div style="font-size:0.75em;color:#aaa;margin-bottom:4px;">Basso: {{ inv.bass }}</div>
                <div style="font-size:0.75em;color:#888;">{{ inv.example }}</div>
              </div>
            </div>
            <ul class="tip-list mt-3">
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Perché usarli:</strong> Creano linee di basso più fluide e melodiche invece di salti.</div></li>
              <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Notazione:</strong> accordo/basso. Es: <em>G7/B</em> = Sol settima con Si al basso.</div></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const open = reactive(Array(7).fill(false))
function toggle(i) { open[i] = !open[i] }

const circleFifths = [
  {note:'C', acc:'0 #/b'}, {note:'G', acc:'1 #'}, {note:'D', acc:'2 #'}, {note:'A', acc:'3 #'},
  {note:'E', acc:'4 #'}, {note:'B', acc:'5 #'}, {note:'Gb', acc:'6 b'}, {note:'Db', acc:'5 b'},
  {note:'Ab', acc:'4 b'}, {note:'Eb', acc:'3 b'}, {note:'Bb', acc:'2 b'}, {note:'F', acc:'1 b'},
]

const triads = [
  { name:'Maggiore',  notes:['1','3','5'],    desc:'Luminosa e stabile' },
  { name:'Minore',    notes:['1','b3','5'],   desc:'Malinconica e scura' },
  { name:'Diminuita', notes:['1','b3','b5'],  desc:'Molto tesa e instabile' },
  { name:'Aumentata', notes:['1','3','#5'],   desc:'Sospesa ed esotica' },
]

const diatonicTable = [
  { degree:'I',    chord:'Cmaj7',  formula:'1–3–5–7',       role:'Riposo, stabilità' },
  { degree:'ii',   chord:'Dm7',    formula:'1–b3–5–b7',     role:'Tensione lieve, prepara V' },
  { degree:'iii',  chord:'Em7',    formula:'1–b3–5–b7',     role:'Sostituto di I o V' },
  { degree:'IV',   chord:'Fmaj7',  formula:'1–3–5–7',       role:'Colore, movimento' },
  { degree:'V',    chord:'G7',     formula:'1–3–5–b7',      role:'Massima tensione' },
  { degree:'vi',   chord:'Am7',    formula:'1–b3–5–b7',     role:'Tonica relativa minore' },
  { degree:'vii°', chord:'Bm7b5', formula:'1–b3–b5–b7',    role:'Tensione estrema, come V' },
]

const inversions = [
  { name:'Fondamentale', bass:'Tonica',   example:'C/C' },
  { name:'1° Rivolto',   bass:'Terza',    example:'C/E' },
  { name:'2° Rivolto',   bass:'Quinta',   example:'C/G' },
  { name:'3° Rivolto',   bass:'Settima',  example:'Cmaj7/B' },
]
</script>
