export const banques = [
  {
    nom: 'TD Canada Trust',
    programme: 'TD New to Canada',
    avantages: ['Compte gratuit 6 mois', "Pas d'historique de crédit requis", 'Carte de crédit sécurisée incluse'],
    lien: 'https://www.td.com/ca/fr/particuliers/solutions/nouveau-au-canada',
    logo: 'TD',
  },
  {
    nom: 'RBC Banque Royale',
    programme: 'RBC Nouveau au Canada',
    avantages: ['Compte gratuit 1 an', 'Spécialistes multilingues', 'Programme de crédit pour nouveaux arrivants'],
    lien: 'https://www.rbc.com/nouveauaucanada',
    logo: 'RBC',
  },
  {
    nom: 'Scotiabank',
    programme: 'Scotia StartRight',
    avantages: ['Frais mensuels offerts 1 an', 'Carte Visa gratuite 1 an', 'Support en 20+ langues'],
    lien: 'https://www.scotiabank.com/ca/fr/particuliers/programmes/startright.html',
    logo: 'Scotiabank',
  },
  {
    nom: 'BMO',
    programme: 'BMO NewStart',
    avantages: ['Compte gratuit', 'Prêt hypothécaire accessible', 'Conseiller dédié'],
    lien: 'https://www.bmo.com/fr-ca/main/personal/newstart/',
    logo: 'BMO',
  },
]

export const formulairesIRCC = [
  { code: 'IMM 5444', nom: 'Demande de carte de RP (première carte)', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'IMM 5476', nom: "Recours aux services d'un représentant", lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'CIT 0002', nom: 'Demande de citoyenneté canadienne (adultes)', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'IMM 5409', nom: 'Consentement pour divulguer des renseignements', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'IMM 0008', nom: 'Demande de résidence permanente générique', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
]

export const coursLangue = [
  { nom: 'LINC (Language Instruction for Newcomers)', gratuit: true, description: "Cours d'anglais gratuits financés par le fédéral pour les RP et réfugiés", lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/apprentissage-langue.html' },
  { nom: 'CLIC (Cours de langue pour les immigrants au Canada)', gratuit: true, description: 'Cours de français gratuits pour immigrants adultes', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/apprentissage-langue.html' },
  { nom: "DELF (Diplôme d'études en langue française)", gratuit: false, description: 'Certification officielle du français — reconnue pour la citoyenneté', lien: 'https://www.institutfrancais.com/delf-dalf' },
  { nom: 'TEFAQ', gratuit: false, description: "Test d'évaluation du français adapté au Québec", lien: 'https://www.lefrancaisdesaffaires.fr/tests-et-diplomes/tefaq/' },
]

export const aideGouvernementale = [
  { nom: 'Allocation canadienne pour enfants (ACE)', description: 'Versement mensuel non imposable pour les familles avec enfants de moins de 18 ans', lien: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/allocation-canadienne-enfants-apercu.html' },
  { nom: 'Prestation GST/TPS', description: 'Crédit remboursable pour revenus modestes', lien: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/credit-taxe-produits-services-taxe-vente-harmonisee-credit-tps-tvh.html' },
  { nom: 'Subvention pour logement (PALP)', description: 'Aide au loyer selon le revenu', lien: 'https://www.canada.ca/fr/societe-hypotheques-logement-canada.html' },
  { nom: 'Régime de pensions du Canada (RPC)', description: 'Cotisation automatique — pension à la retraite', lien: 'https://www.canada.ca/fr/emploi-developpement-social/programmes/pensions.html' },
]
