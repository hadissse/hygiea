'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { createClient } from '@/utils/supabase/client'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const captchaRef = useRef<TurnstileInstance>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!captchaToken) {
      setError('يرجى إكمال التحقق أولاً')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
      captchaToken,
    } as Parameters<typeof supabase.auth.resetPasswordForEmail>[1])

    setCaptchaToken('')
    captchaRef.current?.reset()
    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="rtl">
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
            <h2 className="text-lg font-semibold text-[#171B3A] mb-2">تم الإرسال</h2>
            <p className="text-sm text-[#5C5C7A] leading-relaxed mb-6">
              تم إرسال رابط إعادة تعيين كلمة المرور إلى <span dir="ltr" className="font-medium">{email}</span>
            </p>
            <Link href="/login" className="text-sm text-[#E9785E] font-medium">
              العودة لتسجيل الدخول
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#171B3A] mb-1">نسيت كلمة المرور؟</h2>
              <p className="text-sm text-[#5C5C7A]">أدخل بريدك وسنرسل لك رابط إعادة التعيين</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-[#E9785E] block mb-2">
                  البريد الإلكتروني
                </label>
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

              <div className="flex justify-center">
                <Turnstile
                  ref={captchaRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={setCaptchaToken}
                  onExpire={() => setCaptchaToken('')}
                  onError={() => setCaptchaToken('')}
                  options={{ language: 'ar', theme: 'light' }}
                />
              </div>

              {error && <p className="text-[#E9785E] text-xs text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading || !captchaToken}
                className="w-full py-3.5 rounded-[26px] bg-[#171B3A] text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
              >
                {loading ? '...' : 'إرسال رابط الاستعادة'}
              </button>
            </form>

            <Link
              href="/login"
              className="w-full mt-4 text-center text-xs text-[#5C5C7A] block hover:text-[#171B3A] transition-colors"
            >
              العودة لتسجيل الدخول
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
