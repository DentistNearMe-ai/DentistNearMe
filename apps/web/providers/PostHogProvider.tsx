// src/providers/PostHogProvider.tsx
'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

interface PostHogContextType {
  posthog: typeof posthog;
  track: (event: string, properties?: Record<string, any>) => void;
}

const PostHogContext = createContext<PostHogContextType | null>(null);

interface PostHogProviderProps {
  children: ReactNode;
  apiKey?: string;
  options?: any;
}

export function PostHogProvider({ 
  children, 
  apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY,
  options = {}
}: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!apiKey) {
      console.warn('PostHog API key not found. Analytics will not be initialized.');
      return;
    }

    if (typeof window !== 'undefined') {
      posthog.init(apiKey, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        capture_pageview: false, // We'll manually capture pageviews
        capture_pageleave: true,
        session_recording: {
          recordCrossOriginIframes: true
        },
        ...options
      });

      // Track the initial page load
      posthog.capture('$pageview');
    }
  }, [apiKey, options]);

  // Track route changes for user journey
  useEffect(() => {
    if (typeof window !== 'undefined' && posthog.__loaded) {
      posthog.capture('$pageview');
    }
  }, [pathname, searchParams]);

  const track = (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && posthog.__loaded) {
      posthog.capture(event, properties);
    }
  };

  const value: PostHogContextType = {
    posthog,
    track
  };

  return (
    <PostHogContext.Provider value={value}>
      {children}
    </PostHogContext.Provider>
  );
}

export function usePostHog() {
  const context = useContext(PostHogContext);
  if (!context) {
    // Return a no-op object if PostHog is not available
    return {
      posthog: null,
      track: () => {}
    };
  }
  return context;
}

// Hook for tracking lead generation and user acquisition
export function useLeadTracking() {
  const { track } = usePostHog();

  // Landing page engagement
  const trackLandingPageView = (source?: string, medium?: string, campaign?: string) => {
    track('landing_page_viewed', {
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      timestamp: Date.now()
    });
  };

  const trackTimeOnLandingPage = (timeSpent: number) => {
    track('landing_page_time_spent', {
      time_spent_seconds: timeSpent,
      timestamp: Date.now()
    });
  };

  // Search interactions
  const trackAddressSearchStarted = () => {
    track('address_search_started', {
      timestamp: Date.now()
    });
  };

  const trackAddressSelected = (address: string, lat: number, lng: number) => {
    track('address_selected', {
      address,
      latitude: lat,
      longitude: lng,
      timestamp: Date.now()
    });
  };

  const trackDentistSearchTriggered = (location: string) => {
    track('dentist_search_triggered', {
      search_location: location,
      timestamp: Date.now()
    });
  };

  // Conversion events
  const trackLeadGenerated = (location: string, source: 'landing_search' | 'cta_button') => {
    track('lead_generated', {
      location,
      source,
      timestamp: Date.now()
    });
  };

  const trackDentistProfileViewed = (dentistId: string, dentistName: string) => {
    track('dentist_profile_viewed', {
      dentist_id: dentistId,
      dentist_name: dentistName,
      timestamp: Date.now()
    });
  };

  const trackBookingStarted = (dentistId: string, appointmentType?: string) => {
    track('booking_started', {
      dentist_id: dentistId,
      appointment_type: appointmentType,
      timestamp: Date.now()
    });
  };

  const trackBookingCompleted = (dentistId: string, appointmentType: string, appointmentDate: string) => {
    track('booking_completed', {
      dentist_id: dentistId,
      appointment_type: appointmentType,
      appointment_date: appointmentDate,
      timestamp: Date.now()
    });
  };

  // User registration tracking
  const trackRegistrationStarted = (userType: 'patient' | 'doctor') => {
    track('registration_started', {
      user_type: userType,
      timestamp: Date.now()
    });
  };

  const trackRegistrationCompleted = (userType: 'patient' | 'doctor', method: 'email' | 'google') => {
    track('registration_completed', {
      user_type: userType,
      registration_method: method,
      timestamp: Date.now()
    });
  };

  // Gift card tracking
  const trackGiftCardInterest = (source: 'hero_section' | 'features' | 'cta') => {
    track('gift_card_interest', {
      source,
      timestamp: Date.now()
    });
  };

  // CTA interactions
  const trackCTAClicked = (ctaType: string, location: string) => {
    track('cta_clicked', {
      cta_type: ctaType,
      cta_location: location,
      timestamp: Date.now()
    });
  };

  // Feature engagement
  const trackFeatureViewed = (featureName: string) => {
    track('feature_viewed', {
      feature_name: featureName,
      timestamp: Date.now()
    });
  };

  return {
    trackLandingPageView,
    trackTimeOnLandingPage,
    trackAddressSearchStarted,
    trackAddressSelected,
    trackDentistSearchTriggered,
    trackLeadGenerated,
    trackDentistProfileViewed,
    trackBookingStarted,
    trackBookingCompleted,
    trackRegistrationStarted,
    trackRegistrationCompleted,
    trackGiftCardInterest,
    trackCTAClicked,
    trackFeatureViewed
  };
}