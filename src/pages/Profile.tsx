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

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[120px]"></div>
        <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back
            </button>
            <h1 className="text-lg font-semibold text-white">Edit Profile</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
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
              className="relative group mb-4"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-40 blur-lg" />
              {avatarUrl ? (
                <img
                  className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-2xl object-cover ring-2 ring-white/10"
                  src={avatarUrl}
                  alt={displayName}
                />
              ) : (
                <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 text-3xl sm:text-4xl font-bold text-white ring-2 ring-white/10">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {uploading ? (
                  <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                )}
              </div>
            </button>
            <p className="text-sm text-gray-500">Click to change avatar</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email || ''}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-600 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Provider</label>
              <input
                type="text"
                value="Google OAuth"
                disabled
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-gray-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Member Since</label>
              <input
                type="text"
                value={new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={saving || fullName === (profile?.full_name || '')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
