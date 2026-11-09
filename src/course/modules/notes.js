// Module 1 — Notes on the neck: from the musical alphabet to every note on every string.

import { pcAt, neutralName, pretty, positionsOf, pick, pickNew, bag, keyPc, KEY_NAMES } from '../theory.js'
import { T, plainDot, stringDots, spelled, strIt, strEn, NATURAL_PCS, ACCIDENTAL_PCS, RED, AMBER } from '../build.js'

const P = (it, en) => ({ type: 'p', it, en })
const nextNatural = bag(NATURAL_PCS)
const nextAccidental = bag(ACCIDENTAL_PCS)
const nextAny = bag([...NATURAL_PCS, ...ACCIDENTAL_PCS])

// Find a note on one string, frets 0–12 (open E/A also count at 12).
function findOnString(strings, pcs, { accidentals = false } = {}) {
  const nextPc = bag(pcs)
  return (i, prev) => {
    const s = pick(strings)
    const pc = nextPc()
    const name = accidentals ? spelled(pc) : neutralName(pc)
    return {
      pc,
      key: `find:${s}:${pc}`,
      prompt: T(`Trova <strong>${pretty(name)}</strong> sulla ${strIt(s)}`, `Find <strong>${pretty(name)}</strong> on the ${strEn(s)}`),
      from: 0, to: 12, focus: [s],
      targets: positionsOf(pc, 0, 12, [s]).map(({ s, f }) => plainDot(s, f)),
      mode: 'one',
    }
  }
}

// Octave of a given note: two strings up, two frets on (three across the B string).
function octaveTask(fromStrings) {
  return (i, prev) => {
    const s = pickNew(fromStrings, prev?.s)
    const shift = s === 3 || s === 2 ? 3 : 2
    const f = pick(Array.from({ length: 11 - shift }, (_, k) => k + 1))
    const pc = pcAt(s, f)
    const target = plainDot(s - 2, f + shift, { color: RED })
    return {
      s,
      key: `octave:${s}`,
      prompt: T(
        `Questa è <strong>${pretty(neutralName(pc))}</strong> sulla ${strIt(s)}: trova la sua ottava sulla ${strIt(s - 2)}`,
        `This is <strong>${pretty(neutralName(pc))}</strong> on the ${strEn(s)}: find its octave on the ${strEn(s - 2)}`),
      from: 0, to: 14, focus: [s, s - 2],
      dots: [plainDot(s, f, { color: RED })],
      targets: [target],
      mode: 'one',
    }
  }
}

