import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calculator, HelpCircle, Banknote, Home, FileText, Gift } from 'lucide-react'

const tools = [
  { icon: Calculator, key: 'calculator', to: '/calculateur', color: 'bg-blue-50 text-blue-600' },
  { icon: HelpCircle, key: 'quiz',       to: '/quiz',        color: 'bg-brand-50 text-brand-600' },
  { icon: Banknote,   key: 'banks',      to: '/outils',      color: 'bg-green-50 text-green-600' },
  { icon: Home,       key: 'housing',    to: '/outils',      color: 'bg-orange-50 text-orange-600' },
  { icon: FileText,   key: 'forms',      to: '/outils',      color: 'bg-purple-50 text-purple-600' },
  { icon: Gift,       key: 'benefits',   to: '/outils',      color: 'bg-pink-50 text-pink-600' },
]

export default function ToolsGrid() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="mt-5 px-4 mb-4">
      <h3 className="font-display font-bold text-base text-gray-900 mb-3">{t('dashboard.quickTools')}</h3>
      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(tool.to)}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-3xl border border-black/5 shadow-card"
          >
            <div className={`p-2.5 rounded-2xl ${tool.color}`}>
              <tool.icon size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
              {t(`tools.${tool.key}`)}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
