import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useActivityStore } from '../store/activityStore'
import { useNotification } from '../hooks/useNotification'

export function Profile() {
  const { user, profile, uploadAvatar } = useAuthStore()
  const { logActivity } = useActivityStore()
  const notify = useNotification()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
    }
  }, [profile])

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    if (!file.type.startsWith('image/')) {
      notify.error({ title: 'Invalid file', message: 'Please select an image file.' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      notify.error({ title: 'File too large', message: 'Image must be less than 5MB.' })
      return
    }

    setUploading(true)
    const avatarUrl = await uploadAvatar(file)
    setUploading(false)

    if (avatarUrl) {
      await logActivity(user.id, 'avatar_updated')
      notify.success({ title: 'Avatar updated', message: 'Your profile picture has been changed.' })
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setSaving(true)

    try {
      const { error } = await import('../lib/supabase').then(m => m.supabase
        .from('profiles')
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq('id', user.id)
      )

      if (error) throw error

      await logActivity(user.id, 'profile_updated', { full_name: fullName })
      notify.success({ title: 'Profile saved', message: 'Your profile has been updated.' })
    } catch (error) {
      notify.error({ title: 'Error', message: 'Failed to save profile.' })
    } finally {
      setSaving(false)
    }
  }

  const userMetadata = user?.user_metadata
  const displayName = profile?.full_name || userMetadata?.full_name || userMetadata?.name || user?.email?.split('@')[0] || 'User'
  const avatarUrl = profile?.avatar_url || userMetadata?.avatar_url
  const email = profile?.email || user?.email
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const memberSince = new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const memberDays = Math.floor((Date.now() - new Date(user?.created_at || Date.now()).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07070d] relative overflow-hidden transition-colors">
      <div className="pointer-events-none absolute inset-0 dark:block hidden">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-purple-600/6 blur-[180px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-indigo-500/4 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-gray-200/50 dark:border-white/[0.06] bg-gray-50/80 dark:bg-[#07070d]/80 backdrop-blur-2xl transition-colors">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
            >
              <svg className="h-5 w-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Profile</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/50 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/20">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/8 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-cyan-500/8 blur-[100px]" />

          <div className="relative">
            <div className="relative h-40 sm:h-48 bg-gradient-to-r from-purple-500/20 via-indigo-500/10 to-cyan-500/20 dark:from-purple-500/30 dark:via-indigo-500/20 dark:to-cyan-500/30">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>

            <div className="relative px-6 sm:px-10 -mt-16 sm:-mt-20">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="relative group"
                >
                  <div className="absolute -inset-1 rounded-[1.25rem] bg-gradient-to-br from-purple-500 to-cyan-500 opacity-50 blur-md group-hover:opacity-70 transition-opacity" />
                  {avatarUrl ? (
                    <img
                      className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-[1.25rem] object-cover ring-4 ring-white dark:ring-[#07070d]"
                      src={avatarUrl}
                      alt={displayName}
                    />
                  ) : (
                    <div className="relative flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-500 to-cyan-500 text-4xl sm:text-5xl font-bold text-white ring-4 ring-white dark:ring-[#07070d]">
                      {initials}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-[1.25rem] bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {uploading ? (
                      <svg className="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                      </svg>
                    )}
                  </div>
                </button>

                <div className="flex-1 text-center sm:text-left pb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{displayName}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.03] p-4 sm:p-5 text-center">
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-purple-500/10 blur-xl" />
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent">
                    {memberDays}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Days Active</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.03] p-4 sm:p-5 text-center">
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-cyan-500/10 blur-xl" />
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-400 dark:to-cyan-500 bg-clip-text text-transparent">
                    {memberSince.split(' ')[0].slice(0, 3)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Joined</p>
                </div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.03] p-4 sm:p-5 text-center">
                  <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-indigo-500/10 blur-xl" />
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 bg-clip-text text-transparent">
                    {user?.app_metadata?.provider === 'google' ? 'G' : 'E'}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Provider</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-6 sm:px-10 pb-8 sm:pb-10">
            <div className="border-t border-gray-200/80 dark:border-white/[0.06] pt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Personal Information
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50/80 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email || ''}
                      disabled
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-100/80 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/[0.04] text-gray-500 dark:text-gray-500 cursor-not-allowed pr-10"
                    />
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5 flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    Email cannot be changed
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Auth Provider</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={user?.app_metadata?.provider === 'google' ? 'Google' : 'Email'}
                        disabled
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-100/80 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/[0.04] text-gray-500 dark:text-gray-500 cursor-not-allowed"
                      />
                      {user?.app_metadata?.provider === 'google' && (
                        <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Member Since</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={memberSince}
                        disabled
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-100/80 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/[0.04] text-gray-500 dark:text-gray-500 cursor-not-allowed"
                      />
                      <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving || fullName === (profile?.full_name || '')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
