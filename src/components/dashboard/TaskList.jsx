import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import useAppStore from '../../store/useAppStore'
import { useAuth } from '@clerk/clerk-react'

export default function TaskList() {
  const { tasks, toggleTask } = useAppStore()
  const { getToken } = useAuth()

  async function handleToggle(taskId) {
    toggleTask(taskId)
    try {
      const token = await getToken()
      const task = tasks.find(t => t.id === taskId)
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: taskId, complete: !task.complete }),
      })
    } catch { toggleTask(taskId) }
  }

  const urgent = tasks.filter(t => t.priorite === 'urgent' && !t.complete)
  const week   = tasks.filter(t => t.priorite === 'normal' && !t.complete && (t.jour_cible || 0) <= 7)
  const month  = tasks.filter(t => !t.complete && (t.jour_cible || 0) > 7).slice(0, 5)

  function TaskItem({ task, index }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        className="flex items-start gap-3 p-4 bg-white rounded-3xl border border-black/5 shadow-card"
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
          {task.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>}
          <div className="flex items-center gap-2 mt-2">
            {task.priorite === 'urgent' && <Badge variant="urgent">Urgent</Badge>}
            {task.jour_cible != null && <Badge variant="gray">J+{task.jour_cible}</Badge>}
            {task.organisme && <Badge variant="info">{task.organisme}</Badge>}
          </div>
        </div>
        {task.lien_officiel && (
          <a href={task.lien_officiel} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100">
            <ExternalLink size={14} className="text-gray-400" />
          </a>
        )}
      </motion.div>
    )
  }

  function Section({ title, items, badge }) {
    if (!items.length) return null
    return (
      <div className="mt-5 px-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-display font-bold text-base text-gray-900">{title}</h3>
          {badge}
        </div>
        <div className="flex flex-col gap-2">
          {items.map((t, i) => <TaskItem key={t.id} task={t} index={i} />)}
        </div>
      </div>
    )
  }

  if (!tasks.length) return (
    <div className="mx-4 mt-6 p-6 bg-white rounded-3xl border border-black/5 text-center">
      <p className="text-4xl mb-2">📋</p>
      <p className="font-display font-semibold text-gray-900">Aucune tâche pour l'instant</p>
      <p className="text-sm text-gray-500 mt-1">Complète le sondage pour générer ton parcours</p>
    </div>
  )

  return (
    <>
      <Section title="Urgent aujourd'hui" items={urgent} badge={<Badge variant="urgent">{urgent.length}</Badge>} />
      <Section title="Cette semaine" items={week} badge={<Badge variant="warning">{week.length}</Badge>} />
      <Section title="Ce mois" items={month} badge={<Badge variant="gray">{month.length}</Badge>} />
    </>
  )
}
