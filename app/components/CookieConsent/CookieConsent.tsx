"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function getCookie(name: string) {
    return document.cookie.split("; ").find(row => row.startsWith(name + "="))?.split("=")[1];
}

function setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = getCookie("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setCookie("cookie-consent", "accepted", 365);
        setVisible(false);
    };

    const handleDecline = () => {
        setCookie("cookie-consent", "declined", 365);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">🍪</span>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            We use cookies
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            We use cookies to improve your experience on Nestify.
                            By continuing, you agree to our{" "}
                            <Link href="/legal/privacy-policy" className="text-green-500 hover:underline">
                                Privacy Policy
                            </Link>.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={handleDecline}
                        className="text-xs border-gray-300 dark:border-gray-700">
                        Decline
                    </Button>
                    <Button size="sm" onClick={handleAccept}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white">
                        Accept All
                    </Button>
                </div>
            </div>
        </div>
    );
}