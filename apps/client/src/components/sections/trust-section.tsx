// src/components/sections/trust-section.tsx
import { component$ } from '@builder.io/qwik';

export const TrustSection = component$(() => {
  const stats = [
    { value: "100K+", label: "Happy Patients", color: "text-blue-600" },
    { value: "5,000+", label: "Verified Dentists", color: "text-green-600" },
    { value: "500K+", label: "Appointments Booked", color: "text-purple-600" },
    { value: "4.9★", label: "Average Rating", color: "text-yellow-600" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      initial: "S",
      bgColor: "bg-blue-500",
      rating: "⭐⭐⭐⭐⭐",
      text: "Amazing service! Found a great dentist near me and got my appointment the same day. The $50 gift card was a nice bonus!"
    },
    {
      name: "Mike Chen",
      initial: "M", 
      bgColor: "bg-green-500",
      rating: "⭐⭐⭐⭐⭐",
      text: "The booking process was so easy and the dentist I found was excellent. Highly recommend this platform!"
    },
    {
      name: "Emily Davis",
      initial: "E",
      bgColor: "bg-purple-500", 
      rating: "⭐⭐⭐⭐⭐",
      text: "Finally found a dentist that accepts my insurance and has great reviews. The whole process was seamless!"
    }
  ];

  return (
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Join over 100,000 satisfied patients who have found their perfect dentist through our platform
          </p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8 text-center mb-16">
          {stats.map((stat, index) => (
            <div key={index}>
              <div class={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div class="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div class="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center mb-4">
                <div class={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {testimonial.initial}
                </div>
                <div class="ml-3">
                  <div class="font-semibold text-gray-900">{testimonial.name}</div>
                  <div class="text-sm text-gray-600">{testimonial.rating}</div>
                </div>
              </div>
              <p class="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});