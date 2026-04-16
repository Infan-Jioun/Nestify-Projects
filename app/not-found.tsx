"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
            }
        );

        gsap.fromTo(
            ".fade-item",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                delay: 0.2,
                duration: 0.5,
            }
        );
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-200 px-4">
            <div
                ref={containerRef}
                className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 text-center max-w-md w-full"
            >
                {/* Icon */}
                <div className="flex justify-center mb-4 fade-item">
                    <div className="bg-green-100 p-3 rounded-full">
                        <AlertTriangle className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                {/* 404 */}
                <h1 className="text-5xl sm:text-6xl font-extrabold text-green-600 fade-item">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800 fade-item">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500 fade-item">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <Link href="/" className="fade-item">
                    <button className="mt-6 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
                        Go Back Home
                    </button>
                </Link>
            </div>
        </div>
    );
}