// Functional harmony exercise: degrees, progressions per level, spelling and
// explanations. Every degree is one (distance from the tonic, chord quality)
// pair within its mode, so once the key and the mode are shown each chord has
// exactly one right answer.

// step: scale step of the root (1-7, used for spelling); semis: semitones above the tonic
export const DEGREES = {
  major: {
    'I':      { step: 1, semis: 0,  quality: 'maj7', fn: 'tonic' },
    'ii':     { step: 2, semis: 2,  quality: 'm7',   fn: 'ii' },
    'iii':    { step: 3, semis: 4,  quality: 'm7',   fn: 'iii' },
    'IV':     { step: 4, semis: 5,  quality: 'maj7', fn: 'subdominant' },
    'V7':     { step: 5, semis: 7,  quality: '7',    fn: 'dominant' },
    'vi':     { step: 6, semis: 9,  quality: 'm7',   fn: 'vi' },
    'viiø':   { step: 7, semis: 11, quality: 'm7b5', fn: 'vii' },
    'II7':    { step: 2, semis: 2,  quality: '7',    fn: 'V/V' },
    'VI7':    { step: 6, semis: 9,  quality: '7',    fn: 'V/ii' },
    'III7':   { step: 3, semis: 4,  quality: '7',    fn: 'V/vi' },
    'bII7':   { step: 2, semis: 1,  quality: '7',    fn: 'tritone' },
    'bIImaj7':{ step: 2, semis: 1,  quality: 'maj7', fn: 'neapolitan' },
    'bIII':   { step: 3, semis: 3,  quality: 'maj7', fn: 'borrowed' },
    'iv':     { step: 4, semis: 5,  quality: 'm7',   fn: 'minor-iv' },
    'bVI':    { step: 6, semis: 8,  quality: 'maj7', fn: 'borrowed' },
    'bVII7':  { step: 7, semis: 10, quality: '7',    fn: 'backdoor' },
    '#iv°7':  { step: 4, semis: 6,  quality: 'dim7', fn: 'passing-iv' },
    '#i°7':   { step: 1, semis: 1,  quality: 'dim7', fn: 'passing-i' },
    'iiø':    { step: 2, semis: 2,  quality: 'm7b5', fn: 'borrowed-ii' },
  },
  minor: {
    'i':      { step: 1, semis: 0,  quality: 'm7',   fn: 'minor-tonic' },
    'iiø':    { step: 2, semis: 2,  quality: 'm7b5', fn: 'minor-ii' },
    'III':    { step: 3, semis: 3,  quality: 'maj7', fn: 'relative' },
    'iv':     { step: 4, semis: 5,  quality: 'm7',   fn: 'minor-subdominant' },
    'v':      { step: 5, semis: 7,  quality: 'm7',   fn: 'minor-v' },
    'V7':     { step: 5, semis: 7,  quality: '7',    fn: 'minor-dominant' },
    'VI':     { step: 6, semis: 8,  quality: 'maj7', fn: 'minor-vi' },
    'VII7':   { step: 7, semis: 10, quality: '7',    fn: 'subtonic' },
    'vii°7':  { step: 7, semis: 11, quality: 'dim7', fn: 'leading-dim' },
    'bIImaj7':{ step: 2, semis: 1,  quality: 'maj7', fn: 'neapolitan' },
  },
}

// Answer choices of each level and mode.
export const PALETTES = {
  easy:   { major: ['I', 'ii', 'iii', 'IV', 'V7', 'vi', 'viiø'] },
  medium: {
    major: ['I', 'ii', 'iii', 'IV', 'V7', 'vi', 'viiø', 'II7', 'VI7', 'III7'],
    minor: ['i', 'iiø', 'III', 'iv', 'v', 'V7', 'VI', 'VII7'],
  },
  hard: {
    major: ['I', 'ii', 'iii', 'IV', 'V7', 'vi', 'viiø', 'II7', 'VI7', 'III7', 'bII7', 'bIImaj7', 'bIII', 'iv', 'bVI', 'bVII7', '#iv°7', '#i°7', 'iiø'],
    minor: ['i', 'iiø', 'III', 'iv', 'v', 'V7', 'VI', 'VII7', 'vii°7', 'bIImaj7'],
  },
}

