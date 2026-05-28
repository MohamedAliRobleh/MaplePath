export default function Logo({ size = 40, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={Math.round(size * 1.1)}
        viewBox="0 0 100 110"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M50 3 L47 19 L33 11 L38 26 L20 22 L28 37 L9 36 L19 50 L7 57 L24 55 L20 72 L36 64 L35 80 L50 73 L65 80 L64 64 L80 72 L76 55 L93 57 L81 50 L91 36 L72 37 L80 22 L62 26 L67 11 L53 19 Z"
          fill="#C41E3A"
        />
        <rect x="46" y="73" width="8" height="30" rx="3" fill="#C41E3A"/>
      </svg>
      {showText && (
        <span className="font-display font-bold text-gray-900" style={{ fontSize: size * 0.45 }}>
          Maple<span className="text-brand-400">Path</span>
        </span>
      )}
    </div>
  )
}
