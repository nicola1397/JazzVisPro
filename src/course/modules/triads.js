// Module 5 — Triads on three adjacent strings: inversions along the neck and how they sit in CAGED.

import { mod12, keyPc, pick, pickNew, pretty, KEY_NAMES, TRIAD, triadsOnStrings, cagedArpeggio, shapePosition, CAGED } from '../theory.js'
import { T, coloured, chordToneDots, MINOR_KEYS } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })

const SETS = { top: [0, 1, 2], mid: [1, 2, 3], low: [2, 3, 4], bass: [3, 4, 5] }
const SET_LABEL = { top: '1-2-3', mid: '2-3-4', low: '3-4-5', bass: '4-5-6' }
const SET_NAMES = { top: 'G B e', mid: 'D G B', low: 'A D G', bass: 'E A D' }
const INV = {
  it: ['stato fondamentale', 'primo rivolto', 'secondo rivolto'],
  en: ['root position', 'first inversion', 'second inversion'],
}
const cap = x => x.charAt(0).toUpperCase() + x.slice(1)
const INV_SHORT = { it: ['Fond.', '1° riv.', '2° riv.'], en: ['Root', '1st inv.', '2nd inv.'] }
const ORDER = ['R-3-5', '3-5-R', '5-R-3']

const chordName = (key, quality) => `${pretty(key)}${quality === 'minor' ? 'm' : ''}`

// The triads of a key on one string set, between frets 0 and 15, with their area.
function voicings(key, quality, set) {
  return triadsOnStrings(key, quality, SETS[set], 0, 15).filter(v => Math.max(...v.frets) <= 15)
}

// Every chord tone on the string set, faded, behind the voicing shown.
function setBackground(key, quality, set) {
  const strings = new Set(SETS[set])
  return chordToneDots(key, TRIAD[quality], 0, 15, { ghost: true }).filter(d => strings.has(d.s))
}

function triadFrames(key, quality, set) {
  const bg = setBackground(key, quality, set)
  return voicings(key, quality, set).map(v => {
    const own = new Set(v.dots.map(d => `${d.s}-${d.f}`))
    const lo = Math.min(...v.frets), hi = Math.max(...v.frets)
    return {
      tab: T(`${INV_SHORT.it[v.inversion]} · ${lo}`, `${INV_SHORT.en[v.inversion]} · ${lo}`),
      caption: T(`${chordName(key, quality)}, ${INV.it[v.inversion]} sulle corde ${SET_LABEL[set]}: dal basso ${ORDER[v.inversion].replace('3', quality === 'minor' ? 'b3' : '3')}.`,
        `${chordName(key, quality)}, ${INV.en[v.inversion]} on strings ${SET_LABEL[set]}: from the bottom ${ORDER[v.inversion].replace('3', quality === 'minor' ? 'b3' : '3')}.`),
      diagram: { from: 0, to: 15, labels: 'degree', play: 'chord', focus: SETS[set],
        dots: [...bg.filter(d => !own.has(`${d.s}-${d.f}`)), ...coloured(v.dots)],
        boxes: [{ from: lo, to: hi, label: '' }] },
    }
  })
}

// Find an inversion on a string set; any octave of it counts.
function findTriadTask(sets, qualities) {
  return (i, prev) => {
    const set = pick(sets)
    const quality = pick(qualities)
    const key = pick(quality === 'minor' ? MINOR_KEYS : KEY_NAMES)
    const inv = pickNew([0, 1, 2], prev?.inv)
    const groups = voicings(key, quality, set).filter(v => v.inversion === inv).map(v => coloured(v.dots))
    return {
      inv, key: `triad:${set}:${quality}:${inv}`,
      prompt: T(`Trova <strong>${chordName(key, quality)}</strong> in <strong>${INV.it[inv]}</strong> sulle corde ${SET_LABEL[set]}`,
        `Find <strong>${chordName(key, quality)}</strong> in <strong>${INV.en[inv]}</strong> on strings ${SET_LABEL[set]}`),
      hint: T(`Dal basso: ${ORDER[inv]}. Va bene qualsiasi ottava.`, `From the bottom: ${ORDER[inv]}. Any octave is fine.`),
      from: 0, to: 15, labels: 'degree', focus: SETS[set],
      groups,
    }
  }
}

