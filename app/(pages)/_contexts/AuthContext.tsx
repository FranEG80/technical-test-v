"use client";

import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { trpc } from "@/server/trpc/client";
import { inferRouterOutputs, inferRouterInputs } from '@trpc/server';

import { AppRouter } from '@/server/trpc/routers/_app';

type ROut = inferRouterOutputs<AppRouter>;
type RIn  = inferRouterInputs<AppRouter>;
type User = ROut['user']['getUser'];

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (payload: { email: string; name: string; remember?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: { email: string; name: string; remember?: boolean }) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
const LS_KEY = "demo:rememberedUser"; 


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) {
      try {
        const user = JSON.parse(cached) as User;
        setUser(user);
      } catch {}
    }
  }, []);

  const utils = trpc.useUtils();

  const loginMutation = trpc.user.login.useMutation({
    onSuccess: async (u) => {
        setUser(u);
        utils.user.getUser.invalidate();
    },
  });

  const registerMutation = trpc.user.register.useMutation({
    onSuccess: async (u) => {
        setUser(u);
        utils.user.getUser.invalidate();
    },
  });


  const logoutMutation = trpc.user.logout.useMutation({
    onSuccess: async () => {
      setUser(null);
      localStorage.removeItem(LS_KEY);
      utils.user.getUser.invalidate();
    },
  });

  const login: AuthContextType["login"] = async ({ email, name, remember }) => {
    const user = await loginMutation.mutateAsync({ email, name });
    if (remember && user) {
      localStorage.setItem(LS_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    }
  };

  const logout: AuthContextType["logout"] = async () => {
    await logoutMutation.mutateAsync();
  };

  const register: AuthContextType["login"] = async ({ email, name, remember }) => {
    const user = await registerMutation.mutateAsync({ email, name });
    if (remember && user) {
      localStorage.setItem(LS_KEY, JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    }
  }

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading: loginMutation.isPending || logoutMutation.isPending,
      login,
      logout,
      register,
    }),
    [user, loginMutation.isPending, logoutMutation.isPending],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
