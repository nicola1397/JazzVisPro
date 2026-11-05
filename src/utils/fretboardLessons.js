// Guided lessons for finding your way on the fretboard, in Italian and English.
//
// Each lesson is a list of steps:
//   explain  text (may contain <strong>/<em>), optional list [term, text] and `after` text,
//            marks shown on the fretboard; `play: true` adds a Listen button that plays them in order
//   mirror   the app plays `seq` on the fretboard (Watch), then the student repeats it in order,
//            clicking or playing the guitar; `guide: true` keeps the positions faintly marked
//   quiz     `count` questions made by `ask()`; passed with at least 70% right
//
// Positions are { s, f }: s = string index (0 = 1st/high E … 5 = 6th/low E, as on screen), f = fret.
// The lessons assume standard tuning (E A D G B E).

import { TUNINGS, INTERVAL_COLORS, getAbsoluteNote, getPitchClass } from './theory.js'

export const LESSON_TUNING = 'E Standard'
const TUNING = TUNINGS[LESSON_TUNING]
const MAX_FRET = 24

export const NOTE_COLOR = '#FFD60A'
const ROOT_COLOR = INTERVAL_COLORS[0].color

const SOLFEGE = { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' }
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const NATURALS = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const ORD_EN = ['', '1st', '2nd', '3rd', '4th', '5th', '6th']

// ── Positions ────────────────────────────────────────────────────────────────

// A mark from the string number (1 = high E … 6 = low E) and the fret.
function at(string, fret, label = '', color = NOTE_COLOR) {
  return { s: string - 1, f: fret, label, color }
}
export const midiOf = p => getAbsoluteNote(TUNING, p.s, p.f)
export const pcOf   = p => getPitchClass(TUNING, p.s, p.f)

function pcOfName(name) {
  const acc = name.slice(1)
  return (LETTER_PC[name[0]] + (acc === '#' ? 1 : acc === 'b' ? -1 : 0) + 12) % 12
}

// Frets of a string (number 1-6) that sound this pitch class.
function fretsOf(string, pc, lo = 0, hi = MAX_FRET) {
  const out = []
  for (let f = lo; f <= hi; f++) if ((TUNING[string - 1] + f) % 12 === pc) out.push(f)
  return out
}

// Every position on the fretboard that sounds exactly this MIDI note.
export function positionsOfMidi(midi) {
  const out = []
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f <= MAX_FRET; f++) if (getAbsoluteNote(TUNING, s, f) === midi) out.push({ s, f })
  }
  return out
}

const naturalAt = (string, fret) => NATURALS.find(n => LETTER_PC[n] === (TUNING[string - 1] + fret) % 12)

// ── Text helpers ─────────────────────────────────────────────────────────────

const both = fn => ({ it: fn('it'), en: fn('en') })
const pick = arr => arr[Math.floor(Math.random() * arr.length)]

// "G (Sol)" in Italian, "G" in English.
function noteName(name, lang) {
  return lang === 'it' ? `${name} (${SOLFEGE[name[0]]}${name.slice(1)})` : name
}
function stringName(n, lang) {
  return lang === 'it' ? `${n}ª corda` : `${ORD_EN[n]} string`
}
// "al 5° tasto" / "a vuoto", "at fret 5" / "open"
function atFret(f, lang) {
  if (lang === 'it') return f === 0 ? 'a vuoto' : `${f === 8 || f === 11 ? 'all\'' : 'al '}${f}° tasto`
  return f === 0 ? 'open' : `at fret ${f}`
}
function frets(k, lang) {
  if (lang === 'it') return k === 1 ? 'un tasto' : `${k} tasti`
  return k === 1 ? 'one fret' : `${k} frets`
}

// Hint for a note on the 6th or 5th string: start from the nearest dot (or the open string)
// that holds a natural note, then count the frets.
const LANDMARKS = [0, 3, 5, 7, 12]
function landmarkHint(string, fret, name) {
  let m = LANDMARKS[0]
  for (const l of LANDMARKS) if (Math.abs(fret - l) < Math.abs(fret - m)) m = l
  const d = fret - m
  const lm = naturalAt(string, m)
  return {
    text: both(lang => {
      const from = lang === 'it'
        ? (m === 0 ? 'dalla corda a vuoto' : `dal pallino del ${m}° tasto`)
        : (m === 0 ? 'the open string' : `the dot at fret ${m}`)
      if (d === 0) {
        return lang === 'it'
          ? (m === 0 ? `${name} è la corda a vuoto.` : `${name} è proprio sul pallino del ${m}° tasto.`)
          : (m === 0 ? `${name} is the open string.` : `${name} sits right on the dot at fret ${m}.`)
      }
      return lang === 'it'
        ? `Parti ${from} (${lm}): ${name} è ${frets(Math.abs(d), lang)} più ${d > 0 ? 'in alto, verso il corpo' : 'in basso, verso la paletta'}.`
        : `Start from ${from} (${lm}): ${name} is ${frets(Math.abs(d), lang)} ${d > 0 ? 'higher, towards the body' : 'lower, towards the headstock'}.`
    }),
    marks: d === 0 ? [] : [at(string, m, lm)],
  }
}

