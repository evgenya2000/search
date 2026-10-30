import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import { Button, Input } from '@/shared/ui';
import { useAuthStore } from '@/entities/session';
import { useI18n } from '@/shared/lib/i18n';
import { createLoginSchema, type LoginFormData } from '../model/loginSchema';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/shared/config/routes';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 360px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-bottom: 0.5rem;
`;

export function LoginForm() {
  const login = useAuthStore((state) => state.login);
  const { t } = useI18n();
  const navigate = useNavigate();

  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Login attempt:', data.email);
    login();
    navigate(routes.chat, { replace: true });  
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>{t('login.title')}</Title>
      <Subtitle>{t('login.subtitle')}</Subtitle>
      <Input
        label={t('login.email')}
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={t('login.password')}
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" size="lg" isLoading={isSubmitting}>
        {t('login.submit')}
      </Button>
    </Form>
  );
}
