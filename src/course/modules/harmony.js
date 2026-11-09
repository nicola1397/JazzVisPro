// Module — The chords of the scale: harmonising the major scale, Roman numerals,
// functions, the ii-V-I in every key, on the neck and by ear.

import { pcAt, midiAt, mod12, keyPc, keyDot, colorOf, pretty, pick, bag, shuffle, triadsOnStrings, positionsOf, KEY_NAMES } from '../theory.js'
import { T, RED, AMBER, MAJOR, degreeNote, scaleNotes, DRILL_KEYS, DIATONIC, diatonicChord, FOURTHS, choices, coloured } from '../build.js'
import { cadenceTonic } from '../sound.js'

const P = (it, en) => ({ type: 'p', it, en })
const FN = {
  T: T('tonica', 'tonic'),
  S: T('sottodominante', 'subdominant'),
  D: T('dominante', 'dominant'),
}
const QUALITY = {
  major: T('maggiore', 'major'),
  minor: T('minore', 'minor'),
  dim: T('diminuito', 'diminished'),
}
const p = name => pretty(name)

// ── Drills ─────────────────────────────────────────────────────────────────────

// "In F, the ii?" → Gm7, or "In B♭, Cm7 is the…?" → ii
export function diatonicDrill() {
  const nextKey = bag(DRILL_KEYS)
  const nextDeg = bag([0, 1, 2, 3, 4, 5, 6, 1, 4])
  return () => {
    const key = nextKey(), d = nextDeg()
    const chord = diatonicChord(key, d)
    if (Math.random() < 0.5) {
      const root = degreeNote(key, d)
      const wrong = ['maj7', 'm7', '7', 'm7b5'].filter(q => q !== DIATONIC.seventh[d]).map(q => root + q)
      const nearby = [diatonicChord(key, (d + 1) % 7), diatonicChord(key, (d + 6) % 7)]
      return {
        key: `chord-of:${d}`,
        prompt: T(`In <strong>${p(key)}</strong> maggiore, qual è l'accordo <strong>${DIATONIC.roman7[d]}</strong>?`, `In <strong>${p(key)}</strong> major, which chord is the <strong>${DIATONIC.roman7[d]}</strong>?`),
        review: T(`${DIATONIC.roman7[d]} in ${p(key)} = <strong>${p(chord)}</strong>`, `${DIATONIC.roman7[d]} in ${p(key)} = <strong>${p(chord)}</strong>`),
        options: choices(chord, [...wrong, ...nearby]).map(o => ({ ...o, label: p(o.label) })),
      }
    }
    return {
      key: `roman-of:${d}`,
      prompt: T(`In <strong>${p(key)}</strong> maggiore, <strong>${p(chord)}</strong> è il…`, `In <strong>${p(key)}</strong> major, <strong>${p(chord)}</strong> is the…`),
      review: T(`${p(chord)} in ${p(key)} = <strong>${DIATONIC.roman7[d]}</strong>`, `${p(chord)} in ${p(key)} = <strong>${DIATONIC.roman7[d]}</strong>`),
      options: DIATONIC.roman7.map((r, i) => ({ label: r, ok: i === d })),
    }
  }
}

// "The function of the vi?" → tonic
export function functionDrill() {
  const nextDeg = bag([0, 1, 2, 3, 4, 5, 6])
  return () => {
    const d = nextDeg()
    return {
      key: `function:${d}`,
      prompt: T(`Che funzione ha il <strong>${DIATONIC.roman[d]}</strong>?`, `What is the function of the <strong>${DIATONIC.roman[d]}</strong>?`),
      review: T(`${DIATONIC.roman[d]} = <strong>${FN[DIATONIC.fn[d]].it}</strong>`, `${DIATONIC.roman[d]} = <strong>${FN[DIATONIC.fn[d]].en}</strong>`),
      options: ['T', 'S', 'D'].map(f => ({ label: FN[f], ok: f === DIATONIC.fn[d] })),
    }
  }
}

const iiVI = key => [1, 4, 0].map(d => diatonicChord(key, d))
const iiVIText = key => iiVI(key).map(p).join(' – ')

