import { useEffect, useState } from 'react';
import type { Listing } from '@/entities/listing';
import { mockListings } from '@/entities/listing/@x/mocks';

interface UseListingResult {
  listing: Listing | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Feature hook for fetching a single listing by id.
 * Currently searches technical mock data with a simulated delay.
 */
export function useListing(id: string | undefined): UseListingResult {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (cancelled) return;

      const found = mockListings.find((item) => item.id === id) ?? null;
      setListing(found);
      setIsLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { listing, isLoading, error };
}
