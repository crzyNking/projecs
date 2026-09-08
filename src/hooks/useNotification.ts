import { useNotificationStore, type NotificationType } from '../store/notificationStore'

interface NotificationOptions {
  title: string
  message?: string
  duration?: number
}

export function useNotification() {
  const { addNotification, removeNotification, clearAll } = useNotificationStore()

  const notify = {
    success: (options: NotificationOptions) =>
      addNotification({ ...options, type: 'success' }),

    error: (options: NotificationOptions) =>
      addNotification({ ...options, type: 'error' }),

    warning: (options: NotificationOptions) =>
      addNotification({ ...options, type: 'warning' }),

    info: (options: NotificationOptions) =>
      addNotification({ ...options, type: 'info' }),

    custom: (type: NotificationType, options: NotificationOptions) =>
      addNotification({ ...options, type }),

    dismiss: removeNotification,
    clearAll
  }

  return notify
}
