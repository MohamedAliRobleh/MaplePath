import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import useAppStore from '../../store/useAppStore'
import i18n from '../../lib/i18n'

export default function AppShell({ children }) {
  const { userId, getToken, isLoaded } = useAuth()
  const { profile, setProfile, setTasks, langue } = useAppStore()

  useEffect(() => {
    if (langue && i18n.language !== langue) i18n.changeLanguage(langue)
  }, [langue])
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded || !userId) return
    if (profile) return

    async function hydrate() {
      try {
        const token = await getToken()
        const [prof, tasks] = await Promise.all([
          fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
          fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        ])
        if (!prof || prof.error) { navigate('/onboarding'); return }
        if (!prof.onboarding_done) { navigate('/onboarding'); return }
        setProfile(prof)
        if (Array.isArray(tasks)) setTasks(tasks)
      } catch {
        navigate('/onboarding')
      }
    }
    hydrate()
  }, [isLoaded, userId])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <TopBar />
      <main className="pb-24 pt-2">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
