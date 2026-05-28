import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const langues = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
  { code: 'other', flag: '🌍', label: 'Autre' },
]

export default function StepLangue({ onNext }) {
  const { onboardingAnswers, setAnswer, setLangue } = useAppStore()
  const selected = onboardingAnswers.langue

  function handleSelect(code) {
    setAnswer('langue', code)
    if (['fr', 'en', 'ar', 'es'].includes(code)) setLangue(code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Quelle langue préfères-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">What language do you prefer?</p>
      <div className="grid grid-cols-2 gap-3">
        {langues.map((l, i) => (
          <motion.button
            key={l.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(l.code)}
            className={`flex items-center gap-3 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === l.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{l.flag}</span>
            <span className="font-display font-semibold text-sm text-gray-900">{l.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