// ── Question makers ──────────────────────────────────────────────────────────
// A question: { id, prompt, hint, accept: [{s,f}], context: [mark], reveal: [mark], hintMarks: [mark], root? }
// `accept` are the positions that count as right; a played guitar note is right when its pitch
// matches one of them. With `root`, a wrong answer is labelled with its degree above the root.

const OPEN_NAMES = {
  it: { 6: 'Mi grave (E)', 5: 'La (A)', 4: 'Re (D)', 3: 'Sol (G)', 2: 'Si (B)', 1: 'Mi acuto (E)' },
  en: { 6: 'low E', 5: 'A', 4: 'D', 3: 'G', 2: 'B', 1: 'high E' },
}

function askOpenString() {
  const n = 1 + Math.floor(Math.random() * 6)
  const letter = naturalAt(n, 0)
  return {
    id: `open-${n}`,
    prompt: both(lang => lang === 'it' ? `Corda a vuoto: ${OPEN_NAMES.it[n]}` : `Open string: ${OPEN_NAMES.en[n]}`),
    hint: both(lang => lang === 'it'
      ? `È la ${n}ª corda: la ${n}ª linea partendo dall'alto, al tasto 0.`
      : `It is the ${ORD_EN[n]} string: line ${n} counting from the top, at fret 0.`),
    accept: [at(n, 0)],
    reveal: [at(n, 0, letter)],
  }
}

function askStringFret() {
  const n = 1 + Math.floor(Math.random() * 6)
  const f = pick([3, 5, 7, 9, 12])
  return {
    id: `pos-${n}-${f}`,
    prompt: both(lang => lang === 'it' ? `${n}ª corda, ${f}° tasto` : `${ORD_EN[n]} string, fret ${f}`),
    hint: both(lang => lang === 'it'
      ? `Conta le linee dall'alto fino alla ${n}ª, poi cerca ${f === 12 ? 'il doppio pallino del 12° tasto' : `il pallino del ${f}° tasto`}.`
      : `Count the lines from the top down to the ${ORD_EN[n]}, then look for ${f === 12 ? 'the double dot at fret 12' : `the dot at fret ${f}`}.`),
    accept: [at(n, f)],
    reveal: [at(n, f, String(f))],
  }
}

// A natural note on one of `strings`. Hints: dots on the low strings, octave shapes on the others.
function askNatural(strings) {
  const n = pick(strings)
  const name = pick(NATURALS)
  const pc = LETTER_PC[name]
  const all = fretsOf(n, pc)
  const t = all[0]
  let hint
  if (n >= 5) {
    hint = landmarkHint(n, t, name)
  } else {
    // From a string already known: 6th → 4th and 5th → 3rd two frets higher, 4th → 2nd three
    // frets higher, 1st = 6th at the same fret.
    const [src, shift] = { 4: [6, 2], 3: [5, 2], 2: [4, 3], 1: [6, 0] }[n]
    let sf = t - shift
    if (sf < 0) sf += 12
    hint = {
      text: both(lang => {
        if (n === 1) {
          return lang === 'it'
            ? `La 1ª corda ha le stesse note della 6ª: ${name} è ${atFret(sf, lang)} sulla 6ª corda, quindi allo stesso tasto qui.`
            : `The 1st string has the same notes as the 6th: ${name} is ${atFret(sf, lang)} on the 6th string, so at the same fret here.`
        }
        return lang === 'it'
          ? `${name} è ${atFret(sf, lang)} sulla ${src}ª corda: da lì, due corde più su e ${shift} tasti più avanti.`
          : `${name} is ${atFret(sf, lang)} on the ${ORD_EN[src]} string: from there, two strings up and ${shift} frets higher.`
      }),
      marks: [at(src, sf, name)],
    }
  }
  return {
    id: `${name}@${n}`,
    prompt: both(lang => lang === 'it' ? `Trova ${noteName(name, lang)} sulla ${stringName(n, lang)}` : `Find ${name} on the ${stringName(n, lang)}`),
    hint: hint.text,
    hintMarks: hint.marks,
    accept: all.map(f => at(n, f)),
    reveal: all.map(f => at(n, f, name)),
  }
}

const SHARPS = ['C#', 'D#', 'F#', 'G#', 'A#']
const FLATS  = ['Db', 'Eb', 'Gb', 'Ab', 'Bb']

function askAccidental(strings) {
  const n = pick(strings)
  const name = pick(Math.random() < 0.5 ? SHARPS : FLATS)
  const sharp = name[1] === '#'
  const all = fretsOf(n, pcOfName(name))
  const t = all[0]
  const nat = name[0]
  const natFret = sharp ? t - 1 : t + 1
  return {
    id: `${name}@${n}`,
    prompt: both(lang => lang === 'it' ? `Trova ${noteName(name, lang)} sulla ${stringName(n, lang)}` : `Find ${name} on the ${stringName(n, lang)}`),
    hint: both(lang => {
      if (lang === 'it') {
        return sharp
          ? `${name} è un tasto più in alto di ${nat}: ${nat} è ${atFret(natFret, lang)}, sali di un tasto.`
          : `${name} è un tasto più in basso di ${nat}: ${nat} è ${atFret(natFret, lang)}, scendi di un tasto.`
      }
      return sharp
        ? `${name} is one fret above ${nat}: ${nat} is ${atFret(natFret, lang)}, go up one fret.`
        : `${name} is one fret below ${nat}: ${nat} is ${atFret(natFret, lang)}, go down one fret.`
    }),
    hintMarks: [at(n, natFret, nat)],
    accept: all.map(f => at(n, f)),
    reveal: all.map(f => at(n, f, name)),
  }
}

