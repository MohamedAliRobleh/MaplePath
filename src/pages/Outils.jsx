import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import {
  transport, carteSim, banques, logement, emploi,
  medecin, assurances, formulairesIRCC, coursLangue, aideGouvernementale,
} from '../data/ressources'

function Section({ title, icon, count, children, defaultOpen = false, sectionKey, activeSection }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(defaultOpen || sectionKey === activeSection)
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-3xl border border-black/5 shadow-card"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div className="text-left">
            <p className="font-display font-bold text-sm text-gray-900">{title}</p>
            <p className="text-xs text-gray-400">{t('outils.available', { count })}</p>
          </div>
        </div>
        {open
          ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" />
          : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex flex-col gap-2"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

function ResourceCard({ nom, description, prix, avantages, badge, lien, programme, type }) {
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-card p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-display font-bold text-sm text-gray-900">{nom}</p>
            {badge && (
              <span className="text-[10px] font-semibold bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{description || programme || type}</p>
          {prix && <p className="text-xs font-semibold text-green-600 mt-1">{prix}</p>}
        </div>
        <a
          href={lien}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 ml-3 flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
        >
          Voir <ExternalLink size={11} />
        </a>
      </div>
      {avantages?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {avantages.map((a, i) => (
            <span key={i} className="text-[10px] bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Outils() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const activeSection = searchParams.get('section') || ''

  return (
    <div className="px-4 py-4 pb-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">{t('outils.title')}</h2>
      <p className="text-sm text-gray-500 mb-5">{t('outils.subtitle')}</p>

      <Section title={t('outils.sectionTransport')} icon="🚌" count={transport.length} sectionKey="transport" activeSection={activeSection}>
        {transport.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionSim')} icon="📱" count={carteSim.length} sectionKey="sim" activeSection={activeSection}>
        {carteSim.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionBanks')} icon="🏦" count={banques.length} defaultOpen sectionKey="banque" activeSection={activeSection}>
        {banques.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionHousing')} icon="🏠" count={logement.length} sectionKey="logement" activeSection={activeSection}>
        {logement.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionJobs')} icon="💼" count={emploi.length} sectionKey="emploi" activeSection={activeSection}>
        {emploi.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionDoctor')} icon="🏥" count={medecin.length} sectionKey="sante" activeSection={activeSection}>
        <div className="flex flex-col gap-2">
          {medecin.map(item => (
            <a
              key={item.prov}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white rounded-3xl border border-black/5 shadow-card"
            >
              <div>
                <p className="text-sm font-display font-semibold text-gray-900">{item.prov}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                <p className="text-xs text-brand-600 font-medium mt-0.5">{item.label}</p>
              </div>
              <ExternalLink size={14} className="text-gray-400 flex-shrink-0 ml-3" />
            </a>
          ))}
        </div>
      </Section>

      <Section title={t('outils.sectionInsurance')} icon="🛡️" count={assurances.length} sectionKey="assurances" activeSection={activeSection}>
        {assurances.map(item => <ResourceCard key={item.nom} {...item} />)}
      </Section>

      <Section title={t('outils.sectionLanguage')} icon="🗣️" count={coursLangue.length} sectionKey="langue" activeSection={activeSection}>
        {coursLangue.map(c => (
          <div key={c.nom} className="bg-white rounded-3xl border border-black/5 shadow-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-display font-semibold text-sm text-gray-900">{c.nom}</p>
                  {c.gratuit
                    ? <span className="text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Gratuit</span>
                    : <span className="text-[10px] font-semibold bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full">Payant</span>}
                </div>
                <p className="text-xs text-gray-500">{c.description}</p>
              </div>
              <a
                href={c.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 ml-3 flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                Voir <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </Section>

      <Section title={t('outils.sectionGovAid')} icon="🍁" count={aideGouvernementale.length} sectionKey="aide" activeSection={activeSection}>
        {aideGouvernementale.map(a => (
          <div key={a.nom} className="bg-white rounded-3xl border border-black/5 shadow-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-sm text-gray-900 mb-1">{a.nom}</p>
                <p className="text-xs text-gray-500">{a.description}</p>
              </div>
              <a
                href={a.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                Voir <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </Section>

      <Section title={t('outils.sectionIRCC')} icon="📄" count={formulairesIRCC.length} sectionKey="documents" activeSection={activeSection}>
        {formulairesIRCC.map(f => (
          <div key={f.code} className="bg-white rounded-3xl border border-black/5 shadow-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 text-xs font-bold bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full">
                {f.code}
              </span>
              <p className="flex-1 text-sm text-gray-700">{f.nom}</p>
              <a
                href={f.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-full"
              >
                <ExternalLink size={14} className="text-gray-400" />
              </a>
            </div>
          </div>
        ))}
      </Section>
    </div>
  )
}
