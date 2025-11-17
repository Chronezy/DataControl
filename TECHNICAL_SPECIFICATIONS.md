# Technical Specifications

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **Database**: PostgreSQL (via Neon)
- **Database Client**: @neondatabase/serverless

### Infrastructure
- **Deployment**: Vercel
- **Environment**: Edge-compatible with serverless functions

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Main dashboard page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── api/
│       ├── students/
│       │   ├── route.ts         # GET/POST students
│       │   └── [id]/route.ts    # DELETE student
│       ├── courses/
│       │   ├── route.ts         # GET/POST courses
│       │   └── [id]/route.ts    # DELETE course
│       ├── enrollments/
│       │   ├── route.ts         # GET/POST enrollments
│       │   └── [id]/route.ts    # DELETE enrollment
│       └── stats/
│           └── route.ts         # GET statistics
├── components/
│   ├── student-manager.tsx      # Student CRUD interface
│   ├── course-manager.tsx       # Course CRUD interface
│   ├── enrollment-manager.tsx   # Enrollment CRUD interface
│   └── stats-overview.tsx       # Statistics dashboard
├── scripts/
│   └── 01-init-database.sql     # Database schema and seed data
└── docs/
    ├── DATABASE_SCHEMA.md       # Database documentation
    ├── API_DOCUMENTATION.md     # API reference
    ├── USER_GUIDE.md            # User manual
    └── TECHNICAL_SPECIFICATIONS.md
\`\`\`

## Environment Variables Required

\`\`\`
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
\`\`\`

## Database Connection

The application uses the `@neondatabase/serverless` package for database connections:

\`\`\`typescript
import { neon } from '@neondatabase/serverless'
const sql = neon(process.env.DATABASE_URL!)
\`\`\`

## API Response Format

All API responses follow a consistent JSON format:

**Success Response:**
\`\`\`json
{
  "id": 1,
  "field1": "value1",
  "field2": "value2",
  ...
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "error": "Error description"
}
\`\`\`

## Performance Considerations

- **Database Queries**: All queries are parameterized to prevent SQL injection
- **Caching**: Client-side component state for minimal re-renders
- **Response Times**: Typical API response time: 100-300ms

## Security Features

- **SQL Injection Prevention**: All queries use parameterized statements
- **Input Validation**: Server-side validation on all endpoints
- **CORS**: Configured for same-origin requests
- **Environment Variables**: Sensitive data stored in environment variables

## Testing Sample Data

The database initialization script (`scripts/01-init-database.sql`) includes sample data:

**Students:**
- Александр Иванов (Active)
- Мария Петрова (Active)
- Сергей Сидоров (Active)
- Анна Смирнова (Active)
- Юрий Морозов (Graduated)

**Courses:**
- CS101: Основы программирования
- MATH201: Высшая математика
- ENG102: Деловой английский
- CS202: Структуры данных
- DB301: Системы управления БД

**Enrollments:**
- 10 enrollment records with various statuses and grades

## Deployment Steps

1. **Clone/Download**: Get the project files
2. **Setup Database**:
   - Connect Neon PostgreSQL integration
   - Add DATABASE_URL to environment variables
3. **Run Migration**:
   - Execute `scripts/01-init-database.sql` script
4. **Deploy to Vercel**:
   - Push to GitHub or use Vercel CLI
   - Vercel automatically builds and deploys

## Future Enhancements

- User authentication and role-based access
- Data export (CSV, PDF)
- Advanced filtering and search
- Attendance tracking
- Grade distribution analytics
- Email notifications
- Batch operations