// "Which inversion is it?": a triad with its note names on three strings.
export function inversionQuiz() {
  return (i, prev) => {
    const set = pick(['top', 'mid', 'low'])
    const quality = pick(['major', 'major', 'minor'])
    const key = pick(quality === 'minor' ? MINOR_KEYS : KEY_NAMES)
    const vs = voicings(key, quality, set)
    const v = pickNew(vs, prev?.v, (x, y) => y && x.inversion === y.inversion)
    const lo = Math.min(...v.frets), hi = Math.max(...v.frets)
    return {
      v, key: `inv:${v.inversion}`,
      prompt: T(`Ecco <strong>${chordName(key, quality)}</strong> sulle corde ${SET_LABEL[set]}. Che rivolto è?`, `Here is <strong>${chordName(key, quality)}</strong> on strings ${SET_LABEL[set]}. Which inversion is it?`),
      hint: T('Trova la fondamentale: se è la nota più grave è lo stato fondamentale.', 'Find the root: if it is the lowest note, it is root position.'),
      diagram: { from: Math.max(0, lo - 2), to: Math.min(15, hi + 2), labels: 'note', labelsAfter: 'degree', play: 'chord', focus: SETS[set], dots: coloured(v.dots).map(d => ({ ...d, color: '#ede8df' })) },
      options: [0, 1, 2].map(k => ({ label: T(INV.it[k], INV.en[k]), ok: k === v.inversion })),
      review: T(`${chordName(key, quality)}: <strong>${INV.it[v.inversion]}</strong>`, `${chordName(key, quality)}: <strong>${INV.en[v.inversion]}</strong>`),
      explain: T(`Dal basso: ${v.dots.map(d => d.deg).join(' – ')}.`, `From the bottom: ${v.dots.map(d => d.deg).join(' – ')}.`),
    }
  }
}

