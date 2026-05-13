<template>
  <div id="view-teoria-generale" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('tg.title') }}</h1>
      </div>
    </header>

    <p class="jd-intro">{{ t('tg.subtitle') }}</p>

    <div class="teoria-container">

      <!-- 1. Notazione -->
      <div class="teoria-card" :class="{ open: open[0] }">
        <button class="teoria-header" @click="toggle(0)">
          <span>{{ t('th.gen1') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[0]">
            <p class="teoria-intro">La musica usa un sistema grafico per rappresentare altezza e durata dei suoni. Il <strong>Pentagramma</strong> è il cuore di questo sistema.</p>
            
            <div class="staff-visual">
              <svg viewBox="0 0 420 120" xmlns="http://www.w3.org/2000/svg">
                <!-- Staff Lines -->
                <g stroke="var(--jd-line-strong)" stroke-width="1">
                  <line x1="10" y1="26" x2="410" y2="26" />
                  <line x1="10" y1="38" x2="410" y2="38" />
                  <line x1="10" y1="50" x2="410" y2="50" />
                  <line x1="10" y1="62" x2="410" y2="62" />
                  <line x1="10" y1="74" x2="410" y2="74" />
                </g>

                <!-- G Clef -->
                <g transform="translate(15, 84) scale(0.045, -0.045)" fill="var(--jd-amber)">
                  <path :d="MUSIC_GLYPHS.gClef" />
                </g>

                <!-- Notes on lines and spaces -->
                <g v-for="(note, i) in notationNotes" :key="i">
                  <g :transform="`translate(${60 + i * 38}, ${note.y})`" fill="var(--jd-amber)">
                    <path :d="MUSIC_GLYPHS.semibreve" transform="translate(-10, 5) scale(0.04, -0.04)" />
                  </g>
                  <!-- Helper line for Middle Do if needed -->
                  <line v-if="note.name === 'Do' && note.y > 74" 
                        :x1="50 + i * 38" :y1="note.y" :x2="70 + i * 38" :y2="note.y" 
                        stroke="var(--jd-text)" stroke-width="1" />
                  
                  <text :x="60 + i * 38" :y="108" fill="var(--jd-muted)" font-size="10" font-family="var(--jd-mono)" text-anchor="middle">
                    {{ note.label }}
                  </text>
                </g>
              </svg>
            </div>

            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Il Pentagramma:</strong> 5 linee e 4 spazi. Le note si scrivono sulle linee o negli spazi. Più alto = più acuto.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Nomi delle Linee:</strong> Mi, Sol, Si, Re, Fa (dal basso all'alto).</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Nomi degli Spazi:</strong> Fa, La, Do, Mi (dal basso all'alto).</div></li>
              <li><span class="tip-num">04</span><div class="tip-content"><strong>Le Alterazioni:</strong> <em>Diesis (#)</em> innalza di un semitono; <em>Bemolle (b)</em> abbassa di un semitono.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 2. Durate -->
      <div class="teoria-card" :class="{ open: open[1] }">
        <button class="teoria-header" @click="toggle(1)">
          <span>{{ t('th.gen2') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[1]">
            <p class="teoria-intro">Ogni nota ha una figura che ne indica la durata relativa. Il sistema è basato su divisioni binarie (metà, quarto, ottavo...).</p>
            <div class="scale-grid">
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(10,32) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.breve"/></g></svg>
                </div>
                <div class="scale-item-name">Breve (8/4)</div>
                <div class="scale-item-desc">Rettangolo vuoto. Dura 8 battiti.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(5,20) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.semibreve"/></g></svg>
                </div>
                <div class="scale-item-name">Semibreve (4/4)</div>
                <div class="scale-item-desc">Cerchio vuoto senza gambo. Dura 4 battiti.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(15,35) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.minima"/></g></svg>
                </div>
                <div class="scale-item-name">Minima (2/4)</div>
                <div class="scale-item-desc">Cerchio vuoto con gambo. Dura 2 battiti.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(15,35) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.semiminima"/></g></svg>
                </div>
                <div class="scale-item-name">Semiminima (1/4)</div>
                <div class="scale-item-desc">Cerchio pieno con gambo. Dura 1 battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(10,35) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.croma"/></g></svg>
                </div>
                <div class="scale-item-name">Croma (1/8)</div>
                <div class="scale-item-desc">Un flag. Dura mezzo battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 40"><g transform="translate(10,35) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.semicroma"/></g></svg>
                </div>
                <div class="scale-item-name">Semicroma (1/16)</div>
                <div class="scale-item-desc">Due flag. Dura un quarto di battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 60"><g transform="translate(10,55) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.biscroma"/></g></svg>
                </div>
                <div class="scale-item-name">Biscroma (1/32)</div>
                <div class="scale-item-desc">Tre flag. Dura un ottavo di battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 60"><g transform="translate(10,55) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.semibiscroma"/></g></svg>
                </div>
                <div class="scale-item-name">Semibiscroma (1/64)</div>
                <div class="scale-item-desc">Quattro flag. Dura un sedicesimo di battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 60"><g transform="translate(10,55) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.fusa"/></g></svg>
                </div>
                <div class="scale-item-name">Fusa (1/128)</div>
                <div class="scale-item-desc">Cinque flag. Dura un trentaduesimo di battito.</div>
              </div>
              <div class="scale-item">
                <div class="scale-item-visual">
                  <svg viewBox="0 0 40 60"><g transform="translate(10,55) scale(0.035, -0.035)" fill="var(--jd-amber)"><path :d="MUSIC_GLYPHS.semifusa"/></g></svg>
                </div>
                <div class="scale-item-name">Semifusa (1/256)</div>
                <div class="scale-item-desc">Sei flag. Dura un sessantaquattresimo di battito.</div>
              </div>
            </div>
            <div class="teoria-tip mt-3"><strong>Il Punto di Valore:</strong> Un punto dopo la nota aumenta la durata della metà (es. semiminima col punto = 1,5 battiti).</div>
          </div>
        </Transition>
      </div>

      <!-- 3. Tempo -->
      <div class="teoria-card" :class="{ open: open[2] }">
        <button class="teoria-header" @click="toggle(2)">
          <span>{{ t('th.gen3') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[2]">
            <p class="teoria-intro">Il tempo organizza il flusso delle note in unità regolari chiamate <strong>Battute</strong>.</p>
            
            <div class="staff-visual" style="max-width: 250px;">
              <svg viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
                <g stroke="var(--jd-line-strong)" stroke-width="1">
                  <line x1="10" y1="15" x2="190" y2="15" />
                  <line x1="10" y1="27" x2="190" y2="27" />
                  <line x1="10" y1="39" x2="190" y2="39" />
                  <line x1="10" y1="51" x2="190" y2="51" />
                  <line x1="10" y1="63" x2="190" y2="63" />
                </g>
                <text x="25" y="42" fill="var(--jd-amber)" font-family="var(--jd-display)" font-size="24" font-weight="bold">4</text>
                <text x="25" y="65" fill="var(--jd-amber)" font-family="var(--jd-display)" font-size="24" font-weight="bold">4</text>
                
                <line x1="110" y1="15" x2="110" y2="63" stroke="var(--jd-text-soft)" stroke-width="2" />
                <line x1="185" y1="15" x2="185" y2="63" stroke="var(--jd-text-soft)" stroke-width="2" />
                
                <g font-family="var(--jd-mono)" font-size="8" fill="var(--jd-muted)" text-anchor="middle">
                  <text x="60" y="82">Battuta 1</text>
                  <text x="147" y="82">Battuta 2</text>
                </g>
              </svg>
            </div>

            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Tempi Semplici:</strong> Suddivisione binaria. Es: 2/4, 3/4, 4/4.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Tempi Composti:</strong> Suddivisione ternaria. Es: 6/8, 9/8. In 6/8 ci sono 2 battiti, ognuno diviso in 3 ottavi.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Accenti:</strong> Forte (1° battito), Debole (altri battiti), Mezzo-Forte (3° in 4/4).</div></li>
              <li><span class="tip-num">04</span><div class="tip-content"><strong>Sincope:</strong> Spostamento dell'accento dal tempo forte al debole. È l'anima del jazz e del funk.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 4. Circolo delle Quinte -->
      <div class="teoria-card" :class="{ open: open[3] }">
        <button class="teoria-header" @click="toggle(3)">
          <span>{{ t('th.gen4') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[3]">
            <p class="teoria-intro">Il Circolo delle Quinte è la mappa delle tonalità, mostra quante alterazioni (# o b) ha ogni tonalità.</p>
            <div class="circle-fifths-visual">
              <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
                <!-- Background Circles -->
                <circle cx="160" cy="160" r="140" fill="none" stroke="var(--jd-line)" stroke-width="0.5" stroke-dasharray="2 4" />
                <circle cx="160" cy="160" r="105" fill="none" stroke="var(--jd-line-strong)" stroke-width="1" />
                <circle cx="160" cy="160" r="75"  fill="none" stroke="var(--jd-line)" stroke-width="1" stroke-dasharray="4 4" />
                
                <!-- Crosshairs -->
                <line x1="160" y1="20"  x2="160" y2="300" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
                <line x1="20"  y1="160" x2="300" y2="160" stroke="rgba(255,255,255,0.03)" stroke-width="1" />

                <g v-for="(item, i) in circleFifths" :key="item.note">
                  <!-- Major Note -->
                  <text 
                    :x="160 + 120 * Math.sin(i * Math.PI / 6)" 
                    :y="160 - (120 + (i >= 3 && i <= 9 ? 4 : 0)) * Math.cos(i * Math.PI / 6)" 
                    text-anchor="middle" dominant-baseline="middle"
                    fill="var(--jd-amber)" font-size="22" font-family="var(--jd-display)" font-style="italic"
                  >{{ item.note }}</text>
                  
                  <!-- Minor Note (Relative) -->
                  <text 
                    :x="160 + 88 * Math.sin(i * Math.PI / 6)" 
                    :y="160 - (88 + (i >= 3 && i <= 9 ? 4 : 0)) * Math.cos(i * Math.PI / 6)" 
                    text-anchor="middle" dominant-baseline="middle"
                    fill="var(--jd-text-soft)" font-size="14" font-family="var(--jd-display)" font-style="italic"
                  >{{ item.minor }}</text>

                  <!-- Accidentals (Outer) -->
                  <text 
                    :x="160 + 148 * Math.sin(i * Math.PI / 6)" 
                    :y="160 - (148 + (i >= 3 && i <= 9 ? 4 : 0)) * Math.cos(i * Math.PI / 6)" 
                    text-anchor="middle" dominant-baseline="middle"
                    fill="var(--jd-muted)" font-size="9" font-family="var(--jd-mono)"
                  >{{ item.acc }}</text>
                </g>

                <!-- Center Label -->
                <text x="160" y="160" text-anchor="middle" dominant-baseline="middle" fill="var(--jd-line-strong)" font-size="9" font-family="var(--jd-mono)" letter-spacing="2">CIRCLE</text>
              </svg>
            </div>
            <div class="teoria-tip mt-3"><strong>Uso Pratico:</strong> Tonalità vicine nel circolo condividono quasi tutte le note — perfette per modulazioni. Tonalità opposte (es. C e Gb) sono le più lontane armonicamente.</div>
          </div>
        </Transition>
      </div>

      <!-- 5. Costruzione Accordi -->
      <div class="teoria-card" :class="{ open: open[4] }">
        <button class="teoria-header" @click="toggle(4)">
          <span>{{ t('th.gen5') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[4]">
            <p class="teoria-intro">L'armonia nasce sovrapponendo suoni. L'accordo base è la <strong>Triade</strong>: Tonica, Terza e Quinta.</p>
            <div class="triads-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
              <div v-for="triad in triads" :key="triad.name" class="harmony-triad">
                <div class="harmony-name">{{ triad.name }}</div>
                <div class="harmony-visual">
                  <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="var(--jd-line-strong)" stroke-width="0.5">
                      <line x1="5" y1="10" x2="55" y2="10" />
                      <line x1="5" y1="22" x2="55" y2="22" />
                      <line x1="5" y1="34" x2="55" y2="34" />
                      <line x1="5" y1="46" x2="55" y2="46" />
                      <line x1="5" y1="58" x2="55" y2="58" />
                    </g>
                    <g fill="var(--jd-amber)">
                      <ellipse cx="30" cy="58" rx="6" ry="4" transform="rotate(-20 30 58)" />
                      <ellipse :cx="30" :cy="triad.type === 'minor' || triad.type === 'dim' ? 49 : 46" rx="6" ry="4" :transform="'rotate(-20 30 ' + (triad.type === 'minor' || triad.type === 'dim' ? 49 : 46) + ')'" />
                      <ellipse :cx="30" :cy="triad.type === 'dim' ? 40 : (triad.type === 'aug' ? 31 : 34)" rx="6" ry="4" :transform="'rotate(-20 30 ' + (triad.type === 'dim' ? 40 : (triad.type === 'aug' ? 31 : 34)) + ')'" />
                      
                      <text v-if="triad.type === 'minor' || triad.type === 'dim'" x="5" y="52" fill="var(--jd-amber)" font-size="14" font-family="var(--jd-display)" font-style="italic">b</text>
                      <text v-if="triad.type === 'dim'" x="5" y="43" fill="var(--jd-amber)" font-size="14" font-family="var(--jd-display)" font-style="italic">b</text>
                      <text v-if="triad.type === 'aug'" x="5" y="34" fill="var(--jd-amber)" font-size="14" font-family="var(--jd-display)" font-style="italic">#</text>
                    </g>
                  </svg>
                </div>
                <div class="harmony-notes">
                  <span v-for="n in triad.notes" :key="n" class="harmony-note-box">{{ n }}</span>
                </div>
                <div class="harmony-desc">{{ triad.desc }}</div>
              </div>
            </div>
            <ul class="tip-list mt-3">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>V grado (Dominante):</strong> massima tensione — vuole risolvere sulla Tonica (I grado).</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>IV grado (Sottodominante):</strong> colore e preparazione, meno instabile del V.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 6. Accordi Diatonici -->
      <div class="teoria-card" :class="{ open: open[5] }">
        <button class="teoria-header" @click="toggle(5)">
          <span>{{ t('th.gen6') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[5]">
            <p class="teoria-intro">Costruendo un accordo di settima su ogni nota della scala maggiore si ottengono gli <strong>Accordi Diatonici</strong> — gli accordi "nativi" di una tonalità.</p>
            <div class="vl-scroll">
              <table class="chord-table">
                <thead><tr><th>Grado</th><th>In Do Mag.</th><th>Tipo</th><th>Ruolo</th></tr></thead>
                <tbody>
                  <tr v-for="row in diatonicTable" :key="row.degree">
                    <td><span class="chord-symbol" style="font-family:var(--jd-mono); font-style:normal;">{{ row.degree }}</span></td>
                    <td><span class="chord-symbol">{{ row.chord }}</span></td>
                    <td><span class="chord-formula">{{ row.formula }}</span></td>
                    <td>{{ row.role }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="teoria-tip mt-3"><strong>Regola d'oro:</strong> In Do Maggiore qualsiasi accordo di questa tabella suona bene con gli altri. La progressione <em>ii–V–I</em> (Dm7–G7–Cmaj7) è la formula del jazz.</div>
          </div>
        </Transition>
      </div>

      <!-- 7. Rivolti -->
      <div class="teoria-card" :class="{ open: open[6] }">
        <button class="teoria-header" @click="toggle(6)">
          <span>{{ t('th.gen7') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[6]">
            <p class="teoria-intro">Un accordo è in <strong>posizione fondamentale</strong> quando la Tonica è al basso. Mettendo un'altra nota al basso si ottiene un <strong>Rivolto</strong>.</p>
            <div class="triads-grid" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">
              <div v-for="inv in inversions" :key="inv.name" class="harmony-triad">
                <div class="harmony-name" style="font-size:0.9em;">{{ inv.name }}</div>
                <div class="harmony-visual">
                  <svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="var(--jd-line-strong)" stroke-width="0.5">
                      <line x1="10" y1="30" x2="70" y2="30" />
                      <line x1="10" y1="42" x2="70" y2="42" />
                      <line x1="10" y1="54" x2="70" y2="54" />
                      <line x1="10" y1="66" x2="70" y2="66" />
                      <line x1="10" y1="78" x2="70" y2="78" />
                    </g>
                    <g fill="var(--jd-amber)">
                      <path v-for="(y, idx) in inv.notes" :key="idx" :d="MUSIC_GLYPHS.semibreve" 
                            :transform="`translate(30, ${y+25}) scale(0.03, -0.03)`" />
                    </g>
                  </svg>
                </div>
                <div style="font-family:var(--jd-display); font-style:italic; font-size:1.4em; color:var(--jd-amber); margin:4px 0;">{{ inv.example }}</div>
                <div class="harmony-desc">Basso: {{ inv.bass }}</div>
              </div>
            </div>
            <ul class="tip-list mt-3">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Perché usarli:</strong> Creano linee di basso più fluide e melodiche invece di salti.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Notazione:</strong> accordo/basso. Es: <em>G7/B</em> = Sol settima con Si al basso.</div></li>
            </ul>
          </div>
        </Transition>
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

const MUSIC_GLYPHS = {
  gClef: 'M314 801q-14 53 -23 105t-9 106q0 47 6.5 88.5t18.5 76.5q13 40 34 75.5t44.5 58.5t41.5 23q24 0 66 -85q21 -43 31 -93t10 -107q0 -71 -19 -141.5t-55.5 -132.5t-87.5 -109l35 -168q15 2 25 3t15 1q61 0 109 -34.5t76.5 -90.5t28.5 -123q0 -77 -39.5 -138.5 t-118.5 -90.5q5 -17 29 -142q6 -30 9 -47.5t4 -30.5t1 -30q0 -50 -24.5 -89.5t-66 -61.5t-92.5 -22q-52 0 -92 19.5t-63 54t-23 79.5q0 48 26.5 80t75.5 32q42 0 68.5 -30.5t26.5 -72.5q0 -36 -25 -63t-65 -27h-10q26 -39 82 -39q69 0 108 45t39 115q0 17 -4 45.5t-14 68.5 t-15.5 66t-7.5 37q-34 -10 -80 -10q-86 0 -168 50q-80 50 -126 132t-46 177q0 90 41 169t101.5 145t121.5 126zM341 826q23 12 49 44.5t50 74.5t39 84.5t15 76.5q0 36 -11 57t-38 21q-24 0 -46.5 -22t-40 -58.5t-27.5 -81.5t-10 -92q0 -32 6.5 -58t13.5 -46zM398 379 q-27 -6 -51 -25.5t-38.5 -47t-14.5 -58.5q0 -25 13 -51.5t32 -42.5q13 -12 26 -18q15 -7 15 -13q0 -3 -10 -6q-38 9 -68.5 34t-48 60.5t-17.5 75.5q0 43 17.5 83t49 72t71.5 48l-29 151q-116 -94 -170.5 -184.5t-54.5 -179.5q0 -65 34 -121t93 -90.5t133 -34.5q20 0 40.5 4 t43.5 10zM495 55q98 42 98 172q0 43 -22 78.5t-59 56.5t-83 21z',
  noteheadFilled: 'M159 -1q-48 0 -78.5 22.5t-30.5 68.5q0 51 28.5 91.5t74.5 64t98 23.5q44 0 70 -23.5t26 -66.5q0 -45 -26 -90t-68.5 -65.5t-93.5 -24.5z',
  noteheadUnfilled: 'M159 -1q-48 0 -78.5 22.5t-30.5 68.5q0 51 28.5 91.5t74.5 64t98 23.5q44 0 70 -23.5t26 -66.5q0 -49 -26 -90t-68.5 -65.5t-93.5 -24.5zM77 66q0 -10 7.5 -18t20.5 -8q35 0 87 29q35 20 63.5 44.5t45.5 49t17 41.5q0 11 -5.5 18.5t-19.5 7.5q-19 0 -46 -12t-56.5 -31 t-55.5 -41.5t-42 -43.5t-16 -36z',
  breve: 'M311 808v-808h-261v808h261zM265 734h-167v-660h167v660z',
  semibreve: 'M50 135q0 37 27 65t73.5 44t102.5 16q57 0 105 -15.5t77 -43.5t29 -66q0 -39 -28 -67.5t-74.5 -44t-102.5 -15.5t-103.5 15t-76.5 43.5t-29 68.5zM280 28q34 0 46.5 25t12.5 59q0 35 -14.5 64t-38.5 46.5t-54 17.5q-34 0 -45.5 -25t-11.5 -59t14 -63t37.5 -47t53.5 -18z',
  minima: 'M323 1009h24v-840q0 -32 -16.5 -62.5t-44.5 -54.5t-61 -38.5t-66 -14.5q-48 0 -78.5 22.5t-30.5 68.5q0 51 28.5 91.5t74.5 64t98 23.5q44 0 72 -22v762zM77 66q0 -10 7.5 -18t20.5 -8q35 0 87 29q35 20 63.5 44.5t45.5 49t17 41.5q0 11 -5.5 18.5t-19.5 7.5 q-19 0 -46 -12t-56.5 -31t-55.5 -41.5t-42 -43.5t-16 -36z',
  semiminima: 'M350 1009v-836q0 -43 -28.5 -80t-73.5 -59.5t-95 -22.5q-46 0 -74 23.5t-28 63.5q0 31 18 60t47.5 52.5t64.5 37t69 13.5q43 0 74 -25v773h26z',
  croma: 'M325 1009h26q6 -41 15 -72.5t26 -61t45 -63.5q30 -35 50 -58.5t40 -49.5q37 -46 54.5 -94.5t17.5 -98.5q0 -104 -88 -252h-16q28 59 50.5 118.5t22.5 113.5t-28 111t-78.5 96t-110.5 43v-566q0 -43 -27.5 -80.5t-72.5 -60.5t-99 -23q-43 0 -72.5 22t-29.5 65 q0 32 17 61.5t45 52.5t61.5 36t67.5 13q58 0 84 -23v771z',
  semicroma: 'M321 1009h26q3 -29 9 -51t16 -39q17 -27 41 -46.5t55 -50.5q30 -29 59 -64.5t48.5 -80.5t19.5 -101q0 -45 -14 -98q26 -38 26 -110q0 -48 -13 -95.5t-38 -81.5h-16q47 92 47 160q0 55 -31 101q-20 30 -44.5 53.5t-62.5 48.5t-102 57v-440q0 -43 -28.5 -79.5t-73.5 -58.5 t-93 -22q-42 0 -72 19t-30 59q0 48 29 87t75 62.5t95 23.5q45 0 72 -24v771zM353 823q0 -52 23 -96q8 -14 32.5 -45t58.5 -63q38 -36 67 -69t34 -45q2 8 3 18.5t1 23.5q0 76 -49 143t-170 133z',
  biscroma: 'M321 1154h26q3 -37 16.5 -65t42 -58t74.5 -75q47 -45 72 -85t34 -77.5t9 -77.5q0 -44 -12 -88q12 -37 12 -80q0 -17 -2.5 -36t-7.5 -40q24 -31 24 -98q0 -46 -12.5 -94.5t-38.5 -86.5h-16q45 93 45 162q0 63 -35.5 111.5t-105.5 92.5l-99 63v-451q0 -42 -28.5 -78.5 t-73.5 -59t-93 -22.5t-75 20t-27 68q0 32 18 61t47 52t63.5 36.5t68.5 13.5q24 0 43 -6t31 -20v918zM351 972q0 -37 17 -69q11 -21 33 -44t48 -46q32 -29 64.5 -66t54.5 -82q3 18 3 34q0 63 -33 114q-34 52 -85 89.5t-102 69.5zM349 798q3 -48 27 -85.5t60 -71.5l76 -71 q21 -19 35 -36t21 -31q1 8 1 13v11q0 151 -220 271z',
  semibiscroma: 'M583 628q12 -37 12 -80q0 -17 -2.5 -36t-7.5 -40q24 -31 24 -98q0 -46 -12.5 -94.5t-38.5 -86.5h-16q45 93 45 162q0 63 -35.5 111.5t-105.5 92.5l-99 63v-451q0 -42 -28.5 -78.5t-73.5 -59t-93 -22.5t-75 20t-27 68q0 32 18 61t47 52t63.5 36.5t68.5 13.5q24 0 43 -6 t31 -20v1094h26q3 -35 15 -61.5t39.5 -56.5t76.5 -77q49 -46 74 -86.5t34 -78.5t9 -78q0 -27 -3 -47t-10 -40q6 -22 9.5 -44t3.5 -45q0 -44 -12 -88zM351 1148q0 -65 56 -118q47 -45 77.5 -76.5t50.5 -57.5t33 -55q3 18 3 34q0 49 -18.5 88t-50.5 71q-31 32 -70 59.5 t-81 54.5zM351 972q0 -37 17 -69q11 -21 34 -44t48 -46q33 -30 65 -66.5t53 -81.5q3 18 3 34q0 32 -8.5 60.5t-24.5 53.5q-19 32 -46 56.5t-58 46.5q-20 14 -41 28.5t-42 27.5zM349 798q3 -48 27 -85.5t60 -71.5l76 -71q21 -19 35 -36t21 -31q1 8 1 13v11q0 151 -220 271z',
  fusa: 'M583 628q12 -37 12 -80q0 -17 -2.5 -36t-7.5 -40q24 -31 24 -98q0 -46 -12.5 -94.5t-38.5 -86.5h-16q45 93 45 162q0 63 -35.5 111.5t-105.5 92.5l-99 63v-451q0 -42 -28.5 -78.5t-73.5 -59t-93 -22.5t-75 20t-27 68q0 32 18 61t47 52t63.5 36.5t68.5 13.5q24 0 43 -6t31 -20v1284h26q3 -36 15 -62t39.5 -55.5t76.5 -77.5q49 -47 74 -87t34 -78t9 -78q0 -23 -3.5 -45.5t-11.5 -51.5q15 -45 15 -93q0 -27 -3 -47t-10 -40q6 -22 9.5 -44t3.5 -45q0 -44 -12 -88zM351 1331q0 -38 16 -67q11 -19 32.5 -42.5t49.5 -49.5q32 -31 65.5 -68t53.5 -80 q3 18 3 34q0 49 -18.5 88t-50.5 71q-31 32 -70 59.5t-81 54.5zM351 1148q0 -65 56 -118q47 -44 77.5 -76t50.5 -58t33 -55q3 18 3 34q0 49 -18.5 88t-50.5 71q-31 32 -70 59.5t-81 54.5zM351 972q0 -37 17 -69q13 -23 38 -48.5t54 -52.5q31 -28 60 -62t48 -75q3 18 3 34 q0 63 -33 114q-34 52 -85 89.5t-102 69.5zM349 798q3 -48 27 -85.5t60 -71.5l76 -71q21 -19 35 -36t21 -31q1 7 1 11.5v12.5q0 151 -220 271z',
  semifusa: 'M583 628q12 -37 12 -80q0 -17 -2.5 -36t-7.5 -40q24 -31 24 -98q0 -46 -12.5 -94.5t-38.5 -86.5h-16q45 93 45 162q0 63 -35.5 111.5t-105.5 92.5l-99 63v-451q0 -42 -28.5 -78.5t-73.5 -59t-93 -22.5t-75 20t-27 68q0 32 18 61t47 52t63.5 36.5t68.5 13.5q24 0 43 -6t31 -20v1284h26q3 -36 15 -62t39.5 -55.5t76.5 -77.5q49 -47 74 -87t34 -78t9 -78q0 -23 -3.5 -45.5t-11.5 -51.5q15 -45 15 -93q0 -27 -3 -47t-10 -40q6 -22 9.5 -44t3.5 -45q0 -44 -12 -88zM351 1331q0 -38 16 -67q11 -19 32.5 -42.5t49.5 -49.5q32 -31 65.5 -68t53.5 -80 q3 18 3 34q0 49 -18.5 88t-50.5 71q-31 32 -70 59.5t-81 54.5zM351 1148q0 -65 56 -118q47 -44 77.5 -76t50.5 -58t33 -55q3 18 3 34q0 49 -18.5 88t-50.5 71q-31 32 -70 59.5t-81 54.5zM351 972q0 -37 17 -69q13 -23 38 -48.5t54 -52.5q31 -28 60 -62t48 -75q3 18 3 34 q0 63 -33 114q-34 52 -85 89.5t-102 69.5zM349 798q3 -48 27 -85.5t60 -71.5l76 -71q21 -19 35 -36t21 -31q1 7 1 11.5v12.5q0 151 -220 271z'
}

const notationNotes = [
  { name: 'Mi', y: 74, label: 'Mi' },
  { name: 'Fa', y: 68, label: 'Fa' },
  { name: 'Sol', y: 62, label: 'Sol' },
  { name: 'La', y: 56, label: 'La' },
  { name: 'Si', y: 50, label: 'Si' },
  { name: 'Do', y: 44, label: 'Do' },
  { name: 'Re', y: 38, label: 'Re' },
  { name: 'Mi', y: 32, label: 'Mi' },
  { name: 'Fa', y: 26, label: 'Fa' },
]

const circleFifths = [
  { note:'C',  minor:'Am', acc:'0 #/b' },
  { note:'G',  minor:'Em', acc:'1 #' },
  { note:'D',  minor:'Bm', acc:'2 #' },
  { note:'A',  minor:'F#m',acc:'3 #' },
  { note:'E',  minor:'C#m',acc:'4 #' },
  { note:'B',  minor:'G#m',acc:'5 #' },
  { note:'Gb', minor:'Ebm',acc:'6 b' },
  { note:'Db', minor:'Bbm',acc:'5 b' },
  { note:'Ab', minor:'Fm', acc:'4 b' },
  { note:'Eb', minor:'Cm', acc:'3 b' },
  { note:'Bb', minor:'Gm', acc:'2 b' },
  { note:'F',  minor:'Dm', acc:'1 b' },
]

const triads = [
  { name:'Maggiore',  type:'major', notes:['1','3','5'],    desc:'Luminosa e stabile' },
  { name:'Minore',    type:'minor', notes:['1','b3','5'],   desc:'Malinconica e scura' },
  { name:'Diminuita', type:'dim',   notes:['1','b3','b5'],  desc:'Molto tesa e instabile' },
  { name:'Aumentata', type:'aug',   notes:['1','3','#5'],   desc:'Sospesa ed esotica' },
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
  { name:'Fondamentale', bass:'Tonica',   example:'C/C', notes:[58, 46, 34] },
  { name:'1° Rivolto',   bass:'Terza',    example:'C/E', notes:[46, 34, 22] },
  { name:'2° Rivolto',   bass:'Quinta',   example:'C/G', notes:[34, 22, 10] },
  { name:'3° Rivolto',   bass:'Settima',  example:'Cmaj7/B', notes:[22, 10, -2, -14] },
]
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

.circle-fifths-visual {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(255, 214, 10, 0.03) 0%, transparent 70%);
}

.circle-fifths-visual svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.2));
}

.triads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin: 14px 0;
}

.harmony-triad {
  background: var(--jd-surface-alt);
  border: 1px solid var(--jd-line);
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.harmony-name {
  font-family: var(--jd-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--jd-text-soft);
}
.harmony-notes {
  display: flex;
  gap: 4px;
  justify-content: center;
}
.harmony-note-box {
  background: rgba(255, 214, 10, 0.12);
  border: 1px solid rgba(255, 214, 10, 0.25);
  border-radius: 6px;
  padding: 2px 8px;
  font-family: var(--jd-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--jd-amber);
}

.scale-item-visual {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.scale-item-visual svg {
  height: 80%;
  max-width: 100%;
}

.staff-visual {
  width: 100%;
  max-width: 450px;
  margin: 20px auto;
  background: rgba(0,0,0,0.2);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid var(--jd-line);
}

.harmony-visual {
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.harmony-visual svg {
  height: 100%;
}

.vl-scroll {
  overflow-x: auto;
  margin: 14px 0;
  border-radius: 10px;
  border: 1px solid var(--jd-line);
}
</style>
