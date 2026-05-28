# MaplePath Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build MaplePath, a mobile-first PWA guiding new Canadian immigrants from airport arrival to citizenship, with 6-step personalized onboarding, smart checklists, citizenship calculator, 100-question quiz, and resource directory.

**Architecture:** React 18 + Vite SPA with Clerk auth, Neon PostgreSQL via Vercel serverless API routes, and Zustand for local state with localStorage persistence. Client generates tasks via taskEngine.js after onboarding, then batch-inserts to Neon. Optimistic UI updates.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, Framer Motion 11, @clerk/clerk-react, @clerk/backend, @neondatabase/serverless, Zustand 4, React Router v6, Lucide React, date-fns, react-i18next, react-confetti, vite-plugin-pwa

---

## Task 1: Init project + install dependencies

**Files:**
- Create: `D:\MesProjets\MaplePath\` (all project files land here)

- [ ] **Step 1: Scaffold Vite project**

```powershell
cd D:\MesProjets\MaplePath
npm create vite@latest . -- --template react
```
Choose "React" → "JavaScript". When prompted about non-empty directory, select "Ignore files and continue".

- [ ] **Step 2: Install runtime dependencies**

```powershell
npm install react-router-dom framer-motion @clerk/clerk-react @clerk/backend @neondatabase/serverless zustand lucide-react date-fns i18next react-i18next react-confetti
```

- [ ] **Step 3: Install dev dependencies**

```powershell
npm install -D tailwindcss postcss autoprefixer vite-plugin-pwa
npx tailwindcss init -p
```

- [ ] **Step 4: Verify**

```powershell
npm run dev
```
Expected: Vite dev server starts at `http://localhost:5173`

- [ ] **Step 5: Commit**

```powershell
git init
git add package.json package-lock.json vite.config.js
git commit -m "feat: init vite react project with dependencies"
```

---

## Task 2: Configure Tailwind + global styles

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/styles/globals.css`
- Modify: `index.html`

- [ ] **Step 1: Replace tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#FFFCE0',
          100: '#FFF5B0',
          200: '#FFE847',
          300: '#FFD600',
          400: '#F0C800',
          500: '#D4AE00',
          600: '#A88800',
          700: '#7A6200',
          800: '#4D3D00',
          900: '#1A1500',
        },
        maple: '#C41E3A',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'slide-up':    'slideUp 0.4s ease-out',
        'fade-in':     'fadeIn 0.3s ease-out',
        'scale-in':    'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-out',
      },
      keyframes: {
        slideUp:    { '0%': { transform: 'translateY(20px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        fadeIn:     { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        scaleIn:    { '0%': { transform: 'scale(0.95)', opacity: 0 }, '100%': { transform: 'scale(1)', opacity: 1 } },
        bounceSoft: { '0%': { transform: 'scale(0.9)' }, '60%': { transform: 'scale(1.05)' }, '100%': { transform: 'scale(1)' } },
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'brand':   '0 4px 14px rgba(255,214,0,0.35)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Create src/styles/globals.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', sans-serif;
    -webkit-tap-highlight-color: transparent;
  }
  body {
    @apply bg-[#FAFAF8] text-[#0A0A0A] antialiased;
    max-width: 430px;
    margin: 0 auto;
    min-height: 100dvh;
  }
}

@layer components {
  .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
}

/* Safe area for iPhone notch */
.safe-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
.safe-top    { padding-top: env(safe-area-inset-top, 0px); }

/* RTL support */
[dir="rtl"] { font-family: 'Inter', sans-serif; }
```

- [ ] **Step 3: Update index.html to import globals.css and set meta**

Replace content of `index.html`:
```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/icons/icon-192.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#FFD600" />
    <meta name="description" content="MaplePath — De l'aéroport à la citoyenneté canadienne" />
    <title>MaplePath</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Update src/main.jsx to import globals**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

- [ ] **Step 5: Verify**

Run `npm run dev` → open browser → body should have max-width 430px, background #FAFAF8.

- [ ] **Step 6: Commit**

```powershell
git add tailwind.config.js src/styles/globals.css index.html src/main.jsx
git commit -m "feat: configure tailwind design system and global styles"
```

---

## Task 3: Vite config + project skeleton + .env

**Files:**
- Modify: `vite.config.js`
- Create: `.gitignore`
- Create: `.env.local` (template)
- Create: all `src/` subdirectories

- [ ] **Step 1: Replace vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MaplePath',
        short_name: 'MaplePath',
        description: "Ton guide pour t'intégrer au Canada",
        theme_color: '#FFD600',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
```

- [ ] **Step 2: Create .gitignore**

```
node_modules
dist
.env.local
.env
.DS_Store
*.local
```

- [ ] **Step 3: Create .env.local template**

```bash
# Clerk — frontend key (safe to expose, starts with pk_)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_REPLACE_ME

# Clerk — secret key (NEVER prefix with VITE_, server-side only)
CLERK_SECRET_KEY=sk_test_REPLACE_ME

# Neon — full connection string (NEVER prefix with VITE_, server-side only)
DATABASE_URL=postgresql://neondb_owner:REPLACE_ME@ep-xxx.neon.tech/neondb?sslmode=require
```

- [ ] **Step 4: Create directory structure**

```powershell
$dirs = @(
  "src/components/ui",
  "src/components/layout",
  "src/components/onboarding/steps",
  "src/components/dashboard",
  "src/pages",
  "src/hooks",
  "src/lib",
  "src/data",
  "src/store",
  "src/assets",
  "public/icons",
  "api"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force $d | Out-Null }
echo "Directories created"
```

- [ ] **Step 5: Create placeholder maple-leaf SVG at src/assets/maple-leaf.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M50 5 L58 30 L85 20 L70 42 L95 50 L70 58 L75 85 L50 72 L25 85 L30 58 L5 50 L30 42 L15 20 L42 30 Z" fill="#FFD600"/>
</svg>
```

- [ ] **Step 6: Create placeholder PWA icons**

Create two 192×192 and 512×512 placeholder PNG files in `public/icons/`. For now, copy any PNG and rename it. The real icons should be yellow with a maple leaf. A placeholder is fine for development.

Note: Use any image editor or online tool (like favicon.io) to create `icon-192.png` and `icon-512.png` with a yellow background and maple leaf. Place them in `public/icons/`.

- [ ] **Step 7: Commit**

```powershell
git add vite.config.js .gitignore src/assets/maple-leaf.svg
git commit -m "feat: vite PWA config and project skeleton"
```

---

## Task 4: Clerk setup + App.jsx + routing

**Files:**
- Create: `src/App.jsx`
- Create: `src/components/layout/ProtectedRoute.jsx`

- [ ] **Step 1: Get Clerk keys**

1. Go to clerk.com → create account → create application named "MaplePath"
2. Choose "Email" as sign-in method
3. Copy `Publishable key` → paste into `.env.local` as `VITE_CLERK_PUBLISHABLE_KEY`
4. Go to API Keys → copy `Secret key` → paste into `.env.local` as `CLERK_SECRET_KEY`

- [ ] **Step 2: Create src/components/layout/ProtectedRoute.jsx**

```jsx
import { useAuth } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
      <div className="w-8 h-8 border-4 border-brand-300 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!isSignedIn) return <Navigate to="/" replace />
  return children
}
```

- [ ] **Step 3: Create src/App.jsx**

```jsx
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AppShell from './components/layout/AppShell'
import Welcome from './pages/Welcome'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Checklist from './pages/Checklist'
import Outils from './pages/Outils'
import CitoyenneteQuiz from './pages/CitoyenneteQuiz'
import Calculateur from './pages/Calculateur'
import Profil from './pages/Profil'

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={
            <ProtectedRoute><Onboarding /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><AppShell><Dashboard /></AppShell></ProtectedRoute>
          } />
          <Route path="/checklist" element={
            <ProtectedRoute><AppShell><Checklist /></AppShell></ProtectedRoute>
          } />
          <Route path="/outils" element={
            <ProtectedRoute><AppShell><Outils /></AppShell></ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute><AppShell><CitoyenneteQuiz /></AppShell></ProtectedRoute>
          } />
          <Route path="/calculateur" element={
            <ProtectedRoute><AppShell><Calculateur /></AppShell></ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute><AppShell><Profil /></AppShell></ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}
```

- [ ] **Step 4: Create stub pages so routing compiles (one pattern, repeat for all 8)**

Create each of these as a minimal stub — they'll be replaced in later tasks:

`src/pages/Welcome.jsx`:
```jsx
export default function Welcome() { return <div>Welcome</div> }
```

Repeat for: `Onboarding.jsx`, `Dashboard.jsx`, `Checklist.jsx`, `Outils.jsx`, `CitoyenneteQuiz.jsx`, `Calculateur.jsx`, `Profil.jsx`

Create `src/components/layout/AppShell.jsx`:
```jsx
export default function AppShell({ children }) { return <div>{children}</div> }
```

- [ ] **Step 5: Verify**

`npm run dev` → navigate to `http://localhost:5173` → no console errors. Navigating to `/dashboard` redirects to `/` (Clerk not signed in).

- [ ] **Step 6: Commit**

```powershell
git add src/App.jsx src/components/layout/ProtectedRoute.jsx src/pages/ src/components/layout/AppShell.jsx
git commit -m "feat: clerk auth provider and react router setup"
```

---

## Task 5: Neon database schema

**Files:** (SQL executed in Neon console, not a project file)

- [ ] **Step 1: Open Neon SQL editor**

Go to console.neon.tech → select your project → click "SQL Editor"

- [ ] **Step 2: Execute schema**

Paste and run this SQL:

```sql
CREATE TABLE profiles (
  id              TEXT PRIMARY KEY,
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
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  user_id       TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  titre         TEXT NOT NULL,
  description   TEXT,
  categorie     TEXT,
  phase         INTEGER DEFAULT 1,
  priorite      TEXT DEFAULT 'normal',
  jour_cible    INTEGER,
  lien_officiel TEXT,
  formulaire    TEXT,
  organisme     TEXT,
  delai_jours   INTEGER,
  complete      BOOLEAN DEFAULT FALSE,
  complete_at   TIMESTAMPTZ,
  notes         TEXT,
  skipped       BOOLEAN DEFAULT FALSE
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
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  user_id          TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  score            INTEGER,
  total_questions  INTEGER,
  pourcentage      NUMERIC(5,2),
  duree_secondes   INTEGER,
  questions_ratees JSONB DEFAULT '[]'
);

CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id    TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  titre      TEXT NOT NULL,
  message    TEXT,
  type       TEXT DEFAULT 'reminder',
  date_envoi TIMESTAMPTZ,
  lu         BOOLEAN DEFAULT FALSE,
  lien       TEXT
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

- [ ] **Step 3: Verify**

In Neon SQL Editor run: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`

Expected output: 6 rows — profiles, checklist_items, presence_days, quiz_sessions, notifications, documents

- [ ] **Step 4: Save DATABASE_URL**

From Neon dashboard → Connection Details → copy the connection string → paste into `.env.local` as `DATABASE_URL`.

---

## Task 6: Vercel API routes

**Files:**
- Create: `api/profile.js`
- Create: `api/tasks.js`
- Create: `api/quiz.js`
- Create: `api/presence.js`
- Create: `vercel.json`

- [ ] **Step 1: Create vercel.json**

```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

- [ ] **Step 2: Create api/_auth.js (shared auth helper)**

```javascript
import { createClerkClient } from '@clerk/backend'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export async function getUserId(req) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return null
    const payload = await clerk.verifyToken(token)
    return payload.sub
  } catch {
    return null
  }
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}
```

- [ ] **Step 3: Create api/profile.js**

```javascript
import { neon } from '@neondatabase/serverless'
import { getUserId, cors } from './_auth.js'

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const userId = await getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const sql = neon(process.env.DATABASE_URL)

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM profiles WHERE id = ${userId}`
    if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' })
    return res.status(200).json(rows[0])
  }

  if (req.method === 'POST') {
    const data = req.body
    const rows = await sql`
      INSERT INTO profiles (
        id, langue, type_immigrant, province, etape_parcours,
        situation_fam, priorites, prenom, onboarding_done, phase_actuelle
      ) VALUES (
        ${userId}, ${data.langue || 'fr'}, ${data.type_immigrant},
        ${data.province}, ${data.etape_parcours}, ${data.situation_fam},
        ${data.priorites || []}, ${data.prenom}, ${data.onboarding_done || false},
        ${data.phase_actuelle || 1}
      )
      ON CONFLICT (id) DO UPDATE SET
        langue = EXCLUDED.langue,
        type_immigrant = EXCLUDED.type_immigrant,
        province = EXCLUDED.province,
        etape_parcours = EXCLUDED.etape_parcours,
        situation_fam = EXCLUDED.situation_fam,
        priorites = EXCLUDED.priorites,
        prenom = EXCLUDED.prenom,
        onboarding_done = EXCLUDED.onboarding_done,
        phase_actuelle = EXCLUDED.phase_actuelle,
        updated_at = NOW()
      RETURNING *
    `
    return res.status(200).json(rows[0])
  }

  if (req.method === 'PATCH') {
    const data = req.body
    const rows = await sql`
      UPDATE profiles SET
        langue = COALESCE(${data.langue}, langue),
        prenom = COALESCE(${data.prenom}, prenom),
        province = COALESCE(${data.province}, province),
        priorites = COALESCE(${data.priorites}, priorites),
        date_arrivee = COALESCE(${data.date_arrivee}, date_arrivee),
        date_rp = COALESCE(${data.date_rp}, date_rp),
        score_quiz = COALESCE(${data.score_quiz}, score_quiz),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *
    `
    return res.status(200).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
```

- [ ] **Step 4: Create api/tasks.js**

```javascript
import { neon } from '@neondatabase/serverless'
import { getUserId, cors } from './_auth.js'

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const userId = await getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const sql = neon(process.env.DATABASE_URL)

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT * FROM checklist_items WHERE user_id = ${userId} ORDER BY jour_cible ASC, phase ASC
    `
    return res.status(200).json(rows)
  }

  if (req.method === 'POST') {
    const { tasks } = req.body
    if (!Array.isArray(tasks) || tasks.length === 0)
      return res.status(400).json({ error: 'tasks array required' })

    const values = tasks.map(t => ({
      user_id: userId,
      titre: t.titre,
      description: t.description || null,
      categorie: t.categorie || null,
      phase: t.phase || 1,
      priorite: t.priorite || 'normal',
      jour_cible: t.jour_cible || null,
      lien_officiel: t.lien_officiel || null,
      formulaire: t.formulaire || null,
      organisme: t.organisme || null,
    }))

    await sql`DELETE FROM checklist_items WHERE user_id = ${userId}`

    for (const v of values) {
      await sql`
        INSERT INTO checklist_items (user_id, titre, description, categorie, phase, priorite, jour_cible, lien_officiel, formulaire, organisme)
        VALUES (${v.user_id}, ${v.titre}, ${v.description}, ${v.categorie}, ${v.phase}, ${v.priorite}, ${v.jour_cible}, ${v.lien_officiel}, ${v.formulaire}, ${v.organisme})
      `
    }

    const rows = await sql`SELECT * FROM checklist_items WHERE user_id = ${userId} ORDER BY jour_cible`
    return res.status(201).json(rows)
  }

  if (req.method === 'PATCH') {
    const { id, complete, notes } = req.body
    const rows = await sql`
      UPDATE checklist_items
      SET complete = ${complete}, complete_at = ${complete ? new Date().toISOString() : null}, notes = COALESCE(${notes}, notes)
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `
    return res.status(200).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
```

- [ ] **Step 5: Create api/quiz.js**

```javascript
import { neon } from '@neondatabase/serverless'
import { getUserId, cors } from './_auth.js'

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const userId = await getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const sql = neon(process.env.DATABASE_URL)

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM quiz_sessions WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 20`
    return res.status(200).json(rows)
  }

  if (req.method === 'POST') {
    const { score, total_questions, pourcentage, duree_secondes, questions_ratees } = req.body
    const rows = await sql`
      INSERT INTO quiz_sessions (user_id, score, total_questions, pourcentage, duree_secondes, questions_ratees)
      VALUES (${userId}, ${score}, ${total_questions}, ${pourcentage}, ${duree_secondes}, ${JSON.stringify(questions_ratees || [])})
      RETURNING *
    `
    if (pourcentage >= 75) {
      await sql`UPDATE profiles SET score_quiz = ${score} WHERE id = ${userId}`
    }
    return res.status(201).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
```

- [ ] **Step 6: Create api/presence.js**

```javascript
import { neon } from '@neondatabase/serverless'
import { getUserId, cors } from './_auth.js'

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const userId = await getUserId(req)
  if (!userId) return res.status(401).json({ error: 'Unauthorized' })

  const sql = neon(process.env.DATABASE_URL)

  if (req.method === 'GET') {
    const rows = await sql`SELECT * FROM presence_days WHERE user_id = ${userId} ORDER BY date_debut DESC`
    return res.status(200).json(rows)
  }

  if (req.method === 'POST') {
    const { date_debut, date_fin, pays, type, note } = req.body
    const rows = await sql`
      INSERT INTO presence_days (user_id, date_debut, date_fin, pays, type, note)
      VALUES (${userId}, ${date_debut}, ${date_fin}, ${pays || 'CA'}, ${type || 'presence'}, ${note})
      RETURNING *
    `
    return res.status(201).json(rows[0])
  }

  if (req.method === 'DELETE') {
    const { id } = req.body
    await sql`DELETE FROM presence_days WHERE id = ${id} AND user_id = ${userId}`
    return res.status(200).json({ success: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
```

- [ ] **Step 7: Commit**

```powershell
git add api/ vercel.json
git commit -m "feat: vercel serverless API routes with Neon + Clerk auth"
```

---

## Task 7: Zustand store

**Files:**
- Create: `src/store/useAppStore.js`

- [ ] **Step 1: Create src/store/useAppStore.js**

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      profile: null,
      tasks: [],
      langue: 'fr',
      onboardingAnswers: {},
      notifications: [],

      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set(state => ({
        profile: state.profile ? { ...state.profile, ...updates } : updates
      })),
      clearProfile: () => set({ profile: null, tasks: [], onboardingAnswers: {} }),

      setTasks: (tasks) => set({ tasks }),
      toggleTask: (taskId) => set(state => ({
        tasks: state.tasks.map(t =>
          t.id === taskId
            ? { ...t, complete: !t.complete, complete_at: !t.complete ? new Date().toISOString() : null }
            : t
        )
      })),
      addTask: (task) => set(state => ({ tasks: [...state.tasks, task] })),

      setLangue: (langue) => set({ langue }),

      setAnswer: (key, value) => set(state => ({
        onboardingAnswers: { ...state.onboardingAnswers, [key]: value }
      })),
      clearOnboardingAnswers: () => set({ onboardingAnswers: {} }),

      addNotification: (n) => set(state => ({ notifications: [n, ...state.notifications] })),
      markRead: (id) => set(state => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, lu: true } : n)
      })),

      getTasksByPhase: (phase) => get().tasks.filter(t => t.phase === phase),
      getUrgentTasks: () => get().tasks.filter(t => t.priorite === 'urgent' && !t.complete),
      getCompletionRate: () => {
        const tasks = get().tasks
        if (!tasks.length) return 0
        return Math.round((tasks.filter(t => t.complete).length / tasks.length) * 100)
      },
    }),
    {
      name: 'maplepath-store',
      partialize: (state) => ({
        profile: state.profile,
        tasks: state.tasks,
        langue: state.langue,
      }),
    }
  )
)

