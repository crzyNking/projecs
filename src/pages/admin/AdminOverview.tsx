import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'

export default function AdminOverview() {
  const { stats, enrollments, fetchStats, fetchEnrollments } = useAdminStore()

  useEffect(() => {
    fetchStats()
    fetchEnrollments()
  }, [fetchStats, fetchEnrollments])

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
      ),
      color: 'bg-blue-500',
      link: '/admin/users',
    },
    {
      label: 'Total Enrollments',
      value: stats.totalEnrollments,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      color: 'bg-emerald-500',
      link: '/admin/enrollments',
    },
    {
      label: 'Pending Approvals',
      value: stats.pendingEnrollments,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      color: 'bg-amber-500',
      link: '/admin/enrollments',
    },
    {
      label: 'Activity (7d)',
      value: stats.recentActivityCount,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      ),
      color: 'bg-purple-500',
      link: '/admin/activity',
    },
  ]

  const recentEnrollments = enrollments.slice(0, 5)

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  const levelLabels: Record<string, string> = {
    kindergarten: 'Kindergarten',
    elementary: 'Elementary',
    'junior-high': 'Junior High',
    'senior-high': 'Senior High',
    college: 'College',
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-xl border border-gray-200 p-3 sm:p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2.5 sm:gap-4">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 ${card.color} rounded-xl flex items-center justify-center text-white shrink-0`}>
                {card.icon}
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-500">{card.label}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-800">Recent Enrollments</h2>
          <Link to="/admin/enrollments" className="text-[10px] sm:text-xs text-[#0b1f40] font-medium hover:underline">
            View All
          </Link>
        </div>
        {recentEnrollments.length === 0 ? (
          <div className="px-4 sm:px-6 py-8 sm:py-10 text-center text-xs sm:text-sm text-gray-400">No enrollments yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="text-left px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Level</th>
                  <th className="text-left px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((enrollment) => {
                  const data = enrollment.student_data as Record<string, string>
                  const studentName = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown'
                  return (
                    <tr key={enrollment.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-2.5 sm:py-3">
                        <div className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">{studentName}</div>
                        <div className="text-[10px] text-gray-400 sm:hidden">{levelLabels[enrollment.level]}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-2.5 sm:py-3 text-gray-600 hidden sm:table-cell">{levelLabels[enrollment.level] || enrollment.level}</td>
                      <td className="px-4 sm:px-6 py-2.5 sm:py-3">
                        <span className={`inline-block px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${statusColors[enrollment.status]}`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-2.5 sm:py-3 text-gray-500 hidden md:table-cell">{new Date(enrollment.created_at).toLocaleDateString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
