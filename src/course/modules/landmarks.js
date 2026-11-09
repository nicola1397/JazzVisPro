// Module — Landmarks: a few fixed points known by heart (the fret markers, the columns
// that climb by fourths), every other note one or two frets away, and timed drills that
// make them automatic.

import { pcAt, mod12, neutralName, pretty, positionsOf, pick, bag, isNatural } from '../theory.js'
import { T, plainDot, stringDots, spelled, strIt, strEn, ordIt, ordEn, NATURAL_PCS, ACCIDENTAL_PCS, RED, AMBER, IVORY, noteKeyboard, mix } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })
const MARKERS = [0, 3, 5, 7, 9, 12]
const STRINGS = [5, 4, 3, 2, 1, 0]                   // from the 6th string to the 1st
const colNames = f => STRINGS.map(s => pretty(neutralName(pcAt(s, f))).replace('/', ' / '))

// "Which note is at fret f of string s?", with the spot lit on the neck.
function noteAtFret(cells, { window = [0, 12] } = {}) {
  const next = bag(cells)
  return () => {
    const [s, f] = next()
    const pc = pcAt(s, f)
    return {
      key: `fret:${s}:${f}`,
      prompt: T(`${ordIt(s + 1)} corda, <strong>${f}° tasto</strong>: che nota è?`, `${ordEn(s + 1)} string, <strong>fret ${f}</strong>: which note?`),
      review: T(`${ordIt(s + 1)} corda, ${f}° tasto = <strong>${pretty(neutralName(pc))}</strong>`, `${ordEn(s + 1)} string, fret ${f} = <strong>${pretty(neutralName(pc))}</strong>`),
      diagram: { from: window[0], to: window[1], focus: [s], labels: 'none', dots: [{ s, f, color: AMBER, label: '' }] },
      ...noteKeyboard(pc),
    }
  }
}

const cells = (strings, frets) => strings.flatMap(s => frets.map(f => [s, f]))

