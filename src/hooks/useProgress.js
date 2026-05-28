import useAppStore from '../store/useAppStore'
import { phases } from '../data/tasks'

export function useProgress() {
  const { tasks, profile } = useAppStore()

  const completedByPhase = phases.map(p => {
    const phaseTasks = tasks.filter(t => t.phase === p.id)
    const done = phaseTasks.filter(t => t.complete).length
    return { phase: p.id, total: phaseTasks.length, done, pct: phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0 }
  })

  const overall = tasks.length
    ? Math.round((tasks.filter(t => t.complete).length / tasks.length) * 100)
    : 0

  return { completedByPhase, overall, currentPhase: profile?.phase_actuelle || 1 }
}
