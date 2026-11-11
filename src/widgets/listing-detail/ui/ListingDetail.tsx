import { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MapPin, Maximize, ExternalLink } from 'lucide-react';
import { Button, Spinner } from '@/shared/ui';
import { formatPrice, useI18n } from '@/shared/lib';
import { routes } from '@/shared/config';
import type { NearbyObject, ListingRoute } from '@/shared/api';
import { useListing } from '../model/useListing';

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
const NearbyCard = styled.article`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;
const OriginalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;
const ShowMoreButton = styled(Button)`
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;
const ChevronIcon = styled(ChevronDown)<{ $expanded: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${({ $expanded }) => ($expanded ? 180 : 0)}deg);
  margin: 2px -5px 0 0;
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

const NEARBY_PREVIEW_COUNT = 2;

function nearbyName(object: NearbyObject, t: (key: string) => string): string {
  return object.name ?? t('listingDetail.categories.' + object.category);
}

function routeSummary(route: ListingRoute, t: (key: string, values?: Record<string, string>) => string): string {
  const minutes = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(route.durationSeconds / 60);
  const distance = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(route.distanceMeters / 1000);
  return t('listingDetail.routeSummary', { minutes, distance });
}

export function ListingDetail() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listing, isLoading, error } = useListing(id);
  const [nearbyExpanded, setNearbyExpanded] = useState(false);

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

  const hasNearby = listing.nearbyObjects.length > 0;
  const hasHiddenNearby = listing.nearbyObjects.length > NEARBY_PREVIEW_COUNT;
  const visibleNearby = nearbyExpanded
    ? listing.nearbyObjects
    : listing.nearbyObjects.slice(0, NEARBY_PREVIEW_COUNT);

  return (
    <Page>
      <Header>
        <BackButton onClick={() => navigate(-1)} aria-label={t('listingDetail.back')}>
          <ArrowLeft size={20} aria-hidden />
        </BackButton>
        <HeaderTitle>{listing.title}</HeaderTitle>
      </Header>
      <Main>
        <div>
          <Title>{listing.title}</Title>
          <MetaRow>
            <MetaItem><MapPin size={16} aria-hidden />{listing.location}</MetaItem>
            {listing.areaAres !== null && <MetaItem><Maximize size={16} aria-hidden />{t('listings.area', { area: String(listing.areaAres) })}</MetaItem>}
            <MetaItem>{houseLabel}</MetaItem>
          </MetaRow>
          <Price>{listing.priceRub === null ? t('listings.priceUnknown') : formatPrice(listing.priceRub)}</Price>
        </div>
        {listing.description && (
          <Section>
            <SectionTitle>{t('listingDetail.description')}</SectionTitle>
            <Description>{listing.description}</Description>
          </Section>
        )}
        <OriginalLink href={listing.link} target="_blank" rel="noreferrer">
          <ExternalLink size={18} aria-hidden />
          {t('listingDetail.originalListing')}
        </OriginalLink>
        <Section>
          <SectionTitle>{t('listingDetail.nearby')}</SectionTitle>
          {!hasNearby ? (
            <Description>{t('listingDetail.noNearby')}</Description>
          ) : (
            <>
              {visibleNearby.map((object, index) => (
                <NearbyCard key={object.category + '-' + object.name + '-' + index}>
                  <strong>{nearbyName(object, t)}</strong>
                  {object.routes.map((route, routeIndex) => (
                    <Description key={route.mode + '-' + routeIndex}>
                      {t('listingDetail.modes.' + route.mode)} · {routeSummary(route, t)}
                    </Description>
                  ))}
                </NearbyCard>
              ))}
              {hasHiddenNearby && (
                <ShowMoreButton
                  onClick={() => setNearbyExpanded((v) => !v)}
                  aria-expanded={nearbyExpanded}
                  title={nearbyExpanded ? t('listingDetail.showLess') : t('listingDetail.showMore')}
                >
                  {nearbyExpanded ? t('listingDetail.showLess') : t('listingDetail.showMore')}
                  <ChevronIcon size={18} aria-hidden $expanded={nearbyExpanded} />
                </ShowMoreButton>
              )}
            </>
          )}
        </Section>
      </Main>
    </Page>
  );
}