'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const supabase = createClient()

  async function handleGoogleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'https://www.googleapis.com/auth/gmail.readonly',
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <span className="font-mono text-xs text-muted uppercase tracking-widest">Recur</span>
        <h1 className="font-display text-2xl text-ink mt-2 mb-8">Connect your inbox to get started</h1>
        <button onClick={handleGoogleSignIn} className="w-full bg-ink text-bg font-body rounded-md px-4 py-3 hover:bg-teal transition-colors">
          Continue with Google
        </button>
        <p className="font-mono text-xs text-muted mt-6 leading-relaxed">
          We only read receipts and invoices. We never send email, read personal messages, or share your data.
        </p>
      </div>
    </main>
  )
}