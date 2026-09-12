import { create } from 'zustand'

export type AuthMode = 'login' | 'signup'

interface AuthModalState {
  open: boolean
  mode: AuthMode
  openAuth: (mode?: AuthMode) => void
  closeAuth: () => void
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  mode: 'login',
  openAuth: (mode = 'login') => set({ open: true, mode }),
  closeAuth: () => set({ open: false }),
}))
