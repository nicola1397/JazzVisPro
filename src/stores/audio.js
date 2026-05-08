import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { noteIndexToFrequency } from '../utils/theory.js'

export const useAudioStore = defineStore('audio', () => {
  // Use plain variables for Tone objects to avoid Proxy issues
  let _chordSynth = null
  let _pianoSampler = null
  let _bassSynth = null
  let _drumSynth = null
  let _isInitialized = false
  let _currentPreset = null
  let _currentOscillators = []

  const METRONOME_SAMPLES = {
    Beep:  { type:'osc', freqDown:1000, freqUp:800,  shape:'sine'     },
    Click: { type:'osc', freqDown:1500, freqUp:1200, shape:'square'   },
    Log:   { type:'osc', freqDown:600,  freqUp:450,  shape:'triangle' },
  }
  const CHORD_SOUNDS = {
    'Electric Piano':'epiano','Warm Pad':'pad','Bright Synth':'bright',
    'Strings':'strings','Jazz Organ':'organ','Brass Section':'brass','Grand Piano':'piano',
  }

  const isInitialized = ref(false)

  async function init() {
    if (typeof Tone === 'undefined') return
    if (_isInitialized) {
      if (Tone.context.state !== 'running') await Tone.context.resume()
      return
    }

    try {
      await Tone.start()
      
      const limiter    = new Tone.Limiter(-3).toDestination()
      const compressor = new Tone.Compressor({ threshold:-20, ratio:4, attack:0.003, release:0.25 }).connect(limiter)
      const reverb     = new Tone.Reverb({ decay:2.5, preDelay:0.1, wet:0.3 }).connect(compressor)
      const filter     = new Tone.Filter({ frequency:2000, type:'lowpass', rolloff:-12 }).connect(reverb)
      
      _chordSynth = new Tone.PolySynth(Tone.Synth, {
        maxPolyphony: 8,
        oscillator: { type:'triangle' },
        envelope: { attack:0.05, decay:0.3, sustain:0.6, release:1.0 },
        volume: -12,
      }).connect(filter)
      _chordSynth.filterNode = filter

      _bassSynth = new Tone.MonoSynth({
        oscillator: { type:'sine' },
        envelope: { attack:0.05, decay:0.3, sustain:0.4, release:0.8 },
        volume: -8
      }).connect(compressor)

      _drumSynth = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
        volume: -20
      }).connect(compressor)

      _pianoSampler = new Tone.Sampler({
        urls: { A1:'A1.mp3', A2:'A2.mp3' },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
      }).connect(compressor)

      _isInitialized = true
      isInitialized.value = true
    } catch (e) {
      console.warn('Audio setup failed:', e)
    }
  }

  function _setPreset(name) {
    if (!_chordSynth || _currentPreset === name) return
    const s = _chordSynth
    const f = s.filterNode
    try {
      if (name === 'Electric Piano') {
        s.set({ oscillator:{ type:'sine' }, envelope:{ attack:0.005, decay:0.3, sustain:0.4, release:1.2 } })
        if (f) f.frequency.rampTo(3000, 0.1)
      } else if (name === 'Strings') {
        s.set({ oscillator:{ type:'fatsawtooth', count:3, spread:20 }, envelope:{ attack:0.4, decay:0.5, sustain:0.8, release:2.0 } })
        if (f) f.frequency.rampTo(2500, 0.1)
      } else {
        s.set({ oscillator:{ type:'triangle' }, envelope:{ attack:0.05, decay:0.3, sustain:0.6, release:1.5 } })
        if (f) f.frequency.rampTo(2000, 0.1)
      }
      _currentPreset = name
    } catch(e) {}
  }

  function stopAll() {
    try { if (_chordSynth) _chordSynth.releaseAll() } catch {}
    try { if (_pianoSampler) _pianoSampler.releaseAll() } catch {}
    try { if (_bassSynth) _bassSynth.triggerRelease() } catch {}
    _currentOscillators.forEach(({ osc, gain }) => {
      try {
        const now = Tone.now()
        gain.gain.cancelScheduledValues(now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.stop(now + 0.1)
      } catch {}
    })
    _currentOscillators = []
  }

  async function playNoteImmediate(noteIdx, duration, vol, soundName, octave) {
    await init()
    if (!_isInitialized || !_chordSynth) return
    try {
      _setPreset(soundName)
      const db = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2))
      if (isFinite(db)) {
        _chordSynth.volume.cancelScheduledValues(Tone.now())
        _chordSynth.volume.rampTo(db, 0.01)
      }
      const nIdx = ((noteIdx % 12) + 12) % 12
      const freq = noteIndexToFrequency(nIdx, octave)
      if (isFinite(freq)) {
        const note = Tone.Frequency(freq).toNote()
        _chordSynth.triggerAttackRelease(note, duration, Tone.now() + 0.01)
      }
    } catch (e) { console.warn('playNoteImmediate error:', e) }
  }

  async function playChord(tones, rootNoteIdx, time, duration, vol, soundName, baseOctave) {
    await init()
    if (!_isInitialized) return
    stopAll()
    if (!tones.length) return
    
    const startTime = (time && time > Tone.now()) ? time : Tone.now() + 0.01

    try {
      let synth = _chordSynth
      if (soundName === 'Grand Piano' && _pianoSampler) synth = _pianoSampler
      else _setPreset(soundName)
      
      const db = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2))
      if (isFinite(db)) {
        synth.volume.cancelScheduledValues(Tone.now())
        synth.volume.rampTo(db, 0.1)
      }
      
      let oct = baseOctave, prevNIdx = rootNoteIdx
      const notes = tones.map((interval, i) => {
        const nIdx = (rootNoteIdx + interval) % 12
        if (i > 0 && nIdx <= prevNIdx) oct++
        prevNIdx = nIdx
        return Tone.Frequency(noteIndexToFrequency(nIdx, oct)).toNote()
      })
      synth.triggerAttackRelease(notes, duration, startTime)
    } catch (e) { console.warn('playChord error:', e) }
  }

  function playClick(time, isDownbeat, vol, soundName, multiplier = 1.0) {
    if (!_isInitialized) return
    const now = Tone.now()
    const startTime = (time && time > now) ? time : now + 0.01
    try {
      const osc = new Tone.Oscillator().toDestination()
      const sound = METRONOME_SAMPLES[soundName] || METRONOME_SAMPLES.Beep
      osc.type = sound.shape || 'sine'
      osc.frequency.value = isDownbeat ? sound.freqDown : sound.freqUp
      osc.volume.value = Tone.gainToDb(vol * multiplier)
      osc.start(startTime).stop(startTime + 0.05)
      // Node will be GC'd after stopping
    } catch {}
  }

  function playBass(noteIdx, time, dur, vol = 0.5) {
    if (!_bassSynth) return
    const now = Tone.now()
    const startTime = (time && time > now) ? time : now + 0.01
    try {
      const freq = noteIndexToFrequency(noteIdx, 2)
      _bassSynth.triggerAttackRelease(freq, dur, startTime, vol)
    } catch(e) {}
  }

  function playDrum(type, time, vol = 0.3) {
    if (!_drumSynth) return
    const now = Tone.now()
    const startTime = (time && time > now) ? time : now + 0.01
    try {
      if (type === 'ride') {
        _drumSynth.envelope.decay = 0.05
        _drumSynth.triggerAttack(startTime, vol)
      } else if (type === 'snare') {
        _drumSynth.envelope.decay = 0.15
        _drumSynth.triggerAttack(startTime, vol * 0.5)
      }
    } catch(e) {}
  }

  async function playRef(freq) {
    await init()
    try {
      const osc = new Tone.Oscillator(freq, "sine").toDestination()
      osc.volume.value = -12
      osc.start().stop("+2.5")
    } catch {}
  }

  return {
    isInitialized, METRONOME_SAMPLES, CHORD_SOUNDS,
    init, stopAll, playNoteImmediate, playChord, playClick, playRef,
    playBass, playDrum
  }
})
