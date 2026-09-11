import { useNavigate } from 'react-router-dom'

interface EnrollmentDropdownProps {
  open: boolean
  onClose: () => void
}

const k12Cards = [
  { title: 'KINDERGARTEN', desc: 'Ages 3-5', path: '/enrollment/kindergarten', bg: 'from-[#5b72cd] to-[#3a4b9c]' },
  { title: 'ELEMENTARY', desc: 'Grades 1-6', path: '/enrollment/elementary', bg: 'from-[#5b72cd] to-[#3a4b9c]' },
  { title: 'JUNIOR HIGH SCHOOL', desc: 'Grades 7-10', path: '/enrollment/junior-high', bg: 'from-[#5b72cd] to-[#3a4b9c]' },
  { title: 'SENIOR HIGH SCHOOL', desc: 'Grades 11-12', path: '/enrollment/senior-high', bg: 'from-[#5b72cd] to-[#3a4b9c]' },
]

export default function EnrollmentDropdown({ open, onClose }: EnrollmentDropdownProps) {
  const navigate = useNavigate()

  if (!open) return null

  const handleClick = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      {/* Invisible bridge to prevent gap hover issue */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-2" />

      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[820px] bg-[rgba(6,25,68,0.97)] backdrop-blur-xl rounded-2xl shadow-2xl border border-white/15 grid grid-cols-[1.1fr_0.9fr] gap-7 z-[60] overflow-hidden animate-in">
        {/* Arrow pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[rgba(6,25,68,0.97)] border-l border-t border-white/15 rotate-45" />

        {/* K-12 Column */}
        <div className="p-7">
          <div className="flex items-center gap-2.5 pb-2.5 mb-4 border-b-[1.5px] border-blue-500">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
            <span className="text-white text-[15px] font-bold">K-12 Education</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {k12Cards.map((card) => (
              <button
                key={card.title}
                onClick={() => handleClick(card.path)}
                className={`group relative bg-gradient-to-b ${card.bg} rounded-xl h-[140px] border border-white/25 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-200 flex flex-col justify-between items-start p-3 cursor-pointer`}
              >
                <span className="text-white text-[13px] font-extrabold tracking-wide uppercase leading-tight z-10 relative" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>
                  {card.title}
                </span>
                <span className="text-white/60 text-[10px] font-medium z-10 relative">
                  {card.desc}
                </span>
                {/* Hover arrow */}
                <svg className="absolute bottom-3 right-3 w-4 h-4 text-white/0 group-hover:text-white/80 transition-all duration-200 translate-x-1 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* College Column */}
        <div className="p-7 pl-0">
          <div className="flex items-center gap-2.5 pb-2.5 mb-4 border-b-[1.5px] border-blue-500">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
            </svg>
            <span className="text-white text-[15px] font-bold">College Programs</span>
          </div>
          <button
            onClick={() => handleClick('/enrollment/college')}
            className="group w-full bg-gradient-to-b from-[#8496db] to-[#4f61b3] rounded-xl h-[292px] border border-white/25 overflow-hidden relative flex flex-col justify-between p-4 cursor-pointer hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-200"
          >
            <span className="text-[#fef08a] text-[22px] font-black tracking-wider uppercase z-10 relative" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              COLLEGE
            </span>
            <span className="text-white/50 text-[11px] font-medium z-10 relative">
              Bachelor's Degree Programs
            </span>
            {/* Hover arrow */}
            <svg className="absolute bottom-4 right-4 w-5 h-5 text-white/0 group-hover:text-white/80 transition-all duration-200 translate-x-1 group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
