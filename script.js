// --- Theory & Constants ---
class Theory {
  static get NOTES() {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  }
  static get NOTES_FLAT() {
    return ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  }
  static get NOTES_ITA() {
    return ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];
  }
  static get TUNINGS() {
    return {
      "E Standard": [4, 11, 7, 2, 9, 4],
      "Drop D": [4, 11, 7, 2, 9, 2],
      "Eb Standard": [3, 10, 6, 1, 8, 3],
      "D Standard": [2, 9, 5, 0, 7, 2],
      DADGAD: [2, 9, 7, 2, 9, 2],
    };
  }
  static get SCALES() {
    return {
      "Ionio (Maj7)": [0, 2, 4, 5, 7, 9, 11],
      "Dorico (m7)": [0, 2, 3, 5, 7, 9, 10],
      "Frigio": [0, 1, 3, 5, 7, 8, 10],
      "Misolidio (7)": [0, 2, 4, 5, 7, 9, 10],
      "Lidio (Maj7#11)": [0, 2, 4, 6, 7, 9, 11],
      "Altered (7alt)": [0, 1, 3, 4, 6, 8, 10],
      "Minore Melodica": [0, 2, 3, 5, 7, 9, 11],
      "Diminuita (T/S)": [0, 2, 3, 5, 6, 8, 9, 11],
      Esatonale: [0, 2, 4, 6, 8, 10],
      "Minore Pentatonica": [0, 3, 5, 7, 10],
      "Maggiore Pentatonica": [0, 2, 4, 7, 9],
      Blues: [0, 3, 5, 6, 7, 10],
      "Minore Naturale (Aeolian)": [0, 2, 3, 5, 7, 8, 10],
      "Locrio": [0, 1, 3, 5, 6, 8, 10],
      "Minore Armonica": [0, 2, 3, 5, 7, 8, 11],
      "Lidio Dominante": [0, 2, 4, 6, 7, 9, 10],
      "Misolidio b13": [0, 2, 4, 5, 7, 8, 10],
    };
  }
  static get CAGED_SHAPES() {
    return {
      C: [{ s: 4, f: 0 }, { s: 3, f: -1 }, { s: 2, f: -3 }, { s: 1, f: -2 }, { s: 0, f: -3 }],
      A: [{ s: 4, f: 0 }, { s: 3, f: 2 }, { s: 2, f: 2 }, { s: 1, f: 2 }, { s: 0, f: 0 }],
      G: [{ s: 5, f: 0 }, { s: 4, f: -1 }, { s: 3, f: -3 }, { s: 2, f: -3 }, { s: 1, f: -3 }, { s: 0, f: 0 }],
      E: [{ s: 5, f: 0 }, { s: 4, f: 2 }, { s: 3, f: 2 }, { s: 2, f: 1 }, { s: 1, f: 0 }, { s: 0, f: 0 }],
      D: [{ s: 3, f: 0 }, { s: 2, f: 2 }, { s: 1, f: 3 }, { s: 0, f: 2 }],
    };
  }
  static get INTERVAL_COLORS() {
    return {
      0: { label: "Root", color: "#e74c3c", short: "R" },
      1: { label: "b9", color: "#2980b9", short: "b9" },
      2: { label: "9", color: "#3498db", short: "9" },
      3: { label: "b3", color: "#f1c40f", short: "b3" },
      4: { label: "3", color: "#f39c12", short: "3" },
      5: { label: "11", color: "#9b59b6", short: "11" },
      6: { label: "#11", color: "#8e44ad", short: "#11" },
      7: { label: "5", color: "#bdc3c7", short: "5" },
      8: { label: "#5", color: "#95a5a6", short: "#5" },
      9: { label: "13", color: "#1abc9c", short: "13" },
      10: { label: "7", color: "#2ecc71", short: "7" },
      11: { label: "maj7", color: "#27ae60", short: "maj7" },
    };
  }
  static noteIndexToFrequency(noteIndex, octave = 4) {
    const A4 = 9;
    const A4_FREQ = 440.0;
    return A4_FREQ * Math.pow(2, (noteIndex - A4 + (octave - 4) * 12) / 12);
  }
}

// --- Audio Engine ---
class AudioEngine {
  constructor() {
    this.context = null;
    this.chordSynth = null;
    this.pianoSampler = null;
    this.currentPreset = null;
    this.currentOscillators = [];
    this.metronomeSamples = {
      Beep: { type: "osc", freqDown: 1000, freqUp: 800, shape: "sine" },
      Click: { type: "osc", freqDown: 1500, freqUp: 1200, shape: "square" },
      Log: { type: "osc", freqDown: 600, freqUp: 450, shape: "triangle" },
    };
    this.chordSounds = {
      "Electric Piano": "epiano", "Warm Pad": "pad", "Bright Synth": "bright", "Strings": "strings", "Jazz Organ": "organ", "Brass Section": "brass", "Grand Piano": "piano",
    };
  }

  init() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this._setupTone();
      this._setupMetronomeBuffers();
    } else if (this.context.state === "suspended") {
      this.context.resume();
    }
    if (typeof Tone !== "undefined") Tone.start();
  }

  _setupTone() {
    if (typeof Tone === "undefined") return;
    const limiter = new Tone.Limiter(-3).toDestination();
    const compressor = new Tone.Compressor({ threshold: -20, ratio: 4, attack: 0.003, release: 0.25 }).connect(limiter);
    const reverb = new Tone.Reverb({ decay: 2.5, preDelay: 0.1, wet: 0.3 }).connect(compressor);
    const filter = new Tone.Filter({ frequency: 2000, type: "lowpass", rolloff: -12 }).connect(reverb);
    this.chordSynth = new Tone.PolySynth(Tone.Synth, { maxPolyphony: 6, oscillator: { type: "triangle" }, envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 1.0 }, volume: -12 }).connect(filter);
    this.chordSynth.filterNode = filter;
    this.pianoSampler = new Tone.Sampler({ urls: { A1: "A1.mp3", A2: "A2.mp3" }, baseUrl: "https://tonejs.github.io/audio/salamander/" }).connect(compressor);
  }

  async _setupMetronomeBuffers() {
    for (const key in this.metronomeSamples) {
      const s = this.metronomeSamples[key];
      if (s.type === "buffer") {
        if (s.down) s.downBuffer = await this._fetchBuffer(s.down).catch(() => (s.type = "osc"));
      }
    }
  }

  async _fetchBuffer(url) {
    const resp = await fetch(url);
    const buf = await resp.arrayBuffer();
    return await this.context.decodeAudioData(buf);
  }

  stopAll() {
    if (this.chordSynth) this.chordSynth.releaseAll();
    if (this.pianoSampler) this.pianoSampler.releaseAll();
    this.currentOscillators.forEach((o) => {
      try { o.gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.1); o.osc.stop(this.context.currentTime + 0.1); } catch (e) {}
    });
    this.currentOscillators = [];
  }

  playNoteImmediate(noteIdx, duration, vol, soundName, octave) {
    if (!this.chordSynth || typeof Tone === "undefined" || Tone.context.state !== "running") return;
    this._setPreset(soundName);
    const db = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2));
    if (this.chordSynth.volume) this.chordSynth.volume.rampTo(db, 0.01);
    const nIdx = ((noteIdx % 12) + 12) % 12;
    const note = Tone.Frequency(Theory.noteIndexToFrequency(nIdx, octave)).toNote();
    this.chordSynth.triggerAttackRelease([note], duration, Tone.context.currentTime + 0.01);
  }

  playClick(time, isDownbeat, vol, soundName) {
    const gain = this.context.createGain();
    gain.connect(this.context.destination);
    gain.gain.value = vol;
    const sound = this.metronomeSamples[soundName];
    if (sound.type === "osc") {
      const osc = this.context.createOscillator();
      osc.connect(gain);
      osc.type = sound.shape || "sine";
      osc.frequency.value = isDownbeat ? sound.freqDown : sound.freqUp;
      osc.start(time); osc.stop(time + 0.05);
    }
  }

  playChord(tones, rootIdx, time, duration, vol, soundName, baseOctave) {
    this.stopAll();
    if (!tones.length) return;
    if (this.chordSynth && typeof Tone !== "undefined" && Tone.context.state === "running") {
      let synth = this.chordSynth;
      if (soundName === "Grand Piano" && this.pianoSampler) synth = this.pianoSampler;
      else this._setPreset(soundName);
      const db = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2));
      if (synth.volume) synth.volume.rampTo(db, 0.1);
      let oct = baseOctave, prevNIdx = rootIdx;
      const notes = tones.map((interval, i) => {
        const nIdx = (rootIdx + interval) % 12;
        if (i > 0 && nIdx <= prevNIdx) oct++;
        prevNIdx = nIdx;
        return Tone.Frequency(Theory.noteIndexToFrequency(nIdx, oct)).toNote();
      });
      synth.triggerAttackRelease(notes, duration, time);
    } else {
      // Web Audio Fallback
      const volPer = (vol / tones.length) * 0.5;
      let oct = baseOctave, prevNIdx = rootIdx;
      tones.forEach((interval, i) => {
        const nIdx = (rootIdx + interval) % 12;
        if (i > 0 && nIdx <= prevNIdx) oct++;
        prevNIdx = nIdx;
        const freq = Theory.noteIndexToFrequency(nIdx, oct);

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();
        osc.type = soundName.includes("Piano") ? "sine" : "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(volPer, time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        gain.connect(this.context.destination);
        osc.start(time);
        osc.stop(time + duration + 0.1);
        this.currentOscillators.push({
          osc,
          gain
        });
      });
    }
  }

  _setPreset(name) {
    if (!this.chordSynth || this.currentPreset === name) return;
    const s = this.chordSynth; const f = s.filterNode;
    if (name === "Electric Piano") { s.set({ oscillator: { type: "sine" }, envelope: { attack: 0.005, decay: 0.3, sustain: 0.4, release: 1.2 } }); f.frequency.rampTo(3000, 0.1); }
    else if (name === "Strings") { s.set({ oscillator: { type: "fatsawtooth", count: 3, spread: 20 }, envelope: { attack: 0.4, decay: 0.5, sustain: 0.8, release: 2.0 } }); f.frequency.rampTo(2500, 0.1); }
    else { s.set({ oscillator: { type: "triangle" }, envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 1.5 } }); f.frequency.rampTo(2000, 0.1); }
    this.currentPreset = name;
  }
}

// --- Fretboard Manager ---
class Fretboard {
  constructor() {
    this.el = document.getElementById("fretboard-layer");
    this.nums = document.getElementById("numbers-layer");
  }

  render(tuningName) {
    this.el.innerHTML = ""; this.nums.innerHTML = "";
    const tuning = Theory.TUNINGS[tuningName] || Theory.TUNINGS["E Standard"];
    for (let s = 0; s < 6; s++) {
      const str = document.createElement("div"); str.className = `string s${s + 1}`;
      for (let f = 0; f <= 24; f++) {
        const fret = document.createElement("div"); fret.className = `fret fret-${f}`;
        const circle = document.createElement("div"); circle.className = "note-circle";
        circle.dataset.noteIndex = (tuning[s] + f) % 12;
        circle.dataset.stringIndex = s;
        circle.dataset.fretIndex = f;
        circle.onclick = () => app.handleNoteClick(circle);
        fret.appendChild(circle);
        if (s === 3 && [3, 5, 7, 9, 15, 17, 19, 21].includes(f)) {
          const m = document.createElement('div'); m.className = 'fret-marker'; fret.appendChild(m);
        }
        if ((f === 12 || f === 24) && (s === 1 || s === 4)) {
          const m = document.createElement('div'); m.className = 'fret-marker'; fret.appendChild(m);
        }
        str.appendChild(fret);
      }
      this.el.appendChild(str);
    }
    for (let f = 0; f <= 24; f++) this.nums.innerHTML += `<div class="num ${f === 0 ? "num-0" : ""}">${f}</div>`;
  }

  update(options) {
    if (options.currentView === 'interval-learner' || options.currentView === 'note-finder') {
        return;
    }

    const rootIdx = Theory.NOTES.indexOf(options.root);
    const scale = Theory.SCALES[options.scaleName];
    const tuning = Theory.TUNINGS[options.tuningName];
    const currentNotes = options.accidental === "#" ? Theory.NOTES : Theory.NOTES_FLAT;
    const explorerMode = options.explorerMode || 'normal';
    const arpIntervals = [0, 3, 4, 7, 10, 11];

    const highlightSet = new Set();
    if (options.cagedShape !== "none") {
      const shape = Theory.CAGED_SHAPES[options.cagedShape]; const anchor = shape[0].s;
      for (let f = 0; f <= 24; f++) {
        if ((tuning[anchor] + f) % 12 === rootIdx) {
          shape.forEach((off) => { if (f + off.f >= 0 && f + off.f <= 24) highlightSet.add(`${off.s}-${f + off.f}`); });
        }
      }
    }

    this.el.querySelectorAll(".note-circle").forEach((c) => {
      const noteIdx = parseInt(c.dataset.noteIndex);
      const interval = (noteIdx - rootIdx + 12) % 12;
      const inScale = scale.includes(interval);
      const inArp = inScale && (arpIntervals.includes(interval) ||
        (options.add9 && interval === 2) ||
        (options.add11 && interval === 5) ||
        (options.add13 && interval === 9));

      const sIndex = parseInt(c.dataset.stringIndex);
      const fIndex = parseInt(c.dataset.fretIndex);
      const posKey = `${sIndex}-${fIndex}`;
      const isManualHighlight = options.manualNotes.has(posKey);
      const isIntervalHighlighted = options.highlightedIntervals.has(interval);
      const isCustomVisible = options.customScaleMap.has(posKey);

      c.className = "note-circle"; c.innerText = "";
      c.style.backgroundColor = ""; c.style.opacity = ""; c.style.visibility = "";
      c.style.pointerEvents = ""; c.style.transform = ""; c.style.transition = "";
      let isVisible = explorerMode === 'custom' ? isCustomVisible : inScale;
      let isHighlighted = explorerMode === 'highlight' && (isManualHighlight || isIntervalHighlighted);

      if (isVisible) {
        const color = Theory.INTERVAL_COLORS[interval]; c.style.backgroundColor = color.color;
        c.innerText = options.notation === "interval" ? color.short : currentNotes[noteIdx];
        c.title = `${currentNotes[noteIdx]} — ${color.label}`;
        if (explorerMode !== 'custom' && options.soloArp && !inArp) {
          c.classList.add(options.hideUnused ? "note-hidden" : "note-ghost");
        } else {
          c.classList.add("active-note");
          if (isHighlighted) c.classList.add("note-highlighted");
          if (highlightSet.has(posKey)) c.classList.add("shape-note");
          c.style.opacity = "1";
        }
      } else {
        c.classList.add("note-hidden");
      }
    });
  }
}

// --- Progression Manager ---
class ProgressionManager {
  constructor() {
    this.container = document.getElementById("progression-steps");
    this.lastSelectedIndex = -1;
    this._bindDragDrop();
  }

  _bindDragDrop() {
    let dragged = null;
    this.container.addEventListener("dragstart", (e) => { if (e.target.classList.contains("progression-step")) { dragged = e.target; setTimeout(() => e.target.classList.add("dragging"), 0); } });
    this.container.addEventListener("dragend", () => { if (dragged) { dragged.classList.remove("dragging"); dragged = null; this.updateIndices(); app.save(); } });
    this.container.addEventListener("dragover", (e) => { e.preventDefault(); const after = this._getDragAfter(e.clientY); if (dragged) after ? this.container.insertBefore(dragged, after) : this.container.appendChild(dragged); });
  }

