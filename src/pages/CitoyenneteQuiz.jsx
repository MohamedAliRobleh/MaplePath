import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useAuth } from '@clerk/clerk-react'
import { Timer, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { getRandomQuestions, categoriesQuiz } from '../data/quiz'

export default function CitoyenneteQuiz() {
  const { t } = useTranslation()
  const { getToken } = useAuth()
  const [mode, setMode] = useState(null) // null | 'practice' | 'exam'
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (mode !== 'exam' || finished) return
    setTimeLeft(30 * 60)
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { clearInterval(t); finishQuiz(); return 0 }
      return s - 1
    }), 1000)
    return () => clearInterval(t)
  }, [mode])

  function startMode(m) {
    const qs = m === 'practice' ? getRandomQuestions(10) : getRandomQuestions(20)
    setQuestions(qs)
    setMode(m)
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setConfetti(false)
    startTime.current = Date.now()
  }

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === questions[current].reponse
    setTimeout(() => {
      setAnswers(a => [...a, { questionId: questions[current].id, correct, selected: idx }])
      if (current < questions.length - 1) {
        setCurrent(c => c + 1)
        setSelected(null)
      } else {
        finishQuiz([...answers, { questionId: questions[current].id, correct, selected: idx }])
      }
    }, 1200)
  }

  async function finishQuiz(finalAnswers = answers) {
    const score = finalAnswers.filter(a => a.correct).length
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    const duree = Math.round((Date.now() - startTime.current) / 1000)
    setFinished(true)
    if (pct >= 75) setConfetti(true)
    try {
      const token = await getToken()
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ score, total_questions: total, pourcentage: pct, duree_secondes: duree, questions_ratees: finalAnswers.filter(a => !a.correct).map(a => a.questionId) }),
      })
    } catch {}
  }

  const score = answers.filter(a => a.correct).length
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0

  if (!mode) return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{t('quiz.title')}</h2>
      <p className="text-gray-500 text-sm mb-6">{t('quiz.subtitle')}</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(categoriesQuiz).map(([key, cat]) => (
          <div key={key} className="p-3 bg-white rounded-3xl border border-black/5 shadow-card">
            <p className="font-display font-bold text-lg text-gray-900">{cat.count}</p>
            <p className="text-xs text-gray-500">{cat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Button onClick={() => startMode('practice')} fullWidth>{t('quiz.practiceBtn')}</Button>
        <Button variant="secondary" onClick={() => startMode('exam')} fullWidth>{t('quiz.examBtn')}</Button>
      </div>
    </div>
  )

  if (finished) {
    const passed = pct >= 75
    return (
      <div className="px-4 py-6 text-center">
        {confetti && <ReactConfetti recycle={false} numberOfPieces={200} colors={['#FFD600', '#C41E3A']} />}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-50'}`}>
          {passed ? <CheckCircle size={40} className="text-green-500" /> : <XCircle size={40} className="text-red-400" />}
        </div>
        <h3 className="font-display font-bold text-3xl text-gray-900">{score}/{questions.length}</h3>
        <p className="text-gray-500 mt-1">{pct}% — {passed ? t('quiz.passed') : t('quiz.failed')}</p>
        <div className="mt-6 mb-6">
          <ProgressBar value={score} max={questions.length} color={passed ? 'green' : 'red'} showLabel />
        </div>
        {!passed && (
          <div className="mb-6 text-left">
            <h4 className="font-display font-semibold text-sm text-gray-700 mb-2">{t('quiz.toReview')}</h4>
            <div className="flex flex-col gap-2">
              {answers.filter(a => !a.correct).slice(0, 5).map(a => {
                const q = questions.find(q => q.id === a.questionId)
                return q ? (
                  <div key={a.questionId} className="p-3 bg-red-50 rounded-2xl text-sm text-red-800">{q.question}</div>
                ) : null
              })}
            </div>
          </div>
        )}
        <Button onClick={() => setMode(null)} fullWidth>
          <RotateCcw size={16} className="mr-2 inline" /> {t('quiz.restart')}
        </Button>
      </div>
    )
  }

  const q = questions[current]
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="brand">{current + 1}/{questions.length}</Badge>
        {mode === 'exam' && (
          <div className={`flex items-center gap-1 text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
            <Timer size={14} />
            {mins}:{secs.toString().padStart(2, '0')}
          </div>
        )}
      </div>
      <ProgressBar value={current} max={questions.length} className="mb-6" />
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
          <h3 className="font-display font-bold text-xl text-gray-900 mb-6 leading-tight">{q.question}</h3>
          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              let style = 'border-gray-100 bg-white'
              if (selected !== null) {
                if (i === q.reponse) style = 'border-green-400 bg-green-50'
                else if (i === selected && selected !== q.reponse) style = 'border-red-300 bg-red-50'
                else style = 'border-gray-100 bg-gray-50 opacity-60'
              }
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: selected === null ? 0.98 : 1 }}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`p-4 rounded-3xl border-2 text-left font-display font-medium text-sm text-gray-900 transition-all ${style}`}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>
          {selected !== null && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-blue-50 rounded-2xl text-sm text-blue-800"
            >
              💡 {q.explication}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
