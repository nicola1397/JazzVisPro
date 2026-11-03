// Text of the "Guitar theory" page, in Italian and English.
// Each section: intro (may contain <strong>/<em>), note under the tab, tips [title, text], svg labels.

export const GUITAR_TEXT = {
  it: [
    {
      intro: 'La <strong>tablatura</strong> (tab) è il sistema di notazione più diffuso per la chitarra: 6 linee, una per corda, con numeri che indicano il tasto da premere.',
      note: 'numero = tasto da premere · 0 = corda a vuoto',
      svg: ['note singole →', '← accordo (Am)'],
      tips: [
        ['6 linee, 6 corde:', 'la linea più alta è la prima corda (e, acuta), quella più bassa la sesta (E, grave).'],
        ['Lettura da sinistra a destra:', 'le note si suonano nell\'ordine in cui appaiono. Le note in colonna si suonano insieme (accordo).'],
        ['0 = corda a vuoto:', 'pizzica la corda senza premere alcun tasto.'],
        ['Limite della tab:', 'di solito non indica la durata delle note. Per quella serve l\'ascolto del brano o la notazione tradizionale.'],
      ],
    },
    {
      intro: 'L\'<strong>hammer-on</strong> permette di suonare una nota più alta senza ripassare il plettro, "martellando" con decisione un dito sulla tastiera.',
      note: 'h = hammer-on · nessun colpo di plettro sulla seconda nota',
      svg: ['1 colpo di plettro per coppia'],
      tips: [
        ['Esecuzione:', 'suona la prima nota con il plettro, poi abbatti con decisione il dito sulla nota successiva senza ripassare il plettro.'],
        ['Suono:', 'più morbido e legato rispetto al picking tradizionale. Perfetto per frasi veloci e fluide.'],
        ['Concatenamento:', 'si possono incatenare più hammer-on di fila, es. 5h7h9, con un solo colpo di plettro iniziale.'],
      ],
    },
    {
      intro: 'Il <strong>pull-off</strong> è l\'inverso dell\'hammer-on: si stacca il dito dalla corda con un leggero strappo, facendo suonare la nota più bassa già premuta.',
      note: 'p = pull-off · la seconda nota risuona senza plettro',
      svg: [],
      tips: [
        ['Esecuzione:', 'premi entrambe le note, suona la più alta con il plettro, poi stacca il dito con un piccolo strappo laterale per far suonare quella inferiore.'],
        ['Combinato con l\'hammer-on:', 'si ottiene il <em>legato</em>, es. 5h7p5: suono fluido con un solo colpo di plettro.'],
        ['Direzione dello strappo:', 'di solito verso il pavimento (verso le corde più acute), appoggiando il dito sulla corda vicina per smorzarla; sulla prima corda il movimento è più breve per non farla uscire dalla tastiera.'],
      ],
    },
    {
      intro: 'Lo <strong>slide</strong> (glissato) consiste nel far scivolare il dito lungo la corda da un tasto all\'altro mantenendo la pressione.',
      note: '/ = slide in su · \\ = slide in giù · il suono scorre senza interruzioni',
      svg: ['ascendente', 'discendente'],
      tips: [
        ['/ = ascendente:', 'scivola dal tasto più basso a quello più alto mantenendo la pressione.'],
        ['\\ = discendente:', 'scivola dall\'alto verso il basso. Il suono è continuo, non staccato.'],
        ['Slide senza partenza o arrivo:', '/7 = arriva al 7° tasto partendo da qualche tasto più in basso (slide in); 7\\ = parte dal 7° e scivola verso il basso lasciando sfumare la nota (slide out).'],
        ['Bottleneck:', 'con un tubetto di metallo o di vetro sul dito si ottiene il suono della slide guitar blues.'],
      ],
    },
    {
      intro: 'Il <strong>bend</strong> consiste nello spingere la corda di lato (perpendicolarmente al manico) per alzarne l\'intonazione di un semitono o più.',
      note: 'b = bend · 7b9 = suona il 7° tasto e tira la corda fino all\'altezza del 9°',
      svg: ['intero (+1T)', 'mezzo (+½T)'],
      tips: [
        ['Bend intero (b):', 'alza di un tono (2 semitoni). Es. 7b9 = suona il 7° tasto e tira fino all\'altezza del 9°.'],
        ['Mezzo bend (b½):', 'alza di un semitono. Più sottile, molto usato nel blues.'],
        ['Bend e rilascio (br):', 'tira la corda e poi riportala in posizione: due altezze con un solo colpo di plettro.'],
        ['Pre-bend (pb):', 'tira la corda prima di suonarla, poi rilasciala: l\'effetto è opposto al bend normale.'],
      ],
    },
    {
      intro: 'Il <strong>vibrato</strong> è una rapida oscillazione dell\'altezza ottenuta muovendo ritmicamente il dito sulla corda dopo aver suonato la nota.',
      note: '~ = vibrato · oscillazione continua dell\'intonazione',
      svg: [],
      tips: [
        ['Esecuzione:', 'dopo aver suonato la nota, muovi il dito avanti e indietro lungo la corda (vibrato classico) oppure spingi e rilascia la corda di lato (vibrato blues/rock, più ampio).'],
        ['Wide vibrato (w):', 'vibrato ampio, tipico del blues: si spinge e si rilascia la corda in modo rapido e pronunciato.'],
        ['Leva del tremolo:', 'con la leva del ponte (whammy bar) si applica il vibrato a tutte le corde insieme, tipico del rock e del metal.'],
      ],
    },
    {
      intro: 'Il <strong>palm mute</strong> (P.M.) si ottiene appoggiando leggermente il palmo della mano destra sulle corde vicino al ponte: il suono diventa ovattato e percussivo.',
      note: 'P.M. = palm mute · palmo appoggiato leggermente vicino al ponte',
      svg: [],
      tips: [
        ['Posizione della mano:', 'appoggia il bordo del palmo (lato del mignolo) sulle corde appena davanti al ponte. Più ti allontani dal ponte, più il suono è smorzato.'],
        ['Suono "chug":', 'tipico del metal e dell\'hard rock. Con power chord e pennate in giù crea il classico riff serrato.'],
        ['P.M. - - - -:', 'la linea tratteggiata indica fin dove prosegue il palm mute. Dove finisce, il suono torna normale.'],
      ],
    },
    {
      intro: 'L\'<strong>alternate picking</strong> consiste nell\'alternare sistematicamente pennate in giù (↓) e in su (↑) per ogni nota.',
      note: '↓ = pennata in giù · ↑ = pennata in su · alternare sempre',
      svg: [],
      tips: [
        ['Regola base:', 'ogni nota riceve una pennata alternata: mai due pennate nella stessa direzione di fila (salvo tecniche come l\'economy picking).'],
        ['Efficienza:', 'permette velocità elevate riducendo al minimo il movimento del plettro.'],
        ['Tremolo picking:', 'l\'alternate picking applicato a una sola nota in modo molto rapido.'],
      ],
    },
    {
      intro: 'Gli <strong>armonici naturali</strong> si ottengono sfiorando la corda esattamente sopra certe barrette (senza premere) mentre la si pizzica: il suono è cristallino, simile a una campana.',
      note: '<> = armonico naturale · sfiora la corda sopra la barretta senza premere',
      svg: ['tasti: 12 · 7 · 5'],
      tips: [
        ['Tecnica:', 'appoggia il dito leggero sulla corda proprio sopra la barretta metallica (non tra due barrette), suona la corda e poi alza subito il dito.'],
        ['Punti principali:', '12° (ottava), 7° (ottava + quinta), 5° (due ottave), 4° e 9° (due ottave + terza maggiore). Ognuno produce un armonico della corda a vuoto.'],
        ['12° tasto:', 'divide la corda a metà e dà l\'ottava esatta della corda a vuoto: è l\'armonico più facile. Per accordare si usano spesso gli armonici al 5° e al 7° tasto.'],
      ],
    },
    {
      intro: 'Le <strong>pinch harmonics</strong> (armonici artificiali "pizzicati") si ottengono facendo sfiorare la corda dal bordo del pollice subito dopo la pennata: ne esce un armonico acuto e stridente.',
      note: 'P.H. = pinch harmonic · il pollice sfiora la corda subito dopo il plettro',
      svg: [],
      tips: [
        ['Tecnica:', 'tieni il plettro molto corto tra pollice e indice. Subito dopo la pennata, il bordo del pollice sfiora la corda e crea l\'armonico.'],
        ['Posizione del plettro:', 'spostando il punto di attacco lungo la corda (verso il pickup al manico o al ponte) si ottengono armonici di altezza diversa.'],
        ['Con il vibrato:', 'una pinch harmonic seguita da vibrato produce lo "squeal" tipico di Zakk Wylde e Billy Gibbons.'],
      ],
    },
    {
      intro: 'Nel <strong>tapping</strong> la mano del plettro percuote direttamente la tastiera su tasti alti, permettendo intervalli larghi e grande velocità.',
      note: 'T = tap · la mano destra percuote direttamente la tastiera',
      svg: ['T = tap mano destra'],
      tips: [
        ['Tecnica base:', 'con l\'indice o il medio della mano destra percuoti il tasto indicato con T, poi fai un pull-off verso le note tenute dalla mano sinistra.'],
        ['Eddie Van Halen:', 'rese celebre questa tecnica con "Eruption" (1978), suonando arpeggi su intervalli molto ampi con grande fluidità.'],
        ['Two-hand tapping:', 'usando più dita di entrambe le mani sulla tastiera si possono suonare arpeggi complessi, accordi e linee sovrapposte.'],
      ],
    },
    {
      intro: 'Il <strong>tremolo picking</strong> è la ripetizione rapidissima di una stessa nota in alternate picking, che crea un effetto continuo e tremolante.',
      note: 'ripetizione rapidissima in alternate picking ↓↑↓↑↓↑',
      svg: [],
      tips: [
        ['Tecnica:', 'alternate picking molto veloce su una sola nota. Tieni il plettro vicino alla corda e il movimento del polso piccolo e rilassato.'],
        ['Usi:', 'tipico del surf rock (Dick Dale), del metal estremo e del mandolino. Nella chitarra classica e flamenca il trémolo si fa invece con le dita (p-a-m-i).'],
        ['Pratica:', 'parti lentamente con il metronomo e aumenta gradualmente. La velocità nasce dal rilassamento, non dalla tensione.'],
      ],
    },
    {
      intro: 'Il <strong>legato</strong> chitarristico unisce hammer-on e pull-off consecutivi per suonare frasi veloci e fluide con un solo colpo di plettro iniziale.',
      note: 'legato = hammer-on e pull-off consecutivi · un solo colpo di plettro',
      svg: ['1 solo colpo iniziale per tutta la frase'],
      tips: [
        ['Un solo colpo di plettro:', 'tutta la frase parte da una pennata; le note successive sono prodotte solo dalla mano sinistra.'],
        ['Dita pronte:', 'tieni già premute le dita che servono prima di iniziare: è essenziale per pull-off precisi e ben udibili.'],
        ['Joe Satriani, Steve Vai, Allan Holdsworth:', 'maestri del legato esteso su più corde e posizioni.'],
      ],
    },
    {
      intro: 'Lo <strong>sweep picking</strong> è una tecnica in cui il plettro attraversa più corde con un\'unica pennata continua, per suonare arpeggi molto velocemente.',
      note: 'sweep: dalla corda grave a quella acuta con un\'unica pennata in giù',
      svg: ['un\'unica pennata in giù: A → e'],
      tips: [
        ['Principio:', 'invece di pennare ogni corda separatamente, il plettro "spazzola" le corde in una sola direzione. Ogni nota deve suonare da sola, non come un accordo.'],
        ['Smorzamento:', 'ogni dito alleggerisce la pressione appena la nota è suonata, così le note non si sovrappongono.'],
        ['Yngwie Malmsteen, Jason Becker:', 'pionieri dello sweep neoclassico. Le forme tipiche sono arpeggi su 3, 4 o 5 corde (nell\'esempio: La maggiore).'],
      ],
    },
    {
      intro: 'Le <strong>note stoppate</strong> (x) si ottengono appoggiando le dita sulla corda senza premerla: il risultato è un suono percussivo senza altezza definita.',
      note: 'x = nota stoppata (dead note) · appoggia senza premere',
      svg: ['suono percussivo · nessuna intonazione'],
      tips: [
        ['Mano sinistra:', 'appoggia le dita sulle corde senza premerle contro la tastiera: la corda non produce un\'altezza definita.'],
        ['Funk e chitarra ritmica:', 'fondamentali nel funk e nella ritmica rock: alternare note stoppate e accordi crea effetti percussivi.'],
        ['Ghost notes:', 'da non confondere con le note stoppate: sono note vere ma suonate molto piano, e si scrivono tra parentesi, es. (5).'],
      ],
    },
  ],
  en: [
    {
      intro: '<strong>Tablature</strong> (tab) is the most common notation for guitar: 6 lines, one per string, with numbers showing which fret to press.',
      note: 'number = fret to press · 0 = open string',
      svg: ['single notes →', '← chord (Am)'],
      tips: [
        ['6 lines, 6 strings:', 'the top line is the 1st string (high e), the bottom line the 6th (low E).'],
        ['Read left to right:', 'notes are played in the order they appear. Notes stacked in a column are played together (a chord).'],
        ['0 = open string:', 'pick the string without pressing any fret.'],
        ['Limit of tab:', 'it usually does not show note durations. For that you need the recording or standard notation.'],
      ],
    },
    {
      intro: 'A <strong>hammer-on</strong> sounds a higher note without picking again, by bringing a finger down firmly onto the fretboard.',
      note: 'h = hammer-on · no pick stroke on the second note',
      svg: ['1 pick stroke per pair'],
      tips: [
        ['How:', 'pick the first note, then bring a finger down firmly on the next note without picking again.'],
        ['Sound:', 'smoother and more legato than regular picking. Ideal for fast, flowing phrases.'],
        ['Chaining:', 'you can chain several hammer-ons, e.g. 5h7h9, with a single pick stroke at the start.'],
      ],
    },
    {
      intro: 'A <strong>pull-off</strong> is the opposite of a hammer-on: you release the finger with a small sideways pluck, sounding the lower note that is already fretted.',
      note: 'p = pull-off · the second note sounds without the pick',
      svg: [],
      tips: [
        ['How:', 'fret both notes, pick the higher one, then release the finger with a small sideways flick so the lower note sounds.'],
        ['With hammer-ons:', 'you get <em>legato</em>, e.g. 5h7p5: a flowing sound from a single pick stroke.'],
        ['Direction:', 'usually toward the floor (toward the higher strings), letting the finger rest on the next string to mute it; on the 1st string keep the motion short so the string does not slip off the fretboard.'],
      ],
    },
    {
      intro: 'A <strong>slide</strong> (glissando) means sliding the finger along the string from one fret to another while keeping the pressure.',
      note: '/ = slide up · \\ = slide down · the sound keeps flowing',
      svg: ['ascending', 'descending'],
      tips: [
        ['/ = ascending:', 'slide from the lower fret to the higher one while keeping the pressure.'],
        ['\\ = descending:', 'slide from high to low. The sound is continuous, not detached.'],
        ['Slides without a start or end:', '/7 = arrive at fret 7 from somewhere below (slide in); 7\\ = start on fret 7 and slide down letting the note fade (slide out).'],
        ['Bottleneck:', 'a metal or glass tube on the finger gives the classic blues slide guitar sound.'],
      ],
    },
    {
      intro: 'A <strong>bend</strong> pushes the string sideways (across the neck) to raise its pitch by a semitone or more.',
      note: 'b = bend · 7b9 = play fret 7 and bend up to the pitch of fret 9',
      svg: ['full (+1 tone)', 'half (+½ tone)'],
      tips: [
        ['Full bend (b):', 'raises the pitch by a whole tone (2 semitones). E.g. 7b9 = play fret 7 and bend up to the pitch of fret 9.'],
        ['Half bend (b½):', 'raises the pitch by a semitone. Subtler, very common in blues.'],
        ['Bend and release (br):', 'bend the string and bring it back: two pitches from one pick stroke.'],
        ['Pre-bend (pb):', 'bend the string before picking it, then release it: the opposite of a normal bend.'],
      ],
    },
    {
      intro: '<strong>Vibrato</strong> is a fast oscillation of pitch made by moving the finger rhythmically on the string after playing the note.',
      note: '~ = vibrato · continuous pitch oscillation',
      svg: [],
      tips: [
        ['How:', 'after playing the note, rock the finger back and forth along the string (classical vibrato) or push and release the string sideways (blues/rock vibrato, wider).'],
        ['Wide vibrato (w):', 'a wide vibrato typical of blues: push and release the string quickly and strongly.'],
        ['Tremolo arm:', 'the bridge arm (whammy bar) applies vibrato to all strings at once, typical of rock and metal.'],
      ],
    },
    {
      intro: '<strong>Palm muting</strong> (P.M.) means resting the side of the picking hand lightly on the strings near the bridge: the sound becomes muffled and percussive.',
      note: 'P.M. = palm mute · palm resting lightly near the bridge',
      svg: [],
      tips: [
        ['Hand position:', 'rest the edge of the palm (little-finger side) on the strings just in front of the bridge. The further from the bridge, the more muted the sound.'],
        ['"Chug" sound:', 'typical of metal and hard rock. With power chords and downstrokes it creates the classic tight riff.'],
        ['P.M. - - - -:', 'the dashed line shows how long the palm mute lasts. Where it ends, the sound goes back to normal.'],
      ],
    },
    {
      intro: '<strong>Alternate picking</strong> means alternating downstrokes (↓) and upstrokes (↑) for every note.',
      note: '↓ = downstroke · ↑ = upstroke · always alternate',
      svg: [],
      tips: [
        ['Basic rule:', 'every note gets the opposite stroke of the previous one: never two strokes in the same direction in a row (except in techniques such as economy picking).'],
        ['Efficiency:', 'it allows high speed by keeping pick motion to a minimum.'],
        ['Tremolo picking:', 'alternate picking applied very fast to a single note.'],
      ],
    },
    {
      intro: '<strong>Natural harmonics</strong> are produced by touching the string exactly above certain frets (without pressing) while picking it: the sound is glassy and bell-like.',
      note: '<> = natural harmonic · touch the string above the fret wire without pressing',
      svg: ['frets: 12 · 7 · 5'],
      tips: [
        ['Technique:', 'rest a finger lightly on the string right above the metal fret wire (not between two frets), pick the string, then lift the finger at once.'],
        ['Main spots:', '12th (octave), 7th (octave + fifth), 5th (two octaves), 4th and 9th (two octaves + major third). Each gives a harmonic of the open string.'],
        ['12th fret:', 'it splits the string in half and gives the exact octave of the open string: the easiest harmonic. For tuning, the harmonics at the 5th and 7th frets are often used.'],
      ],
    },
    {
      intro: '<strong>Pinch harmonics</strong> (artificial harmonics) are produced by letting the edge of the thumb graze the string right after the pick: the result is a high, squealing harmonic.',
      note: 'P.H. = pinch harmonic · the thumb grazes the string right after the pick',
      svg: [],
      tips: [
        ['Technique:', 'hold the pick with very little tip showing. Right after the stroke, the edge of the thumb grazes the string and creates the harmonic.'],
        ['Pick position:', 'moving the attack point along the string (toward the neck or bridge pickup) gives harmonics of different pitches.'],
        ['With vibrato:', 'a pinch harmonic followed by vibrato gives the "squeal" typical of Zakk Wylde and Billy Gibbons.'],
      ],
    },
    {
      intro: 'In <strong>tapping</strong> the picking hand strikes the fretboard directly on high frets, allowing wide intervals and great speed.',
      note: 'T = tap · the picking hand strikes the fretboard directly',
      svg: ['T = picking-hand tap'],
      tips: [
        ['Basic technique:', 'with the index or middle finger of the picking hand, strike the fret marked T, then pull off toward the notes held by the fretting hand.'],
        ['Eddie Van Halen:', 'made the technique famous with "Eruption" (1978), playing arpeggios over very wide intervals with great fluency.'],
        ['Two-hand tapping:', 'using several fingers of both hands on the fretboard you can play complex arpeggios, chords and layered lines.'],
      ],
    },
    {
      intro: '<strong>Tremolo picking</strong> is the very fast repetition of the same note with alternate picking, creating a continuous, shimmering effect.',
      note: 'very fast repetition with alternate picking ↓↑↓↑↓↑',
      svg: [],
      tips: [
        ['Technique:', 'very fast alternate picking on one note. Keep the pick close to the string and the wrist motion small and relaxed.'],
        ['Uses:', 'typical of surf rock (Dick Dale), extreme metal and the mandolin. On classical and flamenco guitar, tremolo is played with the fingers instead (p-a-m-i).'],
        ['Practice:', 'start slowly with a metronome and speed up gradually. Speed comes from relaxation, not tension.'],
      ],
    },
    {
      intro: 'Guitar <strong>legato</strong> joins consecutive hammer-ons and pull-offs to play fast, flowing phrases from a single pick stroke.',
      note: 'legato = consecutive hammer-ons and pull-offs · a single pick stroke',
      svg: ['one pick stroke for the whole phrase'],
      tips: [
        ['One pick stroke:', 'the whole phrase starts from one stroke; the following notes come from the fretting hand alone.'],
        ['Fingers ready:', 'keep the fingers you need already fretted before starting: it is essential for clean, audible pull-offs.'],
        ['Joe Satriani, Steve Vai, Allan Holdsworth:', 'masters of extended legato across strings and positions.'],
      ],
    },
    {
      intro: '<strong>Sweep picking</strong> is a technique in which the pick crosses several strings in one continuous stroke, to play arpeggios very fast.',
      note: 'sweep: from the low string to the high one in a single downstroke',
      svg: ['one single downstroke: A → e'],
      tips: [
        ['Principle:', 'instead of picking each string separately, the pick "sweeps" across the strings in one direction. Each note must sound on its own, not as a chord.'],
        ['Muting:', 'each finger releases its pressure as soon as its note has sounded, so the notes do not ring together.'],
        ['Yngwie Malmsteen, Jason Becker:', 'pioneers of neoclassical sweeping. Typical shapes are 3-, 4- or 5-string arpeggios (in the example: A major).'],
      ],
    },
    {
      intro: '<strong>Dead notes</strong> (x) are produced by resting the fingers on the string without pressing it: the result is a percussive sound with no definite pitch.',
      note: 'x = dead (muted) note · rest the finger without pressing',
      svg: ['percussive sound · no pitch'],
      tips: [
        ['Fretting hand:', 'rest the fingers on the strings without pressing them against the fretboard: the string gives no definite pitch.'],
        ['Funk and rhythm guitar:', 'essential in funk and rock rhythm playing: mixing dead notes and chords creates percussive effects.'],
        ['Ghost notes:', 'not the same as dead notes: they are real notes played very softly, written in brackets, e.g. (5).'],
      ],
    },
  ],
}
