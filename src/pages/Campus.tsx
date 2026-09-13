import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const placeholder = 'https://placehold.co/600x400/38a0f4/ffffff?text=CEBU+EASTERN+COLLEGE'

const zones = [
  {
    img: placeholder,
    tag: 'ZONE 01',
    title: 'Administration Building & Main Gate',
    desc: 'The central hub for institutional leadership and secure campus access. Designed for operational clarity and efficient student services.',
  },
  {
    img: placeholder,
    tag: 'ZONE 02',
    title: 'High School Building',
    desc: 'Multi-story academic blocks featuring dedicated instructional spaces optimized for focused secondary education and pre-collegiate preparation.',
  },
  {
    img: placeholder,
    tag: 'ZONE 03',
    title: 'College Department',
    subTxt: 'BSIT, BSBA, BEEd, BSEd',
    desc: 'Higher education faculties housing degree programs in Information Technology, Business Administration, and Education within a rigorous academic framework.',
  },
  {
    img: placeholder,
    tag: 'ZONE 04',
    title: 'Elementary & Kindergarten',
    desc: 'Foundational learning sectors designed with structural safety and clarity in mind, providing a highly organized environment for early childhood development.',
  },
  {
    img: placeholder,
    tag: 'ZONE 05',
    title: 'Computer Laboratories',
    desc: 'Dedicated tech and IT learning spaces equipped with modern computers and software, designed to support students in developing digital literacy, programming skills, and technical training.',
  },
  {
    img: placeholder,
    tag: 'ZONE 06',
    title: 'Sports & Recreation',
    subTxt: 'Covered Court',
    desc: 'is a dynamic facility designed for strength training, athletic conditioning, and fitness, providing the space and equipment needed to support an active lifestyle.',
  },
]

const campusData: Record<string, {
  title: string
  badge: string
  subtitle: string
  heroImg: string
  heroLabel: string
  address: string
  addressDetail: string
  mapImg: string
}> = {
  main: {
    title: 'Main Campus Showcase',
    badge: 'CAMPUS OVERVIEW',
    subtitle: 'A hyper-light, precision-engineered environment designed for scholarly pursuit. Explore the structural clarity and specialized zones that define Cebu Eastern College\'s downtown hub.',
    heroImg: placeholder,
    heroLabel: 'Main Campus',
    address: '40 Leon Kilat Street',
    addressDetail: 'Pahina Central, downtown Cebu City',
    mapImg: placeholder,
  },
  shs: {
    title: 'SHS Campus Showcase',
    badge: 'SENIOR HIGH SCHOOL',
    subtitle: 'A dedicated campus for senior high school students, providing specialized facilities and a focused learning environment for academic excellence.',
    heroImg: placeholder,
    heroLabel: 'SHS Campus',
    address: 'D. Dionisio Jakosalem Street',
    addressDetail: 'Barangay Santo Niño, Cebu City',
    mapImg: placeholder,
  },
}

export default function Campus() {
  const { campusId } = useParams<{ campusId: string }>()
  const navigate = useNavigate()
  const campus = campusData[campusId || 'main']

  if (!campus) {
    return (
      <div className="min-h-screen bg-[#0A214D] overflow-x-hidden">
        <Header />
        <main className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Campus Not Found</h2>
            <button onClick={() => navigate('/')} className="text-blue-300 underline hover:text-white transition-colors">Return Home</button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A214D] overflow-x-hidden">
      <Header />

      <main className="pt-[72px] pb-10 flex justify-center">
        <div className="w-full max-w-[1050px] bg-white min-h-screen px-5 sm:px-10 py-8 sm:py-10">

          {/* Hero Section */}
          <section className="mb-10 sm:mb-14">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block bg-[#c6d2e8] text-[#1b225c] text-[0.65rem] sm:text-[0.7rem] font-extrabold px-4 py-1.5 rounded-full mb-5 tracking-[1px]">
                {campus.badge}
              </span>
              <h2 className="text-[1.8rem] sm:text-[2.5rem] md:text-[2.6rem] font-bold text-[#0C1A4A] mb-4 sm:mb-5" style={{ letterSpacing: '0.5px' }}>
                {campus.title}
              </h2>
              <p className="text-[#666666] text-[0.85rem] sm:text-[0.95rem] leading-[1.7] max-w-[750px] mx-auto">
                {campus.subtitle}
              </p>
            </div>
            <div className="border border-[#E5E5E5] p-2">
              <img src={campus.heroImg} alt={campus.heroLabel} className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover block" style={{ aspectRatio: '3/2' }} />
            </div>
          </section>

          {/* Location Section */}
          <section className="mb-10 sm:mb-14">
            <div className="flex flex-col md:flex-row items-stretch gap-0">
              <div className="flex-1 px-6 py-10 sm:px-10">
                <div className="flex items-center gap-3 text-[#0C1A4A] text-[1.3rem] sm:text-[1.4rem] font-bold mb-6">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <h2>Location</h2>
                </div>
                <h3 className="text-[#0C1A4A] text-[1.1rem] font-bold mb-2">{campus.address}</h3>
                <p className="text-[#666666] text-[0.85rem]">{campus.addressDetail}</p>
              </div>
              <div className="flex-1 p-5 sm:p-8 border-t md:border-t-0 md:border-l border-[#E5E5E5]">
                <img src={campus.mapImg} alt="Map" className="w-full h-[200px] sm:h-[250px] object-cover border border-[#E5E5E5] block" />
              </div>
            </div>
          </section>

          {/* Zones Section */}
          <section>
            <h2 className="text-[#0C1A4A] text-[1.4rem] sm:text-[1.6rem] font-bold mb-4" style={{ letterSpacing: '0.5px' }}>
              Academic & Structural Zones
            </h2>
            <hr className="border-none border-t border-[#E5E5E5] mb-10" />

            <div className="flex flex-col" style={{ gap: '40px' }}>
              {zones.map((zone, i) => {
                const isEven = i % 2 !== 0
                return (
                  <div key={zone.tag} className={`flex flex-col items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`} style={{ gap: '30px' }}>
                    <div className="w-full md:w-[55%] border border-[#E5E5E5] p-2 shrink-0">
                      <img src={zone.img} alt={zone.title} className="w-full block object-cover" style={{ aspectRatio: '3/2' }} />
                    </div>
                    <div className={`flex-1 flex flex-col justify-center ${isEven ? 'items-end text-right' : 'items-start text-left'}`}>
                      <span className="inline-block border border-[#0C1A4A] text-[#0C1A4A] text-[11px] font-bold tracking-[1px] px-2 py-1 mb-4">
                        {zone.tag}
                      </span>
                      <h2 className="text-[#0C1A4A] text-[22px] font-bold mb-3">{zone.title}</h2>
                      {zone.subTxt && (
                        <p className="text-[#666666] text-[13px] font-semibold mb-3">{zone.subTxt}</p>
                      )}
                      <p className={`text-[#666666] text-[13px] leading-[1.7] max-w-[90%] ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                        {zone.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
