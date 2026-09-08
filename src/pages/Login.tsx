import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function Login() {
  const { user, loading, signInWithGoogle, error } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard'

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, from])

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border-[3px] border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 border-[3px] border-transparent border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500/10 to-cyan-500/10 blur-xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden px-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[140px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-50 blur-xl" />
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25">
                <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-gray-500">Sign in to access your dashboard</p>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] shadow-2xl shadow-black/20">
          {/* Card glow */}
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-500/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-cyan-500/8 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            {error && (
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3.5 sm:p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-white py-3.5 sm:py-4 px-5 font-semibold text-gray-800 shadow-lg shadow-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-sm sm:text-base">Continue with Google</span>
              </span>
            </button>

            <div className="my-6 sm:my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-gray-600">or</span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="space-y-3">
              {[
                { icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Secure OAuth 2.0 authentication' },
                { icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z', text: 'No password required' },
                { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', text: 'Access your dashboard instantly' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/[0.08] ring-1 ring-emerald-500/20">
                    <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 text-center text-[11px] text-gray-600 px-2">
          By signing in, you agree to our{' '}
          <a href="#" className="text-purple-400/80 hover:text-purple-300 transition-colors underline underline-offset-2 decoration-purple-400/30">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-purple-400/80 hover:text-purple-300 transition-colors underline underline-offset-2 decoration-purple-400/30">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
