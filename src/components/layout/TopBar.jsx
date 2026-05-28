import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

export default function TopBar({ title, showBack = false, showNotifications = true }) {
  const navigate = useNavigate()
  const { notifications } = useAppStore()
  const unread = notifications.filter(n => !n.lu).length

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-black/5 px-4 py-3 flex items-center justify-between safe-top">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={22} className="text-gray-700" />
          </button>
        )}
        {title && <h1 className="font-display font-bold text-lg text-gray-900">{title}</h1>}
        {!title && (
          <span className="font-display font-bold text-xl text-gray-900">
            Maple<span className="text-brand-300">Path</span>
          </span>
        )}
      </div>
      {showNotifications && (
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-maple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      )}
    </header>
  )
}
