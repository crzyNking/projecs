import { Link, useLocation } from 'react-router-dom'

const CEC_LOGO = 'https://scontent.fmnl4-7.fna.fbcdn.net/v/t39.30808-6/302130535_582267347020947_5642845133722350033_n.jpg?stp=dst-jpg_tt6&cstp=mx2043x2048&ctp=s2043x2048&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQ-qulZKv6ih1XSQMneMJo0E3N8tptuK7QTc3y2m24rvOZF2gXoVReo42hSnhjrOVF3VaaiIacXYLr4V0tLBnV&_nc_ohc=RA_aF6P5RwgQ7kNvwFu3Xg6&_nc_oc=AdqITaBrsXZ2_5mgT4X8oeaexeru1AH57khtFbcB-Y7ghPP8InlrVAu4Zn6tycPx_1g&_nc_zt=23&_nc_ht=scontent.fmnl4-7.fna&_nc_gid=L8FYEtP78WmxVwzWwW2ijg&_nc_ss=7b2a8&oh=00_AQKRNzwxtkCz0g_6DAaJNgj7bF9fKKDf6T1bSjvNHaSSGg&oe=6AA9B10C'

export default function Header() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-[#0b1f40] text-white border-b border-white/10" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 60px' }}>
      <div className="flex items-center gap-3 justify-self-start">
        <img src={CEC_LOGO} alt="CEC Logo" className="w-[42px] h-[42px] rounded-full object-cover bg-white" />
        <div>
          <div className="text-[15px] font-bold tracking-wide">Cebu Eastern College</div>
          <div className="text-[10px] text-[#94a3b8]">Leon Kilat St., Cebu City</div>
        </div>
      </div>

      <nav className="hidden md:flex gap-8 items-center justify-self-center" style={{ gridColumn: 2 }}>
        <Link to="/" className={`text-[13.5px] font-normal transition-colors ${isActive('/') ? 'text-white border-b-2 border-white pb-1' : 'text-[#cbd5e1] hover:text-white'}`}>Home</Link>
        <Link to="/programs" className={`text-[13.5px] font-normal transition-colors ${isActive('/programs') || isActive('/senior-high') ? 'text-white border-b-2 border-white pb-1' : 'text-[#cbd5e1] hover:text-white'}`}>
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

      <div className="justify-self-end md:hidden">
        <button className="p-2 rounded-lg text-[#cbd5e1] hover:text-white hover:bg-white/10 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        </button>
      </div>
    </header>
  )
}
