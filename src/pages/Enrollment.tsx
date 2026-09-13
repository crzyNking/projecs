import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface EnrollmentSettings {
  is_open: boolean
  academic_year: string
  announcement: string
  instructions: string
  requirements: string
  contact_info: string
  application_url: string
  k12_info: string
  college_info: string
}

interface Program {
  id: string
  title: string
  description: string
  category: string
}

const defaultK12 = [
  { title: 'Kindergarten', desc: 'Ages 3-5', path: '/enrollment/kindergarten', icon: '🌱' },
  { title: 'Elementary', desc: 'Grades 1-6', path: '/enrollment/elementary', icon: '📚' },
  { title: 'Junior High School', desc: 'Grades 7-10', path: '/enrollment/junior-high', icon: '🎓' },
  { title: 'Senior High School', desc: 'Grades 11-12', path: '/enrollment/senior-high', icon: '🏫' },
]

export default function Enrollment() {
  const [settings, setSettings] = useState<EnrollmentSettings | null>(null)
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [settingsRes, programsRes] = await Promise.all([
      supabase.from('enrollment_settings').select('*').limit(1).maybeSingle(),
      supabase.from('programs').select('*').eq('is_active', true).order('sort_order'),
    ])
    setSettings(settingsRes.data)
    setPrograms(programsRes.data || [])
    setLoading(false)
  }

  const collegePrograms = programs.filter((p) => p.category === 'college')

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Header />

      {/* Hero */}
      <section className="bg-[#0b1f40] py-16 sm:py-24 px-4 text-center">
        <div className="max-w-[800px] mx-auto">
          <span className="inline-block bg-[#C4CCE8] text-[#2C2E68] text-[11px] font-bold tracking-[0.06em] px-3.5 py-1.5 rounded mb-5">
            ENROLL NOW
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white mb-4">
            Start Your Journey at CEC
          </h1>
          <p className="text-[15px] text-white/60 leading-relaxed">
            {settings?.announcement || 'Choose the program that fits your educational goals and begin your path to excellence.'}
          </p>
          {settings?.is_open && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Enrollment is OPEN — {settings?.academic_year || '2026-2027'}
            </div>
          )}
          {!settings?.is_open && settings !== null && (
            <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-red-400 rounded-full" />
              Enrollment is currently CLOSED
            </div>
          )}
        </div>
      </section>

      <div className="max-w-[1040px] mx-auto px-5 py-10 pb-20">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#13275c]/30 border-t-[#13275c] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Instructions */}
            {settings?.instructions && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="font-bold text-[#00004D] mb-3">Enrollment Instructions</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{settings.instructions}</p>
              </div>
            )}

            {/* Requirements */}
            {settings?.requirements && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
                <h2 className="font-bold text-[#00004D] mb-3">Requirements</h2>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{settings.requirements}</p>
              </div>
            )}

            {/* K-12 Programs */}
            <h2 className="text-2xl font-extrabold text-[#00004D] mb-6">K-12 Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {defaultK12.map((level) => (
                <Link
                  key={level.title}
                  to={settings?.is_open ? level.path : '#'}
                  className={`bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-center group ${!settings?.is_open ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="text-3xl mb-3">{level.icon}</div>
                  <h3 className="font-bold text-[#00004D] mb-1">{level.title}</h3>
                  <p className="text-sm text-gray-500">{level.desc}</p>
                  {settings?.is_open && (
                    <span className="inline-block mt-3 text-sm font-semibold text-[#13275c] group-hover:underline">Apply Now →</span>
                  )}
                </Link>
              ))}
            </div>

            {/* College Programs */}
            <h2 className="text-2xl font-extrabold text-[#00004D] mb-6">College Programs</h2>
            {collegePrograms.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-400 shadow-sm border border-gray-100">
                College programs will be available soon.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {collegePrograms.map((program) => (
                  <div key={program.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-[#00004D] mb-2">{program.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{program.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Contact */}
            {settings?.contact_info && (
              <div className="mt-8 bg-[#eef1fb] rounded-xl p-6 text-center">
                <p className="text-sm text-[#13275c]">{settings.contact_info}</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
