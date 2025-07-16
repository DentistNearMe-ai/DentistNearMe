// Example usage in your EnhancedSearchHero component
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
  const showDetails = useSignal(false);

  const handleLocationSelect = $((place: PlaceResult) => {
    selectedLocation.value = place;
    showDetails.value = true;
    console.log('🎯 Location selected:', place);
  });

  const handleSearch = $(() => {
    if (selectedLocation.value) {
      // Here you would navigate to search results
      console.log('🔍 Searching for dentists near:', selectedLocation.value.formatted_address);
      alert(`Searching for dentists near: ${selectedLocation.value.formatted_address}`);
    } else {
      alert('Please select a location first');
    }
  });

  const clearLocation = $(() => {
    selectedLocation.value = null;
    showDetails.value = false;
  });

  return (
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Dentist
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90">
            Book instantly and get a $50 gift card
          </p>
          
          <div class="bg-white rounded-lg p-6 shadow-xl">
            <div class="space-y-4">
              {/* Location Search */}
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2 text-left">
                  📍 Where are you located?
                </label>
                <GooglePlacesAutocomplete
                  placeholder="Enter your address, city, or ZIP code"
                  onPlaceSelect={handleLocationSelect}
                  class="text-gray-900"
                />
              </div>
              
              {/* Selected Location Display */}
              {showDetails.value && selectedLocation.value && (
                <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex items-start justify-between">
                    <div class="text-left">
                      <h3 class="text-green-800 font-semibold">✅ Location Selected</h3>
                      <p class="text-green-700 text-sm mt-1">
                        {selectedLocation.value.formatted_address}
                      </p>
                      <p class="text-green-600 text-xs mt-1">
                        Lat: {selectedLocation.value.geometry.location.lat.toFixed(4)}, 
                        Lng: {selectedLocation.value.geometry.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <button
                      onClick$={clearLocation}
                      class="text-green-600 hover:text-green-800 text-sm"
                    >
                      ✕ Clear
                    </button>
                  </div>
                </div>
              )}
              
              {/* Search Button */}
              <div class="flex gap-3">
                <button
                  onClick$={handleSearch}
                  disabled={!selectedLocation.value}
                  class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors"
                >
                  {selectedLocation.value ? '🔍 Find Dentists Near Me' : '📍 Select Location First'}
                </button>
              </div>
              
              {/* Info */}
              <p class="text-gray-600 text-sm">
                💡 Start typing your address to see suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});