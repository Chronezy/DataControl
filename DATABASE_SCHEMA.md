# Database Schema Documentation

## Overview
The Student Course Management System uses a PostgreSQL relational database with three main tables: `students`, `courses`, and `enrollments`.

## Tables

### 1. Students Table
Stores information about students enrolled in the system.

\`\`\`sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active' 
    CHECK (status IN ('active', 'inactive', 'graduated'))
);
\`\`\`

**Columns:**
- `id`: Unique identifier for each student
- `name`: Student's full name
- `email`: Student's email address (unique)
- `phone`: Student's contact phone number
- `enrollment_date`: Date and time when student was added
- `status`: Current status (active, inactive, or graduated)

### 2. Courses Table
Stores information about available courses.

\`\`\`sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  instructor VARCHAR(255) NOT NULL,
  credits INTEGER CHECK (credits > 0),
  max_students INTEGER CHECK (max_students > 0),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

**Columns:**
- `id`: Unique identifier for each course
- `code`: Course code (e.g., CS101)
- `title`: Course title
- `description`: Course description
- `instructor`: Instructor's name
- `credits`: Number of academic credits
- `max_students`: Maximum student capacity
- `start_date`: Course start date
- `end_date`: Course end date
- `created_at`: Date course was created

### 3. Enrollments Table (Junction Table)
Links students to courses, tracking their enrollment status and grades.

\`\`\`sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  grade VARCHAR(2),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_status VARCHAR(50) DEFAULT 'enrolled'
    CHECK (completion_status IN ('enrolled', 'completed', 'dropped')),
  UNIQUE(student_id, course_id)
);
\`\`\`

**Columns:**
- `id`: Unique identifier for each enrollment
- `student_id`: Foreign key referencing students table
- `course_id`: Foreign key referencing courses table
- `grade`: Student's grade (e.g., A, B+, C-)
- `enrollment_date`: Date of enrollment
- `completion_status`: Status of enrollment (enrolled, completed, or dropped)

## Relationships

- **One-to-Many (Students to Enrollments)**: One student can have many enrollments
- **One-to-Many (Courses to Enrollments)**: One course can have many enrollments
- **Many-to-Many (Students to Courses)**: Achieved through the enrollments table

## Constraints

- Student email addresses are unique to prevent duplicates
- Course codes are unique
- Each student can enroll in each course only once (UNIQUE constraint)
- Foreign key cascade delete ensures data integrity
- Valid status values are enforced with CHECK constraints
