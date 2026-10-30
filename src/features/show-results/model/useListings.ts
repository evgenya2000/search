import { useState, useEffect } from 'react';
import type { Listing } from '@/entities/listing';
import { mockListings } from '@/entities/listing/@x/mocks';

interface UseListingsResult {
  listings: Listing[];
  isLoading: boolean;
}

/**
 * Feature hook for fetching listings.
 * Currently returns technical mock data with a simulated delay.
 */
export function useListings(): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (!cancelled) {
        setListings(mockListings);
        setIsLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { listings, isLoading };
}
