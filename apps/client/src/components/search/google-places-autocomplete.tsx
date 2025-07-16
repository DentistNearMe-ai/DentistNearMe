// src/components/search/google-places-autocomplete.tsx - Fixed scope issues
import { component$, useSignal, useVisibleTask$, $, useStore, type QRL } from '@builder.io/qwik';

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
  debounceMs?: number;
  minChars?: number;
}

export const GooglePlacesAutocomplete = component$<GooglePlacesAutocompleteProps>(
  ({ 
    onPlaceSelect, 
    placeholder = "Enter your location", 
    class: className = "", 
    value = "",
    debounceMs = 300,
    minChars = 3
  }) => {
    const inputRef = useSignal<HTMLInputElement>();
    
    const state = useStore({
      isLoaded: false,
      isLoading: false,
      error: null as string | null,
      inputValue: value,
      isScriptLoaded: false,
      debounceTimeout: null as NodeJS.Timeout | null,
      isSearching: false,
      searchCount: 0,
      needsSetup: false
    });

    const handleInputChange = $((event: Event) => {
      const target = event.target as HTMLInputElement;
      const newValue = target.value;
      
      state.inputValue = newValue;
      
      if (state.debounceTimeout) {
        clearTimeout(state.debounceTimeout);
        state.isSearching = false;
      }
      
      if (newValue.length >= minChars) {
        state.isSearching = true;
        console.log(`⌨️  Typing: "${newValue}" (will search in ${debounceMs}ms)`);
        
        state.debounceTimeout = setTimeout(() => {
          state.isSearching = false;
          console.log(`🔍 Search ready for: "${newValue}"`);
        }, debounceMs);
      } else if (newValue.length === 0) {
        state.isSearching = false;
      }
    });

    const handleFocus = $(() => {
      if (!state.isLoaded && !state.isLoading) {
        initializeGoogleMaps();
      }
    });

    const cleanup = $(() => {
      if (state.debounceTimeout) {
        clearTimeout(state.debounceTimeout);
      }
    });

    const initializeGoogleMaps = $(() => {
      if (state.isScriptLoaded || state.isLoading) return;
      
      // Check if already loaded
      if ((window as any).google?.maps?.places) {
        state.isLoaded = true;
        state.needsSetup = true;
        return;
      }

      state.isLoading = true;
      const script = document.createElement('script');
      const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      // Use a global flag instead of function reference
      script.onload = () => {
        console.log('📡 Google Maps script loaded');
        state.isLoaded = true;
        state.isLoading = false;
        state.isScriptLoaded = true;
        state.needsSetup = true;
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Google Maps script');
        state.isLoading = false;
        state.error = 'Failed to load Google Maps';
      };
      
      document.head.appendChild(script);
    });

    const setupAutocomplete = $(() => {
      if (!inputRef.value || !state.isLoaded || !(window as any).google?.maps?.places) {
        console.log('❌ Cannot setup autocomplete: missing requirements');
        return;
      }

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
            state.searchCount++;

            if (onPlaceSelect) {
              onPlaceSelect(placeResult);
            }

            console.log(`✅ Place selected (#${state.searchCount}):`, place.formatted_address);
          }
        });

        state.needsSetup = false;
        console.log('✅ Google Places Autocomplete initialized successfully');
      } catch (error) {
        console.error('❌ Autocomplete setup error:', error);
        state.error = 'Failed to setup autocomplete';
        state.needsSetup = false;
      }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      // Track when we need to setup autocomplete
      track(() => state.needsSetup);
      track(() => state.isLoaded);
      
      if (state.needsSetup && state.isLoaded) {
        // Small delay to ensure input is ready
        setTimeout(() => {
          setupAutocomplete();
        }, 150);
      }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      // Initialize on mount
      if ((window as any).google?.maps?.places) {
        state.isLoaded = true;
        state.needsSetup = true;
      } else {
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
          onBlur$={cleanup}
          class={`w-full px-4 py-3 pl-12 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all ${className} ${
            state.isLoading ? 'bg-gray-100 cursor-not-allowed' : ''
          } ${state.error ? 'border-red-500' : 'hover:border-gray-400'}`}
        />
        
        {/* Left Icon */}
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {state.isLoading ? (
            <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

        {/* Right Status Indicator */}
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {state.isSearching && state.inputValue.length >= minChars && (
            <div class="flex items-center gap-1 animate-pulse">
              <div class="w-1 h-1 bg-blue-500 rounded-full"></div>
              <div class="w-1 h-1 bg-blue-500 rounded-full"></div>
              <div class="w-1 h-1 bg-blue-500 rounded-full"></div>
            </div>
          )}
          
          {state.searchCount > 0 && !state.isSearching && (
            <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ✓ {state.searchCount}
            </span>
          )}
        </div>

        {/* Status Messages */}
        <div class="absolute top-full left-0 mt-1 space-y-1">
          {state.error && (
            <div class="text-red-500 text-sm">❌ {state.error}</div>
          )}
          
          {state.isLoading && (
            <div class="text-blue-500 text-sm">📡 Loading Google Maps...</div>
          )}
          
          {!state.isLoading && !state.error && state.inputValue.length > 0 && state.inputValue.length < minChars && (
            <div class="text-gray-400 text-sm">
              💡 Type at least {minChars} characters to search
            </div>
          )}
          
          {state.isLoaded && !state.needsSetup && state.searchCount === 0 && !state.inputValue && (
            <div class="text-green-600 text-sm">✅ Ready to search addresses</div>
          )}
        </div>
      </div>
    );
  }
);