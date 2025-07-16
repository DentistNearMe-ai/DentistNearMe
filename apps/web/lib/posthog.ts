// lib/posthog.js
import PostHog from 'posthog-js'
import { PostHog as PostHogServer } from 'posthog-node'

let client

export function initPostHogClient() {
  if (!client && typeof window !== 'undefined') {
    client = PostHog.init(
      process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
      { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST }
    )
  }
  return client
}

export const posthogServer = new PostHogServer({
  apiKey: process.env.POSTHOG_API_KEY,
  host: process.env.POSTHOG_HOST
})
