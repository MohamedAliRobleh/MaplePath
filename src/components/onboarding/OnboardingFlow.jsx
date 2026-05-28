import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import SondageProgress from './SondageProgress'
import StepLangue from './steps/StepLangue'
import StepTypeImmigrant from './steps/StepTypeImmigrant'
import StepEtape from './steps/StepEtape'
import StepFamille from './steps/StepFamille'
import StepPriorites from './steps/StepPriorites'

const STEPS = [StepLangue, StepTypeImmigrant, StepEtape, StepFamille, StepPriorites]
const TOTAL = STEPS.length

const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)

  function next() {
    if (step < TOTAL - 1) { setDir(1); setStep(s => s + 1) }
    else onComplete()
  }
  function back() {
    if (step > 0) { setDir(-1); setStep(s => s - 1) }
  }

  const StepComponent = STEPS[step]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 pt-4 safe-top">
        {step > 0 && (
          <button onClick={back} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={22} className="text-gray-700" />
          </button>
        )}
      </div>
      <SondageProgress current={step + 1} total={TOTAL} />
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <StepComponent onNext={next} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
