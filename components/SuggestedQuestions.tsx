'use client'

const SUGGESTED_QUESTIONS = [
  { text: 'How is our pipeline looking this quarter?', icon: '📊' },
  { text: 'Which sectors have the strongest pipeline?', icon: '🏆' },
  { text: 'How is Mining performing?', icon: '⛏️' },
  { text: 'What are our biggest deals?', icon: '💼' },
  { text: 'Which deals are at risk?', icon: '⚠️' },
  { text: 'How much has been billed versus collected?', icon: '💰' },
  { text: 'Give me an overall business health assessment.', icon: '🏥' },
  { text: 'Prepare a leadership update.', icon: '📋' },
]

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
  disabled?: boolean
}

export default function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div>
      <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)' }}>
        Suggested Questions
      </p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((q, i) => (
          <button
            key={i}
            id={`suggested-question-${i}`}
            className="chip"
            onClick={() => onSelect(q.text)}
            disabled={disabled}
            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            <span>{q.icon}</span>
            <span>{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
