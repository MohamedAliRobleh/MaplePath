import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useAppStore from '../../../store/useAppStore'

const ETAPE_CODES = [
  { code: 'pre_arrivee', icon: '✈️' },
  { code: 'semaine_1',   icon: '📍' },
  { code: 'mois_1',      icon: '📅' },
  { code: 'mois_3',      icon: '🗓️' },
  { code: 'an_1',        icon: '📆' },
  { code: 'citoyennete', icon: '🏛️' },
]

export default function StepEtape({ onNext }) {
  const { t } = useTranslation()
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.etape_parcours

  function handleSelect(code) {
    setAnswer('etape_parcours', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{t('onboarding.etapeQ')}</h2>
      <p className="text-gray-500 text-sm mb-6">{t('onboarding.etapeSub')}</p>
      <div className="flex flex-col gap-3">
        {ETAPE_CODES.map((e, i) => (
          <motion.button
            key={e.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(e.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === e.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{e.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{t(`onboarding.etape_${e.code}`)}</p>
              <p className="text-xs text-gray-500">{t(`onboarding.etape_${e.code}_desc`)}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
