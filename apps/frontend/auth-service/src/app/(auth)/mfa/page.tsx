'use client';

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MfaChallengeForm } from "@/features/mfa/components/MfaChallengeForm";

function MfaContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Lecture du token depuis le query param ou le sessionStorage
        const paramToken = searchParams.get("token");
        const sessionToken = typeof window !== "undefined" ? sessionStorage.getItem("sih_mfa_token") : null;
        const finalToken = paramToken || sessionToken;

        if (!finalToken) {
            router.replace("/login");
            return;
        }

        setToken(finalToken);
        setIsLoading(false);
    }, [searchParams, router]);

    if (isLoading || !token) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return <MfaChallengeForm mfaToken={token} />;
}

export default function MfaPage() {
    return (
        <div className="w-full flex items-center justify-center p-4">
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            }>
                <MfaContent />
            </Suspense>
        </div>
    );
}