export default {
  id: 'notes',
  title: T('Le note sul manico', 'Notes on the neck'),
  desc: T(
    'Dall\'alfabeto musicale a ogni nota su ogni corda: semitoni, corde di riferimento, ottave e la corda di B.',
    'From the musical alphabet to every note on every string: semitones, reference strings, octaves and the B string.'),
  steps: [
    {
      id: 'alphabet',
      title: T('Dodici suoni, sette nomi', 'Twelve sounds, seven names'),
      blocks: [
        P('In musica ci sono <strong>dodici suoni</strong> diversi prima che tutto si ripeta all\'ottava. Sette hanno un nome proprio, le <strong>note naturali</strong>: C D E F G A B. Gli altri cinque prendono il nome dalle note vicine, con il <strong>diesis</strong> (♯, un semitono sopra) o il <strong>bemolle</strong> (♭, un semitono sotto).',
          'In music there are <strong>twelve different sounds</strong> before everything repeats at the octave. Seven have a name of their own, the <strong>natural notes</strong>: C D E F G A B. The other five are named after their neighbours, with a <strong>sharp</strong> (♯, a semitone higher) or a <strong>flat</strong> (♭, a semitone lower).'),
        { type: 'table',
          head: T(['Italiano', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'], ['Italian', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']),
          rows: T([['Lettera', 'C', 'D', 'E', 'F', 'G', 'A', 'B']], [['Letter', 'C', 'D', 'E', 'F', 'G', 'A', 'B']]) },
        P('Nel jazz si usano le lettere: le trovi sulle sigle degli accordi (Dm7, G7, Cmaj7) e in tutta l\'app. Sulla chitarra <strong>un semitono è un tasto</strong>. Tra due note naturali vicine ci sono due tasti (un tono), tranne in due punti: <strong>E–F</strong> e <strong>B–C</strong> sono a un solo tasto, perché tra loro non c\'è nessuna nota.',
          'Jazz uses letters: you find them in chord symbols (Dm7, G7, Cmaj7) and throughout the app. On the guitar <strong>a semitone is one fret</strong>. Between two neighbouring natural notes there are two frets (a whole tone), except in two places: <strong>E–F</strong> and <strong>B–C</strong> are one fret apart, because there is no note between them.'),
        { type: 'diagram', from: 0, to: 12, focus: [5], play: 'seq', labels: 'note', toggle: false,
          dots: stringDots(5, 0, 12),
          caption: T('6ª corda, dal tasto 0 al 12: note naturali chiare, alterate scure. Ascolta i dodici semitoni.',
            '6th string, frets 0 to 12: natural notes light, sharps and flats dark. Listen to the twelve semitones.') },
        { type: 'tip', label: T('Da ricordare:', 'Remember:'),
          it: 'Mi–Fa e Si–Do sono gli unici semitoni tra note naturali. Tutte le altre coppie vicine (C–D, D–E, F–G, G–A, A–B) sono a due tasti.',
          en: 'E–F and B–C are the only semitones between natural notes. Every other neighbouring pair (C–D, D–E, F–G, G–A, A–B) is two frets apart.' },
        { type: 'quiz', title: T('Uno o due tasti?', 'One fret or two?'), need: 6,
          make: (i, prev) => {
            const pairs = [['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'G'], ['G', 'A'], ['A', 'B'], ['B', 'C']]
            const pool = Math.random() < 0.45 ? [['E', 'F'], ['B', 'C']] : pairs
            const [a, b] = pickNew(pool, prev?.pair, (x, y) => y && x[0] === y[0])
            const semi = (a === 'E' || a === 'B') ? 1 : 2
            return {
              pair: [a, b], key: `alphabet:${a}${b}`,
              prompt: T(`Quanti tasti ci sono da <strong>${a}</strong> a <strong>${b}</strong>?`, `How many frets from <strong>${a}</strong> to <strong>${b}</strong>?`),
              options: [
                { label: T('1 tasto (semitono)', '1 fret (semitone)'), ok: semi === 1 },
                { label: T('2 tasti (tono)', '2 frets (whole tone)'), ok: semi === 2 },
              ],
            }
          } },
      ],
    },

    {
      id: 'string6',
      title: T('La 6ª corda, il primo riferimento', 'The 6th string, your first landmark'),
      blocks: [
        P('La 6ª corda, la più grave, è il primo riferimento da imparare: qui si trova la fondamentale dei barré più usati. A vuoto suona <strong>E</strong>. Salendo con l\'alfabeto: <strong>F</strong> al 1° tasto, <strong>G</strong> al 3°, <strong>A</strong> al 5°, <strong>B</strong> al 7°, <strong>C</strong> all\'8°, <strong>D</strong> al 10° e di nuovo <strong>E</strong> al 12°.',
          'The 6th string, the lowest, is the first landmark to learn: the root of the most common barre chords sits here. Open it sounds <strong>E</strong>. Going up the alphabet: <strong>F</strong> at the 1st fret, <strong>G</strong> at the 3rd, <strong>A</strong> at the 5th, <strong>B</strong> at the 7th, <strong>C</strong> at the 8th, <strong>D</strong> at the 10th and <strong>E</strong> again at the 12th.'),
        { type: 'diagram', from: 0, to: 12, focus: [5], play: 'seq', toggle: false,
          dots: stringDots(5, 0, 12, { naturalsOnly: true }),
          caption: T('Le note naturali sulla 6ª corda. Al 12° tasto il giro ricomincia: il 13° è come il 1°, il 15° come il 3°.',
            'The natural notes on the 6th string. At the 12th fret the cycle starts again: the 13th is like the 1st, the 15th like the 3rd.') },
        { type: 'list',
          it: [
            ['Segni sul manico:', 'i pallini al 3°, 5°, 7° e 12° tasto sono G, A, B ed E. Partendo da lì trovi tutto il resto.'],
            ['Un tasto dopo B c\'è C:', '7° tasto B, 8° tasto C (B–C è un semitono).'],
            ['Un tasto dopo E c\'è F:', 'a vuoto E, 1° tasto F; e al 13° tasto ancora F.'],
          ],
          en: [
            ['Fret markers:', 'the dots at the 3rd, 5th, 7th and 12th frets are G, A, B and E. Start from there and find the rest.'],
            ['One fret after B comes C:', '7th fret B, 8th fret C (B–C is a semitone).'],
            ['One fret after E comes F:', 'open E, 1st fret F; and the 13th fret is F again.'],
          ] },
        { type: 'find', title: T('Note sulla 6ª corda', 'Notes on the 6th string'), rounds: 7,
          make: findOnString([5], NATURAL_PCS) },
      ],
    },

    {
      id: 'string5',
      title: T('La 5ª corda, il secondo riferimento', 'The 5th string, your second landmark'),
      blocks: [
        P('La 5ª corda suona <strong>A</strong> a vuoto: è la corda delle fondamentali nelle forme di A e di C. Le naturali: <strong>B</strong> al 2° tasto, <strong>C</strong> al 3°, <strong>D</strong> al 5°, <strong>E</strong> al 7°, <strong>F</strong> all\'8°, <strong>G</strong> al 10°, <strong>A</strong> al 12°.',
          'The 5th string sounds <strong>A</strong> when open: it carries the roots of the A and C shapes. The naturals: <strong>B</strong> at the 2nd fret, <strong>C</strong> at the 3rd, <strong>D</strong> at the 5th, <strong>E</strong> at the 7th, <strong>F</strong> at the 8th, <strong>G</strong> at the 10th, <strong>A</strong> at the 12th.'),
        { type: 'diagram', from: 0, to: 12, focus: [4, 5], play: 'seq', toggle: false,
          dots: [...stringDots(4, 0, 12, { naturalsOnly: true }), ...stringDots(5, 0, 12, { naturalsOnly: true })],
          caption: T('6ª e 5ª corda insieme: allo stesso tasto la 5ª corda è sempre una quarta sopra (G → C, A → D, B → E).',
            '6th and 5th strings together: on the same fret the 5th string is always a fourth higher (G → C, A → D, B → E).') },
        P('Un trucco per collegarle: <strong>allo stesso tasto</strong> la 5ª corda ha la nota che sta quattro lettere più avanti, contando anche quella di partenza (G-A-B-<strong>C</strong>): al 3° tasto G e C, al 5° A e D, al 7° B ed E, all\'8° C ed F. L\'unica eccezione è al 1° tasto: F sulla 6ª, B♭ sulla 5ª.',
          'A trick to link them: <strong>on the same fret</strong> the 5th string has the note four letters later, counting the starting one (G-A-B-<strong>C</strong>): at the 3rd fret G and C, at the 5th A and D, at the 7th B and E, at the 8th C and F. The only exception is the 1st fret: F on the 6th, B♭ on the 5th.'),
        // One guitar input per step: the second exercise below listens to the guitar.
        { type: 'find', title: T('Note sulla 5ª corda', 'Notes on the 5th string'), rounds: 6, guitar: false,
          make: findOnString([4], NATURAL_PCS) },
        { type: 'find', title: T('6ª o 5ª corda', '6th or 5th string'), rounds: 6,
          make: findOnString([4, 5], NATURAL_PCS) },
      ],
    },

    {
      id: 'accidentals',
      title: T('Diesis e bemolle', 'Sharps and flats'),
      blocks: [
        P('Il <strong>diesis</strong> alza una nota di un tasto, il <strong>bemolle</strong> la abbassa di un tasto. F♯ è il tasto dopo F, G♭ il tasto prima di G: è <strong>lo stesso tasto</strong>, lo stesso suono con due nomi (note enarmoniche). Il nome giusto dipende dalla tonalità: in D maggiore si scrive F♯, in D♭ maggiore G♭.',
          'A <strong>sharp</strong> raises a note by one fret, a <strong>flat</strong> lowers it by one fret. F♯ is the fret after F, G♭ the fret before G: it is <strong>the same fret</strong>, the same sound with two names (enharmonic notes). The right name depends on the key: in D major you write F♯, in D♭ major G♭.'),
        { type: 'diagram', from: 0, to: 12, focus: [4, 5], toggle: false,
          dots: [...stringDots(4, 0, 12), ...stringDots(5, 0, 12)],
          caption: T('Ogni tasto scuro ha due nomi: quello col diesis (dalla nota sotto) e quello col bemolle (dalla nota sopra).',
            'Every dark fret has two names: the sharp one (from the note below) and the flat one (from the note above).') },
        { type: 'tip', label: T('Attenzione a E e B:', 'Watch E and B:'),
          it: 'E♯ è lo stesso tasto di F e F♭ lo stesso di E; B♯ è C e C♭ è B. Esistono in alcune tonalità (F♯ maggiore contiene E♯), ma sul manico sono tasti che conosci già.',
          en: 'E♯ is the same fret as F and F♭ the same as E; B♯ is C and C♭ is B. They exist in some keys (F♯ major contains E♯), but on the neck they are frets you already know.' },
        { type: 'find', title: T('Note alterate', 'Sharps and flats'), rounds: 6,
          make: findOnString([4, 5], ACCIDENTAL_PCS, { accidentals: true }) },
      ],
    },

    {
      id: 'octave',
      title: T('L\'ottava: due corde sopra, due tasti avanti', 'The octave: two strings up, two frets on'),
      blocks: [
        P('L\'<strong>ottava</strong> è la stessa nota, più acuta. Sulla stessa corda sta 12 tasti più avanti, ma c\'è una strada più corta: dalla 6ª corda sali di <strong>due corde</strong> (alla 4ª) e avanza di <strong>due tasti</strong>. Lo stesso dalla 5ª alla 3ª corda.',
          'The <strong>octave</strong> is the same note, higher. On the same string it is 12 frets further, but there is a shorter way: from the 6th string go up <strong>two strings</strong> (to the 4th) and forward <strong>two frets</strong>. The same from the 5th to the 3rd string.'),
        { type: 'frames', frames: [
          { tab: 'G', caption: T('G sulla 6ª corda (3° tasto) → G sulla 4ª corda (5° tasto).', 'G on the 6th string (3rd fret) → G on the 4th string (5th fret).'),
            diagram: { from: 0, to: 9, focus: [5, 3], play: 'seq', toggle: false, dots: [plainDot(5, 3, { color: RED }), plainDot(3, 5, { color: RED })] } },
          { tab: 'C', caption: T('C sulla 5ª corda (3° tasto) → C sulla 3ª corda (5° tasto).', 'C on the 5th string (3rd fret) → C on the 3rd string (5th fret).'),
            diagram: { from: 0, to: 9, focus: [4, 2], play: 'seq', toggle: false, dots: [plainDot(4, 3, { color: RED }), plainDot(2, 5, { color: RED })] } },
          { tab: 'A', caption: T('A sulla 6ª corda (5° tasto) → A sulla 4ª corda (7° tasto).', 'A on the 6th string (5th fret) → A on the 4th string (7th fret).'),
            diagram: { from: 0, to: 9, focus: [5, 3], play: 'seq', toggle: false, dots: [plainDot(5, 5, { color: RED }), plainDot(3, 7, { color: RED })] } },
        ] },
        P('Così, conoscendo le prime due corde, conosci anche la 4ª e la 3ª: ogni nota della 6ª si ritrova due corde sopra, due tasti avanti.',
          'So, knowing the first two strings, you also know the 4th and the 3rd: every note of the 6th string reappears two strings up, two frets on.'),
        { type: 'find', title: T('Trova l\'ottava', 'Find the octave'), rounds: 6, make: octaveTask([5, 4]) },
      ],
    },

    {
      id: 'b-string',
      title: T('La corda di B sposta tutto di un tasto', 'The B string moves everything one fret'),
      blocks: [
        P('Le corde sono accordate a distanza di quarta (5 semitoni): il 5° tasto di una corda è uguale alla corda a vuoto successiva. C\'è una sola eccezione: tra la 3ª corda (G) e la 2ª (B) c\'è una <strong>terza maggiore</strong> (4 semitoni), quindi lì l\'unisono è al 4° tasto.',
          'The strings are tuned a fourth apart (5 semitones): the 5th fret of a string equals the next open string. There is one exception: between the 3rd string (G) and the 2nd (B) there is a <strong>major third</strong> (4 semitones), so there the unison is at the 4th fret.'),
        { type: 'diagram', from: 0, to: 7, toggle: false,
          dots: [
            plainDot(5, 5, { color: AMBER }), plainDot(4, 0, { color: AMBER }),
            plainDot(4, 5, { color: '#3498db' }), plainDot(3, 0, { color: '#3498db' }),
            plainDot(3, 5, { color: AMBER }), plainDot(2, 0, { color: AMBER }),
            plainDot(2, 4, { color: '#e67e22' }), plainDot(1, 0, { color: '#e67e22' }),
            plainDot(1, 5, { color: '#3498db' }), plainDot(0, 0, { color: '#3498db' }),
          ],
          caption: T('Unisoni tra corde vicine: 5° tasto, tranne G → B al 4°. È anche il modo classico per accordare la chitarra.',
            'Unisons between neighbouring strings: 5th fret, except G → B at the 4th. It is also the classic way to tune the guitar.') },
        P('Conseguenza: ogni forma che attraversa il passaggio G → B si allunga di un tasto. L\'ottava dalla 4ª alla 2ª corda, e dalla 3ª alla 1ª, è <strong>due corde sopra e tre tasti avanti</strong>.',
          'Consequence: every shape that crosses from G to B stretches by one fret. The octave from the 4th to the 2nd string, and from the 3rd to the 1st, is <strong>two strings up and three frets on</strong>.'),
        { type: 'frames', frames: [
          { tab: '4 → 2', caption: T('E sulla 4ª corda (2° tasto) → E sulla 2ª corda (5° tasto): +3 tasti.', 'E on the 4th string (2nd fret) → E on the 2nd string (5th fret): +3 frets.'),
            diagram: { from: 0, to: 9, focus: [3, 1], play: 'seq', toggle: false, dots: [plainDot(3, 2, { color: RED }), plainDot(1, 5, { color: RED })] } },
          { tab: '3 → 1', caption: T('A sulla 3ª corda (2° tasto) → A sulla 1ª corda (5° tasto): +3 tasti.', 'A on the 3rd string (2nd fret) → A on the 1st string (5th fret): +3 frets.'),
            diagram: { from: 0, to: 9, focus: [2, 0], play: 'seq', toggle: false, dots: [plainDot(2, 2, { color: RED }), plainDot(0, 5, { color: RED })] } },
          { tab: '6 = 1', caption: T('La 1ª corda ha le stesse note della 6ª, due ottave sopra: G al 3° tasto su entrambe.', 'The 1st string has the same notes as the 6th, two octaves higher: G at the 3rd fret on both.'),
            diagram: { from: 0, to: 9, focus: [5, 0], play: 'seq', toggle: false, dots: [plainDot(5, 3, { color: RED }), plainDot(0, 3, { color: RED })] } },
        ] },
        { type: 'find', title: T('Ottave attraverso la corda di B', 'Octaves across the B string'), rounds: 6, make: octaveTask([3, 2]) },
      ],
    },

    {
      id: 'middle',
      title: T('Le corde centrali: D, G e B', 'The middle strings: D, G and B'),
      blocks: [
        P('Ora puoi dare un nome alle note delle altre corde, in due modi: contando dalla corda a vuoto (D, G, B) oppure per ottava da una corda che conosci già (6ª → 4ª, 5ª → 3ª, 4ª → 2ª). Usa il secondo: è più veloce e allena a vedere le forme.',
          'Now you can name the notes of the other strings, in two ways: counting from the open string (D, G, B) or by octave from a string you already know (6th → 4th, 5th → 3rd, 4th → 2nd). Use the second: it is faster and trains you to see shapes.'),
        { type: 'table',
          head: T(['Corda', 'Note naturali (tasto)'], ['String', 'Natural notes (fret)']),
          rows: T([
            ['4ª (D)', 'D 0 · E 2 · F 3 · G 5 · A 7 · B 9 · C 10 · D 12'],
            ['3ª (G)', 'G 0 · A 2 · B 4 · C 5 · D 7 · E 9 · F 10 · G 12'],
            ['2ª (B)', 'B 0 · C 1 · D 3 · E 5 · F 6 · G 8 · A 10 · B 12'],
            ['1ª (E)', 'come la 6ª: E 0 · F 1 · G 3 · A 5 · B 7 · C 8 · D 10 · E 12'],
          ], [
            ['4th (D)', 'D 0 · E 2 · F 3 · G 5 · A 7 · B 9 · C 10 · D 12'],
            ['3rd (G)', 'G 0 · A 2 · B 4 · C 5 · D 7 · E 9 · F 10 · G 12'],
            ['2nd (B)', 'B 0 · C 1 · D 3 · E 5 · F 6 · G 8 · A 10 · B 12'],
            ['1st (E)', 'like the 6th: E 0 · F 1 · G 3 · A 5 · B 7 · C 8 · D 10 · E 12'],
          ]) },
        { type: 'diagram', from: 0, to: 12, focus: [3, 2, 1], toggle: false,
          dots: [0, 1, 2, 3, 4, 5].flatMap(s => stringDots(s, 0, 12, { naturalsOnly: true })),
          caption: T('La mappa completa delle note naturali fino al 12° tasto.', 'The complete map of the natural notes up to the 12th fret.') },
        { type: 'find', title: T('Note sulle corde centrali', 'Notes on the middle strings'), rounds: 8,
          make: findOnString([3, 2, 1], NATURAL_PCS) },
      ],
    },

    {
      id: 'everywhere',
      title: T('Una nota, tutte le posizioni', 'One note, every position'),
      blocks: [
        P('Nei primi 12 tasti ogni nota compare <strong>una volta su ogni corda</strong>: sei posizioni. Seguendo le forme d\'ottava le colleghi tutte salendo lungo il manico. Per C: 5ª corda 3° tasto → 3ª corda 5° → 1ª e 6ª corda 8° → 4ª corda 10° → 2ª corda 13° (= 1° + 12) e il giro ricomincia.',
          'In the first 12 frets every note appears <strong>once on every string</strong>: six positions. Following the octave shapes you link them all going up the neck. For C: 5th string 3rd fret → 3rd string 5th → 1st and 6th string 8th → 4th string 10th → 2nd string 13th (= 1st + 12) and the cycle starts again.'),
        { type: 'diagram', keys: KEY_NAMES, defaultKey: 'C',
          build: key => ({
            from: 0, to: 15, toggle: false,
            dots: positionsOf(keyPc(key), 0, 15).map(({ s, f }) => plainDot(s, f, { color: RED, label: pretty(key) })),
            caption: T(`Tutte le ${pretty(key)} fino al 15° tasto.`, `Every ${pretty(key)} up to the 15th fret.`),
          }) },
        P('Queste posizioni non sono casuali: sono le fondamentali delle <strong>cinque forme CAGED</strong> che incontrerai nel modulo 3. Saperle trovare al volo è il primo passo per suonare un accordo o una scala ovunque.',
          'These positions are not random: they are the roots of the <strong>five CAGED shapes</strong> you will meet in module 3. Finding them at once is the first step to play a chord or a scale anywhere.'),
        { type: 'find', title: T('Tutte le posizioni', 'Every position'), rounds: 4,
          make: (i, prev) => {
            const pc = i < 2 ? nextNatural() : nextAny()
            const name = spelled(pc)
            return {
              pc, key: `all:${pc}`,
              prompt: T(`Clicca <strong>tutte</strong> le ${pretty(name)} dal tasto 0 al 12`, `Click <strong>every</strong> ${pretty(name)} from fret 0 to 12`),
              hint: T('Usa le ottave: due corde sopra e due tasti avanti (tre attraverso la corda di B).', 'Use the octaves: two strings up and two frets on (three across the B string).'),
              from: 0, to: 12,
              targets: positionsOf(pc, 0, 12).map(({ s, f }) => plainDot(s, f, { color: RED, label: pretty(name) })),
            }
          } },
      ],
    },

    {
      id: 'review',
      title: T('Ripasso: la nota su ogni corda', 'Review: the note on every string'),
      blocks: [
        P('L\'ultimo esercizio del modulo è quello che costruisce la mappa istantanea del manico: una nota, trovata su ogni corda, dalla 6ª alla 1ª. Dì ad alta voce il nome della nota mentre la clicchi o la suoni: collega il nome, la posizione e il suono.',
          'The last exercise of the module is the one that builds an instant map of the neck: one note, found on every string, from the 6th to the 1st. Say the note name aloud as you click or play it: it links the name, the position and the sound.'),
        { type: 'tip', label: T('Con la chitarra:', 'With the guitar:'),
          it: 'attiva "Suona con la chitarra" e suona la nota sulle sei corde: l\'app riconosce l\'altezza e segna la posizione.',
          en: 'turn on "Play with the guitar" and play the note on the six strings: the app recognises the pitch and marks the position.' },
        { type: 'find', title: T('Sei corde, una nota', 'Six strings, one note'), rounds: 6,
          make: (i, prev) => {
            const pc = i % 3 === 2 ? nextAccidental() : nextNatural()
            const name = spelled(pc)
            return {
              pc, key: `six:${pc}`,
              prompt: T(`Trova <strong>${pretty(name)}</strong> su tutte e sei le corde, tra il tasto 0 e l'11`, `Find <strong>${pretty(name)}</strong> on all six strings, between fret 0 and 11`),
              from: 0, to: 12,
              targets: positionsOf(pc, 0, 11).map(({ s, f }) => plainDot(s, f, { color: RED, label: pretty(name) })),
            }
          } },
        { type: 'practice', to: '/note-finder', it: 'Continua con: Trova la nota (tutto il manico, a tempo libero)', en: 'Go on with: Note Finder (the whole neck, at your own pace)' },
      ],
    },
  ],
}
