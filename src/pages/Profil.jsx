import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LogOut, ChevronRight, Globe, RefreshCw } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import useAppStore from '../store/useAppStore'
import { generateTasks, getPhaseActuelle } from '../lib/taskEngine'

export default function Profil() {
  const { t } = useTranslation()
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const { profile, langue, setLangue, clearProfile, setProfile, setTasks } = useAppStore()
  const navigate = useNavigate()
  const [regenerating, setRegenerating] = useState(false)
  const [regenerated, setRegenerated] = useState(false)

  const initials = (profile?.prenom || user?.firstName || 'U').slice(0, 2).toUpperCase()

  async function handleSignOut() {
    clearProfile()
    await signOut()
    navigate('/')
  }

  async function handleLangueChange(lang) {
    setLangue(lang)
    try {
      const token = await getToken()
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ langue: lang }),
      })
    } catch {}
  }

  async function handleRegenerate() {
    if (!profile || regenerating) return
    setRegenerating(true)
    try {
      const token = await getToken()
      const newPhase = getPhaseActuelle(profile.etape_parcours, profile.type_immigrant)
      const tasks    = generateTasks(profile)

      const [savedProfile, savedTasks] = await Promise.all([
        fetch('/api/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ phase_actuelle: newPhase }),
        }).then(r => r.json()),
        fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tasks }),
        }).then(r => r.json()),
      ])

      setProfile({ ...profile, ...savedProfile, phase_actuelle: newPhase })
      setTasks(savedTasks)
      setRegenerated(true)
      setTimeout(() => setRegenerated(false), 3000)
    } catch (e) {
      console.error(e)
    } finally {
      setRegenerating(false)
    }
  }

  return (
    <div className="px-4 py-6">
      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-brand-300 rounded-full flex items-center justify-center mb-3 shadow-brand">
          <span className="font-display font-bold text-2xl text-brand-900">{initials}</span>
        </div>
        <h2 className="font-display font-bold text-xl text-gray-900">{profile?.prenom || user?.firstName || 'Utilisateur'}</h2>
        <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
        {profile?.type_immigrant && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="brand">{profile.type_immigrant.replace(/_/g, ' ')}</Badge>
          </div>
        )}
      </motion.div>

      {/* Langue */}
      <Card className="mb-3">
        <div className="flex items-center gap-3 mb-3">
          <Globe size={18} className="text-gray-500" />
          <p className="font-display font-semibold text-sm text-gray-900">{t('profil.langue')}</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[{code:'fr',label:'FR 🇫🇷'},{code:'en',label:'EN 🇬🇧'},{code:'ar',label:'AR 🇸🇦'},{code:'es',label:'ES 🇪🇸'}].map(l => (
            <button key={l.code} onClick={() => handleLangueChange(l.code)}
              className={`py-2 rounded-xl text-xs font-display font-semibold transition-all
                ${langue === l.code ? 'bg-brand-300 text-brand-900' : 'bg-gray-100 text-gray-600'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Info */}
      <Card className="mb-3">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500">{t('profil.arrival')}</p>
            <p className="font-display font-medium text-sm text-gray-900">{profile?.date_arrivee || t('profil.notSet')}</p>
          </div>
          <div className="h-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-500">{t('profil.priorities')}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {(profile?.priorites || []).length > 0
                ? (profile.priorites || []).map(p => <Badge key={p} variant="brand">{p}</Badge>)
                : <p className="text-sm text-gray-400">{t('profil.notSet')}</p>}
            </div>
          </div>
        </div>
      </Card>

      {/* Régénérer le parcours */}
      <button
        onClick={handleRegenerate}
        disabled={regenerating}
        className={`w-full flex items-center gap-3 p-4 rounded-3xl border-2 mb-3 transition-all
          ${regenerated
            ? 'border-green-200 bg-green-50'
            : 'border-gray-100 bg-white hover:border-gray-200 active:scale-[0.99]'}`}
      >
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
          ${regenerated ? 'bg-green-100' : 'bg-gray-100'}`}>
          <RefreshCw
            size={16}
            className={`transition-all ${regenerating ? 'animate-spin text-brand-600' : regenerated ? 'text-green-600' : 'text-gray-500'}`}
          />
        </div>
        <div className="flex-1 text-left">
          <p className="font-display font-semibold text-sm text-gray-900">
            {regenerated ? '✅ Parcours mis à jour !' : 'Régénérer mon parcours'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {regenerated ? 'Retourne au dashboard' : 'Recalcule tes tâches selon ton profil actuel'}
          </p>
        </div>
        {!regenerating && !regenerated && <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />}
      </button>

      {/* Sign out */}
      <div className="mt-4">
        <Button variant="danger" fullWidth onClick={handleSignOut}>
          <LogOut size={16} className="mr-2 inline" /> {t('profil.signout')}
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        MaplePath v0.1.0 · {t('profil.version')}
      </p>
    </div>
  )
}
