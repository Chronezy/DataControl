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

    const result = await sql`SELECT * FROM courses ORDER BY code`
    return Response.json(result)
  } catch (error) {
    console.error('[v0] Courses fetch error:', error)
    return Response.json({ error: 'Failed to fetch courses' }, { status: 500 })
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
    const { code, title, description, instructor, credits, max_students, start_date, end_date } = body

    const result = await sql`
      INSERT INTO courses (code, title, description, instructor, credits, max_students, start_date, end_date) 
      VALUES (${code}, ${title}, ${description}, ${instructor}, ${credits}, ${max_students}, ${start_date}, ${end_date}) 
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Course create error:', error)
    return Response.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
