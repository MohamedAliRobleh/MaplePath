import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const etapes = [
  { code: 'pre_arrivee',  icon: '✈️',  label: "Je n'ai pas encore atterri",  desc: "Préparation depuis l'étranger" },
  { code: 'semaine_1',    icon: '📍',  label: "Je viens d'arriver",           desc: '0 à 7 jours' },
  { code: 'mois_1',       icon: '📅',  label: 'Quelques semaines',            desc: '1 à 4 semaines' },
  { code: 'mois_3',       icon: '🗓️',  label: 'Quelques mois',               desc: '1 à 6 mois' },
  { code: 'an_1',         icon: '📆',  label: "Plus d'un an",                 desc: 'Plus de 6 mois' },
  { code: 'citoyennete',  icon: '🏛️',  label: 'Je prépare ma citoyenneté',   desc: 'Résidence permanente établie' },
]

export default function StepEtape({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.etape_parcours

  function handleSelect(code) {
    setAnswer('etape_parcours', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">À quelle étape de ton parcours es-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">Nous adapterons tes tâches prioritaires.</p>
      <div className="flex flex-col gap-3">
        {etapes.map((e, i) => (
          <motion.button
            key={e.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(e.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === e.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{e.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{e.label}</p>
              <p className="text-xs text-gray-500">{e.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
