// src/components/AnalyticsProvider.tsx
'use client'
import { useEffect } from 'react'
import PostHog from 'posthog-js'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // pull the same distinctId from the cookie
    const cookie = document.cookie
      .split('; ')
      .find(c => c.startsWith('ph_distinct_id='))
      ?.split('=')[1]

    const ph = PostHog.init(
      process.env.NEXT_PUBLIC_POSTHOG_API_KEY!,
      { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
    )

    if (cookie) ph.identify(cookie)

    // track time on page
    const start = Date.now()
    const sendTime = () => {
      ph.capture('Time on Page', {
        seconds: Math.floor((Date.now() - start) / 1000)
      })
    }
    window.addEventListener('beforeunload', sendTime)
    return () => window.removeEventListener('beforeunload', sendTime)
  }, [])

  return <>{children}</>
}
