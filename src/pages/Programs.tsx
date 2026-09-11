import { useState } from 'react'
import { Link } from 'react-router-dom'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

const k12Cards = [
  { title: 'Kindergarten', desc: 'The Kindergarten Department of CEC provides a supportive environment that fosters early growth, creativity, and basic skills for young learners.', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=400&q=80' },
  { title: 'Elementary', desc: 'The Elementary Department nurtures young minds with strong values, foundational academic skills, and lifelong learning habits.', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80' },
  { title: 'Junior High School', desc: 'Offering dynamic programs designed to strengthen critical thinking, character, and personal development in preparation for higher education.', img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=400&q=80' },
  { title: 'Senior High School', desc: 'Provides specialized academic tracks and practical training to effectively prepare students for college and future careers.', img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80' },
]

const collegePrograms = [
  { name: 'Bachelor of Science in Information Technology', icon: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 7.41A2.25 2.25 0 0 1 2.25 5.495V5.25' },
  { name: 'Bachelor of Science in Hospitality Management', icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015A3.001 3.001 0 0 0 21 9.349' },
  { name: 'Bachelor of Science in Criminology', icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z' },
  { name: 'Bachelor of Science in Tourism Management', icon: 'M6.115 5.19l.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64' },
  { name: 'Bachelor of Secondary Education', icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5' },
  { name: 'Bachelor of Elementary Education', icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25' },
]

const academicCards = [
  { icon: '🎓', title: 'Basic Education', desc: 'A strong foundation for lifelong learning, fostering curiosity and critical thinking.' },
  { icon: '📖', title: 'Senior High', desc: 'Specialized tracks preparing students for college and future careers.' },
  { icon: '🏛️', title: 'Higher Education', desc: 'Professional degree programs shaping the industry leaders of tomorrow.' },
]

export default function Programs() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#333333] overflow-x-hidden">
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
          <span className="text-[13.5px] text-white font-normal border-b-2 border-white pb-1">Programs</span>
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
          <span className="block text-sm text-white py-2 px-3 rounded-lg bg-white/10">Programs</span>
          {['Services', 'Enrollment', 'About'].map((item) => (
            <a key={item} href="#" className="block text-sm text-[#cbd5e1] hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all">
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero with Programs Overlay Card */}
      <section className="relative py-[40px] px-4 flex justify-center" style={{ background: "linear-gradient(rgba(10, 25, 47, 0.65), rgba(10, 25, 47, 0.65)), url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat" }}>
        <div className="w-full max-w-[1100px] rounded-2xl p-[35px_40px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] grid lg:grid-cols-2 gap-[40px] border border-white/10" style={{ background: 'rgba(6, 25, 68, 0.92)', backdropFilter: 'blur(8px)' }}>

          {/* K-12 Education */}
          <div>
            <div className="flex items-center gap-2.5 text-white text-[18px] font-bold pb-3 border-b-2 border-[#1e3a8a] mb-5">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              <span>K-12 Education</span>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {k12Cards.map((item) => (
                <div key={item.title} className="bg-white rounded-lg overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.1)] flex flex-col">
                  <div className="h-[100px] bg-cover bg-center relative" style={{ backgroundImage: `url('${item.img}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end px-3 py-2">
                      <h4 className="text-white text-[14px] font-bold drop-shadow-md">{item.title}</h4>
                    </div>
                  </div>
                  <div className="p-2.5 flex flex-col flex-grow justify-between">
                    <p className="text-[10px] text-[#475569] leading-[1.3] mb-2.5">{item.desc}</p>
                    <a href="#" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1d4ed8] hover:underline">
                      Learn More
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* College Programs */}
          <div>
            <div className="flex items-center gap-2.5 text-white text-[18px] font-bold pb-3 border-b-2 border-[#1e3a8a] mb-5">
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
              <span>College Programs</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {collegePrograms.map((prog) => (
                <button key={prog.name} className="flex items-center justify-between rounded-lg px-3.5 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-md cursor-pointer" style={{ background: 'linear-gradient(90deg, #dbe2ef 0%, #e2e8f0 100%)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#1e3a8a] text-white flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={prog.icon} />
                      </svg>
                    </div>
                    <span className="text-[12px] font-bold text-[#1e293b] text-left">{prog.name}</span>
                  </div>
                  <svg className="w-2.5 h-2.5 text-[#94a3b8] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academic Excellence */}
      <section className="py-[60px] px-10 bg-[#f8fafc] text-center">
        <h2 className="text-[26px] font-extrabold text-[#002366] mb-2">Academic Excellence</h2>
        <p className="text-[13px] text-[#64748b] mb-[45px]">Comprehensive educational programs designed to nurture future leaders.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {academicCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-lg p-[30px_25px] text-left border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] flex flex-col hover:shadow-lg transition-shadow"
            >
              <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center text-sm mb-5">
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-[#1e293b] mb-3">{card.title}</h3>
              <p className="text-[12.5px] text-[#64748b] leading-relaxed mb-5 flex-grow">{card.desc}</p>
              <a href="#" className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#1d4ed8] hover:underline">
                Learn More
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-[70px] px-10 bg-[#f1f5f9]">
        <div className="max-w-[1050px] mx-auto flex flex-col lg:flex-row items-center gap-[60px]">
          <div className="flex-shrink-0 flex justify-center items-center lg:w-[260px]">
            <img
              src={CEC_LOGO}
              alt="CEC Seal"
              className="w-full max-w-[240px] h-auto object-contain mix-blend-multiply transition-transform hover:scale-[1.03]"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-[26px] font-extrabold text-[#002366] mb-4">Our Heritage & Mission</h2>
            <p className="text-[13px] text-[#64748b] leading-relaxed mb-[30px]">
              Founded in 1915, Cebu Eastern College has stood as a pillar of academic excellence in Cebu City. We remain committed to our founding principle: delivering top-tier, quality education that is accessible and affordable to all aspiring minds.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { title: 'Affordable Tuition', desc: 'Quality education without the heavy financial burden.' },
                { title: 'Diverse Community', desc: 'A welcoming environment for students from all backgrounds.' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="mt-0.5 text-[#1d4ed8]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-[#1e293b] mb-1">{f.title}</h4>
                    <p className="text-[11.5px] text-[#64748b] leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] bg-[#031548] text-center text-white">
        <h2 className="text-[28px] font-extrabold mb-2.5 tracking-tight">Join the Easternian<br />Community</h2>
        <p className="text-[13px] text-[#cbd5e1] mb-6">Begin your journey towards academic excellence and personal growth today.</p>
        <Link to="/" className="bg-white text-[#031548] font-bold text-[13px] px-6 py-2.5 rounded-md hover:bg-[#f1f5f9] transition-colors">
          Sign Up Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#020d2d] text-[#94a3b8] text-[11px] border-t border-white/5 px-[80px] py-[30px]">
        <div className="max-w-[1100px] mx-auto flex justify-between items-end pb-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span>(032) 256 2523</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>cebueasterncollege1915@yahoo.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>LEON KILAT ST. , Cebu City, Philippines, 6000</span>
            </div>
          </div>

          <div className="text-center text-[#64748b]">
            &copy; 2024 Cebu Eastern College. All rights reserved.
          </div>

          <div className="text-right">
            <p className="text-white font-bold text-[12px] mb-2">Social Media</p>
            <div className="flex gap-3 justify-end">
              {['M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
                'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
                'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
              ].map((path, i) => (
                <a key={i} href="#" className="text-white hover:text-[#60a5fa] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
