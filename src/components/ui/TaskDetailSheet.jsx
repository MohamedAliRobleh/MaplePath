import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { taskCategories } from '../../data/tasks'
import {
  banques, transport, medecin, assurances, emploi,
  logement, coursLangue, formulairesIRCC, aideGouvernementale, carteSim,
} from '../../data/ressources'

const CAT_ICONS = {
  documents:    '📄',
  sante:        '🏥',
  banque:       '🏦',
  emploi:       '💼',
  logement:     '🏠',
  education:    '🎓',
  transport:    '🚌',
  langue:       '💬',
  installation: '📍',
  juridique:    '⚖️',
}

const CAT_BG = {
  documents:    'bg-blue-50',
  sante:        'bg-green-50',
  banque:       'bg-brand-50',
  emploi:       'bg-purple-50',
  logement:     'bg-orange-50',
  education:    'bg-pink-50',
  transport:    'bg-gray-100',
  langue:       'bg-teal-50',
  installation: 'bg-indigo-50',
  juridique:    'bg-red-50',
}

const CAT_SECTION = {
  banque:       'banque',
  sante:        'sante',
  transport:    'transport',
  emploi:       'emploi',
  logement:     'logement',
  langue:       'langue',
  documents:    'documents',
  installation: 'sim',
  juridique:    'aide',
  education:    'aide',
}

function getResources(categorie) {
  const map = {
    banque:       banques.slice(0, 4),
    sante:        [...medecin, ...assurances.slice(0, 2)],
    transport:    transport.slice(0, 4),
    emploi:       emploi.slice(0, 4),
    logement:     logement.slice(0, 4),
    langue:       coursLangue.slice(0, 4),
    documents:    formulairesIRCC.slice(0, 4),
    installation: carteSim.slice(0, 4),
    juridique:    aideGouvernementale.slice(0, 3),
    education:    aideGouvernementale.slice(0, 2),
  }
  return map[categorie] || []
}

function normalize(r) {
  return {
    nom:         r.nom || r.prov || r.code || '',
    description: r.description || r.programme || r.desc || (r.code ? r.nom : ''),
    lien:        r.lien || r.url || '',
    badge:       r.badge || (r.gratuit === true ? 'Gratuit' : null),
  }
}

export default function TaskDetailSheet({ task, onClose }) {
  const navigate = useNavigate()

  const resources = task ? getResources(task.categorie).map(normalize) : []
  const catLabel  = task ? (taskCategories[task.categorie]?.label || task.categorie) : ''
  const catIcon   = task ? (CAT_ICONS[task.categorie] || '📋') : ''
  const catBg     = task ? (CAT_BG[task.categorie] || 'bg-gray-100') : ''

  return (
    <AnimatePresence>
      {task && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] max-h-[88vh] flex flex-col max-w-[430px] mx-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 pt-3 pb-4 flex-shrink-0">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${catBg} flex items-center justify-center text-2xl`}>
                  {catIcon}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                {catLabel}
              </p>
              <h2 className="font-display font-bold text-xl text-gray-900 leading-tight">
                {task.titre}
              </h2>
              {task.organisme && (
                <p className="text-xs text-gray-400 mt-1.5">via {task.organisme}</p>
              )}
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 pb-10">

              {/* Description */}
              {task.description && (
                <div className="px-5 pb-5">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
                  </div>
                </div>
              )}

              {/* Official link */}
              {task.lien_officiel && (
                <div className="px-5 pb-5">
                  <a
                    href={task.lien_officiel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-gray-900 text-white rounded-2xl px-5 py-4 active:opacity-90"
                  >
                    <div>
                      <p className="font-display font-bold text-sm">Source officielle</p>
                      <p className="text-[11px] text-white/50 mt-0.5">Gouvernement du Canada</p>
                    </div>
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                  </a>
                </div>
              )}

              {/* Related resources */}
              {resources.length > 0 && (
                <div className="px-5 pb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-sm text-gray-900">Ressources associées</h3>
                    <button
                      onClick={() => { onClose(); navigate(`/outils?section=${CAT_SECTION[task.categorie] || ''}`) }}
                      className="flex items-center gap-0.5 text-xs font-semibold text-brand-700"
                    >
                      Voir tout <ChevronRight size={13} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-2xl active:opacity-80"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-display font-semibold text-sm text-gray-900">{r.nom}</p>
                            {r.badge && (
                              <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {r.badge}
                              </span>
                            )}
                          </div>
                          {r.description && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{r.description}</p>
                          )}
                        </div>
                        <ExternalLink size={13} className="text-gray-300 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
