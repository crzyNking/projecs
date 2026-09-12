interface ServicesDropdownProps {
  open: boolean
}

const services = [
  { name: 'REGISTRAR', icon: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8' },
  { name: 'EDP', icon: 'M9 17H7A5 5 0 0 1 7 7h2 M15 7h2a5 5 0 1 1 0 10h-2 M8 12h8' },
  { name: 'ACCOUNTING', icon: 'M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' },
  { name: 'CLINIC', icon: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { name: 'LIBRARY', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z' },
  { name: 'GUIDANCE', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
]

export default function ServicesDropdown({ open }: ServicesDropdownProps) {
  if (!open) return null

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]">
      {/* Desktop */}
      <div className="hidden md:block relative w-[min(540px,calc(100vw-2rem))] bg-[#061830] rounded-2xl shadow-2xl border border-white/10 p-5 xl:p-7">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#061830] border-l border-t border-white/10 rotate-45" />

        <div className="flex items-center gap-3 mb-3">
          <svg className="w-7 h-7 text-[#f7e0b5]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 7.5L12 13L23 7.5L12 2Z" />
            <path d="M4 9.5V15.5L12 19.5L20 15.5V9.5L12 13.5L4 9.5Z" />
          </svg>
          <h2 className="text-[#f7e0b5] text-[18px] font-semibold tracking-wide">Services</h2>
        </div>

        <hr className="h-[2px] bg-[#7b95c6] border-none mb-5" />

        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-xl h-[150px] flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-[52px] h-[52px] bg-[#f4f4f4] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#061830]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d={service.icon} />
                </svg>
              </div>
              <span className="text-[#061830] text-[13px] font-bold tracking-wider">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden w-[calc(100vw-32px)] max-w-[400px] bg-[#061830] rounded-2xl shadow-2xl border border-white/10 p-5 max-h-[80vh] overflow-y-auto">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#061830] border-l border-t border-white/10 rotate-45" />

        <div className="flex items-center gap-2.5 mb-3">
          <svg className="w-6 h-6 text-[#f7e0b5]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 7.5L12 13L23 7.5L12 2Z" />
            <path d="M4 9.5V15.5L12 19.5L20 15.5V9.5L12 13.5L4 9.5Z" />
          </svg>
          <h2 className="text-[#f7e0b5] text-[16px] font-semibold tracking-wide">Services</h2>
        </div>

        <hr className="h-[2px] bg-[#7b95c6] border-none mb-4" />

        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-xl h-[120px] flex flex-col items-center justify-center gap-2.5 cursor-pointer"
            >
              <div className="w-[44px] h-[44px] bg-[#f4f4f4] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#061830]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d={service.icon} />
                </svg>
              </div>
              <span className="text-[#061830] text-[12px] font-bold tracking-wider">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
