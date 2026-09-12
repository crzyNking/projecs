import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface UserData {
  profile: {
    full_name: string | null
    email: string | null
    avatar_url: string | null
    created_at: string
  } | null
  activityCount: number
  recentActivity: Array<{ action: string; created_at: string }>
  preferences: {
    theme: string
    email_notifications: boolean
    push_notifications: boolean
  } | null
}

interface ChatState {
  messages: Message[]
  isLoading: boolean
  isOpen: boolean
  userData: UserData | null
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setIsLoading: (loading: boolean) => void
  setIsOpen: (open: boolean) => void
  clearMessages: () => void
  saveChatHistory: (userId: string) => Promise<void>
  loadChatHistory: (userId: string) => Promise<void>
  fetchUserData: (userId: string) => Promise<void>
}

export const getSystemPrompt = (userData?: UserData | null): string => {
  let userContext = ''

  if (userData?.profile) {
    const p = userData.profile
    const memberSince = new Date(p.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    userContext = `

CURRENT LOGGED-IN USER DATA (use this to answer questions about their account):
- Name: ${p.full_name || 'Not set'}
- Email: ${p.email}
- Member since: ${memberSince}
- Total activities: ${userData.activityCount}
- Recent activities: ${userData.recentActivity.slice(0, 5).map((a) => `${a.action} on ${new Date(a.created_at).toLocaleDateString()}`).join(', ') || 'None yet'}
- Theme preference: ${userData.preferences?.theme || 'System'}
- Email notifications: ${userData.preferences?.email_notifications ? 'Enabled' : 'Disabled'}
- Push notifications: ${userData.preferences?.push_notifications ? 'Enabled' : 'Disabled'}
- Avatar: ${p.avatar_url ? 'Uploaded' : 'Not set'}`
  }

  return `You are KnowsMore, the AI assistant for this web application. You help users navigate and understand the app.

IMPORTANT RULES - TO REDUCE HALLUCINATION:
- ONLY answer based on the information provided below about this website
- If you don't know something about this website, say "I don't have information about that"
- NEVER make up features, pages, or functionality that isn't listed below
- If a user asks about something not covered here, tell them to check the relevant page in the app
- Keep answers short and helpful
- If you're unsure, ask the user to clarify
- When user data is provided below, use it to answer questions about their account, activity, and settings

ABOUT THIS WEBSITE:
This is a user dashboard platform with authentication, profile management, and activity tracking.

PAGES AND FEATURES:
1. LOGIN PAGE (/login): Sign in with Google OAuth or Email/Password. Email sign-up requires confirmation. Has password show/hide toggle, remember me, and Terms/Privacy modals.

2. DASHBOARD (/dashboard): Welcome banner with user name. Shows 3 stat cards (Account Status, Auth Provider, Member Since). Profile card with avatar and details. Quick actions to Analytics, Reports, Settings, Profile. Recent activity feed.

3. PROFILE (/profile): Upload/change avatar (images only, max 5MB). Edit full name. Email is display-only. Save/cancel buttons.

4. SETTINGS (/settings): Theme switcher (Dark/Light/System). Notification toggles (Email, Push, Marketing). Link to edit profile.

5. ANALYTICS (/analytics): Total activities count. Avg session duration. Last active time. Member duration days. Activity chart (coming soon). Security info.

6. REPORTS (/reports): Account Activity Summary report. Security Report. Monthly Usage Report. Each has status (completed/pending/scheduled).

7. AI CHATBOT: This is you! Floating button opens chat. You answer questions about the app. Chat history saves for logged-in users.

TECH: React, TypeScript, Tailwind CSS, Supabase, deployed on Vercel.${userContext}

If users ask how to do something, guide them to the right page. If they report a bug, suggest refreshing or checking settings.`
}

export const getWelcomeMessages = (userData?: UserData | null): Message[] => [
  {
    id: 'system',
    role: 'system',
    content: getSystemPrompt(userData),
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
  userData: null,

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

  clearMessages: () => set({ messages: getWelcomeMessages(), userData: null }),

  fetchUserData: async (userId: string) => {
    try {
      const [profileRes, activityRes, countRes, prefsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('activity_logs').select('action, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
        supabase.from('activity_logs').select('*', { count: 'exact', head: true }).eq('user_id', userId),
        supabase.from('user_preferences').select('theme, email_notifications, push_notifications').eq('user_id', userId).single(),
      ])

      const userData: UserData = {
        profile: profileRes.data,
        activityCount: countRes.count || 0,
        recentActivity: activityRes.data || [],
        preferences: prefsRes.data,
      }

      set({ userData })
    } catch (err) {
      console.error('Error fetching user data:', err)
    }
  },

  saveChatHistory: async (userId: string) => {
    try {
      const { messages } = get()
      const chatMessages = messages.filter((m) => m.role !== 'system')

      if (chatMessages.length <= 1) return

      const { error } = await supabase
        .from('chat_history')
        .upsert({
          user_id: userId,
          messages: chatMessages,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })

      if (error) {
        console.error('Error saving chat history:', error)
      }
    } catch (err) {
      console.error('Error saving chat history:', err)
    }
  },

  loadChatHistory: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('messages')
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        const { userData } = get()
        set({ messages: getWelcomeMessages(userData) })
        return
      }

      const savedMessages = (data.messages as Array<{ id: string; role: string; content: string; timestamp: string }>).map(
        (m) => ({
          ...m,
          role: m.role as 'user' | 'assistant',
          timestamp: new Date(m.timestamp),
        })
      )

      const { userData } = get()
      set({
        messages: [
          {
            id: 'system',
            role: 'system',
            content: getSystemPrompt(userData),
            timestamp: new Date(),
          },
          ...savedMessages,
        ],
      })
    } catch (err) {
      console.error('Error loading chat history:', err)
      set({ messages: getWelcomeMessages() })
    }
  },
}))
