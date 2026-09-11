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
    img: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Elementary',
    desc: 'The Elementary Department nurtures young minds with strong values, foundational academic skills, and lifelong learning habits.',
    path: '/enrollment/elementary',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Junior High School',
    desc: 'Offering dynamic programs designed to strengthen critical thinking, character, and personal development in preparation for higher education.',
    path: '/enrollment/junior-high',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80',
  },
  {
    title: 'Senior High School',
    desc: 'Provides specialized academic tracks and practical training to effectively prepare students for college and future careers.',
    path: '/enrollment/senior-high',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=400&q=80',
  },
]

const collegePrograms = [
  { name: 'Bachelor of Science in Information Technology', icon: '💻' },
  { name: 'Bachelor of Science in Hospitality Management', icon: '🍴' },
  { name: 'Bachelor of Science in Criminology', icon: '🛡️' },
  { name: 'Bachelor of Science in Tourism Management', icon: '✈️' },
  { name: 'Bachelor of Secondary Education', icon: '📚' },
  { name: 'Bachelor of Elementary Education', icon: '😊' },
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
          <div className="grid grid-cols-2 gap-3">
            {k12Programs.map((prog) => (
              <button
                key={prog.title}
                onClick={() => handleClick(prog.path)}
                className="group text-left bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
              >
                <div className="relative h-[110px] overflow-hidden">
                  <img src={prog.img} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-white text-[14px] font-extrabold tracking-wide" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {prog.title}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-gray-500 text-[10.5px] leading-[1.5] mb-2 line-clamp-3">{prog.desc}</p>
                  <span className="text-blue-600 text-[11px] font-bold flex items-center gap-1 group-hover:text-blue-700 transition-colors">
                    Learn More
                    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
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
          <div className="space-y-2">
            {collegePrograms.map((prog) => (
              <button
                key={prog.name}
                onClick={() => handleClick('/enrollment/college')}
                className="group w-full flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-blue-50 transition-all duration-200 cursor-pointer"
              >
                <span className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center text-[16px] shrink-0">
                  {prog.icon}
                </span>
                <span className="text-gray-700 text-[12.5px] font-medium flex-1 text-left leading-tight">{prog.name}</span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
