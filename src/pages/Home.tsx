import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Header from '../components/Header'
import Footer from '../components/Footer'

const heroStyle = { background: "linear-gradient(rgba(11, 31, 64, 0.45), rgba(11, 31, 64, 0.45)), url(https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop) center/cover no-repeat" }
const authModalBackdrop = { background: 'rgba(3, 8, 20, 0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }

type AuthMode = 'login' | 'signup'

const academicCards = [
  {
    title: 'Basic Education',
    desc: 'Building strong foundations in character, academics, and lifelong learning from kindergarten through junior high school.',
    icon: (
      <svg className="w-10 h-10 text-[#1e40af]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    link: '/senior-high',
  },
  {
    title: 'Senior High School',
    desc: 'Specialized academic tracks including STEM, ABM, and HUMSS, preparing students for higher education and careers.',
    icon: (
      <svg className="w-10 h-10 text-[#1e40af]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    link: '/senior-high',
  },
  {
    title: 'Higher Education',
    desc: 'College degree programs in IT, Business, Education, and more — equipping graduates for professional success.',
    icon: (
      <svg className="w-10 h-10 text-[#1e40af]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    link: '/enrollment/college',
  },
]

const features = [
  {
    title: 'Affordable Tuition',
    desc: 'Quality education made accessible with competitive tuition rates and flexible payment options.',
    icon: (
      <svg className="w-6 h-6 text-[#1e40af]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: 'Diverse Community',
    desc: 'A welcoming environment where students from different backgrounds learn and grow together.',
    icon: (
      <svg className="w-6 h-6 text-[#1e40af]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
]

export function Home() {
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const signInWithEmail = useAuthStore((s) => s.signInWithEmail)
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail)
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle)
  const error = useAuthStore((s) => s.error)
  const setError = useAuthStore((s) => s.setError)
  const navigate = useNavigate()

  const [authModal, setAuthModal] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: 'login' })
  const [authTab, setAuthTab] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const openAuth = useCallback((mode: AuthMode) => {
    setAuthTab(mode)
    setAuthModal({ open: true, mode })
    setError(null)
  }, [setError])

  const closeAuth = useCallback(() => {
    setAuthModal({ open: false, mode: 'login' })
    setEmail('')
    setPassword('')
    setFullName('')
    setError(null)
  }, [setError])

  useEffect(() => {
    if (user && !loading) {
      closeAuth()
      navigate('/dashboard')
    }
  }, [user, loading, closeAuth, navigate])

  const handleAuth = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    if (authTab === 'login') {
      await signInWithEmail(email, password)
    } else {
      const result = await signUpWithEmail(email, password, fullName)
      if (result.success && result.message.includes('check your email')) {
        return
      }
    }

    setSubmitting(false)
  }, [authTab, email, password, fullName, signInWithEmail, signUpWithEmail, closeAuth, navigate, setError])

  const handleGoogleLogin = useCallback(async () => {
    await signInWithGoogle()
  }, [signInWithGoogle])

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#333333] overflow-x-hidden">
      <Header />

      <section className="relative py-16 px-4 sm:py-24 text-center text-white" style={heroStyle}>
        <p className="text-[#eab308] text-2xl sm:text-4xl md:text-[38px] font-semibold tracking-[4px] sm:tracking-[8px] mb-6 sm:mb-[30px] mt-6 sm:mt-10">
          宿務 東方 學院
        </p>

        <div className="max-w-[820px] mx-auto rounded-xl p-6 sm:p-10 md:p-[45px_50px] shadow-[0_20px_40px_rgba(0,0,0,0.35)] outline outline-1 outline-offset-[-8px] outline-white/15 bg-[rgba(8,30,92,0.88)] border border-white/20 backdrop-blur-[12px]">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold leading-[1.25] mb-4 sm:mb-5">
            Excellence in Education<br />since 1915
          </h1>
          <p className="text-xs sm:text-[13.5px] text-[#cbd5e1] max-w-[580px] mx-auto mb-6 sm:mb-[30px] leading-relaxed">
            Be part of the Easternian Community, where quality education is less expensive. Join Cebu City's premier institution for holistic development.
          </p>
          <div className="flex justify-center gap-3 sm:gap-4">
            <button
              onClick={() => openAuth('login')}
              className="px-5 sm:px-8 py-2 rounded-md text-xs sm:text-[12px] font-semibold bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="px-5 sm:px-8 py-2 rounded-md text-xs sm:text-[12px] font-semibold bg-transparent text-white border border-white/70 hover:bg-white/10 transition-all"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-[60px] px-4 sm:px-10 bg-[#f8fafc] text-center">
        <h2 className="text-xl sm:text-[26px] font-extrabold text-[#002366] mb-2">Academic Excellence</h2>
        <p className="text-xs sm:text-[13px] text-[#64748b] mb-8 sm:mb-[45px]">Comprehensive educational programs designed to nurture future leaders.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1100px] mx-auto">
          {academicCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg p-6 sm:p-[30px_25px] text-left border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-sm sm:text-[15px] font-bold text-[#0f172a] mb-2">{card.title}</h3>
              <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed mb-4 flex-1">{card.desc}</p>
              <button
                onClick={() => navigate(card.link)}
                className="text-xs font-semibold text-[#1e40af] hover:text-[#1d4ed8] flex items-center gap-1"
              >
                Learn More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-[60px] px-4 sm:px-10 bg-white text-center">
        <h2 className="text-xl sm:text-[26px] font-extrabold text-[#002366] mb-8 sm:mb-[45px]">Why Choose CEC?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[700px] mx-auto">
          {features.map((f) => (
            <div key={f.title} className="bg-[#f8fafc] rounded-xl p-6 text-left border border-[#e2e8f0]">
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-sm font-bold text-[#0f172a] mb-1">{f.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-[60px] px-4 sm:px-10 bg-[#f8fafc]">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 text-left">
            <h2 className="text-xl sm:text-[26px] font-extrabold text-[#002366] mb-3">Our Heritage & Mission</h2>
            <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed mb-4">
              Founded in 1915, Cebu Eastern College has stood as a pillar of academic excellence in the Visayas. For over a century, we have been shaping minds, building character, and serving the community through quality education rooted in Confucian values.
            </p>
            <button
              onClick={() => navigate('/about')}
              className="text-xs font-semibold text-[#1e40af] hover:text-[#1d4ed8] flex items-center gap-1"
            >
              Read Our Full Story
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"
              alt="CEC Campus"
              className="rounded-xl w-full max-w-[420px] shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-[50px] px-4 bg-[#0b1f40] text-center text-white">
        <h2 className="text-xl sm:text-[22px] font-extrabold mb-2">Join the Easternian Community</h2>
        <p className="text-xs sm:text-[13px] text-white/60 mb-6 max-w-[480px] mx-auto">
          Begin your journey towards academic excellence and personal growth today.
        </p>
        <button
          onClick={() => openAuth('signup')}
          className="px-6 py-2.5 rounded-md text-xs font-semibold bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-all"
        >
          Get Started
        </button>
      </section>

      <Footer />

      {/* Auth Modal */}
      {authModal.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={authModalBackdrop}
          onClick={(e) => { if (e.target === e.currentTarget) closeAuth() }}
        >
          <div className="bg-white rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0f172a]">Cebu Eastern College</h2>
                <button onClick={closeAuth} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => { setAuthTab('login'); setError(null) }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${authTab === 'login' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-gray-500'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => { setAuthTab('signup'); setError(null) }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${authTab === 'signup' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-gray-500'}`}
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-3 mb-4">{error}</div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {authTab === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none"
                      placeholder="Juan Dela Cruz"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#1e40af] focus:border-transparent outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-[#1e40af] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] transition-all disabled:opacity-50"
                >
                  {submitting ? 'Please wait...' : authTab === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">or</span></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
