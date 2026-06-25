'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAccount } from '@/utils/appwrite/client'
import { Logo } from '@/components/Logo'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')
  const [secret, setSecret] = useState('')

  useEffect(() => {
    setUserId(searchParams.get('userId') ?? '')
    setSecret(searchParams.get('secret') ?? '')
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (!userId || !secret) {
      setError('Invalid link — please request a new one')
      return
    }

    setLoading(true)
    try {
      const account = getAccount()
      await account.updateRecovery(userId, secret, password)
      router.push('/login')
    } catch {
      setError('Something went wrong — please try again or request a new link')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="ltr">
      <div className="flex flex-col items-center mb-10 gap-3">
        <Logo color="#171B3A" height={40} />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#171B3A] mb-1">New password</h2>
          <p className="text-sm text-[#5C5C7A]">Choose a strong password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">New password</label>
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

          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              dir="ltr"
              placeholder="••••••••"
              className="w-full border-0 border-b border-[#E5E1D8] pb-2 bg-transparent text-[#171B3A] placeholder:text-[#5C5C7A]/50 focus:outline-none text-sm"
            />
          </div>

          {error && <p className="text-[#E9785E] text-xs text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[26px] bg-[#171B3A] text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
          >
            {loading ? '...' : 'Save Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
