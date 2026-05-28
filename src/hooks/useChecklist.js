import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../store/useAppStore'

export function useChecklist() {
  const { getToken, isSignedIn } = useAuth()
  const { tasks, setTasks, toggleTask } = useAppStore()
  const [loading, setLoading] = useState(!tasks.length)

  useEffect(() => {
    if (!isSignedIn || tasks.length) { setLoading(false); return }
    async function fetch_() {
      try {
        const token = await getToken()
        const data = await fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        if (Array.isArray(data)) setTasks(data)
      } catch {}
      finally { setLoading(false) }
    }
    fetch_()
  }, [isSignedIn])

  return { tasks, loading, toggleTask }
}
