import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, CheckSquare, HelpCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import Logo from '../components/ui/Logo'
import useAppStore from '../store/useAppStore'
import i18n from '../lib/i18n'

const langues = [
  { code: 'fr', label: '🇫🇷 FR' },
  { code: 'en', label: '🇬🇧 EN' },
  { code: 'ar', label: '🇸🇦 AR' },
  { code: 'es', label: '🇪🇸 ES' },
]

export default function Welcome() {
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()
  const { profile, langue, setLangue } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn && profile?.onboarding_done) navigate('/dashboard')
    else if (isSignedIn) navigate('/onboarding')
  }, [isSignedIn])

  function handleLangue(code) {
    setLangue(code)
    i18n.changeLanguage(code)
  }

  const features = [
    { icon: MapPin,      title: t('welcome.f1Title'), desc: t('welcome.f1Desc') },
    { icon: CheckSquare, title: t('welcome.f2Title'), desc: t('welcome.f2Desc') },
    { icon: HelpCircle,  title: t('welcome.f3Title'), desc: t('welcome.f3Desc') },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-8 pb-8">
      <div className="flex justify-end gap-2 mb-8">
        {langues.map(l => (
          <button key={l.code} onClick={() => handleLangue(l.code)}
            className={`text-xs font-medium px-2 py-1 rounded-lg transition-all
              ${langue === l.code ? 'text-brand-700 bg-brand-50 font-semibold' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div animate={{ scale: [0.9, 1.05, 1] }} transition={{ duration: 0.6 }} className="mb-6">
          <Logo size={80} className="mx-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-display font-bold text-4xl text-gray-900 leading-tight">
            Maple<span className="text-brand-300">Path</span>
          </h1>
          <p className="text-gray-500 text-lg mt-2 mb-8">{t('welcome.title')}</p>
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
          <Button fullWidth>{t('welcome.cta')}</Button>
        </SignUpButton>
        <SignInButton mode="modal" afterSignInUrl="/dashboard">
          <Button variant="secondary" fullWidth>{t('welcome.signin')}</Button>
        </SignInButton>
      </motion.div>
    </div>
  )
}
