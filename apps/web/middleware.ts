// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PostHog } from 'posthog-node'

const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_API_KEY!,
  { host: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }
)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // 1. Read existing or generate a new UUID via Web Crypto
  let distinctId = req.cookies.get('ph_distinct_id')?.value
  if (!distinctId) {
    // crypto.randomUUID() works in the Edge runtime
    distinctId = crypto.randomUUID()
    res.cookies.set('ph_distinct_id', distinctId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  // 2. Fire SSR pageview
  await posthog.capture({
    distinctId,
    event: 'Page Viewed (SSR)',
    properties: {
      path: req.nextUrl.pathname,
      utm_source: req.nextUrl.searchParams.get('utm_source'),
      utm_medium: req.nextUrl.searchParams.get('utm_medium'),
      utm_campaign: req.nextUrl.searchParams.get('utm_campaign'),
    }
  })

  return res
}

export const config = {
  matcher: ['/']  // run only on your landing page
}
