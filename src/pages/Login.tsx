import { useEffect, useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export function Login() {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, error, setError } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard'

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailPending, setEmailPending] = useState(false)
  const [pendingEmail, setPendingEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, from])

  useEffect(() => {
    setError(null)
    setSuccessMessage('')
    setAgreeToTerms(false)
  }, [isSignUp, setError])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSignUp && !agreeToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    setSubmitting(true)
    setSuccessMessage('')
    setError(null)

    if (isSignUp) {
      const result = await signUpWithEmail(email, password, fullName)
      if (result.success) {
        if (result.message.includes('check your email')) {
          setPendingEmail(email)
          setEmailPending(true)
          setEmail('')
          setPassword('')
          setFullName('')
          setAgreeToTerms(false)
        } else {
          setSuccessMessage(result.message)
        }
      } else {
        setError(result.message)
      }
    } else {
      const success = await signInWithEmail(email, password)
      if (success) {
        navigate(from, { replace: true })
      }
    }

    setSubmitting(false)
  }

  const handleResendEmail = useCallback(async () => {
    if (resendCooldown > 0 || !pendingEmail) return
    setResending(true)
    try {
      const result = await signUpWithEmail(pendingEmail, password || 'temp', fullName || 'User')
      if (result.success || result.message.includes('already')) {
        setResendCooldown(60)
      }
    } catch {
      setResendCooldown(60)
    }
    setResending(false)
  }, [pendingEmail, password, fullName, resendCooldown])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#07070d] transition-colors">
        <div className="relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 border-[3px] border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 border-[3px] border-transparent border-b-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  if (emailPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#07070d] relative overflow-hidden px-4 transition-colors">
        <div className="pointer-events-none absolute inset-0 dark:block hidden">
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[130px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/50 dark:border-white/[0.06] bg-white/80 dark:bg-white/[0.02] backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30">
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative p-8 sm:p-10 text-center">
              <div className="relative mx-auto mb-8 w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Check your email
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                We sent a confirmation link to
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.06] rounded-lg px-4 py-2.5 mb-6 break-all">
                {pendingEmail}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Click the link in the email to verify your account and continue.
              </p>

              <button
                onClick={() => {
                  setEmailPending(false)
                  setPendingEmail('')
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99]"
              >
                Back to Sign In
              </button>

              <div className="mt-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Didn't receive the email?</p>
                <button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0 || resending}
                  className="text-sm font-medium text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {resending ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#07070d] relative overflow-hidden transition-colors">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
          <div className="absolute top-1/3 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/6 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-40 blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-2xl shadow-purple-500/30">
                <svg className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Build something
            <span className="block mt-1 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              amazing today
            </span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            Access your dashboard, manage projects, and collaborate with your team all in one place.
          </p>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Fast & Reliable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative">
        <div className="pointer-events-none absolute inset-0 dark:block hidden lg:block">
          <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-purple-600/6 blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-50 blur-xl" />
                <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25">
                  <svg className="h-7 w-7 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8 lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {isSignUp ? 'Start your journey with us today' : 'Sign in to continue to your dashboard'}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[1.5rem] border border-gray-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-purple-500/8 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-cyan-500/8 blur-3xl" />

            <div className="relative p-6 sm:p-8">
              {error && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/[0.06] p-3.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-500/10">
                    <svg className="h-4 w-4 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.06] p-3.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/10">
                    <svg className="h-4 w-4 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-emerald-600 dark:text-emerald-300">{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full px-4 py-3.5 pr-12 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {isSignUp && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">Must be at least 6 characters</p>
                  )}
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-gray-50 dark:bg-white/[0.04] cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">Remember me</span>
                    </label>
                    <button type="button" className="text-sm font-medium text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                {isSignUp && (
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      required
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 dark:border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-gray-50 dark:bg-white/[0.04] cursor-pointer"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      I agree to the{' '}
                      <button type="button" onClick={() => setShowTerms(true)} className="font-medium text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 underline underline-offset-2 decoration-purple-500/30 dark:decoration-purple-400/30">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" onClick={() => setShowPrivacy(true)} className="font-medium text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 underline underline-offset-2 decoration-purple-500/30 dark:decoration-purple-400/30">
                        Privacy Policy
                      </button>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || (isSignUp && !agreeToTerms)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-purple-500/20"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {isSignUp ? 'Creating account...' : 'Signing in...'}
                    </span>
                  ) : (
                    isSignUp ? 'Create account' : 'Sign in'
                  )}
                </button>
              </form>

              <div className="flex items-center gap-4 my-6">
                <div className="h-px flex-1 bg-gray-200 dark:bg-white/[0.06]" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-gray-400 dark:text-gray-600">or</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-white/[0.06]" />
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-white dark:bg-white/[0.04] py-3.5 px-5 font-semibold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-white/[0.08] shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-white/[0.12] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm">Continue with Google</span>
                </span>
              </button>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError(null)
                    setSuccessMessage('')
                  }}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  {isSignUp ? (
                    <>Already have an account? <span className="font-semibold text-purple-500 dark:text-purple-400">Sign in</span></>
                  ) : (
                    <>Don't have an account? <span className="font-semibold text-purple-500 dark:text-purple-400">Sign up</span></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-[#141420] rounded-2xl border border-gray-200 dark:border-white/[0.08] shadow-2xl overflow-hidden">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1a1a2e]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Terms of Service</h2>
              <button onClick={() => setShowTerms(false)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/[0.06] transition-colors">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <h3>2. Use License</h3>
                <p>Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
                <h3>3. User Account</h3>
                <p>To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
                <h3>4. Privacy</h3>
                <p>Your use of this application is also governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
                <h3>5. Prohibited Uses</h3>
                <p>You may not use this application for any unlawful purpose or to solicit the performance of any illegal activity or other conduct which infringes the rights of others.</p>
                <h3>6. Termination</h3>
                <p>We may terminate or suspend your account and access to the application immediately, without prior notice, for conduct that we determine, in our sole discretion, violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>
                <h3>7. Changes to Terms</h3>
                <p>We reserve the right to modify these Terms at any time. Continued use of the application after any such changes shall constitute your consent to such changes.</p>
                <h3>8. Contact</h3>
                <p>If you have any questions about these Terms, please contact us through the application support channels.</p>
              </div>
            </div>
            <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1a1a2e]">
              <button onClick={() => setShowTerms(false)} className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[80vh] bg-white dark:bg-[#141420] rounded-2xl border border-gray-200 dark:border-white/[0.08] shadow-2xl overflow-hidden">
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1a1a2e]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy Policy</h2>
              <button onClick={() => setShowPrivacy(false)} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/[0.06] transition-colors">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support. This may include your name, email address, and profile picture.</p>
                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to communicate with you about products, services, and events.</p>
                <h3>3. Information Sharing</h3>
                <p>We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, and customer support.</p>
                <h3>4. Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <h3>5. Data Retention</h3>
                <p>We retain your personal information for as long as your account is active or as needed to provide you services. We will also retain your information as necessary to comply with legal obligations.</p>
                <h3>6. Your Rights</h3>
                <p>You have the right to access, correct, or delete your personal information. You may also have the right to port your data and to restrict or object to certain processing activities.</p>
                <h3>7. Cookies</h3>
                <p>We use cookies and similar technologies to maintain your session and improve your experience. You can control cookies through your browser settings.</p>
                <h3>8. Children's Privacy</h3>
                <p>Our application is not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>
                <h3>9. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
                <h3>10. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us through the application support channels.</p>
              </div>
            </div>
            <div className="sticky bottom-0 p-4 border-t border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#1a1a2e]">
              <button onClick={() => setShowPrivacy(false)} className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
