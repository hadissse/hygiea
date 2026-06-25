'use client'

import { useState } from 'react'
import { getAccount } from '@/utils/appwrite/client'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const account = getAccount()
      await account.createRecovery(email, `${location.origin}/reset-password`)
      setSent(true)
    } catch {
      setError('Something went wrong, please try again')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="ltr">
      <div className="flex flex-col items-center mb-10 gap-3">
        <Logo color="#171B3A" height={40} />
      </div>

      <div className="w-full max-w-sm">
        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#F8F8F8] flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8FA084" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#171B3A] mb-2">Email sent</h2>
            <p className="text-sm text-[#5C5C7A] leading-relaxed mb-6">
              We sent a password reset link to <span dir="ltr" className="font-medium">{email}</span>
            </p>
            <Link href="/login" className="text-sm text-[#E9785E] font-medium">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#171B3A] mb-1">Forgot your password?</h2>
              <p className="text-sm text-[#5C5C7A]">Enter your email and we&apos;ll send you a reset link</p>
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

              {error && <p className="text-[#E9785E] text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[26px] bg-[#171B3A] text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
              >
                {loading ? '...' : 'Send reset link'}
              </button>
            </form>

            <Link
              href="/login"
              className="w-full mt-4 text-center text-xs text-[#5C5C7A] block hover:text-[#171B3A] transition-colors"
            >
              Back to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
