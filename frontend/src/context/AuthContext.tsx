import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { authApi, User } from "../api/auth";

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ requires2fa?: boolean; emailUnverified?: boolean }>;
  register: (displayName: string, email: string, password: string) => Promise<{ needsVerification?: boolean }>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const CACHE_KEY = "auth_user";

function readCachedUser(): User | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function writeCachedUser(u: User | null) {
  try {
    if (u) sessionStorage.setItem(CACHE_KEY, JSON.stringify(u));
    else sessionStorage.removeItem(CACHE_KEY);
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const cached = readCachedUser();

  const [user, setUserState] = useState<User | null>(cached);
  // If we already have a cached user, skip the loading gate so the page renders immediately.
  // The /api/me call still runs in the background to validate the session.
  const [isLoading, setIsLoading] = useState(!cached);

  const setUser = (u: User | null) => {
    writeCachedUser(u);
    setUserState(u);
  };

  useEffect(() => {
    authApi
      .me()
      .then((u) => {
        writeCachedUser(u);
        setUserState(u);
      })
      .catch(() => {
        writeCachedUser(null);
        setUserState(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      const res = await authApi.login(email, password, rememberMe);
      if (res.requires2fa) return { requires2fa: true };
      if (res.emailUnverified) return { emailUnverified: true };
      setUser(res);
      return {};
    } catch (err: unknown) {
      const data = (err as { data?: { emailUnverified?: boolean } })?.data;
      if (data?.emailUnverified) return { emailUnverified: true };
      throw err;
    }
  };

  const register = async (displayName: string, email: string, password: string) => {
    await authApi.register(displayName, email, password);
    await login(email, password);
    return { needsVerification: false };
  };

  const updateProfile = async (data: Partial<User>) => {
    const updated = await authApi.updateProfile(data);
    setUser(updated);
  };

  const logout = () => {
    authApi.logout().catch(() => {});
    setUser(null);
  };

  const isAdmin =
    !!user &&
    typeof user.role === "string" &&
    user.role.toUpperCase().includes("ADMIN");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
