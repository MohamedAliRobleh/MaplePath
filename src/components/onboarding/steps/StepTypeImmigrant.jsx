import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const types = [
  { code: 'rp_economique', icon: '🏆', label: 'Résident Permanent — Économique', desc: 'Express Entry, PNP, etc.' },
  { code: 'refugie_gov', icon: '🤝', label: 'Réfugié (parrainé gouvernement)', desc: 'Programme de réfugiés pris en charge' },
  { code: 'refugie_prive', icon: '🤝', label: 'Réfugié (parrainage privé)', desc: 'Parrainé par un groupe de la communauté' },
  { code: 'conjoint', icon: '❤️', label: 'Conjoint(e) / Famille parrainée', desc: 'Parrainage familial' },
  { code: 'etudiant', icon: '🎓', label: "Étudiant(e) étranger(e)", desc: "Permis d'études" },
  { code: 'travailleur', icon: '💼', label: 'Travailleur temporaire', desc: 'Permis de travail' },
  { code: 'demandeur_asile', icon: '📋', label: "Demandeur(se) d'asile", desc: 'Demande de refuge au Canada' },
  { code: 'pre_arrivee', icon: '✈️', label: "Pas encore arrivé(e)", desc: 'Je prépare mon départ' },
]

export default function StepTypeImmigrant({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.type_immigrant

  function handleSelect(code) {
    setAnswer('type_immigrant', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Comment es-tu arrivé(e) au Canada ?</h2>
      <p className="text-gray-500 text-sm mb-6">Ton statut détermine tes démarches prioritaires.</p>
      <div className="flex flex-col gap-3">
        {types.map((t, i) => (
          <motion.button
            key={t.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(t.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === t.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{t.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{t.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
