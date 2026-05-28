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
      VALUES (${userId}, ${score}, ${total_questions}, ${pourcentage}, ${duree_secondes}, ${questions_ratees || []})
      RETURNING *
    `
    if (pourcentage >= 75) {
      await sql`UPDATE profiles SET score_quiz = ${score} WHERE id = ${userId}`
    }
    return res.status(201).json(rows[0])
  }

  res.status(405).json({ error: 'Method not allowed' })
}
