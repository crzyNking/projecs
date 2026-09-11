import { useState } from 'react'
import { Link } from 'react-router-dom'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

export default function SeniorHigh() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#2C3E50] overflow-x-hidden">
      {/* Header — same as Home */}
      <header className="sticky top-0 z-50 bg-[#0b1f40] text-white border-b border-white/10" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 60px' }}>
        <div className="flex items-center gap-3 justify-self-start">
          <img src={CEC_LOGO} alt="CEC Logo" className="w-[42px] h-[42px] rounded-full object-cover bg-white" />
          <div>
            <div className="text-[15px] font-bold tracking-wide">Cebu Eastern College</div>
            <div className="text-[10px] text-[#94a3b8]">Leon Kilat St., Cebu City</div>
          </div>
        </div>

        <nav className="hidden md:flex gap-8 items-center justify-self-center" style={{ gridColumn: 2 }}>
          <Link to="/" className="text-[13.5px] text-[#cbd5e1] font-normal hover:text-white transition-colors">Home</Link>
          <Link to="/programs" className="text-[13.5px] text-[#cbd5e1] font-normal hover:text-white transition-colors">
            Programs
            <svg className="inline-block w-2.5 h-2.5 ml-1 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Link>
          {['Services', 'Enrollment', 'About'].map((item) => (
            <a key={item} href="#" className="text-[13.5px] text-[#cbd5e1] font-normal hover:text-white transition-colors">
              {item}
              <svg className="inline-block w-2.5 h-2.5 ml-1 opacity-60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all justify-self-end"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b1f40] px-4 pb-4 border-b border-white/10">
          <Link to="/" className="block text-sm text-[#cbd5e1] hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all">Home</Link>
          <Link to="/programs" className="block text-sm text-[#cbd5e1] hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all">Programs</Link>
          {['Services', 'Enrollment', 'About'].map((item) => (
            <a key={item} href="#" className="block text-sm text-[#cbd5e1] hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all">
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-5 py-10">
        {/* Hero Section */}
        <section className="flex rounded-xl overflow-hidden mb-[60px] shadow-[0_10px_25px_rgba(0,0,0,0.05)]">
          <div className="flex-1 bg-[#0A1C3E] text-white px-[50px] py-[60px] flex flex-col justify-center">
            <span className="inline-block border border-[#D6B265] text-[#D6B265] text-[0.7rem] font-semibold px-4 py-1.5 rounded-full mb-5 self-start tracking-wider">
              SENIOR HIGH SCHOOL
            </span>
            <h2 className="text-[2.8rem] leading-[1.2] mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#FDF1D6' }}>
              Bridging Education to Careers and Higher Learning
            </h2>
            <p className="text-[0.95rem] leading-[1.6] text-[#E5E7EB]">
              Equipping students with industry-relevant skills, critical thinking, and a strong ethical foundation to excel in specialized fields and leading universities globally.
            </p>
          </div>
          <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} />
        </section>

        {/* Academic Tracks */}
        <section>
          <div className="mb-8">
            <h2 className="text-[2rem] mb-2.5" style={{ fontFamily: "'Playfair Display', serif", color: '#0A1C3E' }}>Academic Tracks</h2>
            <p className="text-[#6B7280] text-[0.9rem]">Comprehensive specialized curriculums designed to align with your career aspirations and university goals.</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* STEM Card */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.02)] flex">
              <div className="flex-1 p-10">
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-4 text-[#1C3A6B]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <h3 className="text-[1.5rem] mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0A1C3E' }}>STEM</h3>
                <h4 className="text-[0.8rem] font-semibold mb-4 text-[#1C3A6B]">Science, Technology, Engineering, and Mathematics</h4>
                <p className="text-[#6B7280] text-[0.85rem] leading-[1.6]">
                  For students pursuing degrees in medicine, engineering, computer science, and pure sciences. Features advanced laboratory facilities and research-driven methodologies.
                </p>
              </div>
              <div className="flex-1 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#EF4444] to-transparent text-white text-center py-5 pb-2.5 text-[1.5rem] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  STEM
                </div>
              </div>
            </div>

            {/* ABM Card */}
            <div className="col-span-12 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="h-[180px] bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }}>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#D6B265] to-transparent text-black text-center py-5 pb-1.25 text-[1.5rem] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ABM
                </div>
              </div>
              <div className="p-6">
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-4 text-[#1C3A6B]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                  </svg>
                </div>
                <h3 className="text-[1.5rem] mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0A1C3E' }}>ABM</h3>
                <h4 className="text-[0.8rem] font-semibold mb-4 text-[#1C3A6B]">Accountancy, Business, and Management</h4>
                <p className="text-[#6B7280] text-[0.85rem] leading-[1.6]">
                  Tailored for future entrepreneurs, corporate leaders, and financial experts focusing on core business operations.
                </p>
              </div>
            </div>

            {/* HUMSS Card */}
            <div className="col-span-12 lg:col-span-6 bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.02)] p-10 relative">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] opacity-50 rounded-bl-full" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #F3F4F6 10px, #F3F4F6 20px)' }} />
              <div className="relative z-10">
                <div className="w-10 h-10 bg-[#F3F4F6] rounded-lg flex items-center justify-center mb-4 text-[#1C3A6B]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>
                </div>
                <h3 className="text-[1.5rem] mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#0A1C3E' }}>HUMSS</h3>
                <h4 className="text-[0.8rem] font-semibold mb-4 text-[#1C3A6B]">Humanities and Social Sciences</h4>
                <p className="text-[#6B7280] text-[0.85rem] leading-[1.6]">
                  Designed for future lawyers, educators, journalists, and public servants. Emphasizes communication, critical analysis, and social awareness.
                </p>
              </div>
            </div>

            {/* Immersion Card */}
            <div className="col-span-12 lg:col-span-6 bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.02)] flex">
              <div className="flex-1 bg-[#0A1C3E] text-white p-10">
                <span className="inline-block border border-[#D6B265] text-[#D6B265] text-[0.7rem] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider">
                  REAL-WORLD READY
                </span>
                <h3 className="text-[1.5rem] my-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Premium Work Immersion</h3>
                <p className="text-[#D1D5DB] text-[0.85rem] leading-[1.6]">
                  80+ hours of hands-on industry training with our network of top-tier corporate partners, tech firms, and medical institutions.
                </p>
              </div>
              <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')" }} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#07132B] text-[#9CA3AF] px-[5%] py-10 flex justify-between items-center text-[0.85rem]">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>(032) 256 2523</span>
          </div>
          <div className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span>cebueasterncollege1915@yahoo.com</span>
          </div>
          <div className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <span>LEON KILAT ST., Cebu City, Philippines, 6000</span>
          </div>
        </div>

        <div className="text-center text-[#6B7280]">
          &copy; 2024 Cebu Eastern College. All rights reserved.
        </div>

        <div className="text-right">
          <p className="text-white font-semibold text-[1rem] mb-2.5">Social Media</p>
          <div className="flex gap-4 justify-end">
            {['M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
              'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
              'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
              'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
            ].map((path, i) => (
              <a key={i} href="#" className="text-white hover:text-[#D6B265] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
