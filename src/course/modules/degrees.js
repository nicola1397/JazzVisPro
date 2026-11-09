// Module — Scale degrees: what each degree does, the degrees in every key, where they
// sit around a root on the neck, and recognising them at a glance and by ear.

import { pcAt, midiAt, mod12, keyPc, keyDot, colorOf, pretty, pick, bag, shuffle, cagedScale, positionsOf, KEY_NAMES } from '../theory.js'
import { T, RED, AMBER, MAJOR, DEGREE_NAMES, degreeNote, scaleNotes, DRILL_KEYS, degreeOptions, chromaticOptions, DEG_CHROMATIC, shapeWindow } from '../build.js'
import { cadenceTonic } from '../sound.js'

const P = (it, en) => ({ type: 'p', it, en })
const NUM = ['1', '2', '3', '4', '5', '6', '7']
const ord = n => T(`${n}°`, `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`)

// A major-scale dot labelled with its degree number (1-7) instead of R.
function degDot(key, s, f, extra = {}) {
  const semi = mod12(pcAt(s, f) - keyPc(key))
  const d = MAJOR.indexOf(semi)
  return keyDot(key, s, f, { deg: d >= 0 ? NUM[d] : DEG_CHROMATIC[semi], steps: d >= 0 ? d : undefined, color: colorOf(semi), ...extra })
}

// The major scale around a root on the 6th (E shape) or 5th string (A shape).
function scaleBox(key, shape) {
  const sc = cagedScale(key, shape, MAJOR, 1)
  return { ...sc, dots: sc.dots.map(d => degDot(key, d.s, d.f, { stretch: d.stretch })) }
}

// ── Drills (also used by the review modules) ───────────────────────────────────

// Theory: "the 5th degree of E♭?" or "in A, which degree is F♯?"
export function degreeInKeyDrill() {
  const nextKey = bag(DRILL_KEYS)
  const nextDeg = bag([1, 2, 3, 4, 5, 6])
  return () => {
    const key = nextKey(), d = nextDeg()
    const note = degreeNote(key, d)
    if (Math.random() < 0.5) {
      return {
        key: `deg-of:${d}`,
        prompt: T(`Qual è il <strong>${d + 1}° grado</strong> di <strong>${pretty(key)}</strong> maggiore?`, `What is the <strong>${ord(d + 1).en} degree</strong> of <strong>${pretty(key)}</strong> major?`),
        review: T(`${d + 1}° di ${pretty(key)} = <strong>${pretty(note)}</strong>`, `${ord(d + 1).en} of ${pretty(key)} = <strong>${pretty(note)}</strong>`),
        options: shuffle(scaleNotes(key)).map(n => ({ label: pretty(n), ok: n === note })),
      }
    }
    return {
      key: `which-deg:${d}`,
      prompt: T(`In <strong>${pretty(key)}</strong> maggiore, che grado è <strong>${pretty(note)}</strong>?`, `In <strong>${pretty(key)}</strong> major, which degree is <strong>${pretty(note)}</strong>?`),
      review: T(`${pretty(note)} in ${pretty(key)} = <strong>${d + 1}</strong>`, `${pretty(note)} in ${pretty(key)} = <strong>${d + 1}</strong>`),
      options: degreeOptions(d + 1),
    }
  }
}

// On the neck: the roots are marked, one scale note lights up: which degree?
export function flashDegreeDrill() {
  const nextDeg = bag([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 0])
  return () => {
    const key = pick(KEY_NAMES), shape = pick(['E', 'A'])
    const box = scaleBox(key, shape)
    const d = nextDeg()
    const target = pick(box.dots.filter(x => x.semi === MAJOR[d]))
    const w = shapeWindow(shape, box.p)
    return {
      key: `flash-deg:${d}`,
      prompt: T('Le fondamentali sono in rosso: che grado è la nota gialla?', 'The roots are red: which degree is the yellow note?'),
      review: T(`grado <strong>${d + 1}</strong> (${DEGREE_NAMES.it[d]})`, `degree <strong>${d + 1}</strong> (${DEGREE_NAMES.en[d]})`),
      diagram: { from: w.from, to: w.to, labels: 'degree',
        dots: [
          ...box.dots.filter(x => x.semi !== 0 && !(x.s === target.s && x.f === target.f)).map(x => ({ ...x, ghost: true, color: '#8a8478' })),
          ...box.dots.filter(x => x.semi === 0 && !(x.s === target.s && x.f === target.f)).map(x => ({ ...x, color: RED, label: '1' })),
          { ...target, color: AMBER, label: '', ring: true },
        ] },
      options: degreeOptions(d + 1),
    }
  }
}

