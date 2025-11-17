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

    const result = await sql`
      SELECT e.id, s.name as student_name, c.title as course_title, c.code as course_code, 
             e.grade, e.completion_status, e.enrollment_date
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrollment_date DESC
    `
    return Response.json(result)
  } catch (error) {
    console.error('[v0] Enrollments fetch error:', error)
    return Response.json({ error: 'Failed to fetch enrollments' }, { status: 500 })
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
    const { student_id, course_id, grade, completion_status } = body

    const result = await sql`
      INSERT INTO enrollments (student_id, course_id, grade, completion_status) 
      VALUES (${student_id}, ${course_id}, ${grade}, ${completion_status}) 
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('[v0] Enrollment create error:', error)
    return Response.json({ error: 'Failed to create enrollment' }, { status: 500 })
  }
}
