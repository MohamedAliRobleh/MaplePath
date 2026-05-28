const variants = {
  urgent:   'bg-red-50 text-red-700 border-red-200',
  warning:  'bg-amber-50 text-amber-700 border-amber-200',
  success:  'bg-green-50 text-green-700 border-green-200',
  info:     'bg-blue-50 text-blue-700 border-blue-200',
  brand:    'bg-brand-50 text-brand-700 border-brand-200',
  gray:     'bg-gray-100 text-gray-600 border-gray-200',
  special:  'bg-maple/10 text-maple border-maple/30',
}

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
