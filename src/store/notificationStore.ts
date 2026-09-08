import { create } from 'zustand'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => string
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],

  addNotification: (notification) => {
    const id = `notification-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const duration = notification.duration ?? 5000

    set((state) => ({
      notifications: [...state.notifications, { ...notification, id, duration }]
    }))

    if (duration > 0) {
      setTimeout(() => {
        get().removeNotification(id)
      }, duration)
    }

    return id
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  },

  clearAll: () => {
    set({ notifications: [] })
  }
}))