// ii-V-I in every key, both directions.
export function iiVIDrill() {
  const nextKey = bag([...DRILL_KEYS, 'Gb'])
  return () => {
    const key = nextKey()
    const others = shuffle(KEY_NAMES.filter(k => k !== key && k !== 'F#')).slice(0, 3)
    const kind = Math.floor(Math.random() * 3)
    if (kind === 0) {
      return {
        key: `iivi-of:${key}`,
        prompt: T(`Qual è il II-V-I di <strong>${p(key)}</strong> maggiore?`, `What is the ii-V-I of <strong>${p(key)}</strong> major?`),
        review: T(`${p(key)}: <strong>${iiVIText(key)}</strong>`, `${p(key)}: <strong>${iiVIText(key)}</strong>`),
        options: shuffle([key, ...others]).map(k => ({ label: iiVIText(k), ok: k === key })),
        noHotkeys: false,
      }
    }
    if (kind === 1) {
      const [ii, V, I] = iiVI(key)
      return {
        key: `iivi-to:${key}`,
        prompt: T(`<strong>${p(ii)} – ${p(V)} – ?</strong>`, `<strong>${p(ii)} – ${p(V)} – ?</strong>`),
        review: T(`${p(ii)} – ${p(V)} – <strong>${p(I)}</strong>`, `${p(ii)} – ${p(V)} – <strong>${p(I)}</strong>`),
        options: shuffle([key, ...others]).map(k => ({ label: p(diatonicChord(k, 0)), ok: k === key })),
      }
    }
    return {
      key: `iivi-key:${key}`,
      prompt: T(`Di che tonalità è il II-V-I <strong>${iiVIText(key)}</strong>?`, `Which key is the ii-V-I <strong>${iiVIText(key)}</strong> in?`),
      review: T(`${iiVIText(key)} → <strong>${p(key)}</strong>`, `${iiVIText(key)} → <strong>${p(key)}</strong>`),
      options: shuffle([key, ...others]).map(k => ({ label: p(k), ok: k === key })),
    }
  }
}

// By ear: cadence, then a diatonic triad.
export function earChordDrill() {
  const nextDeg = bag([0, 1, 2, 3, 4, 5, 1, 3, 4, 5])
  return () => {
    const k = Math.floor(Math.random() * 12), d = nextDeg()
    const tonic = cadenceTonic(k)
    const root = tonic + MAJOR[d]
    const third = DIATONIC.quality[d] === 'major' ? 4 : 3
    const chord = [root - 12, root, root + third, root + 7]
    return {
      key: `ear-chord:${d}`,
      prompt: T('Ascolta la cadenza, poi l\'accordo: che grado è?', 'Listen to the cadence, then the chord: which degree is it?'),
      review: T(`all'orecchio: <strong>${DIATONIC.roman[d]}</strong>`, `by ear: <strong>${DIATONIC.roman[d]}</strong>`),
      sound: { cadence: k, chord },
      options: DIATONIC.roman.slice(0, 6).map((r, i) => ({ label: r, ok: i === d })),
    }
  }
}

// The diatonic triads of a key on strings 1-2-3, root position, going up the neck.
function triadFrames(key) {
  return DIATONIC.roman.map((roman, d) => {
    const root = degreeNote(key, d)
    const v = triadsOnStrings(root, DIATONIC.quality[d], [0, 1, 2], 0, 17)
      .filter(x => x.inversion === 0 && Math.max(...x.frets) <= 17)[0]
    const notes = v ? v.dots.map(x => p(x.note)).join(' ') : ''
    return {
      tab: roman,
      caption: T(`<strong>${roman} · ${p(root + DIATONIC.triad[d])}</strong> (${QUALITY[DIATONIC.quality[d]].it}): ${notes}.`, `<strong>${roman} · ${p(root + DIATONIC.triad[d])}</strong> (${QUALITY[DIATONIC.quality[d]].en}): ${notes}.`),
      diagram: { from: 0, to: 17, labels: 'degree', play: 'chord', focus: [0, 1, 2], dots: v ? coloured(v.dots) : [] },
    }
  })
}

