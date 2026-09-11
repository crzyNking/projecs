import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

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
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      desc: 'A strong foundation for lifelong learning, fostering curiosity and critical thinking from kindergarten through junior high.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: 'Senior High',
      desc: 'Specialized academic and technical tracks preparing students for higher education and future careers.',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      title: 'Higher Education',
      desc: 'Professional degree programs shaping the industry leaders of tomorrow with world-class faculty and resources.',
    },
  ]

  const features = [
    { title: 'Affordable Tuition', desc: 'Quality education without the heavy financial burden.' },
    { title: 'Diverse Community', desc: 'A welcoming environment for students from all backgrounds.' },
  ]

  return (
    <div className="min-h-screen bg-[#07070d] text-white relative overflow-x-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/8 blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/6 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[130px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/[0.03] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <img src={CEC_LOGO} alt="CEC Logo" className="w-10 h-10 rounded-full object-cover bg-white" />
              <div>
                <div className="text-sm font-bold tracking-wide">Cebu Eastern College</div>
                <div className="text-[10px] text-gray-400">Leon Kilat St., Cebu City</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {['Programs', 'Services', 'Enrollment', 'About'].map((item) => (
                <a key={item} href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuth('login')}
                className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/[0.06]"
              >
                Login
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Sign Up
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-white/[0.06] mt-2 pt-3">
              <div className="flex flex-col gap-2">
                {['Programs', 'Services', 'Enrollment', 'About'].map((item) => (
                  <a key={item} href="#" className="text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-all">
                    {item}
                  </a>
                ))}
                <button onClick={() => { openAuth('login'); setMobileMenuOpen(false) }} className="text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/[0.06] text-left transition-all">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-[0.07]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-amber-400/90 text-2xl sm:text-3xl font-semibold tracking-[6px] mb-10">
            宿務 東方 學院
          </p>

          <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-2xl p-10 sm:p-14 shadow-2xl shadow-black/40">
            <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            <div className="absolute -bottom-px left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5">
              Excellence in Education<br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">since 1915</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Be part of the Easternian Community, where quality education is less expensive.
              Join Cebu City's premier institution for holistic development.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => openAuth('login')}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
              >
                Log In
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-8 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/[0.08] transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Academic <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-gray-400 text-sm mb-14">Comprehensive educational programs designed to nurture future leaders.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {academicCards.map((card) => (
              <div
                key={card.title}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl p-7 text-left hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5">
                  {card.icon}
                </div>
                <h3 className="text-base font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{card.desc}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                  Learn More
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 px-4 bg-white/[0.01]">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-2xl" />
              <img
                src={CEC_LOGO}
                alt="CEC Seal"
                className="relative w-48 sm:w-56 h-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/[0.08] p-3"
              />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5">
              Our <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Heritage</span> & Mission
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg">
              Founded in 1915, Cebu Eastern College has stood as a pillar of academic excellence in Cebu City.
              We remain committed to our founding principle: delivering top-tier, quality education that is accessible
              and affordable to all aspiring minds.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">{f.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
            Join the Easternian<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-gray-400 text-sm mb-10">Begin your journey towards academic excellence and personal growth today.</p>
          <button
            onClick={() => openAuth('signup')}
            className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all duration-200 shadow-xl shadow-white/10"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2.5 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <span>(032) 256 2523</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span>cebueasterncollege1915@yahoo.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>Leon Kilat St., Cebu City, Philippines, 6000</span>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500 mb-4">&copy; {new Date().getFullYear()} Cebu Eastern College. All rights reserved.</p>
              <div className="flex gap-3 justify-center md:justify-end">
                {[
                  { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
                  { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                  { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={closeAuth}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effects */}
            <div className="absolute -top-24 left-1/4 h-48 w-48 rounded-full bg-purple-500/20 blur-[80px]" />
            <div className="absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-cyan-500/15 blur-[80px]" />

            <div className="relative rounded-2xl border border-white/[0.1] bg-white/[0.05] backdrop-blur-2xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

              {/* Close button */}
              <button
                onClick={closeAuth}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-30 blur-xl" />
                      <img src={CEC_LOGO} alt="CEC" className="relative w-14 h-14 rounded-2xl object-cover bg-white/10 border border-white/[0.1]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Cebu Eastern College</h3>
                </div>

                {/* Tab Toggle */}
                <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-6">
                  {(['login', 'signup'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setAuthTab(tab)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        authTab === tab
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                  ))}
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3.5">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {authTab === 'signup' && (
                    <div className="relative">
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                      />
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email Address"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Password"
                      className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    />
                    <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-500 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {authTab === 'login' && (
                    <div className="text-right">
                      <button type="button" className="text-xs text-gray-400 hover:text-white transition-colors">
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {authTab === 'signup' ? 'Creating account...' : 'Signing in...'}
                      </span>
                    ) : (
                      authTab === 'signup' ? 'Create Account' : 'Log In'
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="h-px flex-1 bg-white/[0.08]" />
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">or</span>
                  <div className="h-px flex-1 bg-white/[0.08]" />
                </div>

                {/* Google */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-gray-300 hover:bg-white/[0.08] hover:text-white transition-all duration-200 disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                {/* Toggle */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => { setAuthTab(authTab === 'login' ? 'signup' : 'login'); setError(null) }}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {authTab === 'signup' ? (
                      <>Already have an account? <span className="font-semibold text-purple-400">Log In</span></>
                    ) : (
                      <>Don't have an account? <span className="font-semibold text-purple-400">Sign Up</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
