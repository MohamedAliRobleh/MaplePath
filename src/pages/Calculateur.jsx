import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import { differenceInDays, format, addDays, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const DAYS_REQUIRED = 1460

export default function Calculateur() {
  const { getToken } = useAuth()
  const [dateRP, setDateRP] = useState('')
  const [absences, setAbsences] = useState([])
  const [newAbsence, setNewAbsence] = useState({ debut: '', fin: '', destination: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken()
        const data = await fetch('/api/presence', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        const abs = data.filter(d => d.type === 'absence')
        setAbsences(abs)
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const today = new Date()
  const rpDate = dateRP ? parseISO(dateRP) : null
  const totalDays = rpDate ? differenceInDays(today, rpDate) : 0
  const absenceDays = absences.reduce((sum, a) => {
    return sum + differenceInDays(parseISO(a.date_fin), parseISO(a.date_debut))
  }, 0)
  const presenceDays = Math.max(0, totalDays - absenceDays)
  const remaining = Math.max(0, DAYS_REQUIRED - presenceDays)
  const pct = Math.min(100, Math.round((presenceDays / DAYS_REQUIRED) * 100))
  const eligibleDate = rpDate ? addDays(rpDate, DAYS_REQUIRED + absenceDays) : null

  async function addAbsence() {
    if (!newAbsence.debut || !newAbsence.fin) return
    try {
      const token = await getToken()
      const saved = await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date_debut: newAbsence.debut, date_fin: newAbsence.fin, pays: newAbsence.destination || 'Étranger', type: 'absence' }),
      }).then(r => r.json())
      setAbsences(a => [...a, saved])
      setNewAbsence({ debut: '', fin: '', destination: '' })
    } catch {}
  }

  async function deleteAbsence(id) {
    try {
      const token = await getToken()
      await fetch('/api/presence', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })
      setAbsences(a => a.filter(x => x.id !== id))
    } catch {}
  }

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Calculateur de citoyenneté</h2>

      <Card className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Date d'obtention du RP</label>
        <input
          type="date"
          value={dateRP}
          onChange={e => setDateRP(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-300"
        />
      </Card>

      {dateRP && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-4 flex flex-col items-center py-6">
            <svg width="128" height="128" className="mb-4 -rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <motion.circle
                cx="64" cy="64" r="54" fill="none"
                stroke={pct >= 100 ? '#22C55E' : '#FFD600'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="text-center -mt-2">
              <p className="font-display font-bold text-3xl text-gray-900">{presenceDays.toLocaleString()}</p>
              <p className="text-sm text-gray-500">jours sur {DAYS_REQUIRED.toLocaleString()} requis</p>
            </div>
            <div className="flex gap-3 mt-4">
              <Badge variant={pct >= 100 ? 'success' : 'brand'}>{pct}%</Badge>
              {remaining > 0 && <Badge variant="gray">Il reste {remaining} jours</Badge>}
              {pct >= 100 && <Badge variant="success">Éligible ! 🍁</Badge>}
            </div>
            {eligibleDate && remaining > 0 && (
              <p className="text-xs text-gray-500 mt-3">
                Éligibilité estimée : {format(eligibleDate, 'd MMMM yyyy', { locale: fr })}
              </p>
            )}
          </Card>

          <Card className="mb-4">
            <h3 className="font-display font-semibold text-base text-gray-900 mb-3">Ajouter une absence</h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Départ</label>
                  <input type="date" value={newAbsence.debut} onChange={e => setNewAbsence(a => ({...a, debut: e.target.value}))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Retour</label>
                  <input type="date" value={newAbsence.fin} onChange={e => setNewAbsence(a => ({...a, fin: e.target.value}))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
                </div>
              </div>
              <input placeholder="Destination (optionnel)" value={newAbsence.destination}
                onChange={e => setNewAbsence(a => ({...a, destination: e.target.value}))}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
              <Button onClick={addAbsence} disabled={!newAbsence.debut || !newAbsence.fin}>
                <Plus size={16} className="mr-1 inline" /> Ajouter l'absence
              </Button>
            </div>
          </Card>

          {absences.length > 0 && (
            <Card>
              <h3 className="font-display font-semibold text-base text-gray-900 mb-3">
                Journal des absences <Badge variant="gray">{absenceDays} jours</Badge>
              </h3>
              <div className="flex flex-col gap-2">
                {absences.map(a => (
                  <div key={a.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{a.pays || 'Étranger'}</p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(a.date_debut), 'd MMM', {locale: fr})} → {format(parseISO(a.date_fin), 'd MMM yyyy', {locale: fr})}
                        {' · '}{differenceInDays(parseISO(a.date_fin), parseISO(a.date_debut))} jours
                      </p>
                    </div>
                    <button onClick={() => deleteAbsence(a.id)} className="p-1.5 rounded-full hover:bg-red-50">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
