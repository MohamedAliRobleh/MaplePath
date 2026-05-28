import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../../store/useAppStore'
import TaskDetailSheet from '../ui/TaskDetailSheet'
import { phases } from '../../data/tasks'

export default function TaskList() {
  const { t } = useTranslation()
  const { tasks, toggleTask, profile } = useAppStore()
  const { getToken } = useAuth()
  const [selectedTask, setSelectedTask] = useState(null)

  const currentPhase = profile?.phase_actuelle ?? 1
  const phaseTasks = tasks.filter(t => t.phase === currentPhase)
  const phaseName = phases.find(p => p.id === currentPhase)?.label || ''

  // Urgent first, then by jour_cible asc
  const pending = phaseTasks
    .filter(t => !t.complete)
    .sort((a, b) => {
      if (a.priorite === 'urgent' && b.priorite !== 'urgent') return -1
      if (b.priorite === 'urgent' && a.priorite !== 'urgent') return 1
      return (a.jour_cible ?? 999) - (b.jour_cible ?? 999)
    })

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

  if (!tasks.length) return (
    <div className="mx-4 mt-6 p-6 bg-white rounded-3xl border border-black/5 text-center">
      <p className="text-4xl mb-2">📋</p>
      <p className="font-display font-semibold text-gray-900">{t('dashboard.noTasks')}</p>
      <p className="text-sm text-gray-500 mt-1">{t('dashboard.noTasksDesc')}</p>
    </div>
  )

  return (
    <>
      <div className="px-4 mt-5">
        {pending.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-display font-bold text-base text-gray-900">Étape en cours</h3>
                <p className="text-xs text-gray-400 mt-0.5">{phaseName} · {pending.length} tâche{pending.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {pending.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedTask(task)}
                  className="flex items-center gap-3 p-4 bg-white rounded-3xl border border-black/5 shadow-card cursor-pointer active:scale-[0.99] transition-transform"
                >
                  <button
                    onClick={(e) => handleToggle(e, task.id)}
                    className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-200 hover:border-brand-300 transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-gray-900 leading-snug">{task.titre}</p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{task.description}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center">
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          phaseTasks.length > 0 && (
            <div className="text-center py-10">
              <p className="text-4xl mb-2">✅</p>
              <p className="font-display font-bold text-gray-900">Phase terminée !</p>
              <p className="text-sm text-gray-400 mt-1">Valide ton étape dans la Checklist</p>
            </div>
          )
        )}
      </div>

      <TaskDetailSheet task={selectedTask} onClose={() => setSelectedTask(null)} />
    </>
  )
}
