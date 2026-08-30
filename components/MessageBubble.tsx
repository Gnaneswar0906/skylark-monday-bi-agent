'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  if (role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="message-user">
          <p className="text-sm">{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="message-assistant">
        {/* Agent avatar */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}
          >
            S
          </div>
          <span className="text-xs font-medium" style={{ color: 'var(--brand-light)' }}>
            Skylark BI Agent
          </span>
        </div>

        {/* Markdown content */}
        <div className="prose-bi">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
