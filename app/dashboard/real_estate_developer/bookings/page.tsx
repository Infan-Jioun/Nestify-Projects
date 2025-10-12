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

export default function BookingsPage() {
    const { data: session, status } = useSession();
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

    // Fetch bookings for the developer
    useEffect(() => {
        const fetchBookings = async () => {
            if (status === 'authenticated' && session?.user?.email) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/bookings/developer?email=${session.user.email}`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch bookings');
                    }

                    const data = await response.json();
                    setBookings(data.bookings || []);
                    setFilteredBookings(data.bookings || []);

                    // Calculate stats
                    const total = data.bookings?.length || 0;
                    const pending = data.bookings?.filter((b: Booking) => b.status === 'pending').length || 0;
                    const confirmed = data.bookings?.filter((b: Booking) => b.status === 'confirmed').length || 0;
                    const completed = data.bookings?.filter((b: Booking) => b.status === 'completed').length || 0;
                    const cancelled = data.bookings?.filter((b: Booking) => b.status === 'cancelled').length || 0;

                    setStats({
                        total,
                        pending,
                        confirmed,
                        completed,
                        cancelled
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

    // Filter bookings based on search and status
    useEffect(() => {
        let filtered = bookings;

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(booking => booking.status === statusFilter);
        }

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(booking =>
                booking.propertyDetails.title.toLowerCase().includes(searchLower) ||
                booking.userName.toLowerCase().includes(searchLower) ||
                booking.userEmail.toLowerCase().includes(searchLower) ||
                booking.propertyDetails.address.toLowerCase().includes(searchLower)
            );
        }

        setFilteredBookings(filtered);
    }, [bookings, statusFilter, searchTerm]);

    // Update booking status
    const updateBookingStatus = async (bookingId: string, newStatus: string) => {
        try {
            setUpdatingBookingId(bookingId);
            setUpdateError(null);
            setUpdateSuccess(null);

            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update booking status');
            }

            // Remove unused variable 'result'
            await response.json();

            // Update local state with proper type
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId
                        ? { 
                            ...booking, 
                            status: newStatus as Booking['status'], 
                            updatedAt: new Date().toISOString() 
                        }
                        : booking
                )
            );

            setUpdateSuccess(`Booking status updated to ${newStatus} successfully`);

            // Refresh stats with proper type
            const updatedBookings = bookings.map(booking =>
                booking._id === bookingId
                    ? { ...booking, status: newStatus as Booking['status'] }
                    : booking
            );

            const total = updatedBookings.length;
            const pending = updatedBookings.filter(b => b.status === 'pending').length;
            const confirmed = updatedBookings.filter(b => b.status === 'confirmed').length;
            const completed = updatedBookings.filter(b => b.status === 'completed').length;
            const cancelled = updatedBookings.filter(b => b.status === 'cancelled').length;

            setStats({
                total,
                pending,
                confirmed,
                completed,
                cancelled
            });

            // Auto hide success message after 3 seconds
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000);

        } catch (err) {
            setUpdateError(err instanceof Error ? err.message : 'Failed to update booking status');
        } finally {
            setUpdatingBookingId(null);
        }
    };

    if (status === 'loading' || loading) {
        return <BookingsSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <BookingsHeader stats={stats} />

            {/* Stats Grid */}
            <StatsGrid stats={stats} />

            {/* Success and Error Messages */}
            {updateSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
                    <strong>Success:</strong> {updateSuccess}
                </div>
            )}

            {updateError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
                    <strong>Error:</strong> {updateSuccess}
                </div>
            )}

            {/* Filters and Search */}
            <SearchFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Bookings List */}
            <BookingsList
                bookings={filteredBookings}
                onViewDetails={setSelectedBooking}
                onUpdateStatus={updateBookingStatus}
                updatingBookingId={updatingBookingId}
            />

            {/* Booking Details Modal */}
            {selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    onUpdateStatus={updateBookingStatus}
                    updating={updatingBookingId === selectedBooking._id}
                />
            )}
        </div>
    );
}