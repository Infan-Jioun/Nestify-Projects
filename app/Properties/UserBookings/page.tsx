"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RootState, AppDispatch } from "@/lib/store";
import {
    addRecentBooking,
    clearRecentBookings,
    rescheduleBooking,
    cancelBooking,
} from "@/app/features/booking/bookingSlice";

import { BookingCard } from "./Components/Bookingcard";
import { RecentPropertiesCard, SupportCard } from "./Components/Sidebarcards";
import { RescheduleDialog } from "./Components/RescheduleDialog";
import { ConfirmDialog } from "./Components/Confirmdialog";
import { ToastContainer } from "./Components/Toastcontainer";
import { Booking } from "./Components/types";
import { EmptyStateCard, ErrorStateCard, LoadingStateCard, NotLoggedInCard } from "./Components/Statecards";
import { useToast } from "./Components/usetoast";



const UserBookings = () => {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>()
    const { recentBookings, rescheduleLoading, cancelLoading } = useSelector(
        (state: RootState) => state.booking
    );

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // Dialogs
    const [rescheduleOpen, setRescheduleOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

    const { toasts, showToast, removeToast } = useToast();

    // ── Fetch ─────────────────────────────────────────────────────────────────

    const fetchUserBookings = async (isRefresh = false) => {
        if (!session?.user) return;
        try {
            isRefresh ? setRefreshing(true) : setLoading(true);
            const res = await fetch("/api/bookings");
            if (!res.ok) throw new Error("Failed to fetch bookings");
            const data = await res.json();
            if (data.success) {
                setBookings(data.bookings);
                data.bookings.forEach((b: Booking) => dispatch(addRecentBooking(b.propertyId)));
            }
        } catch {
            setError("Failed to load bookings");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (session?.user) fetchUserBookings();
    }, [session]);

    // ── Reschedule ────────────────────────────────────────────────────────────

    const handleReschedule = async (
        bookingId: string,
        bookingDate: string,
        bookingTime: string,
        message?: string
    ) => {
        try {
            const result = await dispatch(
                rescheduleBooking({ bookingId, bookingDate, bookingTime, message })
            ).unwrap();

            if (result.success) {
                setBookings((prev) =>
                    prev.map((b) =>
                        b._id === bookingId
                            ? { ...b, bookingDate, bookingTime, message: message ?? b.message }
                            : b
                    )
                );
                setRescheduleOpen(false);
                setSelectedBooking(null);
                showToast("success", "Booking Rescheduled!", "Your viewing appointment has been updated.");
            }
        } catch {
            showToast("error", "Reschedule Failed", "Could not reschedule your booking. Please try again.");
        }
    };


    const openCancelDialog = (booking: Booking) => {
        setBookingToCancel(booking);
        setCancelOpen(true);
    };

    const confirmCancel = async () => {
        if (!bookingToCancel) return;
        try {
            const result = await dispatch(
                cancelBooking({ bookingId: bookingToCancel._id, propertyId: bookingToCancel.propertyId })
            ).unwrap();

            if (result.success) {
                setBookings((prev) => prev.filter((b) => b._id !== bookingToCancel._id));
                setCancelOpen(false);
                setBookingToCancel(null);
                showToast("success", "Booking Cancelled", "Your booking has been successfully cancelled.");
            }
        } catch {
            showToast("error", "Cancellation Failed", "Could not cancel your booking. Please try again.");
        }
    };

    // ── Guard states ──────────────────────────────────────────────────────────

    if (!session) return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />
            <NotLoggedInCard />
        </>
    );

    if (loading) return <LoadingStateCard />;
    if (error) return <ErrorStateCard error={error} onRetry={fetchUserBookings} />;

 

    return (
        <>
            <ToastContainer toasts={toasts} onRemove={removeToast} />

            {/* Cancel confirm */}
            <ConfirmDialog
                open={cancelOpen}
                onOpenChange={(open) => { setCancelOpen(open); if (!open) setBookingToCancel(null); }}
                title="Cancel Booking?"
                description={`Are you sure you want to cancel your viewing for "${bookingToCancel?.propertyDetails.title ?? "this property"}"? This action cannot be undone.`}
                confirmLabel="Yes, Cancel Booking"
                onConfirm={confirmCancel}
                loading={bookingToCancel ? (cancelLoading[bookingToCancel._id] || false) : false}
                variant="danger"
            />

            {/* Reschedule */}
            <RescheduleDialog
                open={rescheduleOpen}
                onOpenChange={(open) => { setRescheduleOpen(open); if (!open) setSelectedBooking(null); }}
                booking={selectedBooking}
                onReschedule={handleReschedule}
                loading={selectedBooking ? (rescheduleLoading[selectedBooking._id] || false) : false}
            />

            <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20">
                <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 lg:px-6 xl:px-8 max-w-7xl mx-auto py-4 sm:py-8">

                    {/* ── Header ── */}
                    <div className="relative py-12 sm:py-20 px-4 sm:px-8 text-center bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 rounded-3xl overflow-hidden border border-green-200/50">
                        <div className="absolute top-0 left-0 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" />
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-br from-gray-900 to-green-800 bg-clip-text text-transparent mb-4">
                                    Property Viewings
                                </h1>
                                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {bookings.length === 0
                                        ? "Schedule your first property viewing and discover your dream home"
                                        : `You have ${bookings.length} scheduled viewing${bookings.length === 1 ? "" : "s"} — manage your appointments seamlessly`
                                    }
                                </p>
                            </div>
                            <Button
                                onClick={() => fetchUserBookings(true)}
                                disabled={refreshing}
                                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 border-2 border-green-200 shadow-2xl shadow-green-500/20 px-8 h-14 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 w-full lg:w-auto text-base"
                            >
                                <RefreshCw className={`h-5 w-5 mr-3 ${refreshing ? "animate-spin" : ""}`} />
                                {refreshing ? "Refreshing..." : "Refresh Data"}
                            </Button>
                        </div>
                    </div>

                    {/* ── Stats bar ── */}
                    {bookings.length > 0 && (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {[
                                { label: "Total Bookings", value: bookings.length, color: "text-green-600", bg: "from-green-50 to-emerald-50", shadow: "shadow-green-100/50" },
                                { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, color: "text-green-600", bg: "from-green-50 to-sky-50", shadow: "shadow-green-100/50" },
                                { label: "Pending", value: bookings.filter(b => b.status === "pending").length, color: "text-amber-600", bg: "from-amber-50 to-yellow-50", shadow: "shadow-amber-100/50" },
                                { label: "Completed", value: bookings.filter(b => b.status === "completed").length, color: "text-purple-600", bg: "from-purple-50 to-pink-50", shadow: "shadow-purple-100/50" },
                            ].map((stat) => (
                                <Card key={stat.label} className={`border-0 bg-gradient-to-br ${stat.bg} shadow-lg ${stat.shadow}`}>
                                    <CardContent className="p-4 sm:p-6 text-center">
                                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* ── Bookings list ── */}
                    {bookings.length === 0 ? (
                        <EmptyStateCard />
                    ) : (
                        <div className="grid gap-6 md:gap-8">
                            {bookings.map((booking) => (
                                <BookingCard
                                    key={booking._id}
                                    booking={booking}
                                 
                                    rescheduleLoading={rescheduleLoading[booking._id] || false}
                                    cancelLoading={cancelLoading[booking._id] || false}
                                    onReschedule={(b) => { setSelectedBooking(b); setRescheduleOpen(true); }}
                                    onCancel={openCancelDialog}
                                />
                            ))}
                        </div>
                    )}

                    {/* ── Bottom cards ── */}
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        {recentBookings.length > 0 && (
                            <RecentPropertiesCard
                                recentBookings={recentBookings}
                                onClear={() => {
                                    dispatch(clearRecentBookings());
                                    showToast("info", "History Cleared", "Your recently viewed properties have been cleared.");
                                }}
                            />
                        )}
                        <SupportCard />
                    </div>

                </div>
            </div>
        </>
    );
};

export default UserBookings;