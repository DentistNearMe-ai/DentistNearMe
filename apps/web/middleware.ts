// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY!
const POSTHOG_HOST    = process.env.POSTHOG_HOST!

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // 1) get or generate our visitor ID
  let distinctId = req.cookies.get('ph_distinct_id')?.value
  if (!distinctId) {
    distinctId = crypto.randomUUID()        // Edge-compatible
    res.cookies.set('ph_distinct_id', distinctId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,          // keep for 1 year
    })
  }

  // 2) fire-and-forget a POST to PostHog’s capture endpoint
  const url = `${POSTHOG_HOST.replace(/\/$/, '')}/capture/?api_key=${POSTHOG_API_KEY}`
  const payload = {
    distinct_id: distinctId,
    event:       'Page Viewed (SSR)',
    properties: {
      path:        req.nextUrl.pathname,
      utm_source:  req.nextUrl.searchParams.get('utm_source'),
      utm_medium:  req.nextUrl.searchParams.get('utm_medium'),
      utm_campaign:req.nextUrl.searchParams.get('utm_campaign'),
      referrer:    req.headers.get('referer'),
    },
    timestamp: new Date().toISOString()
  }

  // we don’t await here so it doesn’t slow down your edge response
  fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  }).catch((err) => {
    console.error('PostHog SSR tracking failed:', err)
  })

  return res
}

export const config = {
  matcher: ['/']  // only run on your landing page
}
