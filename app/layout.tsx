import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./_styles/globals.css";
import { TRPCProvider } from "@/server/trpc/client";
import { AuthProvider } from "./(pages)/_contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "light",
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  title: "Mini Editor with tldraw – Technical Test Divext",
  description: "A technical test built with Next.js, TailwindCSS, Shadcn UI, and tRPC.",
  applicationName: "Mini Editor",
  authors: [{ name: "Fran Enríquez González" }],
  keywords: ["Next.js", "TailwindCSS", "Shadcn", "tRPC", "tldraw", "editor", "technical test", "vidext"],
  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.variable} antialiased h-screen w-screen flex flex-col items-center overflow-x-hidden`}>
        <TRPCProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
