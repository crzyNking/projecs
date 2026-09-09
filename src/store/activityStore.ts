import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  details: Record<string, unknown> | null
  created_at: string
}

interface ActivityState {
  activities: ActivityLog[]
  loading: boolean
  error: string | null
  fetchActivities: (userId: string, limit?: number) => Promise<void>
  logActivity: (userId: string, action: string, details?: Record<string, unknown>) => Promise<void>
  clearActivities: () => void
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivities: async (userId: string, limit = 10) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      set({ activities: data || [] })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch activities' })
    } finally {
      set({ loading: false })
    }
  },

  logActivity: async (userId: string, action: string, details?: Record<string, unknown>) => {
    try {
      const { error } = await supabase
        .from('activity_logs')
        .insert({
          user_id: userId,
          action,
          details: details || null
        })

      if (error) throw error
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  },

  clearActivities: () => set({ activities: [] })
}))
