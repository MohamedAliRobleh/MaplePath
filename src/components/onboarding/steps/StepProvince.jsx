import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'
import Badge from '../../ui/Badge'

const provinces = [
  { code: 'ON', label: 'Ontario' },
  { code: 'QC', label: 'Québec', special: true },
  { code: 'BC', label: 'C.-B.' },
  { code: 'AB', label: 'Alberta' },
  { code: 'MB', label: 'Manitoba' },
  { code: 'SK', label: 'Saskatchewan' },
  { code: 'NS', label: 'N.-Écosse' },
  { code: 'NB', label: 'N.-Brunswick' },
  { code: 'PE', label: 'Î.-P.-É.' },
  { code: 'NL', label: 'T.-N.-L.' },
  { code: 'YT', label: 'Yukon' },
  { code: 'NT', label: 'T.N.-O.' },
  { code: 'NU', label: 'Nunavut' },
  { code: 'XX', label: 'Je ne sais pas' },
]

export default function StepProvince({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.province

  function handleSelect(code) {
    setAnswer('province', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Dans quelle province t'installes-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">Les ressources et démarches varient par province.</p>
      <div className="grid grid-cols-3 gap-2">
        {provinces.map((p, i) => (
          <motion.button
            key={p.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(p.code)}
            className={`relative p-3 rounded-2xl border-2 text-center transition-all
              ${selected === p.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="font-display font-semibold text-sm text-gray-900 block">{p.label}</span>
            {p.special && <Badge variant="special" className="mt-1 text-[10px]">Spécial</Badge>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
