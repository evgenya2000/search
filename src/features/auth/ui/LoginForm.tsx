import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Button, Input } from '@/shared/ui';
import { useAuthStore } from '@/entities/session';
import { login as loginRequest } from '@/shared/api';
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
const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export function LoginForm() {
  const setAuthenticated = useAuthStore((state) => state.login);
  const { t } = useI18n();
  const navigate = useNavigate();
  const loginMutation = useMutation({ mutationFn: loginRequest, retry: false });
  const schema = useMemo(() => createLoginSchema(t), [t]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      setAuthenticated();
      navigate(routes.chat, { replace: true });
    } catch {
      // The error is displayed below so the user can retry.
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>{t('login.title')}</Title>
      <Subtitle>{t('login.subtitle')}</Subtitle>
      <Input label={t('login.email')} type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Input label={t('login.password')} type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />
      {loginMutation.isError && <ErrorText role="alert">{loginMutation.error.message || t('login.errors.failed')}</ErrorText>}
      <Button type="submit" size="lg" isLoading={isSubmitting || loginMutation.isPending}>{t('login.submit')}</Button>
    </Form>
  );
}
