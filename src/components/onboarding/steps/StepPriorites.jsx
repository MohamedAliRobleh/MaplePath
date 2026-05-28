import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import useAppStore from '../../../store/useAppStore'
import Button from '../../ui/Button'

const options = [
  { code: 'logement',    icon: '🏠', label: 'Logement' },
  { code: 'emploi',      icon: '💼', label: 'Emploi' },
  { code: 'sante',       icon: '🏥', label: 'Santé' },
  { code: 'education',   icon: '🏫', label: 'Éducation' },
  { code: 'banque',      icon: '🏦', label: 'Banque' },
  { code: 'transport',   icon: '🚗', label: 'Transport' },
  { code: 'langue',      icon: '🗣️', label: 'Apprendre la langue' },
  { code: 'droits',      icon: '⚖️', label: 'Mes droits' },
  { code: 'citoyennete', icon: '🍁', label: 'Citoyenneté' },
  { code: 'reseau',      icon: '👥', label: 'Réseau social' },
]

export default function StepPriorites({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.priorites || []

  function toggle(code) {
    const next = selected.includes(code) ? selected.filter(c => c !== code) : [...selected, code]
    setAnswer('priorites', next)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">Qu'est-ce qui est urgent pour toi ?</h2>
      <p className="text-gray-500 text-sm mb-6">Choisis tout ce qui s'applique.</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {options.map((o, i) => {
          const isSelected = selected.includes(o.code)
          return (
            <motion.button
              key={o.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(o.code)}
              className={`relative flex items-center gap-2 p-3 rounded-2xl border-2 text-left transition-all
                ${isSelected ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <span className="text-xl">{o.icon}</span>
              <span className="font-display font-medium text-sm text-gray-900 flex-1">{o.label}</span>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-brand-300 flex items-center justify-center flex-shrink-0">
                  <Check size={12} strokeWidth={3} className="text-brand-900" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
      <Button fullWidth onClick={onNext} disabled={selected.length === 0}>
        Voir mon parcours →
      </Button>
    </div>
  )
}
