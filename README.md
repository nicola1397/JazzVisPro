# Jazz Viz Pro

**Jazz Viz Pro** è una piattaforma interattiva avanzata progettata per chitarristi e musicisti jazz, focalizzata sulla visualizzazione della tastiera, la pratica dell'improvvisazione e lo studio dell'armonia moderna.

Il progetto mira a colmare il divario tra la teoria musicale e la pratica sullo strumento, fornendo strumenti visuali immediati e moduli di allenamento interattivi.

## Funzionalità Principali

### 🎸 Visualizzazione e Strumenti
- **Fretboard Interattiva**: Visualizzazione dinamica di scale, arpeggi e intervalli con supporto per diverse accordature.
- **Chord Finder**: Trova rapidamente tutte le diteggiature di un accordo sulla tastiera con sistema a griglia professionale.
- **Scale Explorer**: Esplora centinaia di scale e modi, visualizzando la loro struttura e le relazioni armoniche.
- **Snapshots**: Cattura e salva diagrammi della tastiera per creare materiale didattico o promemoria personali.

### 🎹 Allenamento e Ear Training
- **Ear Training (Accordi & Intervalli)**: Moduli per sviluppare l'orecchio riconoscendo qualità di accordi e distanze intervallari, con statistiche persistenti.
- **Functional Harmony Trainer**: Nuovo modulo interattivo per allenare il riconoscimento dei gradi romani e delle funzioni tonali (II-V-I, ecc.).
- **Scale a Tempo**: Qualsiasi scala su 1 o 2 ottave, col metronomo, a semiminime, crome, terzine o semicrome. Misura di quanti millisecondi ogni nota è in anticipo o in ritardo e aumenta il tempo dopo ogni giro pulito. Include la calibrazione della latenza della chitarra, usata anche in Sui Cambi.
- **Ripeti a Orecchio**: L'app suona un intervallo, una frase (maggiore, dorica, misolidia, pentatonica, blues) o un arpeggio e tu lo ripeti sulla chitarra o sul manico, dalla nota indicata o da qualsiasi nota. Alla fine mostra una diteggiatura numerata.
- **Groove Trainer**: Metronomo evoluto con supporto per **Poliritmi** (due pattern simultanei) e **Ghost Notes** (dinamiche accentate o piano).
- **Note Finder**: Un gioco interattivo per memorizzare la posizione delle note sulla tastiera.
- **Triadi e Rivolti**: Trova triadi maggiori, minori, diminuite, aumentate e sus, singoli rivolti in posizione stretta o il ciclo dei tre rivolti lungo il manico, con le diteggiature sui gruppi di tre corde.
- **Settime e Drop**: Accordi di settima (maj7, 7, m7, m7b5, dim7, m(maj7), 7sus4) in posizione stretta, drop 2 e drop 3, con la nota scelta al basso e il ciclo dei rivolti lungo il manico.
- **Suona con la chitarra**: Negli esercizi sul manico (Note Finder, Interval Learner, Triadi e Rivolti, Settime e Drop) puoi rispondere suonando la chitarra collegata (scheda audio o microfono) invece di cliccare, con avanzamento automatico alla domanda successiva.
- **Grade/Interval Learner**: Strumenti specifici per visualizzare e interiorizzare i gradi delle scale e gli intervalli (anche in modalità discendente).

- **Progressi**: Storico di tutte le risposte con tempo di pratica, precisione, giorni di fila, punti da ripassare per ogni esercizio e mappa degli errori sul manico. Gli esercizi ripropongono più spesso ciò che sbagli.

### 🎼 Improvvisazione e Composizione
- **Player (Play Along)**: Riproduttore di progressioni con **accompagnamento intelligente** (Walking Bass e Swing Drums generati algoritmicamente in tempo reale).
- **Sui Cambi**: Base con walking bass, batteria swing e accordi su qualsiasi brano del Real Book. Esercizi a tempo: note guida (terza/settima su ogni accordo, anche tenute), arpeggi, note di approccio (cromatiche ed enclosure) e assolo libero con analisi di ogni nota (nota dell'accordo, tensione, nota fuori).
- **Lick Builder**: Crea i tuoi fraseggi nota dopo nota, esportali in tablatura e studiali con lo **Speed Trainer** integrato.
- **Real Book**: Un database di standard jazz con visualizzazione degli accordi e integrazione diretta con il Player. Per ogni brano c'è un percorso di studio in cinque tappe (suonarci sopra, note guida, arpeggi, note di approccio, assolo libero) che si spuntano da sole quando completi bene l'esercizio.

### 🧠 Armonia e Teoria
- **Scale Calculator**: Analizza una serie di note o un contesto armonico per suggerire le scale più appropriate.
- **Reharmonizer**: Suggerisce sostituzioni armoniche (sostituzioni di tritono, dominanti secondarie, ecc.) per arricchire le tue progressioni.
- **Theory Jazz & General**: Dispense integrate per consultare rapidamente i pilastri della teoria jazz.
- **Transposer**: Strumento rapido per trasporre brani o progressioni in qualsiasi tonalità.

### 🛠 Utility
- **Trascrizione**: Carica un file audio (resta sul dispositivo), rallentalo senza cambiare l'intonazione, ripeti un tratto A-B scelto trascinando sulla forma d'onda, aggiungi marcatori con nome (ricordati per file) e vedi la nota al cursore sul manico. Scorciatoie da tastiera per ogni comando.
- **Accordatore (Tuner)**: Accordatore cromatico preciso basato sull'analisi della frequenza tramite microfono.
- **Analisi Armonica**: Rilevamento automatico della tonalità e suggerimenti contestuali basati sullo stile (Jazz, Blues, Pop).

## Caratteristiche Tecniche
- Realizzato con **Vue.js 3** e **Vite** per una reattività estrema.
- Motore audio avanzato basato su **Tone.js** con sintesi sonora e campionamento.
- Design ottimizzato per desktop e tablet.
- Supporto multilingua completo (Italiano/Inglese).
