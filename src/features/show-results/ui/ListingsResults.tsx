import styled from 'styled-components';
import { ListingCard } from '@/entities/listing';
import { Spinner } from '@/shared/ui';
import { useI18n } from '@/shared/lib';
import { useListings } from '../model/useListings';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  padding: 2rem 0;
`;

export function ListingsResults() {
  const { t } = useI18n();
  const { listings, isLoading } = useListings();

  return (
    <Wrapper>
      <Title>{t('listings.title')}</Title>
      {isLoading ? (
        <EmptyState>
          <Spinner label={t('chat.loading')} />
        </EmptyState>
      ) : listings.length === 0 ? (
        <EmptyState>{t('listings.empty')}</EmptyState>
      ) : (
        <Grid>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}
