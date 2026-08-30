'use client'

import { useState } from 'react'

interface DataQualityPanelProps {
  warnings: string[]
  dealsTotal?: number
  workOrdersTotal?: number
}

export default function DataQualityPanel({
  warnings,
  dealsTotal,
  workOrdersTotal,
}: DataQualityPanelProps) {
  const [expanded, setExpanded] = useState(false)

  if (warnings.length === 0) return null

  return (
    <div
      className="glass-card p-4"
      style={{ borderColor: 'rgba(245, 158, 11, 0.25)', background: 'rgba(245, 158, 11, 0.04)' }}
    >
      <button
        id="data-quality-toggle"
        className="w-full flex items-center justify-between text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">⚠️</span>
          <span className="text-sm font-medium" style={{ color: '#fbbf24' }}>
            Data Quality Notes
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}
          >
            {warnings.length}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {expanded ? '▲ Hide' : '▼ Show'}
        </span>
      </button>

      {expanded && (
        <div className="mt-3 flex flex-col gap-2">
          {dealsTotal !== undefined && (
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Analyzing {dealsTotal} deals · {workOrdersTotal} work orders
            </div>
          )}
          {warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-xs mt-0.5" style={{ color: '#f59e0b' }}>
                ⚠
              </span>
              <p className="text-xs" style={{ color: '#cbd5e1' }}>
                {w}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
