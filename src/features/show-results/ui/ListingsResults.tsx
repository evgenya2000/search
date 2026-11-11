import styled from 'styled-components';
import { ListingCard } from '@/entities/listing';
import type { Listing } from '@/entities/listing';
import { Spinner } from '@/shared/ui';
import { useI18n } from '@/shared/lib';

interface ListingsResultsProps {
  items: Listing[];
  total: number;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;
const EmptyState = styled.p<{ $spinner?: boolean }>`
  color: ${({ theme }) => theme.colors.muted};
  text-align: ${({ $spinner }) => ($spinner ? 'center' : 'start')};;
  padding: 0;
`;

export function ListingsResults({ items, total, isLoading, hasSearched, error }: ListingsResultsProps) {
  const { t } = useI18n();
  if (!hasSearched) return null;

  return (
    <Wrapper aria-live="polite">
      <Title>{t('listings.title')}</Title>
      {isLoading ? (
        <EmptyState $spinner={true}><Spinner label={t('chat.loading')} /></EmptyState>
      ) : error ? (
        <EmptyState role="alert">{error}</EmptyState>
      ) : items.length === 0 ? (
        <EmptyState>{t('listings.empty')}</EmptyState>
      ) : (
        <>
          <EmptyState>{t('listings.count', { count: String(total) })}</EmptyState>
          <Grid>{items.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</Grid>
        </>
      )}
    </Wrapper>
  );
}
