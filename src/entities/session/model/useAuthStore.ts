import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

interface AuthState {
  isAuth: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

/**
 * Session entity store.
 * Owns the authenticated flag and persists it to localStorage.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      login: (user) => set({ isAuth: true, user }),
      logout: () => set({ isAuth: false, user: null }),
    }),
    {
      name: 'land-search-auth',
      partialize: (state) => ({ isAuth: state.isAuth }),
    }
  )
);