// Roots of ii, V and I on the 5th and 6th strings, in order.
function iiVIRootsTask() {
  const nextKey = bag(KEY_NAMES)
  return () => {
    const key = nextKey()
    const [ii, V, I] = [1, 4, 0].map(d => keyPc(key) + MAJOR[d])
    // Shown afterwards: ii on the 5th string, V on the 6th two frets lower, I back on the 5th.
    let f = positionsOf(ii, 2, 13, [4])[0].f
    const reveal = [
      { s: 4, f, label: 'ii' }, { s: 5, f: f - 2, label: 'V' }, { s: 4, f: f - 2, label: 'I' },
    ].filter(x => x.f >= 0).map(x => ({ ...x, color: AMBER, ghost: false }))
    return {
      key: `roots:${key}`,
      prompt: T(`II-V-I in <strong>${p(key)}</strong>: clicca in ordine le fondamentali di <strong>${p(diatonicChord(key, 1))}</strong>, <strong>${p(diatonicChord(key, 4))}</strong> e <strong>${p(diatonicChord(key, 0))}</strong> sulla 6ª o 5ª corda`,
        `ii-V-I in <strong>${p(key)}</strong>: click in order the roots of <strong>${p(diatonicChord(key, 1))}</strong>, <strong>${p(diatonicChord(key, 4))}</strong> and <strong>${p(diatonicChord(key, 0))}</strong> on the 6th or 5th string`),
      hint: T('Cerca lo schema corto: ii sulla 5ª corda, V sulla 6ª due tasti indietro, I di nuovo sulla 5ª allo stesso tasto del V.', 'Look for the short pattern: ii on the 5th string, V on the 6th two frets back, I on the 5th again at the V\'s fret.'),
      from: 0, to: 15, focus: [4, 5], labels: 'note',
      sequence: [
        { pc: ii, strings: [4, 5], label: 'ii' },
        { pc: V, strings: [4, 5], label: 'V' },
        { pc: I, strings: [4, 5], label: 'I' },
      ],
      reveal,
    }
  }
}

const rootDot = (s, f, label) => ({ s, f, color: RED, label })

