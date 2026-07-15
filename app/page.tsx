import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="max-w-5xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <span className="font-mono text-sm text-muted uppercase tracking-widest">Recur</span>
        <Link href="/login" className="text-sm font-body text-ink border border-border rounded-md px-4 py-2 hover:bg-surface transition-colors">
          Sign in
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-24 text-center flex flex-col items-center">
        <span className="font-mono text-xs text-amber uppercase tracking-widest mb-4">
          Every subscription, one place
        </span>
        <h1 className="font-display text-5xl leading-tight text-ink">
          Know exactly when you're<br />about to be charged.
        </h1>
        <p className="font-body text-muted mt-6 max-w-lg">
          Recur scans your inbox, finds every recurring charge you forgot about,
          and tells you when it renews — before it hits your account.
        </p>
        <Link href="/login" className="mt-8 bg-ink text-bg font-body rounded-md px-6 py-3 hover:bg-teal transition-colors">
          Connect your inbox
        </Link>
        <span className="font-mono text-xs text-muted mt-3">Read-only access. Nothing is ever charged or sent on your behalf.</span>
      </section>
    </main>
  )
}