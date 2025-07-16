// src/app/page.tsx - Main Landing Page
import { Header } from '@/components/landing/Header';
import { EnhancedSearchHero } from '@/components/landing/EnhancedSearchHero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { TrustSection } from '@/components/landing/TrustSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "DentalCare+ | Find & Book Dentist Appointments Online | $50 Gift Card",
  description: "Find and book dentist appointments online with DentalCare+. Get a $50 gift card when you book. Compare verified dentists, read reviews, and book instantly.",
  keywords: "dentist booking, dental appointments, find dentist, dental care, teeth cleaning, dental insurance, emergency dentist",
  openGraph: {
    title: "DentalCare+ | Find & Book Dentist Appointments Online",
    description: "Find and book dentist appointments online with DentalCare+. Get a $50 gift card when you book. Compare verified dentists and book instantly.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentalCare+ | Find & Book Dentist Appointments Online",
    description: "Find and book dentist appointments online. Get a $50 gift card when you book through DentalCare+.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <EnhancedSearchHero />
      <HowItWorks />
           <section id="features">
        <Features />
      </section>
      
      {/* Trust Section */}
      <section id="trust-section">
        <TrustSection />
      </section>
      
      {/* CTA Section */}
      <section id="cta-section">
        <CTASection />
      </section>



      <Footer />
    </div>
  );
}


