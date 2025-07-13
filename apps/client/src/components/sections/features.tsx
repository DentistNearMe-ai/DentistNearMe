// src/components/sections/features.tsx
import { component$ } from '@builder.io/qwik';

export const Features = component$(() => {
  const features = [
    {
      icon: (
        <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Verified Dentists",
      description: "All dentists are licensed, verified, and background-checked for your safety and peace of mind.",
      bgColor: "bg-blue-100"
    },
    {
      icon: (
        <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "Best Price Guarantee",
      description: "We guarantee competitive pricing. If you find a lower price elsewhere, we'll match it.",
      bgColor: "bg-green-100"
    },
    {
      icon: (
        <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      ),
      title: "24/7 Support",
      description: "Our customer support team is available around the clock to help with any questions or concerns.",
      bgColor: "bg-purple-100"
    },
    {
      icon: (
        <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Instant Booking",
      description: "Book appointments instantly without phone calls. Get confirmation in seconds, not hours.",
      bgColor: "bg-yellow-100"
    },
    {
      icon: (
        <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Insurance Accepted",
      description: "We work with most major insurance providers. Check coverage and costs before booking.",
      bgColor: "bg-red-100"
    },
    {
      icon: (
        <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: "Verified Reviews",
      description: "Read authentic reviews from real patients to make informed decisions about your dental care.",
      bgColor: "bg-indigo-100"
    }
  ];

  return (
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose DentalCare+?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            We make dental care accessible, affordable, and convenient for everyone
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} class="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p class="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
