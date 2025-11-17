'use client'

import { useEffect, useState } from 'react'
import { StudentManager } from '@/components/student-manager'
import { CourseManager } from '@/components/course-manager'
import { EnrollmentManager } from '@/components/enrollment-manager'
import { StatsOverview } from '@/components/stats-overview'
import { BookOpen, Users, GitBranch, AlertCircle } from 'lucide-react'

type Tab = 'students' | 'courses' | 'enrollments' | 'stats'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('stats')
  const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  async function fetchStats() {
    try {
      setError(null)
      const res = await fetch('/api/stats')
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Failed to fetch stats')
        return
      }
      
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      setError('Failed to connect to server')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-900 border-b border-yellow-700 px-4 py-4">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-100 font-semibold">Database Configuration Required</p>
              <p className="text-yellow-200 text-sm mt-1">{error}</p>
              <p className="text-yellow-200 text-sm mt-2">Please add the DATABASE_URL environment variable in the Vars section of the sidebar.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Система управления данными</h1>
              <p className="text-slate-400 text-sm">Управление студентами, курсами и записями</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'stats', label: 'Обзор', icon: GitBranch },
              { id: 'students', label: 'Студенты', icon: Users },
              { id: 'courses', label: 'Курсы', icon: BookOpen },
              { id: 'enrollments', label: 'Записи', icon: GitBranch }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'stats' && <StatsOverview stats={stats} />}
        {activeTab === 'students' && <StudentManager onUpdate={fetchStats} />}
        {activeTab === 'courses' && <CourseManager onUpdate={fetchStats} />}
        {activeTab === 'enrollments' && <EnrollmentManager onUpdate={fetchStats} />}
      </div>
    </main>
  )
}
