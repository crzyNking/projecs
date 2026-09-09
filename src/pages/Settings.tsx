import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { usePreferencesStore, type Theme } from '../store/preferencesStore'
import { useActivityStore } from '../store/activityStore'
import { useNotification } from '../hooks/useNotification'
import { useChatStore } from '../store/chatStore'

export function Settings() {
  const { user } = useAuthStore()
  const { preferences, fetchPreferences, updatePreferences } = usePreferencesStore()
  const { logActivity } = useActivityStore()
  const notify = useNotification()
  const navigate = useNavigate()
  const { apiKey, setApiKey } = useChatStore()
  const [geminiApiKey, setGeminiApiKey] = useState(apiKey)

  useEffect(() => {
    if (user) {
      fetchPreferences(user.id)
    }
  }, [user, fetchPreferences])

  const handleThemeChange = async (theme: Theme) => {
    if (!user) return
    await updatePreferences(user.id, { theme })
    await logActivity(user.id, 'theme_changed', { theme })
    notify.success({ title: 'Theme updated', message: `Switched to ${theme} mode` })
  }

  const handleNotificationToggle = async (key: 'email_notifications' | 'push_notifications' | 'marketing_emails', value: boolean) => {
    if (!user) return
    await updatePreferences(user.id, { [key]: value })
    await logActivity(user.id, 'preference_updated', { key, value })
    notify.success({ title: 'Preference updated', message: 'Your settings have been saved' })
  }

  const handleSaveApiKey = async () => {
    setApiKey(geminiApiKey.trim())
    if (user) {
      await logActivity(user.id, 'api_key_updated', { provider: 'gemini' })
    }
    notify.success({ title: 'API key saved', message: 'Gemini API key has been updated' })
  }

  const themes: { value: Theme; label: string; description: string }[] = [
    { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
    { value: 'light', label: 'Light', description: 'Bright and clean' },
    { value: 'system', label: 'System', description: 'Follow your device' },
  ]

  const notifications = [
    { key: 'email_notifications' as const, label: 'Email Notifications', description: 'Receive email updates about your account' },
    { key: 'push_notifications' as const, label: 'Push Notifications', description: 'Receive push notifications in your browser' },
    { key: 'marketing_emails' as const, label: 'Marketing Emails', description: 'Receive emails about new features and tips' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] relative overflow-hidden transition-colors">
      {/* Ambient background - only visible in dark mode */}
      <div className="pointer-events-none absolute inset-0 dark:block hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/8 blur-[120px]"></div>
        <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-white/[0.06] bg-gray-50/80 dark:bg-[#0a0a0f]/80 backdrop-blur-2xl transition-colors">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h1>
            <div className="w-16"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Theme Section */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Appearance</h2>
            <p className="text-sm text-gray-500 mb-6">Customize how the app looks on your device</p>
            
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme.value)}
                  className={`relative p-4 rounded-xl border transition-all duration-200 ${
                    preferences?.theme === theme.value
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : 'border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/[0.12]'
                  }`}
                >
                  <div className={`w-full h-16 rounded-lg mb-3 ${
                    theme.value === 'dark' ? 'bg-[#141420] border border-white/10' :
                    theme.value === 'light' ? 'bg-gray-100 border border-gray-200' :
                    'bg-gradient-to-r from-[#141420] to-gray-100 border border-white/10'
                  }`} />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{theme.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{theme.description}</p>
                  {preferences?.theme === theme.value && (
                    <div className="absolute top-3 right-3">
                      <svg className="h-5 w-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Notifications</h2>
            <p className="text-sm text-gray-500 mb-6">Manage how you receive updates</p>
            
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04]">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(notif.key, !(preferences?.[notif.key] ?? true))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences?.[notif.key] ?? true ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences?.[notif.key] ?? true ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Settings Section */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">AI Assistant</h2>
            <p className="text-sm text-gray-500 mb-6">Configure the AI chatbot powered by Google Gemini</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Gemini API Key</label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    placeholder="AIza..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-colors"
                  />
                  <button
                    onClick={handleSaveApiKey}
                    disabled={geminiApiKey === apiKey}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Save
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  Get your free API key at{' '}
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2">
                    aistudio.google.com/apikey
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-6 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Account</h2>
            <p className="text-sm text-gray-500 mb-6">Manage your account settings</p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/profile')}
                className="flex w-full items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                    <svg className="h-5 w-5 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Edit Profile</p>
                    <p className="text-xs text-gray-500">Update your name and avatar</p>
                  </div>
                </div>
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
