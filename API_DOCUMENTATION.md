# API Documentation

## Base URL
All API endpoints are relative to the application root: `/api`

## Endpoints

### Students

#### GET /api/students
Retrieve all students in the system.

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "name": "Александр Иванов",
    "email": "ivan@university.edu",
    "phone": "+7-999-111-2233",
    "status": "active",
    "enrollment_date": "2024-09-01T10:00:00Z"
  }
]
\`\`\`

#### POST /api/students
Create a new student.

**Request Body:**
\`\`\`json
{
  "name": "Новый Студент",
  "email": "new@university.edu",
  "phone": "+7-999-000-0000",
  "status": "active"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 6,
  "name": "Новый Студент",
  "email": "new@university.edu",
  "phone": "+7-999-000-0000",
  "status": "active",
  "enrollment_date": "2024-11-17T12:00:00Z"
}
\`\`\`

#### DELETE /api/students/[id]
Delete a student by ID.

**Response:**
\`\`\`json
{ "success": true }
\`\`\`

---

### Courses

#### GET /api/courses
Retrieve all courses.

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "code": "CS101",
    "title": "Основы программирования",
    "description": "Введение в Python и основные концепции",
    "instructor": "Профессор Кузнецов",
    "credits": 3,
    "max_students": 30,
    "start_date": "2024-09-01",
    "end_date": "2024-12-15",
    "created_at": "2024-08-20T09:00:00Z"
  }
]
\`\`\`

#### POST /api/courses
Create a new course.

**Request Body:**
\`\`\`json
{
  "code": "CS301",
  "title": "Продвинутые алгоритмы",
  "description": "Сложные алгоритмы и оптимизация",
  "instructor": "Профессор Новиков",
  "credits": 4,
  "max_students": 20,
  "start_date": "2025-01-15",
  "end_date": "2025-05-30"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 6,
  "code": "CS301",
  "title": "Продвинутые алгоритмы",
  "description": "Сложные алгоритмы и оптимизация",
  "instructor": "Профессор Новиков",
  "credits": 4,
  "max_students": 20,
  "start_date": "2025-01-15",
  "end_date": "2025-05-30",
  "created_at": "2024-11-17T12:00:00Z"
}
\`\`\`

#### DELETE /api/courses/[id]
Delete a course by ID.

**Response:**
\`\`\`json
{ "success": true }
\`\`\`

---

### Enrollments

#### GET /api/enrollments
Retrieve all enrollments with student and course details.

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "student_name": "Александр Иванов",
    "course_title": "Основы программирования",
    "course_code": "CS101",
    "grade": "A",
    "completion_status": "completed",
    "enrollment_date": "2024-09-01T10:00:00Z"
  }
]
\`\`\`

#### POST /api/enrollments
Create a new enrollment.

**Request Body:**
\`\`\`json
{
  "student_id": 1,
  "course_id": 3,
  "grade": "",
  "completion_status": "enrolled"
}
\`\`\`

**Response:**
\`\`\`json
{
  "id": 11,
  "student_id": 1,
  "course_id": 3,
  "grade": null,
  "enrollment_date": "2024-11-17T12:00:00Z",
  "completion_status": "enrolled"
}
\`\`\`

**Error Response (duplicate enrollment):**
\`\`\`json
{ "error": "Failed to create enrollment" }
\`\`\`

#### DELETE /api/enrollments/[id]
Delete an enrollment by ID.

**Response:**
\`\`\`json
{ "success": true }
\`\`\`

---

### Statistics

#### GET /api/stats
Retrieve system statistics.

**Response:**
\`\`\`json
{
  "students": 5,
  "courses": 5,
  "enrollments": 10
}
\`\`\`

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Successful GET request
- `201`: Successful POST request (resource created)
- `500`: Server error

Error responses include an error message:
\`\`\`json
{ "error": "Description of what went wrong" }
