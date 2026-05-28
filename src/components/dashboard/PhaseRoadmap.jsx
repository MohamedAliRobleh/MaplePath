import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Modal from '../ui/Modal'
import useAppStore from '../../store/useAppStore'
import { phases } from '../../data/tasks'

export default function PhaseRoadmap() {
  const { t } = useTranslation()
  const { profile, getTasksByPhase } = useAppStore()
  const currentPhase = profile?.phase_actuelle || 1
  const [modalPhase, setModalPhase] = useState(null)

  return (
    <>
      <div className="mt-5 px-4">
        <h3 className="font-display font-bold text-base text-gray-900 mb-3">{t('dashboard.journey')}</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {phases.map((phase, i) => {
            const done = phase.id < currentPhase
            const active = phase.id === currentPhase
            return (
              <motion.button
                key={phase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setModalPhase(phase)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all
                  ${done ? 'border-green-200 bg-green-50 text-green-700' : ''}
                  ${active ? 'border-brand-300 bg-brand-300 text-brand-900' : ''}
                  ${!done && !active ? 'border-gray-100 bg-white text-gray-400' : ''}`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : <span className="text-sm">{phase.icon}</span>}
                <span className="font-display font-semibold text-sm whitespace-nowrap">{phase.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Modal open={!!modalPhase} onClose={() => setModalPhase(null)} title={modalPhase ? `${modalPhase.icon} ${modalPhase.label}` : ''}>
        {modalPhase && (
          <div>
            <p className="text-sm text-gray-500 mb-4">{modalPhase.description} · {modalPhase.days}</p>
            <div className="flex flex-col gap-2">
              {getTasksByPhase(modalPhase.id).slice(0, 8).map(task => (
                <div key={task.id} className={`flex items-center gap-3 p-3 rounded-2xl ${task.complete ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.complete ? 'bg-green-500' : task.priorite === 'urgent' ? 'bg-red-400' : 'bg-gray-300'}`} />
                  <span className={`text-sm ${task.complete ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.titre}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
