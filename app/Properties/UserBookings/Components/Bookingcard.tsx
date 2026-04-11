// components/BookingCard.tsx
"use client";

import {
    Calendar, MapPin, Home, Clock, User, Loader2, Phone, Mail,
    Trash2, Eye, Edit3, MoreVertical, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Booking } from "./types";
import Link from "next/link";
import { useAppSelector } from "@/hooks/hooks";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface BookingCardProps {
    booking: Booking;
    rescheduleLoading: boolean;
    cancelLoading: boolean;
    onReschedule: (booking: Booking) => void;
    onCancel: (booking: Booking) => void;
}

const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
        case "confirmed":
            return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", label: "Confirmed", icon: "✓" };
        case "cancelled":
            return { color: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500", label: "Cancelled", icon: "✕" };
        case "completed":
            return { color: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500", label: "Completed", icon: "★" };
        default:
            return { color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", label: "Pending Review", icon: "⏳" };
    }
};

export const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

export const getTimeDisplay = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
};

export const isActionable = (status: string) =>
    status !== "cancelled" && status !== "completed";

export const BookingCard: React.FC<BookingCardProps> = ({
    booking, rescheduleLoading, cancelLoading, onReschedule, onCancel,
}) => {
    const statusConfig = getStatusConfig(booking.status);
    const actionable = isActionable(booking.status);
    const { properties, loading, error } = useSelector((state: RootState) => state.properties
    );
    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

            {/* ── Header ── */}
            <CardHeader className="pb-4 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white relative z-10 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${statusConfig.dot} animate-pulse shadow-lg`} />
                        <Badge
                            variant="outline"
                            className={`${statusConfig.color} border-2 font-semibold px-4 py-1.5 rounded-full shadow-sm text-sm`}
                        >
                            <span className="mr-2">{statusConfig.icon}</span>
                            {statusConfig.label}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                        <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full">
                            {formatDate(booking.createdAt)}
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-10 w-10 p-0 sm:opacity-0 group-hover:opacity-100 opacity-100 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-2xl border border-gray-200">
                                <Link href={`/Properties/${booking.propertyId}`}>
                                    <DropdownMenuItem className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg">
                                        <Eye className="h-4 w-4 text-gray-600" /> View Details
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem
                                    className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg"
                                    onClick={() => actionable && onReschedule(booking)}
                                    disabled={!actionable}
                                >
                                    <Edit3 className="h-4 w-4 text-green-600" /> Reschedule
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="flex items-center gap-3 p-3 text-sm font-medium text-rose-600 rounded-lg"
                                    onClick={() => actionable && onCancel(booking)}
                                    disabled={!actionable || cancelLoading}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {cancelLoading ? "Cancelling..." : "Cancel Booking"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>

            {/* ── Body ── */}
            <CardContent className="p-4 sm:p-6 relative z-10">
                {/* Property info */}
                <div className="flex items-start gap-4 md:gap-5 mb-6">
                    <div className="flex-shrink-0">
                        {booking.propertyDetails.images?.length ? (
                            <div className="relative">
                                <Image
                                    src={booking.propertyDetails.images[0]}
                                    alt={booking.propertyDetails.title}
                                    width={100} height={100} priority
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-gray-200 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                    <Star className="h-3 w-3 text-white fill-white" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 flex items-center justify-center shadow-2xl">
                                <Home className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                            {booking.propertyDetails.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="h-4 w-4 flex-shrink-0 text-green-600" />
                            <span className="truncate">{booking.propertyDetails.address}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                {booking.propertyDetails.currency} {booking.propertyDetails.price?.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                                ID: {booking.propertyId.slice(-6)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Date/Time & Contact grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Appointment */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Calendar className="h-4 w-4 text-green-600" />
                            </div>
                            Viewing Appointment
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 shadow-sm group-hover:shadow-md transition-shadow">
                                <span className="text-sm font-medium text-gray-700">Date</span>
                                <span className="text-sm font-semibold text-green-700 bg-white px-3 py-1.5 rounded-full border border-green-200">
                                    {formatDate(booking.bookingDate)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-sky-50 rounded-2xl border-2 border-green-100 shadow-sm group-hover:shadow-md transition-shadow">
                                <span className="text-sm font-medium text-gray-700">Time</span>
                                <span className="text-sm font-semibold text-green-700 bg-white px-3 py-1.5 rounded-full border border-green-200">
                                    {getTimeDisplay(booking.bookingTime)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <User className="h-4 w-4 text-green-600" />
                            </div>
                            Your Contact
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Mail className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Email</p>
                                    <p className="text-sm font-semibold text-gray-900 truncate">{booking.userEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Phone className="h-4 w-4 text-gray-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-500 font-medium">Mobile</p>
                                    <p className="text-sm font-semibold text-gray-900">{booking.userMobile}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Special request */}
                {booking.message && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-amber-800">Special Request</span>
                        </div>
                        <p className="text-amber-700 text-sm leading-relaxed line-clamp-2">{booking.message}</p>
                    </div>
                )}
            </CardContent>

            {/* ── Footer ── */}
            <CardFooter className="bg-gradient-to-r from-gray-50/50 to-white border-t border-gray-100/50 px-4 sm:px-6 py-5 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Clock className="h-4 w-4" />
                        Booked {formatDate(booking.createdAt)}
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button
                            size="sm"
                            onClick={() => onReschedule(booking)}
                            disabled={!actionable || rescheduleLoading}
                            className="bg-gradient-to-r from-green-500 to-sky-600 hover:from-green-600 hover:to-sky-700 shadow-lg shadow-green-500/25 border-0 text-white px-6 h-10 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex-1 sm:flex-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {rescheduleLoading
                                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Rescheduling...</>
                                : <><Edit3 className="h-4 w-4 mr-2" /> Reschedule</>
                            }
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onCancel(booking)}
                            disabled={!actionable || cancelLoading}
                            className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 px-6 h-10 rounded-xl font-semibold transition-all duration-300 flex-1 sm:flex-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {cancelLoading
                                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Cancelling...</>
                                : <><Trash2 className="h-4 w-4 mr-2" /> Cancel</>
                            }
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
};