function askOctave() {
  for (;;) {
    const n = pick([6, 5, 4, 3])
    const name = pick(NATURALS)
    const f = fretsOf(n, LETTER_PC[name], 0, 9)[0]
    if (f === undefined) continue
    const k = n >= 5 ? 2 : 3
    const source = at(n, f, name)
    const target = midiOf(source) + 12
    return {
      id: `oct-${name}@${n}`,
      prompt: both(lang => lang === 'it' ? `Trova ${noteName(name, lang)} un'ottava più in alto` : `Find ${name} one octave higher`),
      hint: both(lang => lang === 'it'
        ? `Dalla ${n}ª corda: due corde più su e ${k} tasti più avanti${k === 3 ? ', perché la forma attraversa la 2ª corda' : ''}.`
        : `From the ${ORD_EN[n]} string: two strings up and ${k} frets higher${k === 3 ? ', because the shape crosses the 2nd string' : ''}.`),
      context: [source],
      accept: positionsOfMidi(target),
      reveal: [at(n - 2, f + k, name)],
    }
  }
}

// Interval shapes with the root on the 6th or 5th string: [strings up, frets moved].
export const INTERVAL_SHAPES = { 3: [1, -2], 4: [1, -1], 5: [1, 0], 7: [1, 2], 10: [2, 0], 11: [2, 1], 12: [2, 2] }
const DEGREE = { 0: 'R', 3: 'b3', 4: '3', 5: '4', 7: '5', 10: 'b7', 11: '7', 12: '8' }
const IV_NAME = {
  it: { 3: 'la 3ª minore (b3)', 4: 'la 3ª maggiore (3)', 5: 'la 4ª giusta (4)', 7: 'la 5ª giusta (5)', 10: 'la 7ª minore (b7)', 11: 'la 7ª maggiore (7)', 12: 'l\'ottava (8)' },
  en: { 3: 'minor 3rd (b3)', 4: 'major 3rd (3)', 5: 'perfect 4th (4)', 7: 'perfect 5th (5)', 10: 'minor 7th (b7)', 11: 'major 7th (7)', 12: 'octave (8)' },
}
const SHAPE_TEXT = {
  it: { 3: 'una corda più su, due tasti indietro', 4: 'una corda più su, un tasto indietro', 5: 'una corda più su, stesso tasto', 7: 'una corda più su, due tasti avanti', 10: 'due corde più su, stesso tasto', 11: 'due corde più su, un tasto avanti', 12: 'due corde più su, due tasti avanti' },
  en: { 3: 'one string up, two frets lower', 4: 'one string up, one fret lower', 5: 'one string up, same fret', 7: 'one string up, two frets higher', 10: 'two strings up, same fret', 11: 'two strings up, one fret higher', 12: 'two strings up, two frets higher' },
}
const ivMark = (string, fret, iv) => at(string, fret, DEGREE[iv], INTERVAL_COLORS[iv % 12].color)

function askInterval() {
  for (;;) {
    const n = pick([6, 5])
    const name = pick(NATURALS)
    const f = fretsOf(n, LETTER_PC[name], 2, 10)[0]
    if (f === undefined) continue
    const iv = pick([3, 4, 5, 7, 10, 11, 12])
    const [up, move] = INTERVAL_SHAPES[iv]
    const root = at(n, f, 'R', ROOT_COLOR)
    return {
      id: `iv-${iv}-${name}@${n}`,
      prompt: both(lang => lang === 'it' ? `Trova ${IV_NAME.it[iv]} di ${noteName(name, lang)}` : `Find the ${IV_NAME.en[iv]} of ${name}`),
      hint: both(lang => lang === 'it' ? `Forma: ${SHAPE_TEXT.it[iv]} rispetto alla tonica.` : `Shape: ${SHAPE_TEXT.en[iv]} from the root.`),
      context: [root],
      root,
      accept: positionsOfMidi(midiOf(root) + iv),
      reveal: [ivMark(n - up, f + move, iv)],
    }
  }
}

// ── Lessons ──────────────────────────────────────────────────────────────────

const naturalsOn = (string, frets) => frets.map(f => at(string, f, naturalAt(string, f)))

