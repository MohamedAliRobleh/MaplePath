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
      SET complete = ${complete}, completed_at = ${complete ? new Date().toISOString() : null}, notes = COALESCE(${notes}, notes)
      WHERE id = ${id} AND user_id = ${userId}
      RETURNING *
    `
    return res.status(200).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
