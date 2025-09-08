import Link from "next/link";
import { Home } from "lucide-react";

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
import HomeStyles from "./(pages)/(home)/home.module.css";

export default function NotFound() {

  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header hideLogin/>
      <main className="mt-28 relative min-h-dvh bg-white text-zinc-900">
        <HeroSection className="h-[calc(100vh-7rem)] mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-6 md:grid-cols-2">
          <div className="order-2 md:order-1 text-center">
            <Title className={`${HomeStyles.stroked} text-transparent md:text-[200px] md:font-bold`}>
              404
            </Title>
            <Subtitle className="mt-4 text-3xl">
              This page could not be found.
            </Subtitle>
          </div>

          <Card className="order-1 mx-auto w-full max-w-md rounded-2xl border-zinc-200/70 shadow-xl backdrop-blur md:order-2">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-2xl">
                Not Found
              </CardTitle>
              <CardDescription>Verify the URL or use the quick access below.</CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">

              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="default" asChild className="w-full sm:w-auto bg-vidext text-black hover:bg-gray-200">
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