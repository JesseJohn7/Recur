'use client'

import { Subscription } from '@/lib/mockdata'

export default function DripLine({ subscriptions }: { subscriptions: Subscription[] }) {
  const today = new Date('2026-07-14')
  const windowDays = 30

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-lg text-ink">Next 30 days</h2>
        <span className="font-mono text-xs text-muted">
          {subscriptions.length} charges scheduled
        </span>
      </div>

      <div className="relative h-20 rounded-lg bg-surface border border-border px-4">
        {/* baseline */}
        <div className="absolute left-4 right-4 top-1/2 h-px bg-border" />

        {subscriptions.map((sub) => {
          const daysOut = Math.ceil(
            (new Date(sub.nextChargeDate).getTime() - today.getTime()) / 86400000
          )
          const positionPct = Math.min(Math.max((daysOut / windowDays) * 100, 2), 98)
          const color =
            daysOut <= 3 ? 'bg-amber' : sub.priceChanged ? 'bg-coral' : 'bg-teal'

          return (
            <div
              key={sub.id}
              className="absolute top-1/2 -translate-y-1/2 group"
              style={{ left: `${positionPct}%` }}
            >
              <div className={`w-3 h-3 rounded-full ${color} ring-4 ring-bg cursor-default`} />
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center whitespace-nowrap">
                <div className="bg-surface2 border border-border rounded px-2 py-1 text-xs font-mono text-ink">
                  {sub.merchant} · {daysOut}d
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-3 text-xs font-mono text-muted">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal inline-block" /> on schedule</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber inline-block" /> renewing soon</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-coral inline-block" /> price increased</span>
      </div>
    </div>
  )
}