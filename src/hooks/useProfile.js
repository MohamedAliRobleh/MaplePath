import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../store/useAppStore'

export function useProfile() {
  const { getToken, isSignedIn } = useAuth()
  const { profile, setProfile } = useAppStore()
  const [loading, setLoading] = useState(!profile)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSignedIn || profile) { setLoading(false); return }
    async function fetch_() {
      try {
        const token = await getToken()
        const data = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        if (!data.error) setProfile(data)
      } catch (e) { setError(e.message) }
      finally { setLoading(false) }
    }
    fetch_()
  }, [isSignedIn])

  return { profile, loading, error }
}
