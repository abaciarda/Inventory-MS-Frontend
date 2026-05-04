"use client";

import type { AuthUser } from "@/types/app.types";
import { createContext, useContext, useEffect, useState } from "react";

export type User = AuthUser;

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function checkAuth() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const responseData = await response.json();
        const userData = responseData?.data;
        setUser({
          id: userData?.id,
          username: userData?.username,
          role: userData?.role
        })
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to check authentication status:", err);
      setError("Network error or server is unreachable.");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to log out:", err);
    } finally {
      setUser(null);
    }
  }

  useEffect(() => {
    void checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextValue = { user, isLoading, error, checkAuth, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
