// Module 4 — Using the shapes: arpeggios, scales, sevenths, guide tones and pentatonics.

import { pcAt, mod12, keyPc, keyDot, colorOf, pick, pickNew, pretty, KEY_NAMES, SHAPE_COLORS, CAGED, CAGED_ORDER, cagedGrip, cagedArpeggio, cagedScale, pentatonicBox, shapePosition, TRIAD, positionsOf } from '../theory.js'
import { T, coloured, chordToneDots, shapesUpTheNeck, keysForShape, shapeWindow, strIt, strEn, MINOR_KEYS, DEG12 } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })

const MAJOR = [0, 2, 4, 5, 7, 9, 11]
const MINOR_PENTA = [0, 3, 5, 7, 10]
const SEVENTHS = { maj7: [0, 4, 7, 11], '7': [0, 4, 7, 10], m7: [0, 3, 7, 10] }
const CHORD_TONES = new Set([0, 3, 4, 7, 10, 11])

// Scale dots: chord tones solid, the notes in between as rings.
const scaleLook = (dots, chord = [0, 4, 7]) =>
  dots.map(d => ({ ...d, color: colorOf(d.semi), hollow: !chord.includes(d.semi) || undefined }))

const arpWindow = (shape, p) => shapeWindow(shape, p)

// Every scale tone across the neck, faded, as background.
function scaleBackground(key, scale, from, to, color = '#8a8478') {
  const out = []
  for (let s = 0; s < 6; s++) for (let f = from; f <= to; f++) {
    const semi = mod12(pcAt(s, f) - keyPc(key))
    if (scale.includes(semi)) out.push(keyDot(key, s, f, { ghost: true, color: color || colorOf(semi) }))
  }
  return out
}

function withBackground(bg, dots) {
  const own = new Set(dots.map(d => `${d.s}-${d.f}`))
  return [...bg.filter(d => !own.has(`${d.s}-${d.f}`)), ...dots]
}

// The five positions of the major scale of a key, up the neck.
function scaleFrames(key) {
  const bg = scaleBackground(key, MAJOR, 0, 16)
  return shapesUpTheNeck(key, TRIAD.major, 15).map(x => {
    const sc = cagedScale(key, x.shape, MAJOR, x.p)
    return {
      tab: `${x.shape} · ${x.p}`,
      caption: T(`Scala di ${pretty(key)} maggiore nella <strong>forma di ${x.shape}</strong> (tasti ${sc.lo}–${sc.hi}). Pieni: note dell'accordo; anelli: le altre note della scala; tratteggiati: un tasto fuori dalla forma.`,
        `${pretty(key)} major scale in the <strong>${x.shape} shape</strong> (frets ${sc.lo}–${sc.hi}). Solid: chord tones; rings: the other scale notes; dashed: one fret outside the shape.`),
      diagram: { from: 0, to: 16, labels: 'degree', play: 'updown', dots: withBackground(bg, scaleLook(sc.dots)), boxes: [{ from: sc.lo, to: sc.hi, label: x.shape }] },
    }
  })
}

const PENTA_SHAPE = ['E', 'D', 'C', 'A', 'G']           // minor shape around each box
const PENTA_MAJOR_SHAPE = ['G', 'E', 'D', 'C', 'A']     // same box seen from the relative major

function pentaFrames(key) {
  const bg = scaleBackground(key, MINOR_PENTA, 0, 17)
  return [0, 1, 2, 3, 4].map(n => {
    const box = pentatonicBox(key, MINOR_PENTA, n, 0)
    const rel = KEY_NAMES[mod12(keyPc(key) + 3)]
    return {
      tab: `Box ${n + 1}`,
      caption: T(`Box ${n + 1} di ${pretty(key)}m pentatonica (tasti ${box.lo}–${box.hi}): attorno alla <strong>forma di ${PENTA_SHAPE[n]} minore</strong>; per ${pretty(rel)} maggiore è la forma di ${PENTA_MAJOR_SHAPE[n]}.`,
        `Box ${n + 1} of ${pretty(key)}m pentatonic (frets ${box.lo}–${box.hi}): around the <strong>minor ${PENTA_SHAPE[n]} shape</strong>; for ${pretty(rel)} major it is the ${PENTA_MAJOR_SHAPE[n]} shape.`),
      diagram: { from: 0, to: 17, labels: 'degree', play: 'updown', dots: withBackground(bg, coloured(box.dots)),
        boxes: [{ from: box.lo, to: box.hi, label: `${PENTA_SHAPE[n]}m`, color: SHAPE_COLORS[PENTA_SHAPE[n]] }] },
    }
  })
}

