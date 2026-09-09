import { create } from 'zustand'
import { supabase } from '../lib/supabase'

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
  saveChatHistory: (userId: string) => Promise<void>
  loadChatHistory: (userId: string) => Promise<void>
}

export const WEBSITE_KNOWLEDGE = `You are KnowsMore, the AI assistant for this web application. You know everything about this website and can help users with any questions.

ABOUT THIS WEBSITE:
This is a modern SaaS-style user dashboard and account management platform built with React, TypeScript, Tailwind CSS, and Supabase.

FEATURES:
1. AUTHENTICATION: Users can sign up/login via Google OAuth or Email/Password. Email confirmation is required for email sign-ups. Real-time email verification detection automatically signs users in after confirmation.

2. DASHBOARD: Shows welcome banner, 3 stat cards (Account Status, Auth Provider, Member Since), profile card with avatar, quick actions grid (Analytics, Reports, Settings, Profile), and recent activity feed.

3. PROFILE: Users can upload/change their avatar (max 5MB, images only), edit their full name. Email cannot be changed. Avatar uploads go to Supabase Storage.

4. SETTINGS: Theme switching (Dark/Light/System), notification toggles (Email, Push, Marketing), and account management link.

5. ANALYTICS: Shows total activities, avg session duration, last active time, member duration. Has activity chart placeholder and security info (2FA status, sessions).

6. REPORTS: Displays Account Activity Summary, Security Report, and Monthly Usage Report with status badges.

7. AI CHATBOT (KnowsMore): Floating chat button on every page, powered by MiMo V2.5 via OpenRouter. Supports conversation history.

TECH STACK:
- Frontend: React 19, TypeScript, Vite 8, Tailwind CSS 4
- Backend: Supabase (PostgreSQL, Auth, Storage, RLS)
- State: Zustand stores (auth, activity, chat, notification, preferences)
- Deployment: Vercel

DATABASE TABLES:
- profiles: User profile data (id, email, full_name, avatar_url, timestamps)
- activity_logs: Audit trail of user actions (action, details JSONB, created_at)
- user_preferences: Theme and notification settings

UNIQUE FEATURES:
- Real-time email verification with auto sign-in
- Activity audit logging for all user actions
- Automatic profile/preferences creation on signup via database triggers
- Row-Level Security (RLS) on all tables
- Premium glass-morphism UI with purple-to-cyan gradients
- Custom branded email templates

Always be helpful, friendly, and knowledgeable. If users ask about features, explain them. If they need help, guide them. If they report issues, suggest solutions.`

const getWelcomeMessages = (): Message[] => [
  {
    id: 'system',
    role: 'system',
    content: WEBSITE_KNOWLEDGE,
    timestamp: new Date(),
  },
  {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm KnowsMore, your AI assistant. I know everything about this website and can help you with any questions about your account, features, or how to use the app. How can I help you today?",
    timestamp: new Date(),
  },
]

export const useChatStore = create<ChatState>((set, get) => ({
  messages: getWelcomeMessages(),
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

  clearMessages: () => set({ messages: getWelcomeMessages() }),

  saveChatHistory: async (userId: string) => {
    const { messages } = get()
    const userMessages = messages.filter((m) => m.role !== 'system')

    const { error } = await supabase
      .from('chat_history')
      .upsert({
        user_id: userId,
        messages: userMessages,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Error saving chat history:', error)
    }
  },

  loadChatHistory: async (userId: string) => {
    const { data, error } = await supabase
      .from('chat_history')
      .select('messages')
      .eq('user_id', userId)
      .single()

    if (error || !data) {
      set({ messages: getWelcomeMessages() })
      return
    }

    const savedMessages = (data.messages as Array<{ id: string; role: string; content: string; timestamp: string }>).map(
      (m) => ({
        ...m,
        role: m.role as 'user' | 'assistant',
        timestamp: new Date(m.timestamp),
      })
    )

    set({
      messages: [
        {
          id: 'system',
          role: 'system',
          content: WEBSITE_KNOWLEDGE,
          timestamp: new Date(),
        },
        ...savedMessages,
      ],
    })
  },
}))
