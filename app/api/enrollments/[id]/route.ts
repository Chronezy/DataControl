import { neon } from "@neondatabase/serverless";

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!sql || !process.env.DATABASE_URL) {
      return Response.json(
        { error: "Database not configured." },
        { status: 503 }
      );
    }

    // Await the params promise
    const { id } = await params;

    await sql`DELETE FROM enrollments WHERE id = ${id}`;
    return Response.json({ success: true });
  } catch (error) {
    console.error("[v0] Enrollment delete error:", error);
    return Response.json(
      { error: "Failed to delete enrollment" },
      { status: 500 }
    );
  }
}
