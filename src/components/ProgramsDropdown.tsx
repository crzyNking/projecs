import { useNavigate } from 'react-router-dom'

interface ProgramsDropdownProps {
  open: boolean
  onClose: () => void
}

const k12Programs = [
  {
    title: 'Kindergarten',
    desc: 'The Kindergarten Department of CEC provides a supportive environment that fosters early growth, creativity, and basic skills for young learners.',
    path: '/enrollment/kindergarten',
  },
  {
    title: 'Elementary',
    desc: 'The Elementary Department nurtures young minds with strong values, foundational academic skills, and lifelong learning habits.',
    path: '/enrollment/elementary',
  },
  {
    title: 'Junior High School',
    desc: 'Offering dynamic programs designed to strengthen critical thinking, character, and personal development in preparation for higher education.',
    path: '/enrollment/junior-high',
  },
  {
    title: 'Senior High School',
    desc: 'Provides specialized academic tracks and practical training to effectively prepare students for college and future careers.',
    path: '/enrollment/senior-high',
  },
]

const collegePrograms = [
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Hospitality Management',
  'Bachelor of Science in Criminology',
  'Bachelor of Science in Tourism Management',
  'Bachelor of Secondary Education',
  'Bachelor of Elementary Education',
]

export default function ProgramsDropdown({ open, onClose }: ProgramsDropdownProps) {
  const navigate = useNavigate()

  if (!open) return null

  const handleClick = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-2" />

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[820px] bg-[rgba(6,25,68,0.97)] backdrop-blur-xl rounded-2xl shadow-2xl border border-white/15 grid grid-cols-[1.1fr_0.9fr] gap-7 z-[60] overflow-hidden">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[rgba(6,25,68,0.97)] border-l border-t border-white/15 rotate-45" />

        {/* K-12 Education */}
        <div className="p-7">
          <div className="flex items-center gap-2.5 pb-2.5 mb-5 border-b-[1.5px] border-blue-500">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
            <span className="text-white text-[15px] font-bold">K-12 Education</span>
          </div>
          <div className="space-y-3">
            {k12Programs.map((prog) => (
              <button
                key={prog.title}
                onClick={() => handleClick(prog.path)}
                className="group w-full text-left p-3 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <h4 className="text-white text-[13px] font-bold mb-1 group-hover:text-blue-300 transition-colors">{prog.title}</h4>
                <p className="text-white/50 text-[11px] leading-relaxed mb-1.5 line-clamp-2">{prog.desc}</p>
                <span className="text-blue-400 text-[11px] font-semibold flex items-center gap-1 group-hover:text-blue-300 transition-colors">
                  Learn More
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* College Programs */}
        <div className="p-7 pl-0">
          <div className="flex items-center gap-2.5 pb-2.5 mb-5 border-b-[1.5px] border-blue-500">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
            </svg>
            <span className="text-white text-[15px] font-bold">College Programs</span>
          </div>
          <div className="space-y-1">
            {collegePrograms.map((prog) => (
              <button
                key={prog}
                onClick={() => handleClick('/enrollment/college')}
                className="group w-full text-left flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0 group-hover:bg-blue-300 transition-colors" />
                <span className="text-white/70 text-[12px] group-hover:text-white transition-colors">{prog}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => handleClick('/enrollment/college')}
            className="mt-4 w-full bg-white/10 hover:bg-white/15 text-white text-[12px] font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            View All College Programs
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
