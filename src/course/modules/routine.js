// Module — Daily practice: how memory sticks, mixed reviews of the whole path, the final
// exam, and which exercises of the app to repeat afterwards.

import { T, mix } from '../build.js'
import { markerDrill, anyFretDrill, findNoteDrill } from './landmarks.js'
import { intervalSpeedDrill } from './intervals.js'
import { whichShapeQuiz } from './caged.js'
import { inversionQuiz } from './triads.js'
import { degreeInKeyDrill, flashDegreeDrill, chromaticDegreeDrill, earDegreeDrill } from './degrees.js'
import { diatonicDrill, functionDrill, iiVIDrill, earChordDrill } from './harmony.js'

const P = (it, en) => ({ type: 'p', it, en })

const neckMakers = () => [markerDrill, anyFretDrill, findNoteDrill(), intervalSpeedDrill(), whichShapeQuiz(['major', 'major', 'minor']), inversionQuiz(), flashDegreeDrill()]
const theoryMakers = () => [degreeInKeyDrill(), chromaticDegreeDrill(), earDegreeDrill(), diatonicDrill(), functionDrill(), iiVIDrill(), earChordDrill()]

export default {
  id: 'routine',
  title: T('Allenamento quotidiano', 'Daily practice'),
  desc: T(
    'Come fissare per sempre ciò che hai imparato: ripassi misti a tempo di tutto il percorso, l\'esame finale e una routine settimanale con gli esercizi dell\'app.',
    'How to make what you learned stick for good: timed mixed reviews of the whole path, the final exam, and a weekly routine with the app\'s exercises.'),
  steps: [
    {
      id: 'how',
      title: T('Come si impara davvero', 'How learning really sticks'),
      blocks: [
        P('Hai la teoria e le mappe del manico. Questo modulo serve a fissarle a lungo termine e a capire cosa fare dopo. Alcuni principi che la ricerca sulla memoria conferma da tempo:',
          'You have the theory and the maps of the neck. This module is about making them last and knowing what to do next. A few principles that research on memory has long confirmed:'),
        { type: 'list',
          it: [
            ['Poco e spesso.', 'Quindici minuti al giorno valgono più di due ore la domenica: la memoria si consolida tra una sessione e l\'altra.'],
            ['Mescola gli argomenti.', 'Alternare temi diversi nella stessa sessione è più faticoso, ma si ricorda di più e più a lungo.'],
            ['Mettiti alla prova.', 'Rispondere a una domanda fissa la memoria molto più che rileggere. I Lampo sono fatti per questo.'],
            ['La velocità misura l\'automatismo.', 'Quando rispondi senza pensare, la conoscenza lavora da sola mentre suoni, e la testa resta libera per la musica.'],
            ['Occhi, voce, mani, orecchie.', 'Guarda la nota, dilla ad alta voce, suonala, ascoltala. Ogni canale lascia una traccia in più.'],
            ['Una tonalità al giorno.', 'Segui il ciclo delle quarte (C, F, B♭, E♭…): in dodici giorni le hai viste tutte.'],
          ],
          en: [
            ['Little and often.', 'Fifteen minutes a day beat two hours on Sunday: memory consolidates between sessions.'],
            ['Mix the topics.', 'Alternating topics within a session is harder, but you remember more and for longer.'],
            ['Test yourself.', 'Answering a question fixes memory far more than rereading. The Flash drills are made for this.'],
            ['Speed measures automaticity.', 'When you answer without thinking, the knowledge works on its own while you play, leaving your head free for music.'],
            ['Eyes, voice, hands, ears.', 'Look at the note, say it aloud, play it, listen to it. Each channel leaves one more trace.'],
            ['One key a day.', 'Follow the cycle of fourths (C, F, B♭, E♭…): in twelve days you have seen them all.'],
          ] },
        { type: 'table',
          head: T(['Giorno', '5 minuti', '5 minuti', '10 minuti'], ['Day', '5 minutes', '5 minutes', '10 minutes']),
          rows: T([
            ['Lun', 'Ripasso misto: il manico', 'Gradi lampo', 'Arpeggio nelle 5 forme CAGED, tonalità del giorno'],
            ['Mar', 'Note Finder (Riferimento)', 'Gradi a orecchio', 'Scala maggiore nelle 5 posizioni (Scale a Tempo)'],
            ['Mer', 'Intervalli lampo', 'Accordi nelle tonalità', 'Triadi sulle corde 1-2-3 e 2-3-4 (Triadi e Rivolti)'],
            ['Gio', 'Forme lampo', 'II-V-I in ogni tonalità', 'Note guida su un brano (Sui Cambi)'],
            ['Ven', 'Ripasso misto: teoria', 'Melodie in gradi', 'Settime e drop 2 (Settime e Drop)'],
            ['Sab', 'Esame finale', 'Ripeti a Orecchio', 'Un brano del Real Book con il suo percorso di studio'],
            ['Dom', '—', '—', 'Suona e basta'],
          ], [
            ['Mon', 'Mixed review: the neck', 'Flash degrees', 'Arpeggio in the 5 CAGED shapes, key of the day'],
            ['Tue', 'Note Finder (Reference)', 'Degrees by ear', 'Major scale in the 5 positions (Scales in Time)'],
            ['Wed', 'Flash intervals', 'Chords in the keys', 'Triads on strings 1-2-3 and 2-3-4 (Triads and Inversions)'],
            ['Thu', 'Flash shapes', 'ii-V-I in every key', 'Guide tones on a tune (Over the Changes)'],
            ['Fri', 'Mixed review: theory', 'Melodies in degrees', 'Sevenths and drop 2 (Sevenths and Drops)'],
            ['Sat', 'Final exam', 'Play It Back', 'A Real Book tune with its study path'],
            ['Sun', '—', '—', 'Just play'],
          ]) },
        { type: 'tip', label: T('Quando smettere:', 'When to stop:'),
          it: 'quando un Lampo è all\'oro da due settimane, fallo una volta a settimana e usa il tempo liberato per suonare brani.',
          en: 'when a Flash drill has been at gold for two weeks, do it once a week and use the freed time to play tunes.' },
      ],
    },

    {
      id: 'mix-neck',
      title: T('Ripasso misto: il manico', 'Mixed review: the neck'),
      blocks: [
        P('Note, intervalli, forme, rivolti e gradi sul manico, tutti mescolati. È l\'esercizio da fare per primo ogni giorno: in cinque minuti tocca tutto ciò che hai imparato con gli occhi e con le mani.',
          'Notes, intervals, shapes, inversions and degrees on the neck, all mixed. It is the drill to do first every day: in five minutes it touches everything you learned with your eyes and hands.'),
        { type: 'speed', title: T('Il manico, tutto mescolato', 'The neck, all mixed'), count: 20, levels: [6, 4, 2.5], guitar: true, make: mix(neckMakers()) },
      ],
    },

    {
      id: 'mix-theory',
      title: T('Ripasso misto: teoria e orecchio', 'Mixed review: theory and ear'),
      blocks: [
        P('Gradi nelle tonalità, gradi alterati, accordi della scala, funzioni, II-V-I e orecchio, tutti mescolati.',
          'Degrees in the keys, altered degrees, chords of the scale, functions, ii-V-Is and ear, all mixed.'),
        { type: 'speed', title: T('Teoria e orecchio, tutto mescolato', 'Theory and ear, all mixed'), count: 20, levels: [8, 5, 3.5], make: mix(theoryMakers()) },
      ],
    },

    {
      id: 'final',
      title: T('L\'esame finale', 'The final exam'),
      blocks: [
        P('Trenta domande da tutto il percorso. Se lo superi, alla fine del percorso sai:',
          'Thirty questions from the whole path. If you pass it, at the end of the path you can:'),
        { type: 'list',
          it: [
            ['Il manico:', 'il nome di ogni nota su ogni corda, partendo dai punti di riferimento, in pochi secondi.'],
            ['Gli intervalli:', 'la forma di ogni intervallo sulla stessa corda, sulla corda vicina e due corde sopra.'],
            ['I gradi:', 'i gradi in ogni tonalità, dove stanno attorno alla fondamentale, e come suonano.'],
            ['Il CAGED:', 'le cinque forme maggiori e minori in qualsiasi tonalità, e dentro ognuna arpeggio, scala e settime.'],
            ['Le triadi:', 'i tre rivolti su ogni gruppo di corde.'],
            ['L\'armonia:', 'gli accordi della scala, le funzioni e il II-V-I in tutte le tonalità.'],
          ],
          en: [
            ['The neck:', 'the name of every note on every string, starting from the landmarks, in a few seconds.'],
            ['Intervals:', 'the shape of every interval on the same string, the next string and two strings up.'],
            ['Degrees:', 'the degrees in every key, where they sit around the root, and how they sound.'],
            ['CAGED:', 'the five major and minor shapes in any key, and inside each the arpeggio, the scale and the sevenths.'],
            ['Triads:', 'the three inversions on every string set.'],
            ['Harmony:', 'the chords of the scale, their functions and the ii-V-I in every key.'],
          ] },
        { type: 'speed', title: T('Esame finale', 'Final exam'), count: 30, levels: [7, 4.5, 3], guitar: true,
          tip: T('Il bronzo chiude il percorso; argento e oro dicono che è diventato automatico.', 'Bronze completes the path; silver and gold say it has become automatic.'),
          make: mix([...neckMakers(), ...theoryMakers()]) },
      ],
    },

    {
      id: 'next',
      title: T('Dopo il percorso', 'After the path'),
      blocks: [
        P('Da qui in poi non serve altra teoria per suonare: serve pratica e ripetizione, possibilmente sui brani. Ecco dove allenare ogni abilità nell\'app.',
          'From here on you need no more theory to play: you need practice and repetition, ideally on tunes. Here is where to train each skill in the app.'),
        { type: 'table',
          head: T(['Abilità', 'Esercizio', 'Quanto spesso'], ['Skill', 'Exercise', 'How often']),
          rows: T([
            ['Note sul manico', 'Note Finder, modalità Riferimento', '3 volte a settimana, poi 1'],
            ['Intervalli', 'Interval Learner; Intervalli a orecchio', '2 volte a settimana'],
            ['Gradi', 'Grade Learner; Ripeti a Orecchio', '2-3 volte a settimana'],
            ['Scale nelle posizioni', 'Scale a Tempo, una posizione alla volta', 'ogni giorno 5 minuti'],
            ['Triadi e settime', 'Triadi e Rivolti; Settime e Drop', '2 volte a settimana'],
            ['Armonia', 'Armonia Funzionale; Quiz', '1-2 volte a settimana'],
            ['Suonare sui cambi', 'Sui Cambi; Real Book con il percorso di studio', 'ogni giorno'],
          ], [
            ['Notes on the neck', 'Note Finder, Reference mode', '3 times a week, then 1'],
            ['Intervals', 'Interval Learner; Interval ear training', 'twice a week'],
            ['Degrees', 'Grade Learner; Play It Back', '2-3 times a week'],
            ['Scales in position', 'Scales in Time, one position at a time', '5 minutes every day'],
            ['Triads and sevenths', 'Triads and Inversions; Sevenths and Drops', 'twice a week'],
            ['Harmony', 'Functional Harmony; Quiz', '1-2 times a week'],
            ['Playing over changes', 'Over the Changes; Real Book with the study path', 'every day'],
          ]) },
        { type: 'practice', to: '/note-finder', it: 'Trova la nota', en: 'Note Finder' },
        { type: 'practice', to: '/grade-learner', it: 'Trova il grado', en: 'Scale Degrees' },
        { type: 'practice', to: '/scale-tempo', it: 'Scale a tempo', en: 'Scales in Time' },
        { type: 'practice', to: '/triad-trainer', it: 'Triadi e rivolti', en: 'Triads and Inversions' },
        { type: 'practice', to: '/changes-trainer', it: 'Sui cambi', en: 'Over the Changes' },
        { type: 'practice', to: '/real-book', it: 'Real Book', en: 'Real Book' },
        { type: 'practice', to: '/progress', it: 'Progressi: cosa ripassare', en: 'Progress: what to review' },
        P('Buona musica.', 'Enjoy the music.'),
      ],
    },
  ],
}
