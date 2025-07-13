// src/components/search/search-hero.tsx
import { component$, useSignal, $ } from '@builder.io/qwik';

interface SearchHeroProps {
  onSearch?: (location: string) => void;
}

export const SearchHero = component$<SearchHeroProps>(({ onSearch }) => {
  const searchLocation = useSignal('');
  const isLoading = useSignal(false);

  const handleSearch = $(() => {
    if (!searchLocation.value.trim()) {
      alert('Please enter a location');
      return;
    }
    
    isLoading.value = true;
    
    // TODO: Integrate with Google Places API
    // For now, simulate search
    setTimeout(() => {
      isLoading.value = false;
      if (onSearch) {
        onSearch(searchLocation.value);
      }
      // Navigate to search results page
      window.location.href = `/search?location=${encodeURIComponent(searchLocation.value)}`;
    }, 1000);
  });

  const setPopularSearch = $((searchTerm: string) => {
    searchLocation.value = searchTerm;
  });

  return (
    <section class="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span class="text-blue-600 block">Dentist Today</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Book appointments with top-rated dentists in your area. Get a $50 gift card when you book through us!
          </p>
          
          {/* Enhanced Search Form */}
          <div class="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                  Enter your location
                </label>
                <div class="relative">
                  <input
                    id="location"
                    type="text"
                    placeholder="City, State or ZIP code"
                    class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    bind:value={searchLocation}
                    onKeyPress$={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex items-end">
                <button
                  class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  onClick$={handleSearch}
                  disabled={isLoading.value}
                >
                  {isLoading.value ? (
                    <div class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </div>
                  ) : (
                    'Search Dentists'
                  )}
                </button>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div class="mt-6 text-sm text-gray-600">
              <span class="font-medium">Popular searches:</span>
              <div class="mt-2 flex flex-wrap gap-2">
                <button 
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors text-sm" 
                  onClick$={() => setPopularSearch('Teeth Cleaning Near Me')}
                >
                  Teeth Cleaning
                </button>
                <button 
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors text-sm" 
                  onClick$={() => setPopularSearch('Dental Implants Near Me')}
                >
                  Dental Implants
                </button>
                <button 
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors text-sm" 
                  onClick$={() => setPopularSearch('Cosmetic Dentistry Near Me')}
                >
                  Cosmetic Dentistry
                </button>
                <button 
                  class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors text-sm" 
                  onClick$={() => setPopularSearch('Emergency Dentist Near Me')}
                >
                  Emergency Dentist
                </button>
              </div>
            </div>
          </div>

          {/* Gift Card Offer */}
          <div class="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-4 max-w-2xl mx-auto">
            <p class="text-yellow-800 font-semibold text-lg">
              🎁 Book through us and get a $50 gift card to Amazon or your favorite restaurant!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});