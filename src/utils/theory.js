import { A4_FREQ, A4_NOTE_IDX } from './constants.js'

export const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
export const NOTES_FLAT = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B']
export const NOTES_ITA = ['Do','Do#','Re','Re#','Mi','Fa','Fa#','Sol','Sol#','La','La#','Si']

export const TUNINGS = {
  'E Standard': [4,11,7,2,9,4],
  'Drop D':     [4,11,7,2,9,2],
  'Eb Standard':[3,10,6,1,8,3],
  'D Standard': [2,9,5,0,7,2],
  'DADGAD':     [2,9,7,2,9,2],
}

export const SCALES = {
  'Ionio (Maj7)':         [0,2,4,5,7,9,11],
  'Dorico (m7)':          [0,2,3,5,7,9,10],
  'Frigio':               [0,1,3,5,7,8,10],
  'Misolidio (7)':        [0,2,4,5,7,9,10],
  'Lidio (Maj7#11)':      [0,2,4,6,7,9,11],
  'Altered (7alt)':       [0,1,3,4,6,8,10],
  'Minore Melodica':      [0,2,3,5,7,9,11],
  'Diminuita (T/S)':      [0,2,3,5,6,8,9,11],
  'Esatonale':            [0,2,4,6,8,10],
  'Minore Pentatonica':   [0,3,5,7,10],
  'Maggiore Pentatonica': [0,2,4,7,9],
  'Blues':                [0,3,5,6,7,10],
  'Minore Naturale (Aeolian)': [0,2,3,5,7,8,10],
  'Locrio':               [0,1,3,5,6,8,10],
  'Minore Armonica':      [0,2,3,5,7,8,11],
  'Lidio Dominante':      [0,2,4,6,7,9,10],
  'Misolidio b13':        [0,2,4,5,7,8,10],
}

export const CAGED_SHAPES = {
  C: [{s:4,f:0},{s:3,f:-1},{s:2,f:-3},{s:1,f:-2},{s:0,f:-3}],
  A: [{s:4,f:0},{s:3,f:2},{s:2,f:2},{s:1,f:2},{s:0,f:0}],
  G: [{s:5,f:0},{s:4,f:-1},{s:3,f:-3},{s:2,f:-3},{s:1,f:-3},{s:0,f:0}],
  E: [{s:5,f:0},{s:4,f:2},{s:3,f:2},{s:2,f:1},{s:1,f:0},{s:0,f:0}],
  D: [{s:3,f:0},{s:2,f:2},{s:1,f:3},{s:0,f:2}],
}

export const INTERVAL_COLORS = {
  0:  { label:'Root',  color:'#e74c3c', short:'R'    },
  1:  { label:'b9',   color:'#2980b9', short:'b9'   },
  2:  { label:'9',    color:'#3498db', short:'9'    },
  3:  { label:'b3',   color:'#f1c40f', short:'b3'   },
  4:  { label:'3',    color:'#f39c12', short:'3'    },
  5:  { label:'11',   color:'#9b59b6', short:'11'   },
  6:  { label:'#11',  color:'#8e44ad', short:'#11'  },
  7:  { label:'5',    color:'#bdc3c7', short:'5'    },
  8:  { label:'#5',   color:'#95a5a6', short:'#5'   },
  9:  { label:'13',   color:'#1abc9c', short:'13'   },
  10: { label:'7',    color:'#2ecc71', short:'7'    },
  11: { label:'maj7', color:'#27ae60', short:'maj7' },
}

export function noteIndexToFrequency(noteIndex, octave = 4) {
  return A4_FREQ * Math.pow(2, (noteIndex - A4_NOTE_IDX + (octave - 4) * 12) / 12)
}

export function getNoteIndex(tuning, stringIdx, fretIdx) {
  return (tuning[stringIdx] + fretIdx) % 12
}
