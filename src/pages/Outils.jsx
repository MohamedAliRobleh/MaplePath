import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { banques, formulairesIRCC, coursLangue, aideGouvernementale } from '../data/ressources'

function Section({ title, icon, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-4">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-display font-bold text-base text-gray-900">{title}</h3>
        </div>
        {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>
      {open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>}
    </div>
  )
}

export default function Outils() {
  return (
    <div className="px-4 py-4">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Centre de ressources</h2>

      <Section title="Banques pour Nouveaux Arrivants" icon="🏦">
        <div className="flex flex-col gap-3">
          {banques.map(b => (
            <Card key={b.nom}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-display font-bold text-sm text-gray-900">{b.nom}</p>
                  <p className="text-xs text-gray-500">{b.programme}</p>
                </div>
                <a href={b.lien} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              </div>
              <div className="flex flex-wrap gap-1">
                {b.avantages.map((a, i) => <Badge key={i} variant="info">{a}</Badge>)}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Cours de Langue Gratuits" icon="🗣️">
        <div className="flex flex-col gap-3">
          {coursLangue.map(c => (
            <Card key={c.nom}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-display font-semibold text-sm text-gray-900">{c.nom}</p>
                    {c.gratuit && <Badge variant="success">Gratuit</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">{c.description}</p>
                </div>
                <a href={c.lien} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Aide Gouvernementale" icon="🍁">
        <div className="flex flex-col gap-3">
          {aideGouvernementale.map(a => (
            <Card key={a.nom}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-display font-semibold text-sm text-gray-900 mb-1">{a.nom}</p>
                  <p className="text-xs text-gray-500">{a.description}</p>
                </div>
                <a href={a.lien} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-full flex-shrink-0">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Formulaires IRCC" icon="📄">
        <div className="flex flex-col gap-2">
          {formulairesIRCC.map(f => (
            <Card key={f.code}>
              <div className="flex items-center gap-3">
                <Badge variant="brand">{f.code}</Badge>
                <p className="flex-1 text-sm text-gray-700">{f.nom}</p>
                <a href={f.lien} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:bg-gray-100 rounded-full">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Trouver un Médecin" icon="🏥">
        <Card>
          <p className="font-display font-semibold text-sm text-gray-900 mb-2">Outil de recherche provinciale</p>
          <p className="text-xs text-gray-500 mb-3">Chaque province a son propre portail pour trouver un médecin acceptant de nouveaux patients.</p>
          <div className="flex flex-col gap-2">
            {[
              { prov: 'Ontario', url: 'https://health811.ontario.ca', label: 'Health811.ontario.ca' },
              { prov: 'Québec', url: 'https://www.quebec.ca/sante/trouver-une-ressource/guichet-acces-medecin-famille', label: 'GAMF Québec' },
              { prov: 'C.-B.', url: 'https://www.healthlinkbc.ca', label: 'HealthLink BC' },
            ].map(item => (
              <a key={item.prov} href={item.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.prov}</p>
                  <p className="text-xs text-gray-500">{item.label}</p>
                </div>
                <ExternalLink size={14} className="text-gray-400" />
              </a>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  )
}
