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

    const studentCount = await sql`SELECT COUNT(*) as count FROM students`
    const courseCount = await sql`SELECT COUNT(*) as count FROM courses`
    const enrollmentCount = await sql`SELECT COUNT(*) as count FROM enrollments WHERE completion_status = 'enrolled'`

    return Response.json({
      students: studentCount[0].count,
      courses: courseCount[0].count,
      enrollments: enrollmentCount[0].count
    })
  } catch (error) {
    console.error('[v0] Stats fetch error:', error)
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
