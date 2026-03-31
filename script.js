// --- Theory & Constants ---
class Theory {
  static get NOTES() {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  }
  static get NOTES_FLAT() {
    return ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
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
    const reverb = new Tone.Reverb({ decay: 2.5, preDelay: 0.1, wet: 0.3 }).toDestination();
    const filter = new Tone.Filter({ frequency: 2000, type: "lowpass", rolloff: -12 }).connect(reverb);
    this.chordSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "triangle" }, envelope: { attack: 0.05, decay: 0.3, sustain: 0.6, release: 1.5 }, volume: -10 }).connect(filter);
    this.chordSynth.filterNode = filter;
    this.pianoSampler = new Tone.Sampler({ urls: { A1: "A1.mp3", A2: "A2.mp3" }, baseUrl: "https://tonejs.github.io/audio/salamander/" }).connect(reverb);
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
      const db = vol <= 0 ? -100 : 20 * Math.log10(vol * 2);
      if (synth.volume) synth.volume.rampTo(db, 0.1);
      const notes = tones.map((interval, i) => {
        const nIdx = (rootIdx + interval) % 12;
        let oct = baseOctave;
        if (i > 0 && nIdx < (rootIdx + tones[i - 1]) % 12) oct++;
        return Tone.Frequency(Theory.noteIndexToFrequency(nIdx, oct)).toNote();
      });
      synth.triggerAttackRelease(notes, duration, time);
    } else {
      // Web Audio Fallback
      const volPer = (vol / tones.length) * 0.5;
      tones.forEach((interval, i) => {
        const nIdx = (rootIdx + interval) % 12;
        let oct = baseOctave;
        if (i > 0 && nIdx < (rootIdx + tones[i - 1]) % 12) oct++;
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
        circle.onclick = () => app.handleNoteClick(circle);
        fret.appendChild(circle);
        if (s === 3 && [3, 5, 7, 9, 15, 17, 19, 21].includes(f)) fret.innerHTML += `<div class="fret-marker"></div>`;
        if ((f === 12 || f === 24) && (s === 1 || s === 4)) fret.innerHTML += `<div class="fret-marker"></div>`;
        str.appendChild(fret);
      }
      this.el.appendChild(str);
    }
    for (let f = 0; f <= 24; f++) this.nums.innerHTML += `<div class="num ${f === 0 ? "num-0" : ""}">${f}</div>`;
  }

  update(options) {
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

      const sIndex = parseInt(c.closest(".string").className.match(/s(\d)/)[1]) - 1;
      const fIndex = parseInt(c.closest(".fret").className.match(/fret-(\d+)/)[1]);
      const posKey = `${sIndex}-${fIndex}`;
      const isManualHighlight = options.manualNotes.has(posKey);
      const isIntervalHighlighted = options.highlightedIntervals.has(interval);
      const isCustomVisible = options.customScaleMap.has(posKey);

      c.className = "note-circle"; c.innerText = ""; c.style.backgroundColor = "";
      let isVisible = explorerMode === 'custom' ? isCustomVisible : inScale;
      let isHighlighted = explorerMode === 'highlight' && (isManualHighlight || isIntervalHighlighted);

      if (isVisible) {
        const color = Theory.INTERVAL_COLORS[interval]; c.style.backgroundColor = color.color;
        c.innerText = options.notation === "interval" ? color.short : currentNotes[noteIdx];
        
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
                <div class="col-4"><div class="nav-group"><label>Bars</label><input type="text" class="prog-duration-input" value="${data ? data.bars : 4}" title="Bars"></div></div>
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

    // Secondary Dominant Recognition
    if (nextChordStr && (r === "7" || r.includes("7"))) {
      const nextP = this.parse(nextChordStr);
      if (nextP) {
        const rootIdx = Theory.NOTES.indexOf(p.root);
        const nextRootIdx = Theory.NOTES.indexOf(nextP.root);
        if ((nextRootIdx - rootIdx + 12) % 12 === 5) {
          if (nextP.rest.includes("m") && !nextP.rest.includes("maj")) return "Misolidio b13";
          return "Misolidio (7)";
        }
      }
    }

    if (genre === "blues" && (r.includes("7") || r.includes("m"))) return "Blues";
    if (r.includes("m7b5") || r.includes("ø")) return "Dorico (m7)";
    if (r.includes("alt")) return "Altered (7alt)";
    if (r.includes("dim")) return "Diminuita (T/S)";
    if (r.includes("m") && !r.includes("maj")) return "Dorico (m7)"; if (r.includes("7")) return "Misolidio (7)";
    if (r.includes("maj7")) return r.includes("#11") ? "Lidio (Maj7#11)" : "Ionio (Maj7)";
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
    if (r.includes("maj7")) seventh = 11;
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

// --- Main Application ---
class JazzVizApp {
  constructor() {
    this.audio = new AudioEngine(); this.fretboard = new Fretboard(); this.progression = new ProgressionManager();
    this.playback = new PlaybackEngine(this.audio, this.progression);
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
    this.fretboard.render("E Standard"); this.load(); this.fretboard.update(this.getUiSettings());
  }

  handleNoteClick(circle) {
    const s = parseInt(circle.closest(".string").className.match(/s(\d)/)[1]) - 1;
    const f = parseInt(circle.closest(".fret").className.match(/fret-(\d+)/)[1]);
    const key = `${s}-${f}`;
    if (this.explorerMode === 'custom') { this.customScaleMap.has(key) ? this.customScaleMap.delete(key) : this.customScaleMap.add(key); }
    else { this.manualNotes.has(key) ? this.manualNotes.delete(key) : this.manualNotes.add(key); }
    this.fretboard.update(this.getUiSettings());
  }

  setExplorerMode(mode) {
    this.explorerMode = mode; document.getElementById('mode-description').innerText = mode;
    document.getElementById('custom-actions').style.display = (mode === 'custom' ? 'flex' : 'none');
    this.fretboard.update(this.getUiSettings());
  }

  switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.remove('active');
      if (n.innerText.toLowerCase().includes(viewId.slice(0, 4))) n.classList.add('active');
    });
    document.getElementById('view-title').innerText = viewId.toUpperCase();
    document.getElementById("sidebar-menu").classList.remove("active");
  }

  getUiSettings() {
    return {
      root: document.getElementById("root-select").value, scaleName: document.getElementById("scale-select").value, tuningName: document.getElementById("tuning-select").value,
      hideUnused: document.getElementById("hide-unused").checked, soloArp: document.getElementById("solo-arpeggio").checked,
      add9: document.getElementById("add-9").checked, add11: document.getElementById("add-11").checked, add13: document.getElementById("add-13").checked,
      notation: document.getElementById("notation-select").value, accidental: document.getElementById("accidental-select").value,
      cagedShape: document.getElementById("caged-select").value, explorerMode: this.explorerMode, manualNotes: this.manualNotes, highlightedIntervals: this.highlightedIntervals, customScaleMap: this.customScaleMap
    };
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
      } catch (err) { alert("File JSON non valido."); }
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
      } catch (err) { alert("Errore nel caricamento della scala."); }
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
    for (let s = 5; s >= 0; s--) {
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
        <button class="btn-reset" style="padding:4px; font-size:0.8em; width:auto; height: 24px;" onclick="this.closest('.snapshot-card').remove(); app.save();">Delete</button>
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
      document.getElementById('overall-suggestion').style.display = 'block';
      document.getElementById('suggestion-text').innerText = allChordsFound.join(' → ');
    }
    app.save();
  }
}

const app = new JazzVizApp();
window.renderFretboard = () => app.fretboard.render(document.getElementById('tuning-select').value);
window.applyFullScale = () => app.fretboard.update(app.getUiSettings());
window.resetFretboard = () => { app.highlightedIntervals.clear(); app.manualNotes.clear(); window.applyFullScale(); };
window.setExplorerMode = (m) => app.setExplorerMode(m);
window.switchView = (v) => app.switchView(v);
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