import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import Header from '../components/Header'
import Footer from '../components/Footer'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

type AuthMode = 'login' | 'signup'

export function Home() {
  const { user, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, error, setError } = useAuthStore()
  const navigate = useNavigate()

  const [authModal, setAuthModal] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: 'login' })
  const [authTab, setAuthTab] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  useEffect(() => {
    setError(null)
  }, [authTab, setError])

  useEffect(() => {
    if (authModal.open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [authModal.open])

  const openAuth = (mode: AuthMode) => {
    setAuthTab(mode)
    setAuthModal({ open: true, mode })
    setEmail('')
    setPassword('')
    setFullName('')
    setIdNumber('')
    setShowPassword(false)
    setError(null)
  }

  const closeAuth = () => {
    setAuthModal({ open: false, mode: 'login' })
    setError(null)
  }

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    if (authTab === 'signup') {
      const result = await signUpWithEmail(email, password, fullName)
      if (result.success) {
        closeAuth()
      }
    } else {
      const success = await signInWithEmail(email, password)
      if (success) {
        closeAuth()
        navigate('/dashboard', { replace: true })
      }
    }

    setSubmitting(false)
  }

  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  const academicCards = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
      ),
      title: 'Basic Education',
      desc: 'A strong foundation for lifelong learning, fostering curiosity and critical thinking.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: 'Senior High',
      desc: 'Specialized tracks preparing students for college and future careers.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      title: 'Higher Education',
      desc: 'Professional degree programs shaping the industry leaders of tomorrow.',
    },
  ]

  const features = [
    { title: 'Affordable Tuition', desc: 'Quality education without the heavy financial burden.' },
    { title: 'Diverse Community', desc: 'A welcoming environment for students from all backgrounds.' },
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#333333] overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-10 px-4 sm:py-16 text-center text-white"
        style={{ background: "linear-gradient(rgba(11, 31, 64, 0.45), rgba(11, 31, 64, 0.45)), url(https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop) center/cover no-repeat" }}
      >
        <p className="text-[#eab308] text-2xl sm:text-4xl md:text-[38px] font-semibold tracking-[4px] sm:tracking-[8px] mb-6 sm:mb-[30px]">
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

      {/* Academic Excellence */}
      <section className="py-10 sm:py-[60px] px-4 sm:px-10 bg-[#f8fafc] text-center">
        <h2 className="text-xl sm:text-[26px] font-extrabold text-[#002366] mb-2">Academic Excellence</h2>
        <p className="text-xs sm:text-[13px] text-[#64748b] mb-8 sm:mb-[45px]">Comprehensive educational programs designed to nurture future leaders.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-[1100px] mx-auto">
          {academicCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg p-6 sm:p-[30px_25px] text-left border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center text-sm mb-5">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-[#1e293b] mb-3">{card.title}</h3>
              <p className="text-[12.5px] text-[#64748b] leading-relaxed mb-5 flex-grow">{card.desc}</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#1d4ed8] hover:underline">
                Learn More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-10 sm:py-[70px] px-4 sm:px-10 bg-[#f1f5f9]">
        <div className="max-w-[1050px] mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-[60px]">
          <div className="shrink-0 flex justify-center items-center w-full lg:w-[260px]">
            <img
              src={CEC_LOGO}
              alt="CEC Seal"
              className="w-full max-w-[200px] sm:max-w-[240px] h-auto object-contain mix-blend-multiply transition-transform hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-xl sm:text-[26px] font-extrabold text-[#002366] mb-4">Our Heritage & Mission</h2>
            <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed mb-6 sm:mb-[30px]">
              Founded in 1915, Cebu Eastern College has stood as a pillar of academic excellence in Cebu City. We remain committed to our founding principle: delivering top-tier, quality education that is accessible and affordable to all aspiring minds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#1d4ed8]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-[#1e293b] mb-1">{f.title}</h4>
                    <p className="text-[11.5px] text-[#64748b] leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#002366] text-white text-center py-10 sm:py-[60px] px-4">
        <h2 className="text-2xl sm:text-[32px] font-extrabold mb-3.5">Join the Easternian<br />Community</h2>
        <p className="text-xs sm:text-[13.5px] text-[#cbd5e1] mb-6 sm:mb-[25px]">Begin your journey towards academic excellence and personal growth today.</p>
        <button
          onClick={() => openAuth('signup')}
          className="bg-white text-[#002366] border-none py-2.5 px-6 rounded-md text-[13px] font-bold hover:bg-[#f1f5f9] transition-all"
        >
          Sign Up Now
        </button>
      </section>

      <Footer />

      {/* Auth Modal */}
      {authModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closeAuth} style={{ background: 'rgba(3, 8, 20, 0.75)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <div
            className="relative w-full max-w-[420px] rounded-2xl p-6 sm:p-[35px_30px] text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] bg-[rgba(13,33,84,0.92)] border border-white/20 backdrop-blur-[20px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAuth}
              className="absolute top-4 right-5 text-xl text-[#94a3b8] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              &times;
            </button>

            <div className="text-center mb-6">
              <img src={CEC_LOGO} alt="CEC" className="w-14 h-14 sm:w-[65px] sm:h-[65px] rounded-full mx-auto mb-3 shadow-[0_4px_10px_rgba(0,0,0,0.3)]" />
              <h3 className="text-lg sm:text-xl font-semibold">Cebu Eastern College</h3>
            </div>

            <div className="flex rounded-lg p-[3px] mb-6 bg-white/[0.08] border border-white/[0.15]">
              {(['login', 'signup'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAuthTab(tab)}
                  className={`flex-1 py-2 text-[13px] font-medium rounded-md transition-all border-none cursor-pointer ${
                    authTab === tab
                      ? 'bg-[#2563eb] text-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]'
                      : 'bg-transparent text-[#94a3b8]'
                  }`}
                >
                  {tab === 'login' ? 'Log In' : 'Sign Up'}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {authTab === 'login' && (
              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3.5">
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ID Number"
                    className="w-full pl-10 pr-3.5 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                </div>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Password"
                    className="w-full pr-10 pl-10 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#94a3b8] hover:text-white cursor-pointer p-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      )}
                    </svg>
                  </button>
                </div>
                <div className="text-right -mt-1">
                  <button type="button" className="text-[11px] text-[#cbd5e1] hover:underline bg-transparent border-none cursor-pointer p-0">
                    Forgot Password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-white text-[#0f172a] font-bold text-[13.5px] border-none cursor-pointer hover:bg-[#f1f5f9] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {submitting ? 'Signing in...' : 'Log In'}
                </button>
                <div className="text-center text-[11.5px] text-[#cbd5e1] mt-4">
                  Don't have an Account?{' '}
                  <button type="button" onClick={() => setAuthTab('signup')} className="bg-transparent border-none text-white font-semibold underline cursor-pointer p-0">
                    Sign Up
                  </button>
                </div>
                <div className="flex items-center gap-4 my-4">
                  <div className="h-px flex-1 bg-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-medium">or</span>
                  <div className="h-px flex-1 bg-white/20" />
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-sm font-medium text-[#cbd5e1] disabled:opacity-50 cursor-pointer transition-all bg-white/[0.07] border border-white/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

            {authTab === 'signup' && (
              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3.5">
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Full Name"
                    className="w-full pl-10 pr-3.5 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                </div>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full pl-10 pr-3.5 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                </div>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                  </svg>
                  <input
                    type="text"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    required
                    placeholder="ID Number"
                    className="w-full pl-10 pr-3.5 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                </div>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Password"
                    className="w-full pr-10 pl-10 py-3 rounded-lg text-white text-[13px] outline-none transition-colors placeholder-[#94a3b8] bg-white/[0.07] border border-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-[#94a3b8] hover:text-white cursor-pointer p-0"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      )}
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-lg bg-white text-[#0f172a] font-bold text-[13.5px] border-none cursor-pointer hover:bg-[#f1f5f9] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {submitting ? 'Creating account...' : 'Create Account'}
                </button>
                <div className="text-center text-[11.5px] text-[#cbd5e1] mt-4">
                  Already have an Account?{' '}
                  <button type="button" onClick={() => setAuthTab('login')} className="bg-transparent border-none text-white font-semibold underline cursor-pointer p-0">
                    Log In
                  </button>
                </div>
                <div className="flex items-center gap-4 my-4">
                  <div className="h-px flex-1 bg-white/20" />
                  <span className="text-[10px] uppercase tracking-widest text-[#94a3b8] font-medium">or</span>
                  <div className="h-px flex-1 bg-white/20" />
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-sm font-medium text-[#cbd5e1] disabled:opacity-50 cursor-pointer transition-all bg-white/[0.07] border border-white/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
