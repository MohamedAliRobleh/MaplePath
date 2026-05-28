import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
      <div className="w-8 h-8 border-4 border-brand-300 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!isSignedIn) return <Navigate to="/" replace />
  return children
}
