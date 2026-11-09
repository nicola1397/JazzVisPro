// Module 2 — Intervals on the neck: the shapes of the distances between notes.

import { pcAt, midiAt, mod12, keyDot, colorOf, pick, pickNew, shuffle, bag, KEY_NAMES, OPEN_MIDI, keyPc, positionsOf, pretty } from '../theory.js'
import { T, intervalName, INTERVAL_NAMES, strIt, strEn, RED, DEG12 } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })

// A dot `semi` semitones above a root dot, coloured and labelled with the degree.
function ivDot(s, f, semi, extra = {}) {
  return { s, f, semi, deg: DEG12[semi], color: colorOf(semi), ...extra }
}
const rootDot = (s, f, extra = {}) => ({ s, f, semi: 0, deg: 'R', label: 'R', color: RED, ...extra })

// Fret on string `s2` for the note `semi` semitones above string s, fret f.
const fretFor = (s, f, s2, semi) => midiAt(s, f) + semi - OPEN_MIDI[s2]

// Multiple-choice options: the right interval plus three others.
function intervalOptions(semi, pool) {
  const others = shuffle(pool.filter(x => x !== semi)).slice(0, 3)
  return shuffle([semi, ...others]).map(x => ({ label: intervalName(x), ok: x === semi }))
}

// Find an interval above a given root on another string.
function intervalTask(fromStrings, offset, semis) {
  const nextSemi = bag(semis)
  return (i, prev) => {
    const semi = nextSemi()
    for (let tries = 0; tries < 50; tries++) {
      const s = pick(fromStrings)
      const s2 = s - offset
      const f = 1 + Math.floor(Math.random() * 9)
      const f2 = fretFor(s, f, s2, semi)
      if (f2 < 0 || f2 > 12) continue
      return {
        semi, key: `iv:${offset}:${semi}`,
        prompt: T(
          `Dalla fondamentale sulla ${strIt(s)} trova la <strong>${INTERVAL_NAMES.it[semi]}</strong> sulla ${strIt(s2)}`,
          `From the root on the ${strEn(s)} find the <strong>${INTERVAL_NAMES.en[semi]}</strong> on the ${strEn(s2)}`),
        from: 0, to: 13, focus: [s, s2], labels: 'degree',
        dots: [rootDot(s, f)],
        targets: [ivDot(s2, f2, semi)],
        mode: 'one',
      }
    }
  }
}

// Two notes on the neck, name the interval: the twelve intervals in a fixed order.
const SPEED_LABELS = ['b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7', '8']
export function intervalSpeedDrill() {
  const nextSemi = bag([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 4, 7, 10, 11])
  return () => {
    const semi = nextSemi()
    for (let tries = 0; tries < 80; tries++) {
      const s = pick([5, 4, 3, 2, 1])
      const s2 = s - pick([0, 1, 2].filter(o => s - o >= 0))
      const f = 1 + Math.floor(Math.random() * 10)
      const f2 = fretFor(s, f, s2, semi)
      if (f2 < 0 || f2 > 15) continue
      return {
        key: `iv-speed:${semi}`,
        prompt: T('Che intervallo c\'è sopra la fondamentale (R)?', 'What interval is there above the root (R)?'),
        review: T(`<strong>${SPEED_LABELS[semi - 1]}</strong> (${INTERVAL_NAMES.it[semi]})`, `<strong>${SPEED_LABELS[semi - 1]}</strong> (${INTERVAL_NAMES.en[semi]})`),
        diagram: { from: Math.max(0, Math.min(f, f2) - 2), to: Math.min(17, Math.max(f, f2) + 2), focus: [s, s2], labels: 'none',
          dots: [rootDot(s, f), { ...ivDot(s2, f2, semi), color: '#FFD60A', label: '' }] },
        options: SPEED_LABELS.map((label, i) => ({ label, ok: i + 1 === semi })),
        noHotkeys: true,
      }
    }
  }
}

