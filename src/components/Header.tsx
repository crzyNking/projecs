import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ProgramsDropdown from './ProgramsDropdown'
import EnrollmentDropdown from './EnrollmentDropdown'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [enrollmentOpen, setEnrollmentOpen] = useState(false)
  const programsRef = useRef<HTMLDivElement>(null)
  const enrollmentRef = useRef<HTMLDivElement>(null)
  const programsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enrollmentTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const isProgramsActive = isActive('/senior-high')

  const closePrograms = useCallback(() => setProgramsOpen(false), [])
  const closeEnrollment = useCallback(() => setEnrollmentOpen(false), [])

  const openPrograms = useCallback(() => {
    if (programsTimer.current) clearTimeout(programsTimer.current)
    setProgramsOpen(true)
    setEnrollmentOpen(false)
  }, [])

  const delayClosePrograms = useCallback(() => {
    programsTimer.current = setTimeout(() => setProgramsOpen(false), 150)
  }, [])

  const openEnrollment = useCallback(() => {
    if (enrollmentTimer.current) clearTimeout(enrollmentTimer.current)
    setEnrollmentOpen(true)
    setProgramsOpen(false)
  }, [])

  const delayCloseEnrollment = useCallback(() => {
    enrollmentTimer.current = setTimeout(() => setEnrollmentOpen(false), 150)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgramsOpen(false)
        setEnrollmentOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    setProgramsOpen(false)
    setEnrollmentOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    return () => {
      if (programsTimer.current) clearTimeout(programsTimer.current)
      if (enrollmentTimer.current) clearTimeout(enrollmentTimer.current)
    }
  }, [])

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

        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link to="/" className={`text-[13.5px] font-normal transition-colors ${isActive('/') ? activeClass : inactiveClass}`}>
            Home
          </Link>

          {/* Programs dropdown - hover */}
          <div ref={programsRef} className="relative" onMouseEnter={openPrograms} onMouseLeave={delayClosePrograms}>
            <button
              className={`text-[13.5px] font-normal transition-colors cursor-pointer flex items-center gap-1 ${(programsOpen || isProgramsActive) ? activeClass : inactiveClass}`}
            >
              Programs
              <svg className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <ProgramsDropdown open={programsOpen} onClose={closePrograms} />
          </div>

          {/* Enrollment dropdown - hover */}
          <div ref={enrollmentRef} className="relative" onMouseEnter={openEnrollment} onMouseLeave={delayCloseEnrollment}>
            <button
              className={`text-[13.5px] font-normal transition-colors cursor-pointer flex items-center gap-1 ${enrollmentOpen ? activeClass : inactiveClass}`}
            >
              Enrollment
              <svg className={`w-2.5 h-2.5 opacity-60 transition-transform duration-200 ${enrollmentOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <EnrollmentDropdown open={enrollmentOpen} onClose={closeEnrollment} />
          </div>

          <a href="#" className={`text-[13.5px] font-normal transition-colors ${inactiveClass}`}>
            Services
          </a>

          <a href="#" className={`text-[13.5px] font-normal transition-colors ${inactiveClass}`}>
            About
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all z-10"
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

      {mobileOpen && (
        <nav className="md:hidden bg-[#0b1f40] px-4 pb-4 border-t border-white/5">
          <Link to="/" onClick={() => setMobileOpen(false)} className={`block text-sm py-2.5 px-3 rounded-lg transition-colors ${isActive('/') ? 'text-white bg-white/10' : 'text-[#cbd5e1] hover:text-white hover:bg-white/10'}`}>
            Home
          </Link>
          <button onClick={() => { setMobileOpen(false); setProgramsOpen(true) }} className="block w-full text-left text-sm text-[#cbd5e1] hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            Programs
          </button>
          <button onClick={() => { setMobileOpen(false); setEnrollmentOpen(true) }} className="block w-full text-left text-sm text-[#cbd5e1] hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
            Enrollment
          </button>
          <a href="#" className="block text-sm text-[#cbd5e1] hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-all">
            Services
          </a>
          <a href="#" className="block text-sm text-[#cbd5e1] hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/10 transition-all">
            About
          </a>
        </nav>
      )}
    </header>
  )
}
