import { ListingsResults } from '@/features/show-results';
import type { Listing } from '@/entities/listing';

interface ListingsGridProps {
  items: Listing[];
  total: number;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}

export function ListingsGrid(props: ListingsGridProps) {
  return <ListingsResults {...props} />;
}
