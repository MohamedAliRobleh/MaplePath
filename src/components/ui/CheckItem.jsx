import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CheckItem({ checked, onChange, label, description, disabled }) {
  return (
    <motion.button
      onClick={() => !disabled && onChange(!checked)}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-2xl border-2 transition-all duration-200
        ${checked ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
        ${checked ? 'bg-brand-300 border-brand-300' : 'border-gray-300'}`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check size={14} strokeWidth={3} className="text-brand-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <p className={`text-sm font-medium ${checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </motion.button>
  )
}
