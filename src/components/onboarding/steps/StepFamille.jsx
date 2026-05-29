import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import useAppStore from '../../../store/useAppStore'

const FAM_CODES = [
  { code: 'seul',              icon: '👤' },
  { code: 'couple',            icon: '👫' },
  { code: 'famille_jeunes',    icon: '👨‍👩‍👶' },
  { code: 'famille_scolaires', icon: '👨‍👩‍👧‍👦' },
  { code: 'parent_seul',       icon: '👩‍👦' },
]

export default function StepFamille({ onNext }) {
  const { t } = useTranslation()
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.situation_fam

  function handleSelect(code) {
    setAnswer('situation_fam', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">{t('onboarding.familleQ')}</h2>
      <p className="text-gray-500 text-sm mb-6">{t('onboarding.familleSub')}</p>
      <div className="flex flex-col gap-3">
        {FAM_CODES.map((s, i) => (
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
            <span className="font-display font-semibold text-base text-gray-900">{t(`onboarding.fam_${s.code}`)}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
