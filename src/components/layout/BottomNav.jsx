import { NavLink, useLocation } from 'react-router-dom'
import { Home, CheckSquare, Wrench, HelpCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/dashboard',  icon: Home,        key: 'home' },
  { to: '/checklist',  icon: CheckSquare, key: 'checklist' },
  { to: '/outils',     icon: Wrench,      key: 'tools' },
  { to: '/quiz',       icon: HelpCircle,  key: 'quiz' },
  { to: '/profil',     icon: User,        key: 'profile' },
]

export default function BottomNav() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto bg-white/90 backdrop-blur-sm border-t border-black/5 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, key }) => {
          const active = pathname === to
          return (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-1 py-1 px-3 relative">
              <div className={`p-2 rounded-2xl transition-colors ${active ? 'bg-brand-50' : ''}`}>
                <Icon size={22} className={active ? 'text-brand-300' : 'text-gray-400'} strokeWidth={active ? 2.5 : 1.5} />
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-brand-600' : 'text-gray-400'}`}>
                {t(`nav.${key}`)}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-300 rounded-full"
                />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
