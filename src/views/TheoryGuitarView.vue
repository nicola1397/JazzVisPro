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
            <p class="teoria-intro" v-html="C[0].intro"></p>
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
                <text x="82" y="10" fill="rgba(255,255,255,0.4)" font-size="7" font-family="monospace" text-anchor="middle">{{ C[0].svg[0] }}</text>
                <text x="200" y="10" fill="rgba(255,255,255,0.4)" font-size="7" font-family="monospace" text-anchor="middle">{{ C[0].svg[1] }}</text>
              </svg>
              <p class="tab-note">{{ C[0].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[0].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[1].intro"></p>
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
                <text x="155" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[1].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[1].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[1].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[2].intro"></p>
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
              <p class="tab-note">{{ C[2].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[2].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[3].intro"></p>
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
                <text x="54" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[3].svg[0] }}</text>
                <text x="130" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[3].svg[1] }}</text>
              </svg>
              <p class="tab-note">{{ C[3].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[3].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[4].intro"></p>
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
                <text x="57" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[4].svg[0] }}</text>
                <text x="127" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[4].svg[1] }}</text>
              </svg>
              <p class="tab-note">{{ C[4].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[4].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[5].intro"></p>
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
              <p class="tab-note">{{ C[5].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[5].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[6].intro"></p>
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
              <p class="tab-note">{{ C[6].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[6].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[7].intro"></p>
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
              <p class="tab-note">{{ C[7].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[7].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[8].intro"></p>
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
                <text x="125" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[8].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[8].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[8].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[9].intro"></p>
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
              <p class="tab-note">{{ C[9].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[9].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[10].intro"></p>
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
                <text x="78" y="90" fill="#e74c3c" font-size="8" font-family="monospace" text-anchor="middle">{{ C[10].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[10].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[10].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[11].intro"></p>
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
              <p class="tab-note">{{ C[11].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[11].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[12].intro"></p>
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
                <text x="82" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[12].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[12].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[12].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[13].intro"></p>
            <div class="tab-visual">
              <svg viewBox="0 0 260 96" style="width:100%;max-width:300px;display:block;margin:0 auto;">
                <g v-for="(s,i) in tabStrings" :key="i">
                  <text x="9" :y="18+i*12+4" fill="rgba(255,255,255,0.3)" font-size="9" font-family="monospace" text-anchor="middle">{{s}}</text>
                  <line x1="18" :y1="18+i*12" x2="250" :y2="18+i*12" stroke="rgba(255,255,255,0.2)" stroke-width="0.7"/>
                </g>
                <line x1="18" y1="18" x2="18" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <line x1="250" y1="18" x2="250" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1.2"/>
                <!-- A major arpeggio: A=12, D=11, G=9, B=10, e=9 -->
                <rect x="199" y="11" width="12" height="11" fill="#0c0b0a"/><text x="205" y="22" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <rect x="184" y="23" width="18" height="11" fill="#0c0b0a"/><text x="193" y="34" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">10</text>
                <rect x="172" y="35" width="12" height="11" fill="#0c0b0a"/><text x="178" y="46" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">9</text>
                <rect x="154" y="47" width="18" height="11" fill="#0c0b0a"/><text x="163" y="58" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">11</text>
                <rect x="136" y="59" width="18" height="11" fill="#0c0b0a"/><text x="145" y="70" fill="var(--jd-amber)" font-size="10" font-family="monospace" text-anchor="middle">12</text>
                <!-- sweep arrow -->
                <line x1="136" y1="72" x2="208" y2="16" stroke="rgba(255,165,0,0.35)" stroke-width="2"/>
                <polygon points="208,16 201,22 212,24" fill="rgba(255,165,0,0.4)"/>
                <text x="80" y="48" fill="rgba(255,165,0,0.6)" font-size="14" font-family="monospace">↑</text>
                <text x="100" y="85" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[13].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[13].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[13].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
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
            <p class="teoria-intro" v-html="C[14].intro"></p>
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
                <text x="80" y="90" fill="rgba(255,255,255,0.35)" font-size="8" font-family="monospace" text-anchor="middle">{{ C[14].svg[0] }}</text>
              </svg>
              <p class="tab-note">{{ C[14].note }}</p>
            </div>
            <ul class="tip-list">
              <li v-for="(tip, ti) in C[14].tips" :key="ti"><span class="tip-num">{{ String(ti + 1).padStart(2, '0') }}</span><div class="tip-content"><strong>{{ tip[0] }}</strong> <span v-html="tip[1]"></span></div></li>
            </ul>
          </div>
        </Transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useOpenChapter } from '../composables/useOpenChapter.js'
import { GUITAR_TEXT } from '../utils/theoryGuitarText.js'

const { t, lang } = useI18n()
const C = computed(() => GUITAR_TEXT[lang.value] || GUITAR_TEXT.it)

const open = reactive(Array(15).fill(false))
useOpenChapter(open)
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
