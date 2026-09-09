import { create } from 'zustand'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  isOpen: boolean
  apiKey: string
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setIsLoading: (loading: boolean) => void
  setIsOpen: (open: boolean) => void
  setApiKey: (key: string) => void
  clearMessages: () => void
  getApiKey: () => string
}

const STORAGE_KEY = 'gemini_api_key'

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your AI assistant powered by Google Gemini. Ask me anything!",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  isOpen: false,
  apiKey: localStorage.getItem(STORAGE_KEY) || '',

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsOpen: (open) => set({ isOpen: open }),

  setApiKey: (key) => {
    localStorage.setItem(STORAGE_KEY, key)
    set({ apiKey: key })
  },

  clearMessages: () =>
    set({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm your AI assistant powered by Google Gemini. Ask me anything!",
          timestamp: new Date(),
        },
      ],
    }),

  getApiKey: () => localStorage.getItem(STORAGE_KEY) || '',
}))
