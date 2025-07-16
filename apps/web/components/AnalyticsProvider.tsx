'use client'

import { ReactNode, useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

interface Props {
  children: ReactNode
}

export const AnalyticsProvider = ({ children }: Props) => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true, // Or false if you're manually tracking
    })

    return () => {
      posthog.reset()
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
