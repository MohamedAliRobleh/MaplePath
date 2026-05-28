import { motion } from 'framer-motion'
import HeroCard from '../components/dashboard/HeroCard'
import PhaseRoadmap from '../components/dashboard/PhaseRoadmap'
import TaskList from '../components/dashboard/TaskList'
import ToolsGrid from '../components/dashboard/ToolsGrid'
import useAppStore from '../store/useAppStore'

export default function Dashboard() {
  const { profile } = useAppStore()

  if (!profile) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-brand-300 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Chargement...</p>
      </div>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeroCard />
      <PhaseRoadmap />
      <TaskList />
      <ToolsGrid />
    </motion.div>
  )
}
