# MaplePath — Design Spec
**Date :** 2026-05-27  
**Statut :** Approuvé  

---

## 1. Résumé du projet

MaplePath est une PWA mobile-first qui accompagne les nouveaux immigrants au Canada de leur arrivée à l'aéroport jusqu'à l'obtention de la citoyenneté. L'app commence par un sondage d'onboarding en 6 étapes qui construit un profil personnalisé, puis génère un parcours sur mesure avec checklists, outils et rappels adaptés.

---

## 2. Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite 5 |
| Styles | Tailwind CSS v3 + design tokens custom |
| Animations | Framer Motion 11 |
| Routing | React Router v6 |
| Auth | Clerk React SDK (`@clerk/clerk-react`) |
| Base de données | Neon PostgreSQL (`@neondatabase/serverless`) |
| API layer | Vercel API routes (`/api/*.js`) |
| State | Zustand 4 + persist (localStorage) |
| Icons | Lucide React |
| Fonts | Plus Jakarta Sans (titres) + Inter (corps) |
| i18n | i18next + react-i18next |
| Dates | date-fns |
| Confetti | react-confetti |
| PWA | vite-plugin-pwa |
| Deploy | Vercel |

---

## 3. Architecture

### Flux de données
```
Browser (React)
  → Clerk.getToken()              ← vérifie session utilisateur
  → fetch('/api/profile', token)  ← Vercel API route
      → vérifie JWT Clerk
      → neon`SELECT * FROM profiles WHERE id = $1`
      → retourne JSON
  → Zustand store (hydratation)
  → Composants React
```

