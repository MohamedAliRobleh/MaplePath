export default function Logo({ size = 40, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        style={{ borderRadius: `${size * 0.22}px` }}
      >
        <rect width="32" height="32" rx="7" fill="#FFD600"/>
        <path
          d="M16 3L13.5 9L6.5 8L9.5 13L3 17L9.5 16.5L8.5 23.5L16 21L23.5 23.5L22.5 16.5L29 17L22.5 13L25.5 8L18.5 9Z"
          fill="#1A1500"
        />
        <rect x="14.5" y="20.5" width="3" height="7" rx="1.5" fill="#1A1500"/>
      </svg>
      {showText && (
        <span className="font-display font-bold text-gray-900" style={{ fontSize: size * 0.45 }}>
          Maple<span className="text-brand-400">Path</span>
        </span>
      )}
    </div>
  )
}
