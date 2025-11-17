CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated'))
);

CREATE TABLE IF NOT EXISTS courses (
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

CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  grade VARCHAR(2),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completion_status VARCHAR(50) DEFAULT 'enrolled' CHECK (completion_status IN ('enrolled', 'completed', 'dropped')),
  UNIQUE(student_id, course_id)
);

INSERT INTO students (name, email, phone, status) VALUES
  ('Александр Иванов', 'ivan@university.edu', '+7-999-111-2233', 'active'),
  ('Мария Петрова', 'maria@university.edu', '+7-999-444-5566', 'active'),
  ('Сергей Сидоров', 'sergey@university.edu', '+7-999-777-8899', 'active'),
  ('Анна Смирнова', 'anna@university.edu', '+7-999-222-3344', 'active'),
  ('Юрий Морозов', 'yuri@university.edu', '+7-999-555-6677', 'graduated');

INSERT INTO courses (code, title, description, instructor, credits, max_students, start_date, end_date) VALUES
  ('CS101', 'Основы программирования', 'Введение в Python и основные концепции', 'Профессор Кузнецов', 3, 30, '2024-09-01', '2024-12-15'),
  ('MATH201', 'Высшая математика', 'Линейная алгебра и математический анализ', 'Профессор Лебедев', 4, 25, '2024-09-01', '2024-12-15'),
  ('ENG102', 'Деловой английский', 'Развитие навыков делового общения', 'Профессор Соколова', 2, 20, '2024-09-15', '2024-12-20'),
  ('CS202', 'Структуры данных', 'Алгоритмы и структуры данных', 'Профессор Орлов', 3, 28, '2024-10-01', '2025-01-10'),
  ('DB301', 'Системы управления БД', 'SQL и проектирование баз данных', 'Профессор Волков', 3, 22, '2024-11-01', '2025-02-15');

INSERT INTO enrollments (student_id, course_id, grade, completion_status) VALUES
  (1, 1, 'A', 'completed'),
  (1, 2, 'B+', 'enrolled'),
  (2, 1, 'A', 'completed'),
  (2, 3, 'A', 'completed'),
  (3, 2, 'B', 'enrolled'),
  (3, 4, NULL, 'enrolled'),
  (4, 1, 'A-', 'completed'),
  (4, 5, NULL, 'enrolled'),
  (5, 1, 'A', 'completed'),
  (5, 2, 'B+', 'completed');