export default {
  id: 'triads',
  title: T('Triadi sui gruppi di corde', 'Triads on string sets'),
  desc: T(
    'Tre note su tre corde vicine: i rivolti lungo il manico su ogni gruppo di corde, maggiori e minori, e il legame con il CAGED.',
    'Three notes on three adjacent strings: the inversions along the neck on every string set, major and minor, and the link with CAGED.'),
  steps: [
    {
      id: 'intro',
      title: T('Tre note, tre corde', 'Three notes, three strings'),
      blocks: [
        P('Una triade in posizione stretta usa tre corde vicine, una nota per corda. Con tre note ci sono tre ordini possibili, i <strong>rivolti</strong>: decide la nota più grave. Sono forme piccole e mobili, il cuore dell\'accompagnamento jazz e del chord-melody.',
          'A close-position triad uses three adjacent strings, one note per string. With three notes there are three possible orders, the <strong>inversions</strong>: the lowest note decides. They are small, movable shapes, the heart of jazz comping and chord-melody.'),
        { type: 'table',
          head: T(['Rivolto', 'Al basso', 'Dal basso all\'acuto'], ['Inversion', 'In the bass', 'From low to high']),
          rows: T([
            ['Stato fondamentale', 'fondamentale', 'R – 3 – 5'],
            ['Primo rivolto', 'terza', '3 – 5 – R'],
            ['Secondo rivolto', 'quinta', '5 – R – 3'],
          ], [
            ['Root position', 'root', 'R – 3 – 5'],
            ['First inversion', 'third', '3 – 5 – R'],
            ['Second inversion', 'fifth', '5 – R – 3'],
          ]) },
        P('Salendo lungo il manico su uno stesso gruppo di corde i rivolti si susseguono sempre nello stesso ordine: fondamentale → primo → secondo → fondamentale… Ogni volta la nota più acuta sale alla nota successiva dell\'accordo.',
          'Going up the neck on the same string set the inversions always follow the same order: root position → first → second → root position… Each time the top note climbs to the next chord tone.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'C',
          build: key => {
            const vs = voicings(key, 'major', 'top')
            return {
              from: 0, to: 15, labels: 'degree', play: 'chord', focus: SETS.top,
              dots: coloured(vs.flatMap(v => v.dots)),
              boxes: vs.map(v => ({ from: Math.min(...v.frets), to: Math.max(...v.frets), label: ['R', '1', '2'][v.inversion] })),
              caption: T(`${pretty(key)} sulle corde 1-2-3: R = stato fondamentale, 1 = primo rivolto, 2 = secondo rivolto.`, `${pretty(key)} on strings 1-2-3: R = root position, 1 = first inversion, 2 = second inversion.`),
            }
          } },
      ],
    },

    {
      id: 'top',
      title: T('Corde 1-2-3 (G B e)', 'Strings 1-2-3 (G B e)'),
      blocks: [
        P('Il gruppo più usato per accompagnare: suona chiaro sopra il basso e la batteria. Su queste corde c\'è il passaggio G → B, quindi le forme sono diverse da quelle sulle corde gravi. Scorri i rivolti e ascoltali.',
          'The most used set for comping: it sounds clear above bass and drums. These strings include the G → B crossing, so the shapes are different from those on the low strings. Go through the inversions and listen to them.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => triadFrames(key, 'major', 'top') },
        { type: 'find', title: T('Rivolti sulle corde 1-2-3', 'Inversions on strings 1-2-3'), rounds: 6, make: findTriadTask(['top'], ['major']) },
      ],
    },

    {
      id: 'mid',
      title: T('Corde 2-3-4 (D G B)', 'Strings 2-3-4 (D G B)'),
      blocks: [
        P('Un gruppo più in basso: suono più pieno, ottimo per le progressioni. Anche qui c\'è il passaggio G → B, tra la nota centrale e quella acuta. Confronta le forme con quelle delle corde 1-2-3.',
          'One set lower: a fuller sound, great for progressions. Here too there is the G → B crossing, between the middle and the top note. Compare the shapes with those on strings 1-2-3.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => triadFrames(key, 'major', 'mid') },
        { type: 'find', title: T('Rivolti sulle corde 2-3-4', 'Inversions on strings 2-3-4'), rounds: 6, make: findTriadTask(['mid'], ['major']) },
      ],
    },

    {
      id: 'low',
      title: T('Corde 3-4-5 e 4-5-6', 'Strings 3-4-5 and 4-5-6'),
      blocks: [
        P('Sulle corde gravi non c\'è la corda di B: le forme sulle corde 3-4-5 e 4-5-6 sono <strong>identiche</strong>, spostate di una corda (e di cinque tasti). Suonano più scure: usale con un tocco leggero o quando non c\'è il basso.',
          'On the low strings there is no B string: the shapes on strings 3-4-5 and 4-5-6 are <strong>identical</strong>, moved by one string (and five frets). They sound darker: use them with a light touch or when there is no bass player.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => triadFrames(key, 'major', 'low') },
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C', build: key => triadFrames(key, 'major', 'bass') },
        { type: 'find', title: T('Rivolti sulle corde gravi', 'Inversions on the low strings'), rounds: 6, make: findTriadTask(['low', 'bass'], ['major']) },
      ],
    },

    {
      id: 'minor',
      title: T('Le triadi minori', 'Minor triads'),
      blocks: [
        P('Per la triade minore abbassa la terza di un tasto: R – b3 – 5. I rivolti seguono lo stesso ordine lungo il manico. Su ogni forma maggiore che conosci, trova la terza e spostala indietro di un tasto: ecco la minore.',
          'For the minor triad lower the third by one fret: R – b3 – 5. The inversions follow the same order along the neck. On every major shape you know, find the third and move it back one fret: there is the minor one.'),
        { type: 'frames', keys: MINOR_KEYS, defaultKey: 'A', build: key => triadFrames(key, 'minor', 'top') },
        { type: 'frames', keys: MINOR_KEYS, defaultKey: 'A', build: key => triadFrames(key, 'minor', 'mid') },
        { type: 'find', title: T('Triadi minori', 'Minor triads'), rounds: 6, make: findTriadTask(['top', 'mid'], ['minor']) },
      ],
    },

    {
      id: 'caged',
      title: T('Le triadi dentro le forme CAGED', 'Triads inside the CAGED shapes'),
      blocks: [
        P('Ogni triade sulle corde acute è un pezzo di una forma CAGED. Sulle corde 1-2-3 in C (tasti dalla 3ª alla 1ª corda): lo <strong>stato fondamentale</strong> (5-5-3) è la parte alta della forma di A; il <strong>primo rivolto</strong> (9-8-8) è la parte alta della forma di E; il <strong>secondo rivolto</strong> (12-13-12, o 0-1-0) è la parte alta delle forme di D e di C.',
          'Every triad on the top strings is a piece of a CAGED shape. On strings 1-2-3 in C (frets from the 3rd to the 1st string): <strong>root position</strong> (5-5-3) is the top of the A shape; the <strong>first inversion</strong> (9-8-8) is the top of the E shape; the <strong>second inversion</strong> (12-13-12, or 0-1-0) is the top of the D and C shapes.'),
        { type: 'frames', keys: KEY_NAMES, defaultKey: 'C',
          build: key => {
            // Shapes whose top three strings hold each inversion (the second inversion is in both D and C).
            const inShape = { 0: ['A'], 1: ['E'], 2: ['D', 'C'] }
            return voicings(key, 'major', 'top').map(v => {
              const lo = Math.min(...v.frets), hi = Math.max(...v.frets)
              let found = null
              for (const shape of inShape[v.inversion]) {
                const [a, b] = CAGED[shape].box
                for (const p of [shapePosition(key, shape), shapePosition(key, shape) + 12]) {
                  if (!found && Math.max(0, p + a) <= lo && hi <= p + b) found = { shape, p, a, b }
                }
              }
              const own = new Set(v.dots.map(d => `${d.s}-${d.f}`))
              const arpDots = found ? cagedArpeggio(key, found.shape, TRIAD.major, found.p).dots.filter(d => !own.has(`${d.s}-${d.f}`)) : []
              const shape = found?.shape ?? inShape[v.inversion][0]
              return {
                tab: T(`${INV_SHORT.it[v.inversion]} · ${lo}`, `${INV_SHORT.en[v.inversion]} · ${lo}`),
                caption: T(`${cap(INV.it[v.inversion])} di ${pretty(key)}: le tre note acute della <strong>forma di ${shape}</strong> (spente le altre note della forma).`,
                  `${cap(INV.en[v.inversion])} of ${pretty(key)}: the top three notes of the <strong>${shape} shape</strong> (the other notes of the shape are faded).`),
                diagram: { from: 0, to: 15, labels: 'degree', play: 'chord',
                  dots: [...arpDots.map(d => ({ ...d, ghost: true, color: '#a39d92' })), ...coloured(v.dots)],
                  boxes: found ? [{ from: Math.max(0, found.p + found.a), to: found.p + found.b, label: shape }] : [] },
              }
            })
          } },
        { type: 'quiz', title: T('Che rivolto è?', 'Which inversion is it?'), need: 6, make: inversionQuiz() },
      ],
    },

    {
      id: 'speed',
      title: T('Rivolti lampo', 'Flash inversions'),
      blocks: [
        P('I rivolti a tempo, su tutti i gruppi di corde, maggiori e minori. Trova la fondamentale con gli occhi, non contando: è la nota che, sotto le dita, sai già chiamare.',
          'Inversions against the clock, on every string set, major and minor. Find the root with your eyes, not by counting: it is the note you can already name under your fingers.'),
        { type: 'speed', title: T('Che rivolto è?', 'Which inversion is it?'), count: 12, levels: [7, 4.5, 3], make: inversionQuiz() },
        { type: 'practice', to: '/triad-trainer', it: 'Continua con: Triadi e rivolti', en: 'Go on with: Triads and Inversions' },
        { type: 'practice', to: '/seventh-trainer', it: 'Poi: Settime e drop', en: 'Then: Sevenths and Drops' },
      ],
    },
  ],
}
