import { motion } from 'framer-motion'

const variants = {
  primary:   'bg-brand-300 text-brand-900 shadow-brand hover:bg-brand-200',
  secondary: 'border border-black/10 text-gray-800 bg-white hover:bg-gray-50',
  ghost:     'text-gray-600 hover:bg-gray-100',
  danger:    'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
}

export default function Button({ children, variant = 'primary', className = '', disabled, onClick, type = 'button', fullWidth = false }) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-display font-semibold rounded-2xl px-6 py-4 text-base
        transition-all duration-200 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
