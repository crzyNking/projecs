import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const campusData: Record<string, {
  title: string
  badge: string
  subtitle: string
  heroImg: string
  heroLabel: string
  address: string
  addressDetail: string
  mapImg: string
  zones: Array<{
    img: string
    tag: string
    title: string
    subTxt?: string
    desc: string
  }>
}> = {
  main: {
    title: 'Main Campus Showcase',
    badge: 'CAMPUS OVERVIEW',
    subtitle: 'A hyper-light, precision-engineered environment designed for scholarly pursuit. Explore the structural clarity and specialized zones that define Cebu Eastern College\'s downtown hub.',
    heroImg: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    heroLabel: 'Main Campus',
    address: '40 Leon Kilat Street',
    addressDetail: 'Pahina Central, downtown Cebu City',
    mapImg: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    zones: [
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 01',
        title: 'Administration Building & Main Gate',
        desc: 'The central hub for institutional leadership and secure campus access. Designed for operational clarity and efficient student services.',
      },
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 02',
        title: 'High School Building',
        desc: 'Multi-story academic blocks featuring dedicated instructional spaces optimized for focused secondary education and pre-collegiate preparation.',
      },
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 03',
        title: 'College Department',
        subTxt: 'BSIT, BSBA, BEEd, BSEd',
        desc: 'Higher education faculties housing degree programs in Information Technology, Business Administration, and Education within a rigorous academic framework.',
      },
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 04',
        title: 'Elementary & Kindergarten',
        desc: 'Foundational learning sectors designed with structural safety and clarity in mind, providing a highly organized environment for early childhood development.',
      },
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 05',
        title: 'Computer Laboratories',
        desc: 'Dedicated tech and IT learning spaces equipped with modern computers and software, designed to support students in developing digital literacy, programming skills, and technical training.',
      },
      {
        img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 06',
        title: 'Sports & Recreation',
        subTxt: 'Covered Court',
        desc: 'A dynamic facility designed for strength training, athletic conditioning, and fitness, providing the space and equipment needed to support an active lifestyle.',
      },
    ],
  },
  shs: {
    title: 'SHS Campus Showcase',
    badge: 'SENIOR HIGH SCHOOL',
    subtitle: 'A dedicated campus for senior high school students, providing specialized facilities and a focused learning environment for academic excellence.',
    heroImg: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    heroLabel: 'SHS Campus',
    address: 'D. Dionisio Jakosalem Street',
    addressDetail: 'Barangay Santo Niño, Cebu City',
    mapImg: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
    zones: [
      {
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 01',
        title: 'Main Entrance & Administration',
        desc: 'The welcoming gateway to the SHS campus, housing administrative offices and student services for a seamless school experience.',
      },
      {
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 02',
        title: 'Classrooms & Learning Spaces',
        desc: 'Modern, well-equipped classrooms designed to foster collaborative learning and academic engagement for senior high school students.',
      },
      {
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 03',
        title: 'Science Laboratories',
        desc: 'Fully equipped science labs for hands-on experimentation and research, supporting STEM education and practical learning.',
      },
      {
        img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80',
        tag: 'ZONE 04',
        title: 'Library & Study Center',
        desc: 'A quiet, resource-rich environment for independent study, research, and academic collaboration among students and faculty.',
      },
    ],
  },
}

export default function Campus() {
  const { campusId } = useParams<{ campusId: string }>()
  const navigate = useNavigate()
  const campus = campusData[campusId || 'main']

  if (!campus) {
    return (
      <div className="min-h-screen bg-[#0b1f40] overflow-x-hidden">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Campus Not Found</h2>
            <button onClick={() => navigate('/')} className="text-[#a8c4e6] underline">Return Home</button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b1f40] overflow-x-hidden">
      <Header />

      <main className="pt-[72px] max-w-[1000px] mx-auto px-4 sm:px-5 pb-10">
        {/* Hero Section */}
        <section className="bg-[#102a50] rounded-xl overflow-hidden mb-8 sm:mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <div className="text-center px-5 pt-10 pb-8 sm:px-10">
            <span className="inline-block bg-[#1b3a6b] text-[#a8c4e6] text-[0.65rem] sm:text-[0.7rem] font-extrabold px-4 py-1.5 rounded-full mb-5 tracking-[1px]">
              {campus.badge}
            </span>
            <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[2.8rem] font-extrabold text-white mb-4 sm:mb-5">
              {campus.title}
            </h2>
            <p className="text-[#a8b8d0] text-[0.85rem] sm:text-[0.95rem] leading-relaxed max-w-[750px] mx-auto">
              {campus.subtitle}
            </p>
          </div>
          <div className="relative">
            <img src={campus.heroImg} alt={campus.heroLabel} className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover" />
            <span className="absolute bottom-5 left-5 text-white font-semibold text-[0.9rem] sm:text-[15px]" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)' }}>
              {campus.heroLabel}
            </span>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-[#102a50] rounded-xl overflow-hidden mb-8 sm:mb-10 shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex flex-col md:flex-row">
          <div className="flex-1 px-6 py-10 sm:px-12 sm:py-14">
            <div className="flex items-center gap-3 text-white text-[1.3rem] sm:text-[1.5rem] font-extrabold mb-6">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <h2>Location</h2>
            </div>
            <h3 className="text-white text-[1.1rem] sm:text-[1.25rem] font-bold mb-3">{campus.address}</h3>
            <p className="text-[#a8b8d0] text-[0.8rem] sm:text-[0.9rem]">{campus.addressDetail}</p>
          </div>
          <div className="flex-1 p-5 sm:p-8 border-t md:border-t-0 md:border-l border-white/10">
            <img src={campus.mapImg} alt="Map" className="w-full h-[200px] sm:h-[250px] object-cover border border-white/10 rounded-lg" />
          </div>
        </section>

        {/* Zones Section */}
        <section className="bg-[#102a50] rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] px-5 py-10 sm:px-12 sm:py-14">
          <h2 className="text-white text-[1.3rem] sm:text-[1.5rem] font-extrabold pb-4 border-b border-white/10 mb-10 sm:mb-14">
            Academic & Structural Zones
          </h2>

          {campus.zones.map((zone, i) => {
            const isReverse = i % 2 !== 0
            return (
              <div
                key={zone.tag}
                className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-6 sm:gap-8 md:gap-12 mb-10 sm:mb-14 last:mb-0`}
              >
                <div className="w-full md:w-[45%] border border-white/10 p-1 rounded">
                  <img src={zone.img} alt={zone.title} className="w-full h-[180px] sm:h-[220px] md:h-[250px] object-cover" />
                </div>
                <div className={`flex-1 ${isReverse ? 'md:text-right md:flex md:flex-col md:items-end' : ''}`}>
                  <span className="inline-block border border-[#7b95c6] text-[#7b95c6] text-[0.6rem] font-bold px-2.5 py-1 tracking-[1px] mb-4">
                    {zone.tag}
                  </span>
                  <h3 className="text-white text-[1.2rem] sm:text-[1.35rem] font-bold mb-3">{zone.title}</h3>
                  {zone.subTxt && (
                    <p className="text-[#a8b8d0] text-[0.78rem] sm:text-[0.85rem] mb-3">{zone.subTxt}</p>
                  )}
                  <p className="text-[#a8b8d0] text-[0.8rem] sm:text-[0.85rem] leading-[1.7]">{zone.desc}</p>
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <Footer />
    </div>
  )
}
