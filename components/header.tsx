"use client";

import { useAuth } from "@/app/(pages)/_hooks/useAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { useEffect } from "react";


export default function Header({hideLogin = false}: {hideLogin?: boolean}) {
    const router = useRouter();
    const { user } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        if (user && (pathname === "/login" || pathname === "/")) {
            router.replace("/tldraw");
        }
    }, [user, pathname, router]);

    const handleLogin = () => {
        router.push("/login");
    }

    if (user) return null;

    return (
        <header className=" fixed top-0 bg-background w-screen flex justify-center z-50">
            <nav className="flex flex-row justify-between w-full py-7 max-w-7xl">
            <Image
                src="/assets/images/vidext/negative/Logo_Vidext_black_1000x234.svg"
                alt="Vidext logo"
                width={100}
                height={50}
            />
            {!hideLogin && <Button onClick={handleLogin} className="bg-vidext text-foreground hover:bg-gray-200">Login</Button>}
            </nav>
        </header>
    )
}