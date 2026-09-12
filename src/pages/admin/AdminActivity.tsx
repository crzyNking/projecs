import { useEffect, useState } from 'react'
import { useAdminStore } from '../../store/adminStore'

const actionColors: Record<string, string> = {
  sign_in: 'bg-blue-100 text-blue-700',
  sign_up: 'bg-green-100 text-green-700',
  sign_out: 'bg-gray-100 text-gray-600',
  profile_update: 'bg-purple-100 text-purple-700',
  avatar_upload: 'bg-pink-100 text-pink-700',
  enrollment_submit: 'bg-amber-100 text-amber-700',
}

export default function AdminActivity() {
  const { activities, loading, fetchActivityLogs } = useAdminStore()
  const [actionFilter, setActionFilter] = useState('')

  useEffect(() => {
    fetchActivityLogs({ action: actionFilter || undefined })
  }, [fetchActivityLogs, actionFilter])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Activity Logs</h2>
        <p className="text-xs sm:text-sm text-gray-500">{activities.length} recent activities</p>
      </div>

      {/* Filters */}
      <div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f40]/20 focus:border-[#0b1f40]"
        >
          <option value="">All Actions</option>
          <option value="sign_in">Sign In</option>
          <option value="sign_up">Sign Up</option>
          <option value="sign_out">Sign Out</option>
          <option value="profile_update">Profile Update</option>
          <option value="avatar_upload">Avatar Upload</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hidden md:block">
        {loading ? (
          <div className="px-6 py-10 text-center">
            <div className="w-8 h-8 border-4 border-[#0b1f40]/20 border-t-[#0b1f40] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading activity logs...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">No activity logs found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">User ID</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Details</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <span className="font-mono text-xs text-gray-500 truncate block max-w-[160px]" title={log.user_id}>{log.user_id.slice(0, 8)}...</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-600'}`}>{log.action}</span>
                    </td>
                    <td className="px-6 py-3 text-gray-600 text-xs max-w-[200px] truncate">{log.details ? JSON.stringify(log.details) : '-'}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-8 text-center">
            <div className="w-8 h-8 border-4 border-[#0b1f40]/20 border-t-[#0b1f40] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading activity logs...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-8 text-center text-sm text-gray-400">No activity logs found</div>
        ) : (
          activities.map((log) => (
            <div key={log.id} className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${actionColors[log.action] || 'bg-gray-100 text-gray-600'}`}>{log.action}</span>
                <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">{new Date(log.created_at).toLocaleString()}</span>
              </div>
              <div className="font-mono text-[10px] text-gray-400 mb-1" title={log.user_id}>User: {log.user_id.slice(0, 12)}...</div>
              {log.details && <div className="text-[10px] sm:text-xs text-gray-500 truncate">Details: {JSON.stringify(log.details)}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
