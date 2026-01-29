import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchApi } from '@/lib/api-client';
import type { City } from '@/types/subscription';

interface PaginatedCitiesResponse {
  rows: City[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UsePaginatedCitiesOptions {
  stateId: string;
  limit?: number;
  searchDebounceMs?: number;
}

interface UsePaginatedCitiesReturn {
  cities: City[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => void;
  search: (query: string) => void;
  reset: () => void;
}

// Fetch 200 cities at a time for smooth experience
const DEFAULT_LIMIT = 200;
const SEARCH_DEBOUNCE_MS = 300;

export function usePaginatedCities({
  stateId,
  limit = DEFAULT_LIMIT,
  searchDebounceMs = SEARCH_DEBOUNCE_MS,
}: UsePaginatedCitiesOptions): UsePaginatedCitiesReturn {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  // Fetch cities (initial or paginated)
  const fetchCities = useCallback(
    async (page: number, query: string = '', append: boolean = false) => {
      if (!stateId) return;

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      const isLoadingMore = append;
      if (isLoadingMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        // Build query params
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        // Add search query if provided
        if (query.trim()) {
          params.append('search', query.trim());
        }

        const result = await fetchApi<PaginatedCitiesResponse>(
          `states/${stateId}/cities?${params.toString()}`,
          { method: 'GET' },
        );

        if (!isMountedRef.current) return;

        const newCities = result?.rows || [];

        if (append) {
          setCities((prev) => [...prev, ...newCities]);
        } else {
          setCities(newCities);
        }

        // Determine if there are more pages
        if (result?.pagination) {
          setHasMore(page < result.pagination.totalPages);
        } else {
          // If no pagination info, check if we got a full page
          setHasMore(newCities.length >= limit);
        }

        setCurrentPage(page);
      } catch (err) {
        if (!isMountedRef.current) return;
        if ((err as Error).name !== 'AbortError') {
          console.error('Failed to fetch cities:', err);
          setError('Failed to load cities');
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [stateId, limit],
  );

  // Initial load when state changes
  useEffect(() => {
    isMountedRef.current = true;

    if (stateId) {
      setCities([]);
      setCurrentPage(1);
      setHasMore(true);
      setSearchQuery('');
      fetchCities(1, '');
    } else {
      setCities([]);
      setHasMore(false);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [stateId, fetchCities]);

  // Load more (for infinite scroll)
  const loadMore = useCallback(() => {
    if (!loading && !loadingMore && hasMore && stateId) {
      fetchCities(currentPage + 1, searchQuery, true);
    }
  }, [
    loading,
    loadingMore,
    hasMore,
    stateId,
    currentPage,
    searchQuery,
    fetchCities,
  ]);

  // Search with debounce
  const search = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Debounce search
      searchTimeoutRef.current = setTimeout(() => {
        setCities([]);
        setCurrentPage(1);
        setHasMore(true);
        fetchCities(1, query);
      }, searchDebounceMs);
    },
    [fetchCities, searchDebounceMs],
  );

  // Reset to initial state
  const reset = useCallback(() => {
    setCities([]);
    setCurrentPage(1);
    setHasMore(true);
    setSearchQuery('');
    setError(null);
    if (stateId) {
      fetchCities(1, '');
    }
  }, [stateId, fetchCities]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    cities,
    loading,
    loadingMore,
    hasMore,
    error,
    loadMore,
    search,
    reset,
  };
}
