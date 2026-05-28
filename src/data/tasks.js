export const taskCategories = {
  documents:   { label: 'Documents',    color: 'blue',   icon: 'FileText' },
  sante:       { label: 'Santé',         color: 'green',  icon: 'Heart' },
  banque:      { label: 'Banque',        color: 'yellow', icon: 'Banknote' },
  emploi:      { label: 'Emploi',        color: 'purple', icon: 'Briefcase' },
  logement:    { label: 'Logement',      color: 'orange', icon: 'Home' },
  education:   { label: 'Éducation',     color: 'pink',   icon: 'GraduationCap' },
  transport:   { label: 'Transport',     color: 'gray',   icon: 'Car' },
  langue:      { label: 'Langue',        color: 'teal',   icon: 'MessageSquare' },
  installation:{ label: 'Installation',  color: 'indigo', icon: 'MapPin' },
  juridique:   { label: 'Juridique',     color: 'red',    icon: 'Scale' },
}

export const phases = [
  { id: 0, label: "Avant l'arrivée", icon: '✈️',  description: "Préparation depuis l'étranger",       days: "Avant l'arrivée" },
  { id: 1, label: 'Arrivée',         icon: '🛬',  description: 'Premiers jours au Canada',             days: '0–7 jours' },
  { id: 2, label: 'Documents',       icon: '📄',  description: 'Documents et inscriptions essentiels', days: '1–4 semaines' },
  { id: 3, label: 'Installation',    icon: '🏠',  description: "S'installer durablement",              days: '1–3 mois' },
  { id: 4, label: 'Intégration',     icon: '🤝',  description: 'Vie professionnelle et sociale',       days: '3–12 mois' },
  { id: 5, label: 'Citoyenneté',     icon: '🍁',  description: 'Devenir Canadien',                     days: '3–5 ans' },
]