export const PROGRESSIONS = {
  easy: [
    { mode: 'major', degrees: ['I', 'vi', 'ii', 'V7'] },
    { mode: 'major', degrees: ['ii', 'V7', 'I'] },
    { mode: 'major', degrees: ['I', 'IV', 'viiø', 'iii', 'vi', 'ii', 'V7', 'I'] },
    { mode: 'major', degrees: ['I', 'V7', 'vi', 'IV'] },
    { mode: 'major', degrees: ['iii', 'vi', 'ii', 'V7', 'I'] },
    { mode: 'major', degrees: ['IV', 'V7', 'iii', 'vi'] },
  ],
  medium: [
    { mode: 'minor', degrees: ['i', 'VI', 'iv', 'V7'] },
    { mode: 'minor', degrees: ['iiø', 'V7', 'i'] },
    { mode: 'minor', degrees: ['i', 'iv', 'VII7', 'III', 'VI', 'iiø', 'V7', 'i'] },
    { mode: 'minor', degrees: ['i', 'VII7', 'VI', 'V7'] },
    { mode: 'minor', degrees: ['i', 'iv', 'v', 'i'] },
    { mode: 'major', degrees: ['I', 'II7', 'ii', 'V7'] },
    { mode: 'major', degrees: ['I', 'VI7', 'ii', 'V7'] },
    { mode: 'major', degrees: ['I', 'III7', 'vi', 'II7', 'ii', 'V7'] },
  ],
  hard: [
    { mode: 'major', degrees: ['ii', 'bII7', 'I'] },
    { mode: 'major', degrees: ['iv', 'bVII7', 'I'] },
    { mode: 'major', degrees: ['I', 'IV', 'iv', 'I'] },
    { mode: 'major', degrees: ['I', 'bIII', 'bVI', 'bVII7', 'I'] },
    { mode: 'major', degrees: ['IV', '#iv°7', 'I', 'V7'] },
    { mode: 'major', degrees: ['I', '#i°7', 'ii', 'V7'] },
    { mode: 'major', degrees: ['I', 'iiø', 'V7', 'I'] },
    { mode: 'major', degrees: ['I', 'VI7', 'ii', 'bII7', 'I'] },
    { mode: 'minor', degrees: ['i', 'bIImaj7', 'V7', 'i'] },
    { mode: 'minor', degrees: ['i', 'vii°7', 'i', 'VI', 'iiø', 'V7'] },
  ],
}

