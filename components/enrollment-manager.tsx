'use client'

import { useEffect, useState } from 'react'
import { Trash2, Plus, X } from 'lucide-react'

interface Enrollment {
  id: number
  student_name: string
  course_title: string
  course_code: string
  grade: string
  completion_status: string
  enrollment_date: string
}

interface EnrollmentManagerProps {
  onUpdate: () => void
}

export function EnrollmentManager({ onUpdate }: EnrollmentManagerProps) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [showForm, setShowForm] = useState(false)
  const [students, setStudents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [formData, setFormData] = useState({ student_id: '', course_id: '', grade: '', completion_status: 'enrolled' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchEnrollments()
    fetchStudents()
    fetchCourses()
  }, [])

  async function fetchEnrollments() {
    try {
      const res = await fetch('/api/enrollments')
      const data = await res.json()
      setEnrollments(data)
    } catch (error) {
      console.error('Failed to fetch enrollments:', error)
    }
  }

  async function fetchStudents() {
    try {
      const res = await fetch('/api/students')
      setStudents(await res.json())
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  async function fetchCourses() {
    try {
      const res = await fetch('/api/courses')
      setCourses(await res.json())
    } catch (error) {
      console.error('Failed to fetch courses:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormData({ student_id: '', course_id: '', grade: '', completion_status: 'enrolled' })
        setShowForm(false)
        await fetchEnrollments()
        onUpdate()
      } else {
        alert('Студент уже записан на этот курс')
      }
    } catch (error) {
      console.error('Failed to add enrollment:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Удалить запись?')) {
      try {
        const res = await fetch(`/api/enrollments/${id}`, { method: 'DELETE' })
        if (res.ok) {
          await fetchEnrollments()
          onUpdate()
        }
      } catch (error) {
        console.error('Failed to delete enrollment:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Записи на курсы</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить запись
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Новая запись</h3>
            <button type="button" onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              value={formData.student_id}
              onChange={e => setFormData({ ...formData, student_id: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Выберите студента</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <select
              value={formData.course_id}
              onChange={e => setFormData({ ...formData, course_id: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Выберите курс</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Оценка (например: A, B+)"
              value={formData.grade}
              onChange={e => setFormData({ ...formData, grade: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <select
              value={formData.completion_status}
              onChange={e => setFormData({ ...formData, completion_status: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="enrolled">Записан</option>
              <option value="completed">Завершен</option>
              <option value="dropped">Отклонен</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {enrollments.length === 0 ? (
          <p className="text-slate-400 text-center py-8">Нет записей в системе</p>
        ) : (
          enrollments.map(enrollment => (
            <div key={enrollment.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-white font-semibold">{enrollment.student_name}</h3>
                  <p className="text-slate-400 text-sm">{enrollment.course_title} ({enrollment.course_code})</p>
                </div>
                <button
                  onClick={() => handleDelete(enrollment.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm text-slate-400">
                <div>Оценка: {enrollment.grade || 'N/A'}</div>
                <div>Статус: <span className={`px-2 py-1 rounded text-xs ${enrollment.completion_status === 'enrolled' ? 'bg-yellow-500/20 text-yellow-300' : enrollment.completion_status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{enrollment.completion_status}</span></div>
                <div>Дата: {new Date(enrollment.enrollment_date).toLocaleDateString('ru-RU')}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
