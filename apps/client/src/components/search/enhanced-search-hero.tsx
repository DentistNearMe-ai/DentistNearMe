// Simple address search with Google Places autosuggestions
import { component$, useSignal, $ } from '@builder.io/qwik';
import { GooglePlacesAutocomplete } from './google-places-autocomplete';

interface PlaceResult {
  place_id: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  types: string[];
}

export const EnhancedSearchHero = component$(() => {
  const selectedLocation = useSignal<PlaceResult | null>(null);

  const handleLocationSelect = $((place: PlaceResult) => {
    selectedLocation.value = place;
    console.log('📍 Address selected:', place.formatted_address);
    console.log('📊 Full location data:', place);
  });

  const handleSearch = $(() => {
    if (selectedLocation.value) {
      console.log('🔍 Searching for dentists near:', selectedLocation.value.formatted_address);
      // Here you would navigate to search results or trigger the search
      alert(`Searching for dentists near: ${selectedLocation.value.formatted_address}`);
    }
  });

  return (
    <section class="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center">
      {/* Background Pattern */}
      <div
        class="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      ></div>

      <div class="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          {/* Badge */}
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Find Dentists Near You
          </div>

          {/* Main Heading */}
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your
            <span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Perfect Dentist
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Enter your address to find verified dentists in your area with instant booking and same-day availability.
          </p>
        </div>

        {/* Search Card */}
        <div class="max-w-3xl mx-auto">
          <div class="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 sm:p-12">
            
            {/* Address Input */}
            <div class="space-y-6">
              <div class="text-center">
                <label class="flex items-center justify-center gap-3 text-gray-700 font-semibold text-xl mb-6">
                  <span class="text-3xl">📍</span>
                  Where are you located?
                </label>
              </div>

              {/* Google Places Input */}
              <div class="relative">
                <GooglePlacesAutocomplete
                  placeholder="Start typing your address, city, or ZIP code..."
                  onPlaceSelect={handleLocationSelect}
                  class="text-gray-900 text-lg h-16 pl-16 pr-6 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl transition-all duration-200 shadow-sm w-full"
                />
                <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> */}
                    {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /> */}
                  </svg>
                </div>
              </div>

              {/* Helper Text */}
              <p class="text-center text-gray-500 text-sm">
                💡 Type any address and we'll show you suggestions
              </p>
            </div>

            {/* Selected Location Display */}
            {selectedLocation.value && (
              <div class="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                <div class="flex items-start justify-between">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-green-600 text-2xl">✓</span>
                    </div>
                    <div>
                      <h3 class="text-green-800 font-semibold text-lg mb-2">Perfect! Location confirmed</h3>
                      <p class="text-green-700 text-base font-medium">
                        {selectedLocation.value.formatted_address}
                      </p>
                      <p class="text-green-600 text-sm mt-2 font-mono bg-green-100 px-2 py-1 rounded inline-block">
                        {selectedLocation.value.geometry.location.lat.toFixed(4)}, {selectedLocation.value.geometry.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick$={() => selectedLocation.value = null}
                    class="text-green-600 hover:text-green-800 hover:bg-green-100 p-2 rounded-full transition-colors"
                    aria-label="Clear location"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Search Button */}
            <div class="mt-8">
              <button
                onClick$={handleSearch}
                disabled={!selectedLocation.value}
                class="w-full h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold text-xl rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
              >
                {selectedLocation.value ? (
                  <>
                    <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Dentists Near This Location
                  </>
                ) : (
                  <>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Please select an address first
                  </>
                )}
              </button>
            </div>

            {/* Trust Indicators */}
            <div class="mt-8 flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <span class="text-green-500 text-lg">✓</span>
                <span>Verified dentists</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-blue-500 text-lg">✓</span>
                <span>Instant booking</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-purple-500 text-lg">✓</span>
                <span>Same-day appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div class="mt-16 text-center">
          <div class="inline-flex items-center gap-8 bg-white/70 backdrop-blur rounded-2xl px-8 py-4 shadow-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">50K+</div>
              <div class="text-sm text-gray-600">Happy patients</div>
            </div>
            <div class="w-px h-12 bg-gray-300"></div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">2,500+</div>
              <div class="text-sm text-gray-600">Partner dentists</div>
            </div>
            <div class="w-px h-12 bg-gray-300"></div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">4.9★</div>
              <div class="text-sm text-gray-600">Average rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});