"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, ShieldCheck, User2 } from "lucide-react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/heroSection";
import Title from "@/components/title";
import Subtitle from "@/components/subtitle";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../_hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const { user, login, logout, loading } = useAuth();
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            router.replace("/tldraw");
        }
    }, [user, router]);


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        try {
            await login({ email, name, remember });
        } catch (err: any) {
            setError(err?.message ?? "No se pudo iniciar sesión");
        }
    }

    return (
        <div className="flex flex-col items-center h-full w-full">
            <Header hideLogin/>
            <main className="mt-28 relative min-h-dvh bg-white text-zinc-900">
                <HeroSection className="h-[calc(100vh-7rem)] mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-6 md:grid-cols-2">
                    <div className="order-2 md:order-1">
                        <Title>Welcome back.</Title>
                        <Subtitle className="mt-4 text-2xl">
                            Sign in to continue with the{" "}
                            <span className="font-semibold">Mini Editor</span> built with{" "}
                            <span className="font-medium">Next.js</span>, <span className="font-medium">Tailwind</span>,{" "}
                            <span className="font-medium">shadcn/ui</span> & <span className="font-medium">tRPC</span>.
                        </Subtitle>
                    </div>

                    <Card className="order-1 mx-auto w-full max-w-md rounded-2xl border-zinc-200/70 shadow-xl backdrop-blur md:order-2">
                        <CardHeader className="space-y-1">
                            <CardTitle className="flex items-center gap-2 text-2xl">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 text-black">
                                <LogIn className="h-4 w-4" />
                            </span>
                            Sign in
                            </CardTitle>
                            <CardDescription>Use your email to access your workspace.</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={onSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <div className="relative">
                                        <User2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                                        <Input
                                            id="name"
                                            placeholder="Ada Lovelace"
                                            className="pl-9"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            autoComplete="name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="ada@vidext.dev"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <label htmlFor="accept" className="flex items-center gap-2">
                                        <Checkbox id="remember" defaultChecked />
                                        <span className="select-none">Remember me</span>
                                    </label>
                                    <div className="flex items-center gap-1 text-sm">
                                        <span className="inline-block rounded-full bg-vidext">
                                            <ShieldCheck className="h-3 w-3 m-[2px]" />
                                        </span>
                                        <span >Secure by tRPC (demo)</span>
                                    </div>
                                </div>

                                {error && (
                                    <p className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
                                    {error}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full rounded-full bg-vidext text-black hover:bg-vidext/90"
                                    disabled={loading}
                                >
                                    {loading ? "Signing in…" : "Sign in"}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between text-sm text-zinc-600">
                            <Link href="/register" className="underline underline-offset-4 hover:text-zinc-800">
                                Create an account
                            </Link>
                            <Link href="/" className="underline underline-offset-4 hover:text-zinc-800">
                                Back to home
                            </Link>
                        </CardFooter>
                    </Card>
                </HeroSection>
            </main>
        </div>
    );
}