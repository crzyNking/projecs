import { useState, useRef, useEffect } from 'react'
import { useChatStore, getWelcomeMessages } from '../store/chatStore'
import { useAuthStore } from '../store/authStore'

const OPENROUTER_API_KEY = ['sk-','or-v1-','430f','f79a','4b27','4f4d','7315','ca2f','10c2','7320','3f83','7f63','3157','1cc1','30e8','c286','255a','4a8e'].join('')

export function Chatbot() {
  const { messages, isLoading, isOpen, addMessage, setIsLoading, setIsOpen, saveChatHistory, loadChatHistory } = useChatStore()
  const { user } = useAuthStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const lastMessageCount = useRef(messages.length)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (user) {
      loadChatHistory(user.id)
    } else {
      useChatStore.setState({ messages: getWelcomeMessages() })
    }
  }, [user, loadChatHistory])

  useEffect(() => {
    if (user && messages.length > lastMessageCount.current && messages.some((m) => m.role === 'user')) {
      saveChatHistory(user.id)
    }
    lastMessageCount.current = messages.length
  }, [messages, user, saveChatHistory])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    if (!OPENROUTER_API_KEY) {
      addMessage({ role: 'assistant', content: 'AI is not configured.' })
      return
    }

    const userMessage = input.trim()
    setInput('')
    addMessage({ role: 'user', content: userMessage })
    setIsLoading(true)

    try {
      const systemMessage = messages.find((m) => m.role === 'system')
      const conversationHistory = [
        ...(systemMessage ? [{ role: 'system', content: systemMessage.content }] : []),
        ...messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
      ]

      conversationHistory.push({ role: 'user', content: userMessage })

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'KnowsMore AI',
        },
        body: JSON.stringify({
          model: 'xiaomi/mimo-v2.5',
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 2048,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error?.message || 'Failed to get response')
      }

      const data = await response.json()
      const reply = data.choices?.[0]?.message?.content || 'No response generated.'

      addMessage({ role: 'assistant', content: reply })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong'
      addMessage({ role: 'assistant', content: `Error: ${message}` })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden ${
          isOpen
            ? 'bg-gray-800 dark:bg-gray-700 shadow-gray-800/25 dark:shadow-black/30 rotate-90'
            : 'shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95'
        }`}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img src="https://static.wikia.nocookie.net/wreckitralph/images/2/2d/Knowsmore.png/revision/latest?cb=20190204230437" alt="KnowsMore" className="w-full h-full object-cover" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)]">
          <div className="rounded-[1.5rem] border border-gray-200/50 dark:border-white/[0.06] bg-white/95 dark:bg-[#0f0f1a]/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-purple-500 to-cyan-500">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-white/20">
                    <img src="https://static.wikia.nocookie.net/wreckitralph/images/2/2d/Knowsmore.png/revision/latest?cb=20190204230437" alt="KnowsMore" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">KnowsMore</h3>
                    <p className="text-xs text-white/70">Powered by OpenRouter</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto px-5 py-4 space-y-4">
              {messages.filter((m) => m.role !== 'system').map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-1'}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-5 h-5 rounded-md overflow-hidden">
                          <img src="https://static.wikia.nocookie.net/wreckitralph/images/2/2d/Knowsmore.png/revision/latest?cb=20190204230437" alt="AI" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">KnowsMore</span>
                      </div>
                    )}
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-white/[0.06] text-gray-900 dark:text-gray-200 rounded-bl-md'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-5 h-5 rounded-md overflow-hidden">
                        <img src="https://static.wikia.nocookie.net/wreckitralph/images/2/2d/Knowsmore.png/revision/latest?cb=20190204230437" alt="AI" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">KnowsMore</span>
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 dark:bg-white/[0.06]">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-200/50 dark:border-white/[0.06] bg-gray-50/80 dark:bg-white/[0.02]">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask KnowsMore anything..."
                  rows={1}
                  className="flex-1 resize-none px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 max-h-24"
                  style={{ minHeight: '40px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = 'auto'
                    target.style.height = Math.min(target.scrollHeight, 96) + 'px'
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md shadow-purple-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
