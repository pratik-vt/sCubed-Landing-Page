import { useEffect, useRef, useState } from 'react';

import { ERROR_MESSAGES } from '@/constants/messages';
import { fetchApi } from '@/lib/api-client';
import type { State } from '@/types/subscription';

interface StatesResponse {
  rows: State[];
}

// Cache for states to avoid refetching on navigation
const statesCache: { data: State[] | null; loading: boolean } = {
  data: null,
  loading: false,
};

/**
 * Hook for loading states data.
 * Cities are now handled by usePaginatedCities hook for infinite scroll support.
 */
export function useLocationData() {
  const [states, setStates] = useState<State[]>(statesCache.data || []);
  const [loadingStates, setLoadingStates] = useState(!statesCache.data);
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

  return { states, loadingStates, apiError };
}