// ii–V–I in C in one position: the guide tones and the rest of each arpeggio.
function guideFrame(chord, key, shape, ints, guides, caption) {
  const arp = cagedArpeggio(key, shape, ints, 1)
  const guideKeys = new Set(guides.map(([s, f]) => `${s}-${f}`))
  const dots = [
    ...arp.dots.filter(d => !guideKeys.has(`${d.s}-${d.f}`)).map(d => ({ ...d, ghost: true, color: colorOf(d.semi) })),
    ...guides.map(([s, f]) => {
      const semi = mod12(pcAt(s, f) - keyPc(key))
      return keyDot(key, s, f, { color: colorOf(semi), steps: semi === 3 ? 2 : undefined })
    }),
  ]
  return { tab: chord, caption, diagram: { from: 1, to: 8, labels: 'degree', play: 'chord', dots } }
}

export default {
  id: 'shapes',
  title: T('Usare le forme: arpeggi e scale', 'Using the shapes: arpeggios and scales'),
  desc: T(
    'Dentro ogni forma CAGED: l\'arpeggio, la scala maggiore, le settime, le note guida del II-V-I e i box della pentatonica.',
    'Inside every CAGED shape: the arpeggio, the major scale, the sevenths, the guide tones of the ii-V-I and the pentatonic boxes.'),
  steps: [
    {
      id: 'arpeggio',
      title: T('Dall\'accordo all\'arpeggio', 'From chord to arpeggio'),
      blocks: [
        P('Un <strong>arpeggio</strong> è un accordo suonato una nota alla volta. Dentro ogni forma ci sono più note dell\'accordo di quelle che usi per la diteggiatura: tutte le R, 3 e 5 della zona. Suonarle in ordine, dalla più grave alla più acuta e ritorno, ti insegna dove sono le note che "suonano giuste" sull\'accordo.',
          'An <strong>arpeggio</strong> is a chord played one note at a time. Inside each shape there are more chord tones than the grip uses: every R, 3 and 5 in the area. Playing them in order, from the lowest to the highest and back, teaches you where the notes that "sound right" over the chord are.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'G', labels: 'degree', play: 'updown',
          build: key => {
            const a = cagedArpeggio(key, 'E', TRIAD.major, 1)
            return { ...arpWindow('E', a.p), dots: coloured(a.dots), labels: 'degree', play: 'updown',
              caption: T(`Arpeggio di ${pretty(key)} nella forma di E (barré al ${a.p}° tasto): due note sulla 5ª corda, una sulle altre.`, `${pretty(key)} arpeggio in the E shape (barre at fret ${a.p}): two notes on the 5th string, one on the others.`) }
          } },
        { type: 'tip', label: T('Dì il grado, non il nome:', 'Say the degree, not the name:'),
          it: 'mentre suoni l\'arpeggio pronuncia "R, 3, 5, R…". È l\'abitudine che ti permetterà di suonare sui cambi senza pensare ai nomi delle note.',
          en: 'as you play the arpeggio say "R, 3, 5, R…". It is the habit that will let you play over changes without thinking of note names.' },
        { type: 'find', title: T('Trova le terze e le quinte', 'Find the thirds and fifths'), rounds: 6,
          make: (i, prev) => {
            const shape = pick(['E', 'A'])
            const key = pick(keysForShape(shape, 1, 9))
            const semi = pickNew([4, 7, 0], prev?.semi)
            const a = cagedArpeggio(key, shape, TRIAD.major, 1)
            const w = arpWindow(shape, a.p)
            const name = { 0: T('tutte le fondamentali (R)', 'every root (R)'), 4: T('tutte le terze (3)', 'every third (3)'), 7: T('tutte le quinte (5)', 'every fifth (5)') }[semi]
            return {
              semi, key: `arp:${shape}:${semi}`,
              prompt: T(`Nella forma di ${shape} di <strong>${pretty(key)}</strong> clicca ${name.it}`, `In the ${shape} shape of <strong>${pretty(key)}</strong> click ${name.en}`),
              from: w.from, to: w.to, labels: 'degree',
              boxes: [{ from: a.lo, to: a.hi, label: shape }],
              dots: semi === 0 ? [] : coloured(a.dots.filter(d => d.semi === 0)),
              targets: coloured(a.dots.filter(d => d.semi === semi)),
            }
          } },
      ],
    },

    {
      id: 'arp5',
      title: T('L\'arpeggio nelle cinque forme', 'The arpeggio in all five shapes'),
      blocks: [
        P('Ogni forma ha il suo arpeggio. Imparali uno alla volta, poi collegali: suona l\'arpeggio in una forma, scivola nella successiva usando le note in comune, e così via fino al 12° tasto e ritorno. È il modo più diretto per vedere l\'accordo su tutto il manico.',
          'Every shape has its own arpeggio. Learn them one at a time, then link them: play the arpeggio in one shape, slide into the next using the shared notes, and so on up to the 12th fret and back. It is the most direct way to see the chord over the whole neck.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C',
          build: key => {
            const all = chordToneDots(key, TRIAD.major, 0, 15, { ghost: true })
            return shapesUpTheNeck(key, TRIAD.major, 15).map(x => ({
              tab: `${x.shape} · ${x.p}`,
              caption: T(`Arpeggio di ${pretty(key)} nella forma di ${x.shape}, tasti ${x.lo}–${x.hi}.`, `${pretty(key)} arpeggio in the ${x.shape} shape, frets ${x.lo}–${x.hi}.`),
              diagram: { from: 0, to: 15, labels: 'degree', play: 'updown', dots: withBackground(all, coloured(x.arp.dots)), boxes: [{ from: x.lo, to: x.hi, label: x.shape }] },
            }))
          } },
        { type: 'find', title: T('Costruisci l\'arpeggio', 'Build the arpeggio'), rounds: 4,
          make: (i, prev) => {
            const shape = pickNew(CAGED_ORDER, prev?.shape)
            const key = pick(keysForShape(shape, 1, 9))
            const a = cagedArpeggio(key, shape, TRIAD.major, 1)
            const w = arpWindow(shape, a.p)
            const roots = a.dots.filter(d => d.semi === 0).slice(0, 1)
            const rootKey = roots.map(d => `${d.s}-${d.f}`)
            return {
              shape, key: `arp5:${shape}`,
              prompt: T(`Clicca tutte le note dell'arpeggio di <strong>${pretty(key)}</strong> nella <strong>forma di ${shape}</strong> (R, 3 e 5 nella zona)`,
                `Click every note of the <strong>${pretty(key)}</strong> arpeggio in the <strong>${shape} shape</strong> (R, 3 and 5 in the area)`),
              from: w.from, to: w.to, labels: 'degree',
              boxes: [{ from: a.lo, to: a.hi, label: shape }],
              dots: coloured(roots),
              targets: coloured(a.dots.filter(d => !rootKey.includes(`${d.s}-${d.f}`))),
            }
          } },
      ],
    },

    {
      id: 'scale',
      title: T('La scala maggiore attorno alla forma', 'The major scale around the shape'),
      blocks: [
        P('La scala maggiore è l\'accordo più le note che stanno in mezzo: <strong>2, 4, 6 e 7</strong>. Dentro ogni forma la scala riempie la zona; a volte serve una nota un tasto fuori, presa allungando l\'indice indietro o il mignolo in avanti. Le note dell\'accordo dentro la scala sono i tuoi punti d\'appoggio sicuri.',
          'The major scale is the chord plus the notes in between: <strong>2, 4, 6 and 7</strong>. Inside each shape the scale fills the area; sometimes you need a note one fret outside it, reached by stretching the index back or the little finger forward. The chord tones inside the scale are your safe landing points.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'G',
          build: key => {
            const sc = cagedScale(key, 'E', MAJOR, 1)
            return { ...arpWindow('E', sc.p), labels: 'degree', play: 'updown', dots: scaleLook(sc.dots), boxes: [{ from: sc.lo, to: sc.hi, label: 'E' }],
              caption: T(`Scala di ${pretty(key)} maggiore nella forma di E: pieni R, 3, 5; anelli 2, 4, 6, 7.`, `${pretty(key)} major scale in the E shape: solid R, 3, 5; rings 2, 4, 6, 7.`) }
          } },
        P('Ora le cinque posizioni della scala, una per forma. Insieme coprono il manico come le forme degli accordi: imparane una a settimana, sempre partendo e arrivando sulla fondamentale.',
          'Now the five positions of the scale, one per shape. Together they cover the neck like the chord shapes: learn one a week, always starting and ending on the root.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => scaleFrames(key) },
        { type: 'tip', label: T('Come studiarle:', 'How to practise them:'),
          it: 'suona la scala dalla nota più grave alla più acuta della forma e ritorno, poi solo le note dell\'accordo (l\'arpeggio), poi alterna: scala in salita, arpeggio in discesa.',
          en: 'play the scale from the lowest to the highest note of the shape and back, then only the chord tones (the arpeggio), then alternate: scale going up, arpeggio coming down.' },
      ],
    },

    {
      id: 'scale-task',
      title: T('Completa la scala', 'Complete the scale'),
      blocks: [
        P('Le note dell\'accordo sono già segnate: aggiungi le note della scala che mancano (2, 4, 6 e 7) dentro la forma. Ricorda che ogni corda ha due o tre note della scala.',
          'The chord tones are already marked: add the missing scale notes (2, 4, 6 and 7) inside the shape. Remember that each string has two or three scale notes.'),
        { type: 'find', title: T('Riempi la forma', 'Fill in the shape'), rounds: 4,
          make: (i, prev) => {
            const shape = pickNew(['E', 'A', 'G', 'D', 'C'], prev?.shape)
            const key = pick(keysForShape(shape, 1, 9))
            const sc = cagedScale(key, shape, MAJOR, 1)
            const w = arpWindow(shape, sc.p)
            const chord = sc.dots.filter(d => [0, 4, 7].includes(d.semi))
            return {
              shape, key: `scale:${shape}`,
              prompt: T(`Scala di <strong>${pretty(key)} maggiore</strong>, <strong>forma di ${shape}</strong>: clicca le note che mancano`,
                `<strong>${pretty(key)} major</strong> scale, <strong>${shape} shape</strong>: click the missing notes`),
              hint: T('Mancano 2, 4, 6 e 7: tra due note dell\'accordo vicine ce n\'è sempre una o due.', '2, 4, 6 and 7 are missing: between two neighbouring chord tones there are always one or two.'),
              from: Math.max(0, w.from - 1), to: w.to + 1, labels: 'degree',
              boxes: [{ from: sc.lo, to: sc.hi, label: shape }],
              dots: coloured(chord),
              targets: scaleLook(sc.dots.filter(d => ![0, 4, 7].includes(d.semi))),
            }
          } },
      ],
    },

    {
      id: 'sevenths',
      title: T('Aggiungere la settima', 'Adding the seventh'),
      blocks: [
        P('Gli accordi jazz hanno quattro note: si aggiunge la <strong>settima</strong>. In ogni forma la settima sta vicino a una fondamentale: la <strong>7</strong> (maj7) un tasto sotto la fondamentale, la <strong>b7</strong> (7 e m7) due tasti sotto. Vedere la settima accanto alla fondamentale è il modo più rapido per trasformare una forma di triade in un arpeggio jazz.',
          'Jazz chords have four notes: you add the <strong>seventh</strong>. In each shape the seventh sits next to a root: the <strong>7</strong> (maj7) one fret below the root, the <strong>b7</strong> (7 and m7) two frets below. Seeing the seventh beside the root is the fastest way to turn a triad shape into a jazz arpeggio.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C',
          build: key => [['E', 'maj7'], ['E', '7'], ['E', 'm7'], ['A', 'maj7'], ['A', '7'], ['A', 'm7']].map(([shape, q]) => {
            const a = cagedArpeggio(key, shape, SEVENTHS[q], 1)
            const name = `${pretty(key)}${q === 'maj7' ? 'maj7' : q === 'm7' ? 'm7' : '7'}`
            const formula = { maj7: 'R 3 5 7', '7': 'R 3 5 b7', m7: 'R b3 5 b7' }[q]
            return {
              tab: `${shape} · ${q}`,
              caption: T(`<strong>${name}</strong> nella forma di ${shape}${q === 'm7' ? ' minore' : ''}: ${formula}.`, `<strong>${name}</strong> in the ${q === 'm7' ? 'minor ' : ''}${shape} shape: ${formula}.`),
              diagram: { ...arpWindow(shape, a.p), labels: 'degree', play: 'updown', dots: coloured(a.dots), boxes: [{ from: a.lo, to: a.hi, label: shape }] },
            }
          }) },
        { type: 'find', title: T('Trova le settime', 'Find the sevenths'), rounds: 6,
          make: (i, prev) => {
            const q = pickNew(['maj7', '7', 'm7'], prev?.q)
            const shape = pick(['E', 'A', 'D'])
            const key = pick(keysForShape(shape, 1, 9))
            const ints = SEVENTHS[q]
            const a = cagedArpeggio(key, shape, ints, 1)
            const w = arpWindow(shape, a.p)
            const sev = q === 'maj7' ? 11 : 10
            return {
              q, key: `seventh:${q}`,
              prompt: T(`<strong>${pretty(key)}${q}</strong> nella forma di ${shape}: clicca tutte le ${q === 'maj7' ? 'settime maggiori (7)' : 'settime minori (b7)'}`,
                `<strong>${pretty(key)}${q}</strong> in the ${shape} shape: click every ${q === 'maj7' ? 'major seventh (7)' : 'minor seventh (b7)'}`),
              hint: T(q === 'maj7' ? 'Un tasto sotto ogni fondamentale, o sulla corda vicina.' : 'Due tasti sotto ogni fondamentale, o sulla corda vicina.',
                q === 'maj7' ? 'One fret below each root, or on the next string.' : 'Two frets below each root, or on the next string.'),
              from: w.from, to: w.to, labels: 'degree',
              boxes: [{ from: a.lo, to: a.hi, label: shape }],
              dots: coloured(a.dots.filter(d => d.semi !== sev)),
              targets: coloured(a.dots.filter(d => d.semi === sev)),
            }
          } },
      ],
    },

    {
      id: 'guide',
      title: T('Note guida: terze e settime nel II-V-I', 'Guide tones: thirds and sevenths in the ii-V-I'),
      blocks: [
        P('Nel II-V-I le terze e le settime si muovono per grado: la settima di un accordo scende di un semitono sulla terza del successivo, l\'altra nota resta ferma. In una sola posizione lo vedi bene: Dm7 (forma di A al 5° tasto), G7 (forma di E al 3°), Cmaj7 (forma di A al 3°).',
          'In the ii-V-I the thirds and sevenths move by step: the seventh of one chord falls a semitone onto the third of the next, the other note stays put. In one position you can see it clearly: Dm7 (A shape at the 5th fret), G7 (E shape at the 3rd), Cmaj7 (A shape at the 3rd).'),
        { type: 'frames', frames: [
          guideFrame('Dm7', 'D', 'A', SEVENTHS.m7, [[2, 5], [1, 6]],
            T('<strong>Dm7</strong>: la b7 è C (3ª corda, 5° tasto), la b3 è F (2ª corda, 6° tasto). Le altre note dell\'arpeggio sono spente.', '<strong>Dm7</strong>: the b7 is C (3rd string, 5th fret), the b3 is F (2nd string, 6th fret). The other arpeggio notes are faded.')),
          guideFrame('G7', 'G', 'E', SEVENTHS['7'], [[2, 4], [1, 6]],
            T('<strong>G7</strong>: C scende di un semitono a B, la terza di G7; F resta ed è la sua b7.', '<strong>G7</strong>: C falls a semitone to B, the third of G7; F stays and is its b7.')),
          guideFrame('Cmaj7', 'C', 'A', SEVENTHS.maj7, [[2, 4], [1, 5]],
            T('<strong>Cmaj7</strong>: F scende a E, la terza; B resta ed è la settima maggiore.', '<strong>Cmaj7</strong>: F falls to E, the third; B stays and is the major seventh.')),
        ] },
        { type: 'chart', chart: '| Dm7 | G7 | Cmaj7 | Cmaj7 |' },
        { type: 'find', title: T('Terze e settime nella forma', 'Thirds and sevenths in the shape'), rounds: 6,
          make: (i, prev) => {
            const q = pickNew(['m7', '7', 'maj7'], prev?.q)
            const shape = pick(['E', 'A'])
            const key = pick(keysForShape(shape, 1, 9))
            const ints = SEVENTHS[q]
            const a = cagedArpeggio(key, shape, ints, 1)
            const w = arpWindow(shape, a.p)
            const guide = new Set([ints[1], ints[3]])
            return {
              q, key: `guide:${q}`,
              prompt: T(`<strong>${pretty(key)}${q}</strong>, forma di ${shape}: clicca tutte le terze e le settime`,
                `<strong>${pretty(key)}${q}</strong>, ${shape} shape: click every third and seventh`),
              from: w.from, to: w.to, labels: 'degree',
              boxes: [{ from: a.lo, to: a.hi, label: shape }],
              dots: coloured(a.dots.filter(d => d.semi === 0)),
              targets: coloured(a.dots.filter(d => guide.has(d.semi))),
            }
          } },
        { type: 'practice', to: { path: '/changes-trainer', query: { mode: 'guide' } }, it: 'Allenati: Sui Cambi → Note guida', en: 'Practise: Over the Changes → Guide tones' },
      ],
    },

    {
      id: 'pentatonic',
      title: T('La pentatonica minore e le forme', 'The minor pentatonic and the shapes'),
      blocks: [
        P('La pentatonica minore (R, b3, 4, 5, b7) ha cinque "box" classici, due note per corda. Ognuno è avvolto attorno a una <strong>forma CAGED minore</strong>: il box 1 attorno alla forma di E minore, il 2 alla D, il 3 alla C, il 4 alla A, il 5 alla G. E siccome A minore e C maggiore hanno le stesse note, il box 1 di A minore è anche la forma di G di C maggiore.',
          'The minor pentatonic (R, b3, 4, 5, b7) has five classic "boxes", two notes per string. Each one wraps around a <strong>minor CAGED shape</strong>: box 1 around the minor E shape, box 2 around D, box 3 around C, box 4 around A, box 5 around G. And since A minor and C major share the same notes, box 1 of A minor is also the G shape of C major.'),
        { type: 'frames', keys: MINOR_KEYS, defaultKey: 'A', build: key => pentaFrames(key) },
        { type: 'quiz', title: T('Quale forma?', 'Which shape?'), need: 5,
          make: (i, prev) => {
            const n = pickNew([0, 1, 2, 3, 4], prev?.n)
            const key = pick(MINOR_KEYS)
            const box = pentatonicBox(key, MINOR_PENTA, n, 0)
            return {
              n, key: `penta:${n}`,
              prompt: T(`Questo è un box della pentatonica di <strong>${pretty(key)}m</strong>. Attorno a quale forma minore?`, `This is a box of the <strong>${pretty(key)}m</strong> pentatonic. Around which minor shape?`),
              hint: T('Cerca le fondamentali (R) e la b3: formano l\'accordo minore della forma.', 'Look for the roots (R) and the b3: they make the minor chord of the shape.'),
              diagram: { from: Math.max(0, box.lo - 1), to: box.hi + 1, labels: 'degree', play: 'updown', dots: coloured(box.dots) },
              options: ['E', 'D', 'C', 'A', 'G'].map(x => ({ label: T(`${x} minore`, `minor ${x}`), ok: x === PENTA_SHAPE[n] })),
              explain: T(`Box ${n + 1}: forma di ${PENTA_SHAPE[n]} minore.`, `Box ${n + 1}: minor ${PENTA_SHAPE[n]} shape.`),
            }
          } },
        { type: 'practice', to: '/scale-tempo', it: 'Allenati: Scale a Tempo (Minore Pentatonica)', en: 'Practise: Scales in Time (Minor Pentatonic)' },
      ],
    },

    {
      id: 'whole-neck',
      title: T('Tutto il manico, una tonalità', 'The whole neck, one key'),
      blocks: [
        P('Ultimo passo: collega le cinque forme di una tonalità in un\'unica mappa. Scegli una tonalità, suona l\'arpeggio attraverso le cinque forme salendo, poi la scala. Poi cambia tonalità seguendo il ciclo delle quarte (C, F, B♭, E♭…), come nei brani jazz.',
          'Last step: link the five shapes of a key into a single map. Pick a key, play the arpeggio through the five shapes going up, then the scale. Then change key following the cycle of fourths (C, F, B♭, E♭…), as in jazz tunes.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'F',
          build: key => ({
            from: 0, to: 15, labels: 'degree',
            dots: scaleLook(scaleBackground(key, MAJOR, 0, 15, null).map(d => ({ ...d, ghost: undefined }))),
            boxes: shapesUpTheNeck(key, TRIAD.major, 15).map(x => ({ from: x.lo, to: x.hi, label: x.shape })),
            caption: T(`La scala di ${pretty(key)} maggiore su tutto il manico, con le cinque forme.`, `The ${pretty(key)} major scale over the whole neck, with the five shapes.`),
          }) },
        { type: 'find', title: T('Dove sta la forma?', 'Where is the shape?'), rounds: 6,
          make: (i, prev) => {
            const shape = pickNew(CAGED_ORDER, prev?.shape)
            const key = pick(KEY_NAMES)
            const rs = CAGED[shape].rootStrings[0]
            const targets = []
            for (const min of [0, 12]) {
              const g = cagedGrip(key, shape, 'major', min)
              if (g.p > 12) continue
              targets.push(...g.dots.filter(d => d.s === rs && d.semi === 0 && d.f <= 15))
            }
            const seen = new Set()
            return {
              shape, key: `where:${shape}`,
              prompt: T(`Dove si trova la <strong>forma di ${shape}</strong> di <strong>${pretty(key)}</strong>? Clicca la sua fondamentale sulla ${strIt(rs)}`,
                `Where is the <strong>${shape} shape</strong> of <strong>${pretty(key)}</strong>? Click its root on the ${strEn(rs)}`),
              from: 0, to: 15, labels: 'degree', focus: [rs],
              targets: coloured(targets.filter(d => !seen.has(`${d.s}-${d.f}`) && seen.add(`${d.s}-${d.f}`))),
              reveal: coloured(cagedGrip(key, shape, 'major', 0).dots).map(d => ({ ...d, ghost: true })),
              mode: 'one',
            }
          } },
        { type: 'practice', to: '/explorer', it: 'Esplora: Explorer (scala, forma CAGED, solo arpeggio)', en: 'Explore: Explorer (scale, CAGED shape, arpeggio only)' },
        { type: 'practice', to: { path: '/changes-trainer', query: { mode: 'arpeggio' } }, it: 'Allenati: Sui Cambi → Arpeggi', en: 'Practise: Over the Changes → Arpeggios' },
      ],
    },
  ],
}
