import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, CheckCircle, ChevronRight, ArrowRight } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import useAppStore from '../store/useAppStore'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import TaskDetailSheet from '../components/ui/TaskDetailSheet'
import { phases } from '../data/tasks'

function phaseStats(tasks, phaseId) {
  const pt = tasks.filter(t => t.phase === phaseId)
  const done = pt.filter(t => t.complete).length
  const pct  = pt.length ? Math.round((done / pt.length) * 100) : 0
  return { total: pt.length, done, pct }
}

export default function Checklist() {
  const { t } = useTranslation()
  const { tasks, toggleTask, profile, updateProfile } = useAppStore()
  const { getToken } = useAuth()
  const [activePhase, setActivePhase] = useState(profile?.phase_actuelle ?? 1)
  const [selectedTask, setSelectedTask] = useState(null)
  const [validating, setValidating] = useState(false)
  const [validated, setValidated] = useState(false)

  const currentPhase = profile?.phase_actuelle ?? 1
  const phaseTasks   = tasks.filter(t => t.phase === activePhase)
  const done         = phaseTasks.filter(t => t.complete).length
  const pct          = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0

  const nextPhase  = phases.find(p => p.id === activePhase + 1)
  const isComplete = pct === 100 && phaseTasks.length > 0

  async function handleToggle(e, taskId) {
    e.stopPropagation()
    const task = tasks.find(t => t.id === taskId)
    toggleTask(taskId)
    try {
      const token = await getToken()
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: taskId, complete: !task.complete }),
      })
    } catch { toggleTask(taskId) }
  }

  async function handleValidatePhase() {
    if (!nextPhase || validating) return
    setValidating(true)
    const newPhaseId = nextPhase.id
    updateProfile({ phase_actuelle: newPhaseId })
    try {
      const token = await getToken()
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ phase_actuelle: newPhaseId }),
      })
      setValidated(true)
      setTimeout(() => {
        setActivePhase(newPhaseId)
        setValidating(false)
        setValidated(false)
      }, 900)
    } catch {
      updateProfile({ phase_actuelle: activePhase })
      setValidating(false)
    }
  }

  return (
    <div className="px-4 py-4 pb-32">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-2xl text-gray-900">{t('checklist.title')}</h2>
        <Badge variant={pct === 100 ? 'success' : 'brand'}>{pct}%</Badge>
      </div>

      {/* Phase tabs with progress indicator */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {phases.map(p => {
          const stats   = phaseStats(tasks, p.id)
          const isDone  = stats.total > 0 && stats.pct === 100
          const isCurrent = p.id === currentPhase
          const isActive  = p.id === activePhase

          return (
            <button
              key={p.id}
              onClick={() => setActivePhase(p.id)}
              className={`relative flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-display font-semibold transition-all
                ${isActive
                  ? 'bg-brand-300 text-brand-900'
                  : isDone
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-white border border-gray-200 text-gray-400'}`}
            >
              {isDone ? (
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" strokeWidth={2.5} />
              ) : (
                <span>{p.icon}</span>
              )}
              <span>{p.label}</span>
              {isCurrent && !isActive && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-400 rounded-full border-2 border-white" />
              )}
            </button>
          )
        })}
      </div>

      {/* Next step banner — shown when viewing a completed past phase or current phase */}
      {nextPhase && !isComplete && activePhase === currentPhase && phaseTasks.length > 0 && (
        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 mb-4">
          <ArrowRight size={14} className="text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500">
            {t('checklist.nextStepLabel')}{' '}
            <span className="font-semibold text-gray-700">{nextPhase.icon} {nextPhase.label}</span>
          </p>
        </div>
      )}

      {/* Progress card */}
      <div className="bg-white rounded-3xl border border-black/5 p-4 mb-4 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">{t('checklist.tasks', { done, total: phaseTasks.length })}</span>
          <span className="text-xs font-medium text-brand-600">{t('checklist.completed', { pct })}</span>
        </div>
        <ProgressBar value={done} max={phaseTasks.length || 1} />
      </div>

      {/* Phase complete — validation card */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="phase-complete"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative overflow-hidden rounded-3xl mb-4 p-5"
            style={{ background: 'linear-gradient(135deg, #FFD600 0%, #FFE033 60%, #FFF0A0 100%)' }}
          >
            <div className="pointer-events-none absolute -right-3 -top-3 text-[7rem] leading-none opacity-[0.08] select-none">🍁</div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle size={24} className="text-brand-900" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display font-bold text-brand-900 text-base leading-tight">
                  {t('checklist.phaseComplete')}
                </p>
                <p className="text-xs text-brand-900/60 mt-0.5">
                  {phases.find(p => p.id === activePhase)?.icon}{' '}
                  {phases.find(p => p.id === activePhase)?.label}
                  {' · '}{t('checklist.taskCount', { count: phaseTasks.length })}
                </p>
              </div>
            </div>

            {nextPhase ? (
              <button
                onClick={handleValidatePhase}
                disabled={validating}
                className="w-full bg-gray-900 text-white font-display font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {validated ? (
                  <span>✅ {t('checklist.validated')}</span>
                ) : validating ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{nextPhase.icon} {t('checklist.nextPhase', { phase: nextPhase.label })}</span>
                    <ChevronRight size={16} strokeWidth={2.5} />
                  </>
                )}
              </button>
            ) : (
              <p className="text-center font-display font-bold text-brand-900 text-sm">
                {t('checklist.allDone')}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {phaseTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">✅</p>
            <p className="font-display font-semibold text-gray-900">{t('checklist.empty')}</p>
            <p className="text-sm text-gray-500 mt-1">{t('checklist.emptyDesc')}</p>
          </div>
        )}
        {phaseTasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelectedTask(task)}
            className={`flex items-center gap-3 p-4 rounded-3xl border-2 transition-all cursor-pointer active:scale-[0.99]
              ${task.complete ? 'border-green-100 bg-green-50' : 'border-black/5 bg-white shadow-card'}`}
          >
            <button
              onClick={(e) => handleToggle(e, task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all
                ${task.complete ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-brand-300'}`}
            />
            <div className="flex-1 min-w-0">
              <p className={`font-display font-semibold text-sm leading-snug
                ${task.complete ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.titre}
              </p>
              {task.description && (
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{task.description}</p>
              )}
            </div>
            {!task.complete && (
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                <ChevronRight size={12} className="text-gray-300" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* FAB */}
      <div className="fixed bottom-24 right-4">
        <button className="w-14 h-14 bg-brand-300 rounded-full shadow-brand flex items-center justify-center">
          <Plus size={24} className="text-brand-900" strokeWidth={2.5} />
        </button>
      </div>

      <TaskDetailSheet task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  )
}
