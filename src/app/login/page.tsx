'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAccount } from '@/utils/appwrite/client'
import { ID } from 'appwrite'
import { loadAllRemote } from '@/lib/sync'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

function errorMessage(error: { type?: string; message: string }): string {
  switch (error.type) {
    case 'user_invalid_credentials':
      return 'Invalid email or password'
    case 'user_email_not_whitelisted':
    case 'user_blocked':
      return 'This account is disabled — contact support'
    case 'user_already_exists':
      return 'Email already registered — try Sign In'
    case 'password_recently_used':
    case 'password_personal_data':
      return 'Password too weak — use a stronger one'
    case 'general_rate_limit_exceeded':
      return 'Too many attempts — wait a moment and try again'
    default:
      return 'Something went wrong, please try again'
  }
}


function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pendingEmail, setPendingEmail] = useState('')

  const urlError = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const account = getAccount()

    try {
      if (mode === 'signup') {
        await account.create(ID.unique(), email, password)
        await account.createEmailPasswordSession(email, password)
        await account.createVerification(`${location.origin}/auth/callback?next=/post-auth`)
        setPendingEmail(email)
      } else {
        await account.createEmailPasswordSession(email, password)
        const { hasChart } = await loadAllRemote()
        router.push(hasChart ? '/' : '/self')
        router.refresh()
        return
      }
    } catch (err: unknown) {
      const e = err as { type?: string; message: string }
      setError(errorMessage(e))
    }

    setLoading(false)
  }

const switchMode = (m: 'signin' | 'signup') => {
    setMode(m)
    setError('')
  }

  if (pendingEmail) {
    return (
      <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="ltr">
        <div className="flex flex-col items-center mb-10 gap-3">
          <Logo color="#171B3A" height={40} />
        </div>
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h1 className="font-serif text-2xl text-[#171B3A] mb-3">Check your email</h1>
          <p className="text-sm text-[#5C5C7A] leading-relaxed mb-2">We sent a confirmation link to</p>
          <p className="text-sm font-semibold text-[#171B3A] mb-6" dir="ltr">{pendingEmail}</p>
          <p className="text-xs text-[#5C5C7A] leading-relaxed mb-8">
            Click the link in the email to activate your account. If you don&apos;t see it, check your spam folder.
          </p>
          <button
            onClick={() => { setPendingEmail(''); setMode('signin'); }}
            className="w-full py-3 text-xs text-[#5C5C7A] hover:text-[#171B3A] transition-colors"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="ltr">
      <div className="flex flex-col items-center mb-10 gap-3">
        <Logo color="#171B3A" height={40} />
        <p className="text-sm text-[#5C5C7A]">Your spheres. Your practice.</p>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex rounded-[14px] bg-[#F8F8F8] p-1 mb-6">
          <button
            onClick={() => switchMode('signin')}
            className={`flex-1 py-2 rounded-[10px] text-sm font-medium transition-colors ${
              mode === 'signin' ? 'bg-white text-[#171B3A] shadow-sm' : 'text-[#5C5C7A]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2 rounded-[10px] text-sm font-medium transition-colors ${
              mode === 'signup' ? 'bg-white text-[#171B3A] shadow-sm' : 'text-[#5C5C7A]'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir="ltr"
              placeholder="example@email.com"
              className="w-full border-0 border-b border-[#E5E1D8] pb-2 bg-transparent text-[#171B3A] placeholder:text-[#5C5C7A]/50 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir="ltr"
              placeholder="••••••••"
              className="w-full border-0 border-b border-[#E5E1D8] pb-2 bg-transparent text-[#171B3A] placeholder:text-[#5C5C7A]/50 focus:outline-none text-sm"
            />
          </div>

          {(error || urlError) && (
            <p className="text-[#E9785E] text-xs text-center">
              {error || (urlError === 'auth_callback_error'
                ? 'Link expired or invalid — please try again'
                : 'Something went wrong, please try again')}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[26px] bg-[#171B3A] text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
          >
            {loading ? '...' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        {mode === 'signin' && (
          <Link
            href="/forgot-password"
            className="w-full mt-4 text-center text-xs text-[#5C5C7A] block hover:text-[#171B3A] transition-colors"
          >
            Forgot password?
          </Link>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
