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


  const selectedPlace = useSignal<PlaceResult | null>(null);
  const isLoading = useSignal(false);

  const handlePlaceSelect = $((place: PlaceResult) => {
    selectedPlace.value = place;
    console.log('Selected place:', place);
  });

  const handleSearch = $(() => {
    if (!selectedPlace.value) {
      alert('Please select a location from the dropdown');
      return;
    }
    
    isLoading.value = true;
    
    // TODO: Implement actual search with place data
    setTimeout(() => {
      isLoading.value = false;
      // Navigate to search results with place data
      const params = new URLSearchParams({
        place_id: selectedPlace.value!.place_id,
        address: selectedPlace.value!.formatted_address,
        lat: selectedPlace.value!.geometry.location.lat.toString(),
        lng: selectedPlace.value!.geometry.location.lng.toString()
      });
      
      window.location.href = `/search?${params.toString()}`;
    }, 1000);
  });

  const popularSearches = [
    'Teeth Cleaning Near Me',
    'Dental Implants Near Me', 
    'Cosmetic Dentistry Near Me',
    'Emergency Dentist Near Me'
  ];

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
          
          {/* Enhanced Search Form with Google Places */}
          <div class="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1">
                <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                  Enter your location
                </label>
                <GooglePlacesAutocomplete
                  onPlaceSelect={handlePlaceSelect}
                  placeholder="City, State or ZIP code"
                />
              </div>
              <div class="flex items-end">
                <button
                  class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  onClick$={handleSearch}
                  disabled={isLoading.value || !selectedPlace.value}
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
                {popularSearches.map((search) => (
                  <button 
                    key={search}
                    class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors text-sm" 
                    onClick$={() => {
                      // For popular searches, we'll use a generic search
                      // In a real app, you might want to geocode these or use a different approach
                      window.location.href = `/search?query=${encodeURIComponent(search)}`;
                    }}
                  >
                    {search.replace(' Near Me', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Location Display */}
            {selectedPlace.value && (
              <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p class="text-sm text-green-800">
                  <span class="font-medium">Selected:</span> {selectedPlace.value.formatted_address}
                </p>
              </div>
            )}
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