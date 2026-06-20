'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Logo } from '@/components/Logo'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      return
    }
    if (password !== confirm) {
      setError('كلمتا المرور غير متطابقتين')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError(
        error.code === 'same_password'
          ? 'كلمة المرور الجديدة مطابقة للقديمة — اختر كلمة مختلفة'
          : 'حدث خطأ، حاول مرة أخرى أو اطلب رابطًا جديدًا'
      )
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-5 py-12" dir="rtl">
      <div className="flex flex-col items-center mb-10 gap-3">
        <Logo color="#171B3A" height={40} />
      </div>

      <div className="w-full max-w-sm">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#171B3A] mb-1">كلمة مرور جديدة</h2>
          <p className="text-sm text-[#5C5C7A]">اختر كلمة مرور قوية لحسابك</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">
              كلمة المرور الجديدة
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

          <div>
            <label className="text-xs font-semibold text-[#E9785E] block mb-2">
              تأكيد كلمة المرور
            </label>
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
            {loading ? '...' : 'حفظ كلمة المرور'}
          </button>
        </form>
      </div>
    </div>
  )
}