// Tonics offered for each mode (keys a jazz musician meets often).
const TONICS = {
  major: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'G', 'Ab', 'A', 'Bb', 'B'],
  minor: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'],
}

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const pcOfName = n => (LETTER_PC[n[0]] + (n.slice(1).match(/#/g) || []).length - (n.slice(1).match(/b/g) || []).length + 12) % 12

// Correct but rarely read at sight on a chart.
const AWKWARD = ['Cb', 'Fb', 'E#', 'B#']

// The root of a degree spelled from the key (in C: bIII is Eb, #iv°7 is F#);
// null if it needs a double accidental or an awkward name, so that key is not used.
export function spellRoot(tonic, degree) {
  const letter = LETTERS[(LETTERS.indexOf(tonic[0]) + degree.step - 1) % 7]
  const want = (pcOfName(tonic) + degree.semis) % 12
  const diff = ((want - LETTER_PC[letter] + 18) % 12) - 6     // -6..5
  const name = diff === 0 ? letter : diff === 1 ? letter + '#' : diff === -1 ? letter + 'b' : null
  return name && !AWKWARD.includes(name) ? name : null
}

export function chordName(tonic, degree) {
  const root = spellRoot(tonic, degree)
  return root === null ? null : root + degree.quality
}

// A question: a progression in a key where every chord spells without double accidentals.
export function makeQuestion(level, pick = list => list[Math.floor(Math.random() * list.length)]) {
  for (let tries = 0; tries < 50; tries++) {
    const prog = pick(PROGRESSIONS[level])
    const tonic = pick(TONICS[prog.mode])
    const chords = prog.degrees.map(id => ({ id, name: chordName(tonic, DEGREES[prog.mode][id]) }))
    if (chords.every(c => c.name)) {
      return { mode: prog.mode, tonic, chords, targetIdx: Math.floor(Math.random() * chords.length) }
    }
  }
  return null
}

export function paletteOf(level, mode) {
  return PALETTES[level][mode] || PALETTES[level].major
}

// ── Explanations ──────────────────────────────────────────────────────────────
const INTERVAL_NAMES = {
  it: ['l\'unisono', 'una seconda minore', 'una seconda maggiore', 'una terza minore', 'una terza maggiore', 'una quarta giusta', 'una quarta aumentata', 'una quinta giusta', 'una sesta minore', 'una sesta maggiore', 'una settima minore', 'una settima maggiore'],
  en: ['a unison', 'a minor second', 'a major second', 'a minor third', 'a major third', 'a perfect fourth', 'an augmented fourth', 'a perfect fifth', 'a minor sixth', 'a major sixth', 'a minor seventh', 'a major seventh'],
}
const AUGMENTED_UNISON = { it: 'un unisono aumentato', en: 'an augmented unison' }

// Interval from the tonic to a degree's root, named by letters as well as semitones
// (C to C# is an augmented unison, C to Db a minor second), with its article.
export function intervalName(degree, lang) {
  return degree.step === 1 && degree.semis === 1 ? AUGMENTED_UNISON[lang] : INTERVAL_NAMES[lang][degree.semis]
}

export const FUNCTION_TEXT = {
  it: {
    'tonic': 'Tonica: il centro della tonalità, dove la progressione si ferma.',
    'ii': 'Sottodominante sul II grado: prepara il V7 (il "ii" del II-V-I).',
    'iii': 'III grado: sostituto della tonica, ne condivide tre note.',
    'subdominant': 'Sottodominante: si allontana dalla tonica.',
    'dominant': 'Dominante: la tensione che risolve sul I.',
    'vi': 'VI grado: relativo minore, sostituto della tonica.',
    'vii': 'VII grado semidiminuito: funzione di dominante (è un V9 senza fondamentale).',
    'V/V': 'Dominante secondaria del V (V7/V): porta al V, spesso passando dal suo ii.',
    'V/ii': 'Dominante secondaria del ii (V7/ii): risolve sul ii.',
    'V/vi': 'Dominante secondaria del vi (V7/vi): risolve sul vi.',
    'tritone': 'Sostituzione di tritono del V7: è a un tritono dal V e ne condivide terza e settima; scende di semitono sul I.',
    'neapolitan': 'Accordo napoletano (bII), dal modo frigio: prepara il V con un colore scuro; la sua fondamentale (b2) scende poi di semitono sulla tonica.',
    'borrowed': 'Preso in prestito dal minore parallelo (interscambio modale): un colore scuro dentro il maggiore.',
    'minor-iv': 'Sottodominante minore, presa dal minore parallelo: la b6 della tonalità dà il colore malinconico.',
    'backdoor': 'Dominante "backdoor" (bVII7), dal minore parallelo: risolve sul I salendo di un tono.',
    'passing-iv': 'Diminuito di passaggio: il basso sale di semitono dal IV e porta al I (al meglio con la quinta al basso: IV – #iv°7 – I/5).',
    'passing-i': 'Diminuito di passaggio tra I e ii: equivale al V7b9 del ii senza fondamentale.',
    'borrowed-ii': 'II semidiminuito preso dal minore parallelo: II-V "minore" che risolve sul I maggiore.',
    'minor-tonic': 'Tonica minore.',
    'minor-ii': 'II semidiminuito del minore: prepara il V7 (II-V minore).',
    'relative': 'III grado: il relativo maggiore della tonalità minore.',
    'minor-subdominant': 'Sottodominante minore (iv).',
    'minor-v': 'V minore, dal minore naturale: dominante debole, senza sensibile.',
    'minor-dominant': 'Dominante (V7) dalla minore armonica: la sensibile risolve sulla tonica.',
    'minor-vi': 'VI grado del minore: sottodominante, spesso prima del iiø o del V.',
    'subtonic': 'VII7 (sottotonica) dal minore naturale: è il V7 del relativo maggiore (III).',
    'leading-dim': 'VII diminuito dalla minore armonica: dominante senza fondamentale, risolve sulla tonica.',
  },
  en: {
    'tonic': 'Tonic: the centre of the key, where the progression comes to rest.',
    'ii': 'Subdominant on degree II: sets up the V7 (the "ii" of ii-V-I).',
    'iii': 'Degree III: tonic substitute, shares three notes with it.',
    'subdominant': 'Subdominant: moves away from the tonic.',
    'dominant': 'Dominant: the tension that resolves to I.',
    'vi': 'Degree VI: relative minor, tonic substitute.',
    'vii': 'Half-diminished VII: dominant function (a V9 without its root).',
    'V/V': 'Secondary dominant of V (V7/V): leads to V, often through its ii.',
    'V/ii': 'Secondary dominant of ii (V7/ii): resolves to ii.',
    'V/vi': 'Secondary dominant of vi (V7/vi): resolves to vi.',
    'tritone': 'Tritone substitute for V7: a tritone away from V, sharing its third and seventh; it slides down a semitone to I.',
    'neapolitan': 'Neapolitan chord (bII), from the phrygian mode: sets up V with a dark colour; its root (b2) then falls a semitone to the tonic.',
    'borrowed': 'Borrowed from the parallel minor (modal interchange): a dark colour inside the major key.',
    'minor-iv': 'Minor subdominant, borrowed from the parallel minor: the key\'s b6 gives the wistful colour.',
    'backdoor': '"Backdoor" dominant (bVII7), from the parallel minor: resolves to I up a whole step.',
    'passing-iv': 'Passing diminished chord: the bass rises a semitone from IV and leads to I (best with the fifth in the bass: IV – #iv°7 – I/5).',
    'passing-i': 'Passing diminished between I and ii: it is the V7b9 of ii without its root.',
    'borrowed-ii': 'Half-diminished ii borrowed from the parallel minor: a "minor" ii-V resolving to major I.',
    'minor-tonic': 'Minor tonic.',
    'minor-ii': 'Half-diminished ii of the minor key: sets up V7 (minor ii-V).',
    'relative': 'Degree III: the relative major of the minor key.',
    'minor-subdominant': 'Minor subdominant (iv).',
    'minor-v': 'Minor v, from natural minor: a weak dominant, without the leading tone.',
    'minor-dominant': 'Dominant (V7) from harmonic minor: its leading tone resolves to the tonic.',
    'minor-vi': 'Degree VI of minor: subdominant, often before iiø or V.',
    'subtonic': 'VII7 (subtonic) from natural minor: the V7 of the relative major (III).',
    'leading-dim': 'Diminished VII from harmonic minor: rootless dominant, resolves to the tonic.',
  },
}

// Short tag shown under each chord in the analysis
export const FUNCTION_TAG = {
  it: { tonic: 'T', ii: 'S', iii: 'T', subdominant: 'S', dominant: 'D', vi: 'T', vii: 'D', 'V/V': 'V/V', 'V/ii': 'V/ii', 'V/vi': 'V/vi',
        tritone: 'subV', neapolitan: 'N', borrowed: 'prest.', 'minor-iv': 'S min', backdoor: 'backdoor', 'passing-iv': 'pass.', 'passing-i': 'pass.',
        'borrowed-ii': 'prest.', 'minor-tonic': 'T', 'minor-ii': 'S', relative: 'T', 'minor-subdominant': 'S', 'minor-v': 'D deb.', 'minor-dominant': 'D',
        'minor-vi': 'S', subtonic: 'V/III', 'leading-dim': 'D' },
  en: { tonic: 'T', ii: 'S', iii: 'T', subdominant: 'S', dominant: 'D', vi: 'T', vii: 'D', 'V/V': 'V/V', 'V/ii': 'V/ii', 'V/vi': 'V/vi',
        tritone: 'subV', neapolitan: 'N', borrowed: 'borr.', 'minor-iv': 'S min', backdoor: 'backdoor', 'passing-iv': 'pass.', 'passing-i': 'pass.',
        'borrowed-ii': 'borr.', 'minor-tonic': 'T', 'minor-ii': 'S', relative: 'T', 'minor-subdominant': 'S', 'minor-v': 'weak D', 'minor-dominant': 'D',
        'minor-vi': 'S', subtonic: 'V/III', 'leading-dim': 'D' },
}
