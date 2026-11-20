import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { ListingCard } from '@/entities/listing';
import type { Listing } from '@/entities/listing';
import { Spinner } from '@/shared/ui';
import { useI18n } from '@/shared/lib';

const ListingsMap = lazy(() => import('./ListingsMap').then((module) => ({ default: module.ListingsMap })));

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
const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.75rem 0;
`;
const MapTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
const MapLoading = styled.div`
  height: clamp(18rem, 42vh, 32rem);
  min-height: 280px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.input};
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
          <MapSection>
            <MapTitle>{t('listings.mapTitle')}</MapTitle>
            <Suspense fallback={<MapLoading role="status">{t('chat.loading')}</MapLoading>}>
              <ListingsMap items={items} />
            </Suspense>
          </MapSection>
          <Grid>{items.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</Grid>
        </>
      )}
    </Wrapper>
  );
}
