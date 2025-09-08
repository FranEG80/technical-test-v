"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import Header from "@/components/header";
import HeroSection from "@/components/heroSection";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Útil para depurar en desarrollo
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header hideLogin/>
      <main className="mt-28 relative min-h-dvh bg-white text-zinc-900">
        <HeroSection className="h-[calc(100vh-7rem)] mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <Title>Something went wrong.</Title>
            <Subtitle className="mt-4 text-2xl">
              An error happened loading this page. You can try again or go back home.
            </Subtitle>
          </div>

          <Card className="order-1 mx-auto w-full max-w-md rounded-2xl border-zinc-200/70 shadow-xl backdrop-blur md:order-2">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-700">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                Error
              </CardTitle>
              <CardDescription>An error occurred while loading this page.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-zinc-700 break-words">
                {error?.message ?? "Unknown error"}
              </p>
              {error?.digest && (
                <p className="rounded-md border border-zinc-200 bg-zinc-50 p-2 text-xs text-zinc-600">
                  Reference code: <span className="font-mono">{error.digest}</span>
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                onClick={() => reset()}
                className="w-full sm:w-auto bg-vidext text-black hover:bg-gray-200"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button asChild variant="outline" className="w-full sm:w-auto hover:bg-gray-200">
                  <Link 
                    href="/"
                    target="_self"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Go home
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </HeroSection>
      </main>
    </div>
  );
}