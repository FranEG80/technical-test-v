"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../_hooks/useAuth";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (!user) return null;
  return <>{children}</>;
}