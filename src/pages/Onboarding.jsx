import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import OnboardingFlow from '../components/onboarding/OnboardingFlow'
import { generateTasks } from '../lib/taskEngine'
import useAppStore from '../store/useAppStore'

const messages = [
  'Analyse de ton profil...',
  'Génération de ton parcours...',
  'Préparation de tes ressources...',
  'Ton parcours est prêt ! 🍁',
]

export default function Onboarding() {
  const { getToken } = useAuth()
  const { onboardingAnswers, setProfile, setTasks, clearOnboardingAnswers } = useAppStore()
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [confetti, setConfetti] = useState(false)

  async function handleComplete() {
    setGenerating(true)

    const msgInterval = setInterval(() => {
      setMsgIndex(i => Math.min(i + 1, messages.length - 1))
    }, 800)

    try {
      const token = await getToken()
      const profileData = {
        ...onboardingAnswers,
        onboarding_done: true,
        phase_actuelle: 1,
      }

      const savedProfile = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileData),
      }).then(r => r.json())

      const tasks = generateTasks(profileData)
      const savedTasks = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tasks }),
      }).then(r => r.json())

      clearInterval(msgInterval)
      setMsgIndex(3)
      setProfile(savedProfile)
      setTasks(savedTasks)
      clearOnboardingAnswers()
      setConfetti(true)

      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (e) {
      clearInterval(msgInterval)
      console.error(e)
      navigate('/dashboard')
    }
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        {confetti && <ReactConfetti recycle={false} numberOfPieces={200} colors={['#FFD600', '#C41E3A', '#0A0A0A']} />}
        <motion.div
          animate={{ rotate: confetti ? 0 : 360 }}
          transition={{ repeat: confetti ? 0 : Infinity, duration: 1.2, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-brand-300 border-t-transparent mb-8"
          style={confetti ? { border: 'none', fontSize: '4rem' } : {}}
        >
          {confetti && '🍁'}
        </motion.div>
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-semibold text-xl text-gray-900 text-center"
        >
          {messages[msgIndex]}
        </motion.p>
      </div>
    )
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
