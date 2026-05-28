export function generateTasks(profile) {
  const tasks = []
  const { type_immigrant, province, etape_parcours, situation_fam, priorites = [] } = profile

  const sante = {
    ON: { nom: 'OHIP', lien: 'https://www.ontario.ca/fr/page/ohip' },
    QC: { nom: 'RAMQ', lien: 'https://www.ramq.gouv.qc.ca' },
    BC: { nom: 'MSP BC', lien: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp' },
    AB: { nom: 'AHCIP', lien: 'https://www.alberta.ca/ahcip' },
    MB: { nom: 'Santé Manitoba', lien: 'https://www.gov.mb.ca/health/mhsip/' },
    SK: { nom: 'Saskatchewan Health', lien: 'https://www.ehealthsask.ca' },
    NS: { nom: 'MSI Nouvelle-Écosse', lien: 'https://novascotia.ca/dhw/msi/' },
    NB: { nom: 'NB Medicare', lien: 'https://www2.gnb.ca' },
  }
  const santeInfo = sante[province] || { nom: 'Assurance santé provinciale', lien: 'https://www.canada.ca/fr/sante-canada.html' }

  // ---- PHASE 1 : ARRIVÉE (tous les profils) ----
  tasks.push(
    { titre: 'Franchir les douanes (ASFC)', categorie: 'documents', priorite: 'urgent', jour_cible: 0, phase: 1, description: 'Présente ton COPR (ou visa), passeport et preuve de fonds. Un agent te remettra ton COPR tamponné.', organisme: 'ASFC', lien_officiel: 'https://www.cbsa-asfc.gc.ca/newcomers-nouveaux/menu-fra.html' },
    { titre: 'Acheter une carte SIM canadienne', categorie: 'installation', priorite: 'urgent', jour_cible: 1, phase: 1, description: 'Koodo, Public Mobile, ou Fido — plans prépayés à partir de 15$/mois. Nécessite un numéro local pour toutes les démarches.', lien_officiel: 'https://www.koodomobile.com' },
    { titre: "Obtenir ton NAS (Numéro d'Assurance Sociale)", categorie: 'documents', priorite: 'urgent', jour_cible: 2, phase: 1, description: 'Rends-toi dans un bureau Service Canada avec ton COPR/visa de RP et passeport. Gratuit et immédiat.', formulaire: 'SIN Application', organisme: 'Service Canada', lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html' },
    { titre: 'Ouvrir un compte bancaire', categorie: 'banque', priorite: 'urgent', jour_cible: 2, phase: 1, description: "TD, RBC et Scotiabank ont des programmes Newcomers sans historique de crédit requis.", lien_officiel: 'https://www.td.com/ca/fr/particuliers/solutions/nouveau-au-canada' },
    { titre: `S'inscrire à ${santeInfo.nom} (assurance santé)`, categorie: 'sante', priorite: 'urgent', jour_cible: 5, phase: 1, description: "Délai de carence de 90 jours dans certaines provinces. Inscris-toi dès l'arrivée.", lien_officiel: santeInfo.lien },
    { titre: 'Trouver un hébergement temporaire', categorie: 'logement', priorite: 'urgent', jour_cible: 0, phase: 1, description: 'Auberge de jeunesse, AIRBNB, ou résidence universitaire pour les premières semaines.' },
  )

  // ---- PHASE 2 : DOCUMENTS (J+3 à J+30) ----
  if (type_immigrant !== 'etudiant') {
    tasks.push({
      titre: 'Demander ta carte de Résident Permanent',
      categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 2,
      description: "À faire dans les 180 jours suivant l'obtention du RP. Tu as besoin du formulaire IMM 5444.",
      formulaire: 'IMM 5444', organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/carte-rp/apply-first-card.html',
    })
  }

  tasks.push(
    { titre: 'Obtenir un permis de conduire provincial', categorie: 'transport', priorite: 'normal', jour_cible: 14, phase: 2, description: 'Apporte ton permis étranger + traduction si nécessaire. Certains pays ont des ententes de réciprocité.', organisme: 'Ministère des transports provincial' },
    { titre: 'Faire sa déclaration de revenus (première année)', categorie: 'documents', priorite: 'normal', jour_cible: 90, phase: 2, description: "Même avec peu ou pas de revenus — obligatoire pour accéder aux prestations (ACE, GST/TPS). Date limite : 30 avril.", organisme: 'Agence du revenu du Canada', lien_officiel: 'https://www.canada.ca/fr/agence-revenu.html' },
    { titre: "Demander l'Allocation canadienne pour enfants (ACE)", categorie: 'documents', priorite: priorites.includes('sante') || situation_fam !== 'seul' ? 'urgent' : 'normal', jour_cible: 14, phase: 2, description: 'Versement mensuel non imposable si tu as des enfants de moins de 18 ans. Formulaire RC66.', formulaire: 'RC66', organisme: 'ARC', lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/allocation-canadienne-enfants-apercu.html' },
  )

  // ---- Québec spécifique ----
  if (province === 'QC') {
    tasks.push(
      { titre: 'S\'inscrire aux cours de francisation (gratuits)', categorie: 'langue', priorite: 'urgent', jour_cible: 14, phase: 2, description: 'Cours de français gratuits financés par le MIDI. Obligatoire si niveau insuffisant.', organisme: 'MIDI Québec', lien_officiel: 'https://www.immigration-quebec.gouv.qc.ca/fr/langue-francaise/apprendre-francais/index.html' },
      { titre: 'Faire reconnaître tes diplômes au Québec', categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3, description: "Contacte l'ordre professionnel de ton domaine ou le MIDI pour la reconnaissance.", organisme: 'MIDI / Ordre professionnel concerné' },
    )
  }

  // ---- PHASE 3 : INSTALLATION ----
  tasks.push(
    { titre: 'Trouver un logement permanent', categorie: 'logement', priorite: priorites.includes('logement') ? 'urgent' : 'normal', jour_cible: 14, phase: 3, description: 'Kijiji, Facebook Marketplace, Zumper. Budget : 1 200-2 500$/mois selon la ville.' },
    { titre: "S'inscrire auprès des services locaux d'établissement", categorie: 'installation', priorite: 'normal', jour_cible: 7, phase: 3, description: 'COSTI, ACCES Employment, Centre Francophone Toronto ou équivalent dans ta ville. Services gratuits.', lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/trouver-aide-immigration.html' },
    { titre: 'Souscrire une assurance habitation', categorie: 'logement', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Obligatoire dans la plupart des locations. Intact, Desjardins, TD Assurance.' },
  )

  // ---- Famille avec enfants ----
  if (situation_fam === 'famille_scolaires' || situation_fam === 'parent_seul') {
    tasks.push(
      { titre: "Inscrire les enfants à l'école", categorie: 'education', priorite: 'urgent', jour_cible: 7, phase: 1, description: 'Contacter le conseil scolaire local. Gratuit de la maternelle à la 12e. Apporter les bulletins scolaires et vaccins.', organisme: 'Conseil scolaire local' },
      { titre: "Obtenir les vaccins requis par l'école", categorie: 'sante', priorite: 'urgent', jour_cible: 14, phase: 2, description: "Chaque province a sa liste de vaccins obligatoires pour l'école. Vérifier auprès de la santé publique." },
    )
  }
  if (situation_fam === 'famille_jeunes') {
    tasks.push({ titre: 'Trouver une place en garderie subventionnée', categorie: 'education', priorite: 'normal', jour_cible: 30, phase: 3, description: "Listes d'attente longues. S'inscrire dès l'arrivée sur le portail provincial." })
  }

  // ---- Emploi ----
  if (priorites.includes('emploi') || type_immigrant === 'rp_economique' || type_immigrant === 'travailleur') {
    tasks.push(
      { titre: 'Adapter ton CV au format canadien', categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, description: "Pas de photo, pas d'âge, pas d'état civil. Max 2 pages. Accent sur les résultats quantifiables." },
      { titre: 'Créer un profil LinkedIn canadien', categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, lien_officiel: 'https://linkedin.com' },
      { titre: 'Faire évaluer tes diplômes par WES ou IQAS', categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Évaluation des diplômes étrangers nécessaire pour la plupart des emplois professionnels.', organisme: 'WES Canada', lien_officiel: 'https://www.wes.org/ca' },
      { titre: "Rejoindre un programme d'aide à l'emploi pour immigrants", categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, description: "Mentorat, formation, accès au réseau. ACCES Employment, Immigrant Services Society, etc.", lien_officiel: 'https://accesemployment.ca' },
    )
  }

  // ---- Santé ----
  if (priorites.includes('sante')) {
    tasks.push({ titre: 'Trouver un médecin de famille', categorie: 'sante', priorite: 'normal', jour_cible: 30, phase: 3, description: "Utilise Health811 (Ontario) ou l'outil provincial de ta province pour trouver un médecin acceptant de nouveaux patients.", lien_officiel: 'https://health811.ontario.ca' })
  }

  // ---- PHASE 4 : INTÉGRATION ----
  tasks.push(
    { titre: 'Apprendre les lois et règlements locaux', categorie: 'installation', priorite: 'normal', jour_cible: 30, phase: 4, description: "Lire le guide d'accueil de ta ville/province. Règles de bruit, poubelles, stationnement." },
    { titre: 'Rejoindre des groupes communautaires', categorie: 'installation', priorite: 'normal', jour_cible: 60, phase: 4, description: 'Meetup, associations culturelles, clubs sportifs. Essentiel pour le réseau social et professionnel.' },
    { titre: 'Ouvrir un compte de crédit (carte sécurisée)', categorie: 'banque', priorite: 'normal', jour_cible: 30, phase: 4, description: 'Commence à bâtir ton historique de crédit canadien. Capital One, Secured Visa TD, etc.' },
  )

  // ---- PHASE 5 : CITOYENNETÉ ----
  tasks.push(
    { titre: 'Vérifier ton éligibilité à la citoyenneté', categorie: 'documents', priorite: 'normal', jour_cible: 1095, phase: 5, description: 'Utilise le calculateur MaplePath pour suivre tes 1460 jours de présence requis.', lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/eligibilite.html' },
    { titre: 'Préparer le test de citoyenneté', categorie: 'documents', priorite: 'normal', jour_cible: 1095, phase: 5, description: 'Étudier "Découvrir le Canada" — le guide officiel. Utilise le quiz MaplePath pour pratiquer.', lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/preparation-test-citoyennete.html' },
    { titre: 'Soumettre la demande de citoyenneté (CIT 0002)', categorie: 'documents', priorite: 'normal', jour_cible: 1200, phase: 5, formulaire: 'CIT 0002', organisme: 'IRCC', lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/demande-citoyennete.html' },
  )

  return tasks
}
