import { useSettings } from '../hooks/useSettings'

export default function Footer() {
  const { school } = useSettings()
  const phone = school?.phone || '(032) 256 2523'
  const email = school?.email || 'cebueasterncollege1915@yahoo.com'
  const address = school?.address || 'Leon Kilat St., Cebu City'
  const schoolName = school?.school_name || 'Cebu Eastern College'
  const facebook = school?.facebook || '#'
  const copyright = school?.footer_text || ''

  return (
    <footer className="bg-[#061830] text-white/60 text-[13px] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {school?.website_logo ? (
                <img src={school.website_logo} alt={schoolName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f2545b] via-[#f7b32b] to-[#6dd5ed]" />
              )}
              <span className="text-white font-bold text-sm">{schoolName}</span>
            </div>
            <p className="leading-relaxed text-[12px]">
              {school?.school_description || 'A premier educational institution in Cebu City, providing quality education since 1915.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[13px] mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/enrollment/kindergarten" className="hover:text-white transition-colors">Enrollment</a></li>
              <li><a href="/senior-high" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="/news" className="hover:text-white transition-colors">News & Events</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-[13px] mb-3">Contact Us</h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors break-all">{email}</a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              {facebook && facebook !== '#' && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-[11px]">
          <p>&copy; {new Date().getFullYear()} {schoolName}. All rights reserved.</p>
          {copyright && <p className="mt-1">{copyright}</p>}
        </div>
      </div>
    </footer>
  )
}