// All twelve degrees around a root.
export function chromaticDegreeDrill() {
  const nextSemi = bag([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 3, 10, 6, 8, 1])
  return () => {
    const key = pick(KEY_NAMES)
    const rootFret = positionsOf(keyPc(key), 2, 13, [5])[0]?.f ?? positionsOf(keyPc(key), 2, 13, [4])[0].f
    const rootString = positionsOf(keyPc(key), 2, 13, [5])[0] ? 5 : 4
    const semi = nextSemi()
    const spots = []
    for (let s = 0; s <= rootString; s++) for (let f = rootFret - 1; f <= rootFret + 3; f++) {
      if (f >= 0 && mod12(pcAt(s, f) - keyPc(key)) === semi) spots.push({ s, f })
    }
    const t = pick(spots)
    const roots = positionsOf(keyPc(key), rootFret - 1, rootFret + 3).filter(p => p.s <= rootString)
    return {
      key: `chrom-deg:${semi}`,
      prompt: T('Che grado è la nota gialla, rispetto alla fondamentale (1) in rosso?', 'Which degree is the yellow note, from the red root (1)?'),
      review: T(`<strong>${DEG_CHROMATIC[semi]}</strong>`, `<strong>${DEG_CHROMATIC[semi]}</strong>`),
      diagram: { from: Math.max(0, rootFret - 2), to: rootFret + 4, labels: 'none',
        dots: [...roots.map(p => ({ ...p, color: RED, label: '1' })), { s: t.s, f: t.f, color: AMBER, label: '', ring: true }] },
      options: chromaticOptions(semi),
    }
  }
}

// By ear: a cadence sets the key, then one note.
export function earDegreeDrill(degrees = [0, 1, 2, 3, 4, 5, 6]) {
  const nextDeg = bag(degrees)
  return () => {
    const k = Math.floor(Math.random() * 12)
    const d = nextDeg()
    return {
      key: `ear-deg:${d}`,
      prompt: T('Ascolta la cadenza, poi la nota: che grado è?', 'Listen to the cadence, then the note: which degree?'),
      review: T(`all'orecchio: <strong>${d + 1}</strong>`, `by ear: <strong>${d + 1}</strong>`),
      sound: { cadence: k, notes: [cadenceTonic(k) + 12 + MAJOR[d]] },
      options: degrees.length === 7 ? degreeOptions(d + 1) : degrees.map(x => ({ label: String(x + 1), ok: x === d })),
      noHotkeys: degrees.length !== 7,
    }
  }
}

// Little melodies in degrees: semitones from the tonic (negative = below it).
const MOTIFS = [
  { label: '1 – 2 – 3', semis: [0, 2, 4] },
  { label: '3 – 2 – 1', semis: [4, 2, 0] },
  { label: '5 – 4 – 3', semis: [7, 5, 4] },
  { label: '1 – 7 – 1', semis: [0, -1, 0] },
  { label: '5 – 6 – 5', semis: [7, 9, 7] },
  { label: '3 – 4 – 5', semis: [4, 5, 7] },
  { label: '1 – 3 – 5', semis: [0, 4, 7] },
  { label: '5 – 3 – 1', semis: [7, 4, 0] },
  { label: '6 – 5 – 3', semis: [9, 7, 4] },
  { label: '2 – 7 – 1', semis: [2, -1, 0] },
  { label: '4 – 3 – 2', semis: [5, 4, 2] },
  { label: '3 – 5 – 1', semis: [4, 7, 12] },
]

function motifQuiz() {
  const nextMotif = bag(MOTIFS.map((_, i) => i))
  return (i, prev) => {
    const m = MOTIFS[nextMotif()]
    const k = Math.floor(Math.random() * 12)
    const tonic = cadenceTonic(k) + 12
    const wrong = shuffle(MOTIFS.filter(x => x !== m)).slice(0, 3)
    return {
      key: `motif:${m.label}`,
      prompt: T('Ascolta la cadenza e la melodia: quali gradi sono?', 'Listen to the cadence and the melody: which degrees are they?'),
      sound: { cadence: k, notes: m.semis.map(x => tonic + x) },
      options: shuffle([m, ...wrong]).map(x => ({ label: x.label, ok: x === m })),
    }
  }
}

