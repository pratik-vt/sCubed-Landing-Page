import { useEffect, useState, useRef } from 'react';

import type { City, State } from '@/types/subscription';
import { fetchApi } from '@/lib/api-client';
import { ERROR_MESSAGES } from '@/constants/messages';

interface StatesResponse {
  rows: State[];
}

interface CitiesResponse {
  rows: City[];
}

// Cache for states and cities to avoid refetching on navigation
const statesCache: { data: State[] | null; loading: boolean } = {
  data: null,
  loading: false,
};
const citiesCache: Record<string, City[]> = {};

export function useLocationData(selectedStateId: string) {
  const [states, setStates] = useState<State[]>(statesCache.data || []);
  const [cities, setCities] = useState<City[]>(
    selectedStateId && citiesCache[selectedStateId] ? citiesCache[selectedStateId] : []
  );
  const [loadingStates, setLoadingStates] = useState(!statesCache.data);
  const [loadingCities, setLoadingCities] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const loadingStatesRef = useRef(false);

  // Load states on mount (with caching)
  useEffect(() => {
    // If states are already cached, use them immediately
    if (statesCache.data) {
      setStates(statesCache.data);
      setLoadingStates(false);
      return;
    }

    // If states are currently being loaded by another instance, skip
    if (statesCache.loading || loadingStatesRef.current) {
      return;
    }

    const loadStates = async () => {
      loadingStatesRef.current = true;
      statesCache.loading = true;
      setLoadingStates(true);
      setApiError(null);

      try {
        const result = await fetchApi<StatesResponse>('states', {
          method: 'GET',
        });

        if (result?.rows) {
          statesCache.data = result.rows;
          setStates(result.rows);
        }
      } catch (error) {
        console.error('Failed to load states:', error);
        setApiError(ERROR_MESSAGES.FAILED_TO_LOAD_STATES);
      } finally {
        setLoadingStates(false);
        statesCache.loading = false;
        loadingStatesRef.current = false;
      }
    };

    loadStates();
  }, []);

  // Load cities when state changes (with caching)
  useEffect(() => {
    if (!selectedStateId) {
      setCities([]);
      return;
    }

    // Check if cities for this state are already cached
    if (citiesCache[selectedStateId]) {
      setCities(citiesCache[selectedStateId]);
      return;
    }

    const loadCities = async () => {
      setLoadingCities(true);

      try {
        const result = await fetchApi<CitiesResponse>(
          `states/${selectedStateId}/cities?page=1&limit=500`,
          {
            method: 'GET',
          },
        );

        const fetchedCities = result?.rows || [];
        // Cache the cities for this state
        citiesCache[selectedStateId] = fetchedCities;
        setCities(fetchedCities);
      } catch (error) {
        console.error('Failed to load cities:', error);
        // Error toast is automatically shown by fetchApi
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [selectedStateId]);

  return { states, cities, loadingStates, loadingCities, apiError };
}
