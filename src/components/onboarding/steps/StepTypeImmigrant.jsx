import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useAppStore from '../../../store/useAppStore'

const TYPE_CODES = [
  { code: 'rp_economique',    icon: '🏆' },
  { code: 'refugie_gov',      icon: '🤝' },
  { code: 'refugie_prive',    icon: '🤝' },
  { code: 'conjoint',         icon: '❤️' },
  { code: 'etudiant',         icon: '🎓' },
  { code: 'travailleur',      icon: '💼' },
  { code: 'demandeur_asile',  icon: '📋' },
  { code: 'pre_arrivee',      icon: '✈️' },
]

export default function StepTypeImmigrant({ onNext }) {
  const { t } = useTranslation()
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.type_immigrant

  function handleSelect(code) {
    setAnswer('type_immigrant', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{t('onboarding.typeQ')}</h2>
      <p className="text-gray-500 text-sm mb-6">{t('onboarding.typeSub')}</p>
      <div className="flex flex-col gap-3">
        {TYPE_CODES.map((type, i) => (
          <motion.button
            key={type.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(type.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === type.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{type.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{t(`onboarding.type_${type.code}`)}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t(`onboarding.type_${type.code}_desc`)}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