// Hear a melody, then play it on the neck from the tonic marked.
function motifOnNeck() {
  const nextMotif = bag(MOTIFS.map((_, i) => i))
  return () => {
    const m = MOTIFS[nextMotif()]
    const s = pick([5, 4])
    const f = 3 + Math.floor(Math.random() * 6)
    const k = pcAt(s, f), root = midiAt(s, f)
    const pitches = m.semis.map(x => root + x)
    const reveal = pitches.map((p, i) => {
      const spots = []
      for (let ss = 0; ss < 6; ss++) { const ff = p - midiAt(ss, 0); if (ff >= 0 && ff <= 15) spots.push({ s: ss, f: ff }) }
      spots.sort((a, b) => Math.abs(a.f - f) - Math.abs(b.f - f) || b.s - a.s)
      return { ...spots[0], color: AMBER, label: m.label.split(' – ')[i] }
    })
    return {
      key: `motif-neck:${m.label}`,
      prompt: T('Ascolta, poi suona la melodia sul manico: la tonica (1) è in rosso', 'Listen, then play the melody on the neck: the tonic (1) is red'),
      hint: T('Riascolta quante volte vuoi; la prima nota non è sempre la tonica. Puoi cliccare o suonare con la chitarra.', 'Listen again as often as you like; the first note is not always the tonic. You can click or play the guitar.'),
      from: Math.max(0, f - 4), to: f + 5, labels: 'degree',
      dots: [{ s, f, color: RED, label: '1' }],
      sequence: m.semis.map((x, i) => ({ midi: root + x, label: m.label.split(' – ')[i] })),
      reveal,
      sound: { cadence: k, notes: pitches },
    }
  }
}

