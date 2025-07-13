import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Header } from '../components/header/header';
import { EnhancedSearchHero } from '../components/search/enhanced-search-hero';
import { HowItWorks } from '../components/sections/how-it-works';
import { Features } from '../components/sections/features';
import { TrustSection } from '../components/sections/trust-section';
import { CTASection } from '../components/sections/cta-section';
import { Footer } from '../components/footer/footer';

export default component$(() => {
  return (
    <div class="min-h-screen bg-white">
      <Header />
      <EnhancedSearchHero />
      <HowItWorks />
      <Features />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
});

export const head: DocumentHead = {
  title: "DentalCare+ | Find & Book Dentist Appointments Online | $50 Gift Card",
  meta: [
    {
      name: "description",
      content: "Find and book dentist appointments online with DentalCare+. Get a $50 gift card when you book. Compare verified dentists, read reviews, and book instantly.",
    },
    {
      name: "keywords",
      content: "dentist booking, dental appointments, find dentist, dental care, teeth cleaning, dental insurance, emergency dentist",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      property: "og:title",
      content: "DentalCare+ | Find & Book Dentist Appointments Online",
    },
    {
      property: "og:description",
      content: "Find and book dentist appointments online with DentalCare+. Get a $50 gift card when you book. Compare verified dentists and book instantly.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "DentalCare+ | Find & Book Dentist Appointments Online",
    },
    {
      name: "twitter:description",
      content: "Find and book dentist appointments online. Get a $50 gift card when you book through DentalCare+.",
    },
  ],
  links: [
    {
      rel: "canonical",
      href: "https://dentalcareplus.com",
    },
  ],
  scripts: [
    {
      type: "application/ld+json",
      script: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "DentalCare+",
        "description": "Online dental appointment booking platform",
        "url": "https://dentalcareplus.com",
        "telephone": "+1-800-DENTAL",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "medicalSpecialty": "Dentistry",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "10000"
        }
      })
    }
  ]
};