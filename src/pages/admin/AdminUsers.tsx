import { useEffect, useState } from 'react'
import { useAdminStore } from '../../store/adminStore'

export default function AdminUsers() {
  const { users, loading, fetchUsers } = useAdminStore()
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filtered = users.filter((user) => {
    const q = search.toLowerCase()
    return (
      user.full_name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500">{users.length} registered users</p>
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0b1f40]/20 focus:border-[#0b1f40] w-full sm:w-[280px] transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="px-6 py-10 text-center">
            <div className="w-8 h-8 border-4 border-[#0b1f40]/20 border-t-[#0b1f40] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-400">Loading users...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">
            {search ? 'No users match your search' : 'No users yet'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0b1f40] flex items-center justify-center text-xs font-bold text-white overflow-hidden shrink-0">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            (user.full_name?.[0] || user.email?.[0] || '?').toUpperCase()
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{user.full_name || 'No name'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{user.email || '-'}</td>
                    <td className="px-6 py-3 text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
