import { neon } from '@neondatabase/serverless'

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null

export async function GET() {
  try {
    if (!sql || !process.env.DATABASE_URL) {
      return Response.json(
        { error: 'Database not configured. Please add DATABASE_URL environment variable.' },
        { status: 503 }
      )
    }

    const result = await sql`SELECT * FROM students ORDER BY name`
    return Response.json(result)
  } catch (error) {
    console.error('[v0] Students fetch error:', error)
    return Response.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!sql || !process.env.DATABASE_URL) {
      return Response.json(
        { error: 'Database not configured.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, email, phone, status } = body

    const result = await sql`
      INSERT INTO students (name, email, phone, status) 
      VALUES (${name}, ${email}, ${phone}, ${status}) 
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Student create error:', error)
    return Response.json({ error: 'Failed to create student' }, { status: 500 })
  }
}
