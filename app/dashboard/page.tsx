import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { mockSubscriptions } from '@/lib/mockData'
import DripLine from '@/components/DripLine'
import SubscriptionCard from '@/components/SubscriptionCard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const totalMonthly = mockSubscriptions.reduce((sum, s) => {
    return sum + (s.intervalDays >= 300 ? s.amount / 12 : s.amount)
  }, 0)

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Recur</span>
          <h1 className="font-display text-3xl text-ink mt-1">Your subscriptions</h1>
        </div>
        <span className="font-mono text-xs text-muted">{user.email}</span>
      </header>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-surface border border-border rounded-lg p-4">
          <span className="font-mono text-xs text-muted">Monthly total</span>
          <p className="font-display text-2xl text-ink mt-1">₦{totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <span className="font-mono text-xs text-muted">Active</span>
          <p className="font-display text-2xl text-ink mt-1">{mockSubscriptions.length}</p>
        </div>
        <div className="bg-surface border border-border rounded-lg p-4">
          <span className="font-mono text-xs text-muted">Price hikes</span>
          <p className="font-display text-2xl text-coral mt-1">{mockSubscriptions.filter((s) => s.priceChanged).length}</p>
        </div>
      </div>

      <div className="mb-10">
        <DripLine subscriptions={mockSubscriptions} />
      </div>

      <div className="flex flex-col gap-3">
        {mockSubscriptions.map((sub) => (
          <SubscriptionCard key={sub.id} sub={sub} />
        ))}
      </div>
    </main>
  )
}