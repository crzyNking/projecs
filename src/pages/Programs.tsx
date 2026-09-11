import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

const k12Programs = [
  {
    title: 'Kindergarten',
    desc: 'The Kindergarten Department of CEC provides an excellent nurturing environment for early childhood education. Our focus is on developing foundational skills through play-based learning, creativity, and social interaction to build confident, curious learners ready for elementary education.',
    icon: 'M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
  },
  {
    title: 'Elementary',
    desc: 'The Elementary Department nurtures young minds with strong academic foundations. Our curriculum balances core subjects like Mathematics, Science, and English with arts and physical education to develop well-rounded students with critical thinking and problem-solving skills.',
    icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
  {
    title: 'Junior High School',
    desc: 'Offering diverse programs designed to strengthen critical thinking, creativity, and social development. Our Junior High School provides specialized tracks and extracurricular activities that prepare students for Senior High School and beyond with a strong academic and moral foundation.',
    icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
  },
  {
    title: 'Senior High School',
    desc: 'Provides specialized academic and practical training to effectively prepare students for college and careers. Offers academic, technical-vocational-livelihood (TVL), sports, and arts and design tracks with industry-relevant skills and real-world experience through immersion programs.',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
]

const collegePrograms = [
  {
    name: 'Bachelor of Science in Information Technology',
    desc: 'Equips students with comprehensive knowledge in software development, network administration, cybersecurity, database management, and emerging technologies. Graduates are prepared for careers in IT consulting, systems analysis, web development, and tech entrepreneurship.',
    icon: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 7.41A2.25 2.25 0 0 1 2.25 5.495V5.25',
  },
  {
    name: 'Bachelor of Science in Hospitality Management',
    desc: 'Develops future leaders in the hospitality and tourism industry through hands-on training in hotel operations, restaurant management, event planning, and customer service excellence. Students gain real-world experience through internships and industry partnerships.',
    icon: 'M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015A3.001 3.001 0 0 0 21 9.349',
  },
  {
    name: 'Bachelor of Science in Criminology',
    desc: 'Provides in-depth study of crime prevention, law enforcement, criminal justice system, and forensic science. Students develop analytical and investigative skills essential for careers in policing, corrections, probation, and private security.',
    icon: 'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  },
  {
    name: 'Bachelor of Science in Tourism Management',
    desc: 'Prepares students for dynamic careers in tourism planning, destination management, travel consultancy, and sustainable tourism development. Combines business acumen with cultural awareness and environmental stewardship for global competitiveness.',
    icon: 'M6.115 5.19l.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64',
  },
  {
    name: 'Bachelor of Secondary Education',
    desc: 'Trains future educators with pedagogical expertise and subject-matter competency for teaching at the secondary level. Includes classroom management, curriculum design, educational technology, and teaching practicum in partner schools.',
    icon: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
  },
  {
    name: 'Bachelor of Elementary Education',
    desc: 'Develops competent and compassionate elementary school teachers equipped with modern teaching methodologies. Covers child development, inclusive education, differentiated instruction, and hands-on teaching practice in actual classroom settings.',
    icon: 'M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25',
  },
]

export default function Programs() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* Header */}
      <header className="bg-[#002366] flex items-center justify-between px-[50px] py-[14px] shadow-md">
        <Link to="/" className="flex items-center gap-3">
          <img src={CEC_LOGO} alt="CEC Logo" className="w-[42px] h-[42px] rounded-full object-cover bg-white" />
          <div>
            <div className="text-white font-extrabold text-[15px] tracking-wide leading-tight">CEBU EASTERN COLLEGE</div>
            <div className="text-[#93b4e8] text-[9.5px] tracking-[0.2em] font-light uppercase">Inc.</div>
          </div>
        </Link>
        <nav className="flex gap-7 items-center text-[13px]">
          <Link to="/" className="text-white hover:text-[#60a5fa] transition-colors">Home</Link>
          <span className="text-[#60a5fa] font-bold border-b-2 border-[#60a5fa] pb-0.5">Programs</span>
          <Link to="/" className="text-white hover:text-[#60a5fa] transition-colors">About</Link>
          <Link to="/" className="text-white hover:text-[#60a5fa] transition-colors">Contact</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-[#002366] px-[50px] py-[50px]">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#1d4ed8]/30 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-[#60a5fa]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
          </div>
          <h1 className="text-white text-4xl font-extrabold mb-3">Academic Programs</h1>
          <p className="text-[#93b4e8] text-sm max-w-xl">
            Discover our comprehensive range of educational programs from Kindergarten through College. CEC is committed to nurturing future leaders through quality education.
          </p>
        </div>
      </section>

      {/* K-12 Section */}
      <section id="k12" className="py-[60px] px-[50px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1d4ed8]/10 text-[#1d4ed8] px-4 py-1.5 rounded-full text-xs font-bold mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
              K-12 Education
            </div>
            <h2 className="text-3xl font-extrabold text-[#002366] mb-2">Basic Education Programs</h2>
            <p className="text-[13px] text-[#64748b] max-w-lg mx-auto">Building strong foundations from early childhood through senior high school</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {k12Programs.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1e293b] mb-2">{item.title}</h3>
                <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">{item.desc}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1d4ed8] hover:underline">
                  Learn More
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Section */}
      <section id="college" className="py-[60px] px-[50px] bg-[#f8fafc]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1d4ed8]/10 text-[#1d4ed8] px-4 py-1.5 rounded-full text-xs font-bold mb-4">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
              </svg>
              College Programs
            </div>
            <h2 className="text-3xl font-extrabold text-[#002366] mb-2">Undergraduate Degree Programs</h2>
            <p className="text-[13px] text-[#64748b] max-w-lg mx-auto">Professional programs designed to produce competent graduates ready for the global workforce</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {collegePrograms.map((prog) => (
              <div key={prog.name} className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#dbeafe] text-[#1d4ed8] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d={prog.icon} />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-[#1e293b] mb-2">{prog.name}</h3>
                <p className="text-[13px] text-[#64748b] leading-relaxed mb-4">{prog.desc}</p>
                <a href="#" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1d4ed8] hover:underline">
                  Learn More
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-[50px] px-[50px] bg-[#002366] text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-white text-2xl font-extrabold mb-3">Ready to Start Your Journey?</h2>
          <p className="text-[#93b4e8] text-[13px] mb-6">Join thousands of students who have found their path at Cebu Eastern College.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="bg-[#eab308] text-[#002366] px-7 py-2.5 rounded-lg text-[13px] font-bold hover:bg-[#d4a20a] transition-colors">
              Apply Now
            </Link>
            <Link to="/" className="border-2 border-white text-white px-7 py-2.5 rounded-lg text-[13px] font-bold hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#03112d] text-[#94a3b8] text-[11.5px] border-t border-white/5 px-[50px] py-[30px]" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'flex-end' }}>
        <div className="flex flex-col gap-2">
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
            <span>LEON KILAT ST. , Cebu City, Philippines, 6000</span>
          </div>
        </div>

        <div className="text-center justify-self-center">
          &copy; 2024 Cebu Eastern College. All rights reserved.
        </div>

        <div className="text-right justify-self-end">
          <h4 className="text-white text-xs font-bold mb-2.5">Social Media</h4>
          <div className="flex gap-3 justify-end">
            {[
              { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' },
              { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="text-white hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