  _getDragAfter(y) {
    const els = [...this.container.querySelectorAll(".progression-step:not(.dragging)")];
    return els.reduce((closest, child) => { const box = child.getBoundingClientRect(); const offset = y - box.top - box.height / 2; return offset < 0 && offset > closest.offset ? { offset: offset, element: child } : closest; }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  addStep(data = null) {
    const idx = this.container.children.length; const div = document.createElement("div"); div.className = "progression-step"; div.draggable = true; div.dataset.index = idx;
    const rs = document.getElementById("root-select").cloneNode(true); rs.id = ""; rs.className = "prog-root-select";
    const ss = document.getElementById("scale-select").cloneNode(true); ss.id = ""; ss.className = "scale-select";
    div.innerHTML = `
      <div class="row g-2 w-100 m-0 align-items-center">
        <div class="col-6 col-sm-auto order-1 d-flex align-items-center">
          <span class="step-label">${idx + 1}</span>
        </div>
        <div class="col-6 col-sm-auto order-2 order-sm-3 d-flex justify-content-end">
          <button class="btn-remove-step"><span>×</span></button>
        </div>
        <div class="col-12 col-sm order-3 order-sm-2">
          <div class="row gx-2 gy-2 align-items-center">
            <div class="col-12 col-sm-2 col-lg-1"><div class="nav-group"><label>Key</label></div></div>
            <div class="col-12 col-sm-10 col-lg-4"><div class="nav-group"><label>Scale</label></div></div>
            <div class="col-12 col-sm-7 col-lg-4">
              <div class="row g-1 bg-black bg-opacity-25 p-1 rounded m-0 w-100">
                <div class="col-4"><div class="nav-group"><label>Bars</label><input type="text" class="prog-duration-input" value="${data ? data.bars : 1}" title="Bars"></div></div>
                <div class="col-4"><div class="nav-group"><label>Beats</label><input type="number" class="prog-beats-input" value="${data ? data.beats : 4}" title="Beats"></div></div>
                <div class="col-4"><div class="nav-group"><label>Den</label>
                  <select class="prog-denominator-input w-100">
                    <option value="2" ${data && data.denominator == 2 ? 'selected' : ''}>2</option>
                    <option value="4" ${!data || data.denominator == 4 ? 'selected' : ''}>4</option>
                    <option value="8" ${data && data.denominator == 8 ? 'selected' : ''}>8</option>
                    <option value="16" ${data && data.denominator == 16 ? 'selected' : ''}>16</option>
                  </select>
                </div></div>
              </div>
            </div>
            <div class="col-12 col-sm-5 col-lg-3">
              <div class="row g-1 m-0 w-100">
                <div class="col-8 p-0 pe-1"><div class="nav-group"><label>Chord</label><input type="text" class="prog-chord-name" value="${data ? data.chordName || "" : ""}" placeholder="Chord"><input type="hidden" class="prog-chord-intervals" value="${data ? data.chordIntervals || "" : ""}"></div></div>
                <div class="col-4 p-0"><div class="nav-group"><label>Oct</label><input type="number" class="prog-chord-octave" value="${data ? data.chordOctave || 4 : 4}" title="Octave"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    const groups = div.querySelectorAll(".nav-group");
    groups[0].appendChild(rs);
    groups[1].appendChild(ss);
    if (data && data.root) rs.value = data.root;
    if (data && data.scale) ss.value = data.scale;

    div.querySelectorAll("select, input").forEach((el) => {
      el.onchange = () => { this._syncData(el); app.save(); };
      el.oninput = (e) => this._syncData(e.target);
    });

    div.querySelector(".btn-remove-step").onclick = () => { div.remove(); this.updateIndices(); app.save(); };
    div.onclick = (e) => this._handleClick(e, div);
    this.container.appendChild(div); if (!data) app.save();
  }

  _syncData(source) {
    const step = source.closest(".progression-step");
    if (!step.classList.contains("selected")) return;
    const val = source.value;
    const cls = source.className;
    document.querySelectorAll(`.progression-step.selected .${cls}`).forEach((el) => {
      if (el !== source) el.value = val;
    });
  }

  _handleClick(e, div) {
    if (["INPUT", "SELECT", "BUTTON"].includes(e.target.tagName)) return;
    const idx = parseInt(div.dataset.index);
    if (e.shiftKey && this.lastSelectedIndex !== -1) {
      const els = this.container.children;
      const start = Math.min(this.lastSelectedIndex, idx);
      const end = Math.max(this.lastSelectedIndex, idx);
      if (!e.ctrlKey) this.deselectAll();
      for (let i = start; i <= end; i++) els[i].classList.add("selected");
      return;
    } else if (e.ctrlKey) {
      div.classList.toggle("selected"); this.lastSelectedIndex = idx; return;
    }
    if (!e.ctrlKey) this.deselectAll();
    div.classList.add("selected"); this.lastSelectedIndex = idx;
  }

  updateIndices() {
    Array.from(this.container.children).forEach((el, i) => { el.dataset.index = i; el.querySelector(".step-label").textContent = i + 1; });
  }

  deselectAll() { this.container.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected")); }
  getSteps() { return Array.from(this.container.children); }

  transpose(semitones) {
    const steps = this.getSteps();
    const selected = steps.filter(s => s.classList.contains("selected"));
    const targets = selected.length ? selected : steps;
    const accidental = document.getElementById("accidental-select").value;
    const notes = accidental === "#" ? Theory.NOTES : Theory.NOTES_FLAT;
    
    const getNoteIdx = (n) => {
      let i = Theory.NOTES.indexOf(n);
      return i === -1 ? Theory.NOTES_FLAT.indexOf(n) : i;
    };

    targets.forEach((step) => {
      const rootSel = step.querySelector(".prog-root-select");
      const rIdx = getNoteIdx(rootSel.value);
      if (rIdx !== -1) {
        let nrIdx = (rIdx + semitones) % 12;
        if (nrIdx < 0) nrIdx += 12;
        rootSel.value = notes[nrIdx];
      }

      const inp = step.querySelector(".prog-chord-name");
      const match = inp.value.trim().match(/^([A-G][#b]?)(.*)/);
      if (match) {
        const cIdx = getNoteIdx(match[1]);
        if (cIdx !== -1) {
          let ncIdx = (cIdx + semitones) % 12;
          if (ncIdx < 0) ncIdx += 12;
          inp.value = notes[ncIdx] + match[2];
        }
      }
    });
    app.save();
  }

  transposeOctave(delta) {
    const steps = this.getSteps();
    const selected = steps.filter(s => s.classList.contains("selected"));
    const targets = selected.length ? selected : steps;
    targets.forEach((step) => {
      const inp = step.querySelector(".prog-chord-octave");
      let val = parseInt(inp.value) + delta;
      inp.value = Math.max(1, Math.min(7, val));
    });
    app.save();
  }

  clear(skipSave = false) { this.container.innerHTML = ""; if (!skipSave) app.save(); }
}

// --- Playback Engine ---
class PlaybackEngine {
  constructor(audio, manager) { 
    this.audio = audio; this.manager = manager; this.isPlaying = false; 
    this.currentStepIndex = 0; this.nextNoteTime = 0; this.timerId = null; 
    this.beatsRemaining = 0; this.beatInBar = 0; this.tapTimes = []; 
    this.isCountingDown = false; this.countdownRemaining = 0;
  }
  toggle() { this.isPlaying ? this.stop() : this.play(); }
  play() {
    this.audio.init();
    this.isPlaying = true;
    this.currentStepIndex = -1;
    this.beatsRemaining = 0;
    this.beatInBar = 0;
    this.isCountingDown = true;
    this.countdownRemaining = 4;
    this.nextNoteTime = this.audio.context.currentTime;

    const fretboard = document.querySelector(".scroll-wrapper");
    if (fretboard) fretboard.scrollIntoView({ behavior: 'smooth', block: 'center' });

    this._scheduler();
  }
  stop() { 
    this.isPlaying = false; this.audio.stopAll(); cancelAnimationFrame(this.timerId); 
    document.querySelectorAll(".active-step").forEach((el) => el.classList.remove("active-step"));
    document.getElementById("countdown-overlay").style.display = "none";
  }
  _scheduler() {
    if (!this.isPlaying) return;
    while (this.nextNoteTime < this.audio.context.currentTime + 0.1) {
      this._runBeat(this.nextNoteTime);
      const steps = this.manager.getSteps();
      const step = steps[this.currentStepIndex] || steps[0];
      const bpm = parseInt(document.getElementById("bpm-input").value) || 120;
      const den = step ? parseInt(step.querySelector(".prog-denominator-input").value) || 4 : 4;
      this.nextNoteTime += (60.0 / bpm) * (4 / den);
    }
    this.timerId = requestAnimationFrame(() => this._scheduler());
  }
  _runBeat(time) {
    const steps = this.manager.getSteps();

    if (this.isCountingDown) {
      const overlay = document.getElementById("countdown-overlay");
      overlay.style.display = "flex";
      overlay.textContent = this.countdownRemaining;
      
      const vol = parseFloat(document.getElementById("metro-vol").value);
      const snd = document.getElementById("metro-sound-select").value;
      this.audio.playClick(time, this.countdownRemaining === 4, vol, snd);
      
      this.countdownRemaining--;
      if (this.countdownRemaining === 0) {
        this.isCountingDown = false;
        setTimeout(() => { if (!this.isPlaying || this.isCountingDown) return; overlay.style.display = "none"; }, 500);
      }
      return;
    }

    if (this.beatsRemaining <= 0) {
      this.currentStepIndex++;
      // Looping logic
      if (document.getElementById("loop-selection").checked) {
        const selected = steps.map((s, i) => (s.classList.contains("selected") ? i : -1)).filter((i) => i !== -1);
        if (selected.length) {
          const min = Math.min(...selected);
          const max = Math.max(...selected);
          if (this.currentStepIndex > max) this.currentStepIndex = min;
          else if (this.currentStepIndex < min) this.currentStepIndex = min;
        } else if (this.currentStepIndex >= steps.length) {
          this.currentStepIndex = 0;
        }
      } else if (this.currentStepIndex >= steps.length) {
        this.currentStepIndex = 0;
      }

      const el = steps[this.currentStepIndex]; if (!el) { this.stop(); return; }
      this.beatInBar = 0;
      document.querySelectorAll(".active-step").forEach((s) => s.classList.remove("active-step")); el.classList.add("active-step");
      document.getElementById("root-select").value = el.querySelector(".prog-root-select").value;
      document.getElementById("scale-select").value = el.querySelector(".scale-select").value;
      app.fretboard.update(app.getUiSettings());
      this.beatsRemaining = parseFloat(el.querySelector(".prog-duration-input").value) * parseInt(el.querySelector(".prog-beats-input").value);
      if (document.getElementById("play-chords-toggle").checked) this._triggerChord(el, time);
    }
    if (document.getElementById("metronome-toggle").checked) {
      const vol = parseFloat(document.getElementById("metro-vol").value);
      const snd = document.getElementById("metro-sound-select").value;
      this.audio.playClick(time, this.beatInBar === 0, vol, snd);
    }
    if (document.getElementById("swing-toggle")?.checked) {
      const bpm = parseInt(document.getElementById("bpm-input").value) || 120;
      const swingStep = steps[this.currentStepIndex];
      const den = swingStep ? parseInt(swingStep.querySelector(".prog-denominator-input").value) || 4 : 4;
      const beatDur = (60.0 / bpm) * (4 / den);
      const vol = parseFloat(document.getElementById("metro-vol").value) * 0.45;
      const snd = document.getElementById("metro-sound-select").value;
      this.audio.playClick(time + beatDur * 0.67, false, vol, snd);
    }
    this.beatsRemaining--;
    const step = steps[this.currentStepIndex];
    if (step) {
      const bpb = parseInt(step.querySelector(".prog-beats-input").value) || 4;
      this.beatInBar = (this.beatInBar + 1) % bpb;
    }
  }

  navigate(dir) {
    const steps = this.manager.getSteps();
    if (!steps.length) return;
    this.currentStepIndex += dir;
    if (this.currentStepIndex >= steps.length) this.currentStepIndex = 0;
    if (this.currentStepIndex < 0) this.currentStepIndex = steps.length - 1;

    document.querySelectorAll(".active-step").forEach((el) => el.classList.remove("active-step"));
    const el = steps[this.currentStepIndex];
    el.classList.add("active-step");

    document.getElementById("root-select").value = el.querySelector(".prog-root-select").value;
    document.getElementById("scale-select").value = el.querySelector(".scale-select").value;
    app.fretboard.update(app.getUiSettings());
    if (this.isPlaying) {
      this.beatsRemaining = 0;
      this.beatInBar = 0;
    }
  }

  _triggerChord(step, time) {
    const rootSelect = step.querySelector(".prog-root-select").value;
    const chordName = step.querySelector(".prog-chord-name").value;
    const intervalStr = step.querySelector(".prog-chord-intervals").value;
    const oct = parseInt(step.querySelector(".prog-chord-octave").value) || 4;
    
    let tones = [];
    let chordRoot = rootSelect;

    if (chordName) {
      const cp = ChordParser.parse(chordName);
      if (cp) {
        chordRoot = cp.root;
        tones = ChordParser.getIntervals(chordName);
      }
    }

    if (tones.length === 0) {
      if (intervalStr) {
        tones = intervalStr.split(",").map(Number);
      } else {
        const s = Theory.SCALES[step.querySelector(".scale-select").value] || Theory.SCALES["Ionio (Maj7)"];
        tones = s.filter((i) => [0, 3, 4, 7, 10, 11].includes(i));
      }
    }

    const bars = parseFloat(step.querySelector(".prog-duration-input").value) || 1;
    const bpb = parseInt(step.querySelector(".prog-beats-input").value) || 4;
    const bpm = parseInt(document.getElementById("bpm-input").value) || 120;
    const den = parseInt(step.querySelector(".prog-denominator-input").value) || 4;
    const dur = (bars * bpb) * (60 / bpm) * (4 / den);
    const vol = parseFloat(document.getElementById("chord-vol-slider").value);
    const snd = document.getElementById("chord-sound-select").value;
    this.audio.playChord(tones, Theory.NOTES.indexOf(chordRoot), time, dur, vol, snd, oct);
  }
  tap() {
    const now = Date.now(); this.tapTimes.push(now); if (this.tapTimes.length > 4) this.tapTimes.shift();
    if (this.tapTimes.length > 1) { const avg = (this.tapTimes[this.tapTimes.length-1] - this.tapTimes[0]) / (this.tapTimes.length - 1); document.getElementById("bpm-input").value = Math.round(60000 / avg); }
  }
}

// --- Chord Parser ---
class ChordParser {
  static parse(chordStr) {
    const match = chordStr.trim().match(/^([A-G][#b]?)(.*)/); if (!match) return null;
    let root = match[1]; const map = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
    return { root: map[root] || root, rest: match[2] };
  }
  static getScale(chordStr, nextChordStr = null, genre = "jazz") {
    const p = this.parse(chordStr); if (!p) return "Ionio (Maj7)"; const r = p.rest;
    // Check most-specific types first to avoid prefix collisions
    if (r.includes("m7b5") || r.includes("ø")) return "Locrio";
    if (r.includes("mMaj")) return "Minore Melodica";
    if (r.includes("alt")) return "Altered (7alt)";
    if (r.includes("dim")) return "Diminuita (T/S)";
    const isMaj7 = r.includes("maj7") || r.includes("Maj7");
    const isMinor = !isMaj7 && (r.match(/m(?!aj)/i) !== null || r.includes("min"));
    const isDom7  = !isMinor && !isMaj7 && r.includes("7");
    if (nextChordStr && isDom7) {
      const nextP = this.parse(nextChordStr);
      if (nextP) {
        const ri = Theory.NOTES.indexOf(p.root);
        const ni = Theory.NOTES.indexOf(nextP.root);
        if (ri !== -1 && ni !== -1 && (ni - ri + 12) % 12 === 5) {
          return (nextP.rest.includes("m") && !nextP.rest.includes("maj") && !nextP.rest.includes("Maj"))
            ? "Misolidio b13" : "Misolidio (7)";
        }
      }
    }
    if (genre === "blues" && (isDom7 || isMinor)) return "Blues";
    if (isMaj7) return r.includes("#11") ? "Lidio (Maj7#11)" : "Ionio (Maj7)";
    if (isMinor) return "Dorico (m7)";
    if (isDom7) return "Misolidio (7)";
    return "Ionio (Maj7)";
  }
  static getIntervals(chordStr) {
    const p = this.parse(chordStr);
    if (!p) return [0, 4, 7];
    const r = p.rest;
    let ints = [0];
    let third = r.match(/m(?!aj)|-|min/) ? 3 : 4;
    let fifth = (r.includes("dim") || r.includes("°") || r.includes("b5")) ? 6 : 7;
    let seventh = null;
    if (r.includes("mMaj") || r.includes("maj7")) seventh = 11;
    else if (r.includes("7")) seventh = r.includes("dim7") ? 9 : 10;
    ints.push(third, fifth);
    if (seventh !== null) ints.push(seventh);
    if (r.includes("b9")) ints.push(1);
    if (r.includes("9") && !r.includes("b9") && !r.includes("#9")) ints.push(2);
    if (r.includes("11") && !r.includes("#11")) ints.push(5);
    if (r.includes("#11")) ints.push(6);
    if (r.includes("13")) ints.push(9);
    return [...new Set(ints)].sort((a, b) => a - b);
  }
}

// --- Interval Learner Engine ---
class IntervalLearner {
  constructor(app) {
    this.app = app;
    this.active = false;
    this.root = 0;
    this.targetInterval = 0;
    this.score = 0;
    this.total = 0;
  }

  reset() {
    this.score = 0; this.total = 0; this.active = false;
    document.getElementById('score-display').innerText = "0 / 0";
    document.getElementById('question-text').innerText = T('il.ready');
    document.getElementById('game-status').innerText = T('il.status');
    if (this.app.currentView === 'interval-learner') {
        this.updateBoard();
    } else {
        this.app.fretboard.update(this.app.getUiSettings());
    }
  }

  start() {
    this.active = true;
    this._descending = document.getElementById('il-descending')?.checked || false;
    this.root = Math.floor(Math.random() * 12);
    this.targetInterval = Math.floor(Math.random() * 11) + 1;
    const intInfo = Theory.INTERVAL_COLORS[this.targetInterval];
    const rootName = Theory.NOTES[this.root];
    const dirStr = this._descending ? ` ↓` : '';
    document.getElementById('question-text').innerText = `${T('il.find-prefix')}: ${intInfo.label} ${T('il.find-of')} ${rootName}${dirStr}`;
    document.getElementById('game-status').innerText = T('il.click-status');

    // Feedback Audio: Inizializza l'audio e suona la Root come riferimento
    this.app.audio.init();
    const sound = "Electric Piano";
    const vol = 0.2;
    this.app.audio.playChord([0], this.root, this.app.audio.context.currentTime, 1, vol, sound, 3);

    this.updateBoard();
  }

  updateBoard() {
    this.app.fretboard.el.querySelectorAll(".note-circle").forEach(c => {
      const nIdx = parseInt(c.dataset.noteIndex);
      c.className = "note-circle";
      c.innerText = "";
      c.style.transition = "none";
      c.style.transform = "scale(1)";
      c.style.backgroundColor = "";
      c.style.pointerEvents = "auto";
      c.style.display = "flex";
      c.style.visibility = "visible";

      if (nIdx === this.root) {
        c.style.backgroundColor = Theory.INTERVAL_COLORS[0].color;
        c.innerText = "R";
        c.style.opacity = "1";
        c.style.color = "rgba(0,0,0,0.8)";
      } else {
        c.style.opacity = "0.04";
      }
    });
  }

  checkAnswer(circle) {
    this.app.audio.init();
    const sound = "Electric Piano";
    const vol = 0.2;
    const now = this.app.audio.context.currentTime;

    const stringEl = circle.closest(".string");
    const fretEl = circle.closest(".fret");
    if (!stringEl || !fretEl) return;

    const s = parseInt(stringEl.className.match(/s(\d)/)[1]) - 1;
    const f = parseInt(fretEl.className.match(/fret-(\d+)/)[1]);
    const stringBaseOctaves = [4, 3, 3, 3, 2, 2]; // Ottave standard per Mi cantino, Si, Sol, Re, La, Mi basso
    const tuning = Theory.TUNINGS[this.app.getUiSettings().tuningName] || Theory.TUNINGS["E Standard"];
    const totalHalfSteps = tuning[s] + f;
    
    let actualOctave = stringBaseOctaves[s] + Math.floor(totalHalfSteps / 12);
    const actualNoteIdx = totalHalfSteps % 12;

    this.app.audio.playChord([0], actualNoteIdx, now, 0.8, vol, sound, actualOctave);

    // Se il gioco non è attivo (es. già risposto o non iniziato), non processare il punteggio
    if (!this.active) return;

    const noteIdx = parseInt(circle.dataset.noteIndex);
    const clickedInterval = this._descending
      ? (this.root - noteIdx + 12) % 12
      : (noteIdx - this.root + 12) % 12;

    this.total++;
    this.active = false; // Disabilita la valutazione per i click successivi su questo step

    circle.style.transition = "all 0.2s ease";
    if (clickedInterval === this.targetInterval) {
      this.score++;
      circle.style.backgroundColor = "#2ecc71";
      circle.style.opacity = "1";
      circle.style.color = "rgba(0,0,0,0.8)";
      circle.innerText = Theory.INTERVAL_COLORS[clickedInterval].short;
      document.getElementById('game-status').innerText = T('il.correct');
    } else {
      circle.style.backgroundColor = "#e74c3c";
      circle.style.opacity = "1";
      circle.style.color = "rgba(0,0,0,0.8)";
      circle.innerText = Theory.INTERVAL_COLORS[clickedInterval] ? Theory.INTERVAL_COLORS[clickedInterval].short : "?";
      document.getElementById('game-status').innerText = T('il.wrong');
      this.revealCorrect();

      // Se ha sbagliato, suona la nota corretta dopo un breve intervallo (0.8s) per confronto
      const targetNote = this._descending
        ? (this.root - this.targetInterval + 12) % 12
        : (this.root + this.targetInterval) % 12;
      this.app.audio.playChord([0], targetNote, now + 0.8, 1.2, vol, sound, actualOctave);
    }
    document.getElementById('score-display').innerText = `${this.score} / ${this.total}`;
  }

  revealCorrect() {
    const targetNote = this._descending
      ? (this.root - this.targetInterval + 12) % 12
      : (this.root + this.targetInterval) % 12;
    this.app.fretboard.el.querySelectorAll(".note-circle").forEach(c => {
      if (parseInt(c.dataset.noteIndex) === targetNote) {
        c.style.transition = "all 0.2s ease";
        c.classList.add("note-highlighted");
        c.style.backgroundColor = Theory.INTERVAL_COLORS[this.targetInterval].color;
        c.innerText = Theory.INTERVAL_COLORS[this.targetInterval].short;
        c.style.color = "rgba(0,0,0,0.8)";
        c.style.opacity = "1";
        c.style.pointerEvents = "auto";
      }
    });
  }

  replay() {
    if (this.root === undefined) return;
    this.app.audio.init();
    this.app.audio.playChord([0], this.root, this.app.audio.context.currentTime, 1, 0.2, "Electric Piano", 3);
  }
}

// --- Grade Learner Engine ---
class GradeLearner {
  constructor(app) {
    this.app = app;
    this.active = false;
    this.root = 0;
    this.targetGrade = 0;
    this.score = 0;
    this.total = 0;
  }

  initUI() {
    const container = document.getElementById('note-circle-ui');
    if (!container) return;
    container.innerHTML = '';
    const radius = 135;
    const centerX = 160;
    const centerY = 160;

    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const noteBtn = document.createElement('div');
      noteBtn.className = 'circle-note';
      noteBtn.style.left = `${x}px`;
      noteBtn.style.top = `${y}px`;
      noteBtn.dataset.index = i;
      noteBtn.innerHTML = `<span>${Theory.NOTES[i]}</span><span class="ita">${Theory.NOTES_ITA[i]}</span>`;
      noteBtn.onclick = () => this.checkAnswer(i, noteBtn);
      container.appendChild(noteBtn);
    }
  }

  reset() {
    this.score = 0; this.total = 0; this.active = false;
    document.getElementById('grade-score-display').innerText = "0 / 0";
    document.getElementById('grade-question-text').innerText = T('gl.ready');
    document.getElementById('grade-game-status').innerText = T('gl.status');
    this.clearHighlights();
  }

  start() {
    this.active = true;
    this.clearHighlights();

    const settings = this.app.getUiSettings();
    this.root = Theory.NOTES.indexOf(settings.root);
    const freeMode = document.getElementById('gl-free-mode')?.checked;

    if (freeMode) {
      // Modalità libera: root e scala casuali
      this.root = Math.floor(Math.random() * 12);
      const scaleNames = Object.keys(Theory.SCALES);
      const randomScaleName = scaleNames[Math.floor(Math.random() * scaleNames.length)];
      const scale = Theory.SCALES[randomScaleName];
      const degreeIdx = Math.floor(Math.random() * scale.length);
      this.targetGrade = scale[degreeIdx];
      const rootName = window.currentLang === 'en' ? Theory.NOTES[this.root] : Theory.NOTES_ITA[this.root];
      document.getElementById('grade-question-text').innerText = window.currentLang === 'en'
        ? `Degree ${degreeIdx + 1} of ${rootName} ${randomScaleName}`
        : `${degreeIdx + 1}° grado di ${rootName} ${randomScaleName}`;
      document.getElementById('grade-game-status').innerText = window.currentLang === 'en'
        ? `Find degree ${degreeIdx + 1} of the scale.`
        : `Trova il ${degreeIdx + 1}° grado della scala.`;
    } else {
      const scale = Theory.SCALES[settings.scaleName];
      const degreeIdx = Math.floor(Math.random() * scale.length);
      this.targetGrade = scale[degreeIdx];
      const _rootName = window.currentLang === 'en' ? Theory.NOTES[this.root] : Theory.NOTES_ITA[this.root];
      document.getElementById('grade-question-text').innerText = window.currentLang === 'en'
        ? `Degree ${degreeIdx + 1} of ${_rootName} ${settings.scaleName}`
        : `${degreeIdx + 1}° grado di ${_rootName} ${settings.scaleName}`;
      document.getElementById('grade-game-status').innerText = window.currentLang === 'en'
        ? `Find the note at degree ${degreeIdx + 1} of the scale.`
        : `Trova la nota corrispondente al ${degreeIdx + 1}° grado della scala.`;
    }

    this.app.audio.init();
    const playNote = this.root;
    this.app.audio.playChord([0], playNote, this.app.audio.context.currentTime, 0.8, 0.2, "Electric Piano", 4);
    this._lastPlayNote = playNote;
  }

  replay() {
    if (this._lastPlayNote === undefined) return;
    this.app.audio.init();
    this.app.audio.playChord([0], this._lastPlayNote, this.app.audio.context.currentTime, 0.8, 0.2, "Electric Piano", 4);
  }

  checkAnswer(index, element) {
    if (!this.active) return;
    this.active = false;
    this.total++;
    const correctNote = (this.root + this.targetGrade) % 12;
    const isCorrect = index === correctNote;
    const now = this.app.audio.context.currentTime;

    if (isCorrect) {
      this.score++;
      element.classList.add('correct');
      document.getElementById('grade-game-status').innerText = T('gl.correct');
      this.app.audio.playChord([0], index, now, 0.8, 0.2, "Electric Piano", 4);
    } else {
      element.classList.add('wrong');
      document.getElementById('grade-game-status').innerText = T('gl.wrong');
      this.revealCorrect(correctNote);
      this.app.audio.playChord([0], index, now, 0.4, 0.2, "Electric Piano", 4);
      this.app.audio.playChord([0], correctNote, now + 0.5, 0.8, 0.2, "Electric Piano", 4);
    }
    document.getElementById('grade-score-display').innerText = `${this.score} / ${this.total}`;
  }

  revealCorrect(index) {
    document.querySelectorAll('.circle-note').forEach(n => {
      if (parseInt(n.dataset.index) === index) n.classList.add('correct');
    });
  }

  clearHighlights() {
    document.querySelectorAll('.circle-note').forEach(n => {
      n.classList.remove('correct', 'wrong');
    });
  }
}

// --- Note Finder Game ---
class NoteFinder {
  constructor(app) {
    this.app = app;
    this.active = false;
    this.targetNote = 0;
    this.score = 0;
    this.total = 0;
  }

  reset() {
    this.score = 0; this.total = 0; this.active = false;
    document.getElementById('note-finder-score').innerText = "0 / 0";
    document.getElementById('note-finder-question').innerText = T('nf.ready');
    document.getElementById('note-finder-status').innerText = T('nf.status');
    this.updateBoard();
  }

  start() {
    this.active = true;
    const accidental = document.getElementById('accidental-select').value;
    const notes = accidental === '#' ? Theory.NOTES : Theory.NOTES_FLAT;
    this.targetNote = Math.floor(Math.random() * 12);
    document.getElementById('note-finder-question').innerText = `${T('nf.find-prefix')}: ${notes[this.targetNote]}`;
    document.getElementById('note-finder-status').innerText = T('nf.click-status');
    this.app.audio.init();
    this.app.audio.playChord([0], this.targetNote, this.app.audio.context.currentTime, 0.8, 0.2, "Electric Piano", 4);
    this.updateBoard();
  }

  updateBoard() {
    this.app.fretboard.el.querySelectorAll('.note-circle').forEach(c => {
      c.className = 'note-circle';
      c.innerText = '';
      c.style.transition = 'none';
      c.style.transform = 'scale(1)';
      c.style.backgroundColor = '';
      c.style.pointerEvents = 'auto';
      c.style.display = 'flex';
      c.style.visibility = 'visible';
      c.style.opacity = '0.04';
      c.style.color = 'transparent';
    });
  }

  checkAnswer(circle) {
    this.app.audio.init();
    const noteIdx = parseInt(circle.dataset.noteIndex);
    const s = parseInt(circle.closest(".string").className.match(/s(\d)/)[1]) - 1;
    const f = parseInt(circle.closest(".fret").className.match(/fret-(\d+)/)[1]);
    const stringBaseOctaves = [4, 3, 3, 3, 2, 2];
    const tuning = Theory.TUNINGS[this.app.getUiSettings().tuningName] || Theory.TUNINGS["E Standard"];
    const actualOctave = stringBaseOctaves[s] + Math.floor((tuning[s] + f) / 12);
    this.app.audio.playChord([0], noteIdx, this.app.audio.context.currentTime, 0.8, 0.2, "Electric Piano", actualOctave);

    if (!this.active) return;
    this.active = false;
    this.total++;

    const accidental = document.getElementById('accidental-select').value;
    const notes = accidental === '#' ? Theory.NOTES : Theory.NOTES_FLAT;

    circle.style.transition = "all 0.2s ease";
    if (noteIdx === this.targetNote) {
      this.score++;
      circle.style.backgroundColor = "#2ecc71";
      circle.style.opacity = "1";
      circle.style.color = "rgba(0,0,0,0.8)";
      circle.innerText = notes[noteIdx];
      document.getElementById('note-finder-status').innerText = T('nf.correct');
      this.revealCorrect(notes); // mostra tutte le posizioni corrette anche in caso di risposta esatta
    } else {
      circle.style.backgroundColor = "#e74c3c";
      circle.style.opacity = "1";
      circle.style.color = "rgba(0,0,0,0.8)";
      circle.innerText = notes[noteIdx];
      document.getElementById('note-finder-status').innerText = T('nf.wrong');
      this.revealCorrect(notes);
    }
    document.getElementById('note-finder-score').innerText = `${this.score} / ${this.total}`;
  }

  replay() {
    if (this.targetNote === undefined || this.targetNote === null) return;
    this.app.audio.init();
    this.app.audio.playChord([0], this.targetNote, this.app.audio.context.currentTime, 0.8, 0.2, "Electric Piano", 4);
  }

  revealCorrect(notes) {
    this.app.fretboard.el.querySelectorAll('.note-circle').forEach(c => {
      if (parseInt(c.dataset.noteIndex) === this.targetNote) {
        c.style.transition = "all 0.2s ease";
        c.style.backgroundColor = "#2ecc71";
        c.style.opacity = "1";
        c.innerText = notes[this.targetNote];
        c.style.color = "rgba(0,0,0,0.8)";
        c.style.pointerEvents = 'auto';
      }
    });
  }
}

// --- Mode A: Chord Voicing Explorer ---
class ChordVoicingExplorer {
  static CHORD_DATA = {
    'maj7':   { intervals:[0,4,7,11],   scale:'Ionio (Maj7)',          desc_it:'Stabile e luminoso. Su: Imaj7, IVmaj7.',       desc_en:'Stable, bright. Over: Imaj7, IVmaj7.' },
    'm7':     { intervals:[0,3,7,10],   scale:'Dorico (m7)',           desc_it:'Caldo jazz. Su: iim7, vim7.',                  desc_en:'Warm jazz. Over: iim7, vim7.' },
    '7':      { intervals:[0,4,7,10],   scale:'Misolidio (7)',         desc_it:'Tensione, vuole risolvere. Su: V7.',           desc_en:'Tension, wants to resolve. Over: V7.' },
    '7alt':   { intervals:[0,4,6,10],   scale:'Altered (7alt)',        desc_it:'Massima tensione alterata. Su: V7alt.',        desc_en:'Max altered tension. Over: V7alt.' },
    'm7b5':   { intervals:[0,3,6,10],   scale:'Locrio',                desc_it:'Scuro. Su: iim7b5 nel minore.',                desc_en:'Dark. Over: iim7b5 in minor.' },
    'dim7':   { intervals:[0,3,6,9],    scale:'Diminuita (T/S)',       desc_it:'Massima tensione. Accordo simmetrico.',        desc_en:'Maximum tension. Symmetric chord.' },
    'maj9':   { intervals:[0,4,7,11,2], scale:'Ionio (Maj7)',          desc_it:'Luminoso con colore. Maj7 + 9a.',              desc_en:'Bright with color. Maj7 + 9th.' },
    '9':      { intervals:[0,4,7,10,2], scale:'Misolidio (7)',         desc_it:'Suono dominante ricco.',                      desc_en:'Rich dominant sound.' },
    'm9':     { intervals:[0,3,7,10,2], scale:'Dorico (m7)',           desc_it:'Colore minore lussureggiante.',               desc_en:'Lush minor color.' },
    '13':     { intervals:[0,4,9,10],   scale:'Misolidio (7)',         desc_it:'Suono dominante completo con 13a.',            desc_en:'Full dominant sound with 13th.' },
    'mMaj7':  { intervals:[0,3,7,11],   scale:'Minore Melodica',       desc_it:'Misterioso. Im(maj7), jazz moderno.',          desc_en:'Mysterious. Im(maj7), modern jazz.' },
    'maj7#11':{ intervals:[0,4,7,11,6], scale:'Lidio (Maj7#11)',       desc_it:'Fluttuante, onirico. Lidio è perfetto.',       desc_en:'Floating, dreamy. Lydian is perfect.' },
  };

  constructor(app) { this.app = app; this._ready = false; }

  init() {
    ['cv-root-select', 'sn-root-select'].forEach(id => {
      const sel = document.getElementById(id);
      if (sel && !sel.options.length) Theory.NOTES.forEach(n => sel.add(new Option(n, n)));
    });
    if (!this._ready) {
      document.getElementById('cv-root-select')?.addEventListener('change', () => this.render());
      document.getElementById('cv-chord-select')?.addEventListener('change', () => this.render());
      document.getElementById('sn-root-select')?.addEventListener('change', () => app.scaleNavigator.render());
      document.getElementById('sn-chord-select')?.addEventListener('change', () => app.scaleNavigator.render());
      this._ready = true;
    }
    this.render();
  }

  render() {
    const rootName = document.getElementById('cv-root-select')?.value || 'C';
    const chordType = document.getElementById('cv-chord-select')?.value || 'maj7';
    const chord = ChordVoicingExplorer.CHORD_DATA[chordType];
    if (!chord) return;
    const rootIdx = Theory.NOTES.indexOf(rootName);

    const nameEl = document.getElementById('cv-chord-name');
    if (nameEl) nameEl.textContent = `${rootName}${chordType}`;

    const intEl = document.getElementById('cv-intervals');
    if (intEl) {
      intEl.innerHTML = chord.intervals.map(iv => {
        const col = Theory.INTERVAL_COLORS[iv];
        const note = Theory.NOTES[(rootIdx + iv) % 12];
        return `<div class="cv-int-badge"><div class="cv-int-dot" style="background:${col.color};color:${[3,7].includes(iv)?'#000':'#fff'}">${col.short}</div><span>${note}</span></div>`;
      }).join('');
    }

    const descEl = document.getElementById('cv-desc');
    if (descEl) descEl.textContent = window.currentLang === 'it' ? chord.desc_it : chord.desc_en;

    const scaleEl = document.getElementById('cv-scale-rec');
    if (scaleEl) scaleEl.textContent = chord.scale;

    // Chord diagrams (diteggiatura)
    const diagEl = document.getElementById('cv-chord-diagrams');
    if (diagEl) {
      const diagrams = getChordDiagrams(rootIdx, chordType);
      diagEl.innerHTML = diagrams.map(d => `
        <div class="chord-diagram-wrap">
          ${renderChordDiagramSVG(d.frets, d.fingers, d.baseFret, '')}
          <div class="chord-diagram-label">${d.label}</div>
        </div>`).join('');
    }
  }

  load() {
    const rootName = document.getElementById('cv-root-select')?.value || 'C';
    const chordType = document.getElementById('cv-chord-select')?.value || 'maj7';
    const chord = ChordVoicingExplorer.CHORD_DATA[chordType];
    if (!chord) return;
    document.getElementById('root-select').value = rootName;
    document.getElementById('scale-select').value = chord.scale;
    document.getElementById('solo-arpeggio').checked = true;
    this.app.switchView('explorer');
    this.app.fretboard.update(this.app.getUiSettings());
  }
}

// --- Mode B: Ear Trainer ---
class EarTrainer {
  constructor(app) {
    this.app = app;
    this.score = 0; this.total = 0; this.streak = 0;
    this.currentChord = null; this.currentRoot = null;
    this.difficulty = 'easy';
    this.CHORD_SETS = {
      easy:   ['maj7','m7','7'],
      medium: ['maj7','m7','7','m7b5','dim7'],
      hard:   ['maj7','m7','7','m7b5','dim7','mMaj7','7alt'],
    };
    this.INTERVALS = {
      'maj7':[0,4,7,11], 'm7':[0,3,7,10], '7':[0,4,7,10],
      'm7b5':[0,3,6,10], 'dim7':[0,3,6,9], 'mMaj7':[0,3,7,11], '7alt':[0,4,6,10],
    };
    this._history = JSON.parse(localStorage.getItem('et_stats') || '[]');
  }

  reset() {
    this.score = 0; this.total = 0; this.streak = 0;
    document.getElementById('et-score').textContent = '0 / 0';
    document.getElementById('et-streak').textContent = '🔥 0';
    document.getElementById('et-question').textContent = T('et.ready');
    document.getElementById('et-root-hint').textContent = '';
    document.getElementById('et-status').textContent = T('et.status');
    this.currentChord = null;
    this.renderChoices();
  }

  setDifficulty(level, btn) {
    this.difficulty = level;
    document.querySelectorAll('.et-diff-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderChoices();
  }

  renderChoices() {
    const types = this.CHORD_SETS[this.difficulty];
    const container = document.getElementById('et-choices');
    if (!container) return;
    container.innerHTML = '';
    types.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'et-choice-btn';
      btn.textContent = type;
      btn.onclick = () => this.answer(type);
      container.appendChild(btn);
    });
  }

  play() {
    this.app.audio.init();
    const types = this.CHORD_SETS[this.difficulty];
    this.currentRoot = Math.floor(Math.random() * 12);
    this.currentChord = types[Math.floor(Math.random() * types.length)];
    const tones = this.INTERVALS[this.currentChord] || [0,4,7,10];
    this._lastTones = tones;
    this._lastRoot = this.currentRoot;
    document.getElementById('et-question').textContent = '?';
    document.getElementById('et-root-hint').textContent = window.currentLang === 'it' ? '(Ascolta con attenzione...)' : '(Listen carefully...)';
    document.querySelectorAll('.et-choice-btn').forEach(b => { b.classList.remove('correct','wrong'); b.disabled = false; });
    this.app.audio.playChord(tones, this.currentRoot, this.app.audio.context.currentTime + 0.05, 1.5, 0.25, "Electric Piano", 4);
    document.getElementById('et-status').textContent = T('et.listening');
  }

  replay() {
    if (!this._lastTones) return;
    this.app.audio.init();
    this.app.audio.playChord(this._lastTones, this._lastRoot, this.app.audio.context.currentTime + 0.05, 1.5, 0.25, "Electric Piano", 4);
  }

  answer(guessedType) {
    if (!this.currentChord) return;
    this.total++;
    const correct = guessedType === this.currentChord;
    const rootName = Theory.NOTES[this.currentRoot];
    if (correct) { this.score++; this.streak++; document.getElementById('et-status').textContent = T('et.correct'); }
    else { this.streak = 0; document.getElementById('et-status').textContent = `${T('et.wrong')} ${rootName}${this.currentChord}`; }
    document.getElementById('et-score').textContent = `${this.score} / ${this.total}`;
    document.getElementById('et-streak').textContent = `🔥 ${this.streak}`;
    document.getElementById('et-question').textContent = `${rootName}${this.currentChord}`;
    document.getElementById('et-root-hint').textContent = '';
    document.querySelectorAll('.et-choice-btn').forEach(b => {
      if (b.textContent === this.currentChord) b.classList.add('correct');
      else if (b.textContent === guessedType && !correct) b.classList.add('wrong');
      b.disabled = true;
    });
    const tones = this.INTERVALS[this.currentChord] || [0,4,7,10];
    this.app.audio.playChord(tones, this.currentRoot, this.app.audio.context.currentTime + 0.05, 1.0, 0.25, "Electric Piano", 4);
    this._history.push({ chord: this.currentChord, correct });
    if (this._history.length > 200) this._history.splice(0, this._history.length - 200);
    localStorage.setItem('et_stats', JSON.stringify(this._history));
    this._renderHistory();
    this.currentChord = null;
  }

  _renderHistory() {
    const panel = document.getElementById('et-history-panel');
    if (!panel) return;
    const types = [...new Set(this._history.map(h => h.chord))].sort();
    if (!types.length) { panel.innerHTML = `<div style="color:#666;font-size:0.85em;text-align:center;">${T('et.history')}</div>`; return; }
    let html = `<div style="font-size:0.75em;text-transform:uppercase;color:#777;font-weight:700;margin-bottom:8px;">${T('et.history')}</div>`;
    types.forEach(chord => {
      const entries = this._history.filter(h => h.chord === chord);
      const correct = entries.filter(h => h.correct).length;
      const pct = Math.round((correct / entries.length) * 100);
      const barColor = pct >= 75 ? '#2ecc71' : pct >= 50 ? '#f39c12' : '#e74c3c';
      html += `<div class="et-stat-row">
        <span class="et-stat-type">${chord}</span>
        <div class="et-stat-bar"><div style="width:${pct}%;background:${barColor};height:100%;border-radius:4px;"></div></div>
        <span class="et-stat-pct">${pct}%</span>
        <span class="et-stat-cnt">${correct}/${entries.length}</span>
      </div>`;
    });
    panel.innerHTML = html;
  }

  clearHistory() {
    this._history = [];
    localStorage.removeItem('et_stats');
    this._renderHistory();
  }
}

// --- Mode F: Interval Ear Training ---
class IntervalEarTrainer {
  constructor(app) {
    this.app = app;
    this.score = 0; this.total = 0; this.streak = 0;
    this.currentRoot = 0; this.currentInterval = null;
    this.difficulty = 'easy'; this.answered = false;
    this.POOLS = {
      easy:   [0, 4, 5, 7, 12],
      medium: [0, 2, 3, 4, 5, 7, 9, 12],
      hard:   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
    this.NAMES_IT = {
      0:'Unisono (P1)', 1:'Semitono (m2)', 2:'Tono (M2)', 3:'Terza min (m3)',
      4:'Terza Mag (M3)', 5:'Quarta (P4)', 6:'Tritono (TT)', 7:'Quinta (P5)',
      8:'Sesta min (m6)', 9:'Sesta Mag (M6)', 10:'Settima min (m7)', 11:'Settima Mag (M7)',
      12:'Ottava (P8)'
    };
    this.NAMES_EN = {
      0:'Unison (P1)', 1:'Minor 2nd (m2)', 2:'Major 2nd (M2)', 3:'Minor 3rd (m3)',
      4:'Major 3rd (M3)', 5:'Perfect 4th (P4)', 6:'Tritone (TT)', 7:'Perfect 5th (P5)',
      8:'Minor 6th (m6)', 9:'Major 6th (M6)', 10:'Minor 7th (m7)', 11:'Major 7th (M7)',
      12:'Octave (P8)'
    };
  }

  name(semi) {
    return (window.currentLang === 'en' ? this.NAMES_EN : this.NAMES_IT)[semi] || `${semi} st`;
  }

  setDifficulty(d) {
    this.difficulty = d;
    document.querySelectorAll('.iet-diff-btn').forEach(b => b.classList.toggle('active', b.dataset.diff === d));
    this.reset();
  }

  reset() {
    this.score = 0; this.total = 0; this.streak = 0;
    this.currentInterval = null; this.answered = false;
    const el = (id) => document.getElementById(id);
    if (el('iet-score'))    el('iet-score').textContent    = '0 / 0';
    if (el('iet-streak'))   el('iet-streak').textContent   = '🔥 0';
    if (el('iet-status'))   el('iet-status').textContent   = T('iet.ready');
    if (el('iet-question')) el('iet-question').textContent = '?';
    this.renderChoices();
  }

  renderChoices() {
    const grid = document.getElementById('iet-choices');
    if (!grid) return;
    grid.innerHTML = '';
    this.POOLS[this.difficulty].forEach(semi => {
      const btn = document.createElement('button');
      btn.className = 'et-choice-btn iet-choice-btn';
      btn.textContent = this.name(semi);
      btn.dataset.semi = semi;
      btn.onclick = () => this.guess(semi);
      grid.appendChild(btn);
    });
  }

  play() {
    const pool = this.POOLS[this.difficulty];
    this.currentRoot     = Math.floor(Math.random() * 12);
    this.currentInterval = pool[Math.floor(Math.random() * pool.length)];
    this.answered = false;
    document.querySelectorAll('.iet-choice-btn').forEach(b => { b.disabled = false; b.classList.remove('correct','wrong'); });
    document.getElementById('iet-question').textContent = '?';
    document.getElementById('iet-status').textContent   = T('iet.listening');
    this._playSeq();
  }

  _playSeq() {
    const root  = this.currentRoot;
    const semi  = this.currentInterval;
    const top   = (root + semi) % 12;
    const topOct = semi >= 12 ? 5 : 4;
    const audio = this.app.audio;
    const harmonicTones = semi === 0 ? [0] : [0, semi];
    setTimeout(() => audio.playChord([0], root, audio.context.currentTime + 0.02, 0.8, 0.25, 'Electric Piano', 4), 0);
    setTimeout(() => audio.playChord([0], top,  audio.context.currentTime + 0.02, 0.8, 0.25, 'Electric Piano', topOct), 800);
    setTimeout(() => audio.playChord(harmonicTones, root, audio.context.currentTime + 0.02, 0.8, 0.4, 'Electric Piano', 4), 1700);
  }

  replay() {
    if (this.currentInterval === null) { this.play(); return; }
    this._playSeq();
  }

  guess(semi) {
    if (this.answered) return;
    this.answered = true;
    this.total++;
    const correct = semi === this.currentInterval;
    if (correct) { this.score++; this.streak++; document.getElementById('iet-status').textContent = T('iet.correct'); }
    else { this.streak = 0; document.getElementById('iet-status').textContent = `${T('iet.wrong')} ${this.name(this.currentInterval)}`; }
    document.getElementById('iet-score').textContent    = `${this.score} / ${this.total}`;
    document.getElementById('iet-streak').textContent   = `🔥 ${this.streak}`;
    document.getElementById('iet-question').textContent = this.name(this.currentInterval);
    document.querySelectorAll('.iet-choice-btn').forEach(b => {
      const s = parseInt(b.dataset.semi);
      if (s === this.currentInterval) b.classList.add('correct');
      else if (s === semi && !correct) b.classList.add('wrong');
      b.disabled = true;
    });
    setTimeout(() => this._playSeq(), 400);
  }
}

// --- Mode C: Scale Navigator ---
class ScaleNavigator {
  static SUGGESTIONS = {
    'maj7':    [
      { scale:'Ionio (Maj7)',           tension:1, it:'Scelta principale. Luminosa e stabile.',              en:'Primary choice. Bright and stable.' },
      { scale:'Lidio (Maj7#11)',         tension:2, it:'Moderna con #11. Più aperta.',                        en:'Modern with #11. More open.' },
      { scale:'Maggiore Pentatonica',   tension:1, it:'Semplice ed efficace. 5 note sicure.',                en:'Simple and effective. 5 safe notes.' },
    ],
    'm7':      [
      { scale:'Dorico (m7)',             tension:1, it:'Scelta jazz principale. Ha la 6a maggiore.',          en:'Main jazz choice. Has major 6th.' },
      { scale:'Minore Naturale (Aeolian)',tension:1,it:'Il minore classico. Più scuro del Dorico.',           en:'Classic minor. Darker than Dorian.' },
      { scale:'Frigio',                  tension:2, it:'Colore flamenco con b9.',                             en:'Flamenco color with b9.' },
      { scale:'Minore Pentatonica',      tension:1, it:'Sempre sicura. 5 note essenziali.',                   en:'Always safe. 5 essential notes.' },
    ],
    '7':       [
      { scale:'Misolidio (7)',           tension:1, it:'Scelta base. Suono blues/rock.',                      en:'Base choice. Blues/rock sound.' },
      { scale:'Lidio Dominante',         tension:2, it:'Con #11. Suono moderno brillante.',                   en:'With #11. Brilliant modern sound.' },
      { scale:'Blues',                   tension:2, it:'Aggiunge la blue note (b5).',                         en:'Adds the blue note (b5).' },
      { scale:'Diminuita (T/S)',         tension:3, it:'Tensione massima. Su V7b9/V7#9.',                     en:'Maximum tension. On V7b9/V7#9.' },
      { scale:'Altered (7alt)',          tension:3, it:'Tutte le note alterate. Per V7alt→Imaj7.',            en:'All altered tones. For V7alt→Imaj7.' },
    ],
    '7alt':    [
      { scale:'Altered (7alt)',          tension:3, it:'La scelta principale per dominanti alterate.',         en:'Main choice for altered dominants.' },
      { scale:'Diminuita (T/S)',         tension:3, it:'Alternativa simmetrica.',                             en:'Symmetric alternative.' },
    ],
    'm7b5':    [
      { scale:'Locrio',                  tension:3, it:'La scelta canonica. Molto scura.',                    en:'Canonical choice. Very dark.' },
      { scale:'Minore Naturale (Aeolian)',tension:2,it:'Più morbida del Locrio (omette b5).',                 en:'Softer than Locrian (omits b5).' },
    ],
    'dim7':    [
      { scale:'Diminuita (T/S)',         tension:3, it:'Scala simmetrica, perfetta per dim7.',                en:'Symmetric scale, perfect for dim7.' },
    ],
    'mMaj7':   [
      { scale:'Minore Melodica',         tension:2, it:'La scala madre del mMaj7.',                          en:'The parent scale of mMaj7.' },
      { scale:'Minore Armonica',         tension:2, it:'Alternativa con suono orientale.',                   en:'Alternative with Eastern sound.' },
    ],
    'maj7#11': [
      { scale:'Lidio (Maj7#11)',         tension:2, it:'Perfetto per Maj7#11.',                              en:'Perfect for Maj7#11.' },
      { scale:'Ionio (Maj7)',            tension:1, it:'Più stabile, senza #11.',                            en:'More stable, without #11.' },
    ],
  };

  constructor(app) { this.app = app; }

  render() {
    const rootName = document.getElementById('sn-root-select')?.value || 'C';
    const chordType = document.getElementById('sn-chord-select')?.value || 'maj7';
    const suggestions = ScaleNavigator.SUGGESTIONS[chordType] || [];
    const container = document.getElementById('sn-results');
    if (!container) return;
    container.innerHTML = '';
    if (!suggestions.length) { container.innerHTML = `<p style="color:#555">${T('sn.no-results')}</p>`; return; }
    const tColors = ['#27ae60','#f39c12','#e74c3c'];
    const tLabels_it = ['Consonante','Moderata','Tesa'];
    const tLabels_en = ['Consonant','Moderate','Tense'];
    suggestions.forEach(s => {
      const card = document.createElement('div'); card.className = 'sn-scale-card';
      const tc = tColors[s.tension - 1];
      const tl = window.currentLang === 'it' ? tLabels_it[s.tension - 1] : tLabels_en[s.tension - 1];
      card.innerHTML = `
        <div class="sn-scale-info">
          <div class="sn-scale-name">${s.scale}</div>
          <div class="sn-scale-note">${window.currentLang === 'it' ? s.it : s.en}</div>
        </div>
        <div class="sn-scale-actions">
          <span class="sn-tension-badge" style="background:${tc}22;color:${tc};border-color:${tc}55">${tl}</span>
          <button class="btn-io sn-load-btn">${T('sn.load-btn')}</button>
        </div>`;
      // Use closure so rootName and scaleName are captured correctly at click time
      const root = rootName;
      const scale = s.scale;
      card.querySelector('.sn-load-btn').onclick = () => this.loadScale(root, scale);
      container.appendChild(card);
    });
  }

  loadScale(rootName, scaleName) {
    document.getElementById('root-select').value = rootName;
    document.getElementById('scale-select').value = scaleName;
    document.getElementById('solo-arpeggio').checked = false;
    this.app.switchView('explorer');
    this.app.fretboard.update(this.app.getUiSettings());
  }
}

// --- Mode D: Lick Builder ---
class LickBuilder {
  constructor(app) {
    this.app = app;
    this.sequence = [];
    this._playTimers = [];
    this._playId = 0;
    this._isPlaying = false;
    this._speedTimer = null;
    this.DURATIONS = [0.25, 0.5, 1, 2];
    this.DUR_LABELS = { 0.25: '♬16°', 0.5: '♪8°', 1: '♩4°', 2: '𝅗𝅥 2°' };
  }

  addNote(circle) {
    const noteIdx = parseInt(circle.dataset.noteIndex);
    const s = parseInt(circle.closest('.string').className.match(/s(\d)/)[1]) - 1;
    const f = parseInt(circle.closest('.fret').className.match(/fret-(\d+)/)[1]);
    const notes = document.getElementById('accidental-select').value === '#' ? Theory.NOTES : Theory.NOTES_FLAT;
    const defaultSubdiv = parseFloat(document.getElementById('lb-subdiv').value) || 1;
    this.sequence.push({ noteIdx, noteName: notes[noteIdx], s, f, dur: defaultSubdiv });
    this.renderSequence();
    this.app.audio.init();
    const tuning = Theory.TUNINGS[this.app.getUiSettings().tuningName] || Theory.TUNINGS["E Standard"];
    const oct = [4,3,3,3,2,2][s] + Math.floor((tuning[s] + f) / 12);
    this.app.audio.playNoteImmediate(noteIdx, 0.3, 0.15, "Electric Piano", oct);
  }

  cycleDuration(idx) {
    if (idx < 0 || idx >= this.sequence.length) return;
    const note = this.sequence[idx];
    const durIdx = this.DURATIONS.indexOf(note.dur);
    note.dur = this.DURATIONS[(durIdx + 1) % this.DURATIONS.length];
    this.renderSequence();
  }

  removeNote(idx) {
    this.sequence.splice(idx, 1);
    this.renderSequence();
  }

  undo() { this.sequence.pop(); this.renderSequence(); }

  clear() { this.sequence = []; this.renderSequence(); }

  transpose(semitones) {
    if (!this.sequence.length) return;
    const notes = document.getElementById('accidental-select').value === '#' ? Theory.NOTES : Theory.NOTES_FLAT;
    this.sequence = this.sequence.map(note => {
      const newIdx = (note.noteIdx + semitones + 12) % 12;
      return { ...note, noteIdx: newIdx, noteName: notes[newIdx] };
    });
    this.renderSequence();
  }

  startSpeedTrainer() {
    const targetBpm = parseInt(document.getElementById('lb-bpm').value) || 80;
    const startBpm = Math.max(40, targetBpm - 30);
    const display = document.getElementById('lb-speed-display');
    if (this._speedTimer) { clearInterval(this._speedTimer); this._speedTimer = null; }
    let currentBpm = startBpm;
    document.getElementById('lb-bpm').value = currentBpm;
    if (display) display.textContent = `${currentBpm} → ${targetBpm}`;
    this.play();
    this._speedTimer = setInterval(() => {
      currentBpm = Math.min(targetBpm, currentBpm + 5);
      document.getElementById('lb-bpm').value = currentBpm;
      if (display) display.textContent = `${currentBpm} → ${targetBpm}`;
      this.play();
      if (currentBpm >= targetBpm) { clearInterval(this._speedTimer); this._speedTimer = null; if (display) display.textContent = ''; }
    }, 8000);
  }

  exportTab() {
    if (!this.sequence.length) return;
    const tuning = Theory.TUNINGS[this.app.getUiSettings().tuningName] || Theory.TUNINGS["E Standard"];
    const stringNames = ['e','B','G','D','A','E'];
    let lines = stringNames.map(n => n + '|');
    this.sequence.forEach(note => {
      for (let s = 0; s < 6; s++) {
        lines[s] += s === note.s ? String(note.f).padEnd(3, '-') : '---';
      }
    });
    lines = lines.map(l => l + '|');
    const tabText = lines.join('\n');
    const modal = document.getElementById('lb-tab-modal');
    const output = document.getElementById('lb-tab-output');
    if (output) output.textContent = tabText;
    if (modal) modal.style.display = 'flex';
  }

  exportJSON() {
    const data = { sequence: this.sequence, bpm: parseInt(document.getElementById('lb-bpm').value) || 80 };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'lick.json'; a.click();
    URL.revokeObjectURL(url);
  }

  importJSON(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.sequence) { this.sequence = data.sequence; this.renderSequence(); }
        if (data.bpm) document.getElementById('lb-bpm').value = data.bpm;
      } catch { alert(T('err.invalid-json')); }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  renderSequence() {
    const container = document.getElementById('lb-sequence');
    if (!container) return;
    const hint = document.getElementById('lb-empty-hint');
    if (hint) hint.style.display = this.sequence.length ? 'none' : 'inline';
    container.querySelectorAll('.lb-note-pill').forEach(el => el.remove());
    this.sequence.forEach((note, i) => {
      const pill = document.createElement('div');
      pill.className = 'lb-note-pill';
      pill.title = 'Clic: cambia durata';
      pill.onclick = (e) => {
        if (e.target.classList.contains('lb-pill-delete')) return;
        this.cycleDuration(i);
      };
      const del = document.createElement('div');
      del.className = 'lb-pill-delete';
      del.textContent = '✕';
      del.onclick = (e) => { e.stopPropagation(); this.removeNote(i); };
      const durLabel = this.DUR_LABELS[note.dur] || `×${note.dur}`;
      pill.innerHTML = `<span>${note.noteName}</span><small>s${note.s + 1}/f${note.f}</small><div class="lb-pill-dur">${durLabel}</div>`;
      pill.appendChild(del);
      container.appendChild(pill);
    });
  }

  stop() {
    this._playTimers.forEach(t => clearTimeout(t));
    this._playTimers = [];
    this._playId++;
    this._isPlaying = false;
    if (this.app.audio.chordSynth) this.app.audio.chordSynth.releaseAll();
    const stopBtn = document.getElementById('lb-stop-btn');
    if (stopBtn) stopBtn.disabled = true;
  }

  play() {
    if (!this.sequence.length) return;
    this.stop();
    this.app.audio.init();
    const bpm = parseInt(document.getElementById('lb-bpm').value) || 80;
    const sound = document.getElementById('lb-sound')?.value || 'Electric Piano';
    const tuning = Theory.TUNINGS[this.app.getUiSettings().tuningName] || Theory.TUNINGS["E Standard"];
    const loop = document.getElementById('lb-loop')?.checked || false;
    const playId = this._playId;
    this._isPlaying = true;
    const stopBtn = document.getElementById('lb-stop-btn');
    if (stopBtn) stopBtn.disabled = false;
    let delayMs = 100;
    this.sequence.forEach(note => {
      const beatDur = 60 / bpm;
      const noteDur = beatDur * note.dur;
      const oct = [4,3,3,3,2,2][note.s] + Math.floor((tuning[note.s] + note.f) / 12);
      const timer = setTimeout(() => {
        if (this._playId !== playId) return;
        this.app.audio.playNoteImmediate(note.noteIdx, Math.max(noteDur * 0.9, 0.05), 0.25, sound, oct);
      }, delayMs);
      this._playTimers.push(timer);
      delayMs += noteDur * 1000;
    });
    const endTimer = setTimeout(() => {
      if (this._playId !== playId) return;
      if (loop) { this.play(); } else { this.stop(); }
    }, delayMs + 200);
    this._playTimers.push(endTimer);
  }

  updateBoard() {
    this.app.fretboard.el.querySelectorAll('.note-circle').forEach(c => {
      c.className = 'note-circle';
      c.innerText = ''; c.style.backgroundColor = '';
      c.style.opacity = '0.05'; c.style.visibility = 'visible';
      c.style.pointerEvents = 'auto'; c.style.color = 'transparent';
    });
  }
}

// --- Mode E: Groove Trainer ---
class GrooveTrainer {
  constructor(app) {
    this.app = app;
    this.isPlaying = false;
    this.timerId = null;
    this.nextBeatTime = 0;
    this.currentStep = 0;
    this.pattern = [];
    this.subdivCount = 8;
    this.initPattern();
  }

  initPattern() {
    if (this._initialized) { this.renderGrid(); return; }
    this._initialized = true;
    this.subdivCount = parseInt(document.getElementById('gt-subdiv')?.value || '8');
    this.pattern = new Array(this.subdivCount).fill(false);
    this.pattern[0] = true;
    this.renderGrid();
  }

  updatePattern() {
    const n = parseInt(document.getElementById('gt-subdiv')?.value || '8');
    this.subdivCount = n;
    this.pattern = new Array(n).fill(false);
    this.pattern[0] = true;
    if (n >= 4) this.pattern[Math.floor(n / 2)] = true;
    this.renderGrid();
  }

  renderGrid() {
    const grid = document.getElementById('gt-pattern-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const n = this.pattern.length;
    this.pattern.forEach((active, i) => {
      const cell = document.createElement('div');
      cell.className = 'gt-cell' + (active ? ' gt-cell-on' : '');
      cell.dataset.index = i;
      const isBar = i % (n / 4) === 0;
      if (isBar) cell.classList.add('gt-cell-bar');
      cell.onclick = () => {
        this.pattern[i] = !this.pattern[i];
        cell.classList.toggle('gt-cell-on', this.pattern[i]);
      };
      const label = document.createElement('span');
      label.textContent = isBar ? (i / (n / 4) + 1) : '';
      cell.appendChild(label);
      grid.appendChild(cell);
    });
  }

  setAccentPreset(type) {
    const n = this.pattern.length;
    this.pattern = new Array(n).fill(false);
    if (type === 'all') { this.pattern.fill(true); }
    else if (type === 'downbeats') { for (let i = 0; i < n; i += n / 4) this.pattern[i] = true; }
    else if (type === 'backbeat') { [1, 3].forEach(beat => { const idx = Math.round(beat * n / 4); if (idx < n) this.pattern[idx] = true; }); }
    else if (type === 'clave') {
      const pos = n === 8 ? [0, 2, 3, 5, 6] : n === 16 ? [0, 3, 6, 10, 12] : [0, 1, 2, 4, 5];
      pos.forEach(p => { if (p < n) this.pattern[p] = true; });
    }
    this.renderGrid();
  }

  clearPattern() { this.pattern.fill(false); this.pattern[0] = true; this.renderGrid(); }

  toggle() {
    this.isPlaying ? this.stop() : this.start();
  }

  start() {
    this.app.audio.init();
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextBeatTime = this.app.audio.context.currentTime;
    document.getElementById('gt-play-btn')?.querySelector('svg path')?.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
    this._schedule();
  }

  stop() {
    this.isPlaying = false;
    cancelAnimationFrame(this.timerId);
    document.getElementById('gt-beat-display').textContent = '–';
    document.querySelectorAll('.gt-cell').forEach(c => c.classList.remove('gt-cell-active'));
    document.getElementById('gt-play-btn')?.querySelector('svg path')?.setAttribute('d', 'M8 5v14l11-7z');
  }

  _schedule() {
    if (!this.isPlaying) return;
    const ctx = this.app.audio.context;
    while (this.nextBeatTime < ctx.currentTime + 0.1) {
      this._tick(this.nextBeatTime);
      const bpm = parseInt(document.getElementById('gt-bpm')?.value || '100');
      const n = this.subdivCount;
      this.nextBeatTime += (60 / bpm) * (4 / n);
    }
    this.timerId = requestAnimationFrame(() => this._schedule());
  }

  _tick(time) {
    const step = this.currentStep % this.subdivCount;
    if (this.pattern[step]) {
      const vol = parseFloat(document.getElementById('gt-vol')?.value || '0.7');
      const sound = document.getElementById('gt-sound')?.value || 'Click';
      const isDownbeat = step % (this.subdivCount / 4) === 0;
      this.app.audio.playClick(time, isDownbeat, vol, sound);
    }
    const s = step;
    requestAnimationFrame(() => {
      document.querySelectorAll('.gt-cell').forEach((c, i) => c.classList.toggle('gt-cell-active', i === s));
      const beatsPerBar = 4;
      const beatInBar = Math.floor(s / (this.subdivCount / beatsPerBar)) + 1;
      const el = document.getElementById('gt-beat-display');
      if (el) el.textContent = beatInBar;
    });
    this.currentStep++;
  }
}

// --- Mode F: Real Book ---
class RealBook {
  static STANDARDS = [
    { title:"Autumn Leaves",          composer:"Joseph Kosma",         key:"G",  style:"Standard",  chords:"| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |" },
    { title:"All The Things You Are", composer:"Jerome Kern",          key:"Ab", style:"Standard",  chords:"| Fm7 | Bbm7 | Eb7 | Abmaj7 | Dbmaj7 | G7 | Cmaj7 |" },
    { title:"There Will Never Be Another You", composer:"Harry Warren", key:"Eb", style:"Standard", chords:"| Ebmaj7 | Cm7 | Fm7 Bb7 | Ebmaj7 Eb7 | Abmaj7 | Abm7 Db7 | Ebmaj7 Cm7 | Fm7 Bb7 |" },
    { title:"Misty",                  composer:"Erroll Garner",        key:"Eb", style:"Ballad",    chords:"| Ebmaj7 | Bbm7 Eb7 | Abmaj7 | Abm7 Db7 | Ebmaj7 Cm7 | Fm7 Bb7 | Ebmaj7 Cm7 | Fm7 Bb7 |" },
    { title:"Stella By Starlight",    composer:"Victor Young",         key:"Bb", style:"Standard",  chords:"| Em7b5 A7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 | Cm7b5 F7 | Bbmaj7 Gm7 | Em7b5 A7 | Dm7 G7 |" },
    { title:"ii-V-I in C",            composer:"Common",               key:"C",  style:"Bebop",     chords:"| Dm7 G7 | Cmaj7 |" },
    { title:"ii-V-I in F",            composer:"Common",               key:"F",  style:"Bebop",     chords:"| Gm7 C7 | Fmaj7 |" },
    { title:"ii-V-I in Bb",           composer:"Common",               key:"Bb", style:"Bebop",     chords:"| Cm7 F7 | Bbmaj7 |" },
    { title:"Minor ii-V-i",           composer:"Common",               key:"Dm", style:"Bebop",     chords:"| Em7b5 A7 | Dm7 |" },
    { title:"Rhythm Changes (Bb)",    composer:"Gershwin",             key:"Bb", style:"Bebop",     chords:"| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7b5 G7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 |" },
    { title:"12-Bar Blues in Bb",     composer:"Traditional",          key:"Bb", style:"Blues",     chords:"| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |" },
    { title:"12-Bar Blues in F",      composer:"Traditional",          key:"F",  style:"Blues",     chords:"| F7 | Bb7 | F7 | F7 | Bb7 | Bb7 | F7 | D7 | Gm7 | C7 | F7 | C7 |" },
    { title:"Blue Bossa",             composer:"Kenny Dorham",         key:"Cm", style:"Latin",     chords:"| Cm7 | Cm7 | Fm7 | Fm7 | Dm7b5 G7 | Cm7 | Ebm7 Ab7 | Dbmaj7 | Dm7b5 G7 | Cm7 |" },
    { title:"Wave",                   composer:"Tom Jobim",            key:"D",  style:"Latin",     chords:"| Dmaj7 | G#m7b5 C#7 | F#m7 | Bm7 E7 | Em7 A7 | Dmaj7 |" },
    { title:"So What",                composer:"Miles Davis",          key:"D",  style:"Modal",     chords:"| Dm7 | Dm7 | Dm7 | Dm7 | Ebm7 | Ebm7 | Dm7 | Dm7 |" },
    { title:"Maiden Voyage",          composer:"Herbie Hancock",       key:"D",  style:"Modal",     chords:"| Dm7(sus4) | Fm7(sus4) | Abm7(sus4) | Bbm7(sus4) |" },
    { title:"Turnaround (C)",         composer:"Common",               key:"C",  style:"Standard",  chords:"| Cmaj7 Am7 | Dm7 G7 |" },
    { title:"Giant Steps (excerpt)",  composer:"John Coltrane",        key:"B",  style:"Bebop",     chords:"| Bmaj7 D7 | Gmaj7 Bb7 | Ebmaj7 | Am7 D7 | Gmaj7 Bb7 | Ebmaj7 F#7 | Bmaj7 | Fm7 Bb7 |" },
    { title:"Summertime",             composer:"Gershwin",             key:"Am", style:"Standard",  chords:"| Am7 E7 | Am7 E7 | Am7 D7 | Am7 E7 | Am7 | Am7 | Dm7 | E7 | Am7 Dm7 | Am7 E7 | Am7 |" },
    { title:"Take The A Train",       composer:"Billy Strayhorn",      key:"C",  style:"Standard",  chords:"| Cmaj7 | D7 | Dm7 G7 | Cmaj7 | C7 | Fmaj7 | Fm7 | Cmaj7 G7 |" },
  ];

  constructor(app) {
    this.app = app;
    this.activeCategory = 'All';
  }

  init() {
    const btnArea = document.getElementById('rb-category-btns');
    if (!btnArea || btnArea.children.length) return;
    ['All','Standard','Bebop','Blues','Latin','Modal','Ballad'].forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'rb-cat-btn' + (cat === 'All' ? ' active' : '');
      btn.textContent = cat;
      btn.onclick = () => {
        this.activeCategory = cat;
        document.querySelectorAll('.rb-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.render();
      };
      btnArea.appendChild(btn);
    });
    this.render();
  }

  filter() {
    this.render();
  }

  render() {
    const query = (document.getElementById('rb-search')?.value || '').toLowerCase();
    const list = document.getElementById('rb-list');
    if (!list) return;
    list.innerHTML = '';
    const filtered = RealBook.STANDARDS.filter(s => {
      const catOk = this.activeCategory === 'All' || s.style === this.activeCategory;
      const searchOk = !query || s.title.toLowerCase().includes(query) || s.composer.toLowerCase().includes(query) || s.key.toLowerCase().includes(query);
      return catOk && searchOk;
    });
    if (!filtered.length) { list.innerHTML = `<p style="color:#555;padding:20px;text-align:center">${T('rb.no-results')}</p>`; return; }
    filtered.forEach(s => {
      const card = document.createElement('div'); card.className = 'rb-standard-card';
      card.innerHTML = `
        <div class="rb-standard-info">
          <div class="rb-standard-title">${s.title}</div>
          <div class="rb-standard-meta">${s.composer} · Key: ${s.key} · <span class="rb-style-tag">${s.style}</span></div>
          <div class="rb-standard-chords">${s.chords}</div>
        </div>
        <button class="btn-add-step rb-load-btn">${T('rb.load-btn')}</button>`;
      card.querySelector('.rb-load-btn').onclick = () => this.load(s.chords);
      list.appendChild(card);
    });
  }

  load(chords) {
    document.getElementById('chord-importer-textarea').value = chords;
    this.app.switchView('player');
    this.app.importProgression();
  }
}

// --- Reharmonizer ---
class Reharmonizer {
  constructor(app) { this.app = app; }

  _quality(rest) {
    if (!rest) return 'maj';
    if (rest.includes('m7b5') || rest.includes('ø'))        return 'm7b5';
    if (rest.includes('dim7') || rest.includes('°7'))        return 'dim7';
    if (rest.includes('dim')  || rest.includes('°'))         return 'dim';
    if (rest.includes('mMaj') || rest.includes('mM'))        return 'mMaj7';
    if (rest.includes('maj7') || rest.includes('Maj7') || rest.includes('Δ')) return 'maj7';
    if (rest.includes('alt'))                                return '7alt';
    if (rest.match(/m(?!aj)/i) || rest.includes('min')) {
      return rest.includes('7') ? 'm7' : 'm';
    }
    if (rest.includes('7')) return '7';
    return 'maj7';
  }

  analyze() {
    const input = document.getElementById('rh-input').value.trim();
    if (!input) return;
    const list = document.getElementById('rh-results');
    list.innerHTML = '';
    const tokens = input.split(/[\s|,]+/).filter(c => c && c !== '|' && c !== '%');
    let found = false;
    tokens.forEach(chordStr => {
      const p = ChordParser.parse(chordStr);
      if (!p) return;
      found = true;
      const quality = this._quality(p.rest);
      const subs    = this._getSubs(p.root, quality);
      const card = document.createElement('div');
      card.className = 'rh-card';
      card.innerHTML = `<div class="rh-original">${chordStr}</div>
        <div class="rh-subs">${subs.map(s =>
          `<span class="rh-sub-badge" title="${s.reason}">${s.chord}<small>${s.label}</small></span>`
        ).join('')}</div>`;
      list.appendChild(card);
    });
    if (!found) list.innerHTML = `<p style="color:#666;text-align:center;margin-top:20px;">${T('rh.no-results')}</p>`;
  }

  _getSubs(root, quality) {
    const ri   = Theory.NOTES.indexOf(root);
    const note = (offset) => Theory.NOTES[(ri + offset + 12) % 12];
    const subs = [];

    if (quality === '7' || quality === '7alt') {
      subs.push({ chord: `${note(6)}7`,    label: T('rh.tritone-sub'), reason: 'Tritone sub: dominante a distanza di tritono' });
      subs.push({ chord: `${root}7alt`,    label: T('rh.altered'),     reason: 'Dominante alterata: max tensione verso I' });
      subs.push({ chord: `${note(2)}m7`,   label: T('rh.ii-of-v'),    reason: 'ii del V: prepara la dominante' });
    } else if (quality === 'maj7' || quality === 'maj') {
      subs.push({ chord: `${note(4)}m7`,   label: T('rh.diatonic-3'),  reason: 'III sub: condivide 3a e 7a' });
      subs.push({ chord: `${note(9)}m7`,   label: T('rh.diatonic-6'),  reason: 'VI sub: condivide 2 note comuni' });
      subs.push({ chord: `${note(10)}maj7`,label: T('rh.modal-bvii'),  reason: 'Modal interchange: bVII dal minore parallelo' });
      subs.push({ chord: `${note(8)}maj7`, label: T('rh.modal-bvi'),   reason: 'Modal interchange: bVI dal minore parallelo' });
    } else if (quality === 'm7' || quality === 'm') {
      subs.push({ chord: `${note(3)}maj7`, label: T('rh.relative-maj'),reason: 'Relativo maggiore: bIII partendo dal minore' });
      subs.push({ chord: `${note(10)}7`,   label: T('rh.backdoor'),    reason: 'Backdoor dominant: bVII7' });
      subs.push({ chord: `${note(5)}maj7`, label: T('rh.iv-maj'),      reason: 'IV maggiore: colore più luminoso' });
    } else if (quality === 'm7b5') {
      subs.push({ chord: `${note(3)}dim7`, label: T('rh.dim-sub'),     reason: 'Dim7: condivide 3 note con m7b5' });
      subs.push({ chord: `${note(5)}7b9`,  label: T('rh.dom-b9'),      reason: 'Dominante b9 che risolve al relativo' });
    } else if (quality === 'dim7' || quality === 'dim') {
      subs.push({ chord: `${note(3)}7b9`,  label: T('rh.dim-as-dom'),  reason: 'Dim7 come V7b9' });
      subs.push({ chord: `${note(6)}7b9`,  label: T('rh.dim-as-dom'),  reason: 'Dim7 come V7b9 (tritono)' });
    }
    subs.push({ chord: `${note(7)}7`, label: T('rh.sec-dom'), reason: 'Dominante secondaria: V7 di questo accordo' });
    return subs;
  }
}

// --- Preset Progressions ---
const PRESET_PROGRESSIONS = {
  "ii-V-I (C)":          "| Dm7 G7 | Cmaj7 |",
  "ii-V-I (F)":          "| Gm7 C7 | Fmaj7 |",
  "ii-V-I (Bb)":         "| Cm7 F7 | Bbmaj7 |",
  "ii-V-i (Am)":         "| Bm7b5 E7 | Am7 |",
  "Turnaround (C)":      "| Cmaj7 Am7 | Dm7 G7 |",
  "12-Bar Blues (Bb)":   "| Bb7 | Eb7 | Bb7 | Bb7 | Eb7 | Eb7 | Bb7 | G7 | Cm7 | F7 | Bb7 | F7 |",
  "Rhythm Changes (Bb)": "| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 | Dm7b5 G7 | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7 |",
  "Autumn Leaves (style)":"| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |",
  "Minor ii-V-i (Dm)":   "| Em7b5 A7 | Dm7 |",
  "Modal (D Dorian)":    "| Dm7 | Em7 | Fmaj7 | G7 | Am7 | Bm7b5 | Cmaj7 | Dm7 |",
};

// --- Guitar Tuner ---
class GuitarTuner {
  constructor(app) {
    this.app = app;
    this.isActive = false;
    this.stream = null;
    this.analyser = null;
    this.animFrame = null;
    this.tunerCtx = null;
    this._freqBuf = [];
    this._lastDisplay = 0;
    this.STRINGS = [
      { label: '6 Mi', note: 'E2', freq: 82.41 },
      { label: '5 La', note: 'A2', freq: 110.00 },
      { label: '4 Re', note: 'D3', freq: 146.83 },
      { label: '3 Sol', note: 'G3', freq: 196.00 },
      { label: '2 Si', note: 'B3', freq: 246.94 },
      { label: '1 Mi', note: 'E4', freq: 329.63 },
    ];
  }

  async toggle() {
    if (this.isActive) { this.stop(); } else { await this.start(); }
  }

  async start() {
    const btn = document.getElementById('tuner-start-btn');
    const status = document.getElementById('tuner-status');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }, video: false });
      if (!this.tunerCtx) this.tunerCtx = new (window.AudioContext || window.webkitAudioContext)();
      else if (this.tunerCtx.state === 'suspended') await this.tunerCtx.resume();
      const source = this.tunerCtx.createMediaStreamSource(this.stream);
      this.analyser = this.tunerCtx.createAnalyser();
      this.analyser.fftSize = 8192;
      this.analyser.smoothingTimeConstant = 0.8;
      source.connect(this.analyser);
      this.isActive = true;
      if (btn) { btn.textContent = '⏹ Stop'; btn.style.background = 'rgba(231,76,60,0.2)'; }
      if (status) status.textContent = window.currentLang === 'it' ? 'Microfono attivo — suona una corda...' : 'Microphone active — play a string...';
      this._detect();
    } catch (e) {
      if (status) status.textContent = window.currentLang === 'it' ? '⚠ Accesso al microfono negato. Controlla i permessi del browser.' : '⚠ Microphone access denied. Check browser permissions.';
    }
  }

  stop() {
    this.isActive = false;
    if (this.stream) { this.stream.getTracks().forEach(t => t.stop()); this.stream = null; }
    if (this.animFrame) { cancelAnimationFrame(this.animFrame); this.animFrame = null; }
    const btn = document.getElementById('tuner-start-btn');
    if (btn) { btn.textContent = '🎙 Avvia'; btn.style.background = ''; }
    const status = document.getElementById('tuner-status');
    if (status) status.textContent = window.currentLang === 'it' ? 'Premi Avvia per iniziare.' : 'Press Start to begin.';
    this._updateDisplay(null);
  }

  _detect() {
    if (!this.isActive) return;
    const buf = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(buf);
    const raw = this._autoCorrelate(buf, this.tunerCtx.sampleRate);
    const freq = raw > 50 && raw < 1600 ? raw : null;
    // Accumulate valid readings; drain slowly on silence for a brief hold
    if (freq) {
      this._freqBuf.push(freq);
      if (this._freqBuf.length > 6) this._freqBuf.shift();
    } else if (this._freqBuf.length > 0) {
      this._freqBuf.shift();
    }
    // Throttle display to ~80 ms to avoid flickering
    const now = performance.now();
    if (now - this._lastDisplay >= 80) {
      this._lastDisplay = now;
      this._updateDisplay(this._freqBuf.length >= 2 ? this._median(this._freqBuf) : null);
    }
    this.animFrame = requestAnimationFrame(() => this._detect());
  }

  _median(arr) {
    const s = [...arr].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }

  _autoCorrelate(buf, sr) {
    // RMS check
    let rms = 0;
    for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i];
    if (Math.sqrt(rms / buf.length) < 0.008) return -1;

    const minLag = Math.floor(sr / 1600);
    const maxLag = Math.min(Math.floor(sr / 50), buf.length - 1);
    const windowLen = Math.min(2048, buf.length - maxLag);

    let bestCorr = -Infinity, bestLag = -1;
    for (let lag = minLag; lag <= maxLag; lag++) {
      let corr = 0;
      for (let j = 0; j < windowLen; j++) corr += buf[j] * buf[j + lag];
      if (corr > bestCorr) { bestCorr = corr; bestLag = lag; }
    }
    if (bestLag < 0 || bestCorr <= 0) return -1;

    // Parabolic interpolation
    let T0 = bestLag;
    if (T0 > minLag && T0 < maxLag) {
      const c0 = this._corrAt(buf, T0 - 1, windowLen);
      const c1 = bestCorr;
      const c2 = this._corrAt(buf, T0 + 1, windowLen);
      const a = (c0 + c2 - 2 * c1) / 2;
      const b = (c2 - c0) / 2;
      if (a < 0) T0 -= b / (2 * a);
    }
    return sr / T0;
  }

  _corrAt(buf, lag, len) {
    let c = 0;
    for (let j = 0; j < len && j + lag < buf.length; j++) c += buf[j] * buf[j + lag];
    return c;
  }

  _freqToNote(freq) {
    const semitones = Math.round(12 * Math.log2(freq / 440));
    // A4=0 semitones → noteIdx 9; shift so C=0
    const noteIdx = ((semitones + 9) % 12 + 12) % 12;
    const octave = 4 + Math.floor((semitones + 9) / 12);
    const exactFreq = 440 * Math.pow(2, semitones / 12);
    const cents = Math.round(1200 * Math.log2(freq / exactFreq));
    return { noteName: Theory.NOTES[noteIdx], octave, cents };
  }

  _updateDisplay(freq) {
    const noteEl = document.getElementById('tuner-note');
    const freqEl = document.getElementById('tuner-freq');
    const centsEl = document.getElementById('tuner-cents');
    const needleEl = document.getElementById('tuner-needle');
    if (!noteEl) return;

    if (!freq) {
      noteEl.textContent = '–'; noteEl.style.color = '#555';
      if (freqEl) freqEl.textContent = '';
      if (centsEl) { centsEl.textContent = ''; centsEl.style.color = '#aaa'; }
      if (needleEl) needleEl.style.transform = 'rotate(0deg) translateX(-50%)';
      return;
    }

    const { noteName, octave, cents } = this._freqToNote(freq);
    const inTune = Math.abs(cents) < 5;
    const close = Math.abs(cents) < 15;
    const color = inTune ? '#2ecc71' : close ? '#f39c12' : '#e74c3c';
    noteEl.textContent = noteName + octave;
    noteEl.style.color = color;
    if (freqEl) freqEl.textContent = freq.toFixed(1) + ' Hz';
    if (centsEl) {
      centsEl.textContent = inTune ? '✓ In Tune' : (cents > 0 ? '+' : '') + cents + '¢';
      centsEl.style.color = color;
    }
    if (needleEl) {
      const deg = Math.max(-50, Math.min(50, cents * 0.8));
      needleEl.style.transform = `rotate(${deg}deg) translateX(-50%)`;
    }
  }

  playRef(freq) {
    this.app.audio.init();
    const ctx = this.app.audio.context;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  }
}

// --- Chord Diagram SVG Renderer ---
function renderChordDiagramSVG(frets, fingers, baseFret, name) {
  // frets: [E A D G B e] — -1=muted, 0=open, n>=1=fret position (absolute)
  // fingers: [0..4]
  const W = 110, H = 130;
  const NX = 20, NY = 28; // nut origin
  const SW = (W - NX - 10) / 5; // string spacing
  const FH = (H - NY - 12) / 5; // fret height (5 visible frets)
  const R = 7; // dot radius
  const START = baseFret;
  const isOpen = START <= 1;

  let s = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" style="display:block">`;

  // Nut (thick line if open position)
  if (isOpen) {
    s += `<line x1="${NX}" y1="${NY}" x2="${NX + SW*5}" y2="${NY}" stroke="#ccc" stroke-width="3.5" stroke-linecap="round"/>`;
  } else {
    s += `<text x="${NX-3}" y="${NY + FH*0.6}" fill="#777" font-size="9" text-anchor="end" dominant-baseline="middle">${START}fr</text>`;
    s += `<line x1="${NX}" y1="${NY}" x2="${NX + SW*5}" y2="${NY}" stroke="#444" stroke-width="1"/>`;
  }

  // Fret lines
  for (let i = 0; i <= 5; i++) {
    const y = NY + i * FH;
    s += `<line x1="${NX}" y1="${y}" x2="${NX + SW*5}" y2="${y}" stroke="#333" stroke-width="1"/>`;
  }

  // String lines
  for (let i = 0; i < 6; i++) {
    const x = NX + i * SW;
    s += `<line x1="${x}" y1="${NY}" x2="${x}" y2="${NY + FH*5}" stroke="#555" stroke-width="1.5"/>`;
  }

  // Dots and muted/open markers
  for (let i = 0; i < 6; i++) {
    const x = NX + i * SW;
    const f = frets[i];
    if (f === -1) {
      s += `<text x="${x}" y="${NY-7}" fill="#e74c3c" font-size="11" font-weight="bold" text-anchor="middle">✕</text>`;
    } else if (f === 0) {
      s += `<circle cx="${x}" cy="${NY-8}" r="5" fill="none" stroke="#999" stroke-width="1.5"/>`;
    } else {
      const fretPos = f - START;
      const cy = NY + fretPos * FH + FH / 2;
      s += `<circle cx="${x}" cy="${cy}" r="${R}" fill="#FFD60A"/>`;
      if (fingers && fingers[i]) s += `<text x="${x}" y="${cy+3.5}" fill="#000" font-size="8" font-weight="bold" text-anchor="middle">${fingers[i]}</text>`;
    }
  }

  s += '</svg>';
  return s;
}

// --- Chord Diagram Data (CAGED barre forms) ---
const BARRE_TEMPLATES = {
  // E-form (root on 6th string, open note = E = noteIdx 4)
  'maj_E':   { rel: [0,2,2,1,0,0],  fng: [1,3,4,2,1,1], rootStr: 5, openNote: 4 },
  'm_E':     { rel: [0,2,2,0,0,0],  fng: [1,3,4,1,1,1], rootStr: 5, openNote: 4 },
  '7_E':     { rel: [0,2,0,1,0,0],  fng: [1,3,1,2,1,1], rootStr: 5, openNote: 4 },
  'maj7_E':  { rel: [0,2,1,1,0,0],  fng: [1,3,2,2,1,1], rootStr: 5, openNote: 4 },
  'm7_E':    { rel: [0,2,2,0,3,0],  fng: [1,3,4,1,2,1], rootStr: 5, openNote: 4 },
  'mMaj7_E': { rel: [0,2,1,0,0,0],  fng: [1,3,2,1,1,1], rootStr: 5, openNote: 4 },
  'm7b5_E':  { rel: [0,1,2,0,3,0],  fng: [1,2,3,1,4,1], rootStr: 5, openNote: 4 },
  // A-form (root on 5th string, open note = A = noteIdx 9)
  'maj_A':   { rel: [-1,0,2,2,2,0], fng: [0,1,3,4,2,1], rootStr: 4, openNote: 9 },
  'm_A':     { rel: [-1,0,2,2,1,0], fng: [0,1,3,4,2,1], rootStr: 4, openNote: 9 },
  '7_A':     { rel: [-1,0,2,0,2,0], fng: [0,1,2,1,3,1], rootStr: 4, openNote: 9 },
  'maj7_A':  { rel: [-1,0,2,1,2,0], fng: [0,1,3,2,4,1], rootStr: 4, openNote: 9 },
  'm7_A':    { rel: [-1,0,2,0,1,0], fng: [0,1,3,1,2,1], rootStr: 4, openNote: 9 },
  'mMaj7_A': { rel: [-1,0,2,1,1,0], fng: [0,1,3,2,2,1], rootStr: 4, openNote: 9 },
  'm7b5_A':  { rel: [-1,0,1,2,1,3], fng: [0,1,2,3,2,4], rootStr: 4, openNote: 9 },
  'dim7_A':  { rel: [-1,0,1,2,1,2], fng: [0,1,2,4,3,3], rootStr: 4, openNote: 9 },
};

function getChordDiagrams(rootIdx, chordType) {
  // Map chord type to barre template keys
  const typeMap = {
    'maj7': ['maj7_E','maj7_A'], 'm7': ['m7_E','m7_A'], '7': ['7_E','7_A'],
    'maj': ['maj_E','maj_A'], 'm': ['m_E','m_A'],
    'maj9': ['maj7_E','maj7_A'], '9': ['7_E','7_A'], 'm9': ['m7_E','m7_A'],
    '13': ['7_E','7_A'], 'mMaj7': ['mMaj7_E','mMaj7_A'],
    'maj7#11': ['maj7_E','maj7_A'], '7alt': ['7_E','7_A'],
    'm7b5': ['m7b5_E','m7b5_A'], 'dim7': ['dim7_A'],
  };
  const templates = (typeMap[chordType] || ['maj_E','maj_A']).map(k => BARRE_TEMPLATES[k]).filter(Boolean);

  return templates.map(tmpl => {
    const barre = (rootIdx - tmpl.openNote + 12) % 12;
    const baseFret = barre === 0 ? 1 : barre;
    const frets = tmpl.rel.map(r => r === -1 ? -1 : (r === 0 && barre === 0) ? 0 : (r === 0 && barre > 0) ? barre : r + barre);
    // For open position (barre=0), mark open strings correctly
    const correctedFrets = barre === 0
      ? tmpl.rel.map(r => r < 0 ? -1 : r)
      : frets;
    const label = tmpl.rootStr === 5 ? `E form` : `A form`;
    return { frets: correctedFrets, fingers: tmpl.fng, baseFret: barre === 0 ? 1 : baseFret, label };
  });
}

// --- Key Detection ---
function detectKey(chords) {
  if (!chords || chords.length === 0) return null;
  // Diatonic chord quality indexed by chromatic semitone from root (0–11).
  // '—' marks non-diatonic positions — always scores 0.
  const MAJOR_SCALE = [
    {q:'maj7'}, {q:'—'}, {q:'m7'}, {q:'—'}, {q:'m7'}, {q:'maj7'},
    {q:'—'}, {q:'7'}, {q:'—'}, {q:'m7'}, {q:'—'}, {q:'m7b5'}
  ];
  // Natural minor (jazz uses harmonic V7 at position 7)
  const MINOR_SCALE = [
    {q:'m7'}, {q:'—'}, {q:'m7b5'}, {q:'maj7'}, {q:'—'}, {q:'m7'},
    {q:'—'}, {q:'7'}, {q:'maj7'}, {q:'—'}, {q:'7'}, {q:'—'}
  ];
  function chordQualityGroup(rest) {
    if (!rest) return 'maj';
    if (rest.includes('m7b5') || rest.includes('ø')) return 'm7b5';
    if (rest.includes('mMaj')) return 'mMaj7';
    if (rest.includes('dim')) return 'dim7';
    if (rest.includes('maj7') || rest.includes('Maj7')) return 'maj7';
    if (rest.match(/m(?!aj)/i) || rest.includes('min')) {
      return rest.includes('7') ? 'm7' : 'm';
    }
    if (rest.includes('7')) return '7';
    return 'maj';
  }
  function qualityMatch(actual, expected) {
    if (expected === '—') return 0;
    if (actual === expected) return 2;
    // Close matches: dom7 ≈ maj (secondary dominant)
    if (expected === '7' && (actual === 'maj' || actual === 'maj7')) return 0.5;
    if (expected === 'maj7' && actual === 'maj') return 1;
    if (expected === 'm7' && actual === 'm') return 1;
    return 0;
  }
  let best = null, bestScore = -1;
  for (let root = 0; root < 12; root++) {
    for (const [mode, scale] of [['major', MAJOR_SCALE], ['minor', MINOR_SCALE]]) {
      let score = 0;
      for (const c of chords) {
        const p = ChordParser.parse(c); if (!p) continue;
        const ci = Theory.NOTES.indexOf(p.root); if (ci === -1) continue;
        const deg = (ci - root + 12) % 12;
        score += qualityMatch(chordQualityGroup(p.rest), scale[deg].q);
      }
      if (score > bestScore) { bestScore = score; best = { root, mode }; }
    }
  }
  if (!best || bestScore < 1) return null;
  const rootName = Theory.NOTES[best.root];
  return { root: rootName, mode: best.mode, score: bestScore,
    label: best.mode === 'major' ? `${rootName} maggiore` : `${rootName} minore` };
}

// --- Chord Finder ---
class ChordFinder {
  constructor(app) {
    this.app = app;
    this.selectedNotes = new Set();
    this.CHORD_TEMPLATES = [
      { name: 'maj', intervals: [0,4,7] }, { name: 'min', intervals: [0,3,7] },
      { name: '7', intervals: [0,4,7,10] }, { name: 'maj7', intervals: [0,4,7,11] },
      { name: 'm7', intervals: [0,3,7,10] }, { name: 'm7b5', intervals: [0,3,6,10] },
      { name: 'dim7', intervals: [0,3,6,9] }, { name: 'dim', intervals: [0,3,6] },
      { name: 'aug', intervals: [0,4,8] }, { name: 'sus2', intervals: [0,2,7] },
      { name: 'sus4', intervals: [0,5,7] }, { name: '9', intervals: [0,4,7,10,2] },
      { name: 'maj9', intervals: [0,4,7,11,2] }, { name: 'm9', intervals: [0,3,7,10,2] },
      { name: '13', intervals: [0,4,7,10,9] }, { name: 'mMaj7', intervals: [0,3,7,11] },
      { name: '7alt', intervals: [0,4,6,10] }, { name: '6', intervals: [0,4,7,9] },
      { name: 'm6', intervals: [0,3,7,9] }, { name: 'add9', intervals: [0,4,7,2] },
    ];
  }

  initUI() {
    const grid = document.getElementById('cf-note-grid');
    if (!grid || grid.children.length) return;
    Theory.NOTES.forEach((note, idx) => {
      const btn = document.createElement('button');
      btn.className = 'cf-note-btn';
      btn.textContent = note;
      btn.dataset.note = idx;
      btn.onclick = () => this.toggleNote(idx);
      grid.appendChild(btn);
    });
  }

  toggleNote(noteIdx) {
    if (this.selectedNotes.has(noteIdx)) this.selectedNotes.delete(noteIdx);
    else this.selectedNotes.add(noteIdx);
    document.querySelectorAll('.cf-note-btn').forEach(b => {
      b.classList.toggle('selected', this.selectedNotes.has(parseInt(b.dataset.note)));
    });
    this.find();
  }

  find() {
    const results = document.getElementById('cf-results');
    if (!results) return;
    const selected = [...this.selectedNotes].sort((a, b) => a - b);
    if (selected.length < 2) { results.innerHTML = ''; return; }
    const matches = [];
    for (let root = 0; root < 12; root++) {
      for (const tmpl of this.CHORD_TEMPLATES) {
        const chordNotes = new Set(tmpl.intervals.map(i => (root + i) % 12));
        const hasAll = selected.every(n => chordNotes.has(n));
        const extras = selected.filter(n => !chordNotes.has(n));
        if (hasAll && extras.length === 0) {
          const missing = [...chordNotes].filter(n => !selected.includes(n));
          matches.push({ name: Theory.NOTES[root] + tmpl.name, root, missing, score: selected.length - missing.length * 0.5 });
        }
      }
    }
    matches.sort((a, b) => b.score - a.score);
    if (!matches.length) { results.innerHTML = `<div style="color:#666;font-size:0.9em;text-align:center;padding:20px;">Nessun accordo trovato.</div>`; return; }
    results.innerHTML = matches.slice(0, 12).map(m => {
      const missingStr = m.missing.length ? ` <span style="color:#777;font-size:0.8em;">(manca: ${m.missing.map(n=>Theory.NOTES[n]).join(', ')})</span>` : '';
      return `<div class="cf-result-item">${m.name}${missingStr}</div>`;
    }).join('');
  }

  clear() {
    this.selectedNotes.clear();
    document.querySelectorAll('.cf-note-btn').forEach(b => b.classList.remove('selected'));
    const results = document.getElementById('cf-results');
    if (results) results.innerHTML = '';
  }
}

// --- Quick Transposer ---
class QuickTransposer {
  constructor(app) {
    this.app = app;
    this._result = '';
  }

  transpose() {
    const input = document.getElementById('qt-input')?.value || '';
    const semitones = parseInt(document.getElementById('qt-semitones')?.value) || 0;
    const tokens = input.split(/(\s+|\|)/);
    const transposed = tokens.map(token => {
      const trimmed = token.trim();
      if (!trimmed || trimmed === '|' || trimmed === '%' || trimmed === '•/•') return token;
      const p = ChordParser.parse(trimmed);
      if (!p) return token;
      let rootIdx = Theory.NOTES.indexOf(p.root);
      const useFlat = rootIdx === -1;
      if (useFlat) rootIdx = Theory.NOTES_FLAT.indexOf(p.root);
      if (rootIdx === -1) return token;
      const newIdx = (rootIdx + semitones + 120) % 12;
      const newRoot = useFlat ? Theory.NOTES_FLAT[newIdx] : Theory.NOTES[newIdx];
      return newRoot + p.rest;
    });
    this._result = transposed.join('');
    const out = document.getElementById('qt-output');
    if (out) out.value = this._result;
  }

  loadInPlayer() {
    if (!this._result) return;
    document.getElementById('chord-importer-textarea').value = this._result;
    app.switchView('calculator');
  }

  copyOutput() {
    const out = document.getElementById('qt-output')?.value || '';
    if (!out) return;
    navigator.clipboard?.writeText(out).then(() => {
      const btn = document.getElementById('qt-copy-btn');
      if (btn) { const orig = btn.textContent; btn.textContent = '✓ Copiato!'; setTimeout(() => btn.textContent = orig, 1500); }
    });
  }
}

// --- Main Application ---
class JazzVizApp {
  constructor() {
    this.audio = new AudioEngine(); this.fretboard = new Fretboard(); this.progression = new ProgressionManager();
    this.playback = new PlaybackEngine(this.audio, this.progression);
    this.intervalLearner = new IntervalLearner(this);
    this.gradeLearner = new GradeLearner(this);
    this.noteFinder = new NoteFinder(this);
    this.chordVoicing = new ChordVoicingExplorer(this);
    this.earTrainer = new EarTrainer(this);
    this.scaleNavigator = new ScaleNavigator(this);
    this.lickBuilder = new LickBuilder(this);
    this.grooveTrainer = new GrooveTrainer(this);
    this.tuner = new GuitarTuner(this);
    this.realBook = new RealBook(this);
    this.intervalEarTrainer = new IntervalEarTrainer(this);
    this.reharmonizer = new Reharmonizer(this);
    this.chordFinder = new ChordFinder(this);
    this.quickTransposer = new QuickTransposer(this);
    this.currentView = 'explorer';
    this.explorerMode = 'normal'; this.highlightedIntervals = new Set(); this.manualNotes = new Set(); this.customScaleMap = new Set();
    this.init();
  }

  init() {
    const ts = document.getElementById("tuning-select"); for (let t in Theory.TUNINGS) ts.add(new Option(t, t));
    const rs = document.getElementById("root-select"); Theory.NOTES.forEach((n) => rs.add(new Option(n, n)));
    const ss = document.getElementById("scale-select"); for (let s in Theory.SCALES) ss.add(new Option(s, s));
    const leg = document.getElementById("legend");
    Object.entries(Theory.INTERVAL_COLORS).forEach(([idx, c]) => {
      const opt = document.createElement('div'); opt.className = `color-option`;
      opt.innerHTML = `<span class="label">${c.short}</span><div class="swatch" style="background:${c.color}"></div>`;
      opt.onclick = () => {
        this.highlightedIntervals.has(parseInt(idx)) ? this.highlightedIntervals.delete(parseInt(idx)) : this.highlightedIntervals.add(parseInt(idx));
        opt.classList.toggle('selected'); this.fretboard.update(this.getUiSettings());
      };
      leg.appendChild(opt);
    });
    const ms = document.getElementById("metro-sound-select"); Object.keys(this.audio.metronomeSamples).forEach((k) => ms.add(new Option(k, k)));
    const cs = document.getElementById("chord-sound-select"); Object.keys(this.audio.chordSounds).forEach((k) => cs.add(new Option(k, k)));
    const pg = document.getElementById("preset-grid");
    if (pg) Object.keys(PRESET_PROGRESSIONS).forEach(name => {
      const btn = document.createElement('button');
      btn.className = 'preset-prog-btn';
      btn.textContent = name;
      btn.onclick = () => { document.getElementById('chord-importer-textarea').value = PRESET_PROGRESSIONS[name]; };
      pg.appendChild(btn);
    });

    this.fretboard.render("E Standard");
    this.load(); this.fretboard.update(this.getUiSettings());
  }

  handleNoteClick(circle) {
    if (this.currentView === 'interval-learner') {
      this.intervalLearner.checkAnswer(circle);
      return;
    }
    if (this.currentView === 'note-finder') {
      this.noteFinder.checkAnswer(circle);
      return;
    }
    if (this.currentView === 'lick-builder') {
      this.lickBuilder.addNote(circle);
      return;
    }
    const s = parseInt(circle.closest(".string").className.match(/s(\d)/)[1]) - 1;
    const f = parseInt(circle.closest(".fret").className.match(/fret-(\d+)/)[1]);
    const key = `${s}-${f}`;
    if (this.explorerMode === 'custom') { this.customScaleMap.has(key) ? this.customScaleMap.delete(key) : this.customScaleMap.add(key); }
    else { this.manualNotes.has(key) ? this.manualNotes.delete(key) : this.manualNotes.add(key); }
    this.fretboard.update(this.getUiSettings());
  }

  setExplorerMode(mode) {
    this.explorerMode = mode;
    const modeDescs = {
      normal: T('mode.normal'),
      highlight: T('mode.highlight'),
      custom: T('mode.custom')
    };
    document.getElementById('mode-description').innerText = modeDescs[mode] || mode;
    document.getElementById('custom-actions').style.display = (mode === 'custom' ? 'flex' : 'none');
    this.fretboard.update(this.getUiSettings());
  }

  switchView(viewId) {
    // Stop tuner if leaving tuner view
    if (this.currentView === 'tuner' && viewId !== 'tuner' && this.tuner?.isActive) {
      this.tuner.stop();
    }
    this.currentView = viewId;
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    const viewTitleMap = {
      'explorer': T('title.explorer'), 'player': T('title.player'), 'calculator': T('title.calculator'),
      'interval-learner': T('title.interval-learner'), 'grade-learner': T('title.grade-learner'),
      'snapshots': T('title.snapshots'), 'note-finder': T('title.note-finder'),
      'teoria': T('title.teoria'), 'teoria-generale': T('title.teoria-generale'),
      'chord-voicing': T('title.chord-voicing'), 'ear-training': T('title.ear-training'),
      'scale-navigator': T('title.scale-navigator'), 'lick-builder': T('title.lick-builder'),
      'groove-trainer': T('title.groove-trainer'), 'real-book': T('title.real-book'),
      'tuner': T('title.tuner'), 'chord-finder': T('title.chord-finder'),
      'transposer': T('title.transposer'),
    };
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.remove('active');
      const onclick = n.getAttribute('onclick') || '';
      if (onclick.includes(`'${viewId}'`)) n.classList.add('active');
    });
    document.getElementById('view-title').innerText = viewTitleMap[viewId] || viewId.toUpperCase();

    // Gestione visibilità Game Bar e Legenda
    const gameBar = document.getElementById('interval-learner-bar');
    const nfBar = document.getElementById('note-finder-bar');
    const legend = document.getElementById('legend');
    const explorerHelp = document.getElementById('explorer-help');
    const fretboardWrapper = document.querySelector('.scroll-wrapper');

    // Reset all overlays first
    if (gameBar) gameBar.style.display = 'none';
    if (nfBar) nfBar.style.display = 'none';
    const fbLayer = document.getElementById('fretboard-layer');
    const noFretboardViews = ['grade-learner','teoria','teoria-generale','ear-training','scale-navigator','groove-trainer','real-book','tuner','interval-ear-training','reharmonizer','chord-finder','transposer'];
    const gameFretboardViews = ['interval-learner','note-finder','lick-builder'];
    const isGameView = gameFretboardViews.includes(viewId);
    if (fbLayer) fbLayer.classList.toggle('game-mode', isGameView);

    if (viewId === 'interval-learner') {
      if (gameBar) gameBar.style.display = 'flex';
      if (legend) legend.style.display = 'none';
      if (explorerHelp) explorerHelp.style.display = 'none';
      if (fretboardWrapper) fretboardWrapper.style.display = 'block';
    } else if (viewId === 'note-finder') {
      if (nfBar) nfBar.style.display = 'flex';
      if (legend) legend.style.display = 'none';
      if (explorerHelp) explorerHelp.style.display = 'none';
      if (fretboardWrapper) fretboardWrapper.style.display = 'block';
    } else if (viewId === 'lick-builder') {
      if (legend) legend.style.display = 'none';
      if (explorerHelp) explorerHelp.style.display = 'none';
      if (fretboardWrapper) fretboardWrapper.style.display = 'block';
    } else if (noFretboardViews.includes(viewId)) {
      if (legend) legend.style.display = 'none';
      if (explorerHelp) explorerHelp.style.display = 'none';
      if (fretboardWrapper) fretboardWrapper.style.display = 'none';
    } else {
      if (legend) legend.style.display = 'flex';
      if (explorerHelp) explorerHelp.style.display = 'block';
      if (fretboardWrapper) fretboardWrapper.style.display = 'block';
    }

    document.getElementById("sidebar-menu").classList.remove("active");
    if (viewId === 'grade-learner') {
        this.gradeLearner.initUI();
        this.gradeLearner.reset();
    } else if (viewId === 'interval-learner') {
        this.intervalLearner.updateBoard();
    } else if (viewId === 'note-finder') {
        this.noteFinder.updateBoard();
    } else if (viewId === 'lick-builder') {
        this.lickBuilder.updateBoard();
    } else if (viewId === 'ear-training') {
        this.earTrainer.renderChoices();
        this.earTrainer._renderHistory();
    } else if (viewId === 'chord-voicing') {
        this.chordVoicing.init();
    } else if (viewId === 'scale-navigator') {
        this.chordVoicing.init();
        this.scaleNavigator.render();
    } else if (viewId === 'groove-trainer') {
        this.grooveTrainer.initPattern();
    } else if (viewId === 'real-book') {
        this.realBook.init();
        this.realBook.render();
    } else if (viewId === 'interval-ear-training') {
        this.intervalEarTrainer.reset();
    } else if (viewId === 'reharmonizer') {
        document.getElementById('rh-results').innerHTML = '';
    } else if (viewId === 'chord-finder') {
        this.chordFinder.initUI();
    } else if (!noFretboardViews.includes(viewId)) {
        this.fretboard.update(this.getUiSettings());
    }
    // Stop groove trainer if leaving that view
    if (viewId !== 'groove-trainer' && this.grooveTrainer?.isPlaying) {
      this.grooveTrainer.stop();
    }
    if (viewId !== 'lick-builder' && this.lickBuilder?._isPlaying) {
      this.lickBuilder.stop();
    }
  }

  getUiSettings() {
    return {
      root: document.getElementById("root-select").value, scaleName: document.getElementById("scale-select").value, tuningName: document.getElementById("tuning-select").value,
      hideUnused: document.getElementById("hide-unused").checked, soloArp: document.getElementById("solo-arpeggio").checked,
      add9: document.getElementById("add-9").checked, add11: document.getElementById("add-11").checked, add13: document.getElementById("add-13").checked,
      notation: document.getElementById("notation-select").value, accidental: document.getElementById("accidental-select").value,
      cagedShape: document.getElementById("caged-select").value, explorerMode: this.explorerMode, manualNotes: this.manualNotes, highlightedIntervals: this.highlightedIntervals, customScaleMap: this.customScaleMap
      , currentView: this.currentView
    };
  }

  autoAssignChords() {
    const settings = this.getUiSettings();
    const scale = Theory.SCALES[settings.scaleName];
    if (!scale || scale.length < 4) return;
    const rootIdx = Theory.NOTES.indexOf(settings.root);
    const steps = this.progression.getSteps();
    if (!steps.length) return;
    const DIATONIC_Q = { 0:'maj7', 1:'m7', 2:'m7', 3:'maj7', 4:'7', 5:'m7', 6:'m7b5' };
    steps.forEach((step, i) => {
      const degIdx = i % Math.min(7, scale.length);
      const scaleDeg = scale[degIdx];
      const chordRoot = (rootIdx + scaleDeg) % 12;
      const chordRootName = Theory.NOTES[chordRoot];
      const quality = DIATONIC_Q[degIdx] || 'maj7';
      const chordName = chordRootName + quality;
      step.querySelector('.prog-root-select').value = chordRootName;
      step.querySelector('.prog-chord-name').value = chordName;
      const intervals = ChordParser.getIntervals(chordName);
      if (intervals.length) step.querySelector('.prog-chord-intervals').value = intervals.join(',');
    });
    this.save();
  }

  save() {
    const data = {
      bpm: document.getElementById("bpm-input").value,
      sourceText: document.getElementById("chord-importer-textarea").value,
      progression: [], 
      customScale: Array.from(this.customScaleMap),
      snapshots: []
    };
    document.querySelectorAll(".snapshot-card").forEach((c) => { if (c.dataset.snapshot) data.snapshots.push(JSON.parse(c.dataset.snapshot)); });
    this.progression.getSteps().forEach((s) => {
      data.progression.push({ 
        root: s.querySelector(".prog-root-select").value, scale: s.querySelector(".scale-select").value, 
        bars: s.querySelector(".prog-duration-input").value, beats: parseInt(s.querySelector(".prog-beats-input").value),
        denominator: s.querySelector(".prog-denominator-input").value, chordName: s.querySelector(".prog-chord-name").value,
        chordOctave: s.querySelector(".prog-chord-octave").value, chordIntervals: s.querySelector(".prog-chord-intervals").value
      });
    });
    localStorage.setItem("jazzVizData", JSON.stringify(data));
  }

  exportData() {
    this.save();
    const data = localStorage.getItem("jazzVizData");
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jazz-viz-progression.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.progression.clear(true);
        localStorage.setItem("jazzVizData", JSON.stringify(data));
        this.load();
        event.target.value = '';
      } catch (err) { alert(T('err.invalid-json')); }
    };
    reader.readAsText(file);
  }

  exportCustomScale() {
    const data = JSON.stringify(Array.from(this.customScaleMap));
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'custom-scale.json'; a.click();
  }

  importCustomScale(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        this.customScaleMap = new Set(JSON.parse(ev.target.result));
        window.applyFullScale();
      } catch (err) { alert(T('err.scale-load')); }
    };
    r.readAsText(f);
  }

  load() {
    const data = JSON.parse(localStorage.getItem("jazzVizData"));
    if (!data) return;
    if (data.bpm) document.getElementById("bpm-input").value = data.bpm;
    if (data.sourceText) document.getElementById("chord-importer-textarea").value = data.sourceText;
    if (data.progression) data.progression.forEach((s) => this.progression.addStep(s));
    if (data.customScale) this.customScaleMap = new Set(data.customScale);
    if (data.snapshots) data.snapshots.forEach(s => this.createSnapshot(s));
  }

  createSnapshot(data = null) {
    const settings = data || this.getUiSettings();
    const card = document.createElement("div");
    card.className = "snapshot-card";

    const tuning = Theory.TUNINGS[settings.tuningName || settings.tuning || "E Standard"];
    const rootIdx = Theory.NOTES.indexOf(settings.root);
    const scale = Theory.SCALES[settings.scaleName || settings.scale || "Ionio (Maj7)"];
    card.dataset.snapshot = JSON.stringify(settings);
    
    let rows = "";
    for (let s = 0; s < 6; s++) { // Changed loop direction for correct string order (high E at top)
      rows += `<div class="mini-string">`;
      for (let f = 0; f <= 24; f++) {
        const int = (((tuning[s] + f) % 12) - rootIdx + 12) % 12;
        let visible = scale.includes(int);
        if (settings.soloArp && ![0, 3, 4, 7, 10, 11].includes(int)) {
          if (!((settings.add9 && int === 2) || (settings.add11 && int === 5) || (settings.add13 && int === 9))) {
            if (settings.hideUnused) visible = false;
          }
        }
        rows += `<div class="mini-fret${f === 0 ? ' mini-fret-0' : ''}">`;
        if (visible) {
          const col = Theory.INTERVAL_COLORS[int].color;
          rows += `<div class="mini-circle" style="background:${col}"></div>`;
        }
        rows += `</div>`;
      }
      rows += `</div>`;
    }

    card.innerHTML = `
      <div class="snapshot-meta">
        <h3>${settings.root} ${(settings.scaleName || settings.scale || "").split(" ")[0]}</h3>
        <button class="btn-reset" style="padding:4px; font-size:0.8em; width:auto; height: 24px;" onclick="this.closest('.snapshot-card').remove(); app.save();">${T('btn.delete')}</button>
      </div>
      <div class="mini-fretboard-wrap"><div class="mini-fretboard">${rows}</div></div>
    `;
    document.getElementById("snapshot-list").prepend(card);
  }

  importProgression() {
    const txt = document.getElementById("chord-importer-textarea").value;
    const genre = document.getElementById("genre-select").value;
    if (!txt) return;
    this.progression.clear();
    let allChordsFound = [];
    const measures = txt.split("|").map(m => m.trim()).filter(m => m);
    measures.forEach((m) => {
      const chords = m.split(/\s+/).filter(c => c);
      if (!chords.length) return;
      const bars = 1.0 / chords.length;
      chords.forEach((c, idx) => {
        if (c === "%" || c === "•/•") return;
        const p = ChordParser.parse(c); if (!p) return;
        const nextC = chords[idx + 1] || null;
        allChordsFound.push(c);
        this.progression.addStep({ 
          root: p.root, 
          scale: ChordParser.getScale(c, nextC, genre), 
          bars: bars, beats: 4, chordName: c, 
          chordIntervals: ChordParser.getIntervals(c).join(",") 
        });
      });
    });
    if(allChordsFound.length > 0) {
      const key = detectKey(allChordsFound);
      document.getElementById('overall-suggestion').style.display = 'block';
      document.getElementById('suggestion-text').innerText = key
        ? `Tonalità suggerita: ${key.label}`
        : `Accordi: ${allChordsFound.join(' → ')}`;
    }
    this.renderVoiceLeading();
    app.save();
  }

  renderVoiceLeading() {
    const panel = document.getElementById('voice-leading-panel');
    if (!panel) return;
    const steps = this.progression.getSteps();
    if (steps.length < 2) { panel.innerHTML = ''; return; }

    const parseStep = (step) => {
      const chord = step.querySelector('.prog-chord-name').value;
      const root  = step.querySelector('.prog-root-select').value;
      const ri    = Theory.NOTES.indexOf(root);
      const ints  = ChordParser.getIntervals(chord);
      const third   = ints.find(i => i === 3 || i === 4);
      const seventh = ints.find(i => i === 9 || i === 10 || i === 11);
      const absNote = (semi) => ri !== -1 && semi != null ? (ri + semi) % 12 : null;
      const noteName = (semi) => semi != null && ri !== -1 ? Theory.NOTES[(ri + semi) % 12] : '–';
      return { chord, thirdAbs: absNote(third), seventhAbs: absNote(seventh), thirdNote: noteName(third), seventhNote: noteName(seventh) };
    };

    const data = steps.map(parseStep);
    const deltaStr = (curr, prev) => {
      if (curr == null || prev == null) return '<span class="vl-delta vl-static">–</span>';
      const raw = (curr - prev + 12) % 12;
      const d   = raw > 6 ? raw - 12 : raw;
      const cls = d === 0 ? 'vl-static' : Math.abs(d) <= 2 ? 'vl-smooth' : 'vl-leap';
      return `<span class="vl-delta ${cls}">${d > 0 ? '+' : ''}${d}</span>`;
    };

    let html = `<div style="font-size:0.72em;text-transform:uppercase;color:#555;font-weight:700;margin-bottom:6px;letter-spacing:0.5px;">Voice Leading — Guide Tones</div>
      <table class="vl-table"><thead><tr><th>Accordo</th><th>3ª</th><th>Δ</th><th>7ª</th><th>Δ</th></tr></thead><tbody>`;
    data.forEach((d, i) => {
      const prev = data[i - 1];
      html += `<tr>
        <td class="vl-chord">${d.chord}</td>
        <td class="vl-note">${d.thirdNote}</td>
        <td>${deltaStr(d.thirdAbs, prev?.thirdAbs)}</td>
        <td class="vl-note">${d.seventhNote}</td>
        <td>${deltaStr(d.seventhAbs, prev?.seventhAbs)}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    panel.innerHTML = html;
  }
}

// ---- i18n System ----
window.currentLang = 'it';
const THEORY_IT_CACHE = {};

const TRANSLATIONS = {
  it: {
    'nav.explorer':'Explorer','nav.player':'Player','nav.calculator':'Calculator',
    'nav.interval-learner':'Interval Learner','nav.grade-learner':'Grade Learner',
    'nav.snapshots':'Snapshots','nav.note-finder':'Note Finder',
    'nav.teoria-generale':'Teoria Generale','nav.teoria':'Teoria Jazz',
    'label.tuning':'Accordatura','label.key':'Tonalità','label.scale':'Scala',
    'opt.none':'Nessuna','label.hide-outside':'Nascondi Note Esterne',
    'label.arpeggio':'Arpeggio (1-3-5-7)','label.notation':'Notazione',
    'opt.intervals':'Intervalli','opt.notes':'Note',
    'label.accidentals':'Alterazioni','opt.sharp':'Sharp (#)','opt.flat':'Flat (b)',
    'btn.reset-display':'Reimposta',
    'title.explorer':'EXPLORER','title.player':'PLAYER','title.calculator':'CALCULATOR',
    'title.interval-learner':'INTERVAL LEARNER','title.grade-learner':'GRADE LEARNER',
    'title.snapshots':'SNAPSHOTS','title.note-finder':'NOTE FINDER',
    'title.teoria':'TEORIA JAZZ','title.teoria-generale':'TEORIA GENERALE',
    'explorer.help':'Clicca una swatch per evidenziare tutti gli intervalli. Clicca un tasto per attivare/disattivare la nota.',
    'label.display-mode':'Modalità Display','opt.normal':'Visualizzazione Normale',
    'opt.highlight':'Highlight Interattivo','opt.custom':'Costruttore Scala',
    'btn.export-json':'Esporta JSON','btn.import-json':'Importa JSON',
    'btn.clear-all-notes':'Cancella Note',
    'mode.normal':'Normal View: Mostra tutte le note della scala selezionata.',
    'mode.highlight':'Highlight Mode: Clicca una swatch per evidenziare un intervallo. Clicca un tasto per highlight manuale.',
    'mode.custom':'Custom Scale Builder: Clicca i tasti per costruire la tua scala personalizzata.',
    'player.title':'Play Along Mode','btn.add-step':'+ Aggiungi Step','btn.clear-all':'Cancella Tutto',
    'section.playback':'Playback','label.bpm':'BPM','label.vol':'Vol','label.click':'Click',
    'section.chord-synth':'Chord Synth','label.sound':'Suono','label.synth':'Synth','label.loop':'Loop',
    'section.transposition':'Trasposizione','label.prog-transpose':'Progressione','label.synth-octave':'Ottava Synth',
    'section.transport':'Trasporto',
    'calc.result':'Risultato Analisi','label.context':'Contesto',
    'opt.jazz':'Jazz (Standard)','opt.blues':'Blues','opt.pop':'Pop / Rock',
    'label.common-progressions':'Progressioni Comuni','btn.import-calc':'Importa & Calcola',
    'il.title':'Interval Learner','il.instructions':'I controlli del gioco sono disponibili sopra il manico della chitarra.',
    'il.description':'Verrà indicata una nota di partenza (Root) e un intervallo da trovare. Seleziona una nota sul manico.',
    'il.ready':'Premi "Inizia" per partire','il.status':'Mettiti alla prova! Trova l\'intervallo richiesto.',
    'il.click-status':'Clicca la nota corretta sul manico!',
    'il.correct':'Corretto! Bravissimo.','il.wrong':'Sbagliato! Ecco le posizioni corrette:',
    'btn.start-next':'Inizia / Prossimo','btn.reset-game':'Reset',
    'gl.title':'Grade Learner','gl.ready':'Premi "Inizia" per partire',
    'gl.status':'Mettiti alla prova! Qual è il grado della nota?',
    'gl.hint':'Usa il circolo cromatico per identificare i gradi. Se sbagli, la nota corretta verrà evidenziata.',
    'gl.correct':'Bravo! Risposta corretta.','gl.wrong':'Sbagliato! La nota corretta è evidenziata.',
    'snap.title':'Snapshots','btn.save-snapshot':'Salva Snapshot','btn.clear-snapshots':'Cancella Tutti',
    'btn.delete':'Delete',
    'nf.title':'Note Finder','nf.instructions':'Allena la memorizzazione delle note sul manico. I controlli del gioco sono sopra il manico.',
    'nf.how-title':'Come funziona:',
    'nf.how-desc':'Ti verrà chiesta una nota da trovare sul manico (es. "Trova: F#"). Clicca qualsiasi posizione corretta per segnare un punto.',
    'nf.ready':'Premi "Inizia" per partire','nf.status':'Trova la nota richiesta sul manico della chitarra.',
    'nf.click-status':'Clicca qualsiasi posizione corretta sul manico!',
    'nf.correct':'Corretto! Bravissimo.','nf.wrong':'Sbagliato! Ecco le posizioni corrette:',
    'nf.find-prefix':'TROVA',
    'tg.title':'Teoria Musicale Generale',
    'tg.subtitle':'Le fondamenta del linguaggio musicale spiegate in modo chiaro e strutturato.',
    'tj.title':'Teoria Jazz',
    'tj.subtitle':'Guida di riferimento per chi vuole imparare a suonare e improvvisare jazz.',
    'th.gen1':'1. Sistema Notazionale e Pentagramma','th.gen2':'2. Durate e Figure Musicali',
    'th.gen3':'3. Tempo, Battute e Accenti','th.gen4':'4. Il Circolo delle Quinte e Tonalità',
    'th.gen5':'5. Armonia: Costruzione degli Accordi',
    'th.gen6':'6. Accordi Diatonici della Scala Maggiore','th.gen7':'7. Rivolti degli Accordi (Inversioni)',
    'th.jazz1':'I 12 Intervalli','th.jazz2':'Le Scale Jazz','th.jazz3':'Gli Accordi Jazz',
    'th.jazz4':'Progressioni Fondamentali','th.jazz5':'Il Sistema CAGED',
    'th.jazz6':'Come Improvvisare Jazz','th.jazz7':'Note Guida (Guide Tones)',
    'th.jazz8':'Sostituzione del Tritono','th.jazz9':'Cromatismo e Note di Approccio',
    'help.title':'Notazione Scale Calculator',
    'help.desc':'Il calcolatore analizza progressioni di accordi e suggerisce scale appropriate.',
    'help.chords':'Accordi:','help.chords-desc':'Notazione standard tipo Cmaj7, G7, Am7b5.',
    'help.sep':'Separatori:','help.sep-desc':'Usa spazi o barre verticali (|).',
    'help.repeat':'Ripetizione:','help.repeat-desc':'Usa % o •/• per ripetere la misura precedente.',
    'btn.close':'Chiudi',
    'err.invalid-json':'File JSON non valido.','err.scale-load':'Errore nel caricamento della scala.',
    'label.score':'Punteggio',
    'il.find-prefix':'Trova','il.find-of':'di',
    'nav.chord-voicing':'Chord Voicing','nav.ear-training':'Ear Training',
    'nav.scale-navigator':'Scale Navigator','nav.lick-builder':'Lick Builder',
    'nav.groove-trainer':'Groove Trainer','nav.real-book':'Real Book',
    'nav.tuner':'Accordatore',
    'title.chord-voicing':'CHORD VOICING','title.ear-training':'EAR TRAINING',
    'title.scale-navigator':'SCALE NAVIGATOR','title.lick-builder':'LICK BUILDER',
    'title.groove-trainer':'GROOVE TRAINER','title.real-book':'REAL BOOK',
    'title.tuner':'ACCORDATORE',
    'cv.title':'Chord Voicing Explorer','cv.subtitle':'Esplora i toni degli accordi jazz sul manico.',
    'cv.chord-type':'Tipo Accordo','cv.load-btn':'Carica su Fretboard',
    'cv.formula':'Formula','cv.scale-rec':'Scala Consigliata','cv.info-desc':'Descrizione',
    'cv.fingering':'Diteggiatura',
    'cv.tip-text':'Premi "Carica su Fretboard" per visualizzare i toni sul manico con Arpeggio attivo. Usa la sidebar per esplorare scale associate.',
    'btn.replay':'🔊 Riascolta',
    'gl.free-mode':'Modalità Libera',
    'tuner.title':'Accordatore Cromatico',
    'tuner.subtitle':'Suona una corda: l\'accordatore rileva la nota in tempo reale tramite microfono.',
    'tuner.start':'🎙 Avvia','tuner.stop':'⏹ Stop',
    'tuner.status':'Premi Avvia per iniziare.',
    'tuner.ref':'Note di riferimento (clic = suona)',
    'lb.sound':'Suono',
    'et.title':'Ear Training','et.subtitle':'Allena l\'orecchio: identifica gli accordi.',
    'et.ready':'Premi ▶ Play per ascoltare','et.status':'Seleziona la difficoltà e ascolta.',
    'et.listening':'Ascolta... poi scegli!','et.correct':'✓ Corretto! Bravissimo.',
    'et.wrong':'✗ Sbagliato! Era:','et.difficulty':'Difficoltà',
    'et.easy':'Facile','et.medium':'Medio','et.hard':'Avanzato',
    'btn.play-chord':'▶ Play Accordo',
    'sn.title':'Scale Navigator','sn.subtitle':'Trova le scale adatte a ogni accordo jazz.',
    'sn.chord-type':'Tipo Accordo','sn.load-btn':'Carica','sn.no-results':'Nessun risultato.',
    'lb.title':'Lick Builder','lb.subtitle':'Componi e suona le tue frasi musicali sul manico.',
    'lb.play':'▶ Play','lb.stop':'⏹ Stop','lb.undo':'↩ Undo','lb.clear':'× Cancella',
    'lb.subdivision':'Suddivisione','lb.empty':'Clicca le note sul manico per costruire un lick...',
    'lb.tip':'Seleziona la scala nella sidebar, poi clicca le note sul manico per registrare il tuo lick.',
    'gt.title':'Groove Trainer','gt.subtitle':'Metronomo avanzato con pattern visivo programmabile.',
    'gt.subdivision':'Suddivisione','gt.quarters':'Quarti','gt.eighths':'Ottavi',
    'gt.sixteenths':'Sedicesimi','gt.triplets':'Terzine',
    'gt.preset-all':'Tutti','gt.preset-down':'Battere','gt.preset-back':'Backbeat',
    'gt.preset-clave':'Clave 3:2','gt.clear-pattern':'Reset',
    'rb.title':'Real Book','rb.subtitle':'Standard jazz pronti da caricare nel Player.',
    'rb.load-btn':'Carica nel Player','rb.no-results':'Nessun risultato trovato.',
    'rb.search':'Cerca standard...',
    'sg.play':'Suona','sg.training':'Allenamento','sg.build':'Componi','sg.theory':'Teoria','sg.tools':'Strumenti', 'sg.explore':'Esplora',
    'nav.interval-ear-training':'Interval Ear Training','title.interval-ear-training':'INTERVAL EAR TRAINING',
    'iet.title':'Interval Ear Training','iet.subtitle':'Allena l\'orecchio: identifica gli intervalli musicali ad orecchio.',
    'iet.ready':'Premi ▶ Play per ascoltare','iet.listening':'Ascolta... poi scegli!',
    'iet.correct':'✓ Corretto! Bravissimo.','iet.wrong':'✗ Sbagliato! Era:',
    'nav.reharmonizer':'Reharmonizer','title.reharmonizer':'REHARMONIZER',
    'rh.title':'Reharmonizer','rh.subtitle':'Inserisci una progressione per ottenere sostituzioni armoniche.',
    'rh.placeholder':'Es: Dm7 G7 Cmaj7','rh.analyze':'Analizza',
    'rh.no-results':'Nessun accordo riconosciuto.',
    'rh.tritone-sub':'Tritone Sub','rh.altered':'Alt. Dom.',
    'rh.ii-of-v':'ii del V','rh.diatonic-3':'III sub',
    'rh.diatonic-6':'VI sub','rh.modal-bvii':'bVII (MI)',
    'rh.modal-bvi':'bVI (MI)','rh.relative-maj':'Relativo Mag.',
    'rh.backdoor':'Backdoor Dom.','rh.iv-maj':'IV Mag.',
    'rh.dim-sub':'Dim7 sub','rh.dom-b9':'Dom. b9',
    'rh.dim-as-dom':'Dim → Dom','rh.sec-dom':'Dom. Sec.',
    'th.jazz10':'Scale Bebop','th.jazz11':'Modal Interchange',
    'th.jazz12':'Ritmo e Comping Jazz',
    'lb.loop':'Loop','lb.trans-up':'+1 st','lb.trans-down':'-1 st',
    'lb.speed-trainer':'Speed Trainer','lb.export-tab':'Esporta Tab',
    'lb.export-json':'Esporta JSON','lb.import-json':'Importa JSON',
    'il.descending':'Discendente',
    'label.swing':'Swing 8°',
    'btn.auto-chords':'Auto Accordi',
    'nav.chord-finder':'Chord Finder','nav.transposer':'Trasposit. Rapido',
    'title.chord-finder':'CHORD FINDER','title.transposer':'TRASPOSIT. RAPIDO',
    'cf.title':'Chord Finder','cf.subtitle':'Seleziona le note per trovare il nome dell\'accordo.',
    'cf.select-notes':'Seleziona Note','cf.results':'Accordi trovati',
    'qt.title':'Trasposit. Rapido','qt.subtitle':'Trasponi velocemente una progressione di accordi.',
    'qt.semitones':'Semitoni','qt.transpose':'Trasponi','qt.load-player':'→ Player','qt.copy':'Copia',
    'et.history':'Statistiche per tipo','et.clear-history':'Cancella Storico',
  },
  en: {
    'nav.explorer':'Explorer','nav.player':'Player','nav.calculator':'Calculator',
    'nav.interval-learner':'Interval Learner','nav.grade-learner':'Grade Learner',
    'nav.snapshots':'Snapshots','nav.note-finder':'Note Finder',
    'nav.teoria-generale':'Music Theory','nav.teoria':'Jazz Theory',
    'label.tuning':'Tuning','label.key':'Key','label.scale':'Scale',
    'opt.none':'None','label.hide-outside':'Hide Outside Notes',
    'label.arpeggio':'Arpeggio (1-3-5-7)','label.notation':'Notation',
    'opt.intervals':'Intervals','opt.notes':'Notes',
    'label.accidentals':'Accidentals','opt.sharp':'Sharp (#)','opt.flat':'Flat (b)',
    'btn.reset-display':'Reset Display',
    'title.explorer':'EXPLORER','title.player':'PLAYER','title.calculator':'CALCULATOR',
    'title.interval-learner':'INTERVAL LEARNER','title.grade-learner':'GRADE LEARNER',
    'title.snapshots':'SNAPSHOTS','title.note-finder':'NOTE FINDER',
    'title.teoria':'JAZZ THEORY','title.teoria-generale':'MUSIC THEORY',
    'explorer.help':'Click a swatch to highlight all intervals. Click a fret to toggle a note.',
    'label.display-mode':'Display Mode','opt.normal':'Normal View',
    'opt.highlight':'Interactive Highlight','opt.custom':'Scale Builder',
    'btn.export-json':'Export JSON','btn.import-json':'Import JSON',
    'btn.clear-all-notes':'Clear Notes',
    'mode.normal':'Normal View: Shows all notes in the selected scale.',
    'mode.highlight':'Highlight Mode: Click a swatch to highlight an interval. Click a fret for manual highlight.',
    'mode.custom':'Custom Scale Builder: Click frets to build your custom scale.',
    'player.title':'Play Along Mode','btn.add-step':'+ Add Step','btn.clear-all':'Clear All',
    'section.playback':'Playback','label.bpm':'BPM','label.vol':'Vol','label.click':'Click',
    'section.chord-synth':'Chord Synth','label.sound':'Sound','label.synth':'Synth','label.loop':'Loop',
    'section.transposition':'Transposition','label.prog-transpose':'Progression','label.synth-octave':'Synth Octave',
    'section.transport':'Transport',
    'calc.result':'Analysis Result','label.context':'Context',
    'opt.jazz':'Jazz (Standard)','opt.blues':'Blues','opt.pop':'Pop / Rock',
    'label.common-progressions':'Common Progressions','btn.import-calc':'Import & Calculate',
    'il.title':'Interval Learner','il.instructions':'Game controls are shown above the fretboard.',
    'il.description':'A starting note (Root) and an interval to find will be shown. Select a note on the fretboard.',
    'il.ready':'Press "Start" to begin','il.status':'Test yourself! Find the requested interval.',
    'il.click-status':'Click the correct note on the fretboard!',
    'il.correct':'Correct! Well done.','il.wrong':'Wrong! Here are the correct positions:',
    'btn.start-next':'Start / Next','btn.reset-game':'Reset',
    'gl.title':'Grade Learner','gl.ready':'Press "Start" to begin',
    'gl.status':'Test yourself! Which degree is this note?',
    'gl.hint':'Use the chromatic circle to identify degrees. If wrong, the correct note will be highlighted.',
    'gl.correct':'Correct! Great answer.','gl.wrong':'Wrong! The correct note is highlighted.',
    'snap.title':'Snapshots','btn.save-snapshot':'Save Snapshot','btn.clear-snapshots':'Clear All',
    'btn.delete':'Delete',
    'nf.title':'Note Finder','nf.instructions':'Train fretboard memorization. Game controls are above the fretboard.',
    'nf.how-title':'How it works:',
    'nf.how-desc':'You will be asked to find a note on the fretboard (e.g. "Find: F#"). Click any correct position to score.',
    'nf.ready':'Press "Start" to begin','nf.status':'Find the requested note on the fretboard.',
    'nf.click-status':'Click any correct position on the fretboard!',
    'nf.correct':'Correct! Well done.','nf.wrong':'Wrong! Here are the correct positions:',
    'nf.find-prefix':'FIND',
    'tg.title':'General Music Theory',
    'tg.subtitle':'The fundamentals of musical language explained in a clear and structured way.',
    'tj.title':'Jazz Theory',
    'tj.subtitle':'A reference guide for learning to play and improvise jazz.',
    'th.gen1':'1. Notation System & Staff','th.gen2':'2. Note Values & Rhythmic Figures',
    'th.gen3':'3. Time Signatures, Bars & Accents','th.gen4':'4. The Circle of Fifths & Keys',
    'th.gen5':'5. Harmony: Building Chords',
    'th.gen6':'6. Diatonic Chords of the Major Scale','th.gen7':'7. Chord Inversions',
    'th.jazz1':'The 12 Intervals','th.jazz2':'Jazz Scales','th.jazz3':'Jazz Chords',
    'th.jazz4':'Essential Progressions','th.jazz5':'The CAGED System',
    'th.jazz6':'How to Improvise Jazz','th.jazz7':'Guide Tones',
    'th.jazz8':'Tritone Substitution','th.jazz9':'Chromaticism & Approach Notes',
    'help.title':'Scale Calculator Notation',
    'help.desc':'The calculator analyzes chord progressions and suggests appropriate scales.',
    'help.chords':'Chords:','help.chords-desc':'Standard notation like Cmaj7, G7, Am7b5.',
    'help.sep':'Separators:','help.sep-desc':'Use spaces or vertical bars (|).',
    'help.repeat':'Repeat:','help.repeat-desc':'Use % or •/• to repeat the previous measure.',
    'btn.close':'Close',
    'err.invalid-json':'Invalid JSON file.','err.scale-load':'Error loading scale file.',
    'label.score':'Score',
    'il.find-prefix':'Find','il.find-of':'from',
    'nav.chord-voicing':'Chord Voicing','nav.ear-training':'Ear Training',
    'nav.scale-navigator':'Scale Navigator','nav.lick-builder':'Lick Builder',
    'nav.groove-trainer':'Groove Trainer','nav.real-book':'Real Book',
    'nav.tuner':'Tuner',
    'title.chord-voicing':'CHORD VOICING','title.ear-training':'EAR TRAINING',
    'title.scale-navigator':'SCALE NAVIGATOR','title.lick-builder':'LICK BUILDER',
    'title.groove-trainer':'GROOVE TRAINER','title.real-book':'REAL BOOK',
    'title.tuner':'TUNER',
    'cv.title':'Chord Voicing Explorer','cv.subtitle':'Explore jazz chord tones on the fretboard.',
    'cv.chord-type':'Chord Type','cv.load-btn':'Load to Fretboard',
    'cv.formula':'Formula','cv.scale-rec':'Recommended Scale','cv.info-desc':'Description',
    'cv.fingering':'Fingering',
    'cv.tip-text':'Press "Load to Fretboard" to display chord tones with Arpeggio mode active. Use the sidebar to explore associated scales.',
    'btn.replay':'🔊 Play Again',
    'gl.free-mode':'Free Mode',
    'tuner.title':'Chromatic Tuner',
    'tuner.subtitle':'Play a string: the tuner detects the note in real time via microphone.',
    'tuner.start':'🎙 Start','tuner.stop':'⏹ Stop',
    'tuner.status':'Press Start to begin.',
    'tuner.ref':'Reference notes (click = play)',
    'lb.sound':'Sound',
    'et.title':'Ear Training','et.subtitle':'Train your ear: identify chords by sound.',
    'et.ready':'Press ▶ Play to listen','et.status':'Select difficulty and listen.',
    'et.listening':'Listening... then choose!','et.correct':'✓ Correct! Well done.',
    'et.wrong':'✗ Wrong! It was:','et.difficulty':'Difficulty',
    'et.easy':'Easy','et.medium':'Medium','et.hard':'Advanced',
    'btn.play-chord':'▶ Play Chord',
    'sn.title':'Scale Navigator','sn.subtitle':'Find the right scale for every jazz chord.',
    'sn.chord-type':'Chord Type','sn.load-btn':'Load','sn.no-results':'No results found.',
    'lb.title':'Lick Builder','lb.subtitle':'Write and play your musical phrases on the fretboard.',
    'lb.play':'▶ Play','lb.stop':'⏹ Stop','lb.undo':'↩ Undo','lb.clear':'× Clear',
    'lb.subdivision':'Subdivision','lb.empty':'Click notes on the fretboard to build a lick...',
    'lb.tip':'Select a scale in the sidebar, then click notes on the fretboard to record your lick.',
    'gt.title':'Groove Trainer','gt.subtitle':'Advanced metronome with programmable visual pattern.',
    'gt.subdivision':'Subdivision','gt.quarters':'Quarter Notes','gt.eighths':'Eighth Notes',
    'gt.sixteenths':'Sixteenth Notes','gt.triplets':'Triplets',
    'gt.preset-all':'All','gt.preset-down':'Downbeats','gt.preset-back':'Backbeat',
    'gt.preset-clave':'Clave 3:2','gt.clear-pattern':'Reset',
    'rb.title':'Real Book','rb.subtitle':'Jazz standards ready to load into the Player.',
    'rb.load-btn':'Load to Player','rb.no-results':'No results found.',
    'rb.search':'Search standards...',
    'sg.play':'Play','sg.training':'Training','sg.build':'Compose','sg.theory':'Theory','sg.tools':'Tools', 'sg.explore':'Explore',
    'nav.interval-ear-training':'Interval Ear Training','title.interval-ear-training':'INTERVAL EAR TRAINING',
    'iet.title':'Interval Ear Training','iet.subtitle':'Train your ear: identify musical intervals by sound.',
    'iet.ready':'Press ▶ Play to listen','iet.listening':'Listening... then choose!',
    'iet.correct':'✓ Correct! Well done.','iet.wrong':'✗ Wrong! It was:',
    'nav.reharmonizer':'Reharmonizer','title.reharmonizer':'REHARMONIZER',
    'rh.title':'Reharmonizer','rh.subtitle':'Enter a progression to get harmonic substitutions.',
    'rh.placeholder':'e.g.: Dm7 G7 Cmaj7','rh.analyze':'Analyze',
    'rh.no-results':'No recognized chords.',
    'rh.tritone-sub':'Tritone Sub','rh.altered':'Alt. Dom.',
    'rh.ii-of-v':'ii of V','rh.diatonic-3':'III sub',
    'rh.diatonic-6':'VI sub','rh.modal-bvii':'bVII (MI)',
    'rh.modal-bvi':'bVI (MI)','rh.relative-maj':'Relative Maj.',
    'rh.backdoor':'Backdoor Dom.','rh.iv-maj':'IV Maj.',
    'rh.dim-sub':'Dim7 sub','rh.dom-b9':'Dom. b9',
    'rh.dim-as-dom':'Dim → Dom','rh.sec-dom':'Sec. Dom.',
    'th.jazz10':'Bebop Scales','th.jazz11':'Modal Interchange',
    'th.jazz12':'Jazz Rhythm & Comping',
    'lb.loop':'Loop','lb.trans-up':'+1 st','lb.trans-down':'-1 st',
    'lb.speed-trainer':'Speed Trainer','lb.export-tab':'Export Tab',
    'lb.export-json':'Export JSON','lb.import-json':'Import JSON',
    'il.descending':'Descending',
    'label.swing':'Swing 8th',
    'btn.auto-chords':'Auto Chords',
    'nav.chord-finder':'Chord Finder','nav.transposer':'Quick Transposer',
    'title.chord-finder':'CHORD FINDER','title.transposer':'QUICK TRANSPOSER',
    'cf.title':'Chord Finder','cf.subtitle':'Select notes to identify the chord name.',
    'cf.select-notes':'Select Notes','cf.results':'Matching Chords',
    'qt.title':'Quick Transposer','qt.subtitle':'Quickly transpose a chord progression.',
    'qt.semitones':'Semitones','qt.transpose':'Transpose','qt.load-player':'→ Player','qt.copy':'Copy',
    'et.history':'Stats by type','et.clear-history':'Clear History',
  }
};

function T(key) {
  const d = TRANSLATIONS[window.currentLang] || TRANSLATIONS.it;
  return d[key] !== undefined ? d[key] : (TRANSLATIONS.it[key] || key);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T(el.getAttribute('data-i18n'));
    if (v && typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-nav]').forEach(el => {
    const v = T('nav.' + el.getAttribute('data-i18n-nav'));
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const v = T(el.getAttribute('data-i18n-placeholder'));
    if (v) el.placeholder = v;
  });
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = window.currentLang === 'it' ? 'EN' : 'IT';
  if (typeof app !== 'undefined' && app) {
    const titleMap = {
      'explorer': T('title.explorer'), 'player': T('title.player'), 'calculator': T('title.calculator'),
      'interval-learner': T('title.interval-learner'), 'grade-learner': T('title.grade-learner'),
      'snapshots': T('title.snapshots'), 'note-finder': T('title.note-finder'),
      'teoria': T('title.teoria'), 'teoria-generale': T('title.teoria-generale'),
      'chord-voicing': T('title.chord-voicing'), 'ear-training': T('title.ear-training'),
      'scale-navigator': T('title.scale-navigator'), 'lick-builder': T('title.lick-builder'),
      'groove-trainer': T('title.groove-trainer'), 'real-book': T('title.real-book'),
      'tuner': T('title.tuner'),
      'interval-ear-training': T('title.interval-ear-training'),
      'reharmonizer': T('title.reharmonizer'),
    };
    const titleEl = document.getElementById('view-title');
    if (titleEl) titleEl.innerText = titleMap[app.currentView] || app.currentView.toUpperCase();
    const modeEl = document.getElementById('mode-description');
    if (modeEl && app.explorerMode) modeEl.innerText = T('mode.' + app.explorerMode);
  }
}

function applyTheory(lang) {
  document.querySelectorAll('[data-theory-id]').forEach(el => {
    const id = el.getAttribute('data-theory-id');
    if (lang === 'en' && THEORY_EN[id]) {
      if (!THEORY_IT_CACHE[id]) THEORY_IT_CACHE[id] = el.innerHTML;
      el.innerHTML = THEORY_EN[id];
    } else if (lang === 'it' && THEORY_IT_CACHE[id]) {
      el.innerHTML = THEORY_IT_CACHE[id];
    }
  });
}

function setLang(lang) {
  window.currentLang = lang;
  applyTranslations();
  applyTheory(lang);
}

window.toggleLang = function() { setLang(window.currentLang === 'it' ? 'en' : 'it'); };

// ---- English Theory Content ----
const THEORY_EN = {
  'gen-1': `<p class="teoria-intro">Music uses a graphical system to represent the pitch and duration of sounds. The <strong>Staff</strong> is the heart of this system.</p>
    <div class="music-staff"><div class="staff-line"></div><div class="staff-line"><div class="staff-note" style="left:20%;bottom:-5px"></div></div><div class="staff-line"><div class="staff-note" style="left:50%;bottom:-5px"></div></div><div class="staff-line"><div class="staff-note" style="left:80%;bottom:-5px"></div></div><div class="staff-line"></div></div>
    <ul class="tip-list">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>The Staff:</strong> 5 lines and 4 spaces. Notes are written on lines or in spaces. The higher the note, the higher the pitch.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Ledger Lines:</strong> Short lines used for notes that go beyond the staff (e.g. middle C below the treble clef).</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Accidentals:</strong><div class="tip-sub-list"><div class="tip-sub-item"><em>Sharp (#)</em>: Raises the note by one semitone.</div><div class="tip-sub-item"><em>Flat (b)</em>: Lowers the note by one semitone.</div><div class="tip-sub-item"><em>Natural (♮)</em>: Cancels a sharp or flat.</div></div></div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Key Signature vs. Accidentals:</strong> Key signatures apply to the whole piece; accidentals apply only to that measure.</div></li>
    </ul>`,
  'gen-2': `<p class="teoria-intro">Each note has a "figure" indicating its relative duration. The system is based on binary divisions (half, quarter, eighth...).</p>
    <div class="scale-grid">
      <div class="scale-item"><div class="scale-item-name">Whole Note (4/4)</div><div class="scale-item-desc">An open oval without a stem. Lasts 4 beats in 4/4 time.</div></div>
      <div class="scale-item"><div class="scale-item-name">Half Note (2/4)</div><div class="scale-item-desc">An open oval with a stem. Lasts 2 beats. Two half notes = one whole note.</div></div>
      <div class="scale-item"><div class="scale-item-name">Quarter Note (1/4)</div><div class="scale-item-desc">A filled oval with a stem. Lasts 1 beat — the standard metronome beat.</div></div>
      <div class="scale-item"><div class="scale-item-name">Eighth Note (1/8)</div><div class="scale-item-desc">A filled oval with a flag. Lasts half a beat.</div></div>
      <div class="scale-item"><div class="scale-item-name">Sixteenth Note (1/16)</div><div class="scale-item-desc">A filled oval with two flags. Lasts a quarter of a beat.</div></div>
    </div>
    <div class="teoria-tip mt-3"><strong>Dotted Notes:</strong> A dot after a note increases its duration by half (e.g. a dotted quarter note lasts 1.5 beats).</div>`,
  'gen-3': `<p class="teoria-intro">Musical time organizes the flow of notes into regular units called <strong>Measures</strong> (or Bars).</p>
    <div class="prog-example">Time Signature: 4 / 4\nTop: 4 beats per measure\nBottom: each beat is a quarter note</div>
    <ul class="tip-list">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Simple Time:</strong> Each beat subdivides into 2. Examples: 2/4, 3/4, 4/4.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Compound Time:</strong> Each beat subdivides into 3. Examples: 6/8, 9/8, 12/8.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Accents:</strong><div class="tip-sub-list"><div class="tip-sub-item"><em>Strong</em> (beat 1).</div><div class="tip-sub-item"><em>Weak</em> (other beats).</div><div class="tip-sub-item"><em>Medium-strong</em> (beat 3 in 4/4).</div></div></div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Syncopation:</strong> Shifting the accent from a strong beat to a weak beat. The soul of jazz and funk.</div></li>
    </ul>`,
  'gen-4': `<p class="teoria-intro">The Circle of Fifths is the map of all keys. It shows how many accidentals (# or b) each key has.</p>
    <div class="circle-fifths-container"><div class="circle-fifths-wrap">
      <div class="circle-fifths-note center-key" style="top:0;left:50%">C <span>0 #/b</span></div>
      <div class="circle-fifths-note" style="top:6.7%;left:75%">G <span>1 #</span></div>
      <div class="circle-fifths-note" style="top:25%;left:93.3%">D <span>2 #</span></div>
      <div class="circle-fifths-note" style="top:50%;left:100%">A <span>3 #</span></div>
      <div class="circle-fifths-note" style="top:75%;left:93.3%">E <span>4 #</span></div>
      <div class="circle-fifths-note" style="top:93.3%;left:75%">B <span>5 #</span></div>
      <div class="circle-fifths-note" style="top:100%;left:50%">Gb <span>6 b</span></div>
      <div class="circle-fifths-note" style="top:93.3%;left:25%">Db <span>5 b</span></div>
      <div class="circle-fifths-note" style="top:75%;left:6.7%">Ab <span>4 b</span></div>
      <div class="circle-fifths-note" style="top:50%;left:0%">Eb <span>3 b</span></div>
      <div class="circle-fifths-note" style="top:25%;left:6.7%">Bb <span>2 b</span></div>
      <div class="circle-fifths-note" style="top:6.7%;left:25%">F <span>1 b</span></div>
    </div></div>
    <div class="teoria-tip"><strong>Practical Use:</strong> Adjacent keys (e.g. C and G) share almost all notes — ideal for modulations. The opposite key (e.g. C and Gb/F#) is harmonically the furthest.</div>`,
  'gen-5': `<p class="teoria-intro">Harmony arises from stacking sounds. The basic chord is the <strong>Triad</strong>: Root, Third, and Fifth.</p>
    <div class="harmony-example">
      <div class="harmony-triad"><div class="harmony-name">Major</div><div class="harmony-notes"><div class="harmony-note-box">1</div><div class="harmony-note-box">3</div><div class="harmony-note-box">5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Bright and stable.<br>M3 + m3</p></div>
      <div class="harmony-triad"><div class="harmony-name">Minor</div><div class="harmony-notes"><div class="harmony-note-box">1</div><div class="harmony-note-box">b3</div><div class="harmony-note-box">5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Melancholic and dark.<br>m3 + M3</p></div>
      <div class="harmony-triad"><div class="harmony-name">Diminished</div><div class="harmony-notes"><div class="harmony-note-box">1</div><div class="harmony-note-box">b3</div><div class="harmony-note-box">b5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Very tense and unstable.<br>m3 + m3</p></div>
      <div class="harmony-triad"><div class="harmony-name">Augmented</div><div class="harmony-notes"><div class="harmony-note-box">1</div><div class="harmony-note-box">3</div><div class="harmony-note-box">#5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Suspended and exotic.<br>M3 + M3</p></div>
    </div>
    <ul class="tip-list mt-3">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Scale Degrees:</strong><div class="tip-sub-list"><div class="tip-sub-item">I: <em>Tonic</em> (rest, stability).</div><div class="tip-sub-item">V: <em>Dominant</em> (maximum tension).</div><div class="tip-sub-item">IV: <em>Subdominant</em> (preparation).</div></div></div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Dissonance & Consonance:</strong> Music is a play between tension (dissonance) and resolution (consonance).</div></li>
    </ul>`,
  'gen-6': `<p class="teoria-intro">By building a seventh chord on each scale note, you get the <strong>Diatonic Chords</strong> — all the "native" chords of a key.</p>
    <table class="chord-table">
      <thead><tr><th>Degree</th><th>Name</th><th>In C Major</th><th>Type</th><th>Role</th></tr></thead>
      <tbody>
        <tr><td><span class="chord-symbol">I</span></td><td>Tonic</td><td><span class="chord-symbol">Cmaj7</span></td><td><span class="chord-formula">1–3–5–7</span></td><td>Rest, stability</td></tr>
        <tr><td><span class="chord-symbol">ii</span></td><td>Supertonic</td><td><span class="chord-symbol">Dm7</span></td><td><span class="chord-formula">1–b3–5–b7</span></td><td>Mild tension, prepares V</td></tr>
        <tr><td><span class="chord-symbol">iii</span></td><td>Mediant</td><td><span class="chord-symbol">Em7</span></td><td><span class="chord-formula">1–b3–5–b7</span></td><td>Sub for I or V</td></tr>
        <tr><td><span class="chord-symbol">IV</span></td><td>Subdominant</td><td><span class="chord-symbol">Fmaj7</span></td><td><span class="chord-formula">1–3–5–7</span></td><td>Color, movement</td></tr>
        <tr><td><span class="chord-symbol">V</span></td><td>Dominant</td><td><span class="chord-symbol">G7</span></td><td><span class="chord-formula">1–3–5–b7</span></td><td>Max tension, wants to resolve</td></tr>
        <tr><td><span class="chord-symbol">vi</span></td><td>Submediant</td><td><span class="chord-symbol">Am7</span></td><td><span class="chord-formula">1–b3–5–b7</span></td><td>Relative minor tonic</td></tr>
        <tr><td><span class="chord-symbol">vii°</span></td><td>Leading Tone</td><td><span class="chord-symbol">Bm7b5</span></td><td><span class="chord-formula">1–b3–b5–b7</span></td><td>Extreme tension, acts like V</td></tr>
      </tbody>
    </table>
    <div class="teoria-tip mt-3"><strong>Golden rule:</strong> In C Major, any chord from this table sounds good with the others. The <em>ii–V–I</em> (Dm7–G7–Cmaj7) uses degrees 2, 5 and 1 — it's the jazz formula.</div>`,
  'gen-7': `<p class="teoria-intro">A chord is in <strong>root position</strong> when its Root is in the bass. Placing another note in the bass creates an <strong>Inversion</strong>.</p>
    <div class="harmony-example">
      <div class="harmony-triad"><div class="harmony-name">Root Position</div><div class="harmony-notes"><div class="harmony-note-box" style="border-bottom:3px solid var(--accent)">1</div><div class="harmony-note-box">3</div><div class="harmony-note-box">5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Bass = Root<br>E.g.: C/C</p></div>
      <div class="harmony-triad"><div class="harmony-name">1st Inversion</div><div class="harmony-notes"><div class="harmony-note-box" style="border-bottom:3px solid var(--accent)">3</div><div class="harmony-note-box">5</div><div class="harmony-note-box">1</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Bass = Third<br>E.g.: C/E</p></div>
      <div class="harmony-triad"><div class="harmony-name">2nd Inversion</div><div class="harmony-notes"><div class="harmony-note-box" style="border-bottom:3px solid var(--accent)">5</div><div class="harmony-note-box">1</div><div class="harmony-note-box">3</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Bass = Fifth<br>E.g.: C/G</p></div>
      <div class="harmony-triad"><div class="harmony-name">3rd Inversion</div><div class="harmony-notes"><div class="harmony-note-box" style="border-bottom:3px solid var(--accent)">7</div><div class="harmony-note-box">1</div><div class="harmony-note-box">3</div><div class="harmony-note-box">5</div></div><p style="font-size:0.7em;margin-top:8px;color:#aaa">Bass = Seventh<br>E.g.: Cmaj7/B</p></div>
    </div>
    <ul class="tip-list mt-3">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Why use them:</strong> Inversions create smoother bass lines — the bass moves by step instead of jumping.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Notation:</strong> Written as chord/bass. E.g.: <em>G7/B</em> = G7 with B in bass (1st inversion).</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>In Jazz:</strong> 2nd inversion (fifth in bass) creates instability for passing chords. 1st inversion (third in bass) is common in ballads.</div></li>
    </ul>`,
  'jazz-1': `<p class="teoria-intro">Intervals are the distance in semitones between two notes — the fundamental vocabulary of music. Recognizing them by ear is the key to improvisation.</p>
    <div class="interval-grid">
      <div class="interval-row"><div class="interval-swatch" style="background:#e74c3c">R</div><span class="interval-name">Root</span><span class="interval-semitones">0 st</span><span class="interval-desc">The tonic — the gravitational center of everything.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#2980b9">b9</div><span class="interval-name">b9 (min 2nd)</span><span class="interval-semitones">1 st</span><span class="interval-desc">Acute tension. In altered and Phrygian scales. Typical jazz dissonance.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#3498db">9</div><span class="interval-name">9 (maj 2nd)</span><span class="interval-semitones">2 st</span><span class="interval-desc">Bright color. Adds openness and brilliance. The jazz extension par excellence.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#f1c40f;color:#000">b3</div><span class="interval-name">b3 (min 3rd)</span><span class="interval-semitones">3 st</span><span class="interval-desc">Minor third. Blues and minor character. Fundamental for jazz.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#f39c12">3</div><span class="interval-name">3 (maj 3rd)</span><span class="interval-semitones">4 st</span><span class="interval-desc">Major third. Bright character. Key guide tone of major chords.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#9b59b6">11</div><span class="interval-name">11 (perf 4th)</span><span class="interval-semitones">5 st</span><span class="interval-desc">Stable and neutral. Can clash on Maj7 chords.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#8e44ad">#11</div><span class="interval-name">#11 (Tritone)</span><span class="interval-semitones">6 st</span><span class="interval-desc">Maximum tension. The most dissonant interval. Fundamental in jazz.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#bdc3c7;color:#000">5</div><span class="interval-name">5 (perf 5th)</span><span class="interval-semitones">7 st</span><span class="interval-desc">Stable and empty. Often omitted in advanced jazz chords.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#95a5a6;color:#000">#5</div><span class="interval-name">#5 (aug 5th)</span><span class="interval-semitones">8 st</span><span class="interval-desc">Instability and exotic color. In augmented and altered scales.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#1abc9c">13</div><span class="interval-name">13 (maj 6th)</span><span class="interval-semitones">9 st</span><span class="interval-desc">Jazz sweetness. The 13 adds warmth to dominant chords.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#2ecc71">7</div><span class="interval-name">7 (min 7th)</span><span class="interval-semitones">10 st</span><span class="interval-desc">Dominant seventh. Creates tension towards resolution. Key guide tone.</span></div>
      <div class="interval-row"><div class="interval-swatch" style="background:#27ae60">maj7</div><span class="interval-name">maj7 (maj 7th)</span><span class="interval-semitones">11 st</span><span class="interval-desc">Major seventh. Lyrical, suspended character. Typical of Maj7 chords.</span></div>
    </div>`,
  'jazz-2': `<p class="teoria-intro">Each chord has one or more associated scales. Knowing which scale to use over each chord is the secret of jazz improvisation.</p>
    <div class="scale-grid">
      <div class="scale-item"><div class="scale-item-name">Ionian (Maj7)</div><div class="scale-item-chord">Over: Cmaj7, Fmaj7</div><div class="scale-item-desc">The classic major scale. Bright and stable. Foundation of all Western music.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Dorian (m7)</div><div class="scale-item-chord">Over: Dm7, Am7</div><div class="scale-item-desc">The jazz minor par excellence. Has a major 6th — brighter than natural minor. "So What" by Miles Davis.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Phrygian</div><div class="scale-item-chord">Over: Em7, chords with b9</div><div class="scale-item-desc">Minor with b9. Spanish/flamenco color. Dark and dramatic.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">b2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">b6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Lydian (Maj7#11)</div><div class="scale-item-chord">Over: Fmaj7, Maj7#11</div><div class="scale-item-desc">Major with #11 (tritone). Floating, dreamlike sound.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">#4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Mixolydian (7)</div><div class="scale-item-chord">Over: G7, C7, dominant chords</div><div class="scale-item-desc">The dominant scale par excellence. Like major but with b7. The sound of blues and rock.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Natural Minor</div><div class="scale-item-chord">Over: Am, Em, minor chords</div><div class="scale-item-desc">The classic minor scale. Dark and melodic. Foundation of rock and pop in minor.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">b6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Melodic Minor</div><div class="scale-item-chord">Over: mMaj7, jazz passages</div><div class="scale-item-desc">Minor with major 6th and 7th. Its modes (Altered, Lydian Dom.) are essential for modern jazz.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Altered (7alt)</div><div class="scale-item-chord">Over: G7alt, altered dominants</div><div class="scale-item-desc">7th mode of melodic minor. All altered tensions (b9, #9, #11, b13). Maximum tension before resolution.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">b2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">b4</span><span class="scale-int-badge">b5</span><span class="scale-int-badge">b6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Lydian Dominant</div><div class="scale-item-chord">Over: G7#11, Lydian dom.</div><div class="scale-item-desc">4th mode of melodic minor. Dominant with #11. Modern, brilliant jazz sound.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">#4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Harmonic Minor</div><div class="scale-item-chord">Over: minor cadences, V7-i</div><div class="scale-item-desc">Minor with major 7th. Dramatic and oriental. Creates a natural V7 in minor for strong cadences.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">b6</span><span class="scale-int-badge">7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Minor Pentatonic</div><div class="scale-item-chord">Over: almost everything in blues/rock</div><div class="scale-item-desc">5 notes. The starting point for blues and rock. Simple and always effective. Start here!</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Major Pentatonic</div><div class="scale-item-chord">Over: Maj chords, country, pop</div><div class="scale-item-desc">5 positive, open notes. Optimistic, country, soul sound. Perfect over Maj7 chords.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Blues</div><div class="scale-item-chord">Over: 12-bar blues, rock</div><div class="scale-item-desc">Minor pentatonic + b5 (blue note). That one extra note makes all the difference.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">b5</span><span class="scale-int-badge">5</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Diminished (H/W)</div><div class="scale-item-chord">Over: dim7, dom7b9</div><div class="scale-item-desc">Symmetric 8-note scale (alternating half-whole steps). Dark and mysterious.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">b5</span><span class="scale-int-badge">#5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Whole Tone</div><div class="scale-item-chord">Over: dom7#5, impressionism</div><div class="scale-item-desc">6 symmetric notes, all whole steps. Ambiguous, no clear tonal center. Used by Debussy and in modern jazz.</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">#4</span><span class="scale-int-badge">#5</span><span class="scale-int-badge">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name">Locrian</div><div class="scale-item-chord">Over: m7b5, ø (half-dim)</div><div class="scale-item-desc">The darkest mode. Diminished 5th. Used on the ii° in minor (e.g. Bm7b5 in Cm).</div><div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">b2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">b5</span><span class="scale-int-badge">b6</span><span class="scale-int-badge">b7</span></div></div>
    </div>`,
  'jazz-3': `<p class="teoria-intro">In jazz, seventh (or extended) chords are almost always used. The simple triad is rare.</p>
    <table class="chord-table">
      <thead><tr><th>Symbol</th><th>Name</th><th>Formula</th><th>Suggested Scales</th><th>Character</th></tr></thead>
      <tbody>
        <tr><td><span class="chord-symbol">Cmaj7</span></td><td>Major seventh</td><td><span class="chord-formula">1–3–5–7</span></td><td>Ionian, Lydian</td><td>Stable, bright</td></tr>
        <tr><td><span class="chord-symbol">Dm7</span></td><td>Minor seventh</td><td><span class="chord-formula">1–b3–5–b7</span></td><td>Dorian, Phrygian, Aeolian</td><td>Jazz minor, warm</td></tr>
        <tr><td><span class="chord-symbol">G7</span></td><td>Dominant seventh</td><td><span class="chord-formula">1–3–5–b7</span></td><td>Mixolydian, Altered, Lydian Dom.</td><td>Tension, wants to resolve</td></tr>
        <tr><td><span class="chord-symbol">Bm7b5</span></td><td>Half-diminished (ø)</td><td><span class="chord-formula">1–b3–b5–b7</span></td><td>Locrian, Dorian b5</td><td>Dark, minor tension</td></tr>
        <tr><td><span class="chord-symbol">Bdim7</span></td><td>Diminished seventh</td><td><span class="chord-formula">1–b3–b5–bb7</span></td><td>Diminished (H/W)</td><td>Very tense, symmetric</td></tr>
        <tr><td><span class="chord-symbol">CmMaj7</span></td><td>Minor Maj7</td><td><span class="chord-formula">1–b3–5–7</span></td><td>Melodic Minor</td><td>Mysterious, cinematic</td></tr>
        <tr><td><span class="chord-symbol">Cmaj7#11</span></td><td>Lydian Maj7</td><td><span class="chord-formula">1–3–5–7–#11</span></td><td>Lydian</td><td>Floating, dreamlike</td></tr>
        <tr><td><span class="chord-symbol">G7alt</span></td><td>Altered dominant</td><td><span class="chord-formula">1–3–b7 + alt.</span></td><td>Altered (7alt)</td><td>Maximum jazz tension</td></tr>
        <tr><td><span class="chord-symbol">Cmaj9</span></td><td>Major ninth</td><td><span class="chord-formula">1–3–5–7–9</span></td><td>Ionian, Lydian</td><td>Open, modern</td></tr>
        <tr><td><span class="chord-symbol">G13</span></td><td>Thirteenth</td><td><span class="chord-formula">1–3–b7–9–13</span></td><td>Mixolydian</td><td>Rich, jazz swing</td></tr>
      </tbody>
    </table>`,
  'jazz-4': `<p class="teoria-intro">These progressions are the DNA of jazz. Learning them in all keys is the first step to playing jazz standards.</p>
    <div class="prog-teoria-item"><div class="prog-teoria-name">Major ii–V–I <span class="prog-teoria-tag">Essential</span></div><div class="prog-example">| Dm7 | G7 | Cmaj7 |</div><div class="prog-teoria-desc">The most common jazz progression. Dm7 creates mild tension, G7 increases it with the tritone (B–F), Cmaj7 resolves smoothly. Learn it in all 12 keys.</div><button class="load-prog-btn" onclick="loadPreset('ii-V-I (C)')">Load in Player</button></div>
    <div class="prog-teoria-item"><div class="prog-teoria-name">Minor ii–V–i <span class="prog-teoria-tag">Essential</span></div><div class="prog-example">| Bm7b5 | E7alt | Am7 |</div><div class="prog-teoria-desc">The minor version. Bm7b5 (half-dim) and E7alt create denser tension resolving on Am. "Autumn Leaves" is full of them.</div><button class="load-prog-btn" onclick="loadPreset('ii-V-i (Am)')">Load in Player</button></div>
    <div class="prog-teoria-item"><div class="prog-teoria-name">12-Bar Blues in Bb <span class="prog-teoria-tag">Blues</span></div><div class="prog-example">| Bb7 | Eb7 | Bb7 | Bb7 |\n| Eb7 | Eb7 | Bb7 | G7  |\n| Cm7 | F7  | Bb7 | F7  |</div><div class="prog-teoria-desc">The classic blues form. 12 measures, all dominant chords. The historical starting point of jazz and rock. Use blues or Mixolydian scale.</div><button class="load-prog-btn" onclick="loadPreset('12-Bar Blues (Bb)')">Load in Player</button></div>
    <div class="prog-teoria-item"><div class="prog-teoria-name">Turnaround in C <span class="prog-teoria-tag">Swing</span></div><div class="prog-example">| Cmaj7 | Am7 | Dm7 | G7 |</div><div class="prog-teoria-desc">The quintessential jazz turnaround. I–vi–ii–V. Forms the basis of hundreds of standards.</div><button class="load-prog-btn" onclick="loadPreset('Turnaround (C)')">Load in Player</button></div>
    <div class="prog-teoria-item"><div class="prog-teoria-name">Rhythm Changes A (Bb) <span class="prog-teoria-tag">Swing</span></div><div class="prog-example">| Bbmaj7 Gm7 | Cm7 F7 | Fm7 Bb7 | Ebmaj7 Ab7 |\n| Dm7b5 G7   | Cm7 F7 | Bbmaj7 Gm7 | Cm7 F7  |</div><div class="prog-teoria-desc">Based on "I Got Rhythm" by Gershwin. One of the most played forms in bebop jazz.</div><button class="load-prog-btn" onclick="loadPreset('Rhythm Changes (Bb)')">Load in Player</button></div>
    <div class="prog-teoria-item"><div class="prog-teoria-name">Autumn in New York (style) <span class="prog-teoria-tag">Standard</span></div><div class="prog-example">| Cm7 F7 | Bbmaj7 | Ebmaj7 | Am7b5 D7 | Gm7 |</div><div class="prog-teoria-desc">Typical jazz standard sequence with modulations. Combines ii-V-I in Bb and minor.</div><button class="load-prog-btn" onclick="loadPreset('Autumn Leaves (style)')">Load in Player</button></div>`,
  'jazz-5': `<p class="teoria-intro">CAGED is a system for finding any chord in any position on the fretboard. The neck is divided into 5 zones, each based on an open chord shape. Use the CAGED selector in the sidebar to visualize them!</p>
    <div class="caged-grid">
      <div class="caged-shape"><div class="caged-shape-letter">C</div><div class="caged-shape-chord">Open C chord</div><div class="caged-shape-desc">Root on string 5 (A). Easy to barre. E.g.: D at 2nd fret</div></div>
      <div class="caged-shape"><div class="caged-shape-letter">A</div><div class="caged-shape-chord">Open A chord</div><div class="caged-shape-desc">Root on string 5 (A). Compact barre. E.g.: B at 2nd fret</div></div>
      <div class="caged-shape"><div class="caged-shape-letter">G</div><div class="caged-shape-chord">Open G chord</div><div class="caged-shape-desc">Root on string 6 (E). Open shape. E.g.: A at 2nd fret</div></div>
      <div class="caged-shape"><div class="caged-shape-letter">E</div><div class="caged-shape-chord">Open E chord</div><div class="caged-shape-desc">Root on string 6 (E). Classic barre. E.g.: F at 1st fret</div></div>
      <div class="caged-shape"><div class="caged-shape-letter">D</div><div class="caged-shape-chord">Open D chord</div><div class="caged-shape-desc">Root on string 4 (D). High shape. E.g.: E at 2nd fret</div></div>
    </div>
    <div class="teoria-tip" style="margin-top:15px"><strong>How to use it:</strong> If you need Cmaj7 at the 8th fret, use the E shape. If you prefer around the 5th fret, use the A shape. The 5 shapes connect and flow along the entire neck.</div>`,
  'jazz-6': `<p class="teoria-intro">Jazz improvisation is learned gradually. Here is a practical path from scratch.</p>
    <ul class="tip-list">
      <li><span class="tip-num">1</span><span>Start with the <strong>minor pentatonic</strong>. 5 simple notes, always effective. Explore it over blues backing tracks.</span></li>
      <li><span class="tip-num">2</span><span>Add the <strong>blue note (b5)</strong> to get the blues scale. One sound transforms the feeling completely.</span></li>
      <li><span class="tip-num">3</span><span>Learn the <strong>ii-V-I in C</strong> by heart. Play over it daily. Then transpose to all 12 keys.</span></li>
      <li><span class="tip-num">4</span><span>Study <strong>guide tones</strong>: the 3rd and 7th of each chord. These two notes define the sound of every jazz chord.</span></li>
      <li><span class="tip-num">5</span><span>Move on to <strong>Dorian and Mixolydian</strong>. Dorian over the ii (Dm7), Mixolydian over the V (G7). Feel the harmonic difference.</span></li>
      <li><span class="tip-num">6</span><span>Listen to lots of jazz. <em>Kind of Blue</em> (Miles Davis), <em>Waltz for Debby</em> (Bill Evans), <em>A Love Supreme</em> (Coltrane). The ear is educated by listening.</span></li>
      <li><span class="tip-num">7</span><span><strong>Transcribe licks</strong> from your favorite musicians. Even just 2-3 measures. Play them in various keys. This is the jazz method.</span></li>
      <li><span class="tip-num">8</span><span>Use the <strong>Player</strong> to create ii-V-I backing tracks and improvise with the fretboard. Experiment with which scale sounds best over each chord.</span></li>
      <li><span class="tip-num">9</span><span>Study the <strong>altered scale</strong> over the dominant (G7alt → Altered). The sound of modern jazz. Difficult but essential.</span></li>
      <li><span class="tip-num">10</span><span>Remember: improvisation is not random notes. It's <strong>telling a story</strong>. Think in phrases, questions and answers, tension and resolution.</span></li>
    </ul>`,
  'jazz-7': `<p class="teoria-intro"><strong>Guide Tones</strong> are the 3rd and 7th of each chord. They define the chord's characteristic sound and guide harmonic movement between chords.</p>
    <div class="scale-grid">
      <div class="scale-item"><div class="scale-item-name" style="color:#f39c12">Major 3rd</div><div class="scale-item-chord">E.g.: in Cmaj7 = E, in G7 = B</div><div class="scale-item-desc">The major third defines the "bright" chord character. In G7, B is the most critical guide tone — it creates the tritone with F (b7).</div><div class="scale-intervals"><span class="scale-int-badge" style="background:rgba(243,156,18,0.3);border-color:#f39c12">3</span></div></div>
      <div class="scale-item"><div class="scale-item-name" style="color:#f1c40f">Minor 3rd</div><div class="scale-item-chord">E.g.: in Dm7 = F, in Am7 = C</div><div class="scale-item-desc">The minor third defines the "dark" chord character. Playing the right 3rd over the right chord is the basis of bebop.</div><div class="scale-intervals"><span class="scale-int-badge" style="background:rgba(241,196,15,0.3);border-color:#f1c40f">b3</span></div></div>
      <div class="scale-item"><div class="scale-item-name" style="color:#2ecc71">Minor 7th (Dominant)</div><div class="scale-item-chord">E.g.: in G7 = F, in Bb7 = Ab</div><div class="scale-item-desc">The b7 gives the dominant character. In G7, F forms the tritone with B — this pair creates the tension that resolves to Cmaj7.</div><div class="scale-intervals"><span class="scale-int-badge" style="background:rgba(46,204,113,0.3);border-color:#2ecc71">b7</span></div></div>
      <div class="scale-item"><div class="scale-item-name" style="color:#27ae60">Major 7th</div><div class="scale-item-chord">E.g.: in Cmaj7 = B, in Fmaj7 = E</div><div class="scale-item-desc">The maj7 gives the suspended, lyrical character. Avoid it over dominant chords — there it must be the b7.</div><div class="scale-intervals"><span class="scale-int-badge" style="background:rgba(39,174,96,0.3);border-color:#27ae60">maj7</span></div></div>
    </div>
    <div class="teoria-tip mt-3"><strong>Guide Tone Technique:</strong> In ii–V–I, guide tones move by semitone or whole step:<br>
      <div class="prog-example" style="margin-top:8px">Dm7 → G7   → Cmaj7\n3rd: F  → F  → E    (stays then descends)\n7th: C  → B  → B    (descends then stays)</div>
      The 3rd and 7th "swap roles" between chords: the 7th of Dm7 (C) becomes the 4th of G7, and the 3rd of G7 (B) becomes the 7th of Cmaj7!
    </div>`,
  'jazz-8': `<p class="teoria-intro"><strong>Tritone Substitution</strong> is one of the most used reharmonization techniques in jazz: replacing a dominant chord with another dominant a tritone away (6 semitones).</p>
    <ul class="tip-list">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>The principle:</strong> G7 and Db7 share the same guide tones (B/F and Cb/Gb — enharmonics). Both "resolve" to Cmaj7.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Practical example:</strong><div class="prog-example" style="margin-top:6px">Original:    | Dm7  | G7   | Cmaj7 |\nTritone sub: | Dm7  | Db7  | Cmaj7 |</div>Db7 descends chromatically to C — much smoother!</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>How to improvise over it:</strong> Over Db7 (subV of G7), use the <em>Lydian Dominant</em> or G's <em>Altered</em> scale — they share the same notes.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Application in ii–V–I:</strong> You can substitute the V or both ii and V:<div class="prog-example" style="margin-top:6px">bII7–bV7–I: | Abm7 | Db7 | Cmaj7 |</div></div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>In practice:</strong> This explains why over G7 you can play the Db Lydian Dom. scale. Listen to "Giant Steps" by Coltrane — it makes heavy use of this principle.</div></li>
    </ul>`,
  'jazz-9': `<p class="teoria-intro"><strong>Approach Notes</strong> are chromatic or diatonic notes used to "arrive" at a target with tension and resolution. They are the secret of the bebop sound.</p>
    <div class="scale-grid">
      <div class="scale-item"><div class="scale-item-name">Chromatic Approach</div><div class="scale-item-desc">One note a semitone below or above the target. E.g.: to reach E (3rd of Cmaj7), play Eb one beat before.</div><div class="prog-example" style="font-size:0.75em;margin-top:6px">→ [Eb] E (target)</div></div>
      <div class="scale-item"><div class="scale-item-name">Double Chromatic</div><div class="scale-item-desc">A semitone below and a semitone above (or vice versa). Creates a "push" toward the target — typical bebop sound.</div><div class="prog-example" style="font-size:0.75em;margin-top:6px">→ [F Eb] E (target)</div></div>
      <div class="scale-item"><div class="scale-item-name">Diatonic Approach</div><div class="scale-item-desc">A note a whole step or third above/below within the same scale. Softer than chromatic, still guides toward the target.</div><div class="prog-example" style="font-size:0.75em;margin-top:6px">→ [D] E (target, +step)</div></div>
      <div class="scale-item"><div class="scale-item-name">Enclosure</div><div class="scale-item-desc">One note above (diatonic/chromatic), then one below (chromatic), then the target. The most characteristic bebop sound.</div><div class="prog-example" style="font-size:0.75em;margin-top:6px">→ [F Eb] E (target)</div></div>
    </div>
    <ul class="tip-list mt-3">
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Where to use them:</strong> Always on strong beats (beat 1 or 3). The approach note goes on the upbeat, the target on the downbeat.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Target notes:</strong> Best targets are guide tones (3rd and 7th) and the root. Avoid approaching the 5th — it's too neutral.</div></li>
      <li><span class="tip-bullet">•</span><div class="tip-content"><strong>Exercise:</strong> Take a simple pentatonic lick and add chromatic approach notes before each downbeat note. You'll immediately get a bebop sound!</div></li>
    </ul>
    <div class="teoria-tip mt-3"><strong>Tip:</strong> Parker, Dizzy, and Monk used enclosures continuously. Listen to "Anthropology" by Charlie Parker and try to identify approach notes — they're everywhere.</div>`,

  'jazz-10': `<p class="teoria-intro"><strong>Bebop Scales</strong> are standard scales enriched with one chromatic passing tone. The result: chord tones (R, 3, 5, 7) always land on the <em>strong beats</em>, making melodic lines naturally fluid at any tempo.</p>
    <div class="scale-grid">
      <div class="scale-item">
        <div class="scale-item-name">Bebop Dominant</div>
        <div class="scale-item-chord">On: G7, C7, dominants</div>
        <div class="scale-item-desc">Mixolydian + chromatic major 7th between b7 and R. Chord tones R, 3, 5, b7 fall on the beat. The quintessential bebop scale.</div>
        <div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">b7</span><span class="scale-int-badge" style="border-color:var(--accent);color:var(--accent)">7*</span></div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name">Bebop Major</div>
        <div class="scale-item-chord">On: Cmaj7, Fmaj7, Maj7</div>
        <div class="scale-item-desc">Ionian + chromatic #5 between 5th and 6th. Chord tones R, 3, 5, 7 land on the beat. Classic big band sound.</div>
        <div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge">2</span><span class="scale-int-badge">3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge" style="border-color:var(--accent);color:var(--accent)">#5*</span><span class="scale-int-badge">6</span><span class="scale-int-badge">7</span></div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name">Bebop Dorian</div>
        <div class="scale-item-chord">On: Dm7, Am7, m7</div>
        <div class="scale-item-desc">Dorian + chromatic b2 between R and 2nd. Chord tones R, b3, 5, b7 fall on the beat. Typical minor bebop sound.</div>
        <div class="scale-intervals"><span class="scale-int-badge">1</span><span class="scale-int-badge" style="border-color:var(--accent);color:var(--accent)">b2*</span><span class="scale-int-badge">2</span><span class="scale-int-badge">b3</span><span class="scale-int-badge">4</span><span class="scale-int-badge">5</span><span class="scale-int-badge">6</span><span class="scale-int-badge">b7</span></div>
      </div>
    </div>
    <div class="teoria-tip mt-3"><strong>How to use them:</strong> Play descending from the octave — that's where chord tones fall on the beat. The goal isn't to "run the scale" but to craft phrases that land on the right note at the right time. Parker, Coltrane, and Cannonball used them instinctively.</div>`,

  'jazz-11': `<p class="teoria-intro"><strong>Modal Interchange</strong> means borrowing chords from a parallel mode — same tonic, different mode. It adds unexpected harmonic color while remaining anchored to the home key.</p>
    <div class="scale-grid">
      <div class="scale-item">
        <div class="scale-item-name" style="color:#f1c40f">bVII in Major</div>
        <div class="scale-item-chord">e.g.: in C → Bbmaj7</div>
        <div class="scale-item-desc">The most common borrow from the parallel minor. Instantly recognizable rock/pop-modern sound.</div>
        <div class="prog-example" style="margin-top:6px;font-size:0.8em;">| Cmaj7 | Bbmaj7 | Fmaj7 | G7 |</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name" style="color:#9b59b6">bVI in Major</div>
        <div class="scale-item-chord">e.g.: in C → Abmaj7</div>
        <div class="scale-item-desc">Romantic, cinematic color. Classic cadence of modern pop and jazz ballads.</div>
        <div class="prog-example" style="margin-top:6px;font-size:0.8em;">| Cmaj7 | Abmaj7 | Fm7 | G7 |</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name" style="color:#e74c3c">iv minor in Major</div>
        <div class="scale-item-chord">e.g.: in C → Fm7</div>
        <div class="scale-item-desc">The minor IV (from parallel Dorian) is one of the most emotional borrows. Often resolves to I or V. Typical of jazz ballads.</div>
        <div class="prog-example" style="margin-top:6px;font-size:0.8em;">| Cmaj7 | Fm7 | Em7 | A7 |</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name" style="color:#27ae60">bIII in Major</div>
        <div class="scale-item-chord">e.g.: in C → Ebmaj7</div>
        <div class="scale-item-desc">Creates a temporary modulation effect toward the relative minor tonic. Common in jazz-fusion and Brazilian music.</div>
        <div class="prog-example" style="margin-top:6px;font-size:0.8em;">| Cmaj7 | Ebmaj7 | Fmaj7 | G7 |</div>
      </div>
    </div>
    <div class="teoria-tip mt-3"><strong>How to spot them:</strong> If a chord doesn't belong to the diatonic scale but makes expressive sense, it's probably a modal borrow. Look for it in the parallel scale. Use the <strong>Reharmonizer</strong> to find modal borrows for any chord.</div>`,

  'jazz-12': `<p class="teoria-intro"><strong>Comping</strong> (rhythmic-harmonic accompaniment) is the art of supporting a soloist with improvised chords. In jazz, comping is itself an improvisation — a musical dialogue with the soloist.</p>
    <div class="scale-grid">
      <div class="scale-item">
        <div class="scale-item-name">The Swing Feel</div>
        <div class="scale-item-desc">Jazz eighth notes are NOT played straight. They're swung: the first eighth is longer than the second (roughly 2:1), creating the characteristic jazz groove.</div>
        <div class="prog-example" style="font-size:0.8em;margin-top:8px;">Written:  ♪ ♪ ♪ ♪
Played:   ♩.♪ ♩.♪ (triplet feel)</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name">Rhythmic Anticipations</div>
        <div class="scale-item-desc">Comping chords often anticipate the harmonic change by half a beat. The chord on beat 1 of the next measure is played on the "4 and" (upbeat of 4). Creates forward motion.</div>
        <div class="prog-example" style="font-size:0.8em;margin-top:8px;">| . . . [Gm7] | G7 . . . |
              ↑ anticipation on "4-and"</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name">Shell Voicings</div>
        <div class="scale-item-desc">Comping uses minimal voicings: Root + 3rd + 7th (the guide tones). Omit the 5th. "Freddie Green voicings" with 2–3 notes are the foundation of swing guitar comping.</div>
        <div class="prog-example" style="font-size:0.8em;margin-top:8px;">Cmaj7 → C + E + B
G7    → G + B + F</div>
      </div>
      <div class="scale-item">
        <div class="scale-item-name">Dialogue with the Soloist</div>
        <div class="scale-item-desc">When the soloist plays a lot, comping simplifies. In the soloist's rests, comping fills in. It's a two-way musical conversation.</div>
        <div class="teoria-tip" style="margin-top:8px;font-size:0.85em;">Rule: <em>less is more.</em> Herbie Hancock, Bill Evans, Kenny Barron — all leave space.</div>
      </div>
    </div>
    <div class="teoria-tip mt-3"><strong>First exercise:</strong> Play chords only on beats 2 and 4 (the backbeat). Then add anticipations and variations. Use the <strong>Groove Trainer</strong> to practice basic rhythmic patterns.</div>`,
};

const app = new JazzVizApp();
applyTranslations();
window.renderFretboard = () => app.fretboard.render(document.getElementById('tuning-select').value);
window.applyFullScale = () => {
    if (app.currentView === 'interval-learner') {
        app.intervalLearner.updateBoard();
    } else if (app.currentView === 'note-finder') {
        app.noteFinder.updateBoard();
    } else if (app.currentView === 'lick-builder') {
        app.lickBuilder.updateBoard();
    } else {
        app.fretboard.update(app.getUiSettings());
    }
};
window.resetFretboard = () => { app.highlightedIntervals.clear(); app.manualNotes.clear(); window.applyFullScale(); };
window.setExplorerMode = (m) => app.setExplorerMode(m);
window.switchView = (v) => app.switchView(v);
window.toggleTuner = () => app.tuner.toggle();
window.tunerPlayRef = (freq) => app.tuner.playRef(freq);
window.replayIL = () => app.intervalLearner.replay();
window.replayGL = () => app.gradeLearner.replay();
window.replayNF = () => app.noteFinder.replay();
window.replayET  = () => app.earTrainer.replay();
window.replayIET = () => app.intervalEarTrainer.replay();
window.toggleMenu = () => document.getElementById("sidebar-menu").classList.toggle("active");
window.showHelpModal = () => document.getElementById("help-modal").style.display = "flex";
window.hideHelpModal = () => document.getElementById("help-modal").style.display = "none";
window.addProgressionStep = () => app.progression.addStep();
window.clearProgression = () => app.progression.clear();
window.transposeProgression = (n) => app.progression.transpose(n);
window.transposeChordOctave = (n) => app.progression.transposeOctave(n);
window.togglePlayProgression = () => app.playback.toggle();
window.stopProgression = () => app.playback.stop();
window.navigateStep = (d) => app.playback.navigate(d);
window.tapTempo = () => app.playback.tap();
window.toggleMetronomeUI = () => { const c = document.getElementById("metronome-toggle"); c.checked = !c.checked; document.getElementById("metronome-btn").classList.toggle('active', c.checked); };
window.importProgression = () => app.importProgression();
window.exportProgressionData = () => app.exportData();
window.importProgressionData = (e) => app.importData(e);
window.createSnapshot = () => app.createSnapshot();
window.clearSnapshots = () => { document.getElementById('snapshot-list').innerHTML=''; };
window.clearCustomScale = () => { app.customScaleMap.clear(); window.applyFullScale(); };
window.exportCustomScale = () => app.exportCustomScale();
window.importCustomScale = (e) => app.importCustomScale(e);
window.loadPreset = (name) => {
  const prog = PRESET_PROGRESSIONS[name];
  if (!prog) return;
  document.getElementById('chord-importer-textarea').value = prog;
  if (app.currentView !== 'calculator') app.switchView('calculator');
};
window.autoAssignChords = () => app.autoAssignChords();

// --- Swipe gesture for sidebar ---
(function() {
  let touchStartX = 0, touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) > Math.abs(dx) * 1.5) return;
    const sidebar = document.getElementById('sidebar-menu');
    if (dx > 50 && touchStartX < 30) sidebar.classList.add('active');
    if (dx < -50 && sidebar.classList.contains('active')) sidebar.classList.remove('active');
  }, { passive: true });
})();