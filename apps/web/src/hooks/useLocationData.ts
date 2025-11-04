import { useEffect, useState } from 'react';

import type { City, State } from '@/types/subscription';
import { fetchApi } from '@/lib/api-client';
import { ERROR_MESSAGES } from '@/constants/messages';

interface StatesResponse {
  rows: State[];
}

interface CitiesResponse {
  rows: City[];
}

export function useLocationData(selectedStateId: string) {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load states on mount
  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      setApiError(null);

      try {
        const result = await fetchApi<StatesResponse>('states', {
          method: 'GET',
        });

        if (result?.rows) {
          setStates(result.rows);
        }
      } catch (error) {
        console.error('Failed to load states:', error);
        setApiError(ERROR_MESSAGES.FAILED_TO_LOAD_STATES);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (!selectedStateId) {
      setCities([]);
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

        setCities(result?.rows || []);
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