export default {
  id: 'harmony',
  title: T('Gli accordi della scala', 'The chords of the scale'),
  desc: T(
    'Armonizzare la scala maggiore: triadi e settime su ogni grado, numeri romani, funzioni, il II-V-I in tutte le tonalità, sul manico e a orecchio.',
    'Harmonising the major scale: triads and sevenths on every degree, Roman numerals, functions, the ii-V-I in every key, on the neck and by ear.'),
  steps: [
    {
      id: 'stack',
      title: T('Accordi per terze', 'Chords in thirds'),
      blocks: [
        P('Prendi un grado della scala e sovrapponi due terze usando <strong>solo note della scala</strong>: ottieni la sua triade. In C: C E G, D F A, E G B, F A C, G B D, A C E, B D F. Le qualità escono sempre nello stesso ordine, in ogni tonalità maggiore: <strong>maggiore, minore, minore, maggiore, maggiore, minore, diminuito</strong>.',
          'Take a degree of the scale and stack two thirds using <strong>only scale notes</strong>: you get its triad. In C: C E G, D F A, E G B, F A C, G B D, A C E, B D F. The qualities always come out in the same order, in every major key: <strong>major, minor, minor, major, major, minor, diminished</strong>.'),
        P('Si scrivono con i numeri romani: maiuscolo per maggiore, minuscolo per minore, ° per diminuito: <strong>I ii iii IV V vi vii°</strong>. Il numero dice il grado, la forma dice la qualità.',
          'They are written in Roman numerals: upper case for major, lower case for minor, ° for diminished: <strong>I ii iii IV V vi vii°</strong>. The number gives the degree, the case gives the quality.'),
        { type: 'table',
          head: T(['Grado', 'In C', 'In F', 'In G', 'Qualità'], ['Degree', 'In C', 'In F', 'In G', 'Quality']),
          rows: T(DIATONIC.roman.map((r, d) => [r, ...['C', 'F', 'G'].map(k => p(diatonicChord(k, d, false))), QUALITY[DIATONIC.quality[d]].it]),
            DIATONIC.roman.map((r, d) => [r, ...['C', 'F', 'G'].map(k => p(diatonicChord(k, d, false))), QUALITY[DIATONIC.quality[d]].en])) },
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => triadFrames(key) },
        { type: 'quiz', title: T('Che accordo è?', 'Which chord?'), need: 6,
          make: (() => {
            const nextDeg = bag([0, 1, 2, 3, 4, 5, 6])
            return () => {
              const d = nextDeg()
              if (Math.random() < 0.5) {
                return {
                  key: `quality:${d}`,
                  prompt: T(`In una tonalità maggiore, che qualità ha la triade sul <strong>${d + 1}° grado</strong>?`, `In a major key, what quality is the triad on the <strong>${d + 1}${['st', 'nd', 'rd'][d] || 'th'} degree</strong>?`),
                  options: ['major', 'minor', 'dim'].map(q => ({ label: QUALITY[q], ok: q === DIATONIC.quality[d] })),
                }
              }
              const key = pick(DRILL_KEYS)
              const right = diatonicChord(key, d, false)
              const root = degreeNote(key, d)
              return {
                key: `triad-of:${d}`,
                prompt: T(`In <strong>${p(key)}</strong> maggiore, qual è l'accordo <strong>${DIATONIC.roman[d]}</strong>?`, `In <strong>${p(key)}</strong> major, which chord is the <strong>${DIATONIC.roman[d]}</strong>?`),
                options: choices(right, [root, root + 'm', root + 'dim'].filter(x => x !== right).concat([diatonicChord(key, (d + 1) % 7, false)])).map(o => ({ ...o, label: p(o.label) })),
              }
            }
          })() },
      ],
    },

    {
      id: 'sevenths',
      title: T('Le settime diatoniche', 'The diatonic sevenths'),
      blocks: [
        P('Aggiungi una terza in più e hai gli accordi di settima: la lingua del jazz. In ogni tonalità maggiore: <strong>Imaj7, ii7, iii7, IVmaj7, V7, vi7, viiø7</strong>. Il V7 è l\'unico accordo di dominante della scala; il viiø7 (semidiminuito, m7b5) è il II del minore relativo.',
          'Add one more third and you have seventh chords: the language of jazz. In every major key: <strong>Imaj7, ii7, iii7, IVmaj7, V7, vi7, viiø7</strong>. V7 is the only dominant chord of the scale; viiø7 (half-diminished, m7b5) is the ii of the relative minor.'),
        { type: 'table',
          head: T(['Grado', 'In C', 'In B♭', 'In E♭', 'Formula'], ['Degree', 'In C', 'In B♭', 'In E♭', 'Formula']),
          rows: T(DIATONIC.roman7.map((r, d) => [r, ...['C', 'Bb', 'Eb'].map(k => p(diatonicChord(k, d))), ['R 3 5 7', 'R b3 5 b7', 'R b3 5 b7', 'R 3 5 7', 'R 3 5 b7', 'R b3 5 b7', 'R b3 b5 b7'][d]]),
            DIATONIC.roman7.map((r, d) => [r, ...['C', 'Bb', 'Eb'].map(k => p(diatonicChord(k, d))), ['R 3 5 7', 'R b3 5 b7', 'R b3 5 b7', 'R 3 5 7', 'R 3 5 b7', 'R b3 5 b7', 'R b3 b5 b7'][d]])) },
        { type: 'tip', label: T('Da ricordare:', 'Remember:'),
          it: 'maj7 su I e IV, 7 solo sul V, m7 su ii, iii e vi, m7b5 sul vii. Un accordo m7 da solo è ambiguo (ii, iii o vi?): lo decide l\'accordo che segue.',
          en: 'maj7 on I and IV, 7 only on V, m7 on ii, iii and vi, m7b5 on vii. An m7 chord on its own is ambiguous (ii, iii or vi?): the next chord decides.' },
        { type: 'speed', title: T('Accordi nelle tonalità', 'Chords in the keys'), count: 14, levels: [8, 5, 3.5],
          tip: T('Per i numeri romani rispondi anche con i tasti 1-7.', 'For Roman numerals you can also answer with keys 1-7.'),
          make: diatonicDrill() },
      ],
    },

    {
      id: 'functions',
      title: T('Tonica, sottodominante, dominante', 'Tonic, subdominant, dominant'),
      blocks: [
        P('Gli accordi della scala fanno tre lavori. La <strong>tonica</strong> (I, e anche iii e vi che le assomigliano) è riposo. La <strong>sottodominante</strong> (IV e ii) si allontana da casa. La <strong>dominante</strong> (V e vii°) crea tensione e vuole tornare alla tonica, perché contiene la sensibile e il tritono.',
          'The chords of the scale do three jobs. The <strong>tonic</strong> (I, and iii and vi which resemble it) is rest. The <strong>subdominant</strong> (IV and ii) moves away from home. The <strong>dominant</strong> (V and vii°) creates tension and wants to go back to the tonic, because it holds the leading tone and the tritone.'),
        { type: 'table',
          head: T(['Funzione', 'Gradi', 'In C', 'Carattere'], ['Function', 'Degrees', 'In C', 'Character']),
          rows: T([
            ['Tonica', 'I, iii, vi', 'Cmaj7, Em7, Am7', 'riposo, arrivo'],
            ['Sottodominante', 'IV, ii', 'Fmaj7, Dm7', 'partenza, movimento'],
            ['Dominante', 'V, vii°', 'G7, Bm7b5', 'tensione che chiede di risolvere'],
          ], [
            ['Tonic', 'I, iii, vi', 'Cmaj7, Em7, Am7', 'rest, arrival'],
            ['Subdominant', 'IV, ii', 'Fmaj7, Dm7', 'departure, motion'],
            ['Dominant', 'V, vii°', 'G7, Bm7b5', 'tension asking to resolve'],
          ]) },
        P('Il <strong>II-V-I</strong> è il giro sottodominante → dominante → tonica, con le fondamentali che salgono di quarta. È il mattone di quasi tutti gli standard. Il turnaround I-vi-ii-V fa lo stesso percorso partendo da casa.',
          'The <strong>ii-V-I</strong> is the trip subdominant → dominant → tonic, with the roots moving up a fourth. It is the building block of almost every standard. The I-vi-ii-V turnaround makes the same trip starting from home.'),
        { type: 'chart', chart: '| Dm7 | G7 | Cmaj7 | Cmaj7 |' },
        { type: 'chart', chart: '| Cmaj7 Am7 | Dm7 G7 | Cmaj7 Am7 | Dm7 G7 |' },
        { type: 'quiz', title: T('Che funzione?', 'Which function?'), need: 6, make: functionDrill() },
      ],
    },

    {
      id: 'roman-neck',
      title: T('Il II-V-I sul manico', 'The ii-V-I on the neck'),
      blocks: [
        P('Sul manico le fondamentali di un II-V-I formano sempre lo stesso disegno, perché salgono di quarta. Con il ii sulla <strong>5ª corda</strong>: il V sulla 6ª due tasti indietro, il I di nuovo sulla 5ª allo stesso tasto del V. Con il ii sulla <strong>6ª corda</strong>: il V sulla 5ª allo stesso tasto, il I sulla 6ª due tasti indietro.',
          'On the neck the roots of a ii-V-I always make the same picture, because they move up a fourth. With ii on the <strong>5th string</strong>: V on the 6th two frets back, I on the 5th again at the V\'s fret. With ii on the <strong>6th string</strong>: V on the 5th at the same fret, I on the 6th two frets back.'),
        { type: 'frames', frames: [
          { tab: T('ii sulla 5ª', 'ii on the 5th'), caption: T('Dm7 (5ª corda, 5° tasto) → G7 (6ª, 3°) → Cmaj7 (5ª, 3°).', 'Dm7 (5th string, fret 5) → G7 (6th, fret 3) → Cmaj7 (5th, fret 3).'),
            diagram: { from: 0, to: 8, focus: [4, 5], toggle: false, play: 'seq', dots: [rootDot(4, 5, 'ii'), rootDot(5, 3, 'V'), { ...rootDot(4, 3, 'I'), color: AMBER }] } },
          { tab: T('ii sulla 6ª', 'ii on the 6th'), caption: T('Dm7 (6ª corda, 10° tasto) → G7 (5ª, 10°) → Cmaj7 (6ª, 8°).', 'Dm7 (6th string, fret 10) → G7 (5th, fret 10) → Cmaj7 (6th, fret 8).'),
            diagram: { from: 5, to: 13, focus: [4, 5], toggle: false, play: 'seq', dots: [rootDot(5, 10, 'ii'), rootDot(4, 10, 'V'), { ...rootDot(5, 8, 'I'), color: AMBER }] } },
        ] },
        { type: 'find', title: T('Le fondamentali in ordine', 'The roots in order'), rounds: 5, make: iiVIRootsTask() },
        { type: 'practice', to: { path: '/changes-trainer', query: { mode: 'guide' } }, it: 'Poi: Sui Cambi → Note guida', en: 'Then: Over the Changes → Guide tones' },
      ],
    },

    {
      id: 'all-keys',
      title: T('Il II-V-I in tutte le tonalità', 'The ii-V-I in every key'),
      blocks: [
        P('Nei brani jazz il II-V-I compare in molte tonalità, spesso una dopo l\'altra lungo il ciclo delle quarte o scendendo di un tono. Conoscerlo a memoria in tutte e dodici è uno degli obiettivi principali di questo percorso.',
          'In jazz tunes the ii-V-I shows up in many keys, often one after another along the cycle of fourths or moving down a whole tone. Knowing it by heart in all twelve is one of the main goals of this path.'),
        { type: 'table',
          head: T(['Tonalità', 'ii', 'V', 'I'], ['Key', 'ii', 'V', 'I']),
          rows: T(FOURTHS.map(k => [p(k), ...iiVI(k).map(p)]), FOURTHS.map(k => [p(k), ...iiVI(k).map(p)])) },
        P('In minore il II-V-I diventa <strong>iiø7 – V7 – im</strong>: in A minore Bm7b5 – E7 – Am7 (spesso E7 con b9). Il V è di dominante anche in minore, con la sensibile alzata (G♯ in A minore).',
          'In minor the ii-V-I becomes <strong>iiø7 – V7 – im</strong>: in A minor Bm7b5 – E7 – Am7 (often E7 with a b9). The V is a dominant in minor too, with the raised leading tone (G♯ in A minor).'),
        { type: 'chart', chart: '| Dm7 G7 | Cmaj7 | Cm7 F7 | Bbmaj7 | Bbm7 Eb7 | Abmaj7 | Abm7 Db7 | Gbmaj7 |' },
        { type: 'chart', chart: '| Bm7b5 | E7 | Am7 | Am7 |' },
        { type: 'speed', title: T('II-V-I in ogni tonalità', 'ii-V-I in every key'), count: 12, levels: [10, 6, 4], make: iiVIDrill() },
      ],
    },

    {
      id: 'ear',
      title: T('Gli accordi a orecchio', 'Chords by ear'),
      blocks: [
        P('Dopo la cadenza suona un accordo della scala: che grado è? Ascolta prima la qualità (maggiore o minore), poi il basso: è la tonica, sale di poco o è lontano?',
          'After the cadence a chord of the scale sounds: which degree is it? Listen to the quality first (major or minor), then the bass: is it the tonic, a little above, or far away?'),
        { type: 'list',
          it: [
            ['Maggiori:', 'I (casa), IV (si apre, "Amen"), V (tensione, vuole tornare).'],
            ['Minori:', 'ii (morbido, prepara il V), iii (vicino alla tonica, sospeso), vi (malinconico, la relativa minore).'],
          ],
          en: [
            ['Major:', 'I (home), IV (opens up, "Amen"), V (tension, wants to go back).'],
            ['Minor:', 'ii (soft, sets up the V), iii (close to the tonic, suspended), vi (wistful, the relative minor).'],
          ] },
        { type: 'quiz', title: T('Che grado è l\'accordo?', 'Which degree is the chord?'), need: 6, make: earChordDrill() },
        { type: 'practice', to: '/functional-harmony', it: 'Continua con: Armonia Funzionale', en: 'Go on with: Functional Harmony' },
      ],
    },

    {
      id: 'review',
      title: T('Ripasso dell\'armonia', 'Harmony review'),
      blocks: [
        P('Accordi nelle tonalità, funzioni e II-V-I, tutti mescolati.', 'Chords in the keys, functions and ii-V-Is, all mixed.'),
        { type: 'speed', title: T('Armonia, tutto mescolato', 'Harmony, all mixed'), count: 16, levels: [8, 5, 3.5],
          make: (() => { const a = diatonicDrill(), b = functionDrill(), c = iiVIDrill(); const n = bag([0, 0, 1, 2]); return i => [a, b, c][n()](i) })() },
        { type: 'practice', to: '/real-book', it: 'Metti in pratica: un brano del Real Book, con il suo percorso di studio', en: 'Put it to use: a Real Book tune, with its study path' },
      ],
    },
  ],
}
