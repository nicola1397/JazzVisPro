// Quiz database — 1000 questions (Italian / English).
// Categories: jazz_harmony, jazz_theory, general_theory · Levels: easy, medium, hard
// Answers follow music-theory rules: notes are spelled by letter name (Db in flat keys, C# in sharp
// keys, Bbb in Cdim7…), half-diminished chords use ø, and every question has exactly one correct option.

export const QUIZ_DATABASE = [
  {
    "id": 1,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra C?",
      "options": [
        "F#",
        "D",
        "E",
        "Db"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (C → D) e 1 semitono: sopra C c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above C?",
      "options": [
        "F#",
        "D",
        "E",
        "Db"
      ],
      "explanation": "A minor second spans 2 letter names (C → D) and 1 semitone: above C is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 2,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra C?",
      "options": [
        "D",
        "E",
        "F",
        "F#"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (C → D) e 2 semitoni: sopra C c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above C?",
      "options": [
        "D",
        "E",
        "F",
        "F#"
      ],
      "explanation": "A major second spans 2 letter names (C → D) and 2 semitones: above C is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 3,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza minore sopra C?",
      "options": [
        "Eb",
        "E",
        "D",
        "Db"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (C → E) e 3 semitoni: sopra C c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above C?",
      "options": [
        "Eb",
        "E",
        "D",
        "Db"
      ],
      "explanation": "A minor third spans 3 letter names (C → E) and 3 semitones: above C is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 4,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra C?",
      "options": [
        "Db",
        "D",
        "Eb",
        "E"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (C → E) e 4 semitoni: sopra C c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above C?",
      "options": [
        "Db",
        "D",
        "Eb",
        "E"
      ],
      "explanation": "A major third spans 3 letter names (C → E) and 4 semitones: above C is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 5,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra C?",
      "options": [
        "F",
        "E",
        "G",
        "F#"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (C → F) e 5 semitoni: sopra C c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above C?",
      "options": [
        "F",
        "E",
        "G",
        "F#"
      ],
      "explanation": "A perfect fourth spans 4 letter names (C → F) and 5 semitones: above C is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 6,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra C?",
      "options": [
        "F#",
        "F",
        "G",
        "E"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (C → F) e 6 semitoni: sopra C c'è F#. Il tritono (6 semitoni) si scrive come quarta aumentata perché da C si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above C?",
      "options": [
        "F#",
        "F",
        "G",
        "E"
      ],
      "explanation": "An augmented fourth spans 4 letter names (C → F) and 6 semitones: above C is F#. The tritone (6 semitones) is spelled as an augmented fourth here: from C you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 7,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra C?",
      "options": [
        "Ab",
        "G",
        "F#",
        "E"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (C → G) e 7 semitoni: sopra C c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above C?",
      "options": [
        "Ab",
        "G",
        "F#",
        "E"
      ],
      "explanation": "A perfect fifth spans 5 letter names (C → G) and 7 semitones: above C is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 8,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra C?",
      "options": [
        "Ab",
        "A",
        "B",
        "Bb"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (C → A) e 8 semitoni: sopra C c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above C?",
      "options": [
        "Ab",
        "A",
        "B",
        "Bb"
      ],
      "explanation": "A minor sixth spans 6 letter names (C → A) and 8 semitones: above C is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 9,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra C?",
      "options": [
        "A",
        "Bb",
        "B",
        "G"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (C → A) e 9 semitoni: sopra C c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above C?",
      "options": [
        "A",
        "Bb",
        "B",
        "G"
      ],
      "explanation": "A major sixth spans 6 letter names (C → A) and 9 semitones: above C is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 10,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra C?",
      "options": [
        "G",
        "B",
        "Bb",
        "A"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (C → B) e 10 semitoni: sopra C c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above C?",
      "options": [
        "G",
        "B",
        "Bb",
        "A"
      ],
      "explanation": "A minor seventh spans 7 letter names (C → B) and 10 semitones: above C is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 11,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra C?",
      "options": [
        "Ab",
        "B",
        "F#",
        "A"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (C → B) e 11 semitoni: sopra C c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above C?",
      "options": [
        "Ab",
        "B",
        "F#",
        "A"
      ],
      "explanation": "A major seventh spans 7 letter names (C → B) and 11 semitones: above C is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 12,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra C#?",
      "options": [
        "E#",
        "E",
        "D#",
        "D"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (C → D) e 1 semitono: sopra C# c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above C#?",
      "options": [
        "E#",
        "E",
        "D#",
        "D"
      ],
      "explanation": "A minor second spans 2 letter names (C → D) and 1 semitone: above C# is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 13,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra C#?",
      "options": [
        "F#",
        "F##",
        "D#",
        "E"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (C → D) e 2 semitoni: sopra C# c'è D#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above C#?",
      "options": [
        "F#",
        "F##",
        "D#",
        "E"
      ],
      "explanation": "A major second spans 2 letter names (C → D) and 2 semitones: above C# is D#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 14,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza minore sopra C#?",
      "options": [
        "E",
        "D#",
        "F#",
        "E#"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (C → E) e 3 semitoni: sopra C# c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above C#?",
      "options": [
        "E",
        "D#",
        "F#",
        "E#"
      ],
      "explanation": "A minor third spans 3 letter names (C → E) and 3 semitones: above C# is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 15,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra C#?",
      "options": [
        "E",
        "E#",
        "F##",
        "D#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (C → E) e 4 semitoni: sopra C# c'è E# (E# suona come F).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above C#?",
      "options": [
        "E",
        "E#",
        "F##",
        "D#"
      ],
      "explanation": "A major third spans 3 letter names (C → E) and 4 semitones: above C# is E# (E# sounds as F).",
      "sub": "Intervals"
    }
  },
  {
    "id": 16,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra C#?",
      "options": [
        "F#",
        "F##",
        "E#",
        "E"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (C → F) e 5 semitoni: sopra C# c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above C#?",
      "options": [
        "F#",
        "F##",
        "E#",
        "E"
      ],
      "explanation": "A perfect fourth spans 4 letter names (C → F) and 5 semitones: above C# is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 17,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta diminuita (tritono) sopra C#?",
      "options": [
        "G#",
        "F#",
        "G",
        "E#"
      ],
      "explanation": "Una quinta diminuita comprende 5 nomi di nota (C → G) e 6 semitoni: sopra C# c'è G. Il tritono (6 semitoni) si scrive come quinta diminuita perché da C# si contano 5 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an diminished fifth (tritone) above C#?",
      "options": [
        "G#",
        "F#",
        "G",
        "E#"
      ],
      "explanation": "A diminished fifth spans 5 letter names (C → G) and 6 semitones: above C# is G. The tritone (6 semitones) is spelled as an diminished fifth here: from C# you count 5 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 18,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra C#?",
      "options": [
        "F#",
        "B",
        "G#",
        "A#"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (C → G) e 7 semitoni: sopra C# c'è G#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above C#?",
      "options": [
        "F#",
        "B",
        "G#",
        "A#"
      ],
      "explanation": "A perfect fifth spans 5 letter names (C → G) and 7 semitones: above C# is G#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 19,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra C#?",
      "options": [
        "B",
        "G#",
        "A",
        "A#"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (C → A) e 8 semitoni: sopra C# c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above C#?",
      "options": [
        "B",
        "G#",
        "A",
        "A#"
      ],
      "explanation": "A minor sixth spans 6 letter names (C → A) and 8 semitones: above C# is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 20,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra C#?",
      "options": [
        "A#",
        "B#",
        "F##",
        "B"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (C → A) e 9 semitoni: sopra C# c'è A#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above C#?",
      "options": [
        "A#",
        "B#",
        "F##",
        "B"
      ],
      "explanation": "A major sixth spans 6 letter names (C → A) and 9 semitones: above C# is A#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 21,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima minore sopra C#?",
      "options": [
        "B",
        "A",
        "F##",
        "B#"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (C → B) e 10 semitoni: sopra C# c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above C#?",
      "options": [
        "B",
        "A",
        "F##",
        "B#"
      ],
      "explanation": "A minor seventh spans 7 letter names (C → B) and 10 semitones: above C# is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 22,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra C#?",
      "options": [
        "B#",
        "B",
        "A#",
        "F##"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (C → B) e 11 semitoni: sopra C# c'è B# (B# suona come C).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above C#?",
      "options": [
        "B#",
        "B",
        "A#",
        "F##"
      ],
      "explanation": "A major seventh spans 7 letter names (C → B) and 11 semitones: above C# is B# (B# sounds as C).",
      "sub": "Intervals"
    }
  },
  {
    "id": 23,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra Db?",
      "options": [
        "Gb",
        "Ebb",
        "G",
        "Fb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (D → E) e 1 semitono: sopra Db c'è Ebb (Ebb suona come D).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above Db?",
      "options": [
        "Gb",
        "Ebb",
        "G",
        "Fb"
      ],
      "explanation": "A minor second spans 2 letter names (D → E) and 1 semitone: above Db is Ebb (Ebb sounds as D).",
      "sub": "Intervals"
    }
  },
  {
    "id": 24,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra Db?",
      "options": [
        "Eb",
        "Ebb",
        "G",
        "F"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (D → E) e 2 semitoni: sopra Db c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above Db?",
      "options": [
        "Eb",
        "Ebb",
        "G",
        "F"
      ],
      "explanation": "A major second spans 2 letter names (D → E) and 2 semitones: above Db is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 25,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza minore sopra Db?",
      "options": [
        "Ebb",
        "Gb",
        "Fb",
        "F"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (D → F) e 3 semitoni: sopra Db c'è Fb (Fb suona come E).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above Db?",
      "options": [
        "Ebb",
        "Gb",
        "Fb",
        "F"
      ],
      "explanation": "A minor third spans 3 letter names (D → F) and 3 semitones: above Db is Fb (Fb sounds as E).",
      "sub": "Intervals"
    }
  },
  {
    "id": 26,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra Db?",
      "options": [
        "Ebb",
        "F",
        "Fb",
        "Eb"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (D → F) e 4 semitoni: sopra Db c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above Db?",
      "options": [
        "Ebb",
        "F",
        "Fb",
        "Eb"
      ],
      "explanation": "A major third spans 3 letter names (D → F) and 4 semitones: above Db is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 27,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra Db?",
      "options": [
        "Gb",
        "F",
        "Ab",
        "Fb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (D → G) e 5 semitoni: sopra Db c'è Gb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above Db?",
      "options": [
        "Gb",
        "F",
        "Ab",
        "Fb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (D → G) and 5 semitones: above Db is Gb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 28,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra Db?",
      "options": [
        "G",
        "F",
        "Bbb",
        "Gb"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (D → G) e 6 semitoni: sopra Db c'è G. Il tritono (6 semitoni) si scrive come quarta aumentata perché da Db si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above Db?",
      "options": [
        "G",
        "F",
        "Bbb",
        "Gb"
      ],
      "explanation": "An augmented fourth spans 4 letter names (D → G) and 6 semitones: above Db is G. The tritone (6 semitones) is spelled as an augmented fourth here: from Db you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 29,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra Db?",
      "options": [
        "F",
        "Bb",
        "Ab",
        "Bbb"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (D → A) e 7 semitoni: sopra Db c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above Db?",
      "options": [
        "F",
        "Bb",
        "Ab",
        "Bbb"
      ],
      "explanation": "A perfect fifth spans 5 letter names (D → A) and 7 semitones: above Db is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 30,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra Db?",
      "options": [
        "Gb",
        "Cb",
        "Bbb",
        "Bb"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (D → B) e 8 semitoni: sopra Db c'è Bbb (Bbb suona come A).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above Db?",
      "options": [
        "Gb",
        "Cb",
        "Bbb",
        "Bb"
      ],
      "explanation": "A minor sixth spans 6 letter names (D → B) and 8 semitones: above Db is Bbb (Bbb sounds as A).",
      "sub": "Intervals"
    }
  },
  {
    "id": 31,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra Db?",
      "options": [
        "Ab",
        "Cb",
        "Bb",
        "Bbb"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (D → B) e 9 semitoni: sopra Db c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above Db?",
      "options": [
        "Ab",
        "Cb",
        "Bb",
        "Bbb"
      ],
      "explanation": "A major sixth spans 6 letter names (D → B) and 9 semitones: above Db is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 32,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima minore sopra Db?",
      "options": [
        "Cb",
        "Ab",
        "C",
        "G"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (D → C) e 10 semitoni: sopra Db c'è Cb (Cb suona come B).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above Db?",
      "options": [
        "Cb",
        "Ab",
        "C",
        "G"
      ],
      "explanation": "A minor seventh spans 7 letter names (D → C) and 10 semitones: above Db is Cb (Cb sounds as B).",
      "sub": "Intervals"
    }
  },
  {
    "id": 33,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra Db?",
      "options": [
        "C",
        "Bbb",
        "G",
        "Ab"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (D → C) e 11 semitoni: sopra Db c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above Db?",
      "options": [
        "C",
        "Bbb",
        "G",
        "Ab"
      ],
      "explanation": "A major seventh spans 7 letter names (D → C) and 11 semitones: above Db is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 34,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra D?",
      "options": [
        "F",
        "E",
        "G#",
        "Eb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (D → E) e 1 semitono: sopra D c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above D?",
      "options": [
        "F",
        "E",
        "G#",
        "Eb"
      ],
      "explanation": "A minor second spans 2 letter names (D → E) and 1 semitone: above D is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 35,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra D?",
      "options": [
        "F",
        "G",
        "E",
        "Eb"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (D → E) e 2 semitoni: sopra D c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above D?",
      "options": [
        "F",
        "G",
        "E",
        "Eb"
      ],
      "explanation": "A major second spans 2 letter names (D → E) and 2 semitones: above D is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 36,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza minore sopra D?",
      "options": [
        "E",
        "F",
        "G",
        "F#"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (D → F) e 3 semitoni: sopra D c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above D?",
      "options": [
        "E",
        "F",
        "G",
        "F#"
      ],
      "explanation": "A minor third spans 3 letter names (D → F) and 3 semitones: above D is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 37,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra D?",
      "options": [
        "Eb",
        "E",
        "G",
        "F#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (D → F) e 4 semitoni: sopra D c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above D?",
      "options": [
        "Eb",
        "E",
        "G",
        "F#"
      ],
      "explanation": "A major third spans 3 letter names (D → F) and 4 semitones: above D is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 38,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra D?",
      "options": [
        "G",
        "A",
        "F",
        "F#"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (D → G) e 5 semitoni: sopra D c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above D?",
      "options": [
        "G",
        "A",
        "F",
        "F#"
      ],
      "explanation": "A perfect fourth spans 4 letter names (D → G) and 5 semitones: above D is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 39,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra D?",
      "options": [
        "F#",
        "A",
        "Bb",
        "G#"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (D → G) e 6 semitoni: sopra D c'è G#. Il tritono (6 semitoni) si scrive come quarta aumentata perché da D si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above D?",
      "options": [
        "F#",
        "A",
        "Bb",
        "G#"
      ],
      "explanation": "An augmented fourth spans 4 letter names (D → G) and 6 semitones: above D is G#. The tritone (6 semitones) is spelled as an augmented fourth here: from D you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 40,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra D?",
      "options": [
        "F#",
        "A",
        "Bb",
        "B"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (D → A) e 7 semitoni: sopra D c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above D?",
      "options": [
        "F#",
        "A",
        "Bb",
        "B"
      ],
      "explanation": "A perfect fifth spans 5 letter names (D → A) and 7 semitones: above D is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 41,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra D?",
      "options": [
        "Bb",
        "A",
        "G#",
        "C"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (D → B) e 8 semitoni: sopra D c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above D?",
      "options": [
        "Bb",
        "A",
        "G#",
        "C"
      ],
      "explanation": "A minor sixth spans 6 letter names (D → B) and 8 semitones: above D is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 42,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra D?",
      "options": [
        "C#",
        "B",
        "C",
        "Bb"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (D → B) e 9 semitoni: sopra D c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above D?",
      "options": [
        "C#",
        "B",
        "C",
        "Bb"
      ],
      "explanation": "A major sixth spans 6 letter names (D → B) and 9 semitones: above D is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 43,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima minore sopra D?",
      "options": [
        "A",
        "C",
        "C#",
        "B"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (D → C) e 10 semitoni: sopra D c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above D?",
      "options": [
        "A",
        "C",
        "C#",
        "B"
      ],
      "explanation": "A minor seventh spans 7 letter names (D → C) and 10 semitones: above D is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 44,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra D?",
      "options": [
        "Bb",
        "C#",
        "B",
        "G#"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (D → C) e 11 semitoni: sopra D c'è C#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above D?",
      "options": [
        "Bb",
        "C#",
        "B",
        "G#"
      ],
      "explanation": "A major seventh spans 7 letter names (D → C) and 11 semitones: above D is C#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 45,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra Eb?",
      "options": [
        "Fb",
        "F",
        "G",
        "A"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (E → F) e 1 semitono: sopra Eb c'è Fb (Fb suona come E).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above Eb?",
      "options": [
        "Fb",
        "F",
        "G",
        "A"
      ],
      "explanation": "A minor second spans 2 letter names (E → F) and 1 semitone: above Eb is Fb (Fb sounds as E).",
      "sub": "Intervals"
    }
  },
  {
    "id": 46,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra Eb?",
      "options": [
        "Ab",
        "A",
        "Gb",
        "F"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (E → F) e 2 semitoni: sopra Eb c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above Eb?",
      "options": [
        "Ab",
        "A",
        "Gb",
        "F"
      ],
      "explanation": "A major second spans 2 letter names (E → F) and 2 semitones: above Eb is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 47,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza minore sopra Eb?",
      "options": [
        "F",
        "Ab",
        "G",
        "Gb"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (E → G) e 3 semitoni: sopra Eb c'è Gb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above Eb?",
      "options": [
        "F",
        "Ab",
        "G",
        "Gb"
      ],
      "explanation": "A minor third spans 3 letter names (E → G) and 3 semitones: above Eb is Gb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 48,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra Eb?",
      "options": [
        "G",
        "A",
        "Ab",
        "F"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (E → G) e 4 semitoni: sopra Eb c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above Eb?",
      "options": [
        "G",
        "A",
        "Ab",
        "F"
      ],
      "explanation": "A major third spans 3 letter names (E → G) and 4 semitones: above Eb is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 49,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra Eb?",
      "options": [
        "G",
        "Ab",
        "Gb",
        "Cb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (E → A) e 5 semitoni: sopra Eb c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above Eb?",
      "options": [
        "G",
        "Ab",
        "Gb",
        "Cb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (E → A) and 5 semitones: above Eb is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 50,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra Eb?",
      "options": [
        "Ab",
        "Bb",
        "A",
        "Cb"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (E → A) e 6 semitoni: sopra Eb c'è A. Il tritono (6 semitoni) si scrive come quarta aumentata perché da Eb si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above Eb?",
      "options": [
        "Ab",
        "Bb",
        "A",
        "Cb"
      ],
      "explanation": "An augmented fourth spans 4 letter names (E → A) and 6 semitones: above Eb is A. The tritone (6 semitones) is spelled as an augmented fourth here: from Eb you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 51,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra Eb?",
      "options": [
        "Cb",
        "Bb",
        "C",
        "G"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (E → B) e 7 semitoni: sopra Eb c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above Eb?",
      "options": [
        "Cb",
        "Bb",
        "C",
        "G"
      ],
      "explanation": "A perfect fifth spans 5 letter names (E → B) and 7 semitones: above Eb is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 52,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra Eb?",
      "options": [
        "Bb",
        "A",
        "C",
        "Cb"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (E → C) e 8 semitoni: sopra Eb c'è Cb (Cb suona come B).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above Eb?",
      "options": [
        "Bb",
        "A",
        "C",
        "Cb"
      ],
      "explanation": "A minor sixth spans 6 letter names (E → C) and 8 semitones: above Eb is Cb (Cb sounds as B).",
      "sub": "Intervals"
    }
  },
  {
    "id": 53,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra Eb?",
      "options": [
        "C",
        "Cb",
        "D",
        "A"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (E → C) e 9 semitoni: sopra Eb c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above Eb?",
      "options": [
        "C",
        "Cb",
        "D",
        "A"
      ],
      "explanation": "A major sixth spans 6 letter names (E → C) and 9 semitones: above Eb is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 54,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima minore sopra Eb?",
      "options": [
        "Db",
        "C",
        "Cb",
        "Bb"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (E → D) e 10 semitoni: sopra Eb c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above Eb?",
      "options": [
        "Db",
        "C",
        "Cb",
        "Bb"
      ],
      "explanation": "A minor seventh spans 7 letter names (E → D) and 10 semitones: above Eb is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 55,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra Eb?",
      "options": [
        "Bb",
        "D",
        "Db",
        "A"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (E → D) e 11 semitoni: sopra Eb c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above Eb?",
      "options": [
        "Bb",
        "D",
        "Db",
        "A"
      ],
      "explanation": "A major seventh spans 7 letter names (E → D) and 11 semitones: above Eb is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 56,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra E?",
      "options": [
        "G",
        "G#",
        "A#",
        "F"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (E → F) e 1 semitono: sopra E c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above E?",
      "options": [
        "G",
        "G#",
        "A#",
        "F"
      ],
      "explanation": "A minor second spans 2 letter names (E → F) and 1 semitone: above E is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 57,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra E?",
      "options": [
        "F",
        "A#",
        "F#",
        "G"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (E → F) e 2 semitoni: sopra E c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above E?",
      "options": [
        "F",
        "A#",
        "F#",
        "G"
      ],
      "explanation": "A major second spans 2 letter names (E → F) and 2 semitones: above E is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 58,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza minore sopra E?",
      "options": [
        "F",
        "A",
        "G",
        "G#"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (E → G) e 3 semitoni: sopra E c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above E?",
      "options": [
        "F",
        "A",
        "G",
        "G#"
      ],
      "explanation": "A minor third spans 3 letter names (E → G) and 3 semitones: above E is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 59,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra E?",
      "options": [
        "A",
        "A#",
        "G#",
        "F#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (E → G) e 4 semitoni: sopra E c'è G#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above E?",
      "options": [
        "A",
        "A#",
        "G#",
        "F#"
      ],
      "explanation": "A major third spans 3 letter names (E → G) and 4 semitones: above E is G#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 60,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra E?",
      "options": [
        "G",
        "A",
        "B",
        "A#"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (E → A) e 5 semitoni: sopra E c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above E?",
      "options": [
        "G",
        "A",
        "B",
        "A#"
      ],
      "explanation": "A perfect fourth spans 4 letter names (E → A) and 5 semitones: above E is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 61,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra E?",
      "options": [
        "A#",
        "C",
        "A",
        "G#"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (E → A) e 6 semitoni: sopra E c'è A#. Il tritono (6 semitoni) si scrive come quarta aumentata perché da E si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above E?",
      "options": [
        "A#",
        "C",
        "A",
        "G#"
      ],
      "explanation": "An augmented fourth spans 4 letter names (E → A) and 6 semitones: above E is A#. The tritone (6 semitones) is spelled as an augmented fourth here: from E you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 62,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra E?",
      "options": [
        "A#",
        "B",
        "C#",
        "C"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (E → B) e 7 semitoni: sopra E c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above E?",
      "options": [
        "A#",
        "B",
        "C#",
        "C"
      ],
      "explanation": "A perfect fifth spans 5 letter names (E → B) and 7 semitones: above E is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 63,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra E?",
      "options": [
        "D#",
        "C#",
        "C",
        "B"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (E → C) e 8 semitoni: sopra E c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above E?",
      "options": [
        "D#",
        "C#",
        "C",
        "B"
      ],
      "explanation": "A minor sixth spans 6 letter names (E → C) and 8 semitones: above E is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 64,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra E?",
      "options": [
        "C",
        "C#",
        "B",
        "A#"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (E → C) e 9 semitoni: sopra E c'è C#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above E?",
      "options": [
        "C",
        "C#",
        "B",
        "A#"
      ],
      "explanation": "A major sixth spans 6 letter names (E → C) and 9 semitones: above E is C#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 65,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra E?",
      "options": [
        "C#",
        "A#",
        "D",
        "B"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (E → D) e 10 semitoni: sopra E c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above E?",
      "options": [
        "C#",
        "A#",
        "D",
        "B"
      ],
      "explanation": "A minor seventh spans 7 letter names (E → D) and 10 semitones: above E is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 66,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra E?",
      "options": [
        "D",
        "D#",
        "C",
        "C#"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (E → D) e 11 semitoni: sopra E c'è D#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above E?",
      "options": [
        "D",
        "D#",
        "C",
        "C#"
      ],
      "explanation": "A major seventh spans 7 letter names (E → D) and 11 semitones: above E is D#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 67,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra F?",
      "options": [
        "Ab",
        "Gb",
        "G",
        "Bb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (F → G) e 1 semitono: sopra F c'è Gb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above F?",
      "options": [
        "Ab",
        "Gb",
        "G",
        "Bb"
      ],
      "explanation": "A minor second spans 2 letter names (F → G) and 1 semitone: above F is Gb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 68,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra F?",
      "options": [
        "G",
        "B",
        "Bb",
        "Gb"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (F → G) e 2 semitoni: sopra F c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above F?",
      "options": [
        "G",
        "B",
        "Bb",
        "Gb"
      ],
      "explanation": "A major second spans 2 letter names (F → G) and 2 semitones: above F is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 69,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza minore sopra F?",
      "options": [
        "A",
        "Bb",
        "G",
        "Ab"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (F → A) e 3 semitoni: sopra F c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above F?",
      "options": [
        "A",
        "Bb",
        "G",
        "Ab"
      ],
      "explanation": "A minor third spans 3 letter names (F → A) and 3 semitones: above F is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 70,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra F?",
      "options": [
        "Bb",
        "Gb",
        "G",
        "A"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (F → A) e 4 semitoni: sopra F c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above F?",
      "options": [
        "Bb",
        "Gb",
        "G",
        "A"
      ],
      "explanation": "A major third spans 3 letter names (F → A) and 4 semitones: above F is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 71,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra F?",
      "options": [
        "B",
        "Ab",
        "A",
        "Bb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (F → B) e 5 semitoni: sopra F c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above F?",
      "options": [
        "B",
        "Ab",
        "A",
        "Bb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (F → B) and 5 semitones: above F is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 72,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra F?",
      "options": [
        "C",
        "B",
        "Bb",
        "Db"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (F → B) e 6 semitoni: sopra F c'è B. Il tritono (6 semitoni) si scrive come quarta aumentata perché da F si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above F?",
      "options": [
        "C",
        "B",
        "Bb",
        "Db"
      ],
      "explanation": "An augmented fourth spans 4 letter names (F → B) and 6 semitones: above F is B. The tritone (6 semitones) is spelled as an augmented fourth here: from F you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 73,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra F?",
      "options": [
        "D",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (F → C) e 7 semitoni: sopra F c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above F?",
      "options": [
        "D",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "A perfect fifth spans 5 letter names (F → C) and 7 semitones: above F is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 74,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra F?",
      "options": [
        "B",
        "C",
        "E",
        "Db"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (F → D) e 8 semitoni: sopra F c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above F?",
      "options": [
        "B",
        "C",
        "E",
        "Db"
      ],
      "explanation": "A minor sixth spans 6 letter names (F → D) and 8 semitones: above F is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 75,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra F?",
      "options": [
        "D",
        "Db",
        "C",
        "E"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (F → D) e 9 semitoni: sopra F c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above F?",
      "options": [
        "D",
        "Db",
        "C",
        "E"
      ],
      "explanation": "A major sixth spans 6 letter names (F → D) and 9 semitones: above F is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 76,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima minore sopra F?",
      "options": [
        "Eb",
        "Db",
        "C",
        "D"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (F → E) e 10 semitoni: sopra F c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above F?",
      "options": [
        "Eb",
        "Db",
        "C",
        "D"
      ],
      "explanation": "A minor seventh spans 7 letter names (F → E) and 10 semitones: above F is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 77,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra F?",
      "options": [
        "E",
        "Eb",
        "D",
        "C"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (F → E) e 11 semitoni: sopra F c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above F?",
      "options": [
        "E",
        "Eb",
        "D",
        "C"
      ],
      "explanation": "A major seventh spans 7 letter names (F → E) and 11 semitones: above F is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 78,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra F#?",
      "options": [
        "A",
        "G",
        "B#",
        "G#"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (F → G) e 1 semitono: sopra F# c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above F#?",
      "options": [
        "A",
        "G",
        "B#",
        "G#"
      ],
      "explanation": "A minor second spans 2 letter names (F → G) and 1 semitone: above F# is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 79,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra F#?",
      "options": [
        "A#",
        "G#",
        "A",
        "G"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (F → G) e 2 semitoni: sopra F# c'è G#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above F#?",
      "options": [
        "A#",
        "G#",
        "A",
        "G"
      ],
      "explanation": "A major second spans 2 letter names (F → G) and 2 semitones: above F# is G#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 80,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza minore sopra F#?",
      "options": [
        "G#",
        "G",
        "A",
        "B#"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (F → A) e 3 semitoni: sopra F# c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above F#?",
      "options": [
        "G#",
        "G",
        "A",
        "B#"
      ],
      "explanation": "A minor third spans 3 letter names (F → A) and 3 semitones: above F# is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 81,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra F#?",
      "options": [
        "A",
        "C#",
        "A#",
        "G#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (F → A) e 4 semitoni: sopra F# c'è A#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above F#?",
      "options": [
        "A",
        "C#",
        "A#",
        "G#"
      ],
      "explanation": "A major third spans 3 letter names (F → A) and 4 semitones: above F# is A#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 82,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra F#?",
      "options": [
        "B",
        "C#",
        "D",
        "A"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (F → B) e 5 semitoni: sopra F# c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above F#?",
      "options": [
        "B",
        "C#",
        "D",
        "A"
      ],
      "explanation": "A perfect fourth spans 4 letter names (F → B) and 5 semitones: above F# is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 83,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta diminuita (tritono) sopra F#?",
      "options": [
        "C#",
        "D",
        "C",
        "B"
      ],
      "explanation": "Una quinta diminuita comprende 5 nomi di nota (F → C) e 6 semitoni: sopra F# c'è C. Il tritono (6 semitoni) si scrive come quinta diminuita perché da F# si contano 5 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an diminished fifth (tritone) above F#?",
      "options": [
        "C#",
        "D",
        "C",
        "B"
      ],
      "explanation": "A diminished fifth spans 5 letter names (F → C) and 6 semitones: above F# is C. The tritone (6 semitones) is spelled as an diminished fifth here: from F# you count 5 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 84,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra F#?",
      "options": [
        "D",
        "B#",
        "C#",
        "E"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (F → C) e 7 semitoni: sopra F# c'è C#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above F#?",
      "options": [
        "D",
        "B#",
        "C#",
        "E"
      ],
      "explanation": "A perfect fifth spans 5 letter names (F → C) and 7 semitones: above F# is C#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 85,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra F#?",
      "options": [
        "E#",
        "E",
        "C#",
        "D"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (F → D) e 8 semitoni: sopra F# c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above F#?",
      "options": [
        "E#",
        "E",
        "C#",
        "D"
      ],
      "explanation": "A minor sixth spans 6 letter names (F → D) and 8 semitones: above F# is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 86,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra F#?",
      "options": [
        "E",
        "D#",
        "D",
        "B#"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (F → D) e 9 semitoni: sopra F# c'è D#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above F#?",
      "options": [
        "E",
        "D#",
        "D",
        "B#"
      ],
      "explanation": "A major sixth spans 6 letter names (F → D) and 9 semitones: above F# is D#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 87,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una settima minore sopra F#?",
      "options": [
        "E#",
        "D",
        "D#",
        "E"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (F → E) e 10 semitoni: sopra F# c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above F#?",
      "options": [
        "E#",
        "D",
        "D#",
        "E"
      ],
      "explanation": "A minor seventh spans 7 letter names (F → E) and 10 semitones: above F# is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 88,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra F#?",
      "options": [
        "C#",
        "D",
        "E",
        "E#"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (F → E) e 11 semitoni: sopra F# c'è E# (E# suona come F).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above F#?",
      "options": [
        "C#",
        "D",
        "E",
        "E#"
      ],
      "explanation": "A major seventh spans 7 letter names (F → E) and 11 semitones: above F# is E# (E# sounds as F).",
      "sub": "Intervals"
    }
  },
  {
    "id": 89,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra Gb?",
      "options": [
        "Bbb",
        "Cb",
        "Bb",
        "Abb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (G → A) e 1 semitono: sopra Gb c'è Abb (Abb suona come G).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above Gb?",
      "options": [
        "Bbb",
        "Cb",
        "Bb",
        "Abb"
      ],
      "explanation": "A minor second spans 2 letter names (G → A) and 1 semitone: above Gb is Abb (Abb sounds as G).",
      "sub": "Intervals"
    }
  },
  {
    "id": 90,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra Gb?",
      "options": [
        "Cb",
        "Bb",
        "Ab",
        "Abb"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (G → A) e 2 semitoni: sopra Gb c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above Gb?",
      "options": [
        "Cb",
        "Bb",
        "Ab",
        "Abb"
      ],
      "explanation": "A major second spans 2 letter names (G → A) and 2 semitones: above Gb is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 91,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza minore sopra Gb?",
      "options": [
        "Bbb",
        "Bb",
        "Cb",
        "Abb"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (G → B) e 3 semitoni: sopra Gb c'è Bbb (Bbb suona come A).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above Gb?",
      "options": [
        "Bbb",
        "Bb",
        "Cb",
        "Abb"
      ],
      "explanation": "A minor third spans 3 letter names (G → B) and 3 semitones: above Gb is Bbb (Bbb sounds as A).",
      "sub": "Intervals"
    }
  },
  {
    "id": 92,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra Gb?",
      "options": [
        "Bb",
        "C",
        "Abb",
        "Bbb"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (G → B) e 4 semitoni: sopra Gb c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above Gb?",
      "options": [
        "Bb",
        "C",
        "Abb",
        "Bbb"
      ],
      "explanation": "A major third spans 3 letter names (G → B) and 4 semitones: above Gb is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 93,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra Gb?",
      "options": [
        "Cb",
        "Ab",
        "Db",
        "Bbb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (G → C) e 5 semitoni: sopra Gb c'è Cb (Cb suona come B).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above Gb?",
      "options": [
        "Cb",
        "Ab",
        "Db",
        "Bbb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (G → C) and 5 semitones: above Gb is Cb (Cb sounds as B).",
      "sub": "Intervals"
    }
  },
  {
    "id": 94,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra Gb?",
      "options": [
        "C",
        "Cb",
        "Db",
        "Ebb"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (G → C) e 6 semitoni: sopra Gb c'è C. Il tritono (6 semitoni) si scrive come quarta aumentata perché da Gb si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above Gb?",
      "options": [
        "C",
        "Cb",
        "Db",
        "Ebb"
      ],
      "explanation": "An augmented fourth spans 4 letter names (G → C) and 6 semitones: above Gb is C. The tritone (6 semitones) is spelled as an augmented fourth here: from Gb you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 95,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra Gb?",
      "options": [
        "Db",
        "Eb",
        "C",
        "Fb"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (G → D) e 7 semitoni: sopra Gb c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above Gb?",
      "options": [
        "Db",
        "Eb",
        "C",
        "Fb"
      ],
      "explanation": "A perfect fifth spans 5 letter names (G → D) and 7 semitones: above Gb is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 96,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra Gb?",
      "options": [
        "Fb",
        "C",
        "Ebb",
        "Eb"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (G → E) e 8 semitoni: sopra Gb c'è Ebb (Ebb suona come D).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above Gb?",
      "options": [
        "Fb",
        "C",
        "Ebb",
        "Eb"
      ],
      "explanation": "A minor sixth spans 6 letter names (G → E) and 8 semitones: above Gb is Ebb (Ebb sounds as D).",
      "sub": "Intervals"
    }
  },
  {
    "id": 97,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra Gb?",
      "options": [
        "Ebb",
        "C",
        "Eb",
        "Fb"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (G → E) e 9 semitoni: sopra Gb c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above Gb?",
      "options": [
        "Ebb",
        "C",
        "Eb",
        "Fb"
      ],
      "explanation": "A major sixth spans 6 letter names (G → E) and 9 semitones: above Gb is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 98,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra Gb?",
      "options": [
        "Ebb",
        "F",
        "Fb",
        "Db"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (G → F) e 10 semitoni: sopra Gb c'è Fb (Fb suona come E).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above Gb?",
      "options": [
        "Ebb",
        "F",
        "Fb",
        "Db"
      ],
      "explanation": "A minor seventh spans 7 letter names (G → F) and 10 semitones: above Gb is Fb (Fb sounds as E).",
      "sub": "Intervals"
    }
  },
  {
    "id": 99,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra Gb?",
      "options": [
        "Fb",
        "Db",
        "Eb",
        "F"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (G → F) e 11 semitoni: sopra Gb c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above Gb?",
      "options": [
        "Fb",
        "Db",
        "Eb",
        "F"
      ],
      "explanation": "A major seventh spans 7 letter names (G → F) and 11 semitones: above Gb is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 100,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra G?",
      "options": [
        "B",
        "Bb",
        "A",
        "Ab"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (G → A) e 1 semitono: sopra G c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above G?",
      "options": [
        "B",
        "Bb",
        "A",
        "Ab"
      ],
      "explanation": "A minor second spans 2 letter names (G → A) and 1 semitone: above G is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 101,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra G?",
      "options": [
        "C",
        "C#",
        "A",
        "Ab"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (G → A) e 2 semitoni: sopra G c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above G?",
      "options": [
        "C",
        "C#",
        "A",
        "Ab"
      ],
      "explanation": "A major second spans 2 letter names (G → A) and 2 semitones: above G is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 102,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza minore sopra G?",
      "options": [
        "A",
        "Bb",
        "B",
        "C#"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (G → B) e 3 semitoni: sopra G c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above G?",
      "options": [
        "A",
        "Bb",
        "B",
        "C#"
      ],
      "explanation": "A minor third spans 3 letter names (G → B) and 3 semitones: above G is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 103,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra G?",
      "options": [
        "Ab",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (G → B) e 4 semitoni: sopra G c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above G?",
      "options": [
        "Ab",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "A major third spans 3 letter names (G → B) and 4 semitones: above G is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 104,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra G?",
      "options": [
        "C",
        "D",
        "Bb",
        "A"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (G → C) e 5 semitoni: sopra G c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above G?",
      "options": [
        "C",
        "D",
        "Bb",
        "A"
      ],
      "explanation": "A perfect fourth spans 4 letter names (G → C) and 5 semitones: above G is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 105,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra G?",
      "options": [
        "D",
        "B",
        "Eb",
        "C#"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (G → C) e 6 semitoni: sopra G c'è C#. Il tritono (6 semitoni) si scrive come quarta aumentata perché da G si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above G?",
      "options": [
        "D",
        "B",
        "Eb",
        "C#"
      ],
      "explanation": "An augmented fourth spans 4 letter names (G → C) and 6 semitones: above G is C#. The tritone (6 semitones) is spelled as an augmented fourth here: from G you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 106,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra G?",
      "options": [
        "F",
        "D",
        "E",
        "C"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (G → D) e 7 semitoni: sopra G c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above G?",
      "options": [
        "F",
        "D",
        "E",
        "C"
      ],
      "explanation": "A perfect fifth spans 5 letter names (G → D) and 7 semitones: above G is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 107,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra G?",
      "options": [
        "Eb",
        "D",
        "E",
        "C#"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (G → E) e 8 semitoni: sopra G c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above G?",
      "options": [
        "Eb",
        "D",
        "E",
        "C#"
      ],
      "explanation": "A minor sixth spans 6 letter names (G → E) and 8 semitones: above G is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 108,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra G?",
      "options": [
        "D",
        "F#",
        "E",
        "C#"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (G → E) e 9 semitoni: sopra G c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above G?",
      "options": [
        "D",
        "F#",
        "E",
        "C#"
      ],
      "explanation": "A major sixth spans 6 letter names (G → E) and 9 semitones: above G is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 109,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima minore sopra G?",
      "options": [
        "F",
        "Eb",
        "C#",
        "D"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (G → F) e 10 semitoni: sopra G c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above G?",
      "options": [
        "F",
        "Eb",
        "C#",
        "D"
      ],
      "explanation": "A minor seventh spans 7 letter names (G → F) and 10 semitones: above G is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 110,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra G?",
      "options": [
        "F#",
        "D",
        "E",
        "Eb"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (G → F) e 11 semitoni: sopra G c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above G?",
      "options": [
        "F#",
        "D",
        "E",
        "Eb"
      ],
      "explanation": "A major seventh spans 7 letter names (G → F) and 11 semitones: above G is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 111,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra Ab?",
      "options": [
        "Bbb",
        "D",
        "Bb",
        "C"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (A → B) e 1 semitono: sopra Ab c'è Bbb (Bbb suona come A).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above Ab?",
      "options": [
        "Bbb",
        "D",
        "Bb",
        "C"
      ],
      "explanation": "A minor second spans 2 letter names (A → B) and 1 semitone: above Ab is Bbb (Bbb sounds as A).",
      "sub": "Intervals"
    }
  },
  {
    "id": 112,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra Ab?",
      "options": [
        "Db",
        "Bb",
        "C",
        "D"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (A → B) e 2 semitoni: sopra Ab c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above Ab?",
      "options": [
        "Db",
        "Bb",
        "C",
        "D"
      ],
      "explanation": "A major second spans 2 letter names (A → B) and 2 semitones: above Ab is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 113,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza minore sopra Ab?",
      "options": [
        "Cb",
        "Db",
        "C",
        "Bbb"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (A → C) e 3 semitoni: sopra Ab c'è Cb (Cb suona come B).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above Ab?",
      "options": [
        "Cb",
        "Db",
        "C",
        "Bbb"
      ],
      "explanation": "A minor third spans 3 letter names (A → C) and 3 semitones: above Ab is Cb (Cb sounds as B).",
      "sub": "Intervals"
    }
  },
  {
    "id": 114,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra Ab?",
      "options": [
        "Cb",
        "Db",
        "D",
        "C"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (A → C) e 4 semitoni: sopra Ab c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above Ab?",
      "options": [
        "Cb",
        "Db",
        "D",
        "C"
      ],
      "explanation": "A major third spans 3 letter names (A → C) and 4 semitones: above Ab is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 115,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra Ab?",
      "options": [
        "Eb",
        "D",
        "Db",
        "Cb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (A → D) e 5 semitoni: sopra Ab c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above Ab?",
      "options": [
        "Eb",
        "D",
        "Db",
        "Cb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (A → D) and 5 semitones: above Ab is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 116,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra Ab?",
      "options": [
        "C",
        "Eb",
        "D",
        "Db"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (A → D) e 6 semitoni: sopra Ab c'è D. Il tritono (6 semitoni) si scrive come quarta aumentata perché da Ab si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above Ab?",
      "options": [
        "C",
        "Eb",
        "D",
        "Db"
      ],
      "explanation": "An augmented fourth spans 4 letter names (A → D) and 6 semitones: above Ab is D. The tritone (6 semitones) is spelled as an augmented fourth here: from Ab you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 117,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra Ab?",
      "options": [
        "Eb",
        "Fb",
        "Db",
        "F"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (A → E) e 7 semitoni: sopra Ab c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above Ab?",
      "options": [
        "Eb",
        "Fb",
        "Db",
        "F"
      ],
      "explanation": "A perfect fifth spans 5 letter names (A → E) and 7 semitones: above Ab is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 118,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra Ab?",
      "options": [
        "Fb",
        "Gb",
        "D",
        "F"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (A → F) e 8 semitoni: sopra Ab c'è Fb (Fb suona come E).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above Ab?",
      "options": [
        "Fb",
        "Gb",
        "D",
        "F"
      ],
      "explanation": "A minor sixth spans 6 letter names (A → F) and 8 semitones: above Ab is Fb (Fb sounds as E).",
      "sub": "Intervals"
    }
  },
  {
    "id": 119,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra Ab?",
      "options": [
        "G",
        "Gb",
        "F",
        "D"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (A → F) e 9 semitoni: sopra Ab c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above Ab?",
      "options": [
        "G",
        "Gb",
        "F",
        "D"
      ],
      "explanation": "A major sixth spans 6 letter names (A → F) and 9 semitones: above Ab is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 120,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra Ab?",
      "options": [
        "Eb",
        "D",
        "Gb",
        "F"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (A → G) e 10 semitoni: sopra Ab c'è Gb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above Ab?",
      "options": [
        "Eb",
        "D",
        "Gb",
        "F"
      ],
      "explanation": "A minor seventh spans 7 letter names (A → G) and 10 semitones: above Ab is Gb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 121,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra Ab?",
      "options": [
        "F",
        "G",
        "Eb",
        "Fb"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (A → G) e 11 semitoni: sopra Ab c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above Ab?",
      "options": [
        "F",
        "G",
        "Eb",
        "Fb"
      ],
      "explanation": "A major seventh spans 7 letter names (A → G) and 11 semitones: above Ab is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 122,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra A?",
      "options": [
        "D#",
        "C#",
        "D",
        "Bb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (A → B) e 1 semitono: sopra A c'è Bb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above A?",
      "options": [
        "D#",
        "C#",
        "D",
        "Bb"
      ],
      "explanation": "A minor second spans 2 letter names (A → B) and 1 semitone: above A is Bb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 123,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra A?",
      "options": [
        "Bb",
        "C",
        "D",
        "B"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (A → B) e 2 semitoni: sopra A c'è B.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above A?",
      "options": [
        "Bb",
        "C",
        "D",
        "B"
      ],
      "explanation": "A major second spans 2 letter names (A → B) and 2 semitones: above A is B.",
      "sub": "Intervals"
    }
  },
  {
    "id": 124,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza minore sopra A?",
      "options": [
        "D#",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (A → C) e 3 semitoni: sopra A c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above A?",
      "options": [
        "D#",
        "C",
        "B",
        "Bb"
      ],
      "explanation": "A minor third spans 3 letter names (A → C) and 3 semitones: above A is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 125,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra A?",
      "options": [
        "Bb",
        "C",
        "C#",
        "D#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (A → C) e 4 semitoni: sopra A c'è C#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above A?",
      "options": [
        "Bb",
        "C",
        "C#",
        "D#"
      ],
      "explanation": "A major third spans 3 letter names (A → C) and 4 semitones: above A is C#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 126,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra A?",
      "options": [
        "D",
        "F",
        "C",
        "D#"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (A → D) e 5 semitoni: sopra A c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above A?",
      "options": [
        "D",
        "F",
        "C",
        "D#"
      ],
      "explanation": "A perfect fourth spans 4 letter names (A → D) and 5 semitones: above A is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 127,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra A?",
      "options": [
        "D",
        "F",
        "E",
        "D#"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (A → D) e 6 semitoni: sopra A c'è D#. Il tritono (6 semitoni) si scrive come quarta aumentata perché da A si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above A?",
      "options": [
        "D",
        "F",
        "E",
        "D#"
      ],
      "explanation": "An augmented fourth spans 4 letter names (A → D) and 6 semitones: above A is D#. The tritone (6 semitones) is spelled as an augmented fourth here: from A you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 128,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra A?",
      "options": [
        "G",
        "F#",
        "E",
        "D#"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (A → E) e 7 semitoni: sopra A c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above A?",
      "options": [
        "G",
        "F#",
        "E",
        "D#"
      ],
      "explanation": "A perfect fifth spans 5 letter names (A → E) and 7 semitones: above A is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 129,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra A?",
      "options": [
        "D#",
        "G#",
        "F",
        "G"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (A → F) e 8 semitoni: sopra A c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above A?",
      "options": [
        "D#",
        "G#",
        "F",
        "G"
      ],
      "explanation": "A minor sixth spans 6 letter names (A → F) and 8 semitones: above A is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 130,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra A?",
      "options": [
        "G#",
        "F",
        "E",
        "F#"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (A → F) e 9 semitoni: sopra A c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above A?",
      "options": [
        "G#",
        "F",
        "E",
        "F#"
      ],
      "explanation": "A major sixth spans 6 letter names (A → F) and 9 semitones: above A is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 131,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra A?",
      "options": [
        "E",
        "G#",
        "G",
        "F#"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (A → G) e 10 semitoni: sopra A c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above A?",
      "options": [
        "E",
        "G#",
        "G",
        "F#"
      ],
      "explanation": "A minor seventh spans 7 letter names (A → G) and 10 semitones: above A is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 132,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra A?",
      "options": [
        "G#",
        "F",
        "E",
        "F#"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (A → G) e 11 semitoni: sopra A c'è G#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above A?",
      "options": [
        "G#",
        "F",
        "E",
        "F#"
      ],
      "explanation": "A major seventh spans 7 letter names (A → G) and 11 semitones: above A is G#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 133,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra Bb?",
      "options": [
        "Db",
        "D",
        "E",
        "Cb"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (B → C) e 1 semitono: sopra Bb c'è Cb (Cb suona come B).",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above Bb?",
      "options": [
        "Db",
        "D",
        "E",
        "Cb"
      ],
      "explanation": "A minor second spans 2 letter names (B → C) and 1 semitone: above Bb is Cb (Cb sounds as B).",
      "sub": "Intervals"
    }
  },
  {
    "id": 134,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra Bb?",
      "options": [
        "E",
        "D",
        "Db",
        "C"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (B → C) e 2 semitoni: sopra Bb c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above Bb?",
      "options": [
        "E",
        "D",
        "Db",
        "C"
      ],
      "explanation": "A major second spans 2 letter names (B → C) and 2 semitones: above Bb is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 135,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza minore sopra Bb?",
      "options": [
        "Db",
        "Cb",
        "C",
        "Eb"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (B → D) e 3 semitoni: sopra Bb c'è Db.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above Bb?",
      "options": [
        "Db",
        "Cb",
        "C",
        "Eb"
      ],
      "explanation": "A minor third spans 3 letter names (B → D) and 3 semitones: above Bb is Db.",
      "sub": "Intervals"
    }
  },
  {
    "id": 136,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra Bb?",
      "options": [
        "E",
        "D",
        "Cb",
        "Db"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (B → D) e 4 semitoni: sopra Bb c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above Bb?",
      "options": [
        "E",
        "D",
        "Cb",
        "Db"
      ],
      "explanation": "A major third spans 3 letter names (B → D) and 4 semitones: above Bb is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 137,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra Bb?",
      "options": [
        "C",
        "D",
        "F",
        "Eb"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (B → E) e 5 semitoni: sopra Bb c'è Eb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above Bb?",
      "options": [
        "C",
        "D",
        "F",
        "Eb"
      ],
      "explanation": "A perfect fourth spans 4 letter names (B → E) and 5 semitones: above Bb is Eb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 138,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una quarta aumentata (tritono) sopra Bb?",
      "options": [
        "F",
        "E",
        "Gb",
        "Eb"
      ],
      "explanation": "Una quarta aumentata comprende 4 nomi di nota (B → E) e 6 semitoni: sopra Bb c'è E. Il tritono (6 semitoni) si scrive come quarta aumentata perché da Bb si contano 4 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an augmented fourth (tritone) above Bb?",
      "options": [
        "F",
        "E",
        "Gb",
        "Eb"
      ],
      "explanation": "An augmented fourth spans 4 letter names (B → E) and 6 semitones: above Bb is E. The tritone (6 semitones) is spelled as an augmented fourth here: from Bb you count 4 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 139,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra Bb?",
      "options": [
        "F",
        "Eb",
        "Gb",
        "Ab"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (B → F) e 7 semitoni: sopra Bb c'è F.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above Bb?",
      "options": [
        "F",
        "Eb",
        "Gb",
        "Ab"
      ],
      "explanation": "A perfect fifth spans 5 letter names (B → F) and 7 semitones: above Bb is F.",
      "sub": "Intervals"
    }
  },
  {
    "id": 140,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra Bb?",
      "options": [
        "Ab",
        "G",
        "Gb",
        "A"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (B → G) e 8 semitoni: sopra Bb c'è Gb.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above Bb?",
      "options": [
        "Ab",
        "G",
        "Gb",
        "A"
      ],
      "explanation": "A minor sixth spans 6 letter names (B → G) and 8 semitones: above Bb is Gb.",
      "sub": "Intervals"
    }
  },
  {
    "id": 141,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra Bb?",
      "options": [
        "Gb",
        "A",
        "Ab",
        "G"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (B → G) e 9 semitoni: sopra Bb c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above Bb?",
      "options": [
        "Gb",
        "A",
        "Ab",
        "G"
      ],
      "explanation": "A major sixth spans 6 letter names (B → G) and 9 semitones: above Bb is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 142,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una settima minore sopra Bb?",
      "options": [
        "F",
        "G",
        "Ab",
        "Gb"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (B → A) e 10 semitoni: sopra Bb c'è Ab.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above Bb?",
      "options": [
        "F",
        "G",
        "Ab",
        "Gb"
      ],
      "explanation": "A minor seventh spans 7 letter names (B → A) and 10 semitones: above Bb is Ab.",
      "sub": "Intervals"
    }
  },
  {
    "id": 143,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra Bb?",
      "options": [
        "F",
        "G",
        "Ab",
        "A"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (B → A) e 11 semitoni: sopra Bb c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above Bb?",
      "options": [
        "F",
        "G",
        "Ab",
        "A"
      ],
      "explanation": "A major seventh spans 7 letter names (B → A) and 11 semitones: above Bb is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 144,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda minore sopra B?",
      "options": [
        "C",
        "E#",
        "D",
        "C#"
      ],
      "explanation": "Una seconda minore comprende 2 nomi di nota (B → C) e 1 semitono: sopra B c'è C.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor second above B?",
      "options": [
        "C",
        "E#",
        "D",
        "C#"
      ],
      "explanation": "A minor second spans 2 letter names (B → C) and 1 semitone: above B is C.",
      "sub": "Intervals"
    }
  },
  {
    "id": 145,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una seconda maggiore sopra B?",
      "options": [
        "C#",
        "D",
        "C",
        "E"
      ],
      "explanation": "Una seconda maggiore comprende 2 nomi di nota (B → C) e 2 semitoni: sopra B c'è C#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major second above B?",
      "options": [
        "C#",
        "D",
        "C",
        "E"
      ],
      "explanation": "A major second spans 2 letter names (B → C) and 2 semitones: above B is C#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 146,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una terza minore sopra B?",
      "options": [
        "E#",
        "C",
        "D#",
        "D"
      ],
      "explanation": "Una terza minore comprende 3 nomi di nota (B → D) e 3 semitoni: sopra B c'è D.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor third above B?",
      "options": [
        "E#",
        "C",
        "D#",
        "D"
      ],
      "explanation": "A minor third spans 3 letter names (B → D) and 3 semitones: above B is D.",
      "sub": "Intervals"
    }
  },
  {
    "id": 147,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una terza maggiore sopra B?",
      "options": [
        "D#",
        "C",
        "E#",
        "C#"
      ],
      "explanation": "Una terza maggiore comprende 3 nomi di nota (B → D) e 4 semitoni: sopra B c'è D#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major third above B?",
      "options": [
        "D#",
        "C",
        "E#",
        "C#"
      ],
      "explanation": "A major third spans 3 letter names (B → D) and 4 semitones: above B is D#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 148,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale nota si trova una quarta giusta sopra B?",
      "options": [
        "F#",
        "D",
        "E",
        "D#"
      ],
      "explanation": "Una quarta giusta comprende 4 nomi di nota (B → E) e 5 semitoni: sopra B c'è E.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fourth above B?",
      "options": [
        "F#",
        "D",
        "E",
        "D#"
      ],
      "explanation": "A perfect fourth spans 4 letter names (B → E) and 5 semitones: above B is E.",
      "sub": "Intervals"
    }
  },
  {
    "id": 149,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quinta diminuita (tritono) sopra B?",
      "options": [
        "D#",
        "E",
        "F#",
        "F"
      ],
      "explanation": "Una quinta diminuita comprende 5 nomi di nota (B → F) e 6 semitoni: sopra B c'è F. Il tritono (6 semitoni) si scrive come quinta diminuita perché da B si contano 5 lettere.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is an diminished fifth (tritone) above B?",
      "options": [
        "D#",
        "E",
        "F#",
        "F"
      ],
      "explanation": "A diminished fifth spans 5 letter names (B → F) and 6 semitones: above B is F. The tritone (6 semitones) is spelled as an diminished fifth here: from B you count 5 letter names.",
      "sub": "Intervals"
    }
  },
  {
    "id": 150,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale nota si trova una quinta giusta sopra B?",
      "options": [
        "E#",
        "D#",
        "G",
        "F#"
      ],
      "explanation": "Una quinta giusta comprende 5 nomi di nota (B → F) e 7 semitoni: sopra B c'è F#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a perfect fifth above B?",
      "options": [
        "E#",
        "D#",
        "G",
        "F#"
      ],
      "explanation": "A perfect fifth spans 5 letter names (B → F) and 7 semitones: above B is F#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 151,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una sesta minore sopra B?",
      "options": [
        "E",
        "G",
        "G#",
        "F#"
      ],
      "explanation": "Una sesta minore comprende 6 nomi di nota (B → G) e 8 semitoni: sopra B c'è G.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor sixth above B?",
      "options": [
        "E",
        "G",
        "G#",
        "F#"
      ],
      "explanation": "A minor sixth spans 6 letter names (B → G) and 8 semitones: above B is G.",
      "sub": "Intervals"
    }
  },
  {
    "id": 152,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una sesta maggiore sopra B?",
      "options": [
        "G#",
        "G",
        "A#",
        "A"
      ],
      "explanation": "Una sesta maggiore comprende 6 nomi di nota (B → G) e 9 semitoni: sopra B c'è G#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major sixth above B?",
      "options": [
        "G#",
        "G",
        "A#",
        "A"
      ],
      "explanation": "A major sixth spans 6 letter names (B → G) and 9 semitones: above B is G#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 153,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale nota si trova una settima minore sopra B?",
      "options": [
        "G",
        "A",
        "F#",
        "A#"
      ],
      "explanation": "Una settima minore comprende 7 nomi di nota (B → A) e 10 semitoni: sopra B c'è A.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a minor seventh above B?",
      "options": [
        "G",
        "A",
        "F#",
        "A#"
      ],
      "explanation": "A minor seventh spans 7 letter names (B → A) and 10 semitones: above B is A.",
      "sub": "Intervals"
    }
  },
  {
    "id": 154,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale nota si trova una settima maggiore sopra B?",
      "options": [
        "A#",
        "E#",
        "F#",
        "G"
      ],
      "explanation": "Una settima maggiore comprende 7 nomi di nota (B → A) e 11 semitoni: sopra B c'è A#.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "Which note is a major seventh above B?",
      "options": [
        "A#",
        "E#",
        "F#",
        "G"
      ],
      "explanation": "A major seventh spans 7 letter names (B → A) and 11 semitones: above B is A#.",
      "sub": "Intervals"
    }
  },
  {
    "id": 155,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Cmaj7?",
      "options": [
        "C, E, G, Bb",
        "C, E, G, B",
        "C, Eb, G, B",
        "C, E, G, A"
      ],
      "explanation": "Cmaj7 = 1 – 3 – 5 – 7 → C, E, G, B. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cmaj7 chord?",
      "options": [
        "C, E, G, Bb",
        "C, E, G, B",
        "C, Eb, G, B",
        "C, E, G, A"
      ],
      "explanation": "Cmaj7 = 1 – 3 – 5 – 7 → C, E, G, B. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 156,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Cm7?",
      "options": [
        "C, Eb, G, A",
        "C, Eb, G, Bb",
        "C, Eb, G, B",
        "C, E, G, Bb"
      ],
      "explanation": "Cm7 = 1 – b3 – 5 – b7 → C, Eb, G, Bb. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cm7 chord?",
      "options": [
        "C, Eb, G, A",
        "C, Eb, G, Bb",
        "C, Eb, G, B",
        "C, E, G, Bb"
      ],
      "explanation": "Cm7 = 1 – b3 – 5 – b7 → C, Eb, G, Bb. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 157,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C7?",
      "options": [
        "C, E, G, Bb",
        "C, Eb, G, Bb",
        "C, E, G, B",
        "C, F, G, Bb"
      ],
      "explanation": "C7 = 1 – 3 – 5 – b7 → C, E, G, Bb. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C7 chord?",
      "options": [
        "C, E, G, Bb",
        "C, Eb, G, Bb",
        "C, E, G, B",
        "C, F, G, Bb"
      ],
      "explanation": "C7 = 1 – 3 – 5 – b7 → C, E, G, Bb. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 158,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Cm7b5?",
      "options": [
        "C, Eb, Gb, Bb",
        "C, Eb, G, A",
        "C, Eb, G, Bb",
        "C, E, Gb, Bb"
      ],
      "explanation": "Cm7b5 = 1 – b3 – b5 – b7 → C, Eb, Gb, Bb. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cm7b5 chord?",
      "options": [
        "C, Eb, Gb, Bb",
        "C, Eb, G, A",
        "C, Eb, G, Bb",
        "C, E, Gb, Bb"
      ],
      "explanation": "Cm7b5 = 1 – b3 – b5 – b7 → C, Eb, Gb, Bb. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 159,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Cdim7?",
      "options": [
        "C, Eb, Gb, Bb",
        "C, Eb, Gb, Bbb",
        "C, Eb, G, A",
        "C, E, G, Bb"
      ],
      "explanation": "Cdim7 = 1 – b3 – b5 – bb7 → C, Eb, Gb, Bbb (Bbb suona come A). Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cdim7 chord?",
      "options": [
        "C, Eb, Gb, Bb",
        "C, Eb, Gb, Bbb",
        "C, Eb, G, A",
        "C, E, G, Bb"
      ],
      "explanation": "Cdim7 = 1 – b3 – b5 – bb7 → C, Eb, Gb, Bbb (Bbb sounds as A). Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 160,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Cmaj9?",
      "options": [
        "C, Eb, G, Bb, D",
        "C, E, G, B",
        "C, E, G, Bb, D",
        "C, E, G, B, D"
      ],
      "explanation": "Cmaj9 = 1 – 3 – 5 – 7 – 9 → C, E, G, B, D. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cmaj9 chord?",
      "options": [
        "C, Eb, G, Bb, D",
        "C, E, G, B",
        "C, E, G, Bb, D",
        "C, E, G, B, D"
      ],
      "explanation": "Cmaj9 = 1 – 3 – 5 – 7 – 9 → C, E, G, B, D. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 161,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo C6?",
      "options": [
        "C, Eb, G, A",
        "C, E, G, A",
        "C, E, G, B",
        "C, Eb, G, Bb"
      ],
      "explanation": "C6 = 1 – 3 – 5 – 6 → C, E, G, A. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C6 chord?",
      "options": [
        "C, Eb, G, A",
        "C, E, G, A",
        "C, E, G, B",
        "C, Eb, G, Bb"
      ],
      "explanation": "C6 = 1 – 3 – 5 – 6 → C, E, G, A. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 162,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Cm6?",
      "options": [
        "C, E, G, A",
        "C, Eb, Gb, Bb",
        "C, Eb, G, A",
        "C, Eb, G, Bb"
      ],
      "explanation": "Cm6 = 1 – b3 – 5 – 6 → C, Eb, G, A. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Cm6 chord?",
      "options": [
        "C, E, G, A",
        "C, Eb, Gb, Bb",
        "C, Eb, G, A",
        "C, Eb, G, Bb"
      ],
      "explanation": "Cm6 = 1 – b3 – 5 – 6 → C, Eb, G, A. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 163,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C7sus4?",
      "options": [
        "C, F, G, Bb",
        "C, E, G, B",
        "C, Eb, G, Bb",
        "C, E, G, A"
      ],
      "explanation": "C7sus4 = 1 – 4 – 5 – b7 → C, F, G, Bb. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C7sus4 chord?",
      "options": [
        "C, F, G, Bb",
        "C, E, G, B",
        "C, Eb, G, Bb",
        "C, E, G, A"
      ],
      "explanation": "C7sus4 = 1 – 4 – 5 – b7 → C, F, G, Bb. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 164,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C#maj7?",
      "options": [
        "C#, E#, G#, B#",
        "C#, E, G#, B#",
        "C#, E#, G#, A#",
        "C#, E#, G#, B"
      ],
      "explanation": "C#maj7 = 1 – 3 – 5 – 7 → C#, E#, G#, B# (E# suona come F, B# suona come C). Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#maj7 chord?",
      "options": [
        "C#, E#, G#, B#",
        "C#, E, G#, B#",
        "C#, E#, G#, A#",
        "C#, E#, G#, B"
      ],
      "explanation": "C#maj7 = 1 – 3 – 5 – 7 → C#, E#, G#, B# (E# sounds as F, B# sounds as C). Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 165,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo C#m7?",
      "options": [
        "C#, E, G, B",
        "C#, E, G#, A#",
        "C#, E, G#, B#",
        "C#, E, G#, B"
      ],
      "explanation": "C#m7 = 1 – b3 – 5 – b7 → C#, E, G#, B. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#m7 chord?",
      "options": [
        "C#, E, G, B",
        "C#, E, G#, A#",
        "C#, E, G#, B#",
        "C#, E, G#, B"
      ],
      "explanation": "C#m7 = 1 – b3 – 5 – b7 → C#, E, G#, B. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 166,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo C#7?",
      "options": [
        "C#, E, G, B",
        "C#, E#, G#, B",
        "C#, E, G#, B",
        "C#, F#, G#, B"
      ],
      "explanation": "C#7 = 1 – 3 – 5 – b7 → C#, E#, G#, B (E# suona come F). Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#7 chord?",
      "options": [
        "C#, E, G, B",
        "C#, E#, G#, B",
        "C#, E, G#, B",
        "C#, F#, G#, B"
      ],
      "explanation": "C#7 = 1 – 3 – 5 – b7 → C#, E#, G#, B (E# sounds as F). Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 167,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo C#m7b5?",
      "options": [
        "C#, E#, G, B",
        "C#, E, G, B",
        "C#, E, G#, B",
        "C#, E, G#, A#"
      ],
      "explanation": "C#m7b5 = 1 – b3 – b5 – b7 → C#, E, G, B. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#m7b5 chord?",
      "options": [
        "C#, E#, G, B",
        "C#, E, G, B",
        "C#, E, G#, B",
        "C#, E, G#, A#"
      ],
      "explanation": "C#m7b5 = 1 – b3 – b5 – b7 → C#, E, G, B. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 168,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C#dim7?",
      "options": [
        "C#, E, G, Bb",
        "C#, E, G#, B",
        "C#, E#, G#, B",
        "C#, E, G#, A#"
      ],
      "explanation": "C#dim7 = 1 – b3 – b5 – bb7 → C#, E, G, Bb. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#dim7 chord?",
      "options": [
        "C#, E, G, Bb",
        "C#, E, G#, B",
        "C#, E#, G#, B",
        "C#, E, G#, A#"
      ],
      "explanation": "C#dim7 = 1 – b3 – b5 – bb7 → C#, E, G, Bb. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 169,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C#maj9?",
      "options": [
        "C#, E#, G#, B#, D#",
        "C#, E#, G#, B#",
        "C#, E, G#, B, D#",
        "C#, E#, G#, B, D#"
      ],
      "explanation": "C#maj9 = 1 – 3 – 5 – 7 – 9 → C#, E#, G#, B#, D# (E# suona come F, B# suona come C). Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#maj9 chord?",
      "options": [
        "C#, E#, G#, B#, D#",
        "C#, E#, G#, B#",
        "C#, E, G#, B, D#",
        "C#, E#, G#, B, D#"
      ],
      "explanation": "C#maj9 = 1 – 3 – 5 – 7 – 9 → C#, E#, G#, B#, D# (E# sounds as F, B# sounds as C). Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 170,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo C#6?",
      "options": [
        "C#, E, G#, A#",
        "C#, E#, G#, A#",
        "C#, E#, G#, B",
        "C#, E, G#, B"
      ],
      "explanation": "C#6 = 1 – 3 – 5 – 6 → C#, E#, G#, A# (E# suona come F). Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#6 chord?",
      "options": [
        "C#, E, G#, A#",
        "C#, E#, G#, A#",
        "C#, E#, G#, B",
        "C#, E, G#, B"
      ],
      "explanation": "C#6 = 1 – 3 – 5 – 6 → C#, E#, G#, A# (E# sounds as F). Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 171,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C#m6?",
      "options": [
        "C#, E, G#, A#",
        "C#, E, G, B",
        "C#, E, G#, B",
        "C#, E#, G#, A#"
      ],
      "explanation": "C#m6 = 1 – b3 – 5 – 6 → C#, E, G#, A#. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#m6 chord?",
      "options": [
        "C#, E, G#, A#",
        "C#, E, G, B",
        "C#, E, G#, B",
        "C#, E#, G#, A#"
      ],
      "explanation": "C#m6 = 1 – b3 – 5 – 6 → C#, E, G#, A#. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 172,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo C#7sus4?",
      "options": [
        "C#, E#, G#, B",
        "C#, E, G#, B",
        "C#, F#, G#, B",
        "C#, E#, G#, B#"
      ],
      "explanation": "C#7sus4 = 1 – 4 – 5 – b7 → C#, F#, G#, B. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the C#7sus4 chord?",
      "options": [
        "C#, E#, G#, B",
        "C#, E, G#, B",
        "C#, F#, G#, B",
        "C#, E#, G#, B#"
      ],
      "explanation": "C#7sus4 = 1 – 4 – 5 – b7 → C#, F#, G#, B. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 173,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Dbmaj7?",
      "options": [
        "Db, F, Ab, Bb",
        "Db, F, Ab, C",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Dbmaj7 = 1 – 3 – 5 – 7 → Db, F, Ab, C. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dbmaj7 chord?",
      "options": [
        "Db, F, Ab, Bb",
        "Db, F, Ab, C",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Dbmaj7 = 1 – 3 – 5 – 7 → Db, F, Ab, C. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 174,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Dbm7?",
      "options": [
        "Db, Fb, Ab, C",
        "Db, Fb, Ab, Bb",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Dbm7 = 1 – b3 – 5 – b7 → Db, Fb, Ab, Cb (Fb suona come E, Cb suona come B). Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dbm7 chord?",
      "options": [
        "Db, Fb, Ab, C",
        "Db, Fb, Ab, Bb",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Dbm7 = 1 – b3 – 5 – b7 → Db, Fb, Ab, Cb (Fb sounds as E, Cb sounds as B). Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 175,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Db7?",
      "options": [
        "Db, F, Ab, Cb",
        "Db, F, Ab, C",
        "Db, Fb, Ab, Cb",
        "Db, Gb, Ab, Cb"
      ],
      "explanation": "Db7 = 1 – 3 – 5 – b7 → Db, F, Ab, Cb (Cb suona come B). Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Db7 chord?",
      "options": [
        "Db, F, Ab, Cb",
        "Db, F, Ab, C",
        "Db, Fb, Ab, Cb",
        "Db, Gb, Ab, Cb"
      ],
      "explanation": "Db7 = 1 – 3 – 5 – b7 → Db, F, Ab, Cb (Cb sounds as B). Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 176,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo D#m7b5?",
      "options": [
        "D#, F#, A#, B#",
        "D#, F#, A, C#",
        "D#, F#, A#, C#",
        "D#, F#, A, C"
      ],
      "explanation": "D#m7b5 = 1 – b3 – b5 – b7 → D#, F#, A, C#. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D#m7b5 chord?",
      "options": [
        "D#, F#, A#, B#",
        "D#, F#, A, C#",
        "D#, F#, A#, C#",
        "D#, F#, A, C"
      ],
      "explanation": "D#m7b5 = 1 – b3 – b5 – b7 → D#, F#, A, C#. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 177,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo D#dim7?",
      "options": [
        "D#, F#, A, C#",
        "D#, F#, A#, B#",
        "D#, F#, A#, C#",
        "D#, F#, A, C"
      ],
      "explanation": "D#dim7 = 1 – b3 – b5 – bb7 → D#, F#, A, C. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D#dim7 chord?",
      "options": [
        "D#, F#, A, C#",
        "D#, F#, A#, B#",
        "D#, F#, A#, C#",
        "D#, F#, A, C"
      ],
      "explanation": "D#dim7 = 1 – b3 – b5 – bb7 → D#, F#, A, C. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 178,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Dbmaj9?",
      "options": [
        "Db, F, Ab, C, Eb",
        "Db, F, Ab, Cb, Eb",
        "Db, Fb, Ab, Cb, Eb",
        "Db, F, Ab, C"
      ],
      "explanation": "Dbmaj9 = 1 – 3 – 5 – 7 – 9 → Db, F, Ab, C, Eb. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dbmaj9 chord?",
      "options": [
        "Db, F, Ab, C, Eb",
        "Db, F, Ab, Cb, Eb",
        "Db, Fb, Ab, Cb, Eb",
        "Db, F, Ab, C"
      ],
      "explanation": "Dbmaj9 = 1 – 3 – 5 – 7 – 9 → Db, F, Ab, C, Eb. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 179,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Db6?",
      "options": [
        "Db, Fb, Ab, Bb",
        "Db, F, Ab, Bb",
        "Db, F, Ab, Cb",
        "Db, Fb, Ab, Cb"
      ],
      "explanation": "Db6 = 1 – 3 – 5 – 6 → Db, F, Ab, Bb. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Db6 chord?",
      "options": [
        "Db, Fb, Ab, Bb",
        "Db, F, Ab, Bb",
        "Db, F, Ab, Cb",
        "Db, Fb, Ab, Cb"
      ],
      "explanation": "Db6 = 1 – 3 – 5 – 6 → Db, F, Ab, Bb. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 180,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Dbm6?",
      "options": [
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Bb",
        "Db, Fb, Ab, Bb",
        "Db, Fb, Ab, C"
      ],
      "explanation": "Dbm6 = 1 – b3 – 5 – 6 → Db, Fb, Ab, Bb (Fb suona come E). Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dbm6 chord?",
      "options": [
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Bb",
        "Db, Fb, Ab, Bb",
        "Db, Fb, Ab, C"
      ],
      "explanation": "Dbm6 = 1 – b3 – 5 – 6 → Db, Fb, Ab, Bb (Fb sounds as E). Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 181,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Db7sus4?",
      "options": [
        "Db, Gb, Ab, Cb",
        "Db, F, Ab, Bb",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Db7sus4 = 1 – 4 – 5 – b7 → Db, Gb, Ab, Cb (Cb suona come B). La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Db7sus4 chord?",
      "options": [
        "Db, Gb, Ab, Cb",
        "Db, F, Ab, Bb",
        "Db, Fb, Ab, Cb",
        "Db, F, Ab, Cb"
      ],
      "explanation": "Db7sus4 = 1 – 4 – 5 – b7 → Db, Gb, Ab, Cb (Cb sounds as B). The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 182,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Dmaj7?",
      "options": [
        "D, F, A, C#",
        "D, F#, A, C#",
        "D, F#, A, C",
        "D, F#, A, B"
      ],
      "explanation": "Dmaj7 = 1 – 3 – 5 – 7 → D, F#, A, C#. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dmaj7 chord?",
      "options": [
        "D, F, A, C#",
        "D, F#, A, C#",
        "D, F#, A, C",
        "D, F#, A, B"
      ],
      "explanation": "Dmaj7 = 1 – 3 – 5 – 7 → D, F#, A, C#. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 183,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Dm7?",
      "options": [
        "D, F, A, C",
        "D, F#, A, C",
        "D, F, Ab, C",
        "D, F, A, B"
      ],
      "explanation": "Dm7 = 1 – b3 – 5 – b7 → D, F, A, C. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dm7 chord?",
      "options": [
        "D, F, A, C",
        "D, F#, A, C",
        "D, F, Ab, C",
        "D, F, A, B"
      ],
      "explanation": "Dm7 = 1 – b3 – 5 – b7 → D, F, A, C. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 184,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo D7?",
      "options": [
        "D, G, A, C",
        "D, F#, A, C",
        "D, F#, A, C#",
        "D, F, Ab, C"
      ],
      "explanation": "D7 = 1 – 3 – 5 – b7 → D, F#, A, C. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D7 chord?",
      "options": [
        "D, G, A, C",
        "D, F#, A, C",
        "D, F#, A, C#",
        "D, F, Ab, C"
      ],
      "explanation": "D7 = 1 – 3 – 5 – b7 → D, F#, A, C. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 185,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Dm7b5?",
      "options": [
        "D, F, Ab, Cb",
        "D, F, Ab, C",
        "D, F, A, B",
        "D, F, A, C"
      ],
      "explanation": "Dm7b5 = 1 – b3 – b5 – b7 → D, F, Ab, C. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dm7b5 chord?",
      "options": [
        "D, F, Ab, Cb",
        "D, F, Ab, C",
        "D, F, A, B",
        "D, F, A, C"
      ],
      "explanation": "Dm7b5 = 1 – b3 – b5 – b7 → D, F, Ab, C. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 186,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Ddim7?",
      "options": [
        "D, F#, A, C",
        "D, F, Ab, C",
        "D, F, A, C",
        "D, F, Ab, Cb"
      ],
      "explanation": "Ddim7 = 1 – b3 – b5 – bb7 → D, F, Ab, Cb (Cb suona come B). Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ddim7 chord?",
      "options": [
        "D, F#, A, C",
        "D, F, Ab, C",
        "D, F, A, C",
        "D, F, Ab, Cb"
      ],
      "explanation": "Ddim7 = 1 – b3 – b5 – bb7 → D, F, Ab, Cb (Cb sounds as B). Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 187,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Dmaj9?",
      "options": [
        "D, F#, A, C#, G#",
        "D, F#, A, C#, E",
        "D, F#, A, C#",
        "D, F#, A, C, E"
      ],
      "explanation": "Dmaj9 = 1 – 3 – 5 – 7 – 9 → D, F#, A, C#, E. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dmaj9 chord?",
      "options": [
        "D, F#, A, C#, G#",
        "D, F#, A, C#, E",
        "D, F#, A, C#",
        "D, F#, A, C, E"
      ],
      "explanation": "Dmaj9 = 1 – 3 – 5 – 7 – 9 → D, F#, A, C#, E. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 188,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo D6?",
      "options": [
        "D, F, A, C",
        "D, F#, A, C",
        "D, F#, A, B",
        "D, F, A, B"
      ],
      "explanation": "D6 = 1 – 3 – 5 – 6 → D, F#, A, B. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D6 chord?",
      "options": [
        "D, F, A, C",
        "D, F#, A, C",
        "D, F#, A, B",
        "D, F, A, B"
      ],
      "explanation": "D6 = 1 – 3 – 5 – 6 → D, F#, A, B. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 189,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Dm6?",
      "options": [
        "D, F, A, C",
        "D, F, A, C#",
        "D, F, A, B",
        "D, F#, A, B"
      ],
      "explanation": "Dm6 = 1 – b3 – 5 – 6 → D, F, A, B. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Dm6 chord?",
      "options": [
        "D, F, A, C",
        "D, F, A, C#",
        "D, F, A, B",
        "D, F#, A, B"
      ],
      "explanation": "Dm6 = 1 – b3 – 5 – 6 → D, F, A, B. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 190,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo D7sus4?",
      "options": [
        "D, F, A, C",
        "D, G, A, C",
        "D, F#, A, C",
        "D, F#, A, C#"
      ],
      "explanation": "D7sus4 = 1 – 4 – 5 – b7 → D, G, A, C. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D7sus4 chord?",
      "options": [
        "D, F, A, C",
        "D, G, A, C",
        "D, F#, A, C",
        "D, F#, A, C#"
      ],
      "explanation": "D7sus4 = 1 – 4 – 5 – b7 → D, G, A, C. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 191,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Ebmaj7?",
      "options": [
        "Eb, G, Bb, Db",
        "Eb, G, Bb, D",
        "Eb, G, Bb, C",
        "Eb, Gb, Bb, Db"
      ],
      "explanation": "Ebmaj7 = 1 – 3 – 5 – 7 → Eb, G, Bb, D. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ebmaj7 chord?",
      "options": [
        "Eb, G, Bb, Db",
        "Eb, G, Bb, D",
        "Eb, G, Bb, C",
        "Eb, Gb, Bb, Db"
      ],
      "explanation": "Ebmaj7 = 1 – 3 – 5 – 7 → Eb, G, Bb, D. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 192,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Ebm7?",
      "options": [
        "Eb, Gb, Bb, C",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, Db",
        "Eb, Gb, Bb, D"
      ],
      "explanation": "Ebm7 = 1 – b3 – 5 – b7 → Eb, Gb, Bb, Db. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ebm7 chord?",
      "options": [
        "Eb, Gb, Bb, C",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, Db",
        "Eb, Gb, Bb, D"
      ],
      "explanation": "Ebm7 = 1 – b3 – 5 – b7 → Eb, Gb, Bb, Db. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 193,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Eb7?",
      "options": [
        "Eb, G, Bb, D",
        "Eb, Gb, Bb, Db",
        "Eb, Ab, Bb, Db",
        "Eb, G, Bb, Db"
      ],
      "explanation": "Eb7 = 1 – 3 – 5 – b7 → Eb, G, Bb, Db. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Eb7 chord?",
      "options": [
        "Eb, G, Bb, D",
        "Eb, Gb, Bb, Db",
        "Eb, Ab, Bb, Db",
        "Eb, G, Bb, Db"
      ],
      "explanation": "Eb7 = 1 – 3 – 5 – b7 → Eb, G, Bb, Db. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 194,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G#m7b5?",
      "options": [
        "G#, B, D, F#",
        "G#, B, D, F",
        "G#, B, D#, F#",
        "G#, B, D#, E#"
      ],
      "explanation": "G#m7b5 = 1 – b3 – b5 – b7 → G#, B, D, F#. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the G#m7b5 chord?",
      "options": [
        "G#, B, D, F#",
        "G#, B, D, F",
        "G#, B, D#, F#",
        "G#, B, D#, E#"
      ],
      "explanation": "G#m7b5 = 1 – b3 – b5 – b7 → G#, B, D, F#. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 195,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G#dim7?",
      "options": [
        "G#, B, D, F",
        "G#, B, D, F#",
        "G#, B#, D#, F#",
        "G#, B, D#, F#"
      ],
      "explanation": "G#dim7 = 1 – b3 – b5 – bb7 → G#, B, D, F. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the G#dim7 chord?",
      "options": [
        "G#, B, D, F",
        "G#, B, D, F#",
        "G#, B#, D#, F#",
        "G#, B, D#, F#"
      ],
      "explanation": "G#dim7 = 1 – b3 – b5 – bb7 → G#, B, D, F. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 196,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Ebmaj9?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, Bb, D, F",
        "Eb, Gb, Bb, Db, F",
        "Eb, G, Bb, D, A"
      ],
      "explanation": "Ebmaj9 = 1 – 3 – 5 – 7 – 9 → Eb, G, Bb, D, F. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ebmaj9 chord?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, Bb, D, F",
        "Eb, Gb, Bb, Db, F",
        "Eb, G, Bb, D, A"
      ],
      "explanation": "Ebmaj9 = 1 – 3 – 5 – 7 – 9 → Eb, G, Bb, D, F. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 197,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Eb6?",
      "options": [
        "Eb, G, Bb, D",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, G, Bb, Db"
      ],
      "explanation": "Eb6 = 1 – 3 – 5 – 6 → Eb, G, Bb, C. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Eb6 chord?",
      "options": [
        "Eb, G, Bb, D",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, G, Bb, Db"
      ],
      "explanation": "Eb6 = 1 – 3 – 5 – 6 → Eb, G, Bb, C. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 198,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Ebm6?",
      "options": [
        "Eb, Gb, Bb, C",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, Gb, Bb, D"
      ],
      "explanation": "Ebm6 = 1 – b3 – 5 – 6 → Eb, Gb, Bb, C. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ebm6 chord?",
      "options": [
        "Eb, Gb, Bb, C",
        "Eb, Gb, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, Gb, Bb, D"
      ],
      "explanation": "Ebm6 = 1 – b3 – 5 – 6 → Eb, Gb, Bb, C. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 199,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Eb7sus4?",
      "options": [
        "Eb, Gb, Bb, Db",
        "Eb, Ab, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, G, Bb, D"
      ],
      "explanation": "Eb7sus4 = 1 – 4 – 5 – b7 → Eb, Ab, Bb, Db. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Eb7sus4 chord?",
      "options": [
        "Eb, Gb, Bb, Db",
        "Eb, Ab, Bb, Db",
        "Eb, G, Bb, C",
        "Eb, G, Bb, D"
      ],
      "explanation": "Eb7sus4 = 1 – 4 – 5 – b7 → Eb, Ab, Bb, Db. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 200,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Emaj7?",
      "options": [
        "E, G#, B, D",
        "E, G, B, D",
        "E, G#, B, D#",
        "E, G, B, D#"
      ],
      "explanation": "Emaj7 = 1 – 3 – 5 – 7 → E, G#, B, D#. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Emaj7 chord?",
      "options": [
        "E, G#, B, D",
        "E, G, B, D",
        "E, G#, B, D#",
        "E, G, B, D#"
      ],
      "explanation": "Emaj7 = 1 – 3 – 5 – 7 → E, G#, B, D#. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 201,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Em7?",
      "options": [
        "E, G, B, D",
        "E, G, B, D#",
        "E, G, B, C#",
        "E, G, Bb, D"
      ],
      "explanation": "Em7 = 1 – b3 – 5 – b7 → E, G, B, D. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Em7 chord?",
      "options": [
        "E, G, B, D",
        "E, G, B, D#",
        "E, G, B, C#",
        "E, G, Bb, D"
      ],
      "explanation": "Em7 = 1 – b3 – 5 – b7 → E, G, B, D. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 202,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo E7?",
      "options": [
        "E, G#, B, D#",
        "E, G, Bb, D",
        "E, G#, B, D",
        "E, G, B, D"
      ],
      "explanation": "E7 = 1 – 3 – 5 – b7 → E, G#, B, D. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the E7 chord?",
      "options": [
        "E, G#, B, D#",
        "E, G, Bb, D",
        "E, G#, B, D",
        "E, G, B, D"
      ],
      "explanation": "E7 = 1 – 3 – 5 – b7 → E, G#, B, D. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 203,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Em7b5?",
      "options": [
        "E, G, Bb, D",
        "E, G#, Bb, D",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "Em7b5 = 1 – b3 – b5 – b7 → E, G, Bb, D. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Em7b5 chord?",
      "options": [
        "E, G, Bb, D",
        "E, G#, Bb, D",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "Em7b5 = 1 – b3 – b5 – b7 → E, G, Bb, D. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 204,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Edim7?",
      "options": [
        "E, G, Bb, Db",
        "E, G, Bb, D",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "Edim7 = 1 – b3 – b5 – bb7 → E, G, Bb, Db. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Edim7 chord?",
      "options": [
        "E, G, Bb, Db",
        "E, G, Bb, D",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "Edim7 = 1 – b3 – b5 – bb7 → E, G, Bb, Db. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 205,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Emaj9?",
      "options": [
        "E, G#, B, D, F#",
        "E, G#, B, D#",
        "E, G, B, D, F#",
        "E, G#, B, D#, F#"
      ],
      "explanation": "Emaj9 = 1 – 3 – 5 – 7 – 9 → E, G#, B, D#, F#. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Emaj9 chord?",
      "options": [
        "E, G#, B, D, F#",
        "E, G#, B, D#",
        "E, G, B, D, F#",
        "E, G#, B, D#, F#"
      ],
      "explanation": "Emaj9 = 1 – 3 – 5 – 7 – 9 → E, G#, B, D#, F#. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 206,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo E6?",
      "options": [
        "E, G#, B, D#",
        "E, G#, B, C#",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "E6 = 1 – 3 – 5 – 6 → E, G#, B, C#. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the E6 chord?",
      "options": [
        "E, G#, B, D#",
        "E, G#, B, C#",
        "E, G, B, D",
        "E, G, B, C#"
      ],
      "explanation": "E6 = 1 – 3 – 5 – 6 → E, G#, B, C#. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 207,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Em6?",
      "options": [
        "E, G, Bb, D",
        "E, G, B, C#",
        "E, G#, B, C#",
        "E, G, B, D#"
      ],
      "explanation": "Em6 = 1 – b3 – 5 – 6 → E, G, B, C#. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Em6 chord?",
      "options": [
        "E, G, Bb, D",
        "E, G, B, C#",
        "E, G#, B, C#",
        "E, G, B, D#"
      ],
      "explanation": "Em6 = 1 – b3 – 5 – 6 → E, G, B, C#. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 208,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo E7sus4?",
      "options": [
        "E, G#, B, D#",
        "E, A, B, D",
        "E, G, B, D",
        "E, G#, B, C#"
      ],
      "explanation": "E7sus4 = 1 – 4 – 5 – b7 → E, A, B, D. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the E7sus4 chord?",
      "options": [
        "E, G#, B, D#",
        "E, A, B, D",
        "E, G, B, D",
        "E, G#, B, C#"
      ],
      "explanation": "E7sus4 = 1 – 4 – 5 – b7 → E, A, B, D. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 209,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Fmaj7?",
      "options": [
        "F, Ab, C, E",
        "F, A, C, E",
        "F, A, C, D",
        "F, Ab, C, Eb"
      ],
      "explanation": "Fmaj7 = 1 – 3 – 5 – 7 → F, A, C, E. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fmaj7 chord?",
      "options": [
        "F, Ab, C, E",
        "F, A, C, E",
        "F, A, C, D",
        "F, Ab, C, Eb"
      ],
      "explanation": "Fmaj7 = 1 – 3 – 5 – 7 → F, A, C, E. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 210,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Fm7?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, C, D",
        "F, A, C, Eb",
        "F, Ab, C, E"
      ],
      "explanation": "Fm7 = 1 – b3 – 5 – b7 → F, Ab, C, Eb. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fm7 chord?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, C, D",
        "F, A, C, Eb",
        "F, Ab, C, E"
      ],
      "explanation": "Fm7 = 1 – b3 – 5 – b7 → F, Ab, C, Eb. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 211,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F7?",
      "options": [
        "F, A, C, Eb",
        "F, A, C, E",
        "F, Ab, C, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "F7 = 1 – 3 – 5 – b7 → F, A, C, Eb. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F7 chord?",
      "options": [
        "F, A, C, Eb",
        "F, A, C, E",
        "F, Ab, C, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "F7 = 1 – 3 – 5 – b7 → F, A, C, Eb. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 212,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Fm7b5?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, C, D",
        "F, A, Cb, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "Fm7b5 = 1 – b3 – b5 – b7 → F, Ab, Cb, Eb (Cb suona come B). Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fm7b5 chord?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, C, D",
        "F, A, Cb, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "Fm7b5 = 1 – b3 – b5 – b7 → F, Ab, Cb, Eb (Cb sounds as B). Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 213,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Fdim7?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, Cb, Eb",
        "F, Ab, C, D",
        "F, Ab, Cb, Ebb"
      ],
      "explanation": "Fdim7 = 1 – b3 – b5 – bb7 → F, Ab, Cb, Ebb (Cb suona come B, Ebb suona come D). Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fdim7 chord?",
      "options": [
        "F, Ab, C, Eb",
        "F, Ab, Cb, Eb",
        "F, Ab, C, D",
        "F, Ab, Cb, Ebb"
      ],
      "explanation": "Fdim7 = 1 – b3 – b5 – bb7 → F, Ab, Cb, Ebb (Cb sounds as B, Ebb sounds as D). Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 214,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Fmaj9?",
      "options": [
        "F, A, C, E",
        "F, A, C, Eb, G",
        "F, A, C, E, G",
        "F, A, C, E, B"
      ],
      "explanation": "Fmaj9 = 1 – 3 – 5 – 7 – 9 → F, A, C, E, G. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fmaj9 chord?",
      "options": [
        "F, A, C, E",
        "F, A, C, Eb, G",
        "F, A, C, E, G",
        "F, A, C, E, B"
      ],
      "explanation": "Fmaj9 = 1 – 3 – 5 – 7 – 9 → F, A, C, E, G. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 215,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F6?",
      "options": [
        "F, A, C, D",
        "F, A, C, E",
        "F, Ab, C, D",
        "F, A, C, Eb"
      ],
      "explanation": "F6 = 1 – 3 – 5 – 6 → F, A, C, D. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F6 chord?",
      "options": [
        "F, A, C, D",
        "F, A, C, E",
        "F, Ab, C, D",
        "F, A, C, Eb"
      ],
      "explanation": "F6 = 1 – 3 – 5 – 6 → F, A, C, D. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 216,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Fm6?",
      "options": [
        "F, Ab, C, D",
        "F, A, C, D",
        "F, Ab, Cb, Eb",
        "F, Ab, C, E"
      ],
      "explanation": "Fm6 = 1 – b3 – 5 – 6 → F, Ab, C, D. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Fm6 chord?",
      "options": [
        "F, Ab, C, D",
        "F, A, C, D",
        "F, Ab, Cb, Eb",
        "F, Ab, C, E"
      ],
      "explanation": "Fm6 = 1 – b3 – 5 – 6 → F, Ab, C, D. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 217,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo F7sus4?",
      "options": [
        "F, Ab, C, Eb",
        "F, Bb, C, Eb",
        "F, A, C, D",
        "F, A, C, E"
      ],
      "explanation": "F7sus4 = 1 – 4 – 5 – b7 → F, Bb, C, Eb. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F7sus4 chord?",
      "options": [
        "F, Ab, C, Eb",
        "F, Bb, C, Eb",
        "F, A, C, D",
        "F, A, C, E"
      ],
      "explanation": "F7sus4 = 1 – 4 – 5 – b7 → F, Bb, C, Eb. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 218,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo F#maj7?",
      "options": [
        "F#, A, C#, E#",
        "F#, A#, C#, E#",
        "F#, A#, C#, D#",
        "F#, A#, C#, E"
      ],
      "explanation": "F#maj7 = 1 – 3 – 5 – 7 → F#, A#, C#, E# (E# suona come F). Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#maj7 chord?",
      "options": [
        "F#, A, C#, E#",
        "F#, A#, C#, E#",
        "F#, A#, C#, D#",
        "F#, A#, C#, E"
      ],
      "explanation": "F#maj7 = 1 – 3 – 5 – 7 → F#, A#, C#, E# (E# sounds as F). Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 219,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F#m7?",
      "options": [
        "F#, A, C#, E",
        "F#, A, C#, E#",
        "F#, A#, C#, E",
        "F#, A, C, E"
      ],
      "explanation": "F#m7 = 1 – b3 – 5 – b7 → F#, A, C#, E. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#m7 chord?",
      "options": [
        "F#, A, C#, E",
        "F#, A, C#, E#",
        "F#, A#, C#, E",
        "F#, A, C, E"
      ],
      "explanation": "F#m7 = 1 – b3 – 5 – b7 → F#, A, C#, E. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 220,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo F#7?",
      "options": [
        "F#, A#, C#, E#",
        "F#, A, C#, E",
        "F#, A#, C#, E",
        "F#, A, C, E"
      ],
      "explanation": "F#7 = 1 – 3 – 5 – b7 → F#, A#, C#, E. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#7 chord?",
      "options": [
        "F#, A#, C#, E#",
        "F#, A, C#, E",
        "F#, A#, C#, E",
        "F#, A, C, E"
      ],
      "explanation": "F#7 = 1 – 3 – 5 – b7 → F#, A#, C#, E. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 221,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo F#m7b5?",
      "options": [
        "F#, A, C#, D#",
        "F#, A, C, E",
        "F#, A#, C, E",
        "F#, A, C, Eb"
      ],
      "explanation": "F#m7b5 = 1 – b3 – b5 – b7 → F#, A, C, E. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#m7b5 chord?",
      "options": [
        "F#, A, C#, D#",
        "F#, A, C, E",
        "F#, A#, C, E",
        "F#, A, C, Eb"
      ],
      "explanation": "F#m7b5 = 1 – b3 – b5 – b7 → F#, A, C, E. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 222,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F#dim7?",
      "options": [
        "F#, A, C, Eb",
        "F#, A, C#, D#",
        "F#, A, C, E",
        "F#, A, C#, E"
      ],
      "explanation": "F#dim7 = 1 – b3 – b5 – bb7 → F#, A, C, Eb. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#dim7 chord?",
      "options": [
        "F#, A, C, Eb",
        "F#, A, C#, D#",
        "F#, A, C, E",
        "F#, A, C#, E"
      ],
      "explanation": "F#dim7 = 1 – b3 – b5 – bb7 → F#, A, C, Eb. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 223,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo F#maj9?",
      "options": [
        "F#, A#, C#, E, G#",
        "F#, A#, C#, E#",
        "F#, A#, C#, E#, G#",
        "F#, A, C#, E, G#"
      ],
      "explanation": "F#maj9 = 1 – 3 – 5 – 7 – 9 → F#, A#, C#, E#, G# (E# suona come F). Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#maj9 chord?",
      "options": [
        "F#, A#, C#, E, G#",
        "F#, A#, C#, E#",
        "F#, A#, C#, E#, G#",
        "F#, A, C#, E, G#"
      ],
      "explanation": "F#maj9 = 1 – 3 – 5 – 7 – 9 → F#, A#, C#, E#, G# (E# sounds as F). Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 224,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo F#6?",
      "options": [
        "F#, A#, C#, E",
        "F#, A, C#, D#",
        "F#, A#, C#, D#",
        "F#, A, C#, E"
      ],
      "explanation": "F#6 = 1 – 3 – 5 – 6 → F#, A#, C#, D#. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#6 chord?",
      "options": [
        "F#, A#, C#, E",
        "F#, A, C#, D#",
        "F#, A#, C#, D#",
        "F#, A, C#, E"
      ],
      "explanation": "F#6 = 1 – 3 – 5 – 6 → F#, A#, C#, D#. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 225,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F#m6?",
      "options": [
        "F#, A, C#, D#",
        "F#, A, C#, E",
        "F#, A#, C#, D#",
        "F#, A, C, E"
      ],
      "explanation": "F#m6 = 1 – b3 – 5 – 6 → F#, A, C#, D#. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#m6 chord?",
      "options": [
        "F#, A, C#, D#",
        "F#, A, C#, E",
        "F#, A#, C#, D#",
        "F#, A, C, E"
      ],
      "explanation": "F#m6 = 1 – b3 – 5 – 6 → F#, A, C#, D#. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 226,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo F#7sus4?",
      "options": [
        "F#, A#, C#, E#",
        "F#, B, C#, E",
        "F#, A, C#, E",
        "F#, A#, C#, E"
      ],
      "explanation": "F#7sus4 = 1 – 4 – 5 – b7 → F#, B, C#, E. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the F#7sus4 chord?",
      "options": [
        "F#, A#, C#, E#",
        "F#, B, C#, E",
        "F#, A, C#, E",
        "F#, A#, C#, E"
      ],
      "explanation": "F#7sus4 = 1 – 4 – 5 – b7 → F#, B, C#, E. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 227,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gbmaj7?",
      "options": [
        "Gb, Bb, Db, Eb",
        "Gb, Bb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gbmaj7 = 1 – 3 – 5 – 7 → Gb, Bb, Db, F. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gbmaj7 chord?",
      "options": [
        "Gb, Bb, Db, Eb",
        "Gb, Bb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gbmaj7 = 1 – 3 – 5 – 7 → Gb, Bb, Db, F. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 228,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo D#m7?",
      "options": [
        "D#, F#, A#, C#",
        "D#, F#, A#, B#",
        "D#, F#, A, C#",
        "D#, F#, A#, C##"
      ],
      "explanation": "D#m7 = 1 – b3 – 5 – b7 → D#, F#, A#, C#. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D#m7 chord?",
      "options": [
        "D#, F#, A#, C#",
        "D#, F#, A#, B#",
        "D#, F#, A, C#",
        "D#, F#, A#, C##"
      ],
      "explanation": "D#m7 = 1 – b3 – 5 – b7 → D#, F#, A#, C#. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 229,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gb7?",
      "options": [
        "Gb, Cb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, Fb",
        "Gb, Bbb, Dbb, Fb"
      ],
      "explanation": "Gb7 = 1 – 3 – 5 – b7 → Gb, Bb, Db, Fb (Fb suona come E). Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gb7 chord?",
      "options": [
        "Gb, Cb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, Fb",
        "Gb, Bbb, Dbb, Fb"
      ],
      "explanation": "Gb7 = 1 – 3 – 5 – b7 → Gb, Bb, Db, Fb (Fb sounds as E). Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 230,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo A#m7b5?",
      "options": [
        "A#, C#, E, G",
        "A#, C#, E, G#",
        "A#, C#, E#, G#",
        "A#, C##, E, G#"
      ],
      "explanation": "A#m7b5 = 1 – b3 – b5 – b7 → A#, C#, E, G#. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the A#m7b5 chord?",
      "options": [
        "A#, C#, E, G",
        "A#, C#, E, G#",
        "A#, C#, E#, G#",
        "A#, C##, E, G#"
      ],
      "explanation": "A#m7b5 = 1 – b3 – b5 – b7 → A#, C#, E, G#. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 231,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo A#dim7?",
      "options": [
        "A#, C#, E, G#",
        "A#, C#, E, G",
        "A#, C#, E#, G#",
        "A#, C#, E#, F##"
      ],
      "explanation": "A#dim7 = 1 – b3 – b5 – bb7 → A#, C#, E, G. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the A#dim7 chord?",
      "options": [
        "A#, C#, E, G#",
        "A#, C#, E, G",
        "A#, C#, E#, G#",
        "A#, C#, E#, F##"
      ],
      "explanation": "A#dim7 = 1 – b3 – b5 – bb7 → A#, C#, E, G. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 232,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Gbmaj9?",
      "options": [
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bb, Db, F, C",
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, F, Ab"
      ],
      "explanation": "Gbmaj9 = 1 – 3 – 5 – 7 – 9 → Gb, Bb, Db, F, Ab. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gbmaj9 chord?",
      "options": [
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bb, Db, F, C",
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, F, Ab"
      ],
      "explanation": "Gbmaj9 = 1 – 3 – 5 – 7 – 9 → Gb, Bb, Db, F, Ab. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 233,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Gb6?",
      "options": [
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, Eb",
        "Gb, Bb, Db, Fb",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gb6 = 1 – 3 – 5 – 6 → Gb, Bb, Db, Eb. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gb6 chord?",
      "options": [
        "Gb, Bb, Db, F",
        "Gb, Bb, Db, Eb",
        "Gb, Bb, Db, Fb",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gb6 = 1 – 3 – 5 – 6 → Gb, Bb, Db, Eb. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 234,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo D#m6?",
      "options": [
        "D#, F#, A, C#",
        "D#, F#, A#, C#",
        "D#, F#, A#, B#",
        "D#, F##, A#, B#"
      ],
      "explanation": "D#m6 = 1 – b3 – 5 – 6 → D#, F#, A#, B# (B# suona come C). Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the D#m6 chord?",
      "options": [
        "D#, F#, A, C#",
        "D#, F#, A#, C#",
        "D#, F#, A#, B#",
        "D#, F##, A#, B#"
      ],
      "explanation": "D#m6 = 1 – b3 – 5 – 6 → D#, F#, A#, B# (B# sounds as C). Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 235,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gb7sus4?",
      "options": [
        "Gb, Bb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Cb, Db, Fb",
        "Gb, Bb, Db, Eb"
      ],
      "explanation": "Gb7sus4 = 1 – 4 – 5 – b7 → Gb, Cb, Db, Fb (Cb suona come B, Fb suona come E). La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gb7sus4 chord?",
      "options": [
        "Gb, Bb, Db, Fb",
        "Gb, Bb, Db, F",
        "Gb, Cb, Db, Fb",
        "Gb, Bb, Db, Eb"
      ],
      "explanation": "Gb7sus4 = 1 – 4 – 5 – b7 → Gb, Cb, Db, Fb (Cb sounds as B, Fb sounds as E). The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 236,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gmaj7?",
      "options": [
        "G, B, D, F",
        "G, Bb, D, F",
        "G, B, D, F#",
        "G, B, D, E"
      ],
      "explanation": "Gmaj7 = 1 – 3 – 5 – 7 → G, B, D, F#. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gmaj7 chord?",
      "options": [
        "G, B, D, F",
        "G, Bb, D, F",
        "G, B, D, F#",
        "G, B, D, E"
      ],
      "explanation": "Gmaj7 = 1 – 3 – 5 – 7 → G, B, D, F#. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 237,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gm7?",
      "options": [
        "G, Bb, Db, F",
        "G, Bb, D, F#",
        "G, Bb, D, F",
        "G, Bb, D, E"
      ],
      "explanation": "Gm7 = 1 – b3 – 5 – b7 → G, Bb, D, F. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gm7 chord?",
      "options": [
        "G, Bb, Db, F",
        "G, Bb, D, F#",
        "G, Bb, D, F",
        "G, Bb, D, E"
      ],
      "explanation": "Gm7 = 1 – b3 – 5 – b7 → G, Bb, D, F. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 238,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G7?",
      "options": [
        "G, B, D, F",
        "G, C, D, F",
        "G, Bb, Db, F",
        "G, Bb, D, F"
      ],
      "explanation": "G7 = 1 – 3 – 5 – b7 → G, B, D, F. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the G7 chord?",
      "options": [
        "G, B, D, F",
        "G, C, D, F",
        "G, Bb, Db, F",
        "G, Bb, D, F"
      ],
      "explanation": "G7 = 1 – 3 – 5 – b7 → G, B, D, F. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 239,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Gm7b5?",
      "options": [
        "G, Bb, Db, F",
        "G, Bb, D, E",
        "G, B, Db, F",
        "G, Bb, Db, Fb"
      ],
      "explanation": "Gm7b5 = 1 – b3 – b5 – b7 → G, Bb, Db, F. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gm7b5 chord?",
      "options": [
        "G, Bb, Db, F",
        "G, Bb, D, E",
        "G, B, Db, F",
        "G, Bb, Db, Fb"
      ],
      "explanation": "Gm7b5 = 1 – b3 – b5 – b7 → G, Bb, Db, F. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 240,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Gdim7?",
      "options": [
        "G, Bb, D, E",
        "G, Bb, Db, Fb",
        "G, Bb, Db, F",
        "G, Bb, D, F"
      ],
      "explanation": "Gdim7 = 1 – b3 – b5 – bb7 → G, Bb, Db, Fb (Fb suona come E). Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gdim7 chord?",
      "options": [
        "G, Bb, D, E",
        "G, Bb, Db, Fb",
        "G, Bb, Db, F",
        "G, Bb, D, F"
      ],
      "explanation": "Gdim7 = 1 – b3 – b5 – bb7 → G, Bb, Db, Fb (Fb sounds as E). Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 241,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Gmaj9?",
      "options": [
        "G, Bb, D, F, A",
        "G, B, D, F#, A",
        "G, B, D, F#",
        "G, B, D, F, A"
      ],
      "explanation": "Gmaj9 = 1 – 3 – 5 – 7 – 9 → G, B, D, F#, A. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gmaj9 chord?",
      "options": [
        "G, Bb, D, F, A",
        "G, B, D, F#, A",
        "G, B, D, F#",
        "G, B, D, F, A"
      ],
      "explanation": "Gmaj9 = 1 – 3 – 5 – 7 – 9 → G, B, D, F#, A. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 242,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G6?",
      "options": [
        "G, B, D, E",
        "G, Bb, D, F",
        "G, Bb, D, E",
        "G, B, D, F"
      ],
      "explanation": "G6 = 1 – 3 – 5 – 6 → G, B, D, E. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the G6 chord?",
      "options": [
        "G, B, D, E",
        "G, Bb, D, F",
        "G, Bb, D, E",
        "G, B, D, F"
      ],
      "explanation": "G6 = 1 – 3 – 5 – 6 → G, B, D, E. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 243,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gm6?",
      "options": [
        "G, B, D, E",
        "G, Bb, D, F",
        "G, Bb, D, E",
        "G, Bb, D, F#"
      ],
      "explanation": "Gm6 = 1 – b3 – 5 – 6 → G, Bb, D, E. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Gm6 chord?",
      "options": [
        "G, B, D, E",
        "G, Bb, D, F",
        "G, Bb, D, E",
        "G, Bb, D, F#"
      ],
      "explanation": "Gm6 = 1 – b3 – 5 – 6 → G, Bb, D, E. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 244,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G7sus4?",
      "options": [
        "G, C, D, F",
        "G, Bb, D, F",
        "G, B, D, F",
        "G, B, D, E"
      ],
      "explanation": "G7sus4 = 1 – 4 – 5 – b7 → G, C, D, F. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the G7sus4 chord?",
      "options": [
        "G, C, D, F",
        "G, Bb, D, F",
        "G, B, D, F",
        "G, B, D, E"
      ],
      "explanation": "G7sus4 = 1 – 4 – 5 – b7 → G, C, D, F. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 245,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Abmaj7?",
      "options": [
        "Ab, Cb, Eb, G",
        "Ab, C, Eb, F",
        "Ab, C, Eb, G",
        "Ab, C, Eb, Gb"
      ],
      "explanation": "Abmaj7 = 1 – 3 – 5 – 7 → Ab, C, Eb, G. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Abmaj7 chord?",
      "options": [
        "Ab, Cb, Eb, G",
        "Ab, C, Eb, F",
        "Ab, C, Eb, G",
        "Ab, C, Eb, Gb"
      ],
      "explanation": "Abmaj7 = 1 – 3 – 5 – 7 → Ab, C, Eb, G. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 246,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Abm7?",
      "options": [
        "Ab, Cb, Eb, F",
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, G",
        "Ab, C, Eb, Gb"
      ],
      "explanation": "Abm7 = 1 – b3 – 5 – b7 → Ab, Cb, Eb, Gb (Cb suona come B). Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Abm7 chord?",
      "options": [
        "Ab, Cb, Eb, F",
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, G",
        "Ab, C, Eb, Gb"
      ],
      "explanation": "Abm7 = 1 – b3 – 5 – b7 → Ab, Cb, Eb, Gb (Cb sounds as B). Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 247,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Ab7?",
      "options": [
        "Ab, C, Eb, Gb",
        "Ab, Db, Eb, Gb",
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, G"
      ],
      "explanation": "Ab7 = 1 – 3 – 5 – b7 → Ab, C, Eb, Gb. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ab7 chord?",
      "options": [
        "Ab, C, Eb, Gb",
        "Ab, Db, Eb, Gb",
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, G"
      ],
      "explanation": "Ab7 = 1 – 3 – 5 – b7 → Ab, C, Eb, Gb. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 248,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Abm7b5?",
      "options": [
        "Ab, Cb, Ebb, Gb",
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, F",
        "Ab, C, Ebb, Gb"
      ],
      "explanation": "Abm7b5 = 1 – b3 – b5 – b7 → Ab, Cb, Ebb, Gb (Cb suona come B, Ebb suona come D). Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Abm7b5 chord?",
      "options": [
        "Ab, Cb, Ebb, Gb",
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, F",
        "Ab, C, Ebb, Gb"
      ],
      "explanation": "Abm7b5 = 1 – b3 – b5 – b7 → Ab, Cb, Ebb, Gb (Cb sounds as B, Ebb sounds as D). Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 249,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quanti accordi dim7 diversi esistono, considerando le note enarmoniche come uguali?",
      "options": [
        "4",
        "3",
        "6",
        "12"
      ],
      "explanation": "Il dim7 è simmetrico (terze minori sovrapposte): Cdim7, Ebdim7, F#dim7 e Adim7 hanno le stesse quattro note. Ogni dim7 si ripete ogni 3 semitoni, quindi ne esistono solo 3: su C, C# e D.",
      "sub": "Accordi"
    },
    "en": {
      "question": "How many different dim7 chords exist if enharmonic notes count as the same?",
      "options": [
        "4",
        "3",
        "6",
        "12"
      ],
      "explanation": "dim7 is symmetrical (stacked minor thirds): Cdim7, Ebdim7, F#dim7 and Adim7 share the same four notes. Every dim7 repeats every 3 semitones, so there are only 3: on C, C# and D.",
      "sub": "Chords"
    }
  },
  {
    "id": 250,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Abmaj9?",
      "options": [
        "Ab, Cb, Eb, Gb, Bb",
        "Ab, C, Eb, G, Bb",
        "Ab, C, Eb, Gb, Bb",
        "Ab, C, Eb, G, D"
      ],
      "explanation": "Abmaj9 = 1 – 3 – 5 – 7 – 9 → Ab, C, Eb, G, Bb. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Abmaj9 chord?",
      "options": [
        "Ab, Cb, Eb, Gb, Bb",
        "Ab, C, Eb, G, Bb",
        "Ab, C, Eb, Gb, Bb",
        "Ab, C, Eb, G, D"
      ],
      "explanation": "Abmaj9 = 1 – 3 – 5 – 7 – 9 → Ab, C, Eb, G, Bb. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 251,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Ab6?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, F",
        "Ab, Cb, Eb, F"
      ],
      "explanation": "Ab6 = 1 – 3 – 5 – 6 → Ab, C, Eb, F. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ab6 chord?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, F",
        "Ab, Cb, Eb, F"
      ],
      "explanation": "Ab6 = 1 – 3 – 5 – 6 → Ab, C, Eb, F. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 252,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Abm6?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, F",
        "Ab, C, Eb, F",
        "Ab, Cb, Eb, G"
      ],
      "explanation": "Abm6 = 1 – b3 – 5 – 6 → Ab, Cb, Eb, F (Cb suona come B). Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Abm6 chord?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, Cb, Eb, F",
        "Ab, C, Eb, F",
        "Ab, Cb, Eb, G"
      ],
      "explanation": "Abm6 = 1 – b3 – 5 – 6 → Ab, Cb, Eb, F (Cb sounds as B). Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 253,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Ab7sus4?",
      "options": [
        "Ab, C, Eb, F",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, G",
        "Ab, Db, Eb, Gb"
      ],
      "explanation": "Ab7sus4 = 1 – 4 – 5 – b7 → Ab, Db, Eb, Gb. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Ab7sus4 chord?",
      "options": [
        "Ab, C, Eb, F",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, G",
        "Ab, Db, Eb, Gb"
      ],
      "explanation": "Ab7sus4 = 1 – 4 – 5 – b7 → Ab, Db, Eb, Gb. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 254,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Amaj7?",
      "options": [
        "A, C#, E, F#",
        "A, C, E, G",
        "A, C#, E, G",
        "A, C#, E, G#"
      ],
      "explanation": "Amaj7 = 1 – 3 – 5 – 7 → A, C#, E, G#. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Amaj7 chord?",
      "options": [
        "A, C#, E, F#",
        "A, C, E, G",
        "A, C#, E, G",
        "A, C#, E, G#"
      ],
      "explanation": "Amaj7 = 1 – 3 – 5 – 7 → A, C#, E, G#. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 255,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Am7?",
      "options": [
        "A, C, E, G",
        "A, C, E, G#",
        "A, C, Eb, G",
        "A, C#, E, G"
      ],
      "explanation": "Am7 = 1 – b3 – 5 – b7 → A, C, E, G. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Am7 chord?",
      "options": [
        "A, C, E, G",
        "A, C, E, G#",
        "A, C, Eb, G",
        "A, C#, E, G"
      ],
      "explanation": "Am7 = 1 – b3 – 5 – b7 → A, C, E, G. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 256,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo A7?",
      "options": [
        "A, C#, E, G",
        "A, D, E, G",
        "A, C, E, G",
        "A, C, Eb, G"
      ],
      "explanation": "A7 = 1 – 3 – 5 – b7 → A, C#, E, G. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the A7 chord?",
      "options": [
        "A, C#, E, G",
        "A, D, E, G",
        "A, C, E, G",
        "A, C, Eb, G"
      ],
      "explanation": "A7 = 1 – 3 – 5 – b7 → A, C#, E, G. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 257,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Am7b5?",
      "options": [
        "A, C, Eb, G",
        "A, C#, Eb, G",
        "A, C, Eb, Gb",
        "A, C, E, G"
      ],
      "explanation": "Am7b5 = 1 – b3 – b5 – b7 → A, C, Eb, G. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Am7b5 chord?",
      "options": [
        "A, C, Eb, G",
        "A, C#, Eb, G",
        "A, C, Eb, Gb",
        "A, C, E, G"
      ],
      "explanation": "Am7b5 = 1 – b3 – b5 – b7 → A, C, Eb, G. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 258,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Adim7?",
      "options": [
        "A, C, Eb, Gb",
        "A, C, Eb, G",
        "A, C, E, F#",
        "A, C#, E, G"
      ],
      "explanation": "Adim7 = 1 – b3 – b5 – bb7 → A, C, Eb, Gb. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Adim7 chord?",
      "options": [
        "A, C, Eb, Gb",
        "A, C, Eb, G",
        "A, C, E, F#",
        "A, C#, E, G"
      ],
      "explanation": "Adim7 = 1 – b3 – b5 – bb7 → A, C, Eb, Gb. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 259,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Amaj9?",
      "options": [
        "A, C#, E, G#",
        "A, C#, E, G, B",
        "A, C, E, G, B",
        "A, C#, E, G#, B"
      ],
      "explanation": "Amaj9 = 1 – 3 – 5 – 7 – 9 → A, C#, E, G#, B. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Amaj9 chord?",
      "options": [
        "A, C#, E, G#",
        "A, C#, E, G, B",
        "A, C, E, G, B",
        "A, C#, E, G#, B"
      ],
      "explanation": "Amaj9 = 1 – 3 – 5 – 7 – 9 → A, C#, E, G#, B. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 260,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo A6?",
      "options": [
        "A, C#, E, G",
        "A, C#, E, F#",
        "A, C, E, F#",
        "A, C, E, G"
      ],
      "explanation": "A6 = 1 – 3 – 5 – 6 → A, C#, E, F#. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the A6 chord?",
      "options": [
        "A, C#, E, G",
        "A, C#, E, F#",
        "A, C, E, F#",
        "A, C, E, G"
      ],
      "explanation": "A6 = 1 – 3 – 5 – 6 → A, C#, E, F#. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 261,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Am6?",
      "options": [
        "A, C, Eb, G",
        "A, C, E, G#",
        "A, C#, E, F#",
        "A, C, E, F#"
      ],
      "explanation": "Am6 = 1 – b3 – 5 – 6 → A, C, E, F#. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Am6 chord?",
      "options": [
        "A, C, Eb, G",
        "A, C, E, G#",
        "A, C#, E, F#",
        "A, C, E, F#"
      ],
      "explanation": "Am6 = 1 – b3 – 5 – 6 → A, C, E, F#. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 262,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo A7sus4?",
      "options": [
        "A, D, E, G",
        "A, C#, E, G#",
        "A, C#, E, G",
        "A, C#, E, F#"
      ],
      "explanation": "A7sus4 = 1 – 4 – 5 – b7 → A, D, E, G. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the A7sus4 chord?",
      "options": [
        "A, D, E, G",
        "A, C#, E, G#",
        "A, C#, E, G",
        "A, C#, E, F#"
      ],
      "explanation": "A7sus4 = 1 – 4 – 5 – b7 → A, D, E, G. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 263,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bbmaj7?",
      "options": [
        "Bb, D, F, G",
        "Bb, D, F, A",
        "Bb, Db, F, A",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bbmaj7 = 1 – 3 – 5 – 7 → Bb, D, F, A. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbmaj7 chord?",
      "options": [
        "Bb, D, F, G",
        "Bb, D, F, A",
        "Bb, Db, F, A",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bbmaj7 = 1 – 3 – 5 – 7 → Bb, D, F, A. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 264,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bbm7?",
      "options": [
        "Bb, Db, F, Ab",
        "Bb, Db, F, G",
        "Bb, Db, F, A",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bbm7 = 1 – b3 – 5 – b7 → Bb, Db, F, Ab. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbm7 chord?",
      "options": [
        "Bb, Db, F, Ab",
        "Bb, Db, F, G",
        "Bb, Db, F, A",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bbm7 = 1 – b3 – 5 – b7 → Bb, Db, F, Ab. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 265,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Bb7?",
      "options": [
        "Bb, Eb, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, Fb, Ab",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7 = 1 – 3 – 5 – b7 → Bb, D, F, Ab. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bb7 chord?",
      "options": [
        "Bb, Eb, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, Fb, Ab",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7 = 1 – 3 – 5 – b7 → Bb, D, F, Ab. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 266,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bbm7b5?",
      "options": [
        "Bb, Db, F, Ab",
        "Bb, Db, Fb, Ab",
        "Bb, Db, F, G",
        "Bb, D, Fb, Ab"
      ],
      "explanation": "Bbm7b5 = 1 – b3 – b5 – b7 → Bb, Db, Fb, Ab (Fb suona come E). Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbm7b5 chord?",
      "options": [
        "Bb, Db, F, Ab",
        "Bb, Db, Fb, Ab",
        "Bb, Db, F, G",
        "Bb, D, Fb, Ab"
      ],
      "explanation": "Bbm7b5 = 1 – b3 – b5 – b7 → Bb, Db, Fb, Ab (Fb sounds as E). Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 267,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bbdim7?",
      "options": [
        "Bb, Db, Fb, Abb",
        "Bb, D, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, F, G"
      ],
      "explanation": "Bbdim7 = 1 – b3 – b5 – bb7 → Bb, Db, Fb, Abb (Fb suona come E, Abb suona come G). Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbdim7 chord?",
      "options": [
        "Bb, Db, Fb, Abb",
        "Bb, D, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, F, G"
      ],
      "explanation": "Bbdim7 = 1 – b3 – b5 – bb7 → Bb, Db, Fb, Abb (Fb sounds as E, Abb sounds as G). Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 268,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bbmaj9?",
      "options": [
        "Bb, D, F, A, C",
        "Bb, D, F, A",
        "Bb, D, F, A, E",
        "Bb, Db, F, Ab, C"
      ],
      "explanation": "Bbmaj9 = 1 – 3 – 5 – 7 – 9 → Bb, D, F, A, C. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbmaj9 chord?",
      "options": [
        "Bb, D, F, A, C",
        "Bb, D, F, A",
        "Bb, D, F, A, E",
        "Bb, Db, F, Ab, C"
      ],
      "explanation": "Bbmaj9 = 1 – 3 – 5 – 7 – 9 → Bb, D, F, A, C. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 269,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bb6?",
      "options": [
        "Bb, D, F, G",
        "Bb, Db, F, G",
        "Bb, D, F, A",
        "Bb, Db, F, Ab"
      ],
      "explanation": "Bb6 = 1 – 3 – 5 – 6 → Bb, D, F, G. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bb6 chord?",
      "options": [
        "Bb, D, F, G",
        "Bb, Db, F, G",
        "Bb, D, F, A",
        "Bb, Db, F, Ab"
      ],
      "explanation": "Bb6 = 1 – 3 – 5 – 6 → Bb, D, F, G. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 270,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bbm6?",
      "options": [
        "Bb, Db, F, G",
        "Bb, Db, Fb, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, F, A"
      ],
      "explanation": "Bbm6 = 1 – b3 – 5 – 6 → Bb, Db, F, G. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bbm6 chord?",
      "options": [
        "Bb, Db, F, G",
        "Bb, Db, Fb, Ab",
        "Bb, Db, F, Ab",
        "Bb, Db, F, A"
      ],
      "explanation": "Bbm6 = 1 – b3 – 5 – 6 → Bb, Db, F, G. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 271,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bb7sus4?",
      "options": [
        "Bb, Eb, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, D, F, G",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7sus4 = 1 – 4 – 5 – b7 → Bb, Eb, F, Ab. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bb7sus4 chord?",
      "options": [
        "Bb, Eb, F, Ab",
        "Bb, Db, F, Ab",
        "Bb, D, F, G",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7sus4 = 1 – 4 – 5 – b7 → Bb, Eb, F, Ab. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 272,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Bmaj7?",
      "options": [
        "B, D, F#, A#",
        "B, D#, F#, A",
        "B, D#, F#, A#",
        "B, D#, F#, G#"
      ],
      "explanation": "Bmaj7 = 1 – 3 – 5 – 7 → B, D#, F#, A#. Settima maggiore: triade maggiore + 7ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bmaj7 chord?",
      "options": [
        "B, D, F#, A#",
        "B, D#, F#, A",
        "B, D#, F#, A#",
        "B, D#, F#, G#"
      ],
      "explanation": "Bmaj7 = 1 – 3 – 5 – 7 → B, D#, F#, A#. Major seventh: major triad + major 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 273,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bm7?",
      "options": [
        "B, D, F#, A",
        "B, D, F#, A#",
        "B, D, F#, G#",
        "B, D#, F#, A"
      ],
      "explanation": "Bm7 = 1 – b3 – 5 – b7 → B, D, F#, A. Minore settima: triade minore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bm7 chord?",
      "options": [
        "B, D, F#, A",
        "B, D, F#, A#",
        "B, D, F#, G#",
        "B, D#, F#, A"
      ],
      "explanation": "Bm7 = 1 – b3 – 5 – b7 → B, D, F#, A. Minor seventh: minor triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 274,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo B7?",
      "options": [
        "B, D#, F#, A",
        "B, D, F, A",
        "B, D, F#, A",
        "B, E, F#, A"
      ],
      "explanation": "B7 = 1 – 3 – 5 – b7 → B, D#, F#, A. Settima di dominante: triade maggiore + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the B7 chord?",
      "options": [
        "B, D#, F#, A",
        "B, D, F, A",
        "B, D, F#, A",
        "B, E, F#, A"
      ],
      "explanation": "B7 = 1 – 3 – 5 – b7 → B, D#, F#, A. Dominant seventh: major triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 275,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bm7b5?",
      "options": [
        "B, D, F, A",
        "B, D, F#, A",
        "B, D, F, Ab",
        "B, D, F#, G#"
      ],
      "explanation": "Bm7b5 = 1 – b3 – b5 – b7 → B, D, F, A. Semidiminuito (ø): triade diminuita + 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bm7b5 chord?",
      "options": [
        "B, D, F, A",
        "B, D, F#, A",
        "B, D, F, Ab",
        "B, D, F#, G#"
      ],
      "explanation": "Bm7b5 = 1 – b3 – b5 – b7 → B, D, F, A. Half-diminished (ø): diminished triad + minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 276,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Bdim7?",
      "options": [
        "B, D, F#, G#",
        "B, D#, F#, A",
        "B, D, F, Ab",
        "B, D, F, A"
      ],
      "explanation": "Bdim7 = 1 – b3 – b5 – bb7 → B, D, F, Ab. Settima diminuita: triade diminuita + 7ª diminuita.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bdim7 chord?",
      "options": [
        "B, D, F#, G#",
        "B, D#, F#, A",
        "B, D, F, Ab",
        "B, D, F, A"
      ],
      "explanation": "Bdim7 = 1 – b3 – b5 – bb7 → B, D, F, Ab. Diminished seventh: diminished triad + diminished 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 277,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bmaj9?",
      "options": [
        "B, D#, F#, A#, C#",
        "B, D#, F#, A, C#",
        "B, D#, F#, A#, E#",
        "B, D, F#, A, C#"
      ],
      "explanation": "Bmaj9 = 1 – 3 – 5 – 7 – 9 → B, D#, F#, A#, C#. Maj7 con la 9ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bmaj9 chord?",
      "options": [
        "B, D#, F#, A#, C#",
        "B, D#, F#, A, C#",
        "B, D#, F#, A#, E#",
        "B, D, F#, A, C#"
      ],
      "explanation": "Bmaj9 = 1 – 3 – 5 – 7 – 9 → B, D#, F#, A#, C#. Maj7 with a major 9th.",
      "sub": "Chords"
    }
  },
  {
    "id": 278,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo B6?",
      "options": [
        "B, D, F#, G#",
        "B, D, F#, A",
        "B, D#, F#, G#",
        "B, D#, F#, A"
      ],
      "explanation": "B6 = 1 – 3 – 5 – 6 → B, D#, F#, G#. Triade maggiore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the B6 chord?",
      "options": [
        "B, D, F#, G#",
        "B, D, F#, A",
        "B, D#, F#, G#",
        "B, D#, F#, A"
      ],
      "explanation": "B6 = 1 – 3 – 5 – 6 → B, D#, F#, G#. Major triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 279,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bm6?",
      "options": [
        "B, D, F#, A",
        "B, D, F#, G#",
        "B, D#, F#, G#",
        "B, D, F, A"
      ],
      "explanation": "Bm6 = 1 – b3 – 5 – 6 → B, D, F#, G#. Triade minore + 6ª maggiore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the Bm6 chord?",
      "options": [
        "B, D, F#, A",
        "B, D, F#, G#",
        "B, D#, F#, G#",
        "B, D, F, A"
      ],
      "explanation": "Bm6 = 1 – b3 – 5 – 6 → B, D, F#, G#. Minor triad + major 6th.",
      "sub": "Chords"
    }
  },
  {
    "id": 280,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo B7sus4?",
      "options": [
        "B, E, F#, A",
        "B, D#, F#, A",
        "B, D#, F#, G#",
        "B, D, F#, A"
      ],
      "explanation": "B7sus4 = 1 – 4 – 5 – b7 → B, E, F#, A. La 4ª prende il posto della 3ª, con 7ª minore.",
      "sub": "Accordi"
    },
    "en": {
      "question": "Which notes make up the B7sus4 chord?",
      "options": [
        "B, E, F#, A",
        "B, D#, F#, A",
        "B, D#, F#, G#",
        "B, D, F#, A"
      ],
      "explanation": "B7sus4 = 1 – 4 – 5 – b7 → B, E, F#, A. The 4th replaces the 3rd, with a minor 7th.",
      "sub": "Chords"
    }
  },
  {
    "id": 281,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "C Ionio è un modo di quale scala maggiore?",
      "options": [
        "C",
        "Eb",
        "G",
        "Bb"
      ],
      "explanation": "Lo Ionio è il 1° modo: C è il 1° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Ionian is a mode of which major scale?",
      "options": [
        "C",
        "Eb",
        "G",
        "Bb"
      ],
      "explanation": "Ionian is the 1st mode: C is the 1st degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 282,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "C Dorico è un modo di quale scala maggiore?",
      "options": [
        "G",
        "F",
        "Db",
        "Bb"
      ],
      "explanation": "Il Dorico è il 2° modo: C è il 2° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Dorian is a mode of which major scale?",
      "options": [
        "G",
        "F",
        "Db",
        "Bb"
      ],
      "explanation": "Dorian is the 2nd mode: C is the 2nd degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 283,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "C Frigio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Eb",
        "Db",
        "Ab"
      ],
      "explanation": "Il Frigio è il 3° modo: C è il 3° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Phrygian is a mode of which major scale?",
      "options": [
        "Bb",
        "Eb",
        "Db",
        "Ab"
      ],
      "explanation": "Phrygian is the 3rd mode: C is the 3rd degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 284,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "C Lidio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "Bb",
        "Ab",
        "C"
      ],
      "explanation": "Il Lidio è il 4° modo: C è il 4° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Lydian is a mode of which major scale?",
      "options": [
        "G",
        "Bb",
        "Ab",
        "C"
      ],
      "explanation": "Lydian is the 4th mode: C is the 4th degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 285,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "C Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Db",
        "F",
        "C"
      ],
      "explanation": "Il Misolidio è il 5° modo: C è il 5° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Mixolydian is a mode of which major scale?",
      "options": [
        "Eb",
        "Db",
        "F",
        "C"
      ],
      "explanation": "Mixolydian is the 5th mode: C is the 5th degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 286,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "C Eolio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Eb",
        "G",
        "Db"
      ],
      "explanation": "L'Eolio è il 6° modo: C è il 6° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Aeolian is a mode of which major scale?",
      "options": [
        "Bb",
        "Eb",
        "G",
        "Db"
      ],
      "explanation": "Aeolian is the 6th mode: C is the 6th degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 287,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "C Locrio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Ab",
        "Db",
        "Eb"
      ],
      "explanation": "Il Locrio è il 7° modo: C è il 7° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "C Locrian is a mode of which major scale?",
      "options": [
        "Bb",
        "Ab",
        "Db",
        "Eb"
      ],
      "explanation": "Locrian is the 7th mode: C is the 7th degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 288,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "C# Ionio è un modo di quale scala maggiore?",
      "options": [
        "E",
        "C#",
        "Ab",
        "A"
      ],
      "explanation": "Lo Ionio è il 1° modo: C# è il 1° grado di C# maggiore (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Ionian is a mode of which major scale?",
      "options": [
        "E",
        "C#",
        "Ab",
        "A"
      ],
      "explanation": "Ionian is the 1st mode: C# is the 1st degree of C# major (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modes"
    }
  },
  {
    "id": 289,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "C# Dorico è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "Ab",
        "D",
        "B"
      ],
      "explanation": "Il Dorico è il 2° modo: C# è il 2° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Dorian is a mode of which major scale?",
      "options": [
        "C#",
        "Ab",
        "D",
        "B"
      ],
      "explanation": "Dorian is the 2nd mode: C# is the 2nd degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 290,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "C# Frigio è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "E",
        "F#",
        "A"
      ],
      "explanation": "Il Frigio è il 3° modo: C# è il 3° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Phrygian is a mode of which major scale?",
      "options": [
        "C#",
        "E",
        "F#",
        "A"
      ],
      "explanation": "Phrygian is the 3rd mode: C# is the 3rd degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 291,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Db Lidio è un modo di quale scala maggiore?",
      "options": [
        "A",
        "Db",
        "Ab",
        "D"
      ],
      "explanation": "Il Lidio è il 4° modo: Db è il 4° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "Db Lydian is a mode of which major scale?",
      "options": [
        "A",
        "Db",
        "Ab",
        "D"
      ],
      "explanation": "Lydian is the 4th mode: Db is the 4th degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 292,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "C# Misolidio è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "D",
        "A",
        "F#"
      ],
      "explanation": "Il Misolidio è il 5° modo: C# è il 5° grado di F# maggiore (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Mixolydian is a mode of which major scale?",
      "options": [
        "C#",
        "D",
        "A",
        "F#"
      ],
      "explanation": "Mixolydian is the 5th mode: C# is the 5th degree of F# major (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modes"
    }
  },
  {
    "id": 293,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "C# Eolio è un modo di quale scala maggiore?",
      "options": [
        "F#",
        "D",
        "E",
        "B"
      ],
      "explanation": "L'Eolio è il 6° modo: C# è il 6° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Aeolian is a mode of which major scale?",
      "options": [
        "F#",
        "D",
        "E",
        "B"
      ],
      "explanation": "Aeolian is the 6th mode: C# is the 6th degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 294,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "C# Locrio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "Ab",
        "E",
        "C#"
      ],
      "explanation": "Il Locrio è il 7° modo: C# è il 7° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "C# Locrian is a mode of which major scale?",
      "options": [
        "D",
        "Ab",
        "E",
        "C#"
      ],
      "explanation": "Locrian is the 7th mode: C# is the 7th degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 295,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Db Ionio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "D",
        "Db",
        "E"
      ],
      "explanation": "Lo Ionio è il 1° modo: Db è il 1° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "Db Ionian is a mode of which major scale?",
      "options": [
        "Ab",
        "D",
        "Db",
        "E"
      ],
      "explanation": "Ionian is the 1st mode: Db is the 1st degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 296,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Db Dorico è un modo di quale scala maggiore?",
      "options": [
        "E",
        "A",
        "Cb",
        "D"
      ],
      "explanation": "Il Dorico è il 2° modo: Db è il 2° grado di Cb maggiore (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modi"
    },
    "en": {
      "question": "Db Dorian is a mode of which major scale?",
      "options": [
        "E",
        "A",
        "Cb",
        "D"
      ],
      "explanation": "Dorian is the 2nd mode: Db is the 2nd degree of Cb major (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modes"
    }
  },
  {
    "id": 297,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "D# Frigio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "F#",
        "C#",
        "Eb"
      ],
      "explanation": "Il Frigio è il 3° modo: D# è il 3° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D# Phrygian is a mode of which major scale?",
      "options": [
        "B",
        "F#",
        "C#",
        "Eb"
      ],
      "explanation": "Phrygian is the 3rd mode: D# is the 3rd degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 298,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Nella scala di D maggiore, quale modo inizia dalla nota G?",
      "options": [
        "G Lidio",
        "G Eolio",
        "G Locrio",
        "G Ionio"
      ],
      "explanation": "G è il 4° grado di D maggiore, quindi il modo che parte da G è il 4° modo: il Lidio.",
      "sub": "Modi"
    },
    "en": {
      "question": "In the D major scale, which mode starts on G?",
      "options": [
        "G Lydian",
        "G Aeolian",
        "G Locrian",
        "G Ionian"
      ],
      "explanation": "G is the 4th degree of D major, so the mode starting there is the 4th mode: Lydian.",
      "sub": "Modes"
    }
  },
  {
    "id": 299,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Db Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Gb",
        "D",
        "E",
        "Db"
      ],
      "explanation": "Il Misolidio è il 5° modo: Db è il 5° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "Db Mixolydian is a mode of which major scale?",
      "options": [
        "Gb",
        "D",
        "E",
        "Db"
      ],
      "explanation": "Mixolydian is the 5th mode: Db is the 5th degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 300,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "D# Eolio è un modo di quale scala maggiore?",
      "options": [
        "F#",
        "C#",
        "Ab",
        "Eb"
      ],
      "explanation": "L'Eolio è il 6° modo: D# è il 6° grado di F# maggiore (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D# Aeolian is a mode of which major scale?",
      "options": [
        "F#",
        "C#",
        "Ab",
        "Eb"
      ],
      "explanation": "Aeolian is the 6th mode: D# is the 6th degree of F# major (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modes"
    }
  },
  {
    "id": 301,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "D# Locrio è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "Eb",
        "E",
        "Ab"
      ],
      "explanation": "Il Locrio è il 7° modo: D# è il 7° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D# Locrian is a mode of which major scale?",
      "options": [
        "C#",
        "Eb",
        "E",
        "Ab"
      ],
      "explanation": "Locrian is the 7th mode: D# is the 7th degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 302,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "D Ionio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "A",
        "F",
        "Bb"
      ],
      "explanation": "Lo Ionio è il 1° modo: D è il 1° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Ionian is a mode of which major scale?",
      "options": [
        "D",
        "A",
        "F",
        "Bb"
      ],
      "explanation": "Ionian is the 1st mode: D is the 1st degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 303,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "D Dorico è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "D",
        "G",
        "C"
      ],
      "explanation": "Il Dorico è il 2° modo: D è il 2° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Dorian is a mode of which major scale?",
      "options": [
        "Bb",
        "D",
        "G",
        "C"
      ],
      "explanation": "Dorian is the 2nd mode: D is the 2nd degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 304,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "D Frigio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "F",
        "Bb",
        "C"
      ],
      "explanation": "Il Frigio è il 3° modo: D è il 3° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Phrygian is a mode of which major scale?",
      "options": [
        "Eb",
        "F",
        "Bb",
        "C"
      ],
      "explanation": "Phrygian is the 3rd mode: D is the 3rd degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 305,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "D Lidio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "Bb",
        "Eb",
        "A"
      ],
      "explanation": "Il Lidio è il 4° modo: D è il 4° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Lydian is a mode of which major scale?",
      "options": [
        "D",
        "Bb",
        "Eb",
        "A"
      ],
      "explanation": "Lydian is the 4th mode: D is the 4th degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 306,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "D Misolidio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "Bb",
        "C",
        "Eb"
      ],
      "explanation": "Il Misolidio è il 5° modo: D è il 5° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Mixolydian is a mode of which major scale?",
      "options": [
        "G",
        "Bb",
        "C",
        "Eb"
      ],
      "explanation": "Mixolydian is the 5th mode: D is the 5th degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 307,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "D Eolio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "F",
        "Bb",
        "Eb"
      ],
      "explanation": "L'Eolio è il 6° modo: D è il 6° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Aeolian is a mode of which major scale?",
      "options": [
        "D",
        "F",
        "Bb",
        "Eb"
      ],
      "explanation": "Aeolian is the 6th mode: D is the 6th degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 308,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "D Locrio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "D",
        "Bb",
        "Eb"
      ],
      "explanation": "Il Locrio è il 7° modo: D è il 7° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "D Locrian is a mode of which major scale?",
      "options": [
        "F",
        "D",
        "Bb",
        "Eb"
      ],
      "explanation": "Locrian is the 7th mode: D is the 7th degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 309,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Eb Ionio è un modo di quale scala maggiore?",
      "options": [
        "Cb",
        "Gb",
        "Db",
        "Eb"
      ],
      "explanation": "Lo Ionio è il 1° modo: Eb è il 1° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Ionian is a mode of which major scale?",
      "options": [
        "Cb",
        "Gb",
        "Db",
        "Eb"
      ],
      "explanation": "Ionian is the 1st mode: Eb is the 1st degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 310,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Eb Dorico è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Db",
        "E",
        "Eb"
      ],
      "explanation": "Il Dorico è il 2° modo: Eb è il 2° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Dorian is a mode of which major scale?",
      "options": [
        "Ab",
        "Db",
        "E",
        "Eb"
      ],
      "explanation": "Dorian is the 2nd mode: Eb is the 2nd degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 311,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Eb Frigio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "E",
        "Eb",
        "Cb"
      ],
      "explanation": "Il Frigio è il 3° modo: Eb è il 3° grado di Cb maggiore (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Phrygian is a mode of which major scale?",
      "options": [
        "Ab",
        "E",
        "Eb",
        "Cb"
      ],
      "explanation": "Phrygian is the 3rd mode: Eb is the 3rd degree of Cb major (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modes"
    }
  },
  {
    "id": 312,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Eb Lidio è un modo di quale scala maggiore?",
      "options": [
        "Db",
        "Bb",
        "Ab",
        "Eb"
      ],
      "explanation": "Il Lidio è il 4° modo: Eb è il 4° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Lydian is a mode of which major scale?",
      "options": [
        "Db",
        "Bb",
        "Ab",
        "Eb"
      ],
      "explanation": "Lydian is the 4th mode: Eb is the 4th degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 313,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Eb Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Eb",
        "E",
        "Cb"
      ],
      "explanation": "Il Misolidio è il 5° modo: Eb è il 5° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Mixolydian is a mode of which major scale?",
      "options": [
        "Ab",
        "Eb",
        "E",
        "Cb"
      ],
      "explanation": "Mixolydian is the 5th mode: Eb is the 5th degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 314,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Eb Eolio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Gb",
        "Db",
        "Cb"
      ],
      "explanation": "L'Eolio è il 6° modo: Eb è il 6° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "Eb Aeolian is a mode of which major scale?",
      "options": [
        "Ab",
        "Gb",
        "Db",
        "Cb"
      ],
      "explanation": "Aeolian is the 6th mode: Eb is the 6th degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 315,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "G# Locrio è un modo di quale scala maggiore?",
      "options": [
        "A",
        "F#",
        "Ab",
        "C#"
      ],
      "explanation": "Il Locrio è il 7° modo: G# è il 7° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "G# Locrian is a mode of which major scale?",
      "options": [
        "A",
        "F#",
        "Ab",
        "C#"
      ],
      "explanation": "Locrian is the 7th mode: G# is the 7th degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 316,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "E Ionio è un modo di quale scala maggiore?",
      "options": [
        "E",
        "G",
        "B",
        "A"
      ],
      "explanation": "Lo Ionio è il 1° modo: E è il 1° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Ionian is a mode of which major scale?",
      "options": [
        "E",
        "G",
        "B",
        "A"
      ],
      "explanation": "Ionian is the 1st mode: E is the 1st degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 317,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "E Dorico è un modo di quale scala maggiore?",
      "options": [
        "C",
        "D",
        "A",
        "E"
      ],
      "explanation": "Il Dorico è il 2° modo: E è il 2° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Dorian is a mode of which major scale?",
      "options": [
        "C",
        "D",
        "A",
        "E"
      ],
      "explanation": "Dorian is the 2nd mode: E is the 2nd degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 318,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "E Frigio è un modo di quale scala maggiore?",
      "options": [
        "E",
        "C",
        "D",
        "G"
      ],
      "explanation": "Il Frigio è il 3° modo: E è il 3° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Phrygian is a mode of which major scale?",
      "options": [
        "E",
        "C",
        "D",
        "G"
      ],
      "explanation": "Phrygian is the 3rd mode: E is the 3rd degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 319,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "E Lidio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "D",
        "B",
        "E"
      ],
      "explanation": "Il Lidio è il 4° modo: E è il 4° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Lydian is a mode of which major scale?",
      "options": [
        "G",
        "D",
        "B",
        "E"
      ],
      "explanation": "Lydian is the 4th mode: E is the 4th degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 320,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "E Misolidio è un modo di quale scala maggiore?",
      "options": [
        "E",
        "B",
        "A",
        "C"
      ],
      "explanation": "Il Misolidio è il 5° modo: E è il 5° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Mixolydian is a mode of which major scale?",
      "options": [
        "E",
        "B",
        "A",
        "C"
      ],
      "explanation": "Mixolydian is the 5th mode: E is the 5th degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 321,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "E Eolio è un modo di quale scala maggiore?",
      "options": [
        "C",
        "G",
        "F",
        "E"
      ],
      "explanation": "L'Eolio è il 6° modo: E è il 6° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Aeolian is a mode of which major scale?",
      "options": [
        "C",
        "G",
        "F",
        "E"
      ],
      "explanation": "Aeolian is the 6th mode: E is the 6th degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 322,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "E Locrio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "D",
        "E",
        "F"
      ],
      "explanation": "Il Locrio è il 7° modo: E è il 7° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "E Locrian is a mode of which major scale?",
      "options": [
        "G",
        "D",
        "E",
        "F"
      ],
      "explanation": "Locrian is the 7th mode: E is the 7th degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 323,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F Ionio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Db",
        "F",
        "Eb"
      ],
      "explanation": "Lo Ionio è il 1° modo: F è il 1° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Ionian is a mode of which major scale?",
      "options": [
        "Ab",
        "Db",
        "F",
        "Eb"
      ],
      "explanation": "Ionian is the 1st mode: F is the 1st degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 324,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F Dorico è un modo di quale scala maggiore?",
      "options": [
        "C",
        "F",
        "Eb",
        "Db"
      ],
      "explanation": "Il Dorico è il 2° modo: F è il 2° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Dorian is a mode of which major scale?",
      "options": [
        "C",
        "F",
        "Eb",
        "Db"
      ],
      "explanation": "Dorian is the 2nd mode: F is the 2nd degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 325,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "F Frigio è un modo di quale scala maggiore?",
      "options": [
        "Db",
        "Bb",
        "Gb",
        "F"
      ],
      "explanation": "Il Frigio è il 3° modo: F è il 3° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Phrygian is a mode of which major scale?",
      "options": [
        "Db",
        "Bb",
        "Gb",
        "F"
      ],
      "explanation": "Phrygian is the 3rd mode: F is the 3rd degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 326,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F Lidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Gb",
        "C",
        "Db"
      ],
      "explanation": "Il Lidio è il 4° modo: F è il 4° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Lydian is a mode of which major scale?",
      "options": [
        "Eb",
        "Gb",
        "C",
        "Db"
      ],
      "explanation": "Lydian is the 4th mode: F is the 4th degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 327,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "F Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Gb",
        "F",
        "C"
      ],
      "explanation": "Il Misolidio è il 5° modo: F è il 5° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Mixolydian is a mode of which major scale?",
      "options": [
        "Bb",
        "Gb",
        "F",
        "C"
      ],
      "explanation": "Mixolydian is the 5th mode: F is the 5th degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 328,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F Eolio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "Db",
        "Ab",
        "Gb"
      ],
      "explanation": "L'Eolio è il 6° modo: F è il 6° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Aeolian is a mode of which major scale?",
      "options": [
        "F",
        "Db",
        "Ab",
        "Gb"
      ],
      "explanation": "Aeolian is the 6th mode: F is the 6th degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 329,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F Locrio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "Bb",
        "Gb",
        "Db"
      ],
      "explanation": "Il Locrio è il 7° modo: F è il 7° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "F Locrian is a mode of which major scale?",
      "options": [
        "F",
        "Bb",
        "Gb",
        "Db"
      ],
      "explanation": "Locrian is the 7th mode: F is the 7th degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 330,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "F# Ionio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "F#",
        "B",
        "E"
      ],
      "explanation": "Lo Ionio è il 1° modo: F# è il 1° grado di F# maggiore (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Ionian is a mode of which major scale?",
      "options": [
        "G",
        "F#",
        "B",
        "E"
      ],
      "explanation": "Ionian is the 1st mode: F# is the 1st degree of F# major (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modes"
    }
  },
  {
    "id": 331,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "F# Dorico è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "E",
        "F#",
        "D"
      ],
      "explanation": "Il Dorico è il 2° modo: F# è il 2° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Dorian is a mode of which major scale?",
      "options": [
        "C#",
        "E",
        "F#",
        "D"
      ],
      "explanation": "Dorian is the 2nd mode: F# is the 2nd degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 332,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F# Frigio è un modo di quale scala maggiore?",
      "options": [
        "C#",
        "G",
        "D",
        "A"
      ],
      "explanation": "Il Frigio è il 3° modo: F# è il 3° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Phrygian is a mode of which major scale?",
      "options": [
        "C#",
        "G",
        "D",
        "A"
      ],
      "explanation": "Phrygian is the 3rd mode: F# is the 3rd degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 333,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "F# Lidio è un modo di quale scala maggiore?",
      "options": [
        "A",
        "E",
        "C#",
        "G"
      ],
      "explanation": "Il Lidio è il 4° modo: F# è il 4° grado di C# maggiore (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Lydian is a mode of which major scale?",
      "options": [
        "A",
        "E",
        "C#",
        "G"
      ],
      "explanation": "Lydian is the 4th mode: F# is the 4th degree of C# major (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modes"
    }
  },
  {
    "id": 334,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "F# Misolidio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "D",
        "E",
        "A"
      ],
      "explanation": "Il Misolidio è il 5° modo: F# è il 5° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Mixolydian is a mode of which major scale?",
      "options": [
        "B",
        "D",
        "E",
        "A"
      ],
      "explanation": "Mixolydian is the 5th mode: F# is the 5th degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 335,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "F# Eolio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "E",
        "C#",
        "A"
      ],
      "explanation": "L'Eolio è il 6° modo: F# è il 6° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Aeolian is a mode of which major scale?",
      "options": [
        "D",
        "E",
        "C#",
        "A"
      ],
      "explanation": "Aeolian is the 6th mode: F# is the 6th degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 336,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "F# Locrio è un modo di quale scala maggiore?",
      "options": [
        "E",
        "C#",
        "A",
        "G"
      ],
      "explanation": "Il Locrio è il 7° modo: F# è il 7° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "F# Locrian is a mode of which major scale?",
      "options": [
        "E",
        "C#",
        "A",
        "G"
      ],
      "explanation": "Locrian is the 7th mode: F# is the 7th degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 337,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Gb Ionio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "E",
        "Gb",
        "Cb"
      ],
      "explanation": "Lo Ionio è il 1° modo: Gb è il 1° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "Gb Ionian is a mode of which major scale?",
      "options": [
        "D",
        "E",
        "Gb",
        "Cb"
      ],
      "explanation": "Ionian is the 1st mode: Gb is the 1st degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 338,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "D# Dorico è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "B",
        "C#",
        "Ab"
      ],
      "explanation": "Il Dorico è il 2° modo: D# è il 2° grado di C# maggiore (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modi"
    },
    "en": {
      "question": "D# Dorian is a mode of which major scale?",
      "options": [
        "Eb",
        "B",
        "C#",
        "Ab"
      ],
      "explanation": "Dorian is the 2nd mode: D# is the 2nd degree of C# major (C#, D#, E#, F#, G#, A#, B#).",
      "sub": "Modes"
    }
  },
  {
    "id": 339,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "G# Frigio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "C#",
        "Ab",
        "E"
      ],
      "explanation": "Il Frigio è il 3° modo: G# è il 3° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "G# Phrygian is a mode of which major scale?",
      "options": [
        "B",
        "C#",
        "Ab",
        "E"
      ],
      "explanation": "Phrygian is the 3rd mode: G# is the 3rd degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 340,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Gb Lidio è un modo di quale scala maggiore?",
      "options": [
        "Db",
        "G",
        "Gb",
        "Cb"
      ],
      "explanation": "Il Lidio è il 4° modo: Gb è il 4° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "Gb Lydian is a mode of which major scale?",
      "options": [
        "Db",
        "G",
        "Gb",
        "Cb"
      ],
      "explanation": "Lydian is the 4th mode: Gb is the 4th degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 341,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Gb Misolidio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "Gb",
        "Cb",
        "E"
      ],
      "explanation": "Il Misolidio è il 5° modo: Gb è il 5° grado di Cb maggiore (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modi"
    },
    "en": {
      "question": "Gb Mixolydian is a mode of which major scale?",
      "options": [
        "G",
        "Gb",
        "Cb",
        "E"
      ],
      "explanation": "Mixolydian is the 5th mode: Gb is the 5th degree of Cb major (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modes"
    }
  },
  {
    "id": 342,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "G# Eolio è un modo di quale scala maggiore?",
      "options": [
        "F#",
        "B",
        "C#",
        "A"
      ],
      "explanation": "L'Eolio è il 6° modo: G# è il 6° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "G# Aeolian is a mode of which major scale?",
      "options": [
        "F#",
        "B",
        "C#",
        "A"
      ],
      "explanation": "Aeolian is the 6th mode: G# is the 6th degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 343,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "A# Locrio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "F",
        "Eb",
        "Bb"
      ],
      "explanation": "Il Locrio è il 7° modo: A# è il 7° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A# Locrian is a mode of which major scale?",
      "options": [
        "B",
        "F",
        "Eb",
        "Bb"
      ],
      "explanation": "Locrian is the 7th mode: A# is the 7th degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 344,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "G Ionio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "Eb",
        "D",
        "F"
      ],
      "explanation": "Lo Ionio è il 1° modo: G è il 1° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Ionian is a mode of which major scale?",
      "options": [
        "G",
        "Eb",
        "D",
        "F"
      ],
      "explanation": "Ionian is the 1st mode: G is the 1st degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 345,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "G Dorico è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "F",
        "Bb",
        "D"
      ],
      "explanation": "Il Dorico è il 2° modo: G è il 2° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Dorian is a mode of which major scale?",
      "options": [
        "Ab",
        "F",
        "Bb",
        "D"
      ],
      "explanation": "Dorian is the 2nd mode: G is the 2nd degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 346,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "G Frigio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Ab",
        "Bb",
        "C"
      ],
      "explanation": "Il Frigio è il 3° modo: G è il 3° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Phrygian is a mode of which major scale?",
      "options": [
        "Eb",
        "Ab",
        "Bb",
        "C"
      ],
      "explanation": "Phrygian is the 3rd mode: G is the 3rd degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 347,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "G Lidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Ab",
        "D",
        "G"
      ],
      "explanation": "Il Lidio è il 4° modo: G è il 4° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Lydian is a mode of which major scale?",
      "options": [
        "Eb",
        "Ab",
        "D",
        "G"
      ],
      "explanation": "Lydian is the 4th mode: G is the 4th degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 348,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "G Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "G",
        "C",
        "Ab"
      ],
      "explanation": "Il Misolidio è il 5° modo: G è il 5° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Mixolydian is a mode of which major scale?",
      "options": [
        "Eb",
        "G",
        "C",
        "Ab"
      ],
      "explanation": "Mixolydian is the 5th mode: G is the 5th degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 349,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "G Eolio è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Bb",
        "D",
        "F"
      ],
      "explanation": "L'Eolio è il 6° modo: G è il 6° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Aeolian is a mode of which major scale?",
      "options": [
        "Ab",
        "Bb",
        "D",
        "F"
      ],
      "explanation": "Aeolian is the 6th mode: G is the 6th degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 350,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "G Locrio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Ab",
        "C",
        "Eb"
      ],
      "explanation": "Il Locrio è il 7° modo: G è il 7° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "G Locrian is a mode of which major scale?",
      "options": [
        "Bb",
        "Ab",
        "C",
        "Eb"
      ],
      "explanation": "Locrian is the 7th mode: G is the 7th degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 351,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Ab Ionio è un modo di quale scala maggiore?",
      "options": [
        "Db",
        "A",
        "Ab",
        "Eb"
      ],
      "explanation": "Lo Ionio è il 1° modo: Ab è il 1° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "Ab Ionian is a mode of which major scale?",
      "options": [
        "Db",
        "A",
        "Ab",
        "Eb"
      ],
      "explanation": "Ionian is the 1st mode: Ab is the 1st degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 352,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Ab Dorico è un modo di quale scala maggiore?",
      "options": [
        "E",
        "Cb",
        "Gb",
        "A"
      ],
      "explanation": "Il Dorico è il 2° modo: Ab è il 2° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "Ab Dorian is a mode of which major scale?",
      "options": [
        "E",
        "Cb",
        "Gb",
        "A"
      ],
      "explanation": "Dorian is the 2nd mode: Ab is the 2nd degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 353,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "A# Frigio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "Bb",
        "F#",
        "F"
      ],
      "explanation": "Il Frigio è il 3° modo: A# è il 3° grado di F# maggiore (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A# Phrygian is a mode of which major scale?",
      "options": [
        "B",
        "Bb",
        "F#",
        "F"
      ],
      "explanation": "Phrygian is the 3rd mode: A# is the 3rd degree of F# major (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modes"
    }
  },
  {
    "id": 354,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Ab Lidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Db",
        "E",
        "A"
      ],
      "explanation": "Il Lidio è il 4° modo: Ab è il 4° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "Ab Lydian is a mode of which major scale?",
      "options": [
        "Eb",
        "Db",
        "E",
        "A"
      ],
      "explanation": "Lydian is the 4th mode: Ab is the 4th degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 355,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Ab Misolidio è un modo di quale scala maggiore?",
      "options": [
        "Eb",
        "Db",
        "Cb",
        "Ab"
      ],
      "explanation": "Il Misolidio è il 5° modo: Ab è il 5° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "Ab Mixolydian is a mode of which major scale?",
      "options": [
        "Eb",
        "Db",
        "Cb",
        "Ab"
      ],
      "explanation": "Mixolydian is the 5th mode: Ab is the 5th degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 356,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Ab Eolio è un modo di quale scala maggiore?",
      "options": [
        "Cb",
        "A",
        "Db",
        "Eb"
      ],
      "explanation": "L'Eolio è il 6° modo: Ab è il 6° grado di Cb maggiore (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modi"
    },
    "en": {
      "question": "Ab Aeolian is a mode of which major scale?",
      "options": [
        "Cb",
        "A",
        "Db",
        "Eb"
      ],
      "explanation": "Aeolian is the 6th mode: Ab is the 6th degree of Cb major (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modes"
    }
  },
  {
    "id": 357,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Nella scala di F maggiore, quale modo inizia dalla nota E?",
      "options": [
        "E Locrio",
        "E Dorico",
        "E Frigio",
        "E Ionio"
      ],
      "explanation": "E è il 7° grado di F maggiore, quindi il modo che parte da E è il 7° modo: il Locrio.",
      "sub": "Modi"
    },
    "en": {
      "question": "In the F major scale, which mode starts on E?",
      "options": [
        "E Locrian",
        "E Dorian",
        "E Phrygian",
        "E Ionian"
      ],
      "explanation": "E is the 7th degree of F major, so the mode starting there is the 7th mode: Locrian.",
      "sub": "Modes"
    }
  },
  {
    "id": 358,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "A Ionio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "C",
        "E",
        "A"
      ],
      "explanation": "Lo Ionio è il 1° modo: A è il 1° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Ionian is a mode of which major scale?",
      "options": [
        "F",
        "C",
        "E",
        "A"
      ],
      "explanation": "Ionian is the 1st mode: A is the 1st degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 359,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "A Dorico è un modo di quale scala maggiore?",
      "options": [
        "C",
        "E",
        "Bb",
        "G"
      ],
      "explanation": "Il Dorico è il 2° modo: A è il 2° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Dorian is a mode of which major scale?",
      "options": [
        "C",
        "E",
        "Bb",
        "G"
      ],
      "explanation": "Dorian is the 2nd mode: A is the 2nd degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 360,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "A Frigio è un modo di quale scala maggiore?",
      "options": [
        "C",
        "F",
        "A",
        "E"
      ],
      "explanation": "Il Frigio è il 3° modo: A è il 3° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Phrygian is a mode of which major scale?",
      "options": [
        "C",
        "F",
        "A",
        "E"
      ],
      "explanation": "Phrygian is the 3rd mode: A is the 3rd degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 361,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "A Lidio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "D",
        "E",
        "G"
      ],
      "explanation": "Il Lidio è il 4° modo: A è il 4° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Lydian is a mode of which major scale?",
      "options": [
        "Bb",
        "D",
        "E",
        "G"
      ],
      "explanation": "Lydian is the 4th mode: A is the 4th degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 362,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "A Misolidio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "F",
        "E",
        "Bb"
      ],
      "explanation": "Il Misolidio è il 5° modo: A è il 5° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Mixolydian is a mode of which major scale?",
      "options": [
        "D",
        "F",
        "E",
        "Bb"
      ],
      "explanation": "Mixolydian is the 5th mode: A is the 5th degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 363,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "A Eolio è un modo di quale scala maggiore?",
      "options": [
        "C",
        "F",
        "D",
        "Bb"
      ],
      "explanation": "L'Eolio è il 6° modo: A è il 6° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Aeolian is a mode of which major scale?",
      "options": [
        "C",
        "F",
        "D",
        "Bb"
      ],
      "explanation": "Aeolian is the 6th mode: A is the 6th degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 364,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "A Locrio è un modo di quale scala maggiore?",
      "options": [
        "A",
        "D",
        "Bb",
        "F"
      ],
      "explanation": "Il Locrio è il 7° modo: A è il 7° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "A Locrian is a mode of which major scale?",
      "options": [
        "A",
        "D",
        "Bb",
        "F"
      ],
      "explanation": "Locrian is the 7th mode: A is the 7th degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 365,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Bb Ionio è un modo di quale scala maggiore?",
      "options": [
        "Bb",
        "Ab",
        "Db",
        "Gb"
      ],
      "explanation": "Lo Ionio è il 1° modo: Bb è il 1° grado di Bb maggiore (Bb, C, D, Eb, F, G, A).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Ionian is a mode of which major scale?",
      "options": [
        "Bb",
        "Ab",
        "Db",
        "Gb"
      ],
      "explanation": "Ionian is the 1st mode: Bb is the 1st degree of Bb major (Bb, C, D, Eb, F, G, A).",
      "sub": "Modes"
    }
  },
  {
    "id": 366,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Bb Dorico è un modo di quale scala maggiore?",
      "options": [
        "Ab",
        "Bb",
        "Cb",
        "F"
      ],
      "explanation": "Il Dorico è il 2° modo: Bb è il 2° grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Dorian is a mode of which major scale?",
      "options": [
        "Ab",
        "Bb",
        "Cb",
        "F"
      ],
      "explanation": "Dorian is the 2nd mode: Bb is the 2nd degree of Ab major (Ab, Bb, C, Db, Eb, F, G).",
      "sub": "Modes"
    }
  },
  {
    "id": 367,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Bb Frigio è un modo di quale scala maggiore?",
      "options": [
        "Gb",
        "Ab",
        "Cb",
        "F"
      ],
      "explanation": "Il Frigio è il 3° modo: Bb è il 3° grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Phrygian is a mode of which major scale?",
      "options": [
        "Gb",
        "Ab",
        "Cb",
        "F"
      ],
      "explanation": "Phrygian is the 3rd mode: Bb is the 3rd degree of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F).",
      "sub": "Modes"
    }
  },
  {
    "id": 368,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Bb Lidio è un modo di quale scala maggiore?",
      "options": [
        "Gb",
        "F",
        "Eb",
        "Bb"
      ],
      "explanation": "Il Lidio è il 4° modo: Bb è il 4° grado di F maggiore (F, G, A, Bb, C, D, E).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Lydian is a mode of which major scale?",
      "options": [
        "Gb",
        "F",
        "Eb",
        "Bb"
      ],
      "explanation": "Lydian is the 4th mode: Bb is the 4th degree of F major (F, G, A, Bb, C, D, E).",
      "sub": "Modes"
    }
  },
  {
    "id": 369,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Bb Misolidio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "Ab",
        "Bb",
        "Eb"
      ],
      "explanation": "Il Misolidio è il 5° modo: Bb è il 5° grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Mixolydian is a mode of which major scale?",
      "options": [
        "F",
        "Ab",
        "Bb",
        "Eb"
      ],
      "explanation": "Mixolydian is the 5th mode: Bb is the 5th degree of Eb major (Eb, F, G, Ab, Bb, C, D).",
      "sub": "Modes"
    }
  },
  {
    "id": 370,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Bb Eolio è un modo di quale scala maggiore?",
      "options": [
        "F",
        "Db",
        "Ab",
        "Bb"
      ],
      "explanation": "L'Eolio è il 6° modo: Bb è il 6° grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Aeolian is a mode of which major scale?",
      "options": [
        "F",
        "Db",
        "Ab",
        "Bb"
      ],
      "explanation": "Aeolian is the 6th mode: Bb is the 6th degree of Db major (Db, Eb, F, Gb, Ab, Bb, C).",
      "sub": "Modes"
    }
  },
  {
    "id": 371,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Bb Locrio è un modo di quale scala maggiore?",
      "options": [
        "Cb",
        "Ab",
        "Bb",
        "Eb"
      ],
      "explanation": "Il Locrio è il 7° modo: Bb è il 7° grado di Cb maggiore (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modi"
    },
    "en": {
      "question": "Bb Locrian is a mode of which major scale?",
      "options": [
        "Cb",
        "Ab",
        "Bb",
        "Eb"
      ],
      "explanation": "Locrian is the 7th mode: Bb is the 7th degree of Cb major (Cb, Db, Eb, Fb, Gb, Ab, Bb).",
      "sub": "Modes"
    }
  },
  {
    "id": 372,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "B Ionio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "B",
        "G",
        "E"
      ],
      "explanation": "Lo Ionio è il 1° modo: B è il 1° grado di B maggiore (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Ionian is a mode of which major scale?",
      "options": [
        "D",
        "B",
        "G",
        "E"
      ],
      "explanation": "Ionian is the 1st mode: B is the 1st degree of B major (B, C#, D#, E, F#, G#, A#).",
      "sub": "Modes"
    }
  },
  {
    "id": 373,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "B Dorico è un modo di quale scala maggiore?",
      "options": [
        "F#",
        "C",
        "E",
        "A"
      ],
      "explanation": "Il Dorico è il 2° modo: B è il 2° grado di A maggiore (A, B, C#, D, E, F#, G#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Dorian is a mode of which major scale?",
      "options": [
        "F#",
        "C",
        "E",
        "A"
      ],
      "explanation": "Dorian is the 2nd mode: B is the 2nd degree of A major (A, B, C#, D, E, F#, G#).",
      "sub": "Modes"
    }
  },
  {
    "id": 374,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "B Frigio è un modo di quale scala maggiore?",
      "options": [
        "F#",
        "G",
        "D",
        "A"
      ],
      "explanation": "Il Frigio è il 3° modo: B è il 3° grado di G maggiore (G, A, B, C, D, E, F#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Phrygian is a mode of which major scale?",
      "options": [
        "F#",
        "G",
        "D",
        "A"
      ],
      "explanation": "Phrygian is the 3rd mode: B is the 3rd degree of G major (G, A, B, C, D, E, F#).",
      "sub": "Modes"
    }
  },
  {
    "id": 375,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "B Lidio è un modo di quale scala maggiore?",
      "options": [
        "D",
        "A",
        "G",
        "F#"
      ],
      "explanation": "Il Lidio è il 4° modo: B è il 4° grado di F# maggiore (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Lydian is a mode of which major scale?",
      "options": [
        "D",
        "A",
        "G",
        "F#"
      ],
      "explanation": "Lydian is the 4th mode: B is the 4th degree of F# major (F#, G#, A#, B, C#, D#, E#).",
      "sub": "Modes"
    }
  },
  {
    "id": 376,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "B Misolidio è un modo di quale scala maggiore?",
      "options": [
        "B",
        "D",
        "E",
        "A"
      ],
      "explanation": "Il Misolidio è il 5° modo: B è il 5° grado di E maggiore (E, F#, G#, A, B, C#, D#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Mixolydian is a mode of which major scale?",
      "options": [
        "B",
        "D",
        "E",
        "A"
      ],
      "explanation": "Mixolydian is the 5th mode: B is the 5th degree of E major (E, F#, G#, A, B, C#, D#).",
      "sub": "Modes"
    }
  },
  {
    "id": 377,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "B Eolio è un modo di quale scala maggiore?",
      "options": [
        "G",
        "C",
        "E",
        "D"
      ],
      "explanation": "L'Eolio è il 6° modo: B è il 6° grado di D maggiore (D, E, F#, G, A, B, C#).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Aeolian is a mode of which major scale?",
      "options": [
        "G",
        "C",
        "E",
        "D"
      ],
      "explanation": "Aeolian is the 6th mode: B is the 6th degree of D major (D, E, F#, G, A, B, C#).",
      "sub": "Modes"
    }
  },
  {
    "id": 378,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "B Locrio è un modo di quale scala maggiore?",
      "options": [
        "C",
        "G",
        "D",
        "E"
      ],
      "explanation": "Il Locrio è il 7° modo: B è il 7° grado di C maggiore (C, D, E, F, G, A, B).",
      "sub": "Modi"
    },
    "en": {
      "question": "B Locrian is a mode of which major scale?",
      "options": [
        "C",
        "G",
        "D",
        "E"
      ],
      "explanation": "Locrian is the 7th mode: B is the 7th degree of C major (C, D, E, F, G, A, B).",
      "sub": "Modes"
    }
  },
  {
    "id": 379,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "C7",
        "Cm7",
        "Dm7",
        "Cmaj7"
      ],
      "explanation": "Il I grado di C maggiore è C; con le sole note della scala si ottiene Cmaj7 (C, E, G, B), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree I?",
      "options": [
        "C7",
        "Cm7",
        "Dm7",
        "Cmaj7"
      ],
      "explanation": "Degree I of C major is C; using only scale notes gives Cmaj7 (C, E, G, B), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 380,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Dmaj7",
        "D7",
        "Dm7",
        "Bm7b5"
      ],
      "explanation": "Il II grado di C maggiore è D; con le sole note della scala si ottiene Dm7 (D, F, A, C), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree II?",
      "options": [
        "Dmaj7",
        "D7",
        "Dm7",
        "Bm7b5"
      ],
      "explanation": "Degree II of C major is D; using only scale notes gives Dm7 (D, F, A, C), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 381,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "Em7",
        "E7",
        "Emaj7",
        "Fmaj7"
      ],
      "explanation": "Il III grado di C maggiore è E; con le sole note della scala si ottiene Em7 (E, G, B, D), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree III?",
      "options": [
        "Em7",
        "E7",
        "Emaj7",
        "Fmaj7"
      ],
      "explanation": "Degree III of C major is E; using only scale notes gives Em7 (E, G, B, D), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 382,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "F7",
        "Fmaj7",
        "Fm7",
        "Am7"
      ],
      "explanation": "Il IV grado di C maggiore è F; con le sole note della scala si ottiene Fmaj7 (F, A, C, E), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree IV?",
      "options": [
        "F7",
        "Fmaj7",
        "Fm7",
        "Am7"
      ],
      "explanation": "Degree IV of C major is F; using only scale notes gives Fmaj7 (F, A, C, E), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 383,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Gm7b5",
        "Gm7",
        "G7",
        "Dm7"
      ],
      "explanation": "Il V grado di C maggiore è G; con le sole note della scala si ottiene G7 (G, B, D, F), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree V?",
      "options": [
        "Gm7b5",
        "Gm7",
        "G7",
        "Dm7"
      ],
      "explanation": "Degree V of C major is G; using only scale notes gives G7 (G, B, D, F), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 384,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Am7b5",
        "Am7",
        "Amaj7",
        "Dm7"
      ],
      "explanation": "Il VI grado di C maggiore è A; con le sole note della scala si ottiene Am7 (A, C, E, G), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree VI?",
      "options": [
        "Am7b5",
        "Am7",
        "Amaj7",
        "Dm7"
      ],
      "explanation": "Degree VI of C major is A; using only scale notes gives Am7 (A, C, E, G), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 385,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "B7",
        "Bm7b5",
        "Bm7",
        "Em7"
      ],
      "explanation": "Il VII grado di C maggiore è B; con le sole note della scala si ottiene Bm7b5 (B, D, F, A), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which seventh chord is built on degree VII?",
      "options": [
        "B7",
        "Bm7b5",
        "Bm7",
        "Em7"
      ],
      "explanation": "Degree VII of C major is B; using only scale notes gives Bm7b5 (B, D, F, A), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 386,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "C#maj7",
        "C#m7",
        "C#7",
        "B#m7b5"
      ],
      "explanation": "Il I grado di C# maggiore è C#; con le sole note della scala si ottiene C#maj7 (C#, E#, G#, B#) (E# suona come F, B# suona come C), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree I?",
      "options": [
        "C#maj7",
        "C#m7",
        "C#7",
        "B#m7b5"
      ],
      "explanation": "Degree I of C# major is C#; using only scale notes gives C#maj7 (C#, E#, G#, B#) (E# sounds as F, B# sounds as C), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 387,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "D#m7",
        "D#m7b5",
        "D#7",
        "A#m7"
      ],
      "explanation": "Il II grado di C# maggiore è D#; con le sole note della scala si ottiene D#m7 (D#, F#, A#, C#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree II?",
      "options": [
        "D#m7",
        "D#m7b5",
        "D#7",
        "A#m7"
      ],
      "explanation": "Degree II of C# major is D#; using only scale notes gives D#m7 (D#, F#, A#, C#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 388,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "E#m7",
        "E#7",
        "E#maj7",
        "B#m7b5"
      ],
      "explanation": "Il III grado di C# maggiore è E#; con le sole note della scala si ottiene E#m7 (E#, G#, B#, D#) (E# suona come F, B# suona come C), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree III?",
      "options": [
        "E#m7",
        "E#7",
        "E#maj7",
        "B#m7b5"
      ],
      "explanation": "Degree III of C# major is E#; using only scale notes gives E#m7 (E#, G#, B#, D#) (E# sounds as F, B# sounds as C), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 389,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "F#m7",
        "F#m7b5",
        "F#maj7",
        "E#m7"
      ],
      "explanation": "Il IV grado di C# maggiore è F#; con le sole note della scala si ottiene F#maj7 (F#, A#, C#, E#) (E# suona come F), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree IV?",
      "options": [
        "F#m7",
        "F#m7b5",
        "F#maj7",
        "E#m7"
      ],
      "explanation": "Degree IV of C# major is F#; using only scale notes gives F#maj7 (F#, A#, C#, E#) (E# sounds as F), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 390,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "G#m7",
        "G#7",
        "G#m7b5",
        "F#maj7"
      ],
      "explanation": "Il V grado di C# maggiore è G#; con le sole note della scala si ottiene G#7 (G#, B#, D#, F#) (B# suona come C), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree V?",
      "options": [
        "G#m7",
        "G#7",
        "G#m7b5",
        "F#maj7"
      ],
      "explanation": "Degree V of C# major is G#; using only scale notes gives G#7 (G#, B#, D#, F#) (B# sounds as C), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 391,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "A#m7",
        "A#m7b5",
        "A#7",
        "E#m7"
      ],
      "explanation": "Il VI grado di C# maggiore è A#; con le sole note della scala si ottiene A#m7 (A#, C#, E#, G#) (E# suona come F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree VI?",
      "options": [
        "A#m7",
        "A#m7b5",
        "A#7",
        "E#m7"
      ],
      "explanation": "Degree VI of C# major is A#; using only scale notes gives A#m7 (A#, C#, E#, G#) (E# sounds as F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 392,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C# maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "B#maj7",
        "B#m7",
        "B#m7b5",
        "G#7"
      ],
      "explanation": "Il VII grado di C# maggiore è B#; con le sole note della scala si ottiene B#m7b5 (B#, D#, F#, A#) (B# suona come C), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C# major, which seventh chord is built on degree VII?",
      "options": [
        "B#maj7",
        "B#m7",
        "B#m7b5",
        "G#7"
      ],
      "explanation": "Degree VII of C# major is B#; using only scale notes gives B#m7b5 (B#, D#, F#, A#) (B# sounds as C), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 393,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Db7",
        "Dbmaj7",
        "Dbm7b5",
        "Bbm7"
      ],
      "explanation": "Il I grado di Db maggiore è Db; con le sole note della scala si ottiene Dbmaj7 (Db, F, Ab, C), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree I?",
      "options": [
        "Db7",
        "Dbmaj7",
        "Dbm7b5",
        "Bbm7"
      ],
      "explanation": "Degree I of Db major is Db; using only scale notes gives Dbmaj7 (Db, F, Ab, C), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 394,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Ebm7b5",
        "Ebmaj7",
        "Ebm7",
        "Fm7"
      ],
      "explanation": "Il II grado di Db maggiore è Eb; con le sole note della scala si ottiene Ebm7 (Eb, Gb, Bb, Db), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree II?",
      "options": [
        "Ebm7b5",
        "Ebmaj7",
        "Ebm7",
        "Fm7"
      ],
      "explanation": "Degree II of Db major is Eb; using only scale notes gives Ebm7 (Eb, Gb, Bb, Db), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 395,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "F7",
        "Fm7",
        "Fmaj7",
        "Dbmaj7"
      ],
      "explanation": "Il III grado di Db maggiore è F; con le sole note della scala si ottiene Fm7 (F, Ab, C, Eb), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree III?",
      "options": [
        "F7",
        "Fm7",
        "Fmaj7",
        "Dbmaj7"
      ],
      "explanation": "Degree III of Db major is F; using only scale notes gives Fm7 (F, Ab, C, Eb), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 396,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Gbm7b5",
        "Gbm7",
        "Ab7",
        "Gbmaj7"
      ],
      "explanation": "Il IV grado di Db maggiore è Gb; con le sole note della scala si ottiene Gbmaj7 (Gb, Bb, Db, F), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree IV?",
      "options": [
        "Gbm7b5",
        "Gbm7",
        "Ab7",
        "Gbmaj7"
      ],
      "explanation": "Degree IV of Db major is Gb; using only scale notes gives Gbmaj7 (Gb, Bb, Db, F), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 397,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Ab7",
        "Abm7b5",
        "Abm7",
        "Fm7"
      ],
      "explanation": "Il V grado di Db maggiore è Ab; con le sole note della scala si ottiene Ab7 (Ab, C, Eb, Gb), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree V?",
      "options": [
        "Ab7",
        "Abm7b5",
        "Abm7",
        "Fm7"
      ],
      "explanation": "Degree V of Db major is Ab; using only scale notes gives Ab7 (Ab, C, Eb, Gb), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 398,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Bbmaj7",
        "Bbm7b5",
        "Bbm7",
        "Gbmaj7"
      ],
      "explanation": "Il VI grado di Db maggiore è Bb; con le sole note della scala si ottiene Bbm7 (Bb, Db, F, Ab), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree VI?",
      "options": [
        "Bbmaj7",
        "Bbm7b5",
        "Bbm7",
        "Gbmaj7"
      ],
      "explanation": "Degree VI of Db major is Bb; using only scale notes gives Bbm7 (Bb, Db, F, Ab), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 399,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Db maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Cm7b5",
        "C7",
        "Cmaj7",
        "Fm7"
      ],
      "explanation": "Il VII grado di Db maggiore è C; con le sole note della scala si ottiene Cm7b5 (C, Eb, Gb, Bb), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which seventh chord is built on degree VII?",
      "options": [
        "Cm7b5",
        "C7",
        "Cmaj7",
        "Fm7"
      ],
      "explanation": "Degree VII of Db major is C; using only scale notes gives Cm7b5 (C, Eb, Gb, Bb), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 400,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Dmaj7",
        "Dm7b5",
        "Dm7",
        "C#m7b5"
      ],
      "explanation": "Il I grado di D maggiore è D; con le sole note della scala si ottiene Dmaj7 (D, F#, A, C#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree I?",
      "options": [
        "Dmaj7",
        "Dm7b5",
        "Dm7",
        "C#m7b5"
      ],
      "explanation": "Degree I of D major is D; using only scale notes gives Dmaj7 (D, F#, A, C#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 401,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Em7",
        "Emaj7",
        "E7",
        "Gmaj7"
      ],
      "explanation": "Il II grado di D maggiore è E; con le sole note della scala si ottiene Em7 (E, G, B, D), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree II?",
      "options": [
        "Em7",
        "Emaj7",
        "E7",
        "Gmaj7"
      ],
      "explanation": "Degree II of D major is E; using only scale notes gives Em7 (E, G, B, D), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 402,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "F#7",
        "F#maj7",
        "F#m7",
        "Em7"
      ],
      "explanation": "Il III grado di D maggiore è F#; con le sole note della scala si ottiene F#m7 (F#, A, C#, E), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree III?",
      "options": [
        "F#7",
        "F#maj7",
        "F#m7",
        "Em7"
      ],
      "explanation": "Degree III of D major is F#; using only scale notes gives F#m7 (F#, A, C#, E), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 403,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "G7",
        "Gm7b5",
        "Gmaj7",
        "Dmaj7"
      ],
      "explanation": "Il IV grado di D maggiore è G; con le sole note della scala si ottiene Gmaj7 (G, B, D, F#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree IV?",
      "options": [
        "G7",
        "Gm7b5",
        "Gmaj7",
        "Dmaj7"
      ],
      "explanation": "Degree IV of D major is G; using only scale notes gives Gmaj7 (G, B, D, F#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 404,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Am7",
        "A7",
        "Am7b5",
        "Em7"
      ],
      "explanation": "Il V grado di D maggiore è A; con le sole note della scala si ottiene A7 (A, C#, E, G), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree V?",
      "options": [
        "Am7",
        "A7",
        "Am7b5",
        "Em7"
      ],
      "explanation": "Degree V of D major is A; using only scale notes gives A7 (A, C#, E, G), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 405,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Bm7",
        "Bm7b5",
        "Bmaj7",
        "Gmaj7"
      ],
      "explanation": "Il VI grado di D maggiore è B; con le sole note della scala si ottiene Bm7 (B, D, F#, A), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree VI?",
      "options": [
        "Bm7",
        "Bm7b5",
        "Bmaj7",
        "Gmaj7"
      ],
      "explanation": "Degree VI of D major is B; using only scale notes gives Bm7 (B, D, F#, A), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 406,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In D maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "C#m7",
        "C#m7b5",
        "C#7",
        "F#m7"
      ],
      "explanation": "Il VII grado di D maggiore è C#; con le sole note della scala si ottiene C#m7b5 (C#, E, G, B), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which seventh chord is built on degree VII?",
      "options": [
        "C#m7",
        "C#m7b5",
        "C#7",
        "F#m7"
      ],
      "explanation": "Degree VII of D major is C#; using only scale notes gives C#m7b5 (C#, E, G, B), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 407,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Ebm7b5",
        "Ebm7",
        "Ebmaj7",
        "Abmaj7"
      ],
      "explanation": "Il I grado di Eb maggiore è Eb; con le sole note della scala si ottiene Ebmaj7 (Eb, G, Bb, D), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree I?",
      "options": [
        "Ebm7b5",
        "Ebm7",
        "Ebmaj7",
        "Abmaj7"
      ],
      "explanation": "Degree I of Eb major is Eb; using only scale notes gives Ebmaj7 (Eb, G, Bb, D), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 408,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "Fm7",
        "Gm7"
      ],
      "explanation": "Il II grado di Eb maggiore è F; con le sole note della scala si ottiene Fm7 (F, Ab, C, Eb), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree II?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "Fm7",
        "Gm7"
      ],
      "explanation": "Degree II of Eb major is F; using only scale notes gives Fm7 (F, Ab, C, Eb), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 409,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "G7",
        "Gm7b5",
        "Gm7",
        "Ebmaj7"
      ],
      "explanation": "Il III grado di Eb maggiore è G; con le sole note della scala si ottiene Gm7 (G, Bb, D, F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree III?",
      "options": [
        "G7",
        "Gm7b5",
        "Gm7",
        "Ebmaj7"
      ],
      "explanation": "Degree III of Eb major is G; using only scale notes gives Gm7 (G, Bb, D, F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 410,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Abmaj7",
        "Ab7",
        "Abm7b5",
        "Dm7b5"
      ],
      "explanation": "Il IV grado di Eb maggiore è Ab; con le sole note della scala si ottiene Abmaj7 (Ab, C, Eb, G), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree IV?",
      "options": [
        "Abmaj7",
        "Ab7",
        "Abm7b5",
        "Dm7b5"
      ],
      "explanation": "Degree IV of Eb major is Ab; using only scale notes gives Abmaj7 (Ab, C, Eb, G), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 411,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbm7b5",
        "Cm7"
      ],
      "explanation": "Il V grado di Eb maggiore è Bb; con le sole note della scala si ottiene Bb7 (Bb, D, F, Ab), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree V?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbm7b5",
        "Cm7"
      ],
      "explanation": "Degree V of Eb major is Bb; using only scale notes gives Bb7 (Bb, D, F, Ab), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 412,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Cm7b5",
        "Cm7",
        "Cmaj7",
        "Bb7"
      ],
      "explanation": "Il VI grado di Eb maggiore è C; con le sole note della scala si ottiene Cm7 (C, Eb, G, Bb), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree VI?",
      "options": [
        "Cm7b5",
        "Cm7",
        "Cmaj7",
        "Bb7"
      ],
      "explanation": "Degree VI of Eb major is C; using only scale notes gives Cm7 (C, Eb, G, Bb), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 413,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Eb maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Dmaj7",
        "Dm7b5",
        "Dm7",
        "Gm7"
      ],
      "explanation": "Il VII grado di Eb maggiore è D; con le sole note della scala si ottiene Dm7b5 (D, F, Ab, C), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which seventh chord is built on degree VII?",
      "options": [
        "Dmaj7",
        "Dm7b5",
        "Dm7",
        "Gm7"
      ],
      "explanation": "Degree VII of Eb major is D; using only scale notes gives Dm7b5 (D, F, Ab, C), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 414,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Em7",
        "Em7b5",
        "G#m7",
        "Emaj7"
      ],
      "explanation": "Il I grado di E maggiore è E; con le sole note della scala si ottiene Emaj7 (E, G#, B, D#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree I?",
      "options": [
        "Em7",
        "Em7b5",
        "G#m7",
        "Emaj7"
      ],
      "explanation": "Degree I of E major is E; using only scale notes gives Emaj7 (E, G#, B, D#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 415,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "F#m7",
        "F#maj7",
        "F#7",
        "G#m7"
      ],
      "explanation": "Il II grado di E maggiore è F#; con le sole note della scala si ottiene F#m7 (F#, A, C#, E), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree II?",
      "options": [
        "F#m7",
        "F#maj7",
        "F#7",
        "G#m7"
      ],
      "explanation": "Degree II of E major is F#; using only scale notes gives F#m7 (F#, A, C#, E), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 416,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "G#m7b5",
        "G#7",
        "G#m7",
        "D#m7b5"
      ],
      "explanation": "Il III grado di E maggiore è G#; con le sole note della scala si ottiene G#m7 (G#, B, D#, F#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree III?",
      "options": [
        "G#m7b5",
        "G#7",
        "G#m7",
        "D#m7b5"
      ],
      "explanation": "Degree III of E major is G#; using only scale notes gives G#m7 (G#, B, D#, F#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 417,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Am7b5",
        "Amaj7",
        "A7",
        "Emaj7"
      ],
      "explanation": "Il IV grado di E maggiore è A; con le sole note della scala si ottiene Amaj7 (A, C#, E, G#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree IV?",
      "options": [
        "Am7b5",
        "Amaj7",
        "A7",
        "Emaj7"
      ],
      "explanation": "Degree IV of E major is A; using only scale notes gives Amaj7 (A, C#, E, G#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 418,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "B7",
        "Bm7b5",
        "Bm7",
        "Emaj7"
      ],
      "explanation": "Il V grado di E maggiore è B; con le sole note della scala si ottiene B7 (B, D#, F#, A), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree V?",
      "options": [
        "B7",
        "Bm7b5",
        "Bm7",
        "Emaj7"
      ],
      "explanation": "Degree V of E major is B; using only scale notes gives B7 (B, D#, F#, A), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 419,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "C#7",
        "C#m7",
        "C#maj7",
        "G#m7"
      ],
      "explanation": "Il VI grado di E maggiore è C#; con le sole note della scala si ottiene C#m7 (C#, E, G#, B), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree VI?",
      "options": [
        "C#7",
        "C#m7",
        "C#maj7",
        "G#m7"
      ],
      "explanation": "Degree VI of E major is C#; using only scale notes gives C#m7 (C#, E, G#, B), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 420,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In E maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "D#m7b5",
        "D#maj7",
        "D#7",
        "C#m7"
      ],
      "explanation": "Il VII grado di E maggiore è D#; con le sole note della scala si ottiene D#m7b5 (D#, F#, A, C#), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which seventh chord is built on degree VII?",
      "options": [
        "D#m7b5",
        "D#maj7",
        "D#7",
        "C#m7"
      ],
      "explanation": "Degree VII of E major is D#; using only scale notes gives D#m7b5 (D#, F#, A, C#), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 421,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Fmaj7",
        "Fm7",
        "Fm7b5",
        "Dm7"
      ],
      "explanation": "Il I grado di F maggiore è F; con le sole note della scala si ottiene Fmaj7 (F, A, C, E), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree I?",
      "options": [
        "Fmaj7",
        "Fm7",
        "Fm7b5",
        "Dm7"
      ],
      "explanation": "Degree I of F major is F; using only scale notes gives Fmaj7 (F, A, C, E), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 422,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Gm7b5",
        "Gm7",
        "G7",
        "Bbmaj7"
      ],
      "explanation": "Il II grado di F maggiore è G; con le sole note della scala si ottiene Gm7 (G, Bb, D, F), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree II?",
      "options": [
        "Gm7b5",
        "Gm7",
        "G7",
        "Bbmaj7"
      ],
      "explanation": "Degree II of F major is G; using only scale notes gives Gm7 (G, Bb, D, F), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 423,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "Amaj7",
        "Am7",
        "Am7b5",
        "Em7b5"
      ],
      "explanation": "Il III grado di F maggiore è A; con le sole note della scala si ottiene Am7 (A, C, E, G), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree III?",
      "options": [
        "Amaj7",
        "Am7",
        "Am7b5",
        "Em7b5"
      ],
      "explanation": "Degree III of F major is A; using only scale notes gives Am7 (A, C, E, G), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 424,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Bbm7b5",
        "Bbmaj7",
        "Bbm7",
        "C7"
      ],
      "explanation": "Il IV grado di F maggiore è Bb; con le sole note della scala si ottiene Bbmaj7 (Bb, D, F, A), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree IV?",
      "options": [
        "Bbm7b5",
        "Bbmaj7",
        "Bbm7",
        "C7"
      ],
      "explanation": "Degree IV of F major is Bb; using only scale notes gives Bbmaj7 (Bb, D, F, A), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 425,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "C7",
        "Cm7b5",
        "Cmaj7",
        "Em7b5"
      ],
      "explanation": "Il V grado di F maggiore è C; con le sole note della scala si ottiene C7 (C, E, G, Bb), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree V?",
      "options": [
        "C7",
        "Cm7b5",
        "Cmaj7",
        "Em7b5"
      ],
      "explanation": "Degree V of F major is C; using only scale notes gives C7 (C, E, G, Bb), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 426,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Dm7",
        "D7",
        "Dm7b5",
        "Gm7"
      ],
      "explanation": "Il VI grado di F maggiore è D; con le sole note della scala si ottiene Dm7 (D, F, A, C), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree VI?",
      "options": [
        "Dm7",
        "D7",
        "Dm7b5",
        "Gm7"
      ],
      "explanation": "Degree VI of F major is D; using only scale notes gives Dm7 (D, F, A, C), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 427,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "E7",
        "Em7",
        "Gm7",
        "Em7b5"
      ],
      "explanation": "Il VII grado di F maggiore è E; con le sole note della scala si ottiene Em7b5 (E, G, Bb, D), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which seventh chord is built on degree VII?",
      "options": [
        "E7",
        "Em7",
        "Gm7",
        "Em7b5"
      ],
      "explanation": "Degree VII of F major is E; using only scale notes gives Em7b5 (E, G, Bb, D), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 428,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "F#maj7",
        "F#m7",
        "F#7",
        "D#m7"
      ],
      "explanation": "Il I grado di F# maggiore è F#; con le sole note della scala si ottiene F#maj7 (F#, A#, C#, E#) (E# suona come F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree I?",
      "options": [
        "F#maj7",
        "F#m7",
        "F#7",
        "D#m7"
      ],
      "explanation": "Degree I of F# major is F#; using only scale notes gives F#maj7 (F#, A#, C#, E#) (E# sounds as F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 429,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "G#7",
        "G#m7b5",
        "D#m7",
        "G#m7"
      ],
      "explanation": "Il II grado di F# maggiore è G#; con le sole note della scala si ottiene G#m7 (G#, B, D#, F#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree II?",
      "options": [
        "G#7",
        "G#m7b5",
        "D#m7",
        "G#m7"
      ],
      "explanation": "Degree II of F# major is G#; using only scale notes gives G#m7 (G#, B, D#, F#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 430,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "A#maj7",
        "A#m7b5",
        "Bmaj7",
        "A#m7"
      ],
      "explanation": "Il III grado di F# maggiore è A#; con le sole note della scala si ottiene A#m7 (A#, C#, E#, G#) (E# suona come F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree III?",
      "options": [
        "A#maj7",
        "A#m7b5",
        "Bmaj7",
        "A#m7"
      ],
      "explanation": "Degree III of F# major is A#; using only scale notes gives A#m7 (A#, C#, E#, G#) (E# sounds as F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 431,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Bmaj7",
        "Bm7",
        "B7",
        "F#maj7"
      ],
      "explanation": "Il IV grado di F# maggiore è B; con le sole note della scala si ottiene Bmaj7 (B, D#, F#, A#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree IV?",
      "options": [
        "Bmaj7",
        "Bm7",
        "B7",
        "F#maj7"
      ],
      "explanation": "Degree IV of F# major is B; using only scale notes gives Bmaj7 (B, D#, F#, A#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 432,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "C#7",
        "C#m7b5",
        "C#maj7",
        "Bmaj7"
      ],
      "explanation": "Il V grado di F# maggiore è C#; con le sole note della scala si ottiene C#7 (C#, E#, G#, B) (E# suona come F), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree V?",
      "options": [
        "C#7",
        "C#m7b5",
        "C#maj7",
        "Bmaj7"
      ],
      "explanation": "Degree V of F# major is C#; using only scale notes gives C#7 (C#, E#, G#, B) (E# sounds as F), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 433,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "D#m7",
        "D#7",
        "D#maj7",
        "C#7"
      ],
      "explanation": "Il VI grado di F# maggiore è D#; con le sole note della scala si ottiene D#m7 (D#, F#, A#, C#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree VI?",
      "options": [
        "D#m7",
        "D#7",
        "D#maj7",
        "C#7"
      ],
      "explanation": "Degree VI of F# major is D#; using only scale notes gives D#m7 (D#, F#, A#, C#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 434,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F# maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "E#m7b5",
        "E#m7",
        "E#7",
        "D#m7"
      ],
      "explanation": "Il VII grado di F# maggiore è E#; con le sole note della scala si ottiene E#m7b5 (E#, G#, B, D#) (E# suona come F), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F# major, which seventh chord is built on degree VII?",
      "options": [
        "E#m7b5",
        "E#m7",
        "E#7",
        "D#m7"
      ],
      "explanation": "Degree VII of F# major is E#; using only scale notes gives E#m7b5 (E#, G#, B, D#) (E# sounds as F), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 435,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Gbmaj7",
        "Gb7",
        "Gbm7b5",
        "Bbm7"
      ],
      "explanation": "Il I grado di Gb maggiore è Gb; con le sole note della scala si ottiene Gbmaj7 (Gb, Bb, Db, F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree I?",
      "options": [
        "Gbmaj7",
        "Gb7",
        "Gbm7b5",
        "Bbm7"
      ],
      "explanation": "Degree I of Gb major is Gb; using only scale notes gives Gbmaj7 (Gb, Bb, Db, F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 436,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Abm7b5",
        "Abmaj7",
        "Abm7",
        "Ebm7"
      ],
      "explanation": "Il II grado di Gb maggiore è Ab; con le sole note della scala si ottiene Abm7 (Ab, Cb, Eb, Gb) (Cb suona come B), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree II?",
      "options": [
        "Abm7b5",
        "Abmaj7",
        "Abm7",
        "Ebm7"
      ],
      "explanation": "Degree II of Gb major is Ab; using only scale notes gives Abm7 (Ab, Cb, Eb, Gb) (Cb sounds as B), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 437,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbm7b5",
        "Gbmaj7"
      ],
      "explanation": "Il III grado di Gb maggiore è Bb; con le sole note della scala si ottiene Bbm7 (Bb, Db, F, Ab), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree III?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbm7b5",
        "Gbmaj7"
      ],
      "explanation": "Degree III of Gb major is Bb; using only scale notes gives Bbm7 (Bb, Db, F, Ab), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 438,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Cb7",
        "Cbm7b5",
        "Abm7",
        "Cbmaj7"
      ],
      "explanation": "Il IV grado di Gb maggiore è Cb; con le sole note della scala si ottiene Cbmaj7 (Cb, Eb, Gb, Bb) (Cb suona come B), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree IV?",
      "options": [
        "Cb7",
        "Cbm7b5",
        "Abm7",
        "Cbmaj7"
      ],
      "explanation": "Degree IV of Gb major is Cb; using only scale notes gives Cbmaj7 (Cb, Eb, Gb, Bb) (Cb sounds as B), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 439,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Dbm7",
        "Db7",
        "Dbmaj7",
        "Gbmaj7"
      ],
      "explanation": "Il V grado di Gb maggiore è Db; con le sole note della scala si ottiene Db7 (Db, F, Ab, Cb) (Cb suona come B), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree V?",
      "options": [
        "Dbm7",
        "Db7",
        "Dbmaj7",
        "Gbmaj7"
      ],
      "explanation": "Degree V of Gb major is Db; using only scale notes gives Db7 (Db, F, Ab, Cb) (Cb sounds as B), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 440,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Eb7",
        "Ebm7b5",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "Il VI grado di Gb maggiore è Eb; con le sole note della scala si ottiene Ebm7 (Eb, Gb, Bb, Db), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree VI?",
      "options": [
        "Eb7",
        "Ebm7b5",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "Degree VI of Gb major is Eb; using only scale notes gives Ebm7 (Eb, Gb, Bb, Db), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 441,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Gb maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "F7",
        "Bbm7"
      ],
      "explanation": "Il VII grado di Gb maggiore è F; con le sole note della scala si ottiene Fm7b5 (F, Ab, Cb, Eb) (Cb suona come B), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which seventh chord is built on degree VII?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "F7",
        "Bbm7"
      ],
      "explanation": "Degree VII of Gb major is F; using only scale notes gives Fm7b5 (F, Ab, Cb, Eb) (Cb sounds as B), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 442,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Gm7",
        "Gmaj7",
        "G7",
        "Bm7"
      ],
      "explanation": "Il I grado di G maggiore è G; con le sole note della scala si ottiene Gmaj7 (G, B, D, F#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree I?",
      "options": [
        "Gm7",
        "Gmaj7",
        "G7",
        "Bm7"
      ],
      "explanation": "Degree I of G major is G; using only scale notes gives Gmaj7 (G, B, D, F#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 443,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "A7",
        "Am7b5",
        "Cmaj7",
        "Am7"
      ],
      "explanation": "Il II grado di G maggiore è A; con le sole note della scala si ottiene Am7 (A, C, E, G), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree II?",
      "options": [
        "A7",
        "Am7b5",
        "Cmaj7",
        "Am7"
      ],
      "explanation": "Degree II of G major is A; using only scale notes gives Am7 (A, C, E, G), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 444,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "B7",
        "Bmaj7",
        "Em7",
        "Bm7"
      ],
      "explanation": "Il III grado di G maggiore è B; con le sole note della scala si ottiene Bm7 (B, D, F#, A), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree III?",
      "options": [
        "B7",
        "Bmaj7",
        "Em7",
        "Bm7"
      ],
      "explanation": "Degree III of G major is B; using only scale notes gives Bm7 (B, D, F#, A), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 445,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Cmaj7",
        "Cm7",
        "Cm7b5",
        "Em7"
      ],
      "explanation": "Il IV grado di G maggiore è C; con le sole note della scala si ottiene Cmaj7 (C, E, G, B), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree IV?",
      "options": [
        "Cmaj7",
        "Cm7",
        "Cm7b5",
        "Em7"
      ],
      "explanation": "Degree IV of G major is C; using only scale notes gives Cmaj7 (C, E, G, B), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 446,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Dm7b5",
        "Dmaj7",
        "D7",
        "Cmaj7"
      ],
      "explanation": "Il V grado di G maggiore è D; con le sole note della scala si ottiene D7 (D, F#, A, C), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree V?",
      "options": [
        "Dm7b5",
        "Dmaj7",
        "D7",
        "Cmaj7"
      ],
      "explanation": "Degree V of G major is D; using only scale notes gives D7 (D, F#, A, C), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 447,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Em7",
        "Em7b5",
        "E7",
        "Cmaj7"
      ],
      "explanation": "Il VI grado di G maggiore è E; con le sole note della scala si ottiene Em7 (E, G, B, D), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree VI?",
      "options": [
        "Em7",
        "Em7b5",
        "E7",
        "Cmaj7"
      ],
      "explanation": "Degree VI of G major is E; using only scale notes gives Em7 (E, G, B, D), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 448,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "F#m7b5",
        "F#m7",
        "F#maj7",
        "Em7"
      ],
      "explanation": "Il VII grado di G maggiore è F#; con le sole note della scala si ottiene F#m7b5 (F#, A, C, E), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which seventh chord is built on degree VII?",
      "options": [
        "F#m7b5",
        "F#m7",
        "F#maj7",
        "Em7"
      ],
      "explanation": "Degree VII of G major is F#; using only scale notes gives F#m7b5 (F#, A, C, E), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 449,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Abm7",
        "Abm7b5",
        "Eb7",
        "Abmaj7"
      ],
      "explanation": "Il I grado di Ab maggiore è Ab; con le sole note della scala si ottiene Abmaj7 (Ab, C, Eb, G), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree I?",
      "options": [
        "Abm7",
        "Abm7b5",
        "Eb7",
        "Abmaj7"
      ],
      "explanation": "Degree I of Ab major is Ab; using only scale notes gives Abmaj7 (Ab, C, Eb, G), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 450,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Bbmaj7",
        "Bb7",
        "Bbm7",
        "Abmaj7"
      ],
      "explanation": "Il II grado di Ab maggiore è Bb; con le sole note della scala si ottiene Bbm7 (Bb, Db, F, Ab), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree II?",
      "options": [
        "Bbmaj7",
        "Bb7",
        "Bbm7",
        "Abmaj7"
      ],
      "explanation": "Degree II of Ab major is Bb; using only scale notes gives Bbm7 (Bb, Db, F, Ab), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 451,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "Cmaj7",
        "Cm7b5",
        "Fm7",
        "Cm7"
      ],
      "explanation": "Il III grado di Ab maggiore è C; con le sole note della scala si ottiene Cm7 (C, Eb, G, Bb), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree III?",
      "options": [
        "Cmaj7",
        "Cm7b5",
        "Fm7",
        "Cm7"
      ],
      "explanation": "Degree III of Ab major is C; using only scale notes gives Cm7 (C, Eb, G, Bb), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 452,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Dbmaj7",
        "Dbm7b5",
        "Db7",
        "Abmaj7"
      ],
      "explanation": "Il IV grado di Ab maggiore è Db; con le sole note della scala si ottiene Dbmaj7 (Db, F, Ab, C), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree IV?",
      "options": [
        "Dbmaj7",
        "Dbm7b5",
        "Db7",
        "Abmaj7"
      ],
      "explanation": "Degree IV of Ab major is Db; using only scale notes gives Dbmaj7 (Db, F, Ab, C), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 453,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Ebm7b5",
        "Gm7b5"
      ],
      "explanation": "Il V grado di Ab maggiore è Eb; con le sole note della scala si ottiene Eb7 (Eb, G, Bb, Db), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree V?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Ebm7b5",
        "Gm7b5"
      ],
      "explanation": "Degree V of Ab major is Eb; using only scale notes gives Eb7 (Eb, G, Bb, Db), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 454,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Fm7",
        "Fmaj7",
        "F7",
        "Dbmaj7"
      ],
      "explanation": "Il VI grado di Ab maggiore è F; con le sole note della scala si ottiene Fm7 (F, Ab, C, Eb), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree VI?",
      "options": [
        "Fm7",
        "Fmaj7",
        "F7",
        "Dbmaj7"
      ],
      "explanation": "Degree VI of Ab major is F; using only scale notes gives Fm7 (F, Ab, C, Eb), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 455,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Ab maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "G7",
        "Gmaj7",
        "Gm7b5",
        "Dbmaj7"
      ],
      "explanation": "Il VII grado di Ab maggiore è G; con le sole note della scala si ottiene Gm7b5 (G, Bb, Db, F), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which seventh chord is built on degree VII?",
      "options": [
        "G7",
        "Gmaj7",
        "Gm7b5",
        "Dbmaj7"
      ],
      "explanation": "Degree VII of Ab major is G; using only scale notes gives Gm7b5 (G, Bb, Db, F), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 456,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Amaj7",
        "Am7b5",
        "A7",
        "C#m7"
      ],
      "explanation": "Il I grado di A maggiore è A; con le sole note della scala si ottiene Amaj7 (A, C#, E, G#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree I?",
      "options": [
        "Amaj7",
        "Am7b5",
        "A7",
        "C#m7"
      ],
      "explanation": "Degree I of A major is A; using only scale notes gives Amaj7 (A, C#, E, G#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 457,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Bm7b5",
        "Bmaj7",
        "Bm7",
        "Amaj7"
      ],
      "explanation": "Il II grado di A maggiore è B; con le sole note della scala si ottiene Bm7 (B, D, F#, A), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree II?",
      "options": [
        "Bm7b5",
        "Bmaj7",
        "Bm7",
        "Amaj7"
      ],
      "explanation": "Degree II of A major is B; using only scale notes gives Bm7 (B, D, F#, A), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 458,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "C#7",
        "C#m7",
        "C#m7b5",
        "Dmaj7"
      ],
      "explanation": "Il III grado di A maggiore è C#; con le sole note della scala si ottiene C#m7 (C#, E, G#, B), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree III?",
      "options": [
        "C#7",
        "C#m7",
        "C#m7b5",
        "Dmaj7"
      ],
      "explanation": "Degree III of A major is C#; using only scale notes gives C#m7 (C#, E, G#, B), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 459,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Dm7b5",
        "Dmaj7",
        "D7",
        "C#m7"
      ],
      "explanation": "Il IV grado di A maggiore è D; con le sole note della scala si ottiene Dmaj7 (D, F#, A, C#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree IV?",
      "options": [
        "Dm7b5",
        "Dmaj7",
        "D7",
        "C#m7"
      ],
      "explanation": "Degree IV of A major is D; using only scale notes gives Dmaj7 (D, F#, A, C#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 460,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "E7",
        "Emaj7",
        "Em7",
        "Amaj7"
      ],
      "explanation": "Il V grado di A maggiore è E; con le sole note della scala si ottiene E7 (E, G#, B, D), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree V?",
      "options": [
        "E7",
        "Emaj7",
        "Em7",
        "Amaj7"
      ],
      "explanation": "Degree V of A major is E; using only scale notes gives E7 (E, G#, B, D), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 461,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "F#m7",
        "F#7",
        "F#m7b5",
        "Dmaj7"
      ],
      "explanation": "Il VI grado di A maggiore è F#; con le sole note della scala si ottiene F#m7 (F#, A, C#, E), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree VI?",
      "options": [
        "F#m7",
        "F#7",
        "F#m7b5",
        "Dmaj7"
      ],
      "explanation": "Degree VI of A major is F#; using only scale notes gives F#m7 (F#, A, C#, E), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 462,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "G#m7",
        "G#m7b5",
        "G#maj7",
        "Amaj7"
      ],
      "explanation": "Il VII grado di A maggiore è G#; con le sole note della scala si ottiene G#m7b5 (G#, B, D, F#), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which seventh chord is built on degree VII?",
      "options": [
        "G#m7",
        "G#m7b5",
        "G#maj7",
        "Amaj7"
      ],
      "explanation": "Degree VII of A major is G#; using only scale notes gives G#m7b5 (G#, B, D, F#), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 463,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbmaj7",
        "F7"
      ],
      "explanation": "Il I grado di Bb maggiore è Bb; con le sole note della scala si ottiene Bbmaj7 (Bb, D, F, A), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree I?",
      "options": [
        "Bb7",
        "Bbm7",
        "Bbmaj7",
        "F7"
      ],
      "explanation": "Degree I of Bb major is Bb; using only scale notes gives Bbmaj7 (Bb, D, F, A), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 464,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "Cmaj7",
        "Cm7b5",
        "Cm7",
        "Bbmaj7"
      ],
      "explanation": "Il II grado di Bb maggiore è C; con le sole note della scala si ottiene Cm7 (C, Eb, G, Bb), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree II?",
      "options": [
        "Cmaj7",
        "Cm7b5",
        "Cm7",
        "Bbmaj7"
      ],
      "explanation": "Degree II of Bb major is C; using only scale notes gives Cm7 (C, Eb, G, Bb), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 465,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "D7",
        "Dm7b5",
        "Dm7",
        "Bbmaj7"
      ],
      "explanation": "Il III grado di Bb maggiore è D; con le sole note della scala si ottiene Dm7 (D, F, A, C), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree III?",
      "options": [
        "D7",
        "Dm7b5",
        "Dm7",
        "Bbmaj7"
      ],
      "explanation": "Degree III of Bb major is D; using only scale notes gives Dm7 (D, F, A, C), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 466,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Ebm7",
        "Gm7"
      ],
      "explanation": "Il IV grado di Bb maggiore è Eb; con le sole note della scala si ottiene Ebmaj7 (Eb, G, Bb, D), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree IV?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Ebm7",
        "Gm7"
      ],
      "explanation": "Degree IV of Bb major is Eb; using only scale notes gives Ebmaj7 (Eb, G, Bb, D), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 467,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "Fmaj7",
        "F7",
        "Fm7",
        "Am7b5"
      ],
      "explanation": "Il V grado di Bb maggiore è F; con le sole note della scala si ottiene F7 (F, A, C, Eb), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree V?",
      "options": [
        "Fmaj7",
        "F7",
        "Fm7",
        "Am7b5"
      ],
      "explanation": "Degree V of Bb major is F; using only scale notes gives F7 (F, A, C, Eb), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 468,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Gm7",
        "G7",
        "Gmaj7",
        "Bbmaj7"
      ],
      "explanation": "Il VI grado di Bb maggiore è G; con le sole note della scala si ottiene Gm7 (G, Bb, D, F), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree VI?",
      "options": [
        "Gm7",
        "G7",
        "Gmaj7",
        "Bbmaj7"
      ],
      "explanation": "Degree VI of Bb major is G; using only scale notes gives Gm7 (G, Bb, D, F), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 469,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "A7",
        "Am7",
        "Am7b5",
        "F7"
      ],
      "explanation": "Il VII grado di Bb maggiore è A; con le sole note della scala si ottiene Am7b5 (A, C, Eb, G), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which seventh chord is built on degree VII?",
      "options": [
        "A7",
        "Am7",
        "Am7b5",
        "F7"
      ],
      "explanation": "Degree VII of Bb major is A; using only scale notes gives Am7b5 (A, C, Eb, G), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 470,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul I grado?",
      "options": [
        "B7",
        "Bmaj7",
        "Bm7",
        "C#m7"
      ],
      "explanation": "Il I grado di B maggiore è B; con le sole note della scala si ottiene Bmaj7 (B, D#, F#, A#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree I?",
      "options": [
        "B7",
        "Bmaj7",
        "Bm7",
        "C#m7"
      ],
      "explanation": "Degree I of B major is B; using only scale notes gives Bmaj7 (B, D#, F#, A#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 471,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul II grado?",
      "options": [
        "C#7",
        "C#m7b5",
        "G#m7",
        "C#m7"
      ],
      "explanation": "Il II grado di B maggiore è C#; con le sole note della scala si ottiene C#m7 (C#, E, G#, B), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree II?",
      "options": [
        "C#7",
        "C#m7b5",
        "G#m7",
        "C#m7"
      ],
      "explanation": "Degree II of B major is C#; using only scale notes gives C#m7 (C#, E, G#, B), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 472,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul III grado?",
      "options": [
        "D#7",
        "D#m7b5",
        "F#7",
        "D#m7"
      ],
      "explanation": "Il III grado di B maggiore è D#; con le sole note della scala si ottiene D#m7 (D#, F#, A#, C#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree III?",
      "options": [
        "D#7",
        "D#m7b5",
        "F#7",
        "D#m7"
      ],
      "explanation": "Degree III of B major is D#; using only scale notes gives D#m7 (D#, F#, A#, C#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 473,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Em7",
        "Emaj7",
        "Em7b5",
        "A#m7b5"
      ],
      "explanation": "Il IV grado di B maggiore è E; con le sole note della scala si ottiene Emaj7 (E, G#, B, D#), funzione di sottodominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree IV?",
      "options": [
        "Em7",
        "Emaj7",
        "Em7b5",
        "A#m7b5"
      ],
      "explanation": "Degree IV of B major is E; using only scale notes gives Emaj7 (E, G#, B, D#), which has a subdominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 474,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul V grado?",
      "options": [
        "F#7",
        "F#m7b5",
        "F#m7",
        "Bmaj7"
      ],
      "explanation": "Il V grado di B maggiore è F#; con le sole note della scala si ottiene F#7 (F#, A#, C#, E), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree V?",
      "options": [
        "F#7",
        "F#m7b5",
        "F#m7",
        "Bmaj7"
      ],
      "explanation": "Degree V of B major is F#; using only scale notes gives F#7 (F#, A#, C#, E), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 475,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul VI grado?",
      "options": [
        "G#7",
        "G#m7",
        "G#m7b5",
        "Bmaj7"
      ],
      "explanation": "Il VI grado di B maggiore è G#; con le sole note della scala si ottiene G#m7 (G#, B, D#, F#), funzione di tonica.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree VI?",
      "options": [
        "G#7",
        "G#m7",
        "G#m7b5",
        "Bmaj7"
      ],
      "explanation": "Degree VI of B major is G#; using only scale notes gives G#m7 (G#, B, D#, F#), which has a tonic function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 476,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In B maggiore, quale accordo di settima si forma sul VII grado?",
      "options": [
        "A#7",
        "A#maj7",
        "A#m7b5",
        "Bmaj7"
      ],
      "explanation": "Il VII grado di B maggiore è A#; con le sole note della scala si ottiene A#m7b5 (A#, C#, E, G#), funzione di dominante.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which seventh chord is built on degree VII?",
      "options": [
        "A#7",
        "A#maj7",
        "A#m7b5",
        "Bmaj7"
      ],
      "explanation": "Degree VII of B major is A#; using only scale notes gives A#m7b5 (A#, C#, E, G#), which has a dominant function.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 477,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di C maggiore?",
      "options": [
        "1 diesis",
        "1 bemolle",
        "Nessuna alterazione",
        "2 diesis"
      ],
      "explanation": "C maggiore non ha alterazioni in chiave.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of C major?",
      "options": [
        "1 sharp",
        "1 flat",
        "No accidentals",
        "2 sharps"
      ],
      "explanation": "C major has no sharps or flats.",
      "sub": "Keys"
    }
  },
  {
    "id": 478,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di G maggiore?",
      "options": [
        "2 diesis",
        "Nessuna alterazione",
        "1 bemolle",
        "1 diesis"
      ],
      "explanation": "G maggiore ha 1 diesis in chiave: F#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of G major?",
      "options": [
        "2 sharps",
        "No accidentals",
        "1 flat",
        "1 sharp"
      ],
      "explanation": "G major has 1 sharp in its key signature: F#.",
      "sub": "Keys"
    }
  },
  {
    "id": 479,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di D maggiore?",
      "options": [
        "3 diesis",
        "1 diesis",
        "2 bemolli",
        "2 diesis"
      ],
      "explanation": "D maggiore ha 2 diesis in chiave: F#, C#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of D major?",
      "options": [
        "3 sharps",
        "1 sharp",
        "2 flats",
        "2 sharps"
      ],
      "explanation": "D major has 2 sharps in its key signature: F#, C#.",
      "sub": "Keys"
    }
  },
  {
    "id": 480,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di A maggiore?",
      "options": [
        "3 diesis",
        "4 diesis",
        "2 diesis",
        "3 bemolli"
      ],
      "explanation": "A maggiore ha 3 diesis in chiave: F#, C#, G#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of A major?",
      "options": [
        "3 sharps",
        "4 sharps",
        "2 sharps",
        "3 flats"
      ],
      "explanation": "A major has 3 sharps in its key signature: F#, C#, G#.",
      "sub": "Keys"
    }
  },
  {
    "id": 481,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di E maggiore?",
      "options": [
        "5 diesis",
        "3 diesis",
        "4 bemolli",
        "4 diesis"
      ],
      "explanation": "E maggiore ha 4 diesis in chiave: F#, C#, G#, D#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of E major?",
      "options": [
        "5 sharps",
        "3 sharps",
        "4 flats",
        "4 sharps"
      ],
      "explanation": "E major has 4 sharps in its key signature: F#, C#, G#, D#.",
      "sub": "Keys"
    }
  },
  {
    "id": 482,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di B maggiore?",
      "options": [
        "6 diesis",
        "4 diesis",
        "5 diesis",
        "5 bemolli"
      ],
      "explanation": "B maggiore ha 5 diesis in chiave: F#, C#, G#, D#, A#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of B major?",
      "options": [
        "6 sharps",
        "4 sharps",
        "5 sharps",
        "5 flats"
      ],
      "explanation": "B major has 5 sharps in its key signature: F#, C#, G#, D#, A#.",
      "sub": "Keys"
    }
  },
  {
    "id": 483,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di F# maggiore?",
      "options": [
        "7 diesis",
        "5 diesis",
        "6 bemolli",
        "6 diesis"
      ],
      "explanation": "F# maggiore ha 6 diesis in chiave: F#, C#, G#, D#, A#, E#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of F# major?",
      "options": [
        "7 sharps",
        "5 sharps",
        "6 flats",
        "6 sharps"
      ],
      "explanation": "F# major has 6 sharps in its key signature: F#, C#, G#, D#, A#, E#.",
      "sub": "Keys"
    }
  },
  {
    "id": 484,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di C# maggiore?",
      "options": [
        "6 diesis",
        "7 bemolli",
        "5 diesis",
        "7 diesis"
      ],
      "explanation": "C# maggiore ha 7 diesis in chiave: F#, C#, G#, D#, A#, E#, B#.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of C# major?",
      "options": [
        "6 sharps",
        "7 flats",
        "5 sharps",
        "7 sharps"
      ],
      "explanation": "C# major has 7 sharps in its key signature: F#, C#, G#, D#, A#, E#, B#.",
      "sub": "Keys"
    }
  },
  {
    "id": 485,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di F maggiore?",
      "options": [
        "Nessuna alterazione",
        "1 bemolle",
        "2 bemolli",
        "1 diesis"
      ],
      "explanation": "F maggiore ha 1 bemolle in chiave: Bb.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of F major?",
      "options": [
        "No accidentals",
        "1 flat",
        "2 flats",
        "1 sharp"
      ],
      "explanation": "F major has 1 flat in its key signature: Bb.",
      "sub": "Keys"
    }
  },
  {
    "id": 486,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Bb maggiore?",
      "options": [
        "1 bemolle",
        "2 bemolli",
        "3 bemolli",
        "2 diesis"
      ],
      "explanation": "Bb maggiore ha 2 bemolli in chiave: Bb, Eb.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Bb major?",
      "options": [
        "1 flat",
        "2 flats",
        "3 flats",
        "2 sharps"
      ],
      "explanation": "Bb major has 2 flats in its key signature: Bb, Eb.",
      "sub": "Keys"
    }
  },
  {
    "id": 487,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Eb maggiore?",
      "options": [
        "2 bemolli",
        "3 bemolli",
        "4 bemolli",
        "3 diesis"
      ],
      "explanation": "Eb maggiore ha 3 bemolli in chiave: Bb, Eb, Ab.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Eb major?",
      "options": [
        "2 flats",
        "3 flats",
        "4 flats",
        "3 sharps"
      ],
      "explanation": "Eb major has 3 flats in its key signature: Bb, Eb, Ab.",
      "sub": "Keys"
    }
  },
  {
    "id": 488,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Ab maggiore?",
      "options": [
        "3 bemolli",
        "5 bemolli",
        "4 diesis",
        "4 bemolli"
      ],
      "explanation": "Ab maggiore ha 4 bemolli in chiave: Bb, Eb, Ab, Db.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Ab major?",
      "options": [
        "3 flats",
        "5 flats",
        "4 sharps",
        "4 flats"
      ],
      "explanation": "Ab major has 4 flats in its key signature: Bb, Eb, Ab, Db.",
      "sub": "Keys"
    }
  },
  {
    "id": 489,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Db maggiore?",
      "options": [
        "4 bemolli",
        "6 bemolli",
        "5 bemolli",
        "5 diesis"
      ],
      "explanation": "Db maggiore ha 5 bemolli in chiave: Bb, Eb, Ab, Db, Gb.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Db major?",
      "options": [
        "4 flats",
        "6 flats",
        "5 flats",
        "5 sharps"
      ],
      "explanation": "Db major has 5 flats in its key signature: Bb, Eb, Ab, Db, Gb.",
      "sub": "Keys"
    }
  },
  {
    "id": 490,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Gb maggiore?",
      "options": [
        "5 bemolli",
        "7 bemolli",
        "6 diesis",
        "6 bemolli"
      ],
      "explanation": "Gb maggiore ha 6 bemolli in chiave: Bb, Eb, Ab, Db, Gb, Cb.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Gb major?",
      "options": [
        "5 flats",
        "7 flats",
        "6 sharps",
        "6 flats"
      ],
      "explanation": "Gb major has 6 flats in its key signature: Bb, Eb, Ab, Db, Gb, Cb.",
      "sub": "Keys"
    }
  },
  {
    "id": 491,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante alterazioni ha in chiave la tonalità di Cb maggiore?",
      "options": [
        "6 bemolli",
        "7 bemolli",
        "7 diesis",
        "5 bemolli"
      ],
      "explanation": "Cb maggiore ha 7 bemolli in chiave: Bb, Eb, Ab, Db, Gb, Cb, Fb.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "How many accidentals are in the key signature of Cb major?",
      "options": [
        "6 flats",
        "7 flats",
        "7 sharps",
        "5 flats"
      ],
      "explanation": "Cb major has 7 flats in its key signature: Bb, Eb, Ab, Db, Gb, Cb, Fb.",
      "sub": "Keys"
    }
  },
  {
    "id": 492,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la relativa minore di C maggiore?",
      "options": [
        "C minore",
        "A minore",
        "E minore",
        "D minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): C maggiore e A minore hanno la stessa armatura (nessuna alterazione).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of C major?",
      "options": [
        "C minor",
        "A minor",
        "E minor",
        "D minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): C major and A minor share the same key signature (no accidentals).",
      "sub": "Keys"
    }
  },
  {
    "id": 493,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di C# maggiore?",
      "options": [
        "A# minore",
        "C# minore",
        "F minore",
        "B minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): C# maggiore e A# minore hanno la stessa armatura (7 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of C# major?",
      "options": [
        "A# minor",
        "C# minor",
        "F minor",
        "B minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): C# major and A# minor share the same key signature (7 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 494,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la relativa minore di Db maggiore?",
      "options": [
        "Db minore",
        "F minore",
        "Bb minore",
        "Cb minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): Db maggiore e Bb minore hanno la stessa armatura (5 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of Db major?",
      "options": [
        "Db minor",
        "F minor",
        "Bb minor",
        "Cb minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): Db major and Bb minor share the same key signature (5 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 495,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di D maggiore?",
      "options": [
        "B minore",
        "D minore",
        "F# minore",
        "A minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): D maggiore e B minore hanno la stessa armatura (2 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of D major?",
      "options": [
        "B minor",
        "D minor",
        "F# minor",
        "A minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): D major and B minor share the same key signature (2 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 496,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di Eb maggiore?",
      "options": [
        "C minore",
        "Eb minore",
        "G minore",
        "Db minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): Eb maggiore e C minore hanno la stessa armatura (3 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of Eb major?",
      "options": [
        "C minor",
        "Eb minor",
        "G minor",
        "Db minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): Eb major and C minor share the same key signature (3 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 497,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la relativa minore di E maggiore?",
      "options": [
        "E minore",
        "Ab minore",
        "D minore",
        "C# minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): E maggiore e C# minore hanno la stessa armatura (4 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of E major?",
      "options": [
        "E minor",
        "Ab minor",
        "D minor",
        "C# minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): E major and C# minor share the same key signature (4 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 498,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la relativa minore di F maggiore?",
      "options": [
        "F minore",
        "A minore",
        "D minore",
        "Eb minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): F maggiore e D minore hanno la stessa armatura (1 bemolle).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of F major?",
      "options": [
        "F minor",
        "A minor",
        "D minor",
        "Eb minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): F major and D minor share the same key signature (1 flat).",
      "sub": "Keys"
    }
  },
  {
    "id": 499,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di F# maggiore?",
      "options": [
        "D# minore",
        "F# minore",
        "Bb minore",
        "D minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): F# maggiore e D# minore hanno la stessa armatura (6 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of F# major?",
      "options": [
        "D# minor",
        "F# minor",
        "Bb minor",
        "D minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): F# major and D# minor share the same key signature (6 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 500,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di Gb maggiore?",
      "options": [
        "Eb minore",
        "Gb minore",
        "Bb minore",
        "D minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): Gb maggiore ed Eb minore hanno la stessa armatura (6 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of Gb major?",
      "options": [
        "Eb minor",
        "Gb minor",
        "Bb minor",
        "D minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): Gb major and Eb minor share the same key signature (6 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 501,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di G maggiore?",
      "options": [
        "E minore",
        "G minore",
        "B minore",
        "F minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): G maggiore ed E minore hanno la stessa armatura (1 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of G major?",
      "options": [
        "E minor",
        "G minor",
        "B minor",
        "F minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): G major and E minor share the same key signature (1 sharp).",
      "sub": "Keys"
    }
  },
  {
    "id": 502,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la relativa minore di Ab maggiore?",
      "options": [
        "Ab minore",
        "C minore",
        "Bb minore",
        "F minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): Ab maggiore e F minore hanno la stessa armatura (4 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of Ab major?",
      "options": [
        "Ab minor",
        "C minor",
        "Bb minor",
        "F minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): Ab major and F minor share the same key signature (4 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 503,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa minore di A maggiore?",
      "options": [
        "F# minore",
        "A minore",
        "C# minore",
        "E minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): A maggiore e F# minore hanno la stessa armatura (3 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of A major?",
      "options": [
        "F# minor",
        "A minor",
        "C# minor",
        "E minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): A major and F# minor share the same key signature (3 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 504,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la relativa minore di Bb maggiore?",
      "options": [
        "Bb minore",
        "D minore",
        "G minore",
        "F minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): Bb maggiore e G minore hanno la stessa armatura (2 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of Bb major?",
      "options": [
        "Bb minor",
        "D minor",
        "G minor",
        "F minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): Bb major and G minor share the same key signature (2 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 505,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la relativa minore di B maggiore?",
      "options": [
        "B minore",
        "G# minore",
        "Eb minore",
        "F# minore"
      ],
      "explanation": "La relativa minore si trova sul VI grado (una terza minore sotto la tonica): B maggiore e G# minore hanno la stessa armatura (5 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative minor of B major?",
      "options": [
        "B minor",
        "G# minor",
        "Eb minor",
        "F# minor"
      ],
      "explanation": "The relative minor sits on degree VI (a minor third below the tonic): B major and G# minor share the same key signature (5 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 506,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Chi ha composto \"Take the A Train\"?",
      "options": [
        "Billy Strayhorn",
        "Duke Ellington",
        "Count Basie",
        "Thelonious Monk"
      ],
      "explanation": "Lo scrisse Billy Strayhorn nel 1939; divenne la sigla dell'orchestra di Duke Ellington, a cui spesso viene attribuito per errore.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who composed \"Take the A Train\"?",
      "options": [
        "Billy Strayhorn",
        "Duke Ellington",
        "Count Basie",
        "Thelonious Monk"
      ],
      "explanation": "Billy Strayhorn wrote it in 1939; it became the theme of the Duke Ellington Orchestra and is often wrongly credited to Ellington.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 507,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cos'è un turnaround?",
      "options": [
        "Un'accordatura alternativa",
        "Una breve sequenza che riporta all'inizio della forma",
        "Un tipo di accordo",
        "Un assolo veloce"
      ],
      "explanation": "Il turnaround (spesso I–vi–ii–V) chiude un giro e prepara il ritorno alla tonica all'inizio della forma.",
      "sub": "Terminologia"
    },
    "en": {
      "question": "What is a turnaround?",
      "options": [
        "An alternate tuning",
        "A short sequence leading back to the top of the form",
        "A type of chord",
        "A fast solo"
      ],
      "explanation": "A turnaround (often I–vi–ii–V) closes a chorus and sets up the return to the tonic at the top of the form.",
      "sub": "Terminology"
    }
  },
  {
    "id": 508,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante battute ha un blues standard?",
      "options": [
        "16",
        "8",
        "12",
        "32"
      ],
      "explanation": "La forma classica del blues è di 12 battute, in tre frasi da quattro.",
      "sub": "Blues"
    },
    "en": {
      "question": "How many bars are in a standard blues?",
      "options": [
        "16",
        "8",
        "12",
        "32"
      ],
      "explanation": "The classic blues form is 12 bars long, in three four-bar phrases.",
      "sub": "Blues"
    }
  },
  {
    "id": 509,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Perché la sostituzione di tritono funziona?",
      "options": [
        "I due accordi condividono la 3ª e la 7ª (lo stesso tritono)",
        "Hanno la stessa fondamentale",
        "Sono entrambi accordi minori",
        "Sono a distanza di quinta giusta"
      ],
      "explanation": "G7 (B–F) e Db7 (F–Cb) contengono lo stesso tritono con i ruoli scambiati: per questo Db7 può sostituire G7 e risolvere su C.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "Why does the tritone substitution work?",
      "options": [
        "Both chords share the 3rd and 7th (the same tritone)",
        "They have the same root",
        "They are both minor chords",
        "They are a perfect fifth apart"
      ],
      "explanation": "G7 (B–F) and Db7 (F–Cb) contain the same tritone with the roles swapped, so Db7 can replace G7 and resolve to C.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 510,
    "level": "hard",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale scala si usa sull'accordo V7alt?",
      "options": [
        "Esatonale",
        "Superlocria (alterata)",
        "Lidia b7",
        "Diminuita semitono–tono"
      ],
      "explanation": "La superlocria è il 7° modo della minore melodica e contiene b9, #9, #11 e b13: tutte le tensioni alterate del 7alt.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which scale is used on a V7alt chord?",
      "options": [
        "Whole tone",
        "Super Locrian (altered)",
        "Lydian b7",
        "Half–whole diminished"
      ],
      "explanation": "Super Locrian is the 7th mode of melodic minor and contains b9, #9, #11 and b13: every altered tension of a 7alt chord.",
      "sub": "Scales"
    }
  },
  {
    "id": 511,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Cmaj7",
        "Fmaj7",
        "Amaj7",
        "Bmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di C maggiore (C, D, E, F, G, A, B), cioè su C: Cmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is Imaj7?",
      "options": [
        "Cmaj7",
        "Fmaj7",
        "Amaj7",
        "Bmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of C major (C, D, E, F, G, A, B), i.e. on C: Cmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 512,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Fm7",
        "Bm7",
        "Cm7",
        "Dm7"
      ],
      "explanation": "iim7 è costruito sul II grado di C maggiore (C, D, E, F, G, A, B), cioè su D: Dm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is iim7?",
      "options": [
        "Fm7",
        "Bm7",
        "Cm7",
        "Dm7"
      ],
      "explanation": "iim7 is built on degree II of C major (C, D, E, F, G, A, B), i.e. on D: Dm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 513,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Bm7",
        "Dm7",
        "Gm7",
        "Em7"
      ],
      "explanation": "iiim7 è costruito sul III grado di C maggiore (C, D, E, F, G, A, B), cioè su E: Em7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is iiim7?",
      "options": [
        "Bm7",
        "Dm7",
        "Gm7",
        "Em7"
      ],
      "explanation": "iiim7 is built on degree III of C major (C, D, E, F, G, A, B), i.e. on E: Em7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 514,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Bmaj7",
        "Fmaj7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di C maggiore (C, D, E, F, G, A, B), cioè su F: Fmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is IVmaj7?",
      "options": [
        "Bmaj7",
        "Fmaj7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of C major (C, D, E, F, G, A, B), i.e. on F: Fmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 515,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a V7?",
      "options": [
        "F7",
        "G7",
        "D7",
        "A7"
      ],
      "explanation": "V7 è costruito sul V grado di C maggiore (C, D, E, F, G, A, B), cioè su G: G7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is V7?",
      "options": [
        "F7",
        "G7",
        "D7",
        "A7"
      ],
      "explanation": "V7 is built on degree V of C major (C, D, E, F, G, A, B), i.e. on G: G7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 516,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Gm7",
        "Am7",
        "Em7",
        "Fm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di C maggiore (C, D, E, F, G, A, B), cioè su A: Am7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is vim7?",
      "options": [
        "Gm7",
        "Am7",
        "Em7",
        "Fm7"
      ],
      "explanation": "vim7 is built on degree VI of C major (C, D, E, F, G, A, B), i.e. on A: Am7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 517,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Em7b5",
        "Gm7b5",
        "Bm7b5",
        "Dm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di C maggiore (C, D, E, F, G, A, B), cioè su B: Bm7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In C major, which chord is viiø7?",
      "options": [
        "Em7b5",
        "Gm7b5",
        "Bm7b5",
        "Dm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of C major (C, D, E, F, G, A, B), i.e. on B: Bm7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 518,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Cmaj7",
        "Bbmaj7",
        "Ebmaj7",
        "Dbmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su Db: Dbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is Imaj7?",
      "options": [
        "Cmaj7",
        "Bbmaj7",
        "Ebmaj7",
        "Dbmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on Db: Dbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 519,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Bbm7",
        "Ebm7",
        "Dbm7",
        "Cm7"
      ],
      "explanation": "iim7 è costruito sul II grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su Eb: Ebm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is iim7?",
      "options": [
        "Bbm7",
        "Ebm7",
        "Dbm7",
        "Cm7"
      ],
      "explanation": "iim7 is built on degree II of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on Eb: Ebm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 520,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Gbm7",
        "Cm7",
        "Fm7",
        "Dbm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su F: Fm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is iiim7?",
      "options": [
        "Gbm7",
        "Cm7",
        "Fm7",
        "Dbm7"
      ],
      "explanation": "iiim7 is built on degree III of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on F: Fm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 521,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Gbmaj7",
        "Ebmaj7",
        "Cmaj7",
        "Abmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su Gb: Gbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is IVmaj7?",
      "options": [
        "Gbmaj7",
        "Ebmaj7",
        "Cmaj7",
        "Abmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on Gb: Gbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 522,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a V7?",
      "options": [
        "Ab7",
        "Db7",
        "F7",
        "Gb7"
      ],
      "explanation": "V7 è costruito sul V grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su Ab: Ab7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is V7?",
      "options": [
        "Ab7",
        "Db7",
        "F7",
        "Gb7"
      ],
      "explanation": "V7 is built on degree V of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on Ab: Ab7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 523,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Abm7",
        "Dbm7",
        "Fm7",
        "Bbm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su Bb: Bbm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is vim7?",
      "options": [
        "Abm7",
        "Dbm7",
        "Fm7",
        "Bbm7"
      ],
      "explanation": "vim7 is built on degree VI of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on Bb: Bbm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 524,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Db maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Gbm7b5",
        "Cm7b5",
        "Bbm7b5",
        "Abm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di Db maggiore (Db, Eb, F, Gb, Ab, Bb, C), cioè su C: Cm7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Db major, which chord is viiø7?",
      "options": [
        "Gbm7b5",
        "Cm7b5",
        "Bbm7b5",
        "Abm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of Db major (Db, Eb, F, Gb, Ab, Bb, C), i.e. on C: Cm7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 525,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "F#maj7",
        "Amaj7",
        "Dmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di D maggiore (D, E, F#, G, A, B, C#), cioè su D: Dmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is Imaj7?",
      "options": [
        "F#maj7",
        "Amaj7",
        "Dmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 is built on degree I of D major (D, E, F#, G, A, B, C#), i.e. on D: Dmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 526,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Em7",
        "Am7",
        "Dm7",
        "Gm7"
      ],
      "explanation": "iim7 è costruito sul II grado di D maggiore (D, E, F#, G, A, B, C#), cioè su E: Em7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is iim7?",
      "options": [
        "Em7",
        "Am7",
        "Dm7",
        "Gm7"
      ],
      "explanation": "iim7 is built on degree II of D major (D, E, F#, G, A, B, C#), i.e. on E: Em7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 527,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "F#m7",
        "Dm7",
        "Am7",
        "Em7"
      ],
      "explanation": "iiim7 è costruito sul III grado di D maggiore (D, E, F#, G, A, B, C#), cioè su F#: F#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is iiim7?",
      "options": [
        "F#m7",
        "Dm7",
        "Am7",
        "Em7"
      ],
      "explanation": "iiim7 is built on degree III of D major (D, E, F#, G, A, B, C#), i.e. on F#: F#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 528,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Dmaj7",
        "Gmaj7",
        "C#maj7",
        "Bmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di D maggiore (D, E, F#, G, A, B, C#), cioè su G: Gmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is IVmaj7?",
      "options": [
        "Dmaj7",
        "Gmaj7",
        "C#maj7",
        "Bmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of D major (D, E, F#, G, A, B, C#), i.e. on G: Gmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 529,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a V7?",
      "options": [
        "B7",
        "C#7",
        "G7",
        "A7"
      ],
      "explanation": "V7 è costruito sul V grado di D maggiore (D, E, F#, G, A, B, C#), cioè su A: A7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is V7?",
      "options": [
        "B7",
        "C#7",
        "G7",
        "A7"
      ],
      "explanation": "V7 is built on degree V of D major (D, E, F#, G, A, B, C#), i.e. on A: A7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 530,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Am7",
        "C#m7",
        "Em7",
        "Bm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di D maggiore (D, E, F#, G, A, B, C#), cioè su B: Bm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is vim7?",
      "options": [
        "Am7",
        "C#m7",
        "Em7",
        "Bm7"
      ],
      "explanation": "vim7 is built on degree VI of D major (D, E, F#, G, A, B, C#), i.e. on B: Bm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 531,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In D maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "F#m7b5",
        "Am7b5",
        "Gm7b5",
        "C#m7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di D maggiore (D, E, F#, G, A, B, C#), cioè su C#: C#m7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In D major, which chord is viiø7?",
      "options": [
        "F#m7b5",
        "Am7b5",
        "Gm7b5",
        "C#m7b5"
      ],
      "explanation": "viiø7 is built on degree VII of D major (D, E, F#, G, A, B, C#), i.e. on C#: C#m7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 532,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Ebmaj7",
        "Dmaj7",
        "Fmaj7",
        "Bbmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su Eb: Ebmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is Imaj7?",
      "options": [
        "Ebmaj7",
        "Dmaj7",
        "Fmaj7",
        "Bbmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on Eb: Ebmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 533,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Abm7",
        "Fm7",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "iim7 è costruito sul II grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su F: Fm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is iim7?",
      "options": [
        "Abm7",
        "Fm7",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "iim7 is built on degree II of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on F: Fm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 534,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Gm7",
        "Ebm7",
        "Dm7",
        "Bbm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su G: Gm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is iiim7?",
      "options": [
        "Gm7",
        "Ebm7",
        "Dm7",
        "Bbm7"
      ],
      "explanation": "iiim7 is built on degree III of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on G: Gm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 535,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Fmaj7",
        "Dmaj7",
        "Abmaj7",
        "Bbmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su Ab: Abmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is IVmaj7?",
      "options": [
        "Fmaj7",
        "Dmaj7",
        "Abmaj7",
        "Bbmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on Ab: Abmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 536,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a V7?",
      "options": [
        "D7",
        "F7",
        "Ab7",
        "Bb7"
      ],
      "explanation": "V7 è costruito sul V grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su Bb: Bb7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is V7?",
      "options": [
        "D7",
        "F7",
        "Ab7",
        "Bb7"
      ],
      "explanation": "V7 is built on degree V of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on Bb: Bb7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 537,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Dm7",
        "Ebm7",
        "Cm7",
        "Fm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su C: Cm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is vim7?",
      "options": [
        "Dm7",
        "Ebm7",
        "Cm7",
        "Fm7"
      ],
      "explanation": "vim7 is built on degree VI of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on C: Cm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 538,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Dm7b5",
        "Abm7b5",
        "Cm7b5",
        "Bbm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di Eb maggiore (Eb, F, G, Ab, Bb, C, D), cioè su D: Dm7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Eb major, which chord is viiø7?",
      "options": [
        "Dm7b5",
        "Abm7b5",
        "Cm7b5",
        "Bbm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of Eb major (Eb, F, G, Ab, Bb, C, D), i.e. on D: Dm7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 539,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "D#maj7",
        "Emaj7",
        "G#maj7",
        "C#maj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su E: Emaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is Imaj7?",
      "options": [
        "D#maj7",
        "Emaj7",
        "G#maj7",
        "C#maj7"
      ],
      "explanation": "Imaj7 is built on degree I of E major (E, F#, G#, A, B, C#, D#), i.e. on E: Emaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 540,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "G#m7",
        "C#m7",
        "F#m7",
        "Bm7"
      ],
      "explanation": "iim7 è costruito sul II grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su F#: F#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is iim7?",
      "options": [
        "G#m7",
        "C#m7",
        "F#m7",
        "Bm7"
      ],
      "explanation": "iim7 is built on degree II of E major (E, F#, G#, A, B, C#, D#), i.e. on F#: F#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 541,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Em7",
        "Bm7",
        "F#m7",
        "G#m7"
      ],
      "explanation": "iiim7 è costruito sul III grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su G#: G#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is iiim7?",
      "options": [
        "Em7",
        "Bm7",
        "F#m7",
        "G#m7"
      ],
      "explanation": "iiim7 is built on degree III of E major (E, F#, G#, A, B, C#, D#), i.e. on G#: G#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 542,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "C#maj7",
        "Emaj7",
        "Amaj7",
        "Bmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su A: Amaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is IVmaj7?",
      "options": [
        "C#maj7",
        "Emaj7",
        "Amaj7",
        "Bmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of E major (E, F#, G#, A, B, C#, D#), i.e. on A: Amaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 543,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a V7?",
      "options": [
        "C#7",
        "F#7",
        "B7",
        "G#7"
      ],
      "explanation": "V7 è costruito sul V grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su B: B7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is V7?",
      "options": [
        "C#7",
        "F#7",
        "B7",
        "G#7"
      ],
      "explanation": "V7 is built on degree V of E major (E, F#, G#, A, B, C#, D#), i.e. on B: B7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 544,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Am7",
        "G#m7",
        "C#m7",
        "Em7"
      ],
      "explanation": "vim7 è costruito sul VI grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su C#: C#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is vim7?",
      "options": [
        "Am7",
        "G#m7",
        "C#m7",
        "Em7"
      ],
      "explanation": "vim7 is built on degree VI of E major (E, F#, G#, A, B, C#, D#), i.e. on C#: C#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 545,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Am7b5",
        "Bm7b5",
        "D#m7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di E maggiore (E, F#, G#, A, B, C#, D#), cioè su D#: D#m7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In E major, which chord is viiø7?",
      "options": [
        "Am7b5",
        "Bm7b5",
        "D#m7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 is built on degree VII of E major (E, F#, G#, A, B, C#, D#), i.e. on D#: D#m7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 546,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Gmaj7",
        "Fmaj7",
        "Dmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di F maggiore (F, G, A, Bb, C, D, E), cioè su F: Fmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is Imaj7?",
      "options": [
        "Gmaj7",
        "Fmaj7",
        "Dmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 is built on degree I of F major (F, G, A, Bb, C, D, E), i.e. on F: Fmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 547,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Am7",
        "Dm7",
        "Gm7",
        "Em7"
      ],
      "explanation": "iim7 è costruito sul II grado di F maggiore (F, G, A, Bb, C, D, E), cioè su G: Gm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is iim7?",
      "options": [
        "Am7",
        "Dm7",
        "Gm7",
        "Em7"
      ],
      "explanation": "iim7 is built on degree II of F major (F, G, A, Bb, C, D, E), i.e. on G: Gm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 548,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Fm7",
        "Bbm7",
        "Cm7",
        "Am7"
      ],
      "explanation": "iiim7 è costruito sul III grado di F maggiore (F, G, A, Bb, C, D, E), cioè su A: Am7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is iiim7?",
      "options": [
        "Fm7",
        "Bbm7",
        "Cm7",
        "Am7"
      ],
      "explanation": "iiim7 is built on degree III of F major (F, G, A, Bb, C, D, E), i.e. on A: Am7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 549,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Cmaj7",
        "Amaj7",
        "Bbmaj7",
        "Fmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di F maggiore (F, G, A, Bb, C, D, E), cioè su Bb: Bbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is IVmaj7?",
      "options": [
        "Cmaj7",
        "Amaj7",
        "Bbmaj7",
        "Fmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of F major (F, G, A, Bb, C, D, E), i.e. on Bb: Bbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 550,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a V7?",
      "options": [
        "Bb7",
        "A7",
        "G7",
        "C7"
      ],
      "explanation": "V7 è costruito sul V grado di F maggiore (F, G, A, Bb, C, D, E), cioè su C: C7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is V7?",
      "options": [
        "Bb7",
        "A7",
        "G7",
        "C7"
      ],
      "explanation": "V7 is built on degree V of F major (F, G, A, Bb, C, D, E), i.e. on C: C7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 551,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Dm7",
        "Em7",
        "Am7",
        "Fm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di F maggiore (F, G, A, Bb, C, D, E), cioè su D: Dm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is vim7?",
      "options": [
        "Dm7",
        "Em7",
        "Am7",
        "Fm7"
      ],
      "explanation": "vim7 is built on degree VI of F major (F, G, A, Bb, C, D, E), i.e. on D: Dm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 552,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Am7b5",
        "Cm7b5",
        "Dm7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di F maggiore (F, G, A, Bb, C, D, E), cioè su E: Em7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In F major, which chord is viiø7?",
      "options": [
        "Am7b5",
        "Cm7b5",
        "Dm7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 is built on degree VII of F major (F, G, A, Bb, C, D, E), i.e. on E: Em7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 553,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Gbmaj7",
        "Fmaj7",
        "Bbmaj7",
        "Dbmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Gb: Gbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is Imaj7?",
      "options": [
        "Gbmaj7",
        "Fmaj7",
        "Bbmaj7",
        "Dbmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Gb: Gbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 554,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Abm7",
        "Bbm7",
        "Fm7",
        "Cbm7"
      ],
      "explanation": "iim7 è costruito sul II grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Ab: Abm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is iim7?",
      "options": [
        "Abm7",
        "Bbm7",
        "Fm7",
        "Cbm7"
      ],
      "explanation": "iim7 is built on degree II of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Ab: Abm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 555,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Bbm7",
        "Dbm7",
        "Fm7",
        "Ebm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Bb: Bbm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is iiim7?",
      "options": [
        "Bbm7",
        "Dbm7",
        "Fm7",
        "Ebm7"
      ],
      "explanation": "iiim7 is built on degree III of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Bb: Bbm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 556,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Gbmaj7",
        "Dbmaj7",
        "Cbmaj7",
        "Abmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Cb: Cbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is IVmaj7?",
      "options": [
        "Gbmaj7",
        "Dbmaj7",
        "Cbmaj7",
        "Abmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Cb: Cbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 557,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a V7?",
      "options": [
        "Db7",
        "Cb7",
        "Ab7",
        "F7"
      ],
      "explanation": "V7 è costruito sul V grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Db: Db7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is V7?",
      "options": [
        "Db7",
        "Cb7",
        "Ab7",
        "F7"
      ],
      "explanation": "V7 is built on degree V of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Db: Db7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 558,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Ebm7",
        "Fm7",
        "Dbm7",
        "Cbm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su Eb: Ebm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is vim7?",
      "options": [
        "Ebm7",
        "Fm7",
        "Dbm7",
        "Cbm7"
      ],
      "explanation": "vim7 is built on degree VI of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on Eb: Ebm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 559,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Gb maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Dbm7b5",
        "Gbm7b5",
        "Abm7b5",
        "Fm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di Gb maggiore (Gb, Ab, Bb, Cb, Db, Eb, F), cioè su F: Fm7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Gb major, which chord is viiø7?",
      "options": [
        "Dbm7b5",
        "Gbm7b5",
        "Abm7b5",
        "Fm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of Gb major (Gb, Ab, Bb, Cb, Db, Eb, F), i.e. on F: Fm7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 560,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Emaj7",
        "Gmaj7",
        "Amaj7",
        "Cmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di G maggiore (G, A, B, C, D, E, F#), cioè su G: Gmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is Imaj7?",
      "options": [
        "Emaj7",
        "Gmaj7",
        "Amaj7",
        "Cmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of G major (G, A, B, C, D, E, F#), i.e. on G: Gmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 561,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Em7",
        "Am7",
        "Cm7",
        "F#m7"
      ],
      "explanation": "iim7 è costruito sul II grado di G maggiore (G, A, B, C, D, E, F#), cioè su A: Am7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is iim7?",
      "options": [
        "Em7",
        "Am7",
        "Cm7",
        "F#m7"
      ],
      "explanation": "iim7 is built on degree II of G major (G, A, B, C, D, E, F#), i.e. on A: Am7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 562,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Am7",
        "Em7",
        "Bm7",
        "Gm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di G maggiore (G, A, B, C, D, E, F#), cioè su B: Bm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is iiim7?",
      "options": [
        "Am7",
        "Em7",
        "Bm7",
        "Gm7"
      ],
      "explanation": "iiim7 is built on degree III of G major (G, A, B, C, D, E, F#), i.e. on B: Bm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 563,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Gmaj7",
        "Dmaj7",
        "Amaj7",
        "Cmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di G maggiore (G, A, B, C, D, E, F#), cioè su C: Cmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is IVmaj7?",
      "options": [
        "Gmaj7",
        "Dmaj7",
        "Amaj7",
        "Cmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of G major (G, A, B, C, D, E, F#), i.e. on C: Cmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 564,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a V7?",
      "options": [
        "C7",
        "B7",
        "E7",
        "D7"
      ],
      "explanation": "V7 è costruito sul V grado di G maggiore (G, A, B, C, D, E, F#), cioè su D: D7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is V7?",
      "options": [
        "C7",
        "B7",
        "E7",
        "D7"
      ],
      "explanation": "V7 is built on degree V of G major (G, A, B, C, D, E, F#), i.e. on D: D7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 565,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Gm7",
        "F#m7",
        "Em7",
        "Am7"
      ],
      "explanation": "vim7 è costruito sul VI grado di G maggiore (G, A, B, C, D, E, F#), cioè su E: Em7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is vim7?",
      "options": [
        "Gm7",
        "F#m7",
        "Em7",
        "Am7"
      ],
      "explanation": "vim7 is built on degree VI of G major (G, A, B, C, D, E, F#), i.e. on E: Em7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 566,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Cm7b5",
        "F#m7b5",
        "Am7b5",
        "Bm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di G maggiore (G, A, B, C, D, E, F#), cioè su F#: F#m7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In G major, which chord is viiø7?",
      "options": [
        "Cm7b5",
        "F#m7b5",
        "Am7b5",
        "Bm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of G major (G, A, B, C, D, E, F#), i.e. on F#: F#m7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 567,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Abmaj7",
        "Ebmaj7",
        "Dbmaj7",
        "Gmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su Ab: Abmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is Imaj7?",
      "options": [
        "Abmaj7",
        "Ebmaj7",
        "Dbmaj7",
        "Gmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on Ab: Abmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 568,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Bbm7",
        "Dbm7",
        "Cm7",
        "Fm7"
      ],
      "explanation": "iim7 è costruito sul II grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su Bb: Bbm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is iim7?",
      "options": [
        "Bbm7",
        "Dbm7",
        "Cm7",
        "Fm7"
      ],
      "explanation": "iim7 is built on degree II of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on Bb: Bbm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 569,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Dbm7",
        "Bbm7",
        "Cm7",
        "Abm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su C: Cm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is iiim7?",
      "options": [
        "Dbm7",
        "Bbm7",
        "Cm7",
        "Abm7"
      ],
      "explanation": "iiim7 is built on degree III of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on C: Cm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 570,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Cmaj7",
        "Fmaj7",
        "Dbmaj7",
        "Ebmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su Db: Dbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is IVmaj7?",
      "options": [
        "Cmaj7",
        "Fmaj7",
        "Dbmaj7",
        "Ebmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on Db: Dbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 571,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a V7?",
      "options": [
        "Eb7",
        "Ab7",
        "C7",
        "F7"
      ],
      "explanation": "V7 è costruito sul V grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su Eb: Eb7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is V7?",
      "options": [
        "Eb7",
        "Ab7",
        "C7",
        "F7"
      ],
      "explanation": "V7 is built on degree V of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on Eb: Eb7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 572,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Dbm7",
        "Fm7",
        "Abm7",
        "Ebm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su F: Fm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is vim7?",
      "options": [
        "Dbm7",
        "Fm7",
        "Abm7",
        "Ebm7"
      ],
      "explanation": "vim7 is built on degree VI of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on F: Fm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 573,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Ab maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Bbm7b5",
        "Ebm7b5",
        "Cm7b5",
        "Gm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di Ab maggiore (Ab, Bb, C, Db, Eb, F, G), cioè su G: Gm7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Ab major, which chord is viiø7?",
      "options": [
        "Bbm7b5",
        "Ebm7b5",
        "Cm7b5",
        "Gm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of Ab major (Ab, Bb, C, Db, Eb, F, G), i.e. on G: Gm7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 574,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Dmaj7",
        "Amaj7",
        "G#maj7",
        "Bmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su A: Amaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is Imaj7?",
      "options": [
        "Dmaj7",
        "Amaj7",
        "G#maj7",
        "Bmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of A major (A, B, C#, D, E, F#, G#), i.e. on A: Amaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 575,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Bm7",
        "F#m7",
        "Em7",
        "Dm7"
      ],
      "explanation": "iim7 è costruito sul II grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su B: Bm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is iim7?",
      "options": [
        "Bm7",
        "F#m7",
        "Em7",
        "Dm7"
      ],
      "explanation": "iim7 is built on degree II of A major (A, B, C#, D, E, F#, G#), i.e. on B: Bm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 576,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Am7",
        "C#m7",
        "Bm7",
        "Em7"
      ],
      "explanation": "iiim7 è costruito sul III grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su C#: C#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is iiim7?",
      "options": [
        "Am7",
        "C#m7",
        "Bm7",
        "Em7"
      ],
      "explanation": "iiim7 is built on degree III of A major (A, B, C#, D, E, F#, G#), i.e. on C#: C#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 577,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Bmaj7",
        "Dmaj7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su D: Dmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is IVmaj7?",
      "options": [
        "Bmaj7",
        "Dmaj7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of A major (A, B, C#, D, E, F#, G#), i.e. on D: Dmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 578,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a V7?",
      "options": [
        "A7",
        "F#7",
        "B7",
        "E7"
      ],
      "explanation": "V7 è costruito sul V grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su E: E7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is V7?",
      "options": [
        "A7",
        "F#7",
        "B7",
        "E7"
      ],
      "explanation": "V7 is built on degree V of A major (A, B, C#, D, E, F#, G#), i.e. on E: E7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 579,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Bm7",
        "Em7",
        "F#m7",
        "G#m7"
      ],
      "explanation": "vim7 è costruito sul VI grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su F#: F#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is vim7?",
      "options": [
        "Bm7",
        "Em7",
        "F#m7",
        "G#m7"
      ],
      "explanation": "vim7 is built on degree VI of A major (A, B, C#, D, E, F#, G#), i.e. on F#: F#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 580,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In A maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Em7b5",
        "C#m7b5",
        "F#m7b5",
        "G#m7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di A maggiore (A, B, C#, D, E, F#, G#), cioè su G#: G#m7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In A major, which chord is viiø7?",
      "options": [
        "Em7b5",
        "C#m7b5",
        "F#m7b5",
        "G#m7b5"
      ],
      "explanation": "viiø7 is built on degree VII of A major (A, B, C#, D, E, F#, G#), i.e. on G#: G#m7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 581,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "Cmaj7",
        "Dmaj7",
        "Bbmaj7",
        "Gmaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su Bb: Bbmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is Imaj7?",
      "options": [
        "Cmaj7",
        "Dmaj7",
        "Bbmaj7",
        "Gmaj7"
      ],
      "explanation": "Imaj7 is built on degree I of Bb major (Bb, C, D, Eb, F, G, A), i.e. on Bb: Bbmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 582,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "Bbm7",
        "Ebm7",
        "Gm7",
        "Cm7"
      ],
      "explanation": "iim7 è costruito sul II grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su C: Cm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is iim7?",
      "options": [
        "Bbm7",
        "Ebm7",
        "Gm7",
        "Cm7"
      ],
      "explanation": "iim7 is built on degree II of Bb major (Bb, C, D, Eb, F, G, A), i.e. on C: Cm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 583,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "Dm7",
        "Ebm7",
        "Am7",
        "Gm7"
      ],
      "explanation": "iiim7 è costruito sul III grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su D: Dm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is iiim7?",
      "options": [
        "Dm7",
        "Ebm7",
        "Am7",
        "Gm7"
      ],
      "explanation": "iiim7 is built on degree III of Bb major (Bb, C, D, Eb, F, G, A), i.e. on D: Dm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 584,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Ebmaj7",
        "Cmaj7",
        "Fmaj7",
        "Gmaj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su Eb: Ebmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is IVmaj7?",
      "options": [
        "Ebmaj7",
        "Cmaj7",
        "Fmaj7",
        "Gmaj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of Bb major (Bb, C, D, Eb, F, G, A), i.e. on Eb: Ebmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 585,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a V7?",
      "options": [
        "Eb7",
        "A7",
        "F7",
        "C7"
      ],
      "explanation": "V7 è costruito sul V grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su F: F7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is V7?",
      "options": [
        "Eb7",
        "A7",
        "F7",
        "C7"
      ],
      "explanation": "V7 is built on degree V of Bb major (Bb, C, D, Eb, F, G, A), i.e. on F: F7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 586,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "Ebm7",
        "Am7",
        "Gm7",
        "Fm7"
      ],
      "explanation": "vim7 è costruito sul VI grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su G: Gm7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is vim7?",
      "options": [
        "Ebm7",
        "Am7",
        "Gm7",
        "Fm7"
      ],
      "explanation": "vim7 is built on degree VI of Bb major (Bb, C, D, Eb, F, G, A), i.e. on G: Gm7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 587,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "Am7b5",
        "Fm7b5",
        "Dm7b5",
        "Ebm7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di Bb maggiore (Bb, C, D, Eb, F, G, A), cioè su A: Am7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In Bb major, which chord is viiø7?",
      "options": [
        "Am7b5",
        "Fm7b5",
        "Dm7b5",
        "Ebm7b5"
      ],
      "explanation": "viiø7 is built on degree VII of Bb major (Bb, C, D, Eb, F, G, A), i.e. on A: Am7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 588,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a Imaj7?",
      "options": [
        "A#maj7",
        "F#maj7",
        "Bmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 è costruito sul I grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su B: Bmaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is Imaj7?",
      "options": [
        "A#maj7",
        "F#maj7",
        "Bmaj7",
        "Emaj7"
      ],
      "explanation": "Imaj7 is built on degree I of B major (B, C#, D#, E, F#, G#, A#), i.e. on B: Bmaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 589,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a iim7?",
      "options": [
        "A#m7",
        "Em7",
        "F#m7",
        "C#m7"
      ],
      "explanation": "iim7 è costruito sul II grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su C#: C#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is iim7?",
      "options": [
        "A#m7",
        "Em7",
        "F#m7",
        "C#m7"
      ],
      "explanation": "iim7 is built on degree II of B major (B, C#, D#, E, F#, G#, A#), i.e. on C#: C#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 590,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a iiim7?",
      "options": [
        "G#m7",
        "D#m7",
        "A#m7",
        "C#m7"
      ],
      "explanation": "iiim7 è costruito sul III grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su D#: D#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is iiim7?",
      "options": [
        "G#m7",
        "D#m7",
        "A#m7",
        "C#m7"
      ],
      "explanation": "iiim7 is built on degree III of B major (B, C#, D#, E, F#, G#, A#), i.e. on D#: D#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 591,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a IVmaj7?",
      "options": [
        "Emaj7",
        "D#maj7",
        "Bmaj7",
        "F#maj7"
      ],
      "explanation": "IVmaj7 è costruito sul IV grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su E: Emaj7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is IVmaj7?",
      "options": [
        "Emaj7",
        "D#maj7",
        "Bmaj7",
        "F#maj7"
      ],
      "explanation": "IVmaj7 is built on degree IV of B major (B, C#, D#, E, F#, G#, A#), i.e. on E: Emaj7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 592,
    "level": "easy",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a V7?",
      "options": [
        "A#7",
        "E7",
        "F#7",
        "B7"
      ],
      "explanation": "V7 è costruito sul V grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su F#: F#7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is V7?",
      "options": [
        "A#7",
        "E7",
        "F#7",
        "B7"
      ],
      "explanation": "V7 is built on degree V of B major (B, C#, D#, E, F#, G#, A#), i.e. on F#: F#7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 593,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a vim7?",
      "options": [
        "A#m7",
        "C#m7",
        "G#m7",
        "F#m7"
      ],
      "explanation": "vim7 è costruito sul VI grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su G#: G#m7.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is vim7?",
      "options": [
        "A#m7",
        "C#m7",
        "G#m7",
        "F#m7"
      ],
      "explanation": "vim7 is built on degree VI of B major (B, C#, D#, E, F#, G#, A#), i.e. on G#: G#m7.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 594,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B maggiore, quale accordo corrisponde a viiø7?",
      "options": [
        "D#m7b5",
        "A#m7b5",
        "G#m7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 è costruito sul VII grado di B maggiore (B, C#, D#, E, F#, G#, A#), cioè su A#: A#m7b5.",
      "sub": "Armonia funzionale"
    },
    "en": {
      "question": "In B major, which chord is viiø7?",
      "options": [
        "D#m7b5",
        "A#m7b5",
        "G#m7b5",
        "Em7b5"
      ],
      "explanation": "viiø7 is built on degree VII of B major (B, C#, D#, E, F#, G#, A#), i.e. on A#: A#m7b5.",
      "sub": "Functional harmony"
    }
  },
  {
    "id": 595,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Cm7",
        "Cmaj7",
        "Cm7b5",
        "Ebmaj7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul I grado (C) si forma Cm7 (C, Eb, G, Bb), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree I?",
      "options": [
        "Cm7",
        "Cmaj7",
        "Cm7b5",
        "Ebmaj7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree I (C) you get Cm7 (C, Eb, G, Bb), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 596,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "D7",
        "Ddim7",
        "Dm7b5",
        "Bb7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul II grado (D) si forma Dm7b5 (D, F, Ab, C), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree II?",
      "options": [
        "D7",
        "Ddim7",
        "Dm7b5",
        "Bb7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree II (D) you get Dm7b5 (D, F, Ab, C), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 597,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Eb7",
        "Ebm7",
        "Abmaj7",
        "Ebmaj7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul III grado (Eb) si forma Ebmaj7 (Eb, G, Bb, D), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree III?",
      "options": [
        "Eb7",
        "Ebm7",
        "Abmaj7",
        "Ebmaj7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree III (Eb) you get Ebmaj7 (Eb, G, Bb, D), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 598,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Fm7",
        "F7",
        "Fm7b5",
        "Abmaj7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul IV grado (F) si forma Fm7 (F, Ab, C, Eb), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Fm7",
        "F7",
        "Fm7b5",
        "Abmaj7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree IV (F) you get Fm7 (F, Ab, C, Eb), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 599,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Gm7",
        "G7",
        "Gmaj7",
        "Abmaj7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul V grado (G) si forma Gm7 (G, Bb, D, F), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe G7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree V?",
      "options": [
        "Gm7",
        "G7",
        "Gmaj7",
        "Abmaj7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree V (G) you get Gm7 (G, Bb, D, F), i.e. vm7. In harmonic minor (raised 7th) it would become G7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 600,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Abmaj7",
        "AbmMaj7",
        "Abm7",
        "Cm7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul VI grado (Ab) si forma Abmaj7 (Ab, C, Eb, G), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Abmaj7",
        "AbmMaj7",
        "Abm7",
        "Cm7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree VI (Ab) you get Abmaj7 (Ab, C, Eb, G), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 601,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In C minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Bbdim7",
        "Gm7"
      ],
      "explanation": "C minore naturale: C, D, Eb, F, G, Ab, Bb. Sul VII grado (Bb) si forma Bb7 (Bb, D, F, Ab), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Bbdim7",
        "Gm7"
      ],
      "explanation": "C natural minor: C, D, Eb, F, G, Ab, Bb. On degree VII (Bb) you get Bb7 (Bb, D, F, Ab), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 602,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "C#7",
        "C#m7",
        "C#m7b5",
        "B7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul I grado (C#) si forma C#m7 (C#, E, G#, B), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree I?",
      "options": [
        "C#7",
        "C#m7",
        "C#m7b5",
        "B7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree I (C#) you get C#m7 (C#, E, G#, B), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 603,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "D#dim7",
        "D#m7",
        "Amaj7",
        "D#m7b5"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul II grado (D#) si forma D#m7b5 (D#, F#, A, C#), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree II?",
      "options": [
        "D#dim7",
        "D#m7",
        "Amaj7",
        "D#m7b5"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree II (D#) you get D#m7b5 (D#, F#, A, C#), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 604,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "EmMaj7",
        "Emaj7",
        "Em7",
        "C#m7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul III grado (E) si forma Emaj7 (E, G#, B, D#), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree III?",
      "options": [
        "EmMaj7",
        "Emaj7",
        "Em7",
        "C#m7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree III (E) you get Emaj7 (E, G#, B, D#), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 605,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "F#maj7",
        "F#m7",
        "F#m7b5",
        "Emaj7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul IV grado (F#) si forma F#m7 (F#, A, C#, E), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree IV?",
      "options": [
        "F#maj7",
        "F#m7",
        "F#m7b5",
        "Emaj7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree IV (F#) you get F#m7 (F#, A, C#, E), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 606,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "G#7",
        "G#m7",
        "G#maj7",
        "Amaj7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul V grado (G#) si forma G#m7 (G#, B, D#, F#), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe G#7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree V?",
      "options": [
        "G#7",
        "G#m7",
        "G#maj7",
        "Amaj7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree V (G#) you get G#m7 (G#, B, D#, F#), i.e. vm7. In harmonic minor (raised 7th) it would become G#7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 607,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "AmMaj7",
        "Am7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul VI grado (A) si forma Amaj7 (A, C#, E, G#), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree VI?",
      "options": [
        "AmMaj7",
        "Am7",
        "Emaj7",
        "Amaj7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree VI (A) you get Amaj7 (A, C#, E, G#), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 608,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In C# minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Bdim7",
        "Bm7",
        "Amaj7",
        "B7"
      ],
      "explanation": "C# minore naturale: C#, D#, E, F#, G#, A, B. Sul VII grado (B) si forma B7 (B, D#, F#, A), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In C# natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Bdim7",
        "Bm7",
        "Amaj7",
        "B7"
      ],
      "explanation": "C# natural minor: C#, D#, E, F#, G#, A, B. On degree VII (B) you get B7 (B, D#, F#, A), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 609,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Dm7b5",
        "D7",
        "Dm7",
        "Bbmaj7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul I grado (D) si forma Dm7 (D, F, A, C), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree I?",
      "options": [
        "Dm7b5",
        "D7",
        "Dm7",
        "Bbmaj7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree I (D) you get Dm7 (D, F, A, C), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 610,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "Em7",
        "E7",
        "Em7b5",
        "Bbmaj7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul II grado (E) si forma Em7b5 (E, G, Bb, D), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree II?",
      "options": [
        "Em7",
        "E7",
        "Em7b5",
        "Bbmaj7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree II (E) you get Em7b5 (E, G, Bb, D), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 611,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Fmaj7",
        "F7",
        "FmMaj7",
        "Em7b5"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul III grado (F) si forma Fmaj7 (F, A, C, E), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree III?",
      "options": [
        "Fmaj7",
        "F7",
        "FmMaj7",
        "Em7b5"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree III (F) you get Fmaj7 (F, A, C, E), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 612,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Gm7b5",
        "Gmaj7",
        "C7",
        "Gm7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul IV grado (G) si forma Gm7 (G, Bb, D, F), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Gm7b5",
        "Gmaj7",
        "C7",
        "Gm7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree IV (G) you get Gm7 (G, Bb, D, F), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 613,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Am7",
        "Am7b5",
        "A7",
        "Dm7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul V grado (A) si forma Am7 (A, C, E, G), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe A7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree V?",
      "options": [
        "Am7",
        "Am7b5",
        "A7",
        "Dm7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree V (A) you get Am7 (A, C, E, G), i.e. vm7. In harmonic minor (raised 7th) it would become A7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 614,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Bbm7",
        "BbmMaj7",
        "Gm7",
        "Bbmaj7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul VI grado (Bb) si forma Bbmaj7 (Bb, D, F, A), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Bbm7",
        "BbmMaj7",
        "Gm7",
        "Bbmaj7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree VI (Bb) you get Bbmaj7 (Bb, D, F, A), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 615,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In D minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Cmaj7",
        "Cdim7",
        "C7",
        "Gm7"
      ],
      "explanation": "D minore naturale: D, E, F, G, A, Bb, C. Sul VII grado (C) si forma C7 (C, E, G, Bb), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In D natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Cmaj7",
        "Cdim7",
        "C7",
        "Gm7"
      ],
      "explanation": "D natural minor: D, E, F, G, A, Bb, C. On degree VII (C) you get C7 (C, E, G, Bb), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 616,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul I grado (Eb) si forma Ebm7 (Eb, Gb, Bb, Db), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree I?",
      "options": [
        "Eb7",
        "Ebmaj7",
        "Bbm7",
        "Ebm7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree I (Eb) you get Ebm7 (Eb, Gb, Bb, Db), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 617,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "F7",
        "Fm7b5",
        "Fm7",
        "Db7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul II grado (F) si forma Fm7b5 (F, Ab, Cb, Eb) (Cb suona come B), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree II?",
      "options": [
        "F7",
        "Fm7b5",
        "Fm7",
        "Db7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree II (F) you get Fm7b5 (F, Ab, Cb, Eb) (Cb sounds as B), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 618,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Gbm7",
        "Gbmaj7",
        "Gb7",
        "Db7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul III grado (Gb) si forma Gbmaj7 (Gb, Bb, Db, F), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree III?",
      "options": [
        "Gbm7",
        "Gbmaj7",
        "Gb7",
        "Db7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree III (Gb) you get Gbmaj7 (Gb, Bb, Db, F), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 619,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Abmaj7",
        "Abm7b5",
        "Abm7",
        "Bbm7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul IV grado (Ab) si forma Abm7 (Ab, Cb, Eb, Gb) (Cb suona come B), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Abmaj7",
        "Abm7b5",
        "Abm7",
        "Bbm7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree IV (Ab) you get Abm7 (Ab, Cb, Eb, Gb) (Cb sounds as B), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 620,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Bbmaj7",
        "Bbm7b5",
        "Db7",
        "Bbm7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul V grado (Bb) si forma Bbm7 (Bb, Db, F, Ab), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe Bb7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree V?",
      "options": [
        "Bbmaj7",
        "Bbm7b5",
        "Db7",
        "Bbm7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree V (Bb) you get Bbm7 (Bb, Db, F, Ab), i.e. vm7. In harmonic minor (raised 7th) it would become Bb7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 621,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Cbmaj7",
        "CbmMaj7",
        "Cbm7",
        "Bbm7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul VI grado (Cb) si forma Cbmaj7 (Cb, Eb, Gb, Bb) (Cb suona come B), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Cbmaj7",
        "CbmMaj7",
        "Cbm7",
        "Bbm7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree VI (Cb) you get Cbmaj7 (Cb, Eb, Gb, Bb) (Cb sounds as B), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 622,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Eb minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Dbmaj7",
        "Dbdim7",
        "Db7",
        "Cbmaj7"
      ],
      "explanation": "Eb minore naturale: Eb, F, Gb, Ab, Bb, Cb, Db. Sul VII grado (Db) si forma Db7 (Db, F, Ab, Cb) (Cb suona come B), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Eb natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Dbmaj7",
        "Dbdim7",
        "Db7",
        "Cbmaj7"
      ],
      "explanation": "Eb natural minor: Eb, F, Gb, Ab, Bb, Cb, Db. On degree VII (Db) you get Db7 (Db, F, Ab, Cb) (Cb sounds as B), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 623,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Emaj7",
        "E7",
        "Em7",
        "Am7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul I grado (E) si forma Em7 (E, G, B, D), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree I?",
      "options": [
        "Emaj7",
        "E7",
        "Em7",
        "Am7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree I (E) you get Em7 (E, G, B, D), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 624,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "F#dim7",
        "F#m7b5",
        "F#7",
        "Em7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul II grado (F#) si forma F#m7b5 (F#, A, C, E), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree II?",
      "options": [
        "F#dim7",
        "F#m7b5",
        "F#7",
        "Em7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree II (F#) you get F#m7b5 (F#, A, C, E), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 625,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "G7",
        "GmMaj7",
        "Gmaj7",
        "Bm7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul III grado (G) si forma Gmaj7 (G, B, D, F#), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree III?",
      "options": [
        "G7",
        "GmMaj7",
        "Gmaj7",
        "Bm7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree III (G) you get Gmaj7 (G, B, D, F#), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 626,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Am7b5",
        "A7",
        "Am7",
        "Bm7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul IV grado (A) si forma Am7 (A, C, E, G), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Am7b5",
        "A7",
        "Am7",
        "Bm7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree IV (A) you get Am7 (A, C, E, G), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 627,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Bm7",
        "B7",
        "Bm7b5",
        "F#m7b5"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul V grado (B) si forma Bm7 (B, D, F#, A), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe B7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree V?",
      "options": [
        "Bm7",
        "B7",
        "Bm7b5",
        "F#m7b5"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree V (B) you get Bm7 (B, D, F#, A), i.e. vm7. In harmonic minor (raised 7th) it would become B7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 628,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "CmMaj7",
        "Cmaj7",
        "Cm7",
        "Em7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul VI grado (C) si forma Cmaj7 (C, E, G, B), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree VI?",
      "options": [
        "CmMaj7",
        "Cmaj7",
        "Cm7",
        "Em7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree VI (C) you get Cmaj7 (C, E, G, B), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 629,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In E minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Dmaj7",
        "Dm7",
        "D7",
        "Am7"
      ],
      "explanation": "E minore naturale: E, F#, G, A, B, C, D. Sul VII grado (D) si forma D7 (D, F#, A, C), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In E natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Dmaj7",
        "Dm7",
        "D7",
        "Am7"
      ],
      "explanation": "E natural minor: E, F#, G, A, B, C, D. On degree VII (D) you get D7 (D, F#, A, C), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 630,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Fm7",
        "Fm7b5",
        "Fmaj7",
        "Gm7b5"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul I grado (F) si forma Fm7 (F, Ab, C, Eb), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree I?",
      "options": [
        "Fm7",
        "Fm7b5",
        "Fmaj7",
        "Gm7b5"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree I (F) you get Fm7 (F, Ab, C, Eb), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 631,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "Gm7b5",
        "G7",
        "Gdim7",
        "Fm7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul II grado (G) si forma Gm7b5 (G, Bb, Db, F), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree II?",
      "options": [
        "Gm7b5",
        "G7",
        "Gdim7",
        "Fm7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree II (G) you get Gm7b5 (G, Bb, Db, F), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 632,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Abmaj7",
        "Abm7",
        "AbmMaj7",
        "Eb7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul III grado (Ab) si forma Abmaj7 (Ab, C, Eb, G), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree III?",
      "options": [
        "Abmaj7",
        "Abm7",
        "AbmMaj7",
        "Eb7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree III (Ab) you get Abmaj7 (Ab, C, Eb, G), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 633,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Dbmaj7",
        "Bbm7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul IV grado (Bb) si forma Bbm7 (Bb, Db, F, Ab), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Dbmaj7",
        "Bbm7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree IV (Bb) you get Bbm7 (Bb, Db, F, Ab), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 634,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Cm7b5",
        "Cmaj7",
        "Cm7",
        "Bbm7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul V grado (C) si forma Cm7 (C, Eb, G, Bb), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe C7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree V?",
      "options": [
        "Cm7b5",
        "Cmaj7",
        "Cm7",
        "Bbm7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree V (C) you get Cm7 (C, Eb, G, Bb), i.e. vm7. In harmonic minor (raised 7th) it would become C7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 635,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Dbmaj7",
        "Dbm7",
        "DbmMaj7",
        "Cm7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul VI grado (Db) si forma Dbmaj7 (Db, F, Ab, C), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Dbmaj7",
        "Dbm7",
        "DbmMaj7",
        "Cm7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree VI (Db) you get Dbmaj7 (Db, F, Ab, C), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 636,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Ebdim7",
        "Eb7",
        "Ebm7",
        "Bbm7"
      ],
      "explanation": "F minore naturale: F, G, Ab, Bb, C, Db, Eb. Sul VII grado (Eb) si forma Eb7 (Eb, G, Bb, Db), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Ebdim7",
        "Eb7",
        "Ebm7",
        "Bbm7"
      ],
      "explanation": "F natural minor: F, G, Ab, Bb, C, Db, Eb. On degree VII (Eb) you get Eb7 (Eb, G, Bb, Db), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 637,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "F#m7b5",
        "F#7",
        "F#m7",
        "C#m7"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul I grado (F#) si forma F#m7 (F#, A, C#, E), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree I?",
      "options": [
        "F#m7b5",
        "F#7",
        "F#m7",
        "C#m7"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree I (F#) you get F#m7 (F#, A, C#, E), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 638,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "G#m7",
        "G#dim7",
        "F#m7",
        "G#m7b5"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul II grado (G#) si forma G#m7b5 (G#, B, D, F#), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree II?",
      "options": [
        "G#m7",
        "G#dim7",
        "F#m7",
        "G#m7b5"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree II (G#) you get G#m7b5 (G#, B, D, F#), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 639,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Am7",
        "Amaj7",
        "AmMaj7",
        "C#m7"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul III grado (A) si forma Amaj7 (A, C#, E, G#), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree III?",
      "options": [
        "Am7",
        "Amaj7",
        "AmMaj7",
        "C#m7"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree III (A) you get Amaj7 (A, C#, E, G#), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 640,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "B7",
        "Bmaj7",
        "G#m7b5",
        "Bm7"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul IV grado (B) si forma Bm7 (B, D, F#, A), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree IV?",
      "options": [
        "B7",
        "Bmaj7",
        "G#m7b5",
        "Bm7"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree IV (B) you get Bm7 (B, D, F#, A), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 641,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "C#7",
        "C#m7b5",
        "Dmaj7",
        "C#m7"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul V grado (C#) si forma C#m7 (C#, E, G#, B), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe C#7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree V?",
      "options": [
        "C#7",
        "C#m7b5",
        "Dmaj7",
        "C#m7"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree V (C#) you get C#m7 (C#, E, G#, B), i.e. vm7. In harmonic minor (raised 7th) it would become C#7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 642,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "D7",
        "Dm7",
        "Dmaj7",
        "Amaj7"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul VI grado (D) si forma Dmaj7 (D, F#, A, C#), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree VI?",
      "options": [
        "D7",
        "Dm7",
        "Dmaj7",
        "Amaj7"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree VI (D) you get Dmaj7 (D, F#, A, C#), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 643,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In F# minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Emaj7",
        "Edim7",
        "E7",
        "G#m7b5"
      ],
      "explanation": "F# minore naturale: F#, G#, A, B, C#, D, E. Sul VII grado (E) si forma E7 (E, G#, B, D), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In F# natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Emaj7",
        "Edim7",
        "E7",
        "G#m7b5"
      ],
      "explanation": "F# natural minor: F#, G#, A, B, C#, D, E. On degree VII (E) you get E7 (E, G#, B, D), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 644,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Gm7b5",
        "G7",
        "Gm7",
        "Cm7"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul I grado (G) si forma Gm7 (G, Bb, D, F), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree I?",
      "options": [
        "Gm7b5",
        "G7",
        "Gm7",
        "Cm7"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree I (G) you get Gm7 (G, Bb, D, F), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 645,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "Am7",
        "Adim7",
        "Am7b5",
        "Gm7"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul II grado (A) si forma Am7b5 (A, C, Eb, G), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree II?",
      "options": [
        "Am7",
        "Adim7",
        "Am7b5",
        "Gm7"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree II (A) you get Am7b5 (A, C, Eb, G), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 646,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Bb7",
        "BbmMaj7",
        "Bbmaj7",
        "Am7b5"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul III grado (Bb) si forma Bbmaj7 (Bb, D, F, A), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree III?",
      "options": [
        "Bb7",
        "BbmMaj7",
        "Bbmaj7",
        "Am7b5"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree III (Bb) you get Bbmaj7 (Bb, D, F, A), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 647,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "C7",
        "Cm7",
        "Cm7b5",
        "F7"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul IV grado (C) si forma Cm7 (C, Eb, G, Bb), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree IV?",
      "options": [
        "C7",
        "Cm7",
        "Cm7b5",
        "F7"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree IV (C) you get Cm7 (C, Eb, G, Bb), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 648,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Dm7b5",
        "Dm7",
        "Dmaj7",
        "Am7b5"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul V grado (D) si forma Dm7 (D, F, A, C), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe D7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree V?",
      "options": [
        "Dm7b5",
        "Dm7",
        "Dmaj7",
        "Am7b5"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree V (D) you get Dm7 (D, F, A, C), i.e. vm7. In harmonic minor (raised 7th) it would become D7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 649,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Ebmaj7",
        "Eb7",
        "Ebm7",
        "Dm7"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul VI grado (Eb) si forma Ebmaj7 (Eb, G, Bb, D), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Ebmaj7",
        "Eb7",
        "Ebm7",
        "Dm7"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree VI (Eb) you get Ebmaj7 (Eb, G, Bb, D), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 650,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Fdim7",
        "Fmaj7",
        "Am7b5",
        "F7"
      ],
      "explanation": "G minore naturale: G, A, Bb, C, D, Eb, F. Sul VII grado (F) si forma F7 (F, A, C, Eb), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Fdim7",
        "Fmaj7",
        "Am7b5",
        "F7"
      ],
      "explanation": "G natural minor: G, A, Bb, C, D, Eb, F. On degree VII (F) you get F7 (F, A, C, Eb), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 651,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "G#m7",
        "G#m7b5",
        "G#maj7",
        "D#m7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul I grado (G#) si forma G#m7 (G#, B, D#, F#), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree I?",
      "options": [
        "G#m7",
        "G#m7b5",
        "G#maj7",
        "D#m7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree I (G#) you get G#m7 (G#, B, D#, F#), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 652,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "A#m7b5",
        "A#m7",
        "A#7",
        "G#m7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul II grado (A#) si forma A#m7b5 (A#, C#, E, G#), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree II?",
      "options": [
        "A#m7b5",
        "A#m7",
        "A#7",
        "G#m7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree II (A#) you get A#m7b5 (A#, C#, E, G#), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 653,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Bm7",
        "Bmaj7",
        "BmMaj7",
        "F#7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul III grado (B) si forma Bmaj7 (B, D#, F#, A#), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree III?",
      "options": [
        "Bm7",
        "Bmaj7",
        "BmMaj7",
        "F#7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree III (B) you get Bmaj7 (B, D#, F#, A#), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 654,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "C#m7",
        "C#maj7",
        "C#m7b5",
        "Emaj7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul IV grado (C#) si forma C#m7 (C#, E, G#, B), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree IV?",
      "options": [
        "C#m7",
        "C#maj7",
        "C#m7b5",
        "Emaj7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree IV (C#) you get C#m7 (C#, E, G#, B), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 655,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "D#m7",
        "D#maj7",
        "D#7",
        "F#7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul V grado (D#) si forma D#m7 (D#, F#, A#, C#), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe D#7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree V?",
      "options": [
        "D#m7",
        "D#maj7",
        "D#7",
        "F#7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree V (D#) you get D#m7 (D#, F#, A#, C#), i.e. vm7. In harmonic minor (raised 7th) it would become D#7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 656,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "E7",
        "Em7",
        "C#m7",
        "Emaj7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul VI grado (E) si forma Emaj7 (E, G#, B, D#), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree VI?",
      "options": [
        "E7",
        "Em7",
        "C#m7",
        "Emaj7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree VI (E) you get Emaj7 (E, G#, B, D#), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 657,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In G# minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "F#maj7",
        "F#m7",
        "A#m7b5",
        "F#7"
      ],
      "explanation": "G# minore naturale: G#, A#, B, C#, D#, E, F#. Sul VII grado (F#) si forma F#7 (F#, A#, C#, E), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In G# natural minor, which seventh chord is built on degree VII?",
      "options": [
        "F#maj7",
        "F#m7",
        "A#m7b5",
        "F#7"
      ],
      "explanation": "G# natural minor: G#, A#, B, C#, D#, E, F#. On degree VII (F#) you get F#7 (F#, A#, C#, E), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 658,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "A7",
        "Amaj7",
        "Am7",
        "Cmaj7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul I grado (A) si forma Am7 (A, C, E, G), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree I?",
      "options": [
        "A7",
        "Amaj7",
        "Am7",
        "Cmaj7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree I (A) you get Am7 (A, C, E, G), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 659,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "Bm7",
        "Bm7b5",
        "B7",
        "Fmaj7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul II grado (B) si forma Bm7b5 (B, D, F, A), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree II?",
      "options": [
        "Bm7",
        "Bm7b5",
        "B7",
        "Fmaj7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree II (B) you get Bm7b5 (B, D, F, A), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 660,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Cmaj7",
        "Cm7",
        "CmMaj7",
        "G7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul III grado (C) si forma Cmaj7 (C, E, G, B), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree III?",
      "options": [
        "Cmaj7",
        "Cm7",
        "CmMaj7",
        "G7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree III (C) you get Cmaj7 (C, E, G, B), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 661,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Dm7b5",
        "Dm7",
        "D7",
        "Em7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul IV grado (D) si forma Dm7 (D, F, A, C), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Dm7b5",
        "Dm7",
        "D7",
        "Em7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree IV (D) you get Dm7 (D, F, A, C), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 662,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Em7",
        "E7",
        "Emaj7",
        "Am7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul V grado (E) si forma Em7 (E, G, B, D), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe E7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree V?",
      "options": [
        "Em7",
        "E7",
        "Emaj7",
        "Am7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree V (E) you get Em7 (E, G, B, D), i.e. vm7. In harmonic minor (raised 7th) it would become E7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 663,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Fmaj7",
        "Fm7",
        "F7",
        "Dm7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul VI grado (F) si forma Fmaj7 (F, A, C, E), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Fmaj7",
        "Fm7",
        "F7",
        "Dm7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree VI (F) you get Fmaj7 (F, A, C, E), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 664,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In A minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Gmaj7",
        "Gm7",
        "Bm7b5",
        "G7"
      ],
      "explanation": "A minore naturale: A, B, C, D, E, F, G. Sul VII grado (G) si forma G7 (G, B, D, F), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In A natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Gmaj7",
        "Gm7",
        "Bm7b5",
        "G7"
      ],
      "explanation": "A natural minor: A, B, C, D, E, F, G. On degree VII (G) you get G7 (G, B, D, F), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 665,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Dbmaj7",
        "Bbm7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul I grado (Bb) si forma Bbm7 (Bb, Db, F, Ab), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree I?",
      "options": [
        "Bb7",
        "Bbmaj7",
        "Dbmaj7",
        "Bbm7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree I (Bb) you get Bbm7 (Bb, Db, F, Ab), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 666,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "Cm7b5",
        "Cdim7",
        "Cm7",
        "Ab7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul II grado (C) si forma Cm7b5 (C, Eb, Gb, Bb), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree II?",
      "options": [
        "Cm7b5",
        "Cdim7",
        "Cm7",
        "Ab7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree II (C) you get Cm7b5 (C, Eb, Gb, Bb), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 667,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "Db7",
        "DbmMaj7",
        "Dbmaj7",
        "Cm7b5"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul III grado (Db) si forma Dbmaj7 (Db, F, Ab, C), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree III?",
      "options": [
        "Db7",
        "DbmMaj7",
        "Dbmaj7",
        "Cm7b5"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree III (Db) you get Dbmaj7 (Db, F, Ab, C), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 668,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "Ebmaj7",
        "Eb7",
        "Fm7",
        "Ebm7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul IV grado (Eb) si forma Ebm7 (Eb, Gb, Bb, Db), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree IV?",
      "options": [
        "Ebmaj7",
        "Eb7",
        "Fm7",
        "Ebm7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree IV (Eb) you get Ebm7 (Eb, Gb, Bb, Db), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 669,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "Fm7",
        "Bbm7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul V grado (F) si forma Fm7 (F, Ab, C, Eb), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe F7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree V?",
      "options": [
        "Fmaj7",
        "Fm7b5",
        "Fm7",
        "Bbm7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree V (F) you get Fm7 (F, Ab, C, Eb), i.e. vm7. In harmonic minor (raised 7th) it would become F7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 670,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "Gb7",
        "GbmMaj7",
        "Ab7",
        "Gbmaj7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul VI grado (Gb) si forma Gbmaj7 (Gb, Bb, Db, F), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree VI?",
      "options": [
        "Gb7",
        "GbmMaj7",
        "Ab7",
        "Gbmaj7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree VI (Gb) you get Gbmaj7 (Gb, Bb, Db, F), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 671,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In Bb minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Ab7",
        "Abmaj7",
        "Abdim7",
        "Dbmaj7"
      ],
      "explanation": "Bb minore naturale: Bb, C, Db, Eb, F, Gb, Ab. Sul VII grado (Ab) si forma Ab7 (Ab, C, Eb, Gb), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In Bb natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Ab7",
        "Abmaj7",
        "Abdim7",
        "Dbmaj7"
      ],
      "explanation": "Bb natural minor: Bb, C, Db, Eb, F, Gb, Ab. On degree VII (Ab) you get Ab7 (Ab, C, Eb, Gb), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 672,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul I grado?",
      "options": [
        "B7",
        "Bmaj7",
        "A7",
        "Bm7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul I grado (B) si forma Bm7 (B, D, F#, A), cioè im7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree I?",
      "options": [
        "B7",
        "Bmaj7",
        "A7",
        "Bm7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree I (B) you get Bm7 (B, D, F#, A), i.e. im7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 673,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul II grado?",
      "options": [
        "C#m7b5",
        "C#7",
        "C#m7",
        "Gmaj7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul II grado (C#) si forma C#m7b5 (C#, E, G, B), cioè iiø7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree II?",
      "options": [
        "C#m7b5",
        "C#7",
        "C#m7",
        "Gmaj7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree II (C#) you get C#m7b5 (C#, E, G, B), i.e. iiø7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 674,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul III grado?",
      "options": [
        "DmMaj7",
        "Dmaj7",
        "D7",
        "Gmaj7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul III grado (D) si forma Dmaj7 (D, F#, A, C#), cioè IIImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree III?",
      "options": [
        "DmMaj7",
        "Dmaj7",
        "D7",
        "Gmaj7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree III (D) you get Dmaj7 (D, F#, A, C#), i.e. IIImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 675,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul IV grado?",
      "options": [
        "E7",
        "Em7",
        "Em7b5",
        "Gmaj7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul IV grado (E) si forma Em7 (E, G, B, D), cioè ivm7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree IV?",
      "options": [
        "E7",
        "Em7",
        "Em7b5",
        "Gmaj7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree IV (E) you get Em7 (E, G, B, D), i.e. ivm7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 676,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul V grado?",
      "options": [
        "F#m7",
        "F#maj7",
        "F#m7b5",
        "Bm7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul V grado (F#) si forma F#m7 (F#, A, C#, E), cioè vm7. Nella minore armonica (7ª alzata) diventerebbe F#7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree V?",
      "options": [
        "F#m7",
        "F#maj7",
        "F#m7b5",
        "Bm7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree V (F#) you get F#m7 (F#, A, C#, E), i.e. vm7. In harmonic minor (raised 7th) it would become F#7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 677,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul VI grado?",
      "options": [
        "G7",
        "Gm7",
        "Gmaj7",
        "C#m7b5"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul VI grado (G) si forma Gmaj7 (G, B, D, F#), cioè VImaj7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree VI?",
      "options": [
        "G7",
        "Gm7",
        "Gmaj7",
        "C#m7b5"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree VI (G) you get Gmaj7 (G, B, D, F#), i.e. VImaj7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 678,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "In B minore naturale, quale accordo di settima si forma sul VII grado?",
      "options": [
        "Amaj7",
        "Adim7",
        "Gmaj7",
        "A7"
      ],
      "explanation": "B minore naturale: B, C#, D, E, F#, G, A. Sul VII grado (A) si forma A7 (A, C#, E, G), cioè VII7.",
      "sub": "Armonia funzionale (minore)"
    },
    "en": {
      "question": "In B natural minor, which seventh chord is built on degree VII?",
      "options": [
        "Amaj7",
        "Adim7",
        "Gmaj7",
        "A7"
      ],
      "explanation": "B natural minor: B, C#, D, E, F#, G, A. On degree VII (A) you get A7 (A, C#, E, G), i.e. VII7.",
      "sub": "Functional harmony (minor)"
    }
  },
  {
    "id": 679,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la progressione ii–V–I in C maggiore?",
      "options": [
        "Dm7 – G7 – Cmaj7",
        "Fm7 – G7 – Cmaj7",
        "Am7 – D7 – Cmaj7",
        "Dm7 – Gm7 – Cmaj7"
      ],
      "explanation": "In C maggiore: ii = Dm7 (II grado), V = G7 (V grado), I = Cmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in C major?",
      "options": [
        "Dm7 – G7 – Cmaj7",
        "Fm7 – G7 – Cmaj7",
        "Am7 – D7 – Cmaj7",
        "Dm7 – Gm7 – Cmaj7"
      ],
      "explanation": "In C major: ii = Dm7 (degree II), V = G7 (degree V), I = Cmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 680,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la progressione ii–V–I in Db maggiore?",
      "options": [
        "Ebmaj7 – Ab7 – Dbmaj7",
        "Ebm7 – Ab7 – Dbmaj7",
        "Ebm7 – Abm7 – Dbmaj7",
        "Gbm7 – Ab7 – Dbmaj7"
      ],
      "explanation": "In Db maggiore: ii = Ebm7 (II grado), V = Ab7 (V grado), I = Dbmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in Db major?",
      "options": [
        "Ebmaj7 – Ab7 – Dbmaj7",
        "Ebm7 – Ab7 – Dbmaj7",
        "Ebm7 – Abm7 – Dbmaj7",
        "Gbm7 – Ab7 – Dbmaj7"
      ],
      "explanation": "In Db major: ii = Ebm7 (degree II), V = Ab7 (degree V), I = Dbmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 681,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la progressione ii–V–I in D maggiore?",
      "options": [
        "Em7 – A7 – Dmaj7",
        "Em7 – Amaj7 – Dmaj7",
        "Bm7 – E7 – Dmaj7",
        "Gm7 – A7 – Dmaj7"
      ],
      "explanation": "In D maggiore: ii = Em7 (II grado), V = A7 (V grado), I = Dmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in D major?",
      "options": [
        "Em7 – A7 – Dmaj7",
        "Em7 – Amaj7 – Dmaj7",
        "Bm7 – E7 – Dmaj7",
        "Gm7 – A7 – Dmaj7"
      ],
      "explanation": "In D major: ii = Em7 (degree II), V = A7 (degree V), I = Dmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 682,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la progressione ii–V–I in Eb maggiore?",
      "options": [
        "Fmaj7 – Bb7 – Ebmaj7",
        "Fm7 – Bb7 – Ebmaj7",
        "Abm7 – Bb7 – Ebmaj7",
        "Fm7 – Bbm7 – Ebmaj7"
      ],
      "explanation": "In Eb maggiore: ii = Fm7 (II grado), V = Bb7 (V grado), I = Ebmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in Eb major?",
      "options": [
        "Fmaj7 – Bb7 – Ebmaj7",
        "Fm7 – Bb7 – Ebmaj7",
        "Abm7 – Bb7 – Ebmaj7",
        "Fm7 – Bbm7 – Ebmaj7"
      ],
      "explanation": "In Eb major: ii = Fm7 (degree II), V = Bb7 (degree V), I = Ebmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 683,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la progressione ii–V–I in E maggiore?",
      "options": [
        "Am7 – B7 – Emaj7",
        "F#m7 – Bm7 – Emaj7",
        "F#m7 – B7 – E7",
        "F#m7 – B7 – Emaj7"
      ],
      "explanation": "In E maggiore: ii = F#m7 (II grado), V = B7 (V grado), I = Emaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in E major?",
      "options": [
        "Am7 – B7 – Emaj7",
        "F#m7 – Bm7 – Emaj7",
        "F#m7 – B7 – E7",
        "F#m7 – B7 – Emaj7"
      ],
      "explanation": "In E major: ii = F#m7 (degree II), V = B7 (degree V), I = Emaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 684,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la progressione ii–V–I in F maggiore?",
      "options": [
        "Gm7 – Cm7 – Fmaj7",
        "Gm7 – C7 – Fmaj7",
        "Dm7 – G7 – Fmaj7",
        "Gm7 – Cmaj7 – Fmaj7"
      ],
      "explanation": "In F maggiore: ii = Gm7 (II grado), V = C7 (V grado), I = Fmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in F major?",
      "options": [
        "Gm7 – Cm7 – Fmaj7",
        "Gm7 – C7 – Fmaj7",
        "Dm7 – G7 – Fmaj7",
        "Gm7 – Cmaj7 – Fmaj7"
      ],
      "explanation": "In F major: ii = Gm7 (degree II), V = C7 (degree V), I = Fmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 685,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la progressione ii–V–I in Gb maggiore?",
      "options": [
        "Abmaj7 – Db7 – Gbmaj7",
        "Abm7 – Db7 – Gbmaj7",
        "Ebm7 – Ab7 – Gbmaj7",
        "Cbm7 – Db7 – Gbmaj7"
      ],
      "explanation": "In Gb maggiore: ii = Abm7 (II grado), V = Db7 (V grado), I = Gbmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in Gb major?",
      "options": [
        "Abmaj7 – Db7 – Gbmaj7",
        "Abm7 – Db7 – Gbmaj7",
        "Ebm7 – Ab7 – Gbmaj7",
        "Cbm7 – Db7 – Gbmaj7"
      ],
      "explanation": "In Gb major: ii = Abm7 (degree II), V = Db7 (degree V), I = Gbmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 686,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la progressione ii–V–I in G maggiore?",
      "options": [
        "Cm7 – D7 – Gmaj7",
        "Am7 – D7 – G7",
        "Em7 – A7 – Gmaj7",
        "Am7 – D7 – Gmaj7"
      ],
      "explanation": "In G maggiore: ii = Am7 (II grado), V = D7 (V grado), I = Gmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in G major?",
      "options": [
        "Cm7 – D7 – Gmaj7",
        "Am7 – D7 – G7",
        "Em7 – A7 – Gmaj7",
        "Am7 – D7 – Gmaj7"
      ],
      "explanation": "In G major: ii = Am7 (degree II), V = D7 (degree V), I = Gmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 687,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la progressione ii–V–I in Ab maggiore?",
      "options": [
        "Bbm7 – Eb7 – Ab7",
        "Bbm7 – Ebmaj7 – Abmaj7",
        "Bbm7 – Eb7 – Abmaj7",
        "Bbm7 – Ebm7 – Abmaj7"
      ],
      "explanation": "In Ab maggiore: ii = Bbm7 (II grado), V = Eb7 (V grado), I = Abmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in Ab major?",
      "options": [
        "Bbm7 – Eb7 – Ab7",
        "Bbm7 – Ebmaj7 – Abmaj7",
        "Bbm7 – Eb7 – Abmaj7",
        "Bbm7 – Ebm7 – Abmaj7"
      ],
      "explanation": "In Ab major: ii = Bbm7 (degree II), V = Eb7 (degree V), I = Abmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 688,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la progressione ii–V–I in A maggiore?",
      "options": [
        "Bmaj7 – E7 – Amaj7",
        "Dm7 – E7 – Amaj7",
        "Bm7 – E7 – Amaj7",
        "Bm7 – Em7 – Amaj7"
      ],
      "explanation": "In A maggiore: ii = Bm7 (II grado), V = E7 (V grado), I = Amaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in A major?",
      "options": [
        "Bmaj7 – E7 – Amaj7",
        "Dm7 – E7 – Amaj7",
        "Bm7 – E7 – Amaj7",
        "Bm7 – Em7 – Amaj7"
      ],
      "explanation": "In A major: ii = Bm7 (degree II), V = E7 (degree V), I = Amaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 689,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la progressione ii–V–I in Bb maggiore?",
      "options": [
        "Cmaj7 – F7 – Bbmaj7",
        "Cm7 – F7 – Bbmaj7",
        "Cm7 – Fmaj7 – Bbmaj7",
        "Ebm7 – F7 – Bbmaj7"
      ],
      "explanation": "In Bb maggiore: ii = Cm7 (II grado), V = F7 (V grado), I = Bbmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in Bb major?",
      "options": [
        "Cmaj7 – F7 – Bbmaj7",
        "Cm7 – F7 – Bbmaj7",
        "Cm7 – Fmaj7 – Bbmaj7",
        "Ebm7 – F7 – Bbmaj7"
      ],
      "explanation": "In Bb major: ii = Cm7 (degree II), V = F7 (degree V), I = Bbmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 690,
    "level": "medium",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la progressione ii–V–I in B maggiore?",
      "options": [
        "C#m7 – F#7 – Bmaj7",
        "C#m7 – F#maj7 – Bmaj7",
        "G#m7 – C#7 – Bmaj7",
        "C#m7 – F#7 – B7"
      ],
      "explanation": "In B maggiore: ii = C#m7 (II grado), V = F#7 (V grado), I = Bmaj7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is the ii–V–I progression in B major?",
      "options": [
        "C#m7 – F#7 – Bmaj7",
        "C#m7 – F#maj7 – Bmaj7",
        "G#m7 – C#7 – Bmaj7",
        "C#m7 – F#7 – B7"
      ],
      "explanation": "In B major: ii = C#m7 (degree II), V = F#7 (degree V), I = Bmaj7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 691,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la sostituzione di tritono di C7?",
      "options": [
        "G7",
        "Gb7",
        "F7",
        "Eb7"
      ],
      "explanation": "Gb7 è a un tritono (6 semitoni) da C7 e condivide lo stesso tritono: E–Bb in C7, Fb–Bb in Gb7 (Fb suona come E). Entrambi risolvono su F.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of C7?",
      "options": [
        "G7",
        "Gb7",
        "F7",
        "Eb7"
      ],
      "explanation": "Gb7 lies a tritone (6 semitones) from C7 and shares the same tritone: E–Bb in C7, Fb–Bb in Gb7 (Fb sounds as E). Both resolve to F.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 692,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la sostituzione di tritono di Db7?",
      "options": [
        "Ab7",
        "Gmaj7",
        "G7",
        "A7"
      ],
      "explanation": "G7 è a un tritono (6 semitoni) da Db7 e condivide lo stesso tritono: F–Cb in Db7, F–B in G7. Entrambi risolvono su Gb.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of Db7?",
      "options": [
        "Ab7",
        "Gmaj7",
        "G7",
        "A7"
      ],
      "explanation": "G7 lies a tritone (6 semitones) from Db7 and shares the same tritone: F–Cb in Db7, F–B in G7. Both resolve to Gb.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 693,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la sostituzione di tritono di D7?",
      "options": [
        "Bb7",
        "Ab7",
        "A7",
        "Abmaj7"
      ],
      "explanation": "Ab7 è a un tritono (6 semitoni) da D7 e condivide lo stesso tritono: F#–C in D7, Gb–C in Ab7. Entrambi risolvono su G.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of D7?",
      "options": [
        "Bb7",
        "Ab7",
        "A7",
        "Abmaj7"
      ],
      "explanation": "Ab7 lies a tritone (6 semitones) from D7 and shares the same tritone: F#–C in D7, Gb–C in Ab7. Both resolve to G.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 694,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la sostituzione di tritono di Eb7?",
      "options": [
        "A7",
        "Amaj7",
        "B7",
        "Gb7"
      ],
      "explanation": "A7 è a un tritono (6 semitoni) da Eb7 e condivide lo stesso tritono: G–Db in Eb7, G–C# in A7. Entrambi risolvono su Ab.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of Eb7?",
      "options": [
        "A7",
        "Amaj7",
        "B7",
        "Gb7"
      ],
      "explanation": "A7 lies a tritone (6 semitones) from Eb7 and shares the same tritone: G–Db in Eb7, G–C# in A7. Both resolve to Ab.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 695,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la sostituzione di tritono di E7?",
      "options": [
        "Bb7",
        "A7",
        "G7",
        "Bbmaj7"
      ],
      "explanation": "Bb7 è a un tritono (6 semitoni) da E7 e condivide lo stesso tritono: G#–D in E7, Ab–D in Bb7. Entrambi risolvono su A.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of E7?",
      "options": [
        "Bb7",
        "A7",
        "G7",
        "Bbmaj7"
      ],
      "explanation": "Bb7 lies a tritone (6 semitones) from E7 and shares the same tritone: G#–D in E7, Ab–D in Bb7. Both resolve to A.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 696,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la sostituzione di tritono di F7?",
      "options": [
        "Bmaj7",
        "Ab7",
        "B7",
        "C#7"
      ],
      "explanation": "B7 è a un tritono (6 semitoni) da F7 e condivide lo stesso tritono: A–Eb in F7, A–D# in B7. Entrambi risolvono su Bb.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of F7?",
      "options": [
        "Bmaj7",
        "Ab7",
        "B7",
        "C#7"
      ],
      "explanation": "B7 lies a tritone (6 semitones) from F7 and shares the same tritone: A–Eb in F7, A–D# in B7. Both resolve to Bb.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 697,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la sostituzione di tritono di Gb7?",
      "options": [
        "C7",
        "B7",
        "A7",
        "Db7"
      ],
      "explanation": "C7 è a un tritono (6 semitoni) da Gb7 e condivide lo stesso tritono: Bb–Fb in Gb7, Bb–E in C7. Entrambi risolvono su B.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of Gb7?",
      "options": [
        "C7",
        "B7",
        "A7",
        "Db7"
      ],
      "explanation": "C7 lies a tritone (6 semitones) from Gb7 and shares the same tritone: Bb–Fb in Gb7, Bb–E in C7. Both resolve to B.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 698,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la sostituzione di tritono di G7?",
      "options": [
        "Db7",
        "Bb7",
        "Dbmaj7",
        "D7"
      ],
      "explanation": "Db7 è a un tritono (6 semitoni) da G7 e condivide lo stesso tritono: B–F in G7, Cb–F in Db7 (Cb suona come B). Entrambi risolvono su C.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of G7?",
      "options": [
        "Db7",
        "Bb7",
        "Dbmaj7",
        "D7"
      ],
      "explanation": "Db7 lies a tritone (6 semitones) from G7 and shares the same tritone: B–F in G7, Cb–F in Db7 (Cb sounds as B). Both resolve to C.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 699,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la sostituzione di tritono di Ab7?",
      "options": [
        "B7",
        "D7",
        "Db7",
        "Eb7"
      ],
      "explanation": "D7 è a un tritono (6 semitoni) da Ab7 e condivide lo stesso tritono: C–Gb in Ab7, C–F# in D7. Entrambi risolvono su Db.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of Ab7?",
      "options": [
        "B7",
        "D7",
        "Db7",
        "Eb7"
      ],
      "explanation": "D7 lies a tritone (6 semitones) from Ab7 and shares the same tritone: C–Gb in Ab7, C–F# in D7. Both resolve to Db.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 700,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la sostituzione di tritono di A7?",
      "options": [
        "E7",
        "Eb7",
        "Ebmaj7",
        "C7"
      ],
      "explanation": "Eb7 è a un tritono (6 semitoni) da A7 e condivide lo stesso tritono: C#–G in A7, Db–G in Eb7. Entrambi risolvono su D.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of A7?",
      "options": [
        "E7",
        "Eb7",
        "Ebmaj7",
        "C7"
      ],
      "explanation": "Eb7 lies a tritone (6 semitones) from A7 and shares the same tritone: C#–G in A7, Db–G in Eb7. Both resolve to D.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 701,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la sostituzione di tritono di Bb7?",
      "options": [
        "E7",
        "F7",
        "Emaj7",
        "Eb7"
      ],
      "explanation": "E7 è a un tritono (6 semitoni) da Bb7 e condivide lo stesso tritono: D–Ab in Bb7, D–G# in E7. Entrambi risolvono su Eb.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of Bb7?",
      "options": [
        "E7",
        "F7",
        "Emaj7",
        "Eb7"
      ],
      "explanation": "E7 lies a tritone (6 semitones) from Bb7 and shares the same tritone: D–Ab in Bb7, D–G# in E7. Both resolve to Eb.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 702,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la sostituzione di tritono di B7?",
      "options": [
        "Fmaj7",
        "F#7",
        "F7",
        "D7"
      ],
      "explanation": "F7 è a un tritono (6 semitoni) da B7 e condivide lo stesso tritono: D#–A in B7, Eb–A in F7. Entrambi risolvono su E.",
      "sub": "Sostituzioni"
    },
    "en": {
      "question": "What is the tritone substitution of B7?",
      "options": [
        "Fmaj7",
        "F#7",
        "F7",
        "D7"
      ],
      "explanation": "F7 lies a tritone (6 semitones) from B7 and shares the same tritone: D#–A in B7, Eb–A in F7. Both resolve to E.",
      "sub": "Substitutions"
    }
  },
  {
    "id": 703,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su C?",
      "options": [
        "G7",
        "E7",
        "F7",
        "D7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: G7 → C. Se C non è la tonica, G7 è una dominante secondaria (V7/C).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to C?",
      "options": [
        "G7",
        "E7",
        "F7",
        "D7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: G7 → C. When C is not the tonic, G7 is a secondary dominant (V7/C).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 704,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su Db?",
      "options": [
        "Ab7",
        "Bb7",
        "Gb7",
        "F7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: Ab7 → Db. Se Db non è la tonica, Ab7 è una dominante secondaria (V7/Db).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to Db?",
      "options": [
        "Ab7",
        "Bb7",
        "Gb7",
        "F7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: Ab7 → Db. When Db is not the tonic, Ab7 is a secondary dominant (V7/Db).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 705,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su D?",
      "options": [
        "A7",
        "F#7",
        "E7",
        "B7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: A7 → D. Se D non è la tonica, A7 è una dominante secondaria (V7/D).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to D?",
      "options": [
        "A7",
        "F#7",
        "E7",
        "B7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: A7 → D. When D is not the tonic, A7 is a secondary dominant (V7/D).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 706,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su Eb?",
      "options": [
        "F7",
        "Ab7",
        "Bb7",
        "G7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: Bb7 → Eb. Se Eb non è la tonica, Bb7 è una dominante secondaria (V7/Eb).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to Eb?",
      "options": [
        "F7",
        "Ab7",
        "Bb7",
        "G7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: Bb7 → Eb. When Eb is not the tonic, Bb7 is a secondary dominant (V7/Eb).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 707,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su E?",
      "options": [
        "D7",
        "G#7",
        "B7",
        "C#7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: B7 → E. Se E non è la tonica, B7 è una dominante secondaria (V7/E).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to E?",
      "options": [
        "D7",
        "G#7",
        "B7",
        "C#7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: B7 → E. When E is not the tonic, B7 is a secondary dominant (V7/E).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 708,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su F?",
      "options": [
        "C7",
        "Eb7",
        "D7",
        "G7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: C7 → F. Se F non è la tonica, C7 è una dominante secondaria (V7/F).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to F?",
      "options": [
        "C7",
        "Eb7",
        "D7",
        "G7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: C7 → F. When F is not the tonic, C7 is a secondary dominant (V7/F).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 709,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su Gb?",
      "options": [
        "Eb7",
        "Db7",
        "Ab7",
        "Bb7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: Db7 → Gb. Se Gb non è la tonica, Db7 è una dominante secondaria (V7/Gb).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to Gb?",
      "options": [
        "Eb7",
        "Db7",
        "Ab7",
        "Bb7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: Db7 → Gb. When Gb is not the tonic, Db7 is a secondary dominant (V7/Gb).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 710,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su G?",
      "options": [
        "A7",
        "D7",
        "F7",
        "B7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: D7 → G. Se G non è la tonica, D7 è una dominante secondaria (V7/G).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to G?",
      "options": [
        "A7",
        "D7",
        "F7",
        "B7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: D7 → G. When G is not the tonic, D7 is a secondary dominant (V7/G).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 711,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su Ab?",
      "options": [
        "Bb7",
        "Eb7",
        "Db7",
        "Gb7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: Eb7 → Ab. Se Ab non è la tonica, Eb7 è una dominante secondaria (V7/Ab).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to Ab?",
      "options": [
        "Bb7",
        "Eb7",
        "Db7",
        "Gb7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: Eb7 → Ab. When Ab is not the tonic, Eb7 is a secondary dominant (V7/Ab).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 712,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su A?",
      "options": [
        "E7",
        "B7",
        "C#7",
        "D7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: E7 → A. Se A non è la tonica, E7 è una dominante secondaria (V7/A).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to A?",
      "options": [
        "E7",
        "B7",
        "C#7",
        "D7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: E7 → A. When A is not the tonic, E7 is a secondary dominant (V7/A).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 713,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su Bb?",
      "options": [
        "G7",
        "F7",
        "Ab7",
        "Eb7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: F7 → Bb. Se Bb non è la tonica, F7 è una dominante secondaria (V7/Bb).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to Bb?",
      "options": [
        "G7",
        "F7",
        "Ab7",
        "Eb7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: F7 → Bb. When Bb is not the tonic, F7 is a secondary dominant (V7/Bb).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 714,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quale accordo di dominante (V7) risolve su B?",
      "options": [
        "A7",
        "C#7",
        "F#7",
        "D#7"
      ],
      "explanation": "La dominante sta una quinta giusta sopra l'accordo d'arrivo: F#7 → B. Se B non è la tonica, F#7 è una dominante secondaria (V7/B).",
      "sub": "Dominanti secondarie"
    },
    "en": {
      "question": "Which dominant chord (V7) resolves to B?",
      "options": [
        "A7",
        "C#7",
        "F#7",
        "D#7"
      ],
      "explanation": "The dominant sits a perfect fifth above the target chord: F#7 → B. When B is not the tonic, F#7 is a secondary dominant (V7/B).",
      "sub": "Secondary dominants"
    }
  },
  {
    "id": 715,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Ionio?",
      "options": [
        "III",
        "V",
        "I",
        "VI"
      ],
      "explanation": "Lo Ionio è il 1° modo: parte dal grado I della scala maggiore (in C: da C a C).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Ionian mode start?",
      "options": [
        "III",
        "V",
        "I",
        "VI"
      ],
      "explanation": "Ionian is mode 1: it starts on degree I of the major scale (in C: from C to C).",
      "sub": "Modes"
    }
  },
  {
    "id": 716,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Dorico?",
      "options": [
        "IV",
        "VI",
        "VII",
        "II"
      ],
      "explanation": "Il Dorico è il 2° modo: parte dal grado II della scala maggiore (in C: da D a D).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Dorian mode start?",
      "options": [
        "IV",
        "VI",
        "VII",
        "II"
      ],
      "explanation": "Dorian is mode 2: it starts on degree II of the major scale (in C: from D to D).",
      "sub": "Modes"
    }
  },
  {
    "id": 717,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Frigio?",
      "options": [
        "III",
        "V",
        "VII",
        "I"
      ],
      "explanation": "Il Frigio è il 3° modo: parte dal grado III della scala maggiore (in C: da E a E).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Phrygian mode start?",
      "options": [
        "III",
        "V",
        "VII",
        "I"
      ],
      "explanation": "Phrygian is mode 3: it starts on degree III of the major scale (in C: from E to E).",
      "sub": "Modes"
    }
  },
  {
    "id": 718,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Lidio?",
      "options": [
        "IV",
        "VI",
        "I",
        "II"
      ],
      "explanation": "Il Lidio è il 4° modo: parte dal grado IV della scala maggiore (in C: da F a F).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Lydian mode start?",
      "options": [
        "IV",
        "VI",
        "I",
        "II"
      ],
      "explanation": "Lydian is mode 4: it starts on degree IV of the major scale (in C: from F to F).",
      "sub": "Modes"
    }
  },
  {
    "id": 719,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Misolidio?",
      "options": [
        "VII",
        "V",
        "II",
        "III"
      ],
      "explanation": "Il Misolidio è il 5° modo: parte dal grado V della scala maggiore (in C: da G a G).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Mixolydian mode start?",
      "options": [
        "VII",
        "V",
        "II",
        "III"
      ],
      "explanation": "Mixolydian is mode 5: it starts on degree V of the major scale (in C: from G to G).",
      "sub": "Modes"
    }
  },
  {
    "id": 720,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Eolio?",
      "options": [
        "I",
        "III",
        "VI",
        "IV"
      ],
      "explanation": "L'Eolio è il 6° modo: parte dal grado VI della scala maggiore (in C: da A ad A).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Aeolian mode start?",
      "options": [
        "I",
        "III",
        "VI",
        "IV"
      ],
      "explanation": "Aeolian is mode 6: it starts on degree VI of the major scale (in C: from A to A).",
      "sub": "Modes"
    }
  },
  {
    "id": 721,
    "level": "easy",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Su quale grado della scala maggiore inizia il modo Locrio?",
      "options": [
        "II",
        "IV",
        "V",
        "VII"
      ],
      "explanation": "Il Locrio è il 7° modo: parte dal grado VII della scala maggiore (in C: da B a B).",
      "sub": "Modi"
    },
    "en": {
      "question": "On which degree of the major scale does the Locrian mode start?",
      "options": [
        "II",
        "IV",
        "V",
        "VII"
      ],
      "explanation": "Locrian is mode 7: it starts on degree VII of the major scale (in C: from B to B).",
      "sub": "Modes"
    }
  },
  {
    "id": 722,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale modo è caratterizzato dalla 4ª aumentata (#4 / #11) in un contesto maggiore?",
      "options": [
        "Lidio",
        "Misolidio",
        "Frigio",
        "Ionio"
      ],
      "explanation": "Il modo Lidio è caratterizzato dalla 4ª aumentata (#4 / #11) in un contesto maggiore.",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by the raised 4th (#4 / #11) in a major context?",
      "options": [
        "Lydian",
        "Mixolydian",
        "Phrygian",
        "Ionian"
      ],
      "explanation": "The Lydian mode is characterised by the raised 4th (#4 / #11) in a major context.",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 723,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale modo è caratterizzato dalla 3ª maggiore insieme alla 7ª minore (3 + b7)?",
      "options": [
        "Eolio",
        "Dorico",
        "Misolidio",
        "Ionio"
      ],
      "explanation": "Il modo Misolidio è caratterizzato dalla 3ª maggiore insieme alla 7ª minore (3 + b7).",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by a major 3rd together with a minor 7th (3 + b7)?",
      "options": [
        "Aeolian",
        "Dorian",
        "Mixolydian",
        "Ionian"
      ],
      "explanation": "The Mixolydian mode is characterised by a major 3rd together with a minor 7th (3 + b7).",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 724,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale modo è caratterizzato dalla 6ª maggiore in un contesto minore (b3 + 6)?",
      "options": [
        "Locrio",
        "Eolio",
        "Dorico",
        "Frigio"
      ],
      "explanation": "Il modo Dorico è caratterizzato dalla 6ª maggiore in un contesto minore (b3 + 6).",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by a major 6th in a minor context (b3 + 6)?",
      "options": [
        "Locrian",
        "Aeolian",
        "Dorian",
        "Phrygian"
      ],
      "explanation": "The Dorian mode is characterised by a major 6th in a minor context (b3 + 6).",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 725,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale modo è caratterizzato dalla 2ª minore (b2) con la 5ª giusta?",
      "options": [
        "Locrio",
        "Ionio",
        "Dorico",
        "Frigio"
      ],
      "explanation": "Il modo Frigio è caratterizzato dalla 2ª minore (b2) con la 5ª giusta.",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by a minor 2nd (b2) with a perfect 5th?",
      "options": [
        "Locrian",
        "Ionian",
        "Dorian",
        "Phrygian"
      ],
      "explanation": "The Phrygian mode is characterised by a minor 2nd (b2) with a perfect 5th.",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 726,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale modo è caratterizzato dalla 5ª diminuita (b5) insieme alla 2ª minore (b2)?",
      "options": [
        "Misolidio",
        "Locrio",
        "Ionio",
        "Frigio"
      ],
      "explanation": "Il modo Locrio è caratterizzato dalla 5ª diminuita (b5) insieme alla 2ª minore (b2).",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by a diminished 5th (b5) together with a minor 2nd (b2)?",
      "options": [
        "Mixolydian",
        "Locrian",
        "Ionian",
        "Phrygian"
      ],
      "explanation": "The Locrian mode is characterised by a diminished 5th (b5) together with a minor 2nd (b2).",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 727,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale modo è caratterizzato da 2ª maggiore, 3ª minore, 6ª minore e 7ª minore (il minore naturale)?",
      "options": [
        "Eolio",
        "Locrio",
        "Frigio",
        "Misolidio"
      ],
      "explanation": "Il modo Eolio è caratterizzato da 2ª maggiore, 3ª minore, 6ª minore e 7ª minore (il minore naturale).",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by major 2nd, minor 3rd, minor 6th and minor 7th (natural minor)?",
      "options": [
        "Aeolian",
        "Locrian",
        "Phrygian",
        "Mixolydian"
      ],
      "explanation": "The Aeolian mode is characterised by major 2nd, minor 3rd, minor 6th and minor 7th (natural minor).",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 728,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale modo è caratterizzato da nessuna alterazione rispetto alla scala maggiore?",
      "options": [
        "Misolidio",
        "Eolio",
        "Dorico",
        "Ionio"
      ],
      "explanation": "Il modo Ionio è caratterizzato da nessuna alterazione rispetto alla scala maggiore.",
      "sub": "Caratteristiche modali"
    },
    "en": {
      "question": "Which mode is characterised by no alterations compared with the major scale?",
      "options": [
        "Mixolydian",
        "Aeolian",
        "Dorian",
        "Ionian"
      ],
      "explanation": "The Ionian mode is characterised by no alterations compared with the major scale.",
      "sub": "Mode characteristics"
    }
  },
  {
    "id": 729,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Ionio?",
      "options": [
        "maj7#11",
        "m7b5",
        "maj7",
        "m7"
      ],
      "explanation": "Lo Ionio parte dal grado I: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo maj7 (1 – 3 – 5 – 7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Ionian mode?",
      "options": [
        "maj7#11",
        "m7b5",
        "maj7",
        "m7"
      ],
      "explanation": "Ionian starts on degree I: stacking its 1, 3, 5 and 7 gives a maj7 chord (1 – 3 – 5 – 7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 730,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Dorico?",
      "options": [
        "m7",
        "m7b5",
        "maj7",
        "mMaj7"
      ],
      "explanation": "Il Dorico parte dal grado II: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo m7 (1 – b3 – 5 – b7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Dorian mode?",
      "options": [
        "m7",
        "m7b5",
        "maj7",
        "mMaj7"
      ],
      "explanation": "Dorian starts on degree II: stacking its 1, 3, 5 and 7 gives a m7 chord (1 – b3 – 5 – b7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 731,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Frigio?",
      "options": [
        "mMaj7",
        "maj7#11",
        "7",
        "m7"
      ],
      "explanation": "Il Frigio parte dal grado III: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo m7 (1 – b3 – 5 – b7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Phrygian mode?",
      "options": [
        "mMaj7",
        "maj7#11",
        "7",
        "m7"
      ],
      "explanation": "Phrygian starts on degree III: stacking its 1, 3, 5 and 7 gives a m7 chord (1 – b3 – 5 – b7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 732,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Lidio?",
      "options": [
        "maj7",
        "mMaj7",
        "dim7",
        "7"
      ],
      "explanation": "Il Lidio parte dal grado IV: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo maj7 (1 – 3 – 5 – 7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Lydian mode?",
      "options": [
        "maj7",
        "mMaj7",
        "dim7",
        "7"
      ],
      "explanation": "Lydian starts on degree IV: stacking its 1, 3, 5 and 7 gives a maj7 chord (1 – 3 – 5 – 7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 733,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Misolidio?",
      "options": [
        "7",
        "mMaj7",
        "maj7#11",
        "dim7"
      ],
      "explanation": "Il Misolidio parte dal grado V: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo 7 (1 – 3 – 5 – b7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Mixolydian mode?",
      "options": [
        "7",
        "mMaj7",
        "maj7#11",
        "dim7"
      ],
      "explanation": "Mixolydian starts on degree V: stacking its 1, 3, 5 and 7 gives a 7 chord (1 – 3 – 5 – b7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 734,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Eolio?",
      "options": [
        "maj7",
        "m7",
        "maj7#11",
        "m7b5"
      ],
      "explanation": "L'Eolio parte dal grado VI: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo m7 (1 – b3 – 5 – b7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Aeolian mode?",
      "options": [
        "maj7",
        "m7",
        "maj7#11",
        "m7b5"
      ],
      "explanation": "Aeolian starts on degree VI: stacking its 1, 3, 5 and 7 gives a m7 chord (1 – b3 – 5 – b7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 735,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale accordo di settima si ottiene sovrapponendo terze nel modo Locrio?",
      "options": [
        "m7",
        "dim7",
        "m7b5",
        "maj7"
      ],
      "explanation": "Il Locrio parte dal grado VII: sovrapponendo 1, 3, 5 e 7 del modo si ottiene un accordo m7b5 (1 – b3 – b5 – b7).",
      "sub": "Modi e accordi"
    },
    "en": {
      "question": "Which seventh chord do you get by stacking thirds in the Locrian mode?",
      "options": [
        "m7",
        "dim7",
        "m7b5",
        "maj7"
      ],
      "explanation": "Locrian starts on degree VII: stacking its 1, 3, 5 and 7 gives a m7b5 chord (1 – b3 – b5 – b7).",
      "sub": "Modes and chords"
    }
  },
  {
    "id": 736,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa caratterizza la cadenza autentica perfetta?",
      "options": [
        "IV → I (la cadenza \"Amen\")",
        "V7 → vi invece di V7 → I",
        "iv6 → V nel minore (il basso scende di semitono)",
        "V(7) → I, entrambi in stato fondamentale e tonica al soprano"
      ],
      "explanation": "Cadenza autentica perfetta: V(7) → I, entrambi in stato fondamentale e tonica al soprano.",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the perfect authentic cadence?",
      "options": [
        "IV → I (the \"Amen\" cadence)",
        "V7 → vi instead of V7 → I",
        "iv6 → V in minor (the bass falls a semitone)",
        "V(7) → I, both in root position with the tonic in the soprano"
      ],
      "explanation": "Perfect authentic cadence: V(7) → I, both in root position with the tonic in the soprano.",
      "sub": "Cadences"
    }
  },
  {
    "id": 737,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa caratterizza la cadenza plagale?",
      "options": [
        "V7 → vi invece di V7 → I",
        "un accordo qualsiasi → V (la frase resta in sospeso)",
        "i → bVII → bVI → V (tipica del flamenco)",
        "IV → I (la cadenza \"Amen\")"
      ],
      "explanation": "Cadenza plagale: IV → I (la cadenza \"Amen\").",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the plagal cadence?",
      "options": [
        "V7 → vi instead of V7 → I",
        "any chord → V (the phrase is left hanging)",
        "i → bVII → bVI → V (typical of flamenco)",
        "IV → I (the \"Amen\" cadence)"
      ],
      "explanation": "Plagal cadence: IV → I (the \"Amen\" cadence).",
      "sub": "Cadences"
    }
  },
  {
    "id": 738,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa caratterizza la cadenza evitata (d'inganno)?",
      "options": [
        "un accordo qualsiasi → V (la frase resta in sospeso)",
        "iv6 → V nel minore (il basso scende di semitono)",
        "V(7) → I, entrambi in stato fondamentale e tonica al soprano",
        "V7 → vi invece di V7 → I"
      ],
      "explanation": "Cadenza evitata (d'inganno): V7 → vi invece di V7 → I.",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the deceptive cadence?",
      "options": [
        "any chord → V (the phrase is left hanging)",
        "iv6 → V in minor (the bass falls a semitone)",
        "V(7) → I, both in root position with the tonic in the soprano",
        "V7 → vi instead of V7 → I"
      ],
      "explanation": "Deceptive cadence: V7 → vi instead of V7 → I.",
      "sub": "Cadences"
    }
  },
  {
    "id": 739,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa caratterizza la cadenza sospesa (semicadenza)?",
      "options": [
        "iv6 → V nel minore (il basso scende di semitono)",
        "i → bVII → bVI → V (tipica del flamenco)",
        "un accordo qualsiasi → V (la frase resta in sospeso)",
        "IV → I (la cadenza \"Amen\")"
      ],
      "explanation": "Cadenza sospesa (semicadenza): un accordo qualsiasi → V (la frase resta in sospeso).",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the half cadence?",
      "options": [
        "iv6 → V in minor (the bass falls a semitone)",
        "i → bVII → bVI → V (typical of flamenco)",
        "any chord → V (the phrase is left hanging)",
        "IV → I (the \"Amen\" cadence)"
      ],
      "explanation": "Half cadence: any chord → V (the phrase is left hanging).",
      "sub": "Cadences"
    }
  },
  {
    "id": 740,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa caratterizza la cadenza frigia?",
      "options": [
        "iv6 → V nel minore (il basso scende di semitono)",
        "i → bVII → bVI → V (tipica del flamenco)",
        "V(7) → I, entrambi in stato fondamentale e tonica al soprano",
        "V7 → vi invece di V7 → I"
      ],
      "explanation": "Cadenza frigia: iv6 → V nel minore (il basso scende di semitono).",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the Phrygian cadence?",
      "options": [
        "iv6 → V in minor (the bass falls a semitone)",
        "i → bVII → bVI → V (typical of flamenco)",
        "V(7) → I, both in root position with the tonic in the soprano",
        "V7 → vi instead of V7 → I"
      ],
      "explanation": "Phrygian cadence: iv6 → V in minor (the bass falls a semitone).",
      "sub": "Cadences"
    }
  },
  {
    "id": 741,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa caratterizza la cadenza andalusa?",
      "options": [
        "i → bVII → bVI → V (tipica del flamenco)",
        "V(7) → I, entrambi in stato fondamentale e tonica al soprano",
        "IV → I (la cadenza \"Amen\")",
        "un accordo qualsiasi → V (la frase resta in sospeso)"
      ],
      "explanation": "Cadenza andalusa: i → bVII → bVI → V (tipica del flamenco).",
      "sub": "Cadenze"
    },
    "en": {
      "question": "What characterises the Andalusian cadence?",
      "options": [
        "i → bVII → bVI → V (typical of flamenco)",
        "V(7) → I, both in root position with the tonic in the soprano",
        "IV → I (the \"Amen\" cadence)",
        "any chord → V (the phrase is left hanging)"
      ],
      "explanation": "Andalusian cadence: i → bVII → bVI → V (typical of flamenco).",
      "sub": "Cadences"
    }
  },
  {
    "id": 742,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la relativa maggiore di A minore?",
      "options": [
        "A maggiore",
        "D maggiore",
        "C# maggiore",
        "C maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: A → C. Le due tonalità condividono l'armatura (nessuna alterazione).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of A minor?",
      "options": [
        "A major",
        "D major",
        "C# major",
        "C major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: A → C. Both keys share the key signature (no accidentals).",
      "sub": "Keys"
    }
  },
  {
    "id": 743,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la relativa maggiore di Bb minore?",
      "options": [
        "Bb maggiore",
        "Db maggiore",
        "Eb maggiore",
        "D maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: Bb → Db. Le due tonalità condividono l'armatura (5 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of Bb minor?",
      "options": [
        "Bb major",
        "Db major",
        "Eb major",
        "D major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: Bb → Db. Both keys share the key signature (5 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 744,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di B minore?",
      "options": [
        "D maggiore",
        "B maggiore",
        "E maggiore",
        "Eb maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: B → D. Le due tonalità condividono l'armatura (2 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of B minor?",
      "options": [
        "D major",
        "B major",
        "E major",
        "Eb major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: B → D. Both keys share the key signature (2 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 745,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la relativa maggiore di C minore?",
      "options": [
        "C maggiore",
        "Eb maggiore",
        "F maggiore",
        "Ab maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: C → Eb. Le due tonalità condividono l'armatura (3 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of C minor?",
      "options": [
        "C major",
        "Eb major",
        "F major",
        "Ab major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: C → Eb. Both keys share the key signature (3 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 746,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di C# minore?",
      "options": [
        "E maggiore",
        "C# maggiore",
        "F# maggiore",
        "Ab maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: C# → E. Le due tonalità condividono l'armatura (4 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of C# minor?",
      "options": [
        "E major",
        "C# major",
        "F# major",
        "Ab major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: C# → E. Both keys share the key signature (4 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 747,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la relativa maggiore di D minore?",
      "options": [
        "D maggiore",
        "F maggiore",
        "G maggiore",
        "Bb maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: D → F. Le due tonalità condividono l'armatura (1 bemolle).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of D minor?",
      "options": [
        "D major",
        "F major",
        "G major",
        "Bb major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: D → F. Both keys share the key signature (1 flat).",
      "sub": "Keys"
    }
  },
  {
    "id": 748,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di Eb minore?",
      "options": [
        "Gb maggiore",
        "Eb maggiore",
        "Ab maggiore",
        "Bb maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: Eb → Gb. Le due tonalità condividono l'armatura (6 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of Eb minor?",
      "options": [
        "Gb major",
        "Eb major",
        "Ab major",
        "Bb major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: Eb → Gb. Both keys share the key signature (6 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 749,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di E minore?",
      "options": [
        "G maggiore",
        "E maggiore",
        "A maggiore",
        "C maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: E → G. Le due tonalità condividono l'armatura (1 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of E minor?",
      "options": [
        "G major",
        "E major",
        "A major",
        "C major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: E → G. Both keys share the key signature (1 sharp).",
      "sub": "Keys"
    }
  },
  {
    "id": 750,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di F minore?",
      "options": [
        "Ab maggiore",
        "F maggiore",
        "Bb maggiore",
        "A maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: F → Ab. Le due tonalità condividono l'armatura (4 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of F minor?",
      "options": [
        "Ab major",
        "F major",
        "Bb major",
        "A major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: F → Ab. Both keys share the key signature (4 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 751,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la relativa maggiore di F# minore?",
      "options": [
        "A maggiore",
        "F# maggiore",
        "B maggiore",
        "C# maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: F# → A. Le due tonalità condividono l'armatura (3 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of F# minor?",
      "options": [
        "A major",
        "F# major",
        "B major",
        "C# major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: F# → A. Both keys share the key signature (3 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 752,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la relativa maggiore di G minore?",
      "options": [
        "G maggiore",
        "C maggiore",
        "B maggiore",
        "Bb maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: G → Bb. Le due tonalità condividono l'armatura (2 bemolli).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of G minor?",
      "options": [
        "G major",
        "C major",
        "B major",
        "Bb major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: G → Bb. Both keys share the key signature (2 flats).",
      "sub": "Keys"
    }
  },
  {
    "id": 753,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la relativa maggiore di G# minore?",
      "options": [
        "Ab maggiore",
        "C# maggiore",
        "F# maggiore",
        "B maggiore"
      ],
      "explanation": "La relativa maggiore si trova una terza minore sopra la tonica minore: G# → B. Le due tonalità condividono l'armatura (5 diesis).",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the relative major of G# minor?",
      "options": [
        "Ab major",
        "C# major",
        "F# major",
        "B major"
      ],
      "explanation": "The relative major is a minor third above the minor tonic: G# → B. Both keys share the key signature (5 sharps).",
      "sub": "Keys"
    }
  },
  {
    "id": 754,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la parallela minore di C maggiore?",
      "options": [
        "A minore",
        "D minore",
        "C minore",
        "G minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (C) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of C major?",
      "options": [
        "A minor",
        "D minor",
        "C minor",
        "G minor"
      ],
      "explanation": "The parallel minor has the same tonic (C) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 755,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la parallela minore di Db maggiore?",
      "options": [
        "Db minore",
        "Bb minore",
        "Ab minore",
        "Eb minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (Db) ma 3ª, 6ª e 7ª abbassate. In pratica Db minore si scrive quasi sempre come C# minore, per evitare un'armatura teorica.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of Db major?",
      "options": [
        "Db minor",
        "Bb minor",
        "Ab minor",
        "Eb minor"
      ],
      "explanation": "The parallel minor has the same tonic (Db) with lowered 3rd, 6th and 7th. In practice Db minor is almost always written as C# minor, to avoid a theoretical key signature.",
      "sub": "Keys"
    }
  },
  {
    "id": 756,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è la parallela minore di D maggiore?",
      "options": [
        "B minore",
        "D minore",
        "A minore",
        "E minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (D) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of D major?",
      "options": [
        "B minor",
        "D minor",
        "A minor",
        "E minor"
      ],
      "explanation": "The parallel minor has the same tonic (D) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 757,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la parallela minore di Eb maggiore?",
      "options": [
        "Eb minore",
        "C minore",
        "G minore",
        "Bb minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (Eb) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of Eb major?",
      "options": [
        "Eb minor",
        "C minor",
        "G minor",
        "Bb minor"
      ],
      "explanation": "The parallel minor has the same tonic (Eb) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 758,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la parallela minore di E maggiore?",
      "options": [
        "C# minore",
        "B minore",
        "E minore",
        "G# minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (E) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of E major?",
      "options": [
        "C# minor",
        "B minor",
        "E minor",
        "G# minor"
      ],
      "explanation": "The parallel minor has the same tonic (E) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 759,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la parallela minore di F maggiore?",
      "options": [
        "D minore",
        "A minore",
        "Bb minore",
        "F minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (F) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of F major?",
      "options": [
        "D minor",
        "A minor",
        "Bb minor",
        "F minor"
      ],
      "explanation": "The parallel minor has the same tonic (F) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 760,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la parallela minore di Gb maggiore?",
      "options": [
        "Eb minore",
        "Bb minore",
        "Ab minore",
        "Gb minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (Gb) ma 3ª, 6ª e 7ª abbassate. In pratica Gb minore si scrive quasi sempre come F# minore, per evitare un'armatura teorica.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of Gb major?",
      "options": [
        "Eb minor",
        "Bb minor",
        "Ab minor",
        "Gb minor"
      ],
      "explanation": "The parallel minor has the same tonic (Gb) with lowered 3rd, 6th and 7th. In practice Gb minor is almost always written as F# minor, to avoid a theoretical key signature.",
      "sub": "Keys"
    }
  },
  {
    "id": 761,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la parallela minore di G maggiore?",
      "options": [
        "E minore",
        "A minore",
        "B minore",
        "G minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (G) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of G major?",
      "options": [
        "E minor",
        "A minor",
        "B minor",
        "G minor"
      ],
      "explanation": "The parallel minor has the same tonic (G) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 762,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è la parallela minore di Ab maggiore?",
      "options": [
        "F minore",
        "Db minore",
        "Eb minore",
        "Ab minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (Ab) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of Ab major?",
      "options": [
        "F minor",
        "Db minor",
        "Eb minor",
        "Ab minor"
      ],
      "explanation": "The parallel minor has the same tonic (Ab) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 763,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la parallela minore di A maggiore?",
      "options": [
        "F# minore",
        "B minore",
        "A minore",
        "E minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (A) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of A major?",
      "options": [
        "F# minor",
        "B minor",
        "A minor",
        "E minor"
      ],
      "explanation": "The parallel minor has the same tonic (A) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 764,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è la parallela minore di Bb maggiore?",
      "options": [
        "Bb minore",
        "G minore",
        "D minore",
        "C minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (Bb) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of Bb major?",
      "options": [
        "Bb minor",
        "G minor",
        "D minor",
        "C minor"
      ],
      "explanation": "The parallel minor has the same tonic (Bb) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 765,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è la parallela minore di B maggiore?",
      "options": [
        "G# minore",
        "C# minore",
        "B minore",
        "F# minore"
      ],
      "explanation": "La parallela minore ha la stessa tonica (B) ma 3ª, 6ª e 7ª abbassate.",
      "sub": "Tonalità"
    },
    "en": {
      "question": "What is the parallel minor of B major?",
      "options": [
        "G# minor",
        "C# minor",
        "B minor",
        "F# minor"
      ],
      "explanation": "The parallel minor has the same tonic (B) with lowered 3rd, 6th and 7th.",
      "sub": "Keys"
    }
  },
  {
    "id": 766,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è l'enarmonico di C#?",
      "options": [
        "Cb",
        "Db",
        "G#",
        "Eb"
      ],
      "explanation": "C# e Db sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of C#?",
      "options": [
        "Cb",
        "Db",
        "G#",
        "Eb"
      ],
      "explanation": "C# and Db are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 767,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è l'enarmonico di Db?",
      "options": [
        "D#",
        "C#",
        "E#",
        "Cb"
      ],
      "explanation": "Db e C# sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of Db?",
      "options": [
        "D#",
        "C#",
        "E#",
        "Cb"
      ],
      "explanation": "Db and C# are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 768,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è l'enarmonico di D#?",
      "options": [
        "Eb",
        "A#",
        "Fb",
        "C#"
      ],
      "explanation": "D# e Eb sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of D#?",
      "options": [
        "Eb",
        "A#",
        "Fb",
        "C#"
      ],
      "explanation": "D# and Eb are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 769,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è l'enarmonico di Eb?",
      "options": [
        "Db",
        "D#",
        "F#",
        "G#"
      ],
      "explanation": "Eb e D# sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of Eb?",
      "options": [
        "Db",
        "D#",
        "F#",
        "G#"
      ],
      "explanation": "Eb and D# are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 770,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è l'enarmonico di F#?",
      "options": [
        "C#",
        "Gb",
        "Fb",
        "Ab"
      ],
      "explanation": "F# e Gb sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of F#?",
      "options": [
        "C#",
        "Gb",
        "Fb",
        "Ab"
      ],
      "explanation": "F# and Gb are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 771,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Qual è l'enarmonico di Gb?",
      "options": [
        "A",
        "F#",
        "Db",
        "B#"
      ],
      "explanation": "Gb e F# sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of Gb?",
      "options": [
        "A",
        "F#",
        "Db",
        "B#"
      ],
      "explanation": "Gb and F# are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 772,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è l'enarmonico di G#?",
      "options": [
        "F#",
        "Bb",
        "Ab",
        "D#"
      ],
      "explanation": "G# e Ab sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of G#?",
      "options": [
        "F#",
        "Bb",
        "Ab",
        "D#"
      ],
      "explanation": "G# and Ab are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 773,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Qual è l'enarmonico di Ab?",
      "options": [
        "Eb",
        "A#",
        "C#",
        "G#"
      ],
      "explanation": "Ab e G# sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of Ab?",
      "options": [
        "Eb",
        "A#",
        "C#",
        "G#"
      ],
      "explanation": "Ab and G# are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 774,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Qual è l'enarmonico di A#?",
      "options": [
        "Bb",
        "E#",
        "Ab",
        "B"
      ],
      "explanation": "A# e Bb sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of A#?",
      "options": [
        "Bb",
        "E#",
        "Ab",
        "B"
      ],
      "explanation": "A# and Bb are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 775,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Qual è l'enarmonico di Bb?",
      "options": [
        "Fb",
        "Ab",
        "A#",
        "C#"
      ],
      "explanation": "Bb e A# sono lo stesso suono scritto con due nomi diversi (enarmonia).",
      "sub": "Enarmonia"
    },
    "en": {
      "question": "What is the enharmonic equivalent of Bb?",
      "options": [
        "Fb",
        "Ab",
        "A#",
        "C#"
      ],
      "explanation": "Bb and A# are the same pitch spelled with two different names (enharmonic equivalents).",
      "sub": "Enharmonics"
    }
  },
  {
    "id": 776,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di C maggiore?",
      "options": [
        "1",
        "2",
        "7",
        "0"
      ],
      "explanation": "C maggiore non ha alterazioni in chiave.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of C major?",
      "options": [
        "1",
        "2",
        "7",
        "0"
      ],
      "explanation": "C major has no sharps or flats.",
      "sub": "Key signature"
    }
  },
  {
    "id": 777,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di G maggiore?",
      "options": [
        "2",
        "0",
        "3",
        "1"
      ],
      "explanation": "G maggiore ha 1 diesis in chiave: F#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of G major?",
      "options": [
        "2",
        "0",
        "3",
        "1"
      ],
      "explanation": "G major has 1 sharp in its key signature: F#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 778,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di D maggiore?",
      "options": [
        "3",
        "1",
        "0",
        "2"
      ],
      "explanation": "D maggiore ha 2 diesis in chiave: F#, C#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of D major?",
      "options": [
        "3",
        "1",
        "0",
        "2"
      ],
      "explanation": "D major has 2 sharps in its key signature: F#, C#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 779,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di A maggiore?",
      "options": [
        "3",
        "4",
        "2",
        "1"
      ],
      "explanation": "A maggiore ha 3 diesis in chiave: F#, C#, G#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of A major?",
      "options": [
        "3",
        "4",
        "2",
        "1"
      ],
      "explanation": "A major has 3 sharps in its key signature: F#, C#, G#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 780,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di E maggiore?",
      "options": [
        "5",
        "3",
        "7",
        "4"
      ],
      "explanation": "E maggiore ha 4 diesis in chiave: F#, C#, G#, D#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of E major?",
      "options": [
        "5",
        "3",
        "7",
        "4"
      ],
      "explanation": "E major has 4 sharps in its key signature: F#, C#, G#, D#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 781,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di B maggiore?",
      "options": [
        "6",
        "5",
        "4",
        "2"
      ],
      "explanation": "B maggiore ha 5 diesis in chiave: F#, C#, G#, D#, A#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of B major?",
      "options": [
        "6",
        "5",
        "4",
        "2"
      ],
      "explanation": "B major has 5 sharps in its key signature: F#, C#, G#, D#, A#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 782,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti diesis ci sono nell'armatura di F# maggiore?",
      "options": [
        "7",
        "6",
        "5",
        "4"
      ],
      "explanation": "F# maggiore ha 6 diesis in chiave: F#, C#, G#, D#, A#, E#.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many sharps are in the key signature of F# major?",
      "options": [
        "7",
        "6",
        "5",
        "4"
      ],
      "explanation": "F# major has 6 sharps in its key signature: F#, C#, G#, D#, A#, E#.",
      "sub": "Key signature"
    }
  },
  {
    "id": 783,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di F maggiore?",
      "options": [
        "2",
        "1",
        "0",
        "3"
      ],
      "explanation": "F maggiore ha 1 bemolle in chiave: Bb.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of F major?",
      "options": [
        "2",
        "1",
        "0",
        "3"
      ],
      "explanation": "F major has 1 flat in its key signature: Bb.",
      "sub": "Key signature"
    }
  },
  {
    "id": 784,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di Bb maggiore?",
      "options": [
        "3",
        "1",
        "5",
        "2"
      ],
      "explanation": "Bb maggiore ha 2 bemolli in chiave: Bb, Eb.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of Bb major?",
      "options": [
        "3",
        "1",
        "5",
        "2"
      ],
      "explanation": "Bb major has 2 flats in its key signature: Bb, Eb.",
      "sub": "Key signature"
    }
  },
  {
    "id": 785,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di Eb maggiore?",
      "options": [
        "4",
        "2",
        "6",
        "3"
      ],
      "explanation": "Eb maggiore ha 3 bemolli in chiave: Bb, Eb, Ab.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of Eb major?",
      "options": [
        "4",
        "2",
        "6",
        "3"
      ],
      "explanation": "Eb major has 3 flats in its key signature: Bb, Eb, Ab.",
      "sub": "Key signature"
    }
  },
  {
    "id": 786,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di Ab maggiore?",
      "options": [
        "5",
        "3",
        "4",
        "6"
      ],
      "explanation": "Ab maggiore ha 4 bemolli in chiave: Bb, Eb, Ab, Db.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of Ab major?",
      "options": [
        "5",
        "3",
        "4",
        "6"
      ],
      "explanation": "Ab major has 4 flats in its key signature: Bb, Eb, Ab, Db.",
      "sub": "Key signature"
    }
  },
  {
    "id": 787,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di Db maggiore?",
      "options": [
        "6",
        "4",
        "2",
        "5"
      ],
      "explanation": "Db maggiore ha 5 bemolli in chiave: Bb, Eb, Ab, Db, Gb.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of Db major?",
      "options": [
        "6",
        "4",
        "2",
        "5"
      ],
      "explanation": "Db major has 5 flats in its key signature: Bb, Eb, Ab, Db, Gb.",
      "sub": "Key signature"
    }
  },
  {
    "id": 788,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quanti bemolli ci sono nell'armatura di Gb maggiore?",
      "options": [
        "6",
        "7",
        "5",
        "1"
      ],
      "explanation": "Gb maggiore ha 6 bemolli in chiave: Bb, Eb, Ab, Db, Gb, Cb.",
      "sub": "Armatura"
    },
    "en": {
      "question": "How many flats are in the key signature of Gb major?",
      "options": [
        "6",
        "7",
        "5",
        "1"
      ],
      "explanation": "Gb major has 6 flats in its key signature: Bb, Eb, Ab, Db, Gb, Cb.",
      "sub": "Key signature"
    }
  },
  {
    "id": 789,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 4/4?",
      "options": [
        "4",
        "2",
        "6",
        "8"
      ],
      "explanation": "4/4 è un tempo semplice: 4 movimenti da un quarto.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 4/4 have?",
      "options": [
        "4",
        "2",
        "6",
        "8"
      ],
      "explanation": "4/4 is a simple meter: 4 quarter-note beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 790,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 3/4?",
      "options": [
        "2",
        "4",
        "3",
        "6"
      ],
      "explanation": "3/4 è un tempo semplice: 3 movimenti da un quarto.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 3/4 have?",
      "options": [
        "2",
        "4",
        "3",
        "6"
      ],
      "explanation": "3/4 is a simple meter: 3 quarter-note beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 791,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 2/4?",
      "options": [
        "4",
        "3",
        "2",
        "8"
      ],
      "explanation": "2/4 è un tempo semplice: 2 movimenti da un quarto.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 2/4 have?",
      "options": [
        "4",
        "3",
        "2",
        "8"
      ],
      "explanation": "2/4 is a simple meter: 2 quarter-note beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 792,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 6/8?",
      "options": [
        "6",
        "2",
        "3",
        "4"
      ],
      "explanation": "6/8 è un tempo composto: 6 ottavi raggruppati in 2 movimenti da un quarto puntato.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 6/8 have?",
      "options": [
        "6",
        "2",
        "3",
        "4"
      ],
      "explanation": "6/8 is a compound meter: 6 eighth notes grouped into 2 dotted-quarter beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 793,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 9/8?",
      "options": [
        "9",
        "3",
        "2",
        "4"
      ],
      "explanation": "9/8 è un tempo composto: 9 ottavi raggruppati in 3 movimenti da un quarto puntato.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 9/8 have?",
      "options": [
        "9",
        "3",
        "2",
        "4"
      ],
      "explanation": "9/8 is a compound meter: 9 eighth notes grouped into 3 dotted-quarter beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 794,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 12/8?",
      "options": [
        "12",
        "3",
        "6",
        "4"
      ],
      "explanation": "12/8 è un tempo composto: 12 ottavi raggruppati in 4 movimenti da un quarto puntato.",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 12/8 have?",
      "options": [
        "12",
        "3",
        "6",
        "4"
      ],
      "explanation": "12/8 is a compound meter: 12 eighth notes grouped into 4 dotted-quarter beats.",
      "sub": "Time signatures"
    }
  },
  {
    "id": 795,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quanti movimenti (pulsazioni principali) ha una battuta in 5/4?",
      "options": [
        "5",
        "4",
        "3",
        "10"
      ],
      "explanation": "5/4 è un tempo semplice: 5 movimenti da un quarto (spesso 3 + 2).",
      "sub": "Misura"
    },
    "en": {
      "question": "How many main beats does a bar of 5/4 have?",
      "options": [
        "5",
        "4",
        "3",
        "10"
      ],
      "explanation": "5/4 is a simple meter: 5 quarter-note beats (often 3 + 2).",
      "sub": "Time signatures"
    }
  },
  {
    "id": 796,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti ottavi contiene una battuta in 7/8?",
      "options": [
        "8",
        "7",
        "6",
        "14"
      ],
      "explanation": "7/8 contiene 7 ottavi, raggruppati in modo irregolare (es. 2 + 2 + 3).",
      "sub": "Misura"
    },
    "en": {
      "question": "How many eighth notes fit in a bar of 7/8?",
      "options": [
        "8",
        "7",
        "6",
        "14"
      ],
      "explanation": "7/8 holds 7 eighth notes in an irregular grouping (e.g. 2 + 2 + 3).",
      "sub": "Time signatures"
    }
  },
  {
    "id": 797,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti ottavi contiene una battuta in 11/8?",
      "options": [
        "12",
        "7",
        "11",
        "9"
      ],
      "explanation": "11/8 contiene 11 ottavi, raggruppati in modo irregolare (es. 3 + 3 + 3 + 2).",
      "sub": "Misura"
    },
    "en": {
      "question": "How many eighth notes fit in a bar of 11/8?",
      "options": [
        "12",
        "7",
        "11",
        "9"
      ],
      "explanation": "11/8 holds 11 eighth notes in an irregular grouping (e.g. 3 + 3 + 3 + 2).",
      "sub": "Time signatures"
    }
  },
  {
    "id": 798,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di C maggiore?",
      "options": [
        "C, D, E#, F, G, A, B",
        "C, D, Eb, F, G, A, B",
        "C, D, E, F, G, A, B",
        "C, D, E, Fb, G, A, B"
      ],
      "explanation": "C maggiore (T T S T T T S): C, D, E, F, G, A, B. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the C major scale?",
      "options": [
        "C, D, E#, F, G, A, B",
        "C, D, Eb, F, G, A, B",
        "C, D, E, F, G, A, B",
        "C, D, E, Fb, G, A, B"
      ],
      "explanation": "C major (W W H W W W H): C, D, E, F, G, A, B. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 799,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di Db maggiore?",
      "options": [
        "Db, Eb, F, Gb, A, Bb, C",
        "Db, Eb, F, G, Ab, Bb, C",
        "Db, Eb, F, Gb, Ab, Bb, C",
        "Db, Eb, F, Gb, Ab, B, C"
      ],
      "explanation": "Db maggiore (T T S T T T S): Db, Eb, F, Gb, Ab, Bb, C. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Db major scale?",
      "options": [
        "Db, Eb, F, Gb, A, Bb, C",
        "Db, Eb, F, G, Ab, Bb, C",
        "Db, Eb, F, Gb, Ab, Bb, C",
        "Db, Eb, F, Gb, Ab, B, C"
      ],
      "explanation": "Db major (W W H W W W H): Db, Eb, F, Gb, Ab, Bb, C. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 800,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala di D maggiore?",
      "options": [
        "D, E, F#, G, A, B, C",
        "D, E, F, G, A, B, C#",
        "D, E, F#, G, A#, B, C#",
        "D, E, F#, G, A, B, C#"
      ],
      "explanation": "D maggiore (T T S T T T S): D, E, F#, G, A, B, C#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the D major scale?",
      "options": [
        "D, E, F#, G, A, B, C",
        "D, E, F, G, A, B, C#",
        "D, E, F#, G, A#, B, C#",
        "D, E, F#, G, A, B, C#"
      ],
      "explanation": "D major (W W H W W W H): D, E, F#, G, A, B, C#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 801,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di Eb maggiore?",
      "options": [
        "Eb, F, G, Ab, Bb, C, D",
        "Eb, F, G, Ab, B, C, D",
        "Eb, F, G, Ab, Bb, C#, D",
        "Eb, F, G, Ab, Bb, Cb, D"
      ],
      "explanation": "Eb maggiore (T T S T T T S): Eb, F, G, Ab, Bb, C, D. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Eb major scale?",
      "options": [
        "Eb, F, G, Ab, Bb, C, D",
        "Eb, F, G, Ab, B, C, D",
        "Eb, F, G, Ab, Bb, C#, D",
        "Eb, F, G, Ab, Bb, Cb, D"
      ],
      "explanation": "Eb major (W W H W W W H): Eb, F, G, Ab, Bb, C, D. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 802,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di E maggiore?",
      "options": [
        "E, F, G#, A, B, C#, D#",
        "E, F#, G#, Ab, B, C#, D#",
        "E, F#, G#, A, B, C#, D#",
        "E, F#, G#, A#, B, C#, D#"
      ],
      "explanation": "E maggiore (T T S T T T S): E, F#, G#, A, B, C#, D#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the E major scale?",
      "options": [
        "E, F, G#, A, B, C#, D#",
        "E, F#, G#, Ab, B, C#, D#",
        "E, F#, G#, A, B, C#, D#",
        "E, F#, G#, A#, B, C#, D#"
      ],
      "explanation": "E major (W W H W W W H): E, F#, G#, A, B, C#, D#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 803,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di F maggiore?",
      "options": [
        "F, G, A, Bb, C, D, E",
        "F, G, Ab, Bb, C, D, E",
        "F, G, A#, Bb, C, D, E",
        "F, G, A, Bb, C, D, E#"
      ],
      "explanation": "F maggiore (T T S T T T S): F, G, A, Bb, C, D, E. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the F major scale?",
      "options": [
        "F, G, A, Bb, C, D, E",
        "F, G, Ab, Bb, C, D, E",
        "F, G, A#, Bb, C, D, E",
        "F, G, A, Bb, C, D, E#"
      ],
      "explanation": "F major (W W H W W W H): F, G, A, Bb, C, D, E. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 804,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala di Gb maggiore?",
      "options": [
        "Gb, Ab, B, Cb, Db, Eb, F",
        "Gb, A, Bb, Cb, Db, Eb, F",
        "Gb, Ab, Bb, Cb, D, Eb, F",
        "Gb, Ab, Bb, Cb, Db, Eb, F"
      ],
      "explanation": "Gb maggiore (T T S T T T S): Gb, Ab, Bb, Cb, Db, Eb, F (Cb suona come B). Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Gb major scale?",
      "options": [
        "Gb, Ab, B, Cb, Db, Eb, F",
        "Gb, A, Bb, Cb, Db, Eb, F",
        "Gb, Ab, Bb, Cb, D, Eb, F",
        "Gb, Ab, Bb, Cb, Db, Eb, F"
      ],
      "explanation": "Gb major (W W H W W W H): Gb, Ab, Bb, Cb, Db, Eb, F (Cb sounds as B). Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 805,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di G maggiore?",
      "options": [
        "G, A#, B, C, D, E, F#",
        "G, A, B, C, D, E, F#",
        "G, Ab, B, C, D, E, F#",
        "G, A, B, C, Db, E, F#"
      ],
      "explanation": "G maggiore (T T S T T T S): G, A, B, C, D, E, F#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the G major scale?",
      "options": [
        "G, A#, B, C, D, E, F#",
        "G, A, B, C, D, E, F#",
        "G, Ab, B, C, D, E, F#",
        "G, A, B, C, Db, E, F#"
      ],
      "explanation": "G major (W W H W W W H): G, A, B, C, D, E, F#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 806,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di Ab maggiore?",
      "options": [
        "Ab, Bb, C, Db, Eb, F, G",
        "Ab, Bb, C, Db, E, F, G",
        "Ab, Bb, C, Db, Eb, F, Gb",
        "Ab, Bb, C, Db, Eb, F, G#"
      ],
      "explanation": "Ab maggiore (T T S T T T S): Ab, Bb, C, Db, Eb, F, G. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Ab major scale?",
      "options": [
        "Ab, Bb, C, Db, Eb, F, G",
        "Ab, Bb, C, Db, E, F, G",
        "Ab, Bb, C, Db, Eb, F, Gb",
        "Ab, Bb, C, Db, Eb, F, G#"
      ],
      "explanation": "Ab major (W W H W W W H): Ab, Bb, C, Db, Eb, F, G. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 807,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di A maggiore?",
      "options": [
        "A, B, C#, D, E, F#, G#",
        "A, B, C#, D, E#, F#, G#",
        "A, B, C#, D, Eb, F#, G#",
        "A, B, C#, Db, E, F#, G#"
      ],
      "explanation": "A maggiore (T T S T T T S): A, B, C#, D, E, F#, G#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the A major scale?",
      "options": [
        "A, B, C#, D, E, F#, G#",
        "A, B, C#, D, E#, F#, G#",
        "A, B, C#, D, Eb, F#, G#",
        "A, B, C#, Db, E, F#, G#"
      ],
      "explanation": "A major (W W H W W W H): A, B, C#, D, E, F#, G#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 808,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di Bb maggiore?",
      "options": [
        "Bb, C, D, Eb, F, G#, A",
        "Bb, C, D, Eb, F, G, A",
        "Bb, C, D, Eb, F, Gb, A",
        "Bb, C, D, E, F, G, A"
      ],
      "explanation": "Bb maggiore (T T S T T T S): Bb, C, D, Eb, F, G, A. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Bb major scale?",
      "options": [
        "Bb, C, D, Eb, F, G#, A",
        "Bb, C, D, Eb, F, G, A",
        "Bb, C, D, Eb, F, Gb, A",
        "Bb, C, D, E, F, G, A"
      ],
      "explanation": "Bb major (W W H W W W H): Bb, C, D, Eb, F, G, A. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 809,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di B maggiore?",
      "options": [
        "B, C#, D#, E, F#, G#, A#",
        "B, C#, D#, E, F#, G#, A",
        "B, C#, D, E, F#, G#, A#",
        "B, C#, D#, E, F, G#, A#"
      ],
      "explanation": "B maggiore (T T S T T T S): B, C#, D#, E, F#, G#, A#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the B major scale?",
      "options": [
        "B, C#, D#, E, F#, G#, A#",
        "B, C#, D#, E, F#, G#, A",
        "B, C#, D, E, F#, G#, A#",
        "B, C#, D#, E, F, G#, A#"
      ],
      "explanation": "B major (W W H W W W H): B, C#, D#, E, F#, G#, A#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 810,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di C minore naturale?",
      "options": [
        "C, D, Eb, F, Gb, Ab, Bb",
        "C, D, Eb, F, G#, Ab, Bb",
        "C, D, Eb, F, G, Ab, Bb",
        "C, D, Eb, F#, G, Ab, Bb"
      ],
      "explanation": "C minore naturale (T S T T S T T): C, D, Eb, F, G, Ab, Bb. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the C natural minor scale?",
      "options": [
        "C, D, Eb, F, Gb, Ab, Bb",
        "C, D, Eb, F, G#, Ab, Bb",
        "C, D, Eb, F, G, Ab, Bb",
        "C, D, Eb, F#, G, Ab, Bb"
      ],
      "explanation": "C natural minor (W H W W H W W): C, D, Eb, F, G, Ab, Bb. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 811,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala di C# minore naturale?",
      "options": [
        "C#, D#, E#, F#, G#, A, B",
        "C#, D#, Eb, F#, G#, A, B",
        "C#, D#, E, F#, G#, A, Bb",
        "C#, D#, E, F#, G#, A, B"
      ],
      "explanation": "C# minore naturale (T S T T S T T): C#, D#, E, F#, G#, A, B. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the C# natural minor scale?",
      "options": [
        "C#, D#, E#, F#, G#, A, B",
        "C#, D#, Eb, F#, G#, A, B",
        "C#, D#, E, F#, G#, A, Bb",
        "C#, D#, E, F#, G#, A, B"
      ],
      "explanation": "C# natural minor (W H W W H W W): C#, D#, E, F#, G#, A, B. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 812,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala di D minore naturale?",
      "options": [
        "D, E, F, G, A, Bb, C",
        "D, E#, F, G, A, Bb, C",
        "D, Eb, F, G, A, Bb, C",
        "D, E, F, G, A, Bb, Cb"
      ],
      "explanation": "D minore naturale (T S T T S T T): D, E, F, G, A, Bb, C. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the D natural minor scale?",
      "options": [
        "D, E, F, G, A, Bb, C",
        "D, E#, F, G, A, Bb, C",
        "D, Eb, F, G, A, Bb, C",
        "D, E, F, G, A, Bb, Cb"
      ],
      "explanation": "D natural minor (W H W W H W W): D, E, F, G, A, Bb, C. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 813,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di Eb minore naturale?",
      "options": [
        "Eb, F, Gb, Ab, Bb, C, Db",
        "Eb, F, Gb, Ab, Bb, Cb, Db",
        "Eb, F#, Gb, Ab, Bb, Cb, Db",
        "Eb, Fb, Gb, Ab, Bb, Cb, Db"
      ],
      "explanation": "Eb minore naturale (T S T T S T T): Eb, F, Gb, Ab, Bb, Cb, Db (Cb suona come B). Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Eb natural minor scale?",
      "options": [
        "Eb, F, Gb, Ab, Bb, C, Db",
        "Eb, F, Gb, Ab, Bb, Cb, Db",
        "Eb, F#, Gb, Ab, Bb, Cb, Db",
        "Eb, Fb, Gb, Ab, Bb, Cb, Db"
      ],
      "explanation": "Eb natural minor (W H W W H W W): Eb, F, Gb, Ab, Bb, Cb, Db (Cb sounds as B). Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 814,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di E minore naturale?",
      "options": [
        "E, F#, G, A, B, Cb, D",
        "E, F#, G, A, B, C, D",
        "E, F#, G, A, B, C#, D",
        "E, F#, G, A, B, C, Db"
      ],
      "explanation": "E minore naturale (T S T T S T T): E, F#, G, A, B, C, D. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the E natural minor scale?",
      "options": [
        "E, F#, G, A, B, Cb, D",
        "E, F#, G, A, B, C, D",
        "E, F#, G, A, B, C#, D",
        "E, F#, G, A, B, C, Db"
      ],
      "explanation": "E natural minor (W H W W H W W): E, F#, G, A, B, C, D. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 815,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala di F minore naturale?",
      "options": [
        "F, G, Ab, Bb, C, Db, E",
        "F, G, Ab, Bb, Cb, Db, Eb",
        "F, G, Ab, Bb, C#, Db, Eb",
        "F, G, Ab, Bb, C, Db, Eb"
      ],
      "explanation": "F minore naturale (T S T T S T T): F, G, Ab, Bb, C, Db, Eb. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the F natural minor scale?",
      "options": [
        "F, G, Ab, Bb, C, Db, E",
        "F, G, Ab, Bb, Cb, Db, Eb",
        "F, G, Ab, Bb, C#, Db, Eb",
        "F, G, Ab, Bb, C, Db, Eb"
      ],
      "explanation": "F natural minor (W H W W H W W): F, G, Ab, Bb, C, Db, Eb. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 816,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di F# minore naturale?",
      "options": [
        "F#, G#, A, B, C#, Db, E",
        "F#, G#, A, B, C#, D, E",
        "F#, G#, A, B, C#, D#, E",
        "F#, G, A, B, C#, D, E"
      ],
      "explanation": "F# minore naturale (T S T T S T T): F#, G#, A, B, C#, D, E. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the F# natural minor scale?",
      "options": [
        "F#, G#, A, B, C#, Db, E",
        "F#, G#, A, B, C#, D, E",
        "F#, G#, A, B, C#, D#, E",
        "F#, G, A, B, C#, D, E"
      ],
      "explanation": "F# natural minor (W H W W H W W): F#, G#, A, B, C#, D, E. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 817,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di G minore naturale?",
      "options": [
        "G, Ab, Bb, C, D, Eb, F",
        "G, A#, Bb, C, D, Eb, F",
        "G, A, Bb, C, D, Eb, F",
        "G, A, B, C, D, Eb, F"
      ],
      "explanation": "G minore naturale (T S T T S T T): G, A, Bb, C, D, Eb, F. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the G natural minor scale?",
      "options": [
        "G, Ab, Bb, C, D, Eb, F",
        "G, A#, Bb, C, D, Eb, F",
        "G, A, Bb, C, D, Eb, F",
        "G, A, B, C, D, Eb, F"
      ],
      "explanation": "G natural minor (W H W W H W W): G, A, Bb, C, D, Eb, F. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 818,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala di G# minore naturale?",
      "options": [
        "G#, A#, B, C#, D, E, F#",
        "G#, A#, B, C#, D#, Eb, F#",
        "G#, A#, B, C#, D#, E#, F#",
        "G#, A#, B, C#, D#, E, F#"
      ],
      "explanation": "G# minore naturale (T S T T S T T): G#, A#, B, C#, D#, E, F#. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the G# natural minor scale?",
      "options": [
        "G#, A#, B, C#, D, E, F#",
        "G#, A#, B, C#, D#, Eb, F#",
        "G#, A#, B, C#, D#, E#, F#",
        "G#, A#, B, C#, D#, E, F#"
      ],
      "explanation": "G# natural minor (W H W W H W W): G#, A#, B, C#, D#, E, F#. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 819,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di A minore naturale?",
      "options": [
        "A, B#, C, D, E, F, G",
        "A, B, C, D, E, F, G",
        "A, Bb, C, D, E, F, G",
        "A, B, C, D, E, F#, G"
      ],
      "explanation": "A minore naturale (T S T T S T T): A, B, C, D, E, F, G. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the A natural minor scale?",
      "options": [
        "A, B#, C, D, E, F, G",
        "A, B, C, D, E, F, G",
        "A, Bb, C, D, E, F, G",
        "A, B, C, D, E, F#, G"
      ],
      "explanation": "A natural minor (W H W W H W W): A, B, C, D, E, F, G. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 820,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala di Bb minore naturale?",
      "options": [
        "Bb, Cb, Db, Eb, F, Gb, Ab",
        "Bb, C, Db, Eb, F, Gb, Ab",
        "Bb, C#, Db, Eb, F, Gb, Ab",
        "Bb, C, Db, Eb, F, G, Ab"
      ],
      "explanation": "Bb minore naturale (T S T T S T T): Bb, C, Db, Eb, F, Gb, Ab. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the Bb natural minor scale?",
      "options": [
        "Bb, Cb, Db, Eb, F, Gb, Ab",
        "Bb, C, Db, Eb, F, Gb, Ab",
        "Bb, C#, Db, Eb, F, Gb, Ab",
        "Bb, C, Db, Eb, F, G, Ab"
      ],
      "explanation": "Bb natural minor (W H W W H W W): Bb, C, Db, Eb, F, Gb, Ab. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 821,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala di B minore naturale?",
      "options": [
        "B, C#, D#, E, F#, G, A",
        "B, C#, Db, E, F#, G, A",
        "B, C#, D, E, F#, G, A",
        "B, C, D, E, F#, G, A"
      ],
      "explanation": "B minore naturale (T S T T S T T): B, C#, D, E, F#, G, A. Ogni lettera compare una sola volta.",
      "sub": "Scale"
    },
    "en": {
      "question": "Which notes make up the B natural minor scale?",
      "options": [
        "B, C#, D#, E, F#, G, A",
        "B, C#, Db, E, F#, G, A",
        "B, C#, D, E, F#, G, A",
        "B, C, D, E, F#, G, A"
      ],
      "explanation": "B natural minor (W H W W H W W): B, C#, D, E, F#, G, A. Each letter name appears exactly once.",
      "sub": "Scales"
    }
  },
  {
    "id": 822,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di C?",
      "options": [
        "C, D, E, G, A",
        "C, Eb, F, G, Bb",
        "C, D, E, F, G, A",
        "C, D, E, G, Bb"
      ],
      "explanation": "C pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → C, D, E, G, A. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the C major pentatonic scale?",
      "options": [
        "C, D, E, G, A",
        "C, Eb, F, G, Bb",
        "C, D, E, F, G, A",
        "C, D, E, G, Bb"
      ],
      "explanation": "C major pentatonic = 1 – 2 – 3 – 5 – 6 → C, D, E, G, A. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 823,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di C?",
      "options": [
        "C, Eb, F, Gb, G, Bb",
        "C, Db, F, G, Bb",
        "C, Eb, F, G, Bb",
        "C, D, E, G, A"
      ],
      "explanation": "C pentatonica minore = 1 – b3 – 4 – 5 – b7 → C, Eb, F, G, Bb. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the C minor pentatonic scale?",
      "options": [
        "C, Eb, F, Gb, G, Bb",
        "C, Db, F, G, Bb",
        "C, Eb, F, G, Bb",
        "C, D, E, G, A"
      ],
      "explanation": "C minor pentatonic = 1 – b3 – 4 – 5 – b7 → C, Eb, F, G, Bb. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 824,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di C?",
      "options": [
        "C, Eb, F, Gb, G, B",
        "C, Eb, F, Gb, G, Bb",
        "C, Eb, F, Gb, G, Ab",
        "C, Db, Eb, F, G, Bb"
      ],
      "explanation": "C blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → C, Eb, F, Gb, G, Bb.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the C blues scale?",
      "options": [
        "C, Eb, F, Gb, G, B",
        "C, Eb, F, Gb, G, Bb",
        "C, Eb, F, Gb, G, Ab",
        "C, Db, Eb, F, G, Bb"
      ],
      "explanation": "C blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → C, Eb, F, Gb, G, Bb.",
      "sub": "Blues"
    }
  },
  {
    "id": 825,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di Db?",
      "options": [
        "Db, Eb, F, Ab, Bb",
        "Db, Fb, Gb, Ab, Cb",
        "Db, Eb, F, Ab, Cb",
        "Db, F, Gb, Ab, C"
      ],
      "explanation": "Db pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → Db, Eb, F, Ab, Bb. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Db major pentatonic scale?",
      "options": [
        "Db, Eb, F, Ab, Bb",
        "Db, Fb, Gb, Ab, Cb",
        "Db, Eb, F, Ab, Cb",
        "Db, F, Gb, Ab, C"
      ],
      "explanation": "Db major pentatonic = 1 – 2 – 3 – 5 – 6 → Db, Eb, F, Ab, Bb. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 826,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di C#?",
      "options": [
        "C#, D#, E#, G#, A#",
        "C#, E, F#, G#, B#",
        "C#, E, F#, G#, B",
        "C#, E, F#, G#, A#"
      ],
      "explanation": "C# pentatonica minore = 1 – b3 – 4 – 5 – b7 → C#, E, F#, G#, B. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the C# minor pentatonic scale?",
      "options": [
        "C#, D#, E#, G#, A#",
        "C#, E, F#, G#, B#",
        "C#, E, F#, G#, B",
        "C#, E, F#, G#, A#"
      ],
      "explanation": "C# minor pentatonic = 1 – b3 – 4 – 5 – b7 → C#, E, F#, G#, B. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 827,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di C#?",
      "options": [
        "C#, E, F#, G#, B",
        "C#, E, F#, G, G#, B",
        "C#, E, F#, G, G#, A",
        "C#, D, E, F#, G#, B"
      ],
      "explanation": "C# blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → C#, E, F#, G, G#, B.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the C# blues scale?",
      "options": [
        "C#, E, F#, G#, B",
        "C#, E, F#, G, G#, B",
        "C#, E, F#, G, G#, A",
        "C#, D, E, F#, G#, B"
      ],
      "explanation": "C# blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → C#, E, F#, G, G#, B.",
      "sub": "Blues"
    }
  },
  {
    "id": 828,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di D?",
      "options": [
        "D, F, G, A, C",
        "D, E, F#, A, C",
        "D, E, F, A, B",
        "D, E, F#, A, B"
      ],
      "explanation": "D pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → D, E, F#, A, B. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the D major pentatonic scale?",
      "options": [
        "D, F, G, A, C",
        "D, E, F#, A, C",
        "D, E, F, A, B",
        "D, E, F#, A, B"
      ],
      "explanation": "D major pentatonic = 1 – 2 – 3 – 5 – 6 → D, E, F#, A, B. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 829,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di D?",
      "options": [
        "D, F, G, A, C",
        "D, F, G, A, C#",
        "D, Eb, G, A, C",
        "D, E, F#, A, B"
      ],
      "explanation": "D pentatonica minore = 1 – b3 – 4 – 5 – b7 → D, F, G, A, C. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the D minor pentatonic scale?",
      "options": [
        "D, F, G, A, C",
        "D, F, G, A, C#",
        "D, Eb, G, A, C",
        "D, E, F#, A, B"
      ],
      "explanation": "D minor pentatonic = 1 – b3 – 4 – 5 – b7 → D, F, G, A, C. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 830,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala blues di D?",
      "options": [
        "D, F, G, Ab, A, C",
        "D, F, G, A, C",
        "D, F, G, Ab, A, C#",
        "D, E, F, F#, A, B"
      ],
      "explanation": "D blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → D, F, G, Ab, A, C.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the D blues scale?",
      "options": [
        "D, F, G, Ab, A, C",
        "D, F, G, A, C",
        "D, F, G, Ab, A, C#",
        "D, E, F, F#, A, B"
      ],
      "explanation": "D blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → D, F, G, Ab, A, C.",
      "sub": "Blues"
    }
  },
  {
    "id": 831,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di Eb?",
      "options": [
        "Eb, F, Gb, Bb, C",
        "Eb, Gb, Ab, Bb, Db",
        "Eb, F, G, Bb, C",
        "Eb, F, G, Bb, Db"
      ],
      "explanation": "Eb pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → Eb, F, G, Bb, C. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Eb major pentatonic scale?",
      "options": [
        "Eb, F, Gb, Bb, C",
        "Eb, Gb, Ab, Bb, Db",
        "Eb, F, G, Bb, C",
        "Eb, F, G, Bb, Db"
      ],
      "explanation": "Eb major pentatonic = 1 – 2 – 3 – 5 – 6 → Eb, F, G, Bb, C. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 832,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di Eb?",
      "options": [
        "Eb, F, G, Bb, C",
        "Eb, Gb, Ab, Bb, Db",
        "Eb, Gb, Ab, Bb, D",
        "Eb, Gb, Ab, Bb, C"
      ],
      "explanation": "Eb pentatonica minore = 1 – b3 – 4 – 5 – b7 → Eb, Gb, Ab, Bb, Db. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Eb minor pentatonic scale?",
      "options": [
        "Eb, F, G, Bb, C",
        "Eb, Gb, Ab, Bb, Db",
        "Eb, Gb, Ab, Bb, D",
        "Eb, Gb, Ab, Bb, C"
      ],
      "explanation": "Eb minor pentatonic = 1 – b3 – 4 – 5 – b7 → Eb, Gb, Ab, Bb, Db. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 833,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di Eb?",
      "options": [
        "Eb, Gb, Ab, Bb, Db",
        "Eb, Gb, Ab, Bbb, Bb, Db",
        "Eb, F, Gb, G, Bb, C",
        "Eb, Fb, Gb, Ab, Bb, Db"
      ],
      "explanation": "Eb blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → Eb, Gb, Ab, Bbb, Bb, Db (Bbb suona come A).",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the Eb blues scale?",
      "options": [
        "Eb, Gb, Ab, Bb, Db",
        "Eb, Gb, Ab, Bbb, Bb, Db",
        "Eb, F, Gb, G, Bb, C",
        "Eb, Fb, Gb, Ab, Bb, Db"
      ],
      "explanation": "Eb blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → Eb, Gb, Ab, Bbb, Bb, Db (Bbb sounds as A).",
      "sub": "Blues"
    }
  },
  {
    "id": 834,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di E?",
      "options": [
        "E, G#, A, B, D#",
        "E, F#, G#, B, C#",
        "E, F#, G#, A, B, C#",
        "E, G, A, B, D"
      ],
      "explanation": "E pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → E, F#, G#, B, C#. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the E major pentatonic scale?",
      "options": [
        "E, G#, A, B, D#",
        "E, F#, G#, B, C#",
        "E, F#, G#, A, B, C#",
        "E, G, A, B, D"
      ],
      "explanation": "E major pentatonic = 1 – 2 – 3 – 5 – 6 → E, F#, G#, B, C#. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 835,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di E?",
      "options": [
        "E, F, A, B, D",
        "E, G, A, Bb, B, D",
        "E, G, A, B, D",
        "E, G, A, B, D#"
      ],
      "explanation": "E pentatonica minore = 1 – b3 – 4 – 5 – b7 → E, G, A, B, D. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the E minor pentatonic scale?",
      "options": [
        "E, F, A, B, D",
        "E, G, A, Bb, B, D",
        "E, G, A, B, D",
        "E, G, A, B, D#"
      ],
      "explanation": "E minor pentatonic = 1 – b3 – 4 – 5 – b7 → E, G, A, B, D. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 836,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala blues di E?",
      "options": [
        "E, G, A, Bb, B, D",
        "E, G, A, B, D",
        "E, G, A, Bb, B, D#",
        "E, G, A, Bb, B, C"
      ],
      "explanation": "E blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → E, G, A, Bb, B, D.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the E blues scale?",
      "options": [
        "E, G, A, Bb, B, D",
        "E, G, A, B, D",
        "E, G, A, Bb, B, D#",
        "E, G, A, Bb, B, C"
      ],
      "explanation": "E blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → E, G, A, Bb, B, D.",
      "sub": "Blues"
    }
  },
  {
    "id": 837,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di F?",
      "options": [
        "F, G, A, C, D",
        "F, G, Ab, C, D",
        "F, Ab, Bb, C, Eb",
        "F, G, A, C, Eb"
      ],
      "explanation": "F pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → F, G, A, C, D. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the F major pentatonic scale?",
      "options": [
        "F, G, A, C, D",
        "F, G, Ab, C, D",
        "F, Ab, Bb, C, Eb",
        "F, G, A, C, Eb"
      ],
      "explanation": "F major pentatonic = 1 – 2 – 3 – 5 – 6 → F, G, A, C, D. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 838,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di F?",
      "options": [
        "F, Ab, Bb, C, D",
        "F, Ab, Bb, C, E",
        "F, G, A, C, D",
        "F, Ab, Bb, C, Eb"
      ],
      "explanation": "F pentatonica minore = 1 – b3 – 4 – 5 – b7 → F, Ab, Bb, C, Eb. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the F minor pentatonic scale?",
      "options": [
        "F, Ab, Bb, C, D",
        "F, Ab, Bb, C, E",
        "F, G, A, C, D",
        "F, Ab, Bb, C, Eb"
      ],
      "explanation": "F minor pentatonic = 1 – b3 – 4 – 5 – b7 → F, Ab, Bb, C, Eb. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 839,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di F?",
      "options": [
        "F, G, Ab, A, C, D",
        "F, Ab, Bb, Cb, C, Eb",
        "F, Ab, Bb, Cb, C, Db",
        "F, Ab, Bb, Cb, C, E"
      ],
      "explanation": "F blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → F, Ab, Bb, Cb, C, Eb (Cb suona come B).",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the F blues scale?",
      "options": [
        "F, G, Ab, A, C, D",
        "F, Ab, Bb, Cb, C, Eb",
        "F, Ab, Bb, Cb, C, Db",
        "F, Ab, Bb, Cb, C, E"
      ],
      "explanation": "F blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → F, Ab, Bb, Cb, C, Eb (Cb sounds as B).",
      "sub": "Blues"
    }
  },
  {
    "id": 840,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di Gb?",
      "options": [
        "Gb, Bb, Cb, Db, F",
        "Gb, Ab, Bb, Db, Eb",
        "Gb, Ab, Bb, Cb, Db, Eb",
        "Gb, Ab, Bb, Db, Fb"
      ],
      "explanation": "Gb pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → Gb, Ab, Bb, Db, Eb. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Gb major pentatonic scale?",
      "options": [
        "Gb, Bb, Cb, Db, F",
        "Gb, Ab, Bb, Db, Eb",
        "Gb, Ab, Bb, Cb, Db, Eb",
        "Gb, Ab, Bb, Db, Fb"
      ],
      "explanation": "Gb major pentatonic = 1 – 2 – 3 – 5 – 6 → Gb, Ab, Bb, Db, Eb. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 841,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di F#?",
      "options": [
        "F#, G, B, C#, E",
        "F#, A, B, C#, E",
        "F#, A, B, C#, D#",
        "F#, G#, A#, C#, D#"
      ],
      "explanation": "F# pentatonica minore = 1 – b3 – 4 – 5 – b7 → F#, A, B, C#, E. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the F# minor pentatonic scale?",
      "options": [
        "F#, G, B, C#, E",
        "F#, A, B, C#, E",
        "F#, A, B, C#, D#",
        "F#, G#, A#, C#, D#"
      ],
      "explanation": "F# minor pentatonic = 1 – b3 – 4 – 5 – b7 → F#, A, B, C#, E. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 842,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala blues di F#?",
      "options": [
        "F#, A, B, C, C#, D",
        "F#, A, B, C#, E",
        "F#, A, B, C, C#, E",
        "F#, A, B, C, C#, E#"
      ],
      "explanation": "F# blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → F#, A, B, C, C#, E.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the F# blues scale?",
      "options": [
        "F#, A, B, C, C#, D",
        "F#, A, B, C#, E",
        "F#, A, B, C, C#, E",
        "F#, A, B, C, C#, E#"
      ],
      "explanation": "F# blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → F#, A, B, C, C#, E.",
      "sub": "Blues"
    }
  },
  {
    "id": 843,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di G?",
      "options": [
        "G, A, B, D, E",
        "G, B, C, D, F#",
        "G, A, B, C, D, E",
        "G, A, Bb, D, E"
      ],
      "explanation": "G pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → G, A, B, D, E. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the G major pentatonic scale?",
      "options": [
        "G, A, B, D, E",
        "G, B, C, D, F#",
        "G, A, B, C, D, E",
        "G, A, Bb, D, E"
      ],
      "explanation": "G major pentatonic = 1 – 2 – 3 – 5 – 6 → G, A, B, D, E. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 844,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di G?",
      "options": [
        "G, Ab, C, D, F",
        "G, Bb, C, D, E",
        "G, Bb, C, D, F",
        "G, Bb, C, Db, D, F"
      ],
      "explanation": "G pentatonica minore = 1 – b3 – 4 – 5 – b7 → G, Bb, C, D, F. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the G minor pentatonic scale?",
      "options": [
        "G, Ab, C, D, F",
        "G, Bb, C, D, E",
        "G, Bb, C, D, F",
        "G, Bb, C, Db, D, F"
      ],
      "explanation": "G minor pentatonic = 1 – b3 – 4 – 5 – b7 → G, Bb, C, D, F. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 845,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala blues di G?",
      "options": [
        "G, Bb, C, Db, D, F",
        "G, Bb, C, Db, D, F#",
        "G, Ab, Bb, C, D, F",
        "G, A, Bb, B, D, E"
      ],
      "explanation": "G blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → G, Bb, C, Db, D, F.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the G blues scale?",
      "options": [
        "G, Bb, C, Db, D, F",
        "G, Bb, C, Db, D, F#",
        "G, Ab, Bb, C, D, F",
        "G, A, Bb, B, D, E"
      ],
      "explanation": "G blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → G, Bb, C, Db, D, F.",
      "sub": "Blues"
    }
  },
  {
    "id": 846,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di Ab?",
      "options": [
        "Ab, Bb, C, Db, Eb, F",
        "Ab, Bb, Cb, Eb, F",
        "Ab, Bb, C, Eb, F",
        "Ab, Cb, Db, Eb, Gb"
      ],
      "explanation": "Ab pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → Ab, Bb, C, Eb, F. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Ab major pentatonic scale?",
      "options": [
        "Ab, Bb, C, Db, Eb, F",
        "Ab, Bb, Cb, Eb, F",
        "Ab, Bb, C, Eb, F",
        "Ab, Cb, Db, Eb, Gb"
      ],
      "explanation": "Ab major pentatonic = 1 – 2 – 3 – 5 – 6 → Ab, Bb, C, Eb, F. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 847,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di G#?",
      "options": [
        "G#, B, C#, D, D#, F#",
        "G#, B, C#, D#, E#",
        "G#, B, C#, D#, F#",
        "G#, A, C#, D#, F#"
      ],
      "explanation": "G# pentatonica minore = 1 – b3 – 4 – 5 – b7 → G#, B, C#, D#, F#. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the G# minor pentatonic scale?",
      "options": [
        "G#, B, C#, D, D#, F#",
        "G#, B, C#, D#, E#",
        "G#, B, C#, D#, F#",
        "G#, A, C#, D#, F#"
      ],
      "explanation": "G# minor pentatonic = 1 – b3 – 4 – 5 – b7 → G#, B, C#, D#, F#. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 848,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono la scala blues di G#?",
      "options": [
        "G#, B, C#, D, D#, F#",
        "G#, A, B, C#, D#, F#",
        "G#, A#, B, B#, D#, E#",
        "G#, B, C#, D#, F#"
      ],
      "explanation": "G# blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → G#, B, C#, D, D#, F#.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the G# blues scale?",
      "options": [
        "G#, B, C#, D, D#, F#",
        "G#, A, B, C#, D#, F#",
        "G#, A#, B, B#, D#, E#",
        "G#, B, C#, D#, F#"
      ],
      "explanation": "G# blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → G#, B, C#, D, D#, F#.",
      "sub": "Blues"
    }
  },
  {
    "id": 849,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di A?",
      "options": [
        "A, C#, D, E, G#",
        "A, B, C#, E, G",
        "A, C, D, E, G",
        "A, B, C#, E, F#"
      ],
      "explanation": "A pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → A, B, C#, E, F#. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the A major pentatonic scale?",
      "options": [
        "A, C#, D, E, G#",
        "A, B, C#, E, G",
        "A, C, D, E, G",
        "A, B, C#, E, F#"
      ],
      "explanation": "A major pentatonic = 1 – 2 – 3 – 5 – 6 → A, B, C#, E, F#. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 850,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di A?",
      "options": [
        "A, C, D, E, F#",
        "A, C, D, Eb, E, G",
        "A, C, D, E, G",
        "A, Bb, D, E, G"
      ],
      "explanation": "A pentatonica minore = 1 – b3 – 4 – 5 – b7 → A, C, D, E, G. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the A minor pentatonic scale?",
      "options": [
        "A, C, D, E, F#",
        "A, C, D, Eb, E, G",
        "A, C, D, E, G",
        "A, Bb, D, E, G"
      ],
      "explanation": "A minor pentatonic = 1 – b3 – 4 – 5 – b7 → A, C, D, E, G. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 851,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di A?",
      "options": [
        "A, B, C, C#, E, F#",
        "A, C, D, Eb, E, G",
        "A, C, D, Eb, E, G#",
        "A, Bb, C, D, E, G"
      ],
      "explanation": "A blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → A, C, D, Eb, E, G.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the A blues scale?",
      "options": [
        "A, B, C, C#, E, F#",
        "A, C, D, Eb, E, G",
        "A, C, D, Eb, E, G#",
        "A, Bb, C, D, E, G"
      ],
      "explanation": "A blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → A, C, D, Eb, E, G.",
      "sub": "Blues"
    }
  },
  {
    "id": 852,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di Bb?",
      "options": [
        "Bb, C, D, F, Ab",
        "Bb, C, Db, F, G",
        "Bb, Db, Eb, F, Ab",
        "Bb, C, D, F, G"
      ],
      "explanation": "Bb pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → Bb, C, D, F, G. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Bb major pentatonic scale?",
      "options": [
        "Bb, C, D, F, Ab",
        "Bb, C, Db, F, G",
        "Bb, Db, Eb, F, Ab",
        "Bb, C, D, F, G"
      ],
      "explanation": "Bb major pentatonic = 1 – 2 – 3 – 5 – 6 → Bb, C, D, F, G. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 853,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di Bb?",
      "options": [
        "Bb, Db, Eb, F, G",
        "Bb, C, D, F, G",
        "Bb, Db, Eb, F, A",
        "Bb, Db, Eb, F, Ab"
      ],
      "explanation": "Bb pentatonica minore = 1 – b3 – 4 – 5 – b7 → Bb, Db, Eb, F, Ab. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the Bb minor pentatonic scale?",
      "options": [
        "Bb, Db, Eb, F, G",
        "Bb, C, D, F, G",
        "Bb, Db, Eb, F, A",
        "Bb, Db, Eb, F, Ab"
      ],
      "explanation": "Bb minor pentatonic = 1 – b3 – 4 – 5 – b7 → Bb, Db, Eb, F, Ab. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 854,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala blues di Bb?",
      "options": [
        "Bb, Db, Eb, Fb, F, Gb",
        "Bb, Db, Eb, Fb, F, Ab",
        "Bb, Db, Eb, F, Ab",
        "Bb, Cb, Db, Eb, F, Ab"
      ],
      "explanation": "Bb blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → Bb, Db, Eb, Fb, F, Ab (Fb suona come E).",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the Bb blues scale?",
      "options": [
        "Bb, Db, Eb, Fb, F, Gb",
        "Bb, Db, Eb, Fb, F, Ab",
        "Bb, Db, Eb, F, Ab",
        "Bb, Cb, Db, Eb, F, Ab"
      ],
      "explanation": "Bb blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → Bb, Db, Eb, Fb, F, Ab (Fb sounds as E).",
      "sub": "Blues"
    }
  },
  {
    "id": 855,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica maggiore di B?",
      "options": [
        "B, D, E, F#, A",
        "B, C#, D#, F#, G#",
        "B, C#, D#, E, F#, G#",
        "B, D#, E, F#, A#"
      ],
      "explanation": "B pentatonica maggiore = 1 – 2 – 3 – 5 – 6 → B, C#, D#, F#, G#. È la scala maggiore senza 4ª e 7ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the B major pentatonic scale?",
      "options": [
        "B, D, E, F#, A",
        "B, C#, D#, F#, G#",
        "B, C#, D#, E, F#, G#",
        "B, D#, E, F#, A#"
      ],
      "explanation": "B major pentatonic = 1 – 2 – 3 – 5 – 6 → B, C#, D#, F#, G#. It is the major scale without the 4th and 7th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 856,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono la scala pentatonica minore di B?",
      "options": [
        "B, D, E, F, F#, A",
        "B, D, E, F#, A",
        "B, D, E, F#, A#",
        "B, C#, D#, F#, G#"
      ],
      "explanation": "B pentatonica minore = 1 – b3 – 4 – 5 – b7 → B, D, E, F#, A. È la minore naturale senza 2ª e 6ª.",
      "sub": "Pentatoniche"
    },
    "en": {
      "question": "Which notes make up the B minor pentatonic scale?",
      "options": [
        "B, D, E, F, F#, A",
        "B, D, E, F#, A",
        "B, D, E, F#, A#",
        "B, C#, D#, F#, G#"
      ],
      "explanation": "B minor pentatonic = 1 – b3 – 4 – 5 – b7 → B, D, E, F#, A. It is natural minor without the 2nd and 6th.",
      "sub": "Pentatonics"
    }
  },
  {
    "id": 857,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono la scala blues di B?",
      "options": [
        "B, C, D, E, F#, A",
        "B, D, E, F, F#, G",
        "B, D, E, F#, A",
        "B, D, E, F, F#, A"
      ],
      "explanation": "B blues = pentatonica minore + 5ª diminuita (blue note): 1 – b3 – 4 – b5 – 5 – b7 → B, D, E, F, F#, A.",
      "sub": "Blues"
    },
    "en": {
      "question": "Which notes make up the B blues scale?",
      "options": [
        "B, C, D, E, F#, A",
        "B, D, E, F, F#, G",
        "B, D, E, F#, A",
        "B, D, E, F, F#, A"
      ],
      "explanation": "B blues = minor pentatonic + flat 5th (blue note): 1 – b3 – 4 – b5 – 5 – b7 → B, D, E, F, F#, A.",
      "sub": "Blues"
    }
  },
  {
    "id": 858,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "In quale tonalità è scritto \"Autumn Leaves\" nel Real Book?",
      "options": [
        "Re minore (Fa maggiore)",
        "Sol minore (Sib maggiore)",
        "Do minore (Mib maggiore)",
        "La minore (Do maggiore)"
      ],
      "explanation": "Nel Real Book è in Sol minore: Cm7–F7–Bbmaj7–Ebmaj7–Am7b5–D7–Gm. Molti chitarristi e cantanti lo suonano anche in Mi minore.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "In which key is \"Autumn Leaves\" written in the Real Book?",
      "options": [
        "D minor (F major)",
        "G minor (Bb major)",
        "C minor (Eb major)",
        "A minor (C major)"
      ],
      "explanation": "The Real Book has it in G minor: Cm7–F7–Bbmaj7–Ebmaj7–Am7b5–D7–Gm. Many guitarists and singers also play it in E minor.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 859,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Su quale modo è basato \"So What\" di Miles Davis?",
      "options": [
        "Eolio",
        "Dorico",
        "Lidio",
        "Locrio"
      ],
      "explanation": "\"So What\" (1959) usa D Dorico nelle sezioni A ed Eb Dorico nel bridge.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Which mode is \"So What\" by Miles Davis based on?",
      "options": [
        "Aeolian",
        "Dorian",
        "Lydian",
        "Locrian"
      ],
      "explanation": "\"So What\" (1959) uses D Dorian in the A sections and Eb Dorian in the bridge.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 860,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "In che tempo è scritto \"Take Five\" del Dave Brubeck Quartet?",
      "options": [
        "6/8",
        "4/4",
        "3/4",
        "5/4"
      ],
      "explanation": "\"Take Five\" (di Paul Desmond) è in 5/4, sentito come 3 + 2.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "What time signature is \"Take Five\" by the Dave Brubeck Quartet in?",
      "options": [
        "6/8",
        "4/4",
        "3/4",
        "5/4"
      ],
      "explanation": "\"Take Five\" (by Paul Desmond) is in 5/4, felt as 3 + 2.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 861,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante battute ha la forma di \"All the Things You Are\"?",
      "options": [
        "64",
        "24",
        "32",
        "36"
      ],
      "explanation": "È una forma A A B A in cui l'ultima A è estesa a 12 battute: 8 + 8 + 8 + 12 = 36.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "How many bars long is the form of \"All the Things You Are\"?",
      "options": [
        "64",
        "24",
        "32",
        "36"
      ],
      "explanation": "It is an A A B A form whose last A is extended to 12 bars: 8 + 8 + 8 + 12 = 36.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 862,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Chi ha composto \"Giant Steps\"?",
      "options": [
        "Sonny Rollins",
        "Charlie Parker",
        "John Coltrane",
        "Miles Davis"
      ],
      "explanation": "John Coltrane lo incise nel 1959: i centri tonali si muovono per terze maggiori (B, G, Eb).",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who composed \"Giant Steps\"?",
      "options": [
        "Sonny Rollins",
        "Charlie Parker",
        "John Coltrane",
        "Miles Davis"
      ],
      "explanation": "John Coltrane recorded it in 1959: the key centres move in major thirds (B, G, Eb).",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 863,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Chi ha composto \"Blue Bossa\"?",
      "options": [
        "Kenny Dorham",
        "Joe Henderson",
        "Antonio Carlos Jobim",
        "Horace Silver"
      ],
      "explanation": "Il trombettista Kenny Dorham lo scrisse per l'album \"Page One\" (1963) di Joe Henderson.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who composed \"Blue Bossa\"?",
      "options": [
        "Kenny Dorham",
        "Joe Henderson",
        "Antonio Carlos Jobim",
        "Horace Silver"
      ],
      "explanation": "Trumpeter Kenny Dorham wrote it for Joe Henderson's album \"Page One\" (1963).",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 864,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "In quale tonalità si suonano di solito i \"Rhythm Changes\"?",
      "options": [
        "G",
        "F",
        "Bb",
        "Eb"
      ],
      "explanation": "Gli accordi di \"I Got Rhythm\" (Gershwin) si suonano tradizionalmente in Bb, come in \"Oleo\" e \"Anthropology\".",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "In which key are \"Rhythm Changes\" usually played?",
      "options": [
        "G",
        "F",
        "Bb",
        "Eb"
      ],
      "explanation": "The changes of \"I Got Rhythm\" (Gershwin) are traditionally played in Bb, as in \"Oleo\" and \"Anthropology\".",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 865,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "A chi è attribuito \"Solar\"?",
      "options": [
        "Miles Davis",
        "John Coltrane",
        "Chick Corea",
        "Bill Evans"
      ],
      "explanation": "\"Solar\" (1954) è firmato da Miles Davis; deriva da \"Sonny\" di Chuck Wayne.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who is \"Solar\" credited to?",
      "options": [
        "Miles Davis",
        "John Coltrane",
        "Chick Corea",
        "Bill Evans"
      ],
      "explanation": "\"Solar\" (1954) is credited to Miles Davis; it derives from Chuck Wayne's \"Sonny\".",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 866,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Chi ha composto \"Blues for Alice\"?",
      "options": [
        "Sonny Rollins",
        "Sonny Stitt",
        "Miles Davis",
        "Charlie Parker"
      ],
      "explanation": "Il \"Bird blues\" di Charlie Parker (1951) riarmonizza il blues con catene di ii–V.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who composed \"Blues for Alice\"?",
      "options": [
        "Sonny Rollins",
        "Sonny Stitt",
        "Miles Davis",
        "Charlie Parker"
      ],
      "explanation": "Charlie Parker's \"Bird blues\" (1951) reharmonises the blues with chains of ii–V.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 867,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Chi ha composto \"Footprints\"?",
      "options": [
        "Chick Corea",
        "Herbie Hancock",
        "Wayne Shorter",
        "Joe Henderson"
      ],
      "explanation": "Wayne Shorter lo incise in \"Adam's Apple\" (1966): un blues minore in 6/4.",
      "sub": "Standard jazz"
    },
    "en": {
      "question": "Who composed \"Footprints\"?",
      "options": [
        "Chick Corea",
        "Herbie Hancock",
        "Wayne Shorter",
        "Joe Henderson"
      ],
      "explanation": "Wayne Shorter recorded it on \"Adam's Apple\" (1966): a minor blues in 6/4.",
      "sub": "Jazz standards"
    }
  },
  {
    "id": 868,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale progressione si usa più spesso come turnaround?",
      "options": [
        "I – V – vi – IV",
        "ii – V – I – IV",
        "I – vi – ii – V",
        "I – IV – V – I"
      ],
      "explanation": "I–vi–ii–V riporta alla tonica con un ciclo di quinte (vi → ii → V → I).",
      "sub": "Progressioni"
    },
    "en": {
      "question": "Which progression is most often used as a turnaround?",
      "options": [
        "I – V – vi – IV",
        "ii – V – I – IV",
        "I – vi – ii – V",
        "I – IV – V – I"
      ],
      "explanation": "I–vi–ii–V leads back to the tonic through a cycle of fifths (vi → ii → V → I).",
      "sub": "Progressions"
    }
  },
  {
    "id": 869,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale successione di accordi è tipica del blues a 12 battute?",
      "options": [
        "I – bVII – IV – I",
        "ii – V – I",
        "I – vi – ii – V",
        "I7 – IV7 – I7 – V7 – IV7 – I7"
      ],
      "explanation": "Blues di base: I7 (4 battute), IV7 (2), I7 (2), V7 (1), IV7 (1), I7 (2).",
      "sub": "Progressioni"
    },
    "en": {
      "question": "Which chord succession is typical of the 12-bar blues?",
      "options": [
        "I – bVII – IV – I",
        "ii – V – I",
        "I – vi – ii – V",
        "I7 – IV7 – I7 – V7 – IV7 – I7"
      ],
      "explanation": "Basic blues: I7 (4 bars), IV7 (2), I7 (2), V7 (1), IV7 (1), I7 (2).",
      "sub": "Progressions"
    }
  },
  {
    "id": 870,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa caratterizza i \"Coltrane changes\"?",
      "options": [
        "Movimento per quarte",
        "Solo accordi di dominante",
        "Modulazioni di semitono",
        "Centri tonali che si muovono per terze maggiori"
      ],
      "explanation": "In \"Giant Steps\" i centri tonali (B, G, Eb) dividono l'ottava in tre terze maggiori, ognuno preparato dal proprio V7.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What characterises \"Coltrane changes\"?",
      "options": [
        "Motion in fourths",
        "Dominant chords only",
        "Half-step modulations",
        "Key centres moving in major thirds"
      ],
      "explanation": "In \"Giant Steps\" the key centres (B, G, Eb) split the octave into three major thirds, each prepared by its own V7.",
      "sub": "Progressions"
    }
  },
  {
    "id": 871,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cos'è una backdoor cadence?",
      "options": [
        "bII7 – I",
        "V7 – I",
        "iv7 – bVII7 – I",
        "ii7 – V7 – I"
      ],
      "explanation": "La backdoor arriva alla tonica dal bVII7 (es. Fm7–Bb7–Cmaj7), preso in prestito dal modo minore parallelo.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What is a backdoor cadence?",
      "options": [
        "bII7 – I",
        "V7 – I",
        "iv7 – bVII7 – I",
        "ii7 – V7 – I"
      ],
      "explanation": "The backdoor reaches the tonic from bVII7 (e.g. Fm7–Bb7–Cmaj7), borrowed from the parallel minor.",
      "sub": "Progressions"
    }
  },
  {
    "id": 872,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa si intende per interscambio modale (modal interchange)?",
      "options": [
        "Usare scale modali sui ii–V",
        "Passare alla relativa minore",
        "Prendere accordi dal modo parallelo (es. dal minore in un brano maggiore)",
        "Modulare per quinte"
      ],
      "explanation": "Esempi tipici in maggiore: ivm7, bVImaj7 e bVII7 presi dal minore parallelo.",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What does modal interchange mean?",
      "options": [
        "Using modal scales over ii–V",
        "Moving to the relative minor",
        "Borrowing chords from the parallel mode (e.g. from minor in a major tune)",
        "Modulating by fifths"
      ],
      "explanation": "Typical examples in major: ivm7, bVImaj7 and bVII7 borrowed from the parallel minor.",
      "sub": "Progressions"
    }
  },
  {
    "id": 873,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa indica una forma A A B A (A1 A2 B A3)?",
      "options": [
        "La forma blues",
        "La song form di 32 battute (4 sezioni da 8)",
        "Una forma binaria barocca",
        "La forma sonata"
      ],
      "explanation": "Tre sezioni A quasi uguali e un bridge (B) contrastante: è la forma di molti standard, come \"I Got Rhythm\".",
      "sub": "Progressioni"
    },
    "en": {
      "question": "What does an A A B A form (A1 A2 B A3) indicate?",
      "options": [
        "The blues form",
        "The 32-bar song form (4 sections of 8)",
        "A Baroque binary form",
        "Sonata form"
      ],
      "explanation": "Three nearly identical A sections and a contrasting bridge (B): the form of many standards, such as \"I Got Rhythm\".",
      "sub": "Progressions"
    }
  },
  {
    "id": 874,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante crome (ottavi) stanno in una semibreve (intero)?",
      "options": [
        "4",
        "2",
        "8",
        "6"
      ],
      "explanation": "Semibreve = 4 quarti = 8 ottavi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many eighth notes fit in a whole note?",
      "options": [
        "4",
        "2",
        "8",
        "6"
      ],
      "explanation": "Whole note = 4 quarters = 8 eighths.",
      "sub": "Durations"
    }
  },
  {
    "id": 875,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quante crome (ottavi) stanno in una minima (metà)?",
      "options": [
        "4",
        "3",
        "2",
        "8"
      ],
      "explanation": "Minima = 2 quarti = 4 ottavi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many eighth notes fit in a half note?",
      "options": [
        "4",
        "3",
        "2",
        "8"
      ],
      "explanation": "Half note = 2 quarters = 4 eighths.",
      "sub": "Durations"
    }
  },
  {
    "id": 876,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante crome (ottavi) stanno in una semiminima (quarto)?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "explanation": "Semiminima = 2 ottavi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many eighth notes fit in a quarter note?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "explanation": "Quarter note = 2 eighths.",
      "sub": "Durations"
    }
  },
  {
    "id": 877,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quante semicrome (sedicesimi) stanno in una semiminima?",
      "options": [
        "2",
        "3",
        "4",
        "8"
      ],
      "explanation": "Semiminima = 2 ottavi = 4 sedicesimi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many sixteenth notes fit in a quarter note?",
      "options": [
        "2",
        "3",
        "4",
        "8"
      ],
      "explanation": "Quarter note = 2 eighths = 4 sixteenths.",
      "sub": "Durations"
    }
  },
  {
    "id": 878,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quante semicrome stanno in una minima?",
      "options": [
        "8",
        "4",
        "12",
        "16"
      ],
      "explanation": "Minima = 2 quarti = 8 sedicesimi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many sixteenth notes fit in a half note?",
      "options": [
        "8",
        "4",
        "12",
        "16"
      ],
      "explanation": "Half note = 2 quarters = 8 sixteenths.",
      "sub": "Durations"
    }
  },
  {
    "id": 879,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quante semicrome stanno in una semibreve?",
      "options": [
        "8",
        "16",
        "12",
        "32"
      ],
      "explanation": "Semibreve = 4 quarti = 16 sedicesimi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many sixteenth notes fit in a whole note?",
      "options": [
        "8",
        "16",
        "12",
        "32"
      ],
      "explanation": "Whole note = 4 quarters = 16 sixteenths.",
      "sub": "Durations"
    }
  },
  {
    "id": 880,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quante crome di terzina stanno in una semiminima?",
      "options": [
        "2",
        "4",
        "6",
        "3"
      ],
      "explanation": "Una terzina di crome divide il quarto in 3 parti uguali.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many triplet eighth notes fit in a quarter note?",
      "options": [
        "2",
        "4",
        "6",
        "3"
      ],
      "explanation": "An eighth-note triplet divides the quarter note into 3 equal parts.",
      "sub": "Durations"
    }
  },
  {
    "id": 881,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti quarti vale una semibreve?",
      "options": [
        "2",
        "3",
        "4",
        "8"
      ],
      "explanation": "Semibreve = 4 quarti.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many quarter notes is a whole note worth?",
      "options": [
        "2",
        "3",
        "4",
        "8"
      ],
      "explanation": "Whole note = 4 quarters.",
      "sub": "Durations"
    }
  },
  {
    "id": 882,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quanti quarti vale una minima puntata?",
      "options": [
        "2",
        "3",
        "4",
        "6"
      ],
      "explanation": "Il punto aggiunge metà valore: 2 + 1 = 3 quarti.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many quarter notes is a dotted half note worth?",
      "options": [
        "2",
        "3",
        "4",
        "6"
      ],
      "explanation": "The dot adds half the value: 2 + 1 = 3 quarters.",
      "sub": "Durations"
    }
  },
  {
    "id": 883,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quanti ottavi vale una semiminima puntata?",
      "options": [
        "2",
        "1",
        "3",
        "4"
      ],
      "explanation": "Il punto aggiunge metà valore: 2 + 1 = 3 ottavi.",
      "sub": "Durate"
    },
    "en": {
      "question": "How many eighth notes is a dotted quarter note worth?",
      "options": [
        "2",
        "1",
        "3",
        "4"
      ],
      "explanation": "The dot adds half the value: 2 + 1 = 3 eighths.",
      "sub": "Durations"
    }
  },
  {
    "id": 884,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa indica la dinamica \"pppp\"?",
      "options": [
        "piano",
        "mezzoforte (moderatamente forte)",
        "quadruplo piano (il più piano possibile)",
        "fortississimo (forte al massimo grado)"
      ],
      "explanation": "pppp = quadruplo piano (il più piano possibile).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"pppp\" mean?",
      "options": [
        "piano (soft)",
        "mezzo-forte (moderately loud)",
        "quadruple piano (as soft as possible)",
        "fortississimo (extremely loud)"
      ],
      "explanation": "pppp = quadruple piano (as soft as possible).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 885,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa indica la dinamica \"ppp\"?",
      "options": [
        "mezzopiano (moderatamente piano)",
        "forte",
        "pianississimo (piano al massimo grado)",
        "sforzando (accento improvviso su una nota)"
      ],
      "explanation": "ppp = pianississimo (piano al massimo grado).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"ppp\" mean?",
      "options": [
        "mezzo-piano (moderately soft)",
        "forte (loud)",
        "pianississimo (extremely soft)",
        "sforzando (sudden accent on a note)"
      ],
      "explanation": "ppp = pianississimo (extremely soft).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 886,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa indica la dinamica \"pp\"?",
      "options": [
        "pianissimo (molto piano)",
        "mezzoforte (moderatamente forte)",
        "fortissimo (molto forte)",
        "forte e subito piano"
      ],
      "explanation": "pp = pianissimo (molto piano).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"pp\" mean?",
      "options": [
        "pianissimo (very soft)",
        "mezzo-forte (moderately loud)",
        "fortissimo (very loud)",
        "loud, then immediately soft"
      ],
      "explanation": "pp = pianissimo (very soft).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 887,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa indica la dinamica \"p\"?",
      "options": [
        "piano",
        "forte",
        "fortississimo (forte al massimo grado)",
        "quadruplo piano (il più piano possibile)"
      ],
      "explanation": "p = piano.",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"p\" mean?",
      "options": [
        "piano (soft)",
        "forte (loud)",
        "fortississimo (extremely loud)",
        "quadruple piano (as soft as possible)"
      ],
      "explanation": "p = piano (soft).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 888,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa indica la dinamica \"mp\"?",
      "options": [
        "mezzopiano (moderatamente piano)",
        "fortissimo (molto forte)",
        "sforzando (accento improvviso su una nota)",
        "pianississimo (piano al massimo grado)"
      ],
      "explanation": "mp = mezzopiano (moderatamente piano).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"mp\" mean?",
      "options": [
        "mezzo-piano (moderately soft)",
        "fortissimo (very loud)",
        "sforzando (sudden accent on a note)",
        "pianississimo (extremely soft)"
      ],
      "explanation": "mp = mezzo-piano (moderately soft).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 889,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa indica la dinamica \"mf\"?",
      "options": [
        "fortississimo (forte al massimo grado)",
        "forte e subito piano",
        "mezzoforte (moderatamente forte)",
        "pianissimo (molto piano)"
      ],
      "explanation": "mf = mezzoforte (moderatamente forte).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"mf\" mean?",
      "options": [
        "fortississimo (extremely loud)",
        "loud, then immediately soft",
        "mezzo-forte (moderately loud)",
        "pianissimo (very soft)"
      ],
      "explanation": "mf = mezzo-forte (moderately loud).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 890,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa indica la dinamica \"f\"?",
      "options": [
        "forte",
        "sforzando (accento improvviso su una nota)",
        "quadruplo piano (il più piano possibile)",
        "piano"
      ],
      "explanation": "f = forte.",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"f\" mean?",
      "options": [
        "forte (loud)",
        "sforzando (sudden accent on a note)",
        "quadruple piano (as soft as possible)",
        "piano (soft)"
      ],
      "explanation": "f = forte (loud).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 891,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa indica la dinamica \"ff\"?",
      "options": [
        "fortissimo (molto forte)",
        "forte e subito piano",
        "pianississimo (piano al massimo grado)",
        "mezzopiano (moderatamente piano)"
      ],
      "explanation": "ff = fortissimo (molto forte).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"ff\" mean?",
      "options": [
        "fortissimo (very loud)",
        "loud, then immediately soft",
        "pianississimo (extremely soft)",
        "mezzo-piano (moderately soft)"
      ],
      "explanation": "ff = fortissimo (very loud).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 892,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa indica la dinamica \"fff\"?",
      "options": [
        "quadruplo piano (il più piano possibile)",
        "pianissimo (molto piano)",
        "fortississimo (forte al massimo grado)",
        "mezzoforte (moderatamente forte)"
      ],
      "explanation": "fff = fortississimo (forte al massimo grado).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"fff\" mean?",
      "options": [
        "quadruple piano (as soft as possible)",
        "pianissimo (very soft)",
        "fortississimo (extremely loud)",
        "mezzo-forte (moderately loud)"
      ],
      "explanation": "fff = fortississimo (extremely loud).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 893,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa indica la dinamica \"sfz\"?",
      "options": [
        "pianississimo (piano al massimo grado)",
        "sforzando (accento improvviso su una nota)",
        "piano",
        "forte"
      ],
      "explanation": "sfz = sforzando (accento improvviso su una nota).",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"sfz\" mean?",
      "options": [
        "pianississimo (extremely soft)",
        "sforzando (sudden accent on a note)",
        "piano (soft)",
        "forte (loud)"
      ],
      "explanation": "sfz = sforzando (sudden accent on a note).",
      "sub": "Dynamics"
    }
  },
  {
    "id": 894,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa indica la dinamica \"fp\"?",
      "options": [
        "pianissimo (molto piano)",
        "forte e subito piano",
        "mezzopiano (moderatamente piano)",
        "fortissimo (molto forte)"
      ],
      "explanation": "fp = forte e subito piano.",
      "sub": "Dinamiche"
    },
    "en": {
      "question": "What does the dynamic marking \"fp\" mean?",
      "options": [
        "pianissimo (very soft)",
        "loud, then immediately soft",
        "mezzo-piano (moderately soft)",
        "fortissimo (very loud)"
      ],
      "explanation": "fp = loud, then immediately soft.",
      "sub": "Dynamics"
    }
  },
  {
    "id": 895,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Larghissimo\"?",
      "options": [
        "estremamente lento (circa sotto i 24 BPM)",
        "lento e calmo (circa 66–76 BPM)",
        "velocità moderata (circa 108–120 BPM)",
        "vivo e vigoroso (circa 156–176 BPM)"
      ],
      "explanation": "Larghissimo = estremamente lento (circa sotto i 24 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Larghissimo\" mean?",
      "options": [
        "extremely slow (roughly below 24 BPM)",
        "slow and calm (about 66–76 BPM)",
        "moderate speed (about 108–120 BPM)",
        "lively and vigorous (about 156–176 BPM)"
      ],
      "explanation": "Larghissimo = extremely slow (roughly below 24 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 896,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Largo\"?",
      "options": [
        "a passo d'uomo (circa 76–108 BPM)",
        "molto lento (circa 40–60 BPM)",
        "veloce e brillante (circa 120–156 BPM)",
        "molto veloce (circa 168–200 BPM)"
      ],
      "explanation": "Largo = molto lento (circa 40–60 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Largo\" mean?",
      "options": [
        "at a walking pace (about 76–108 BPM)",
        "very slow (about 40–60 BPM)",
        "fast and bright (about 120–156 BPM)",
        "very fast (about 168–200 BPM)"
      ],
      "explanation": "Largo = very slow (about 40–60 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 897,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Larghetto\"?",
      "options": [
        "velocità moderata (circa 108–120 BPM)",
        "vivo e vigoroso (circa 156–176 BPM)",
        "estremamente veloce (oltre 200 BPM)",
        "piuttosto lento (circa 60–66 BPM)"
      ],
      "explanation": "Larghetto = piuttosto lento (circa 60–66 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Larghetto\" mean?",
      "options": [
        "moderate speed (about 108–120 BPM)",
        "lively and vigorous (about 156–176 BPM)",
        "extremely fast (over 200 BPM)",
        "rather slow (about 60–66 BPM)"
      ],
      "explanation": "Larghetto = rather slow (about 60–66 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 898,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Adagio\"?",
      "options": [
        "veloce e brillante (circa 120–156 BPM)",
        "molto veloce (circa 168–200 BPM)",
        "lento e calmo (circa 66–76 BPM)",
        "estremamente lento (circa sotto i 24 BPM)"
      ],
      "explanation": "Adagio = lento e calmo (circa 66–76 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Adagio\" mean?",
      "options": [
        "fast and bright (about 120–156 BPM)",
        "very fast (about 168–200 BPM)",
        "slow and calm (about 66–76 BPM)",
        "extremely slow (roughly below 24 BPM)"
      ],
      "explanation": "Adagio = slow and calm (about 66–76 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 899,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Andante\"?",
      "options": [
        "a passo d'uomo (circa 76–108 BPM)",
        "vivo e vigoroso (circa 156–176 BPM)",
        "estremamente veloce (oltre 200 BPM)",
        "molto lento (circa 40–60 BPM)"
      ],
      "explanation": "Andante = a passo d'uomo (circa 76–108 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Andante\" mean?",
      "options": [
        "at a walking pace (about 76–108 BPM)",
        "lively and vigorous (about 156–176 BPM)",
        "extremely fast (over 200 BPM)",
        "very slow (about 40–60 BPM)"
      ],
      "explanation": "Andante = at a walking pace (about 76–108 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 900,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Moderato\"?",
      "options": [
        "molto veloce (circa 168–200 BPM)",
        "estremamente lento (circa sotto i 24 BPM)",
        "piuttosto lento (circa 60–66 BPM)",
        "velocità moderata (circa 108–120 BPM)"
      ],
      "explanation": "Moderato = velocità moderata (circa 108–120 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Moderato\" mean?",
      "options": [
        "very fast (about 168–200 BPM)",
        "extremely slow (roughly below 24 BPM)",
        "rather slow (about 60–66 BPM)",
        "moderate speed (about 108–120 BPM)"
      ],
      "explanation": "Moderato = moderate speed (about 108–120 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 901,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Allegro\"?",
      "options": [
        "estremamente veloce (oltre 200 BPM)",
        "veloce e brillante (circa 120–156 BPM)",
        "molto lento (circa 40–60 BPM)",
        "lento e calmo (circa 66–76 BPM)"
      ],
      "explanation": "Allegro = veloce e brillante (circa 120–156 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Allegro\" mean?",
      "options": [
        "extremely fast (over 200 BPM)",
        "fast and bright (about 120–156 BPM)",
        "very slow (about 40–60 BPM)",
        "slow and calm (about 66–76 BPM)"
      ],
      "explanation": "Allegro = fast and bright (about 120–156 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 902,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Vivace\"?",
      "options": [
        "vivo e vigoroso (circa 156–176 BPM)",
        "estremamente lento (circa sotto i 24 BPM)",
        "piuttosto lento (circa 60–66 BPM)",
        "a passo d'uomo (circa 76–108 BPM)"
      ],
      "explanation": "Vivace = vivo e vigoroso (circa 156–176 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Vivace\" mean?",
      "options": [
        "lively and vigorous (about 156–176 BPM)",
        "extremely slow (roughly below 24 BPM)",
        "rather slow (about 60–66 BPM)",
        "at a walking pace (about 76–108 BPM)"
      ],
      "explanation": "Vivace = lively and vigorous (about 156–176 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 903,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Presto\"?",
      "options": [
        "molto lento (circa 40–60 BPM)",
        "molto veloce (circa 168–200 BPM)",
        "lento e calmo (circa 66–76 BPM)",
        "velocità moderata (circa 108–120 BPM)"
      ],
      "explanation": "Presto = molto veloce (circa 168–200 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Presto\" mean?",
      "options": [
        "very slow (about 40–60 BPM)",
        "very fast (about 168–200 BPM)",
        "slow and calm (about 66–76 BPM)",
        "moderate speed (about 108–120 BPM)"
      ],
      "explanation": "Presto = very fast (about 168–200 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 904,
    "level": "easy",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Che cosa significa l'indicazione di tempo \"Prestissimo\"?",
      "options": [
        "piuttosto lento (circa 60–66 BPM)",
        "a passo d'uomo (circa 76–108 BPM)",
        "estremamente veloce (oltre 200 BPM)",
        "veloce e brillante (circa 120–156 BPM)"
      ],
      "explanation": "Prestissimo = estremamente veloce (oltre 200 BPM). I valori in BPM sono indicativi.",
      "sub": "Tempo"
    },
    "en": {
      "question": "What does the tempo marking \"Prestissimo\" mean?",
      "options": [
        "rather slow (about 60–66 BPM)",
        "at a walking pace (about 76–108 BPM)",
        "extremely fast (over 200 BPM)",
        "fast and bright (about 120–156 BPM)"
      ],
      "explanation": "Prestissimo = extremely fast (over 200 BPM). BPM ranges are approximate.",
      "sub": "Tempo"
    }
  },
  {
    "id": 905,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale intervallo ascendente separa C da E?",
      "options": [
        "Quarta aumentata",
        "Quarta giusta",
        "Seconda maggiore",
        "Terza maggiore"
      ],
      "explanation": "C → E: 3 nomi di nota (C → E) e 4 semitoni → terza maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from C to E?",
      "options": [
        "Augmented fourth",
        "Perfect fourth",
        "Major second",
        "Major third"
      ],
      "explanation": "C → E: 3 letter names (C → E) and 4 semitones → major third.",
      "sub": "Intervals"
    }
  },
  {
    "id": 906,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa D da F?",
      "options": [
        "Terza minore",
        "Seconda minore",
        "Seconda maggiore",
        "Quarta giusta"
      ],
      "explanation": "D → F: 3 nomi di nota (D → F) e 3 semitoni → terza minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from D to F?",
      "options": [
        "Minor third",
        "Minor second",
        "Major second",
        "Perfect fourth"
      ],
      "explanation": "D → F: 3 letter names (D → F) and 3 semitones → minor third.",
      "sub": "Intervals"
    }
  },
  {
    "id": 907,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale intervallo ascendente separa E da B?",
      "options": [
        "Quinta aumentata",
        "Quarta aumentata",
        "Quinta giusta",
        "Sesta minore"
      ],
      "explanation": "E → B: 5 nomi di nota (E → B) e 7 semitoni → quinta giusta.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from E to B?",
      "options": [
        "Augmented fifth",
        "Augmented fourth",
        "Perfect fifth",
        "Minor sixth"
      ],
      "explanation": "E → B: 5 letter names (E → B) and 7 semitones → perfect fifth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 908,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale intervallo ascendente separa F da Bb?",
      "options": [
        "Quinta giusta",
        "Terza maggiore",
        "Quarta giusta",
        "Quarta aumentata"
      ],
      "explanation": "F → Bb: 4 nomi di nota (F → B) e 5 semitoni → quarta giusta.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from F to Bb?",
      "options": [
        "Perfect fifth",
        "Major third",
        "Perfect fourth",
        "Augmented fourth"
      ],
      "explanation": "F → Bb: 4 letter names (F → B) and 5 semitones → perfect fourth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 909,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale intervallo ascendente separa G da E?",
      "options": [
        "Quinta giusta",
        "Settima minore",
        "Quinta aumentata",
        "Sesta maggiore"
      ],
      "explanation": "G → E: 6 nomi di nota (G → E) e 9 semitoni → sesta maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from G to E?",
      "options": [
        "Perfect fifth",
        "Minor seventh",
        "Augmented fifth",
        "Major sixth"
      ],
      "explanation": "G → E: 6 letter names (G → E) and 9 semitones → major sixth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 910,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa A da G?",
      "options": [
        "Settima minore",
        "Sesta maggiore",
        "Sesta minore",
        "Quinta aumentata"
      ],
      "explanation": "A → G: 7 nomi di nota (A → G) e 10 semitoni → settima minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from A to G?",
      "options": [
        "Minor seventh",
        "Major sixth",
        "Minor sixth",
        "Augmented fifth"
      ],
      "explanation": "A → G: 7 letter names (A → G) and 10 semitones → minor seventh.",
      "sub": "Intervals"
    }
  },
  {
    "id": 911,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa B da F?",
      "options": [
        "Quinta diminuita",
        "Quinta aumentata",
        "Quarta giusta",
        "Terza maggiore"
      ],
      "explanation": "B → F: 5 nomi di nota (B → F) e 6 semitoni → quinta diminuita.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from B to F?",
      "options": [
        "Diminished fifth",
        "Augmented fifth",
        "Perfect fourth",
        "Major third"
      ],
      "explanation": "B → F: 5 letter names (B → F) and 6 semitones → diminished fifth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 912,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa Bb da A?",
      "options": [
        "Settima maggiore",
        "Sesta maggiore",
        "Settima minore",
        "Sesta minore"
      ],
      "explanation": "Bb → A: 7 nomi di nota (B → A) e 11 semitoni → settima maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Bb to A?",
      "options": [
        "Major seventh",
        "Major sixth",
        "Minor seventh",
        "Minor sixth"
      ],
      "explanation": "Bb → A: 7 letter names (B → A) and 11 semitones → major seventh.",
      "sub": "Intervals"
    }
  },
  {
    "id": 913,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale intervallo ascendente separa Eb da C?",
      "options": [
        "Sesta minore",
        "Quinta giusta",
        "Quinta aumentata",
        "Sesta maggiore"
      ],
      "explanation": "Eb → C: 6 nomi di nota (E → C) e 9 semitoni → sesta maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Eb to C?",
      "options": [
        "Minor sixth",
        "Perfect fifth",
        "Augmented fifth",
        "Major sixth"
      ],
      "explanation": "Eb → C: 6 letter names (E → C) and 9 semitones → major sixth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 914,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale intervallo ascendente separa Ab da C?",
      "options": [
        "Seconda maggiore",
        "Terza maggiore",
        "Terza minore",
        "Quinta diminuita"
      ],
      "explanation": "Ab → C: 3 nomi di nota (A → C) e 4 semitoni → terza maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Ab to C?",
      "options": [
        "Major second",
        "Major third",
        "Minor third",
        "Diminished fifth"
      ],
      "explanation": "Ab → C: 3 letter names (A → C) and 4 semitones → major third.",
      "sub": "Intervals"
    }
  },
  {
    "id": 915,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa Db da Ab?",
      "options": [
        "Quinta giusta",
        "Sesta minore",
        "Quinta diminuita",
        "Quinta aumentata"
      ],
      "explanation": "Db → Ab: 5 nomi di nota (D → A) e 7 semitoni → quinta giusta.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Db to Ab?",
      "options": [
        "Perfect fifth",
        "Minor sixth",
        "Diminished fifth",
        "Augmented fifth"
      ],
      "explanation": "Db → Ab: 5 letter names (D → A) and 7 semitones → perfect fifth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 916,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa F# da A?",
      "options": [
        "Terza minore",
        "Seconda minore",
        "Terza maggiore",
        "Quarta giusta"
      ],
      "explanation": "F# → A: 3 nomi di nota (F → A) e 3 semitoni → terza minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from F# to A?",
      "options": [
        "Minor third",
        "Minor second",
        "Major third",
        "Perfect fourth"
      ],
      "explanation": "F# → A: 3 letter names (F → A) and 3 semitones → minor third.",
      "sub": "Intervals"
    }
  },
  {
    "id": 917,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa E da C?",
      "options": [
        "Sesta minore",
        "Quarta aumentata",
        "Settima minore",
        "Sesta maggiore"
      ],
      "explanation": "E → C: 6 nomi di nota (E → C) e 8 semitoni → sesta minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from E to C?",
      "options": [
        "Minor sixth",
        "Augmented fourth",
        "Minor seventh",
        "Major sixth"
      ],
      "explanation": "E → C: 6 letter names (E → C) and 8 semitones → minor sixth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 918,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale intervallo ascendente separa D da G#?",
      "options": [
        "Terza maggiore",
        "Quarta giusta",
        "Quinta giusta",
        "Quarta aumentata"
      ],
      "explanation": "D → G#: 4 nomi di nota (D → G) e 6 semitoni → quarta aumentata.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from D to G#?",
      "options": [
        "Major third",
        "Perfect fourth",
        "Perfect fifth",
        "Augmented fourth"
      ],
      "explanation": "D → G#: 4 letter names (D → G) and 6 semitones → augmented fourth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 919,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 3,
    "it": {
      "question": "Quale intervallo ascendente separa G da Ab?",
      "options": [
        "Seconda maggiore",
        "Terza minore",
        "Quarta giusta",
        "Seconda minore"
      ],
      "explanation": "G → Ab: 2 nomi di nota (G → A) e 1 semitono → seconda minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from G to Ab?",
      "options": [
        "Major second",
        "Minor third",
        "Perfect fourth",
        "Minor second"
      ],
      "explanation": "G → Ab: 2 letter names (G → A) and 1 semitone → minor second.",
      "sub": "Intervals"
    }
  },
  {
    "id": 920,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa C da G#?",
      "options": [
        "Quinta aumentata",
        "Quinta giusta",
        "Sesta maggiore",
        "Settima minore"
      ],
      "explanation": "C → G#: 5 nomi di nota (C → G) e 8 semitoni → quinta aumentata.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from C to G#?",
      "options": [
        "Augmented fifth",
        "Perfect fifth",
        "Major sixth",
        "Minor seventh"
      ],
      "explanation": "C → G#: 5 letter names (C → G) and 8 semitones → augmented fifth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 921,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale intervallo ascendente separa A da B?",
      "options": [
        "Terza maggiore",
        "Seconda maggiore",
        "Quarta giusta",
        "Seconda minore"
      ],
      "explanation": "A → B: 2 nomi di nota (A → B) e 2 semitoni → seconda maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from A to B?",
      "options": [
        "Major third",
        "Major second",
        "Perfect fourth",
        "Minor second"
      ],
      "explanation": "A → B: 2 letter names (A → B) and 2 semitones → major second.",
      "sub": "Intervals"
    }
  },
  {
    "id": 922,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale intervallo ascendente separa Gb da Cb?",
      "options": [
        "Quarta giusta",
        "Terza maggiore",
        "Quarta aumentata",
        "Quinta diminuita"
      ],
      "explanation": "Gb → Cb: 4 nomi di nota (G → C) e 5 semitoni → quarta giusta.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Gb to Cb?",
      "options": [
        "Perfect fourth",
        "Major third",
        "Augmented fourth",
        "Diminished fifth"
      ],
      "explanation": "Gb → Cb: 4 letter names (G → C) and 5 semitones → perfect fourth.",
      "sub": "Intervals"
    }
  },
  {
    "id": 923,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 1,
    "it": {
      "question": "Quale intervallo ascendente separa B da A?",
      "options": [
        "Sesta minore",
        "Settima minore",
        "Settima maggiore",
        "Sesta maggiore"
      ],
      "explanation": "B → A: 7 nomi di nota (B → A) e 10 semitoni → settima minore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from B to A?",
      "options": [
        "Minor sixth",
        "Minor seventh",
        "Major seventh",
        "Major sixth"
      ],
      "explanation": "B → A: 7 letter names (B → A) and 10 semitones → minor seventh.",
      "sub": "Intervals"
    }
  },
  {
    "id": 924,
    "level": "medium",
    "category": "general_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale intervallo ascendente separa Eb da D?",
      "options": [
        "Settima minore",
        "Quinta aumentata",
        "Settima maggiore",
        "Sesta minore"
      ],
      "explanation": "Eb → D: 7 nomi di nota (E → D) e 11 semitoni → settima maggiore.",
      "sub": "Intervalli"
    },
    "en": {
      "question": "What is the ascending interval from Eb to D?",
      "options": [
        "Minor seventh",
        "Augmented fifth",
        "Major seventh",
        "Minor sixth"
      ],
      "explanation": "Eb → D: 7 letter names (E → D) and 11 semitones → major seventh.",
      "sub": "Intervals"
    }
  },
  {
    "id": 925,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo C7b9?",
      "options": [
        "C, E, Gb, Bb",
        "C, E, G, Bb, Db",
        "C, E, G, Bb",
        "C, E, G, Bb, D#"
      ],
      "explanation": "C7b9 = 1 – 3 – 5 – b7 – b9 → C, E, G, Bb, Db. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C7b9 chord?",
      "options": [
        "C, E, Gb, Bb",
        "C, E, G, Bb, Db",
        "C, E, G, Bb",
        "C, E, G, Bb, D#"
      ],
      "explanation": "C7b9 = 1 – 3 – 5 – b7 – b9 → C, E, G, Bb, Db. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 926,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo C#7b9?",
      "options": [
        "C#, E#, G, B",
        "C#, E#, G#, B, D#",
        "C#, E#, G#, B",
        "C#, E#, G#, B, D"
      ],
      "explanation": "C#7b9 = 1 – 3 – 5 – b7 – b9 → C#, E#, G#, B, D (E# suona come F). Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C#7b9 chord?",
      "options": [
        "C#, E#, G, B",
        "C#, E#, G#, B, D#",
        "C#, E#, G#, B",
        "C#, E#, G#, B, D"
      ],
      "explanation": "C#7b9 = 1 – 3 – 5 – b7 – b9 → C#, E#, G#, B, D (E# sounds as F). Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 927,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo D7b9?",
      "options": [
        "D, F#, A, C, E#",
        "D, F#, Ab, C",
        "D, F#, A, C, Eb",
        "D, F#, A, C, E"
      ],
      "explanation": "D7b9 = 1 – 3 – 5 – b7 – b9 → D, F#, A, C, Eb. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the D7b9 chord?",
      "options": [
        "D, F#, A, C, E#",
        "D, F#, Ab, C",
        "D, F#, A, C, Eb",
        "D, F#, A, C, E"
      ],
      "explanation": "D7b9 = 1 – 3 – 5 – b7 – b9 → D, F#, A, C, Eb. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 928,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Eb7b9?",
      "options": [
        "Eb, G, Bb, Db",
        "Eb, G, Bb, Db, F#",
        "Eb, G, Bb, Db, Fb",
        "Eb, G, Bb, Db, F"
      ],
      "explanation": "Eb7b9 = 1 – 3 – 5 – b7 – b9 → Eb, G, Bb, Db, Fb (Fb suona come E). Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Eb7b9 chord?",
      "options": [
        "Eb, G, Bb, Db",
        "Eb, G, Bb, Db, F#",
        "Eb, G, Bb, Db, Fb",
        "Eb, G, Bb, Db, F"
      ],
      "explanation": "Eb7b9 = 1 – 3 – 5 – b7 – b9 → Eb, G, Bb, Db, Fb (Fb sounds as E). Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 929,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo E7b9?",
      "options": [
        "E, G#, Bb, D",
        "E, G#, B, D, F#",
        "E, G#, B, D, F",
        "E, G#, B, D"
      ],
      "explanation": "E7b9 = 1 – 3 – 5 – b7 – b9 → E, G#, B, D, F. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the E7b9 chord?",
      "options": [
        "E, G#, Bb, D",
        "E, G#, B, D, F#",
        "E, G#, B, D, F",
        "E, G#, B, D"
      ],
      "explanation": "E7b9 = 1 – 3 – 5 – b7 – b9 → E, G#, B, D, F. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 930,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F7b9?",
      "options": [
        "F, A, C, Eb, Gb",
        "F, A, C, Eb",
        "F, A, C, Eb, G#",
        "F, A, Cb, Eb"
      ],
      "explanation": "F7b9 = 1 – 3 – 5 – b7 – b9 → F, A, C, Eb, Gb. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F7b9 chord?",
      "options": [
        "F, A, C, Eb, Gb",
        "F, A, C, Eb",
        "F, A, C, Eb, G#",
        "F, A, Cb, Eb"
      ],
      "explanation": "F7b9 = 1 – 3 – 5 – b7 – b9 → F, A, C, Eb, Gb. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 931,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo F#7b9?",
      "options": [
        "F#, A#, C#, E, G#",
        "F#, A#, C#, E",
        "F#, A#, C, E",
        "F#, A#, C#, E, G"
      ],
      "explanation": "F#7b9 = 1 – 3 – 5 – b7 – b9 → F#, A#, C#, E, G. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F#7b9 chord?",
      "options": [
        "F#, A#, C#, E, G#",
        "F#, A#, C#, E",
        "F#, A#, C, E",
        "F#, A#, C#, E, G"
      ],
      "explanation": "F#7b9 = 1 – 3 – 5 – b7 – b9 → F#, A#, C#, E, G. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 932,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G7b9?",
      "options": [
        "G, B, D, F, Ab",
        "G, B, Db, F",
        "G, B, D, F, A",
        "G, B, D, F, A#"
      ],
      "explanation": "G7b9 = 1 – 3 – 5 – b7 – b9 → G, B, D, F, Ab. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G7b9 chord?",
      "options": [
        "G, B, D, F, Ab",
        "G, B, Db, F",
        "G, B, D, F, A",
        "G, B, D, F, A#"
      ],
      "explanation": "G7b9 = 1 – 3 – 5 – b7 – b9 → G, B, D, F, Ab. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 933,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo G#7b9?",
      "options": [
        "G#, B#, D, F#",
        "G#, B#, D#, F#, A#",
        "G#, B#, D#, F#",
        "G#, B#, D#, F#, A"
      ],
      "explanation": "G#7b9 = 1 – 3 – 5 – b7 – b9 → G#, B#, D#, F#, A (B# suona come C). Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G#7b9 chord?",
      "options": [
        "G#, B#, D, F#",
        "G#, B#, D#, F#, A#",
        "G#, B#, D#, F#",
        "G#, B#, D#, F#, A"
      ],
      "explanation": "G#7b9 = 1 – 3 – 5 – b7 – b9 → G#, B#, D#, F#, A (B# sounds as C). Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 934,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo A7b9?",
      "options": [
        "A, C#, Eb, G",
        "A, C#, E, G, B",
        "A, C#, E, G, B#",
        "A, C#, E, G, Bb"
      ],
      "explanation": "A7b9 = 1 – 3 – 5 – b7 – b9 → A, C#, E, G, Bb. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the A7b9 chord?",
      "options": [
        "A, C#, Eb, G",
        "A, C#, E, G, B",
        "A, C#, E, G, B#",
        "A, C#, E, G, Bb"
      ],
      "explanation": "A7b9 = 1 – 3 – 5 – b7 – b9 → A, C#, E, G, Bb. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 935,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Bb7b9?",
      "options": [
        "Bb, D, F, Ab, Cb",
        "Bb, D, Fb, Ab",
        "Bb, D, F, Ab, C#",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7b9 = 1 – 3 – 5 – b7 – b9 → Bb, D, F, Ab, Cb (Cb suona come B). Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bb7b9 chord?",
      "options": [
        "Bb, D, F, Ab, Cb",
        "Bb, D, Fb, Ab",
        "Bb, D, F, Ab, C#",
        "Bb, D, F, Ab"
      ],
      "explanation": "Bb7b9 = 1 – 3 – 5 – b7 – b9 → Bb, D, F, Ab, Cb (Cb sounds as B). Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 936,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo B7b9?",
      "options": [
        "B, D#, F#, A, C#",
        "B, D#, F, A",
        "B, D#, F#, A",
        "B, D#, F#, A, C"
      ],
      "explanation": "B7b9 = 1 – 3 – 5 – b7 – b9 → B, D#, F#, A, C. Dominante con 9ª minore.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the B7b9 chord?",
      "options": [
        "B, D#, F#, A, C#",
        "B, D#, F, A",
        "B, D#, F#, A",
        "B, D#, F#, A, C"
      ],
      "explanation": "B7b9 = 1 – 3 – 5 – b7 – b9 → B, D#, F#, A, C. Dominant with a flat 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 937,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo C7#9?",
      "options": [
        "C, E, G, Bb, Db",
        "C, E, G#, Bb",
        "C, Eb, G, Bb",
        "C, E, G, Bb, D#"
      ],
      "explanation": "C7#9 = 1 – 3 – 5 – b7 – #9 → C, E, G, Bb, D#. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C7#9 chord?",
      "options": [
        "C, E, G, Bb, Db",
        "C, E, G#, Bb",
        "C, Eb, G, Bb",
        "C, E, G, Bb, D#"
      ],
      "explanation": "C7#9 = 1 – 3 – 5 – b7 – #9 → C, E, G, Bb, D#. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 938,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Db7#9?",
      "options": [
        "Db, F, Ab, Cb, Eb",
        "Db, F, Ab, Cb, E",
        "Db, F, A, Cb",
        "Db, Fb, Ab, Cb"
      ],
      "explanation": "Db7#9 = 1 – 3 – 5 – b7 – #9 → Db, F, Ab, Cb, E (Cb suona come B). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Db7#9 chord?",
      "options": [
        "Db, F, Ab, Cb, Eb",
        "Db, F, Ab, Cb, E",
        "Db, F, A, Cb",
        "Db, Fb, Ab, Cb"
      ],
      "explanation": "Db7#9 = 1 – 3 – 5 – b7 – #9 → Db, F, Ab, Cb, E (Cb sounds as B). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 939,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo D7#9?",
      "options": [
        "D, F#, A, C, E#",
        "D, F#, A, C, Eb",
        "D, F#, A#, C",
        "D, F, A, C"
      ],
      "explanation": "D7#9 = 1 – 3 – 5 – b7 – #9 → D, F#, A, C, E# (E# suona come F). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the D7#9 chord?",
      "options": [
        "D, F#, A, C, E#",
        "D, F#, A, C, Eb",
        "D, F#, A#, C",
        "D, F, A, C"
      ],
      "explanation": "D7#9 = 1 – 3 – 5 – b7 – #9 → D, F#, A, C, E# (E# sounds as F). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 940,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Eb7#9?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, B, Db",
        "Eb, G, Bb, Db, F#",
        "Eb, G, Bb, Db, Fb"
      ],
      "explanation": "Eb7#9 = 1 – 3 – 5 – b7 – #9 → Eb, G, Bb, Db, F#. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Eb7#9 chord?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, B, Db",
        "Eb, G, Bb, Db, F#",
        "Eb, G, Bb, Db, Fb"
      ],
      "explanation": "Eb7#9 = 1 – 3 – 5 – b7 – #9 → Eb, G, Bb, Db, F#. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 941,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo E7#9?",
      "options": [
        "E, G, B, D",
        "E, G#, B, D, F##",
        "E, G#, B, D, F",
        "E, G#, B, D, F#"
      ],
      "explanation": "E7#9 = 1 – 3 – 5 – b7 – #9 → E, G#, B, D, F## (F## suona come G). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the E7#9 chord?",
      "options": [
        "E, G, B, D",
        "E, G#, B, D, F##",
        "E, G#, B, D, F",
        "E, G#, B, D, F#"
      ],
      "explanation": "E7#9 = 1 – 3 – 5 – b7 – #9 → E, G#, B, D, F## (F## sounds as G). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 942,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo F7#9?",
      "options": [
        "F, A, C#, Eb",
        "F, A, C, Eb, G",
        "F, A, C, Eb, G#",
        "F, A, C, Eb, Gb"
      ],
      "explanation": "F7#9 = 1 – 3 – 5 – b7 – #9 → F, A, C, Eb, G#. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F7#9 chord?",
      "options": [
        "F, A, C#, Eb",
        "F, A, C, Eb, G",
        "F, A, C, Eb, G#",
        "F, A, C, Eb, Gb"
      ],
      "explanation": "F7#9 = 1 – 3 – 5 – b7 – #9 → F, A, C, Eb, G#. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 943,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Gb7#9?",
      "options": [
        "Gb, Bb, Db, Fb, A",
        "Gb, Bb, D, Fb",
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gb7#9 = 1 – 3 – 5 – b7 – #9 → Gb, Bb, Db, Fb, A (Fb suona come E). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Gb7#9 chord?",
      "options": [
        "Gb, Bb, Db, Fb, A",
        "Gb, Bb, D, Fb",
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bbb, Db, Fb"
      ],
      "explanation": "Gb7#9 = 1 – 3 – 5 – b7 – #9 → Gb, Bb, Db, Fb, A (Fb sounds as E). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 944,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo G7#9?",
      "options": [
        "G, B, D#, F",
        "G, Bb, D, F",
        "G, B, D, F, A#",
        "G, B, D, F, A"
      ],
      "explanation": "G7#9 = 1 – 3 – 5 – b7 – #9 → G, B, D, F, A#. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G7#9 chord?",
      "options": [
        "G, B, D#, F",
        "G, Bb, D, F",
        "G, B, D, F, A#",
        "G, B, D, F, A"
      ],
      "explanation": "G7#9 = 1 – 3 – 5 – b7 – #9 → G, B, D, F, A#. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 945,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Ab7#9?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, Gb, Bb",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb, B"
      ],
      "explanation": "Ab7#9 = 1 – 3 – 5 – b7 – #9 → Ab, C, Eb, Gb, B. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Ab7#9 chord?",
      "options": [
        "Ab, Cb, Eb, Gb",
        "Ab, C, Eb, Gb, Bb",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb, B"
      ],
      "explanation": "Ab7#9 = 1 – 3 – 5 – b7 – #9 → Ab, C, Eb, Gb, B. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 946,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo A7#9?",
      "options": [
        "A, C#, E#, G",
        "A, C, E, G",
        "A, C#, E, G, B#",
        "A, C#, E, G, Bb"
      ],
      "explanation": "A7#9 = 1 – 3 – 5 – b7 – #9 → A, C#, E, G, B# (B# suona come C). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the A7#9 chord?",
      "options": [
        "A, C#, E#, G",
        "A, C, E, G",
        "A, C#, E, G, B#",
        "A, C#, E, G, Bb"
      ],
      "explanation": "A7#9 = 1 – 3 – 5 – b7 – #9 → A, C#, E, G, B# (B# sounds as C). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 947,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bb7#9?",
      "options": [
        "Bb, D, F#, Ab",
        "Bb, D, F, Ab, C#",
        "Bb, D, F, Ab, C",
        "Bb, Db, F, Ab"
      ],
      "explanation": "Bb7#9 = 1 – 3 – 5 – b7 – #9 → Bb, D, F, Ab, C#. Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bb7#9 chord?",
      "options": [
        "Bb, D, F#, Ab",
        "Bb, D, F, Ab, C#",
        "Bb, D, F, Ab, C",
        "Bb, Db, F, Ab"
      ],
      "explanation": "Bb7#9 = 1 – 3 – 5 – b7 – #9 → Bb, D, F, Ab, C#. Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 948,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo B7#9?",
      "options": [
        "B, D, F#, A",
        "B, D#, F#, A, C#",
        "B, D#, F#, A, C##",
        "B, D#, F#, A, C"
      ],
      "explanation": "B7#9 = 1 – 3 – 5 – b7 – #9 → B, D#, F#, A, C## (C## suona come D). Dominante con 9ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the B7#9 chord?",
      "options": [
        "B, D, F#, A",
        "B, D#, F#, A, C#",
        "B, D#, F#, A, C##",
        "B, D#, F#, A, C"
      ],
      "explanation": "B7#9 = 1 – 3 – 5 – b7 – #9 → B, D#, F#, A, C## (C## sounds as D). Dominant with a sharp 9th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 949,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo C7#5?",
      "options": [
        "C, E, G, Bb, D",
        "C, E, G, Bb",
        "C, E, G#, Bb",
        "C, E, G#, B"
      ],
      "explanation": "C7#5 = 1 – 3 – #5 – b7 → C, E, G#, Bb. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C7#5 chord?",
      "options": [
        "C, E, G, Bb, D",
        "C, E, G, Bb",
        "C, E, G#, Bb",
        "C, E, G#, B"
      ],
      "explanation": "C7#5 = 1 – 3 – #5 – b7 → C, E, G#, Bb. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 950,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Db7#5?",
      "options": [
        "Db, F, Ab, Cb, Eb",
        "Db, F, A, C",
        "Db, F, Ab, Cb",
        "Db, F, A, Cb"
      ],
      "explanation": "Db7#5 = 1 – 3 – #5 – b7 → Db, F, A, Cb (Cb suona come B). Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Db7#5 chord?",
      "options": [
        "Db, F, Ab, Cb, Eb",
        "Db, F, A, C",
        "Db, F, Ab, Cb",
        "Db, F, A, Cb"
      ],
      "explanation": "Db7#5 = 1 – 3 – #5 – b7 → Db, F, A, Cb (Cb sounds as B). Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 951,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo D7#5?",
      "options": [
        "D, F#, Ab, C",
        "D, F#, A#, C#",
        "D, F#, A#, C",
        "D, F#, A, C, E"
      ],
      "explanation": "D7#5 = 1 – 3 – #5 – b7 → D, F#, A#, C. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the D7#5 chord?",
      "options": [
        "D, F#, Ab, C",
        "D, F#, A#, C#",
        "D, F#, A#, C",
        "D, F#, A, C, E"
      ],
      "explanation": "D7#5 = 1 – 3 – #5 – b7 → D, F#, A#, C. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 952,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Eb7#5?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, B, Db",
        "Eb, G, Bb, Db",
        "Eb, G, B, D"
      ],
      "explanation": "Eb7#5 = 1 – 3 – #5 – b7 → Eb, G, B, Db. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Eb7#5 chord?",
      "options": [
        "Eb, G, Bb, Db, F",
        "Eb, G, B, Db",
        "Eb, G, Bb, Db",
        "Eb, G, B, D"
      ],
      "explanation": "Eb7#5 = 1 – 3 – #5 – b7 → Eb, G, B, Db. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 953,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo E7#5?",
      "options": [
        "E, G#, Bb, D",
        "E, G#, B, D",
        "E, G#, B, D, F#",
        "E, G#, B#, D"
      ],
      "explanation": "E7#5 = 1 – 3 – #5 – b7 → E, G#, B#, D (B# suona come C). Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the E7#5 chord?",
      "options": [
        "E, G#, Bb, D",
        "E, G#, B, D",
        "E, G#, B, D, F#",
        "E, G#, B#, D"
      ],
      "explanation": "E7#5 = 1 – 3 – #5 – b7 → E, G#, B#, D (B# sounds as C). Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 954,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo F7#5?",
      "options": [
        "F, A, Cb, Eb",
        "F, A, C#, Eb",
        "F, A, C#, E",
        "F, A, C, Eb"
      ],
      "explanation": "F7#5 = 1 – 3 – #5 – b7 → F, A, C#, Eb. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F7#5 chord?",
      "options": [
        "F, A, Cb, Eb",
        "F, A, C#, Eb",
        "F, A, C#, E",
        "F, A, C, Eb"
      ],
      "explanation": "F7#5 = 1 – 3 – #5 – b7 → F, A, C#, Eb. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 955,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Gb7#5?",
      "options": [
        "Gb, Bb, D, Fb",
        "Gb, Bb, D, F",
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bb, Db, Fb"
      ],
      "explanation": "Gb7#5 = 1 – 3 – #5 – b7 → Gb, Bb, D, Fb (Fb suona come E). Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Gb7#5 chord?",
      "options": [
        "Gb, Bb, D, Fb",
        "Gb, Bb, D, F",
        "Gb, Bb, Db, Fb, Ab",
        "Gb, Bb, Db, Fb"
      ],
      "explanation": "Gb7#5 = 1 – 3 – #5 – b7 → Gb, Bb, D, Fb (Fb sounds as E). Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 956,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo G7#5?",
      "options": [
        "G, B, D, F",
        "G, B, Db, F",
        "G, B, D#, F",
        "G, B, D, F, A"
      ],
      "explanation": "G7#5 = 1 – 3 – #5 – b7 → G, B, D#, F. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G7#5 chord?",
      "options": [
        "G, B, D, F",
        "G, B, Db, F",
        "G, B, D#, F",
        "G, B, D, F, A"
      ],
      "explanation": "G7#5 = 1 – 3 – #5 – b7 → G, B, D#, F. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 957,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Ab7#5?",
      "options": [
        "Ab, C, E, G",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, Gb, Bb"
      ],
      "explanation": "Ab7#5 = 1 – 3 – #5 – b7 → Ab, C, E, Gb. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Ab7#5 chord?",
      "options": [
        "Ab, C, E, G",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, Eb, Gb, Bb"
      ],
      "explanation": "Ab7#5 = 1 – 3 – #5 – b7 → Ab, C, E, Gb. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 958,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo A7#5?",
      "options": [
        "A, C#, E#, G#",
        "A, C#, E, G, B",
        "A, C#, E#, G",
        "A, C#, Eb, G"
      ],
      "explanation": "A7#5 = 1 – 3 – #5 – b7 → A, C#, E#, G (E# suona come F). Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the A7#5 chord?",
      "options": [
        "A, C#, E#, G#",
        "A, C#, E, G, B",
        "A, C#, E#, G",
        "A, C#, Eb, G"
      ],
      "explanation": "A7#5 = 1 – 3 – #5 – b7 → A, C#, E#, G (E# sounds as F). Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 959,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bb7#5?",
      "options": [
        "Bb, D, F, Ab",
        "Bb, D, F#, Ab",
        "Bb, D, F, Ab, C",
        "Bb, D, F#, A"
      ],
      "explanation": "Bb7#5 = 1 – 3 – #5 – b7 → Bb, D, F#, Ab. Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bb7#5 chord?",
      "options": [
        "Bb, D, F, Ab",
        "Bb, D, F#, Ab",
        "Bb, D, F, Ab, C",
        "Bb, D, F#, A"
      ],
      "explanation": "Bb7#5 = 1 – 3 – #5 – b7 → Bb, D, F#, Ab. Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 960,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo B7#5?",
      "options": [
        "B, D#, F##, A",
        "B, D#, F, A",
        "B, D#, F#, A",
        "B, D#, F#, A, C#"
      ],
      "explanation": "B7#5 = 1 – 3 – #5 – b7 → B, D#, F##, A (F## suona come G). Dominante con 5ª aumentata.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the B7#5 chord?",
      "options": [
        "B, D#, F##, A",
        "B, D#, F, A",
        "B, D#, F#, A",
        "B, D#, F#, A, C#"
      ],
      "explanation": "B7#5 = 1 – 3 – #5 – b7 → B, D#, F##, A (F## sounds as G). Dominant with an augmented 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 961,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo C7b5?",
      "options": [
        "C, E, Gb, Bb",
        "C, Eb, Gb, Bb",
        "C, E, G, Bb",
        "C, E, G, Bb, F#"
      ],
      "explanation": "C7b5 = 1 – 3 – b5 – b7 → C, E, Gb, Bb. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C7b5 chord?",
      "options": [
        "C, E, Gb, Bb",
        "C, Eb, Gb, Bb",
        "C, E, G, Bb",
        "C, E, G, Bb, F#"
      ],
      "explanation": "C7b5 = 1 – 3 – b5 – b7 → C, E, Gb, Bb. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 962,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo C#7b5?",
      "options": [
        "C#, E, G, B",
        "C#, E#, G#, B",
        "C#, E#, G, B",
        "C#, E#, G#, B, F##"
      ],
      "explanation": "C#7b5 = 1 – 3 – b5 – b7 → C#, E#, G, B (E# suona come F). Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the C#7b5 chord?",
      "options": [
        "C#, E, G, B",
        "C#, E#, G#, B",
        "C#, E#, G, B",
        "C#, E#, G#, B, F##"
      ],
      "explanation": "C#7b5 = 1 – 3 – b5 – b7 → C#, E#, G, B (E# sounds as F). Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 963,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo D7b5?",
      "options": [
        "D, F, Ab, C",
        "D, F#, A#, C",
        "D, F#, A, C, G#",
        "D, F#, Ab, C"
      ],
      "explanation": "D7b5 = 1 – 3 – b5 – b7 → D, F#, Ab, C. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the D7b5 chord?",
      "options": [
        "D, F, Ab, C",
        "D, F#, A#, C",
        "D, F#, A, C, G#",
        "D, F#, Ab, C"
      ],
      "explanation": "D7b5 = 1 – 3 – b5 – b7 → D, F#, Ab, C. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 964,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G#7b5?",
      "options": [
        "G#, B#, D, F#",
        "G#, B, D, F#",
        "G#, B#, D#, F#",
        "G#, B#, D#, F#, C##"
      ],
      "explanation": "G#7b5 = 1 – 3 – b5 – b7 → G#, B#, D, F# (B# suona come C). Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G#7b5 chord?",
      "options": [
        "G#, B#, D, F#",
        "G#, B, D, F#",
        "G#, B#, D#, F#",
        "G#, B#, D#, F#, C##"
      ],
      "explanation": "G#7b5 = 1 – 3 – b5 – b7 → G#, B#, D, F# (B# sounds as C). Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 965,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo E7b5?",
      "options": [
        "E, G#, B, D, A#",
        "E, G#, B#, D",
        "E, G#, Bb, D",
        "E, G#, B, D"
      ],
      "explanation": "E7b5 = 1 – 3 – b5 – b7 → E, G#, Bb, D. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the E7b5 chord?",
      "options": [
        "E, G#, B, D, A#",
        "E, G#, B#, D",
        "E, G#, Bb, D",
        "E, G#, B, D"
      ],
      "explanation": "E7b5 = 1 – 3 – b5 – b7 → E, G#, Bb, D. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 966,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo F7b5?",
      "options": [
        "F, A, Cb, Eb",
        "F, A, C, Eb, B",
        "F, A, C, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "F7b5 = 1 – 3 – b5 – b7 → F, A, Cb, Eb (Cb suona come B). Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F7b5 chord?",
      "options": [
        "F, A, Cb, Eb",
        "F, A, C, Eb, B",
        "F, A, C, Eb",
        "F, Ab, Cb, Eb"
      ],
      "explanation": "F7b5 = 1 – 3 – b5 – b7 → F, A, Cb, Eb (Cb sounds as B). Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 967,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo F#7b5?",
      "options": [
        "F#, A#, C#, E",
        "F#, A#, C#, E, B#",
        "F#, A#, C, E",
        "F#, A, C, E"
      ],
      "explanation": "F#7b5 = 1 – 3 – b5 – b7 → F#, A#, C, E. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the F#7b5 chord?",
      "options": [
        "F#, A#, C#, E",
        "F#, A#, C#, E, B#",
        "F#, A#, C, E",
        "F#, A, C, E"
      ],
      "explanation": "F#7b5 = 1 – 3 – b5 – b7 → F#, A#, C, E. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 968,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo G7b5?",
      "options": [
        "G, B, Db, F",
        "G, Bb, Db, F",
        "G, B, D, F, C#",
        "G, B, D#, F"
      ],
      "explanation": "G7b5 = 1 – 3 – b5 – b7 → G, B, Db, F. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the G7b5 chord?",
      "options": [
        "G, B, Db, F",
        "G, Bb, Db, F",
        "G, B, D, F, C#",
        "G, B, D#, F"
      ],
      "explanation": "G7b5 = 1 – 3 – b5 – b7 → G, B, Db, F. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 969,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Ab7b5?",
      "options": [
        "Ab, C, Ebb, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb, D"
      ],
      "explanation": "Ab7b5 = 1 – 3 – b5 – b7 → Ab, C, Ebb, Gb (Ebb suona come D). Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Ab7b5 chord?",
      "options": [
        "Ab, C, Ebb, Gb",
        "Ab, C, Eb, Gb",
        "Ab, C, E, Gb",
        "Ab, C, Eb, Gb, D"
      ],
      "explanation": "Ab7b5 = 1 – 3 – b5 – b7 → Ab, C, Ebb, Gb (Ebb sounds as D). Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 970,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo A7b5?",
      "options": [
        "A, C#, E, G, D#",
        "A, C#, E#, G",
        "A, C#, Eb, G",
        "A, C, Eb, G"
      ],
      "explanation": "A7b5 = 1 – 3 – b5 – b7 → A, C#, Eb, G. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the A7b5 chord?",
      "options": [
        "A, C#, E, G, D#",
        "A, C#, E#, G",
        "A, C#, Eb, G",
        "A, C, Eb, G"
      ],
      "explanation": "A7b5 = 1 – 3 – b5 – b7 → A, C#, Eb, G. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 971,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 3,
    "it": {
      "question": "Quali note compongono l'accordo Bb7b5?",
      "options": [
        "Bb, Db, Fb, Ab",
        "Bb, D, F, Ab, E",
        "Bb, D, F#, Ab",
        "Bb, D, Fb, Ab"
      ],
      "explanation": "Bb7b5 = 1 – 3 – b5 – b7 → Bb, D, Fb, Ab (Fb suona come E). Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bb7b5 chord?",
      "options": [
        "Bb, Db, Fb, Ab",
        "Bb, D, F, Ab, E",
        "Bb, D, F#, Ab",
        "Bb, D, Fb, Ab"
      ],
      "explanation": "Bb7b5 = 1 – 3 – b5 – b7 → Bb, D, Fb, Ab (Fb sounds as E). Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 972,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo B7b5?",
      "options": [
        "B, D#, F, A",
        "B, D, F, A",
        "B, D#, F#, A, E#",
        "B, D#, F#, A"
      ],
      "explanation": "B7b5 = 1 – 3 – b5 – b7 → B, D#, F, A. Dominante con 5ª diminuita.",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the B7b5 chord?",
      "options": [
        "B, D#, F, A",
        "B, D, F, A",
        "B, D#, F#, A, E#",
        "B, D#, F#, A"
      ],
      "explanation": "B7b5 = 1 – 3 – b5 – b7 → B, D#, F, A. Dominant with a diminished 5th.",
      "sub": "Extended chords"
    }
  },
  {
    "id": 973,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Cmaj7#11?",
      "options": [
        "C, E, G#, B",
        "C, E, G, B, F#",
        "C, E, G, B",
        "C, E, G, B, D"
      ],
      "explanation": "Cmaj7#11 = 1 – 3 – 5 – 7 – #11 → C, E, G, B, F#. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Cmaj7#11 chord?",
      "options": [
        "C, E, G#, B",
        "C, E, G, B, F#",
        "C, E, G, B",
        "C, E, G, B, D"
      ],
      "explanation": "Cmaj7#11 = 1 – 3 – 5 – 7 – #11 → C, E, G, B, F#. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 974,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Dbmaj7#11?",
      "options": [
        "Db, F, Ab, Cb, G",
        "Db, F, Ab, C, Eb",
        "Db, F, Ab, C, G",
        "Db, F, A, C"
      ],
      "explanation": "Dbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Db, F, Ab, C, G. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Dbmaj7#11 chord?",
      "options": [
        "Db, F, Ab, Cb, G",
        "Db, F, Ab, C, Eb",
        "Db, F, Ab, C, G",
        "Db, F, A, C"
      ],
      "explanation": "Dbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Db, F, Ab, C, G. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 975,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Dmaj7#11?",
      "options": [
        "D, F#, A#, C#",
        "D, F#, A, C#, G#",
        "D, F#, A, C#, E",
        "D, F#, A, C#"
      ],
      "explanation": "Dmaj7#11 = 1 – 3 – 5 – 7 – #11 → D, F#, A, C#, G#. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Dmaj7#11 chord?",
      "options": [
        "D, F#, A#, C#",
        "D, F#, A, C#, G#",
        "D, F#, A, C#, E",
        "D, F#, A, C#"
      ],
      "explanation": "Dmaj7#11 = 1 – 3 – 5 – 7 – #11 → D, F#, A, C#, G#. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 976,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Ebmaj7#11?",
      "options": [
        "Eb, G, Bb, D, A",
        "Eb, G, Bb, Db, A",
        "Eb, G, Bb, D, F",
        "Eb, G, B, D"
      ],
      "explanation": "Ebmaj7#11 = 1 – 3 – 5 – 7 – #11 → Eb, G, Bb, D, A. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Ebmaj7#11 chord?",
      "options": [
        "Eb, G, Bb, D, A",
        "Eb, G, Bb, Db, A",
        "Eb, G, Bb, D, F",
        "Eb, G, B, D"
      ],
      "explanation": "Ebmaj7#11 = 1 – 3 – 5 – 7 – #11 → Eb, G, Bb, D, A. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 977,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Emaj7#11?",
      "options": [
        "E, G#, B#, D#",
        "E, G#, B, D#, A#",
        "E, G#, B, D, A#",
        "E, G#, B, D#"
      ],
      "explanation": "Emaj7#11 = 1 – 3 – 5 – 7 – #11 → E, G#, B, D#, A#. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Emaj7#11 chord?",
      "options": [
        "E, G#, B#, D#",
        "E, G#, B, D#, A#",
        "E, G#, B, D, A#",
        "E, G#, B, D#"
      ],
      "explanation": "Emaj7#11 = 1 – 3 – 5 – 7 – #11 → E, G#, B, D#, A#. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 978,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 0,
    "it": {
      "question": "Quali note compongono l'accordo Fmaj7#11?",
      "options": [
        "F, A, C, E, B",
        "F, A, C, E, G",
        "F, A, C#, E",
        "F, A, C, Eb, B"
      ],
      "explanation": "Fmaj7#11 = 1 – 3 – 5 – 7 – #11 → F, A, C, E, B. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Fmaj7#11 chord?",
      "options": [
        "F, A, C, E, B",
        "F, A, C, E, G",
        "F, A, C#, E",
        "F, A, C, Eb, B"
      ],
      "explanation": "Fmaj7#11 = 1 – 3 – 5 – 7 – #11 → F, A, C, E, B. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 979,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Gbmaj7#11?",
      "options": [
        "Gb, Bb, Db, Fb, C",
        "Gb, Bb, Db, F, Ab",
        "Gb, Bb, Db, F, C",
        "Gb, Bb, D, F"
      ],
      "explanation": "Gbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Gb, Bb, Db, F, C. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Gbmaj7#11 chord?",
      "options": [
        "Gb, Bb, Db, Fb, C",
        "Gb, Bb, Db, F, Ab",
        "Gb, Bb, Db, F, C",
        "Gb, Bb, D, F"
      ],
      "explanation": "Gbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Gb, Bb, Db, F, C. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 980,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Gmaj7#11?",
      "options": [
        "G, B, D, F#, A",
        "G, B, D, F#, C#",
        "G, B, D#, F#",
        "G, B, D, F, C#"
      ],
      "explanation": "Gmaj7#11 = 1 – 3 – 5 – 7 – #11 → G, B, D, F#, C#. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Gmaj7#11 chord?",
      "options": [
        "G, B, D, F#, A",
        "G, B, D, F#, C#",
        "G, B, D#, F#",
        "G, B, D, F, C#"
      ],
      "explanation": "Gmaj7#11 = 1 – 3 – 5 – 7 – #11 → G, B, D, F#, C#. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 981,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Abmaj7#11?",
      "options": [
        "Ab, C, Eb, G, Bb",
        "Ab, C, E, G",
        "Ab, C, Eb, G, D",
        "Ab, C, Eb, G"
      ],
      "explanation": "Abmaj7#11 = 1 – 3 – 5 – 7 – #11 → Ab, C, Eb, G, D. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Abmaj7#11 chord?",
      "options": [
        "Ab, C, Eb, G, Bb",
        "Ab, C, E, G",
        "Ab, C, Eb, G, D",
        "Ab, C, Eb, G"
      ],
      "explanation": "Abmaj7#11 = 1 – 3 – 5 – 7 – #11 → Ab, C, Eb, G, D. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 982,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Amaj7#11?",
      "options": [
        "A, C#, E#, G#",
        "A, C#, E, G#, D#",
        "A, C#, E, G, D#",
        "A, C#, E, G#, B"
      ],
      "explanation": "Amaj7#11 = 1 – 3 – 5 – 7 – #11 → A, C#, E, G#, D#. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Amaj7#11 chord?",
      "options": [
        "A, C#, E#, G#",
        "A, C#, E, G#, D#",
        "A, C#, E, G, D#",
        "A, C#, E, G#, B"
      ],
      "explanation": "Amaj7#11 = 1 – 3 – 5 – 7 – #11 → A, C#, E, G#, D#. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 983,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 1,
    "it": {
      "question": "Quali note compongono l'accordo Bbmaj7#11?",
      "options": [
        "Bb, D, F, Ab, E",
        "Bb, D, F, A, E",
        "Bb, D, F, A, C",
        "Bb, D, F#, A"
      ],
      "explanation": "Bbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Bb, D, F, A, E. Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bbmaj7#11 chord?",
      "options": [
        "Bb, D, F, Ab, E",
        "Bb, D, F, A, E",
        "Bb, D, F, A, C",
        "Bb, D, F#, A"
      ],
      "explanation": "Bbmaj7#11 = 1 – 3 – 5 – 7 – #11 → Bb, D, F, A, E. Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 984,
    "level": "hard",
    "category": "jazz_harmony",
    "correct_idx": 2,
    "it": {
      "question": "Quali note compongono l'accordo Bmaj7#11?",
      "options": [
        "B, D#, F#, A#",
        "B, D#, F#, A#, C#",
        "B, D#, F#, A#, E#",
        "B, D#, F#, A, E#"
      ],
      "explanation": "Bmaj7#11 = 1 – 3 – 5 – 7 – #11 → B, D#, F#, A#, E# (E# suona come F). Maj7 con 11ª aumentata (sonorità lidia).",
      "sub": "Accordi estesi"
    },
    "en": {
      "question": "Which notes make up the Bmaj7#11 chord?",
      "options": [
        "B, D#, F#, A#",
        "B, D#, F#, A#, C#",
        "B, D#, F#, A#, E#",
        "B, D#, F#, A, E#"
      ],
      "explanation": "Bmaj7#11 = 1 – 3 – 5 – 7 – #11 → B, D#, F#, A#, E# (E# sounds as F). Maj7 with a sharp 11th (Lydian sound).",
      "sub": "Extended chords"
    }
  },
  {
    "id": 985,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "In C maggiore, quale modo si suona sull'accordo Cmaj7 (Imaj7)?",
      "options": [
        "C Locrio",
        "C Dorico",
        "C Ionio",
        "C Frigio"
      ],
      "explanation": "Restando nella scala di C maggiore, partire dal I grado (C) dà il 1° modo: C Ionio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In C major, which mode fits the Cmaj7 chord (Imaj7)?",
      "options": [
        "C Locrian",
        "C Dorian",
        "C Ionian",
        "C Phrygian"
      ],
      "explanation": "Staying inside C major, starting on degree I (C) gives the 1st mode: C Ionian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 986,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "In F maggiore, quale modo si suona sull'accordo Bbmaj7 (IVmaj7)?",
      "options": [
        "Bb Eolio",
        "Bb Locrio",
        "Bb Frigio",
        "Bb Lidio"
      ],
      "explanation": "Restando nella scala di F maggiore, partire dal IV grado (Bb) dà il 4° modo: Bb Lidio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In F major, which mode fits the Bbmaj7 chord (IVmaj7)?",
      "options": [
        "Bb Aeolian",
        "Bb Locrian",
        "Bb Phrygian",
        "Bb Lydian"
      ],
      "explanation": "Staying inside F major, starting on degree IV (Bb) gives the 4th mode: Bb Lydian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 987,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "In Bb maggiore, quale modo si suona sull'accordo Cm7 (iim7)?",
      "options": [
        "C Misolidio",
        "C Dorico",
        "C Lidio",
        "C Ionio"
      ],
      "explanation": "Restando nella scala di Bb maggiore, partire dal II grado (C) dà il 2° modo: C Dorico.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In Bb major, which mode fits the Cm7 chord (iim7)?",
      "options": [
        "C Mixolydian",
        "C Dorian",
        "C Lydian",
        "C Ionian"
      ],
      "explanation": "Staying inside Bb major, starting on degree II (C) gives the 2nd mode: C Dorian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 988,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "In Eb maggiore, quale modo si suona sull'accordo Bb7 (V7)?",
      "options": [
        "Bb Lidio",
        "Bb Frigio",
        "Bb Locrio",
        "Bb Misolidio"
      ],
      "explanation": "Restando nella scala di Eb maggiore, partire dal V grado (Bb) dà il 5° modo: Bb Misolidio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In Eb major, which mode fits the Bb7 chord (V7)?",
      "options": [
        "Bb Lydian",
        "Bb Phrygian",
        "Bb Locrian",
        "Bb Mixolydian"
      ],
      "explanation": "Staying inside Eb major, starting on degree V (Bb) gives the 5th mode: Bb Mixolydian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 989,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "In G maggiore, quale modo si suona sull'accordo F#m7b5 (viiø7)?",
      "options": [
        "F# Locrio",
        "F# Lidio",
        "F# Eolio",
        "F# Ionio"
      ],
      "explanation": "Restando nella scala di G maggiore, partire dal VII grado (F#) dà il 7° modo: F# Locrio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In G major, which mode fits the F#m7b5 chord (viiø7)?",
      "options": [
        "F# Locrian",
        "F# Lydian",
        "F# Aeolian",
        "F# Ionian"
      ],
      "explanation": "Staying inside G major, starting on degree VII (F#) gives the 7th mode: F# Locrian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 990,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "In D maggiore, quale modo si suona sull'accordo F#m7 (iiim7)?",
      "options": [
        "F# Misolidio",
        "F# Frigio",
        "F# Locrio",
        "F# Lidio"
      ],
      "explanation": "Restando nella scala di D maggiore, partire dal III grado (F#) dà il 3° modo: F# Frigio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In D major, which mode fits the F#m7 chord (iiim7)?",
      "options": [
        "F# Mixolydian",
        "F# Phrygian",
        "F# Locrian",
        "F# Lydian"
      ],
      "explanation": "Staying inside D major, starting on degree III (F#) gives the 3rd mode: F# Phrygian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 991,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "In Ab maggiore, quale modo si suona sull'accordo Fm7 (vim7)?",
      "options": [
        "F Eolio",
        "F Misolidio",
        "F Ionio",
        "F Lidio"
      ],
      "explanation": "Restando nella scala di Ab maggiore, partire dal VI grado (F) dà il 6° modo: F Eolio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In Ab major, which mode fits the Fm7 chord (vim7)?",
      "options": [
        "F Aeolian",
        "F Mixolydian",
        "F Ionian",
        "F Lydian"
      ],
      "explanation": "Staying inside Ab major, starting on degree VI (F) gives the 6th mode: F Aeolian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 992,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "In A maggiore, quale modo si suona sull'accordo Amaj7 (Imaj7)?",
      "options": [
        "A Dorico",
        "A Eolio",
        "A Ionio",
        "A Frigio"
      ],
      "explanation": "Restando nella scala di A maggiore, partire dal I grado (A) dà il 1° modo: A Ionio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In A major, which mode fits the Amaj7 chord (Imaj7)?",
      "options": [
        "A Dorian",
        "A Aeolian",
        "A Ionian",
        "A Phrygian"
      ],
      "explanation": "Staying inside A major, starting on degree I (A) gives the 1st mode: A Ionian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 993,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "In Db maggiore, quale modo si suona sull'accordo Gbmaj7 (IVmaj7)?",
      "options": [
        "Gb Locrio",
        "Gb Lidio",
        "Gb Dorico",
        "Gb Frigio"
      ],
      "explanation": "Restando nella scala di Db maggiore, partire dal IV grado (Gb) dà il 4° modo: Gb Lidio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In Db major, which mode fits the Gbmaj7 chord (IVmaj7)?",
      "options": [
        "Gb Locrian",
        "Gb Lydian",
        "Gb Dorian",
        "Gb Phrygian"
      ],
      "explanation": "Staying inside Db major, starting on degree IV (Gb) gives the 4th mode: Gb Lydian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 994,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 1,
    "it": {
      "question": "In E maggiore, quale modo si suona sull'accordo F#m7 (iim7)?",
      "options": [
        "F# Ionio",
        "F# Dorico",
        "F# Misolidio",
        "F# Lidio"
      ],
      "explanation": "Restando nella scala di E maggiore, partire dal II grado (F#) dà il 2° modo: F# Dorico.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In E major, which mode fits the F#m7 chord (iim7)?",
      "options": [
        "F# Ionian",
        "F# Dorian",
        "F# Mixolydian",
        "F# Lydian"
      ],
      "explanation": "Staying inside E major, starting on degree II (F#) gives the 2nd mode: F# Dorian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 995,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "In Gb maggiore, quale modo si suona sull'accordo Db7 (V7)?",
      "options": [
        "Db Eolio",
        "Db Ionio",
        "Db Misolidio",
        "Db Frigio"
      ],
      "explanation": "Restando nella scala di Gb maggiore, partire dal V grado (Db) dà il 5° modo: Db Misolidio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In Gb major, which mode fits the Db7 chord (V7)?",
      "options": [
        "Db Aeolian",
        "Db Ionian",
        "Db Mixolydian",
        "Db Phrygian"
      ],
      "explanation": "Staying inside Gb major, starting on degree V (Db) gives the 5th mode: Db Mixolydian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 996,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 3,
    "it": {
      "question": "In B maggiore, quale modo si suona sull'accordo G#m7 (vim7)?",
      "options": [
        "G# Ionio",
        "G# Misolidio",
        "G# Lidio",
        "G# Eolio"
      ],
      "explanation": "Restando nella scala di B maggiore, partire dal VI grado (G#) dà il 6° modo: G# Eolio.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "In B major, which mode fits the G#m7 chord (vim7)?",
      "options": [
        "G# Ionian",
        "G# Mixolydian",
        "G# Lydian",
        "G# Aeolian"
      ],
      "explanation": "Staying inside B major, starting on degree VI (G#) gives the 6th mode: G# Aeolian.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 997,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale scala si usa di solito sull'accordo C7alt?",
      "options": [
        "C Alterata (superlocria)",
        "C Misolidio",
        "C Lidia dominante",
        "C Ionio"
      ],
      "explanation": "La scala alterata (7° modo della minore melodica) contiene b9, #9, b5/#11 e #5/b13: tutte le tensioni alterate.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "Which scale is usually played over C7alt?",
      "options": [
        "C Altered (Super Locrian)",
        "C Mixolydian",
        "C Lydian dominant",
        "C Ionian"
      ],
      "explanation": "The altered scale (7th mode of melodic minor) contains b9, #9, b5/#11 and #5/b13: every altered tension.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 998,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale scala si usa di solito sull'accordo D7#11?",
      "options": [
        "D Alterata (superlocria)",
        "D Dorico",
        "D Lidia dominante",
        "D Locrio"
      ],
      "explanation": "La lidia dominante (4° modo della minore melodica) è un Misolidio con la 4ª aumentata: contiene 3, b7 e #11.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "Which scale is usually played over D7#11?",
      "options": [
        "D Altered (Super Locrian)",
        "D Dorian",
        "D Lydian dominant",
        "D Locrian"
      ],
      "explanation": "Lydian dominant (4th mode of melodic minor) is Mixolydian with a raised 4th: it contains 3, b7 and #11.",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 999,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 0,
    "it": {
      "question": "Quale scala si usa di solito sull'accordo EbmMaj7?",
      "options": [
        "Eb Minore melodica",
        "Eb Dorico",
        "Eb Misolidio",
        "Eb Locrio"
      ],
      "explanation": "L'accordo minore con 7ª maggiore nasce sul I grado della minore melodica (b3 e 7 naturale).",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "Which scale is usually played over EbmMaj7?",
      "options": [
        "Eb Melodic minor",
        "Eb Dorian",
        "Eb Mixolydian",
        "Eb Locrian"
      ],
      "explanation": "The minor-major seventh chord comes from degree I of melodic minor (b3 with a natural 7).",
      "sub": "Chord-scale"
    }
  },
  {
    "id": 1000,
    "level": "medium",
    "category": "jazz_theory",
    "correct_idx": 2,
    "it": {
      "question": "Quale scala si usa di solito sull'accordo Edim7?",
      "options": [
        "E Ionio",
        "E Misolidio",
        "E Diminuita (tono–semitono)",
        "E Lidio"
      ],
      "explanation": "Sul dim7 si usa la diminuita tono–semitono: contiene le quattro note dell'accordo più quattro note a un tono sopra ciascuna.",
      "sub": "Scala-accordo"
    },
    "en": {
      "question": "Which scale is usually played over Edim7?",
      "options": [
        "E Ionian",
        "E Mixolydian",
        "E Diminished (whole–half)",
        "E Lydian"
      ],
      "explanation": "Over dim7 use the whole–half diminished scale: it holds the four chord tones plus a note a whole step above each.",
      "sub": "Chord-scale"
    }
  }
];
