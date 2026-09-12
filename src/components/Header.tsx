import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ProgramsDropdown from './ProgramsDropdown'
import EnrollmentDropdown from './EnrollmentDropdown'
import ServicesDropdown from './ServicesDropdown'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

const k12Programs = [
  { title: 'Kindergarten', desc: 'The Kindergarten Department of CEC provides a supportive environment that fosters early growth, creativity, and basic skills for young learners.', path: '/senior-high', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop' },
  { title: 'Elementary', desc: 'The Elementary Department nurtures young minds with strong values, foundational academic skills, and lifelong learning habits.', path: '/senior-high', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop' },
  { title: 'Junior High School', desc: 'Offering dynamic programs designed to strengthen critical thinking, character, and personal development in preparation for higher education.', path: '/senior-high', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop' },
  { title: 'Senior High School', desc: 'Provides specialized academic tracks and practical training to effectively prepare students for college and future careers.', path: '/senior-high', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop' },
]

const collegePrograms = [
  { name: 'Bachelor of Science in Information Technology', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg> },
  { name: 'Bachelor of Science in Hospitality Management', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2v20M18 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2M6 2v6a3 3 0 0 0 6 0V2M9 10v12" /></svg> },
  { name: 'Bachelor of Science in Criminology', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { name: 'Bachelor of Science in Tourism Management', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.7 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" /></svg> },
  { name: 'Bachelor of Secondary Education', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg> },
  { name: 'Bachelor of Elementary Education', icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg> },
]

const k12Enroll = [
  { title: 'KINDERGARTEN', desc: 'Ages 3-5', path: '/enrollment/kindergarten' },
  { title: 'ELEMENTARY', desc: 'Grades 1-6', path: '/enrollment/elementary' },
  { title: 'JUNIOR HIGH SCHOOL', desc: 'Grades 7-10', path: '/enrollment/junior-high' },
  { title: 'SENIOR HIGH SCHOOL', desc: 'Grades 11-12', path: '/enrollment/senior-high' },
]

const servicesList = [
  { name: 'REGISTRAR', icon: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8' },
  { name: 'EDP', icon: 'M9 17H7A5 5 0 0 1 7 7h2 M15 7h2a5 5 0 1 1 0 10h-2 M8 12h8' },
  { name: 'ACCOUNTING', icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { name: 'CLINIC', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { name: 'LIBRARY', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z' },
  { name: 'GUIDANCE', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
]

type MobileSection = 'main' | 'programs' | 'enrollment' | 'services'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MobileSection>('main')
  const [programsOpen, setProgramsOpen] = useState(false)
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const programsRef = useRef<HTMLDivElement>(null)
  const enrollmentRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const programsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enrollmentTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const servicesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => location.pathname === path

  const isProgramsActive = isActive('/senior-high')

  const closePrograms = useCallback(() => setProgramsOpen(false), [])
  const closeEnrollment = useCallback(() => setEnrollmentOpen(false), [])
  const openPrograms = useCallback(() => {
    if (programsTimer.current) clearTimeout(programsTimer.current)
    setProgramsOpen(true)
    setEnrollmentOpen(false)
    setServicesOpen(false)
  }, [])
  const delayClosePrograms = useCallback(() => {
    programsTimer.current = setTimeout(() => setProgramsOpen(false), 150)
  }, [])
  const openEnrollment = useCallback(() => {
    if (enrollmentTimer.current) clearTimeout(enrollmentTimer.current)
    setEnrollmentOpen(true)
    setProgramsOpen(false)
    setServicesOpen(false)
  }, [])
  const delayCloseEnrollment = useCallback(() => {
    enrollmentTimer.current = setTimeout(() => setEnrollmentOpen(false), 150)
  }, [])
  const openServices = useCallback(() => {
    if (servicesTimer.current) clearTimeout(servicesTimer.current)
    setServicesOpen(true)
    setProgramsOpen(false)
    setEnrollmentOpen(false)
  }, [])
  const delayCloseServices = useCallback(() => {
    servicesTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false)
        setEnrollmentOpen(false)
        setServicesOpen(false)
        if (mobileOpen) {
          setMobileOpen(false)
          setMobileSection('main')
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileOpen])

  useEffect(() => {
    setProgramsOpen(false)
    setEnrollmentOpen(false)
    setServicesOpen(false)
    setMobileOpen(false)
    setMobileSection('main')
  }, [location.pathname])

  useEffect(() => {
    return () => {
      if (programsTimer.current) clearTimeout(programsTimer.current)
      if (enrollmentTimer.current) clearTimeout(enrollmentTimer.current)
      if (servicesTimer.current) clearTimeout(servicesTimer.current)
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const activeClass = 'text-white border-b-2 border-white pb-1'
  const inactiveClass = 'text-[#cbd5e1] hover:text-white'

  return (
    <header className="sticky top-0 z-50 bg-[#0b1f40] text-white border-b border-white/10">
      <div className="relative flex items-center justify-between px-4 py-3 md:px-10 md:py-3.5">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 z-10">
          <img src={CEC_LOGO} alt="CEC Logo" className="w-9 h-9 md:w-[42px] md:h-[42px] rounded-full object-cover bg-white" />
          <div>
            <div className="text-sm md:text-[15px] font-bold tracking-wide">Cebu Eastern College</div>
            <div className="text-[9px] md:text-[10px] text-[#94a3b8]">Leon Kilat St., Cebu City</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 xl:gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link to="/" className={`text-[13.5px] font-normal transition-colors ${isActive('/') ? activeClass : inactiveClass}`}>
            Home
          </Link>
          <div ref={programsRef} className="relative" onMouseEnter={openPrograms} onMouseLeave={delayClosePrograms}>
            <button className={`text-[13.5px] font-normal transition-colors cursor-pointer flex items-center gap-1 ${(programsOpen || isProgramsActive) ? activeClass : inactiveClass}`}>
              Programs
              <svg className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <ProgramsDropdown open={programsOpen} onClose={closePrograms} />
          </div>
          <div ref={enrollmentRef} className="relative" onMouseEnter={openEnrollment} onMouseLeave={delayCloseEnrollment}>
            <button className={`text-[13.5px] font-normal transition-colors cursor-pointer flex items-center gap-1 ${enrollmentOpen ? activeClass : inactiveClass}`}>
              Enrollment
              <svg className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${enrollmentOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <EnrollmentDropdown open={enrollmentOpen} onClose={closeEnrollment} />
          </div>
          <div ref={servicesRef} className="relative" onMouseEnter={openServices} onMouseLeave={delayCloseServices}>
            <button className={`text-[13.5px] font-normal transition-colors cursor-pointer flex items-center gap-1 ${servicesOpen ? activeClass : inactiveClass}`}>
              Services
              <svg className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <ServicesDropdown open={servicesOpen} />
          </div>
          <a href="#" className={`text-[13.5px] font-normal transition-colors ${inactiveClass}`}>
            About
          </a>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => { setMobileOpen(!mobileOpen); setMobileSection('main') }}
          className="lg:hidden p-2 rounded-lg text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all z-[60] relative"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-50 bg-[#0b1f40] overflow-y-auto">
          {/* Main menu */}
          {mobileSection === 'main' && (
            <div className="px-5 py-6 space-y-1">
              <Link to="/" onClick={() => setMobileSection('main')} className={`block text-[15px] font-medium py-3 px-4 rounded-xl transition-colors ${isActive('/') ? 'text-white bg-white/10' : 'text-[#cbd5e1] hover:text-white hover:bg-white/10'}`}>
                Home
              </Link>
              <button onClick={() => setMobileSection('programs')} className="w-full text-left text-[15px] font-medium py-3 px-4 rounded-xl text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                Programs
                <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
              <button onClick={() => setMobileSection('enrollment')} className="w-full text-left text-[15px] font-medium py-3 px-4 rounded-xl text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                Enrollment
                <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
              <button onClick={() => setMobileSection('services')} className="w-full text-left text-[15px] font-medium py-3 px-4 rounded-xl text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                Services
                <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
              </button>
              <a href="#" className="block text-[15px] font-medium py-3 px-4 rounded-xl text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-colors">
                About
              </a>
            </div>
          )}

          {/* Programs section - full detail like desktop */}
          {mobileSection === 'programs' && (
            <div className="px-5 py-6">
              <button onClick={() => setMobileSection('main')} className="flex items-center gap-2 text-[#94a3b8] hover:text-white text-sm mb-5 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="15.75 19.5 8.25 12l7.5-7.5" /></svg>
                Back
              </button>

              {/* K-12 Education */}
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                  <span className="text-white text-[16px] font-semibold">K-12 Education</span>
                </div>
                <div className="h-[2px] bg-[#213c63] w-[50%] mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {k12Programs.map((prog) => (
                    <button
                      key={prog.title}
                      onClick={() => { setMobileOpen(false); setMobileSection('main'); navigate(prog.path) }}
                      className="group bg-white rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.15)] text-left flex flex-col"
                    >
                      <div className="relative h-[110px] w-full overflow-hidden">
                        <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-4 bg-gradient-to-t from-black/75 to-transparent">
                          <h3 className="text-white text-[13px] font-semibold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{prog.title}</h3>
                        </div>
                      </div>
                      <div className="p-2.5 flex flex-col flex-grow justify-between">
                        <p className="text-[#556070] text-[10px] leading-[1.4] mb-2 line-clamp-2">{prog.desc}</p>
                        <span className="text-[#0b2545] text-[11px] font-bold inline-flex items-center gap-1 group-hover:text-blue-700 transition-colors">
                          Learn More
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* College Programs */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z" />
                  </svg>
                  <span className="text-white text-[16px] font-semibold">College Programs</span>
                </div>
                <div className="h-[2px] bg-[#213c63] w-full mb-4" />
                <div className="relative pl-4">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1a365d]" />
                  <div className="flex flex-col gap-2">
                    {collegePrograms.map((prog) => (
                      <button
                        key={prog.name}
                        onClick={() => { setMobileOpen(false); setMobileSection('main'); navigate('/senior-high') }}
                        className="group flex items-center gap-3 bg-[#dce4ed] rounded-lg py-2 pr-3 pl-2 hover:bg-[#d2dce8] transition-all duration-200 cursor-pointer"
                      >
                        <div className="w-[36px] h-[36px] bg-[#c4d2e2] rounded-lg flex items-center justify-center shrink-0">
                          {prog.icon}
                        </div>
                        <span className="text-[#0b2545] font-semibold text-[12px] leading-[1.3] flex-grow text-left">{prog.name}</span>
                        <svg className="w-3.5 h-3.5 text-[#a0aebc] group-hover:text-[#0b2545] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enrollment section - full detail like desktop */}
          {mobileSection === 'enrollment' && (
            <div className="px-5 py-6">
              <button onClick={() => setMobileSection('main')} className="flex items-center gap-2 text-[#94a3b8] hover:text-white text-sm mb-5 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="15.75 19.5 8.25 12l7.5-7.5" /></svg>
                Back
              </button>

              {/* K-12 */}
              <div className="mb-6">
                <div className="flex items-center gap-2.5 pb-2 mb-4 border-b-[1.5px] border-blue-500">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  </svg>
                  <span className="text-white text-[16px] font-bold">K-12 Education</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {k12Enroll.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => { setMobileOpen(false); setMobileSection('main'); navigate(card.path) }}
                      className="group relative bg-gradient-to-b from-[#5b72cd] to-[#3a4b9c] rounded-xl border border-white/20 overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:border-white/50 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 flex flex-col justify-between items-start p-3 cursor-pointer min-h-[100px]"
                    >
                      <span className="text-white text-[12px] font-extrabold tracking-wide uppercase leading-tight z-10 relative" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                        {card.title}
                      </span>
                      <span className="text-white/50 text-[10px] font-medium z-10 relative">
                        {card.desc}
                      </span>
                      <svg className="absolute bottom-3 right-3 w-3.5 h-3.5 text-white/0 group-hover:text-white/70 transition-all duration-200 translate-x-1 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* College */}
              <div>
                <div className="flex items-center gap-2.5 pb-2 mb-4 border-b-[1.5px] border-blue-500">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
                  </svg>
                  <span className="text-white text-[16px] font-bold">College Programs</span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); setMobileSection('main'); navigate('/enrollment/college') }}
                  className="group w-full bg-gradient-to-b from-[#8496db] to-[#4f61b3] rounded-xl border border-white/20 overflow-hidden relative flex flex-col justify-between p-4 cursor-pointer hover:-translate-y-0.5 hover:border-white/50 hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200 min-h-[120px]"
                >
                  <span className="text-[#fef08a] text-[18px] font-black tracking-wider uppercase z-10 relative" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    COLLEGE
                  </span>
                  <span className="text-white/45 text-[11px] font-medium z-10 relative">
                    Bachelor's Degree Programs
                  </span>
                  <svg className="absolute bottom-4 right-4 w-4 h-4 text-white/0 group-hover:text-white/70 transition-all duration-200 translate-x-1 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Services section - full detail like desktop */}
          {mobileSection === 'services' && (
            <div className="px-5 py-6">
              <button onClick={() => setMobileSection('main')} className="flex items-center gap-2 text-[#94a3b8] hover:text-white text-sm mb-5 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="15.75 19.5 8.25 12l7.5-7.5" /></svg>
                Back
              </button>

              <div className="flex items-center gap-3 mb-3">
                <svg className="w-6 h-6 text-[#f7e0b5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 7.5L12 13L23 7.5L12 2Z" />
                  <path d="M4 9.5V15.5L12 19.5L20 15.5V9.5L12 13.5L4 9.5Z" />
                </svg>
                <h2 className="text-[#f7e0b5] text-[18px] font-semibold tracking-wide">Services</h2>
              </div>
              <hr className="h-[2px] bg-[#7b95c6] border-none mb-5" />

              <div className="grid grid-cols-2 gap-3">
                {servicesList.map((service) => (
                  <div
                    key={service.name}
                    className="bg-white rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 py-5 px-3"
                  >
                    <div className="w-[48px] h-[48px] bg-[#f4f4f4] rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#061830]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d={service.icon} />
                      </svg>
                    </div>
                    <span className="text-[#061830] text-[12px] font-bold tracking-wider text-center">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
