import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { ChatPage } from '@/pages/chat';
import { ListingDetailPage } from '@/pages/listing-detail';
import { ProtectedRoute } from './ProtectedRoute';
import { routes } from '@/shared/config';

export function AppRouter() {
  return (
    <Routes>
      <Route path={routes.login} element={<LoginPage />} />
      <Route
        path={routes.chat}
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={routes.listing}
        element={
          <ProtectedRoute>
            <ListingDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
