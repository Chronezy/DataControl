module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Prac/app/api/enrollments/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Prac$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Prac/node_modules/@neondatabase/serverless/index.mjs [app-route] (ecmascript)");
;
const sql = process.env.DATABASE_URL ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Prac$2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["neon"])(process.env.DATABASE_URL) : null;
async function GET() {
    try {
        if (!sql || !process.env.DATABASE_URL) {
            return Response.json({
                error: 'Database not configured. Please add DATABASE_URL environment variable.'
            }, {
                status: 503
            });
        }
        const result = await sql`
      SELECT e.id, s.name as student_name, c.title as course_title, c.code as course_code, 
             e.grade, e.completion_status, e.enrollment_date
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.enrollment_date DESC
    `;
        return Response.json(result);
    } catch (error) {
        console.error('[v0] Enrollments fetch error:', error);
        return Response.json({
            error: 'Failed to fetch enrollments'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        if (!sql || !process.env.DATABASE_URL) {
            return Response.json({
                error: 'Database not configured.'
            }, {
                status: 503
            });
        }
        const body = await request.json();
        const { student_id, course_id, grade, completion_status } = body;
        const result = await sql`
      INSERT INTO enrollments (student_id, course_id, grade, completion_status) 
      VALUES (${student_id}, ${course_id}, ${grade}, ${completion_status}) 
      RETURNING *
    `;
        return Response.json(result[0], {
            status: 201
        });
    } catch (error) {
        console.error('[v0] Enrollment create error:', error);
        return Response.json({
            error: 'Failed to create enrollment'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fd0d0588._.js.map