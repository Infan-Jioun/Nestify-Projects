"use client";

import { AlertTriangle, ChevronRight, Home, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// ── Empty ──
export const EmptyStateCard = () => (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-2xl shadow-green-100/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
        <CardContent className="p-8 sm:p-16 text-center relative">
            <div className="w-28 h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200/50 border-8 border-white">
                <Home className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-4">
                No Bookings Yet
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Start your property journey today. Explore premium listings and schedule your first viewing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/30 px-8 h-12 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105">
                    Explore Properties <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" className="border-2 border-gray-300 px-8 h-12 text-lg font-semibold rounded-2xl">
                    View Featured Listings
                </Button>
            </div>
        </CardContent>
    </Card>
);

// ── Loading ──
export const LoadingStateCard = () => (
    <Card className="border-0 bg-white shadow-2xl shadow-gray-100/50 overflow-hidden">
        <CardContent className="p-16 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-white shadow-2xl shadow-green-200/50">
                <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Loading Your Bookings</h3>
            <p className="text-gray-600 text-lg">{"We're preparing your property viewing schedule..."}</p>
            <div className="mt-8 w-48 h-2 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse" />
            </div>
        </CardContent>
    </Card>
);

// ── Error ──
export const ErrorStateCard = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
    <Card className="border-0 bg-gradient-to-br from-rose-50/80 to-rose-100/50 shadow-2xl shadow-rose-100/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500" />
        <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 border-8 border-white shadow-2xl shadow-rose-200/50">
                <AlertTriangle className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Unable to Load Bookings</h3>
            <p className="text-rose-600 text-lg mb-8">{error}</p>
            <Button
                onClick={onRetry}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/30 px-8 h-12 text-lg font-semibold rounded-2xl"
            >
                Try Again
            </Button>
        </CardContent>
    </Card>
);

// ── Not logged in ──
export const NotLoggedInCard = () => (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-2xl shadow-green-100/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
        <CardContent className="p-8 sm:p-16 text-center">
            <div className="w-24 sm:w-28 h-24 sm:h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-white shadow-2xl shadow-green-200/50">
                <User className="h-10 sm:h-12 w-10 sm:w-12 text-green-600" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-4">
                Access Your Bookings
            </h3>
            <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                Sign in to view and manage your property viewing appointments and explore available properties.
            </p>
            <Link href="/LoginPage">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/30 px-8 md:px-10 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                    Sign In to Continue <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
            </Link>
        </CardContent>
    </Card>
);