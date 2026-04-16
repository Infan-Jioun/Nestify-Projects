"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import BookingsHeader from './components/BookingsHeader'
import StatsGrid from './components/StatsGrid'
import SearchFilters from './components/SearchFilters'
import BookingsList from './components/BookingsList'
import BookingDetailsModal from './components/BookingDetailsModal'
import BookingsSkeleton from './components/BookingsSkeleton'
import { Booking, BookingStats } from '@/app/Types/Booking'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { updateBookingStatus as updateBookingStatusAction, refetchProperties } from '@/app/features/Properties/propertySlice'
import { toast } from 'react-hot-toast'

export default function BookingsPage() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<BookingStats>({
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/bookings/developer?email=${session.user.email}`);

                    if (!response.ok) throw new Error('Failed to fetch bookings');

                    const data = await response.json();
                    const fetchedBookings = data.bookings || [];

                    setBookings(fetchedBookings);
                    setFilteredBookings(fetchedBookings);
                    setStats({
                        total: fetchedBookings.length,
                        pending: fetchedBookings.filter((b: Booking) => b.status === 'pending').length,
                        confirmed: fetchedBookings.filter((b: Booking) => b.status === 'confirmed').length,
                        completed: fetchedBookings.filter((b: Booking) => b.status === 'completed').length,
                        cancelled: fetchedBookings.filter((b: Booking) => b.status === 'cancelled').length,
                    });
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookings();
    }, [status, session?.user?.email]);

    useEffect(() => {
        let filtered = bookings;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(b => b.status === statusFilter);
        }

        if (searchTerm) {
            const q = searchTerm.toLowerCase();
            filtered = filtered.filter(b =>
                b.propertyDetails.title.toLowerCase().includes(q) ||
                b.userName.toLowerCase().includes(q) ||
                b.userEmail.toLowerCase().includes(q) ||
                b.propertyDetails.address.toLowerCase().includes(q)
            );
        }

        setFilteredBookings(filtered);
    }, [bookings, statusFilter, searchTerm]);

    const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
        try {
            setUpdatingBookingId(bookingId);
            setUpdateError(null);
            setUpdateSuccess(null);

            const bookingToUpdate = bookings.find(b => b._id === bookingId);
            if (!bookingToUpdate) throw new Error('Booking not found');

            await dispatch(updateBookingStatusAction({
                bookingId,
                status: newStatus,
                propertyId: bookingToUpdate.propertyId
            })).unwrap();

            const updatedBookings = bookings.map(b =>
                b._id === bookingId
                    ? { ...b, status: newStatus as Booking['status'], updatedAt: new Date().toISOString() }
                    : b
            );

            setBookings(updatedBookings);
            setStats({
                total: updatedBookings.length,
                pending: updatedBookings.filter(b => b.status === 'pending').length,
                confirmed: updatedBookings.filter(b => b.status === 'confirmed').length,
                completed: updatedBookings.filter(b => b.status === 'completed').length,
                cancelled: updatedBookings.filter(b => b.status === 'cancelled').length,
            });

            setUpdateSuccess(`Booking status updated to ${newStatus} successfully`);
            toast.success(`Booking status updated to ${newStatus}`);
            await dispatch(refetchProperties());

            setTimeout(() => setUpdateSuccess(null), 3000);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to update booking status';
            setUpdateError(msg);
            toast.error(msg);
        } finally {
            setUpdatingBookingId(null);
        }
    };

    const handleViewDetails = (booking: Booking) => setSelectedBooking(booking);
    const handleCloseModal = () => setSelectedBooking(null);

    if (status === 'loading' || loading) return <BookingsSkeleton />;

    return (
 

        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

                <BookingsHeader stats={stats} />

     
                <div className="mt-6 sm:mt-8">
                    <StatsGrid stats={stats} />
                </div>

           
                {updateSuccess && (
                    <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800
                                    px-4 py-3 rounded-lg text-sm sm:text-base">
                        <span className="shrink-0 font-medium">Success:</span>
                        <span>{updateSuccess}</span>
                    </div>
                )}
                {updateError && (
                    <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-800
                                    px-4 py-3 rounded-lg text-sm sm:text-base">
                        <span className="shrink-0 font-medium">Error:</span>
                        <span>{updateError}</span>
                    </div>
                )}
                {error && (
                    <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-800
                                    px-4 py-3 rounded-lg text-sm sm:text-base">
                        <span className="shrink-0 font-medium">Error:</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="mt-6 sm:mt-8">
                    <SearchFilters
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                    />
                </div>

                <div className="mt-6 sm:mt-8">
                    <BookingsList
                        bookings={filteredBookings}
                        onViewDetails={handleViewDetails}
                        onUpdateStatus={handleUpdateBookingStatus}
                        updatingBookingId={updatingBookingId}
                    />
                </div>
            </div>

            {/* ── Details modal ──────────────────────────────────────── */}
            {/* BookingDetailsModal should use:
                - w-[95vw] max-w-lg on mobile  (nearly full width)
                - max-w-2xl on md+
                - max-h-[90vh] overflow-y-auto
                - p-4 sm:p-6 inner padding */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={handleCloseModal}
                    onUpdateStatus={handleUpdateBookingStatus}
                    updating={updatingBookingId === selectedBooking._id}
                />
            )}
        </div>
    );
}