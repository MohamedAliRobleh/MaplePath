import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { LogOut, ChevronRight, Globe, FileText } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import useAppStore from '../store/useAppStore'
import { getProvince } from '../data/provinces'

export default function Profil() {
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const { profile, langue, setLangue, clearProfile } = useAppStore()
  const navigate = useNavigate()

  const province = getProvince(profile?.province)
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

  return (
    <div className="px-4 py-6">
      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-brand-300 rounded-full flex items-center justify-center mb-3 shadow-brand">
          <span className="font-display font-bold text-2xl text-brand-900">{initials}</span>
        </div>
        <h2 className="font-display font-bold text-xl text-gray-900">{profile?.prenom || user?.firstName || 'Utilisateur'}</h2>
        <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
        {profile?.province && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="gray">{province?.nom || profile.province}</Badge>
            <Badge variant="brand">{profile.type_immigrant?.replace(/_/g, ' ')}</Badge>
          </div>
        )}
      </motion.div>

      {/* Langue */}
      <Card className="mb-3">
        <div className="flex items-center gap-3 mb-3">
          <Globe size={18} className="text-gray-500" />
          <p className="font-display font-semibold text-sm text-gray-900">Langue de l'application</p>
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Province</p>
              <p className="font-display font-medium text-sm text-gray-900">{province?.nom || '—'}</p>
            </div>
            <Badge variant="gray">{profile?.province || '—'}</Badge>
          </div>
          <div className="h-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-500">Date d'arrivée</p>
            <p className="font-display font-medium text-sm text-gray-900">{profile?.date_arrivee || 'Non renseignée'}</p>
          </div>
          <div className="h-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-500">Priorités</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {(profile?.priorites || []).map(p => <Badge key={p} variant="brand">{p}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card className="mb-3">
        <button onClick={() => navigate('/onboarding')} className="w-full flex items-center gap-3 py-2">
          <FileText size={18} className="text-gray-500" />
          <span className="flex-1 font-display font-medium text-sm text-gray-900 text-left">Modifier mes priorités</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </Card>

      <div className="mt-6">
        <Button variant="danger" fullWidth onClick={handleSignOut}>
          <LogOut size={16} className="mr-2 inline" /> Se déconnecter
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        MaplePath v0.1.0 · Construit avec ❤️ pour les nouveaux Canadiens
      </p>
    </div>
  )
}
