'use client';

import { useCallback, useRef, useState } from 'react';

import type { PlaceDetailsResult, PlaceResult, UseGooglePlacesReturn } from './types';

const DEBOUNCE_DELAY = 300;

/**
 * Places API (New) v1 Autocomplete Response
 */
interface AutocompleteV1Response {
  suggestions?: Array<{
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
      structuredFormat: {
        mainText: {
          text: string;
        };
        secondaryText: {
          text: string;
        };
      };
    };
  }>;
  error?: string;
}

/**
 * Places API (New) v1 Place Details Response
 */
interface PlaceDetailsV1Response {
  addressComponents?: Array<{
    longText: string;
    shortText: string;
    types: string[];
  }>;
  formattedAddress?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  timeZone?: {
    id: string;
  };
  error?: string;
}

/**
 * Hook for Google Places REST API
 * Uses internal Next.js API routes to proxy requests to Google Places API
 * This keeps the API key secure on the server side
 */
export function useGooglePlacesRest(types?: string[]): UseGooglePlacesReturn {
  const [predictions, setPredictions] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Search for places based on user input using internal API route
   */
  const searchPlaces = useCallback((input: string) => {
    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Clear predictions for empty or short input
    if (!input || input.length < 3) {
      setPredictions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        // Call internal API route instead of Google directly
        const response = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input, ...(types && { types }) }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data: AutocompleteV1Response = await response.json();

        if (data.error) {
          console.error('Places API error:', data.error);
          setError('Unable to find address suggestions. Please try again.');
          setPredictions([]);
          return;
        }

        if (data.suggestions && data.suggestions.length > 0) {
          setPredictions(
            data.suggestions.map((s) => ({
              placeId: s.placePrediction.placeId,
              description: s.placePrediction.text.text,
              mainText: s.placePrediction.structuredFormat.mainText.text,
              secondaryText: s.placePrediction.structuredFormat.secondaryText.text,
            }))
          );
        } else {
          setPredictions([]);
        }
      } catch (err) {
        console.error('Address lookup error:', err);
        setError('Unable to find address suggestions. Please try again or enter your address manually.');
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_DELAY);
  }, []);

  /**
   * Get detailed place information by place ID using internal API route
   */
  const getPlaceDetails = useCallback(
    async (placeId: string): Promise<PlaceDetailsResult | null> => {
      try {
        // Call internal API route instead of Google directly
        const response = await fetch(`/api/places/${placeId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }

        const data: PlaceDetailsV1Response = await response.json();

        if (data.error) {
          throw new Error(`Place details request failed: ${data.error}`);
        }

        if (data.addressComponents && data.formattedAddress) {
          // Convert Places API v1 response to PlaceDetailsResult format
          return {
            address_components: data.addressComponents.map((comp) => ({
              long_name: comp.longText,
              short_name: comp.shortText,
              types: comp.types,
            })),
            formatted_address: data.formattedAddress,
            geometry: data.location
              ? {
                  location: {
                    lat: () => data.location!.latitude,
                    lng: () => data.location!.longitude,
                  },
                }
              : undefined,
            timeZoneId: data.timeZone?.id,
          };
        }

        throw new Error('Place details response missing required fields');
      } catch (err) {
        console.error('Place details error:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Clear predictions list
   */
  const clearPredictions = useCallback(() => {
    setPredictions([]);
  }, []);

  return {
    predictions,
    loading,
    error,
    searchPlaces,
    getPlaceDetails,
    clearPredictions,
    isLoaded: true, // Always "loaded" since we use internal API routes
  };
}
