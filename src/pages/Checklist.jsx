import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Plus } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import useAppStore from '../store/useAppStore'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { phases, taskCategories } from '../data/tasks'

export default function Checklist() {
  const { t } = useTranslation()
  const { tasks, toggleTask } = useAppStore()
  const { getToken } = useAuth()
  const [activePhase, setActivePhase] = useState(1)
  const [activeCategory, setActiveCategory] = useState('all')

  const phaseTasks = tasks.filter(t => t.phase === activePhase)
  const filtered = activeCategory === 'all'
    ? phaseTasks
    : phaseTasks.filter(t => t.categorie === activeCategory)
  const done = phaseTasks.filter(t => t.complete).length
  const pct = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0

  const usedCategories = [...new Set(phaseTasks.map(t => t.categorie).filter(Boolean))]

  async function handleToggle(taskId) {
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

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-2xl text-gray-900">{t('checklist.title')}</h2>
        <Badge variant={pct === 100 ? 'success' : 'brand'}>{pct}%</Badge>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => { setActivePhase(p.id); setActiveCategory('all') }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-display font-semibold transition-all
              ${activePhase === p.id ? 'bg-brand-300 text-brand-900' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'}`}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Progress for active phase */}
      <div className="bg-white rounded-3xl border border-black/5 p-4 mb-4 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">{t('checklist.tasks', { done, total: phaseTasks.length })}</span>
          <span className="text-xs font-medium text-brand-600">{t('checklist.completed', { pct })}</span>
        </div>
        <ProgressBar value={done} max={phaseTasks.length || 1} />
      </div>

      {/* Category filters */}
      {usedCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {t('checklist.all')}
          </button>
          {usedCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {taskCategories[cat]?.label || cat}
            </button>
          ))}
        </div>
      )}

      {/* Task list */}
      <AnimatePresence>
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">✅</p>
              <p className="font-display font-semibold text-gray-900">{t('checklist.empty')}</p>
              <p className="text-sm text-gray-500 mt-1">{t('checklist.emptyDesc')}</p>
            </div>
          )}
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-start gap-3 p-4 rounded-3xl border-2 transition-all
                ${task.complete ? 'border-green-200 bg-green-50' : 'border-black/5 bg-white shadow-card'}`}
            >
              <button
                onClick={() => handleToggle(task.id)}
                className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 transition-all
                  ${task.complete ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-brand-300'}`}
              />
              <div className="flex-1 min-w-0">
                <p className={`font-display font-semibold text-sm ${task.complete ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.titre}
                </p>
                {task.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {task.priorite === 'urgent' && <Badge variant="urgent">{t('common.urgent')}</Badge>}
                  {task.formulaire && <Badge variant="info">{task.formulaire}</Badge>}
                  {task.organisme && <Badge variant="gray">{task.organisme}</Badge>}
                </div>
              </div>
              {task.lien_officiel && (
                <a href={task.lien_officiel} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* FAB */}
      <div className="fixed bottom-24 right-4">
        <button className="w-14 h-14 bg-brand-300 rounded-full shadow-brand flex items-center justify-center">
          <Plus size={24} className="text-brand-900" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
