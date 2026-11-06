// Module 3 — The CAGED system: the five shapes, one by one, then linked along the neck.

import { pcAt, mod12, keyPc, keyDot, colorOf, pick, pickNew, bag, shuffle, pretty, KEY_NAMES, CAGED, CAGED_ORDER, cagedGrip, shapePosition, TRIAD } from '../theory.js'
import { T, coloured, strIt, strEn, ordEn, chordToneDots, shapesUpTheNeck, keysForShape, shapeWindow, MINOR_KEYS } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })

const MAJOR_KEY_NAME = key => pretty(key)
const MINOR_KEY_NAME = key => `${pretty(key)}m`

// The grip of a shape as a diagram, framed around its position.
export function gripDiagram(key, shape, quality = 'major', minFret = 0, extra = {}) {
  const g = cagedGrip(key, shape, quality, minFret)
  const w = g.p === 0 ? { from: 0, to: 5 } : { from: Math.max(0, g.p - 1), to: g.p + 4 }
  return { ...w, dots: coloured(g.dots), muted: g.muted, barre: g.barre, labels: 'degree', play: 'chord', ...extra }
}

const SHAPE_TEXT = {
  C: T('fondamentale sulla 5ª corda (anulare) e sulla 2ª (indice)', 'root on the 5th string (ring finger) and on the 2nd (index)'),
  A: T('fondamentale sulla 5ª corda (indice) e sulla 3ª', 'root on the 5th string (index) and on the 3rd'),
  G: T('fondamentale sulla 6ª, sulla 3ª e sulla 1ª corda', 'root on the 6th, 3rd and 1st strings'),
  E: T('fondamentale sulla 6ª, sulla 4ª e sulla 1ª corda', 'root on the 6th, 4th and 1st strings'),
  D: T('fondamentale sulla 4ª corda (indice) e sulla 2ª', 'root on the 4th string (index) and on the 2nd'),
}

// Frames for one shape: open chord, then the shape moved to other keys.
function shapeFrames(shape, keys) {
  const openKey = { C: 'C', A: 'A', G: 'G', E: 'E', D: 'D' }[shape]
  return [openKey, ...keys].map((key, i) => {
    const p = i === 0 ? 0 : shapePosition(key, shape, 1)
    return {
      tab: i === 0 ? T(`${shape} aperto`, `Open ${shape}`) : `${pretty(key)} · ${p}`,
      caption: i === 0
        ? T(`L'accordo di ${shape} aperto: le corde a vuoto fanno parte della forma.`, `The open ${shape} chord: the open strings are part of the shape.`)
        : T(`${pretty(key)} con la forma di ${shape}: il capotasto diventa il ${p}° tasto (indice).`, `${pretty(key)} with the ${shape} shape: the nut becomes the ${ordEn(p)} fret (index finger).`),
      diagram: gripDiagram(key, shape, 'major', i === 0 ? 0 : 1),
    }
  })
}

// "Build the shape": click every note of the grip. The first rounds give the root.
function buildShapeTask(shapes, quality = 'major') {
  const nextShape = bag(shapes)
  return (i, prev) => {
    const shape = nextShape()
    const key = pick(keysForShape(shape, 1, 9, quality === 'minor' ? MINOR_KEYS : undefined))
    const g = cagedGrip(key, shape, quality, 1)
    const w = shapeWindow(shape, g.p)
    const name = quality === 'minor' ? MINOR_KEY_NAME(key) : MAJOR_KEY_NAME(key)
    const rootString = CAGED[shape].rootStrings[0]
    const given = i < 2 ? g.dots.filter(d => d.s === rootString && d.semi === 0) : []
    const givenKeys = new Set(given.map(d => `${d.s}-${d.f}`))
    return {
      shape, key: `build:${shape}:${quality}`,
      prompt: T(`Costruisci la <strong>forma di ${shape}</strong> di <strong>${name}</strong>: clicca tutte le sue note`,
        `Build the <strong>${shape} shape</strong> of <strong>${name}</strong>: click all its notes`),
      hint: given.length
        ? T(`La fondamentale sulla ${strIt(rootString)} è già segnata.`, `The root on the ${strEn(rootString)} is already marked.`)
        : T(`Parti dalla fondamentale sulla ${strIt(rootString)}.`, `Start from the root on the ${strEn(rootString)}.`),
      from: w.from, to: w.to, labels: 'degree',
      dots: coloured(given),
      targets: coloured(g.dots.filter(d => !givenKeys.has(`${d.s}-${d.f}`))),
    }
  }
}

