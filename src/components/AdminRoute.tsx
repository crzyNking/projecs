import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { isAdmin } from '../lib/admin'

interface AdminRouteProps {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#0b1f40]/20 border-t-[#0b1f40] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin(user.email)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
