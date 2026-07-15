'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Recur</span>
          <h1 className="font-display text-2xl text-ink mt-2">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-surface border border-border rounded-md px-4 py-3 text-ink font-body placeholder:text-muted focus:outline-none focus:border-teal"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-surface border border-border rounded-md px-4 py-3 text-ink font-body placeholder:text-muted focus:outline-none focus:border-teal"
          />

          {error && <p className="text-coral text-sm font-mono">{error}</p>}

          <button
            type="submit"
            className="bg-ink text-bg font-body rounded-md px-4 py-3 hover:bg-teal transition-colors mt-2"
          >
            {isSignUp ? 'Sign up' : 'Sign in'}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center text-sm font-mono text-muted mt-4 hover:text-ink transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </main>
  )
}