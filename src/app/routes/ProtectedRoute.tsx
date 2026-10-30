import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/session';
import { routes } from '@/shared/config';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuthStore((state) => state.isAuth);

  if (!isAuth) {
    return <Navigate to={routes.login} replace />;
  }

  return <>{children}</>;
}
