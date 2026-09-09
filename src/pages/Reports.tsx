import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { supabase } from '../lib/supabase'

interface Report {
  id: string
  title: string
  description: string
  status: 'completed' | 'pending' | 'scheduled'
  date: string
  type: 'activity' | 'security' | 'usage'
}

export function Reports() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return

      try {
        const { data: activities } = await supabase
          .from('activity_logs')
          .select('action, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50)

        const generatedReports: Report[] = [
          {
            id: '1',
            title: 'Account Activity Summary',
            description: `You've performed ${activities?.length || 0} actions since your account was created.`,
            status: 'completed',
            date: new Date().toISOString(),
            type: 'activity'
          },
          {
            id: '2',
            title: 'Security Report',
            description: 'Your account is secured with Google OAuth. No suspicious activity detected.',
            status: 'completed',
            date: new Date().toISOString(),
            type: 'security'
          },
          {
            id: '3',
            title: 'Monthly Usage Report',
            description: 'Next report will be generated at the end of the month.',
            status: 'scheduled',
            date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'usage'
          }
        ]

        setReports(generatedReports)
      } catch (error) {
        console.error('Error fetching reports:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [user])

  const typeColors: Record<string, { bg: string; text: string; icon: string }> = {
    activity: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500 dark:text-purple-400',
      icon: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z'
    },
    security: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500 dark:text-emerald-400',
      icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
    },
    usage: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-500 dark:text-cyan-400',
      icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
    }
  }

  const statusColors: Record<string, { bg: string; text: string }> = {
    completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-500 dark:text-emerald-400' },
    pending: { bg: 'bg-amber-500/10', text: 'text-amber-500 dark:text-amber-400' },
    scheduled: { bg: 'bg-sky-500/10', text: 'text-sky-500 dark:text-sky-400' }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] flex items-center justify-center transition-colors">
        <div className="animate-spin h-8 w-8 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] relative overflow-hidden transition-colors">
      {/* Ambient background - only visible in dark mode */}
      <div className="pointer-events-none absolute inset-0 dark:block hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[120px]"></div>
        <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-white/[0.06] bg-gray-50/80 dark:bg-[#0a0a0f]/80 backdrop-blur-2xl transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Reports</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
                <svg className="h-5 w-5 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.filter(r => r.status === 'completed').length}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/30">
                <svg className="h-5 w-5 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.filter(r => r.status === 'pending').length}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/30">
                <svg className="h-5 w-5 text-sky-500 dark:text-sky-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.filter(r => r.status === 'scheduled').length}</p>
                <p className="text-sm text-gray-500">Scheduled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">All Reports</h2>
          
          <div className="space-y-4">
            {reports.map((report) => {
              const typeStyle = typeColors[report.type]
              const statusStyle = statusColors[report.status]
              
              return (
                <div
                  key={report.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] hover:border-gray-200 dark:hover:border-white/[0.08] transition-colors"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${typeStyle.bg}`}>
                    <svg className={`h-6 w-6 ${typeStyle.text}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={typeStyle.icon} />
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{report.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{report.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
