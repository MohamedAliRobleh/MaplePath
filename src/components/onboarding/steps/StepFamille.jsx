import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const situations = [
  { code: 'seul',              icon: '👤', label: 'Seul(e)' },
  { code: 'couple',            icon: '👫', label: 'En couple (sans enfants)' },
  { code: 'famille_jeunes',    icon: '👨‍👩‍👶', label: 'Famille — enfants 0–5 ans' },
  { code: 'famille_scolaires', icon: '👨‍👩‍👧‍👦', label: 'Famille — enfants 6–17 ans' },
  { code: 'parent_seul',       icon: '👩‍👦', label: 'Parent seul' },
]

export default function StepFamille({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.situation_fam

  function handleSelect(code) {
    setAnswer('situation_fam', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Quelle est ta situation familiale ?</h2>
      <p className="text-gray-500 text-sm mb-6">Pour personnaliser tes tâches liées à la famille.</p>
      <div className="flex flex-col gap-3">
        {situations.map((s, i) => (
          <motion.button
            key={s.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(s.code)}
            className={`flex items-center gap-4 p-5 rounded-3xl border-2 text-left transition-all
              ${selected === s.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="font-display font-semibold text-base text-gray-900">{s.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
