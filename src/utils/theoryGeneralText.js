// Text of the "General music theory" page, in Italian and English.
// Strings may contain <strong>/<em> (rendered with v-html, authored here only).

export const GENERAL_TEXT = {
  it: {
    notation: {
      intro: 'La musica usa un sistema grafico per rappresentare altezza e durata dei suoni. Il <strong>pentagramma</strong> è il cuore di questo sistema.',
      notes: ['Mi', 'Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa'],
      tips: [
        ['Il pentagramma:', '5 linee e 4 spazi. Le note si scrivono sulle linee o negli spazi: più in alto è la nota, più è acuta.'],
        ['Le linee (chiave di violino):', 'Mi, Sol, Si, Re, Fa, dal basso verso l\'alto (in inglese E, G, B, D, F).'],
        ['Gli spazi:', 'Fa, La, Do, Mi, dal basso verso l\'alto (F, A, C, E).'],
        ['Le alterazioni:', '<em>diesis (#)</em> alza di un semitono, <em>bemolle (b)</em> abbassa di un semitono, <em>bequadro (♮)</em> annulla l\'alterazione.'],
        ['Nomi delle note:', 'in questa app si usano i nomi anglosassoni: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si.'],
      ],
    },
    durations: {
      intro: 'Ogni figura indica una durata relativa. Il sistema è binario: ogni figura vale la metà della precedente.',
      items: [
        ['Breve', 'Rettangolo vuoto. Vale 8 quarti.'],
        ['Semibreve', 'Ovale vuoto senza gambo. Vale 4 quarti.'],
        ['Minima', 'Ovale vuoto con gambo. Vale 2 quarti.'],
        ['Semiminima', 'Ovale pieno con gambo. Vale 1 quarto.'],
        ['Croma', 'Una codetta. Vale ½ quarto.'],
        ['Semicroma', 'Due codette. Vale ¼ di quarto.'],
        ['Biscroma', 'Tre codette. Vale ⅛ di quarto.'],
        ['Semibiscroma', 'Quattro codette. Vale 1/16 di quarto.'],
        ['Fusa', 'Cinque codette. Vale 1/32 di quarto.'],
        ['Semifusa', 'Sei codette. Vale 1/64 di quarto.'],
      ],
      tip: ['Il punto di valore:', 'un punto dopo la nota aggiunge metà della sua durata (es. semiminima puntata = 1 + ½ = 1,5 quarti).'],
    },
    meter: {
      intro: 'Il tempo organizza le note in unità regolari chiamate <strong>battute</strong>, separate da stanghette.',
      bars: ['Battuta 1', 'Battuta 2'],
      tips: [
        ['Tempi semplici:', 'ogni movimento si divide in 2. Es. 2/4, 3/4, 4/4.'],
        ['Tempi composti:', 'ogni movimento si divide in 3. Es. 6/8, 9/8, 12/8: in 6/8 ci sono 2 movimenti da un quarto puntato, ciascuno di 3 ottavi.'],
        ['Accenti:', 'in 4/4 il 1° movimento è forte, il 3° mezzoforte, il 2° e il 4° deboli. Nello swing però si accentuano il 2° e il 4° (backbeat).'],
        ['Sincope:', 'un suono che parte su un tempo debole e prosegue sul tempo forte, spostando l\'accento. È l\'anima del jazz e del funk.'],
      ],
    },
    circle: {
      intro: 'Il circolo delle quinte è la mappa delle tonalità: procedendo in senso orario si sale di quinta e si aggiunge un diesis; in senso antiorario si aggiunge un bemolle.',
      center: 'QUINTE',
      tip: ['Uso pratico:', 'tonalità vicine nel circolo condividono quasi tutte le note e sono ideali per modulare. Tonalità opposte (es. C e F#/Gb) sono le più lontane. Le tonalità relative (es. C e Am) hanno la stessa armatura.'],
    },
    chords: {
      intro: 'L\'armonia nasce sovrapponendo suoni per terze. L\'accordo di base è la <strong>triade</strong>: fondamentale, terza e quinta.',
      triads: [
        ['Maggiore', 'Luminosa e stabile (3ª maggiore + 3ª minore)'],
        ['Minore', 'Più scura (3ª minore + 3ª maggiore)'],
        ['Diminuita', 'Tesa e instabile (due 3ª minori)'],
        ['Aumentata', 'Sospesa, ambigua (due 3ª maggiori)'],
      ],
      example: 'Esempi su C',
      tips: [
        ['V grado (dominante):', 'massima tensione, tende a risolvere sulla tonica (I grado).'],
        ['IV grado (sottodominante):', 'allontana dalla tonica e prepara la dominante; meno instabile del V.'],
      ],
    },
    diatonic: {
      intro: 'Costruendo un accordo di settima su ogni nota della scala maggiore si ottengono gli <strong>accordi diatonici</strong>, gli accordi "nativi" di una tonalità.',
      head: ['Grado', 'In C maggiore', 'Formula', 'Funzione'],
      roles: ['Tonica: riposo, stabilità', 'Sottodominante: prepara il V', 'Tonica (sostituto del I)', 'Sottodominante: colore, movimento', 'Dominante: massima tensione', 'Tonica relativa minore', 'Dominante (contiene il tritono del V)'],
      tip: ['Regola d\'oro:', 'tutti questi accordi usano solo le note di C maggiore, quindi stanno bene insieme. La progressione <em>ii–V–I</em> (Dm7–G7–Cmaj7) è la formula base del jazz.'],
    },
    inversions: {
      intro: 'Un accordo è in <strong>stato fondamentale</strong> quando la fondamentale è al basso. Mettendo al basso un\'altra nota dell\'accordo si ottiene un <strong>rivolto</strong>.',
      names: ['Stato fondamentale', '1° rivolto', '2° rivolto', '3° rivolto'],
      bassLabel: 'Basso',
      bass: ['fondamentale', 'terza', 'quinta', 'settima'],
      tips: [
        ['Perché usarli:', 'creano linee di basso più fluide e melodiche, evitando salti.'],
        ['Notazione:', 'accordo/basso. Es. <em>G7/B</em> = G7 con B al basso (1° rivolto). Il 3° rivolto esiste solo negli accordi di settima.'],
      ],
    },
  },
  en: {
    notation: {
      intro: 'Music uses a graphic system to show the pitch and duration of sounds. The <strong>staff</strong> is the heart of this system.',
      notes: ['E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F'],
      tips: [
        ['The staff:', '5 lines and 4 spaces. Notes are written on lines or in spaces: the higher the note, the higher the pitch.'],
        ['The lines (treble clef):', 'E, G, B, D, F from bottom to top ("Every Good Boy Does Fine").'],
        ['The spaces:', 'F, A, C, E from bottom to top (they spell "FACE").'],
        ['Accidentals:', 'a <em>sharp (#)</em> raises by a semitone, a <em>flat (b)</em> lowers by a semitone, a <em>natural (♮)</em> cancels the accidental.'],
        ['Note names:', 'this app uses letter names: C = Do, D = Re, E = Mi, F = Fa, G = Sol, A = La, B = Si.'],
      ],
    },
    durations: {
      intro: 'Each note value shows a relative duration. The system is binary: each value lasts half as long as the previous one.',
      items: [
        ['Breve (double whole)', 'Hollow rectangle. Worth 8 quarter notes.'],
        ['Whole note', 'Hollow oval, no stem. Worth 4 quarter notes.'],
        ['Half note', 'Hollow oval with a stem. Worth 2 quarter notes.'],
        ['Quarter note', 'Filled oval with a stem. Worth 1 quarter note.'],
        ['Eighth note', 'One flag. Worth ½ quarter note.'],
        ['Sixteenth note', 'Two flags. Worth ¼ quarter note.'],
        ['32nd note', 'Three flags. Worth ⅛ quarter note.'],
        ['64th note', 'Four flags. Worth 1/16 quarter note.'],
        ['128th note', 'Five flags. Worth 1/32 quarter note.'],
        ['256th note', 'Six flags. Worth 1/64 quarter note.'],
      ],
      tip: ['The dot:', 'a dot after a note adds half of its value (e.g. dotted quarter = 1 + ½ = 1.5 quarter notes).'],
    },
    meter: {
      intro: 'Meter organises notes into regular units called <strong>bars</strong> (measures), separated by bar lines.',
      bars: ['Bar 1', 'Bar 2'],
      tips: [
        ['Simple meters:', 'each beat divides into 2. E.g. 2/4, 3/4, 4/4.'],
        ['Compound meters:', 'each beat divides into 3. E.g. 6/8, 9/8, 12/8: 6/8 has 2 dotted-quarter beats of 3 eighth notes each.'],
        ['Accents:', 'in 4/4 beat 1 is strong, beat 3 medium, beats 2 and 4 weak. In swing, though, beats 2 and 4 are accented (backbeat).'],
        ['Syncopation:', 'a note that starts on a weak beat and carries over the strong one, shifting the accent. It is the soul of jazz and funk.'],
      ],
    },
    circle: {
      intro: 'The circle of fifths is a map of the keys: going clockwise you move up a fifth and add a sharp; going counter-clockwise you add a flat.',
      center: 'FIFTHS',
      tip: ['In practice:', 'keys next to each other share almost all their notes and are ideal for modulating. Opposite keys (e.g. C and F#/Gb) are the furthest apart. Relative keys (e.g. C and Am) share the same key signature.'],
    },
    chords: {
      intro: 'Harmony comes from stacking notes in thirds. The basic chord is the <strong>triad</strong>: root, third and fifth.',
      triads: [
        ['Major', 'Bright and stable (major 3rd + minor 3rd)'],
        ['Minor', 'Darker (minor 3rd + major 3rd)'],
        ['Diminished', 'Tense and unstable (two minor 3rds)'],
        ['Augmented', 'Suspended, ambiguous (two major 3rds)'],
      ],
      example: 'Examples on C',
      tips: [
        ['Degree V (dominant):', 'the most tension; it wants to resolve to the tonic (degree I).'],
        ['Degree IV (subdominant):', 'moves away from the tonic and prepares the dominant; less unstable than V.'],
      ],
    },
    diatonic: {
      intro: 'Building a seventh chord on every note of the major scale gives the <strong>diatonic chords</strong>, the "native" chords of a key.',
      head: ['Degree', 'In C major', 'Formula', 'Function'],
      roles: ['Tonic: rest, stability', 'Subdominant: prepares V', 'Tonic (substitute for I)', 'Subdominant: colour, motion', 'Dominant: most tension', 'Relative minor tonic', 'Dominant (contains the tritone of V)'],
      tip: ['Golden rule:', 'all these chords use only the notes of C major, so they fit together. The <em>ii–V–I</em> progression (Dm7–G7–Cmaj7) is the basic formula of jazz.'],
    },
    inversions: {
      intro: 'A chord is in <strong>root position</strong> when the root is in the bass. Putting another chord tone in the bass gives an <strong>inversion</strong>.',
      names: ['Root position', '1st inversion', '2nd inversion', '3rd inversion'],
      bassLabel: 'Bass',
      bass: ['root', 'third', 'fifth', 'seventh'],
      tips: [
        ['Why use them:', 'they create smoother, more melodic bass lines and avoid leaps.'],
        ['Notation:', 'chord/bass. E.g. <em>G7/B</em> = G7 with B in the bass (1st inversion). The 3rd inversion exists only for seventh chords.'],
      ],
    },
  },
}
