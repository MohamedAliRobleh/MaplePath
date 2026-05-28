import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProgressBar from '../ui/ProgressBar'
import useAppStore from '../../store/useAppStore'
import { phases } from '../../data/tasks'

export default function HeroCard() {
  const { t } = useTranslation()
  const { profile, getUrgentTasks, getCompletionRate } = useAppStore()
  const navigate = useNavigate()
  const urgent = getUrgentTasks()
  const pct = getCompletionRate()
  const phase = phases.find(p => p.id === (profile?.phase_actuelle || 1))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4 rounded-4xl bg-brand-300 p-6 shadow-brand"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-body text-brand-800 text-sm font-medium">{t('dashboard.hello')} 👋</p>
          <h2 className="font-display font-bold text-2xl text-brand-900 mt-0.5">
            {profile?.prenom || 'MaplePath'}
          </h2>
        </div>
        {profile?.province && (
          <div className="flex items-center gap-1 bg-brand-400/30 rounded-full px-3 py-1">
            <MapPin size={12} className="text-brand-800" />
            <span className="text-xs font-medium text-brand-900">{profile.province}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-brand-800">
            {phase?.label} · {t('dashboard.progress', { pct })}
          </span>
        </div>
        <ProgressBar value={pct} max={100} color="brand" className="[&>div>div]:bg-brand-700" />
      </div>

      {urgent.length > 0 && (
        <button
          onClick={() => navigate('/checklist')}
          className="w-full flex items-center justify-between bg-brand-400/40 rounded-2xl px-4 py-3"
        >
          <span className="text-sm font-display font-semibold text-brand-900">
            {t('dashboard.urgentCount', { count: urgent.length })}
          </span>
          <ChevronRight size={16} className="text-brand-800" />
        </button>
      )}
    </motion.div>
  )
}
