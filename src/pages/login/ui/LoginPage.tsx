import styled from 'styled-components';
import { LoginForm } from '@/features/auth';

const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
`;

export function LoginPage() {
  return (
    <Page>
      <LoginForm />
    </Page>
  );
}
