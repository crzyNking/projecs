import { useEffect, useState } from 'react'
import { useNotificationStore, type NotificationType } from '../store/notificationStore'

const typeConfig: Record<NotificationType, {
  icon: string
  iconBg: string
  ring: string
  accent: string
}> = {
  success: {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-emerald-500/10',
    ring: 'ring-emerald-500/30',
    accent: 'bg-emerald-500'
  },
  error: {
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-red-500/10',
    ring: 'ring-red-500/30',
    accent: 'bg-red-500'
  },
  warning: {
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    iconBg: 'bg-amber-500/10',
    ring: 'ring-amber-500/30',
    accent: 'bg-amber-500'
  },
  info: {
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    iconBg: 'bg-sky-500/10',
    ring: 'ring-sky-500/30',
    accent: 'bg-sky-500'
  }
}

interface ToastProps {
  id: string
  type: NotificationType
  title: string
  message?: string
  onDismiss: (id: string) => void
}

function Toast({ id, type, title, message, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const config = typeConfig[type]

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(() => onDismiss(id), 300)
  }

  return (
    <div
      className={`
        pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.08]
        bg-white dark:bg-[#141420]/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40
        transform transition-all duration-300 ease-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className={`h-0.5 w-full ${config.accent}`} />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${config.iconBg} ring-1 ${config.ring}`}>
            <svg
              className={`h-5 w-5 ${
                type === 'success' ? 'text-emerald-500 dark:text-emerald-400' :
                type === 'error' ? 'text-red-500 dark:text-red-400' :
                type === 'warning' ? 'text-amber-500 dark:text-amber-400' :
                'text-sky-500 dark:text-sky-400'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
            </svg>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
            {message && (
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:text-gray-600 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore()

  if (notifications.length === 0) return null

  return (
    <div className="pointer-events-none fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          id={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onDismiss={removeNotification}
        />
      ))}
    </div>
  )
}
