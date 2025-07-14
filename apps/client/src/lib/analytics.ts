import { useVisibleTask$ } from '@builder.io/qwik';

export function usePostHog() {
  useVisibleTask$(async () => {
    const posthog = (await import('posthog-js')).default;
    posthog.init(import.meta.env.PUBLIC_POSTHOG_KEY!, {
      api_host: import.meta.env.PUBLIC_POSTHOG_HOST!,
      autocapture: true,
      capture_pageview: true,
    });
  });
}
