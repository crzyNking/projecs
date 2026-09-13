import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface CampusData {
  name: string
  tagline: string
  description: string
  heroImg: string
  address: string
  addressDetail: string
  mapImg: string
  zones: {
    tag: string
    title: string
    subtitle?: string
    desc: string
    img: string
    reverse?: boolean
  }[]
}

const campuses: Record<string, CampusData> = {
  main: {
    name: 'Main Campus',
    tagline: 'CAMPUS OVERVIEW',
    description: 'A hyper-light, precision-engineered environment designed for scholarly pursuit. Explore the structural clarity and specialized zones that define Cebu Eastern College\'s downtown hub.',
    heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    address: '40 Leon Kilat Street',
    addressDetail: 'Pahina Central, downtown Cebu City',
    mapImg: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    zones: [
      { tag: 'ZONE 01', title: 'Administration Building & Main Gate', desc: 'The central hub for institutional leadership and secure campus access. Designed for operational clarity and efficient student services.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { tag: 'ZONE 02', title: 'High School Building', desc: 'Multi-story academic blocks featuring dedicated instructional spaces optimized for focused secondary education and pre-collegiate preparation.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', reverse: true },
      { tag: 'ZONE 03', title: 'College Department', subtitle: 'BSIT, BSBA, BEEd, BSEd', desc: 'Higher education faculties housing degree programs in Information Technology, Business Administration, and Education within a rigorous academic framework.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { tag: 'ZONE 04', title: 'Elementary & Kindergarten', desc: 'Foundational learning sectors designed with structural safety and clarity in mind, providing a highly organized environment for early childhood development.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', reverse: true },
      { tag: 'ZONE 05', title: 'Computer Laboratories', desc: 'Dedicated tech and IT learning spaces equipped with modern computers and software, designed to support students in developing digital literacy, programming skills, and technical training.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { tag: 'ZONE 06', title: 'Sports & Recreation', subtitle: 'Covered Court', desc: 'A dynamic facility designed for strength training, athletic conditioning, and fitness, providing the space and equipment needed to support an active lifestyle.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', reverse: true },
    ],
  },
  shs: {
    name: 'SHS Campus',
    tagline: 'SENIOR HIGH SCHOOL',
    description: 'Located at D. Dionisio Jakosalem Street in Barangay Santo Niño, the Cebu Eastern College SHS Campus serves as a dedicated hub for senior high school students.',
    heroImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    address: 'D. Dionisio Jakosalem Street',
    addressDetail: 'Barangay Santo Niño, Cebu City',
    mapImg: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    zones: [
      { tag: 'ZONE 01', title: 'Main Entrance & Admin Office', desc: 'The primary gateway to the SHS campus with administrative offices for enrollment, records, and student services.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { tag: 'ZONE 02', title: 'Academic Classrooms', desc: 'Modern learning spaces designed for specialized senior high school tracks including ABM, STEM, HUMSS, and TVL.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', reverse: true },
      { tag: 'ZONE 03', title: 'Science Laboratories', desc: 'Fully equipped science labs for hands-on experimentation and research in biology, chemistry, and physics.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { tag: 'ZONE 04', title: 'Library & Study Areas', desc: 'Quiet spaces for research, study groups, and individual learning with access to digital and physical resources.', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', reverse: true },
    ],
  },
}

export default function Campus() {
  const { campusId } = useParams<{ campusId: string }>()
  const navigate = useNavigate()
  const campus = campuses[campusId || 'main']

  if (!campus) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campus Not Found</h1>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Go Home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />

      <div className="pt-[57px]">
        {/* Hero Section */}
        <section className="bg-white">
          <div className="py-12 sm:py-16 px-4 sm:px-10 text-center">
            <span className="inline-block bg-[#dbeafe] text-[#1e3a8a] text-[10px] font-bold px-3.5 py-1.5 rounded-full tracking-wider mb-5">
              {campus.tagline}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold text-[#0c1433] mb-4">
              {campus.name} Showcase
            </h1>
            <p className="text-sm text-[#6b7280] max-w-[700px] mx-auto leading-relaxed">
              {campus.description}
            </p>
          </div>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] overflow-hidden">
            <img src={campus.heroImg} alt={campus.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-5 left-7 text-white font-semibold text-base sm:text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              {campus.name}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white mt-7">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0c1433]">Location</h2>
              </div>
              <h3 className="text-lg font-semibold text-[#0c1433] mb-2">{campus.address}</h3>
              <p className="text-sm text-[#6b7280]">{campus.addressDetail}</p>
            </div>
            <div className="flex-[1.5] border border-gray-200 min-h-[250px] relative bg-gray-50">
              <img src={campus.mapImg} alt="Map" className="w-full h-full object-cover opacity-50 grayscale contrast-125 brightness-110" />
              <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" fill="#003366" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" fill="white" />
              </svg>
            </div>
          </div>
        </section>

        {/* Zones Section */}
        <section className="bg-white mt-7">
          <div className="px-8 sm:px-10 py-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0c1433]">Academic & Structural Zones</h2>
          </div>

          <div className="px-8 sm:px-10 py-10 space-y-16">
            {campus.zones.map((zone, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-10 ${zone.reverse ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 border-4 border-white outline outline-1 outline-gray-200 h-[250px] sm:h-[280px] shadow-sm overflow-hidden">
                  <img src={zone.img} alt={zone.title} className="w-full h-full object-cover" />
                </div>
                <div className={`flex-1 ${zone.reverse ? 'md:text-right md:flex md:flex-col md:items-end' : ''}`}>
                  <span className="inline-block border border-[#1e3a8a] text-[#1e3a8a] text-[10px] font-semibold px-2 py-0.5 tracking-wider mb-4">
                    {zone.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0c1433] mb-2.5">{zone.title}</h3>
                  {zone.subtitle && <p className="text-xs text-[#6b7280] font-medium mb-2.5">{zone.subtitle}</p>}
                  <p className="text-[13px] text-[#6b7280] leading-relaxed">{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
