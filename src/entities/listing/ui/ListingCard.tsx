import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MapPin, Maximize } from 'lucide-react';
import { formatPrice, cn, useI18n } from '@/shared/lib';
import { routes } from '@/shared/config';
import type { Listing } from '../model/types';

interface ListingCardProps {
  listing: Listing;
  className?: string;
}

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 200ms ease, box-shadow 200ms ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Matches = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

const Match = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

function formatArea(value: number, language: string): string {
  return new Intl.NumberFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    maximumFractionDigits: 1,
  }).format(value);
}

export function ListingCard({ listing, className }: ListingCardProps) {
  const { t, language } = useI18n();
  const houseLabel = listing.withHouse === null
    ? t('listings.houseUnknown')
    : listing.withHouse
      ? t('listings.withHouse')
      : t('listings.withoutHouse');

  return (
    <Card to={routes.listing.replace(':id', String(listing.id))} className={cn(className)}>
      <Content>
        <Title>{listing.title}</Title>
        <Description>{houseLabel}</Description>
        <Meta><MapPin size={14} aria-hidden />{listing.location}</Meta>
        <MetaRow>
          <Price>{listing.priceRub === null ? t('listings.priceUnknown') : formatPrice(listing.priceRub)}</Price>
          {listing.areaAres !== null && (
            <Meta>
              <Maximize size={14} aria-hidden />
              {t('listings.area', { area: formatArea(listing.areaAres, language) })}
            </Meta>
          )}
        </MetaRow>
        {listing.matchedObjects.length > 0 && (
          <Matches aria-label={t('listings.matches', { count: String(listing.matchedObjectsTotal) })}>
            {listing.matchedObjects.slice(0, 4).map((object, index) => (
              <Match key={object.category + '-' + object.name + '-' + index}>
                {object.name ?? t('listingDetail.categories.' + object.category)}
              </Match>
            ))}
          </Matches>
        )}
      </Content>
    </Card>
  );
}
