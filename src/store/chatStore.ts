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
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setIsLoading: (loading: boolean) => void
  setIsOpen: (open: boolean) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm KnowsMore, your AI assistant. Ask me anything!",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  isOpen: false,

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

  clearMessages: () =>
    set({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: "Hi! I'm KnowsMore, your AI assistant. Ask me anything!",
          timestamp: new Date(),
        },
      ],
    }),
}))
