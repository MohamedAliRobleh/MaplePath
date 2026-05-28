// Sources: IRCC canada.ca, Service Canada, FCAC, ministères provinciaux

const SANTE_PROV = {
  ON: { nom: 'OHIP',                   attente: '3 mois',  lien: 'https://www.ontario.ca/fr/page/ohip' },
  QC: { nom: 'RAMQ',                   attente: '3 mois',  lien: 'https://www.ramq.gouv.qc.ca' },
  BC: { nom: 'MSP Colombie-Brit.',      attente: '3 mois',  lien: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp' },
  AB: { nom: 'AHCIP Alberta',           attente: '0 mois',  lien: 'https://www.alberta.ca/ahcip' },
  MB: { nom: 'Assurance-santé Manitoba',attente: '3 mois',  lien: 'https://www.gov.mb.ca/health/mhsip/' },
  SK: { nom: 'SK Health Coverage',      attente: '3 mois',  lien: 'https://www.ehealthsask.ca' },
  NS: { nom: 'MSI Nouvelle-Écosse',     attente: '0 mois',  lien: 'https://novascotia.ca/dhw/msi/' },
  NB: { nom: 'Medicare Nouveau-Brunswick', attente: '3 mois', lien: 'https://www2.gnb.ca/content/gnb/fr/ministeres/sante/services-aux-neouveaux-arrivants.html' },
  NL: { nom: 'MCP Terre-Neuve',        attente: '0 mois',  lien: 'https://www.gov.nl.ca/hcs/mcp/' },
  PE: { nom: "PEI Health Card",         attente: '3 mois',  lien: 'https://www.princeedwardisland.ca/en/information/health-pei/pei-health-card' },
}

const PERMIS_PROV = {
  ON: { nom: 'DriveTest Ontario',       lien: 'https://drivetest.ca' },
  QC: { nom: 'SAAQ Québec',             lien: 'https://saaq.gouv.qc.ca' },
  BC: { nom: 'ICBC Colombie-Brit.',     lien: 'https://www.icbc.com' },
  AB: { nom: 'Service Alberta',         lien: 'https://www.alberta.ca/get-drivers-licence' },
  MB: { nom: 'MPI Manitoba',            lien: 'https://www.mpi.mb.ca' },
  SK: { nom: 'SGI Saskatchewan',        lien: 'https://www.sgi.sk.ca' },
  NS: { nom: "Access Nova Scotia",      lien: 'https://novascotia.ca/access/' },
  NB: { nom: 'Service NB',             lien: 'https://www2.gnb.ca/content/gnb/fr/services/services_renderer.10171.html' },
}

export function generateTasks(profile) {
  const tasks = []
  const {
    type_immigrant = 'rp_economique',
    province = 'ON',
    etape_parcours = 'semaine_1',
    situation_fam = 'seul',
    priorites = [],
  } = profile

  const sante   = SANTE_PROV[province]  || { nom: 'Assurance santé provinciale', attente: '3 mois', lien: 'https://www.canada.ca/fr/sante-canada.html' }
  const permis  = PERMIS_PROV[province] || { nom: 'Ministère des transports provincial', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete.html' }

  const notArrived  = etape_parcours === 'pre_arrivee' || type_immigrant === 'pre_arrivee'
  const isRefugee   = type_immigrant === 'refugie_gov' || type_immigrant === 'refugie_prive'
  const isGovRef    = type_immigrant === 'refugie_gov'
  const isAsylum    = type_immigrant === 'demandeur_asile'
  const isStudent   = type_immigrant === 'etudiant'
  const isWorker    = type_immigrant === 'travailleur'
  const isRP        = ['rp_economique', 'conjoint'].includes(type_immigrant)
  const wantsJob    = priorites.includes('emploi') || isRP || isWorker
  const hasKids     = ['famille_scolaires', 'parent_seul'].includes(situation_fam)
  const hasYoungKids= situation_fam === 'famille_jeunes'
  const hasFamily   = situation_fam !== 'seul'

  // ─────────────────────────────────────────────────────────
  // PHASE 0 — AVANT L'ARRIVÉE
  // Source : https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/preparer-arrivee.html
  // ─────────────────────────────────────────────────────────
  if (notArrived) {
    if (!isRefugee && !isAsylum) {
      tasks.push(
        {
          titre: 'Lire le guide officiel "Bienvenue au Canada"',
          categorie: 'installation', priorite: 'urgent', jour_cible: -30, phase: 0,
          description: 'Guide IRCC gratuit : droits et obligations, démarches à prévoir, vie au Canada.',
          organisme: 'IRCC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/nouvelle-vie-canada.html',
        },
        {
          titre: 'Vérifier et rassembler tous tes documents d\'entrée',
          categorie: 'documents', priorite: 'urgent', jour_cible: -20, phase: 0,
          description: 'COPR tamponné + passeport valide (6 mois min.) + visa (si applicable). Fais 2 copies papier + version numérique sécurisée.',
          organisme: 'IRCC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/preparer-arrivee.html',
        },
        {
          titre: 'Souscrire une assurance santé privée de voyage',
          categorie: 'sante', priorite: 'urgent', jour_cible: -14, phase: 0,
          description: `${sante.nom} a un délai de carence${sante.attente !== '0 mois' ? ` de ${sante.attente}` : ' nul'} en ${province}. Prends une assurance privée pour couvrir les 3 premiers mois (urgences, hospitalisation). Coût : 50–200 $/mois.`,
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/preparer-arrivee.html',
        },
        {
          titre: 'Préparer ta preuve de fonds',
          categorie: 'banque', priorite: 'urgent', jour_cible: -14, phase: 0,
          description: 'Les agents des douanes peuvent demander une preuve de fonds à l\'entrée. Recommandé : min. 10 000 $ CAD accessibles (relevé bancaire récent de moins de 30 jours).',
          organisme: 'ASFC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/preparer-arrivee.html',
        },
        {
          titre: 'Réserver un hébergement temporaire',
          categorie: 'logement', priorite: 'urgent', jour_cible: -10, phase: 0,
          description: 'Hôtel, Airbnb ou résidence d\'accueil pour les 2–4 premières semaines. Préfère un quartier avec transports en commun et commerces proches.',
        },
        {
          titre: 'Sauvegarder tes documents dans le nuage',
          categorie: 'documents', priorite: 'normal', jour_cible: -7, phase: 0,
          description: 'Google Drive ou iCloud : passeport, COPR, diplômes, relevés de notes, vaccins, acte de naissance. Essentiel en cas de perte de bagages.',
        },
        {
          titre: 'Contacter un service d\'établissement pré-arrivée',
          categorie: 'installation', priorite: 'normal', jour_cible: -7, phase: 0,
          description: 'IRCC finance des services gratuits avant même l\'arrivée : orientation, connexion communautaire, aide à la recherche de logement. ACCES Employment, YMCA Nouveaux Arrivants, etc.',
          organisme: 'IRCC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/trouver-aide-immigration.html',
        },
        {
          titre: 'Rechercher ta ville et ton quartier de destination',
          categorie: 'installation', priorite: 'normal', jour_cible: -7, phase: 0,
          description: 'Coût de la vie, transports, communautés francophones/de ton origine, accès aux services. Utilise les portails city.ca de ta ville.',
        },
        {
          titre: 'Faire apostiller tes diplômes et relevés de notes',
          categorie: 'emploi', priorite: 'normal', jour_cible: -7, phase: 0,
          description: 'WES Canada et IQAS exigent des documents officiels traduits et certifiés. Commence les démarches depuis ton pays — cela peut prendre plusieurs semaines.',
          organisme: 'WES Canada',
          lien_officiel: 'https://www.wes.org/ca',
        },
        {
          titre: 'Planifier tes finances pour les 3 premiers mois',
          categorie: 'banque', priorite: 'normal', jour_cible: -3, phase: 0,
          description: 'Budget estimatif : 1 500–2 500 $/mois (logement, alimentation, transport). Vérifie les frais de virement international depuis ton pays (Wise, Revolut sont souvent meilleurs que ta banque).',
          lien_officiel: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/sujets/budget.html',
        },
      )
    }

    if (isGovRef) {
      tasks.push(
        {
          titre: 'Communiquer avec ton agent IRCC de réinstallation',
          categorie: 'installation', priorite: 'urgent', jour_cible: -7, phase: 0,
          description: 'Ton agent IRCC coordonne ton arrivée (logement, transport depuis l\'aéroport, première aide). Confirme les détails de ton vol.',
          organisme: 'IRCC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/aide-refugies-reinstalles.html',
        },
        {
          titre: 'Préparer tes documents personnels (cartes d\'identité, photos)',
          categorie: 'documents', priorite: 'urgent', jour_cible: -7, phase: 0,
          description: 'Rassemble tous tes documents d\'identité. Le programme de réinstallation t\'aidera à en obtenir si tu n\'en as pas.',
        },
      )
    }

    if (isAsylum) {
      tasks.push(
        {
          titre: 'Déposer ta demande d\'asile dès ton entrée',
          categorie: 'juridique', priorite: 'urgent', jour_cible: 0, phase: 0,
          description: 'Tu peux déposer ta demande aux douanes (ASFC) ou à un bureau IRCC intérieur. La demande doit être faite dès que possible.',
          organisme: 'ASFC / IRCC',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/protection-canada/demander-asile.html',
        },
        {
          titre: 'Chercher un aide juridique gratuite',
          categorie: 'juridique', priorite: 'urgent', jour_cible: 0, phase: 0,
          description: 'Chaque province a un service d\'aide juridique gratuit pour les demandeurs d\'asile. Contacte-le immédiatement — l\'audience IRB peut être fixée rapidement.',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/protection-canada/demander-asile.html',
        },
      )
    }

    // Phase 1 tasks exist but are NOT urgent for pre-arrival people
    tasks.push(
      { titre: 'Franchir les douanes et activer ton statut', categorie: 'documents', priorite: 'normal', jour_cible: 0, phase: 1, description: 'À faire à l\'arrivée : présente ton COPR + passeport à l\'ASFC. Un agent tamponnera ton COPR.', organisme: 'ASFC', lien_officiel: 'https://www.cbsa-asfc.gc.ca/newcomers-nouveaux/menu-fra.html' },
      { titre: 'Acheter une carte SIM canadienne', categorie: 'installation', priorite: 'normal', jour_cible: 1, phase: 1, description: 'Koodo, Public Mobile ou Fido — plans prépayés dès 15 $/mois sans contrat. Comparatif dans la section Outils.', lien_officiel: 'https://www.koodomobile.com' },
      { titre: `S'inscrire à ${sante.nom}`, categorie: 'sante', priorite: 'normal', jour_cible: 1, phase: 1, description: `Inscris-toi dès l'arrivée même si le délai de carence est ${sante.attente}. Garde tous tes reçus médicaux pendant la période d'attente.`, lien_officiel: sante.lien },
      { titre: 'Obtenir ton NAS (Numéro d\'Assurance Sociale)', categorie: 'documents', priorite: 'normal', jour_cible: 2, phase: 1, description: 'Bureau Service Canada : COPR/visa + passeport. Gratuit, immédiat. Requis pour travailler et recevoir des prestations.', organisme: 'Service Canada', formulaire: 'SIN Application', lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html' },
      { titre: 'Ouvrir un compte bancaire canadien', categorie: 'banque', priorite: 'normal', jour_cible: 2, phase: 1, description: 'TD, RBC, Scotiabank, BMO, CIBC et Desjardins ont des programmes Newcomers sans historique de crédit. Compare les options dans la section Outils.', lien_officiel: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/sujets/produits-services-bancaires/comptes-bancaires/comptes-bancaires-nouveaux-arrivants.html' },
    )
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 1 — ARRIVÉE (pour ceux qui sont déjà arrivés)
  // ─────────────────────────────────────────────────────────
  if (!notArrived) {
    if (!isGovRef) {
      tasks.push(
        {
          titre: 'Franchir les douanes et activer ton statut',
          categorie: 'documents', priorite: 'urgent', jour_cible: 0, phase: 1,
          description: 'Présente ton COPR + passeport à l\'agent ASFC. Il tamponnera ton COPR — c\'est ton premier document officiel de résidence.',
          organisme: 'ASFC',
          lien_officiel: 'https://www.cbsa-asfc.gc.ca/newcomers-nouveaux/menu-fra.html',
        },
        {
          titre: 'Acheter une carte SIM canadienne',
          categorie: 'installation', priorite: 'urgent', jour_cible: 1, phase: 1,
          description: 'Nécessaire pour toutes les démarches (banque, médecin, école). Koodo, Public Mobile ou Fido — dès 15 $/mois. Compare dans la section Outils.',
          lien_officiel: 'https://www.koodomobile.com',
        },
        {
          titre: `S'inscrire à ${sante.nom}`,
          categorie: 'sante', priorite: 'urgent', jour_cible: 1, phase: 1,
          description: `Inscris-toi dès le 1er jour même si le délai de carence est ${sante.attente}. ${sante.attente !== '0 mois' ? `Garde une assurance privée pendant ces ${sante.attente} et conserve tes reçus.` : 'Tu es couvert immédiatement en Alberta et Nouvelle-Écosse.'}`,
          organisme: sante.nom,
          lien_officiel: sante.lien,
        },
      )
    }

    if (isAsylum) {
      tasks.push(
        {
          titre: 'Déposer ta demande d\'asile (si pas encore fait)',
          categorie: 'juridique', priorite: 'urgent', jour_cible: 0, phase: 1,
          description: 'Possible aux douanes (ASFC) ou à un bureau IRCC intérieur dans les 60 jours de l\'arrivée.',
          organisme: 'ASFC / IRCC',
          formulaire: 'IMM 5669',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/protection-canada/demander-asile.html',
        },
        {
          titre: 'Contacter une aide juridique gratuite',
          categorie: 'juridique', priorite: 'urgent', jour_cible: 1, phase: 1,
          description: 'Chaque province a un service d\'aide juridique gratuit pour demandeurs d\'asile. Ne va pas à l\'audience IRB sans représentation.',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/protection-canada/demander-asile.html',
        },
        {
          titre: 'Demander un permis de travail (formulaire IMM 5710)',
          categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 1,
          description: 'Tu peux travailler pendant que ta demande est examinée. Dépose IMM 5710 dès que tu as ton récépissé de demande d\'asile.',
          organisme: 'IRCC',
          formulaire: 'IMM 5710',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada/permis/temporaire/demander.html',
        },
      )
    }

    if (isGovRef) {
      tasks.push(
        {
          titre: 'Prendre contact avec ton organisme de réinstallation (PAR)',
          categorie: 'installation', priorite: 'urgent', jour_cible: 0, phase: 1,
          description: 'Le Programme d\'aide à la réinstallation (PAR) t\'aide pour le logement, la nourriture, les vêtements et les démarches initiales.',
          organisme: 'IRCC / PAR',
          lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/refugies/aide-refugies-reinstalles.html',
        },
      )
    }

    tasks.push(
      {
        titre: 'Obtenir ton NAS (Numéro d\'Assurance Sociale)',
        categorie: 'documents', priorite: 'urgent', jour_cible: 2, phase: 1,
        description: 'Bureau Service Canada : apporte ton COPR + passeport (RP) ou permis (étudiant/travailleur). Gratuit et immédiat. Requis pour travailler et recevoir toute prestation.',
        organisme: 'Service Canada',
        formulaire: 'SIN Application',
        lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html',
      },
      {
        titre: 'Ouvrir un compte bancaire canadien',
        categorie: 'banque', priorite: 'urgent', jour_cible: 2, phase: 1,
        description: 'TD, RBC, Scotiabank, BMO, CIBC et Desjardins — programmes Newcomers sans historique de crédit requis. Amène ton passeport + COPR/visa + preuve d\'adresse.',
        lien_officiel: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/sujets/produits-services-bancaires/comptes-bancaires/comptes-bancaires-nouveaux-arrivants.html',
      },
      {
        titre: 'Trouver un hébergement temporaire stable',
        categorie: 'logement', priorite: 'urgent', jour_cible: 0, phase: 1,
        description: 'Si pas encore réservé : hôtel, Airbnb, ou résidence communautaire pour les premières semaines. Critères : transports en commun proches + internet + cuisine.',
      },
    )

    if (hasKids) {
      tasks.push({
        titre: 'Inscrire les enfants à l\'école locale',
        categorie: 'education', priorite: 'urgent', jour_cible: 3, phase: 1,
        description: 'Gratuit de la maternelle à la 12e année. Contacte le conseil scolaire local avec les bulletins scolaires étrangers, preuves de vaccins et preuve d\'adresse.',
        organisme: 'Conseil scolaire local',
        lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/nouvelle-vie-canada/education.html',
      })
    }

    tasks.push({
      titre: 'Contacter un service d\'établissement gratuit',
      categorie: 'installation', priorite: 'normal', jour_cible: 3, phase: 1,
      description: 'IRCC finance des organismes gratuits dans chaque ville : orientation, traduction, aide à l\'emploi, logement, garderie. COSTI, ACCES, YMCA Nouveaux Arrivants.',
      organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/trouver-aide-immigration.html',
    })
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 2 — DOCUMENTS (J+7 à J+30)
  // ─────────────────────────────────────────────────────────
  if (isRP || isAsylum) {
    tasks.push({
      titre: 'Demander ta carte de Résident Permanent',
      categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 2,
      description: 'Formulaire IMM 5444. À soumettre dans les 180 jours suivant ton entrée au Canada. Frais : 50 $. Délai de traitement : 4–6 mois.',
      formulaire: 'IMM 5444', organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/carte-rp/apply-first-card.html',
    })
  }

  if (isStudent) {
    tasks.push({
      titre: 'Enregistrer ton permis d\'études auprès de ton établissement',
      categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 2,
      description: 'Ton établissement doit confirmer ton inscription pour valider ton permis. Apporte le permis + lettre d\'acceptation.',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada.html',
    })
  }

  if (isWorker) {
    tasks.push({
      titre: 'Vérifier les conditions de ton permis de travail',
      categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 2,
      description: 'Vérifie si ton permis est fermé (lié à un employeur) ou ouvert. Contacte ton employeur pour confirmer les modalités.',
      organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada/permis.html',
    })
  }

  tasks.push(
    {
      titre: `Obtenir ta carte d\'assurance maladie ${sante.nom}`,
      categorie: 'sante', priorite: 'urgent', jour_cible: 7, phase: 2,
      description: `${sante.attente !== '0 mois' ? `Après le délai de carence de ${sante.attente}, tu recevras ta carte. ` : ''}Garde tes reçus de consultations privées pendant l'attente pour un éventuel remboursement partiel.`,
      lien_officiel: sante.lien,
    },
    {
      titre: 'Créer ton compte Mon dossier Service Canada',
      categorie: 'documents', priorite: 'urgent', jour_cible: 10, phase: 2,
      description: 'Accès en ligne à tes prestations AE, RPC, SV. Nécessite ton NAS + code d\'accès personnel (envoyé par la poste en 5–10 jours).',
      organisme: 'Service Canada',
      lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/mon-dossier.html',
    },
    {
      titre: 'Créer ton compte Mon dossier ARC',
      categorie: 'documents', priorite: 'normal', jour_cible: 14, phase: 2,
      description: 'Accès à tes déclarations de revenus, remboursements et prestations (ACE, TPS/TVH). Requiert un NAS + revenu déclaré ou lettre d\'ARC.',
      organisme: 'Agence du revenu du Canada',
      lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/services-electroniques/services-electroniques-particuliers/dossier-particuliers.html',
    },
  )

  if (hasKids || hasFamily) {
    tasks.push({
      titre: 'Demander l\'Allocation canadienne pour enfants (ACE)',
      categorie: 'documents', priorite: 'urgent', jour_cible: 14, phase: 2,
      description: 'Jusqu\'à 7 787 $/an par enfant de moins de 6 ans, non imposable. Formulaire RC66. Requiert une déclaration de revenus même pour la première année.',
      formulaire: 'RC66', organisme: 'ARC',
      lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/allocation-canadienne-enfants-apercu.html',
    })
  }

  tasks.push({
    titre: 'Convertir ton permis de conduire étranger',
    categorie: 'transport', priorite: 'normal', jour_cible: 14, phase: 2,
    description: `Apporte ton permis étranger + traduction certifiée (si non anglais/français) + preuve de résidence. ${permis.nom} gère la conversion. Certains pays ont des ententes de réciprocité (pas de test requis).`,
    organisme: permis.nom,
    lien_officiel: permis.lien,
  })

  if (province === 'QC') {
    tasks.push({
      titre: 'S\'inscrire à la francisation (gratuit)',
      categorie: 'langue', priorite: 'urgent', jour_cible: 14, phase: 2,
      description: 'Cours de français gratuits financés par le MIFI. Ouvert à tous les immigrants. Disponible en ligne et en présentiel. Allocation de participation possible.',
      organisme: 'MIFI Québec',
      lien_officiel: 'https://www.quebec.ca/education/apprendre-le-francais',
    })
  }

  if (hasKids) {
    tasks.push({
      titre: 'Vérifier les vaccins requis par l\'école',
      categorie: 'sante', priorite: 'urgent', jour_cible: 14, phase: 2,
      description: 'Chaque province a une liste de vaccins obligatoires pour l\'école. Apporte le carnet de vaccination étranger à la santé publique locale pour validation.',
      lien_officiel: 'https://www.canada.ca/fr/sante-publique/services/immunisation/calendrier-vaccinations.html',
    })
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 3 — INSTALLATION (J+30 à J+90)
  // ─────────────────────────────────────────────────────────
  tasks.push(
    {
      titre: 'Trouver un logement permanent',
      categorie: 'logement', priorite: priorites.includes('logement') ? 'urgent' : 'normal', jour_cible: 14, phase: 3,
      description: 'Kijiji, Rentals.ca, PadMapper — budget moyen : 1 500–2 500 $/mois selon la ville. Attention : propriétaire ne peut exiger plus d\'un mois de dépôt.',
      lien_officiel: 'https://rentals.ca',
    },
    {
      titre: 'Souscrire une assurance habitation locataire',
      categorie: 'logement', priorite: 'normal', jour_cible: 30, phase: 3,
      description: 'Obligatoire dans la plupart des baux. Couvre tes effets personnels + responsabilité civile. Intact, Sonnet ou Desjardins — à partir de 15 $/mois.',
    },
    {
      titre: 'Trouver un médecin de famille',
      categorie: 'sante', priorite: 'normal', jour_cible: 30, phase: 3,
      description: 'Utilise le portail provincial de ta province pour trouver un médecin acceptant de nouveaux patients. Clinique sans rendez-vous en attendant.',
      lien_officiel: 'https://www.canada.ca/fr/sante-canada/services/soins-sante/professionnels-sante.html',
    },
  )

  if (!province === 'QC') {
    tasks.push({
      titre: 'S\'inscrire aux cours de langue LINC (anglais) ou CLIC (français)',
      categorie: 'langue', priorite: 'normal', jour_cible: 14, phase: 3,
      description: 'Gratuit pour les RP et réfugiés financé par IRCC. Inscription via un fournisseur LINC/CLIC de ta ville.',
      organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/apprentissage-langue.html',
    })
  }

  if (wantsJob) {
    tasks.push(
      {
        titre: 'Adapter ton CV au format canadien',
        categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3,
        description: 'Pas de photo, pas d\'âge, pas d\'état civil, pas de « Monsieur/Madame ». Maximum 2 pages. Accent sur les résultats quantifiables. Consulte les modèles sur Job Bank.',
        lien_officiel: 'https://www.jobbank.gc.ca/career-planning/resume',
      },
      {
        titre: 'Créer un profil LinkedIn canadien',
        categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3,
        description: 'Photo professionnelle, titre accrocheur, sommaire en anglais. Rejoins les groupes de ta profession et de ta province.',
        lien_officiel: 'https://www.linkedin.com/jobs',
      },
      {
        titre: 'Faire évaluer tes diplômes étrangers (WES ou IQAS)',
        categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3,
        description: 'WES Canada (4–6 semaines) ou IQAS pour l\'Alberta. Obligatoire pour la plupart des emplois professionnels réglementés. Frais : 215–310 $.',
        organisme: 'WES Canada',
        lien_officiel: 'https://www.wes.org/ca',
      },
      {
        titre: 'S\'inscrire à un programme d\'aide à l\'emploi pour immigrants',
        categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3,
        description: 'Mentorat professionnel, formation CV/entretien, accès au réseau. ACCES Employment, Immigrant Services Society, Centre Francophone. Gratuit.',
        lien_officiel: 'https://accesemployment.ca',
      },
    )
  }

  if (hasYoungKids) {
    tasks.push({
      titre: 'Chercher une place en garderie subventionnée',
      categorie: 'education', priorite: 'normal', jour_cible: 30, phase: 3,
      description: 'Programme fédéral d\'garderies à 10 $/jour dans la plupart des provinces. Listes d\'attente importantes — inscris-toi dès l\'arrivée via le portail provincial.',
      lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/programmes/apprentissage-garde-jeunes-enfants.html',
    })
  }

  if (province === 'QC') {
    tasks.push({
      titre: 'Faire reconnaître tes diplômes au Québec',
      categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3,
      description: 'Contacte l\'ordre professionnel de ton domaine (ingénieurs, médecins, avocats) ou le MIFI pour la reconnaissance. Certains diplômes nécessitent une formation d\'appoint.',
      organisme: 'MIFI / Ordre professionnel',
      lien_officiel: 'https://www.quebec.ca/emploi/travailler-au-quebec/exercer-profession-reglementee',
    })
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 4 — INTÉGRATION (3–12 mois)
  // ─────────────────────────────────────────────────────────
  tasks.push(
    {
      titre: 'Faire sa première déclaration de revenus',
      categorie: 'documents', priorite: 'urgent', jour_cible: 90, phase: 4,
      description: 'Obligatoire même avec peu ou pas de revenus — donne accès à toutes les prestations fédérales. Date limite : 30 avril. Utilise TurboImpôt ou H&R Block (version gratuite).',
      organisme: 'Agence du revenu du Canada',
      lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/impot/particuliers/sujets/tout-votre-declaration-revenus.html',
    },
    {
      titre: 'Ouvrir une carte de crédit sécurisée',
      categorie: 'banque', priorite: 'normal', jour_cible: 30, phase: 4,
      description: 'Commence à bâtir ton historique de crédit canadien — indispensable pour louer ou acheter. Capital One Secured, Secured Visa TD ou Home Trust. Dépôt de 200–500 $.',
      lien_officiel: 'https://www.canada.ca/fr/agence-consommation-matiere-financiere/sujets/dossier-credit.html',
    },
    {
      titre: 'Ouvrir un CELI (Compte d\'Épargne Libre d\'Impôt)',
      categorie: 'banque', priorite: 'normal', jour_cible: 60, phase: 4,
      description: 'Droits de cotisation dès l\'année de tes 18 ans au Canada (6 500 $/an en 2024). Tes placements fructifient sans impôt. Disponible dans toutes les banques.',
      lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/impot/particuliers/sujets/reer-et-autres-regimes/compte-epargne-libre-impot.html',
    },
    {
      titre: 'Rejoindre des associations et groupes communautaires',
      categorie: 'installation', priorite: 'normal', jour_cible: 60, phase: 4,
      description: 'Meetup, associations culturelles, clubs sportifs, bénévolat. Le réseau social est la clé du marché d\'emploi caché au Canada (70–80 % des offres ne sont pas publiées).',
    },
    {
      titre: 'Apprendre tes droits en tant que travailleur au Canada',
      categorie: 'emploi', priorite: 'normal', jour_cible: 90, phase: 4,
      description: 'Salaire minimum, congés payés, protection contre le licenciement abusif. Les normes varient par province. Consulte le site du ministère du Travail provincial.',
      lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/normes-travail.html',
    },
  )

  // ─────────────────────────────────────────────────────────
  // PHASE 5 — CITOYENNETÉ (3–5 ans)
  // Source : https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen
  // ─────────────────────────────────────────────────────────
  if (isRP || isRefugee) {
    tasks.push(
      {
        titre: 'Suivre tes jours de présence (calculateur MaplePath)',
        categorie: 'documents', priorite: 'normal', jour_cible: 365, phase: 5,
        description: 'Il faut avoir résidé 1 460 jours (4 ans) au Canada dans les 5 dernières années avant la demande. Utilise le calculateur MaplePath pour un suivi précis.',
        lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/eligibilite.html',
      },
      {
        titre: 'Vérifier ton éligibilité à la citoyenneté',
        categorie: 'documents', priorite: 'normal', jour_cible: 1095, phase: 5,
        description: 'Conditions : 1 460 jours de présence, déclarations de revenus à jour, connaissance de l\'anglais ou du français (niveau B1), connaissance du Canada.',
        organisme: 'IRCC',
        lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/eligibilite.html',
      },
      {
        titre: 'Étudier "Découvrir le Canada" (guide officiel)',
        categorie: 'documents', priorite: 'normal', jour_cible: 1095, phase: 5,
        description: 'Guide officiel IRCC pour le test de citoyenneté. Disponible gratuitement en ligne. Couvre l\'histoire, les valeurs, le gouvernement et les symboles du Canada.',
        organisme: 'IRCC',
        lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/preparation-test-citoyennete.html',
      },
      {
        titre: 'Pratiquer avec le Quiz MaplePath (100 questions)',
        categorie: 'documents', priorite: 'normal', jour_cible: 1095, phase: 5,
        description: 'Pratique les 100 questions officielles. Score minimum requis au test : 15/20. Les mineurs de moins de 14 ans et les personnes de 55 ans et plus n\'ont pas à passer le test.',
      },
      {
        titre: 'Soumettre la demande de citoyenneté (CIT 0002)',
        categorie: 'documents', priorite: 'normal', jour_cible: 1200, phase: 5,
        description: 'Frais : 630 $ (adulte), 100 $ (mineur). Documents requis : photos, historique de voyages, preuve de langue. Délai de traitement actuel : 12–24 mois.',
        formulaire: 'CIT 0002', organisme: 'IRCC',
        lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/canadiens/devenir-citoyen/demande-citoyennete.html',
      },
    )
  }

  return tasks
}

export function getPhaseActuelle(etape_parcours, type_immigrant) {
  if (etape_parcours === 'pre_arrivee' || type_immigrant === 'pre_arrivee') return 0
  if (etape_parcours === 'semaine_1') return 1
  if (etape_parcours === 'mois_1') return 2
  if (etape_parcours === 'mois_3') return 3
  if (etape_parcours === 'an_1') return 4
  if (etape_parcours === 'citoyennete') return 5
  return 1
}
