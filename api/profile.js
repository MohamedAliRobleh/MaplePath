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
        score_quiz = COALESCE(${data.score_quiz}, score_quiz),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING *
    `
    return res.status(200).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
