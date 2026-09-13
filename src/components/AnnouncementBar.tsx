import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface Announcement {
  id: string
  message: string
  button_text: string
  button_url: string
  bg_color: string
  text_color: string
  close_button: boolean
}

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    loadAnnouncement()

    const channel = supabase
      .channel('announcements-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, () => {
        loadAnnouncement()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function loadAnnouncement() {
    const now = new Date().toISOString()
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .or(`start_date.is.null,start_date.lte.${now}`)
      .or(`end_date.is.null,end_date.gte.${now}`)
      .order('priority', { ascending: false })
      .limit(1)
      .maybeSingle()

    setAnnouncement(data)
    setClosed(false)
  }

  if (!announcement || closed) return null

  return (
    <div
      className="relative px-4 py-2.5 text-center text-sm flex items-center justify-center gap-3 flex-wrap"
      style={{ background: announcement.bg_color, color: announcement.text_color }}
    >
      <span>📢</span>
      <span>{announcement.message}</span>
      {announcement.button_text && announcement.button_url && (
        <Link
          to={announcement.button_url}
          className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors"
          style={{ color: announcement.text_color }}
        >
          {announcement.button_text}
        </Link>
      )}
      {announcement.close_button && (
        <button
          onClick={() => setClosed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
