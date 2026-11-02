import { ref, onUnmounted } from 'vue'
import { useAudioStore } from '../stores/audio.js'
import { beatsOf, chordInfo } from '../utils/standards.js'

// A small backing band for the exercises over the changes: count-in, walking
// bass, swing ride and comping, scheduled on the audio clock. Every chord of
// the form becomes an event with the time window (performance.now() clock, as
// heard through the speakers) during which it sounds, so played notes can be
// matched to the chord they were played over.

const LOOKAHEAD_S = 0.15
const TICK_MS = 25

// Audio clock -> performance clock, as the sound leaves the speakers.
export function audioTimeToPerf(audioTime) {
  const raw = Tone.context.rawContext
  const ts = raw.getOutputTimestamp?.()
  if (ts && ts.performanceTime) return ts.performanceTime + (audioTime - ts.contextTime) * 1000
  return performance.now() + (audioTime - raw.currentTime) * 1000 + (raw.outputLatency || raw.baseLatency || 0) * 1000
}

export function useBackingTrack() {
  const audio = useAudioStore()
  const playing = ref(false)
  const countIn = ref(0)          // count-in beats still to come
  const current = ref(null)       // event sounding now
  const events  = ref([])         // events scheduled so far, in order

  let opts = null
  let form = []                   // [{ bar, index, symbol, info, beats }]
  let timer = null
  let timeouts = []
  let nextBeat = 0                // audio time of the next beat
  let pos = 0, beatInChord = 0, barBeat = 0, loop = 0, countLeft = 0, eventId = 0

  const perfAt = audioTimeToPerf

  function at(ms, fn) {
    timeouts.push(setTimeout(fn, Math.max(0, ms - performance.now())))
  }

  async function start(options) {
    stop()
    await audio.init()
    if (typeof Tone === 'undefined') return
    opts = { bpm: 100, loops: 1, bass: true, drums: true, comp: true, countIn: 4, ...options }
    form = opts.bars.flatMap((bar, b) => {
      const beats = beatsOf(bar.length)
      return bar.map((symbol, i) => ({ bar: b, index: i, symbol, info: chordInfo(symbol), beats: beats[i] }))
    })
    if (!form.length) return
    events.value = []
    current.value = null
    pos = 0; beatInChord = 0; barBeat = 0; loop = 0; eventId = 0
    countLeft = opts.countIn
    countIn.value = countLeft
    playing.value = true
    nextBeat = Tone.now() + 0.1
    timer = setInterval(tick, TICK_MS)
    tick()
  }

  function stop() {
    clearInterval(timer)
    timer = null
    timeouts.forEach(clearTimeout)
    timeouts = []
    if (playing.value) audio.stopAll()
    playing.value = false
    countIn.value = 0
    current.value = null
  }

  function tick() {
    if (!playing.value) return
    while (nextBeat < Tone.now() + LOOKAHEAD_S && playing.value) {
      scheduleBeat(nextBeat)
      nextBeat += 60 / opts.bpm
    }
  }

  function scheduleBeat(time) {
    const beatDur = 60 / opts.bpm
    if (countLeft > 0) {
      audio.playClick(time, countLeft === opts.countIn, 0.6, 'Click')
      const left = --countLeft
      at(perfAt(time), () => { countIn.value = left })
      return
    }
    if (pos >= form.length) {           // end of the form
      loop++
      if (opts.loops && loop >= opts.loops) {
        const end = perfAt(time)
        at(end, () => { stop(); opts.onEnd?.() })
        pos = -1
        return
      }
      pos = 0
    }
    if (pos < 0) return
    const chord = form[pos]
    const next = form[(pos + 1) % form.length]

    if (beatInChord === 0) {
      const start = perfAt(time)
      const ev = {
        id: eventId++, loop, bar: chord.bar, index: chord.index, symbol: chord.symbol, info: chord.info,
        beats: chord.beats, start, end: start + chord.beats * beatDur * 1000, beatMs: beatDur * 1000,
      }
      events.value.push(ev)
      at(start, () => { current.value = ev; opts.onChord?.(ev) })
      if (opts.comp) comp(chord, time, beatDur)
    }
    if (opts.bass) walk(chord, next, time, beatDur)
    if (opts.drums) drums(time, beatDur)

    beatInChord++
    barBeat = (barBeat + 1) % 4
    if (beatInChord >= chord.beats) {
      beatInChord = 0
      pos++
    }
  }

  // ── Band parts ──────────────────────────────────────────────────────────────
  const bassMidi = pc => 40 + ((pc - 4 + 12) % 12)   // E2..D#3, the open low E upwards
  function walk(chord, next, time, beatDur) {
    const info = chord.info
    const root = bassMidi(info.rootPc)
    let midi
    if (beatInChord === chord.beats - 1 && chord.beats > 1) {
      // chromatic approach to the next root, from above or below
      const target = bassMidi(next.info.rootPc)
      midi = target + (Math.random() < 0.5 ? -1 : 1)
    } else if (beatInChord === 0) {
      midi = root
    } else {
      const tone = info.tones[1 + Math.floor(Math.random() * (info.tones.length - 1))]
      midi = root + tone.iv
    }
    audio.playBass(midi, time, beatDur * 0.9, 0.5)
  }

  function drums(time, beatDur) {
    audio.playDrum('ride', time, 0.32)
    if (barBeat === 1 || barBeat === 3) {
      audio.playDrum('ride', time + beatDur * 0.667, 0.22)   // swung skip note
      audio.playDrum('snare', time, 0.12)                     // hi-hat on 2 and 4
    }
  }

  // Shell voicing (3rd, 7th) plus 5th or 9th, around middle C; Charleston rhythm.
  function comp(chord, time, beatDur) {
    const info = chord.info
    const third = info.guide[0].iv, seventh = info.guide[1].iv
    const base = 48 + info.rootPc - (info.rootPc > 5 ? 12 : 0)
    const notes = [base + third, base + seventh + (seventh < third ? 12 : 0), base + 14]
    audio.playNotesAt(notes, time, beatDur * 0.6, 0.32)
    if (chord.beats >= 4) audio.playNotesAt(notes, time + beatDur * 1.667, beatDur * 0.4, 0.25)
  }

  // The event whose window contains `time`; a note slightly early counts for the next chord.
  function eventAt(time, early = 120) {
    const list = events.value
    for (let i = list.length - 1; i >= 0; i--) {
      if (time >= list[i].start - early && time < list[i].end - early) return list[i]
    }
    return null
  }

  onUnmounted(stop)

  return { playing, countIn, current, events, start, stop, eventAt, perfAt }
}
