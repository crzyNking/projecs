import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export type Theme = 'dark' | 'light' | 'system'

export interface UserPreferences {
  id: string
  user_id: string
  theme: Theme
  email_notifications: boolean
  push_notifications: boolean
  marketing_emails: boolean
  created_at: string
  updated_at: string
}

interface PreferencesState {
  preferences: UserPreferences | null
  loading: boolean
  error: string | null
  fetchPreferences: (userId: string) => Promise<void>
  updatePreferences: (userId: string, updates: Partial<Omit<UserPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => Promise<void>
  setTheme: (theme: Theme) => void
  clearPreferences: () => void
}

const defaultPreferences: Omit<UserPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  theme: 'dark',
  email_notifications: true,
  push_notifications: true,
  marketing_emails: false
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  preferences: null,
  loading: false,
  error: null,

  fetchPreferences: async (userId: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        set({ preferences: data })
        get().setTheme(data.theme)
      } else {
        // Create default preferences
        const { data: newData, error: insertError } = await supabase
          .from('user_preferences')
          .insert({ user_id: userId, ...defaultPreferences })
          .select()
          .single()

        if (insertError) throw insertError
        set({ preferences: newData })
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch preferences' })
    } finally {
      set({ loading: false })
    }
  },

  updatePreferences: async (userId: string, updates) => {
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', userId)

      if (error) throw error

      set((state) => ({
        preferences: state.preferences ? { ...state.preferences, ...updates } : null
      }))

      if (updates.theme) {
        get().setTheme(updates.theme)
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update preferences' })
    }
  },

  setTheme: (theme: Theme) => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  },

  clearPreferences: () => set({ preferences: null })
}))
