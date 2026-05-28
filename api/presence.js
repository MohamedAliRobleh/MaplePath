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
    const { date_debut, date_fin, pays, type } = req.body
    const rows = await sql`
      INSERT INTO presence_days (user_id, date_debut, date_fin, pays, type)
      VALUES (${userId}, ${date_debut}, ${date_fin}, ${pays || 'CA'}, ${type || 'absence'})
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
