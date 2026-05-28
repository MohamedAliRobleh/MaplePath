import { motion } from 'framer-motion'

export default function ProgressBar({ value = 0, max = 100, color = 'brand', showLabel = false, className = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const colors = { brand: 'bg-brand-300', green: 'bg-green-500', red: 'bg-red-500', blue: 'bg-blue-500' }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value} / {max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color] || colors.brand}`}
        />
      </div>
    </div>
  )
}
