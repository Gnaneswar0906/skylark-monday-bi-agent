'use client'

interface LeadershipData {
  sales: {
    totalDeals: number
    openDeals: number
    wonDeals: number
    pipelineValue: number
    weightedPipeline: number
    topSector: string | null
  }
  operations: {
    totalWorkOrders: number
    completed: number
    ongoing: number
    notStarted: number
    completionRate: number | null
  }
  financial: {
    totalBilled: number
    totalCollected: number
    totalReceivable: number
    collectionRate: number | null
    priorityAccountsCount: number
  }
  keyRisks: string[]
  leadershipAttention: string[]
  generatedAt: string
}

interface LeadershipUpdateProps {
  data: LeadershipData
}

function formatINR(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)}Cr`
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)}L`
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function LeadershipUpdate({ data }: LeadershipUpdateProps) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5" style={{ background: 'linear-gradient(135deg, rgba(79,70,229,0.3), rgba(6,182,212,0.1))' }}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">📋</div>
          <div>
            <h2 className="text-base font-bold text-white">Skylark Drones — Leadership Update</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Generated {new Date(data.generatedAt).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 gap-5">
        {/* Sales */}
        <Section title="Sales" icon="📊">
          <Grid>
            <KV label="Pipeline" value={formatINR(data.sales.pipelineValue)} />
            <KV label="Weighted Pipeline" value={formatINR(data.sales.weightedPipeline)} />
            <KV label="Open Deals" value={String(data.sales.openDeals)} />
            <KV label="Won Deals" value={String(data.sales.wonDeals)} />
            <KV label="Top Sector" value={data.sales.topSector ?? 'N/A'} />
          </Grid>
        </Section>

        {/* Operations */}
        <Section title="Operations" icon="⚙️">
          <Grid>
            <KV label="Total Work Orders" value={String(data.operations.totalWorkOrders)} />
            <KV label="Completed" value={String(data.operations.completed)} color="green" />
            <KV label="Ongoing" value={String(data.operations.ongoing)} color="cyan" />
            <KV label="Not Started" value={String(data.operations.notStarted)} color="amber" />
            <KV
              label="Completion Rate"
              value={
                data.operations.completionRate !== null
                  ? `${(data.operations.completionRate * 100).toFixed(0)}%`
                  : 'N/A'
              }
            />
          </Grid>
        </Section>

        {/* Financial */}
        <Section title="Financial" icon="💰">
          <Grid>
            <KV label="Total Billed" value={formatINR(data.financial.totalBilled)} color="brand" />
            <KV label="Total Collected" value={formatINR(data.financial.totalCollected)} color="green" />
            <KV label="Receivables" value={formatINR(data.financial.totalReceivable)} color="amber" />
            <KV
              label="Collection Rate"
              value={
                data.financial.collectionRate !== null
                  ? `${(data.financial.collectionRate * 100).toFixed(0)}%`
                  : 'N/A'
              }
            />
            <KV label="Priority Accounts" value={String(data.financial.priorityAccountsCount)} color="rose" />
          </Grid>
        </Section>

        {/* Key Risks */}
        {data.keyRisks.length > 0 && (
          <Section title="Key Risks" icon="⚠️">
            <ol className="flex flex-col gap-2">
              {data.keyRisks.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold mt-0.5 min-w-[16px]" style={{ color: 'var(--accent-rose)' }}>
                    {i + 1}.
                  </span>
                  <p className="text-xs" style={{ color: '#cbd5e1' }}>{r}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Leadership Attention */}
        {data.leadershipAttention.length > 0 && (
          <Section title="Leadership Attention Required" icon="🎯">
            <ol className="flex flex-col gap-2">
              {data.leadershipAttention.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-xs font-bold mt-0.5 min-w-[16px]" style={{ color: 'var(--brand-light)' }}>
                    {i + 1}.
                  </span>
                  <p className="text-xs" style={{ color: '#cbd5e1' }}>{a}</p>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </div>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span>{icon}</span>
        <h3 className="text-sm font-semibold" style={{ color: '#c7d2fe' }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>
}

function KV({ label, value, color = 'default' }: { label: string; value: string; color?: string }) {
  const colors: Record<string, string> = {
    brand: '#818cf8',
    cyan: '#22d3ee',
    green: '#34d399',
    amber: '#fbbf24',
    rose: '#fb7185',
    default: '#f1f5f9',
  }
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-sm font-semibold" style={{ color: colors[color] }}>{value}</div>
    </div>
  )
}