// "Which shape is it?" with the grip or the arpeggio box of a random key.
function whichShapeQuiz(qualities = ['major']) {
  const nextShape = bag(CAGED_ORDER)
  return (i, prev) => {
    const shape = nextShape()
    const quality = pick(qualities)
    const key = pick(keysForShape(shape, 1, 10, quality === 'minor' ? MINOR_KEYS : undefined))
    const name = quality === 'minor' ? MINOR_KEY_NAME(key) : MAJOR_KEY_NAME(key)
    const g = cagedGrip(key, shape, quality, 1)
    return {
      shape, key: `which:${shape}:${quality}`,
      prompt: T(`Questo è un accordo di <strong>${name}</strong>. Con quale forma?`, `This is a <strong>${name}</strong> chord. Which shape?`),
      hint: T('Guarda su quale corda è la fondamentale più grave (R) e da che parte va la forma.', 'Look at which string holds the lowest root (R) and which way the shape goes.'),
      diagram: { from: Math.max(0, g.p - 2), to: g.p + 5, dots: coloured(g.dots), muted: g.muted, barre: g.barre, labels: 'degree', labelsAfter: 'degree', play: 'chord' },
      options: CAGED_ORDER.map(x => ({ label: x, ok: x === shape })),
      explain: T(`Forma di ${shape} di ${name}: ${SHAPE_TEXT[shape].it}.`, `${shape} shape of ${name}: ${SHAPE_TEXT[shape].en}.`),
    }
  }
}

// Full-neck view of the five shapes of a key.
function chainDiagram(key, quality = 'major') {
  const tones = TRIAD[quality]
  const shapes = shapesUpTheNeck(key, tones, 15)
  return {
    from: 0, to: 15, labels: 'degree',
    dots: chordToneDots(key, tones, 0, 15),
    boxes: shapes.map(x => ({ from: x.lo, to: x.hi, label: x.shape })),
  }
}

function chainFrames(key, quality = 'major') {
  const tones = TRIAD[quality]
  const all = chordToneDots(key, tones, 0, 15, { ghost: true })
  return shapesUpTheNeck(key, tones, 15).map(x => {
    const own = new Set(x.arp.dots.map(d => `${d.s}-${d.f}`))
    return {
      tab: `${x.shape} · ${x.p}`,
      caption: T(`<strong>Forma di ${x.shape}</strong>, tasti ${x.lo}–${x.hi}: ${SHAPE_TEXT[x.shape].it}.`,
        `<strong>${x.shape} shape</strong>, frets ${x.lo}–${x.hi}: ${SHAPE_TEXT[x.shape].en}.`),
      diagram: {
        from: 0, to: 15, labels: 'degree', play: 'updown',
        dots: [...all.filter(d => !own.has(`${d.s}-${d.f}`)), ...coloured(x.arp.dots)],
        boxes: [{ from: x.lo, to: x.hi, label: x.shape }],
      },
    }
  })
}

