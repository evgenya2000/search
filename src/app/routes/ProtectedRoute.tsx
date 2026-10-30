import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // TODO: временный байпас — вернуть проверку isAuth после отладки

  return <>{children}</>;
}
