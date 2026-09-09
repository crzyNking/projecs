import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('Completing sign in...')

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code')
      const errorParam = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')
      const type = searchParams.get('type')

      if (errorParam) {
        setError(errorDescription || errorParam)
        setStatus('Authentication failed')
        setTimeout(() => navigate('/login'), 3000)
        return
      }

      // Handle email confirmation
      if (type === 'signup' || type === 'magiclink') {
        setStatus('Confirming your email...')
      }

      if (code) {
        try {
          setStatus('Verifying credentials...')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) throw error
          setStatus('Email confirmed! Redirecting...')
          setTimeout(() => navigate('/dashboard', { replace: true }), 500)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Authentication failed')
          setStatus('Redirecting to login...')
          setTimeout(() => navigate('/login'), 3000)
        }
      } else {
        setStatus('Checking session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error || !session) {
          setError('No session found. Please try signing in again.')
          setStatus('Redirecting to login...')
          setTimeout(() => navigate('/login'), 3000)
        } else {
          setStatus('Success! Redirecting...')
          setTimeout(() => navigate('/dashboard', { replace: true }), 500)
        }
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0f] relative overflow-hidden transition-colors">
      {/* Background Effects - only visible in dark mode */}
      <div className="absolute inset-0 overflow-hidden dark:block hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          {error ? (
            <>
              {/* Error State */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Authentication Error</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
              <div className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 text-sm">
                <div className="w-4 h-4 border-2 border-gray-400 dark:border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Redirecting to login...</span>
              </div>
            </>
          ) : (
            <>
              {/* Loading State */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600 dark:text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Your Identity</h2>
              <p className="text-gray-500 dark:text-gray-400">{status}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