export default {
  id: 'caged',
  title: T('Il sistema CAGED', 'The CAGED system'),
  desc: T(
    'Le cinque forme degli accordi aperti, spostate lungo il manico: una per una, poi tutte collegate, in maggiore e in minore.',
    'The five open-chord shapes moved along the neck: one at a time, then all linked, in major and minor.'),
  steps: [
    {
      id: 'open',
      title: T('Cinque accordi aperti', 'Five open chords'),
      blocks: [
        P('Ogni chitarrista comincia dagli accordi aperti. Cinque di loro, <strong>C, A, G, E e D</strong>, nascondono la mappa dell\'intero manico: ognuno è una forma che puoi spostare verso il corpo della chitarra, usando l\'indice al posto del capotasto. Da qui il nome CAGED.',
          'Every guitarist starts with the open chords. Five of them, <strong>C, A, G, E and D</strong>, hide the map of the whole neck: each is a shape you can move towards the body of the guitar, using the index finger in place of the nut. Hence the name CAGED.'),
        { type: 'frames', frames: CAGED_ORDER.map(shape => ({
          tab: shape,
          caption: T(`<strong>${shape}</strong>: ${SHAPE_TEXT[shape].it}.`, `<strong>${shape}</strong>: ${SHAPE_TEXT[shape].en}.`),
          diagram: gripDiagram(shape, shape, 'major', 0),
        })) },
        { type: 'tip', label: T('Guarda i pallini rossi (R):', 'Look at the red dots (R):'),
          it: 'la corda su cui sta la fondamentale è la chiave per ritrovare ogni forma in qualsiasi tonalità. Con il selettore Gradi / Note / Dita cambi cosa mostrano i pallini.',
          en: 'the string that holds the root is the key to finding each shape in any key. Use the Degrees / Notes / Fingers switch to change what the dots show.' },
        { type: 'quiz', title: T('Che accordo aperto è?', 'Which open chord is it?'), need: 5,
          make: (i, prev) => {
            const shape = pickNew(CAGED_ORDER, prev?.shape)
            return {
              shape, key: `open:${shape}`,
              prompt: T('Che accordo aperto è questo?', 'Which open chord is this?'),
              diagram: { ...gripDiagram(shape, shape, 'major', 0), labels: 'finger', labelsAfter: 'note' },
              options: CAGED_ORDER.map(x => ({ label: x, ok: x === shape })),
            }
          } },
      ],
    },

    {
      id: 'e-shape',
      title: T('La forma di E: fondamentale sulla 6ª corda', 'The E shape: root on the 6th string'),
      blocks: [
        P('Suona E aperto (0-2-2-1-0-0). Ora immagina di spostarlo di un tasto: le corde a vuoto dovrebbero salire anche loro, quindi l\'<strong>indice fa un barré</strong> e prende il posto del capotasto. Le altre dita tengono la forma di E, un tasto più in là. Con il barré al 1° tasto suoni F, al 3° G, al 5° A, all\'8° C.',
          'Play open E (0-2-2-1-0-0). Now imagine moving it up one fret: the open strings would have to move as well, so the <strong>index finger makes a barre</strong> and takes the place of the nut. The other fingers keep the E shape, one fret further. With the barre at the 1st fret you play F, at the 3rd G, at the 5th A, at the 8th C.'),
        { type: 'frames', frames: shapeFrames('E', ['F', 'G', 'A', 'C']) },
        { type: 'list',
          it: [
            ['Fondamentali (R):', '6ª corda e 1ª corda sotto il barré, 4ª corda col mignolo. Il nome dell\'accordo è la nota della 6ª corda.'],
            ['Terza (3):', 'sulla 3ª corda, un tasto dopo il barré (medio).'],
            ['Quinte (5):', 'sulla 5ª corda (anulare) e sulla 2ª (barré).'],
          ],
          en: [
            ['Roots (R):', '6th and 1st strings under the barre, 4th string with the little finger. The chord is named after the 6th-string note.'],
            ['Third (3):', 'on the 3rd string, one fret after the barre (middle finger).'],
            ['Fifths (5):', 'on the 5th string (ring finger) and the 2nd (barre).'],
          ] },
        { type: 'find', title: T('Costruisci la forma di E', 'Build the E shape'), rounds: 4, make: buildShapeTask(['E']) },
      ],
    },

    {
      id: 'a-shape',
      title: T('La forma di A: fondamentale sulla 5ª corda', 'The A shape: root on the 5th string'),
      blocks: [
        P('A aperto (x-0-2-2-2-0) spostato in su: l\'indice fa il barré sulla 5ª corda e sulla 1ª, le tre note in mezzo stanno due tasti più avanti (con l\'anulare a barré o con tre dita). La 6ª corda non si suona. Fondamentale sulla 5ª corda: B♭ al 1° tasto, C al 3°, D al 5°, E al 7°.',
          'Open A (x-0-2-2-2-0) moved up: the index finger bars the 5th and 1st strings, the three notes in between sit two frets further (with a ring-finger barre or three fingers). The 6th string is not played. Root on the 5th string: B♭ at the 1st fret, C at the 3rd, D at the 5th, E at the 7th.'),
        { type: 'frames', frames: shapeFrames('A', ['Bb', 'C', 'D', 'E']) },
        { type: 'list',
          it: [
            ['Fondamentali (R):', '5ª corda sotto l\'indice e 3ª corda, due tasti più avanti.'],
            ['Terza (3):', 'sulla 2ª corda, due tasti dopo il barré: è la nota più acuta della forma che dice "maggiore".'],
            ['Quinte (5):', 'sulla 4ª corda e sulla 1ª (barré).'],
          ],
          en: [
            ['Roots (R):', '5th string under the index and 3rd string, two frets further.'],
            ['Third (3):', 'on the 2nd string, two frets after the barre: the highest note of the shape that says "major".'],
            ['Fifths (5):', 'on the 4th and 1st strings (barre).'],
          ] },
        { type: 'find', title: T('Costruisci la forma di A', 'Build the A shape'), rounds: 4, make: buildShapeTask(['A']) },
      ],
    },

    {
      id: 'c-shape',
      title: T('La forma di C', 'The C shape'),
      blocks: [
        P('In C aperto (x-3-2-0-1-0) la fondamentale è sulla 5ª corda sotto l\'anulare e sulla 2ª sotto l\'indice. Spostata in su, l\'indice fa un barré parziale dove c\'era il capotasto: la forma di C di D è x-5-4-2-3-2. Come accordo pieno è scomoda; si usa soprattutto sulle corde acute e come zona per l\'arpeggio.',
          'In open C (x-3-2-0-1-0) the root is on the 5th string under the ring finger and on the 2nd under the index. Moved up, the index makes a partial barre where the nut was: the C shape of D is x-5-4-2-3-2. As a full chord it is a stretch; it is used mostly on the top strings and as an area for the arpeggio.'),
        { type: 'frames', frames: shapeFrames('C', ['D', 'E', 'G']) },
        { type: 'list',
          it: [
            ['Fondamentali (R):', '5ª corda col mignolo (o anulare) e 2ª corda col medio.'],
            ['Terze (3):', 'sulla 4ª corda e sulla 1ª.'],
            ['Quinta (5):', 'sulla 3ª corda, sotto il barré.'],
          ],
          en: [
            ['Roots (R):', '5th string with the little (or ring) finger and 2nd string with the middle finger.'],
            ['Thirds (3):', 'on the 4th and 1st strings.'],
            ['Fifth (5):', 'on the 3rd string, under the barre.'],
          ] },
        { type: 'tip', label: T('Stessa corda, due forme:', 'Same string, two shapes:'),
          it: 'nella forma di A la fondamentale sulla 5ª corda è sotto l\'indice e la forma va verso il corpo; nella forma di C è sotto il mignolo e la forma va verso il capotasto. La stessa nota genera due forme vicine.',
          en: 'in the A shape the root on the 5th string is under the index and the shape goes towards the body; in the C shape it is under the little finger and the shape goes towards the nut. The same note gives two neighbouring shapes.' },
        { type: 'find', title: T('Costruisci la forma di C', 'Build the C shape'), rounds: 4, make: buildShapeTask(['C']) },
      ],
    },

    {
      id: 'g-shape',
      title: T('La forma di G', 'The G shape'),
      blocks: [
        P('G aperto (3-2-0-0-0-3) ha la fondamentale sulla 6ª corda, sulla 3ª (a vuoto) e sulla 1ª. Spostata in su, l\'indice fa il barré sulle corde 4-3-2 dove c\'era il capotasto: A con la forma di G è 5-4-2-2-2-5. Come la forma di C si suona raramente intera: se ne usano pezzi (le tre corde gravi, o le tre acute) e l\'arpeggio.',
          'Open G (3-2-0-0-0-3) has the root on the 6th string, on the 3rd (open) and on the 1st. Moved up, the index bars strings 4-3-2 where the nut was: A with the G shape is 5-4-2-2-2-5. Like the C shape it is rarely played whole: you use parts of it (the three low strings, or the three high ones) and the arpeggio.'),
        { type: 'frames', frames: shapeFrames('G', ['A', 'Bb', 'C']) },
        { type: 'list',
          it: [
            ['Fondamentali (R):', '6ª corda (anulare), 3ª corda (barré) e 1ª corda (mignolo).'],
            ['Terze (3):', 'sulla 5ª corda e sulla 2ª (barré).'],
            ['Quinta (5):', 'sulla 4ª corda (barré).'],
          ],
          en: [
            ['Roots (R):', '6th string (ring finger), 3rd string (barre) and 1st string (little finger).'],
            ['Thirds (3):', 'on the 5th string and on the 2nd (barre).'],
            ['Fifth (5):', 'on the 4th string (barre).'],
          ] },
        { type: 'tip', label: T('Sulla 6ª corda, due forme:', 'On the 6th string, two shapes:'),
          it: 'come per A e C sulla 5ª corda: nella forma di E la fondamentale sta sotto l\'indice e la forma va verso il corpo, nella forma di G sotto l\'anulare e la forma va verso il capotasto.',
          en: 'as with A and C on the 5th string: in the E shape the root is under the index and the shape goes towards the body, in the G shape it is under the ring finger and the shape goes towards the nut.' },
        { type: 'find', title: T('Costruisci la forma di G', 'Build the G shape'), rounds: 4, make: buildShapeTask(['G']) },
      ],
    },

    {
      id: 'd-shape',
      title: T('La forma di D: fondamentale sulla 4ª corda', 'The D shape: root on the 4th string'),
      blocks: [
        P('D aperto (x-x-0-2-3-2) ha la fondamentale sulla 4ª corda a vuoto e sulla 2ª. Spostata in su, l\'indice va sulla 4ª corda: E con la forma di D è x-x-2-4-5-4. Usa solo quattro corde e ha un suono brillante: la 1ª corda porta la terza, ottima per le melodie.',
          'Open D (x-x-0-2-3-2) has the root on the open 4th string and on the 2nd. Moved up, the index goes on the 4th string: E with the D shape is x-x-2-4-5-4. It uses only four strings and sounds bright: the 1st string carries the third, great for melodies.'),
        { type: 'frames', frames: shapeFrames('D', ['E', 'F', 'G', 'A']) },
        { type: 'list',
          it: [
            ['Fondamentali (R):', '4ª corda (indice) e 2ª corda (mignolo).'],
            ['Terza (3):', 'sulla 1ª corda (anulare).'],
            ['Quinta (5):', 'sulla 3ª corda (medio).'],
          ],
          en: [
            ['Roots (R):', '4th string (index) and 2nd string (little finger).'],
            ['Third (3):', 'on the 1st string (ring finger).'],
            ['Fifth (5):', 'on the 3rd string (middle finger).'],
          ] },
        { type: 'find', title: T('Costruisci la forma di D', 'Build the D shape'), rounds: 4, make: buildShapeTask(['D']) },
      ],
    },

    {
      id: 'chain',
      title: T('Le forme si incastrano', 'The shapes lock together'),
      blocks: [
        P('Ecco l\'idea chiave. Prendi C maggiore e suona le sue cinque forme salendo: <strong>C</strong> (aperto) → <strong>A</strong> (3° tasto) → <strong>G</strong> (5°) → <strong>E</strong> (8°) → <strong>D</strong> (10°) → di nuovo <strong>C</strong> (12°). Ogni forma condivide delle note con la successiva: il bordo alto di una è il bordo basso dell\'altra. Insieme coprono tutto il manico.',
          'Here is the key idea. Take C major and play its five shapes going up: <strong>C</strong> (open) → <strong>A</strong> (3rd fret) → <strong>G</strong> (5th) → <strong>E</strong> (8th) → <strong>D</strong> (10th) → <strong>C</strong> again (12th). Each shape shares notes with the next: the top edge of one is the bottom edge of the other. Together they cover the whole neck.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'C',
          build: key => ({ ...chainDiagram(key), caption: T(`Tutte le note dell'accordo di ${pretty(key)} (R, 3, 5) fino al 15° tasto, con le cinque zone.`, `Every note of the ${pretty(key)} chord (R, 3, 5) up to the 15th fret, with the five areas.`) }) },
        P('Scorri le forme una per una: la zona evidenziata è la forma, i pallini spenti sono le stesse note nelle forme vicine. Ascolta l\'arpeggio di ogni forma.',
          'Go through the shapes one by one: the highlighted area is the shape, the faded dots are the same notes in the neighbouring shapes. Listen to the arpeggio of each shape.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => chainFrames(key) },
        { type: 'tip', label: T('L\'ordine non cambia mai:', 'The order never changes:'),
          it: 'C-A-G-E-D-C-A-G… Da una tonalità all\'altra cambia solo la forma da cui parti. In G: E al 3° tasto → D al 5° → C al 7° → A al 10° → G al 12° (e G aperto).',
          en: 'C-A-G-E-D-C-A-G… From key to key only the starting shape changes. In G: E at the 3rd fret → D at the 5th → C at the 7th → A at the 10th → G at the 12th (and open G).' },
        { type: 'quiz', title: T('Quale forma viene dopo?', 'Which shape comes next?'), need: 5,
          make: (i, prev) => {
            const k = pickNew([0, 1, 2, 3, 4], prev?.k)
            const shape = CAGED_ORDER[k], next = CAGED_ORDER[(k + 1) % 5]
            return {
              k, key: `next:${shape}`,
              prompt: T(`Salendo lungo il manico, quale forma viene dopo la <strong>forma di ${shape}</strong>?`, `Going up the neck, which shape comes after the <strong>${shape} shape</strong>?`),
              options: CAGED_ORDER.filter(x => x !== shape).map(x => ({ label: x, ok: x === next })),
            }
          } },
      ],
    },

    {
      id: 'find-shape',
      title: T('Trovare una forma in qualsiasi tonalità', 'Finding a shape in any key'),
      blocks: [
        P('Il metodo è sempre lo stesso: <strong>1.</strong> trova la fondamentale sulla corda giusta per quella forma; <strong>2.</strong> metti la forma attorno alla fondamentale, nella direzione giusta.',
          'The method is always the same: <strong>1.</strong> find the root on the right string for that shape; <strong>2.</strong> place the shape around the root, in the right direction.'),
        { type: 'table',
          head: T(['Forma', 'Fondamentale più grave', 'La forma va…'], ['Shape', 'Lowest root', 'The shape goes…']),
          rows: T([
            ['E', '6ª corda, indice', 'verso il corpo'],
            ['G', '6ª corda, anulare', 'verso il capotasto'],
            ['A', '5ª corda, indice', 'verso il corpo'],
            ['C', '5ª corda, mignolo', 'verso il capotasto'],
            ['D', '4ª corda, indice', 'verso il corpo'],
          ], [
            ['E', '6th string, index', 'towards the body'],
            ['G', '6th string, ring finger', 'towards the nut'],
            ['A', '5th string, index', 'towards the body'],
            ['C', '5th string, little finger', 'towards the nut'],
            ['D', '4th string, index', 'towards the body'],
          ]) },
        P('Esempio: la forma di G di B♭. B♭ sulla 6ª corda è al 6° tasto; la forma di G va verso il capotasto, quindi occupa i tasti 3–6 (barré al 3°).',
          'Example: the G shape of B♭. B♭ on the 6th string is at the 6th fret; the G shape goes towards the nut, so it takes frets 3–6 (barre at the 3rd).'),
        { type: 'diagram', ...gripDiagram('Bb', 'G', 'major', 1), caption: T('B♭ con la forma di G: fondamentale sulla 6ª corda al 6° tasto, barré al 3°.', 'B♭ with the G shape: root on the 6th string at the 6th fret, barre at the 3rd.') },
        { type: 'find', title: T('Forme in ogni tonalità', 'Shapes in every key'), rounds: 6, make: buildShapeTask(CAGED_ORDER) },
      ],
    },

    {
      id: 'minor',
      title: T('Le forme minori', 'The minor shapes'),
      blocks: [
        P('Ogni forma ha la sua versione minore: basta <strong>abbassare la terza di un tasto</strong> (3 → b3). Em (0-2-2-0-0-0), Am (x-0-2-2-1-0) e Dm (x-x-0-2-3-1) li conosci già come accordi aperti. Le forme minori di C e di G esistono, ma come accordo pieno sono scomode: si suonano in parte o come arpeggio.',
          'Every shape has a minor version: just <strong>lower the third by one fret</strong> (3 → b3). Em (0-2-2-0-0-0), Am (x-0-2-2-1-0) and Dm (x-x-0-2-3-1) you already know as open chords. The minor C and G shapes exist, but as full chords they are awkward: you play them in part or as arpeggios.'),
        { type: 'frames', frames: [['E', 'A'], ['A', 'D'], ['D', 'E'], ['C', 'D'], ['G', 'A']].map(([shape, key]) => {
          const minor = cagedGrip(key, shape, 'minor', 1)
          const b3Strings = new Set(minor.dots.filter(d => d.semi === 3).map(d => d.s))
          const major3 = cagedGrip(key, shape, 'major', 1).dots
            .filter(d => d.semi === 4 && b3Strings.has(d.s))
            .map(d => ({ ...d, hollow: true, color: colorOf(4), noPlay: true }))
          return {
            tab: `${shape}m`,
            caption: T(`${pretty(key)}m con la forma di ${shape} minore. Il cerchio vuoto è dove stava la terza maggiore.`, `${pretty(key)}m with the minor ${shape} shape. The empty circle is where the major third was.`),
            diagram: { from: Math.max(0, minor.p - 1), to: minor.p + 4, dots: [...coloured(minor.dots), ...major3], muted: minor.muted, barre: minor.barre, labels: 'degree', play: 'chord' },
          }
        }) },
        { type: 'tip', label: T('Stesso ordine:', 'Same order:'),
          it: 'in A minore: forma di E al 5° tasto → D al 7° → C al 9° → A al 12° → G al 14° (e al 2°).',
          en: 'in A minor: E shape at the 5th fret → D at the 7th → C at the 9th → A at the 12th → G at the 14th (and at the 2nd).' },
        { type: 'frames', keys: MINOR_KEYS, defaultKey: 'A', build: key => chainFrames(key, 'minor') },
        { type: 'find', title: T('Costruisci le forme minori', 'Build the minor shapes'), rounds: 5, make: buildShapeTask(['E', 'A', 'D', 'C'], 'minor') },
      ],
    },

    {
      id: 'recognize',
      title: T('Riconosci la forma', 'Recognise the shape'),
      blocks: [
        P('Ripasso finale: ti viene mostrato un accordo in una tonalità a caso, maggiore o minore. Riconosci la forma guardando dove stanno le fondamentali e da che parte si sviluppa la forma.',
          'Final review: you are shown a chord in a random key, major or minor. Recognise the shape by looking at where the roots are and which way the shape develops.'),
        { type: 'quiz', title: T('Che forma è?', 'Which shape is it?'), need: 8, make: whichShapeQuiz(['major', 'major', 'minor']) },
        { type: 'practice', to: '/explorer', it: 'Esplora: Explorer con il menu "Forma CAGED" nella barra laterale', en: 'Explore: the Explorer with the "CAGED shape" menu in the sidebar' },
        { type: 'practice', to: '/triad-trainer', it: 'Continua con: Triadi e Rivolti', en: 'Go on with: Triads and Inversions' },
      ],
    },
  ],
}
