'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loadRemoteChart } from '@/lib/sync'

const CHART_KEY = 'hygiea.primary-chart.v1'

export function ChartSync() {
  const router = useRouter()

  useEffect(() => {
    async function sync() {
      const hasLocal = !!localStorage.getItem(CHART_KEY)
      if (!hasLocal) {
        const loaded = await loadRemoteChart()
        if (!loaded) {
          router.replace('/self')
        }
      }
    }
    sync()
  }, [router])

  return null
}