// Column rule: the note on the 6th string is given, name the one above it on the same fret.
function columnDrill() {
  const next = bag(cells([4, 3, 2, 1, 0], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
  return () => {
    const [s, f] = next()
    const base = pcAt(5, f), pc = pcAt(s, f)
    return {
      key: `column:${s}`,
      prompt: T(`${f === 8 || f === 11 ? 'All\'' : 'Al '}${f}° tasto la 6ª corda è <strong>${pretty(neutralName(base))}</strong>: che nota c'è sulla ${strIt(s)}?`,
        `At fret ${f} the 6th string is <strong>${pretty(neutralName(base))}</strong>: which note is on the ${strEn(s)}?`),
      review: T(`${f}° tasto: 6ª ${pretty(neutralName(base))} → ${ordIt(s + 1)} <strong>${pretty(neutralName(pc))}</strong>`,
        `fret ${f}: 6th ${pretty(neutralName(base))} → ${ordEn(s + 1)} <strong>${pretty(neutralName(pc))}</strong>`),
      diagram: { from: Math.max(0, f - 3), to: Math.min(15, f + 3), focus: [5, s], labels: 'none',
        dots: [plainDot(5, f, { label: pretty(neutralName(base)).replace('/', '/'), color: IVORY }), { s, f, color: AMBER, label: '' }] },
      ...noteKeyboard(pc),
    }
  }
}

// Find a note on a string by clicking it (or playing it), starting from the nearest marker.
export function findNoteDrill(strings = [5, 4, 3, 2, 1, 0]) {
  const nextPc = bag([...NATURAL_PCS, ...NATURAL_PCS, ...ACCIDENTAL_PCS])
  return () => {
    const s = pick(strings)
    const pc = nextPc()
    const name = spelled(pc)
    return {
      key: `find:${s}:${pc}`,
      prompt: T(`Trova <strong>${pretty(name)}</strong> sulla ${strIt(s)}`, `Find <strong>${pretty(name)}</strong> on the ${strEn(s)}`),
      review: T(`<strong>${pretty(name)}</strong> sulla ${strIt(s)}`, `<strong>${pretty(name)}</strong> on the ${strEn(s)}`),
      click: { from: 0, to: 12, focus: [s], labels: 'note', targets: positionsOf(pc, 0, 12, [s]).map(({ s, f }) => plainDot(s, f, { color: AMBER, label: pretty(name) })) },
    }
  }
}

export const markerDrill = noteAtFret(cells(STRINGS, MARKERS.filter(f => f > 0)))
export const anyFretDrill = noteAtFret(cells(STRINGS, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))

export default {
  id: 'landmarks',
  title: T('Punti di riferimento', 'Landmarks'),
  desc: T(
    'Pochi punti fissi da sapere a memoria (i pallini, le colonne che salgono per quarte) e ogni altra nota a un tasto di distanza, con esercizi a tempo che rendono tutto automatico.',
    'A few fixed points known by heart (the fret markers, the columns that climb in fourths) and every other note one fret away, with timed drills that make it all automatic.'),
  steps: [
    {
      id: 'principle',
      title: T('Ogni tasto è vicino a un pallino', 'Every fret is next to a marker'),
      blocks: [
        P('Chi conosce bene il manico non ha imparato 78 posizioni una per una: sa a memoria pochi punti fissi e arriva a tutto il resto con un passo. Sulla chitarra i punti fissi ci sono già: il capotasto e i pallini, ai tasti <strong>3, 5, 7, 9 e 12</strong>.',
          'Players who know the neck well did not learn 78 positions one by one: they know a few fixed points by heart and reach everything else with one step. On the guitar the fixed points are already there: the nut and the markers, at frets <strong>3, 5, 7, 9 and 12</strong>.'),
        P('Guarda la 6ª corda: ogni tasto senza segno sta proprio accanto a un pallino. L\'1 e il 2 accanto a 0 e 3, il 4 tra 3 e 5, il 6 tra 5 e 7, l\'8 tra 7 e 9, il 10 e l\'11 tra 9 e 12. <strong>Nessuna nota è a più di un tasto da un punto di riferimento.</strong>',
          'Look at the 6th string: every fret without a mark sits right next to a marker. 1 and 2 next to 0 and 3, 4 between 3 and 5, 6 between 5 and 7, 8 between 7 and 9, 10 and 11 between 9 and 12. <strong>No note is more than one fret from a landmark.</strong>'),
        { type: 'diagram', from: 0, to: 12, focus: [5], toggle: false, play: 'seq',
          dots: stringDots(5, 0, 12).map(d => (MARKERS.includes(d.f) ? { ...d, color: AMBER } : { ...d, ghost: true })),
          caption: T('6ª corda: le note dei punti di riferimento (E, G, A, B, C♯, E) e, spente, quelle accanto.', '6th string: the landmark notes (E, G, A, B, C♯, E) and, faded, the ones beside them.') },
        { type: 'list',
          it: [
            ['1. Impara i punti fissi:', 'le note dei pallini su ogni corda (i prossimi passi), finché le dici senza pensare.'],
            ['2. Poi un passo:', 'per ogni altra nota parti dal pallino più vicino: un tasto su è diesis, un tasto giù è bemolle.'],
            ['3. Ripeti a tempo:', 'pochi minuti al giorno. Quando rispondi senza contare, la conoscenza è diventata automatica.'],
          ],
          en: [
            ['1. Learn the fixed points:', 'the marker notes on every string (the next steps), until you say them without thinking.'],
            ['2. Then one step:', 'for any other note start from the nearest marker: one fret up is a sharp, one fret down a flat.'],
            ['3. Repeat against the clock:', 'a few minutes a day. When you answer without counting, the knowledge has become automatic.'],
          ] },
        { type: 'tip', label: T('Perché a tempo:', 'Why timed:'),
          it: 'rispondere in fretta costringe a ricordare invece di contare. All\'inizio contare va bene; l\'obiettivo è vedere il tasto e sapere il nome. Gli esercizi Lampo hanno tre livelli: bronzo per passare il passo, argento e oro per renderlo automatico. Le risposte sbagliate o lente tornano dopo poche domande. Rispondi anche con la tastiera del computer: C, D, E, F, G, A, B.',
          en: 'answering fast forces you to remember instead of counting. Counting is fine at first; the goal is to see the fret and know the name. The Flash drills have three levels: bronze to pass the step, silver and gold to make it automatic. Wrong or slow answers come back a few questions later. You can also answer with the computer keyboard: C, D, E, F, G, A, B.' },
        { type: 'speed', title: T('6ª e 5ª corda', '6th and 5th strings'), count: 15, levels: [5, 3, 2],
          make: noteAtFret(cells([5, 4], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])) },
      ],
    },

    {
      id: 'frets-5-7',
      title: T('I tasti 5 e 7: le corde a vuoto spostate', 'Frets 5 and 7: the open strings shifted'),
      blocks: [
        P('<strong>Il 5° tasto</strong> di ogni corda suona come la corda a vuoto più acuta accanto: è il modo classico di accordare. Dalla 6ª alla 1ª: <strong>A, D, G, C, E, A</strong>. Due eccezioni: la 3ª corda dà C e non B, per lo scarto della corda di B; e la 1ª, che non ha corde sopra, fa come la 6ª: A.',
          '<strong>Fret 5</strong> of each string sounds like the next higher open string: the classic way to tune. From the 6th to the 1st: <strong>A, D, G, C, E, A</strong>. Two exceptions: the 3rd string gives C, not B, because of the B-string gap; and the 1st, with no string above, does as the 6th: A.'),
        P('<strong>Il 7° tasto</strong> fa il contrario: ogni corda dice il nome della corda a vuoto più grave accanto. La 5ª dà E, la 4ª A, la 3ª D, la 1ª B. Eccezioni: la 2ª dà F♯ (ancora la corda di B) e la 6ª, che non ha corde sotto, fa come la 1ª: B. Dalla 6ª alla 1ª: <strong>B, E, A, D, F♯, B</strong>.',
          '<strong>Fret 7</strong> does the opposite: each string says the name of the next lower open string. The 5th gives E, the 4th A, the 3rd D, the 1st B. Exceptions: the 2nd gives F♯ (the B string again) and the 6th, with no string below, does as the 1st: B. From the 6th to the 1st: <strong>B, E, A, D, F♯, B</strong>.'),
        { type: 'table',
          head: T(['Tasto', '6ª', '5ª', '4ª', '3ª', '2ª', '1ª'], ['Fret', '6th', '5th', '4th', '3rd', '2nd', '1st']),
          rows: T([0, 5, 7, 12].map(f => [String(f), ...colNames(f)]), [0, 5, 7, 12].map(f => [String(f), ...colNames(f)])) },
        { type: 'diagram', from: 0, to: 12, toggle: false,
          dots: STRINGS.flatMap(s => [plainDot(s, 0, { color: IVORY }), plainDot(s, 5, { color: AMBER }), plainDot(s, 7, { color: '#ff8c1a' }), plainDot(s, 12, { color: IVORY })]),
          caption: T('Corde a vuoto e 12° tasto (chiari), 5° tasto (giallo), 7° tasto (arancio).', 'Open strings and fret 12 (light), fret 5 (yellow), fret 7 (orange).') },
        { type: 'speed', title: T('Tasti 5 e 7', 'Frets 5 and 7'), count: 12, levels: [5, 3, 2],
          make: noteAtFret(cells(STRINGS, [5, 7])) },
      ],
    },

    {
      id: 'fourths',
      title: T('Le colonne salgono per quarte', 'Columns climb in fourths'),
      blocks: [
        P('Una regola vale per ogni tasto: passando a una corda più acuta, allo stesso tasto, la nota sale di una <strong>quarta</strong>. Tranne tra 3ª e 2ª corda, dove sale di una terza maggiore. Basta conoscere la nota della 6ª corda per leggere tutta la colonna.',
          'One rule works on every fret: moving to a higher string, on the same fret, the note goes up a <strong>fourth</strong>. Except between the 3rd and 2nd strings, where it goes up a major third. Knowing the 6th-string note is enough to read the whole column.'),
        { type: 'list',
          it: [
            ['3° tasto:', 'G → C → F → B♭, poi D (la corda di B), poi G.'],
            ['8° tasto:', 'C → F → B♭ → E♭, poi G, poi C.'],
            ['10° tasto:', 'D → G → C → F, poi A, poi D.'],
            ['1° tasto:', 'F → B♭ → E♭ → A♭, poi C, poi F.'],
          ],
          en: [
            ['Fret 3:', 'G → C → F → B♭, then D (the B string), then G.'],
            ['Fret 8:', 'C → F → B♭ → E♭, then G, then C.'],
            ['Fret 10:', 'D → G → C → F, then A, then D.'],
            ['Fret 1:', 'F → B♭ → E♭ → A♭, then C, then F.'],
          ] },
        { type: 'frames', frames: [3, 8, 10, 1].map(f => ({
          tab: T(`${f}° tasto`, `Fret ${f}`),
          caption: T(`La colonna del ${f}° tasto, dalla 6ª alla 1ª corda: ${colNames(f).join(' · ')}.`, `The fret ${f} column, from the 6th to the 1st string: ${colNames(f).join(' · ')}.`),
          diagram: { from: Math.max(0, f - 2), to: f + 2, toggle: false, play: 'seq', dots: STRINGS.map(s => plainDot(s, f, { color: s === 1 ? '#ff8c1a' : AMBER })) },
        })) },
        { type: 'tip', label: T('La catena delle quarte:', 'The chain of fourths:'),
          it: 'C – F – B♭ – E♭ – A♭ – D♭ – G♭ – B – E – A – D – G. È lo stesso ordine in cui cambiano tonalità molti brani jazz (II-V-I che scendono per quarte). Dilla ad alta voce finché scorre: ti serve qui e in armonia.',
          en: 'C – F – B♭ – E♭ – A♭ – D♭ – G♭ – B – E – A – D – G. It is the same order in which many jazz tunes change key (ii-V-Is moving in fourths). Say it aloud until it flows: you need it here and in harmony.' },
        { type: 'speed', title: T('Leggi la colonna', 'Read the column'), count: 12, levels: [8, 5, 3], make: columnDrill() },
      ],
    },

    {
      id: 'marker-notes',
      title: T('Tutti i pallini, tutte le corde', 'Every marker, every string'),
      blocks: [
        P('Mancano il 3° e il 9° tasto. Il <strong>3°</strong> l\'hai appena visto: G, C, F, B♭, D, G. Il <strong>9°</strong>: C♯, F♯, B, E, G♯, C♯ (tre tasti sotto il 12°, cioè una terza minore sotto le corde a vuoto). Il <strong>12°</strong> è come le corde a vuoto, un\'ottava sopra.',
          'Frets 3 and 9 are left. You just saw <strong>fret 3</strong>: G, C, F, B♭, D, G. <strong>Fret 9</strong>: C♯, F♯, B, E, G♯, C♯ (three frets below the 12th, a minor third below the open strings). <strong>Fret 12</strong> is like the open strings, an octave higher.'),
        { type: 'table',
          head: T(['Tasto', '6ª', '5ª', '4ª', '3ª', '2ª', '1ª'], ['Fret', '6th', '5th', '4th', '3rd', '2nd', '1st']),
          rows: T(MARKERS.map(f => [String(f), ...colNames(f)]), MARKERS.map(f => [String(f), ...colNames(f)])) },
        P('Dopo il 12° tutto si ripete: il 15° è come il 3°, il 17° come il 5°, il 19° come il 7°. Per una nota in alto, togli 12 e usa ciò che sai già.',
          'After the 12th everything repeats: the 15th is like the 3rd, the 17th like the 5th, the 19th like the 7th. For a note up high, take away 12 and use what you already know.'),
        { type: 'speed', title: T('Le note dei pallini', 'The marker notes'), count: 16, levels: [5, 3, 2], make: markerDrill },
        { type: 'speed', title: T('Sopra il 12° tasto', 'Above the 12th fret'), count: 10, levels: [6, 4, 2.5],
          make: noteAtFret(cells(STRINGS, [12, 13, 14, 15, 16, 17]), { window: [10, 17] }) },
      ],
    },

    {
      id: 'navigate',
      title: T('Dal pallino alla nota', 'From the marker to the note'),
      blocks: [
        P('Ora usa i punti di riferimento per arrivare a qualsiasi nota: scegli il pallino più vicino e fai un passo. F♯ sulla 4ª corda? Al 3° tasto della 4ª c\'è F: un tasto dopo, F♯ al 4°. E♭ sulla 2ª? Al 5° c\'è E: un tasto prima, E♭ al 4°.',
          'Now use the landmarks to reach any note: pick the nearest marker and take one step. F♯ on the 4th string? The 4th string has F at the 3rd fret: one fret on, F♯ at the 4th. E♭ on the 2nd? The 5th fret is E: one fret back, E♭ at the 4th.'),
        { type: 'speed', title: T('Note a caso, tutte le corde', 'Random notes, every string'), count: 12, levels: [6, 4, 2.5], guitar: true,
          tip: T('Puoi rispondere anche suonando: attiva "Suona con la chitarra".', 'You can also answer by playing: turn on "Play with the guitar".'),
          make: findNoteDrill() },
        { type: 'speed', title: T('Ogni tasto, ogni corda', 'Every fret, every string'), count: 16, levels: [6, 3.5, 2.2], make: anyFretDrill },
      ],
    },

    {
      id: 'photo',
      title: T('Fotografa il manico', 'Take a photo of the neck'),
      blocks: [
        P('Ora un esercizio di memoria visiva: alcune note restano accese per pochi secondi, poi si spengono e le ricostruisci a memoria. Allena a vedere le posizioni come un\'unica immagine invece che una alla volta: è così che il manico diventa una mappa.',
          'Now a visual memory exercise: some notes light up for a few seconds, then go out and you rebuild them from memory. It trains you to see the positions as one picture instead of one at a time: that is how the neck becomes a map.'),
        { type: 'tip', label: T('Come guardare:', 'How to look:'),
          it: 'non leggere le note una per una: cerca le coppie d\'ottava (6ª-4ª e 5ª-3ª due tasti avanti, 4ª-2ª e 3ª-1ª tre tasti avanti) e le corde gemelle (6ª e 1ª). Tre coppie sono più facili da ricordare di sei punti.',
          en: 'do not read the notes one by one: look for the octave pairs (6th-4th and 5th-3rd two frets on, 4th-2nd and 3rd-1st three frets on) and the twin strings (6th and 1st). Three pairs are easier to remember than six dots.' },
        { type: 'find', title: T('Tutte le posizioni, a memoria', 'Every position, from memory'), rounds: 6, flash: true,
          make: (() => {
            const nextPc = bag([...NATURAL_PCS, ...ACCIDENTAL_PCS])
            return i => {
              const pc = nextPc()
              const name = spelled(pc)
              return {
                key: `photo:${pc}`,
                prompt: T(`Memorizza tutte le <strong>${pretty(name)}</strong>, poi cliccale a memoria`, `Memorise every <strong>${pretty(name)}</strong>, then click them from memory`),
                hint: T('Cerca le coppie d\'ottava.', 'Look for the octave pairs.'),
                from: 0, to: 12, flash: Math.max(1500, 3600 - i * 400),
                targets: positionsOf(pc, 0, 12).map(({ s, f }) => plainDot(s, f, { color: RED, label: pretty(name) })),
              }
            }
          })() },
      ],
    },

    {
      id: 'review',
      title: T('Ripasso lampo', 'Flash review'),
      blocks: [
        P('Tutto insieme e mescolato: note dei pallini, colonne, note da trovare, tasti qualsiasi. Mescolare gli argomenti è più faticoso che ripeterne uno solo, ma è proprio questo che fissa la memoria a lungo termine.',
          'Everything together and mixed: marker notes, columns, notes to find, any fret. Mixing topics is harder than drilling one, but that is exactly what fixes long-term memory.'),
        { type: 'tip', label: T('La routine:', 'The routine:'),
          it: 'tre minuti al giorno di questo esercizio, finché l\'oro non diventa facile. Poi una volta a settimana per mantenerlo.',
          en: 'three minutes a day of this drill, until gold feels easy. Then once a week to keep it.' },
        { type: 'speed', title: T('Il manico, tutto mescolato', 'The neck, all mixed'), count: 20, levels: [5, 3, 2], guitar: true,
          make: mix([markerDrill, columnDrill(), findNoteDrill(), anyFretDrill]) },
        { type: 'practice', to: '/note-finder', it: 'Continua con: Trova la nota (prova la modalità Riferimento)', en: 'Go on with: Note Finder (try the Reference mode)' },
      ],
    },
  ],
}
