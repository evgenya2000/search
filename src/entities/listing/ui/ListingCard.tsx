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
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 200ms ease, box-shadow 200ms ease;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.input};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
  flex: 1;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const Area = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const Location = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const StatusBadge = styled.span<{ $status: Listing['status'] }>`
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${({ $status, theme }) => {
    switch ($status) {
      case 'available':
        return `${theme.colors.success}1a`;
      case 'reserved':
        return `${theme.colors.warning}1a`;
      case 'sold':
        return `${theme.colors.error}1a`;
    }
  }};
  color: ${({ $status, theme }) => {
    switch ($status) {
      case 'available':
        return theme.colors.success;
      case 'reserved':
        return theme.colors.warning;
      case 'sold':
        return theme.colors.error;
    }
  }};
`;

export function ListingCard({ listing, className }: ListingCardProps) {
  const { t } = useI18n();

  return (
    <Card to={routes.listing.replace(':id', listing.id)} className={cn(className)}>
      <Image src={listing.imageUrl} alt={listing.title} loading="lazy" />
      <Content>
        <Title>{listing.title}</Title>
        <Description>{listing.description}</Description>
        <Location>
          <MapPin size={14} aria-hidden />
          {listing.location}
        </Location>
        <MetaRow>
          <Price>{formatPrice(listing.price)}</Price>
          <Area>
            <Maximize size={14} aria-hidden />
            {t('listings.area', { area: String(listing.area) })}
          </Area>
          <StatusBadge $status={listing.status}>
            {t(`listings.status.${listing.status}`)}
          </StatusBadge>
        </MetaRow>
      </Content>
    </Card>
  );
}