export default {
  id: 'degrees',
  title: T('I gradi della scala', 'Scale degrees'),
  desc: T(
    'Il ruolo di ogni nota nella tonalità: i gradi in tutte le tonalità, dove stanno sul manico attorno alla fondamentale e come riconoscerli a colpo d\'occhio e a orecchio.',
    'The role of each note in the key: the degrees in every key, where they sit on the neck around the root, and how to recognise them at a glance and by ear.'),
  steps: [
    {
      id: 'roles',
      title: T('Sette gradi, sette ruoli', 'Seven degrees, seven roles'),
      blocks: [
        P('La scala maggiore ha sette note. Numerandole dalla tonica ottieni i <strong>gradi</strong>: il grado dice il ruolo di una nota nella tonalità, indipendentemente dal nome. In C, G è il 5° grado; in D lo è A: stesso ruolo, stessa sensazione.',
          'The major scale has seven notes. Numbering them from the tonic gives the <strong>degrees</strong>: the degree tells the role of a note in the key, whatever its name. In C, G is the 5th degree; in D, A is: same role, same feeling.'),
        { type: 'table',
          head: T(['Grado', 'Nome', 'In C', 'Carattere'], ['Degree', 'Name', 'In C', 'Character']),
          rows: T([
            ['1', 'tonica', 'C', 'casa, riposo'],
            ['2', 'sopratonica', 'D', 'sospeso, vuole muoversi'],
            ['3', 'mediante', 'E', 'il colore maggiore, stabile'],
            ['4', 'sottodominante', 'F', 'tensione: scende volentieri al 3'],
            ['5', 'dominante', 'G', 'forte, stabile, aperto'],
            ['6', 'sopradominante', 'A', 'dolce, un po\' malinconico'],
            ['7', 'sensibile', 'B', 'tira verso la tonica, un semitono sopra'],
          ], [
            ['1', 'tonic', 'C', 'home, rest'],
            ['2', 'supertonic', 'D', 'suspended, wants to move'],
            ['3', 'mediant', 'E', 'the major colour, stable'],
            ['4', 'subdominant', 'F', 'tension: likes to fall to 3'],
            ['5', 'dominant', 'G', 'strong, stable, open'],
            ['6', 'submediant', 'A', 'sweet, a little wistful'],
            ['7', 'leading tone', 'B', 'pulls to the tonic, a semitone above'],
          ]) },
        { type: 'diagram', from: 2, to: 15, focus: [4], labels: 'degree', play: 'seq',
          dots: [3, 5, 7, 8, 10, 12, 14, 15].map(f => degDot('C', 4, f)),
          caption: T('C maggiore sulla 5ª corda: tono, tono, semitono, tono, tono, tono, semitono. I semitoni sono tra 3 e 4 e tra 7 e 1.', 'C major on the 5th string: tone, tone, semitone, tone, tone, tone, semitone. The semitones fall between 3 and 4 and between 7 and 1.') },
        { type: 'quiz', title: T('I gradi in C', 'Degrees in C'), need: 6,
          make: (() => {
            const nextDeg = bag([1, 2, 3, 4, 5, 6])
            return () => {
              const d = nextDeg()
              const note = degreeNote('C', d)
              return Math.random() < 0.5
                ? { key: `c-which:${d}`, prompt: T(`In C maggiore, che grado è <strong>${note}</strong>?`, `In C major, which degree is <strong>${note}</strong>?`), options: degreeOptions(d + 1) }
                : { key: `c-of:${d}`, prompt: T(`Qual è il <strong>${d + 1}° grado</strong> di C maggiore?`, `What is the <strong>${ord(d + 1).en} degree</strong> of C major?`),
                  options: scaleNotes('C').map(n => ({ label: n, ok: n === note })) }
            }
          })() },
      ],
    },

    {
      id: 'any-key',
      title: T('I gradi in ogni tonalità', 'Degrees in every key'),
      blocks: [
        P('In ogni tonalità maggiore lo schema è lo stesso (T T S T T T S); cambiano solo i nomi. Regola di scrittura: <strong>una lettera per grado</strong>, con le alterazioni che servono. D maggiore è D E F♯ G A B C♯, non D E G♭…',
          'In every major key the pattern is the same (W W H W W W H); only the names change. Spelling rule: <strong>one letter per degree</strong>, with whatever accidentals it takes. D major is D E F♯ G A B C♯, not D E G♭…'),
        { type: 'table',
          head: T(['Tonalità', '1', '2', '3', '4', '5', '6', '7'], ['Key', '1', '2', '3', '4', '5', '6', '7']),
          rows: T(['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb', 'Ab', 'Db'].map(k => [pretty(k), ...scaleNotes(k).map(pretty)]),
            ['C', 'G', 'D', 'A', 'E', 'F', 'Bb', 'Eb', 'Ab', 'Db'].map(k => [pretty(k), ...scaleNotes(k).map(pretty)])) },
        { type: 'list',
          it: [
            ['Il 4 e il 5', 'sono le due tonalità vicine sul circolo delle quinte: in C, F e G; in E♭, A♭ e B♭.'],
            ['Il 7', 'è un semitono sotto la tonica: in F è E, in E♭ è D, in A è G♯.'],
            ['Il 6', 'è la tonica della relativa minore: C → A, F → D, B♭ → G.'],
            ['Il 2 e il 3', 'sono uno e due toni sopra la tonica: in A, B e C♯.'],
          ],
          en: [
            ['4 and 5', 'are the two neighbouring keys on the circle of fifths: in C, F and G; in E♭, A♭ and B♭.'],
            ['7', 'is a semitone below the tonic: in F it is E, in E♭ it is D, in A it is G♯.'],
            ['6', 'is the tonic of the relative minor: C → A, F → D, B♭ → G.'],
            ['2 and 3', 'are one and two whole tones above the tonic: in A, B and C♯.'],
          ] },
        { type: 'speed', title: T('Gradi nelle tonalità', 'Degrees in the keys'), count: 14, levels: [8, 5, 3.5],
          tip: T('Per i gradi rispondi anche con i tasti 1-7.', 'For degrees you can also answer with keys 1-7.'),
          make: degreeInKeyDrill() },
      ],
    },

    {
      id: 'neck-map',
      title: T('I gradi attorno alla fondamentale', 'The degrees around the root'),
      blocks: [
        P('Sul manico i gradi hanno sempre la stessa posizione rispetto alla fondamentale. Dalla fondamentale sulla 6ª corda: il <strong>2</strong> due tasti avanti; sulla corda dopo il <strong>3</strong> un tasto indietro, il <strong>4</strong> allo stesso tasto, il <strong>5</strong> due tasti avanti; due corde sopra il <strong>6</strong> un tasto indietro, il <strong>7</strong> un tasto avanti, l\'<strong>ottava</strong> due avanti.',
          'On the neck the degrees always sit in the same place relative to the root. From the root on the 6th string: <strong>2</strong> two frets on; on the next string <strong>3</strong> one fret back, <strong>4</strong> on the same fret, <strong>5</strong> two frets on; two strings up <strong>6</strong> one fret back, <strong>7</strong> one fret on, the <strong>octave</strong> two on.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'G', labels: 'degree', play: 'updown',
          build: key => {
            const box = scaleBox(key, 'E')
            return { ...shapeWindow('E', box.p), dots: box.dots, caption: T(`${pretty(key)} maggiore attorno alla fondamentale sulla 6ª corda (forma di E).`, `${pretty(key)} major around the root on the 6th string (E shape).`) }
          } },
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'C', labels: 'degree', play: 'updown',
          build: key => {
            const box = scaleBox(key, 'A')
            return { ...shapeWindow('A', box.p), dots: box.dots, caption: T(`${pretty(key)} maggiore attorno alla fondamentale sulla 5ª corda (forma di A).`, `${pretty(key)} major around the root on the 5th string (A shape).`) }
          } },
        { type: 'find', title: T('Trova il grado', 'Find the degree'), rounds: 7,
          make: (() => {
            const nextDeg = bag([1, 2, 3, 4, 5, 6])
            return () => {
              const d = nextDeg(), key = pick(KEY_NAMES), shape = pick(['E', 'A'])
              const box = scaleBox(key, shape)
              const w = shapeWindow(shape, box.p)
              return {
                key: `map:${d}`,
                prompt: T(`${pretty(key)} maggiore: clicca tutti i <strong>${d + 1}</strong> (${DEGREE_NAMES.it[d]}) nella zona`, `${pretty(key)} major: click every <strong>${d + 1}</strong> (${DEGREE_NAMES.en[d]}) in the area`),
                from: w.from, to: w.to, labels: 'degree',
                boxes: [{ from: box.lo, to: box.hi, label: shape }],
                dots: box.dots.filter(x => x.semi === 0).map(x => ({ ...x, color: RED })),
                targets: box.dots.filter(x => x.semi === MAJOR[d]),
              }
            }
          })() },
      ],
    },

    {
      id: 'flash',
      title: T('Gradi lampo', 'Flash degrees'),
      blocks: [
        P('Il gioco che allena a "vedere" i gradi: le fondamentali sono segnate, una nota si accende e tu dici il grado. All\'inizio ragionerai sulla forma (corda vicina, un tasto indietro: 3); a forza di ripetere, la risposta arriva prima del ragionamento. È lì che la conoscenza diventa inconscia.',
          'The game that trains you to "see" degrees: the roots are marked, a note lights up and you name the degree. At first you will reason about the shape (next string, one fret back: 3); with repetition the answer comes before the reasoning. That is when the knowledge becomes unconscious.'),
        { type: 'speed', title: T('Che grado è?', 'Which degree?'), count: 16, levels: [4, 2.5, 1.6], make: flashDegreeDrill() },
      ],
    },

    {
      id: 'altered',
      title: T('I gradi alterati', 'Altered degrees'),
      blocks: [
        P('Le cinque note fuori dalla scala maggiore hanno anche loro un grado: <strong>b2, b3, #4/b5, b6, b7</strong>. Sono quelle che fanno i colori di modi e accordi: il minore ha b3, b6 e b7; il dorico b3 e b7; il misolidio b7; il lidio #4. Nel jazz, sopra un accordo, b2 e b6 si chiamano spesso b9 e b13.',
          'The five notes outside the major scale have a degree too: <strong>b2, b3, #4/b5, b6, b7</strong>. They make the colours of modes and chords: minor has b3, b6 and b7; dorian b3 and b7; mixolydian b7; lydian #4. In jazz, over a chord, b2 and b6 are often called b9 and b13.'),
        { type: 'table',
          head: T(['Scala', 'Gradi'], ['Scale', 'Degrees']),
          rows: T([
            ['Maggiore (ionica)', '1 2 3 4 5 6 7'],
            ['Dorica', '1 2 b3 4 5 6 b7'],
            ['Frigia', '1 b2 b3 4 5 b6 b7'],
            ['Lidia', '1 2 3 #4 5 6 7'],
            ['Misolidia', '1 2 3 4 5 6 b7'],
            ['Minore naturale (eolia)', '1 2 b3 4 5 b6 b7'],
            ['Locria', '1 b2 b3 4 b5 b6 b7'],
          ], [
            ['Major (ionian)', '1 2 3 4 5 6 7'],
            ['Dorian', '1 2 b3 4 5 6 b7'],
            ['Phrygian', '1 b2 b3 4 5 b6 b7'],
            ['Lydian', '1 2 3 #4 5 6 7'],
            ['Mixolydian', '1 2 3 4 5 6 b7'],
            ['Natural minor (aeolian)', '1 2 b3 4 5 b6 b7'],
            ['Locrian', '1 b2 b3 4 b5 b6 b7'],
          ]) },
        P('Sul manico ogni grado alterato è il vicino di un grado che già conosci: la b3 un tasto sotto la 3, la b7 un tasto sotto la 7, la #4 un tasto sopra la 4.',
          'On the neck each altered degree is the neighbour of a degree you already know: b3 one fret below 3, b7 one fret below 7, #4 one fret above 4.'),
        { type: 'speed', title: T('Tutti i dodici gradi', 'All twelve degrees'), count: 16, levels: [5, 3.2, 2], make: chromaticDegreeDrill() },
      ],
    },

    {
      id: 'ear',
      title: T('Sentire i gradi', 'Hearing the degrees'),
      blocks: [
        P('Ora con l\'orecchio. Una cadenza (I-IV-V-I) fissa la tonalità, poi suona una nota: di che grado si tratta? È l\'allenamento più utile per suonare a orecchio e improvvisare, perché collega il suono al ruolo, non al nome.',
          'Now by ear. A cadence (I-IV-V-I) sets the key, then one note sounds: which degree is it? It is the most useful training for playing by ear and improvising, because it links the sound to the role, not to the name.'),
        { type: 'list',
          it: [
            ['Canta e scendi:', 'canta la nota e scendi per gradi fino alla tonica; contare i passi ti dice il grado.'],
            ['Associazioni:', '1 = casa, 3 = il colore maggiore, 5 = squillo aperto, 7 = vuole salire a 1, 4 = vuole cadere sul 3, 2 = sospeso, 6 = dolce.'],
            ['Un passo alla volta:', 'prima solo 1, 3 e 5 (le note stabili), poi tutti e sette.'],
          ],
          en: [
            ['Sing and walk down:', 'sing the note and walk down by step to the tonic; counting the steps tells you the degree.'],
            ['Associations:', '1 = home, 3 = the major colour, 5 = open ring, 7 = wants to rise to 1, 4 = wants to fall to 3, 2 = suspended, 6 = sweet.'],
            ['One step at a time:', 'first only 1, 3 and 5 (the stable notes), then all seven.'],
          ] },
        { type: 'quiz', title: T('1, 3 o 5?', '1, 3 or 5?'), need: 6, make: earDegreeDrill([0, 2, 4]) },
        { type: 'speed', title: T('Tutti e sette a orecchio', 'All seven by ear'), count: 12, levels: [5, 3, 2], make: earDegreeDrill(),
          tip: T('Il tempo parte quando la nota ha suonato.', 'The timer starts once the note has sounded.') },
      ],
    },

    {
      id: 'melodies',
      title: T('Piccole melodie in gradi', 'Little melodies in degrees'),
      blocks: [
        P('Le melodie sono gradi in fila. Dopo la cadenza ascolta tre note e riconosci i gradi; poi suonale sul manico partendo dalla tonica segnata. È il ponte tra orecchio e mani: quello che senti, lo trovi.',
          'Melodies are degrees in a row. After the cadence listen to three notes and recognise the degrees; then play them on the neck from the tonic marked. It is the bridge between ear and hands: what you hear, you find.'),
        { type: 'quiz', title: T('Che melodia è?', 'Which melody is it?'), need: 5, make: motifQuiz() },
        { type: 'find', title: T('Suonala sul manico', 'Play it on the neck'), rounds: 4, make: motifOnNeck() },
        { type: 'practice', to: '/ear-playback', it: 'Continua con: Ripeti a orecchio', en: 'Go on with: Play It Back' },
      ],
    },

    {
      id: 'review',
      title: T('Ripasso dei gradi', 'Degree review'),
      blocks: [
        P('Teoria, manico e orecchio mescolati: è la prova che i gradi sono diventati un modo di pensare.',
          'Theory, neck and ear mixed: the proof that degrees have become a way of thinking.'),
        { type: 'speed', title: T('Gradi, tutto mescolato', 'Degrees, all mixed'), count: 18, levels: [6, 4, 2.5],
          make: (() => { const a = degreeInKeyDrill(), b = flashDegreeDrill(), c = earDegreeDrill(); const n = bag([0, 1, 2]); return i => [a, b, c][n()](i) })() },
        { type: 'practice', to: '/grade-learner', it: 'Continua con: Trova il grado', en: 'Go on with: Scale Degrees' },
        { type: 'practice', to: '/interval-ear-training', it: 'Allena l\'orecchio: Intervalli a orecchio', en: 'Train your ear: Interval ear training' },
      ],
    },
  ],
}
