import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Maximize, FileText, Phone, Mail } from 'lucide-react';
import { Button, Spinner } from '@/shared/ui';
import { formatPrice, cn, useI18n } from '@/shared/lib';
import { routes } from '@/shared/config';
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

const HeroImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.input};

  @media (min-width: 640px) {
    height: 20rem;
  }
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

const Price = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatusBadge = styled.span<{ $status: 'available' | 'reserved' | 'sold' }>`
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
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const DocumentsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const DocumentTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DocumentSize = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  flex-shrink: 0;
`;

const SellerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const SellerName = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ContactLink = styled(Button).attrs({ as: 'a' })<{ variant?: 'primary' | 'secondary' }>`
  text-decoration: none;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

export function ListingDetail() {
  const { t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { listing, isLoading, error } = useListing(id);

  if (isLoading) {
    return (
      <EmptyState>
        <Spinner label={t('listingDetail.loading')} />
        <span>{t('listingDetail.loading')}</span>
      </EmptyState>
    );
  }

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

  return (
    <Page>
      <Header>
        <BackButton variant="secondary" onClick={() => navigate(-1)} aria-label={t('listingDetail.back')}>
          <ArrowLeft size={20} aria-hidden />
        </BackButton>
        <HeaderTitle>{listing.title}</HeaderTitle>
      </Header>

      <Main>
        <HeroImage src={listing.imageUrl} alt={listing.title} />

        <div className={cn('flex flex-col gap-2')}>
          <Title>{listing.title}</Title>
          <MetaRow>
            <MetaItem>
              <MapPin size={16} aria-hidden />
              {listing.location}
            </MetaItem>
            <MetaItem>
              <Maximize size={16} aria-hidden />
              {t('listings.area', { area: String(listing.area) })}
            </MetaItem>
            <StatusBadge $status={listing.status}>
              {t(`listings.status.${listing.status}`)}
            </StatusBadge>
          </MetaRow>
          <Price>{formatPrice(listing.price)}</Price>
        </div>

        <Section>
          <SectionTitle>{t('listingDetail.description')}</SectionTitle>
          <Description>{listing.description}</Description>
        </Section>

        <Section>
          <SectionTitle>{t('listingDetail.documents')}</SectionTitle>
          {listing.documents.length === 0 ? (
            <Description>{t('listingDetail.noDocuments')}</Description>
          ) : (
            <DocumentsList>
              {listing.documents.map((doc) => (
                <DocumentItem key={doc.id}>
                  <DocumentInfo>
                    <FileText size={20} aria-hidden />
                    <DocumentTitle>{doc.title}</DocumentTitle>
                  </DocumentInfo>
                  <DocumentSize>{doc.size}</DocumentSize>
                </DocumentItem>
              ))}
            </DocumentsList>
          )}
        </Section>

        <Section>
          <SectionTitle>{t('listingDetail.contactSeller')}</SectionTitle>
          <SellerCard>
            <SellerName>{listing.seller.name}</SellerName>
            <ContactRow>
              <ContactLink href={`tel:${listing.seller.phone}`}>
                <Phone size={18} aria-hidden />
                {listing.seller.phone}
              </ContactLink>
              <ContactLink href={`mailto:${listing.seller.email}`} variant="secondary">
                <Mail size={18} aria-hidden />
                {t('listingDetail.emailSeller')}
              </ContactLink>
            </ContactRow>
          </SellerCard>
        </Section>
      </Main>
    </Page>
  );
}
