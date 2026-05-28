import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function SondageProgress({ current, total }) {
  const { t } = useTranslation()
  const pct = ((current) / total) * 100

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          {t('onboarding.step', { current, total })}
        </span>
        <span className="text-xs font-medium text-brand-600">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-brand-300 rounded-full"
        />
      </div>
    </div>
  )
}