### Structure du projet
```
maplepathapp/
├── api/                          ← Vercel serverless functions
│   ├── profile.js                ← GET/POST/PATCH profil
│   ├── tasks.js                  ← GET/POST/PATCH tâches
│   ├── quiz.js                   ← POST session quiz
│   └── presence.js               ← GET/POST jours de présence
├── public/
│   ├── icons/                    ← PWA icons
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── maple-leaf.svg
│   ├── components/
│   │   ├── ui/                   ← Button, Card, Badge, ProgressBar, CheckItem, Modal
│   │   ├── layout/               ← AppShell, BottomNav, TopBar
│   │   ├── onboarding/           ← OnboardingFlow, SondageProgress, steps/
│   │   └── dashboard/            ← HeroCard, TaskList, PhaseRoadmap, ToolsGrid
│   ├── pages/                    ← Welcome, Onboarding, Dashboard, Checklist,
│   │                                Outils, CitoyenneteQuiz, Calculateur, Profil
│   ├── hooks/                    ← useProfile, useChecklist, useProgress, useCitizenship
│   ├── lib/                      ← api.js, clerk.js, taskEngine.js, i18n.js
│   ├── data/                     ← tasks.js, provinces.js, quiz.js (100q), ressources.js
│   ├── store/
│   │   └── useAppStore.js        ← Zustand store global
│   ├── styles/globals.css
│   ├── App.jsx
│   └── main.jsx
├── .env.local                    ← JAMAIS committé
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Variables d'environnement
```bash
# .env.local — côté client
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# .env.local — côté serveur (API routes uniquement, jamais VITE_)
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL=postgresql://...     ← connection string Neon
```

---

## 4. Routing & Navigation

```
/ (Welcome)      → page d'accueil publique
/onboarding      → sondage 6 étapes (Clerk sign-up intégré step 1 ou avant)
/dashboard       → tableau de bord (protégé)
/checklist       → checklists complètes (protégé)
/outils          → centre de ressources (protégé)
/quiz            → quiz citoyenneté (protégé)
/calculateur     → calculateur citoyenneté (protégé)
/profil          → profil utilisateur (protégé)
```

`AppShell.jsx` wrape toutes les routes protégées. Utilise `useAuth()` de Clerk — redirect vers `/welcome` si non authentifié.

**Bottom navigation (5 onglets) :** Accueil · Checklist · Outils · Quiz · Profil  
Le calculateur est accessible depuis `ToolsGrid` sur le Dashboard.

---

## 5. Pages & Fonctionnalités

### Welcome.jsx
- Logo MaplePath animé (`bounceSoft`)
- Tagline "De l'aéroport à la citoyenneté"
- 3 feature cards en stagger (Parcours · Checklists · Quiz)
- CTA "Commencer — 2 min" → `/onboarding`
- Switcher langue FR | EN | AR | ES

### Flux d'authentification
1. Welcome.jsx affiche `<SignIn>` / `<SignUp>` Clerk embedded (modal ou page dédiée)
2. Post sign-up/sign-in → Clerk redirige vers `/onboarding` si `onboarding_done = false`, sinon `/dashboard`
3. `AppShell` vérifie `useAuth().isSignedIn` — redirect `/welcome` si false

### Onboarding (6 étapes)
| Étape | Composant | Type |
|-------|-----------|------|
| 1 | StepLangue | Single select — 6 langues |
| 2 | StepTypeImmigrant | Single select — 8 types |
| 3 | StepProvince | Grid pills — 13 provinces/territoires |
| 4 | StepEtape | Single select — 6 étapes parcours |
| 5 | StepFamille | Single select — 5 situations |
| 6 | StepPriorites | Multi-select — 10 priorités |

Post-sondage : écran de génération animé (3s) → `generateTasks(profile)` **[côté client, src/lib/taskEngine.js]** → POST `/api/tasks` (batch insert) → redirect Dashboard.

### Dashboard.jsx
- `HeroCard` — fond jaune, prénom + province + type + progression
- `PhaseRoadmap` — scroll horizontal 5 phases, tap → modal tâches
- `TaskList` — sections Urgent / Cette semaine / Ce mois
- `ToolsGrid` — grille 2×3 : Calculateur · Quiz · Banques · Logement · Formulaires · Bénéfices

### Checklist.jsx
- Onglets par phase (5)
- Filtres par catégorie
- Toggle tâche avec optimistic update
- FAB jaune "Ajouter tâche personnalisée"

### Calculateur.jsx
- Date RP + calcul jours de présence
- Cercle de progression animé (sur 1460 jours)
- Journal des voyages (absences)
- Date d'éligibilité estimée

### CitoyenneteQuiz.jsx
- 100 questions "Découvrir le Canada" en `src/data/quiz.js`
- Mode pratique (10q aléatoires) + Mode examen (20q, 30min, 75% = réussite)
- 5 catégories : Histoire(25) · Gouvernement(25) · Droits(20) · Symboles(15) · Géographie(15)
- Confetti si score ≥ 75%
- Historique des sessions (table `quiz_sessions`)

### Outils.jsx
- Banques Newcomers (TD/RBC/Scotiabank/BMO)
- Reconnaissance diplômes (WES, IQAS, liens par province)
- Cours de langue (LINC gratuit, DELF, TEFAQ)
- Aide gouvernementale (ACE, formulaires)
- Médecin de famille (Health811 par province)
- Formulaires IRCC (IMM 5444, CIT 0002, etc.)

### Profil.jsx
- Avatar initiales
- Infos : prénom, province, type, date d'arrivée
- Modifier priorités
- Préférences langue + notifications
- Documents importants (dates d'expiration)
- Déconnexion Clerk

---

## 6. Schéma base de données (Neon)

```sql
-- profiles.id = Clerk userId (TEXT, pas UUID)
CREATE TABLE profiles (
  id              TEXT PRIMARY KEY,        -- Clerk user ID
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  langue          TEXT DEFAULT 'fr',
  type_immigrant  TEXT,
  province        TEXT,
  etape_parcours  TEXT,
  situation_fam   TEXT,
  statut_emploi   TEXT,
  niveau_fr       TEXT DEFAULT 'intermediate',
  niveau_en       TEXT DEFAULT 'intermediate',
  priorites       TEXT[] DEFAULT '{}',
  prenom          TEXT,
  avatar_url      TEXT,
  ville           TEXT,
  date_arrivee    DATE,
  onboarding_done BOOLEAN DEFAULT FALSE,
  phase_actuelle  INTEGER DEFAULT 1,
  score_quiz      INTEGER DEFAULT 0,
  date_rp         DATE,
  jours_presence  INTEGER DEFAULT 0,
  eligible_citoyennete BOOLEAN DEFAULT FALSE
);

