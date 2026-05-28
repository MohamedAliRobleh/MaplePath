import { motion } from 'framer-motion'

export default function Card({ children, className = '', onClick, hover = true }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover && onClick ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' } : {}}
      className={`
        rounded-3xl bg-white shadow-card border border-black/5 p-4
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
