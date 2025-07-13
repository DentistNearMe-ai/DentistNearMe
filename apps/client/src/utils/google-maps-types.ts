
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    namespace places {
      interface PlaceGeometry {
        location: LatLng;
        viewport?: LatLngBounds;
      }

      interface PlaceResult {
        place_id?: string;
        formatted_address?: string;
        geometry?: PlaceGeometry;
        name?: string;
        types?: string[];
      }

      class Autocomplete {
        constructor(
          inputField: HTMLInputElement,
          options?: AutocompleteOptions
        );
        addListener(eventName: string, handler: () => void): void;
        getPlace(): PlaceResult;
      }

      interface AutocompleteOptions {
        bounds?: LatLngBounds;
        componentRestrictions?: ComponentRestrictions;
        fields?: string[];
        strictBounds?: boolean;
        types?: string[];
      }

      interface ComponentRestrictions {
        country?: string | string[];
      }
    }

    interface LatLngBounds {
      // Add bounds interface if needed
    }
  }
}