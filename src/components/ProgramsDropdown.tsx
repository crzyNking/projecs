import { useNavigate } from 'react-router-dom'

interface ProgramsDropdownProps {
  open: boolean
  onClose: () => void
}

const k12Programs = [
  {
    title: 'Kindergarten',
    desc: 'The Kindergarten Department of CEC provides a supportive environment that fosters early growth, creativity, and basic skills for young learners.',
    path: '/senior-high',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Elementary',
    desc: 'The Elementary Department nurtures young minds with strong values, foundational academic skills, and lifelong learning habits.',
    path: '/senior-high',
    img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Junior High School',
    desc: 'Offering dynamic programs designed to strengthen critical thinking, character, and personal development in preparation for higher education.',
    path: '/senior-high',
    img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Senior High School',
    desc: 'Provides specialized academic tracks and practical training to effectively prepare students for college and future careers.',
    path: '/senior-high',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop',
  },
]

const collegePrograms = [
  {
    name: 'Bachelor of Science in Information Technology',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'Bachelor of Science in Hospitality Management',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v20M18 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2M6 2v6a3 3 0 0 0 6 0V2M9 10v12" />
      </svg>
    ),
  },
  {
    name: 'Bachelor of Science in Criminology',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polygon points="12 8 13.09 10.21 15.54 10.57 13.77 12.29 14.19 14.74 12 13.59 9.81 14.74 10.23 12.29 8.46 10.57 10.91 10.21 12 8" />
      </svg>
    ),
  },
  {
    name: 'Bachelor of Science in Tourism Management',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.7 5.2c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
      </svg>
    ),
  },
  {
    name: 'Bachelor of Secondary Education',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    name: 'Bachelor of Elementary Education',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#0b2545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
]

export default function ProgramsDropdown({ open, onClose }: ProgramsDropdownProps) {
  const navigate = useNavigate()

  if (!open) return null

  const handleClick = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]">
      {/* Desktop */}
      <div className="hidden md:block relative w-[980px] bg-[#061830] rounded-2xl shadow-2xl border border-white/10 p-7">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#061830] border-l border-t border-white/10 rotate-45" />

        <div className="grid grid-cols-[1.15fr_0.85fr] gap-8">
          {/* K-12 Education */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-2.5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span className="text-white text-[18px] font-semibold">K-12 Education</span>
              </div>
              <div className="h-[2px] bg-[#213c63] w-[60%]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {k12Programs.map((prog) => (
                <button
                  key={prog.title}
                  onClick={() => handleClick(prog.path)}
                  className="group bg-white rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-200 text-left flex flex-col"
                >
                  <div className="relative h-[130px] w-full overflow-hidden">
                    <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-4 bg-gradient-to-t from-black/75 to-transparent">
                      <h3 className="text-white text-[15px] font-semibold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{prog.title}</h3>
                    </div>
                  </div>
                  <div className="p-2.5 flex flex-col flex-grow justify-between">
                    <p className="text-[#556070] text-[10px] leading-[1.4] mb-2">{prog.desc}</p>
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
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-2.5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z" />
                </svg>
                <span className="text-white text-[18px] font-semibold">College Programs</span>
              </div>
              <div className="h-[2px] bg-[#213c63] w-full" />
            </div>

            <div className="relative pl-4 mt-4">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#1a365d]" />
              <div className="flex flex-col gap-2">
                {collegePrograms.map((prog) => (
                  <button
                    key={prog.name}
                    onClick={() => handleClick('/senior-high')}
                    className="group flex items-center gap-3 bg-[#dce4ed] rounded-lg py-1.5 pr-3 pl-2 hover:bg-[#d2dce8] transition-all duration-200 cursor-pointer"
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
      </div>

      {/* Mobile */}
      <div className="md:hidden w-[calc(100vw-32px)] max-w-[400px] bg-[#061830] rounded-2xl shadow-2xl border border-white/10 p-5 max-h-[80vh] overflow-y-auto">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#061830] border-l border-t border-white/10 rotate-45" />

        {/* K-12 */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            <span className="text-white text-[15px] font-semibold">K-12 Education</span>
          </div>
          <div className="h-[2px] bg-[#213c63] w-[40%] mb-3" />
          <div className="grid grid-cols-2 gap-2.5">
            {k12Programs.map((prog) => (
              <button
                key={prog.title}
                onClick={() => handleClick(prog.path)}
                className="group bg-white rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-left flex flex-col"
              >
                <div className="relative h-[90px] w-full overflow-hidden">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-1.5 pt-3 bg-gradient-to-t from-black/75 to-transparent">
                    <h3 className="text-white text-[12px] font-semibold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{prog.title}</h3>
                  </div>
                </div>
                <div className="p-2">
                  <span className="text-[#0b2545] text-[10px] font-bold inline-flex items-center gap-1">
                    Learn More
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* College */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3L2 10h20L12 3z" />
            </svg>
            <span className="text-white text-[15px] font-semibold">College Programs</span>
          </div>
          <div className="h-[2px] bg-[#213c63] w-full mb-3" />
          <div className="flex flex-col gap-1.5">
            {collegePrograms.map((prog) => (
              <button
                key={prog.name}
                onClick={() => handleClick('/senior-high')}
                className="group flex items-center gap-2.5 bg-[#dce4ed] rounded-lg py-2 pr-3 pl-2 cursor-pointer"
              >
                <div className="w-[32px] h-[32px] bg-[#c4d2e2] rounded-lg flex items-center justify-center shrink-0">
                  {prog.icon}
                </div>
                <span className="text-[#0b2545] font-semibold text-[11px] leading-[1.3] flex-grow text-left">{prog.name}</span>
                <svg className="w-3 h-3 text-[#a0aebc] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
