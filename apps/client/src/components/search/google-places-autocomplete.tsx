
// src/components/search/google-places-autocomplete.tsx
import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

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
  onPlaceSelect?: (place: PlaceResult) => void;
  placeholder?: string;
  className?: string;
}

export const GooglePlacesAutocomplete = component$<GooglePlacesAutocompleteProps>(
  ({ onPlaceSelect, placeholder = "Enter your location", className = "" }) => {
    const inputRef = useSignal<HTMLInputElement>();
    const autocompleteRef = useSignal<google.maps.places.Autocomplete>();
    const isLoaded = useSignal(false);

    // Load Google Places API
    useVisibleTask$(async () => {
    //   if (typeof window !== 'undefined' && !window.google) {
    //     await loadGoogleMapsAPI();
    //   }
      initializeAutocomplete();
    });

    // const loadGoogleMapsAPI = $(() => {
    //   return new Promise((resolve, reject) => {
    //     if (window.google) {
    //       resolve(window.google);
    //       return;
    //     }

    //     const script = document.createElement('script');
    //     script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    //     script.async = true;
    //     script.defer = true;
        
    //     script.onload = () => {
    //       isLoaded.value = true;
    //       resolve(window.google);
    //     };
        
    //     script.onerror = () => {
    //       reject(new Error('Failed to load Google Maps API'));
    //     };
        
    //     document.head.appendChild(script);
    //   });
    // });

    const initializeAutocomplete = $(() => {
      if (!inputRef.value || !window.google || !isLoaded.value) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.value, {
        types: ['geocode'],
        componentRestrictions: { country: 'us' }, // Restrict to US
        fields: ['place_id', 'formatted_address', 'geometry', 'name', 'types']
      });

      autocompleteRef.value = autocomplete;

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        
        if (place.geometry && place.geometry.location) {
          const placeResult: PlaceResult = {
            place_id: place.place_id || '',
            formatted_address: place.formatted_address || '',
            geometry: {
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            },
            name: place.name || '',
            types: place.types || []
          };

          if (onPlaceSelect) {
            onPlaceSelect(placeResult);
          }
        }
      });
    });

    return (
      <div class="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          class={`w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${className}`}
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    );
  }
);
