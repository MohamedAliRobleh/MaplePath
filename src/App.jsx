import { useEffect } from 'react'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import i18n from './lib/i18n'
import useAppStore from './store/useAppStore'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AppShell from './components/layout/AppShell'
import Welcome from './pages/Welcome'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Checklist from './pages/Checklist'
import Outils from './pages/Outils'
import CitoyenneteQuiz from './pages/CitoyenneteQuiz'
import Calculateur from './pages/Calculateur'
import Profil from './pages/Profil'

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
  const langue = useAppStore(s => s.langue)
  useEffect(() => { i18n.changeLanguage(langue) }, [langue])

  return (
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={
            <ProtectedRoute><Onboarding /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><AppShell><Dashboard /></AppShell></ProtectedRoute>
          } />
          <Route path="/checklist" element={
            <ProtectedRoute><AppShell><Checklist /></AppShell></ProtectedRoute>
          } />
          <Route path="/outils" element={
            <ProtectedRoute><AppShell><Outils /></AppShell></ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute><AppShell><CitoyenneteQuiz /></AppShell></ProtectedRoute>
          } />
          <Route path="/calculateur" element={
            <ProtectedRoute><AppShell><Calculateur /></AppShell></ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute><AppShell><Profil /></AppShell></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}
