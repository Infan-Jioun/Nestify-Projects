
"use client";

import { Eye, Phone, Shield, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// ── Recently Viewed Properties ──
interface RecentPropertiesCardProps {
    recentBookings: string[];
    onClear: () => void;
}

export const RecentPropertiesCard = ({ recentBookings, onClear }: RecentPropertiesCardProps) => (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-2xl shadow-gray-100/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500" />
        <CardHeader className="pb-4 px-6">
            <CardTitle className="flex items-center gap-4 text-gray-900">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200/50">
                    <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                    <div className="text-xl md:text-2xl font-bold">Recently Viewed</div>
                    <CardDescription className="text-gray-600 text-sm">
                        {"Properties you've shown interest in"}
                    </CardDescription>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
            <div className="flex flex-wrap gap-3 mb-6">
                {recentBookings.slice(0, 4).map((propertyId) => (
                    <Badge
                        key={propertyId}
                        variant="secondary"
                        className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium text-sm"
                    >
                        {propertyId.slice(0, 4)}...{propertyId.slice(-4)}
                    </Badge>
                ))}
                {recentBookings.length > 4 && (
                    <Badge variant="outline" className="text-sm">
                        +{recentBookings.length - 4} more
                    </Badge>
                )}
            </div>
        </CardContent>
        <CardFooter className="px-6">
            <Button
                variant="outline"
                size="sm"
                onClick={onClear}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 h-11 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto text-sm"
            >
                <Trash2 className="h-4 w-4 mr-2" /> Clear History
            </Button>
        </CardFooter>
    </Card>
);

// ── Support Card ──
export const SupportCard = () => (
    <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50/80 shadow-2xl shadow-green-100/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
        <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-green-200 shadow-lg shadow-green-200/50">
                    <Shield className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-green-900 text-xl mb-3">Need Assistance?</h4>
                    <p className="text-green-800 text-sm mb-6 leading-relaxed">
                        Our dedicated support team is available to help you with property viewings, scheduling changes, or any questions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/Contact" className="flex-1">
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 px-6 h-11 rounded-xl font-semibold transition-all duration-300 hover:scale-105 w-full text-sm">
                                <Phone className="h-4 w-4 mr-2" /> Contact Support
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            className="border-2 border-green-300 text-green-700 hover:bg-green-100 px-6 h-11 rounded-xl font-semibold transition-all duration-300 flex-1 text-sm"
                        >
                            <Zap className="h-4 w-4 mr-2" /> Help Center
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);