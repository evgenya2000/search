import { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Maximize, ExternalLink } from 'lucide-react';
import { Button, Spinner } from '@/shared/ui';
import { formatPrice, useI18n } from '@/shared/lib';
import { routes } from '@/shared/config';
import { useListing } from '../model/useListing';

const ListingsMap = lazy(() => import('@/features/show-results/ui/ListingsMap').then((module) => ({ default: module.ListingsMap })));

const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
const BackButton = styled(Button)`
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
`;
const HeaderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Main = styled.main`
  max-width: 56rem;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const DetailImage = styled.img`
  display: block;
  width: 100%;
  max-height: 34rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.input};
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.25;
`;
const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;
const Price = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;
const OriginalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;
const MapLoading = styled.div`
  display: grid;
  place-items: center;
  height: clamp(18rem, 42vh, 32rem);
  min-height: 280px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.muted};
`;
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export function ListingDetail() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listing, isLoading, error } = useListing(id);

  if (isLoading) return <EmptyState><Spinner label={t('listingDetail.loading')} /><span>{t('listingDetail.loading')}</span></EmptyState>;

  if (error || !listing) {
    return (
      <Page>
        <Header>
          <BackButton variant="secondary" onClick={() => navigate(-1)} aria-label={t('listingDetail.back')}>
            <ArrowLeft size={20} aria-hidden />
          </BackButton>
          <HeaderTitle>{t('listingDetail.notFound')}</HeaderTitle>
        </Header>
        <Main>
          <EmptyState>
            <p>{error ?? t('listingDetail.notFoundDescription')}</p>
            <Button onClick={() => navigate(routes.chat)}>{t('listingDetail.goToSearch')}</Button>
          </EmptyState>
        </Main>
      </Page>
    );
  }

  const houseLabel = listing.withHouse === null
    ? t('listings.houseUnknown')
    : listing.withHouse ? t('listings.withHouse') : t('listings.withoutHouse');

  return (
    <Page>
      <Header>
        <BackButton onClick={() => navigate(-1)} aria-label={t('listingDetail.back')}>
          <ArrowLeft size={20} aria-hidden />
        </BackButton>
        <HeaderTitle>{listing.title}</HeaderTitle>
      </Header>
      <Main>
        {listing.imageUrlLarge && <DetailImage src={listing.imageUrlLarge} alt={listing.title} />}
        <div>
          <Title>{listing.title}</Title>
          <MetaRow>
            <MetaItem><MapPin size={16} aria-hidden />{listing.location}</MetaItem>
            {listing.areaAres !== null && <MetaItem><Maximize size={16} aria-hidden />{t('listings.area', { area: String(listing.areaAres) })}</MetaItem>}
            <MetaItem>{houseLabel}</MetaItem>
          </MetaRow>
          <Price>{listing.priceRub === null ? t('listings.priceUnknown') : formatPrice(listing.priceRub)}</Price>
          <OriginalLink href={listing.link} target="_blank" rel="noreferrer">
            <ExternalLink size={18} aria-hidden />
            {t('listingDetail.originalListing')}
          </OriginalLink>
        </div>

        {listing.description && (
          <Section>
            <SectionTitle>{t('listingDetail.description')}</SectionTitle>
            <Description>{listing.description}</Description>
          </Section>
        )}
        <Section>
          <SectionTitle>{t('listingDetail.map')}</SectionTitle>
          <Suspense fallback={<MapLoading role="status">{t('chat.loading')}</MapLoading>}>
            <ListingsMap items={[listing]} showDetailsLink={false} />
          </Suspense>
        </Section>
      </Main>
    </Page>
  );
}
