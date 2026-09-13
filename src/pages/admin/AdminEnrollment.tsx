import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { logAdminActivity } from '../../lib/activityLog'
import { useNotificationStore } from '../../store/notificationStore'

interface EnrollmentSettings { id: string; is_open: boolean; academic_year: string; announcement: string; instructions: string; requirements: string; contact_info: string; application_url: string; k12_info: string; college_info: string }

export default function AdminEnrollment() {
  const [settings, setSettings] = useState<Partial<EnrollmentSettings>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const addNotification = useNotificationStore((s) => s.addNotification)

  useEffect(() => { load() }, [])

  async function load() {
    try {
      const { data } = await supabase.from('enrollment_settings').select('*').limit(1).single()
      if (data) setSettings(data)
    } catch (err) {
      addNotification({ type: 'error', title: 'Failed to load enrollment settings', message: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  async function save() {
    setSaving(true)
    try {
      if (settings.id) {
        const { error } = await supabase.from('enrollment_settings').update(settings).eq('id', settings.id)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('enrollment_settings').insert([settings]).select().single()
        if (error) throw error
        if (data) setSettings(data)
      }
      await logAdminActivity('saved', 'enrollment', settings.id, { academic_year: settings.academic_year })
      addNotification({ type: 'success', title: 'Enrollment settings saved' })
    } catch (err) {
      addNotification({ type: 'error', title: 'Failed to save', message: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-[#13275c]/30 border-t-[#13275c] rounded-full animate-spin" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Enrollment Settings</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-3xl">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Enrollment Status:</label>
            <button onClick={() => setSettings({ ...settings, is_open: !settings.is_open })} className={`px-4 py-2 rounded-lg text-sm font-medium ${settings.is_open ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{settings.is_open ? 'OPEN' : 'CLOSED'}</button>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label><input value={settings.academic_year || ''} onChange={(e) => setSettings({ ...settings, academic_year: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Announcement</label><textarea value={settings.announcement || ''} onChange={(e) => setSettings({ ...settings, announcement: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label><textarea value={settings.instructions || ''} onChange={(e) => setSettings({ ...settings, instructions: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label><textarea value={settings.requirements || ''} onChange={(e) => setSettings({ ...settings, requirements: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label><input value={settings.contact_info || ''} onChange={(e) => setSettings({ ...settings, contact_info: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Application URL</label><input value={settings.application_url || ''} onChange={(e) => setSettings({ ...settings, application_url: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">K-12 Info</label><textarea value={settings.k12_info || ''} onChange={(e) => setSettings({ ...settings, k12_info: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">College Info</label><textarea value={settings.college_info || ''} onChange={(e) => setSettings({ ...settings, college_info: e.target.value })} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" /></div>
        </div>
        <div className="mt-6"><button onClick={save} disabled={saving} className="px-5 py-2.5 bg-[#13275c] text-white rounded-lg text-sm font-medium hover:bg-[#1a3570] disabled:opacity-50">{saving ? 'Saving...' : 'Save Changes'}</button></div>
      </div>
    </div>
  )
}
