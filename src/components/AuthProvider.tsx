'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Models } from 'appwrite';
import { getAccount } from '@/utils/appwrite/client';

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const account = getAccount();
    account.get()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useUser() {
  return useContext(AuthContext);
}
