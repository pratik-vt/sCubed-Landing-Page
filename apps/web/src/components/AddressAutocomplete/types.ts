/**
 * Address Autocomplete Types
 * Type definitions for Google Places API integration
 */

/**
 * Parsed address components from Google Places API
 */
export interface AddressComponents {
  /** Full street address (street number + street name) */
  streetAddress: string;
  /** Address line 2 (apartment, suite, unit, floor) - optional */
  addressLine2: string;
  /** City name */
  city: string;
  /** Full state name (e.g., "California") */
  state: string;
  /** State abbreviation (e.g., "CA") */
  stateCode: string;
  /** ZIP code */
  zipCode: string;
  /** Country name */
  country: string;
  /** Full formatted address from Google */
  formattedAddress: string;
}

/**
 * Place prediction result from Google Places Autocomplete API
 */
export interface PlaceResult {
  /** Google Place ID */
  placeId: string;
  /** Full description of the place */
  description: string;
  /** Main text (primary address part) */
  mainText: string;
  /** Secondary text (city, state, country) */
  secondaryText: string;
}

/**
 * Extended Place Details Result with timeZoneId from Places API v1
 */
export interface PlaceDetailsResult extends google.maps.places.PlaceResult {
  /** IANA timezone ID from Places API (New) v1 (e.g., "America/New_York") */
  timeZoneId?: string;
}

/**
 * Props for the AddressAutocomplete component
 */
export interface AddressAutocompleteProps {
  /** Callback when user selects an address */
  onAddressSelect: (
    address: AddressComponents,
    coordinates?: { lat: number; lng: number }
  ) => void;
  /** Callback when timezone is resolved (IANA timezone ID) */
  onTimezoneResolved?: (timezone: string) => void;
  /** Initial/current value for the input */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant: 'default' (56px) or 'compact' (42px) */
  size?: 'default' | 'compact';
  /** Custom className */
  className?: string;
  /** Label for the input field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
}

/**
 * Return type for the useGooglePlaces hook
 */
export interface UseGooglePlacesReturn {
  /** List of place predictions */
  predictions: PlaceResult[];
  /** Loading state for predictions */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Search for places with given input */
  searchPlaces: (input: string) => void;
  /** Get place details by place ID */
  getPlaceDetails: (
    placeId: string
  ) => Promise<PlaceDetailsResult | null>;
  /** Clear predictions list */
  clearPredictions: () => void;
  /** Whether Google Places API is loaded */
  isLoaded: boolean;
}

/**
 * Google Maps window extension
 */
declare global {
  interface Window {
    google?: typeof google;
    initGooglePlaces?: () => void;
  }
}
