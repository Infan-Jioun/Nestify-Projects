"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Home, Clock, User, Loader2, Phone, Mail, RefreshCw, Trash2, Eye, Edit3, MoreVertical } from "lucide-react";
import { addRecentBooking, clearRecentBookings } from "@/app/features/booking/bookingSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    const { recentBookings } = useSelector((state: RootState) => state.booking);

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

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

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'confirmed':
                return {
                    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    dot: 'bg-emerald-500',
                    label: 'Confirmed'
                };
            case 'cancelled':
                return {
                    color: 'bg-rose-50 text-rose-700 border-rose-200',
                    dot: 'bg-rose-500',
                    label: 'Cancelled'
                };
            case 'completed':
                return {
                    color: 'bg-blue-50 text-blue-700 border-blue-200',
                    dot: 'bg-blue-500',
                    label: 'Completed'
                };
            default:
                return {
                    color: 'bg-amber-50 text-amber-700 border-amber-200',
                    dot: 'bg-amber-500',
                    label: 'Pending Review'
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
        <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50">
            <CardContent className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Home className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Bookings Yet</h3>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                    You haven't scheduled any property viewings yet. Start exploring our premium properties and book your first viewing experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25">
                        Explore Properties
                    </Button>
                    <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        View Featured Listings
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    // Loading State Card
    const LoadingStateCard = () => (
        <Card className="border-gray-200 bg-white shadow-sm">
            <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Loading Your Bookings</h3>
                <p className="text-gray-600">We're preparing your property viewing schedule...</p>
            </CardContent>
        </Card>
    );

    // Error State Card
    const ErrorStateCard = () => (
        <Card className="border-rose-200 bg-rose-50/50">
            <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-200">
                    <div className="text-rose-600 text-xl font-bold">!</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Bookings</h3>
                <p className="text-rose-600 mb-6">{error}</p>
                <Button
                    onClick={() => fetchUserBookings()}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                    Try Again
                </Button>
            </CardContent>
        </Card>
    );

    // Booking Card Component
    const BookingCard = ({ booking }: { booking: Booking }) => {
        const statusConfig = getStatusConfig(booking.status);

        return (
            <Card className="group hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden bg-white">
                {/* Header with Status */}
                <CardHeader className="pb-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${statusConfig.dot} animate-pulse`} />
                            <Badge
                                variant="outline"
                                className={`${statusConfig.color} border font-medium px-3 py-1`}
                            >
                                {statusConfig.label}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">
                                {formatDate(booking.createdAt)}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                        <Edit3 className="h-4 w-4" />
                                        Reschedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2 text-rose-600">
                                        <Trash2 className="h-4 w-4" />
                                        Cancel Booking
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Property Overview */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            {booking.propertyDetails.images && booking.propertyDetails.images.length > 0 ? (
                                <img
                                    src={booking.propertyDetails.images[0]}
                                    alt={booking.propertyDetails.title}
                                    className="w-20 h-20 rounded-xl object-cover border border-gray-200 shadow-sm"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 flex items-center justify-center shadow-sm">
                                    <Home className="h-8 w-8 text-green-600" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                                {booking.propertyDetails.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{booking.propertyDetails.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-lg font-bold text-green-600">
                                    {booking.propertyDetails.currency} {booking.propertyDetails.price?.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    ID: {booking.propertyId.slice(-8)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Appointment Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <Calendar className="h-4 w-4 text-green-600" />
                                Viewing Appointment
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                                    <span className="text-sm font-medium text-gray-700">Scheduled Date</span>
                                    <span className="text-sm font-semibold text-green-700">
                                        {formatDate(booking.bookingDate)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100">
                                    <span className="text-sm font-medium text-gray-700">Viewing Time</span>
                                    <span className="text-sm font-semibold text-blue-700">
                                        {getTimeDisplay(booking.bookingTime)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <User className="h-4 w-4 text-green-600" />
                                Your Contact
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">Email</p>
                                        <p className="text-sm font-medium text-gray-900 truncate">{booking.userEmail}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">Mobile</p>
                                        <p className="text-sm font-medium text-gray-900">{booking.userMobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Message */}
                    {booking.message && (
                        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full" />
                                <span className="text-sm font-semibold text-amber-800">Special Request</span>
                            </div>
                            <p className="text-amber-700 text-sm leading-relaxed">
                                {booking.message}
                            </p>
                        </div>
                    )}
                </CardContent>

                {/* Card Footer with Actions */}
                <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            Booked {formatDate(booking.createdAt)}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                            >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Reschedule
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        );
    };

    // Recent Properties Card
    const RecentPropertiesCard = () => (
        <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Eye className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <div className="text-lg font-bold">Recently Viewed</div>
                        <CardDescription>Properties you've shown interest in</CardDescription>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {recentBookings.map((propertyId) => (
                        <Badge
                            key={propertyId}
                            variant="secondary"
                            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 shadow-sm"
                        >
                            {propertyId.slice(0, 6)}...{propertyId.slice(-4)}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => dispatch(clearRecentBookings())}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear History
                </Button>
            </CardFooter>
        </Card>
    );

    // Support Card
    const SupportCard = () => (
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-green-200 shadow-sm">
                        <Phone className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-green-900 mb-2">Need Assistance?</h4>
                        <p className="text-green-800 text-sm mb-4 leading-relaxed">
                            Our dedicated support team is available to help you with property viewings, scheduling changes, or any questions about your bookings.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm">
                                Contact Support
                            </Button>
                            <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                                View Help Center
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    if (!session) {
        return (
            <Card className="border-2 border-dashed border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50">
                <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <User className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Access Your Bookings</h3>
                    <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                        Sign in to view and manage your property viewing appointments, track your schedule, and explore available properties.
                    </p>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25">
                        Sign In to Continue
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (loading) return <LoadingStateCard />;
    if (error) return <ErrorStateCard />;

    return (
        <div className="space-y-8 px-2 lg:px-12">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg shadow-green-500/25">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-3">Property Viewings</h1>
                        <p className="text-green-100 text-lg opacity-90 leading-relaxed">
                            {bookings.length === 0
                                ? "Schedule your first property viewing experience"
                                : `You have ${bookings.length} scheduled viewing${bookings.length === 1 ? '' : 's'}`
                            }
                        </p>
                    </div>
                    <Button
                        onClick={() => fetchUserBookings(true)}
                        disabled={refreshing}
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                    >
                        <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                </div>
            </div>

            {/* Bookings Grid */}
            {bookings.length === 0 ? (
                <EmptyStateCard />
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </div>
            )}

            {/* Additional Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
                {recentBookings.length > 0 && <RecentPropertiesCard />}
                <SupportCard />
            </div>
        </div>
    );
};

export default UserBookings;