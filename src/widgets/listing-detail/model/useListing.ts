import { useQuery } from '@tanstack/react-query';
import { getListing } from '@/shared/api';

export function useListing(id: string | undefined) {
  const numericId = id ? Number(id) : Number.NaN;
  const valid = Number.isInteger(numericId) && numericId > 0;
  const query = useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListing(numericId),
    enabled: valid,
    retry: false,
  });
  return {
    listing: query.data ?? null,
    isLoading: query.isPending && valid,
    error: !valid ? 'Invalid listing id' : query.error instanceof Error ? query.error.message : null,
  };
}