export const LESSONS = [
  {
    id: 'strings',
    title: { it: 'Corde e tasti', en: 'Strings and frets' },
    summary: {
      it: 'Come si legge il manico sullo schermo, i nomi delle corde a vuoto e i pallini che fanno da punti di riferimento.',
      en: 'How to read the on-screen fretboard, the names of the open strings and the dots that work as landmarks.',
    },
    practice: { path: '/note-finder', nav: 'nav.note-finder' },
    steps: [
      { id: 'board', type: 'explain',
        title: { it: 'Il manico come una tablatura', en: 'The fretboard drawn like tab' },
        text: {
          it: 'Il manico sullo schermo si legge come una tablatura: la <strong>linea in alto è la 1ª corda</strong> (Mi acuto, la più sottile) e la <strong>linea in basso è la 6ª</strong> (Mi grave, la più spessa). I numeri sotto il manico sono i tasti: <strong>0 è la corda a vuoto</strong>, suonata senza premere. I cerchi segnati qui sopra sono le sei corde a vuoto, con il loro numero.',
          en: 'The on-screen fretboard reads like tab: the <strong>top line is the 1st string</strong> (high E, the thinnest) and the <strong>bottom line is the 6th</strong> (low E, the thickest). The numbers under the neck are the frets: <strong>0 is the open string</strong>, played without pressing. The circles marked above are the six open strings, with their numbers.',
        },
        marks: [1, 2, 3, 4, 5, 6].map(n => at(n, 0, String(n))) },
      { id: 'open-strings', type: 'mirror', guide: true,
        title: { it: 'Le corde a vuoto', en: 'The open strings' },
        text: {
          it: 'Le corde a vuoto, dalla 6ª alla 1ª, sono <strong>E A D G B E</strong> (Mi La Re Sol Si Mi). Premi <strong>Guarda</strong>: le suono una alla volta, dalla linea in basso verso quella in alto. Poi tocca a te: clicca i cerchi del tasto 0 nello stesso ordine, oppure suona le corde sulla chitarra.',
          en: 'The open strings, from the 6th to the 1st, are <strong>E A D G B E</strong>. Press <strong>Watch</strong>: I play them one at a time, from the bottom line up. Then it\'s your turn: click the fret-0 circles in the same order, or play the strings on your guitar. A common way to remember them: <em>Eddie Ate Dynamite, Good Bye Eddie</em>.',
        },
        seq: [6, 5, 4, 3, 2, 1].map(n => at(n, 0, naturalAt(n, 0))) },
      { id: 'semitone', type: 'explain', play: true,
        title: { it: 'Un tasto, un semitono', en: 'One fret, one half step' },
        text: {
          it: 'Ogni tasto verso il corpo della chitarra (a destra sullo schermo) alza la nota di un <strong>semitono</strong>, la distanza più piccola della nostra musica. Dodici tasti fanno dodici semitoni, cioè un\'<strong>ottava</strong>: al 12° tasto ritrovi la nota della corda a vuoto, un\'ottava più acuta. Premi <strong>Ascolta</strong> per sentire E a vuoto e al 12° tasto, sulla 6ª e sulla 1ª corda.',
          en: 'Each fret towards the body of the guitar (to the right on screen) raises the note by a <strong>half step</strong>, the smallest step in Western music. Twelve frets make twelve half steps, an <strong>octave</strong>: at fret 12 you find the open-string note again, an octave higher. Press <strong>Listen</strong> to hear E open and at fret 12, on the 6th and the 1st string.',
        },
        marks: [at(6, 0, 'E'), at(6, 12, 'E'), at(1, 0, 'E'), at(1, 12, 'E')] },
      { id: 'dots', type: 'explain',
        title: { it: 'I pallini sul manico', en: 'The dots on the neck' },
        text: {
          it: 'I pallini ai tasti <strong>3, 5, 7, 9</strong> e il doppio pallino al <strong>12</strong> (poi di nuovo 15, 17, 19, 21 e 24) sono punti di riferimento: ti dicono dove sei senza contare i tasti uno a uno. La tua chitarra ha gli stessi, di solito anche sul bordo del manico.',
          en: 'The dots at frets <strong>3, 5, 7, 9</strong> and the double dot at <strong>12</strong> (then again 15, 17, 19, 21 and 24) are landmarks: they tell you where you are without counting frets one by one. Your guitar has the same ones, usually on the edge of the neck too.',
        },
        marks: [3, 5, 7, 9, 12].map(f => at(6, f, String(f))) },
      { id: 'dots-climb', type: 'mirror', guide: false,
        title: { it: 'Di pallino in pallino', en: 'Dot by dot' },
        text: {
          it: 'Guarda: sulla 5ª corda salgo di pallino in pallino, 3, 5, 7, 9 e 12. Poi ripeti lo stesso percorso a memoria. Cerca i pallini, non contare i tasti.',
          en: 'Watch: on the 5th string I climb dot by dot, 3, 5, 7, 9 and 12. Then repeat the same path from memory. Look for the dots, don\'t count frets.',
        },
        seq: [3, 5, 7, 9, 12].map(f => at(5, f, String(f))) },
      { id: 'quiz-strings', type: 'quiz', count: 8,
        title: { it: 'Corda e tasto', en: 'String and fret' },
        text: {
          it: 'Clicca la posizione richiesta, o suonala. Le domande mescolano le corde a vuoto chiamate per nome e le posizioni date con corda e tasto.',
          en: 'Click the position asked, or play it. The questions mix open strings called by name and positions given by string and fret.',
        },
        ask: () => (Math.random() < 0.4 ? askOpenString() : askStringFret()) },
    ],
  },

  {
    id: 'naturals',
    title: { it: 'Le note naturali sulle corde basse', en: 'Natural notes on the low strings' },
    summary: {
      it: 'Le sette note senza alterazioni sulla 6ª e sulla 5ª corda: la base per trovare le toniche di accordi e scale.',
      en: 'The seven notes without sharps or flats on the 6th and 5th strings: the base for finding the roots of chords and scales.',
    },
    practice: { path: '/note-finder', nav: 'nav.note-finder' },
    steps: [
      { id: 'alphabet', type: 'explain', play: true,
        title: { it: 'Sette note, due semitoni', en: 'Seven notes, two half steps' },
        text: {
          it: 'Le note naturali sono sette: <strong>C D E F G A B</strong> (Do Re Mi Fa Sol La Si). Tra quasi tutte c\'è un <strong>tono</strong>, cioè 2 tasti. Le due eccezioni sono <strong>E–F</strong> e <strong>B–C</strong>: tra loro c\'è solo un semitono, quindi stanno su tasti vicini. Qui sopra le vedi sulla 6ª corda.',
          en: 'There are seven natural notes: <strong>C D E F G A B</strong>. Between most of them is a <strong>whole step</strong>, i.e. 2 frets. The two exceptions are <strong>E–F</strong> and <strong>B–C</strong>: they are only a half step apart, so they sit on neighbouring frets. Above you see them on the 6th string.',
        },
        marks: naturalsOn(6, [0, 1, 3, 5, 7, 8, 10, 12]) },
      { id: 'low-e', type: 'mirror', guide: true,
        title: { it: 'La 6ª corda', en: 'The 6th string' },
        text: {
          it: 'Guarda la 6ª corda dalla corda a vuoto al 12° tasto, solo note naturali. Poi ripeti. Fai caso ai due passi di un tasto solo: E–F (0–1) e B–C (7–8).',
          en: 'Watch the 6th string from open to fret 12, natural notes only. Then repeat. Notice the two one-fret steps: E–F (0–1) and B–C (7–8).',
        },
        seq: naturalsOn(6, [0, 1, 3, 5, 7, 8, 10, 12]) },
      { id: 'quiz-low-e', type: 'quiz', count: 6,
        title: { it: 'Trova la nota sulla 6ª corda', en: 'Find the note on the 6th string' },
        text: {
          it: 'Usa i pallini come appoggio: G è al 3° tasto, A al 5°, B al 7°. Se ti blocchi, chiedi un suggerimento.',
          en: 'Lean on the dots: G is at fret 3, A at 5, B at 7. If you get stuck, ask for a hint.',
        },
        ask: () => askNatural([6]) },
      { id: 'a-string', type: 'mirror', guide: true,
        title: { it: 'La 5ª corda', en: 'The 5th string' },
        text: {
          it: 'Stesso lavoro sulla 5ª corda, che parte da A. Ripeti dopo la dimostrazione: qui i passi di un tasto sono B–C (2–3) ed E–F (7–8).',
          en: 'Same work on the 5th string, which starts on A. Repeat after the demonstration: here the one-fret steps are B–C (2–3) and E–F (7–8).',
        },
        seq: naturalsOn(5, [0, 2, 3, 5, 7, 8, 10, 12]) },
      { id: 'two-strings', type: 'explain', play: true,
        title: { it: 'Due corde bastano', en: 'Two strings are enough' },
        text: {
          it: 'Con la 6ª e la 5ª corda trovi ogni nota naturale entro il 5° tasto: <strong>E F G A</strong> sulla 6ª, <strong>B C D</strong> sulla 5ª. Da qui partono quasi tutte le forme di accordi e scale, con la tonica su una di queste due corde.',
          en: 'With the 6th and 5th strings you find every natural note within fret 5: <strong>E F G A</strong> on the 6th, <strong>B C D</strong> on the 5th. Almost every chord and scale shape starts from here, with its root on one of these two strings.',
        },
        marks: [...naturalsOn(6, [0, 1, 3, 5]), ...naturalsOn(5, [2, 3, 5])] },
      { id: 'quiz-low-strings', type: 'quiz', count: 8,
        title: { it: '6ª o 5ª corda', en: '6th or 5th string' },
        text: {
          it: 'Ora le domande cambiano corda: leggi bene quale corda è richiesta.',
          en: 'Now the questions switch strings: read carefully which string is asked.',
        },
        ask: () => askNatural([6, 5]) },
    ],
  },

  {
    id: 'accidentals',
    title: { it: 'Diesis e bemolle', en: 'Sharps and flats' },
    summary: {
      it: 'Le note tra le naturali: un tasto più su è diesis, un tasto più giù è bemolle. Stesso tasto, due nomi.',
      en: 'The notes between the naturals: one fret up is sharp, one fret down is flat. Same fret, two names.',
    },
    practice: { path: '/note-finder', nav: 'nav.note-finder' },
    steps: [
      { id: 'sharp-flat', type: 'explain', play: true,
        title: { it: 'Un tasto su, un tasto giù', en: 'One fret up, one fret down' },
        text: {
          it: 'Il <strong>diesis (#)</strong> alza una nota di un semitono, cioè di un tasto verso il corpo della chitarra. Il <strong>bemolle (b)</strong> la abbassa di un tasto, verso la paletta. Per questo lo stesso tasto ha due nomi: il 2° tasto della 6ª corda è <strong>F#</strong> (F alzato) ma anche <strong>Gb</strong> (G abbassato).',
          en: 'A <strong>sharp (#)</strong> raises a note by a half step, one fret towards the body of the guitar. A <strong>flat (b)</strong> lowers it by one fret, towards the headstock. That is why the same fret has two names: fret 2 of the 6th string is <strong>F#</strong> (F raised) and also <strong>Gb</strong> (G lowered).',
        },
        marks: [at(6, 1, 'F'), at(6, 2, 'F#'), at(6, 3, 'G')] },
      { id: 'no-between', type: 'explain', play: true,
        title: { it: 'Dove non c\'è niente in mezzo', en: 'Where there is nothing in between' },
        text: {
          it: 'Tra <strong>B e C</strong> e tra <strong>E e F</strong> non c\'è nessun tasto in mezzo: sono già a un semitono. Così E# è semplicemente F, e Cb è B. Negli esercizi incontrerai quasi sempre i nomi soliti: C#, Eb, F#, Ab, Bb e simili.',
          en: 'Between <strong>B and C</strong> and between <strong>E and F</strong> there is no fret in between: they are already a half step apart. So E# is simply F, and Cb is B. In the exercises you will nearly always meet the usual names: C#, Eb, F#, Ab, Bb and so on.',
        },
        marks: naturalsOn(5, [2, 3, 7, 8]) },
      { id: 'chromatic-up', type: 'mirror', guide: true,
        title: { it: 'Salire di semitono', en: 'Climbing by half steps' },
        text: {
          it: 'Guarda: dalla 6ª corda a vuoto salgo di un tasto alla volta fino ad A. Salendo si usano di solito i diesis: E, F, F#, G, G#, A. Poi ripeti.',
          en: 'Watch: from the open 6th string I climb one fret at a time up to A. Going up you usually use sharps: E, F, F#, G, G#, A. Then repeat.',
        },
        seq: ['E', 'F', 'F#', 'G', 'G#', 'A'].map((n, f) => at(6, f, n)) },
      { id: 'chromatic-down', type: 'mirror', guide: false,
        title: { it: 'Scendere con i bemolle', en: 'Coming down with flats' },
        text: {
          it: 'Ora al contrario sulla 5ª corda, da D fino alla corda a vuoto: D, Db, C, B, Bb, A. Scendendo si usano di solito i bemolle. Stavolta i cerchi non restano segnati: ripeti a memoria.',
          en: 'Now the other way on the 5th string, from D down to the open string: D, Db, C, B, Bb, A. Going down you usually use flats. This time the circles don\'t stay marked: repeat from memory.',
        },
        seq: ['D', 'Db', 'C', 'B', 'Bb', 'A'].map((n, i) => at(5, 5 - i, n)) },
      { id: 'quiz-accidentals', type: 'quiz', count: 8,
        title: { it: 'Trova diesis e bemolle', en: 'Find sharps and flats' },
        text: {
          it: 'Trova la nota sulla corda richiesta. Pensa prima alla nota naturale, poi spostati di un tasto: su per il diesis, giù per il bemolle.',
          en: 'Find the note on the string asked. Think of the natural note first, then move one fret: up for a sharp, down for a flat.',
        },
        ask: () => askAccidental([6, 5]) },
    ],
  },

  {
    id: 'octaves',
    title: { it: 'Le forme d\'ottava', en: 'Octave shapes' },
    summary: {
      it: 'La stessa nota in più punti del manico: due forme per saltare da una corda all\'altra senza contare.',
      en: 'The same note in several places on the neck: two shapes to jump from string to string without counting.',
    },
    practice: { path: '/note-finder', nav: 'nav.note-finder' },
    steps: [
      { id: 'octave-2', type: 'explain', play: true,
        title: { it: 'Due corde su, due tasti avanti', en: 'Two strings up, two frets higher' },
        text: {
          it: 'Sulla chitarra la stessa nota compare in più punti. Dalla <strong>6ª alla 4ª corda</strong> e dalla <strong>5ª alla 3ª</strong>, l\'ottava sopra si trova <strong>due corde più su e due tasti più avanti</strong> (verso destra). Esempio: G al 3° tasto della 6ª corda → G al 5° tasto della 4ª.',
          en: 'On the guitar the same note shows up in several places. From the <strong>6th to the 4th string</strong> and from the <strong>5th to the 3rd</strong>, the octave above is <strong>two strings up and two frets higher</strong> (to the right). Example: G at fret 3 of the 6th string → G at fret 5 of the 4th.',
        },
        marks: [at(6, 3, 'G'), at(4, 5, 'G'), at(5, 3, 'C'), at(3, 5, 'C')] },
      { id: 'octave-2-mirror', type: 'mirror', guide: true,
        title: { it: 'Rifai le ottave', en: 'Copy the octaves' },
        text: {
          it: 'Guarda: A sulla 6ª corda e la sua ottava sulla 4ª, poi D sulla 5ª e la sua ottava sulla 3ª. Ripeti le quattro note nello stesso ordine.',
          en: 'Watch: A on the 6th string and its octave on the 4th, then D on the 5th and its octave on the 3rd. Repeat the four notes in the same order.',
        },
        seq: [at(6, 5, 'A'), at(4, 7, 'A'), at(5, 5, 'D'), at(3, 7, 'D')] },
      { id: 'octave-3', type: 'explain', play: true,
        title: { it: 'Attraversare la 2ª corda', en: 'Crossing the 2nd string' },
        text: {
          it: 'Tra due corde vicine ci sono 5 semitoni, tranne tra la 3ª (G) e la 2ª (B), dove ce ne sono 4. Quando una forma attraversa questo punto, aggiungi un tasto: dalla <strong>4ª alla 2ª corda</strong> e dalla <strong>3ª alla 1ª</strong> l\'ottava è <strong>due corde più su e tre tasti più avanti</strong>.',
          en: 'Neighbouring strings are 5 half steps apart, except the 3rd (G) and the 2nd (B), which are 4 apart. When a shape crosses that gap, add one fret: from the <strong>4th to the 2nd string</strong> and from the <strong>3rd to the 1st</strong> the octave is <strong>two strings up and three frets higher</strong>.',
        },
        marks: [at(4, 2, 'E'), at(2, 5, 'E'), at(3, 2, 'A'), at(1, 5, 'A')] },
      { id: 'octave-6-1', type: 'explain', play: true,
        title: { it: 'La 6ª e la 1ª', en: 'The 6th and the 1st' },
        text: {
          it: 'La 6ª e la 1ª corda sono tutte e due E, a due ottave di distanza: hanno <strong>le stesse note agli stessi tasti</strong>. Tutto quello che sai della 6ª corda vale anche per la 1ª.',
          en: 'The 6th and the 1st strings are both E, two octaves apart: they have <strong>the same notes at the same frets</strong>. Everything you know about the 6th string also works on the 1st.',
        },
        marks: [at(6, 3, 'G'), at(1, 3, 'G'), at(6, 8, 'C'), at(1, 8, 'C')] },
      { id: 'octave-chain', type: 'mirror', guide: false,
        title: { it: 'Una nota, tre ottave', en: 'One note, three octaves' },
        text: {
          it: 'Guarda: A parte dalla 6ª corda e sale di ottava in ottava, prima con la forma da due tasti, poi con quella da tre. Ripeti a memoria: i cerchi non restano segnati.',
          en: 'Watch: A starts on the 6th string and climbs octave by octave, first with the two-fret shape, then with the three-fret one. Repeat from memory: the circles don\'t stay marked.',
        },
        seq: [at(6, 5, 'A'), at(4, 7, 'A'), at(2, 10, 'A')] },
      { id: 'quiz-octaves', type: 'quiz', count: 6,
        title: { it: 'Trova l\'ottava', en: 'Find the octave' },
        text: {
          it: 'Sul manico c\'è una nota segnata: trova la stessa nota un\'ottava più acuta. Vale ogni posizione con l\'altezza giusta, ma prova a usare le forme.',
          en: 'A note is marked on the fretboard: find the same note one octave higher. Any position with the right pitch counts, but try to use the shapes.',
        },
        ask: askOctave },
    ],
  },

  {
    id: 'all-strings',
    title: { it: 'Le note su tutte le corde', en: 'Notes on every string' },
    summary: {
      it: 'Con le forme d\'ottava porti sulle corde acute quello che sai delle corde basse.',
      en: 'With octave shapes you carry what you know from the low strings over to the high ones.',
    },
    practice: { path: '/note-finder', nav: 'nav.note-finder' },
    steps: [
      { id: 'method', type: 'explain',
        title: { it: 'Parti da quello che sai', en: 'Start from what you know' },
        text: {
          it: 'Per trovare una nota sulla 4ª, 3ª, 2ª o 1ª corda non serve imparare a memoria tutte e quattro le corde. Trova la nota su una corda che conosci, poi usa una forma d\'ottava:',
          en: 'To find a note on the 4th, 3rd, 2nd or 1st string you don\'t need to memorise all four strings. Find the note on a string you know, then use an octave shape:',
        },
        list: {
          it: [['4ª corda:', 'dalla 6ª, due corde più su e due tasti avanti.'], ['3ª corda:', 'dalla 5ª, due corde più su e due tasti avanti.'], ['2ª corda:', 'dalla 4ª, due corde più su e tre tasti avanti.'], ['1ª corda:', 'come la 6ª, stesso tasto.']],
          en: [['4th string:', 'from the 6th, two strings up and two frets higher.'], ['3rd string:', 'from the 5th, two strings up and two frets higher.'], ['2nd string:', 'from the 4th, two strings up and three frets higher.'], ['1st string:', 'like the 6th, same fret.']],
        } },
      { id: 'all-c', type: 'mirror', guide: true,
        title: { it: 'Tutte le C', en: 'Every C' },
        text: {
          it: 'Guarda tutte le C entro il 12° tasto, dalla 6ª alla 1ª corda. Fai caso alle coppie: 6ª e 4ª, 5ª e 3ª sono forme d\'ottava; la 1ª è uguale alla 6ª. Poi ripeti.',
          en: 'Watch every C up to fret 12, from the 6th to the 1st string. Notice the pairs: 6th and 4th, 5th and 3rd are octave shapes; the 1st is the same as the 6th. Then repeat.',
        },
        seq: [at(6, 8, 'C'), at(5, 3, 'C'), at(4, 10, 'C'), at(3, 5, 'C'), at(2, 1, 'C'), at(1, 8, 'C')] },
      { id: 'all-g', type: 'mirror', guide: false,
        title: { it: 'Tutte le G', en: 'Every G' },
        text: {
          it: 'Ora G, sempre dalla 6ª alla 1ª corda, usando le stesse coppie. Stavolta ripeti a memoria.',
          en: 'Now G, again from the 6th to the 1st string, using the same pairs. This time repeat from memory.',
        },
        seq: [at(6, 3, 'G'), at(5, 10, 'G'), at(4, 5, 'G'), at(3, 12, 'G'), at(2, 8, 'G'), at(1, 3, 'G')] },
      { id: 'quiz-high-strings', type: 'quiz', count: 8,
        title: { it: 'Le corde acute', en: 'The high strings' },
        text: {
          it: 'Trova la nota sulla corda richiesta, dalla 4ª alla 1ª. Il suggerimento segna sul manico da dove partire.',
          en: 'Find the note on the string asked, from the 4th to the 1st. The hint marks on the fretboard where to start from.',
        },
        ask: () => askNatural([4, 3, 2, 1]) },
      { id: 'quiz-any-string', type: 'quiz', count: 8,
        title: { it: 'Tutte le corde', en: 'All strings' },
        text: {
          it: 'Ultimo giro: qualsiasi corda, solo note naturali.',
          en: 'Last round: any string, natural notes only.',
        },
        ask: () => askNatural([6, 5, 4, 3, 2, 1]) },
    ],
  },

  {
    id: 'intervals',
    title: { it: 'Gli intervalli come forme', en: 'Intervals as shapes' },
    summary: {
      it: 'Terze, quinte e settime come forme fisse da spostare: il ponte verso arpeggi e accordi.',
      en: 'Thirds, fifths and sevenths as fixed shapes you can move: the bridge to arpeggios and chords.',
    },
    practice: { path: '/interval-learner', nav: 'nav.interval-learner' },
    steps: [
      { id: 'interval-idea', type: 'explain', play: true,
        title: { it: 'Una distanza, una forma', en: 'One distance, one shape' },
        text: {
          it: 'Un intervallo è la distanza tra due note. Sulla chitarra ogni intervallo ha una <strong>forma</strong> che puoi spostare ovunque, senza pensare ai nomi delle note. Con la tonica (R) sulla 6ª o sulla 5ª corda le forme principali sono queste:',
          en: 'An interval is the distance between two notes. On the guitar each interval has a <strong>shape</strong> you can move anywhere, without thinking about note names. With the root (R) on the 6th or 5th string, the main shapes are these:',
        },
        list: {
          it: [3, 4, 5, 7, 10, 11, 12].map(iv => [`${DEGREE[iv]} · ${IV_NAME.it[iv].replace(/^(la |l')/, '').replace(/ \(.*\)$/, '')}:`, `${SHAPE_TEXT.it[iv]}.`]),
          en: [3, 4, 5, 7, 10, 11, 12].map(iv => [`${DEGREE[iv]} · ${IV_NAME.en[iv].replace(/ \(.*\)$/, '')}:`, `${SHAPE_TEXT.en[iv]}.`]),
        },
        after: {
          it: 'Con la tonica sulla 4ª o sulla 3ª corda le forme che arrivano alla 2ª corda si spostano di un tasto in avanti, come le ottave.',
          en: 'With the root on the 4th or 3rd string, the shapes that reach the 2nd string move one fret higher, like the octaves.',
        },
        marks: [at(6, 5, 'R', ROOT_COLOR), ...[3, 4, 5, 7, 10, 11, 12].map(iv => ivMark(6 - INTERVAL_SHAPES[iv][0], 5 + INTERVAL_SHAPES[iv][1], iv))] },
      { id: 'major-arp', type: 'mirror', guide: true,
        title: { it: 'L\'arpeggio maggiore', en: 'The major arpeggio' },
        text: {
          it: 'Guarda: tonica, terza maggiore, quinta e ottava di A, con la tonica sulla 6ª corda. È l\'accordo di A maggiore suonato una nota alla volta. Poi ripeti.',
          en: 'Watch: root, major third, fifth and octave of A, with the root on the 6th string. It is the A major chord played one note at a time. Then repeat.',
        },
        seq: [at(6, 5, 'R', ROOT_COLOR), ivMark(5, 4, 4), ivMark(5, 7, 7), ivMark(4, 7, 12)] },
      { id: 'minor7-arp', type: 'mirror', guide: false,
        title: { it: 'L\'arpeggio m7', en: 'The m7 arpeggio' },
        text: {
          it: 'Le stesse forme con la tonica sulla 5ª corda: C, Eb, G e Bb, cioè l\'arpeggio di Cm7 (R, b3, 5, b7). Ripeti a memoria.',
          en: 'The same shapes with the root on the 5th string: C, Eb, G and Bb, the Cm7 arpeggio (R, b3, 5, b7). Repeat from memory.',
        },
        seq: [at(5, 3, 'R', ROOT_COLOR), ivMark(4, 1, 3), ivMark(4, 5, 7), ivMark(3, 3, 10)] },
      { id: 'quiz-intervals', type: 'quiz', count: 8,
        title: { it: 'Trova l\'intervallo', en: 'Find the interval' },
        text: {
          it: 'Sul manico è segnata la tonica (R): trova l\'intervallo richiesto sopra di lei. Vale ogni posizione con l\'altezza giusta, ma prova con le forme.',
          en: 'The root (R) is marked on the fretboard: find the interval asked above it. Any position with the right pitch counts, but try the shapes.',
        },
        ask: askInterval },
    ],
  },
]

export const INTERACTIVE = ['mirror', 'quiz']

export function findLesson(id) {
  return LESSONS.find(l => l.id === id) || null
}

export function lessonTitle(id, lang) {
  const l = findLesson(id)
  return l ? (l.title[lang] || l.title.it) : id
}
