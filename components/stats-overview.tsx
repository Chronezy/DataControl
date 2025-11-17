'use client'

import { BookOpen, Users, Link2 } from 'lucide-react'

interface StatsOverviewProps {
  stats: {
    students: number
    courses: number
    enrollments: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      label: 'Всего студентов',
      value: stats.students,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Всего курсов',
      value: stats.courses,
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Активных записей',
      value: stats.enrollments,
      icon: Link2,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className={`${card.bgColor} border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-br ${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-slate-400 text-sm font-medium mb-1">{card.label}</div>
            <div className="text-4xl font-bold text-white">{card.value}</div>
          </div>
        )
      })}
    </div>
  )
}
