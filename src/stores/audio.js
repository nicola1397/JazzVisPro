import { defineStore } from 'pinia'
import { ref } from 'vue'
import { noteIndexToFrequency } from '../utils/theory.js'

export const useAudioStore = defineStore('audio', () => {
  const context         = ref(null)
  const chordSynth      = ref(null)
  const pianoSampler    = ref(null)
  const currentPreset   = ref(null)
  let currentOscillators = []

  const METRONOME_SAMPLES = {
    Beep:  { type:'osc', freqDown:1000, freqUp:800,  shape:'sine'     },
    Click: { type:'osc', freqDown:1500, freqUp:1200, shape:'square'   },
    Log:   { type:'osc', freqDown:600,  freqUp:450,  shape:'triangle' },
  }
  const CHORD_SOUNDS = {
    'Electric Piano':'epiano','Warm Pad':'pad','Bright Synth':'bright',
    'Strings':'strings','Jazz Organ':'organ','Brass Section':'brass','Grand Piano':'piano',
  }

  function init() {
    try {
      if (!context.value) {
        context.value = new (window.AudioContext || window.webkitAudioContext)()
        _setupTone()
      } else if (context.value.state === 'suspended') {
        context.value.resume()
      }
      if (typeof Tone !== 'undefined') Tone.start()
    } catch (e) {
      console.warn('AudioContext init failed:', e)
    }
  }

  function _setupTone() {
    if (typeof Tone === 'undefined') return
    try {
      const limiter    = new Tone.Limiter(-3).toDestination()
      const compressor = new Tone.Compressor({ threshold:-20, ratio:4, attack:0.003, release:0.25 }).connect(limiter)
      const reverb     = new Tone.Reverb({ decay:2.5, preDelay:0.1, wet:0.3 }).connect(compressor)
      const filter     = new Tone.Filter({ frequency:2000, type:'lowpass', rolloff:-12 }).connect(reverb)
      chordSynth.value = new Tone.PolySynth(Tone.Synth, {
        maxPolyphony: 6,
        oscillator: { type:'triangle' },
        envelope: { attack:0.05, decay:0.3, sustain:0.6, release:1.0 },
        volume: -12,
      }).connect(filter)
      chordSynth.value.filterNode = filter
      pianoSampler.value = new Tone.Sampler({
        urls: { A1:'A1.mp3', A2:'A2.mp3' },
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
      }).connect(compressor)
    } catch (e) {
      console.warn('Tone setup failed:', e)
    }
  }

  function stopAll() {
    try { if (chordSynth.value) chordSynth.value.releaseAll() } catch {}
    try { if (pianoSampler.value) pianoSampler.value.releaseAll() } catch {}
    currentOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.001, context.value.currentTime + 0.1)
        osc.stop(context.value.currentTime + 0.1)
      } catch {}
    })
    currentOscillators = []
  }

  function _setPreset(name) {
    if (!chordSynth.value || currentPreset.value === name) return
    const s = chordSynth.value
    const f = s.filterNode
    if (name === 'Electric Piano') {
      s.set({ oscillator:{ type:'sine' }, envelope:{ attack:0.005, decay:0.3, sustain:0.4, release:1.2 } })
      f.frequency.rampTo(3000, 0.1)
    } else if (name === 'Strings') {
      s.set({ oscillator:{ type:'fatsawtooth', count:3, spread:20 }, envelope:{ attack:0.4, decay:0.5, sustain:0.8, release:2.0 } })
      f.frequency.rampTo(2500, 0.1)
    } else {
      s.set({ oscillator:{ type:'triangle' }, envelope:{ attack:0.05, decay:0.3, sustain:0.6, release:1.5 } })
      f.frequency.rampTo(2000, 0.1)
    }
    currentPreset.value = name
  }

  function playNoteImmediate(noteIdx, duration, vol, soundName, octave) {
    if (!chordSynth.value || typeof Tone === 'undefined' || Tone.context.state !== 'running') return
    try {
      _setPreset(soundName)
      const db   = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2))
      if (chordSynth.value.volume) chordSynth.value.volume.rampTo(db, 0.01)
      const nIdx = ((noteIdx % 12) + 12) % 12
      const note = Tone.Frequency(noteIndexToFrequency(nIdx, octave)).toNote()
      chordSynth.value.triggerAttackRelease([note], duration, Tone.context.currentTime + 0.01)
    } catch (e) { console.warn('playNoteImmediate error:', e) }
  }

  function playChord(tones, rootNoteIdx, time, duration, vol, soundName, baseOctave) {
    stopAll()
    if (!tones.length) return
    const ctx = context.value
    if (chordSynth.value && typeof Tone !== 'undefined' && Tone.context.state === 'running') {
      try {
        let synth = chordSynth.value
        if (soundName === 'Grand Piano' && pianoSampler.value) synth = pianoSampler.value
        else _setPreset(soundName)
        const db = vol <= 0 ? -100 : Math.min(0, 20 * Math.log10(vol * 2))
        if (synth.volume) synth.volume.rampTo(db, 0.1)
        let oct = baseOctave, prevNIdx = rootNoteIdx
        const notes = tones.map((interval, i) => {
          const nIdx = (rootNoteIdx + interval) % 12
          if (i > 0 && nIdx <= prevNIdx) oct++
          prevNIdx = nIdx
          return Tone.Frequency(noteIndexToFrequency(nIdx, oct)).toNote()
        })
        synth.triggerAttackRelease(notes, duration, time)
      } catch (e) { console.warn('playChord Tone error:', e) }
    } else if (ctx) {
      // Web Audio fallback
      const volPer = (vol / Math.max(tones.length, 1)) * 0.5
      let oct = baseOctave, prevNIdx = rootNoteIdx
      tones.forEach((interval, i) => {
        try {
          const nIdx = (rootNoteIdx + interval) % 12
          if (i > 0 && nIdx <= prevNIdx) oct++
          prevNIdx = nIdx
          const freq = noteIndexToFrequency(nIdx, oct)
          const osc  = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = soundName.includes('Piano') ? 'sine' : 'triangle'
          osc.frequency.value = freq
          gain.gain.setValueAtTime(0, time)
          gain.gain.linearRampToValueAtTime(volPer, time + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.001, time + duration)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(time)
          osc.stop(time + duration + 0.1)
          currentOscillators.push({ osc, gain })
        } catch {}
      })
    }
  }

  function playClick(time, isDownbeat, vol, soundName) {
    const ctx = context.value
    if (!ctx) return
    try {
      const gain = ctx.createGain()
      gain.connect(ctx.destination)
      gain.gain.value = vol
      const sound = METRONOME_SAMPLES[soundName] || METRONOME_SAMPLES.Beep
      if (sound.type === 'osc') {
        const osc = ctx.createOscillator()
        osc.connect(gain)
        osc.type = sound.shape || 'sine'
        osc.frequency.value = isDownbeat ? sound.freqDown : sound.freqUp
        osc.start(time)
        osc.stop(time + 0.05)
      }
    } catch {}
  }

  function playRef(freq) {
    init()
    const ctx = context.value
    if (!ctx) return
    try {
      const osc  = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.18, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 2.5)
    } catch {}
  }

  return {
    context, chordSynth, pianoSampler,
    METRONOME_SAMPLES, CHORD_SOUNDS,
    init, stopAll, playNoteImmediate, playChord, playClick, playRef,
  }
})