CREATE TABLE checklist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  user_id     TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  titre       TEXT NOT NULL,
  description TEXT,
  categorie   TEXT,
  phase       INTEGER DEFAULT 1,
  priorite    TEXT DEFAULT 'normal',
  jour_cible  INTEGER,
  lien_officiel TEXT,
  formulaire  TEXT,
  organisme   TEXT,
  delai_jours INTEGER,
  complete    BOOLEAN DEFAULT FALSE,
  complete_at TIMESTAMPTZ,
  notes       TEXT,
  skipped     BOOLEAN DEFAULT FALSE
);

CREATE TABLE presence_days (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  date_debut DATE NOT NULL,
  date_fin   DATE NOT NULL,
  pays       TEXT DEFAULT 'CA',
  type       TEXT DEFAULT 'presence',
  note       TEXT
);

CREATE TABLE quiz_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  user_id         TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  score           INTEGER,
  total_questions INTEGER,
  pourcentage     NUMERIC(5,2),
  duree_secondes  INTEGER,
  questions_ratees JSONB DEFAULT '[]'
);

CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  user_id     TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  titre       TEXT NOT NULL,
  message     TEXT,
  type        TEXT DEFAULT 'reminder',
  date_envoi  TIMESTAMPTZ,
  lu          BOOLEAN DEFAULT FALSE,
  lien        TEXT
);

CREATE TABLE documents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  user_id     TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  nom         TEXT NOT NULL,
  type        TEXT,
  fichier_url TEXT,
  expiration  DATE,
  notes       TEXT
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 7. API Routes (Vercel)

Chaque route vérifie le JWT Clerk avant d'accéder à Neon.

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/profile` | GET | Récupère le profil de l'utilisateur connecté |
| `/api/profile` | POST | Crée/met à jour le profil (post-onboarding) |
| `/api/tasks` | GET | Récupère toutes les tâches de l'utilisateur |
| `/api/tasks` | POST | Insère un batch de tâches (post-onboarding) |
| `/api/tasks` | PATCH | Met à jour une tâche (complete, notes) |
| `/api/quiz` | POST | Enregistre une session quiz |
| `/api/presence` | GET | Récupère les jours de présence |
| `/api/presence` | POST | Ajoute une période de présence/absence |

---

## 8. Design System

```
Couleur principale  : #FFD600 (brand-300)
Couleur secondaire  : #C41E3A (maple)
Fond                : #FFFFFF / #FAFAF8
Texte               : #0A0A0A / #6B6B6B
Font titres         : Plus Jakarta Sans 600/700/800
Font corps          : Inter 400/500
Border radius       : 2xl (1rem) · 3xl (1.5rem) · 4xl (2rem)
```

**Règles absolues :**
- Cards : `rounded-3xl bg-white shadow-card border border-black/5`
- Bouton primaire : `bg-brand-300 text-brand-900 rounded-2xl shadow-brand`
- Transitions page : `AnimatePresence` + slide X + fade
- Skeleton sur tous les fetches
- Empty states illustrés sur chaque page

---

## 9. Gestion d'état (Zustand)

```javascript
{
  profile: null,           // données Neon + Clerk
  tasks: [],               // checklist locale
  langue: 'fr',            // FR/EN/AR/ES
  onboardingAnswers: {},   // effacé post-onboarding
  notifications: [],
}
```

Sync pattern : Optimistic update store → API call background → rollback si erreur.

---

## 10. Comportement offline / erreurs

| Situation | Comportement |
|-----------|-------------|
| Pas de connexion | Données Zustand persist affichées, badge "hors ligne" |
| Erreur API | Toast discret, pas de crash page |
| Token expiré | Clerk refresh automatique, sinon redirect `/welcome` |
| Premier lancement | Store vide → redirect `/welcome` |

---

## 11. Setup Neon + Clerk (instructions)

1. Projet Neon déjà créé ✓
2. Copier `DATABASE_URL` dans `.env.local` (jamais `VITE_` prefix)
3. Exécuter le SQL du schéma section 6 dans la console Neon
4. Créer compte Clerk sur clerk.com → créer application
5. Copier `VITE_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY` dans `.env.local`
6. Dans Vercel dashboard : ajouter les 3 variables d'env pour la prod

---

## 12. Tests & Validation MVP

- `npm run build` sans erreur
- Flux complet manuel : Welcome → Onboarding → Dashboard → Checklist → Quiz
- Lighthouse mobile ≥ 90
- Test PWA : installable sur iPhone/Android

---

*MaplePath — Construit avec ❤️ pour les nouveaux Canadiens*
