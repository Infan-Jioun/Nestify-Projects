// components/UserBookings.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Home, Clock, User, Loader2, Phone, Mail, RefreshCw, Trash2, Eye, Edit3, MoreVertical, ChevronRight, Star, Shield, Zap } from "lucide-react";
import { addRecentBooking, clearRecentBookings, rescheduleBooking, cancelBooking } from "@/app/features/booking/bookingSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RescheduleDialog } from "./Components/RescheduleDialog";

interface Booking {
    _id: string;
    propertyId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userMobile: string;
    bookingDate: string;
    bookingTime: string;
    message: string;
    propertyDetails: {
        title: string;
        address: string;
        price: number;
        currency: string;
        images?: string[];
        status?: string;
        listingStatus?: string;
        contact?: string;
    };
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
}

const UserBookings = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const { recentBookings, rescheduleLoading, cancelLoading } = useSelector((state: RootState) => state.booking);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const fetchUserBookings = async (isRefresh = false) => {
        if (!session?.user) return;

        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response = await fetch("/api/bookings");

            if (!response.ok) {
                throw new Error("Failed to fetch bookings");
            }

            const data = await response.json();

            if (data.success) {
                setBookings(data.bookings);
                data.bookings.forEach((booking: Booking) => {
                    dispatch(addRecentBooking(booking.propertyId));
                });
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError("Failed to load bookings");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (session?.user) {
            fetchUserBookings();
        }
    }, [session]);

    const handleReschedule = async (bookingId: string, bookingDate: string, bookingTime: string, message?: string) => {
        try {
            const result = await dispatch(rescheduleBooking({
                bookingId,
                bookingDate,
                bookingTime,
                message
            })).unwrap();

            if (result.success) {
                // Update local state
                setBookings(prev => prev.map(booking =>
                    booking._id === bookingId
                        ? { ...booking, ...result.booking }
                        : booking
                ));
                setRescheduleDialogOpen(false);
                setSelectedBooking(null);
            }
        } catch (error) {
            console.error("Failed to reschedule booking:", error);
        }
    };

    const handleCancel = async (bookingId: string, propertyId: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        try {
            const result = await dispatch(cancelBooking({
                bookingId,
                propertyId
            })).unwrap();

            if (result.success) {
                // Update local state
                setBookings(prev => prev.map(booking =>
                    booking._id === bookingId
                        ? { ...booking, status: 'cancelled' }
                        : booking
                ));

                // Property status will be automatically updated to "Available" via Redux
                console.log("Booking cancelled and property status updated to Available");
            }
        } catch (error) {
            console.error("Failed to cancel booking:", error);
        }
    };

    const openRescheduleDialog = (booking: Booking) => {
        setSelectedBooking(booking);
        setRescheduleDialogOpen(true);
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'confirmed':
                return {
                    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    dot: 'bg-emerald-500',
                    label: 'Confirmed',
                    icon: '✓'
                };
            case 'cancelled':
                return {
                    color: 'bg-rose-50 text-rose-700 border-rose-200',
                    dot: 'bg-rose-500',
                    label: 'Cancelled',
                    icon: '✕'
                };
            case 'completed':
                return {
                    color: 'bg-green-50 text-green-700 border-green-200',
                    dot: 'bg-green-500',
                    label: 'Completed',
                    icon: '★'
                };
            default:
                return {
                    color: 'bg-amber-50 text-amber-700 border-amber-200',
                    dot: 'bg-amber-500',
                    label: 'Pending Review',
                    icon: '⏳'
                };
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getTimeDisplay = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${period}`;
    };

    // Empty State Card
    const EmptyStateCard = () => (
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg sm:shadow-2xl shadow-green-100/50 overflow-hidden mx-2 sm:mx-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardContent className="p-6 sm:p-12 md:p-16 text-center relative">
                <div className="absolute inset-0 bg-grid-green-100/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                <div className="relative z-10">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl sm:shadow-2xl shadow-green-200/50 border-4 sm:border-8 border-white">
                        <Home className="h-8 w-8 sm:h-12 sm:w-12 md:h-14 md:w-14 text-green-600" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                        No Bookings Yet
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
                        Start your property journey today. Explore premium listings and schedule your first viewing experience with just a few clicks.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg sm:shadow-2xl shadow-green-500/30 px-6 sm:px-8 py-3 h-12 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                            Explore Properties
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                        </Button>
                        <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 h-12 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 w-full sm:w-auto">
                            View Featured Listings
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    // Loading State Card
    const LoadingStateCard = () => (
        <Card className="border-0 bg-white shadow-lg sm:shadow-2xl shadow-gray-100/50 overflow-hidden mx-2 sm:mx-0">
            <CardContent className="p-8 sm:p-12 md:p-16 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border-4 sm:border-8 border-white shadow-xl sm:shadow-2xl shadow-green-200/50">
                    <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 animate-spin text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Loading Your Bookings</h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg">{"We're preparing your property viewing schedule..."}</p>
                <div className="mt-6 sm:mt-8 w-32 sm:w-48 h-2 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                </div>
            </CardContent>
        </Card>
    );

    // Error State Card
    const ErrorStateCard = () => (
        <Card className="border-0 bg-gradient-to-br from-rose-50/80 to-rose-100/50 shadow-lg sm:shadow-2xl shadow-rose-100/50 overflow-hidden mx-2 sm:mx-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500"></div>
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-4 sm:border-8 border-white shadow-xl sm:shadow-2xl shadow-rose-200/50">
                    <div className="text-rose-600 text-xl sm:text-2xl font-bold">!</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Unable to Load Bookings</h3>
                <p className="text-rose-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">{error}</p>
                <Button
                    onClick={() => fetchUserBookings()}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg sm:shadow-2xl shadow-green-500/30 px-6 sm:px-8 py-3 h-12 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl w-full sm:w-auto"
                >
                    Try Again
                </Button>
            </CardContent>
        </Card>
    );

    // Booking Card Component
    const BookingCard = ({ booking }: { booking: Booking }) => {
        const statusConfig = getStatusConfig(booking.status);
        const isRescheduleLoading = rescheduleLoading[booking._id] || false;
        const isCancelLoading = cancelLoading[booking._id] || false;

        return (
            <Card className="group hover:shadow-lg sm:hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden relative mx-2 sm:mx-0">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>

                {/* Header with Status */}
                <CardHeader className="pb-3 sm:pb-4 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white relative z-10 px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${statusConfig.dot} animate-pulse shadow-lg`} />
                            <Badge
                                variant="outline"
                                className={`${statusConfig.color} border-2 font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-sm text-xs sm:text-sm`}
                            >
                                <span className="mr-1 sm:mr-2">{statusConfig.icon}</span>
                                {statusConfig.label}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-2">
                            <span className="text-xs sm:text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                                {formatDate(booking.createdAt)}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-10 sm:w-10 p-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl hover:bg-white">
                                        <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 sm:w-56 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-gray-200">
                                    <DropdownMenuItem className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg">
                                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg"
                                        onClick={() => openRescheduleDialog(booking)}
                                        disabled={booking.status === 'cancelled' || booking.status === 'completed'}
                                    >
                                        <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                        Reschedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 text-xs sm:text-sm font-medium text-rose-600 rounded-lg"
                                        onClick={() => handleCancel(booking._id, booking.propertyId)}
                                        disabled={booking.status === 'cancelled' || booking.status === 'completed' || isCancelLoading}
                                    >
                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                        {isCancelLoading ? 'Cancelling...' : 'Cancel Booking'}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6 relative z-10">
                    {/* Property Overview */}
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6">
                        <div className="flex-shrink-0">
                            {booking.propertyDetails.images && booking.propertyDetails.images.length > 0 ? (
                                <div className="relative">
                                    <img
                                        src={booking.propertyDetails.images[0]}
                                        alt={booking.propertyDetails.title}
                                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl md:rounded-2xl object-cover border-2 border-gray-200 shadow-lg sm:shadow-2xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                        <Star className="h-2 w-2 sm:h-3 sm:w-3 text-white fill-white" />
                                    </div>
                                </div>
                            ) : (
                                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 flex items-center justify-center shadow-lg sm:shadow-2xl">
                                    <Home className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-green-600" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg md:text-xl leading-tight mb-1 sm:mb-2 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
                                {booking.propertyDetails.title}
                            </h3>
                            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-green-600" />
                                <span className="truncate">{booking.propertyDetails.address}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <span className="text-lg sm:text-xl font-bold bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    {booking.propertyDetails.currency} {booking.propertyDetails.price?.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium">
                                    ID: {booking.propertyId.slice(-6)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Appointment Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                </div>
                                Viewing Appointment
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-green-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Date</span>
                                    <span className="text-xs sm:text-sm font-semibold text-green-700 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-green-200">
                                        {formatDate(booking.bookingDate)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-sky-50 rounded-xl sm:rounded-2xl border-2 border-green-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Time</span>
                                    <span className="text-xs sm:text-sm font-semibold text-green-700 bg-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-green-200">
                                        {getTimeDisplay(booking.bookingTime)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-900">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                </div>
                                Your Contact
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500 font-medium">Email</p>
                                        <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{booking.userEmail}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-gray-500 font-medium">Mobile</p>
                                        <p className="text-xs sm:text-sm font-semibold text-gray-900">{booking.userMobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Message */}
                    {booking.message && (
                        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl sm:rounded-2xl shadow-sm">
                            <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-pulse" />
                                <span className="text-xs sm:text-sm font-semibold text-amber-800">Special Request</span>
                            </div>
                            <p className="text-amber-700 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                {booking.message}
                            </p>
                        </div>
                    )}
                </CardContent>

                {/* Card Footer with Actions */}
                <CardFooter className="bg-gradient-to-r from-gray-50/50 to-white border-t border-gray-100/50 px-4 sm:px-6 py-3 sm:py-5 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3 sm:gap-0">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            Booked {formatDate(booking.createdAt)}
                        </div>
                        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                            <Button
                                size="sm"
                                onClick={() => openRescheduleDialog(booking)}
                                disabled={booking.status === 'cancelled' || booking.status === 'completed' || isRescheduleLoading}
                                className="bg-gradient-to-r from-green-500 to-sky-600 hover:from-green-600 hover:to-sky-700 shadow-lg shadow-green-500/25 border-0 text-white px-3 sm:px-6 py-2 h-9 sm:h-10 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex-1 sm:flex-none text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRescheduleLoading ? (
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                                ) : (
                                    <Edit3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                )}
                                {isRescheduleLoading ? 'Rescheduling...' : 'Reschedule'}
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancel(booking._id, booking.propertyId)}
                                disabled={booking.status === 'cancelled' || booking.status === 'completed' || isCancelLoading}
                                className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 px-3 sm:px-6 py-2 h-9 sm:h-10 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex-1 sm:flex-none text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCancelLoading ? (
                                    <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                                ) : (
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                )}
                                {isCancelLoading ? 'Cancelling...' : 'Cancel'}
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        );
    };

    // Recent Properties Card
    const RecentPropertiesCard = () => (
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg sm:shadow-2xl shadow-gray-100/50 overflow-hidden mx-2 sm:mx-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
            <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="flex items-center gap-3 sm:gap-4 text-gray-900">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200/50">
                        <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold">Recently Viewed</div>
                        <CardDescription className="text-gray-600 text-xs sm:text-sm">{"Properties you've shown interest in"}</CardDescription>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {recentBookings.slice(0, 4).map((propertyId) => (
                        <Badge
                            key={propertyId}
                            variant="secondary"
                            className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium text-xs sm:text-sm"
                        >
                            {propertyId.slice(0, 4)}...{propertyId.slice(-4)}
                        </Badge>
                    ))}
                    {recentBookings.length > 4 && (
                        <Badge variant="outline" className="text-xs sm:text-sm">
                            +{recentBookings.length - 4} more
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="px-4 sm:px-6">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-4 sm:px-6 py-2 h-9 sm:h-11 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto text-xs sm:text-sm"
                    onClick={() => dispatch(clearRecentBookings())}
                >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Clear History
                </Button>
            </CardFooter>
        </Card>
    );

    // Support Card
    const SupportCard = () => (
        <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50/80 shadow-lg sm:shadow-2xl shadow-green-100/50 overflow-hidden mx-2 sm:mx-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 border-2 border-green-200 shadow-lg shadow-green-200/50">
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-green-900 text-lg sm:text-xl mb-2 sm:mb-3">Need Assistance?</h4>
                        <p className="text-green-800 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                            Our dedicated support team is available to help you with property viewings, scheduling changes, or any questions about your bookings.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                            <Link href={"/Contact"} className="flex-1">
                                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 px-4 sm:px-6 py-2 h-10 sm:h-11 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 hover:scale-105 w-full text-xs sm:text-sm">
                                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                    Contact Support
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-2 border-green-300 text-green-700 hover:bg-green-100 px-4 sm:px-6 py-2 h-10 sm:h-11 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex-1 text-xs sm:text-sm">
                                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                Help Center
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (!session) {
        return (
            <Card className="border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-lg sm:shadow-2xl shadow-green-100/50 overflow-hidden mx-2 sm:mx-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                <CardContent className="p-8 sm:p-12 md:p-16 text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 border-4 sm:border-8 border-white shadow-xl sm:shadow-2xl shadow-green-200/50">
                        <User className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                        Access Your Bookings
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
                        Sign in to view and manage your property viewing appointments, track your schedule, and explore available properties.
                    </p>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg sm:shadow-2xl shadow-green-500/30 px-6 sm:px-8 md:px-10 py-3 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                        Sign In to Continue
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (loading) return <LoadingStateCard />;
    if (error) return <ErrorStateCard />;

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20">
                <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-6 xl:px-8 max-w-7xl mx-auto py-4 sm:py-6 md:py-8">
                    {/* Header Section */}
                    <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 rounded-2xl sm:rounded-3xl overflow-hidden border border-green-200/50 mx-2 sm:mx-0">
                        {/* Background Elements */}
                        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-green-300/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-300/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-green-300/10 rounded-full blur-2xl sm:blur-3xl"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 md:gap-8">
                                <div className="text-center lg:text-left">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-3 sm:mb-4">
                                        Property Viewings
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                        {bookings.length === 0
                                            ? "Schedule your first property viewing experience and discover your dream home"
                                            : `You have ${bookings.length} scheduled viewing${bookings.length === 1 ? '' : 's'} - Manage your appointments seamlessly`
                                        }
                                    </p>
                                </div>
                                <Button
                                    onClick={() => fetchUserBookings(true)}
                                    disabled={refreshing}
                                    className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 border-2 border-green-200 shadow-lg sm:shadow-2xl shadow-green-500/20 px-6 sm:px-8 py-3 h-12 sm:h-14 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 w-full lg:w-auto mt-4 lg:mt-0 text-sm sm:text-base"
                                >
                                    <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 ${refreshing ? 'animate-spin' : ''}`} />
                                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    {bookings.length > 0 && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-0">
                            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg shadow-green-100/50">
                                <CardContent className="p-4 sm:p-6 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-green-600">{bookings.length}</div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Total Bookings</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-green-50 to-sky-50 shadow-lg shadow-green-100/50">
                                <CardContent className="p-4 sm:p-6 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                                        {bookings.filter(b => b.status === 'confirmed').length}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Confirmed</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-lg shadow-amber-100/50">
                                <CardContent className="p-4 sm:p-6 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-amber-600">
                                        {bookings.filter(b => b.status === 'pending').length}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Pending</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg shadow-purple-100/50">
                                <CardContent className="p-4 sm:p-6 text-center">
                                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                                        {bookings.filter(b => b.status === 'completed').length}
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Completed</div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Bookings Grid */}
                    {bookings.length === 0 ? (
                        <EmptyStateCard />
                    ) : (
                        <div className="grid gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
                            {bookings.map((booking) => (
                                <BookingCard key={booking._id} booking={booking} />
                            ))}
                        </div>
                    )}

                    {/* Additional Cards */}
                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0">
                        {recentBookings.length > 0 && <RecentPropertiesCard />}
                        <SupportCard />
                    </div>
                </div>
            </div>

            {/* Reschedule Dialog */}
            <RescheduleDialog
                open={rescheduleDialogOpen}
                onOpenChange={setRescheduleDialogOpen}
                booking={selectedBooking}
                onReschedule={handleReschedule}
                loading={selectedBooking ? rescheduleLoading[selectedBooking._id] : false}
            />
        </>
    );
};

export default UserBookings;