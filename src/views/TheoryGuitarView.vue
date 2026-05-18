<template>
  <div id="view-teoria-chitarra" class="view-panel active jd-view">
    <header class="jd-titlebar">
      <div class="jd-titlemark">
        <span class="jd-titlemark-eyebrow">JAZZ · DECK</span>
        <h1 class="jd-titlemark-name">{{ t('tc.title') }}</h1>
      </div>
    </header>

    <p class="jd-intro">{{ t('tc.subtitle') }}</p>

    <div class="teoria-container jd-container">

      <!-- 1. Come leggere le tablature -->
      <div class="teoria-card" :class="{ open: open[0] }">
        <button class="teoria-header" @click="toggle(0)">
          <span>{{ t('th.guit1') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[0]">
            <p class="teoria-intro">La <strong>tablatura</strong> (tab) è il sistema di notazione più diffuso per chitarra. 6 linee — una per corda — con numeri che indicano il tasto da premere.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- note singole -->
                <rect x="44" y="11" width="12" height="11" fill="#0c0b0a"/><text x="50" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="74" y="47" width="12" height="11" fill="#0c0b0a"/><text x="80" y="58" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="104" y="71" width="12" height="11" fill="#0c0b0a"/><text x="110" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <!-- divider -->
                <line x1="148" y1="18" x2="148" y2="78" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" stroke-dasharray="2 3"/>
                <!-- accordo Am -->
                <rect x="179" y="11" width="12" height="11" fill="#0c0b0a"/><text x="185" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <rect x="179" y="23" width="12" height="11" fill="#0c0b0a"/><text x="185" y="34" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">1</text>
                <rect x="179" y="35" width="12" height="11" fill="#0c0b0a"/><text x="185" y="46" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">2</text>
                <rect x="179" y="47" width="12" height="11" fill="#0c0b0a"/><text x="185" y="58" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">2</text>
                <rect x="179" y="59" width="12" height="11" fill="#0c0b0a"/><text x="185" y="70" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <rect x="179" y="71" width="12" height="11" fill="#0c0b0a"/><text x="185" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <text x="82" y="10" fill="rgba(255,255,255,0.4)" font-size="7" font-family="monospace" text-anchor="middle">note singole →</text>
                <text x="200" y="10" fill="rgba(255,255,255,0.4)" font-size="7" font-family="monospace" text-anchor="middle">← accordo (Am)</text>
              </svg>
              <p class="tab-note">numero = tasto da premere · 0 = corda a vuoto</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>6 linee, 6 corde:</strong> la linea più alta è la prima corda (e, acuta), quella più bassa la sesta (E, grave).</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Lettura da sinistra a destra:</strong> le note si suonano nell'ordine in cui appaiono. Note in colonna verticale si suonano insieme (accordo).</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>0 = corda a vuoto:</strong> pizzica la corda senza premere alcun tasto.</div></li>
              <li><span class="tip-num">04</span><div class="tip-content"><strong>Limite della tab:</strong> non indica la durata delle note. Per quella serve l'ascolto del brano o la notazione tradizionale.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 2. Hammer-on -->
      <div class="teoria-card" :class="{ open: open[1] }">
        <button class="teoria-header" @click="toggle(1)">
          <span>{{ t('th.guit2') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[1]">
            <p class="teoria-intro">Il <strong>hammer-on</strong> permette di suonare una nota più alta senza ripassare il plettro, "picchiando" con forza un dito sulla tastiera.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="34" y="11" width="12" height="11" fill="#0c0b0a"/><text x="40" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="53" y="22" fill="rgba(255,255,255,0.65)" font-size="10" font-family="monospace" text-anchor="middle">h</text>
                <rect x="58" y="11" width="12" height="11" fill="#0c0b0a"/><text x="64" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <rect x="99" y="11" width="12" height="11" fill="#0c0b0a"/><text x="105" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <text x="119" y="22" fill="rgba(255,255,255,0.65)" font-size="10" font-family="monospace" text-anchor="middle">h</text>
                <rect x="127" y="11" width="18" height="11" fill="#0c0b0a"/><text x="136" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <text x="155" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">1 colpo di plettro per coppia</text>
              </svg>
              <p class="tab-note">h = hammer-on · nessun colpo di plettro sulla seconda nota</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Esecuzione:</strong> suona la prima nota con il plettro, poi picchia con forza il dito sulla nota successiva senza ripassare il plettro.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Suono:</strong> più morbido e legato rispetto al picking tradizionale. Perfetto per frasi veloci e fluide.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Concatenamento:</strong> si possono incatenare più hammer-on di fila, es. 5h7h9, usando un solo colpo di plettro iniziale.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 3. Pull-off -->
      <div class="teoria-card" :class="{ open: open[2] }">
        <button class="teoria-header" @click="toggle(2)">
          <span>{{ t('th.guit3') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[2]">
            <p class="teoria-intro">Il <strong>pull-off</strong> è l'inverso del hammer-on: si "tira" il dito già premuto verso il basso per far risuonare la nota inferiore già in posizione.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="34" y="11" width="12" height="11" fill="#0c0b0a"/><text x="40" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="53" y="22" fill="rgba(255,255,255,0.65)" font-size="10" font-family="monospace" text-anchor="middle">p</text>
                <rect x="58" y="11" width="12" height="11" fill="#0c0b0a"/><text x="64" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="104" y="11" width="18" height="11" fill="#0c0b0a"/><text x="113" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <text x="132" y="22" fill="rgba(255,255,255,0.65)" font-size="10" font-family="monospace" text-anchor="middle">p</text>
                <rect x="137" y="11" width="12" height="11" fill="#0c0b0a"/><text x="143" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
              </svg>
              <p class="tab-note">p = pull-off · la seconda nota risuona senza plettro</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Esecuzione:</strong> premi entrambe le note, suona la più alta con il plettro, poi tira il dito verso il basso della corda per far risuonare quella inferiore.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Combinato con hammer-on:</strong> si ottiene il <em>legato</em>, es. 5h7p5 — suono fluido con un solo plettro.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Direzione del tiraggio:</strong> sulle corde alte (e, B) si tira verso il basso; sulle corde basse (A, E) si tira verso l'alto per non smorzare le corde adiacenti.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 4. Slide -->
      <div class="teoria-card" :class="{ open: open[3] }">
        <button class="teoria-header" @click="toggle(3)">
          <span>{{ t('th.guit4') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[3]">
            <p class="teoria-intro">Il <strong>slide</strong> (glissato) consiste nello scivolare il dito lungo la corda da un tasto all'altro mantenendo la pressione.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="34" y="11" width="12" height="11" fill="#0c0b0a"/><text x="40" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="54" y="22" fill="rgba(255,255,255,0.7)" font-size="12" font-family="monospace" text-anchor="middle">/</text>
                <rect x="62" y="11" width="12" height="11" fill="#0c0b0a"/><text x="68" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <rect x="112" y="11" width="12" height="11" fill="#0c0b0a"/><text x="118" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <text x="132" y="22" fill="rgba(255,255,255,0.7)" font-size="12" font-family="monospace" text-anchor="middle">\</text>
                <rect x="140" y="11" width="12" height="11" fill="#0c0b0a"/><text x="146" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="54" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">ascendente</text>
                <text x="130" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">discendente</text>
              </svg>
              <p class="tab-note">/ = slide su · \ = slide giù · il suono scorre continuamente</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>/ = ascendente:</strong> scivola dal tasto più basso a quello più alto mantenendo la pressione.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>\ = discendente:</strong> scivola dall'alto verso il basso. Il suono è continuo, non staccato.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Slide indeterminato:</strong> /7 (senza numero iniziale) = scivola da una posizione indefinita; 7/ (senza finale) = scivola verso il basso senza fermarsi.</div></li>
              <li><span class="tip-num">04</span><div class="tip-content"><strong>Bottleneck:</strong> con un tubetto metallico o di vetro sul dito si ottiene il suono blues e slide guitar tradizionale.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 5. Bend -->
      <div class="teoria-card" :class="{ open: open[4] }">
        <button class="teoria-header" @click="toggle(4)">
          <span>{{ t('th.guit5') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[4]">
            <p class="teoria-intro">Il <strong>bend</strong> consiste nel tirare la corda perpendicolarmente al manico per alzarne l'intonazione di un semitono o più.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- 7b9 (full bend) -->
                <rect x="39" y="11" width="12" height="11" fill="#0c0b0a"/><text x="45" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="57" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">b</text>
                <rect x="63" y="11" width="12" height="11" fill="#0c0b0a"/><text x="69" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <!-- 7b½ (half bend) -->
                <rect x="114" y="11" width="12" height="11" fill="#0c0b0a"/><text x="120" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="132" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">b½</text>
                <text x="57" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">intero (+1T)</text>
                <text x="127" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">mezzo (+½T)</text>
              </svg>
              <p class="tab-note">b = bend · 7b9 = suona il 7°, tira la corda fino al tono del 9°</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Bend intero (b):</strong> alza di un tono intero (2 semitoni). Es. 7b9 = suona il 7° tasto, tira fino a raggiungere il tono del 9°.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Mezzo bend (b½):</strong> alza di un semitono. Più sottile, molto usato nel blues.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Bend e rilascio (br):</strong> tira la corda e rilasciala subito — due note con un solo plettro.</div></li>
              <li><span class="tip-num">04</span><div class="tip-content"><strong>Pre-bend (pb):</strong> tira la corda prima di pizzicarla, poi rilascia — effetto opposto al bend normale.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 6. Vibrato -->
      <div class="teoria-card" :class="{ open: open[5] }">
        <button class="teoria-header" @click="toggle(5)">
          <span>{{ t('th.guit6') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[5]">
            <p class="teoria-intro">Il <strong>vibrato</strong> è una rapida oscillazione dell'altezza prodotta muovendo ritmicamente il dito sulla corda dopo aver suonato la nota.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="34" y="11" width="12" height="11" fill="#0c0b0a"/><text x="40" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="62" y="22" fill="rgba(255,255,255,0.55)" font-size="12" font-family="monospace">~~~</text>
                <rect x="118" y="11" width="18" height="11" fill="#0c0b0a"/><text x="127" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <text x="148" y="22" fill="rgba(255,255,255,0.55)" font-size="12" font-family="monospace">~~~~</text>
              </svg>
              <p class="tab-note">~ = vibrato · oscillazione continua dell'intonazione</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Esecuzione:</strong> dopo aver suonato la nota, muovi il dito rapidamente avanti e indietro lungo l'asse del manico (o lateralmente per vibrato più ampio).</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Wide vibrato (w):</strong> vibrato ampio, tipico del blues. Si ottiene tirando e rilasciando la corda in modo rapido e pronunciato.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Whammy bar:</strong> con il braccio del tremolo si può applicare vibrato all'intera chitarra, tipico del rock e metal.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 7. Palm Mute -->
      <div class="teoria-card" :class="{ open: open[6] }">
        <button class="teoria-header" @click="toggle(6)">
          <span>{{ t('th.guit7') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[6]">
            <p class="teoria-intro">Il <strong>palm mute</strong> (P.M.) si ottiene appoggiando leggermente il palmo della mano sul ponte mentre si suona, producendo un suono ovattato e percussivo.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 104" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- 0 0 0 0 on E string (y=78) -->
                <rect x="39" y="71" width="12" height="11" fill="#0c0b0a"/><text x="45" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <rect x="59" y="71" width="12" height="11" fill="#0c0b0a"/><text x="65" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <rect x="79" y="71" width="12" height="11" fill="#0c0b0a"/><text x="85" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <rect x="99" y="71" width="12" height="11" fill="#0c0b0a"/><text x="105" y="82" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">0</text>
                <!-- P.M. marking below -->
                <text x="38" y="94" fill="rgba(255,255,255,0.55)" font-size="9" font-family="monospace">P.M.</text>
                <line x1="60" y1="91" x2="114" y2="91" stroke="rgba(255,255,255,0.4)" stroke-width="0.9"/>
              </svg>
              <p class="tab-note">P.M. = palm mute · palmo appoggiato leggermente sul ponte</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Posizione della mano:</strong> appoggia il bordo del palmo (lato mignolo) direttamente sopra il ponte, vicino alle corde. Più si allontana dal ponte, più il suono è smorzato.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Suono "chug":</strong> tipico del metal e hard rock. Combinato con power chords e downstroke crea il riff metallico caratteristico.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>P.M.------:</strong> la linea tratteggiata indica fino a dove prosegue il palm mute. Quando finisce la linea, il suono torna normale.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 8. Alternate Picking -->
      <div class="teoria-card" :class="{ open: open[7] }">
        <button class="teoria-header" @click="toggle(7)">
          <span>{{ t('th.guit8') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[7]">
            <p class="teoria-intro">L'<strong>alternate picking</strong> consiste nell'alternare sistematicamente colpi di plettro verso il basso (↓) e verso l'alto (↑) per ogni nota.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 104" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="39" y="11" width="12" height="11" fill="#0c0b0a"/><text x="45" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="64" y="11" width="12" height="11" fill="#0c0b0a"/><text x="70" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="89" y="11" width="12" height="11" fill="#0c0b0a"/><text x="95" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="114" y="11" width="12" height="11" fill="#0c0b0a"/><text x="120" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <!-- arrows -->
                <text x="45" y="96" fill="var(--jd-amber)" font-size="13" font-family="monospace" text-anchor="middle">↓</text>
                <text x="70" y="96" fill="rgba(255,255,255,0.5)" font-size="13" font-family="monospace" text-anchor="middle">↑</text>
                <text x="95" y="96" fill="var(--jd-amber)" font-size="13" font-family="monospace" text-anchor="middle">↓</text>
                <text x="120" y="96" fill="rgba(255,255,255,0.5)" font-size="13" font-family="monospace" text-anchor="middle">↑</text>
              </svg>
              <p class="tab-note">↓ = downstroke · ↑ = upstroke · alternare sempre</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Regola base:</strong> ogni nota ottiene un colpo alternato — mai due downstroke o due upstroke di fila (salvo casi specifici come l'economia di movimento).</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Efficienza:</strong> l'alternate picking permette di raggiungere velocità elevate riducendo il movimento del plettro al minimo indispensabile.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Tremolo picking:</strong> alternate picking applicato su una sola nota in modo molto rapido — produce l'effetto tremolante tipico del metal e del bluegrass.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 9. Armonici naturali -->
      <div class="teoria-card" :class="{ open: open[8] }">
        <button class="teoria-header" @click="toggle(8)">
          <span>{{ t('th.guit9') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[8]">
            <p class="teoria-intro">Gli <strong>armonici naturali</strong> si producono toccando delicatamente la corda sopra certi tasti (senza premere) e pizzicandola — risultato: suoni cristallini e campanosi.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- <12> on e string -->
                <rect x="28" y="11" width="28" height="11" fill="#0c0b0a"/>
                <text x="42" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">&lt;12&gt;</text>
                <!-- <7> -->
                <rect x="90" y="11" width="20" height="11" fill="#0c0b0a"/>
                <text x="100" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">&lt;7&gt;</text>
                <!-- <5> -->
                <rect x="138" y="11" width="20" height="11" fill="#0c0b0a"/>
                <text x="148" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">&lt;5&gt;</text>
                <text x="125" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">tasti: 12 · 7 · 5 · 9</text>
              </svg>
              <p class="tab-note">&lt;&gt; = armonico naturale · tocca sopra il barrette senza premere</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Tecnica:</strong> posiziona il dito leggero sopra il barrette metallico (non tra i tasti), suona la corda, poi alza subito il dito. Il suono è brillante e campanoso.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Tasti principali:</strong> 12° (ottava), 7° (ottava+quinta), 5° (doppia ottava), 9°, 4°. Ognuno produce un'armonica della nota a vuoto.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>12° tasto:</strong> produce l'esatta ottava della corda a vuoto — l'armonico più facile da ottenere e il più usato nell'accordatura.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 10. Pinch Harmonics -->
      <div class="teoria-card" :class="{ open: open[9] }">
        <button class="teoria-header" @click="toggle(9)">
          <span>{{ t('th.guit10') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[9]">
            <p class="teoria-intro">I <strong>pinch harmonics</strong> si producono facendo sfiorare il bordo del pollice alla corda subito dopo il colpo di plettro, provocando un armonico acuto e stridulo.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <rect x="34" y="11" width="12" height="11" fill="#0c0b0a"/><text x="40" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="55" y="22" fill="rgba(255,255,255,0.6)" font-size="9" font-family="monospace">P.H.</text>
                <rect x="114" y="11" width="12" height="11" fill="#0c0b0a"/><text x="120" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="135" y="22" fill="rgba(255,255,255,0.6)" font-size="9" font-family="monospace">P.H.</text>
              </svg>
              <p class="tab-note">P.H. = pinch harmonic · squeal acuto · il pollice sfiora la corda</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Tecnica:</strong> tieni il plettro molto corto tra pollice e indice. Dopo il colpo sulla corda, il bordo del pollice la sfiora immediatamente creando l'armonico.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Posizione del plettro:</strong> spostandosi lungo la corda (sopra il pickup del manico o del ponte) si ottengono armonici a frequenze diverse.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Combinato con vibrato:</strong> un pinch harmonic seguito da vibrato produce il "squeal" tipico di Zakk Wylde e Billy Gibbons.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 11. Tapping -->
      <div class="teoria-card" :class="{ open: open[10] }">
        <button class="teoria-header" @click="toggle(10)">
          <span>{{ t('th.guit11') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[10]">
            <p class="teoria-intro">Il <strong>tapping</strong> usa la mano del plettro per "pestare" tasti alti sulla tastiera, permettendo intervalli e velocità impossibili con una sola mano.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- 5h12T17p12p5 -->
                <rect x="27" y="11" width="12" height="11" fill="#0c0b0a"/><text x="33" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="45" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">h</text>
                <rect x="51" y="11" width="18" height="11" fill="#0c0b0a"/><text x="60" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <text x="78" y="22" fill="#e74c3c" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">T</text>
                <rect x="85" y="11" width="18" height="11" fill="#0c0b0a"/><text x="94" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">17</text>
                <text x="112" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">p</text>
                <rect x="118" y="11" width="18" height="11" fill="#0c0b0a"/><text x="127" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <text x="145" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">p</text>
                <rect x="151" y="11" width="12" height="11" fill="#0c0b0a"/><text x="157" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="78" y="90" fill="#e74c3c" font-size="8" font-family="monospace" text-anchor="middle">T = tap mano destra</text>
              </svg>
              <p class="tab-note">T = tap · la mano destra pesta direttamente sulla tastiera</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Tecnica base:</strong> con l'indice o il medio della mano del plettro, picchia il tasto indicato con T, poi esegui un pull-off verso le note della mano sinistra.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Eddie Van Halen:</strong> rese celebre questa tecnica con "Eruption" (1978). Consente intervalli di due ottave con velocità e fluidità straordinarie.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Two-hand tapping:</strong> con più dita di entrambe le mani sulla tastiera si possono suonare arpeggi complessi, accordi e melodie sovrapposte.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 12. Tremolo Picking -->
      <div class="teoria-card" :class="{ open: open[11] }">
        <button class="teoria-header" @click="toggle(11)">
          <span>{{ t('th.guit12') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[11]">
            <p class="teoria-intro">Il <strong>tremolo picking</strong> è la ripetizione rapidissima di una singola nota con alternate picking, creando un effetto tremolante continuo.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- 6x note 5, wavy line above -->
                <rect x="29" y="11" width="12" height="11" fill="#0c0b0a"/><text x="35" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="49" y="11" width="12" height="11" fill="#0c0b0a"/><text x="55" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="69" y="11" width="12" height="11" fill="#0c0b0a"/><text x="75" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="89" y="11" width="12" height="11" fill="#0c0b0a"/><text x="95" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="109" y="11" width="12" height="11" fill="#0c0b0a"/><text x="115" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <rect x="129" y="11" width="12" height="11" fill="#0c0b0a"/><text x="135" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <!-- wavy line above -->
                <path d="M28,8 Q40,3 52,8 Q64,3 76,8 Q88,3 100,8 Q112,3 124,8 Q136,3 148,8 Q160,3 152,8" fill="none" stroke="rgba(255,165,0,0.5)" stroke-width="1.3"/>
              </svg>
              <p class="tab-note">ripetizione rapidissima con alternate picking ↓↑↓↑↓↑</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Tecnica:</strong> alternate picking molto veloce su una sola nota. La chiave è mantenere il plettro vicino alla corda e il movimento del polso fluido e rilassato.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Usi:</strong> tipico nel bluegrass (banjo roll), nel metal ritmico (thrash) e nel flamenco (rasgueado). Crea una texture densa e sostenuta.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Pratica:</strong> inizia lentamente con il metronomo, aumenta gradualmente. La velocità massima si raggiunge con rilassamento muscolare, non con tensione.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 13. Legato -->
      <div class="teoria-card" :class="{ open: open[12] }">
        <button class="teoria-header" @click="toggle(12)">
          <span>{{ t('th.guit13') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[12]">
            <p class="teoria-intro">Il <strong>legato</strong> chitarristico combina hammer-on e pull-off consecutivi per eseguire frasi veloci e fluide con un solo colpo di plettro iniziale.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- 5h7h9p7p5 -->
                <rect x="24" y="11" width="12" height="11" fill="#0c0b0a"/><text x="30" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="43" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">h</text>
                <rect x="50" y="11" width="12" height="11" fill="#0c0b0a"/><text x="56" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="69" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">h</text>
                <rect x="76" y="11" width="12" height="11" fill="#0c0b0a"/><text x="82" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <text x="95" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">p</text>
                <rect x="102" y="11" width="12" height="11" fill="#0c0b0a"/><text x="108" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">7</text>
                <text x="121" y="22" fill="rgba(255,255,255,0.65)" font-size="9" font-family="monospace" text-anchor="middle">p</text>
                <rect x="128" y="11" width="12" height="11" fill="#0c0b0a"/><text x="134" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">5</text>
                <text x="82" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">1 solo colpo iniziale per tutta la frase</text>
              </svg>
              <p class="tab-note">legato = h + p consecutivi · suono fluido come il pianoforte</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Un plettro:</strong> tutta la frase si esegue con un solo colpo di plettro iniziale. Il suono che segue viene generato interamente dalla mano sinistra.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Pressione costante:</strong> mantieni tutte le dita necessarie già premute prima di iniziare — è essenziale per pull-off precisi e sonori.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Joe Satriani, Steve Vai:</strong> maestri del legato esteso su più corde e posizioni. Il legato permette velocità e fluidità difficilmente raggiungibili con il solo picking.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 14. Sweep Picking -->
      <div class="teoria-card" :class="{ open: open[13] }">
        <button class="teoria-header" @click="toggle(13)">
          <span>{{ t('th.guit14') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[13]">
            <p class="teoria-intro">Lo <strong>sweep picking</strong> è una tecnica in cui il plettro "spazzola" più corde in un'unica direzione continua, eseguendo arpeggi ad altissima velocità.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- arpeggio: e=9, B=10, G=11, D=11, A=9 -->
                <rect x="199" y="11" width="12" height="11" fill="#0c0b0a"/><text x="205" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <rect x="184" y="23" width="18" height="11" fill="#0c0b0a"/><text x="193" y="34" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">10</text>
                <rect x="169" y="35" width="18" height="11" fill="#0c0b0a"/><text x="178" y="46" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">11</text>
                <rect x="154" y="47" width="18" height="11" fill="#0c0b0a"/><text x="163" y="58" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">11</text>
                <rect x="139" y="59" width="12" height="11" fill="#0c0b0a"/><text x="145" y="70" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <!-- sweep arrow -->
                <line x1="136" y1="72" x2="208" y2="16" stroke="rgba(255,165,0,0.35)" stroke-width="2"/>
                <polygon points="208,16 201,22 212,24" fill="rgba(255,165,0,0.4)"/>
                <text x="80" y="48" fill="rgba(255,165,0,0.6)" font-size="14" font-family="monospace">↑</text>
                <text x="100" y="85" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">sweep up: un movimento continuo</text>
              </svg>
              <p class="tab-note">↑ sweep: il plettro scorre su più corde senza rimbalzare</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Principio:</strong> invece di colpire ogni corda separatamente, il plettro scende (o sale) in modo fluido come se stesse "spazzolando". Ogni nota deve suonare separatamente — non come un accordo.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Smorzamento:</strong> ogni dito deve lasciare la corda appena la nota ha suonato, per evitare che le note si sovrappongano.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Yngwie Malmsteen, Jason Becker:</strong> pionieri dello sweep neoclassico. Le forme tipiche sono arpeggi di 3, 4 o 5 corde.</div></li>
            </ul>
          </div>
        </Transition>
      </div>

      <!-- 15. Note smorzate -->
      <div class="teoria-card" :class="{ open: open[14] }">
        <button class="teoria-header" @click="toggle(14)">
          <span>{{ t('th.guit15') }}</span><span class="teoria-arrow">▸</span>
        </button>
        <Transition name="jd-collapse">
          <div class="teoria-body" v-show="open[14]">
            <p class="teoria-intro">Le <strong>note smorzate</strong> (x) si producono appoggiando le dita sulla corda senza premerla completamente — il risultato è un suono percussivo privo di intonazione.</p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- x x x on e (y=18) and E (y=78) -->
                <text x="45" y="22" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="75" y="22" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="105" y="22" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="45" y="82" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="75" y="82" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="105" y="82" fill="var(--jd-amber)" font-size="12" font-family="monospace" text-anchor="middle">x</text>
                <text x="80" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">suono percussivo · nessuna intonazione</text>
              </svg>
              <p class="tab-note">x = nota smorzata (muted note) · tocca senza premere</p>
            </div>
            <ul class="tip-list">
              <li><span class="tip-num">01</span><div class="tip-content"><strong>Mano sinistra:</strong> appoggia le dita sulle corde senza premere fino al barrette — la corda vibra ma non produce intonazione definita.</div></li>
              <li><span class="tip-num">02</span><div class="tip-content"><strong>Funk e rhythm guitar:</strong> fondamentale nel funk e nella ritmica rock. Alterna note smorzate con accordi normali per effetti ritmici percussivi.</div></li>
              <li><span class="tip-num">03</span><div class="tip-content"><strong>Ghost notes:</strong> in alcune trascrizioni le note smorzate vengono chiamate "ghost notes" (note fantasma) e indicate con parentesi tonde: (5).</div></li>
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

const open = reactive(Array(15).fill(false))
function toggle(i) { open[i] = !open[i] }

const tabStrings = ['e', 'B', 'G', 'D', 'A', 'E']
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

.tab-visual {
  width: 100%;
  max-width: 450px;
  margin: 16px auto;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 14px 10px 8px;
  border: 1px solid var(--jd-line);
}

.tab-note {
  font-family: var(--jd-mono);
  font-size: 0.72em;
  color: var(--jd-muted);
  text-align: center;
  margin: 6px 0 0;
  line-height: 1.4;
}
</style>