export default {
  id: 'intervals',
  title: T('Gli intervalli sul manico', 'Intervals on the neck'),
  desc: T(
    'Ogni distanza tra due note ha una forma fissa sul manico: sulla stessa corda, sulla corda vicina, due corde sopra.',
    'Every distance between two notes has a fixed shape on the neck: on the same string, on the next string, two strings up.'),
  steps: [
    {
      id: 'why',
      title: T('Distanze, non nomi', 'Distances, not names'),
      blocks: [
        P('Un <strong>intervallo</strong> è la distanza tra due note, contata in semitoni (cioè in tasti). Sulla chitarra ogni intervallo ha una <strong>forma</strong>: un rapporto geometrico fisso che puoi spostare ovunque. La stessa forma dà lo stesso intervallo in tutte le tonalità: per questo i chitarristi pensano per forme.',
          'An <strong>interval</strong> is the distance between two notes, counted in semitones (that is, in frets). On the guitar every interval has a <strong>shape</strong>: a fixed geometric relationship you can move anywhere. The same shape gives the same interval in every key: that is why guitarists think in shapes.'),
        { type: 'table',
          head: T(['Semitoni', 'Intervallo', 'Grado', 'Suono'], ['Semitones', 'Interval', 'Degree', 'Sound']),
          rows: T([
            ['0', 'unisono', 'R', 'la stessa nota'],
            ['1', 'seconda minore', 'b2', 'tesa, cromatica'],
            ['2', 'seconda maggiore', '2', 'un passo di scala'],
            ['3', 'terza minore', 'b3', 'accordo minore'],
            ['4', 'terza maggiore', '3', 'accordo maggiore'],
            ['5', 'quarta giusta', '4', 'aperta, sospesa'],
            ['6', 'tritono', 'b5 / #4', 'instabile, dominante'],
            ['7', 'quinta giusta', '5', 'stabile, vuota'],
            ['8', 'sesta minore', 'b6', 'scura'],
            ['9', 'sesta maggiore', '6', 'dolce'],
            ['10', 'settima minore', 'b7', 'accordi m7 e 7'],
            ['11', 'settima maggiore', '7', 'accordo maj7'],
            ['12', 'ottava', 'R', 'la stessa nota, più acuta'],
          ], [
            ['0', 'unison', 'R', 'the same note'],
            ['1', 'minor second', 'b2', 'tense, chromatic'],
            ['2', 'major second', '2', 'a scale step'],
            ['3', 'minor third', 'b3', 'minor chord'],
            ['4', 'major third', '3', 'major chord'],
            ['5', 'perfect fourth', '4', 'open, suspended'],
            ['6', 'tritone', 'b5 / #4', 'unstable, dominant'],
            ['7', 'perfect fifth', '5', 'stable, hollow'],
            ['8', 'minor sixth', 'b6', 'dark'],
            ['9', 'major sixth', '6', 'sweet'],
            ['10', 'minor seventh', 'b7', 'm7 and 7 chords'],
            ['11', 'major seventh', '7', 'maj7 chord'],
            ['12', 'octave', 'R', 'the same note, higher'],
          ]) },
        P('I colori sono quelli dell\'Explorer: rosso la fondamentale (R), arancio la terza, grigio la quinta, verde la settima. Nei prossimi passi i pallini mostrano il <strong>grado</strong>, non il nome della nota: è il modo di pensare che serve per improvvisare.',
          'The colours are the Explorer ones: red for the root (R), orange for the third, grey for the fifth, green for the seventh. In the next steps the dots show the <strong>degree</strong>, not the note name: it is the way of thinking you need to improvise.'),
      ],
    },

    {
      id: 'same-string',
      title: T('Sulla stessa corda: il righello', 'On one string: the ruler'),
      blocks: [
        P('Su una sola corda l\'intervallo è il numero di tasti: 1 = b2, 2 = 2, 3 = b3, 4 = 3, 5 = 4, 7 = 5, 12 = ottava. È il modo più lento di suonare, ma il più chiaro: è il righello degli intervalli.',
          'On a single string the interval is the number of frets: 1 = b2, 2 = 2, 3 = b3, 4 = 3, 5 = 4, 7 = 5, 12 = octave. It is the slowest way to play, but the clearest: it is the ruler of intervals.'),
        { type: 'diagram', from: 3, to: 17, focus: [5], labels: 'degree', play: 'seq',
          dots: Array.from({ length: 13 }, (_, k) => keyDot('A', 5, 5 + k, { color: colorOf(k), deg: DEG12[k] })),
          caption: T('Da A (6ª corda, 5° tasto) all\'ottava (17° tasto): tutti i dodici intervalli in fila.', 'From A (6th string, 5th fret) to the octave (17th fret): all twelve intervals in a row.') },
        { type: 'quiz', title: T('Quanti tasti?', 'How many frets?'), need: 6,
          make: (i, prev) => {
            const semi = pickNew([1, 2, 3, 4, 5, 7, 12], prev?.semi)
            const s = pick([5, 4, 3])
            const f = 1 + Math.floor(Math.random() * (14 - semi))
            return {
              semi, key: `same:${semi}`,
              prompt: T('Che intervallo c\'è tra la fondamentale (R) e l\'altra nota?', 'What interval is there between the root (R) and the other note?'),
              diagram: { from: Math.max(0, f - 1), to: Math.min(17, f + semi + 1), focus: [s], labels: 'none', labelsAfter: 'degree', play: 'seq',
                dots: [rootDot(s, f), ivDot(s, f + semi, semi)] },
              options: intervalOptions(semi, [1, 2, 3, 4, 5, 7, 12]),
            }
          } },
      ],
    },

    {
      id: 'next-string',
      title: T('Sulla corda vicina: quarte, quinte e terze', 'On the next string: fourths, fifths and thirds'),
      blocks: [
        P('Passare alla corda vicina (più acuta) aggiunge 5 semitoni, una quarta. Quindi, da una fondamentale: <strong>stesso tasto</strong> = 4, <strong>due tasti avanti</strong> = 5, <strong>un tasto indietro</strong> = 3, <strong>due tasti indietro</strong> = b3, <strong>un tasto avanti</strong> = tritono.',
          'Moving to the next (higher) string adds 5 semitones, a fourth. So, from a root: <strong>same fret</strong> = 4, <strong>two frets on</strong> = 5, <strong>one fret back</strong> = 3, <strong>two frets back</strong> = b3, <strong>one fret on</strong> = tritone.'),
        { type: 'diagram', from: 4, to: 12, focus: [5, 4], labels: 'degree',
          dots: [rootDot(5, 8), ...[3, 4, 5, 6, 7].map(semi => ivDot(4, fretFor(5, 8, 4, semi), semi))],
          caption: T('Fondamentale C sulla 6ª corda (8° tasto): b3, 3, 4, b5 e 5 sulla 5ª corda, tutti a portata di mano.', 'Root C on the 6th string (8th fret): b3, 3, 4, b5 and 5 on the 5th string, all within reach.') },
        { type: 'tip', label: T('Attraverso la corda di B:', 'Across the B string:'),
          it: 'dalla 3ª corda (G) alla 2ª (B) ci sono solo 4 semitoni: tutto si sposta di un tasto in avanti. Dalla 3ª corda: stesso tasto = 3, un tasto avanti = 4, tre tasti avanti = 5.',
          en: 'from the 3rd string (G) to the 2nd (B) there are only 4 semitones: everything moves one fret forward. From the 3rd string: same fret = 3, one fret on = 4, three frets on = 5.' },
        { type: 'diagram', from: 2, to: 10, focus: [2, 1], labels: 'degree',
          dots: [rootDot(2, 5), ...[3, 4, 5, 7].map(semi => ivDot(1, fretFor(2, 5, 1, semi), semi))],
          caption: T('Fondamentale C sulla 3ª corda (5° tasto): sulla 2ª corda le stesse note stanno un tasto più avanti.', 'Root C on the 3rd string (5th fret): on the 2nd string the same notes sit one fret further on.') },
        { type: 'find', title: T('Corda vicina', 'Next string'), rounds: 8, make: intervalTask([5, 4, 3, 2], 1, [3, 4, 5, 7]) },
      ],
    },

    {
      id: 'two-strings',
      title: T('Due corde sopra: seste, settime e ottava', 'Two strings up: sixths, sevenths and octave'),
      blocks: [
        P('Due corde sopra (dalla 6ª alla 4ª, dalla 5ª alla 3ª) si aggiungono 10 semitoni: <strong>stesso tasto</strong> = b7, <strong>un tasto avanti</strong> = 7, <strong>due avanti</strong> = ottava, <strong>uno indietro</strong> = 6, <strong>due indietro</strong> = b6. Sono le forme delle settime negli accordi: m7 e 7 da una parte, maj7 dall\'altra.',
          'Two strings up (6th to 4th, 5th to 3rd) adds 10 semitones: <strong>same fret</strong> = b7, <strong>one fret on</strong> = 7, <strong>two on</strong> = octave, <strong>one back</strong> = 6, <strong>two back</strong> = b6. These are the shapes of the sevenths in chords: m7 and 7 on one side, maj7 on the other.'),
        { type: 'diagram', from: 0, to: 7, focus: [4, 2], labels: 'degree',
          dots: [rootDot(4, 3), ...[8, 9, 10, 11, 12].map(semi => ivDot(2, fretFor(4, 3, 2, semi), semi))],
          caption: T('Fondamentale C sulla 5ª corda (3° tasto): b6, 6, b7, 7 e ottava sulla 3ª corda.', 'Root C on the 5th string (3rd fret): b6, 6, b7, 7 and octave on the 3rd string.') },
        { type: 'tip', label: T('Attraverso la corda di B:', 'Across the B string:'),
          it: 'dalla 4ª alla 2ª corda e dalla 3ª alla 1ª aggiungi un tasto: b7 = un tasto avanti, 7 = due avanti, ottava = tre avanti.',
          en: 'from the 4th to the 2nd string and from the 3rd to the 1st add one fret: b7 = one fret on, 7 = two on, octave = three on.' },
        { type: 'find', title: T('Due corde sopra', 'Two strings up'), rounds: 8, make: intervalTask([5, 4, 3], 2, [9, 10, 11, 12]) },
      ],
    },

    {
      id: 'map',
      title: T('La mappa attorno alla fondamentale', 'The map around the root'),
      blocks: [
        P('Metti insieme le forme: attorno a ogni fondamentale, in una zona di quattro o cinque tasti, c\'è una mappa completa degli intervalli. Imparare a vedere la funzione di ogni tasto attorno alla fondamentale è la base di arpeggi, scale e improvvisazione.',
          'Put the shapes together: around every root, in an area of four or five frets, there is a complete map of the intervals. Learning to see the function of every fret around the root is the basis of arpeggios, scales and improvisation.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'G', labels: 'degree',
          build: key => {
            const p = positionsOf(keyPc(key), 1, 12, [5])[0].f
            const dots = []
            for (let s = 0; s < 6; s++) for (let f = p - 1; f <= p + 3; f++) {
              const semi = mod12(pcAt(s, f) - keyPc(key))
              dots.push(keyDot(key, s, f, { color: colorOf(semi) }))
            }
            return { from: Math.max(0, p - 2), to: p + 4, dots,
              caption: T(`Tutti gli intervalli attorno a ${pretty(key)} (6ª corda, ${p}° tasto).`, `Every interval around ${pretty(key)} (6th string, fret ${p}).`) }
          } },
        P('Non serve memorizzarla tutta in una volta. Parti dalle note dell\'accordo (R, 3 o b3, 5, 7 o b7): sono quelle che userai di più. Le altre sono le note "di passaggio" tra un\'una e l\'altra.',
          'There is no need to memorise it all at once. Start from the chord tones (R, 3 or b3, 5, 7 or b7): they are the ones you will use the most. The others are the "passing" notes between them.'),
        { type: 'find', title: T('Trova l\'intervallo nella zona', 'Find the interval in the area'), rounds: 8,
          make: (i, prev) => {
            const semi = pickNew([3, 4, 7, 10, 11, 2, 5, 9], prev?.semi)
            const key = pick(KEY_NAMES)
            const p = positionsOf(keyPc(key), 1, 12, [5])[0].f
            const targets = []
            for (let s = 0; s < 6; s++) for (let f = p - 1; f <= p + 3; f++) {
              if (mod12(pcAt(s, f) - keyPc(key)) === semi) targets.push(ivDot(s, f, semi))
            }
            const roots = positionsOf(keyPc(key), p - 1, p + 3).map(({ s, f }) => rootDot(s, f))
            return {
              semi, key: `map:${semi}`,
              prompt: T(`Trova una <strong>${INTERVAL_NAMES.it[semi]}</strong> (${DEG12[semi]}) nella zona evidenziata`, `Find a <strong>${INTERVAL_NAMES.en[semi]}</strong> (${DEG12[semi]}) in the highlighted area`),
              hint: T('Le fondamentali sono in rosso: parti da una di loro.', 'The roots are red: start from one of them.'),
              from: Math.max(0, p - 2), to: p + 4, labels: 'degree',
              boxes: [{ from: p - 1, to: p + 3, label: '' }],
              dots: roots, targets, mode: 'one',
            }
          } },
      ],
    },

    {
      id: 'recognize',
      title: T('Riconosci l\'intervallo', 'Recognise the interval'),
      blocks: [
        P('Ultimo passo: il contrario. Vedi due note sul manico e dai un nome alla distanza. Guarda la forma (stessa corda, corda vicina, due corde sopra) e ricordati del passaggio G → B.',
          'Last step: the other way round. You see two notes on the neck and name the distance. Look at the shape (same string, next string, two strings up) and remember the G → B crossing.'),
        { type: 'quiz', title: T('Che intervallo è?', 'Which interval is it?'), need: 8,
          make: (i, prev) => {
            const pool = [3, 4, 5, 7, 9, 10, 11, 12]
            for (let tries = 0; tries < 50; tries++) {
              const semi = pickNew(pool, prev?.semi)
              const s = pick([5, 4, 3, 2])
              const s2 = s - pick([1, 2].filter(o => s - o >= 0))
              const f = 1 + Math.floor(Math.random() * 10)
              const f2 = fretFor(s, f, s2, semi)
              if (f2 < 0 || f2 > 14) continue
              return {
                semi, key: `rec:${semi}`,
                prompt: T('Che intervallo c\'è sopra la fondamentale (R)?', 'What interval is there above the root (R)?'),
                diagram: { from: Math.max(0, Math.min(f, f2) - 2), to: Math.min(17, Math.max(f, f2) + 2), focus: [s, s2], labels: 'none', labelsAfter: 'degree', play: 'seq',
                  dots: [rootDot(s, f), ivDot(s2, f2, semi)] },
                options: intervalOptions(semi, pool),
              }
            }
          } },
      ],
    },

    {
      id: 'speed',
      title: T('Intervalli lampo', 'Flash intervals'),
      blocks: [
        P('Ora a tempo, con tutti gli intervalli dalla seconda minore all\'ottava, sulla stessa corda, sulla corda vicina e due corde sopra. L\'obiettivo è riconoscere la forma prima di contare i tasti.',
          'Now against the clock, with every interval from the minor second to the octave, on the same string, the next string and two strings up. The goal is to recognise the shape before counting frets.'),
        { type: 'speed', title: T('Che intervallo è?', 'Which interval is it?'), count: 15, levels: [5, 3, 2], make: intervalSpeedDrill() },
        { type: 'practice', to: '/interval-learner', it: 'Continua con: Interval Learner', en: 'Go on with: Interval Learner' },
        { type: 'practice', to: '/interval-ear-training', it: 'Allena l\'orecchio: Intervalli a orecchio', en: 'Train your ear: Interval ear training' },
      ],
    },
  ],
}