export default useAppStore
```

- [ ] **Step 2: Verify**

Add to any stub page temporarily:
```jsx
import useAppStore from '../store/useAppStore'
// inside component:
const { langue } = useAppStore()
console.log('langue:', langue) // should log 'fr'
```
Remove after verification.

- [ ] **Step 3: Commit**

```powershell
git add src/store/useAppStore.js
git commit -m "feat: zustand global store with persist middleware"
```

---

## Task 8: Data files — tasks, provinces, resources

**Files:**
- Create: `src/data/provinces.js`
- Create: `src/data/ressources.js`
- Create: `src/data/tasks.js`

- [ ] **Step 1: Create src/data/provinces.js**

```javascript
export const provinces = [
  { code: 'ON', nom: 'Ontario', capitale: 'Toronto', sante: { nom: 'OHIP', delai: 90, lien: 'https://www.ontario.ca/fr/page/ohip' } },
  { code: 'QC', nom: 'Québec', capitale: 'Québec', sante: { nom: 'RAMQ', delai: 90, lien: 'https://www.ramq.gouv.qc.ca' }, special: 'Règles spéciales' },
  { code: 'BC', nom: 'Colombie-Britannique', capitale: 'Victoria', sante: { nom: 'MSP BC', delai: 90, lien: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp' } },
  { code: 'AB', nom: 'Alberta', capitale: 'Edmonton', sante: { nom: 'AHCIP', delai: 90, lien: 'https://www.alberta.ca/ahcip' } },
  { code: 'MB', nom: 'Manitoba', capitale: 'Winnipeg', sante: { nom: 'Manitoba Health', delai: 0, lien: 'https://www.gov.mb.ca/health/mhsip/' } },
  { code: 'SK', nom: 'Saskatchewan', capitale: 'Regina', sante: { nom: 'Saskatchewan Health', delai: 90, lien: 'https://www.ehealthsask.ca' } },
  { code: 'NS', nom: 'Nouvelle-Écosse', capitale: 'Halifax', sante: { nom: 'MSI', delai: 90, lien: 'https://novascotia.ca/dhw/msi/' } },
  { code: 'NB', nom: 'Nouveau-Brunswick', capitale: 'Fredericton', sante: { nom: 'NB Medicare', delai: 90, lien: 'https://www2.gnb.ca/content/gnb/fr/departments/health/MedicarePrescriptionDrugPlan.html' } },
  { code: 'PE', nom: 'Île-du-Prince-Édouard', capitale: 'Charlottetown', sante: { nom: 'PEI Medicare', delai: 90, lien: 'https://www.princeedwardisland.ca/en/topic/pei-health-card' } },
  { code: 'NL', nom: 'Terre-Neuve-et-Labrador', capitale: "St. John's", sante: { nom: 'MCP', delai: 90, lien: 'https://www.gov.nl.ca/hcs/mcp/' } },
  { code: 'YT', nom: 'Yukon', capitale: 'Whitehorse', sante: { nom: 'Yukon Health', delai: 0, lien: 'https://yukon.ca/en/health-and-wellness' } },
  { code: 'NT', nom: 'Territoires du Nord-Ouest', capitale: 'Yellowknife', sante: { nom: 'NWT Health', delai: 0, lien: 'https://www.hss.gov.nt.ca' } },
  { code: 'NU', nom: 'Nunavut', capitale: 'Iqaluit', sante: { nom: 'Nunavut Health', delai: 0, lien: 'https://www.gov.nu.ca/health' } },
  { code: 'XX', nom: 'Je ne sais pas encore', capitale: null, sante: null },
]

export const getProvince = (code) => provinces.find(p => p.code === code) || provinces[0]
```

- [ ] **Step 2: Create src/data/ressources.js**

```javascript
export const banques = [
  {
    nom: 'TD Canada Trust',
    programme: 'TD New to Canada',
    avantages: ['Compte gratuit 6 mois', 'Pas d\'historique de crédit requis', 'Carte de crédit sécurisée incluse'],
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
  { code: 'IMM 5476', nom: 'Recours aux services d\'un représentant', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'CIT 0002', nom: 'Demande de citoyenneté canadienne (adultes)', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'IMM 5409', nom: 'Consentement pour divulguer des renseignements', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
  { code: 'IMM 0008', nom: 'Demande de résidence permanente générique', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/formulaires-immigration.html' },
]

export const coursLangue = [
  { nom: 'LINC (Language Instruction for Newcomers)', gratuit: true, description: 'Cours d\'anglais gratuits financés par le fédéral pour les RP et réfugiés', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/apprentissage-langue.html' },
  { nom: 'CLIC (Cours de langue pour les immigrants au Canada)', gratuit: true, description: 'Cours de français gratuits pour immigrants adultes', lien: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/apprentissage-langue.html' },
  { nom: 'DELF (Diplôme d\'études en langue française)', gratuit: false, description: 'Certification officielle du français — reconnue pour la citoyenneté', lien: 'https://www.institutfrancais.com/delf-dalf' },
  { nom: 'TEFAQ', gratuit: false, description: 'Test d\'évaluation du français adapté au Québec', lien: 'https://www.lefrancaisdesaffaires.fr/tests-et-diplomes/tefaq/' },
]

export const aideGouvernementale = [
  { nom: 'Allocation canadienne pour enfants (ACE)', description: 'Versement mensuel non imposable pour les familles avec enfants de moins de 18 ans', lien: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/allocation-canadienne-enfants-apercu.html' },
  { nom: 'Prestation GST/TPS', description: 'Crédit remboursable pour revenus modestes', lien: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/credit-taxe-produits-services-taxe-vente-harmonisee-credit-tps-tvh.html' },
  { nom: 'Subvention pour logement (PALP)', description: 'Aide au loyer selon le revenu', lien: 'https://www.canada.ca/fr/societe-hypotheques-logement-canada.html' },
  { nom: 'Régime de pensions du Canada (RPC)', description: 'Cotisation automatique — pension à la retraite', lien: 'https://www.canada.ca/fr/emploi-developpement-social/programmes/pensions.html' },
]
```

- [ ] **Step 3: Create src/data/tasks.js (task category definitions)**

```javascript
export const taskCategories = {
  documents: { label: 'Documents', color: 'blue', icon: 'FileText' },
  sante:     { label: 'Santé', color: 'green', icon: 'Heart' },
  banque:    { label: 'Banque', color: 'yellow', icon: 'Banknote' },
  emploi:    { label: 'Emploi', color: 'purple', icon: 'Briefcase' },
  logement:  { label: 'Logement', color: 'orange', icon: 'Home' },
  education: { label: 'Éducation', color: 'pink', icon: 'GraduationCap' },
  transport: { label: 'Transport', color: 'gray', icon: 'Car' },
  langue:    { label: 'Langue', color: 'teal', icon: 'MessageSquare' },
  installation: { label: 'Installation', color: 'indigo', icon: 'MapPin' },
}

export const phases = [
  { id: 1, label: 'Arrivée',      icon: '✈️',  description: 'Premiers jours au Canada', days: '0-7 jours' },
  { id: 2, label: 'Documents',    icon: '📄',  description: 'Documents essentiels', days: '1-4 semaines' },
  { id: 3, label: 'Installation', icon: '🏠',  description: "S'installer durablement", days: '1-3 mois' },
  { id: 4, label: 'Intégration',  icon: '🤝',  description: 'Vie professionnelle et sociale', days: '3-12 mois' },
  { id: 5, label: 'Citoyenneté',  icon: '🍁',  description: 'Devenir Canadien', days: '3-5 ans' },
]
```

- [ ] **Step 4: Commit**

```powershell
git add src/data/
git commit -m "feat: provinces, resources and task category data"
```

---

## Task 9: Quiz data — 100 questions

**Files:**
- Create: `src/data/quiz.js`

- [ ] **Step 1: Create src/data/quiz.js**

```javascript
export const quizQuestions = [
  // ========== HISTOIRE (1-25) ==========
  { id: 1, categorie: 'histoire', question: 'Qui sont les peuples autochtones du Canada ?', options: ['Les Premières Nations, les Métis et les Inuits', 'Les Premières Nations seulement', 'Les Inuits et les Métis seulement', 'Les pionniers français et britanniques'], reponse: 0, explication: 'Les trois groupes autochtones reconnus sont les Premières Nations, les Métis et les Inuits.' },
  { id: 2, categorie: 'histoire', question: 'Qui était le premier Premier ministre du Canada ?', options: ['Sir Wilfrid Laurier', 'Sir John A. Macdonald', 'Louis Riel', 'Sir Robert Borden'], reponse: 1, explication: 'Sir John A. Macdonald fut le premier Premier ministre du Canada en 1867.' },
  { id: 3, categorie: 'histoire', question: 'En quelle année la Confédération canadienne a-t-elle eu lieu ?', options: ['1812', '1867', '1900', '1931'], reponse: 1, explication: "Le 1er juillet 1867, l'Acte de l'Amérique du Nord britannique a créé le Canada." },
  { id: 4, categorie: 'histoire', question: 'Qui a fondé la ville de Québec en 1608 ?', options: ['Jacques Cartier', 'Samuel de Champlain', 'John Cabot', 'Pierre Radisson'], reponse: 1, explication: 'Samuel de Champlain a fondé la ville de Québec en 1608.' },
  { id: 5, categorie: 'histoire', question: 'Quelle bataille a marqué la fin de la Nouvelle-France en 1759 ?', options: ['La bataille de Queenston Heights', 'La bataille de la Châteauguay', 'La bataille des Plaines d\'Abraham', 'La bataille de Lundy\'s Lane'], reponse: 2, explication: "La bataille des Plaines d'Abraham a mené à la capitulation de Québec et la fin de la Nouvelle-France." },
  { id: 6, categorie: 'histoire', question: 'Qui était Louis Riel ?', options: ['Un premier ministre du Québec', 'Un chef métis qui a mené deux rébellions', 'Un explorateur français', 'Un gouverneur général'], reponse: 1, explication: 'Louis Riel fut un chef métis qui dirigea les rébellions de 1869-70 et 1885 pour défendre les droits métis.' },
  { id: 7, categorie: 'histoire', question: 'En quelle année le Chemin de fer du Canadien Pacifique a-t-il été achevé ?', options: ['1867', '1885', '1900', '1920'], reponse: 1, explication: 'Le Chemin de fer du Canadien Pacifique fut achevé en 1885, reliant l\'est à l\'ouest du Canada.' },
  { id: 8, categorie: 'histoire', question: 'Quand les femmes ont-elles obtenu le droit de vote aux élections fédérales ?', options: ['1867', '1900', '1918', '1940'], reponse: 2, explication: 'En 1918, les femmes ont obtenu le droit de vote aux élections fédérales au Canada.' },
  { id: 9, categorie: 'histoire', question: 'Quelle était la signification de la bataille de Vimy Ridge (1917) ?', options: ["Elle a mis fin à la Première Guerre mondiale", "C'était une défaite canadienne importante", "C'était une victoire qui a renforcé l'identité nationale canadienne", 'Elle a déclenché la Confédération'], reponse: 2, explication: 'Vimy Ridge fut une victoire majeure qui renforça le sentiment d\'identité nationale canadienne.' },
  { id: 10, categorie: 'histoire', question: 'Quelle province a rejoint le Canada en dernier ?', options: ['Manitoba', 'Alberta', 'Colombie-Britannique', 'Terre-Neuve-et-Labrador'], reponse: 3, explication: 'Terre-Neuve-et-Labrador est entrée dans la Confédération en 1949, la dernière province à le faire.' },
  { id: 11, categorie: 'histoire', question: 'Qu\'est-ce que la Proclamation royale de 1763 ?', options: ["Un traité de paix avec les États-Unis", "Un document reconnaissant les droits des Autochtones sur leurs terres", 'La création du Parlement canadien', 'La fondation de Toronto'], reponse: 1, explication: "La Proclamation royale de 1763 reconnaissait les droits des Autochtones et établissait une structure de gouvernement." },
  { id: 12, categorie: 'histoire', question: 'Que s\'est-il passé en 1982 sur le plan constitutionnel ?', options: ['Le Canada a déclaré son indépendance', 'La Charte canadienne des droits et libertés a été adoptée', 'Le Québec a signé la Constitution', 'Le Canada a rejoint le Commonwealth'], reponse: 1, explication: 'En 1982, la Charte canadienne des droits et libertés a été enchâssée dans la Constitution.' },
  { id: 13, categorie: 'histoire', question: 'Qui était Nellie McClung ?', options: ['La première gouverneure générale', 'Une militante pour les droits des femmes', 'Une poète autochtone célèbre', 'Une exploratrice du Grand Nord'], reponse: 1, explication: 'Nellie McClung était une militante féministe qui a œuvré pour le droit de vote des femmes au Canada.' },
  { id: 14, categorie: 'histoire', question: "Qu'est-ce que l'affaire «Personne» de 1929 ?", options: ["L'interdiction d'immigration", "La décision reconnaissant les femmes comme des personnes légales", 'La création du Sénat', 'Un traité avec les Autochtones'], reponse: 1, explication: "En 1929, le Comité judiciaire du Conseil privé a statué que les femmes étaient des «personnes» légales pouvant siéger au Sénat." },
  { id: 15, categorie: 'histoire', question: 'En quelle année le drapeau canadien actuel a-t-il été adopté ?', options: ['1867', '1931', '1965', '1982'], reponse: 2, explication: 'Le drapeau canadien avec la feuille d\'érable a été adopté le 15 février 1965.' },
  { id: 16, categorie: 'histoire', question: 'Quel document a créé le Canada en 1867 ?', options: ["L'Acte d'Union", "L'Acte de l'Amérique du Nord britannique", 'La Constitution de 1982', 'Le Traité de Paris'], reponse: 1, explication: "L'Acte de l'Amérique du Nord britannique (1867) a uni les colonies britanniques pour créer le Canada." },
  { id: 17, categorie: 'histoire', question: 'Qui était le premier Premier ministre francophone du Canada ?', options: ['Pierre Elliott Trudeau', 'Sir Wilfrid Laurier', 'Jean Chrétien', 'Louis St-Laurent'], reponse: 1, explication: 'Sir Wilfrid Laurier, Premier ministre de 1896 à 1911, fut le premier Premier ministre francophone du Canada.' },
  { id: 18, categorie: 'histoire', question: 'Combien de soldats canadiens ont servi pendant la Première Guerre mondiale ?', options: ['100 000', '300 000', 'Plus de 600 000', '1 million'], reponse: 2, explication: 'Plus de 600 000 Canadiens ont servi pendant la Première Guerre mondiale, et environ 60 000 sont morts.' },
  { id: 19, categorie: 'histoire', question: 'En quelle année le Régime de pensions du Canada (RPC) a-t-il été créé ?', options: ['1945', '1955', '1965', '1975'], reponse: 2, explication: 'Le Régime de pensions du Canada a été instauré en 1965 sous le gouvernement Lester B. Pearson.' },
  { id: 20, categorie: 'histoire', question: 'Quelle est la signification du 11 novembre au Canada ?', options: ['Fête nationale du Canada', 'Jour du Souvenir — commémoration des vétérans', 'Anniversaire de la Confédération', 'Fête de la Reine'], reponse: 1, explication: 'Le 11 novembre est le Jour du Souvenir, où les Canadiens honorent les soldats morts au combat.' },
  { id: 21, categorie: 'histoire', question: 'Quel rôle la GRC (Police montée) a-t-elle joué historiquement dans l\'Ouest ?', options: ["Elle gardait la frontière américaine", "Elle maintenait l'ordre lors de la ruée vers l'Ouest", 'Elle construisait le chemin de fer', 'Elle gèrait les traités autochtones'], reponse: 1, explication: 'La GRC (anciennement NWMP) a maintenu l\'ordre lors de la colonisation de l\'Ouest canadien.' },
  { id: 22, categorie: 'histoire', question: 'En quelle année le Canada a-t-il rapatrié sa Constitution (indépendance totale du Royaume-Uni) ?', options: ['1867', '1931', '1965', '1982'], reponse: 3, explication: "En 1982, le Canada a rapatrié sa Constitution, obtenant sa pleine indépendance législative." },
  { id: 23, categorie: 'histoire', question: 'Qu\'est-ce que la Déclaration des droits de 1960 ?', options: ['La première loi fédérale protégeant les droits individuels', 'La création de la Charte', 'Un traité avec les États-Unis', 'La Loi sur les Autochtones'], reponse: 0, explication: 'La Déclaration canadienne des droits (1960) de John Diefenbaker fut le premier document fédéral protégeant les droits.' },
  { id: 24, categorie: 'histoire', question: 'Quel événement a mis fin à la Guerre de 1812 ?', options: ['La capitulation britannique', 'Le Traité de Gand', 'La bataille de Queenston', 'La destruction de Washington'], reponse: 1, explication: 'Le Traité de Gand (1814) a mis fin à la Guerre de 1812 entre les États-Unis et la Grande-Bretagne/Canada.' },
  { id: 25, categorie: 'histoire', question: 'Quel est le rôle du Canada dans le Commonwealth ?', options: ["Chef d'État du Commonwealth", 'Membre fondateur — association des nations liées à la Couronne britannique', 'Observateur sans vote', 'Président actuel'], reponse: 1, explication: 'Le Canada est un membre actif du Commonwealth des Nations, une association de pays liés à la Couronne britannique.' },

  // ========== GOUVERNEMENT (26-50) ==========
  { id: 26, categorie: 'gouvernement', question: 'Quelle est la forme de gouvernement du Canada ?', options: ['République présidentielle', 'Monarchie constitutionnelle avec démocratie parlementaire', 'Dictature constitutionnelle', 'Régime fédéral présidentiel'], reponse: 1, explication: 'Le Canada est une monarchie constitutionnelle avec une démocratie parlementaire fédérale.' },
  { id: 27, categorie: 'gouvernement', question: 'Qui est le chef d\'État du Canada ?', options: ['Le Premier ministre', 'Le gouverneur général', 'Le roi Charles III', 'Le Président du Sénat'], reponse: 2, explication: 'Le chef d\'État du Canada est le roi Charles III, représenté au Canada par le gouverneur général.' },
  { id: 28, categorie: 'gouvernement', question: 'Qui est le chef du gouvernement du Canada ?', options: ['Le gouverneur général', 'Le Président du Sénat', 'Le Premier ministre', 'Le Président de la Cour suprême'], reponse: 2, explication: 'Le Premier ministre est le chef du gouvernement et dirige le Cabinet fédéral.' },
  { id: 29, categorie: 'gouvernement', question: 'Quels sont les trois pouvoirs du gouvernement canadien ?', options: ['Exécutif, législatif, judiciaire', 'Fédéral, provincial, municipal', 'Sénat, Chambre, Cabinet', 'Roi, Premier ministre, Parlement'], reponse: 0, explication: 'Les trois pouvoirs sont : le pouvoir exécutif (gouvernement), législatif (Parlement) et judiciaire (tribunaux).' },
  { id: 30, categorie: 'gouvernement', question: 'De quoi est composé le Parlement du Canada ?', options: ['Le Premier ministre et les ministres', 'Le Sénat, la Chambre des communes et le Roi', 'La Chambre des communes seulement', 'Le Sénat et la Cour suprême'], reponse: 1, explication: 'Le Parlement du Canada est composé du Roi (représenté par le gouverneur général), du Sénat et de la Chambre des communes.' },
  { id: 31, categorie: 'gouvernement', question: 'Combien y a-t-il de sénateurs au Canada ?', options: ['100', '105', '308', '338'], reponse: 1, explication: 'Le Sénat canadien compte 105 sénateurs nommés par le gouverneur général.' },
  { id: 32, categorie: 'gouvernement', question: 'Comment les sénateurs sont-ils choisis ?', options: ['Élus par les provinces', 'Nommés par le gouverneur général sur recommandation du Premier ministre', 'Élus par la population', 'Choisis par la Cour suprême'], reponse: 1, explication: 'Les sénateurs sont nommés par le gouverneur général sur recommandation du Premier ministre.' },
  { id: 33, categorie: 'gouvernement', question: 'Combien y a-t-il de députés à la Chambre des communes ?', options: ['105', '308', '338', '400'], reponse: 2, explication: 'La Chambre des communes compte 338 députés élus par les Canadiens.' },
  { id: 34, categorie: 'gouvernement', question: 'Quel est le rôle du gouverneur général ?', options: ['Diriger l\'armée', 'Représenter le roi, donner la sanction royale aux lois', 'Élire les sénateurs', 'Présider la Cour suprême'], reponse: 1, explication: 'Le gouverneur général représente le roi, accorde la sanction royale aux lois et lit le discours du Trône.' },
  { id: 35, categorie: 'gouvernement', question: 'Qu\'est-ce qu\'un gouvernement majoritaire ?', options: ['Un gouvernement qui a l\'appui de tous les partis', 'Un parti qui détient plus de la moitié des sièges à la Chambre', 'Un gouvernement élu à l\'unanimité', 'Un gouvernement avec plus de 60% des votes'], reponse: 1, explication: 'Un gouvernement majoritaire détient plus de 169 des 338 sièges à la Chambre des communes.' },
  { id: 36, categorie: 'gouvernement', question: 'Quelle est la différence entre une province et un territoire ?', options: ["Il n'y a aucune différence", 'Les provinces ont des pouvoirs constitutionnels ; les territoires reçoivent leurs pouvoirs du fédéral', 'Les territoires sont plus grands', 'Les provinces ont moins d\'autonomie'], reponse: 1, explication: 'Les provinces ont des pouvoirs constitutionnels propres tandis que les territoires exercent des pouvoirs délégués par le gouvernement fédéral.' },
  { id: 37, categorie: 'gouvernement', question: 'Combien y a-t-il de provinces au Canada ?', options: ['8', '9', '10', '13'], reponse: 2, explication: 'Le Canada compte 10 provinces et 3 territoires (13 au total).' },
  { id: 38, categorie: 'gouvernement', question: 'Quel est le rôle du lieutenant-gouverneur ?', options: ['Gouverner la province', 'Représenter le roi dans chaque province', 'Présider le Sénat provincial', 'Diriger la police provinciale'], reponse: 1, explication: 'Le lieutenant-gouverneur représente le roi dans chaque province et a un rôle constitutionnel similaire au gouverneur général.' },
  { id: 39, categorie: 'gouvernement', question: 'Combien y a-t-il de juges à la Cour suprême du Canada ?', options: ['5', '7', '9', '12'], reponse: 2, explication: 'La Cour suprême du Canada compte 9 juges, dont le juge en chef du Canada.' },
  { id: 40, categorie: 'gouvernement', question: 'À quelle fréquence ont lieu les élections fédérales ?', options: ['Tous les 2 ans', 'Tous les 4 ans', 'Tous les 5 ans', 'Tous les 6 ans'], reponse: 1, explication: 'Les élections fédérales ont lieu normalement tous les 4 ans, mais peuvent survenir plus tôt si le gouvernement perd la confiance.' },
  { id: 41, categorie: 'gouvernement', question: 'Qu\'est-ce que l\'opposition officielle ?', options: ['Tous les partis en opposition', 'Le parti avec le plus de sièges après le parti au pouvoir', 'Les sénateurs indépendants', 'Les gouvernements provinciaux'], reponse: 1, explication: "L'opposition officielle est le parti d'opposition qui détient le plus de sièges à la Chambre des communes." },
  { id: 42, categorie: 'gouvernement', question: 'Quel système juridique utilise le Québec pour le droit civil (non criminel) ?', options: ['La common law', 'Le droit civil basé sur le Code civil', 'La loi napoléonienne', 'Le droit coutumier'], reponse: 1, explication: 'Le Québec est la seule province à utiliser le droit civil pour les affaires privées, basé sur le Code civil du Québec.' },
  { id: 43, categorie: 'gouvernement', question: 'Qu\'est-ce que le Cabinet fédéral ?', options: ['Le bureau du Premier ministre', 'Les ministres choisis par le Premier ministre pour diriger les ministères', 'Le Sénat en session', 'Le Comité permanent de la Chambre'], reponse: 1, explication: 'Le Cabinet est composé des ministres nommés par le Premier ministre pour diriger les différents ministères.' },
  { id: 44, categorie: 'gouvernement', question: 'Qu\'est-ce que la sanction royale ?', options: ["L'approbation d'une loi par le représentant du roi", "L'élection d'un nouveau gouvernement", "La signature du Premier ministre", "L'approbation du Sénat"], reponse: 0, explication: "La sanction royale est l'acte par lequel le gouverneur général approuve formellement un projet de loi et le transforme en loi." },
  { id: 45, categorie: 'gouvernement', question: 'Comment appelle-t-on le système électoral canadien ?', options: ['Représentation proportionnelle', 'Scrutin majoritaire uninominal à un tour', 'Vote préférentiel', 'Représentation mixte'], reponse: 1, explication: "Le Canada utilise le scrutin majoritaire uninominal à un tour : le candidat avec le plus de votes dans chaque circonscription est élu." },
  { id: 46, categorie: 'gouvernement', question: 'Qui convoque et dissout le Parlement ?', options: ['Le Premier ministre', 'Le gouverneur général sur conseil du Premier ministre', 'Le Président du Sénat', 'La Cour suprême'], reponse: 1, explication: 'Le gouverneur général convoque et dissout le Parlement sur le conseil du Premier ministre.' },
  { id: 47, categorie: 'gouvernement', question: 'Qu\'est-ce qu\'un vote de confiance ?', options: ['Un vote pour élire un nouveau chef de parti', "Un vote où le gouvernement doit prouver l'appui de la majorité", 'Un référendum national', 'Un vote au Sénat'], reponse: 1, explication: "Si le gouvernement perd un vote de confiance, il doit démissionner ou demander la dissolution du Parlement." },
  { id: 48, categorie: 'gouvernement', question: 'Quels sont les principaux partis politiques fédéraux au Canada ?', options: ['Libéral, Conservateur, NPD, Bloc Québécois, Vert', 'Libéral, Conservateur, Républicain, Démocrate', 'Libéral, NDP, Alliance, Réformiste', 'Conservateur, Vert, Indépendant'], reponse: 0, explication: 'Les principaux partis fédéraux sont le Parti libéral, le Parti conservateur, le NPD, le Bloc Québécois et le Parti vert.' },
  { id: 49, categorie: 'gouvernement', question: 'Quel palier de gouvernement est responsable de l\'éducation ?', options: ['Fédéral', 'Provincial', 'Municipal', 'Partagé fédéral-provincial'], reponse: 1, explication: "L'éducation est une compétence provinciale au Canada — chaque province gère son propre système scolaire." },
  { id: 50, categorie: 'gouvernement', question: 'Quel palier de gouvernement est responsable de la défense nationale ?', options: ['Provincial', 'Municipal', 'Fédéral', 'Partagé'], reponse: 2, explication: 'La défense nationale est une compétence exclusive du gouvernement fédéral.' },

  // ========== DROITS & VALEURS (51-70) ==========
  { id: 51, categorie: 'droits', question: 'Quelle est la loi fondamentale suprême du Canada ?', options: ['La Déclaration des droits (1960)', 'La Constitution canadienne et la Charte des droits', "L'Acte de l'Amérique du Nord britannique seulement", 'La Loi sur les langues officielles'], reponse: 1, explication: 'La Constitution canadienne (1982), qui inclut la Charte des droits et libertés, est la loi suprême du Canada.' },
  { id: 52, categorie: 'droits', question: 'Quelles sont les deux langues officielles du Canada ?', options: ['Anglais et français', 'Anglais et inuktitut', 'Français et espagnol', 'Anglais, français et autochtone'], reponse: 0, explication: "Le français et l'anglais sont les deux langues officielles du Canada depuis la Loi sur les langues officielles de 1969." },
  { id: 53, categorie: 'droits', question: 'Quel est l\'âge minimum pour voter aux élections fédérales ?', options: ['16 ans', '18 ans', '19 ans', '21 ans'], reponse: 1, explication: 'Tout citoyen canadien âgé de 18 ans et plus a le droit de voter aux élections.' },
  { id: 54, categorie: 'droits', question: 'Qu\'est-ce que la liberté de religion au Canada ?', options: ['Toutes les religions doivent être reconnues par l\'État', 'Le droit de pratiquer toute religion ou de n\'en avoir aucune', 'Seules les religions chrétiennes sont protégées', 'L\'État choisit la religion officielle'], reponse: 1, explication: 'La Charte garantit la liberté de conscience et de religion — chacun peut pratiquer ou ne pratiquer aucune religion.' },
  { id: 55, categorie: 'droits', question: 'Peut-on être arrêté sans raison valable au Canada ?', options: ['Oui, en temps de guerre', 'Non — la Charte protège contre la détention arbitraire', 'Oui, si la police le juge nécessaire', 'Cela dépend de la province'], reponse: 1, explication: "L'article 9 de la Charte stipule que chacun a droit à la protection contre la détention ou l'emprisonnement arbitraires." },
  { id: 56, categorie: 'droits', question: 'Qu\'est-ce que la politique de multiculturalisme du Canada ?', options: ["Une loi obligeant l'apprentissage de plusieurs langues", 'Une politique adoptée en 1971 pour valoriser la diversité culturelle', "L'intégration obligatoire des immigrants", 'Une politique réservée aux Autochtones'], reponse: 1, explication: "La politique de multiculturalisme (1971) reconnaît la valeur de la diversité culturelle et encourage l'inclusion." },
  { id: 57, categorie: 'droits', question: 'Qu\'est-ce que la présomption d\'innocence ?', options: ['Toute personne est coupable jusqu\'à preuve du contraire', 'Toute personne est innocente jusqu\'à preuve du contraire', 'L\'accusé doit prouver son innocence', 'La police décide de la culpabilité'], reponse: 1, explication: "La présomption d'innocence est un principe fondamental : l'accusé est innocent jusqu'à ce que sa culpabilité soit prouvée." },
  { id: 58, categorie: 'droits', question: 'Quels sont les devoirs des citoyens canadiens ?', options: ['Voter, obéir aux lois, payer ses impôts, servir sur jury si requis', 'Voter seulement', "Payer ses impôts et parler l'anglais", 'Obéir aux lois provinciales seulement'], reponse: 0, explication: 'Les citoyens canadiens ont plusieurs devoirs : voter, respecter les lois, payer leurs impôts et servir sur jury si appelés.' },
  { id: 59, categorie: 'droits', question: 'Quelle discrimination est interdite par la Charte ?', options: ['Discrimination basée sur l\'âge seulement', 'Discrimination basée sur race, sexe, religion, âge, handicap, etc.', 'Discrimination basée sur la langue seulement', 'Aucune — la Charte ne couvre pas la discrimination'], reponse: 1, explication: "L'article 15 de la Charte interdit la discrimination fondée sur la race, l'origine nationale ou ethnique, la couleur, la religion, le sexe, l'âge ou les déficiences mentales ou physiques." },
  { id: 60, categorie: 'droits', question: 'Qu\'est-ce que la liberté d\'expression au Canada ?', options: ['Le droit de dire tout ce qu\'on veut sans conséquences', 'Le droit de s\'exprimer librement sous réserve de certaines limites raisonnables', 'Le droit de critiquer le gouvernement seulement', 'Un droit absolu sans aucune limite'], reponse: 1, explication: 'La Charte protège la liberté d\'expression, mais cette liberté est soumise à des « limites raisonnables » (ex : interdiction des discours haineux).' },
  { id: 61, categorie: 'droits', question: 'Qui peut faire une demande de citoyenneté canadienne ?', options: ['Toute personne résidant au Canada', 'Les résidents permanents ayant vécu au Canada 3 ans sur 5', 'Toute personne née dans un pays du Commonwealth', 'Les travailleurs temporaires après 1 an'], reponse: 1, explication: 'Pour demander la citoyenneté, il faut être résident permanent et avoir été physiquement présent au Canada au moins 1 095 jours (3 ans) sur les 5 dernières années.' },
  { id: 62, categorie: 'droits', question: 'Qu\'est-ce que le droit à un avocat lors d\'une arrestation ?', options: ["Un droit réservé aux riches", "Le droit d'être informé du droit de consulter un avocat sans délai", "Un droit seulement en cas de crime grave", "Un privilège accordé par le juge"], reponse: 1, explication: "La Charte garantit à toute personne arrêtée le droit d'être informée des raisons de son arrestation et de consulter un avocat." },
  { id: 63, categorie: 'droits', question: 'Qu\'est-ce que la réconciliation avec les peuples autochtones ?', options: ['Un programme d\'aide financière', 'Un processus de reconnaissance des préjudices historiques et de réparation', 'Une loi de 1982', 'Un traité avec les États-Unis'], reponse: 1, explication: 'La réconciliation vise à reconnaître et réparer les préjudices historiques causés aux peuples autochtones, notamment par les pensionnats.' },
  { id: 64, categorie: 'droits', question: 'Qu\'est-ce que la primauté du droit au Canada ?', options: ["Que le roi est au-dessus des lois", "Que tout le monde, y compris le gouvernement, est soumis à la loi", "Que la loi s'applique seulement aux citoyens", "Que les lois provinciales ont priorité"], reponse: 1, explication: "La primauté du droit signifie que tout le monde — y compris le gouvernement et la police — est soumis à la loi." },
  { id: 65, categorie: 'droits', question: 'La Charte s\'applique-t-elle aux actions des entreprises privées ?', options: ['Oui, à toutes les entités', 'Non — elle s\'applique principalement aux gouvernements et à leurs actions', 'Seulement si l\'entreprise emploie plus de 50 personnes', 'Oui, mais seulement en Ontario'], reponse: 1, explication: "La Charte s'applique principalement aux actions des gouvernements (fédéral, provinciaux, territoriaux), pas aux entités privées." },
  { id: 66, categorie: 'droits', question: 'Qu\'est-ce que la liberté de réunion pacifique au Canada ?', options: ["Le droit de se regrouper à condition d'avoir un permis", "Le droit de se réunir pacifiquement et de former des associations", "Un droit réservé aux partis politiques", "Le droit de grève seulement"], reponse: 1, explication: "La Charte garantit la liberté de réunion pacifique et la liberté d'association." },
  { id: 67, categorie: 'droits', question: 'L\'éducation est-elle gratuite au Canada ?', options: ['Non, elle coûte cher partout', 'Oui, de la maternelle à la 12e année dans les écoles publiques', 'Seulement pour les citoyens', 'Seulement jusqu\'à la 8e année'], reponse: 1, explication: "L'éducation publique est gratuite de la maternelle à la 12e année pour tous les enfants résidant au Canada." },
  { id: 68, categorie: 'droits', question: 'Qu\'est-ce que le droit à la vie, à la liberté et à la sécurité de la personne ?', options: ['Un droit réservé aux citoyens', "Un droit garanti par l'article 7 de la Charte à toute personne au Canada", 'Un droit seulement lors d\'une arrestation', 'Un droit constitutionnel américain adopté par le Canada'], reponse: 1, explication: "L'article 7 de la Charte garantit à chacun le droit à la vie, à la liberté et à la sécurité de sa personne." },
  { id: 69, categorie: 'droits', question: 'Qu\'est-ce que la clause nonobstant (article 33 de la Charte) ?', options: ['Une règle sur les exceptions fiscales', "Une disposition permettant à un gouvernement de suspendre temporairement certains droits", 'Le droit de veto du Sénat', 'Une exemption pour les Autochtones'], reponse: 1, explication: "La clause nonobstant (article 33) permet à un gouvernement fédéral ou provincial de déroger temporairement à certains droits de la Charte." },
  { id: 70, categorie: 'droits', question: 'Qu\'est-ce que le droit à l\'égalité prévu par la Charte ?', options: ['Tous les Canadiens doivent avoir le même salaire', "Tous les individus sont égaux devant la loi, sans discrimination", 'Seuls les citoyens ont des droits égaux', 'L\'égalité s\'applique seulement au travail'], reponse: 1, explication: "L'article 15 garantit l'égalité de tous devant la loi, indépendamment de la race, l'origine, le sexe, la religion, l'âge ou le handicap." },

  // ========== SYMBOLES (71-85) ==========
  { id: 71, categorie: 'symboles', question: 'Que représente la feuille d\'érable sur le drapeau canadien ?', options: ['La forêt canadienne', "Un symbole de l'identité nationale et de l'unité", 'L\'industrie forestière', 'La couleur de l\'automne québécois'], reponse: 1, explication: "La feuille d'érable est le symbole national du Canada depuis des siècles, représentant l'identité et l'unité nationales." },
  { id: 72, categorie: 'symboles', question: 'Quelle est la devise officielle du Canada ?', options: ['"In God We Trust"', '"True North Strong and Free"', '"A Mari usque ad Mare" (D\'un océan à l\'autre)', '"Unity in Diversity"'], reponse: 2, explication: 'La devise officielle du Canada est "A Mari usque ad Mare", ce qui signifie "D\'un océan à l\'autre".' },
  { id: 73, categorie: 'symboles', question: 'Quel est l\'hymne national du Canada ?', options: ['God Save the King', 'Ô Canada', 'The Maple Leaf Forever', 'Canada We Stand On Guard'], reponse: 1, explication: "«Ô Canada» est l'hymne national officiel du Canada depuis 1980." },
  { id: 74, categorie: 'symboles', question: 'Quel est l\'animal emblématique du Canada ?', options: ['L\'orignal', 'Le castor', 'Le saumon', 'Le huard'], reponse: 1, explication: "Le castor est l'emblème national officiel du Canada depuis 1975, symbolisant le travail et la persévérance." },
  { id: 75, categorie: 'symboles', question: 'Quel est l\'oiseau national du Canada ?', options: ['L\'aigle chauve', 'Le geai bleu', 'Le plongeon huard', 'L\'oie du Canada'], reponse: 2, explication: "Le plongeon huard (common loon) est l'oiseau national du Canada — on peut l'entendre sur la pièce d'un dollar." },
  { id: 76, categorie: 'symboles', question: 'Quel est le sport national d\'été du Canada ?', options: ['Le baseball', 'La crosse (lacrosse)', 'Le soccer', 'Le football canadien'], reponse: 1, explication: "La crosse est le sport national d'été du Canada, pratiqué par les peuples autochtones depuis des siècles." },
  { id: 77, categorie: 'symboles', question: 'Quel est le sport national d\'hiver du Canada ?', options: ['Le curling', 'Le patinage artistique', 'Le hockey sur glace', 'Le ski alpin'], reponse: 2, explication: "Le hockey sur glace est le sport national d'hiver du Canada et une partie importante de l'identité culturelle canadienne." },
  { id: 78, categorie: 'symboles', question: 'Que représente la Flamme du centenaire devant le Parlement ?', options: ['Les 100 ans du drapeau', 'Le centenaire de la Confédération (1967)', 'La Guerre de 1812', 'La mémoire des soldats'], reponse: 1, explication: 'La Flamme du centenaire a été allumée le 1er janvier 1967 pour commémorer le 100e anniversaire de la Confédération.' },
  { id: 79, categorie: 'symboles', question: 'Quelle est la couleur du drapeau national du Canada ?', options: ['Bleu et blanc', 'Rouge et blanc', 'Rouge, blanc et bleu', 'Vert et blanc'], reponse: 1, explication: "Le drapeau canadien est rouge et blanc, avec une feuille d'érable rouge à 11 pointes au centre." },
  { id: 80, categorie: 'symboles', question: 'Qu\'est-ce que la Tour de la Paix à Ottawa ?', options: ['Un monument aux soldats de la Guerre de 1812', "L'édifice central du Parlement et symbole de la démocratie canadienne", 'Un musée national', 'Le bureau du Premier ministre'], reponse: 1, explication: "La Tour de la Paix est le bâtiment central de la Colline du Parlement à Ottawa, symbole de la démocratie canadienne." },
  { id: 81, categorie: 'symboles', question: 'Que trouve-t-on sur une pièce de 25 cents canadienne (le «quarter») ?', options: ['Un orignal', 'Le caribou', 'La feuille d\'érable', 'Un huard'], reponse: 1, explication: "La pièce de 25 cents canadienne arborait traditionnellement un caribou (renne), symbole du pays." },
  { id: 82, categorie: 'symboles', question: 'Que représente la Police montée du Canada (GRC) pour les Canadiens ?', options: ['Un service de police ordinaire', "Un symbole de l'autorité et de la loi canadienne mondialement reconnu", 'Une force militaire', 'Un programme de police provinciale'], reponse: 1, explication: "La GRC (Gendarmerie royale du Canada) est un symbole national et international de l'identité canadienne." },
  { id: 83, categorie: 'symboles', question: 'Quel est l\'arbre national du Canada ?', options: ['Le sapin de Douglas', "L'érable à sucre", 'Le pin blanc', 'L\'épinette bleue'], reponse: 1, explication: "L'érable à sucre est l'arbre emblématique du Canada — ses feuilles deviennent rouge vif en automne." },
  { id: 84, categorie: 'symboles', question: 'Quel billet de banque canadien est rose/rouge ?', options: ['10 $', '20 $', '50 $', '100 $'], reponse: 2, explication: 'Le billet de 50 $ canadien est de couleur rose/rose-rouge.' },
  { id: 85, categorie: 'symboles', question: 'Où se trouvent les édifices du Parlement du Canada ?', options: ['Toronto', 'Montréal', 'Ottawa', 'Kingston'], reponse: 2, explication: 'Les édifices du Parlement du Canada sont situés sur la Colline du Parlement à Ottawa, en Ontario.' },

  // ========== GÉOGRAPHIE (86-100) ==========
  { id: 86, categorie: 'geographie', question: 'Combien de provinces et territoires y a-t-il au Canada ?', options: ['10 provinces et 2 territoires', '10 provinces et 3 territoires', '12 provinces et 1 territoire', '9 provinces et 3 territoires'], reponse: 1, explication: 'Le Canada compte 10 provinces et 3 territoires (Yukon, Territoires du Nord-Ouest, Nunavut).' },
  { id: 87, categorie: 'geographie', question: 'Quels sont les trois territoires du Canada ?', options: ['Alberta, Manitoba, Saskatchewan', 'Yukon, Territoires du Nord-Ouest, Nunavut', 'Yukon, Nunavut, Labrador', 'Nord-Ouest, Nord-Est, Yukon'], reponse: 1, explication: 'Les trois territoires canadiens sont le Yukon, les Territoires du Nord-Ouest et le Nunavut (créé en 1999).' },
  { id: 88, categorie: 'geographie', question: 'Quelle est la capitale du Canada ?', options: ['Toronto', 'Montréal', 'Vancouver', 'Ottawa'], reponse: 3, explication: "Ottawa, en Ontario, est la capitale nationale du Canada." },
  { id: 89, categorie: 'geographie', question: 'Quelle est la plus grande ville du Canada ?', options: ['Montréal', 'Ottawa', 'Toronto', 'Vancouver'], reponse: 2, explication: 'Toronto est la plus grande ville du Canada avec une population métropolitaine de plus de 6 millions de personnes.' },
  { id: 90, categorie: 'geographie', question: 'Quel océan borde le Canada à l\'ouest ?', options: ["L'océan Atlantique", "L'océan Arctique", "L'océan Pacifique", "L'océan Indien"], reponse: 2, explication: "L'océan Pacifique borde la côte ouest du Canada (Colombie-Britannique)." },
  { id: 91, categorie: 'geographie', question: 'Quel fleuve traverse la ville de Québec ?', options: ['Le fleuve Ottawa', 'Le Saint-Laurent', 'La rivière des Outaouais', 'Le Saguenay'], reponse: 1, explication: "Le fleuve Saint-Laurent coule devant la ville de Québec — il est crucial pour l'histoire et l'économie du Canada." },
  { id: 92, categorie: 'geographie', question: 'Quelle est la capitale de la Colombie-Britannique ?', options: ['Vancouver', 'Victoria', 'Kelowna', 'Surrey'], reponse: 1, explication: "Victoria est la capitale de la Colombie-Britannique, bien que Vancouver soit la plus grande ville de la province." },
  { id: 93, categorie: 'geographie', question: 'Quelle est la capitale du Québec ?', options: ['Montréal', 'Québec', 'Sherbrooke', 'Laval'], reponse: 1, explication: 'Québec (ville) est la capitale de la province du Québec, non Montréal.' },
  { id: 94, categorie: 'geographie', question: 'Quel est le point le plus élevé du Canada ?', options: ['Mont Royal', 'Mont Tremblant', 'Mont Logan', 'Mont Whistler'], reponse: 2, explication: 'Le mont Logan, dans le Yukon, est le plus haut sommet du Canada à 5 959 mètres — le deuxième plus haut en Amérique du Nord.' },
  { id: 95, categorie: 'geographie', question: 'Quelle province est connue pour ses prairies et son agriculture céréalière ?', options: ['Ontario', 'Colombie-Britannique', 'Saskatchewan', 'Nouveau-Brunswick'], reponse: 2, explication: "La Saskatchewan est surnommée «le grenier du Canada» — c'est une province de prairies majoritairement agricole." },
  { id: 96, categorie: 'geographie', question: 'Où se trouvent les chutes Niagara ?', options: ['À la frontière Ontario-Québec', "À la frontière Ontario-État de New York", 'En Colombie-Britannique', 'Au Manitoba'], reponse: 1, explication: "Les chutes Niagara sont situées à la frontière entre l'Ontario (Canada) et l'État de New York (États-Unis)." },
  { id: 97, categorie: 'geographie', question: 'Quelle ville canadienne est connue pour son Stampede annuel (rodéo) ?', options: ['Edmonton', 'Calgary', 'Regina', 'Saskatoon'], reponse: 1, explication: 'Calgary accueille chaque année le Stampede de Calgary, l\'un des plus grands événements de rodéo au monde.' },
  { id: 98, categorie: 'geographie', question: 'Quelle province est la plus peuplée du Canada ?', options: ['Québec', 'Colombie-Britannique', 'Alberta', 'Ontario'], reponse: 3, explication: "L'Ontario est la province la plus peuplée du Canada avec environ 40% de la population nationale." },
  { id: 99, categorie: 'geographie', question: 'Quel est le plus grand lac entièrement situé au Canada ?', options: ['Lac Supérieur', 'Lac Ontario', 'Grand Lac de l\'Ours', 'Lac Winnipeg'], reponse: 2, explication: "Le Grand Lac de l'Ours (Great Bear Lake) dans les Territoires du Nord-Ouest est le plus grand lac entièrement au Canada." },
  { id: 100, categorie: 'geographie', question: 'Avec quel pays le Canada partage-t-il la plus longue frontière terrestre du monde ?', options: ['La Russie', 'Le Groenland', 'Les États-Unis', 'Le Mexique'], reponse: 2, explication: "La frontière Canada–États-Unis est la plus longue frontière terrestre internationale au monde, mesurant environ 8 891 km." },
]

export const categoriesQuiz = {
  histoire:     { label: 'Histoire',       count: 25, color: 'amber' },
  gouvernement: { label: 'Gouvernement',   count: 25, color: 'blue' },
  droits:       { label: 'Droits & valeurs', count: 20, color: 'green' },
  symboles:     { label: 'Symboles',       count: 15, color: 'red' },
  geographie:   { label: 'Géographie',     count: 15, color: 'purple' },
}

export function getRandomQuestions(n = 10, categorie = null) {
  const pool = categorie
    ? quizQuestions.filter(q => q.categorie === categorie)
    : quizQuestions
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/data/quiz.js
git commit -m "feat: 100 citizenship quiz questions based on Discover Canada"
```

---

## Task 10: Core libs — api.js, taskEngine.js, i18n.js

**Files:**
- Create: `src/lib/api.js`
- Create: `src/lib/taskEngine.js`
- Create: `src/lib/i18n.js`

- [ ] **Step 1: Create src/lib/api.js**

```javascript
import { useAuth } from '@clerk/clerk-react'

async function apiFetch(path, options = {}, token) {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

export function createApiClient(getToken) {
  return {
    getProfile: () => apiFetch('/api/profile', {}, getToken()),
    saveProfile: (data) => apiFetch('/api/profile', { method: 'POST', body: data }, getToken()),
    patchProfile: (data) => apiFetch('/api/profile', { method: 'PATCH', body: data }, getToken()),

    getTasks: () => apiFetch('/api/tasks', {}, getToken()),
    saveTasks: (tasks) => apiFetch('/api/tasks', { method: 'POST', body: { tasks } }, getToken()),
    patchTask: (id, data) => apiFetch('/api/tasks', { method: 'PATCH', body: { id, ...data } }, getToken()),

    saveQuizSession: (data) => apiFetch('/api/quiz', { method: 'POST', body: data }, getToken()),
    getQuizSessions: () => apiFetch('/api/quiz', {}, getToken()),

    getPresence: () => apiFetch('/api/presence', {}, getToken()),
    addPresence: (data) => apiFetch('/api/presence', { method: 'POST', body: data }, getToken()),
    deletePresence: (id) => apiFetch('/api/presence', { method: 'DELETE', body: { id } }, getToken()),
  }
}

export function useApi() {
  const { getToken } = useAuth()
  const token = getToken()
  return createApiClient(() => token)
}
```

- [ ] **Step 2: Create src/lib/taskEngine.js**

```javascript
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
    { titre: 'Obtenir ton NAS (Numéro d\'Assurance Sociale)', categorie: 'documents', priorite: 'urgent', jour_cible: 2, phase: 1, description: 'Rends-toi dans un bureau Service Canada avec ton COPR/visa de RP et passeport. Gratuit et immédiat.', formulaire: 'SIN Application', organisme: 'Service Canada', lien_officiel: 'https://www.canada.ca/fr/emploi-developpement-social/services/numero-assurance-sociale.html' },
    { titre: 'Ouvrir un compte bancaire', categorie: 'banque', priorite: 'urgent', jour_cible: 2, phase: 1, description: 'TD, RBC et Scotiabank ont des programmes Newcomers sans historique de crédit requis.', lien_officiel: 'https://www.td.com/ca/fr/particuliers/solutions/nouveau-au-canada' },
    { titre: `S'inscrire à ${santeInfo.nom} (assurance santé)`, categorie: 'sante', priorite: 'urgent', jour_cible: 5, phase: 1, description: 'Délai de carence de 90 jours dans certaines provinces. Inscris-toi dès l\'arrivée.', lien_officiel: santeInfo.lien },
    { titre: 'Trouver un hébergement temporaire', categorie: 'logement', priorite: 'urgent', jour_cible: 0, phase: 1, description: 'Auberge de jeunesse, AIRBNB, ou résidence universitaire pour les premières semaines.' },
  )

  // ---- PHASE 2 : DOCUMENTS (J+3 à J+30) ----
  if (type_immigrant !== 'etudiant') {
    tasks.push({
      titre: 'Demander ta carte de Résident Permanent',
      categorie: 'documents', priorite: 'urgent', jour_cible: 3, phase: 2,
      description: 'À faire dans les 180 jours suivant l\'obtention du RP. Tu as besoin du formulaire IMM 5444.',
      formulaire: 'IMM 5444', organisme: 'IRCC',
      lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveau-immigrant/carte-rp/apply-first-card.html',
    })
  }

  tasks.push(
    { titre: 'Obtenir un permis de conduire provincial', categorie: 'transport', priorite: 'normal', jour_cible: 14, phase: 2, description: 'Apporte ton permis étranger + traduction si nécessaire. Certains pays ont des ententes de réciprocité.', organisme: 'Ministère des transports provincial' },
    { titre: 'Faire sa déclaration de revenus (première année)', categorie: 'documents', priorite: 'normal', jour_cible: 90, phase: 2, description: 'Même avec peu ou pas de revenus — obligatoire pour accéder aux prestations (ACE, GST/TPS). Date limite : 30 avril.', organisme: 'Agence du revenu du Canada', lien_officiel: 'https://www.canada.ca/fr/agence-revenu.html' },
    { titre: 'Demander l\'Allocation canadienne pour enfants (ACE)', categorie: 'documents', priorite: priorites.includes('sante') || situation_fam !== 'seul' ? 'urgent' : 'normal', jour_cible: 14, phase: 2, description: 'Versement mensuel non imposable si tu as des enfants de moins de 18 ans. Formulaire RC66.', formulaire: 'RC66', organisme: 'ARC', lien_officiel: 'https://www.canada.ca/fr/agence-revenu/services/prestations-enfants-familles/allocation-canadienne-enfants-apercu.html' },
  )

  // ---- Québec spécifique ----
  if (province === 'QC') {
    tasks.push(
      { titre: 'S\'inscrire aux cours de francisation (gratuits)', categorie: 'langue', priorite: 'urgent', jour_cible: 14, phase: 2, description: 'Cours de français gratuits financés par le MIDI. Obligatoire si niveau insuffisant.', organisme: 'MIDI Québec', lien_officiel: 'https://www.immigration-quebec.gouv.qc.ca/fr/langue-francaise/apprendre-francais/index.html' },
      { titre: 'Faire reconnaître tes diplômes au Québec', categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Contacte l\'ordre professionnel de ton domaine ou le MIDI pour la reconnaissance.', organisme: 'MIDI / Ordre professionnel concerné' },
    )
  }

  // ---- PHASE 3 : INSTALLATION ----
  tasks.push(
    { titre: 'Trouver un logement permanent', categorie: 'logement', priorite: priorites.includes('logement') ? 'urgent' : 'normal', jour_cible: 14, phase: 3, description: 'Kijiji, Facebook Marketplace, Zumper. Budget : 1 200-2 500$/mois selon la ville.' },
    { titre: 'S\'inscrire auprès des services locaux d\'établissement', categorie: 'installation', priorite: 'normal', jour_cible: 7, phase: 3, description: 'COSTI, ACCES Employment, Centre Francophone Toronto ou équivalent dans ta ville. Services gratuits.', lien_officiel: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etablissement-nouveaux-immigrants/trouver-aide-immigration.html' },
    { titre: 'Souscrire une assurance habitation', categorie: 'logement', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Obligatoire dans la plupart des locations. Intact, Desjardins, TD Assurance.' },
  )

  // ---- Famille avec enfants ----
  if (situation_fam === 'famille_scolaires' || situation_fam === 'parent_seul') {
    tasks.push(
      { titre: 'Inscrire les enfants à l\'école', categorie: 'education', priorite: 'urgent', jour_cible: 7, phase: 1, description: 'Contacter le conseil scolaire local. Gratuit de la maternelle à la 12e. Apporter les bulletins scolaires et vaccins.', organisme: 'Conseil scolaire local' },
      { titre: 'Obtenir les vaccins requis par l\'école', categorie: 'sante', priorite: 'urgent', jour_cible: 14, phase: 2, description: 'Chaque province a sa liste de vaccins obligatoires pour l\'école. Vérifier auprès de la santé publique.' },
    )
  }
  if (situation_fam === 'famille_jeunes') {
    tasks.push({ titre: 'Trouver une place en garderie subventionnée', categorie: 'education', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Listes d\'attente longues. S\'inscrire dès l\'arrivée sur le portail provincial.' })
  }

  // ---- Emploi ----
  if (priorites.includes('emploi') || type_immigrant === 'rp_economique' || type_immigrant === 'travailleur') {
    tasks.push(
      { titre: 'Adapter ton CV au format canadien', categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, description: 'Pas de photo, pas d\'âge, pas d\'état civil. Max 2 pages. Accent sur les résultats quantifiables.' },
      { titre: 'Créer un profil LinkedIn canadien', categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, lien_officiel: 'https://linkedin.com' },
      { titre: 'Faire évaluer tes diplômes par WES ou IQAS', categorie: 'emploi', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Évaluation des diplômes étrangers nécessaire pour la plupart des emplois professionnels.', organisme: 'WES Canada', lien_officiel: 'https://www.wes.org/ca' },
      { titre: 'Rejoindre un programme d\'aide à l\'emploi pour immigrants', categorie: 'emploi', priorite: 'normal', jour_cible: 14, phase: 3, description: 'Mentorat, formation, accès au réseau. ACCES Employment, Immigrant Services Society, etc.', lien_officiel: 'https://accesemployment.ca' },
    )
  }

  // ---- Santé ----
  if (priorites.includes('sante')) {
    tasks.push({ titre: 'Trouver un médecin de famille', categorie: 'sante', priorite: 'normal', jour_cible: 30, phase: 3, description: 'Utilise Health811 (Ontario) ou l\'outil provincial de ta province pour trouver un médecin acceptant de nouveaux patients.', lien_officiel: 'https://health811.ontario.ca' })
  }

  // ---- PHASE 4 : INTÉGRATION ----
  tasks.push(
    { titre: 'Apprendre les lois et règlements locaux', categorie: 'installation', priorite: 'normal', jour_cible: 30, phase: 4, description: 'Lire le guide d\'accueil de ta ville/province. Règles de bruit, poubelles, stationnement.' },
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
```

- [ ] **Step 3: Create src/lib/i18n.js**

```javascript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      welcome: { title: 'De l\'aéroport à la citoyenneté', cta: 'Commencer — 2 min', signin: 'J\'ai déjà un compte' },
      nav: { home: 'Accueil', checklist: 'Checklist', tools: 'Outils', quiz: 'Quiz', profile: 'Profil' },
      onboarding: { step: 'Étape {{current}} sur {{total}}', next: 'Suivant', back: 'Retour', generating: 'Génération de ton parcours...', done: 'Ton parcours est prêt !' },
      dashboard: { hello: 'Bonjour', urgent: 'Urgent aujourd\'hui', week: 'Cette semaine', month: 'Ce mois', progress: '{{pct}}% complété' },
      quiz: { start: 'Commencer', practice: 'Mode pratique', exam: 'Mode examen', result: 'Résultat', score: 'Score : {{score}}/{{total}}', pass: 'Réussi !', fail: 'Continuez à étudier' },
      common: { complete: 'Terminé', skip: 'Ignorer', save: 'Sauvegarder', cancel: 'Annuler', loading: 'Chargement...', error: 'Une erreur est survenue', retry: 'Réessayer' },
    }
  },
  en: {
    translation: {
      welcome: { title: 'From the airport to citizenship', cta: 'Get Started — 2 min', signin: 'I already have an account' },
      nav: { home: 'Home', checklist: 'Checklist', tools: 'Tools', quiz: 'Quiz', profile: 'Profile' },
      onboarding: { step: 'Step {{current}} of {{total}}', next: 'Next', back: 'Back', generating: 'Generating your journey...', done: 'Your journey is ready!' },
      dashboard: { hello: 'Hello', urgent: 'Urgent today', week: 'This week', month: 'This month', progress: '{{pct}}% complete' },
      quiz: { start: 'Start', practice: 'Practice Mode', exam: 'Exam Mode', result: 'Result', score: 'Score: {{score}}/{{total}}', pass: 'Passed!', fail: 'Keep studying' },
      common: { complete: 'Done', skip: 'Skip', save: 'Save', cancel: 'Cancel', loading: 'Loading...', error: 'An error occurred', retry: 'Retry' },
    }
  },
  ar: {
    translation: {
      welcome: { title: 'من المطار إلى الجنسية', cta: 'ابدأ الآن - دقيقتان', signin: 'لدي حساب بالفعل' },
      nav: { home: 'الرئيسية', checklist: 'قائمة', tools: 'أدوات', quiz: 'اختبار', profile: 'الملف' },
      onboarding: { step: 'الخطوة {{current}} من {{total}}', next: 'التالي', back: 'رجوع', generating: 'جاري إنشاء مسارك...', done: 'مسارك جاهز!' },
      dashboard: { hello: 'مرحباً', urgent: 'عاجل اليوم', week: 'هذا الأسبوع', month: 'هذا الشهر', progress: 'اكتمل {{pct}}%' },
      quiz: { start: 'ابدأ', practice: 'وضع التدريب', exam: 'وضع الامتحان', result: 'النتيجة', score: 'النتيجة: {{score}}/{{total}}', pass: 'نجحت!', fail: 'واصل الدراسة' },
      common: { complete: 'تم', skip: 'تخطي', save: 'حفظ', cancel: 'إلغاء', loading: 'جار التحميل...', error: 'حدث خطأ', retry: 'حاول مجدداً' },
    }
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
})

export default i18n
```

- [ ] **Step 4: Import i18n in main.jsx**

Add `import './lib/i18n'` to `src/main.jsx` before the App import.

- [ ] **Step 5: Commit**

```powershell
git add src/lib/
git commit -m "feat: api client, task engine, and i18n setup"
```

---

## Task 11: UI atoms

**Files:**
- Create: `src/components/ui/Button.jsx`
- Create: `src/components/ui/Card.jsx`
- Create: `src/components/ui/Badge.jsx`
- Create: `src/components/ui/ProgressBar.jsx`
- Create: `src/components/ui/CheckItem.jsx`
- Create: `src/components/ui/Modal.jsx`

- [ ] **Step 1: Create src/components/ui/Button.jsx**

```jsx
import { motion } from 'framer-motion'

const variants = {
  primary:   'bg-brand-300 text-brand-900 shadow-brand hover:bg-brand-200',
  secondary: 'border border-black/10 text-gray-800 bg-white hover:bg-gray-50',
  ghost:     'text-gray-600 hover:bg-gray-100',
  danger:    'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100',
}

export default function Button({ children, variant = 'primary', className = '', disabled, onClick, type = 'button', fullWidth = false }) {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        font-display font-semibold rounded-2xl px-6 py-4 text-base
        transition-all duration-200 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create src/components/ui/Card.jsx**

```jsx
import { motion } from 'framer-motion'

export default function Card({ children, className = '', onClick, hover = true }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover && onClick ? { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' } : {}}
      className={`
        rounded-3xl bg-white shadow-card border border-black/5 p-4
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Create src/components/ui/Badge.jsx**

```jsx
const variants = {
  urgent:   'bg-red-50 text-red-700 border-red-200',
  warning:  'bg-amber-50 text-amber-700 border-amber-200',
  success:  'bg-green-50 text-green-700 border-green-200',
  info:     'bg-blue-50 text-blue-700 border-blue-200',
  brand:    'bg-brand-50 text-brand-700 border-brand-200',
  gray:     'bg-gray-100 text-gray-600 border-gray-200',
  special:  'bg-maple/10 text-maple border-maple/30',
}

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 4: Create src/components/ui/ProgressBar.jsx**

```jsx
import { motion } from 'framer-motion'

export default function ProgressBar({ value = 0, max = 100, color = 'brand', showLabel = false, className = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const colors = { brand: 'bg-brand-300', green: 'bg-green-500', red: 'bg-red-500', blue: 'bg-blue-500' }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{value} / {max}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`h-full rounded-full ${colors[color] || colors.brand}`}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create src/components/ui/CheckItem.jsx**

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CheckItem({ checked, onChange, label, description, disabled }) {
  return (
    <motion.button
      onClick={() => !disabled && onChange(!checked)}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left flex items-start gap-3 p-3 rounded-2xl border-2 transition-all duration-200
        ${checked ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
        ${checked ? 'bg-brand-300 border-brand-300' : 'border-gray-300'}`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Check size={14} strokeWidth={3} className="text-brand-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div>
        <p className={`text-sm font-medium ${checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
    </motion.button>
  )
}
```

- [ ] **Step 6: Create src/components/ui/Modal.jsx**

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-4xl p-6 max-w-[430px] mx-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">{title}</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 7: Commit**

```powershell
git add src/components/ui/
git commit -m "feat: reusable UI atoms — Button, Card, Badge, ProgressBar, CheckItem, Modal"
```

---

## Task 12: Layout components

**Files:**
- Create: `src/components/layout/AppShell.jsx` (replace stub)
- Create: `src/components/layout/BottomNav.jsx`
- Create: `src/components/layout/TopBar.jsx`

- [ ] **Step 1: Create src/components/layout/BottomNav.jsx**

```jsx
import { NavLink, useLocation } from 'react-router-dom'
import { Home, CheckSquare, Wrench, HelpCircle, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const navItems = [
  { to: '/dashboard',  icon: Home,        key: 'home' },
  { to: '/checklist',  icon: CheckSquare, key: 'checklist' },
  { to: '/outils',     icon: Wrench,      key: 'tools' },
  { to: '/quiz',       icon: HelpCircle,  key: 'quiz' },
  { to: '/profil',     icon: User,        key: 'profile' },
]

export default function BottomNav() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto bg-white/90 backdrop-blur-sm border-t border-black/5 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, key }) => {
          const active = pathname === to
          return (
            <NavLink key={to} to={to} className="flex flex-col items-center gap-1 py-1 px-3 relative">
              <div className={`p-2 rounded-2xl transition-colors ${active ? 'bg-brand-50' : ''}`}>
                <Icon size={22} className={active ? 'text-brand-300' : 'text-gray-400'} strokeWidth={active ? 2.5 : 1.5} />
              </div>
              <span className={`text-[10px] font-medium ${active ? 'text-brand-600' : 'text-gray-400'}`}>
                {t(`nav.${key}`)}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-300 rounded-full"
                />
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create src/components/layout/TopBar.jsx**

```jsx
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

export default function TopBar({ title, showBack = false, showNotifications = true }) {
  const navigate = useNavigate()
  const { notifications } = useAppStore()
  const unread = notifications.filter(n => !n.lu).length

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-black/5 px-4 py-3 flex items-center justify-between safe-top">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={22} className="text-gray-700" />
          </button>
        )}
        {title && <h1 className="font-display font-bold text-lg text-gray-900">{title}</h1>}
        {!title && (
          <span className="font-display font-bold text-xl text-gray-900">
            Maple<span className="text-brand-300">Path</span>
          </span>
        )}
      </div>
      {showNotifications && (
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-maple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Replace src/components/layout/AppShell.jsx**

```jsx
import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import TopBar from './TopBar'
import BottomNav from './BottomNav'
import useAppStore from '../../store/useAppStore'
import { useApi } from '../../lib/api'

export default function AppShell({ children }) {
  const { userId, getToken, isLoaded } = useAuth()
  const { profile, setProfile, setTasks } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoaded || !userId) return
    if (profile) return

    async function hydrate() {
      try {
        const token = await getToken()
        const [prof, tasks] = await Promise.all([
          fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
          fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        ])
        if (prof.error) { navigate('/onboarding'); return }
        if (!prof.onboarding_done) { navigate('/onboarding'); return }
        setProfile(prof)
        setTasks(tasks)
      } catch {
        navigate('/onboarding')
      }
    }
    hydrate()
  }, [isLoaded, userId])

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <TopBar />
      <main className="pb-24 pt-2">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```powershell
git add src/components/layout/
git commit -m "feat: AppShell, BottomNav and TopBar layout components"
```

---

## Task 13: Onboarding components

**Files:**
- Create: `src/components/onboarding/SondageProgress.jsx`
- Create: `src/components/onboarding/OnboardingFlow.jsx`
- Create: `src/components/onboarding/steps/StepLangue.jsx`
- Create: `src/components/onboarding/steps/StepTypeImmigrant.jsx`
- Create: `src/components/onboarding/steps/StepProvince.jsx`
- Create: `src/components/onboarding/steps/StepEtape.jsx`
- Create: `src/components/onboarding/steps/StepFamille.jsx`
- Create: `src/components/onboarding/steps/StepPriorites.jsx`

- [ ] **Step 1: Create SondageProgress.jsx**

```jsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function SondageProgress({ current, total }) {
  const { t } = useTranslation()
  const pct = ((current) / total) * 100

  return (
    <div className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          {t('onboarding.step', { current, total })}
        </span>
        <span className="text-xs font-medium text-brand-600">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-brand-300 rounded-full"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create steps/StepLangue.jsx**

```jsx
import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const langues = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'hi', flag: '🇮🇳', label: 'हिन्दी' },
  { code: 'other', flag: '🌍', label: 'Autre' },
]

export default function StepLangue({ onNext }) {
  const { onboardingAnswers, setAnswer, setLangue } = useAppStore()
  const selected = onboardingAnswers.langue

  function handleSelect(code) {
    setAnswer('langue', code)
    if (['fr', 'en', 'ar', 'es'].includes(code)) setLangue(code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Quelle langue préfères-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">What language do you prefer?</p>
      <div className="grid grid-cols-2 gap-3">
        {langues.map((l, i) => (
          <motion.button
            key={l.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(l.code)}
            className={`flex items-center gap-3 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === l.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{l.flag}</span>
            <span className="font-display font-semibold text-sm text-gray-900">{l.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create steps/StepTypeImmigrant.jsx**

```jsx
import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const types = [
  { code: 'rp_economique', icon: '🏆', label: 'Résident Permanent — Économique', desc: 'Express Entry, PNP, etc.' },
  { code: 'refugie_gov', icon: '🤝', label: 'Réfugié (parrainé gouvernement)', desc: 'Programme de réfugiés pris en charge' },
  { code: 'refugie_prive', icon: '🤝', label: 'Réfugié (parrainage privé)', desc: 'Parrainé par un groupe de la communauté' },
  { code: 'conjoint', icon: '❤️', label: 'Conjoint(e) / Famille parrainée', desc: 'Parrainage familial' },
  { code: 'etudiant', icon: '🎓', label: 'Étudiant(e) étranger(e)', desc: 'Permis d\'études' },
  { code: 'travailleur', icon: '💼', label: 'Travailleur temporaire', desc: 'Permis de travail' },
  { code: 'demandeur_asile', icon: '📋', label: 'Demandeur(se) d\'asile', desc: 'Demande de refuge au Canada' },
  { code: 'pre_arrivee', icon: '✈️', label: 'Pas encore arrivé(e)', desc: 'Je prépare mon départ' },
]

export default function StepTypeImmigrant({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.type_immigrant

  function handleSelect(code) {
    setAnswer('type_immigrant', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Comment es-tu arrivé(e) au Canada ?</h2>
      <p className="text-gray-500 text-sm mb-6">Ton statut détermine tes démarches prioritaires.</p>
      <div className="flex flex-col gap-3">
        {types.map((t, i) => (
          <motion.button
            key={t.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(t.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === t.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{t.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{t.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create steps/StepProvince.jsx**

```jsx
import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'
import Badge from '../../ui/Badge'

const provinces = [
  { code: 'ON', label: 'Ontario' },
  { code: 'QC', label: 'Québec', special: true },
  { code: 'BC', label: 'C.-B.' },
  { code: 'AB', label: 'Alberta' },
  { code: 'MB', label: 'Manitoba' },
  { code: 'SK', label: 'Saskatchewan' },
  { code: 'NS', label: 'N.-Écosse' },
  { code: 'NB', label: 'N.-Brunswick' },
  { code: 'PE', label: 'Î.-P.-É.' },
  { code: 'NL', label: 'T.-N.-L.' },
  { code: 'YT', label: 'Yukon' },
  { code: 'NT', label: 'T.N.-O.' },
  { code: 'NU', label: 'Nunavut' },
  { code: 'XX', label: 'Je ne sais pas' },
]

export default function StepProvince({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.province

  function handleSelect(code) {
    setAnswer('province', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Dans quelle province t'installes-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">Les ressources et démarches varient par province.</p>
      <div className="grid grid-cols-3 gap-2">
        {provinces.map((p, i) => (
          <motion.button
            key={p.code}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(p.code)}
            className={`relative p-3 rounded-2xl border-2 text-center transition-all
              ${selected === p.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="font-display font-semibold text-sm text-gray-900 block">{p.label}</span>
            {p.special && <Badge variant="special" className="mt-1 text-[10px]">Spécial</Badge>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create steps/StepEtape.jsx**

```jsx
import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const etapes = [
  { code: 'pre_arrivee',  icon: '✈️',  label: "Je n'ai pas encore atterri",  desc: 'Préparation depuis l\'étranger' },
  { code: 'semaine_1',    icon: '📍',  label: 'Je viens d\'arriver',          desc: '0 à 7 jours' },
  { code: 'mois_1',       icon: '📅',  label: 'Quelques semaines',             desc: '1 à 4 semaines' },
  { code: 'mois_3',       icon: '🗓️',  label: 'Quelques mois',                desc: '1 à 6 mois' },
  { code: 'an_1',         icon: '📆',  label: 'Plus d\'un an',                desc: 'Plus de 6 mois' },
  { code: 'citoyennete',  icon: '🏛️',  label: 'Je prépare ma citoyenneté',   desc: 'Résidence permanente établie' },
]

export default function StepEtape({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.etape_parcours

  function handleSelect(code) {
    setAnswer('etape_parcours', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">À quelle étape de ton parcours es-tu ?</h2>
      <p className="text-gray-500 text-sm mb-6">Nous adapterons tes tâches prioritaires.</p>
      <div className="flex flex-col gap-3">
        {etapes.map((e, i) => (
          <motion.button
            key={e.code}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(e.code)}
            className={`flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all
              ${selected === e.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-2xl">{e.icon}</span>
            <div>
              <p className="font-display font-semibold text-sm text-gray-900">{e.label}</p>
              <p className="text-xs text-gray-500">{e.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create steps/StepFamille.jsx**

```jsx
import { motion } from 'framer-motion'
import useAppStore from '../../../store/useAppStore'

const situations = [
  { code: 'seul',             icon: '👤', label: 'Seul(e)' },
  { code: 'couple',           icon: '👫', label: 'En couple (sans enfants)' },
  { code: 'famille_jeunes',   icon: '👨‍👩‍👶', label: 'Famille — enfants 0–5 ans' },
  { code: 'famille_scolaires',icon: '👨‍👩‍👧‍👦', label: 'Famille — enfants 6–17 ans' },
  { code: 'parent_seul',      icon: '👩‍👦', label: 'Parent seul' },
]

export default function StepFamille({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.situation_fam

  function handleSelect(code) {
    setAnswer('situation_fam', code)
    setTimeout(onNext, 200)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Quelle est ta situation familiale ?</h2>
      <p className="text-gray-500 text-sm mb-6">Pour personnaliser tes tâches liées à la famille.</p>
      <div className="flex flex-col gap-3">
        {situations.map((s, i) => (
          <motion.button
            key={s.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(s.code)}
            className={`flex items-center gap-4 p-5 rounded-3xl border-2 text-left transition-all
              ${selected === s.code ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className="text-3xl">{s.icon}</span>
            <span className="font-display font-semibold text-base text-gray-900">{s.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create steps/StepPriorites.jsx**

```jsx
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import useAppStore from '../../../store/useAppStore'
import Button from '../../ui/Button'

const options = [
  { code: 'logement',   icon: '🏠', label: 'Logement' },
  { code: 'emploi',     icon: '💼', label: 'Emploi' },
  { code: 'sante',      icon: '🏥', label: 'Santé' },
  { code: 'education',  icon: '🏫', label: 'Éducation' },
  { code: 'banque',     icon: '🏦', label: 'Banque' },
  { code: 'transport',  icon: '🚗', label: 'Transport' },
  { code: 'langue',     icon: '🗣️', label: 'Apprendre la langue' },
  { code: 'droits',     icon: '⚖️', label: 'Mes droits' },
  { code: 'citoyennete',icon: '🍁', label: 'Citoyenneté' },
  { code: 'reseau',     icon: '👥', label: 'Réseau social' },
]

export default function StepPriorites({ onNext }) {
  const { onboardingAnswers, setAnswer } = useAppStore()
  const selected = onboardingAnswers.priorites || []

  function toggle(code) {
    const next = selected.includes(code) ? selected.filter(c => c !== code) : [...selected, code]
    setAnswer('priorites', next)
  }

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">Qu'est-ce qui est urgent pour toi ?</h2>
      <p className="text-gray-500 text-sm mb-6">Choisis tout ce qui s'applique.</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {options.map((o, i) => {
          const isSelected = selected.includes(o.code)
          return (
            <motion.button
              key={o.code}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(o.code)}
              className={`relative flex items-center gap-2 p-3 rounded-2xl border-2 text-left transition-all
                ${isSelected ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <span className="text-xl">{o.icon}</span>
              <span className="font-display font-medium text-sm text-gray-900 flex-1">{o.label}</span>
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-brand-300 flex items-center justify-center flex-shrink-0">
                  <Check size={12} strokeWidth={3} className="text-brand-900" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
      <Button fullWidth onClick={onNext} disabled={selected.length === 0}>
        Voir mon parcours →
      </Button>
    </div>
  )
}
```

- [ ] **Step 8: Create OnboardingFlow.jsx**

```jsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import SondageProgress from './SondageProgress'
import StepLangue from './steps/StepLangue'
import StepTypeImmigrant from './steps/StepTypeImmigrant'
import StepProvince from './steps/StepProvince'
import StepEtape from './steps/StepEtape'
import StepFamille from './steps/StepFamille'
import StepPriorites from './steps/StepPriorites'

const STEPS = [StepLangue, StepTypeImmigrant, StepProvince, StepEtape, StepFamille, StepPriorites]
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
```

- [ ] **Step 9: Commit**

```powershell
git add src/components/onboarding/
git commit -m "feat: 6-step onboarding flow with Framer Motion transitions"
```

---

## Task 14: Dashboard components

**Files:**
- Create: `src/components/dashboard/HeroCard.jsx`
- Create: `src/components/dashboard/PhaseRoadmap.jsx`
- Create: `src/components/dashboard/TaskList.jsx`
- Create: `src/components/dashboard/ToolsGrid.jsx`

- [ ] **Step 1: Create src/components/dashboard/HeroCard.jsx**

```jsx
import { motion } from 'framer-motion'
import { MapPin, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../ui/ProgressBar'
import useAppStore from '../../store/useAppStore'
import { phases } from '../../data/tasks'

export default function HeroCard() {
  const { profile, getUrgentTasks, getCompletionRate } = useAppStore()
  const navigate = useNavigate()
  const urgent = getUrgentTasks()
  const pct = getCompletionRate()
  const phase = phases.find(p => p.id === (profile?.phase_actuelle || 1))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4 rounded-4xl bg-brand-300 p-6 shadow-brand"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-body text-brand-800 text-sm font-medium">Bonjour 👋</p>
          <h2 className="font-display font-bold text-2xl text-brand-900 mt-0.5">
            {profile?.prenom || 'Bienvenue'}
          </h2>
        </div>
        {profile?.province && (
          <div className="flex items-center gap-1 bg-brand-400/30 rounded-full px-3 py-1">
            <MapPin size={12} className="text-brand-800" />
            <span className="text-xs font-medium text-brand-900">{profile.province}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-brand-800">{phase?.label} · {pct}% complété</span>
        </div>
        <ProgressBar value={pct} max={100} color="brand" className="[&>div>div]:bg-brand-700" />
      </div>

      {urgent.length > 0 && (
        <button
          onClick={() => navigate('/checklist')}
          className="w-full flex items-center justify-between bg-brand-400/40 rounded-2xl px-4 py-3"
        >
          <span className="text-sm font-display font-semibold text-brand-900">
            {urgent.length} tâche{urgent.length > 1 ? 's' : ''} urgente{urgent.length > 1 ? 's' : ''} aujourd'hui
          </span>
          <ChevronRight size={16} className="text-brand-800" />
        </button>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 2: Create src/components/dashboard/PhaseRoadmap.jsx**

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Modal from '../ui/Modal'
import useAppStore from '../../store/useAppStore'
import { phases } from '../../data/tasks'

export default function PhaseRoadmap() {
  const { profile, getTasksByPhase } = useAppStore()
  const currentPhase = profile?.phase_actuelle || 1
  const [modalPhase, setModalPhase] = useState(null)

  return (
    <>
      <div className="mt-5 px-4">
        <h3 className="font-display font-bold text-base text-gray-900 mb-3">Ton parcours</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {phases.map((phase, i) => {
            const done = phase.id < currentPhase
            const active = phase.id === currentPhase
            return (
              <motion.button
                key={phase.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setModalPhase(phase)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all
                  ${done ? 'border-green-200 bg-green-50 text-green-700' : ''}
                  ${active ? 'border-brand-300 bg-brand-300 text-brand-900' : ''}
                  ${!done && !active ? 'border-gray-100 bg-white text-gray-400' : ''}`}
              >
                {done ? <Check size={14} strokeWidth={3} /> : <span className="text-sm">{phase.icon}</span>}
                <span className="font-display font-semibold text-sm whitespace-nowrap">{phase.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Modal open={!!modalPhase} onClose={() => setModalPhase(null)} title={modalPhase ? `${modalPhase.icon} ${modalPhase.label}` : ''}>
        {modalPhase && (
          <div>
            <p className="text-sm text-gray-500 mb-4">{modalPhase.description} · {modalPhase.days}</p>
            <div className="flex flex-col gap-2">
              {getTasksByPhase(modalPhase.id).slice(0, 8).map(t => (
                <div key={t.id} className={`flex items-center gap-3 p-3 rounded-2xl ${t.complete ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.complete ? 'bg-green-500' : t.priorite === 'urgent' ? 'bg-red-400' : 'bg-gray-300'}`} />
                  <span className={`text-sm ${t.complete ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t.titre}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
```

- [ ] **Step 3: Create src/components/dashboard/TaskList.jsx**

```jsx
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import useAppStore from '../../store/useAppStore'
import { useAuth } from '@clerk/clerk-react'

export default function TaskList() {
  const { tasks, toggleTask, profile } = useAppStore()
  const { getToken } = useAuth()

  async function handleToggle(taskId) {
    toggleTask(taskId)
    try {
      const token = await getToken()
      const task = tasks.find(t => t.id === taskId)
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: taskId, complete: !task.complete }),
      })
    } catch { toggleTask(taskId) }
  }

  const urgent = tasks.filter(t => t.priorite === 'urgent' && !t.complete)
  const week   = tasks.filter(t => t.priorite === 'normal' && !t.complete && (t.jour_cible || 0) <= 7)
  const month  = tasks.filter(t => !t.complete && (t.jour_cible || 0) > 7).slice(0, 5)

  function TaskItem({ task, index }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        className="flex items-start gap-3 p-4 bg-white rounded-3xl border border-black/5 shadow-card"
      >
        <button
          onClick={() => handleToggle(task.id)}
          className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 transition-all
            ${task.complete ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-brand-300'}`}
        />
        <div className="flex-1 min-w-0">
          <p className={`font-display font-semibold text-sm ${task.complete ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.titre}
          </p>
          {task.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>}
          <div className="flex items-center gap-2 mt-2">
            {task.priorite === 'urgent' && <Badge variant="urgent">Urgent</Badge>}
            {task.jour_cible != null && <Badge variant="gray">J+{task.jour_cible}</Badge>}
            {task.organisme && <Badge variant="info">{task.organisme}</Badge>}
          </div>
        </div>
        {task.lien_officiel && (
          <a href={task.lien_officiel} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100">
            <ExternalLink size={14} className="text-gray-400" />
          </a>
        )}
      </motion.div>
    )
  }

  function Section({ title, items, badge }) {
    if (!items.length) return null
    return (
      <div className="mt-5 px-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="font-display font-bold text-base text-gray-900">{title}</h3>
          {badge}
        </div>
        <div className="flex flex-col gap-2">
          {items.map((t, i) => <TaskItem key={t.id} task={t} index={i} />)}
        </div>
      </div>
    )
  }

  if (!tasks.length) return (
    <div className="mx-4 mt-6 p-6 bg-white rounded-3xl border border-black/5 text-center">
      <p className="text-4xl mb-2">📋</p>
      <p className="font-display font-semibold text-gray-900">Aucune tâche pour l'instant</p>
      <p className="text-sm text-gray-500 mt-1">Complète le sondage pour générer ton parcours</p>
    </div>
  )

  return (
    <>
      <Section title="Urgent aujourd'hui" items={urgent} badge={<Badge variant="urgent">{urgent.length}</Badge>} />
      <Section title="Cette semaine" items={week} badge={<Badge variant="warning">{week.length}</Badge>} />
      <Section title="Ce mois" items={month} badge={<Badge variant="gray">{month.length}</Badge>} />
    </>
  )
}
```

- [ ] **Step 4: Create src/components/dashboard/ToolsGrid.jsx**

```jsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calculator, HelpCircle, Banknote, Home, FileText, Gift } from 'lucide-react'

const tools = [
  { icon: Calculator, label: 'Calculateur citoyenneté', to: '/calculateur', color: 'bg-blue-50 text-blue-600' },
  { icon: HelpCircle, label: 'Quiz officiel',           to: '/quiz',        color: 'bg-brand-50 text-brand-600' },
  { icon: Banknote,   label: 'Comparer les banques',    to: '/outils',      color: 'bg-green-50 text-green-600' },
  { icon: Home,       label: 'Guide logement',          to: '/outils',      color: 'bg-orange-50 text-orange-600' },
  { icon: FileText,   label: 'Mes formulaires',         to: '/outils',      color: 'bg-purple-50 text-purple-600' },
  { icon: Gift,       label: 'Mes bénéfices',           to: '/outils',      color: 'bg-pink-50 text-pink-600' },
]

export default function ToolsGrid() {
  const navigate = useNavigate()

  return (
    <div className="mt-5 px-4 mb-4">
      <h3 className="font-display font-bold text-base text-gray-900 mb-3">Outils rapides</h3>
      <div className="grid grid-cols-3 gap-2">
        {tools.map((tool, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(tool.to)}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-3xl border border-black/5 shadow-card"
          >
            <div className={`p-2.5 rounded-2xl ${tool.color}`}>
              <tool.icon size={20} strokeWidth={1.5} />
            </div>
            <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{tool.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```powershell
git add src/components/dashboard/
git commit -m "feat: dashboard components — HeroCard, PhaseRoadmap, TaskList, ToolsGrid"
```

---

## Task 15: Welcome page

**Files:**
- Modify: `src/pages/Welcome.jsx`

- [ ] **Step 1: Replace src/pages/Welcome.jsx**

```jsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { MapPin, CheckSquare, HelpCircle } from 'lucide-react'
import Button from '../components/ui/Button'
import useAppStore from '../store/useAppStore'

const features = [
  { icon: MapPin,       title: 'Parcours personnalisé',  desc: 'Adapté à ton profil, ta province et ta situation' },
  { icon: CheckSquare,  title: 'Checklists intelligentes', desc: '30+ tâches générées automatiquement selon tes priorités' },
  { icon: HelpCircle,   title: 'Quiz citoyenneté',        desc: '100 questions officielles pour préparer ton test' },
]

const langues = ['🇫🇷 FR', '🇬🇧 EN', '🇸🇦 AR', '🇪🇸 ES']

export default function Welcome() {
  const { isSignedIn } = useAuth()
  const { profile } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn && profile?.onboarding_done) navigate('/dashboard')
    else if (isSignedIn) navigate('/onboarding')
  }, [isSignedIn])

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-8 pb-8">
      <div className="flex justify-end gap-2 mb-8">
        {langues.map(l => (
          <button key={l} className="text-xs font-medium text-gray-400 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-50">
            {l}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div animate={{ scale: [0.9, 1.05, 1] }} transition={{ duration: 0.6 }} className="mb-6">
          <div className="w-20 h-20 bg-brand-300 rounded-4xl flex items-center justify-center shadow-brand mx-auto">
            <span className="text-4xl">🍁</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="font-display font-bold text-4xl text-gray-900 leading-tight">
            Maple<span className="text-brand-300">Path</span>
          </h1>
          <p className="text-gray-500 text-lg mt-2 mb-8">De l'aéroport à la citoyenneté</p>
        </motion.div>

        <div className="w-full flex flex-col gap-3 mb-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-3xl text-left"
            >
              <div className="p-2 bg-brand-50 rounded-2xl flex-shrink-0">
                <f.icon size={20} className="text-brand-600" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-gray-900">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="flex flex-col gap-3"
      >
        <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
          <Button fullWidth>Commencer — 2 min</Button>
        </SignUpButton>
        <SignInButton mode="modal" afterSignInUrl="/dashboard">
          <Button variant="secondary" fullWidth>J'ai déjà un compte</Button>
        </SignInButton>
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

`npm run dev` → navigate to `/` → see Welcome page with logo animation and 3 feature cards. Click "Commencer" → Clerk modal opens.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/Welcome.jsx
git commit -m "feat: Welcome page with Clerk auth and animated feature cards"
```

---

## Task 16: Onboarding page

**Files:**
- Modify: `src/pages/Onboarding.jsx`

- [ ] **Step 1: Replace src/pages/Onboarding.jsx**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import OnboardingFlow from '../components/onboarding/OnboardingFlow'
import { generateTasks } from '../lib/taskEngine'
import useAppStore from '../store/useAppStore'

const messages = [
  'Analyse de ton profil...',
  'Génération de ton parcours...',
  'Préparation de tes ressources...',
  'Ton parcours est prêt ! 🍁',
]

export default function Onboarding() {
  const { userId, getToken } = useAuth()
  const { onboardingAnswers, setProfile, setTasks, clearOnboardingAnswers } = useAppStore()
  const navigate = useNavigate()
  const [generating, setGenerating] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)
  const [confetti, setConfetti] = useState(false)

  async function handleComplete() {
    setGenerating(true)

    const msgInterval = setInterval(() => {
      setMsgIndex(i => Math.min(i + 1, messages.length - 1))
    }, 800)

    try {
      const token = await getToken()
      const profileData = {
        ...onboardingAnswers,
        onboarding_done: true,
        phase_actuelle: 1,
      }

      const savedProfile = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileData),
      }).then(r => r.json())

      const tasks = generateTasks(profileData)
      const savedTasks = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tasks }),
      }).then(r => r.json())

      clearInterval(msgInterval)
      setMsgIndex(3)
      setProfile(savedProfile)
      setTasks(savedTasks)
      clearOnboardingAnswers()
      setConfetti(true)

      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (e) {
      clearInterval(msgInterval)
      console.error(e)
      navigate('/dashboard')
    }
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        {confetti && <ReactConfetti recycle={false} numberOfPieces={200} colors={['#FFD600', '#C41E3A', '#0A0A0A']} />}
        <motion.div
          animate={{ rotate: confetti ? 0 : 360 }}
          transition={{ repeat: confetti ? 0 : Infinity, duration: 1.2, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-4 border-brand-300 border-t-transparent mb-8"
          style={confetti ? { border: 'none', fontSize: '4rem' } : {}}
        >
          {confetti && '🍁'}
        </motion.div>
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-semibold text-xl text-gray-900 text-center"
        >
          {messages[msgIndex]}
        </motion.p>
      </div>
    )
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
```

- [ ] **Step 2: Verify**

Sign up via Welcome → complete 6 onboarding steps → see loading animation → redirect to Dashboard. Check Neon console that `profiles` and `checklist_items` rows were created.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/Onboarding.jsx
git commit -m "feat: onboarding page with task generation and confetti"
```

---

## Task 17: Dashboard page

**Files:**
- Modify: `src/pages/Dashboard.jsx`

- [ ] **Step 1: Replace src/pages/Dashboard.jsx**

```jsx
import { motion } from 'framer-motion'
import HeroCard from '../components/dashboard/HeroCard'
import PhaseRoadmap from '../components/dashboard/PhaseRoadmap'
import TaskList from '../components/dashboard/TaskList'
import ToolsGrid from '../components/dashboard/ToolsGrid'
import useAppStore from '../store/useAppStore'

export default function Dashboard() {
  const { tasks, profile } = useAppStore()

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
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/Dashboard.jsx
git commit -m "feat: Dashboard page composing all dashboard components"
```

---

## Task 18: Checklist page

**Files:**
- Modify: `src/pages/Checklist.jsx`

- [ ] **Step 1: Replace src/pages/Checklist.jsx**

```jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Plus } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../store/useAppStore'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { phases, taskCategories } from '../data/tasks'

export default function Checklist() {
  const { tasks, toggleTask } = useAppStore()
  const { getToken } = useAuth()
  const [activePhase, setActivePhase] = useState(1)
  const [activeCategory, setActiveCategory] = useState('all')

  const phaseTasks = tasks.filter(t => t.phase === activePhase)
  const filtered = activeCategory === 'all'
    ? phaseTasks
    : phaseTasks.filter(t => t.categorie === activeCategory)
  const done = phaseTasks.filter(t => t.complete).length
  const pct = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0

  const usedCategories = [...new Set(phaseTasks.map(t => t.categorie).filter(Boolean))]

  async function handleToggle(taskId) {
    const task = tasks.find(t => t.id === taskId)
    toggleTask(taskId)
    try {
      const token = await getToken()
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: taskId, complete: !task.complete }),
      })
    } catch { toggleTask(taskId) }
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-2xl text-gray-900">Ma Checklist</h2>
        <Badge variant={pct === 100 ? 'success' : 'brand'}>{pct}%</Badge>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        {phases.map(p => (
          <button
            key={p.id}
            onClick={() => { setActivePhase(p.id); setActiveCategory('all') }}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-display font-semibold transition-all
              ${activePhase === p.id ? 'bg-brand-300 text-brand-900' : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'}`}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Progress for active phase */}
      <div className="bg-white rounded-3xl border border-black/5 p-4 mb-4 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">{done}/{phaseTasks.length} tâches</span>
          <span className="text-xs font-medium text-brand-600">{pct}% complété</span>
        </div>
        <ProgressBar value={done} max={phaseTasks.length || 1} />
      </div>

      {/* Category filters */}
      {usedCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${activeCategory === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Tout
          </button>
          {usedCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${activeCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {taskCategories[cat]?.label || cat}
            </button>
          ))}
        </div>
      )}

      {/* Task list */}
      <AnimatePresence>
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">✅</p>
              <p className="font-display font-semibold text-gray-900">Aucune tâche ici</p>
              <p className="text-sm text-gray-500 mt-1">Cette phase est vide ou tout est complété !</p>
            </div>
          )}
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-start gap-3 p-4 rounded-3xl border-2 transition-all
                ${task.complete ? 'border-green-200 bg-green-50' : 'border-black/5 bg-white shadow-card'}`}
            >
              <button
                onClick={() => handleToggle(task.id)}
                className={`flex-shrink-0 mt-0.5 w-6 h-6 rounded-full border-2 transition-all
                  ${task.complete ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-brand-300'}`}
              />
              <div className="flex-1 min-w-0">
                <p className={`font-display font-semibold text-sm ${task.complete ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {task.titre}
                </p>
                {task.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {task.priorite === 'urgent' && <Badge variant="urgent">Urgent</Badge>}
                  {task.formulaire && <Badge variant="info">{task.formulaire}</Badge>}
                  {task.organisme && <Badge variant="gray">{task.organisme}</Badge>}
                </div>
              </div>
              {task.lien_officiel && (
                <a href={task.lien_officiel} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100">
                  <ExternalLink size={14} className="text-gray-400" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* FAB */}
      <div className="fixed bottom-24 right-4">
        <button className="w-14 h-14 bg-brand-300 rounded-full shadow-brand flex items-center justify-center">
          <Plus size={24} className="text-brand-900" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/Checklist.jsx
git commit -m "feat: Checklist page with phase tabs, category filters, and task toggle"
```

---

## Task 19: CitoyenneteQuiz page

**Files:**
- Modify: `src/pages/CitoyenneteQuiz.jsx`

- [ ] **Step 1: Replace src/pages/CitoyenneteQuiz.jsx**

```jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useAuth } from '@clerk/clerk-react'
import { Timer, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { quizQuestions, getRandomQuestions, categoriesQuiz } from '../data/quiz'

export default function CitoyenneteQuiz() {
  const { getToken } = useAuth()
  const [mode, setMode] = useState(null) // null | 'practice' | 'exam'
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (mode !== 'exam' || finished) return
    setTimeLeft(30 * 60)
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { clearInterval(t); finishQuiz(); return 0 }
      return s - 1
    }), 1000)
    return () => clearInterval(t)
  }, [mode])

  function startMode(m) {
    const qs = m === 'practice' ? getRandomQuestions(10) : getRandomQuestions(20)
    setQuestions(qs)
    setMode(m)
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setConfetti(false)
    startTime.current = Date.now()
  }

  function handleAnswer(idx) {
    if (selected !== null) return
    setSelected(idx)
    const correct = idx === questions[current].reponse
    setTimeout(() => {
      setAnswers(a => [...a, { questionId: questions[current].id, correct, selected: idx }])
      if (current < questions.length - 1) {
        setCurrent(c => c + 1)
        setSelected(null)
      } else {
        finishQuiz([...answers, { questionId: questions[current].id, correct, selected: idx }])
      }
    }, 1200)
  }

  async function finishQuiz(finalAnswers = answers) {
    const score = finalAnswers.filter(a => a.correct).length
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    const duree = Math.round((Date.now() - startTime.current) / 1000)
    setFinished(true)
    if (pct >= 75) setConfetti(true)
    try {
      const token = await getToken()
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ score, total_questions: total, pourcentage: pct, duree_secondes: duree, questions_ratees: finalAnswers.filter(a => !a.correct).map(a => a.questionId) }),
      })
    } catch {}
  }

  const score = answers.filter(a => a.correct).length
  const pct = questions.length ? Math.round((score / questions.length) * 100) : 0

  if (!mode) return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Quiz Citoyenneté</h2>
      <p className="text-gray-500 text-sm mb-6">100 questions basées sur «Découvrir le Canada»</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {Object.entries(categoriesQuiz).map(([key, cat]) => (
          <div key={key} className="p-3 bg-white rounded-3xl border border-black/5 shadow-card">
            <p className="font-display font-bold text-lg text-gray-900">{cat.count}</p>
            <p className="text-xs text-gray-500">{cat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Button onClick={() => startMode('practice')} fullWidth>
          🎯 Mode pratique — 10 questions
        </Button>
        <Button variant="secondary" onClick={() => startMode('exam')} fullWidth>
          📝 Mode examen — 20 questions · 30min
        </Button>
      </div>
    </div>
  )

  if (finished) {
    const passed = pct >= 75
    return (
      <div className="px-4 py-6 text-center">
        {confetti && <ReactConfetti recycle={false} numberOfPieces={200} colors={['#FFD600', '#C41E3A']} />}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-50'}`}>
          {passed ? <CheckCircle size={40} className="text-green-500" /> : <XCircle size={40} className="text-red-400" />}
        </div>
        <h3 className="font-display font-bold text-3xl text-gray-900">{score}/{questions.length}</h3>
        <p className="text-gray-500 mt-1">{pct}% — {passed ? '🎉 Réussi !' : 'Continue à étudier'}</p>
        <div className="mt-6 mb-6">
          <ProgressBar value={score} max={questions.length} color={passed ? 'green' : 'red'} showLabel />
        </div>
        {!passed && (
          <div className="mb-6 text-left">
            <h4 className="font-display font-semibold text-sm text-gray-700 mb-2">Questions à revoir :</h4>
            <div className="flex flex-col gap-2">
              {answers.filter(a => !a.correct).slice(0, 5).map(a => {
                const q = questions.find(q => q.id === a.questionId)
                return q ? (
                  <div key={a.questionId} className="p-3 bg-red-50 rounded-2xl text-sm text-red-800">{q.question}</div>
                ) : null
              })}
            </div>
          </div>
        )}
        <Button onClick={() => setMode(null)} fullWidth>
          <RotateCcw size={16} className="mr-2 inline" /> Recommencer
        </Button>
      </div>
    )
  }

  const q = questions[current]
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="brand">{current + 1}/{questions.length}</Badge>
        {mode === 'exam' && (
          <div className={`flex items-center gap-1 text-sm font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
            <Timer size={14} />
            {mins}:{secs.toString().padStart(2, '0')}
          </div>
        )}
      </div>
      <ProgressBar value={current} max={questions.length} className="mb-6" />
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}>
          <h3 className="font-display font-bold text-xl text-gray-900 mb-6 leading-tight">{q.question}</h3>
          <div className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              let style = 'border-gray-100 bg-white'
              if (selected !== null) {
                if (i === q.reponse) style = 'border-green-400 bg-green-50'
                else if (i === selected && selected !== q.reponse) style = 'border-red-300 bg-red-50'
                else style = 'border-gray-100 bg-gray-50 opacity-60'
              }
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: selected === null ? 0.98 : 1 }}
                  onClick={() => handleAnswer(i)}
                  disabled={selected !== null}
                  className={`p-4 rounded-3xl border-2 text-left font-display font-medium text-sm text-gray-900 transition-all ${style}`}
                >
                  {opt}
                </motion.button>
              )
            })}
          </div>
          {selected !== null && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-blue-50 rounded-2xl text-sm text-blue-800"
            >
              💡 {q.explication}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/CitoyenneteQuiz.jsx
git commit -m "feat: citizenship quiz with practice/exam modes, confetti, and session saving"
```

---

## Task 20: Calculateur page

**Files:**
- Modify: `src/pages/Calculateur.jsx`

- [ ] **Step 1: Replace src/pages/Calculateur.jsx**

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import { differenceInDays, format, addDays, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const DAYS_REQUIRED = 1460

export default function Calculateur() {
  const { getToken } = useAuth()
  const [dateRP, setDateRP] = useState('')
  const [absences, setAbsences] = useState([])
  const [newAbsence, setNewAbsence] = useState({ debut: '', fin: '', destination: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken()
        const data = await fetch('/api/presence', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        const abs = data.filter(d => d.type === 'absence')
        setAbsences(abs)
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const today = new Date()
  const rpDate = dateRP ? parseISO(dateRP) : null
  const totalDays = rpDate ? differenceInDays(today, rpDate) : 0
  const absenceDays = absences.reduce((sum, a) => {
    return sum + differenceInDays(parseISO(a.date_fin), parseISO(a.date_debut))
  }, 0)
  const presenceDays = Math.max(0, totalDays - absenceDays)
  const remaining = Math.max(0, DAYS_REQUIRED - presenceDays)
  const pct = Math.min(100, Math.round((presenceDays / DAYS_REQUIRED) * 100))
  const eligibleDate = rpDate ? addDays(rpDate, DAYS_REQUIRED + absenceDays) : null

  async function addAbsence() {
    if (!newAbsence.debut || !newAbsence.fin) return
    try {
      const token = await getToken()
      const saved = await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ date_debut: newAbsence.debut, date_fin: newAbsence.fin, pays: newAbsence.destination || 'Étranger', type: 'absence' }),
      }).then(r => r.json())
      setAbsences(a => [...a, saved])
      setNewAbsence({ debut: '', fin: '', destination: '' })
    } catch {}
  }

  async function deleteAbsence(id) {
    try {
      const token = await getToken()
      await fetch('/api/presence', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      })
      setAbsences(a => a.filter(x => x.id !== id))
    } catch {}
  }

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (pct / 100) * circumference

  return (
    <div className="px-4 py-6">
      <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">Calculateur de citoyenneté</h2>

      <Card className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">Date d'obtention du RP</label>
        <input
          type="date"
          value={dateRP}
          onChange={e => setDateRP(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-brand-300"
        />
      </Card>

      {dateRP && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-4 flex flex-col items-center py-6">
            <svg width="128" height="128" className="mb-4 -rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" stroke="#F3F4F6" strokeWidth="10" />
              <motion.circle
                cx="64" cy="64" r="54" fill="none"
                stroke={pct >= 100 ? '#22C55E' : '#FFD600'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="text-center -mt-2">
              <p className="font-display font-bold text-3xl text-gray-900">{presenceDays.toLocaleString()}</p>
              <p className="text-sm text-gray-500">jours sur {DAYS_REQUIRED.toLocaleString()} requis</p>
            </div>
            <div className="flex gap-3 mt-4">
              <Badge variant={pct >= 100 ? 'success' : 'brand'}>{pct}%</Badge>
              {remaining > 0 && <Badge variant="gray">Il reste {remaining} jours</Badge>}
              {pct >= 100 && <Badge variant="success">Éligible ! 🍁</Badge>}
            </div>
            {eligibleDate && remaining > 0 && (
              <p className="text-xs text-gray-500 mt-3">
                Éligibilité estimée : {format(eligibleDate, 'd MMMM yyyy', { locale: fr })}
              </p>
            )}
          </Card>

          <Card className="mb-4">
            <h3 className="font-display font-semibold text-base text-gray-900 mb-3">Ajouter une absence</h3>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Départ</label>
                  <input type="date" value={newAbsence.debut} onChange={e => setNewAbsence(a => ({...a, debut: e.target.value}))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Retour</label>
                  <input type="date" value={newAbsence.fin} onChange={e => setNewAbsence(a => ({...a, fin: e.target.value}))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
                </div>
              </div>
              <input placeholder="Destination (optionnel)" value={newAbsence.destination}
                onChange={e => setNewAbsence(a => ({...a, destination: e.target.value}))}
                className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-300" />
              <Button onClick={addAbsence} disabled={!newAbsence.debut || !newAbsence.fin}>
                <Plus size={16} className="mr-1 inline" /> Ajouter l'absence
              </Button>
            </div>
          </Card>

          {absences.length > 0 && (
            <Card>
              <h3 className="font-display font-semibold text-base text-gray-900 mb-3">
                Journal des absences <Badge variant="gray">{absenceDays} jours</Badge>
              </h3>
              <div className="flex flex-col gap-2">
                {absences.map(a => (
                  <div key={a.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{a.pays || 'Étranger'}</p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(a.date_debut), 'd MMM', {locale: fr})} → {format(parseISO(a.date_fin), 'd MMM yyyy', {locale: fr})}
                        {' · '}{differenceInDays(parseISO(a.date_fin), parseISO(a.date_debut))} jours
                      </p>
                    </div>
                    <button onClick={() => deleteAbsence(a.id)} className="p-1.5 rounded-full hover:bg-red-50">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/Calculateur.jsx
git commit -m "feat: citizenship calculator with animated progress circle and absence journal"
```

---

## Task 21: Outils page

**Files:**
- Modify: `src/pages/Outils.jsx`

- [ ] **Step 1: Replace src/pages/Outils.jsx**

```jsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/Outils.jsx
git commit -m "feat: Outils resource center with banks, language courses, government aid, forms"
```

---

## Task 22: Profil page

**Files:**
- Modify: `src/pages/Profil.jsx`

- [ ] **Step 1: Replace src/pages/Profil.jsx**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { LogOut, ChevronRight, Globe, Bell, FileText } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import useAppStore from '../store/useAppStore'
import { getProvince } from '../data/provinces'

export default function Profil() {
  const { signOut, getToken } = useAuth()
  const { user } = useUser()
  const { profile, langue, setLangue, clearProfile, updateProfile } = useAppStore()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)

  const province = getProvince(profile?.province)
  const initials = (profile?.prenom || user?.firstName || 'U').slice(0, 2).toUpperCase()

  async function handleSignOut() {
    clearProfile()
    await signOut()
    navigate('/')
  }

  async function handleLangueChange(lang) {
    setLangue(lang)
    try {
      const token = await getToken()
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ langue: lang }),
      })
    } catch {}
  }

  return (
    <div className="px-4 py-6">
      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-brand-300 rounded-full flex items-center justify-center mb-3 shadow-brand">
          <span className="font-display font-bold text-2xl text-brand-900">{initials}</span>
        </div>
        <h2 className="font-display font-bold text-xl text-gray-900">{profile?.prenom || user?.firstName || 'Utilisateur'}</h2>
        <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
        {profile?.province && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="gray">{province?.nom || profile.province}</Badge>
            <Badge variant="brand">{profile.type_immigrant?.replace(/_/g, ' ')}</Badge>
          </div>
        )}
      </motion.div>

      {/* Langue */}
      <Card className="mb-3">
        <div className="flex items-center gap-3 mb-3">
          <Globe size={18} className="text-gray-500" />
          <p className="font-display font-semibold text-sm text-gray-900">Langue de l'application</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[{code:'fr',label:'FR 🇫🇷'},{code:'en',label:'EN 🇬🇧'},{code:'ar',label:'AR 🇸🇦'},{code:'es',label:'ES 🇪🇸'}].map(l => (
            <button key={l.code} onClick={() => handleLangueChange(l.code)}
              className={`py-2 rounded-xl text-xs font-display font-semibold transition-all
                ${langue === l.code ? 'bg-brand-300 text-brand-900' : 'bg-gray-100 text-gray-600'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Info */}
      <Card className="mb-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Province</p>
              <p className="font-display font-medium text-sm text-gray-900">{province?.nom || '—'}</p>
            </div>
            <Badge variant="gray">{profile?.province || '—'}</Badge>
          </div>
          <div className="h-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-500">Date d'arrivée</p>
            <p className="font-display font-medium text-sm text-gray-900">{profile?.date_arrivee || 'Non renseignée'}</p>
          </div>
          <div className="h-px bg-gray-100" />
          <div>
            <p className="text-xs text-gray-500">Priorités</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {(profile?.priorites || []).map(p => <Badge key={p} variant="brand">{p}</Badge>)}
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card className="mb-3">
        <button onClick={() => navigate('/onboarding')} className="w-full flex items-center gap-3 py-2">
          <FileText size={18} className="text-gray-500" />
          <span className="flex-1 font-display font-medium text-sm text-gray-900 text-left">Modifier mes priorités</span>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </Card>

      <div className="mt-6">
        <Button variant="danger" fullWidth onClick={handleSignOut}>
          <LogOut size={16} className="mr-2 inline" /> Se déconnecter
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        MaplePath v0.1.0 · Construit avec ❤️ pour les nouveaux Canadiens
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add src/pages/Profil.jsx
git commit -m "feat: Profile page with avatar, language switcher, and sign out"
```

---

## Task 23: Hooks

**Files:**
- Create: `src/hooks/useProfile.js`
- Create: `src/hooks/useChecklist.js`
- Create: `src/hooks/useProgress.js`
- Create: `src/hooks/useCitizenship.js`

- [ ] **Step 1: Create src/hooks/useProfile.js**

```javascript
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../store/useAppStore'

export function useProfile() {
  const { getToken, isSignedIn } = useAuth()
  const { profile, setProfile } = useAppStore()
  const [loading, setLoading] = useState(!profile)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSignedIn || profile) { setLoading(false); return }
    async function fetch_() {
      try {
        const token = await getToken()
        const data = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        if (!data.error) setProfile(data)
      } catch (e) { setError(e.message) }
      finally { setLoading(false) }
    }
    fetch_()
  }, [isSignedIn])

  return { profile, loading, error }
}
```

- [ ] **Step 2: Create src/hooks/useChecklist.js**

```javascript
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import useAppStore from '../store/useAppStore'

export function useChecklist() {
  const { getToken, isSignedIn } = useAuth()
  const { tasks, setTasks, toggleTask } = useAppStore()
  const [loading, setLoading] = useState(!tasks.length)

  useEffect(() => {
    if (!isSignedIn || tasks.length) { setLoading(false); return }
    async function fetch_() {
      try {
        const token = await getToken()
        const data = await fetch('/api/tasks', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json())
        setTasks(data)
      } catch {}
      finally { setLoading(false) }
    }
    fetch_()
  }, [isSignedIn])

  return { tasks, loading, toggleTask }
}
```

- [ ] **Step 3: Create src/hooks/useProgress.js**

```javascript
import useAppStore from '../store/useAppStore'
import { phases } from '../data/tasks'

export function useProgress() {
  const { tasks, profile } = useAppStore()

  const completedByPhase = phases.map(p => {
    const phaseTasks = tasks.filter(t => t.phase === p.id)
    const done = phaseTasks.filter(t => t.complete).length
    return { phase: p.id, total: phaseTasks.length, done, pct: phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0 }
  })

  const overall = tasks.length
    ? Math.round((tasks.filter(t => t.complete).length / tasks.length) * 100)
    : 0

  return { completedByPhase, overall, currentPhase: profile?.phase_actuelle || 1 }
}
```

- [ ] **Step 4: Create src/hooks/useCitizenship.js**

```javascript
import { differenceInDays, addDays } from 'date-fns'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const DAYS_REQUIRED = 1460

export function useCitizenship(dateRP) {
  const { getToken } = useAuth()
  const [absences, setAbsences] = useState([])

  useEffect(() => {
    if (!dateRP) return
    getToken().then(token =>
      fetch('/api/presence', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => setAbsences(d.filter(x => x.type === 'absence')))
        .catch(() => {})
    )
  }, [dateRP])

  if (!dateRP) return { presenceDays: 0, remaining: DAYS_REQUIRED, pct: 0, eligibleDate: null }

  const today = new Date()
  const rp = new Date(dateRP)
  const total = differenceInDays(today, rp)
  const absenceDays = absences.reduce((s, a) => s + differenceInDays(new Date(a.date_fin), new Date(a.date_debut)), 0)
  const presenceDays = Math.max(0, total - absenceDays)
  const remaining = Math.max(0, DAYS_REQUIRED - presenceDays)
  const pct = Math.min(100, Math.round((presenceDays / DAYS_REQUIRED) * 100))
  const eligibleDate = addDays(rp, DAYS_REQUIRED + absenceDays)

  return { presenceDays, absenceDays, remaining, pct, eligibleDate, absences, setAbsences }
}
```

- [ ] **Step 5: Commit**

```powershell
git add src/hooks/
git commit -m "feat: useProfile, useChecklist, useProgress, useCitizenship hooks"
```

---

## Task 24: PWA, final verification, Vercel deploy

**Files:**
- Create: `public/icons/icon-192.png` and `public/icons/icon-512.png` (real icons)

- [ ] **Step 1: Generate PWA icons**

Use [favicon.io](https://favicon.io) or [RealFaviconGenerator](https://realfavicongenerator.net):
1. Create a 512×512 image: yellow (#FFD600) background + black maple leaf emoji 🍁 centered
2. Download → place `icon-192.png` and `icon-512.png` in `public/icons/`

- [ ] **Step 2: Production build test**

```powershell
npm run build
```
Expected: no errors. `dist/` folder created.

- [ ] **Step 3: Preview build**

```powershell
npm run preview
```
Navigate to `http://localhost:4173` → test full flow: Welcome → Sign up → Onboarding → Dashboard.

- [ ] **Step 4: Deploy to Vercel**

```powershell
npx vercel --prod
```
Or push to GitHub and connect the repo in vercel.com dashboard.

In Vercel dashboard → Settings → Environment Variables → add:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

- [ ] **Step 5: Set Clerk redirect URLs**

In Clerk dashboard → Paths → add your Vercel domain to allowed redirect URLs:
- `https://your-app.vercel.app/dashboard`
- `https://your-app.vercel.app/onboarding`

- [ ] **Step 6: Lighthouse test**

Open deployed URL in Chrome → DevTools → Lighthouse → Mobile → run audit.
Expected: Performance ≥ 85, PWA ✅, Accessibility ≥ 90

- [ ] **Step 7: Final commit**

```powershell
git add public/icons/
git commit -m "feat: PWA icons and production build verified"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ 6-step onboarding (Tasks 13, 16)
- ✅ Dashboard with HeroCard, PhaseRoadmap, TaskList, ToolsGrid (Tasks 14, 17)
- ✅ Checklist with phase tabs, category filter, FAB (Task 18)
- ✅ 100-question quiz with practice/exam modes, confetti (Tasks 9, 19)
- ✅ Citizenship calculator with animated circle, absence journal (Task 20)
- ✅ Outils: banks, language courses, government aid, IRCC forms, doctors (Task 21)
- ✅ Profile with langue switcher, sign out (Task 22)
- ✅ Clerk auth (Task 4, 15)
- ✅ Neon API routes with JWT auth (Tasks 5, 6)
- ✅ Zustand store with persist (Task 7)
- ✅ Framer Motion transitions throughout (Tasks 11–22)
- ✅ i18n FR/EN/AR (Task 10)
- ✅ PWA setup (Tasks 3, 24)
- ✅ Design system: #FFD600, Plus Jakarta Sans, Inter, rounded-3xl (Tasks 2, 11)
- ✅ taskEngine generates ~25 personalized tasks (Task 10)
