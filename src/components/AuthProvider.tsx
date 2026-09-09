import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useAuthStore } from '../store/authStore'
import { usePreferencesStore } from '../store/preferencesStore'
import { useActivityStore } from '../store/activityStore'
import { supabase } from '../lib/supabase'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setSession, setLoading, fetchProfile } = useAuthStore()
  const { fetchPreferences } = usePreferencesStore()
  const { logActivity } = useActivityStore()

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
          await fetchPreferences(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchProfile(session.user.id)
          await fetchPreferences(session.user.id)
          if (event === 'SIGNED_IN') {
            await logActivity(session.user.id, 'sign_in')
          }
        } else {
          useAuthStore.getState().setProfile(null)
          usePreferencesStore.getState().clearPreferences()
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, setSession, setLoading, fetchProfile, fetchPreferences, logActivity])

  return <>{children}</>
}