import styled from 'styled-components';
import { ListingDetail } from '@/widgets/listing-detail';

const Page = styled.main`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export function ListingDetailPage() {
  return (
    <Page>
      <ListingDetail />
    </Page>
  );
}
