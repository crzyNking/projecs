import { create } from 'zustand'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  fetchProfile: (userId: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  uploadAvatar: (file: File) => Promise<string | null>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  profile: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      set({ profile: data })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  },
  signInWithGoogle: async () => {
    set({ error: null })
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign in' })
    }
  },
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null, session: null, profile: null })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign out' })
    }
  },
  uploadAvatar: async (file: File): Promise<string | null> => {
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
      set({ error: 'Not authenticated' })
      return null
    }

    try {
      // Create unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/avatar.${fileExt}`

      // Delete existing avatar if any
      await supabase.storage.from('avatars').remove([fileName])

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Add cache-busting query param
      const avatarUrl = `${publicUrl}?t=${Date.now()}`

      // Update profile in database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
        .eq('id', userId)

      if (updateError) throw updateError

      // Update local state
      set((state) => ({
        profile: state.profile ? { ...state.profile, avatar_url: avatarUrl } : null
      }))

      return avatarUrl
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to upload avatar' })
      return null
    }
  },
}))