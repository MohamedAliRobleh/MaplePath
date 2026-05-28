import { differenceInDays, addDays } from 'date-fns'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const DAYS_REQUIRED = 1460

export function useCitizenship(dateRP) {
  const { getToken } = useAuth()
  const [absences, setAbsences] = useState([])

  useEffect(() => {
    if (!dateRP) return
    getToken().then(token =>
      fetch('/api/presence', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => setAbsences(d.filter(x => x.type === 'absence')))
        .catch(() => {})
    )
  }, [dateRP])

  if (!dateRP) return { presenceDays: 0, remaining: DAYS_REQUIRED, pct: 0, eligibleDate: null }

  const today = new Date()
  const rp = new Date(dateRP)
  const total = differenceInDays(today, rp)
  const absenceDays = absences.reduce((s, a) => s + differenceInDays(new Date(a.date_fin), new Date(a.date_debut)), 0)
  const presenceDays = Math.max(0, total - absenceDays)
  const remaining = Math.max(0, DAYS_REQUIRED - presenceDays)
  const pct = Math.min(100, Math.round((presenceDays / DAYS_REQUIRED) * 100))
  const eligibleDate = addDays(rp, DAYS_REQUIRED + absenceDays)

  return { presenceDays, absenceDays, remaining, pct, eligibleDate, absences, setAbsences }
}
