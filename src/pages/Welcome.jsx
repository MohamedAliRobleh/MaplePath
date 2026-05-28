import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { MapPin, CheckSquare, HelpCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import useAppStore from '../store/useAppStore'

const features = [
  { icon: MapPin,       title: 'Parcours personnalisé',    desc: 'Adapté à ton profil, ta province et ta situation' },
  { icon: CheckSquare,  title: 'Checklists intelligentes', desc: '30+ tâches générées automatiquement selon tes priorités' },
  { icon: HelpCircle,   title: 'Quiz citoyenneté',         desc: '100 questions officielles pour préparer ton test' },
]

const langues = ['🇫🇷 FR', '🇬🇧 EN', '🇸🇦 AR', '🇪🇸 ES']

export default function Welcome() {
  const { isSignedIn } = useAuth()
  const { profile } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn && profile?.onboarding_done) navigate('/dashboard')
    else if (isSignedIn) navigate('/onboarding')
  }, [isSignedIn])

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-8 pb-8">
      <div className="flex justify-end gap-2 mb-8">
        {langues.map(l => (
          <button key={l} className="text-xs font-medium text-gray-400 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-50">
            {l}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div animate={{ scale: [0.9, 1.05, 1] }} transition={{ duration: 0.6 }} className="mb-6">
          <div className="w-20 h-20 bg-brand-300 rounded-4xl flex items-center justify-center shadow-brand mx-auto">
            <span className="text-4xl">🍁</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-display font-bold text-4xl text-gray-900 leading-tight">
            Maple<span className="text-brand-300">Path</span>
          </h1>
          <p className="text-gray-500 text-lg mt-2 mb-8">De l'aéroport à la citoyenneté</p>
        </motion.div>

        <div className="w-full flex flex-col gap-3 mb-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl text-left"
            >
              <div className="p-2 bg-brand-50 rounded-2xl flex-shrink-0">
                <f.icon size={20} className="text-brand-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-gray-900">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="flex flex-col gap-3"
      >
        <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
          <Button fullWidth>Commencer — 2 min</Button>
        </SignUpButton>
        <SignInButton mode="modal" afterSignInUrl="/dashboard">
          <Button variant="secondary" fullWidth>J'ai déjà un compte</Button>
        </SignInButton>
      </motion.div>
    </div>
  )
}
