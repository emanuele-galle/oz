import { create } from 'zustand';

interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
}

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  isInitialized: boolean;

  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  fetchUser: async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      set({ user: data.user || null, isInitialized: true });
    } catch {
      set({ user: null, isInitialized: true });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        set({ isLoading: false });
        return { success: false, error: data.error };
      }

      set({ user: data.user, isLoading: false });
      return { success: true };
    } catch {
      set({ isLoading: false });
      return { success: false, error: 'Errore di connessione' };
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        set({ isLoading: false });
        return { success: false, error: data.error };
      }

      set({ user: data.user, isLoading: false });
      return { success: true };
    } catch {
      set({ isLoading: false });
      return { success: false, error: 'Errore di connessione' };
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    set({ user: null });
  },

  setUser: (user) => set({ user }),
}));
