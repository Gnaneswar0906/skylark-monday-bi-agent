'use client'

import { useEffect, useState, useCallback } from 'react'

interface ConnectionState {
  dataSource: string
  monday: {
    status: 'connected' | 'disconnected' | 'not_configured'
    dealsBoard: string
    workOrdersBoard: string
  }
  cache: {
    valid: boolean
    lastRefresh: string | null
  }
  llm: {
    configured: boolean
    model: string
  }
}

export default function ConnectionStatus() {
  const [status, setStatus] = useState<ConnectionState | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefreshDisplay, setLastRefreshDisplay] = useState<string | null>(null)

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/health')
      if (res.ok) {
        const data: ConnectionState = await res.json()
        setStatus(data)
        if (data.cache.lastRefresh) {
          setLastRefreshDisplay(new Date(data.cache.lastRefresh).toLocaleTimeString())
        }
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [fetchStatus])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/refresh', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        if (data.lastRefresh) {
          setLastRefreshDisplay(new Date(data.lastRefresh).toLocaleTimeString())
        }
        await fetchStatus()
      }
    } catch {
      // ignore
    } finally {
      setRefreshing(false)
    }
  }

  const mondayStatus = status?.monday.status ?? 'pending'

  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Connection Status
        </h3>
        <button
          id="refresh-data-btn"
          className="btn-ghost text-xs py-1 px-2"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <span className="animate-spin-slow inline-block">↻</span>
          ) : (
            '↻'
          )}{' '}
          Refresh
        </button>
      </div>

      {/* Monday.com status */}
      <div className="flex flex-col gap-2">
        <StatusRow
          label="Monday.com"
          status={mondayStatus === 'connected' ? 'connected' : mondayStatus === 'not_configured' ? 'pending' : 'disconnected'}
          text={mondayStatus === 'connected' ? 'Connected' : mondayStatus === 'not_configured' ? 'Not configured' : 'Disconnected'}
        />
        {status && (
          <>
            <StatusRow
              label="Deals Board"
              status={status.monday.dealsBoard === 'configured' ? 'connected' : 'pending'}
              text={status.monday.dealsBoard === 'configured' ? 'Available' : 'Not configured'}
              sub
            />
            <StatusRow
              label="Work Orders Board"
              status={status.monday.workOrdersBoard === 'configured' ? 'connected' : 'pending'}
              text={status.monday.workOrdersBoard === 'configured' ? 'Available' : 'Not configured'}
              sub
            />
            <StatusRow
              label="LLM"
              status={status.llm.configured ? 'connected' : 'pending'}
              text={status.llm.configured ? status.llm.model : 'Not configured'}
            />
            {status.dataSource === 'fixture' && (
              <div
                className="text-xs px-2 py-1 rounded-md"
                style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}
              >
                Using fixture data (development mode)
              </div>
            )}
          </>
        )}
      </div>

      {lastRefreshDisplay && (
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Last refresh: {lastRefreshDisplay}
        </div>
      )}
    </div>
  )
}

interface StatusRowProps {
  label: string
  status: 'connected' | 'disconnected' | 'pending'
  text: string
  sub?: boolean
}

function StatusRow({ label, status, text, sub }: StatusRowProps) {
  return (
    <div className={`flex items-center justify-between ${sub ? 'pl-3' : ''}`}>
      <span className="text-xs" style={{ color: sub ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className={`status-dot ${status}`} />
        <span className="text-xs" style={{ color: status === 'connected' ? 'var(--accent-green)' : status === 'disconnected' ? 'var(--accent-rose)' : 'var(--accent-amber)' }}>
          {text}
        </span>
      </div>
    </div>
  )
}
