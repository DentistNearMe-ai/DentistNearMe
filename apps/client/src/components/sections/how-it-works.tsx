// src/components/sections/how-it-works.tsx
import { component$ } from '@builder.io/qwik';

export const HowItWorks = component$(() => {
  const steps = [
    {
      icon: (
        <svg class="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "1. Search & Compare",
      description: "Enter your location and browse verified dentists in your area. Compare ratings, reviews, and availability.",
      bgColor: "bg-blue-100"
    },
    {
      icon: (
        <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "2. Book Instantly",
      description: "Select your preferred appointment time and book instantly online. No phone calls or waiting required.",
      bgColor: "bg-green-100"
    },
    {
      icon: (
        <svg class="w-10 h-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: "3. Get Your Reward",
      description: "Complete your appointment and receive a $50 gift card. Plus, leave a review to help others!",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section id="how-it-works" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Finding and booking your ideal dentist has never been easier
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} class="text-center">
              <div class={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {step.icon}
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p class="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

