import Header from '../components/Header'
import Footer from '../components/Footer'

const newsData = [
  {
    badge: 'CEC NEWS',
    date: 'August 14, 2026',
    title: 'CEC Celebrates Historic Success of Three LEPT Topnotchers',
    desc: 'Cebu Eastern College proudly celebrated the remarkable achievement of its three graduates who secured places in the Top 10 of the March 2026 Licensure Examination for Professional Teachers (LEPT). ...',
    img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80',
  },
  {
    badge: 'CEC NEWS',
    date: 'August 28, 2026',
    title: 'Grade 12 Students Celebrate the Culmination of Buwan ng Wika 2026',
    desc: "Cebu Eastern College's Grade 12 students successfully held the culmination of Buwan ng Wika 2026 on August 28, 2026, at the Upper Gymnasium.",
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
  },
]

export default function News() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] overflow-x-hidden">
      <Header />

      {/* Hero */}
      <div className="bg-[#0a1f44] pt-[120px] pb-20 text-center px-4">
        <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] font-bold text-white mb-4 tracking-wide">News & Events</h1>
        <p className="text-white/80 max-w-2xl mx-auto text-[12px] sm:text-[13px] leading-relaxed">
          Stay updated with the latest news, events, and announcements from Cebu Eastern College
        </p>
      </div>

      {/* News Cards */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {newsData.map((item, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow">
              <div className="relative h-[200px] sm:h-[240px]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-[#0a3182] text-white text-[10px] font-bold px-3 py-1 rounded tracking-wide">
                  {item.badge}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-[#666] text-[11px] sm:text-[12px] mb-3">{item.date}</p>
                <h3 className="text-[#0b1b42] text-[1.1rem] sm:text-[1.2rem] font-bold mb-3 leading-snug">{item.title}</h3>
                <p className="text-[#666] text-[12px] sm:text-[13px] leading-relaxed mb-5">{item.desc}</p>
                <a href="#" className="text-[#0b1b42] text-[12px] sm:text-[13px] font-bold inline-flex items-center gap-1 hover:text-[#0a3182] transition-colors">
                  Read Article
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
