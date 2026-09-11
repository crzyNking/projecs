import { useNavigate } from 'react-router-dom'

interface EnrollmentModalProps {
  open: boolean
  onClose: () => void
}

const k12Cards = [
  { title: 'KINDERGARTEN', path: '/enrollment/kindergarten', gradient: 'from-[#1a3a8a] to-[#2563eb]' },
  { title: 'ELEMENTARY', path: '/enrollment/elementary', gradient: 'from-[#1e40af] to-[#3b82f6]' },
  { title: 'JUNIOR HIGH SCHOOL', path: '/enrollment/junior-high', gradient: 'from-[#1d4ed8] to-[#60a5fa]' },
  { title: 'SENIOR HIGH SCHOOL', path: '/enrollment/senior-high', gradient: 'from-[#2563eb] to-[#93c5fd]' },
]

const collegeCard = { title: 'COLLEGE', path: '/enrollment/college', gradient: 'from-[#1e3a8a] to-[#2563eb]' }

export default function EnrollmentModal({ open, onClose }: EnrollmentModalProps) {
  const navigate = useNavigate()

  if (!open) return null

  const handleCardClick = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[85vh] overflow-y-auto p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white">Enrollment Programs</h2>
          <p className="text-sm text-blue-300 mt-1">Select a program to begin enrollment</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5">
          {/* K-12 Education */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">K-12 Education</h3>
            </div>
            <div className="border-t border-blue-500/40 mb-4" />
            <div className="grid grid-cols-2 gap-3">
              {k12Cards.map((card) => (
                <button
                  key={card.title}
                  onClick={() => handleCardClick(card.path)}
                  className={`group relative bg-gradient-to-br ${card.gradient} rounded-xl p-4 text-left hover:scale-[1.03] transition-all duration-200 shadow-lg overflow-hidden min-h-[120px] flex flex-col justify-end`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-white text-xs md:text-sm font-bold tracking-wide leading-tight block">{card.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* College Programs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21" />
              </svg>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">College Programs</h3>
            </div>
            <div className="border-t border-blue-500/40 mb-4" />
            <button
              onClick={() => handleCardClick(collegeCard.path)}
              className="group relative w-full bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] rounded-xl p-6 text-left hover:scale-[1.02] transition-all duration-200 shadow-lg overflow-hidden min-h-[260px] flex flex-col justify-end"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="relative z-10">
                <span className="text-white text-xl md:text-2xl font-bold tracking-wide">{collegeCard.title}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
