"use client";

import { useAuth } from "@/app/(pages)/_hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
    const {logout, loading, user} = useAuth();

    const router = useRouter();
    const handleLogout = () => {
        logout();
    }
    
    useEffect(() => {
        console.log("user", user, loading);
        if (!user && !loading) {
            router.push("/");
        }
    }, [user, loading, router]);

    return (
        <Button
            onClick={handleLogout}
            className="w-3/4 mx-auto  bg-gray-200 text-black hover:bg-gray-400"
            disabled={loading || !user}
        >
            Logout
        </Button>
    );
}