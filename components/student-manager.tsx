'use client'

import { useEffect, useState } from 'react'
import { Trash2, Plus, X } from 'lucide-react'

interface Student {
  id: number
  name: string
  email: string
  phone: string
  status: string
  enrollment_date: string
}

interface StudentManagerProps {
  onUpdate: () => void
}

export function StudentManager({ onUpdate }: StudentManagerProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'active' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const res = await fetch('/api/students')
      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error('Failed to fetch students:', error)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setFormData({ name: '', email: '', phone: '', status: 'active' })
        setShowForm(false)
        await fetchStudents()
        onUpdate()
      }
    } catch (error) {
      console.error('Failed to add student:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (confirm('Удалить студента?')) {
      try {
        const res = await fetch(`/api/students/${id}`, { method: 'DELETE' })
        if (res.ok) {
          await fetchStudents()
          onUpdate()
        }
      } catch (error) {
        console.error('Failed to delete student:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Студенты</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Добавить студента
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Новый студент</h3>
            <button type="button" onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="ФИО"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="active">Активный</option>
              <option value="inactive">Неактивный</option>
              <option value="graduated">Выпускник</option>
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
        {students.length === 0 ? (
          <p className="text-slate-400 text-center py-8">Нет студентов в системе</p>
        ) : (
          students.map(student => (
            <div key={student.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">{student.name}</h3>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                <div>Email: {student.email}</div>
                <div>Телефон: {student.phone || 'N/A'}</div>
                <div>Статус: <span className={`px-2 py-1 rounded text-xs ${student.status === 'active' ? 'bg-green-500/20 text-green-300' : student.status === 'graduated' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>{student.status}</span></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
