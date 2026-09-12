import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export interface AdminUser {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Enrollment {
  id: string
  user_id: string | null
  level: string
  student_data: Record<string, unknown>
  status: 'pending' | 'approved' | 'rejected'
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  details: Record<string, unknown> | null
  created_at: string
  user_email?: string
  user_name?: string
}

export interface AdminStats {
  totalUsers: number
  totalEnrollments: number
  pendingEnrollments: number
  recentActivityCount: number
}

interface AdminState {
  users: AdminUser[]
  enrollments: Enrollment[]
  activities: ActivityLog[]
  stats: AdminStats
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  fetchEnrollments: (filters?: { status?: string; level?: string; search?: string }) => Promise<void>
  updateEnrollmentStatus: (id: string, status: 'approved' | 'rejected', notes?: string) => Promise<boolean>
  fetchActivityLogs: (filters?: { userId?: string; action?: string }) => Promise<void>
  fetchStats: () => Promise<void>
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  enrollments: [],
  activities: [],
  stats: { totalUsers: 0, totalEnrollments: 0, pendingEnrollments: 0, recentActivityCount: 0 },
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ users: data || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch users' })
    } finally {
      set({ loading: false })
    }
  },

  fetchEnrollments: async (filters) => {
    set({ loading: true, error: null })
    try {
      let query = supabase
        .from('enrollments')
        .select('*')
        .order('created_at', { ascending: false })

      if (filters?.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }
      if (filters?.level && filters.level !== 'all') {
        query = query.eq('level', filters.level)
      }
      if (filters?.search) {
        query = query.ilike('student_data->>\'firstName\'', `%${filters.search}%`)
      }

      const { data, error } = await query
      if (error) throw error
      set({ enrollments: data || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch enrollments' })
    } finally {
      set({ loading: false })
    }
  },

  updateEnrollmentStatus: async (id, status, notes) => {
    try {
      const updateData: Record<string, unknown> = { status }
      if (notes !== undefined) updateData.admin_notes = notes

      const { error } = await supabase
        .from('enrollments')
        .update(updateData)
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        enrollments: state.enrollments.map((e) =>
          e.id === id ? { ...e, status, admin_notes: notes ?? e.admin_notes } : e
        ),
      }))
      return true
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update enrollment' })
      return false
    }
  },

  fetchActivityLogs: async (filters) => {
    set({ loading: true, error: null })
    try {
      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200)

      if (filters?.userId) {
        query = query.eq('user_id', filters.userId)
      }
      if (filters?.action) {
        query = query.eq('action', filters.action)
      }

      const { data, error } = await query
      if (error) throw error

      set({ activities: data || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch activity logs' })
    } finally {
      set({ loading: false })
    }
  },

  fetchStats: async () => {
    try {
      const [usersRes, enrollmentsRes, activityRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('enrollments').select('id, status'),
        supabase.from('activity_logs').select('id', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ])

      const totalEnrollments = enrollmentsRes.data?.length ?? 0
      const pendingEnrollments = enrollmentsRes.data?.filter((e) => e.status === 'pending').length ?? 0

      set({
        stats: {
          totalUsers: usersRes.count ?? 0,
          totalEnrollments,
          pendingEnrollments,
          recentActivityCount: activityRes.count ?? 0,
        },
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  },
}))
