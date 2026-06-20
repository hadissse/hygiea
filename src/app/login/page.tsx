'use client'

import { useState, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { createClient } from '@/utils/supabase/client'
import { loadAllRemote } from '@/lib/sync'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

// Supabase auth error codes → Arabic messages
function errorMessage(error: { code?: string; message: string }): string {
  switch (error.code) {
    case 'invalid_credentials':
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    case 'email_not_confirmed':
      return 'لم يتم تأكيد بريدك الإلكتروني بعد — تحقق من صندوق الوارد'
    case 'user_already_exists':
    case 'email_exists':
      return 'هذا البريد مسجّل مسبقًا — جرّب تسجيل الدخول'
    case 'weak_password':
      return 'كلمة المرور ضعيفة — استخدم ٦ أحرف على الأقل'
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit':
      return 'محاولات كثيرة — انتظر قليلًا ثم حاول مجددًا'
    case 'captcha_failed':
      return 'فشل التحقق — أعد المحاولة'
    default:
      return 'حدث خطأ، حاول مرة أخرى'
  }
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  )
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  // After signUp: show the "verify your email" panel with a resend button
  const [pendingEmail, setPendingEmail] = useState('')
  const [resent, setResent] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const captchaRef = useRef<TurnstileInstance>(null)

  const urlError = searchParams.get('error')

  const resetCaptcha = () => {
    setCaptchaToken('')
    captchaRef.current?.reset()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setShowResend(false)

    if (!captchaToken) {
      setError('يرجى إكمال التحقق أولاً')
      return
    }

    setLoading(true)
    const supabase = createClient()

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?next=/post-auth`,
          captchaToken,
        },
      })
      resetCaptcha()
      if (error) {
        setError(errorMessage(error))
      } else {
        setPendingEmail(email)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      })
      resetCaptcha()
      if (error) {
        setError(errorMessage(error))
        if (error.code === 'email_not_confirmed') {
          setPendingEmail(email)
          setShowResend(true)
        }
      } else {
        // Restore account data (chart, profile) before routing
        const { hasChart } = await loadAllRemote()
        router.push(hasChart ? '/' : '/onboarding')
        router.refresh()
        return
      }
    }

    setLoading(false)
  }

  const handleResend = async () => {
    if (!pendingEmail) return
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: pendingEmail,
      options: { emailRedirectTo: `${location.origin}/auth/callback?next=/post-auth` },
    })
    setLoading(false)
    if (error) {
      setError(errorMessage(error))
    } else {
      setResent(true)
      setTimeout(() => setResent(false), 5000)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth/callback?next=/post-auth`,
        },
      })
      if (error) setError(errorMessage(error))
    } catch {
      setError('تعذّر الاتصال بـ Google — حاول مرة أخرى')
    }
  }

  const switchMode = (m: 'signin' | 'signup') => {
    setMode(m)
    setError('')
    setMessage('')
    setShowResend(false)
    resetCaptcha()
  }

  // ── "Verify your email" panel (after successful signup) ──
  if (pendingEmail && !showResend) {
    return (
      <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="rtl">
        <div className="flex flex-col items-center mb-10 gap-3">
          <Logo color="#171B3A" height={40} />
        </div>
        <div className="w-full max-w-sm text-center">
          <div className="text-4xl mb-4">✉️</div>
          <h1 className="font-serif text-2xl text-[#171B3A] mb-3">تحقق من بريدك</h1>
          <p className="text-sm text-[#5C5C7A] leading-relaxed mb-2">
            أرسلنا رابط التأكيد إلى
          </p>
          <p className="text-sm font-semibold text-[#171B3A] mb-6" dir="ltr">{pendingEmail}</p>
          <p className="text-xs text-[#5C5C7A] leading-relaxed mb-8">
            اضغط على الرابط في الرسالة لتفعيل حسابك. إذا لم تجدها، تحقق من مجلد الرسائل غير المرغوب فيها.
          </p>
          {error && <p className="text-[#E9785E] text-xs mb-4">{error}</p>}
          {resent && <p className="text-[#8FA084] text-xs mb-4">تم إرسال الرابط مجددًا ✓</p>}
          <button
            onClick={handleResend}
            disabled={loading || resent}
            className="w-full py-3 rounded-[26px] border border-[#E5E1D8] text-[#171B3A] text-sm font-medium disabled:opacity-40 hover:bg-[#F8F8F8] transition-colors mb-3"
          >
            {loading ? '...' : 'إعادة إرسال الرابط'}
          </button>
          <button
            onClick={() => { setPendingEmail(''); setMode('signin'); setError(''); }}
            className="w-full py-3 text-xs text-[#5C5C7A] hover:text-[#171B3A] transition-colors"
          >
            العودة لتسجيل الدخول
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="rtl">

      {/* Logo */}
      <div className="flex flex-col items-center mb-10 gap-3">
        <Logo color="#171B3A" height={40} />
        <p className="text-sm text-[#5C5C7A]">خريطتك. سماؤك. سُكونك.</p>
      </div>

      <div className="w-full max-w-sm">
        {/* Mode tabs */}
        <div className="flex rounded-[14px] bg-[#F8F8F8] p-1 mb-6">
          <button
            onClick={() => switchMode('signin')}
            className={`flex-1 py-2 rounded-[10px] text-sm font-medium transition-colors ${
              mode === 'signin' ? 'bg-white text-[#171B3A] shadow-sm' : 'text-[#5C5C7A]'
            }`}
          >
            تسجيل الدخول
          </button>
          <button
            onClick={() => switchMode('signup')}
            className={`flex-1 py-2 rounded-[10px] text-sm font-medium transition-colors ${
              mode === 'signup' ? 'bg-white text-[#171B3A] shadow-sm' : 'text-[#5C5C7A]'
            }`}
          >
            حساب جديد
          </button>
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-[14px] border border-[#E5E1D8] bg-white text-[#171B3A] text-sm font-medium hover:bg-[#F8F8F8] transition-colors mb-5"
        >
          <GoogleIcon />
          متابعة بحساب Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-[#E5E1D8]" />
          <span className="text-xs text-[#5C5C7A]">أو</span>
          <div className="flex-1 h-px bg-[#E5E1D8]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">
              كلمة المرور
            </label>
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

          {/* Cloudflare Turnstile */}
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

          {/* Error / Message */}
          {(error || urlError) && (
            <p className="text-[#E9785E] text-xs text-center">
              {error || (urlError === 'auth_callback_error'
                ? 'انتهت صلاحية الرابط أو هو غير صالح — أعد المحاولة'
                : 'حدث خطأ، حاول مرة أخرى')}
            </p>
          )}
          {showResend && (
            <button
              type="button"
              onClick={handleResend}
              disabled={loading || resent}
              className="text-xs text-[#E9785E] underline disabled:opacity-40"
            >
              {resent ? 'تم الإرسال ✓' : 'إعادة إرسال رابط التأكيد'}
            </button>
          )}
          {message && (
            <p className="text-[#8FA084] text-xs text-center">{message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !captchaToken}
            className="w-full py-3.5 rounded-[26px] bg-[#171B3A] text-white font-semibold text-sm disabled:opacity-40 transition-opacity"
          >
            {loading ? '...' : mode === 'signin' ? 'دخول' : 'إنشاء حساب'}
          </button>
        </form>

        {/* Forgot password */}
        {mode === 'signin' && (
          <Link
            href="/forgot-password"
            className="w-full mt-4 text-center text-xs text-[#5C5C7A] block hover:text-[#171B3A] transition-colors"
          >
            نسيت كلمة المرور؟
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
