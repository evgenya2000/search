import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  login: () => void;
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
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),
    }),
    {
      name: 'land-search-auth',
      partialize: (state) => ({ isAuth: state.isAuth }),
    }
  )
);
