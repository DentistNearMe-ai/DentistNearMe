// src/components/search/google-places-autocomplete.tsx
import { component$, useSignal, useOnDocument, $, useStore, type QRL } from '@builder.io/qwik';

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

interface GooglePlacesAutocompleteProps {
  onPlaceSelect?: QRL<(place: PlaceResult) => void>;
  placeholder?: string;
  class?: string;
  value?: string;
}

export const GooglePlacesAutocomplete = component$<GooglePlacesAutocompleteProps>(
  ({ onPlaceSelect, placeholder = "Enter your location", class: className = "", value = "" }) => {
    const inputRef = useSignal<HTMLInputElement>();
    
    const state = useStore({
      isLoaded: false,
      isLoading: false,
      error: null as string | null,
      inputValue: value,
      isScriptLoaded: false
    });

    // Use useOnDocument instead of useVisibleTask$ for better performance
    useOnDocument('DOMContentLoaded', $(() => {
      initializeGoogleMaps();
    }));

    const initializeGoogleMaps = $(() => {
      if (state.isScriptLoaded) return;
      
      // Check if Google Maps is already loaded
      if ((window as any).google?.maps?.places) {
        state.isLoaded = true;
        setupAutocomplete();
        return;
      }

      // Load the script
      state.isLoading = true;
      const script = document.createElement('script');
      const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleCallback`;
      script.async = true;
      script.defer = true;
      
      // Set up callback
      (window as any).initGoogleCallback = () => {
        state.isLoaded = true;
        state.isLoading = false;
        state.isScriptLoaded = true;
        setupAutocomplete();
      };
      
      script.onerror = () => {
        state.isLoading = false;
        state.error = 'Failed to load Google Maps';
      };
      
      document.head.appendChild(script);
    });

    const setupAutocomplete = $(() => {
      if (!inputRef.value || !(window as any).google?.maps?.places) return;

      try {
        const google = (window as any).google;
        const autocomplete = new google.maps.places.Autocomplete(inputRef.value, {
          types: ['address'],
          componentRestrictions: { country: 'us' },
          fields: ['place_id', 'formatted_address', 'geometry', 'name', 'types']
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (place.geometry?.location) {
            const placeResult: PlaceResult = {
              place_id: place.place_id || '',
              formatted_address: place.formatted_address || '',
              geometry: {
                location: {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                }
              },
              name: place.name || place.formatted_address || '',
              types: place.types || []
            };

            state.inputValue = place.formatted_address || '';

            if (onPlaceSelect) {
              onPlaceSelect(placeResult);
            }
          }
        });
      } catch (error) {
        console.error('Autocomplete setup error:', error);
        state.error = 'Failed to setup autocomplete';
      }
    });

    const handleInputChange = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      state.inputValue = target.value;
    });

    const handleFocus = $(() => {
      if (!state.isLoaded && !state.isLoading) {
        initializeGoogleMaps();
      }
    });

    return (
      <div class="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={state.inputValue}
          disabled={state.isLoading}
          onInput$={handleInputChange}
          onFocus$={handleFocus}
          class={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${className} ${
            state.isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
          } ${state.error ? 'border-red-500' : ''}`}
        />
        
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {state.isLoading ? (
            <svg class="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>

        {state.error && (
          <div class="absolute top-full left-0 mt-1 text-red-500 text-sm">
            {state.error}
          </div>
        )}

        {state.isLoading && (
          <div class="absolute top-full left-0 mt-1 text-gray-500 text-sm">
            Loading Google Maps...
          </div>
        )}
      </div>
    );
  }
);