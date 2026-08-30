'use client'

interface MetricCardProps {
  label: string
  value: string
  subtext?: string
  icon?: string
  color?: 'brand' | 'cyan' | 'green' | 'amber' | 'rose'
  id?: string
}

const COLOR_MAP: Record<string, string> = {
  brand: 'rgba(99, 102, 241, 0.15)',
  cyan: 'rgba(6, 182, 212, 0.15)',
  green: 'rgba(16, 185, 129, 0.15)',
  amber: 'rgba(245, 158, 11, 0.15)',
  rose: 'rgba(244, 63, 94, 0.15)',
}

const TEXT_COLOR: Record<string, string> = {
  brand: '#818cf8',
  cyan: '#22d3ee',
  green: '#34d399',
  amber: '#fbbf24',
  rose: '#fb7185',
}

export default function MetricCard({
  label,
  value,
  subtext,
  icon = '📈',
  color = 'brand',
  id,
}: MetricCardProps) {
  return (
    <div
      id={id}
      className="glass-card p-4 flex flex-col gap-2"
      style={{
        borderColor: `rgba(${color === 'brand' ? '99, 102, 241' : color === 'cyan' ? '6, 182, 212' : color === 'green' ? '16, 185, 129' : color === 'amber' ? '245, 158, 11' : '244, 63, 94'}, 0.2)`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: COLOR_MAP[color] }}
        >
          {icon}
        </div>
      </div>
      <div className="metric-value" style={{ color: TEXT_COLOR[color] }}>
        {value}
      </div>
      {subtext && (
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {subtext}
        </div>
      )}
    </div>
  )
}
