'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import SuggestedQuestions from './SuggestedQuestions'
import DataQualityPanel from './DataQualityPanel'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

interface ApiResponse {
  response: string
  intent?: string
  dataQuality?: {
    deals: { total: number; warnings: string[] }
    workOrders: { total: number; warnings: string[] }
  }
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `## Welcome to the Skylark Drones BI Agent 👋

I'm your conversational Business Intelligence assistant. I can answer founder-level questions about your **Deals pipeline** and **Work Orders** directly from Monday.com.

**Try asking:**
- How is our pipeline looking this quarter?
- Which sector has the strongest pipeline?
- What are our biggest deals?
- Prepare a leadership update.

Use the suggested questions below or type your own.`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [latestQuality, setLatestQuality] = useState<ApiResponse['dataQuality'] | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || loading) return

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
      }

      setMessages((prev) => [...prev, userMsg])
      setInput('')
      setLoading(true)

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
        })

        const data: ApiResponse = await res.json()

        const assistantMsg: Message = {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.response ?? "I encountered an error. Please try again.",
        }

        setMessages((prev) => [...prev, assistantMsg])

        if (data.dataQuality) {
          setLatestQuality(data.dataQuality)
        }
      } catch (err) {
        console.error('Chat error:', err)
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: "I couldn't retrieve the latest Monday.com data. Please try again in a moment.",
          },
        ])
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    },
    [loading]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const qualityWarnings = latestQuality
    ? [...(latestQuality.deals.warnings ?? []), ...(latestQuality.workOrders.warnings ?? [])]
    : []

  return (
    <div className="flex flex-col h-full" style={{ minHeight: 0 }}>
      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        id="chat-messages"
        style={{ minHeight: 0 }}
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start animate-fade-in">
              <div className="message-assistant">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}
                  >
                    S
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--brand-light)' }}>
                    Analyzing…
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: 'var(--brand-light)',
                          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Retrieving data and calculating metrics…
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Data quality panel */}
      {qualityWarnings.length > 0 && (
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto">
            <DataQualityPanel
              warnings={qualityWarnings}
              dealsTotal={latestQuality?.deals.total}
              workOrdersTotal={latestQuality?.workOrders.total}
            />
          </div>
        </div>
      )}

      {/* Suggested questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3">
          <div className="max-w-3xl mx-auto">
            <SuggestedQuestions onSelect={sendMessage} disabled={loading} />
          </div>
        </div>
      )}

      {/* Input area */}
      <div
        className="px-4 pb-4 pt-2"
        style={{ borderTop: '1px solid var(--border-color)', background: 'rgba(10, 10, 31, 0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-end gap-3 rounded-2xl p-3"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glow)',
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.1)',
            }}
          >
            <textarea
              ref={inputRef}
              id="chat-input"
              rows={1}
              className="flex-1 bg-transparent text-sm resize-none outline-none"
              style={{
                color: 'var(--text-primary)',
                caretColor: 'var(--brand)',
                minHeight: '24px',
                maxHeight: '120px',
                overflowY: 'auto',
              }}
              placeholder="Ask a business question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              id="send-btn"
              className="btn-brand px-4 py-2 text-sm"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <span className="animate-spin-slow">↻</span>
              ) : (
                '↗'
              )}
            </button>
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
            Press Enter to send · Shift+Enter for newline
          </p>
        </div>
      </div>
    </div>
  )
}
