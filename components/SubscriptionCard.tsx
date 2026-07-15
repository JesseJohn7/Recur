import { Subscription } from '../lib/'

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(amount)
}

function daysUntil(dateStr: string) {
  const today = new Date('2026-07-14')
  return Math.ceil((new Date(dateStr).getTime() - today.getTime()) / 86400000)
}

export default function SubscriptionCard({ sub }: { sub: Subscription }) {
  const days = daysUntil(sub.nextChargeDate)
  const renewalLabel = sub.intervalDays >= 300 ? 'Yearly' : 'Monthly'

  return (
    <div className="flex items-center justify-between bg-surface border border-border rounded-lg px-5 py-4 hover:bg-surface2 transition-colors">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-display text-base text-ink">{sub.merchant}</span>
          <span className="text-[10px] font-mono uppercase tracking-wide text-muted border border-border rounded-full px-2 py-0.5">
            {renewalLabel}
          </span>
          {sub.intervalDays >= 300 && (
            <span className="text-[10px] font-mono uppercase tracking-wide text-amber border border-amber/40 rounded-full px-2 py-0.5">
              easy to forget
            </span>
          )}
        </div>
        <span className="font-mono text-xs text-muted">
          Renews in {days} day{days !== 1 ? 's' : ''} · {new Date(sub.nextChargeDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </span>
        {sub.priceChanged && sub.previousAmount && (
          <span className="font-mono text-xs text-coral">
            Price went from {formatMoney(sub.previousAmount, sub.currency)} → {formatMoney(sub.amount, sub.currency)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-base text-ink">{formatMoney(sub.amount, sub.currency)}</span>
        <button className="text-xs font-body text-bg bg-ink hover:bg-teal transition-colors rounded-md px-3 py-1.5">
          How to cancel
        </button>
      </div>
    </div>
  )
}