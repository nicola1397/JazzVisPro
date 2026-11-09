import { shallowRef, ref } from 'vue'

// Quiz questions, one file per language (src/data/quiz/it.json, en.json): the Quiz page
// downloads only the language on screen. A question has the same id in both files; loading
// the second language adds its text to the questions already in memory, so a quiz in
// progress just switches language.
export const quizList = shallowRef([])
export const quizVersion = ref(0)          // bumps when a language arrives
const byId = new Map()
const loading = {}

const FILES = {
  it: () => import('../data/quiz/it.json'),
  en: () => import('../data/quiz/en.json'),
}

export function loadQuiz(lang) {
  const key = FILES[lang] ? lang : 'it'
  if (!loading[key]) {
    loading[key] = FILES[key]().then(m => {
      for (const q of m.default) {
        const cur = byId.get(q.id)
        if (cur) cur[key] = q[key]
        else byId.set(q.id, q)
      }
      quizList.value = [...byId.values()]
      quizVersion.value++
    }).catch(err => { delete loading[key]; throw err })
  }
  return loading[key]
}
